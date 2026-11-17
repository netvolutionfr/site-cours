<section id="une-panne-quelles-preuves" class="slide title">
<h2>Une panne, quelles preuves ?</h2>
<h3 id="diagnostiquer-une-application-arrêtée-et-mesurer-la-disponibilité">Diagnostiquer
une application arrêtée et mesurer la disponibilité</h3>
</section>
<section id="objectifs" class="slide concept">
<h2>Objectifs</h2>
<ul>
<li><strong>Prévoir</strong> puis <strong>observer</strong> les effets
de l’arrêt d’une application.</li>
<li><strong>Étayer</strong> un diagnostic par des tests locaux, externes
et les journaux.</li>
<li><strong>Expliquer</strong> pourquoi deux conteneurs sur une instance
ne suppriment pas tous les points de panne.</li>
</ul>
<p><strong>Prérequis :</strong> P10 terminé — <code>upstream</code> à
deux destinations, six réponses HTTPS relevées. Sinon, finir P10 avant
toute panne.</p>
</section>
<section id="disponibilité-de-quoi-parle-t-on" class="slide concept">
<h2>Disponibilité : de quoi parle-t-on ?</h2>
<p>La <strong>disponibilité</strong> est la part du temps où le service
rend ce qu’on attend de lui. C’est le D du critère DICP.</p>
<table>
<thead>
<tr>
<th>Engagement</th>
<th>Indisponibilité maximale par an</th>
<th>Ordre de grandeur</th>
</tr>
</thead>
<tbody>
<tr>
<td>99 %</td>
<td>3 j 15 h</td>
<td>petit site interne</td>
</tr>
<tr>
<td>99,9 %</td>
<td>8 h 46 min</td>
<td>hébergement mutualisé courant</td>
</tr>
<tr>
<td>99,99 %</td>
<td>53 min</td>
<td>service cloud critique</td>
</tr>
<tr>
<td>99,999 %</td>
<td>5 min</td>
<td>téléphonie, paiement</td>
</tr>
</tbody>
</table>
<p>Chaque « 9 » supplémentaire coûte : redondance, surveillance,
procédures.</p>
</section>
<section id="symptôme-hypothèse-preuve" class="slide concept">
<h2>Symptôme, hypothèse, preuve</h2>
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr>
<th>Étape</th>
<th>Question</th>
<th>Exemple</th>
</tr>
</thead>
<tbody>
<tr>
<td>Symptôme</td>
<td>Qu’est-ce que l’utilisateur constate ?</td>
<td>« une requête sur deux renvoie 502 »</td>
</tr>
<tr>
<td>Hypothèse</td>
<td>Quelle cause pourrait l’expliquer ?</td>
<td><code>app2</code> ne répond plus</td>
</tr>
<tr>
<td>Test</td>
<td>Quelle observation la confirme ou l’écarte ?</td>
<td><code>curl 127.0.0.1:8081</code>, <code>docker ps -a</code></td>
</tr>
<tr>
<td>Conclusion</td>
<td>Que montre le test, et que ne montre-t-il pas ?</td>
<td><code>app2</code> arrêtée ; Nginx fonctionne</td>
</tr>
<tr>
<td>Remédiation</td>
<td>Quelle action, avec quel contrôle ?</td>
<td><code>docker start app2</code>, retest HTTPS</td>
</tr>
</tbody>
</table>
<p>Une hypothèse n’est pas une preuve : on la <strong>confirme ou on
l’écarte</strong> par un test.</p>
</section>
<section id="où-chercher-les-sources-de-preuve" class="slide compare">
<h2>Où chercher : les sources de preuve</h2>
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr>
<th>Source</th>
<th>Commande</th>
<th>Ce qu’elle montre</th>
</tr>
</thead>
<tbody>
<tr>
<td>Test externe</td>
<td><code>curl -s https://sisrN…/</code></td>
<td>ce que vit le visiteur</td>
</tr>
<tr>
<td>Test local</td>
<td><code>curl -s http://127.0.0.1:8081/</code></td>
<td>l’application, sans le proxy</td>
</tr>
<tr>
<td>État des conteneurs</td>
<td><code>sudo docker ps -a</code></td>
<td>démarré, arrêté, code de sortie</td>
</tr>
<tr>
<td>Journal d’erreurs Nginx</td>
<td><code>sudo tail /var/log/nginx/error.log</code></td>
<td>échecs de connexion vers l’upstream</td>
</tr>
<tr>
<td>Journal du service</td>
<td><code>sudo journalctl -u nginx --since &quot;10 min ago&quot;</code></td>
<td>démarrages, rechargements, erreurs</td>
</tr>
</tbody>
</table>
<p>Toujours <strong>comparer</strong> la vue externe et la vue locale :
c’est ce qui sépare proxy et application.</p>
</section>
<section id="ce-que-dit-le-journal-de-nginx" class="slide code">
<h2>Ce que dit le journal de Nginx</h2>
<pre class="text"><code>[error] connect() failed (111: Connection refused)
  while connecting to upstream,
  client: 203.0.113.24,
  upstream: &quot;http://127.0.0.1:8081/&quot;,
  host: &quot;sisr7.tp.siovision.fr&quot;</code></pre>
