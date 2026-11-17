<div class="sequence-overview">
<section id="objectifs" class="objectives">
<h3>Objectifs</h3>
<ul>
<li>Prévoir puis observer les effets de l’arrêt d’une application
derrière le proxy.</li>
<li>Étayer un diagnostic par des tests externes, des tests locaux et les
journaux.</li>
<li>Expliquer pourquoi deux conteneurs sur une instance ne suppriment
pas tous les points de panne.</li>
</ul>
</section>
<section id="prérequis" class="prerequisites">
<h3>Prérequis</h3>
<ul>
<li>P10 terminé : <code>upstream</code> vers <code>127.0.0.1:8080</code>
et <code>127.0.0.1:8081</code>, HTTPS fonctionnel.</li>
<li>Tableau de preuves de P10 (six réponses HTTPS relevées).</li>
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
<td>Contrôle du point de départ (P10)</td>
</tr>
<tr>
<td>1</td>
<td>Prévision écrite, puis arrêt de <code>app2</code></td>
</tr>
<tr>
<td>2</td>
<td>Diagnostic étayé : tests et journaux</td>
</tr>
<tr>
<td>3</td>
<td>Remise en service et détection passive</td>
</tr>
<tr>
<td>4</td>
<td>Comparaison des pannes et amélioration</td>
</tr>
</tbody>
</table>
</section>
</div>
<h3 id="avant-de-commencer">Avant de commencer</h3>
<p>Travail <strong>individuel</strong> sur votre instance
<code>sisrN.tp.siovision.fr</code>. Vous n’arrêtez <strong>que</strong>
<code>app2</code> : jamais Nginx, jamais l’instance, aucune modification
du filtrage. Toutes vos observations vont dans le tableau
<strong>symptôme / hypothèse / test / conclusion</strong>. Aucune clé ni
secret dans le compte rendu.</p>
<h3 id="les-notions-de-la-séance">Les notions de la séance</h3>
<p><strong>Disponibilité.</strong> Part du temps où le service rend ce
qu’on attend de lui (le D de DICP). Un engagement de 99,9 % autorise
environ 8 h 46 min d’indisponibilité par an ; 99,99 %, environ 53 min.
Chaque « 9 » de plus demande redondance, surveillance et procédures.</p>
<p><strong>Démarche de diagnostic.</strong> Un <strong>symptôme</strong>
est ce que constate l’utilisateur. Une <strong>hypothèse</strong>
propose une cause. Un <strong>test</strong> la confirme ou l’écarte. La
<strong>conclusion</strong> dit ce que le test montre <em>et ce qu’il ne
montre pas</em>. La <strong>remédiation</strong> est une action suivie
d’un contrôle.</p>
<p><strong>Sources de preuve.</strong></p>
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
<td><code>curl -s https://sisrN.tp.siovision.fr/</code></td>
<td>ce que vit le visiteur</td>
</tr>
<tr>
<td>Test local</td>
<td><code>curl -s http://127.0.0.1:8081/</code></td>
<td>l’application, sans le proxy</td>
</tr>
<tr>
<td>Conteneurs</td>
<td><code>sudo docker ps -a</code></td>
<td>état, code de sortie, heure</td>
</tr>
<tr>
<td>Erreurs Nginx</td>
<td><code>sudo tail -n 20 /var/log/nginx/error.log</code></td>
<td>échecs vers l’upstream</td>
</tr>
<tr>
<td>Service Nginx</td>
<td><code>sudo journalctl -u nginx --since &quot;10 minutes ago&quot; --no-pager</code></td>
<td>démarrages, rechargements</td>
</tr>
</tbody>
</table>
<p><strong>Détection passive.</strong> Nginx ne sonde pas ses
destinations : il constate un échec pendant une requête, écarte le
serveur (<code>max_fails=1</code> par défaut) pendant
<code>fail_timeout</code> (10 s par défaut), puis réessaie. Une requête
peut donc échouer avant l’écartement, et une application redémarrée
n’est retrouvée qu’au nouvel essai. HAProxy, Traefik ou les répartiteurs
cloud proposent une détection <strong>active</strong> par sondes
régulières.</p>
<figure>
<img role="img" aria-label="Application arrêtée : le service continue ; Nginx arrêté ou instance tombée : service indisponible." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDY2MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsbGVkYnk9InRpdGxlIGRlc2MiPgogIDx0aXRsZSBpZD0idGl0bGUiPlRyb2lzIHBhbm5lcywgdHJvaXMgY29uc8OpcXVlbmNlcyA6IGFwcGxpY2F0aW9uLCBwcm94eSwgaW5zdGFuY2U8L3RpdGxlPgogIDxkZXNjIGlkPSJkZXNjIj5TdXIgdW5lIHNldWxlIGluc3RhbmNlIGNsb3VkLCB0cm9pcyBwb2ludHMgZGUgcGFubmUgc29udCBjb21wYXLDqXMuIFNpIGxlIGNvbnRlbmV1ciBhcHAyIHMnYXJyw6p0ZSwgTmdpbnggbCfDqWNhcnRlIGFwcsOocyB1biDDqWNoZWMgZXQgYXBwIGNvbnRpbnVlIGRlIHLDqXBvbmRyZSA6IGxlIHNlcnZpY2UgcmVzdGUgZGlzcG9uaWJsZS4gU2kgTmdpbnggcydhcnLDqnRlLCBsZXMgZGV1eCBhcHBsaWNhdGlvbnMgZm9uY3Rpb25uZW50IGVuY29yZSBtYWlzIHBsdXMgcGVyc29ubmUgbmUgcGV1dCBsZXMgam9pbmRyZSA6IGxlIHNlcnZpY2UgZXN0IGluZGlzcG9uaWJsZS4gU2kgbCdpbnN0YW5jZSB0b21iZSwgdG91dCBkaXNwYXJhw650LiBEZXV4IGNvbnRlbmV1cnMgc3VyIHVuZSBpbnN0YW5jZSBwcm90w6hnZW50IHNldWxlbWVudCBkdSBwcmVtaWVyIGNhcyA7IHN1cHByaW1lciBsZXMgYXV0cmVzIHBvaW50cyBkZSBwYW5uZSBkZW1hbmRlIHVuIHNlY29uZCBzZXJ2ZXVyIGV0IHVuIHBvaW50IGQnZW50csOpZSBjb21tdW4gcmVkb25kw6kuPC9kZXNjPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYWciIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjciIG1hcmtlckhlaWdodD0iNyIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCAwTDEwIDVMMCAxMHoiIGZpbGw9IiMxRTg0NDkiLz48L21hcmtlcj4KICAgIDxtYXJrZXIgaWQ9ImFyIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI3IiBtYXJrZXJIZWlnaHQ9IjciIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAgMEwxMCA1TDAgMTB6IiBmaWxsPSIjRDk1QzU5Ii8+PC9tYXJrZXI+CiAgPC9kZWZzPgogIDxzdHlsZT4KICAgIC56b25le2ZpbGw6I2ZmZjtzdHJva2U6IzE3MjAzMztzdHJva2Utd2lkdGg6Mi41fQogICAgLnN2Y3tmaWxsOiNFQUY0RkI7c3Ryb2tlOiMzNTY4RDQ7c3Ryb2tlLXdpZHRoOjJ9CiAgICAub2t7ZmlsbDojRUFGNkVFO3N0cm9rZTojMUU4NDQ5O3N0cm9rZS13aWR0aDoyfQogICAgLmtve2ZpbGw6I0ZCRUNFQztzdHJva2U6I0Q5NUM1OTtzdHJva2Utd2lkdGg6MjtzdHJva2UtZGFzaGFycmF5OjggNX0KICAgIC5oe2ZvbnQ6NzAwIDE3cHggQXJpYWwsc2Fucy1zZXJpZjtmaWxsOiMxNzIwMzN9CiAgICAudHtmb250OjUwMCAxNHB4IEFyaWFsLHNhbnMtc2VyaWY7ZmlsbDojM2M0YjVjfQogICAgLmN7Zm9udDo2MDAgMTRweCBtb25vc3BhY2U7ZmlsbDojMTY0ZDc5fQogICAgLmd7Zm9udDo3MDAgMTVweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6IzFFODQ0OX0KICAgIC5iYWR7Zm9udDo3MDAgMTVweCBBcmlhbCxzYW5zLXNlcmlmO2ZpbGw6I0Q5NUM1OX0KICAgIC50YWd0e2ZvbnQ6NzAwIDE0cHggQXJpYWwsc2Fucy1zZXJpZjtmaWxsOiNmZmZ9CiAgPC9zdHlsZT4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NjAiIGZpbGw9IiNGN0Y4RkEiLz4KCiAgPCEtLSBDb2xvbm5lIDEgOiBhcHAyIGFycsOqdMOpZSAtLT4KICA8cmVjdCBjbGFzcz0iem9uZSIgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMzcwIiBoZWlnaHQ9IjQ4MCIgcng9IjE0Ii8+CiAgPHJlY3QgZmlsbD0iI0U0OUEzOCIgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMzcwIiBoZWlnaHQ9IjM2IiByeD0iMTQiLz48cmVjdCBmaWxsPSIjRTQ5QTM4IiB4PSIyMCIgeT0iNDAiIHdpZHRoPSIzNzAiIGhlaWdodD0iMTYiLz4KICA8dGV4dCB4PSIzNiIgeT0iNDQiIGNsYXNzPSJ0YWd0Ij5DQVMgMSDCtyBhcHAyIEFSUsOKVMOJRTwvdGV4dD4KICA8dGV4dCB4PSI0MCIgeT0iODYiIGNsYXNzPSJjIj5kb2NrZXIgc3RvcCBhcHAyPC90ZXh0PgogIDxyZWN0IGNsYXNzPSJzdmMiIHg9IjQwIiB5PSIxMDQiIHdpZHRoPSIzMzAiIGhlaWdodD0iODAiIHJ4PSIxMCIvPgogIDx0ZXh0IHg9IjU2IiB5PSIxMzQiIGNsYXNzPSJoIj5OZ2lueCAoNDQzKTwvdGV4dD4KICA8dGV4dCB4PSI1NiIgeT0iMTYwIiBjbGFzcz0idCI+w6ljYXJ0ZSA4MDgxIGFwcsOocyB1biDDqWNoZWM8L3RleHQ+CiAgPHJlY3QgY2xhc3M9Im9rIiB4PSI0MCIgeT0iMjQwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjkwIiByeD0iMTAiLz4KICA8dGV4dCB4PSI1NCIgeT0iMjcwIiBjbGFzcz0iaCI+YXBwPC90ZXh0Pjx0ZXh0IHg9IjU0IiB5PSIyOTQiIGNsYXNzPSJjIj46ODA4MDwvdGV4dD48dGV4dCB4PSI1NCIgeT0iMzE4IiBjbGFzcz0iZyI+csOpcG9uZDwvdGV4dD4KICA8cmVjdCBjbGFzcz0ia28iIHg9IjIyMCIgeT0iMjQwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjkwIiByeD0iMTAiLz4KICA8dGV4dCB4PSIyMzQiIHk9IjI3MCIgY2xhc3M9ImgiPmFwcDI8L3RleHQ+PHRleHQgeD0iMjM0IiB5PSIyOTQiIGNsYXNzPSJjIj46ODA4MTwvdGV4dD48dGV4dCB4PSIyMzQiIHk9IjMxOCIgY2xhc3M9ImJhZCI+YXJyw6p0w6llPC90ZXh0PgogIDxwYXRoIGQ9Ik0xMjAgMTg2IEwxMjAgMjM2IiBzdHJva2U9IiMxRTg0NDkiIHN0cm9rZS13aWR0aD0iNCIgbWFya2VyLWVuZD0idXJsKCNhZykiLz4KICA8cGF0aCBkPSJNMjkwIDE4NiBMMjkwIDIzNiIgc3Ryb2tlPSIjRDk1QzU5IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1kYXNoYXJyYXk9IjggNiIgbWFya2VyLWVuZD0idXJsKCNhcikiLz4KICA8dGV4dCB4PSI0MCIgeT0iMzcyIiBjbGFzcz0iZyI+U2VydmljZSBkaXNwb25pYmxlPC90ZXh0PgogIDx0ZXh0IHg9IjQwIiB5PSIzOTgiIGNsYXNzPSJ0Ij5TZXVsIHNpc3JOLWFwcCByw6lwb25kLjwvdGV4dD4KICA8dGV4dCB4PSI0MCIgeT0iNDIwIiBjbGFzcz0idCI+VW5lIHJlcXXDqnRlIHBldXQgw6ljaG91ZXIgYXZhbnQ8L3RleHQ+CiAgPHRleHQgeD0iNDAiIHk9IjQ0MiIgY2xhc3M9InQiPnF1ZSBOZ2lueCDDqWNhcnRlIGFwcDIgKGTDqXRlY3Rpb248L3RleHQ+CiAgPHRleHQgeD0iNDAiIHk9IjQ2NCIgY2xhc3M9InQiPnBhc3NpdmUsIG1heF9mYWlscyAvIGZhaWxfdGltZW91dCkuPC90ZXh0PgoKICA8IS0tIENvbG9ubmUgMiA6IE5naW54IGFycsOqdMOpIC0tPgogIDxyZWN0IGNsYXNzPSJ6b25lIiB4PSI0MTUiIHk9IjIwIiB3aWR0aD0iMzcwIiBoZWlnaHQ9IjQ4MCIgcng9IjE0Ii8+CiAgPHJlY3QgZmlsbD0iI0Q5NUM1OSIgeD0iNDE1IiB5PSIyMCIgd2lkdGg9IjM3MCIgaGVpZ2h0PSIzNiIgcng9IjE0Ii8+PHJlY3QgZmlsbD0iI0Q5NUM1OSIgeD0iNDE1IiB5PSI0MCIgd2lkdGg9IjM3MCIgaGVpZ2h0PSIxNiIvPgogIDx0ZXh0IHg9IjQzMSIgeT0iNDQiIGNsYXNzPSJ0YWd0Ij5DQVMgMiDCtyBOR0lOWCBBUlLDilTDiSAobmUgcGFzIHByb3ZvcXVlcik8L3RleHQ+CiAgPHRleHQgeD0iNDM1IiB5PSI4NiIgY2xhc3M9ImMiPm5naW54IGluYWN0aWY8L3RleHQ+CiAgPHJlY3QgY2xhc3M9ImtvIiB4PSI0MzUiIHk9IjEwNCIgd2lkdGg9IjMzMCIgaGVpZ2h0PSI4MCIgcng9IjEwIi8+CiAgPHRleHQgeD0iNDUxIiB5PSIxMzQiIGNsYXNzPSJoIj5OZ2lueCAoNDQzKTwvdGV4dD4KICA8dGV4dCB4PSI0NTEiIHk9IjE2MCIgY2xhc3M9ImJhZCI+Y29ubmV4aW9uIHJlZnVzw6llPC90ZXh0PgogIDxyZWN0IGNsYXNzPSJvayIgeD0iNDM1IiB5PSIyNDAiIHdpZHRoPSIxNTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIvPgogIDx0ZXh0IHg9IjQ0OSIgeT0iMjcwIiBjbGFzcz0iaCI+YXBwPC90ZXh0Pjx0ZXh0IHg9IjQ0OSIgeT0iMjk0IiBjbGFzcz0iYyI+OjgwODA8L3RleHQ+PHRleHQgeD0iNDQ5IiB5PSIzMTgiIGNsYXNzPSJnIj5yw6lwb25kIGVuIGxvY2FsPC90ZXh0PgogIDxyZWN0IGNsYXNzPSJvayIgeD0iNjE1IiB5PSIyNDAiIHdpZHRoPSIxNTAiIGhlaWdodD0iOTAiIHJ4PSIxMCIvPgogIDx0ZXh0IHg9IjYyOSIgeT0iMjcwIiBjbGFzcz0iaCI+YXBwMjwvdGV4dD48dGV4dCB4PSI2MjkiIHk9IjI5NCIgY2xhc3M9ImMiPjo4MDgxPC90ZXh0Pjx0ZXh0IHg9IjYyOSIgeT0iMzE4IiBjbGFzcz0iZyI+csOpcG9uZCBlbiBsb2NhbDwvdGV4dD4KICA8dGV4dCB4PSI0MzUiIHk9IjM3MiIgY2xhc3M9ImJhZCI+U2VydmljZSBpbmRpc3BvbmlibGU8L3RleHQ+CiAgPHRleHQgeD0iNDM1IiB5PSIzOTgiIGNsYXNzPSJ0Ij5MZXMgYXBwbGljYXRpb25zIHZvbnQgYmllbiw8L3RleHQ+CiAgPHRleHQgeD0iNDM1IiB5PSI0MjAiIGNsYXNzPSJ0Ij5tYWlzIGxlIHNldWwgcG9pbnQgZCdlbnRyw6llPC90ZXh0PgogIDx0ZXh0IHg9IjQzNSIgeT0iNDQyIiBjbGFzcz0idCI+ZXN0IHRvbWLDqSA6IHBvaW50IHVuaXF1ZTwvdGV4dD4KICA8dGV4dCB4PSI0MzUiIHk9IjQ2NCIgY2xhc3M9InQiPmRlIGTDqWZhaWxsYW5jZSAoU1BPRikuPC90ZXh0PgoKICA8IS0tIENvbG9ubmUgMyA6IGluc3RhbmNlIC0tPgogIDxyZWN0IGNsYXNzPSJ6b25lIiB4PSI4MTAiIHk9IjIwIiB3aWR0aD0iMzcwIiBoZWlnaHQ9IjQ4MCIgcng9IjE0Ii8+CiAgPHJlY3QgZmlsbD0iIzE3MjAzMyIgeD0iODEwIiB5PSIyMCIgd2lkdGg9IjM3MCIgaGVpZ2h0PSIzNiIgcng9IjE0Ii8+PHJlY3QgZmlsbD0iIzE3MjAzMyIgeD0iODEwIiB5PSI0MCIgd2lkdGg9IjM3MCIgaGVpZ2h0PSIxNiIvPgogIDx0ZXh0IHg9IjgyNiIgeT0iNDQiIGNsYXNzPSJ0YWd0Ij5DQVMgMyDCtyBJTlNUQU5DRSBJTkRJU1BPTklCTEU8L3RleHQ+CiAgPHRleHQgeD0iODMwIiB5PSI4NiIgY2xhc3M9ImMiPnBhbm5lIGjDtHRlLCByw6lzZWF1LCBxdW90YTwvdGV4dD4KICA8cmVjdCBjbGFzcz0ia28iIHg9IjgzMCIgeT0iMTA0IiB3aWR0aD0iMzMwIiBoZWlnaHQ9IjIyNiIgcng9IjEwIi8+CiAgPHRleHQgeD0iODQ2IiB5PSIxMzQiIGNsYXNzPSJoIj5OZ2lueCArIGFwcCArIGFwcDI8L3RleHQ+CiAgPHRleHQgeD0iODQ2IiB5PSIxNjAiIGNsYXNzPSJiYWQiPnRvdXQgZGlzcGFyYcOudCBlbnNlbWJsZTwvdGV4dD4KICA8dGV4dCB4PSI4NDYiIHk9IjIwMCIgY2xhc3M9InQiPm5pIFNTSCwgbmkgSFRUUFMsPC90ZXh0PgogIDx0ZXh0IHg9Ijg0NiIgeT0iMjIyIiBjbGFzcz0idCI+bmkgam91cm5hdXggY29uc3VsdGFibGVzPC90ZXh0PgogIDx0ZXh0IHg9Ijg0NiIgeT0iMjYyIiBjbGFzcz0idCI+bcOqbWUgYWRyZXNzZSwgbcOqbWUgbWFjaGluZSw8L3RleHQ+CiAgPHRleHQgeD0iODQ2IiB5PSIyODQiIGNsYXNzPSJ0Ij5tw6ptZSBkaXNxdWUsIG3Dqm1lIHLDqXNlYXU8L3RleHQ+CiAgPHRleHQgeD0iODMwIiB5PSIzNzIiIGNsYXNzPSJiYWQiPlNlcnZpY2UgaW5kaXNwb25pYmxlPC90ZXh0PgogIDx0ZXh0IHg9IjgzMCIgeT0iMzk4IiBjbGFzcz0idCI+RGV1eCBjb250ZW5ldXJzIG5lIHByb3TDqGdlbnQ8L3RleHQ+CiAgPHRleHQgeD0iODMwIiB5PSI0MjAiIGNsYXNzPSJ0Ij5wYXMgZGUgbGEgcGFubmUgZHUgc2VydmV1cjwvdGV4dD4KICA8dGV4dCB4PSI4MzAiIHk9IjQ0MiIgY2xhc3M9InQiPnF1aSBsZXMgaMOpYmVyZ2UgOiBhbGVydGVyLDwvdGV4dD4KICA8dGV4dCB4PSI4MzAiIHk9IjQ2NCIgY2xhc3M9InQiPnbDqXJpZmllciBkZXB1aXMgdW5lIGF1dHJlIHNvdXJjZS48L3RleHQ+CgogIDwhLS0gU3ludGjDqHNlIC0tPgogIDxyZWN0IGZpbGw9IiMxNzIwMzMiIHg9IjIwIiB5PSI1MjAiIHdpZHRoPSIxMTYwIiBoZWlnaHQ9IjEyMCIgcng9IjEyIi8+CiAgPHRleHQgeD0iNDAiIHk9IjU1MiIgY2xhc3M9InRhZ3QiPsOAIFJFVEVOSVIgwrcgcsOpcGFydGlyIOKJoCBoYXV0ZSBkaXNwb25pYmlsaXTDqS48L3RleHQ+CiAgPHRleHQgeD0iNDAiIHk9IjU4MCIgY2xhc3M9InRhZ3QiPkRldXggY29udGVuZXVycyBzdXIgdW5lIGluc3RhbmNlIGNvdXZyZW50IGxlIGNhcyAxIHNldWxlbWVudC48L3RleHQ+CiAgPHRleHQgeD0iNDAiIHk9IjYwOCIgY2xhc3M9InRhZ3QiPkNvdXZyaXIgbGVzIGNhcyAyIGV0IDMgOiBhdSBtb2lucyBkZXV4IHNlcnZldXJzLCBldCB1biBwb2ludCBkJ2VudHLDqWUgbHVpLW3Dqm1lIHJlZG9uZMOpPC90ZXh0PgogIDx0ZXh0IHg9IjQwIiB5PSI2MzAiIGNsYXNzPSJ0YWd0Ij4ocsOpcGFydGl0ZXVyIGNsb3VkLCBkZXV4IHByb3h5cyBhdmVjIGFkcmVzc2UgZmxvdHRhbnRlLCBETlMgw6AgcGx1c2lldXJzIGFkcmVzc2VzKS48L3RleHQ+Cjwvc3ZnPgo=" alt="Application arrêtée : le service continue ; Nginx arrêté ou instance tombée : service indisponible." />
<figcaption aria-hidden="true">Application arrêtée : le service continue
; Nginx arrêté ou instance tombée : service indisponible.</figcaption>
</figure>
<h3 id="étape-0-contrôler-le-point-de-départ">Étape 0 — Contrôler le
point de départ</h3>
<div class="sourceCode" id="cb1"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> docker ps</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> nginx <span class="at">-t</span></span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> https://sisrN.tp.siovision.fr/ <span class="kw">|</span> <span class="fu">grep</span> Name</span></code></pre></div>
<p>Les deux conteneurs tournent, la configuration est valide, plusieurs
requêtes donnent les deux noms. Sinon, terminez P10 d’abord.</p>
<h3 id="étape-1-prévoir-puis-provoquer">Étape 1 — Prévoir, puis
provoquer</h3>
<p><strong>Question 1.1.</strong> Avant toute commande, écrivez ce que
verra un visiteur si <code>app2</code> s’arrête : toutes les requêtes
échouent ? une sur deux ? aucune ?</p>
<p>Puis arrêtez seulement <code>app2</code> et répétez six requêtes
depuis l’extérieur :</p>
<div class="sourceCode" id="cb2"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> docker stop app2</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> https://sisrN.tp.siovision.fr/ <span class="kw">|</span> <span class="fu">grep</span> Name</span></code></pre></div>
<p><strong>Question 1.2.</strong> Relevez les six résultats.
Correspondent-ils à votre prévision ? Une erreur
(<code>502 Bad Gateway</code>) est-elle apparue ? Pourquoi ce n’est pas
toujours le cas ?</p>
<h3 id="étape-2-prouver-le-diagnostic">Étape 2 — Prouver le
diagnostic</h3>
<div class="sourceCode" id="cb3"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> docker ps <span class="at">-a</span></span>
<span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> <span class="at">-m</span> 3 http://127.0.0.1:8080/ <span class="kw">|</span> <span class="fu">grep</span> Name</span>
<span id="cb3-3"><a href="#cb3-3" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> <span class="at">-m</span> 3 http://127.0.0.1:8081/ <span class="kw">|</span> <span class="fu">grep</span> Name</span>
<span id="cb3-4"><a href="#cb3-4" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> tail <span class="at">-n</span> 20 /var/log/nginx/error.log</span></code></pre></div>
<p><strong>Question 2.1.</strong> Complétez le tableau :</p>
<table>
<thead>
<tr>
<th>Symptôme</th>
<th>Hypothèse</th>
<th>Test</th>
<th>Observé</th>
<th>Conclusion</th>
</tr>
</thead>
<tbody>
<tr>
<td>…</td>
<td><code>app2</code> arrêtée</td>
<td><code>docker ps -a</code></td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>…</td>
<td><code>app2</code> ne répond plus</td>
<td>test local 8081</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>…</td>
<td>Nginx fonctionne</td>
<td>test externe, test local 8080</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>…</td>
<td>Nginx voit l’échec</td>
<td><code>error.log</code></td>
<td>…</td>
<td>…</td>
</tr>
</tbody>
</table>
<p><strong>Question 2.2.</strong> Recopiez la ligne de
<code>error.log</code> qui concerne 8081. Que signifie
<code>Connection refused</code> ? Qu’est-ce que cette ligne prouve sur
Nginx lui-même ?</p>
<h3 id="étape-3-remettre-en-service">Étape 3 — Remettre en service</h3>
<div class="sourceCode" id="cb4"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> docker start app2</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-s</span> https://sisrN.tp.siovision.fr/ <span class="kw">|</span> <span class="fu">grep</span> Name</span></code></pre></div>
<p><strong>Question 3.1.</strong> <code>sisrN-app2</code> réapparaît-il
dès la première requête ? Répétez quelques requêtes et expliquez le
délai éventuel à l’aide de la détection passive.</p>
<p><strong>Question 3.2.</strong> Grâce à quelle option du
<code>docker run</code> de P10 le conteneur redémarrerait-il seul après
un redémarrage de l’instance ? Ne protège-t-elle pas aussi d’un
<code>docker stop</code> ?</p>
<h3 id="étape-4-argumenter-sur-la-disponibilité">Étape 4 — Argumenter
sur la disponibilité</h3>
<p>Ne provoquez <strong>pas</strong> les cas 2 et 3 : raisonnez à partir
du schéma et de vos tests.</p>
<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr>
<th>Panne</th>
<th>Ce que voit le visiteur</th>
<th>Ce qui fonctionne encore</th>
<th>Comment le prouver</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>app2</code> arrêtée</td>
<td>…</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>Nginx arrêté</td>
<td>…</td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td>Instance indisponible</td>
<td>…</td>
<td>…</td>
<td>…</td>
</tr>
</tbody>
</table>
<p><strong>Question 4.1.</strong> Quel est le point unique de
défaillance (SPOF) restant de votre architecture ?</p>
<p><strong>Question 4.2.</strong> Proposez une architecture qui supprime
ce point unique, sans la déployer : combien de serveurs, quel nouveau
point d’entrée, et quel est alors <strong>son</strong> risque ?</p>
<h3 id="checklist-de-sortie">Checklist de sortie</h3>
<ul class="task-list">
<li><label><input type="checkbox"></input>Prévision écrite
<strong>avant</strong> l’arrêt, puis comparée aux six
résultats.</label></li>
<li><label><input type="checkbox"></input>Une preuve externe et une preuve
locale de l’arrêt de <code>app2</code>, ligne <code>error.log</code>
relevée.</label></li>
<li><label><input type="checkbox"></input><code>app2</code> redémarré, les
deux noms réapparaissent en HTTPS, <code>docker ps</code>
vérifié.</label></li>
<li><label><input type="checkbox"></input>Tableau des trois pannes et
amélioration argumentée.</label></li>
<li><label><input type="checkbox"></input>Synthèse : schéma des flux,
symptôme, hypothèse, preuve, remédiation, limite.</label></li>
</ul>
<p>En fin de séance, vérifiez que <code>app</code> et <code>app2</code>
tournent : l’enseignant décide ensuite de la mise en pause des
instances.</p>
<p>L’IA peut aider à interpréter une erreur après une première recherche
; les conclusions et les preuves restent les vôtres. Ne transmettez
jamais de clé privée ni de secret. Sources : <a href="https://docs.nginx.com/nginx/admin-guide/load-balancer/http-health-check/">Nginx
— contrôles passifs</a>, <a href="https://nginx.org/en/docs/http/ngx_http_upstream_module.html">Nginx
— module upstream</a>.</p>
<details class="corriges"><summary>Corrigés — à ouvrir après avoir cherché</summary>
<p><strong>1.1 / 1.2.</strong> Le service reste disponible : les
réponses viennent de <code>sisrN-app</code>. Une requête peut renvoyer
<code>502</code> (ou être relancée silencieusement par Nginx vers
l’autre serveur, selon <code>proxy_next_upstream</code>) au moment où
Nginx découvre l’échec ; ensuite <code>app2</code> est écarté.</p>
<p><strong>2.1.</strong> <code>docker ps -a</code> : <code>app2</code>
en état <code>Exited</code>. Test local 8081 : aucune réponse. Test
local 8080 et test externe : <code>sisrN-app</code> répond, donc Nginx
et <code>app</code> fonctionnent. <code>error.log</code> : échec de
connexion vers <code>127.0.0.1:8081</code>.</p>
<p><strong>2.2.</strong>
<code>connect() failed (111: Connection refused) while connecting to upstream … upstream: &quot;http://127.0.0.1:8081/&quot;</code>.
Rien n’écoute sur ce port. La ligne prouve que Nginx tourne, reçoit les
requêtes et tente bien de joindre la destination : la panne est côté
application.</p>
<p><strong>3.1.</strong> Pas forcément : <code>app2</code> est écarté
pendant <code>fail_timeout</code> (10 s par défaut) ; il est retrouvé à
la prochaine tentative réussie.</p>
<p><strong>3.2.</strong> <code>--restart unless-stopped</code> :
redémarrage automatique au démarrage de Docker, <strong>sauf</strong> si
le conteneur a été arrêté volontairement. Elle ne protège donc pas d’un
<code>docker stop</code>.</p>
<p><strong>Étape 4.</strong> <code>app2</code> arrêtée : le service
répond via <code>app</code>. Nginx arrêté : connexion refusée sur 443,
alors que les applications répondent en local. Instance indisponible :
ni HTTPS ni SSH ; on le constate depuis une autre source et via la
console du fournisseur.</p>
<p><strong>4.1.</strong> L’instance et Nginx (un seul de chaque).</p>
<p><strong>4.2.</strong> Exemple : deux instances portant chacune Nginx
et l’application, derrière un répartiteur cloud managé (ou deux proxys
partageant une adresse flottante). Le nouveau point d’entrée doit
lui-même être redondé ; il reste les risques communs (même région, même
fournisseur, même DNS).</p>
</details>
