<section id="ranger-les-scores" class="slide title">
<h2>Ranger les scores</h2>
<h3 id="lire-et-modifier-une-liste-python">Lire et modifier une liste
Python</h3>
</section>
<section id="objectifs" class="slide concept">
<h2>Objectifs</h2>
<ul>
<li>Repérer l’indice d’un score.</li>
<li>Lire et modifier la case qui correspond à une manche.</li>
<li>Retrouver les indices utilisables à partir de la longueur.</li>
</ul>
<p><strong>Prérequis</strong> — Variables, affectations et affichage
avec <code>print</code>.</p>
</section>
<section id="combien-de-variables-pour-une-partie" class="slide concept">
<h2>Combien de variables pour une partie ?</h2>
<p>Notre jeu garde un score par manche. Aujourd’hui, quatre manches.
Demain, douze.</p>
<div class="sourceCode" id="cb1"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>score1 <span class="op">=</span> <span class="dv">8</span></span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>score2 <span class="op">=</span> <span class="dv">12</span></span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>score3 <span class="op">=</span> <span class="dv">5</span></span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>score4 <span class="op">=</span> <span class="dv">15</span></span></code></pre></div>
<p>On veut retrouver et corriger un score à partir du numéro de la
manche.</p>
</section>
<section id="quest-ce-quune-liste-en-python" class="slide definition">
<h2>Qu’est-ce qu’une liste en Python ?</h2>
<p>Une <strong>liste</strong> est une suite ordonnée de valeurs,
appelées <strong>éléments</strong>. On peut modifier ses éléments après
l’avoir créée.</p>
<div class="sourceCode" id="cb2"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span></code></pre></div>
<ul>
<li>Les crochets <code>[ ]</code> délimitent la liste. Les virgules
séparent les éléments.</li>
<li>L’ordre compte. Ici, <code>8</code> correspond à la première
manche.</li>
</ul>
</section>
<section id="une-liste-et-des-indices" class="slide concept">
<h2>Une liste et des indices</h2>
<div class="sourceCode" id="cb3"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span></code></pre></div>
<table>
<thead>
<tr>
<th>Manche</th>
<th>1</th>
<th>2</th>
<th>3</th>
<th>4</th>
</tr>
</thead>
<tbody>
<tr>
<td>Indice</td>
<td>0</td>
<td>1</td>
<td>2</td>
<td>3</td>
</tr>
<tr>
<td>Score</td>
<td>8</td>
<td>12</td>
<td>5</td>
<td>15</td>
</tr>
</tbody>
</table>
<p><code>scores[1]</code> vaut 12. L’indice est le numéro de manche
moins 1.</p>
</section>
<section id="lire-un-score-et-corriger-une-case" class="slide code">
<h2>Lire un score et corriger une case</h2>
<p>Avec <code>scores[i]</code>, Python lit la valeur à l’indice
<code>i</code>. Avec <code>scores[i] = valeur</code>, il remplace cette
valeur dans la liste.</p>
<div class="sourceCode" id="cb4"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores[<span class="dv">1</span>])    <span class="co"># affiche 12</span></span>
<span id="cb4-3"><a href="#cb4-3" aria-hidden="true" tabindex="-1"></a>scores[<span class="dv">1</span>] <span class="op">=</span> <span class="dv">14</span>     <span class="co"># corrige la deuxième manche</span></span>
<span id="cb4-4"><a href="#cb4-4" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores)       <span class="co"># affiche [8, 14, 5, 15]</span></span></code></pre></div>
<p>La liste garde quatre éléments. Seule la valeur de la deuxième manche
change.</p>
</section>
<section id="la-longueur-et-le-dernier-indice" class="slide code">
<h2>La longueur et le dernier indice</h2>
<p>Pour une liste non vide, le dernier indice en comptant depuis le
début vaut <code>len(scores) - 1</code>.</p>
<div class="sourceCode" id="cb5"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span>
<span id="cb5-2"><a href="#cb5-2" aria-hidden="true" tabindex="-1"></a>nombre <span class="op">=</span> <span class="bu">len</span>(scores)</span>
<span id="cb5-3"><a href="#cb5-3" aria-hidden="true" tabindex="-1"></a>dernier_indice <span class="op">=</span> nombre <span class="op">-</span> <span class="dv">1</span></span>
<span id="cb5-4"><a href="#cb5-4" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(nombre, dernier_indice)  <span class="co"># affiche 4 3</span></span>
<span id="cb5-5"><a href="#cb5-5" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores[dernier_indice])  <span class="co"># affiche 15</span></span></code></pre></div>
</section>
<section id="que-dit-le-message-derreur" class="slide code">
<h2>Que dit le message d’erreur ?</h2>
<div class="sourceCode" id="cb6"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span>
<span id="cb6-2"><a href="#cb6-2" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores[<span class="dv">4</span>])</span></code></pre></div>
<pre class="text"><code>IndexError: list index out of range</code></pre>
<p>L’indice 4 est hors de la liste. Avec quatre cases, la quatrième
manche se trouve à l’indice 3.</p>
</section>
<section id="travailler-dans-python-sur-le-poste" class="slide concept">
<h2>Travailler dans Python sur le poste</h2>
<ol type="1">
<li>Ouvrez l’éditeur Python du poste et créez un nouveau fichier.</li>
<li>Recopiez le bloc de la diapositive et enregistrez le fichier en
<code>.py</code>.</li>
<li>Sur papier, prévoyez le résultat, puis lancez le programme et
comparez.</li>
</ol>
<p>Chaque exercice affiche le code de départ complet.</p>
</section>
<section id="exercice-1-prévoir-puis-exécuter" class="slide activity">
<h2>Exercice 1 — Prévoir, puis exécuter</h2>
<p>5 min · seul, sur papier puis dans Python. Notez les trois lignes
affichées avant d’exécuter le programme.</p>
<div class="sourceCode" id="cb8"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb8-1"><a href="#cb8-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">6</span>, <span class="dv">11</span>, <span class="dv">9</span>, <span class="dv">13</span>]</span>
<span id="cb8-2"><a href="#cb8-2" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores[<span class="dv">1</span>])</span>
<span id="cb8-3"><a href="#cb8-3" aria-hidden="true" tabindex="-1"></a>scores[<span class="dv">2</span>] <span class="op">=</span> <span class="dv">10</span></span>
<span id="cb8-4"><a href="#cb8-4" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(<span class="bu">len</span>(scores))</span>
<span id="cb8-5"><a href="#cb8-5" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores)</span></code></pre></div>
<p>Expliquez quelle manche a changé et ce que compte
<code>len(scores)</code>.</p>
</section>
<section id="exercice-2-corriger-le-bon-score" class="slide activity">
<h2>Exercice 2 — Corriger le bon score</h2>
<p>5 min · seul, dans Python. Remplacez chaque <code>...</code> du bloc.
La quatrième manche doit passer à 16.</p>
<div class="sourceCode" id="cb9"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb9-1"><a href="#cb9-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span>
<span id="cb9-2"><a href="#cb9-2" aria-hidden="true" tabindex="-1"></a>scores[...] <span class="op">=</span> <span class="dv">16</span></span>
<span id="cb9-3"><a href="#cb9-3" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores[...])  <span class="co"># quatrième manche</span></span>
<span id="cb9-4"><a href="#cb9-4" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores[...])  <span class="co"># première manche</span></span></code></pre></div>
<p>Vérifiez que Python affiche 16 puis 8. Justifiez les indices
choisis.</p>
</section>
<section id="exercice-3-trouver-le-dernier-score" class="slide activity">
<h2>Exercice 3 — Trouver le dernier score</h2>
<p>10 min · seul, dans Python. Complétez <code>dernier_indice</code>
pour afficher le dernier score quelle que soit la longueur d’une liste
non vide.</p>
<div class="sourceCode" id="cb10"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb10-1"><a href="#cb10-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">4</span>, <span class="dv">9</span>, <span class="dv">7</span>, <span class="dv">13</span>]</span>
<span id="cb10-2"><a href="#cb10-2" aria-hidden="true" tabindex="-1"></a>dernier_indice <span class="op">=</span> ...</span>
<span id="cb10-3"><a href="#cb10-3" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores[dernier_indice])</span></code></pre></div>
<p>Vérifiez que le résultat vaut 13, puis remplacez la première ligne
par <code>scores = [4, 9]</code>. Le même calcul doit afficher 9.</p>
</section>
<section id="ce-que-désigne-chaque-nombre" class="slide summary">
<h2>Ce que désigne chaque nombre</h2>
<ul>
<li>Le numéro de manche compte à partir de 1.</li>
<li>L’indice de la case compte à partir de 0.</li>
<li>La valeur dans la case est le score.</li>
<li>La longueur dit combien de scores sont rangés.</li>
</ul>
<p>À l’oral, expliquez pourquoi <code>scores[3]</code> donne la
quatrième valeur d’une liste de quatre éléments.</p>
</section>
