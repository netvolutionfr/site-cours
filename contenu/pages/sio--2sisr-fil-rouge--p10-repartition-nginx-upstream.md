<div class="sequence-overview">
<section id="objectifs" class="objectives">
<h3>Objectifs</h3>
<ul>
<li>Vérifier séparément deux applications sur le serveur, avant de les
placer derrière le proxy.</li>
<li>Configurer un groupe <code>upstream</code> Nginx et valider le
service HTTPS.</li>
<li>Distinguer ce qui est exposé à Internet de ce qui reste local, et le
prouver.</li>
</ul>
</section>
<section id="prérequis" class="prerequisites">
<h3>Prérequis</h3>
<ul>
<li>P08 fonctionnel : site HTTPS à votre nom, conteneur <code>app</code>
sur <code>127.0.0.1:8080</code>.</li>
<li>Commandes <code>curl</code>, <code>ss</code>,
<code>docker ps</code>, <code>nginx -t</code>.</li>
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
<td>0</td>
<td>Contrôle du point de départ (P08)</td>
</tr>
<tr>
<td>1</td>
<td>Second conteneur et deux réponses locales</td>
</tr>
<tr>
<td>2</td>
<td>Groupe <code>upstream</code> et répartition HTTPS</td>
</tr>
<tr>
<td>3</td>
<td>Vérification de l’exposition</td>
</tr>
<tr>
<td>4</td>
<td>Explication du chemin d’une requête</td>
</tr>
</tbody>
</table>
</section>
</div>
<h3 id="avant-de-commencer">Avant de commencer</h3>
<p>Vous retrouvez votre instance <code>sisrN.tp.siovision.fr</code> (N :
votre numéro). Ne la recréez pas. Travail <strong>individuel</strong>.
Tenez un tableau de preuves <strong>action / attendu / observé /
conclusion</strong> : il sert de base au compte rendu et à la séance de
demain. Aucune clé privée, aucun mot de passe, aucun contenu de
<code>/etc/letsencrypt/</code> dans ce tableau.</p>
<figure>
<img role="img" aria-label="Le visiteur joint Nginx sur 443 ; Nginx répartit vers app (8080) et app2 (8081) par la boucle locale ; les ports applicatifs ne répondent pas depuis Internet." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDY2MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsbGVkYnk9InRpdGxlIGRlc2MiPgogIDx0aXRsZSBpZD0idGl0bGUiPkNoZW1pbiBkJ3VuZSByZXF1w6p0ZSA6IHVuIHBvaW50IGQnZW50csOpZSBIVFRQUywgZGV1eCBhcHBsaWNhdGlvbnMgbG9jYWxlczwvdGl0bGU+CiAgPGRlc2MgaWQ9ImRlc2MiPkxlIHZpc2l0ZXVyIGpvaW50IHNpc3JOLnRwLnNpb3Zpc2lvbi5mciBlbiBIVFRQUyBzdXIgbGUgcG9ydCA0NDMuIE5naW54IHRlcm1pbmUgVExTLCBwdWlzIGxlIGdyb3VwZSB1cHN0cmVhbSBhcHBsaWNhdGlvbnMgdHJhbnNtZXQgY2hhcXVlIHJlcXXDqnRlLCDDoCB0b3VyIGRlIHLDtGxlLCBhdSBjb250ZW5ldXIgYXBwIHN1ciAxMjcuMC4wLjE6ODA4MCBvdSBhdSBjb250ZW5ldXIgYXBwMiBzdXIgMTI3LjAuMC4xOjgwODEuIERlcHVpcyBJbnRlcm5ldCwgbGVzIHBvcnRzIDgwODAgZXQgODA4MSBuZSByw6lwb25kZW50IHBhcy4gQ2hhcXVlIGFwcGxpY2F0aW9uIHJlbnZvaWUgc29uIHByb3ByZSBub20sIGNlIHF1aSBwZXJtZXQgZGUgdm9pciBxdWkgYSByw6lwb25kdS48L2Rlc2M+CiAgPGRlZnM+CiAgICA8bWFya2VyIGlkPSJhZyIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iNyIgbWFya2VySGVpZ2h0PSI3IiBvcmllbnQ9ImF1dG8iPjxwYXRoIGQ9Ik0wIDBMMTAgNUwwIDEweiIgZmlsbD0iIzFFODQ0OSIvPjwvbWFya2VyPgogICAgPG1hcmtlciBpZD0iYWIiIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjciIG1hcmtlckhlaWdodD0iNyIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCAwTDEwIDVMMCAxMHoiIGZpbGw9IiMzNTY4RDQiLz48L21hcmtlcj4KICAgIDxtYXJrZXIgaWQ9ImFyIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI3IiBtYXJrZXJIZWlnaHQ9IjciIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAgMEwxMCA1TDAgMTB6IiBmaWxsPSIjRDk1QzU5Ii8+PC9tYXJrZXI+CiAgPC9kZWZzPgogIDxzdHlsZT4KICAgIC56b25le2ZpbGw6I2ZmZjtzdHJva2U6IzE3MjAzMztzdHJva2Utd2lkdGg6Mi41fQogICAgLnN2Y3tmaWxsOiNFQUY0RkI7c3Ryb2tlOiMzNTY4RDQ7c3Ryb2tlLXdpZHRoOjJ9CiAgICAuc3ZjMntmaWxsOiNGN0Y4RkE7c3Ryb2tlOiM2NTc4OGQ7c3Ryb2tlLXdpZHRoOjJ9CiAgICAub2t7ZmlsbDojRUFGNkVFO3N0cm9rZTojMUU4NDQ5O3N0cm9rZS13aWR0aDoyfQogICAgLmh7Zm9udDo3MDAgMTlweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6IzE3MjAzM30KICAgIC50e2ZvbnQ6NTAwIDE1cHggQXJpYWwsc2Fucy1zZXJpZjtmaWxsOiMzYzRiNWN9CiAgICAuY3tmb250OjYwMCAxNXB4IG1vbm9zcGFjZTtmaWxsOiMxNjRkNzl9CiAgICAuZ3tmb250OjcwMCAxNXB4IEFyaWFsLHNhbnMtc2VyaWY7ZmlsbDojMUU4NDQ5fQogICAgLmJ7Zm9udDo3MDAgMTVweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6IzM1NjhENH0KICAgIC5iYWR7Zm9udDo3MDAgMTVweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6I0Q5NUM1OX0KICAgIC50YWd0e2ZvbnQ6NzAwIDE0cHggQXJpYWwsc2Fucy1zZXJpZjtmaWxsOiNmZmZ9CiAgPC9zdHlsZT4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NjAiIGZpbGw9IiNGN0Y4RkEiLz4KCiAgPCEtLSBJbnRlcm5ldCAtLT4KICA8cmVjdCBjbGFzcz0ic3ZjMiIgeD0iMzAiIHk9IjE1MCIgd2lkdGg9IjIxMCIgaGVpZ2h0PSIxNTAiIHJ4PSIxMiIvPgogIDx0ZXh0IHg9IjQ4IiB5PSIxODQiIGNsYXNzPSJoIj5WaXNpdGV1cjwvdGV4dD4KICA8dGV4dCB4PSI0OCIgeT0iMjEyIiBjbGFzcz0iYyI+Y3VybCAtcyBodHRwczovLzwvdGV4dD4KICA8dGV4dCB4PSI0OCIgeT0iMjM0IiBjbGFzcz0iYyI+c2lzck4udHAuPC90ZXh0PgogIDx0ZXh0IHg9IjQ4IiB5PSIyNTYiIGNsYXNzPSJjIj5zaW92aXNpb24uZnIvPC90ZXh0PgogIDx0ZXh0IHg9IjQ4IiB5PSIyODQiIGNsYXNzPSJ0Ij5uYXZpZ2F0ZXVyLCBwb3N0ZeKApjwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9InN2YzIiIHg9IjMwIiB5PSI0MDAiIHdpZHRoPSIyMTAiIGhlaWdodD0iMTEwIiByeD0iMTIiLz4KICA8dGV4dCB4PSI0OCIgeT0iNDM0IiBjbGFzcz0iaCI+U2Nhbm5lcjwvdGV4dD4KICA8dGV4dCB4PSI0OCIgeT0iNDYyIiBjbGFzcz0iYyI+OjgwODAgIDo4MDgxPC90ZXh0PgogIDx0ZXh0IHg9IjQ4IiB5PSI0ODgiIGNsYXNzPSJ0Ij50ZXN0ZSBsZXMgcG9ydHM8L3RleHQ+CgogIDwhLS0gSW5zdGFuY2UgLS0+CiAgPHJlY3QgY2xhc3M9InpvbmUiIHg9IjMwMCIgeT0iNDAiIHdpZHRoPSI4NzAiIGhlaWdodD0iNTIwIiByeD0iMTYiLz4KICA8cmVjdCBmaWxsPSIjMTcyMDMzIiB4PSIzMDAiIHk9IjQwIiB3aWR0aD0iODcwIiBoZWlnaHQ9IjM2IiByeD0iMTYiLz48cmVjdCBmaWxsPSIjMTcyMDMzIiB4PSIzMDAiIHk9IjYwIiB3aWR0aD0iODcwIiBoZWlnaHQ9IjE2Ii8+CiAgPHRleHQgeD0iMzE4IiB5PSI2NCIgY2xhc3M9InRhZ3QiPklOU1RBTkNFIENMT1VEIHNpc3JOIMK3IERFQklBTiDCtyBVTkUgU0VVTEUgQURSRVNTRSBQVUJMSVFVRTwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9InN2YyIgeD0iMzQwIiB5PSIxMjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiByeD0iMTIiLz4KICA8dGV4dCB4PSIzNTgiIHk9IjE1MiIgY2xhc3M9ImgiPk5naW54LCBwcm94eSBpbnZlcnNlPC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMTgwIiBjbGFzcz0iYyI+bGlzdGVuIDQ0MyBzc2w7PC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMjA0IiBjbGFzcz0idCI+dGVybWluZSBUTFMgKGNlcnRpZmljYXQpPC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMjM2IiBjbGFzcz0iYyI+dXBzdHJlYW0gYXBwbGljYXRpb25zIHs8L3RleHQ+CiAgPHRleHQgeD0iMzcyIiB5PSIyNjAiIGNsYXNzPSJjIj5zZXJ2ZXIgMTI3LjAuMC4xOjgwODA7PC90ZXh0PgogIDx0ZXh0IHg9IjM3MiIgeT0iMjg0IiBjbGFzcz0iYyI+c2VydmVyIDEyNy4wLjAuMTo4MDgxOzwvdGV4dD4KICA8dGV4dCB4PSIzNTgiIHk9IjMwOCIgY2xhc3M9ImMiPn08L3RleHQ+CiAgPHRleHQgeD0iMzU4IiB5PSIzNDAiIGNsYXNzPSJjIj5wcm94eV9wYXNzPC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMzYwIiBjbGFzcz0iYyI+ICBodHRwOi8vYXBwbGljYXRpb25zOzwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9Im9rIiB4PSI4MjAiIHk9IjExMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxMzAiIHJ4PSIxMiIvPgogIDx0ZXh0IHg9IjgzOCIgeT0iMTQyIiBjbGFzcz0iaCI+Q29udGVuZXVyIGFwcDwvdGV4dD4KICA8dGV4dCB4PSI4MzgiIHk9IjE3MCIgY2xhc3M9ImMiPjEyNy4wLjAuMTo4MDgwIOKGkiA4MDgwPC90ZXh0PgogIDx0ZXh0IHg9IjgzOCIgeT0iMTk4IiBjbGFzcz0idCI+csOpcG9uZDwvdGV4dD4KICA8dGV4dCB4PSI4MzgiIHk9IjIyMiIgY2xhc3M9ImMiPk5hbWU6IHNpc3JOLWFwcDwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9Im9rIiB4PSI4MjAiIHk9IjI5MCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxMzAiIHJ4PSIxMiIvPgogIDx0ZXh0IHg9IjgzOCIgeT0iMzIyIiBjbGFzcz0iaCI+Q29udGVuZXVyIGFwcDI8L3RleHQ+CiAgPHRleHQgeD0iODM4IiB5PSIzNTAiIGNsYXNzPSJjIj4xMjcuMC4wLjE6ODA4MSDihpIgODA4MDwvdGV4dD4KICA8dGV4dCB4PSI4MzgiIHk9IjM3OCIgY2xhc3M9InQiPnLDqXBvbmQ8L3RleHQ+CiAgPHRleHQgeD0iODM4IiB5PSI0MDIiIGNsYXNzPSJjIj5OYW1lOiBzaXNyTi1hcHAyPC90ZXh0PgoKICA8IS0tIGZsdXggLS0+CiAgPHBhdGggZD0iTTI0MiAyMjAgTDMzNiAyMjAiIHN0cm9rZT0iIzFFODQ0OSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIiBtYXJrZXItZW5kPSJ1cmwoI2FnKSIvPgogIDx0ZXh0IHg9IjI1MCIgeT0iMjA2IiBjbGFzcz0iZyI+NDQzPC90ZXh0PgoKICA8cGF0aCBkPSJNNjQyIDIzMCBDNzIwIDIzMCA3NDAgMTc1IDgxNiAxNzUiIHN0cm9rZT0iIzM1NjhENCIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIiBtYXJrZXItZW5kPSJ1cmwoI2FiKSIvPgogIDxwYXRoIGQ9Ik02NDIgMjcwIEM3MjAgMjcwIDc0MCAzNTUgODE2IDM1NSIgc3Ryb2tlPSIjMzU2OEQ0IiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiIG1hcmtlci1lbmQ9InVybCgjYWIpIi8+CiAgPHRleHQgeD0iNjY0IiB5PSIyMDAiIGNsYXNzPSJiIj5yZXF1w6p0ZSAxLCAzLCA14oCmPC90ZXh0PgogIDx0ZXh0IHg9IjY2NCIgeT0iMzMwIiBjbGFzcz0iYiI+cmVxdcOqdGUgMiwgNCwgNuKApjwvdGV4dD4KICA8dGV4dCB4PSI2NjQiIHk9IjI2MiIgY2xhc3M9InQiPmJvdWNsZSBsb2NhbGU8L3RleHQ+CgogIDxwYXRoIGQ9Ik0yNDIgNDU1IEw1NjAgNDU1IiBzdHJva2U9IiNEOTVDNTkiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgNyIgbWFya2VyLWVuZD0idXJsKCNhcikiLz4KICA8bGluZSB4MT0iNTc1IiB5MT0iNDQwIiB4Mj0iNjA1IiB5Mj0iNDcwIiBzdHJva2U9IiNEOTVDNTkiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxsaW5lIHgxPSI2MDUiIHkxPSI0NDAiIHgyPSI1NzUiIHkyPSI0NzAiIHN0cm9rZT0iI0Q5NUM1OSIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPHRleHQgeD0iMzMwIiB5PSI0NDAiIGNsYXNzPSJiYWQiPjgwODAgLyA4MDgxIDogYXVjdW5lIHLDqXBvbnNlPC90ZXh0PgogIDx0ZXh0IHg9IjYyMCIgeT0iNDUwIiBjbGFzcz0idCI+cHVibGnDqXMgc3VyIDEyNy4wLjAuMSBzZXVsZW1lbnQ8L3RleHQ+CiAgPHRleHQgeD0iNjIwIiB5PSI0NzQiIGNsYXNzPSJ0Ij4rIGZpbHRyYWdlIG5mdGFibGVzIGRlIGwnaMO0dGU8L3RleHQ+CgogIDwhLS0gU3ludGjDqHNlIC0tPgogIDxyZWN0IGZpbGw9IiMxNzIwMzMiIHg9IjMwIiB5PSI1ODAiIHdpZHRoPSIxMTQwIiBoZWlnaHQ9IjY0IiByeD0iMTIiLz4KICA8dGV4dCB4PSI1MCIgeT0iNjA4IiBjbGFzcz0idGFndCI+w4AgUkVURU5JUiDCtyB1biBzZXVsIHBvaW50IGQnZW50csOpZSBwdWJsaWMgKDQ0MyksIHBsdXNpZXVycyBkZXN0aW5hdGlvbnMgcHJpdsOpZXMuPC90ZXh0PgogIDx0ZXh0IHg9IjUwIiB5PSI2MzAiIGNsYXNzPSJ0YWd0Ij5MZSBjaGFtcCBOYW1lIGRlIGxhIHLDqXBvbnNlIG1vbnRyZSBxdWVsbGUgYXBwbGljYXRpb24gYSByw6lwb25kdSA6IGMnZXN0IGxhIHByZXV2ZSBkZSBsYSByw6lwYXJ0aXRpb24uPC90ZXh0Pgo8L3N2Zz4K" alt="Le visiteur joint Nginx sur 443 ; Nginx répartit vers app (8080) et app2 (8081) par la boucle locale ; les ports applicatifs ne répondent pas depuis Internet." />
<figcaption aria-hidden="true">Le visiteur joint Nginx sur 443 ; Nginx
répartit vers app (8080) et app2 (8081) par la boucle locale ; les ports
applicatifs ne répondent pas depuis Internet.</figcaption>
</figure>
<h3 id="les-notions-de-la-séance">Les notions de la séance</h3>
<p><strong>Répartiteur de charge.</strong> Un proxy inverse peut
transmettre les requêtes d’un même nom de domaine à plusieurs
exemplaires d’une application. Le visiteur ne connaît qu’une adresse ;
le proxy choisit la destination. On y gagne en capacité (requêtes
partagées), en maintenance (mettre à jour l’un pendant que l’autre
répond) et en tolérance à la panne d’une application.</p>
<p><strong>Port de l’hôte, port du conteneur.</strong> Dans
<code>-p 127.0.0.1:8081:8080</code>, on lit : adresse de l’hôte, port de
l’hôte, port dans le conteneur. Les deux conteneurs écoutent 8080
<em>chez eux</em> ; sur l’hôte, ils occupent 8080 et 8081. Publier sur
<code>127.0.0.1</code> limite l’écoute à la boucle locale.</p>
<p><strong>Méthodes de répartition Nginx.</strong></p>
<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr>
<th>Méthode</th>
<th>Directive</th>
<th>Principe</th>
<th>Usage typique</th>
</tr>
</thead>
<tbody>
<tr>
<td>Circulaire</td>
<td><em>(par défaut)</em></td>
<td>chaque serveur à son tour</td>
<td>serveurs équivalents</td>
</tr>
<tr>
<td>Pondérée</td>
<td><code>server … weight=3;</code></td>
<td>plus de requêtes au serveur le plus lourd</td>
<td>machines inégales</td>
</tr>
<tr>
<td>Moins de connexions</td>
<td><code>least_conn;</code></td>
<td>serveur le moins occupé</td>
<td>requêtes longues</td>
</tr>
<tr>
<td>Par adresse client</td>
<td><code>ip_hash;</code></td>
<td>un même client va au même serveur</td>
<td>session conservée localement</td>
</tr>
</tbody>
</table>
<p>Les mêmes principes se retrouvent chez HAProxy, Traefik, les services
cloud (AWS Elastic Load Balancing, OVHcloud Load Balancer) ou les CDN
comme Cloudflare.</p>
<h3 id="étape-0-contrôler-le-point-de-départ">Étape 0 — Contrôler le
point de départ</h3>
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr>
<th>Contrôle</th>
<th>Commande</th>
<th>Attendu</th>
</tr>
</thead>
<tbody>
<tr>
<td>Site HTTPS</td>
<td><code>curl -sI https://sisrN.tp.siovision.fr/</code></td>
<td><code>HTTP/1.1 200</code> ou <code>HTTP/2 200</code></td>
</tr>
<tr>
<td>Écoutes</td>
<td><code>sudo ss -ltnp</code></td>
<td>Nginx sur 80 et 443, 8080 sur <code>127.0.0.1</code></td>
</tr>
<tr>
<td>Conteneur</td>
<td><code>sudo docker ps</code></td>
<td><code>app</code> démarré,
<code>127.0.0.1:8080-&gt;8080/tcp</code></td>
</tr>
<tr>
<td>Exposition</td>
<td>test de 8080 depuis l’extérieur</td>
<td>aucune réponse</td>
</tr>
</tbody>
</table>
<p>Si l’un de ces contrôles échoue, terminez d’abord P08 : c’est la
priorité.</p>
<h3 id="étape-1-démarrer-une-seconde-application">Étape 1 — Démarrer une
seconde application</h3>
<p>Conservez <code>app</code>. Créez un second conteneur indépendant,
sur la boucle locale uniquement :</p>
<div class="sourceCode" id="cb1"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> docker run <span class="at">-d</span> <span class="at">--name</span> app2 <span class="at">--restart</span> unless-stopped <span class="dt">\</span></span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  <span class="at">-p</span> 127.0.0.1:8081:8080 traefik/whoami <span class="dt">\</span></span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>  <span class="at">--port</span> 8080 <span class="at">--name</span> sisrN-app2</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> docker ps</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> http://127.0.0.1:8080/ <span class="kw">|</span> <span class="fu">grep</span> Name</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> http://127.0.0.1:8081/ <span class="kw">|</span> <span class="fu">grep</span> Name</span></code></pre></div>
<p>Remplacez N par votre numéro. Les deux <code>Name</code> doivent
différer ; sinon, identifiez les conteneurs avant de poursuivre
(<code>docker ps</code>, <code>docker logs app2</code>).</p>
<p><strong>Question 1.1.</strong> Pourquoi le port du conteneur
reste-t-il 8080 alors que l’hôte utilise 8081 ?</p>
<p><strong>Question 1.2.</strong> Depuis un autre serveur ou votre
poste, testez <code>curl -m 5 http://sisrN.tp.siovision.fr:8081/</code>.
Que constatez-vous ? Pourquoi cette absence de réponse ne suffit-elle
pas, seule, à prouver que 8081 est inaccessible ?</p>
<h3 id="étape-2-répartir-derrière-https">Étape 2 — Répartir derrière
HTTPS</h3>
<p>Sauvegardez d’abord la configuration du site :</p>
<div class="sourceCode" id="cb2"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> cp /etc/nginx/sites-available/<span class="op">&lt;</span>site<span class="op">&gt;</span> ~/<span class="op">&lt;</span>site<span class="op">&gt;</span>.bak</span></code></pre></div>
<p>Dans ce fichier, ajoutez le groupe <strong>hors des blocs
<code>server</code></strong> :</p>
<pre class="nginx"><code>upstream applications {
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}</code></pre>
<p>Dans la <code>location /</code> du bloc HTTPS, remplacez seulement la
destination : <code>proxy_pass http://applications;</code>. Conservez
certificat, en-têtes, exception ACME et redirection HTTP. Le fichier
complet attendu :</p>
<pre class="nginx"><code>upstream applications {
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}&#10;
server {
    listen 80;
    server_name sisrN.tp.siovision.fr;&#10;
    location /.well-known/acme-challenge/ {
        root /var/www/acme;
    }
    location / {
        return 301 https://$host$request_uri;
    }
}&#10;
server {
    listen 443 ssl;
    server_name sisrN.tp.siovision.fr;&#10;
    ssl_certificate     /etc/letsencrypt/live/sisrN.tp.siovision.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sisrN.tp.siovision.fr/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;&#10;
    access_log /var/log/nginx/sisrN-access.log;
    error_log  /var/log/nginx/sisrN-error.log;&#10;
    location / {
        proxy_pass http://applications;    # était http://127.0.0.1:8080
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}</code></pre>
<p>Validez <strong>avant</strong> de recharger :</p>
<div class="sourceCode" id="cb5"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> nginx <span class="at">-t</span></span>
<span id="cb5-2"><a href="#cb5-2" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> systemctl reload nginx</span></code></pre></div>
<p>Si <code>nginx -t</code> échoue, ne rechargez pas : lisez la ligne
indiquée, corrigez ou restaurez la sauvegarde, testez à nouveau. Puis,
depuis l’extérieur, répétez six fois :</p>
<div class="sourceCode" id="cb6"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> https://sisrN.tp.siovision.fr/ <span class="kw">|</span> <span class="fu">grep</span> Name</span></code></pre></div>
<p><strong>Question 2.1.</strong> Relevez les six noms dans l’ordre.
Quelle règle de distribution semble utilisée ?</p>
<p><strong>Question 2.2.</strong> Pourquoi ne peut-on pas conclure à une
alternance parfaite pour tous les visiteurs ?</p>
<p><strong>Question 2.3.</strong> Pourquoi <code>reload</code> plutôt
que <code>restart</code> sur un service en production ?</p>
<h3 id="étape-3-vérifier-lexposition">Étape 3 — Vérifier
l’exposition</h3>
<p>Complétez la matrice à partir de <strong>vos</strong> tests :</p>
<table>
<thead>
<tr>
<th>Source</th>
<th>Destination</th>
<th>Doit répondre ?</th>
<th>Observé</th>
<th>Preuve</th>
</tr>
</thead>
<tbody>
<tr>
<td>Internet</td>
<td>443</td>
<td>oui</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>Internet</td>
<td>80</td>
<td>oui (redirection)</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>Internet</td>
<td>8080</td>
<td>non</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>Internet</td>
<td>8081</td>
<td>non</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>Nginx (local)</td>
<td>8080 et 8081</td>
<td>oui</td>
<td>…</td>
<td>…</td>
</tr>
</tbody>
</table>
<h3 id="étape-4-expliquer-le-chemin">Étape 4 — Expliquer le chemin</h3>
<ol type="1">
<li>Dessinez le trajet d’une requête du navigateur jusqu’à
<code>app2</code>, en notant chaque port et l’endroit où TLS se
termine.</li>
<li>Expliquez en trois phrases pourquoi 8081 ne doit pas être
public.</li>
<li><strong>Pour aller plus loin.</strong> Écrivez
l’<code>upstream</code> qui enverrait deux fois plus de requêtes à
<code>app</code> qu’à <code>app2</code>. Vérifiez-le avec
<code>nginx -t</code>, puis avec une dizaine de requêtes.</li>
</ol>
<h3 id="checklist-de-sortie">Checklist de sortie</h3>
<ul class="task-list">
<li><label><input type="checkbox"></input><code>sudo docker ps</code> montre
<code>app</code> et <code>app2</code>, publiés sur
<code>127.0.0.1</code>.</label></li>
<li><label><input type="checkbox"></input>Deux réponses locales avec des
<code>Name</code> différents.</label></li>
<li><label><input type="checkbox"></input><code>sudo nginx -t</code> réussi,
configuration sauvegardée.</label></li>
<li><label><input type="checkbox"></input>Six réponses HTTPS relevées depuis
l’extérieur, les deux noms apparaissent.</label></li>
<li><label><input type="checkbox"></input>8080 et 8081 sans réponse depuis
l’extérieur, adresses d’écoute vérifiées.</label></li>
<li><label><input type="checkbox"></input>Schéma du chemin d’une requête et
justification de la fermeture de 8081.</label></li>
</ul>
<p>Si le temps manque : deux réponses locales et HTTPS toujours
fonctionnel d’abord ; la répartition se termine en début de séance
demain, avant la panne contrôlée.</p>
<p>L’IA peut aider à interpréter un message d’erreur après une première
recherche ; expliquez et vérifiez chaque commande. Ne transmettez jamais
de clé privée ni de secret. Sources : <a href="https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/">Nginx
— HTTP load balancing</a>, <a href="https://docs.docker.com/engine/network/port-publishing/">Docker —
publication de ports</a>.</p>
<details class="corriges"><summary>Corrigés — à ouvrir après avoir cherché</summary>
<p><strong>1.1.</strong> L’application écoute 8080 dans son propre
espace réseau ; Docker relie le port 8081 de l’hôte au 8080 du
conteneur. Deux conteneurs ne se gênent pas à l’intérieur, mais l’hôte
ne peut pas attribuer deux fois le même port sur la même adresse.</p>
<p><strong>1.2.</strong> Pas de réponse (délai dépassé ou connexion
refusée). Ce test ne vaut que depuis cette source et ce chemin : on le
complète par <code>ss -ltnp</code> (écoute sur
<code>127.0.0.1:8081</code> seulement) et par les règles de
filtrage.</p>
<p><strong>2.1.</strong> Alternance <code>sisrN-app</code>,
<code>sisrN-app2</code>… : répartition circulaire, méthode par
défaut.</p>
<p><strong>2.2.</strong> D’autres clients partagent le cycle, des
connexions peuvent être réutilisées, un serveur en échec est
temporairement écarté : la distribution est globale, pas garantie client
par client.</p>
<p><strong>2.3.</strong> <code>reload</code> relit la configuration sans
couper les connexions en cours ; <code>restart</code> arrête le service,
et une configuration invalide le laisserait arrêté.</p>
<p><strong>Étape 3.</strong> 443 : réponse HTTPS ; 80 : redirection 301
vers HTTPS ; 8080 et 8081 : aucune réponse depuis l’extérieur ; en
local, <code>curl http://127.0.0.1:8080/</code> et <code>:8081/</code>
répondent.</p>
<p><strong>Étape 4.</strong> Navigateur → TCP 443 → Nginx (TLS terminé
ici) → <code>upstream applications</code> → <code>127.0.0.1:8081</code>
→ conteneur <code>app2</code> port 8080. Exposer 8081 permettrait de
contourner TLS, les en-têtes et le contrôle du proxy, et ajouterait une
surface d’attaque inutile. Extension :
<code>server 127.0.0.1:8080 weight=2;</code> puis
<code>server 127.0.0.1:8081;</code>.</p>
</details>
