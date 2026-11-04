---
type: support
title: "Empreinte et preuve électronique"
annee: 2026-2027
groupe: 1sio
matiere: SIO
publie: true
date: 2026-11-05
sequence: SQ03
parties: [P03]
nature: Cours
composant: Markdown
---


Soft-Tech envoie un devis. Comment le destinataire peut-il vérifier qu'il a reçu le
même fichier ? Et comment peut-il savoir de qui il vient ?

## Une empreinte pour comparer

Une fonction de hachage calcule, à partir de tous les octets d'un fichier, une
empreinte de taille fixe. SHA-256 produit 256 bits, souvent écrits avec 64 chiffres
hexadécimaux. Avec le même algorithme, les mêmes octets donnent la même empreinte.
Une petite modification produit généralement une empreinte très différente.

Comparer l'empreinte calculée à une **référence fiable** permet de vérifier l'intégrité
du fichier par rapport à cette référence. Comparez la valeur entière et utilisez le
même algorithme. Deux empreintes différentes montrent que les contenus diffèrent ;
une égalité avec SHA-256 donne une assurance très forte, mais théoriquement deux
fichiers différents peuvent avoir la même empreinte : c'est une collision.

## La limite de l'empreinte

Une empreinte seule ne prouve pas qui a produit le document. Une personne qui peut
remplacer à la fois le fichier et sa référence peut recalculer l'empreinte. Un canal
distinct peut aider à obtenir une référence fiable, mais il faut aussi vérifier son
authenticité : un site officiel compromis ne garantit pas une référence fiable.

Hacher n'est pas chiffrer : l'empreinte sert à comparer, pas à retrouver le contenu
avec une clé. Une empreinte ne rend pas non plus le fichier confidentiel.

## Ce qu'ajoute la signature

Une signature numérique vérifiée permet de détecter une modification et de relier le
document à une clé de signature. Pour attribuer le document à une personne ou une
organisation, il faut aussi établir de façon fiable à qui appartient cette clé et
s'assurer qu'elle n'a pas été compromise. Une image de signature ou un logo ne suffisent
pas. La valeur juridique d'une signature dépend du contexte et des moyens employés.

## Vérifiez votre compréhension

1. Une empreinte identique à une référence suffit-elle si cette référence vient du même
   message suspect que le fichier ? Pourquoi ?
2. Peut-on retrouver le contenu du fichier en « déchiffrant » son empreinte ?
3. Une signature valide permet-elle à elle seule d'identifier le signataire sans
   vérifier à qui appartient la clé ?
4. Deux empreintes SHA-256 différentes pour deux fichiers : que peut-on conclure ?

En activité, vous comparerez deux devis et formulerez une conclusion avec ses limites.
