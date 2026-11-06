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
					'Le préparateur veut la liste des produits avec leur prix. <strong>Avant d\'exécuter</strong> la requête fournie : combien de lignes et de colonnes va-t-elle afficher ? Aidez-vous du schéma.',
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
};

export const titresAtelier = (nom: string) =>
	(ateliers[nom]?.exercices ?? []).map((e) => ({ depth: 2, slug: `sql-${e.id}`, text: e.titre }));
