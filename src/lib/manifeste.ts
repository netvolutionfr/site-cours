// Lecture du contenu exporté par Prof (`outils/site export`). Ne jamais éditer contenu/ à la main.
import data from '../../contenu/manifeste.json';

export interface Titre { depth: number; slug: string; text: string }
export interface Support {
	slug: string; matiere: string; classe: string; rubrique: string; sequence: string;
	titre: string; sousTitre: string; nature: string; date: string | null;
	pdf: string | null; pieces: string[]; lien: string | null; titres: Titre[];
}
export interface Sequence {
	id: string; matiere: string; classe: string; rubrique: string; rubriqueLibelle: string;
	code: string; titre: string; debut: string | null; fin: string | null; supports: string[];
}

export const annee: string = data.annee;
export const supports = data.supports as Support[];
export const sequences = data.sequences as Sequence[];
export const parSlug = new Map(supports.map((s) => [s.slug, s]));
export const parSequence = new Map(sequences.map((q) => [q.id, q]));

export const MATIERES: Record<string, string> = { nsi: 'NSI', sio: 'BTS SIO', mastere: 'Mastère' };

export function classes() {
	const vues = new Map<string, { matiere: string; classe: string; supports: Support[] }>();
	for (const s of supports) {
		const cle = `${s.matiere}/${s.classe}`;
		if (!vues.has(cle)) vues.set(cle, { matiere: s.matiere, classe: s.classe, supports: [] });
		vues.get(cle)!.supports.push(s);
	}
	return [...vues.values()].sort((a, b) =>
		Object.keys(MATIERES).indexOf(a.matiere) - Object.keys(MATIERES).indexOf(b.matiere) || a.classe.localeCompare(b.classe));
}

// URL historiques (…/SQ03-P03-dom.html) : liens relatifs entre supports et favoris des élèves.
export const lienSupport = (s: Support) => s.lien ?? `/${s.slug}.html`;

const VARIANTES: Record<string, 'success' | 'note' | 'tip' | 'caution' | 'danger' | 'default'> = {
	'Cours complet': 'success', Diaporama: 'note', Cours: 'tip', Activité: 'caution', 'À distance': 'danger',
};
export const variante = (nature: string) => VARIANTES[nature] ?? 'default';

const jour = (iso: string) => new Date(`${iso}T12:00:00`);
export const jourFr = (iso: string, avecAnnee = false) =>
	jour(iso).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', ...(avecAnnee && { year: 'numeric' }) });

export function periode(q: Sequence) {
	if (!q.debut || !q.fin) return '';
	return q.debut === q.fin ? jourFr(q.debut, true) : `${jourFr(q.debut)} → ${jourFr(q.fin, true)}`;
}

/** Lundi de la semaine (ISO) d'une date. */
export function lundi(iso: string) {
	const d = jour(iso);
	d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
	return d.toISOString().slice(0, 10);
}

/** Barre latérale d'une classe : ses vues, puis ses séquences (regroupées par rubrique s'il y en a plusieurs). */
export function sidebarClasse(matiere: string, classe: string) {
	const base = `/${matiere}/${classe}/`;
	const seqs = sequences.filter((q) => q.matiere === matiere && q.classe === classe);
	const groupe = (q: Sequence) => ({
		label: q.titre,
		collapsed: true,
		items: q.supports.map((slug) => {
			const s = parSlug.get(slug)!;
			return { label: s.titre, link: lienSupport(s), badge: { text: s.nature, variant: variante(s.nature) } };
		}),
	});
	const rubriques = [...new Set(seqs.map((q) => q.rubrique))];
	return [
		{ label: '← Toutes les classes', link: '/' },
		{ label: 'Par séquence', link: base },
		{ label: 'Chronologie', link: `${base}chronologie.html` },
		...(rubriques.length > 1
			? rubriques.map((r) => ({
				label: seqs.find((q) => q.rubrique === r)!.rubriqueLibelle,
				items: seqs.filter((q) => q.rubrique === r).map(groupe),
			}))
			: seqs.map(groupe)),
	];
}
