// Ateliers Pyxel (composant Pyxel), indexés par le nom du support Prof qui porte `composant: Pyxel`.
// L'élève écrit une ou plusieurs fonctions, les teste dans le worker Pyodide, puis le moteur fourni
// (ajouté après son code) les appelle dans le jeu.

export type AtelierPyxel = {
	id: string; // ancre du titre et nom du fichier téléchargé
	titre: string;
	consigne: string; // HTML court
	commandes: string; // rappel des touches, affiché sous l'écran
	depart: string;
	tests: string[];
	moteur: string;
};

const HEROS = `HEROS = [
    "00088000",
    "00888800",
    "00ffff00",
    "0f1ff1f0",
    "00ffff00",
    "08888880",
    "00c00c00",
    "00c00c00",
]`;

export const ateliersPyxel: Record<string, AtelierPyxel> = {
	'atelier-pyxel-deplacer-heros': {
		id: 'deplacer',
		titre: 'Déplacer le héros',
		consigne: 'Complétez <code>deplacer</code>, vérifiez les tests, puis lancez le jeu. Flèches gauche et droite pour déplacer le héros.',
		commandes: "Cliquez dans l'écran de jeu pour démarrer. Après une modification, « Lancer le jeu » relance avec votre nouveau code.",
		depart: `def deplacer(x, direction):
    """Renvoie la nouvelle abscisse du héros.
    x : abscisse actuelle, entier entre 0 et 120
    direction : -1 (gauche), 0 (immobile) ou 1 (droite)
    Le héros avance de 2 pixels sans sortir de l'écran.
    """
    return x + ...
`,
		tests: ['deplacer(60, 0) == 60', 'deplacer(60, 1) == 62', 'deplacer(60, -1) == 58', 'deplacer(0, -1) == 0', 'deplacer(1, -1) == 0', 'deplacer(120, 1) == 120', 'deplacer(119, 1) == 120'],
		moteur: `
import pyxel

${HEROS}

class Jeu:
    def __init__(self):
        pyxel.init(128, 128, title="Atelier")
        pyxel.images[0].set(0, 0, HEROS)
        self.x = 60
        pyxel.run(self.update, self.draw)

    def update(self):
        direction = 0
        if pyxel.btn(pyxel.KEY_LEFT):
            direction -= 1
        if pyxel.btn(pyxel.KEY_RIGHT):
            direction += 1
        self.x = deplacer(self.x, direction)

    def draw(self):
        pyxel.cls(1)
        pyxel.rect(0, 108, 128, 20, 3)
        pyxel.blt(self.x, 100, 0, 0, 0, 8, 8, 0)
        pyxel.text(4, 4, f"x = {self.x}", 7)

Jeu()
`,
	},

	'atelier-pyxel-compteur-8-bits': {
		id: 'compteur',
		titre: 'Le compteur 8 bits',
		consigne:
			"Le score du jeu est rangé sur <strong>8 bits</strong>, comme dans les bornes d'arcade des années 1980. Complétez <code>ajouter_8_bits</code> et <code>octet</code>, vérifiez les tests, puis lancez le jeu. Attrapez les pièces (petite : 10 points, grosse : 50) et regardez les voyants. Que se passe-t-il au-delà de 255 ?",
		commandes: "Cliquez dans l'écran de jeu pour démarrer, puis flèches gauche et droite. Après une modification, « Lancer le jeu » relance avec votre nouveau code.",
		depart: `def ajouter_8_bits(score, points):
    """Renvoie le score après l'ajout de points, sur 8 bits.
    score : entier entre 0 et 255
    points : entier positif
    Comme un compteur de 8 bits, le résultat repart de 0 après 255.
    """
    return ...


def octet(n):
    """Renvoie l'écriture binaire de n sur exactement 8 caractères.
    n : entier entre 0 et 255
    Exemple : octet(5) renvoie "00000101".
    """
    resultat = ""
    for i in range(8):
        resultat = str(...) + resultat
        n = ...
    return resultat
`,
		tests: [
			'ajouter_8_bits(0, 10) == 10',
			'ajouter_8_bits(250, 5) == 255',
			'ajouter_8_bits(250, 6) == 0',
			'ajouter_8_bits(200, 100) == 44',
			'octet(0) == "00000000"',
			'octet(5) == "00000101"',
			'octet(200) == "11001000"',
			'octet(255) == "11111111"',
			'octet(ajouter_8_bits(255, 1)) == "00000000"',
		],
		moteur: `
import pyxel

${HEROS}

class Jeu:
    def __init__(self):
        pyxel.init(128, 128, title="Compteur 8 bits")
        pyxel.images[0].set(0, 0, HEROS)
        self.x = 60
        self.score = 0
        self.alerte = 0
        self.pieces = []
        pyxel.run(self.update, self.draw)

    def update(self):
        if pyxel.btn(pyxel.KEY_LEFT):
            self.x = max(0, self.x - 2)
        if pyxel.btn(pyxel.KEY_RIGHT):
            self.x = min(120, self.x + 2)
        if pyxel.frame_count % 25 == 0:
            valeur = 50 if pyxel.rndi(0, 3) == 0 else 10
            self.pieces.append([pyxel.rndi(4, 120), 34, valeur])
        restantes = []
        for piece in self.pieces:
            piece[1] += 1
            if 98 <= piece[1] <= 108 and self.x - 3 <= piece[0] <= self.x + 11:
                avant = self.score
                self.score = ajouter_8_bits(self.score, piece[2])
                if self.score < avant:
                    self.alerte = 75
            elif piece[1] < 112:
                restantes.append(piece)
        self.pieces = restantes
        if self.alerte > 0:
            self.alerte -= 1

    def draw(self):
        pyxel.cls(1)
        pyxel.rect(0, 108, 128, 20, 3)
        bits = octet(self.score)
        if len(bits) == 8:
            for i in range(8):
                couleur = 10 if bits[i] == "1" else 5
                pyxel.rect(7 + i * 15, 4, 10, 10, couleur)
                pyxel.text(7 + i * 15, 16, str(2 ** (7 - i)), 7)
        else:
            pyxel.text(4, 6, "octet doit renvoyer 8 caracteres", 8)
        pyxel.text(4, 25, f"score = {self.score}   octet = {bits}", 7)
        for x, y, valeur in self.pieces:
            pyxel.circ(x, y, 4 if valeur == 50 else 2, 10 if valeur == 50 else 9)
        pyxel.blt(self.x, 100, 0, 0, 0, 8, 8, 0)
        if self.alerte > 0:
            pyxel.rect(24, 54, 80, 16, 0)
            pyxel.text(38, 60, "DEPASSEMENT !", 8 if pyxel.frame_count % 10 < 5 else 7)

Jeu()
`,
	},
};

export const titresPyxel = (nom: string) => {
	const a = ateliersPyxel[nom];
	return a ? [{ depth: 2, slug: a.id, text: a.titre }] : [];
};
