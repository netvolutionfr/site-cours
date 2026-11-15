<div class="sequence-overview">
<section id="objectifs" class="objectives">
<h3>Objectifs</h3>
<ul>
<li>Vérifier l’exposition réelle d’un service et justifier les flux
autorisés.</li>
<li>Répartir les requêtes entre deux applications derrière Nginx.</li>
<li>Simuler une panne, recueillir des preuves et expliquer les limites
de disponibilité.</li>
</ul>
</section>
<section id="prérequis" class="prerequisites">
<h3>Prérequis</h3>
<ul>
<li>Instance Debian, SSH, Nginx HTTPS et conteneur de P08.</li>
<li>Commandes <code>curl</code>, <code>ss</code>, Docker et principe
d’une règle nftables.</li>
</ul>
</section>
<section id="parcours" class="outline">
<h3>Parcours</h3>
<table>
<thead>
<tr>
<th>Étape</th>
<th>Production</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Reprise de P08 et matrice des flux</td>
</tr>
<tr>
<td>2</td>
<td>Deux applications et répartition</td>
</tr>
<tr>
<td>3</td>
<td>Panne, diagnostic et bilan</td>
</tr>
</tbody>
</table>
</section>
</div>
<h3 id="avant-de-commencer">Avant de commencer</h3>
<p>Vous retrouvez votre instance <code>sisrN.tp.siovision.fr</code>,
avec N votre numéro. Ne recréez pas l’instance : l’enseignant gère sa
reprise. Si son adresse a changé, attendre la mise à jour DNS. Travail
individuel. Notez vos preuves dans un tableau <strong>action / attendu /
observé / conclusion</strong>. Les commandes utilisent des données de
test ; aucune clé privée ni mot de passe dans le compte rendu.</p>
<h3 id="lundi-reprendre-p08-et-justifier-les-flux">1. Lundi — Reprendre
P08 et justifier les flux</h3>
<ol type="1">
<li>Avec la <a href="/sio/2sisr-fil-rouge/p08-proxy-inverse-docker-exposition.html">fiche
P08</a>, reprenez à votre point d’arrêt : le site doit répondre en HTTPS
avec votre nom et le port 8080 ne doit plus être accessible depuis
l’extérieur. Vérifiez également <code>sudo ss -ltnp</code> et
<code>sudo docker ps</code>.</li>
<li>Notez la différence entre une règle de la chaîne <code>input</code>
et l’adresse de publication du conteneur. Pourquoi un port publié sur
toutes les interfaces peut-il contourner <code>input</code> ?</li>
<li>Complétez la matrice suivante avant toute nouvelle règle. Distinguez
le flux Internet vers l’hôte du flux local de Nginx vers
l’application.</li>
</ol>
<table>
<thead>
<tr>
<th>Source</th>
<th>Destination</th>
<th>Protocole / port</th>
<th>Décision</th>
<th>Justification</th>
</tr>
</thead>
<tbody>
<tr>
<td>Internet</td>
<td>serveur</td>
<td>TCP 80</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>Internet</td>
<td>serveur</td>
<td>TCP 443</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>poste d’administration</td>
<td>serveur</td>
<td>TCP 22</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>Internet</td>
<td>serveur</td>
<td>TCP 8080</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>Nginx sur le serveur</td>
<td>application</td>
<td>TCP 8080</td>
<td>…</td>
<td>…</td>
</tr>
</tbody>
</table>
<ol start="4" type="1">
<li>Comparez la matrice à <code>sudo nft list table inet filtre</code>
et aux tests extérieurs. Une règle manquante ou un résultat inattendu
devient une hypothèse à vérifier, pas une preuve.</li>
<li><strong>SSH restreint : conception d’abord.</strong> Proposez une
source d’administration autorisée et justifiez-la. Ne limitez pas le
port 22 sur l’instance sans adresse source stable validée par
l’enseignant et sans accès de secours testé. Le réseau mobile ou du
lycée peut changer.</li>
</ol>
<p>P08 détaille le filet temporisé à lancer <strong>avant</strong> toute
modification du filtrage. Gardez une session SSH ouverte et testez une
seconde connexion. N’exécutez pas <code>flush ruleset</code> ni
<code>systemctl restart nftables</code> : cela peut effacer les règles
nécessaires à Docker.</p>
<h3 id="mardi-deux-applications-derrière-un-seul-point-dentrée">2. Mardi
— Deux applications derrière un seul point d’entrée</h3>
<p>Vérifiez que P08 fonctionne. Conservez le conteneur <code>app</code>
existant sur <code>127.0.0.1:8080</code> ; créez un second conteneur
indépendant, sur la boucle locale uniquement :</p>
<div class="sourceCode" id="cb1"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> docker run <span class="at">-d</span> <span class="at">--name</span> app2 <span class="at">--restart</span> unless-stopped <span class="dt">\</span></span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  <span class="at">-p</span> 127.0.0.1:8081:8080 traefik/whoami <span class="at">--port</span> 8080 <span class="at">--name</span> sisrN-app2</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> docker ps</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> http://127.0.0.1:8080/ <span class="kw">|</span> <span class="fu">grep</span> Name</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> http://127.0.0.1:8081/ <span class="kw">|</span> <span class="fu">grep</span> Name</span></code></pre></div>
<p>Remplacez N par votre numéro. Les deux <code>Name</code> doivent
différer ; sinon identifiez les conteneurs avant de poursuivre. Le port
du conteneur reste 8080 ; le port de l’hôte est 8081. Depuis un autre
serveur, testez <code>http://sisrN.tp.siovision.fr:8081/</code> avec un
délai de 5 secondes. Vérifiez aussi les adresses d’écoute avec
<code>sudo ss -ltnp</code>. <strong>Aucune réponse seule ne prouve
pas</strong> que l’application est inaccessible sur tous les
chemins.</p>
<p>Sauvegardez votre configuration Nginx dans votre dossier personnel,
puis modifiez le fichier du site P08. Le bloc <code>upstream</code> se
place <strong>hors des blocs <code>server</code></strong>, dans le
contexte HTTP :</p>
<pre class="nginx"><code>upstream applications {
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}</code></pre>
<p>Dans la <code>location /</code> du bloc HTTPS existant, remplacez
uniquement la destination de <code>proxy_pass</code> par
<code>http://applications</code> ; conservez certificat, en-têtes,
exception ACME et redirection HTTP. Validez <strong>avant</strong> de
recharger :</p>
<div class="sourceCode" id="cb3"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> nginx <span class="at">-t</span></span>
<span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> systemctl reload nginx</span></code></pre></div>
<p>Si le test échoue, ne rechargez pas : corrigez le message ou
restaurez le fichier sauvegardé, testez à nouveau. Depuis votre poste ou
un autre serveur, répétez :</p>
<div class="sourceCode" id="cb4"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> https://sisrN.tp.siovision.fr/ <span class="kw">|</span> <span class="fu">grep</span> Name</span></code></pre></div>
<p>Relevez au moins six réponses. Quelle règle de distribution semble
utilisée ? Pourquoi ne pas conclure à une alternance parfaite pour tous
les usages ? Contrôlez à nouveau 8080 et 8081 depuis l’extérieur. En cas
de décalage d’avancement, livrez d’abord deux réponses locales
distinctes et un HTTPS fonctionnel avant de passer à la répartition.</p>
<h3 id="mercredi-observer-une-panne">3. Mercredi — Observer une
panne</h3>
<ol type="1">
<li>Avant d’agir, prévoyez ce que verra le visiteur si une application
s’arrête, puis arrêtez seulement <code>app2</code> :
<code>sudo docker stop app2</code>. Ne touchez pas à l’instance ni au
service Nginx.</li>
<li>Répétez les requêtes HTTPS et conservez les réponses ; consultez
<code>sudo docker ps -a</code> et
<code>sudo journalctl -u nginx --since &quot;10 minutes ago&quot; --no-pager</code>.
Si nécessaire, consultez <code>/var/log/nginx/error.log</code>.
Distinguez une observation d’une hypothèse.</li>
<li>Redémarrez <code>app2</code> avec
<code>sudo docker start app2</code>, puis retestez après quelques
requêtes : le retour d’un serveur peut ne pas être immédiat. Expliquez
le rôle de la détection passive.</li>
<li>Comparez : une application arrêtée ; Nginx arrêté ; instance
indisponible. Quels cas sont couverts par vos deux conteneurs sur
<strong>une seule instance</strong> ? Proposez une amélioration qui
supprimerait un point de panne, sans la déployer.</li>
<li>Rédigez une synthèse : schéma des flux, tests extérieurs et locaux,
symptôme, hypothèse, preuve, remédiation et limite. Ne joignez pas les
clés, certificats privés ou données sensibles.</li>
</ol>
<h3 id="repères-et-sécurité">Repères et sécurité</h3>
<p>La répartition par défaut de Nginx est circulaire ; la détection
passive dépend des requêtes et ne garantit ni absence d’erreur ni
reprise instantanée. Deux conteneurs sur une même instance ne protègent
pas de la panne de cette instance ou du proxy. Les ports publiés en
boucle locale réduisent l’exposition ; avec Docker avant 28, des hôtes
du même segment réseau peuvent dans certaines configurations atteindre
ces ports : ne pas généraliser la protection sans vérifier la version,
le réseau et les règles. Sources : <a href="https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/">Nginx
— répartition</a>, <a href="https://docs.nginx.com/nginx/admin-guide/load-balancer/http-health-check/">Nginx
— contrôles passifs</a>, <a href="https://docs.docker.com/engine/network/port-publishing/">Docker —
publication de ports</a>.</p>
<p>L’IA peut aider à interpréter une erreur après une première recherche
; expliquez et vérifiez chaque commande. Ne transmettez jamais de clé
privée, secret ou contenu de <code>/etc/letsencrypt/</code>.</p>
