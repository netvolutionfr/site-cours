<section id="sécuriser-et-rendre-disponible-un-service" class="slide title">
<h2>Sécuriser et rendre disponible un service</h2>
<h3 id="filtrage-proxy-inverse-et-diagnostic">Filtrage, proxy inverse et
diagnostic</h3>
</section>
<section id="objectifs" class="slide concept">
<h2>Objectifs</h2>
<ul>
<li><strong>Justifier</strong> les flux autorisés et vérifier
l’exposition réelle.</li>
<li><strong>Répartir</strong> les requêtes entre deux applications.</li>
<li><strong>Diagnostiquer</strong> une panne et identifier les limites
de disponibilité.</li>
</ul>
<p><strong>Prérequis :</strong> SSH, HTTP / HTTPS, Nginx, conteneur et
premiers essais nftables de P08.</p>
</section>
<section id="lundi-quels-flux-autoriser" class="slide">
<h2>Lundi — Quels flux autoriser ?</h2>
</section>
<section id="une-matrice-avant-les-commandes" class="slide concept">
<h2>Une matrice avant les commandes</h2>
<table>
<thead>
<tr>
<th>Source</th>
<th>Destination</th>
<th>Port</th>
<th>But</th>
</tr>
</thead>
<tbody>
<tr>
<td>Internet</td>
<td>Nginx</td>
<td>TCP 443</td>
<td>Accès HTTPS</td>
</tr>
<tr>
<td>Internet</td>
<td>serveur</td>
<td>TCP 80</td>
<td>Redirection et défi ACME</td>
</tr>
<tr>
<td>Administration</td>
<td>serveur</td>
<td>TCP 22</td>
<td>Accès SSH à limiter</td>
</tr>
<tr>
<td>Nginx local</td>
<td>application locale</td>
<td>TCP 8080</td>
<td>Transmission interne</td>
</tr>
</tbody>
</table>
<p>Une règle doit préciser source, destination, protocole, port et
décision.</p>
</section>
<section id="docker-et-la-chaîne-input" class="slide warning">
<h2>Docker et la chaîne input</h2>
<p>Un port Docker publié sur toutes les interfaces peut emprunter un
trajet redirigé vers le conteneur, qui ne traverse pas la chaîne
<code>input</code> de l’hôte comme prévu.</p>
<ul>
<li>Tester depuis un autre poste ; contrôler aussi l’adresse
d’écoute.</li>
<li>Publier le service applicatif sur <code>127.0.0.1</code> et
maintenir le filtrage de l’hôte.</li>
<li>Le comportement dépend du réseau, de la version Docker et des règles
en place.</li>
</ul>
</section>
<section id="p08-vérifier-et-expliquer" class="slide activity">
<h2>P08 : vérifier et expliquer</h2>
<p><strong>Individuel · sur instance cloud</strong></p>
<p><strong>À produire :</strong> tableau action / attendu / observé /
conclusion et matrice des flux.</p>
<ol type="1">
<li>Terminer P08 à votre point d’arrêt ; tester HTTPS et le 8080 depuis
l’extérieur.</li>
<li>Comparer les résultats aux adresses d’écoute et aux règles
nftables.</li>
<li>Proposer une restriction SSH ; attendre validation et accès de
secours avant application.</li>
</ol>
</section>
<section id="mardi-deux-applications-derrière-nginx" class="slide">
<h2>Mardi — Deux applications derrière Nginx</h2>
</section>
<section id="un-proxy-plusieurs-services" class="slide concept">
<h2>Un proxy, plusieurs services</h2>
<p>Le client contacte une seule adresse HTTPS. Nginx termine TLS et
transmet chaque requête à l’une des applications disponibles : les ports
applicatifs restent locaux.</p>
<table>
<thead>
<tr>
<th>Élément</th>
<th>Adresse</th>
<th>Rôle</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nginx</td>
<td>port public 443</td>
<td>Point d’entrée HTTPS</td>
</tr>
<tr>
<td>Application 1</td>
<td><code>127.0.0.1:8080</code></td>
<td>Première réponse</td>
</tr>
<tr>
<td>Application 2</td>
<td><code>127.0.0.1:8081</code></td>
<td>Seconde réponse</td>
</tr>
</tbody>
</table>
</section>
<section id="la-répartition-en-pratique" class="slide concept">
<h2>La répartition en pratique</h2>
<p>Un groupe <code>upstream</code> liste les deux destinations ;
<code>proxy_pass</code> vise ce groupe. Nginx utilise par défaut une
répartition circulaire. Le résultat observé dépend des connexions et des
requêtes : une poignée de tests ne prouve pas une distribution
parfaite.</p>
<p>Avant rechargement : <strong>sauvegarder, <code>nginx -t</code>, puis
seulement recharger</strong>.</p>
</section>
<section id="deux-réponses-un-seul-site" class="slide activity">
<h2>Deux réponses, un seul site</h2>
<p><strong>Individuel · sur instance cloud</strong></p>
<p><strong>À produire :</strong> deux noms d’application, six résultats
HTTPS et deux tests extérieurs.</p>
<ol type="1">
<li>Démarrer le second conteneur sur la boucle locale, port hôte
8081.</li>
<li>Vérifier séparément les deux réponses locales.</li>
<li>Configurer l’upstream, valider, recharger ; tester HTTPS et les
ports applicatifs.</li>
</ol>
</section>
<section id="mercredi-une-panne-quelles-preuves" class="slide">
<h2>Mercredi — Une panne, quelles preuves ?</h2>
</section>
<section id="observer-avant-de-conclure" class="slide concept">
<h2>Observer avant de conclure</h2>
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr>
<th>Observation</th>
<th>Hypothèse</th>
<th>Test suivant</th>
</tr>
</thead>
<tbody>
<tr>
<td>Une application ne répond pas</td>
<td>Conteneur arrêté</td>
<td><code>docker ps -a</code>, test local</td>
</tr>
<tr>
<td>HTTPS renvoie une erreur</td>
<td>Proxy ou applications</td>
<td><code>nginx -t</code>, journaux, tests locaux</td>
</tr>
<tr>
<td>Plus aucun accès</td>
<td>Instance ou réseau</td>
<td>Vérifier depuis une autre source et alerter</td>
</tr>
</tbody>
</table>
<p>Une hypothèse devient crédible quand une preuve permet de l’étayer ou
de l’écarter.</p>
</section>
<section id="répartition-ne-signifie-pas-haute-disponibilité" class="slide concept">
<h2>Répartition ne signifie pas haute disponibilité</h2>
<p>Deux conteneurs sur la même instance peuvent réduire l’effet de la
panne d’une application. Ils partagent toujours le même serveur, le même
Nginx et le même réseau.</p>
<p>La détection passive constate des échecs pendant les requêtes ; le
retour à la normale peut prendre du temps et une erreur peut rester
visible pour un client.</p>
</section>
<section id="tester-une-panne-contrôlée" class="slide activity">
<h2>Tester une panne contrôlée</h2>
<p><strong>Individuel · sur instance cloud</strong></p>
<p><strong>À produire :</strong> prévision, résultats, diagnostic et
limite argumentée.</p>
<ol type="1">
<li>Arrêter seulement <code>app2</code>, puis répéter les requêtes HTTPS
et consulter les traces.</li>
<li>Redémarrer <code>app2</code> et observer son retour.</li>
<li>Comparer avec une panne de Nginx ou de l’instance, sans les
provoquer.</li>
</ol>
</section>
<section id="à-retenir" class="slide summary">
<h2>À retenir</h2>
<ol type="1">
<li>Une matrice traduit les besoins en flux et règles vérifiables.</li>
<li>Tester de l’extérieur et contrôler l’écoute complètent l’analyse du
pare-feu.</li>
<li>Nginx peut répartir les requêtes ; une panne s’étudie à partir de
preuves.</li>
<li>Deux applications sur un serveur ne suppriment pas la panne du
serveur.</li>
</ol>
</section>
