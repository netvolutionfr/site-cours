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

Vermand Prévention Ingénierie (**VPI**), entreprise fictive, a demandé un site vitrine
à Soft-Tech. Un alternant a utilisé un agent IA pour produire le site. La responsable
qualité demande : **peut-on le mettre en ligne en l'état ?**

Un site qui s'affiche et un agent qui affirme avoir fait du bon travail ne suffisent
pas à répondre. Nous allons examiner le livrable et appuyer nos conclusions sur des
observations vérifiables.

### Notre objectif

À la fin de la séance, vous devrez pouvoir présenter un constat précis, montrer où
vous l'avez observé, expliquer le risque et proposer une correction.

Téléchargez l'archive jointe. Elle contient la page, ses fichiers et `LIVRAISON.md`.
Vous pouvez suivre même si vous n'avez pas travaillé sur ce site pendant les vacances.
En binôme, ouvrez `LIVRAISON.md`, puis la page `index.html` dans votre navigateur.
Travaillez sans IA et utilisez exclusivement des données inventées.

## 1. Que vérifier ?

Avant de regarder le code, réfléchissez individuellement pendant deux minutes :

- Quelles informations un visiteur pourrait-il communiquer à VPI ?
- Quelles ressources la page pourrait-elle charger depuis d'autres organisations ?
- Le code envoyé au navigateur peut-il contenir des informations à protéger ?

Comparez vos hypothèses en binôme. Une hypothèse devient un **constat** lorsqu'une
observation permet de l'appuyer ; une affirmation dans la livraison ne suffit pas.

## 2. Observer le livrable

### Les fichiers et leurs secrets

Ouvrez `index.html`, `style.css` et `script.js` dans l'éditeur. Cherchez des éléments
qui ne devraient pas être remis aux visiteurs : identifiants, mots de passe ou clés.
Notez le **nom du fichier et la zone concernée**, sans recopier le secret.

Les fichiers envoyés au navigateur peuvent être lus par les visiteurs. Supprimer un
secret réellement exposé du code ne suffit donc pas : il faut aussi le révoquer ou le
remplacer auprès du service concerné.

### Les connexions à des tiers

Dans le navigateur, ouvrez les outils de développement avec **F12**, choisissez
l'onglet **Réseau**, puis rechargez la page. Une ligne représente une requête ou une
ressource. Repérez les domaines extérieurs au site : à quoi semblent-ils servir ?

Le serveur contacté reçoit au minimum l'adresse IP nécessaire à la connexion ; selon
la requête et les réglages, il peut aussi recevoir d'autres informations. Une requête
en échec montre une tentative de connexion, pas nécessairement une transmission réussie.
Si le réseau du lycée bloque les services, repérez leurs adresses dans les fichiers.

### Le formulaire et les traces locales

Examinez les champs demandés. Sont-ils tous nécessaires pour répondre à une demande de
contact ? Une inscription commerciale a-t-elle la même finalité ?

Avec une **identité fictive**, observez l'adresse de destination et la méthode du
formulaire, puis la console et le stockage local du navigateur. Quelles informations
restent sur le poste ? Qu'un visiteur suivant pourrait-il retrouver ?

## 3. Du constat à la décision

Complétez en binôme au moins deux lignes ; soyez capables de montrer la preuve :

| Constat | Preuve : où l'avez-vous vu ? | Risque | Correction proposée |
|---|---|---|---|
| | | | |
| | | | |

Pour qualifier un risque, réutilisez les critères étudiés : **disponibilité** (accès
au service), **intégrité** (données non modifiées indûment), **confidentialité**
(accès limité aux personnes autorisées) et **preuve** (éléments permettant d'établir
ce qui s'est passé). Selon le constat, pensez aussi à la minimisation des données et à
l'information des personnes concernées.

En classe, nous mettons les propositions en commun puis choisissons deux corrections
prioritaires. Pour chacune, expliquez qui ou quoi est exposé et pourquoi elle compte.

## 4. Vérifier une correction

Une correction se réalise sur une **copie** du site, puis se teste. Par exemple, après
la suppression d'une ressource externe, rechargez la page avec l'onglet Réseau ouvert :
la requête a-t-elle disparu ? La page fonctionne-t-elle toujours ?

Une modification locale ne suffit pas à déclarer l'ensemble du site conforme ou prêt
à être publié. En particulier, une adresse HTTPS et une méthode POST ne créent pas à
elles seules un service de réception ni ne prouvent que le traitement est conforme.

## À retenir et à préparer pour l'activité

1. Une livraison produite par une IA se contrôle comme tout autre livrable.
2. Un audit relie **constat, preuve, risque et correction**.
3. Une correction doit être vérifiée ; certains risques exigent aussi une action
   extérieure au code, comme la révocation d'un secret exposé.

Notez individuellement vos deux priorités et, pour chacune, la preuve que vous
chercherez après correction. En demi-groupe, vous travaillerez sur une copie à l'aide
de la fiche **VPI : reprendre l'audit et corriger le site**.
