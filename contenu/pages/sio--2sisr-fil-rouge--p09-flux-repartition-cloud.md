<div class="sequence-overview">
<section id="objectifs" class="objectives">
<h3>Objectifs</h3>
<ul>
<li>Vérifier l’exposition réelle d’un service et justifier les flux
autorisés.</li>
<li>Concevoir une restriction de l’accès SSH sans perdre
l’administration du serveur.</li>
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
<td>Suite</td>
<td>P10 (répartition) puis P11 (panne et diagnostic)</td>
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
<h3 id="repères-et-sécurité">Repères et sécurité</h3>
<p>Les ports publiés en boucle locale réduisent l’exposition ; avec
Docker avant 28, des hôtes du même segment réseau peuvent dans certaines
configurations atteindre ces ports : ne pas généraliser la protection
sans vérifier la version, le réseau et les règles. Source : <a href="https://docs.docker.com/engine/network/port-publishing/">Docker —
publication de ports</a>.</p>
<p>L’IA peut aider à interpréter une erreur après une première recherche
; expliquez et vérifiez chaque commande. Ne transmettez jamais de clé
privée, secret ou contenu de <code>/etc/letsencrypt/</code>.</p>
