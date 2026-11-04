---
type: support
title: "VPI : reprendre l'audit et corriger le site"
annee: 2026-2027
groupe: 1sio
matiere: SIO
publie: true
date: 2026-11-05
sequence: fil-rouge-vpi
parties: [J0]
nature: Activité
composant: Markdown
fichiers: site-livre-ia.zip
---


VPI, entreprise fictive, a confié son site à Soft-Tech. Un agent IA a produit les
fichiers. Votre mission est de vérifier le livrable avant toute mise en ligne. Vous
pouvez suivre cette activité même si vous n'avez pas travaillé sur le site chez vous.

En binôme, sans IA : manipulez chacun votre tour et conservez une trace individuelle.
Téléchargez et décompressez l'archive jointe. Le dossier comprend `index.html`,
`style.css`, `script.js` et `LIVRAISON.md`. N'utilisez que des données inventées.

## En classe entière : constater et prioriser

1. Lisez la livraison et ouvrez la page. Cherchez dans les fichiers un secret qui
   n'aurait pas dû être livré ; notez le fichier et l'élément trouvé, sans le recopier.
2. Ouvrez les outils de développement du navigateur, onglet **Réseau**, et rechargez.
   Quels domaines extérieurs sont contactés ? Une requête échouée reste un indice
   d'une tentative de connexion. Si le réseau bloque l'accès, cherchez aussi dans le code.
3. Repérez ce que le formulaire demande et comment il est envoyé ; examinez aussi le
   stockage local et la console. N'utilisez aucune donnée réelle.
4. Notez au moins deux lignes : **constat → preuve précise → risque → correction**.
   Proposez deux corrections prioritaires et justifiez-les.

## En demi-groupe : corriger une copie

1. Dupliquez le dossier en `site-corrige`. Supprimez les secrets fictifs du code.
   Si de vrais secrets avaient été exposés, quelle action supplémentaire faudrait-il
   entreprendre auprès du service concerné ?
2. Dans `script.js`, supprimez l'enregistrement des données du formulaire dans le
   stockage local et leur affichage dans la console, ainsi que le préremplissage associé.
   Effacez les anciennes données de test dans le stockage du navigateur, rechargez et
   vérifiez avec de nouvelles données fictives. Notez où vous avez vérifié.
3. Supprimez le chargement de Google Analytics et le code qui l'utilise, ainsi que les
   polices Google. Utilisez une police système. Rechargez avec l'onglet Réseau ouvert et
   vérifiez les domaines contactés. Des tiers peuvent encore rester : identifiez-les.
4. Examinez les champs du formulaire : retirez ceux qui ne sont pas nécessaires pour
   répondre à une demande de contact. Distinguez une demande de contact d'une éventuelle
   inscription à une newsletter.

Pour chaque correction, conservez une preuve : fichier et ligne, observation dans le
navigateur ou résultat du test. Le formulaire est une démonstration locale : changer
son adresse ou écrire HTTPS ne crée pas un service de réception fonctionnel et ne
suffit pas à établir sa conformité. Ne transmettez aucune donnée réelle.

## Restitution

Présentez deux corrections et leurs preuves. Individuellement, expliquez pour chacune
le risque réduit et une limite qui reste à traiter. Conservez votre copie pour la suite.
Si vous avez terminé, consultez la fiche J0 initiale pour la carte et le menu mobile.
