// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const { supports } = JSON.parse(readFileSync('./contenu/manifeste.json', 'utf-8'));
const MATIERES = { nsi: 'NSI', sio: 'BTS SIO', mastere: 'Mastère' };
/** @param {string} m */
const classes = (m) => [...new Set(supports.filter((/** @type {any} */ s) => s.matiere === m).map((/** @type {any} */ s) => s.classe))].sort();

export default defineConfig({
	// Pages en .html : mêmes URL que l'ancien site, liens relatifs des supports intacts.
	build: { format: 'preserve' },
	integrations: [
		starlight({
			title: 'Supports de cours',
			description: 'Supports de cours de Stanis Humez',
			locales: { root: { label: 'Français', lang: 'fr' } },
			head: [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } }],
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
			customCss: ['./src/styles/site.css'],
			// Barre latérale de l'accueil ; chaque classe a la sienne (src/lib/manifeste.ts).
			sidebar: Object.entries(MATIERES)
				.filter(([m]) => classes(m).length)
				.map(([m, label]) => ({
					label,
					items: classes(m).map((c) => ({ label: c.toUpperCase(), link: `/${m}/${c}/` })),
				})),
		}),
	],
});
