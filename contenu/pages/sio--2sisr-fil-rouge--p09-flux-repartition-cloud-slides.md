<section id="justifier-les-flux-dun-service" class="slide title">
<h2>Justifier les flux d’un service</h2>
<h3 id="reprise-de-p08-et-matrice-des-flux">Reprise de P08 et matrice
des flux</h3>
</section>
<section id="objectifs" class="slide concept">
<h2>Objectifs</h2>
<ul>
<li><strong>Justifier</strong> les flux autorisés et vérifier
l’exposition réelle.</li>
<li><strong>Expliquer</strong> pourquoi un port Docker publié peut
échapper au filtrage de l’hôte.</li>
<li><strong>Concevoir</strong> une restriction SSH sans perdre l’accès
d’administration.</li>
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
<section id="à-retenir" class="slide summary">
<h2>À retenir</h2>
<ol type="1">
<li>Une matrice traduit les besoins en flux et règles vérifiables.</li>
<li>Tester de l’extérieur et contrôler l’écoute complètent l’analyse du
pare-feu.</li>
<li>Un port applicatif se publie sur <code>127.0.0.1</code> : seul le
proxy doit l’atteindre.</li>
<li>Restreindre SSH : source stable validée et accès de secours testé
d’abord.</li>
<li>Mardi : une seconde application derrière le même point d’entrée
(P10).</li>
</ol>
</section>
