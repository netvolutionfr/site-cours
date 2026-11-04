---
type: support
title: "Auditer un site livré par une IA"
annee: 2026-2027
groupe: 1sio
matiere: SIO
publie: true
date: 2026-11-05
sequence: fil-rouge-vpi
parties: [J0]
nature: Cours
composant: Markdown
fichiers: site-livre-ia.zip
---


## La situation

**Vermand Prévention Ingénierie (VPI)**, entreprise fictive, a demandé un site vitrine
à Soft-Tech. Un alternant a utilisé un agent IA pour produire le site. La responsable
qualité demande : **peut-on le mettre en ligne en l'état ?**

L'enseignant présente le site au vidéoprojecteur. Vous n'avez pas besoin d'ordinateur :
observez, proposez des réponses et gardez une feuille pour les questions et le bilan.
La fiche et l'archive restent disponibles pour l'activité en demi-groupe.

## Un site qui s'affiche est-il prêt ?

**À vous :** le site paraît professionnel et porte la mention « Site conforme RGPD ».
Pouvez-vous en conclure qu'il est prêt à être mis en ligne ? Pourquoi ? Notez une
réponse, puis échangez avec votre voisin avant la discussion collective.

### À retenir : auditer, c'est vérifier

Une apparence soignée et une affirmation de l'agent IA ne démontrent pas que le site
fonctionne correctement, protège les données ou respecte ses obligations. L'audit
consiste à examiner le livrable et à expliquer ses conclusions à partir de **preuves**.

Notre fil conducteur : **constat → preuve → risque → correction**.

## 1. Une clé dans le code

L'enseignant montre un extrait de `script.js` avec une clé fictive de service d'e-mailing.

**À vous :** si le fichier est envoyé au navigateur des visiteurs, qui peut le lire ?
Si l'on supprime ensuite la clé du code, est-on certain qu'elle n'a jamais été copiée ?

### À retenir : les secrets ne sont pas privés dans le navigateur

Le code envoyé au navigateur peut être lu par le visiteur. Une clé ou un mot de passe
présent dans ce code peut donc être copié et utilisé par un tiers. Si un vrai secret a
été exposé, il faut le **retirer et le révoquer ou le remplacer** auprès du service
concerné ; les opérations nécessitant un secret doivent être conçues côté serveur.

| Constat | Preuve | Risque | Correction |
|---|---|---|---|
| Une clé figure dans le code client. | Une ligne de `script.js` accessible au navigateur. | Un tiers peut copier la clé et abuser du service. | Retirer la clé, la révoquer ou la remplacer et revoir le traitement côté serveur. |

## 2. Un formulaire trop bavard

L'enseignant montre le formulaire et sa case de newsletter précochée. Le client demande
seulement à être recontacté à propos de son projet.

**À vous :** parmi les informations demandées, lesquelles semblent utiles à cette
finalité ? La date de naissance et l'adresse personnelle sont-elles nécessaires ?
Une demande de contact vaut-elle accord pour recevoir les offres des partenaires ?

### À retenir : demander ce qui est nécessaire

Le principe de **minimisation** conduit à limiter les données à ce qui est nécessaire
pour la finalité annoncée. Demander à être recontacté et recevoir des offres sont des
finalités distinctes : une case précochée ne permet pas d'exprimer un consentement
libre et spécifique. Il faut également informer les personnes sur le traitement.

## 3. Où vont les données ?

L'enseignant utilise uniquement des données fictives pour montrer l'envoi du formulaire
et les traces laissées dans le navigateur.

**À vous :** si les données apparaissent dans l'adresse, où pourraient-elles rester
visibles ? Sur un ordinateur partagé, que risque de voir la personne suivante si le
site conserve les saisies ?

### À retenir : limiter l'exposition

Dans ce site, le formulaire utilise `GET` et une adresse `http://` : des données
figurent dans l'URL, susceptible d'être conservée dans l'historique ou des journaux,
et la connexion HTTP ne les chiffre pas. Le script enregistre aussi les saisies dans
le stockage local et les affiche dans la console. Sur un poste partagé, ces traces
peuvent exposer des informations à d'autres personnes.

Supprimer ces enregistrements inutiles et concevoir un traitement adapté sont des
pistes de correction. Utiliser POST et HTTPS est utile, mais ces deux changements ne
créent pas à eux seuls un service de réception fonctionnel ou conforme.

## 4. La page contacte d'autres services

L'enseignant ouvre l'onglet **Réseau** du navigateur et recharge la page. Vous observez
notamment des demandes vers des services de polices, de mesure d'audience ou de carte.

**À vous :** pour afficher une carte ou une police distante, à qui le navigateur
s'adresse-t-il ? Quel choix peut-on proposer si l'on veut éviter de charger la carte
avant que le visiteur ne le décide ?

### À retenir : identifier les tiers

Une page peut charger des ressources fournies par d'autres organisations. Le serveur
contacté reçoit l'adresse IP nécessaire à la connexion et peut recevoir d'autres
informations selon la requête. Une requête en échec montre une **tentative**, pas
nécessairement une transmission réussie. Les services et traceurs utilisés doivent être
examinés au regard de leur finalité et des règles applicables. Une piste pour la carte :
proposer un lien que le visiteur choisit d'ouvrir.

## Décider et justifier

**Vote individuel :** parmi la clé exposée, les champs superflus, les données dans
l'URL ou le stockage local et les connexions à des tiers, quelle correction vous paraît
prioritaire ? Écrivez une phrase pour justifier votre choix, puis écoutez un autre avis.

Ensemble, nous retenons deux priorités. Pour chacune : quel est le constat ? Où est la
preuve ? Quel risque cherche-t-on à réduire ? Que faudra-t-il vérifier après correction ?

## Bilan individuel

Sur votre feuille, répondez en trois phrases :

1. Citez un défaut observé et l'endroit où sa preuve a été montrée.
2. Expliquez le risque et proposez une correction.
3. Pourquoi la correction devra-t-elle être vérifiée avant toute mise en ligne ?

En demi-groupe, vous reprendrez ces constats sur une copie du site avec la fiche
**VPI : reprendre l'audit et corriger le site**.
