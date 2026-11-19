<section id="parcourir-les-scores" class="slide title">
<h2>Parcourir les scores</h2>
<h3 id="compter-et-transformer-une-liste-python">Compter et transformer
une liste Python</h3>
</section>
<section id="objectifs" class="slide concept">
<h2>Objectifs</h2>
<ul>
<li>Parcourir une liste pour compter les scores qui atteignent un
seuil.</li>
<li>Choisir entre un parcours par valeurs et un parcours par
indices.</li>
<li>Construire une nouvelle liste par compréhension.</li>
</ul>
<p><strong>Prérequis</strong> — Lire une liste par indice (P01),
<code>for</code>, <code>range</code>, <code>if</code>, fonctions.</p>
</section>
<section id="combien-de-manches-réussies" class="slide concept">
<h2>Combien de manches réussies ?</h2>
<p>Une manche est réussie si son score atteint 12.</p>
<div class="sourceCode" id="cb1"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span></code></pre></div>
<p>Sur quatre scores, on compte de tête. Sur cent, le programme doit
lire chaque case à notre place.</p>
</section>
<section id="lire-chaque-valeur" class="slide code">
<h2>Lire chaque valeur</h2>
<p><code>for score in scores</code> donne les valeurs une par une, dans
l’ordre de la liste.</p>
<div class="sourceCode" id="cb2"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a><span class="cf">for</span> score <span class="kw">in</span> scores:</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>    <span class="bu">print</span>(score)</span></code></pre></div>
<p>La variable <code>score</code> prend successivement les valeurs 8,
12, 5 puis 15.</p>
</section>
<section id="un-compteur-dans-la-boucle" class="slide code">
<h2>Un compteur dans la boucle</h2>
<div class="sourceCode" id="cb3"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span>
<span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabindex="-1"></a>seuil <span class="op">=</span> <span class="dv">12</span></span>
<span id="cb3-3"><a href="#cb3-3" aria-hidden="true" tabindex="-1"></a>reussites <span class="op">=</span> <span class="dv">0</span></span>
<span id="cb3-4"><a href="#cb3-4" aria-hidden="true" tabindex="-1"></a><span class="cf">for</span> score <span class="kw">in</span> scores:</span>
<span id="cb3-5"><a href="#cb3-5" aria-hidden="true" tabindex="-1"></a>    <span class="cf">if</span> score <span class="op">&gt;=</span> seuil:</span>
<span id="cb3-6"><a href="#cb3-6" aria-hidden="true" tabindex="-1"></a>        reussites <span class="op">=</span> reussites <span class="op">+</span> <span class="dv">1</span></span>
<span id="cb3-7"><a href="#cb3-7" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(reussites)  <span class="co"># affiche 2</span></span></code></pre></div>
<p>Le compteur part de 0 avant la boucle. Il n’augmente que pour un
score qui atteint le seuil.</p>
</section>
<section id="tracer-le-compteur" class="slide concept">
<h2>Tracer le compteur</h2>
<table>
<thead>
<tr>
<th>Score lu</th>
<th>8</th>
<th>12</th>
<th>5</th>
<th>15</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>score &gt;= 12</code> ?</td>
<td>non</td>
<td>oui</td>
<td>non</td>
<td>oui</td>
</tr>
<tr>
<td><code>reussites</code> après</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>2</td>
</tr>
</tbody>
</table>
<p>Une trace à la main permet de prévoir le résultat avant
d’exécuter.</p>
</section>
<section id="parcourir-par-indices" class="slide code">
<h2>Parcourir par indices</h2>
<p>Pour connaître aussi le <strong>numéro de manche</strong>, on
parcourt les indices.</p>
<div class="sourceCode" id="cb4"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a><span class="cf">for</span> i <span class="kw">in</span> <span class="bu">range</span>(<span class="bu">len</span>(scores)):</span>
<span id="cb4-3"><a href="#cb4-3" aria-hidden="true" tabindex="-1"></a>    <span class="bu">print</span>(<span class="st">&quot;manche&quot;</span>, i <span class="op">+</span> <span class="dv">1</span>, <span class="st">&quot;:&quot;</span>, scores[i])</span></code></pre></div>
<p><code>range(len(scores))</code> donne 0, 1, 2, 3 : exactement les
indices valides.</p>
</section>
<section id="valeurs-ou-indices" class="slide compare">
<h2>Valeurs ou indices ?</h2>
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr>
<th>Besoin</th>
<th>Parcours</th>
</tr>
</thead>
<tbody>
<tr>
<td>Seule la valeur compte (compter, totaliser)</td>
<td><code>for score in scores</code></td>
</tr>
<tr>
<td>Il faut la position (numéro de manche, modifier une case)</td>
<td><code>for i in range(len(scores))</code></td>
</tr>
</tbody>
</table>
</section>
<section id="un-bonus-pour-chaque-manche" class="slide concept">
<h2>Un bonus pour chaque manche</h2>
<p>Le jeu ajoute deux points à chaque manche. On veut la nouvelle série
<strong>sans perdre</strong> les scores d’origine.</p>
<div class="sourceCode" id="cb5"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span>
<span id="cb5-2"><a href="#cb5-2" aria-hidden="true" tabindex="-1"></a>avec_bonus <span class="op">=</span> [score <span class="op">+</span> <span class="dv">2</span> <span class="cf">for</span> score <span class="kw">in</span> scores]</span>
<span id="cb5-3"><a href="#cb5-3" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(avec_bonus)  <span class="co"># affiche [10, 14, 7, 17]</span></span>
<span id="cb5-4"><a href="#cb5-4" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores)      <span class="co"># affiche [8, 12, 5, 15]</span></span></code></pre></div>
</section>
<section id="une-liste-construite-par-compréhension" class="slide definition">
<h2>Une liste construite par compréhension</h2>
<div class="sourceCode" id="cb6"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a>nouvelle <span class="op">=</span> [expression <span class="cf">for</span> x <span class="kw">in</span> tableau]</span></code></pre></div>
<ul>
<li>Python évalue l’expression pour chaque élément <code>x</code>.</li>
<li>Les résultats forment une <strong>nouvelle</strong> liste, dans le
même ordre.</li>
<li>Le tableau de départ n’est pas modifié.</li>
</ul>
</section>
<section id="exercice-1-tracer-puis-exécuter" class="slide activity">
<h2>Exercice 1 — Tracer, puis exécuter</h2>
<p>5 min · seul, sur papier puis dans Python.</p>
<p>Reprenez le programme du compteur. Écrivez la trace de
<code>reussites</code> pour le seuil 12, puis pour le seuil 16. Vérifiez
en changeant la valeur de <code>seuil</code>.</p>
</section>
<section id="exercice-2-une-fonction-qui-compte" class="slide activity">
<h2>Exercice 2 — Une fonction qui compte</h2>
<p>15 min · seul, dans Python. Complétez la fonction, puis testez les
trois appels.</p>
<div class="sourceCode" id="cb7"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb7-1"><a href="#cb7-1" aria-hidden="true" tabindex="-1"></a><span class="kw">def</span> compter_reussites(scores, seuil):</span>
<span id="cb7-2"><a href="#cb7-2" aria-hidden="true" tabindex="-1"></a>    ...</span>
<span id="cb7-3"><a href="#cb7-3" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb7-4"><a href="#cb7-4" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(compter_reussites([<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>], <span class="dv">12</span>))  <span class="co"># attendu : 2</span></span>
<span id="cb7-5"><a href="#cb7-5" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(compter_reussites([<span class="dv">12</span>], <span class="dv">12</span>))            <span class="co"># attendu : 1</span></span>
<span id="cb7-6"><a href="#cb7-6" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(compter_reussites([], <span class="dv">12</span>))              <span class="co"># attendu : 0</span></span></code></pre></div>
</section>
<section id="exercice-3-tripler-puis-repérer" class="slide activity">
<h2>Exercice 3 — Tripler, puis repérer</h2>
<p>10 min · seul, dans Python.</p>
<ol type="1">
<li>Construisez par compréhension une liste qui triple chaque score de
<code>[8, 12, 5, 15]</code>. Vérifiez la première et la dernière
valeur.</li>
<li>Affichez les numéros des manches dont le score atteint 12.
Choisissez le bon parcours.</li>
</ol>
</section>
<section id="parcourir-une-liste" class="slide summary">
<h2>Parcourir une liste</h2>
<ul>
<li><code>for score in scores</code> : chaque valeur.</li>
<li><code>for i in range(len(scores))</code> : chaque indice, donc
chaque position.</li>
<li>Un compteur démarre à 0 avant la boucle.</li>
<li><code>[expression for x in tableau]</code> crée une nouvelle
liste.</li>
</ul>
<p>À l’oral, expliquez pourquoi l’exercice 3.2 exige un parcours par
indices.</p>
</section>
