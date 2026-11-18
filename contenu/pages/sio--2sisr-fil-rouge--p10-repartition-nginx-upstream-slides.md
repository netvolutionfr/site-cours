<section id="deux-applications-un-seul-point-dentrée" class="slide title">
<h2>Deux applications, un seul point d’entrée</h2>
<h3 id="répartir-les-requêtes-avec-nginx-sur-une-instance-cloud">Répartir
les requêtes avec Nginx sur une instance cloud</h3>
<figure>
<img role="img" aria-label="Chemin d’une requête : HTTPS vers Nginx, puis répartition vers deux conteneurs locaux." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDY2MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsbGVkYnk9InRpdGxlIGRlc2MiPgogIDx0aXRsZSBpZD0idGl0bGUiPkNoZW1pbiBkJ3VuZSByZXF1w6p0ZSA6IHVuIHBvaW50IGQnZW50csOpZSBIVFRQUywgZGV1eCBhcHBsaWNhdGlvbnMgbG9jYWxlczwvdGl0bGU+CiAgPGRlc2MgaWQ9ImRlc2MiPkxlIHZpc2l0ZXVyIGpvaW50IHNpc3JOLnRwLnNpb3Zpc2lvbi5mciBlbiBIVFRQUyBzdXIgbGUgcG9ydCA0NDMuIE5naW54IHRlcm1pbmUgVExTLCBwdWlzIGxlIGdyb3VwZSB1cHN0cmVhbSBhcHBsaWNhdGlvbnMgdHJhbnNtZXQgY2hhcXVlIHJlcXXDqnRlLCDDoCB0b3VyIGRlIHLDtGxlLCBhdSBjb250ZW5ldXIgYXBwIHN1ciAxMjcuMC4wLjE6ODA4MCBvdSBhdSBjb250ZW5ldXIgYXBwMiBzdXIgMTI3LjAuMC4xOjgwODEuIERlcHVpcyBJbnRlcm5ldCwgbGVzIHBvcnRzIDgwODAgZXQgODA4MSBuZSByw6lwb25kZW50IHBhcy4gQ2hhcXVlIGFwcGxpY2F0aW9uIHJlbnZvaWUgc29uIHByb3ByZSBub20sIGNlIHF1aSBwZXJtZXQgZGUgdm9pciBxdWkgYSByw6lwb25kdS48L2Rlc2M+CiAgPGRlZnM+CiAgICA8bWFya2VyIGlkPSJhZyIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iNyIgbWFya2VySGVpZ2h0PSI3IiBvcmllbnQ9ImF1dG8iPjxwYXRoIGQ9Ik0wIDBMMTAgNUwwIDEweiIgZmlsbD0iIzFFODQ0OSIvPjwvbWFya2VyPgogICAgPG1hcmtlciBpZD0iYWIiIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjciIG1hcmtlckhlaWdodD0iNyIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCAwTDEwIDVMMCAxMHoiIGZpbGw9IiMzNTY4RDQiLz48L21hcmtlcj4KICAgIDxtYXJrZXIgaWQ9ImFyIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI3IiBtYXJrZXJIZWlnaHQ9IjciIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAgMEwxMCA1TDAgMTB6IiBmaWxsPSIjRDk1QzU5Ii8+PC9tYXJrZXI+CiAgPC9kZWZzPgogIDxzdHlsZT4KICAgIC56b25le2ZpbGw6I2ZmZjtzdHJva2U6IzE3MjAzMztzdHJva2Utd2lkdGg6Mi41fQogICAgLnN2Y3tmaWxsOiNFQUY0RkI7c3Ryb2tlOiMzNTY4RDQ7c3Ryb2tlLXdpZHRoOjJ9CiAgICAuc3ZjMntmaWxsOiNGN0Y4RkE7c3Ryb2tlOiM2NTc4OGQ7c3Ryb2tlLXdpZHRoOjJ9CiAgICAub2t7ZmlsbDojRUFGNkVFO3N0cm9rZTojMUU4NDQ5O3N0cm9rZS13aWR0aDoyfQogICAgLmh7Zm9udDo3MDAgMTlweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6IzE3MjAzM30KICAgIC50e2ZvbnQ6NTAwIDE1cHggQXJpYWwsc2Fucy1zZXJpZjtmaWxsOiMzYzRiNWN9CiAgICAuY3tmb250OjYwMCAxNXB4IG1vbm9zcGFjZTtmaWxsOiMxNjRkNzl9CiAgICAuZ3tmb250OjcwMCAxNXB4IEFyaWFsLHNhbnMtc2VyaWY7ZmlsbDojMUU4NDQ5fQogICAgLmJ7Zm9udDo3MDAgMTVweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6IzM1NjhENH0KICAgIC5iYWR7Zm9udDo3MDAgMTVweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6I0Q5NUM1OX0KICAgIC50YWd0e2ZvbnQ6NzAwIDE0cHggQXJpYWwsc2Fucy1zZXJpZjtmaWxsOiNmZmZ9CiAgPC9zdHlsZT4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NjAiIGZpbGw9IiNGN0Y4RkEiLz4KCiAgPCEtLSBJbnRlcm5ldCAtLT4KICA8cmVjdCBjbGFzcz0ic3ZjMiIgeD0iMzAiIHk9IjE1MCIgd2lkdGg9IjIxMCIgaGVpZ2h0PSIxNTAiIHJ4PSIxMiIvPgogIDx0ZXh0IHg9IjQ4IiB5PSIxODQiIGNsYXNzPSJoIj5WaXNpdGV1cjwvdGV4dD4KICA8dGV4dCB4PSI0OCIgeT0iMjEyIiBjbGFzcz0iYyI+Y3VybCAtcyBodHRwczovLzwvdGV4dD4KICA8dGV4dCB4PSI0OCIgeT0iMjM0IiBjbGFzcz0iYyI+c2lzck4udHAuPC90ZXh0PgogIDx0ZXh0IHg9IjQ4IiB5PSIyNTYiIGNsYXNzPSJjIj5zaW92aXNpb24uZnIvPC90ZXh0PgogIDx0ZXh0IHg9IjQ4IiB5PSIyODQiIGNsYXNzPSJ0Ij5uYXZpZ2F0ZXVyLCBwb3N0ZeKApjwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9InN2YzIiIHg9IjMwIiB5PSI0MDAiIHdpZHRoPSIyMTAiIGhlaWdodD0iMTEwIiByeD0iMTIiLz4KICA8dGV4dCB4PSI0OCIgeT0iNDM0IiBjbGFzcz0iaCI+U2Nhbm5lcjwvdGV4dD4KICA8dGV4dCB4PSI0OCIgeT0iNDYyIiBjbGFzcz0iYyI+OjgwODAgIDo4MDgxPC90ZXh0PgogIDx0ZXh0IHg9IjQ4IiB5PSI0ODgiIGNsYXNzPSJ0Ij50ZXN0ZSBsZXMgcG9ydHM8L3RleHQ+CgogIDwhLS0gSW5zdGFuY2UgLS0+CiAgPHJlY3QgY2xhc3M9InpvbmUiIHg9IjMwMCIgeT0iNDAiIHdpZHRoPSI4NzAiIGhlaWdodD0iNTIwIiByeD0iMTYiLz4KICA8cmVjdCBmaWxsPSIjMTcyMDMzIiB4PSIzMDAiIHk9IjQwIiB3aWR0aD0iODcwIiBoZWlnaHQ9IjM2IiByeD0iMTYiLz48cmVjdCBmaWxsPSIjMTcyMDMzIiB4PSIzMDAiIHk9IjYwIiB3aWR0aD0iODcwIiBoZWlnaHQ9IjE2Ii8+CiAgPHRleHQgeD0iMzE4IiB5PSI2NCIgY2xhc3M9InRhZ3QiPklOU1RBTkNFIENMT1VEIHNpc3JOIMK3IERFQklBTiDCtyBVTkUgU0VVTEUgQURSRVNTRSBQVUJMSVFVRTwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9InN2YyIgeD0iMzQwIiB5PSIxMjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiByeD0iMTIiLz4KICA8dGV4dCB4PSIzNTgiIHk9IjE1MiIgY2xhc3M9ImgiPk5naW54LCBwcm94eSBpbnZlcnNlPC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMTgwIiBjbGFzcz0iYyI+bGlzdGVuIDQ0MyBzc2w7PC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMjA0IiBjbGFzcz0idCI+dGVybWluZSBUTFMgKGNlcnRpZmljYXQpPC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMjM2IiBjbGFzcz0iYyI+dXBzdHJlYW0gYXBwbGljYXRpb25zIHs8L3RleHQ+CiAgPHRleHQgeD0iMzcyIiB5PSIyNjAiIGNsYXNzPSJjIj5zZXJ2ZXIgMTI3LjAuMC4xOjgwODA7PC90ZXh0PgogIDx0ZXh0IHg9IjM3MiIgeT0iMjg0IiBjbGFzcz0iYyI+c2VydmVyIDEyNy4wLjAuMTo4MDgxOzwvdGV4dD4KICA8dGV4dCB4PSIzNTgiIHk9IjMwOCIgY2xhc3M9ImMiPn08L3RleHQ+CiAgPHRleHQgeD0iMzU4IiB5PSIzNDAiIGNsYXNzPSJjIj5wcm94eV9wYXNzPC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMzYwIiBjbGFzcz0iYyI+ICBodHRwOi8vYXBwbGljYXRpb25zOzwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9Im9rIiB4PSI4MjAiIHk9IjExMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxMzAiIHJ4PSIxMiIvPgogIDx0ZXh0IHg9IjgzOCIgeT0iMTQyIiBjbGFzcz0iaCI+Q29udGVuZXVyIGFwcDwvdGV4dD4KICA8dGV4dCB4PSI4MzgiIHk9IjE3MCIgY2xhc3M9ImMiPjEyNy4wLjAuMTo4MDgwIOKGkiA4MDgwPC90ZXh0PgogIDx0ZXh0IHg9IjgzOCIgeT0iMTk4IiBjbGFzcz0idCI+csOpcG9uZDwvdGV4dD4KICA8dGV4dCB4PSI4MzgiIHk9IjIyMiIgY2xhc3M9ImMiPk5hbWU6IHNpc3JOLWFwcDwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9Im9rIiB4PSI4MjAiIHk9IjI5MCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxMzAiIHJ4PSIxMiIvPgogIDx0ZXh0IHg9IjgzOCIgeT0iMzIyIiBjbGFzcz0iaCI+Q29udGVuZXVyIGFwcDI8L3RleHQ+CiAgPHRleHQgeD0iODM4IiB5PSIzNTAiIGNsYXNzPSJjIj4xMjcuMC4wLjE6ODA4MSDihpIgODA4MDwvdGV4dD4KICA8dGV4dCB4PSI4MzgiIHk9IjM3OCIgY2xhc3M9InQiPnLDqXBvbmQ8L3RleHQ+CiAgPHRleHQgeD0iODM4IiB5PSI0MDIiIGNsYXNzPSJjIj5OYW1lOiBzaXNyTi1hcHAyPC90ZXh0PgoKICA8IS0tIGZsdXggLS0+CiAgPHBhdGggZD0iTTI0MiAyMjAgTDMzNiAyMjAiIHN0cm9rZT0iIzFFODQ0OSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIiBtYXJrZXItZW5kPSJ1cmwoI2FnKSIvPgogIDx0ZXh0IHg9IjI1MCIgeT0iMjA2IiBjbGFzcz0iZyI+NDQzPC90ZXh0PgoKICA8cGF0aCBkPSJNNjQyIDIzMCBDNzIwIDIzMCA3NDAgMTc1IDgxNiAxNzUiIHN0cm9rZT0iIzM1NjhENCIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIiBtYXJrZXItZW5kPSJ1cmwoI2FiKSIvPgogIDxwYXRoIGQ9Ik02NDIgMjcwIEM3MjAgMjcwIDc0MCAzNTUgODE2IDM1NSIgc3Ryb2tlPSIjMzU2OEQ0IiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiIG1hcmtlci1lbmQ9InVybCgjYWIpIi8+CiAgPHRleHQgeD0iNjY0IiB5PSIyMDAiIGNsYXNzPSJiIj5yZXF1w6p0ZSAxLCAzLCA14oCmPC90ZXh0PgogIDx0ZXh0IHg9IjY2NCIgeT0iMzMwIiBjbGFzcz0iYiI+cmVxdcOqdGUgMiwgNCwgNuKApjwvdGV4dD4KICA8dGV4dCB4PSI2NjQiIHk9IjI2MiIgY2xhc3M9InQiPmJvdWNsZSBsb2NhbGU8L3RleHQ+CgogIDxwYXRoIGQ9Ik0yNDIgNDU1IEw1NjAgNDU1IiBzdHJva2U9IiNEOTVDNTkiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgNyIgbWFya2VyLWVuZD0idXJsKCNhcikiLz4KICA8bGluZSB4MT0iNTc1IiB5MT0iNDQwIiB4Mj0iNjA1IiB5Mj0iNDcwIiBzdHJva2U9IiNEOTVDNTkiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxsaW5lIHgxPSI2MDUiIHkxPSI0NDAiIHgyPSI1NzUiIHkyPSI0NzAiIHN0cm9rZT0iI0Q5NUM1OSIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPHRleHQgeD0iMzMwIiB5PSI0NDAiIGNsYXNzPSJiYWQiPjgwODAgLyA4MDgxIDogYXVjdW5lIHLDqXBvbnNlPC90ZXh0PgogIDx0ZXh0IHg9IjYyMCIgeT0iNDUwIiBjbGFzcz0idCI+cHVibGnDqXMgc3VyIDEyNy4wLjAuMSBzZXVsZW1lbnQ8L3RleHQ+CiAgPHRleHQgeD0iNjIwIiB5PSI0NzQiIGNsYXNzPSJ0Ij4rIGZpbHRyYWdlIG5mdGFibGVzIGRlIGwnaMO0dGU8L3RleHQ+CgogIDwhLS0gU3ludGjDqHNlIC0tPgogIDxyZWN0IGZpbGw9IiMxNzIwMzMiIHg9IjMwIiB5PSI1ODAiIHdpZHRoPSIxMTQwIiBoZWlnaHQ9IjY0IiByeD0iMTIiLz4KICA8dGV4dCB4PSI1MCIgeT0iNjA4IiBjbGFzcz0idGFndCI+w4AgUkVURU5JUiDCtyB1biBzZXVsIHBvaW50IGQnZW50csOpZSBwdWJsaWMgKDQ0MyksIHBsdXNpZXVycyBkZXN0aW5hdGlvbnMgcHJpdsOpZXMuPC90ZXh0PgogIDx0ZXh0IHg9IjUwIiB5PSI2MzAiIGNsYXNzPSJ0YWd0Ij5MZSBjaGFtcCBOYW1lIGRlIGxhIHLDqXBvbnNlIG1vbnRyZSBxdWVsbGUgYXBwbGljYXRpb24gYSByw6lwb25kdSA6IGMnZXN0IGxhIHByZXV2ZSBkZSBsYSByw6lwYXJ0aXRpb24uPC90ZXh0Pgo8L3N2Zz4K" alt="Chemin d’une requête : HTTPS vers Nginx, puis répartition vers deux conteneurs locaux." />
<figcaption aria-hidden="true">Chemin d’une requête : HTTPS vers Nginx,
puis répartition vers deux conteneurs locaux.</figcaption>
</figure>
</section>
<section id="objectifs" class="slide concept">
<h2>Objectifs</h2>
<ul>
<li><strong>Vérifier</strong> séparément deux applications sur le
serveur, avant tout proxy.</li>
<li><strong>Configurer</strong> un groupe <code>upstream</code> et
valider le service HTTPS.</li>
<li><strong>Distinguer</strong> ce qui est exposé à Internet de ce qui
reste local.</li>
</ul>
<p><strong>Prérequis :</strong> P08 fonctionnel — site HTTPS à votre
nom, port 8080 fermé depuis l’extérieur. Sinon, la fiche P08 reste la
priorité du début de séance.</p>
</section>
<section id="point-de-départ-ce-que-p08-a-mis-en-place" class="slide concept">
<h2>Point de départ : ce que P08 a mis en place</h2>
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr>
<th>Élément</th>
<th>État attendu</th>
<th>Preuve</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nginx</td>
<td>écoute 80 et 443</td>
<td><code>sudo ss -ltnp</code></td>
</tr>
<tr>
<td>Certificat</td>
<td>valide pour <code>sisrN.tp.siovision.fr</code></td>
<td>cadenas, <code>curl -I https://…</code></td>
</tr>
<tr>
<td>Conteneur <code>app</code></td>
<td>publié sur <code>127.0.0.1:8080</code></td>
<td><code>sudo docker ps</code></td>
</tr>
<tr>
<td>Port 8080</td>
<td>aucune réponse depuis l’extérieur</td>
<td>test depuis un autre serveur</td>
</tr>
</tbody>
</table>
<p>Aujourd’hui on <strong>ajoute</strong> une application, on ne
reconstruit rien.</p>
</section>
<section id="pourquoi-plusieurs-exemplaires-dune-application" class="slide concept">
<h2>Pourquoi plusieurs exemplaires d’une application ?</h2>
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr>
<th>Besoin</th>
<th>Ce que permet un second exemplaire</th>
</tr>
</thead>
<tbody>
<tr>
<td>Absorber plus de visiteurs</td>
<td>partager les requêtes entre deux processus</td>
</tr>
<tr>
<td>Mettre à jour sans couper</td>
<td>arrêter l’un pendant que l’autre répond</td>
</tr>
<tr>
<td>Limiter l’effet d’un plantage</td>
<td>une application tombe, l’autre continue</td>
</tr>
</tbody>
</table>
<p>Le visiteur ne voit <strong>qu’une adresse</strong> : c’est le proxy
qui choisit la destination. C’est le rôle d’un <strong>répartiteur de
charge</strong> (<em>load balancer</em>).</p>
</section>
<section id="le-chemin-dune-requête" class="slide full-image">
<h2>Le chemin d’une requête</h2>
<figure>
<img role="img" aria-label="Le visiteur joint Nginx sur 443 ; Nginx répartit vers app (8080) et app2 (8081) par la boucle locale ; les ports applicatifs ne répondent pas depuis Internet." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDY2MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsbGVkYnk9InRpdGxlIGRlc2MiPgogIDx0aXRsZSBpZD0idGl0bGUiPkNoZW1pbiBkJ3VuZSByZXF1w6p0ZSA6IHVuIHBvaW50IGQnZW50csOpZSBIVFRQUywgZGV1eCBhcHBsaWNhdGlvbnMgbG9jYWxlczwvdGl0bGU+CiAgPGRlc2MgaWQ9ImRlc2MiPkxlIHZpc2l0ZXVyIGpvaW50IHNpc3JOLnRwLnNpb3Zpc2lvbi5mciBlbiBIVFRQUyBzdXIgbGUgcG9ydCA0NDMuIE5naW54IHRlcm1pbmUgVExTLCBwdWlzIGxlIGdyb3VwZSB1cHN0cmVhbSBhcHBsaWNhdGlvbnMgdHJhbnNtZXQgY2hhcXVlIHJlcXXDqnRlLCDDoCB0b3VyIGRlIHLDtGxlLCBhdSBjb250ZW5ldXIgYXBwIHN1ciAxMjcuMC4wLjE6ODA4MCBvdSBhdSBjb250ZW5ldXIgYXBwMiBzdXIgMTI3LjAuMC4xOjgwODEuIERlcHVpcyBJbnRlcm5ldCwgbGVzIHBvcnRzIDgwODAgZXQgODA4MSBuZSByw6lwb25kZW50IHBhcy4gQ2hhcXVlIGFwcGxpY2F0aW9uIHJlbnZvaWUgc29uIHByb3ByZSBub20sIGNlIHF1aSBwZXJtZXQgZGUgdm9pciBxdWkgYSByw6lwb25kdS48L2Rlc2M+CiAgPGRlZnM+CiAgICA8bWFya2VyIGlkPSJhZyIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iNyIgbWFya2VySGVpZ2h0PSI3IiBvcmllbnQ9ImF1dG8iPjxwYXRoIGQ9Ik0wIDBMMTAgNUwwIDEweiIgZmlsbD0iIzFFODQ0OSIvPjwvbWFya2VyPgogICAgPG1hcmtlciBpZD0iYWIiIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjciIG1hcmtlckhlaWdodD0iNyIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCAwTDEwIDVMMCAxMHoiIGZpbGw9IiMzNTY4RDQiLz48L21hcmtlcj4KICAgIDxtYXJrZXIgaWQ9ImFyIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI3IiBtYXJrZXJIZWlnaHQ9IjciIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAgMEwxMCA1TDAgMTB6IiBmaWxsPSIjRDk1QzU5Ii8+PC9tYXJrZXI+CiAgPC9kZWZzPgogIDxzdHlsZT4KICAgIC56b25le2ZpbGw6I2ZmZjtzdHJva2U6IzE3MjAzMztzdHJva2Utd2lkdGg6Mi41fQogICAgLnN2Y3tmaWxsOiNFQUY0RkI7c3Ryb2tlOiMzNTY4RDQ7c3Ryb2tlLXdpZHRoOjJ9CiAgICAuc3ZjMntmaWxsOiNGN0Y4RkE7c3Ryb2tlOiM2NTc4OGQ7c3Ryb2tlLXdpZHRoOjJ9CiAgICAub2t7ZmlsbDojRUFGNkVFO3N0cm9rZTojMUU4NDQ5O3N0cm9rZS13aWR0aDoyfQogICAgLmh7Zm9udDo3MDAgMTlweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6IzE3MjAzM30KICAgIC50e2ZvbnQ6NTAwIDE1cHggQXJpYWwsc2Fucy1zZXJpZjtmaWxsOiMzYzRiNWN9CiAgICAuY3tmb250OjYwMCAxNXB4IG1vbm9zcGFjZTtmaWxsOiMxNjRkNzl9CiAgICAuZ3tmb250OjcwMCAxNXB4IEFyaWFsLHNhbnMtc2VyaWY7ZmlsbDojMUU4NDQ5fQogICAgLmJ7Zm9udDo3MDAgMTVweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6IzM1NjhENH0KICAgIC5iYWR7Zm9udDo3MDAgMTVweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6I0Q5NUM1OX0KICAgIC50YWd0e2ZvbnQ6NzAwIDE0cHggQXJpYWwsc2Fucy1zZXJpZjtmaWxsOiNmZmZ9CiAgPC9zdHlsZT4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NjAiIGZpbGw9IiNGN0Y4RkEiLz4KCiAgPCEtLSBJbnRlcm5ldCAtLT4KICA8cmVjdCBjbGFzcz0ic3ZjMiIgeD0iMzAiIHk9IjE1MCIgd2lkdGg9IjIxMCIgaGVpZ2h0PSIxNTAiIHJ4PSIxMiIvPgogIDx0ZXh0IHg9IjQ4IiB5PSIxODQiIGNsYXNzPSJoIj5WaXNpdGV1cjwvdGV4dD4KICA8dGV4dCB4PSI0OCIgeT0iMjEyIiBjbGFzcz0iYyI+Y3VybCAtcyBodHRwczovLzwvdGV4dD4KICA8dGV4dCB4PSI0OCIgeT0iMjM0IiBjbGFzcz0iYyI+c2lzck4udHAuPC90ZXh0PgogIDx0ZXh0IHg9IjQ4IiB5PSIyNTYiIGNsYXNzPSJjIj5zaW92aXNpb24uZnIvPC90ZXh0PgogIDx0ZXh0IHg9IjQ4IiB5PSIyODQiIGNsYXNzPSJ0Ij5uYXZpZ2F0ZXVyLCBwb3N0ZeKApjwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9InN2YzIiIHg9IjMwIiB5PSI0MDAiIHdpZHRoPSIyMTAiIGhlaWdodD0iMTEwIiByeD0iMTIiLz4KICA8dGV4dCB4PSI0OCIgeT0iNDM0IiBjbGFzcz0iaCI+U2Nhbm5lcjwvdGV4dD4KICA8dGV4dCB4PSI0OCIgeT0iNDYyIiBjbGFzcz0iYyI+OjgwODAgIDo4MDgxPC90ZXh0PgogIDx0ZXh0IHg9IjQ4IiB5PSI0ODgiIGNsYXNzPSJ0Ij50ZXN0ZSBsZXMgcG9ydHM8L3RleHQ+CgogIDwhLS0gSW5zdGFuY2UgLS0+CiAgPHJlY3QgY2xhc3M9InpvbmUiIHg9IjMwMCIgeT0iNDAiIHdpZHRoPSI4NzAiIGhlaWdodD0iNTIwIiByeD0iMTYiLz4KICA8cmVjdCBmaWxsPSIjMTcyMDMzIiB4PSIzMDAiIHk9IjQwIiB3aWR0aD0iODcwIiBoZWlnaHQ9IjM2IiByeD0iMTYiLz48cmVjdCBmaWxsPSIjMTcyMDMzIiB4PSIzMDAiIHk9IjYwIiB3aWR0aD0iODcwIiBoZWlnaHQ9IjE2Ii8+CiAgPHRleHQgeD0iMzE4IiB5PSI2NCIgY2xhc3M9InRhZ3QiPklOU1RBTkNFIENMT1VEIHNpc3JOIMK3IERFQklBTiDCtyBVTkUgU0VVTEUgQURSRVNTRSBQVUJMSVFVRTwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9InN2YyIgeD0iMzQwIiB5PSIxMjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiByeD0iMTIiLz4KICA8dGV4dCB4PSIzNTgiIHk9IjE1MiIgY2xhc3M9ImgiPk5naW54LCBwcm94eSBpbnZlcnNlPC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMTgwIiBjbGFzcz0iYyI+bGlzdGVuIDQ0MyBzc2w7PC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMjA0IiBjbGFzcz0idCI+dGVybWluZSBUTFMgKGNlcnRpZmljYXQpPC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMjM2IiBjbGFzcz0iYyI+dXBzdHJlYW0gYXBwbGljYXRpb25zIHs8L3RleHQ+CiAgPHRleHQgeD0iMzcyIiB5PSIyNjAiIGNsYXNzPSJjIj5zZXJ2ZXIgMTI3LjAuMC4xOjgwODA7PC90ZXh0PgogIDx0ZXh0IHg9IjM3MiIgeT0iMjg0IiBjbGFzcz0iYyI+c2VydmVyIDEyNy4wLjAuMTo4MDgxOzwvdGV4dD4KICA8dGV4dCB4PSIzNTgiIHk9IjMwOCIgY2xhc3M9ImMiPn08L3RleHQ+CiAgPHRleHQgeD0iMzU4IiB5PSIzNDAiIGNsYXNzPSJjIj5wcm94eV9wYXNzPC90ZXh0PgogIDx0ZXh0IHg9IjM1OCIgeT0iMzYwIiBjbGFzcz0iYyI+ICBodHRwOi8vYXBwbGljYXRpb25zOzwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9Im9rIiB4PSI4MjAiIHk9IjExMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxMzAiIHJ4PSIxMiIvPgogIDx0ZXh0IHg9IjgzOCIgeT0iMTQyIiBjbGFzcz0iaCI+Q29udGVuZXVyIGFwcDwvdGV4dD4KICA8dGV4dCB4PSI4MzgiIHk9IjE3MCIgY2xhc3M9ImMiPjEyNy4wLjAuMTo4MDgwIOKGkiA4MDgwPC90ZXh0PgogIDx0ZXh0IHg9IjgzOCIgeT0iMTk4IiBjbGFzcz0idCI+csOpcG9uZDwvdGV4dD4KICA8dGV4dCB4PSI4MzgiIHk9IjIyMiIgY2xhc3M9ImMiPk5hbWU6IHNpc3JOLWFwcDwvdGV4dD4KCiAgPHJlY3QgY2xhc3M9Im9rIiB4PSI4MjAiIHk9IjI5MCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxMzAiIHJ4PSIxMiIvPgogIDx0ZXh0IHg9IjgzOCIgeT0iMzIyIiBjbGFzcz0iaCI+Q29udGVuZXVyIGFwcDI8L3RleHQ+CiAgPHRleHQgeD0iODM4IiB5PSIzNTAiIGNsYXNzPSJjIj4xMjcuMC4wLjE6ODA4MSDihpIgODA4MDwvdGV4dD4KICA8dGV4dCB4PSI4MzgiIHk9IjM3OCIgY2xhc3M9InQiPnLDqXBvbmQ8L3RleHQ+CiAgPHRleHQgeD0iODM4IiB5PSI0MDIiIGNsYXNzPSJjIj5OYW1lOiBzaXNyTi1hcHAyPC90ZXh0PgoKICA8IS0tIGZsdXggLS0+CiAgPHBhdGggZD0iTTI0MiAyMjAgTDMzNiAyMjAiIHN0cm9rZT0iIzFFODQ0OSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIiBtYXJrZXItZW5kPSJ1cmwoI2FnKSIvPgogIDx0ZXh0IHg9IjI1MCIgeT0iMjA2IiBjbGFzcz0iZyI+NDQzPC90ZXh0PgoKICA8cGF0aCBkPSJNNjQyIDIzMCBDNzIwIDIzMCA3NDAgMTc1IDgxNiAxNzUiIHN0cm9rZT0iIzM1NjhENCIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIiBtYXJrZXItZW5kPSJ1cmwoI2FiKSIvPgogIDxwYXRoIGQ9Ik02NDIgMjcwIEM3MjAgMjcwIDc0MCAzNTUgODE2IDM1NSIgc3Ryb2tlPSIjMzU2OEQ0IiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiIG1hcmtlci1lbmQ9InVybCgjYWIpIi8+CiAgPHRleHQgeD0iNjY0IiB5PSIyMDAiIGNsYXNzPSJiIj5yZXF1w6p0ZSAxLCAzLCA14oCmPC90ZXh0PgogIDx0ZXh0IHg9IjY2NCIgeT0iMzMwIiBjbGFzcz0iYiI+cmVxdcOqdGUgMiwgNCwgNuKApjwvdGV4dD4KICA8dGV4dCB4PSI2NjQiIHk9IjI2MiIgY2xhc3M9InQiPmJvdWNsZSBsb2NhbGU8L3RleHQ+CgogIDxwYXRoIGQ9Ik0yNDIgNDU1IEw1NjAgNDU1IiBzdHJva2U9IiNEOTVDNTkiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgNyIgbWFya2VyLWVuZD0idXJsKCNhcikiLz4KICA8bGluZSB4MT0iNTc1IiB5MT0iNDQwIiB4Mj0iNjA1IiB5Mj0iNDcwIiBzdHJva2U9IiNEOTVDNTkiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxsaW5lIHgxPSI2MDUiIHkxPSI0NDAiIHgyPSI1NzUiIHkyPSI0NzAiIHN0cm9rZT0iI0Q5NUM1OSIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPHRleHQgeD0iMzMwIiB5PSI0NDAiIGNsYXNzPSJiYWQiPjgwODAgLyA4MDgxIDogYXVjdW5lIHLDqXBvbnNlPC90ZXh0PgogIDx0ZXh0IHg9IjYyMCIgeT0iNDUwIiBjbGFzcz0idCI+cHVibGnDqXMgc3VyIDEyNy4wLjAuMSBzZXVsZW1lbnQ8L3RleHQ+CiAgPHRleHQgeD0iNjIwIiB5PSI0NzQiIGNsYXNzPSJ0Ij4rIGZpbHRyYWdlIG5mdGFibGVzIGRlIGwnaMO0dGU8L3RleHQ+CgogIDwhLS0gU3ludGjDqHNlIC0tPgogIDxyZWN0IGZpbGw9IiMxNzIwMzMiIHg9IjMwIiB5PSI1ODAiIHdpZHRoPSIxMTQwIiBoZWlnaHQ9IjY0IiByeD0iMTIiLz4KICA8dGV4dCB4PSI1MCIgeT0iNjA4IiBjbGFzcz0idGFndCI+w4AgUkVURU5JUiDCtyB1biBzZXVsIHBvaW50IGQnZW50csOpZSBwdWJsaWMgKDQ0MyksIHBsdXNpZXVycyBkZXN0aW5hdGlvbnMgcHJpdsOpZXMuPC90ZXh0PgogIDx0ZXh0IHg9IjUwIiB5PSI2MzAiIGNsYXNzPSJ0YWd0Ij5MZSBjaGFtcCBOYW1lIGRlIGxhIHLDqXBvbnNlIG1vbnRyZSBxdWVsbGUgYXBwbGljYXRpb24gYSByw6lwb25kdSA6IGMnZXN0IGxhIHByZXV2ZSBkZSBsYSByw6lwYXJ0aXRpb24uPC90ZXh0Pgo8L3N2Zz4K" alt="Le visiteur joint Nginx sur 443 ; Nginx répartit vers app (8080) et app2 (8081) par la boucle locale ; les ports applicatifs ne répondent pas depuis Internet." />
<figcaption aria-hidden="true">Le visiteur joint Nginx sur 443 ; Nginx
répartit vers app (8080) et app2 (8081) par la boucle locale ; les ports
applicatifs ne répondent pas depuis Internet.</figcaption>
</figure>
</section>
<section id="port-de-lhôte-port-du-conteneur" class="slide compare">
<h2>Port de l’hôte, port du conteneur</h2>
<p><code>-p 127.0.0.1:8081:8080</code> se lit <strong>adresse de l’hôte
: port de l’hôte : port du conteneur</strong>.</p>
<table>
<thead>
<tr>
<th></th>
<th><code>app</code></th>
<th><code>app2</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Image</td>
<td><code>traefik/whoami</code></td>
<td><code>traefik/whoami</code></td>
</tr>
<tr>
<td>Port dans le conteneur</td>
<td>8080</td>
<td>8080</td>
</tr>
<tr>
<td>Port sur l’hôte</td>
<td>8080</td>
<td><strong>8081</strong></td>
</tr>
<tr>
<td>Adresse de publication</td>
<td><code>127.0.0.1</code></td>
<td><code>127.0.0.1</code></td>
</tr>
<tr>
<td>Nom renvoyé</td>
<td><code>sisrN-app</code></td>
<td><code>sisrN-app2</code></td>
</tr>
</tbody>
</table>
<p>Deux conteneurs peuvent écouter le même port <strong>chacun chez
soi</strong> ; sur l’hôte, deux ports distincts.</p>
</section>
<section id="le-groupe-upstream-dans-nginx" class="slide code">
<h2>Le groupe <code>upstream</code> dans Nginx</h2>
<pre class="nginx"><code>upstream applications {        # hors des blocs server
  server 127.0.0.1:8080;         # app
  server 127.0.0.1:8081;         # app2
}</code></pre>
<p>À placer <strong>en tête</strong> de
<code>/etc/nginx/sites-available/sisrN</code>, avant les blocs
<code>server</code>. Le nom <code>applications</code> est libre : c’est
lui que <code>proxy_pass</code> appellera.</p>
</section>
<section id="le-bloc-https-12-inchangé-depuis-p08" class="slide code">
<h2>Le bloc HTTPS (1/2) : inchangé depuis P08</h2>
<pre class="nginx"><code>server {
  listen 443 ssl;
  server_name sisrN.tp.siovision.fr;&#10;
  ssl_certificate     …/fullchain.pem;
  ssl_certificate_key …/privkey.pem;
  ssl_protocols       TLSv1.2 TLSv1.3;</code></pre>
<p><code>…</code> =
<code>/etc/letsencrypt/live/sisrN.tp.siovision.fr</code> : chemins
complets dans la fiche P10.</p>
</section>
<section id="le-bloc-https-22-la-seule-ligne-modifiée" class="slide code">
<h2>Le bloc HTTPS (2/2) : la seule ligne modifiée</h2>
<pre class="nginx"><code>  location / {
    proxy_pass http://applications;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For
                     $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}</code></pre>
<p><code>proxy_pass</code> visait <code>http://127.0.0.1:8080</code> ;
il vise maintenant le groupe. Le bloc <code>listen 80</code> (exception
ACME, redirection) ne change pas.</p>
</section>
<section id="comment-nginx-choisit-il-la-destination" class="slide compare">
<h2>Comment Nginx choisit-il la destination ?</h2>
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
<td>chacun son tour</td>
<td>serveurs équivalents</td>
</tr>
<tr>
<td>Pondérée</td>
<td><code>server … weight=3;</code></td>
<td>plus de requêtes au plus puissant</td>
<td>machines inégales</td>
</tr>
<tr>
<td>Moins de connexions</td>
<td><code>least_conn;</code></td>
<td>le moins occupé</td>
<td>requêtes longues</td>
</tr>
<tr>
<td>Par adresse client</td>
<td><code>ip_hash;</code></td>
<td>même client → même serveur</td>
<td>session stockée localement</td>
</tr>
</tbody>
</table>
<p>Aujourd’hui : <strong>circulaire</strong>. Quelques requêtes ne
prouvent pas une alternance parfaite (connexions réutilisées, autres
clients, échecs).</p>
</section>
<section id="le-marché-des-répartiteurs" class="slide concept">
<h2>Le marché des répartiteurs</h2>
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr>
<th>Famille</th>
<th>Exemples</th>
<th>Où on les trouve</th>
</tr>
</thead>
<tbody>
<tr>
<td>Logiciel libre</td>
<td>Nginx (F5), HAProxy, Traefik, Caddy</td>
<td>serveurs, conteneurs, PME</td>
</tr>
<tr>
<td>Service cloud</td>
<td>AWS Elastic Load Balancing, Azure Load Balancer, OVHcloud Load
Balancer</td>
<td>infrastructures cloud</td>
</tr>
<tr>
<td>CDN / bordure</td>
<td>Cloudflare, Akamai</td>
<td>devant les sites publics, avec protection DDoS</td>
</tr>
<tr>
<td>Matériel / appliance</td>
<td>F5 BIG-IP, Citrix NetScaler</td>
<td>datacenters d’entreprise</td>
</tr>
</tbody>
</table>
<p>Même principe partout : <strong>un point d’entrée, des destinations
surveillées</strong>.</p>
</section>
<section id="modifier-un-service-en-production-la-procédure" class="slide warning">
<h2>Modifier un service en production : la procédure</h2>
<ol type="1">
<li><strong>Sauvegarder</strong> :
<code>sudo cp /etc/nginx/sites-available/&lt;site&gt; ~/&lt;site&gt;.bak</code></li>
<li><strong>Modifier</strong> un seul élément à la fois.</li>
<li><strong>Valider</strong> : <code>sudo nginx -t</code> — en cas
d’erreur, ne pas recharger ; lire la ligne citée.</li>
<li><strong>Recharger</strong> :
<code>sudo systemctl reload nginx</code> — pas <code>restart</code>, qui
coupe les connexions.</li>
<li><strong>Tester</strong> depuis l’extérieur, et garder la trace du
résultat.</li>
</ol>
</section>
<section id="exposé-ou-local-qui-doit-répondre-à-qui" class="slide compare">
<h2>Exposé ou local : qui doit répondre à qui ?</h2>
<table>
<thead>
<tr>
<th>Source</th>
<th>Destination</th>
<th>Doit répondre ?</th>
<th>Pourquoi</th>
</tr>
</thead>
<tbody>
<tr>
<td>Internet</td>
<td>443</td>
<td>oui</td>
<td>seul point d’entrée du service</td>
</tr>
<tr>
<td>Internet</td>
<td>80</td>
<td>oui</td>
<td>redirection et renouvellement ACME</td>
</tr>
<tr>
<td>Internet</td>
<td>8080, 8081</td>
<td><strong>non</strong></td>
<td>contournerait TLS et le proxy</td>
</tr>
<tr>
<td>Nginx (local)</td>
<td>8080, 8081</td>
<td>oui</td>
<td>transmission interne</td>
</tr>
</tbody>
</table>
<p>Une absence de réponse depuis un poste ne prouve pas l’absence de
tout chemin : vérifier aussi l’adresse d’écoute (<code>ss -ltnp</code>)
et les règles.</p>
</section>
<section id="exercice-1-deux-applications-locales" class="slide activity">
<h2>Exercice 1 — Deux applications locales</h2>
<p><strong>25 min · seul · sur votre instance</strong></p>
<p><strong>À produire :</strong> <code>docker ps</code> et deux lignes
<code>Name</code> distinctes, notées dans votre tableau de preuves.</p>
<ol type="1">
<li>Démarrer <code>app2</code> sur <code>127.0.0.1:8081</code> (fiche
P10, étape 1).</li>
<li>Tester <code>127.0.0.1:8080</code> puis <code>127.0.0.1:8081</code>
avec <code>curl</code>.</li>
<li>Tester <code>:8081</code> depuis l’extérieur : il ne doit pas
répondre.</li>
</ol>
</section>
<section id="exercice-2-répartir-derrière-https" class="slide activity">
<h2>Exercice 2 — Répartir derrière HTTPS</h2>
<p><strong>35 min · seul · sur votre instance</strong></p>
<p><strong>À produire :</strong> <code>nginx -t</code> réussi et six
réponses HTTPS relevées depuis l’extérieur.</p>
<ol type="1">
<li>Sauvegarder, ajouter l’<code>upstream</code>, modifier
<code>proxy_pass</code>.</li>
<li><code>nginx -t</code>, puis <code>reload</code>.</li>
<li>Six requêtes <code>curl</code> : quels noms, dans quel ordre ?</li>
</ol>
</section>
<section id="exercice-3-expliquer-le-chemin" class="slide activity">
<h2>Exercice 3 — Expliquer le chemin</h2>
<p><strong>15 min · seul, sur papier ou dans votre compte
rendu</strong></p>
<p><strong>À produire :</strong> un schéma annoté et trois phrases
justifiées.</p>
<ol type="1">
<li>Dessiner le trajet d’une requête du navigateur jusqu’à
<code>app2</code>.</li>
<li>Expliquer pourquoi 8081 ne doit pas être public.</li>
<li>Proposer une directive pour envoyer deux fois plus de requêtes à
<code>app</code>.</li>
</ol>
</section>
<section id="restitution" class="slide question">
<h2>Restitution</h2>
<ul>
<li>Un étudiant décrit le chemin d’une requête, port par port.</li>
<li>Un autre démontre les deux réponses et justifie la fermeture de
8081.</li>
<li>Si un <code>nginx -t</code> a échoué : quel message, quelle
correction ?</li>
</ul>
</section>
<section id="à-retenir" class="slide summary">
<h2>À retenir</h2>
<ol type="1">
<li>Un <code>upstream</code> regroupe plusieurs destinations derrière un
même <code>proxy_pass</code>.</li>
<li>Par défaut, Nginx répartit de façon circulaire ; d’autres méthodes
existent.</li>
<li>Ports applicatifs sur <code>127.0.0.1</code> : seul 443 (et 80)
reste exposé.</li>
<li>Sauvegarder → <code>nginx -t</code> → <code>reload</code> → tester
de l’extérieur.</li>
<li>Demain : on arrête <code>app2</code> volontairement. Que verra le
visiteur ?</li>
</ol>
</section>