<p><code>Connection refused</code> sur <code>127.0.0.1:8081</code> :
rien n’écoute sur ce port. Nginx fonctionne, il ne parvient pas à
joindre <strong>une</strong> destination.</p>
</section>
<section id="la-détection-passive-de-nginx" class="slide concept">
<h2>La détection passive de Nginx</h2>
<p>Nginx ne surveille pas les destinations en continu : il constate les
échecs <strong>pendant les requêtes</strong>.</p>
<table>
<thead>
<tr>
<th>Paramètre</th>
<th>Valeur par défaut</th>
<th>Effet</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>max_fails</code></td>
<td>1</td>
<td>nombre d’échecs avant d’écarter le serveur</td>
</tr>
<tr>
<td><code>fail_timeout</code></td>
<td>10 s</td>
<td>durée d’écartement, puis nouvel essai</td>
</tr>
</tbody>
</table>
<p>Conséquences : une requête peut échouer avant l’écartement ; une
application redémarrée n’est retrouvée qu’au nouvel essai. La détection
<strong>active</strong> (sondes régulières) existe dans HAProxy,
Traefik, les répartiteurs cloud ou Nginx Plus.</p>
</section>
<section id="trois-pannes-trois-conséquences" class="slide full-image">
<h2>Trois pannes, trois conséquences</h2>
<figure>
<img role="img" aria-label="Application arrêtée : le service continue ; Nginx arrêté ou instance tombée : service indisponible." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDY2MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsbGVkYnk9InRpdGxlIGRlc2MiPgogIDx0aXRsZSBpZD0idGl0bGUiPlRyb2lzIHBhbm5lcywgdHJvaXMgY29uc8OpcXVlbmNlcyA6IGFwcGxpY2F0aW9uLCBwcm94eSwgaW5zdGFuY2U8L3RpdGxlPgogIDxkZXNjIGlkPSJkZXNjIj5TdXIgdW5lIHNldWxlIGluc3RhbmNlIGNsb3VkLCB0cm9pcyBwb2ludHMgZGUgcGFubmUgc29udCBjb21wYXLDqXMuIFNpIGxlIGNvbnRlbmV1ciBhcHAyIHMnYXJyw6p0ZSwgTmdpbnggbCfDqWNhcnRlIGFwcsOocyB1biDDqWNoZWMgZXQgYXBwIGNvbnRpbnVlIGRlIHLDqXBvbmRyZSA6IGxlIHNlcnZpY2UgcmVzdGUgZGlzcG9uaWJsZS4gU2kgTmdpbnggcydhcnLDqnRlLCBsZXMgZGV1eCBhcHBsaWNhdGlvbnMgZm9uY3Rpb25uZW50IGVuY29yZSBtYWlzIHBsdXMgcGVyc29ubmUgbmUgcGV1dCBsZXMgam9pbmRyZSA6IGxlIHNlcnZpY2UgZXN0IGluZGlzcG9uaWJsZS4gU2kgbCdpbnN0YW5jZSB0b21iZSwgdG91dCBkaXNwYXJhw650LiBEZXV4IGNvbnRlbmV1cnMgc3VyIHVuZSBpbnN0YW5jZSBwcm90w6hnZW50IHNldWxlbWVudCBkdSBwcmVtaWVyIGNhcyA7IHN1cHByaW1lciBsZXMgYXV0cmVzIHBvaW50cyBkZSBwYW5uZSBkZW1hbmRlIHVuIHNlY29uZCBzZXJ2ZXVyIGV0IHVuIHBvaW50IGQnZW50csOpZSBjb21tdW4gcmVkb25kw6kuPC9kZXNjPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYWciIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjciIG1hcmtlckhlaWdodD0iNyIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCAwTDEwIDVMMCAxMHoiIGZpbGw9IiMxRTg0NDkiLz48L21hcmtlcj4KICAgIDxtYXJrZXIgaWQ9ImFyIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI3IiBtYXJrZXJIZWlnaHQ9IjciIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAgMEwxMCA1TDAgMTB6IiBmaWxsPSIjRDk1QzU5Ii8+PC9tYXJrZXI+CiAgPC9kZWZzPgogIDxzdHlsZT4KICAgIC56b25le2ZpbGw6I2ZmZjtzdHJva2U6IzE3MjAzMztzdHJva2Utd2lkdGg6Mi41fQogICAgLnN2Y3tmaWxsOiNFQUY0RkI7c3Ryb2tlOiMzNTY4RDQ7c3Ryb2tlLXdpZHRoOjJ9CiAgICAub2t7ZmlsbDojRUFGNkVFO3N0cm9rZTojMUU4NDQ5O3N0cm9rZS13aWR0aDoyfQogICAgLmtve2ZpbGw6I0ZCRUNFQztzdHJva2U6I0Q5NUM1OTtzdHJva2Utd2lkdGg6MjtzdHJva2UtZGFzaGFycmF5OjggNX0KICAgIC5oe2ZvbnQ6NzAwIDE3cHggQXJpYWwsc2Fucy1zZXJpZjtmaWxsOiMxNzIwMzN9CiAgICAudHtmb250OjUwMCAxNHB4IEFyaWFsLHNhbnMtc2VyaWY7ZmlsbDojM2M0YjVjfQogICAgLmN7Zm9udDo2MDAgMTRweCBtb25vc3BhY2U7ZmlsbDojMTY0ZDc5fQogICAgLmd7Zm9udDo3MDAgMTVweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6IzFFODQ0OX0KICAgIC5iYWR7Zm9udDo3MDAgMTVweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6I0Q5NUM1OX0KICAgIC50YWd0e2ZvbnQ6NzAwIDE0cHggQXJpYWwsc2Fucy1zZXJpZjtmaWxsOiNmZmZ9CiAgPC9zdHlsZT4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NjAiIGZpbGw9IiNGN0Y4RkEiLz4KCiAgPCEtLSBDb2xvbm5lIDEgOiBhcHAyIGFycsOqdMOpZSAtLT4KICA8cmVjdCBjbGFzcz0iem9uZSIgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMzcwIiBoZWlnaHQ9IjQ4MCIgcng9IjE0Ii8+CiAgPHJlY3QgZmlsbD0iI0U0OUEzOCIgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMzcwIiBoZWlnaHQ9IjM2IiByeD0iMTQiLz48cmVjdCBmaWxsPSIjRTQ5QTM4IiB4PSIyMCIgeT0iNDAiIHdpZHRoPSIzNzAiIGhlaWdodD0iMTYiLz4KICA8dGV4dCB4PSIzNiIgeT0iNDQiIGNsYXNzPSJ0YWd0Ij5DQVMgMSDCtyBhcHAyIEFSUsOKVMOJRTwvdGV4dD4KICA8dGV4dCB4PSI0MCIgeT0iODYiIGNsYXNzPSJjIj5kb2NrZXIgc3RvcCBhcHAyPC90ZXh0PgogIDxyZWN0IGNsYXNzPSJzdmMiIHg9IjQwIiB5PSIxMDQiIHdpZHRoPSIzMzAiIGhlaWdodD0iODAiIHJ4PSIxMCIvPgogIDx0ZXh0IHg9IjU2IiB5PSIxMzQiIGNsYXNzPSJoIj5OZ2lueCAoNDQzKTwvdGV4dD4KICA8dGV4dCB4PSI1NiIgeT0iMTYwIiBjbGFzcz0idCI+w6ljYXJ0ZSA4MDgxIGFwcsOocyB1biDDqWNoZWM8L3RleHQ+CiAgPHJlY3QgY2xhc3M9Im9rIiB4PSI0MCIgeT0iMjQwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjkwIiByeD0iMTAiLz4KICA8dGV4dCB4PSI1NCIgeT0iMjcwIiBjbGFzcz0iaCI+YXBwPC90ZXh0Pjx0ZXh0IHg9IjU0IiB5PSIyOTQiIGNsYXNzPSJjIj46ODA4MDwvdGV4dD48dGV4dCB4PSI1NCIgeT0iMzE4IiBjbGFzcz0iZyI+csOpcG9uZDwvdGV4dD4KICA8cmVjdCBjbGFzcz0ia28iIHg9IjIyMCIgeT0iMjQwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjkwIiByeD0iMTAiLz4KICA8dGV4dCB4PSIyMzQiIHk9IjI3MCIgY2xhc3M9ImgiPmFwcDI8L3RleHQ+PHRleHQgeD0iMjM0IiB5PSIyOTQiIGNsYXNzPSJjIj46ODA4MTwvdGV4dD48dGV4dCB4PSIyMzQiIHk9IjMxOCIgY2xhc3M9ImJhZCI+YXJyw6p0w6llPC90ZXh0PgogIDxwYXRoIGQ9Ik0xMjAgMTg2IEwxMjAgMjM2IiBzdHJva2U9IiMxRTg0NDkiIHN0cm9rZS13aWR0aD0iNCIgbWFya2VyLWVuZD0idXJsKCNhZykiLz4KICA8cGF0aCBkPSJNMjkwIDE4NiBMMjkwIDIzNiIgc3Ryb2tlPSIjRDk1QzU5IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1kYXNoYXJyYXk9IjggNiIgbWFya2VyLWVuZD0idXJsKCNhcikiLz4KICA8dGV4dCB4PSI0MCIgeT0iMzcyIiBjbGFzcz0iZyI+U2VydmljZSBkaXNwb25pYmxlPC90ZXh0PgogIDx0ZXh0IHg9IjQwIiB5PSIzOTgiIGNsYXNzPSJ0Ij5TZXVsIHNpc3JOLWFwcCByw6lwb25kLjwvdGV4dD4KICA8dGV4dCB4PSI0MCIgeT0iNDIwIiBjbGFzcz0idCI+VW5lIHJlcXXDqnRlIHBldXQgw6ljaG91ZXIgYXZhbnQ8L3RleHQ+CiAgPHRleHQgeD0iNDAiIHk9IjQ0MiIgY2xhc3M9InQiPnF1ZSBOZ2lueCDDqWNhcnRlIGFwcDIgKGTDqXRlY3Rpb248L3RleHQ+CiAgPHRleHQgeD0iNDAiIHk9IjQ2NCIgY2xhc3M9InQiPnBhc3NpdmUsIG1heF9mYWlscyAvIGZhaWxfdGltZW91dCkuPC90ZXh0PgoKICA8IS0tIENvbG9ubmUgMiA6IE5naW54IGFycsOqdMOpIC0tPgogIDxyZWN0IGNsYXNzPSJ6b25lIiB4PSI0MTUiIHk9IjIwIiB3aWR0aD0iMzcwIiBoZWlnaHQ9IjQ4MCIgcng9IjE0Ii8+CiAgPHJlY3QgZmlsbD0iI0Q5NUM1OSIgeD0iNDE1IiB5PSIyMCIgd2lkdGg9IjM3MCIgaGVpZ2h0PSIzNiIgcng9IjE0Ii8+PHJlY3QgZmlsbD0iI0Q5NUM1OSIgeD0iNDE1IiB5PSI0MCIgd2lkdGg9IjM3MCIgaGVpZ2h0PSIxNiIvPgogIDx0ZXh0IHg9IjQzMSIgeT0iNDQiIGNsYXNzPSJ0YWd0Ij5DQVMgMiDCtyBOR0lOWCBBUlLDilTDiSAobmUgcGFzIHByb3ZvcXVlcik8L3RleHQ+CiAgPHRleHQgeD0iNDM1IiB5PSI4NiIgY2xhc3M9ImMiPm5naW54IGluYWN0aWY8L3RleHQ+CiAgPHJlY3QgY2xhc3M9ImtvIiB4PSI0MzUiIHk9IjEwNCIgd2lkdGg9IjMzMCIgaGVpZ2h0PSI4MCIgcng9IjEwIi8+CiAgPHRleHQgeD0iNDUxIiB5PSIxMzQiIGNsYXNzPSJoIj5OZ2lueCAoNDQzKTwvdGV4dD4KICA8dGV4dCB4PSI0NTEiIHk9IjE2MCIgY2xhc3M9ImJhZCI+Y29ubmV4aW9uIHJlZnVzw6llPC90ZXh0PgogIDxyZWN0IGNsYXNzPSJvayIgeD0iNDM1IiB5PSIyNDAiIHdpZHRoPSIxNTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIvPgogIDx0ZXh0IHg9IjQ0OSIgeT0iMjcwIiBjbGFzcz0iaCI+YXBwPC90ZXh0Pjx0ZXh0IHg9IjQ0OSIgeT0iMjk0IiBjbGFzcz0iYyI+OjgwODA8L3RleHQ+PHRleHQgeD0iNDQ5IiB5PSIzMTgiIGNsYXNzPSJnIj5yw6lwb25kIGVuIGxvY2FsPC90ZXh0PgogIDxyZWN0IGNsYXNzPSJvayIgeD0iNjE1IiB5PSIyNDAiIHdpZHRoPSIxNTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIvPgogIDx0ZXh0IHg9IjYyOSIgeT0iMjcwIiBjbGFzcz0iaCI+YXBwMjwvdGV4dD48dGV4dCB4PSI2MjkiIHk9IjI5NCIgY2xhc3M9ImMiPjo4MDgxPC90ZXh0Pjx0ZXh0IHg9IjYyOSIgeT0iMzE4IiBjbGFzcz0iZyI+csOpcG9uZCBlbiBsb2NhbDwvdGV4dD4KICA8dGV4dCB4PSI0MzUiIHk9IjM3MiIgY2xhc3M9ImJhZCI+U2VydmljZSBpbmRpc3BvbmlibGU8L3RleHQ+CiAgPHRleHQgeD0iNDM1IiB5PSIzOTgiIGNsYXNzPSJ0Ij5MZXMgYXBwbGljYXRpb25zIHZvbnQgYmllbiw8L3RleHQ+CiAgPHRleHQgeD0iNDM1IiB5PSI0MjAiIGNsYXNzPSJ0Ij5tYWlzIGxlIHNldWwgcG9pbnQgZCdlbnRyw6llPC90ZXh0PgogIDx0ZXh0IHg9IjQzNSIgeT0iNDQyIiBjbGFzcz0idCI+ZXN0IHRvbWLDqSA6IHBvaW50IHVuaXF1ZTwvdGV4dD4KICA8dGV4dCB4PSI0MzUiIHk9IjQ2NCIgY2xhc3M9InQiPmRlIGTDqWZhaWxsYW5jZSAoU1BPRikuPC90ZXh0PgoKICA8IS0tIENvbG9ubmUgMyA6IGluc3RhbmNlIC0tPgogIDxyZWN0IGNsYXNzPSJ6b25lIiB4PSI4MTAiIHk9IjIwIiB3aWR0aD0iMzcwIiBoZWlnaHQ9IjQ4MCIgcng9IjE0Ii8+CiAgPHJlY3QgZmlsbD0iIzE3MjAzMyIgeD0iODEwIiB5PSIyMCIgd2lkdGg9IjM3MCIgaGVpZ2h0PSIzNiIgcng9IjE0Ii8+PHJlY3QgZmlsbD0iIzE3MjAzMyIgeD0iODEwIiB5PSI0MCIgd2lkdGg9IjM3MCIgaGVpZ2h0PSIxNiIvPgogIDx0ZXh0IHg9IjgyNiIgeT0iNDQiIGNsYXNzPSJ0YWd0Ij5DQVMgMyDCtyBJTlNUQU5DRSBJTkRJU1BPTklCTEU8L3RleHQ+CiAgPHRleHQgeD0iODMwIiB5PSI4NiIgY2xhc3M9ImMiPnBhbm5lIGjDtHRlLCByw6lzZWF1LCBxdW90YTwvdGV4dD4KICA8cmVjdCBjbGFzcz0ia28iIHg9IjgzMCIgeT0iMTA0IiB3aWR0aD0iMzMwIiBoZWlnaHQ9IjIyNiIgcng9IjEwIi8+CiAgPHRleHQgeD0iODQ2IiB5PSIxMzQiIGNsYXNzPSJoIj5OZ2lueCArIGFwcCArIGFwcDI8L3RleHQ+CiAgPHRleHQgeD0iODQ2IiB5PSIxNjAiIGNsYXNzPSJiYWQiPnRvdXQgZGlzcGFyYcOudCBlbnNlbWJsZTwvdGV4dD4KICA8dGV4dCB4PSI4NDYiIHk9IjIwMCIgY2xhc3M9InQiPm5pIFNTSCwgbmkgSFRUUFMsPC90ZXh0PgogIDx0ZXh0IHg9Ijg0NiIgeT0iMjIyIiBjbGFzcz0idCI+bmkgam91cm5hdXggY29uc3VsdGFibGVzPC90ZXh0PgogIDx0ZXh0IHg9Ijg0NiIgeT0iMjYyIiBjbGFzcz0idCI+bcOqbWUgYWRyZXNzZSwgbcOqbWUgbWFjaGluZSw8L3RleHQ+CiAgPHRleHQgeD0iODQ2IiB5PSIyODQiIGNsYXNzPSJ0Ij5tw6ptZSBkaXNxdWUsIG3Dqm1lIHLDqXNlYXU8L3RleHQ+CiAgPHRleHQgeD0iODMwIiB5PSIzNzIiIGNsYXNzPSJiYWQiPlNlcnZpY2UgaW5kaXNwb25pYmxlPC90ZXh0PgogIDx0ZXh0IHg9IjgzMCIgeT0iMzk4IiBjbGFzcz0idCI+RGV1eCBjb250ZW5ldXJzIG5lIHByb3TDqGdlbnQ8L3RleHQ+CiAgPHRleHQgeD0iODMwIiB5PSI0MjAiIGNsYXNzPSJ0Ij5wYXMgZGUgbGEgcGFubmUgZHUgc2VydmV1cjwvdGV4dD4KICA8dGV4dCB4PSI4MzAiIHk9IjQ0MiIgY2xhc3M9InQiPnF1aSBsZXMgaMOpYmVyZ2UgOiBhbGVydGVyLDwvdGV4dD4KICA8dGV4dCB4PSI4MzAiIHk9IjQ2NCIgY2xhc3M9InQiPnbDqXJpZmllciBkZXB1aXMgdW5lIGF1dHJlIHNvdXJjZS48L3RleHQ+CgogIDwhLS0gU3ludGjDqHNlIC0tPgogIDxyZWN0IGZpbGw9IiMxNzIwMzMiIHg9IjIwIiB5PSI1MjAiIHdpZHRoPSIxMTYwIiBoZWlnaHQ9IjEyMCIgcng9IjEyIi8+CiAgPHRleHQgeD0iNDAiIHk9IjU1MiIgY2xhc3M9InRhZ3QiPsOAIFJFVEVOSVIgwrcgcsOpcGFydGlyIOKJoCBoYXV0ZSBkaXNwb25pYmlsaXTDqS48L3RleHQ+CiAgPHRleHQgeD0iNDAiIHk9IjU4MCIgY2xhc3M9InRhZ3QiPkRldXggY29udGVuZXVycyBzdXIgdW5lIGluc3RhbmNlIGNvdXZyZW50IGxlIGNhcyAxIHNldWxlbWVudC48L3RleHQ+CiAgPHRleHQgeD0iNDAiIHk9IjYwOCIgY2xhc3M9InRhZ3QiPkNvdXZyaXIgbGVzIGNhcyAyIGV0IDMgOiBhdSBtb2lucyBkZXV4IHNlcnZldXJzLCBldCB1biBwb2ludCBkJ2VudHLDqWUgbHVpLW3Dqm1lIHJlZG9uZMOpPC90ZXh0PgogIDx0ZXh0IHg9IjQwIiB5PSI2MzAiIGNsYXNzPSJ0YWd0Ij4ocsOpcGFydGl0ZXVyIGNsb3VkLCBkZXV4IHByb3h5cyBhdmVjIGFkcmVzc2UgZmxvdHRhbnRlLCBETlMgw6AgcGx1c2lldXJzIGFkcmVzc2VzKS48L3RleHQ+Cjwvc3ZnPgo=" alt="Application arrêtée : le service continue ; Nginx arrêté ou instance tombée : service indisponible." />
<figcaption aria-hidden="true">Application arrêtée : le service continue
; Nginx arrêté ou instance tombée : service indisponible.</figcaption>
</figure>
</section>
<section id="répartir-nest-pas-rendre-hautement-disponible" class="slide compare">
<h2>Répartir n’est pas rendre hautement disponible</h2>
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr>
<th>Panne</th>
<th>Deux conteneurs, une instance</th>
<th>Deux serveurs + répartiteur redondé</th>
</tr>
</thead>
<tbody>
<tr>
<td>Une application</td>
<td>couverte</td>
<td>couverte</td>
</tr>
<tr>
<td>Le proxy Nginx</td>
<td><strong>non couverte</strong></td>
<td>couverte</td>
</tr>
<tr>
<td>L’instance, son disque</td>
<td><strong>non couverte</strong></td>
<td>couverte</td>
</tr>
<tr>
<td>Le datacenter, la région</td>
<td>non couverte</td>
<td>seulement si serveurs sur plusieurs sites</td>
</tr>
</tbody>
</table>
<p>Supprimer un point unique de défaillance (<strong>SPOF</strong>) = le
doubler <strong>et</strong> prévoir qui bascule.</p>
</section>
<section id="règles-de-la-panne-contrôlée" class="slide warning">
<h2>Règles de la panne contrôlée</h2>
<ul>
<li>Arrêter <strong>uniquement</strong> <code>app2</code> :
<code>sudo docker stop app2</code>.</li>
<li>Ne pas arrêter Nginx, ne pas éteindre l’instance, ne pas toucher au
filtrage.</li>
<li>Écrire la <strong>prévision avant</strong> d’agir.</li>
<li>Remettre en état en fin d’activité : <code>docker start app2</code>,
puis vérifier.</li>
</ul>
</section>
<section id="exercice-1-prévoir-puis-provoquer" class="slide activity">
<h2>Exercice 1 — Prévoir puis provoquer</h2>
<p><strong>10 min · seul · sur papier puis sur votre
instance</strong></p>
<p><strong>À produire :</strong> une prévision écrite, puis six réponses
HTTPS après l’arrêt.</p>
<ol type="1">
<li>Écrire ce que verra le visiteur si <code>app2</code> s’arrête.</li>
<li><code>sudo docker stop app2</code>, puis six requêtes HTTPS depuis
l’extérieur.</li>
<li>Comparer à la prévision : identique, différent, pourquoi ?</li>
</ol>
</section>
<section id="exercice-2-prouver-le-diagnostic" class="slide activity">
<h2>Exercice 2 — Prouver le diagnostic</h2>
<p><strong>30 min · seul · sur votre instance</strong></p>
<p><strong>À produire :</strong> tableau symptôme / hypothèse / test /
conclusion, avec une preuve locale et une externe.</p>
<ol type="1">
<li><code>docker ps -a</code>, test local de 8080 et 8081.</li>
<li>Lire <code>error.log</code> : relever la ligne qui concerne
8081.</li>
<li><code>docker start app2</code>, retester : le retour est-il immédiat
?</li>
</ol>
</section>
<section id="exercice-3-argumenter-sur-la-disponibilité" class="slide activity">
<h2>Exercice 3 — Argumenter sur la disponibilité</h2>
<p><strong>20 min · seul · rédaction dans le compte rendu</strong></p>
<p><strong>À produire :</strong> les trois cas comparés et une
amélioration justifiée, sans la déployer.</p>
<ol type="1">
<li>Pour l’arrêt d’<code>app2</code>, de Nginx, de l’instance : que
reste-t-il disponible ?</li>
<li>Quel est le point unique de défaillance restant ?</li>
<li>Proposer une architecture qui le supprime et nommer le nouveau point
d’entrée.</li>
</ol>
</section>
<section id="restitution" class="slide question">
<h2>Restitution</h2>
<ul>
<li>Chacun présente : un symptôme, un test, une conclusion, une
limite.</li>
<li>Comparaison orale : panne du conteneur, du proxy, de
l’instance.</li>
<li>Ce que nos tests montrent… et ce qu’ils ne prouvent pas.</li>
</ul>
</section>
<section id="à-retenir" class="slide summary">
<h2>À retenir</h2>
<ol type="1">
<li>Un diagnostic va du symptôme à la preuve : test externe, test local,
journaux.</li>
<li><code>Connection refused</code> vers l’upstream : le proxy
fonctionne, une destination est absente.</li>
<li>La détection passive écarte un serveur après un échec, et le
retrouve plus tard.</li>
<li>Deux conteneurs sur une instance couvrent la panne d’une
application, pas celle du serveur.</li>
<li>Haute disponibilité : doubler chaque élément, y compris le point
d’entrée.</li>
</ol>
</section>
