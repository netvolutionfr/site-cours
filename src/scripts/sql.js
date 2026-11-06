// Logique pure de l'atelier SQL (sans DOM) : exécuter sur une base neuve, comparer, traduire les erreurs.

const cellule = (v) => (v === null ? 'NULL' : typeof v === 'number' ? String(Math.round(v * 100) / 100) : String(v));

// Base neuve à chaque exécution : une requête d'écriture de l'étudiant ne contamine jamais l'exercice suivant.
export function nouvelleBase(SQL, script) {
	const db = new SQL.Database();
	db.exec('PRAGMA foreign_keys = ON;' + script);
	return db;
}

// Instruction par instruction : un SELECT sans résultat garde ses colonnes (db.exec renverrait []).
function lancer(db, sql) {
	let resultat = null, modifiees = 0;
	for (const stmt of db.iterateStatements(sql)) {
		try {
			const colonnes = stmt.getColumnNames(), lignes = [];
			while (stmt.step()) lignes.push(stmt.get());
			if (colonnes.length) resultat = { colonnes, lignes };
			else modifiees += db.getRowsModified();
		} finally {
			stmt.free();
		}
	}
	return { resultat, modifiees };
}

// Dernier tableau renvoyé (ou résultat du contrôle après une écriture) et nombre de lignes modifiées.
export function executer(SQL, script, requete, controle) {
	const db = nouvelleBase(SQL, script);
	try {
		const { resultat, modifiees } = lancer(db, requete);
		const affiche = controle ? lancer(db, controle).resultat : resultat;
		return { ...(affiche ?? { colonnes: [], lignes: [] }), modifiees, ecriture: !resultat };
	} finally {
		db.close();
	}
}

// Les noms de colonnes (alias) ne comptent pas ; l'ordre des lignes seulement si la demande impose un tri.
export function comparer(obtenu, attendu, ordre) {
	if (obtenu.colonnes.length !== attendu.colonnes.length)
		return { ok: false, motif: `${obtenu.colonnes.length} colonne(s) obtenue(s), ${attendu.colonnes.length} attendue(s) : relisez ce que la demande veut afficher.` };
	const cles = (t) => t.lignes.map((l) => JSON.stringify(l.map(cellule)));
	const a = cles(obtenu), b = cles(attendu);
	if (a.length !== b.length)
		return { ok: false, motif: `${a.length} ligne(s) obtenue(s), ${b.length} attendue(s) : vérifiez le filtre.` };
	const memes = ordre ? a.every((k, i) => k === b[i]) : [...a].sort().join() === [...b].sort().join();
	if (memes) return { ok: true };
	if (ordre && [...a].sort().join() === [...b].sort().join())
		return { ok: false, motif: 'Les bonnes lignes, mais pas dans le bon ordre : vérifiez le tri.' };
	return { ok: false, motif: 'Le nombre de lignes est juste, mais pas leur contenu : vérifiez les colonnes et les conditions.' };
}

const MOTS_CLES = new Set(('select from where and or not in is null like between order by asc desc distinct limit offset as join inner left right outer on ' +
	'group having count sum avg min max insert into values update set delete create table primary key foreign references unique default case when then else end union all exists').split(' '));
const ECHAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
const echapper = (t) => t.replace(/[&<>]/g, (c) => ECHAP[c]);

// Coloration : HTML échappé, une <span class="sql-…"> par jeton. `noms` : tables et colonnes de la base (en minuscules).
export function colorer(code, noms = new Set()) {
	const html = code.replace(/(--[^\n]*)|('(?:[^']|'')*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w]*)|([^-'\w]+|-)/g, (t, com, txt, nb, mot) => {
		const classe = com ? 'com' : txt ? 'txt' : nb ? 'nb' : mot && MOTS_CLES.has(mot.toLowerCase()) ? 'mot' : mot && noms.has(mot.toLowerCase()) ? 'nom' : '';
		return classe ? `<span class="sql-${classe}">${echapper(t)}</span>` : echapper(t);
	});
	return code.endsWith('\n') || !code ? html + ' ' : html; // une dernière ligne vide doit garder sa hauteur
}

const ERREURS = [
	[/no such table: (\S+)/, (m) => `La table « ${m[1]} » n'existe pas. Vérifiez son nom dans le schéma.`],
	[/no such column: (\S+)/, (m) => `La colonne « ${m[1]} » n'existe pas dans les tables utilisées. Vérifiez le schéma.`],
	[/near "([^"]*)": syntax error/, (m) => `Erreur de syntaxe près de « ${m[1]} ». Vérifiez l'ordre des mots-clés, les virgules et les guillemets.`],
	[/incomplete input/, () => 'La requête est incomplète : il manque la fin (une valeur, une parenthèse, une apostrophe ?).'],
	[/FOREIGN KEY constraint failed/, () => "Refusé par une clé étrangère : la ligne visée n'existe pas, ou d'autres lignes en dépendent."],
	[/UNIQUE constraint failed: (\S+)/, (m) => `Refusé : la valeur de ${m[1]} existe déjà et doit être unique.`],
	[/NOT NULL constraint failed: (\S+)/, (m) => `Refusé : ${m[1]} est obligatoire (NOT NULL).`],
	[/ambiguous column name: (\S+)/, (m) => `La colonne « ${m[1]} » existe dans plusieurs tables : précisez laquelle (table.colonne).`],
];

export function traduireErreur(message) {
	for (const [motif, texte] of ERREURS) {
		const m = message.match(motif);
		if (m) return texte(m);
	}
	return message;
}
