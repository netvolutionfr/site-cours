---
type: support
format: web
nature: Activité
composant: Markdown
title: "Web : publier et diagnostiquer"
subtitle: "Projet fil rouge · mardi 13 octobre 2026 · Bloc 2"
annee: 2026-2027
groupe: 2sisr
matiere: SIO
publie: true
date: 2026-10-13
competences: [B2.2, B2.3]
ia: encadree
---


## Votre mission

Le laboratoire dispose d'un DNS autoritaire. Vous devez maintenant servir une page avec Nginx, publier son nom dans `lab.test` et démontrer séparément le fonctionnement du DNS et celui du service HTTP.

**En binôme**, alternez administration et contrôle. Chacun conserve une conclusion individuelle. Le service HTTP reste dans le laboratoire isolé, avec une page fictive et sans identifiants ; HTTPS sera traité ensuite.

### Objectifs

- Déployer un site Nginx simple et vérifier sa configuration.
- Publier les noms `web.lab.test` et `www.lab.test`.
- Situer une panne entre résolution DNS, connexion et réponse HTTP.

## 1. Identifier les rôles

Reprenez votre inventaire de lundi. L'exemple utilise DNS `10.77.1.10`, client `10.77.1.20`, web `10.77.1.30`, tous sur le réseau autorisé `10.77.1.0/24`. **Remplacez ces valeurs par les adresses attribuées.**

Utilisez une VM web préparée par l'enseignant. Si vous ne disposez que des deux VM DNS/client, l'enseignant peut autoriser Nginx sur la VM client : l'adresse web sera alors celle du client, pas `.30`. Ne créez pas de VM ou de réseau improvisé.

Sur la VM web, contrôlez `ip -br address`, `ip route` et la présence de Nginx. Il doit être préinstallé ; en cas d'absence, demandez l'intervention de l'enseignant ou utilisez la partie 6. N'essayez pas d'ouvrir l'accès Internet d'un réseau isolé.

**Question 1.** Quel rôle joue chacune des VM ? Quel échange attend-on avec le DNS, puis avec le serveur web ?

## 2. Configurer un site identifiable

Sur la VM web, créez le dossier du site :

```bash
sudo mkdir -p /var/www/lab
sudo nano /var/www/lab/index.html
```

Rédigez une page HTML très courte comportant un titre, la mention « Laboratoire SISR » et un identifiant fictif de binôme. Ce fichier est **l'objet servi dans le TP**, pas le support de cours publié sur le site Astro.

Créez `/etc/nginx/sites-available/lab` avec cette configuration :

