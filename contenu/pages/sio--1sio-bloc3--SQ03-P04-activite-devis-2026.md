---
type: support
title: "Vérifier deux devis Soft-Tech"
annee: 2026-2027
groupe: 1sio
matiere: SIO
publie: true
date: 2026-11-05
sequence: SQ03
parties: [P04]
nature: Activité
composant: Markdown
fichiers: devis-soft-tech-eleve.zip
---


**En binôme, 55 minutes ; réponse individuelle.** Sans IA ni recherche extérieure.
Téléchargez et décompressez l'archive jointe. Elle contient deux devis et l'empreinte
SHA-256 de référence annoncée par Soft-Tech. Dans ce scénario, supposez d'abord que
la référence est authentique ; nous discuterons ensuite cette hypothèse.

## 1. Comparer (20 min)

Ouvrez un terminal dans le dossier extrait. Sur Linux :

```sh
sha256sum devis-2026-0912-a.pdf devis-2026-0912-b.pdf
```

Sur Windows, dans PowerShell :

```powershell
Get-FileHash .\devis-2026-0912-a.pdf -Algorithm SHA256
Get-FileHash .\devis-2026-0912-b.pdf -Algorithm SHA256
```

1. Avant de calculer, prévoyez ce que montreront les résultats si les fichiers diffèrent.
2. Comparez **les 64 caractères** de chaque résultat à `empreinte-publiee.txt` (la
   différence entre majuscules et minuscules ne change pas la valeur hexadécimale).
3. Quel devis correspond à la référence ? Relevez le début de chaque empreinte dans
   votre réponse et expliquez votre méthode de comparaison complète.
4. Ouvrez les PDF : qu'est-ce qui change ? Que constatez-vous sur les empreintes ?

## 2. Raisonner (15 min)

1. Si le fichier et son empreinte arrivent dans le même courriel suspect, pourquoi la
   comparaison ne suffit-elle pas à établir leur authenticité ?
2. La référence est publiée sur le site de Soft-Tech. Quelle vérification reste
   nécessaire avant de lui faire confiance ?
3. Que permet une signature numérique valide ? Pourquoi faut-il également vérifier
   à qui appartient la clé utilisée ?
4. Revenez à la fausse facture : quelle vérification le client pourrait-il faire avant
   de payer ? Quelle autre précaution indépendante pourrait-il prendre ?

## 3. Restituer (15 min)

Préparez une réponse de deux phrases au client : quel fichier correspond à la
référence et sous quelle hypothèse ? Une empreinte établit-elle à elle seule l'origine ?
Chaque membre du binôme doit pouvoir expliquer la comparaison et sa limite.
