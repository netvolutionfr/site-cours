// Ateliers SQL (composant Sql), indexés par le nom du support Prof qui porte `composant: Sql`.
// ponytail: solutions incluses dans la page (visibles au code source) : correct pour du formatif, jamais pour une évaluation notée.
import boutique from './boutique.sql?raw';

export type Exercice = {
	id: string;
	titre: string;
	demande: string; // HTML court : la demande de l'équipe, pas une consigne abstraite
	depart?: string; // requête fournie (Prédire, Exécuter, Examiner) ou à compléter
	attendu: string; // requête de référence
	ordre?: boolean; // l'ordre des lignes compte (ORDER BY demandé)
	controle?: string; // pour INSERT/UPDATE/DELETE : requête relancée après l'écriture
	indices?: string[];
	defi?: boolean; // défi de sortie : sert aussi de point de reprise
};

export type Atelier = { intro: string; base: string; exercices: Exercice[] };

export const ateliers: Record<string, Atelier> = {
	'SQ04-P02-atelier-select': {
		base: boutique,
		intro:
			"Vous travaillez pour la boutique. Chaque exercice est une demande de l'équipe. Avant de vérifier, notez le nombre de lignes que vous attendez : l'écart éventuel vous dira où chercher. Travaillez seul et sans IA. Si le défi final passe du premier coup, passez à la partie suivante.",
		exercices: [
			{
				id: 'catalogue',
				titre: '1. Lire une requête',
				demande:
					'Le préparateur veut la liste des produits avec leur prix. <strong>Avant d\'exécuter</strong> la requête fournie : combien de lignes et de colonnes va-t-elle afficher ? Ouvrez « Données de la base » pour lire la table <code>produits</code>.',
				depart: 'SELECT nom, prix\nFROM produits;',
				attendu: 'SELECT nom, prix FROM produits;',
			},
			{
				id: 'stocks',
				titre: '2. Choisir ses colonnes',
				demande: 'Modifiez la requête : le préparateur veut maintenant le <strong>nom</strong>, la <strong>plateforme</strong> et le <strong>stock</strong> de chaque produit.',
				depart: 'SELECT nom, prix\nFROM produits;',
				attendu: 'SELECT nom, plateforme, stock FROM produits;',
				indices: ['Seule la ligne SELECT change.', 'Les colonnes sont séparées par des virgules.'],
			},
			{
				id: 'switch',
				titre: '3. Filtrer les lignes',
				demande: 'Un client cherche ce qui existe sur <strong>Switch</strong> : affichez le nom et le prix de ces produits.',
				depart: "SELECT nom, prix\nFROM produits\nWHERE plateforme = '...';",
				attendu: "SELECT nom, prix FROM produits WHERE plateforme = 'Switch';",
				indices: ['Un texte s\'écrit entre apostrophes.', "La valeur doit être écrite exactement comme dans la table : regardez la colonne plateforme."],
			},
			{
				id: 'petits-prix',
				titre: '4. Comparer des nombres',
				demande: 'La responsable marketing prépare une rubrique « petits prix » : nom et prix des produits à <strong>moins de 20 €</strong>.',
				attendu: 'SELECT nom, prix FROM produits WHERE prix < 20;',
				indices: ['Un nombre s\'écrit sans apostrophes.', '« Moins de 20 » : 20 exclu.'],
			},
			{
				id: 'ruptures',
				titre: '5. Repérer les ruptures',
				demande: 'La gérante veut savoir quels produits sont <strong>en rupture de stock</strong> : affichez seulement leur nom.',
				attendu: 'SELECT nom FROM produits WHERE stock = 0;',
			},
			{
				id: 'jeux-ps5',
				titre: '6. Deux conditions à la fois',
				demande: 'Un client veut un <strong>jeu</strong> (catégorie <code>jeu</code>) sur <strong>PS5</strong> à <strong>moins de 30 €</strong>. Affichez nom et prix.',
				attendu: "SELECT nom, prix FROM produits WHERE categorie = 'jeu' AND plateforme = 'PS5' AND prix < 30;",
				indices: ['Trois conditions, toutes obligatoires.', 'AND : la ligne doit vérifier chaque condition.'],
			},
			{
				id: 'retro',
				titre: "7. L'une ou l'autre",
				demande: 'Pour un salon rétro, la boutique expose tout ce qui concerne la <strong>Game Boy</strong> ou la <strong>Mega Drive</strong>. Affichez nom et plateforme.',
				attendu: "SELECT nom, plateforme FROM produits WHERE plateforme = 'Game Boy' OR plateforme = 'Mega Drive';",
				indices: ['Un produit ne peut pas être sur deux plateformes à la fois : AND ne renverra rien.'],
			},
			{
				id: 'mario',
				titre: '8. Chercher un mot',
				demande: 'Un client tape « Mario » dans la barre de recherche du site. Écrivez la requête qui renvoie le nom des produits dont le nom <strong>contient</strong> « Mario ».',
				attendu: "SELECT nom FROM produits WHERE nom LIKE '%Mario%';",
				indices: ['= cherche une valeur exacte. LIKE accepte un motif.', '% remplace « n\'importe quelle suite de caractères ».'],
			},
			{
				id: 'tri',
				titre: '9. Trier',
				demande: 'La page catalogue affiche les produits <strong>du plus cher au moins cher</strong> : nom et prix.',
				attendu: 'SELECT nom, prix FROM produits ORDER BY prix DESC;',
				ordre: true,
				indices: ['ORDER BY se place à la fin de la requête.', 'Par défaut, le tri est croissant (ASC).'],
			},
			{
				id: 'villes',
				titre: '10. Sans doublon',
				demande: 'Pour planifier des livraisons groupées, la gérante veut la liste des <strong>villes</strong> des clients, chacune une seule fois.',
				attendu: 'SELECT DISTINCT ville FROM clients;',
				indices: ['Un mot-clé, juste après SELECT, supprime les lignes identiques.', 'Une ligne vide (NULL) apparaît : quel client n\'a pas renseigné sa ville ?'],
			},
			{
				id: 'defi',
				titre: '11. Défi de sortie',
				demande:
					"Pour une opération de fidélité, la gérante veut le nom, le prénom et l'e-mail des clients de <strong>Lille</strong> inscrits <strong>depuis le 1er janvier 2026</strong>, triés par nom. Les dates s'écrivent <code>'AAAA-MM-JJ'</code>.",
				attendu: "SELECT nom, prenom, email FROM clients WHERE ville = 'Lille' AND date_inscription >= '2026-01-01' ORDER BY nom;",
				ordre: true,
				defi: true,
			},
		],
	},
	'SQ04-P02-P03-atelier-select-agregats': {
		base: boutique,
		intro:
			"Même boutique, nouvelles demandes. Les quatre premières reprennent la sélection sur une table ; les suivantes demandent des chiffres plutôt que des listes. Avant de vérifier, notez le nombre de lignes attendu et, pour un calcul, écrivez sur papier la valeur que vous prévoyez. Travaillez seul et sans IA.",
		exercices: [
			{
				id: 'consoles',
				titre: '1. Consoles disponibles',
				demande: 'Un client cherche une console <strong>en stock</strong>. Affichez le nom et le prix des consoles disponibles, de la <strong>moins chère à la plus chère</strong>.',
				attendu: "SELECT nom, prix FROM produits WHERE categorie = 'console' AND stock > 0 ORDER BY prix;",
				ordre: true,
				indices: ['Deux conditions : la catégorie et le stock.', '« Disponible » : au moins un exemplaire.'],
			},
			{
				id: 'retro',
				titre: '2. Les parenthèses comptent',
				demande: 'Pour une vitrine rétro, la gérante veut les <strong>jeux</strong> (pas les consoles) sur <strong>Game Boy</strong> ou sur <strong>Super Nintendo</strong> : nom et plateforme.',
				attendu: "SELECT nom, plateforme FROM produits WHERE categorie = 'jeu' AND (plateforme = 'Game Boy' OR plateforme = 'Super Nintendo');",
				indices: ["Une console apparaît dans votre résultat ? Relisez l'ordre dans lequel AND et OR s'appliquent.", 'AND passe avant OR, comme × avant + : des parenthèses regroupent les deux plateformes.'],
			},
			{
				id: 'octobre',
				titre: "3. Les commandes d'octobre",
				demande: "Le comptable veut les commandes passées en <strong>octobre 2026</strong> : numéro, date et statut, dans l'ordre chronologique.",
				attendu: "SELECT id, date_commande, statut FROM commandes WHERE date_commande >= '2026-10-01' AND date_commande < '2026-11-01' ORDER BY date_commande;",
				ordre: true,
				indices: ["Une date s'écrit 'AAAA-MM-JJ' et se compare comme un nombre.", 'Deux bornes : à partir du 1er octobre, avant le 1er novembre.'],
			},
			{
				id: 'sans-ville',
				titre: '4. La case vide',
				demande: "Pour les livraisons, il faut relancer les clients qui n'ont <strong>pas renseigné leur ville</strong> : nom et prénom.",
				attendu: 'SELECT nom, prenom FROM clients WHERE ville IS NULL;',
				indices: ["Une case vide vaut NULL : ce n'est ni 0 ni un texte vide.", 'WHERE ville = NULL ne renvoie rien : on écrit WHERE ville IS NULL.'],
			},
			{
				id: 'livrees',
				titre: '5. Compter au lieu de lister',
				demande: "La gérante ne veut plus la liste des commandes livrées, seulement <strong>leur nombre</strong>. Avant d'exécuter la requête fournie : combien de lignes va-t-elle afficher ? Quelle valeur ?",
				depart: "SELECT COUNT(*)\nFROM commandes\nWHERE statut = 'livrée';",
				attendu: "SELECT COUNT(*) FROM commandes WHERE statut = 'livrée';",
			},
			{
				id: 'lille',
				titre: '6. Clients lillois',
				demande: 'Combien la boutique a-t-elle de clients à <strong>Lille</strong> ?',
				attendu: "SELECT COUNT(*) FROM clients WHERE ville = 'Lille';",
				indices: ['Le WHERE choisit les lignes, COUNT(*) les compte.'],
			},
			{
				id: 'villes-renseignees',
				titre: '7. Compter une colonne',
				demande: 'Combien de clients ont <strong>renseigné leur ville</strong> ? Une seule requête, sans WHERE.',
				attendu: 'SELECT COUNT(ville) FROM clients;',
				indices: ['COUNT(*) compte les lignes ; COUNT(une_colonne) ne compte que les cases non vides.', "Comparez avec l'exercice 4."],
			},
			{
				id: 'stock-accessoires',
				titre: '8. Additionner',
				demande: "Combien d'<strong>accessoires</strong> (toutes références confondues) y a-t-il en stock ?",
				attendu: "SELECT SUM(stock) FROM produits WHERE categorie = 'accessoire';",
				indices: ["On ne compte pas des lignes : on additionne les valeurs d'une colonne.", "COUNT donnerait le nombre de références, pas le nombre d'exemplaires."],
			},
			{
				id: 'moyenne-game-boy',
				titre: '9. Moyenne',
				demande: 'Quel est le <strong>prix moyen</strong> des <strong>jeux Game Boy</strong> ?',
				attendu: "SELECT AVG(prix) FROM produits WHERE categorie = 'jeu' AND plateforme = 'Game Boy';",
			},
			{
				id: 'fourchette',
				titre: '10. Fourchette de prix',
				demande: 'Pour la page « Consoles », affichez sur une seule ligne le prix de la console <strong>la moins chère</strong> et celui de <strong>la plus chère</strong>, en stock ou non.',
				attendu: "SELECT MIN(prix), MAX(prix) FROM produits WHERE categorie = 'console';",
				indices: ['Deux agrégats dans le même SELECT, séparés par une virgule.'],
			},
			{
				id: 'plateformes',
				titre: '11. Combien de plateformes ?',
				demande: 'Sur combien de <strong>plateformes différentes</strong> la boutique vend-elle des produits ?',
				attendu: 'SELECT COUNT(DISTINCT plateforme) FROM produits;',
				indices: ['COUNT(plateforme) compte 20 cases : chaque plateforme y est plusieurs fois.', 'Le mot-clé « sans doublon » de la semaine dernière se place dans les parenthèses.'],
			},
			{
				id: 'defi',
				titre: '12. Défi de sortie',
				demande:
					"Pour l'assurance, la gérante doit déclarer la <strong>valeur du stock des jeux Switch</strong> : pour chaque jeu, son prix multiplié par le nombre d'exemplaires en stock, le tout additionné. Une seule requête, une seule valeur.",
				attendu: "SELECT SUM(prix * stock) FROM produits WHERE categorie = 'jeu' AND plateforme = 'Switch';",
				indices: ['Un calcul peut se placer dans un agrégat : SUM(colonne * colonne).', "Si le moteur affiche 778.1999…, c'est un arrondi de calcul : ROUND(…, 2) l'arrange."],
				defi: true,
			},
			{
				id: 'jointure',
				titre: 'Extension. Deux tables',
				demande:
					'Le service client veut les commandes <strong>non livrées</strong> avec le <strong>nom du client</strong> : numéro de commande, nom, prénom et statut. La table <code>commandes</code> ne connaît que <code>client_id</code> : il faut la relier à <code>clients</code>.',
				depart: 'SELECT commandes.id, clients.nom, clients.prenom, commandes.statut\nFROM commandes\nJOIN clients ON ...\nWHERE ...;',
				attendu: "SELECT commandes.id, clients.nom, clients.prenom, commandes.statut FROM commandes JOIN clients ON commandes.client_id = clients.id WHERE commandes.statut <> 'livrée';",
				indices: ['ON indique quelle colonne de commandes correspond à quelle colonne de clients : suivez la clé étrangère.', "« Différent de » s'écrit <> en SQL."],
			},
		],
	},
};

export const titresAtelier = (nom: string) =>
	(ateliers[nom]?.exercices ?? []).map((e) => ({ depth: 2, slug: `sql-${e.id}`, text: e.titre }));