```nginx
server {
    listen 80;
    server_name web.lab.test www.lab.test;
    root /var/www/lab;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Activez le site en créant le lien **uniquement s'il n'existe pas déjà** :

```bash
sudo ln -s /etc/nginx/sites-available/lab /etc/nginx/sites-enabled/lab
sudo nginx -t
```

Si `ln` indique que le fichier existe, vérifiez avec `ls -l /etc/nginx/sites-enabled/lab` ; ne l'écrasez pas. En cas d'erreur de `nginx -t`, corrigez avant tout rechargement. Conservez le site Debian par défaut : nous ciblerons notre site par son nom HTTP.

```bash
sudo systemctl reload nginx
sudo systemctl --no-pager --full status nginx
```

Vérifiez la syntaxe, l'état du service puis, depuis le client, testez **sans dépendre de la résolution DNS du système** :

```bash
curl --noproxy '*' --connect-timeout 3 --max-time 5 -i --resolve web.lab.test:80:10.77.1.30 http://web.lab.test/
```

Attendu : `200 OK` et votre marqueur. `--resolve` fournit une adresse à curl tout en envoyant le nom HTTP `web.lab.test`. Ce test établit l'accès HTTP à cette adresse ; **il ne valide pas le DNS**. Une requête vers l'adresse IP seule pourrait afficher le site par défaut.

**Question 2.** Pourquoi la page Debian par défaut ne prouverait-elle pas que votre site est correctement sélectionné ?

## 3. Publier le nom dans le DNS

Sur le DNS, sauvegardez le fichier de zone avec un suffixe nouveau, sans écraser une sauvegarde existante. Dans `/etc/bind/db.lab.test`, **modifiez les lignes existantes** ou ajoutez celles qui manquent ; ne créez pas deux enregistrements A concurrents pour le même nom :

```text
web IN A     10.77.1.30
www IN CNAME web.lab.test.
```

Incrémentez le numéro de série SOA. Gardez les autres enregistrements. N'utilisez pas automatiquement l'adresse `.31` du scénario documentaire du 6 octobre : l'inventaire réel de votre laboratoire fait foi.

```bash
sudo named-checkconf
sudo named-checkzone lab.test /etc/bind/db.lab.test
sudo systemctl reload named
```

Le rechargement n'a lieu que si les deux validations précédentes réussissent. Depuis le client :

```bash
dig @10.77.1.10 web.lab.test A +norecurse
dig @10.77.1.10 www.lab.test A +norecurse
dig @10.77.1.10 lab.test SOA +norecurse
```

Attendu : A du serveur web, alias puis adresse correspondante, réponse faisant autorité et nouvelle série. **Question 3.** Que valide chaque commande ? Que manque-t-il pour confirmer le service web ?

Ne modifiez pas `/etc/resolv.conf`, le DNS du poste de salle ou `/etc/hosts`. Pour ce TP, la chaîne est vérifiée par deux contrôles explicites : interroger le DNS du laboratoire, puis tester HTTP à **l'adresse effectivement obtenue** en gardant le nom dans `--resolve`. Faites aussi le test de `www.lab.test` avec ce nom dans les deux arguments.

## 4. Diagnostiquer sans casser le laboratoire

Effectuez ce test sur un chemin volontairement absent :

```bash
curl --noproxy '*' --connect-timeout 3 --max-time 5 -i --resolve web.lab.test:80:10.77.1.30 http://web.lab.test/absent-13oct
```

Attendu : `404 Not Found`. Cette réponse prouve qu'un serveur HTTP a répondu ; elle ne signifie pas que le réseau est coupé. Sur le serveur web, rapprochez vos requêtes du journal :

```bash
sudo tail -n 20 /var/log/nginx/access.log
sudo tail -n 20 /var/log/nginx/error.log
```

Expliquez les trois cas suivants sans modifier le serveur :

| Observation | Premier contrôle à proposer |
|---|---|
| DNS : `NXDOMAIN` pour `web.lab.test` | Nom interrogé et enregistrement de zone |
| DNS : bonne adresse ; curl : connexion refusée | Service Nginx, adresse/port d'écoute, éventuel rejet réseau |
| DNS : bonne adresse ; HTTP : `404` | Chemin, fichier, racine et site sélectionné |

Un timeout peut avoir plusieurs causes : routage, filtrage, service ou machine indisponible. Une observation isolée ne suffit pas. Pour les rapides : comparez `Host` et `server_name`, puis expliquez pourquoi `--resolve` est utile au diagnostic mais ne configure pas le DNS des autres logiciels.

## 5. Livrable et restitution

Rendez un dossier court : schéma des rôles/adresses, configuration Nginx, lignes DNS et série, tableau **commande / attendu / observé / conclusion**, extraits de journal reliés à vos requêtes. Les extraits ne doivent contenir aucun secret ni donnée personnelle.

Chaque étudiant explique en **5 à 7 lignes** comment il sait que le nom est publié, que le bon site répond et qu'un `404` diffère d'une panne DNS. Signalez les contrôles réalisés sur documents.

**Réussite :** réponse DNS conforme, `200 OK` avec le marqueur du binôme et diagnostic argumenté du `404`. Si les VM ne sont pas prêtes, la même restitution peut s'appuyer explicitement sur les documents ci-dessous.

## 6. Repli documentaire indépendant

Ces sorties **fictives** permettent de travailler même si le DNS de lundi n'est pas prêt.

```text
dig @10.77.1.10 web.lab.test A +norecurse
status: NOERROR ; flags: qr aa
web.lab.test. 300 IN A 10.77.1.30

dig @10.77.1.10 www.lab.test A +norecurse
status: NOERROR ; flags: qr aa
www.lab.test. 300 IN CNAME web.lab.test.
web.lab.test. 300 IN A 10.77.1.30

curl avec --resolve vers / : HTTP/1.1 200 OK
Corps : Laboratoire SISR — binôme B07
curl avec --resolve vers /absent-13oct : HTTP/1.1 404 Not Found
```

Journal simplifié :

```text
10.77.1.20 [...] "GET / HTTP/1.1" 200 ...
10.77.1.20 [...] "GET /absent-13oct HTTP/1.1" 404 ...
```

Répondez aux questions 1 à 3, interprétez les trois diagnostics de la partie 4, puis rédigez une conclusion intitulée **« analyse sur documents »**. N'attribuez pas ces sorties à vos VM.

## Repères

DNS fournit une adresse ; HTTP fournit une réponse applicative. Le nom envoyé dans l'en-tête HTTP `Host` permet à Nginx de sélectionner le site. Références : [guide Nginx](https://nginx.org/en/docs/beginners_guide.html), [sélection des requêtes](https://nginx.org/en/docs/http/request_processing.html), [options de curl](https://curl.se/docs/manpage.html).

L'IA peut expliquer un message après une première analyse personnelle ; vérifiez toute commande, ne transmettez aucun secret et rédigez votre conclusion vous-même.
