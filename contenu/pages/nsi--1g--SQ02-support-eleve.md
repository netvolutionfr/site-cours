<p>Un jeu enregistre un score par manche. Construisons un programme qui
retrouve, corrige et résume ces scores quelle que soit la durée de la
partie.</p>
<div class="sequence-overview">
<section id="objectifs" class="objectives">
<h3>Objectifs</h3>
<ul>
<li>Lire, modifier et parcourir des tableaux.</li>
<li>Renvoyer plusieurs résultats et organiser des données par clés.</li>
</ul>
</section>
<section id="prérequis" class="prerequisites">
<h3>Prérequis</h3>
<ul>
<li>Variables, conditions, boucles et fonctions Python.</li>
</ul>
</section>
<section id="sommaire" class="outline">
<h3>Sommaire</h3>
<table>
<thead>
<tr>
<th>Partie</th>
<th>Contenu</th>
</tr>
</thead>
<tbody>
<tr>
<td>P01</td>
<td>Ranger les scores dans une liste</td>
</tr>
<tr>
<td>P02</td>
<td>Parcourir et transformer une liste</td>
</tr>
<tr>
<td>P03</td>
<td>Renvoyer un bilan dans un tuple</td>
</tr>
<tr>
<td>P04</td>
<td>Lire une grille de scores</td>
</tr>
<tr>
<td>P05</td>
<td>Nommer les informations dans un dictionnaire</td>
</tr>
</tbody>
</table>
</section>
</div>
<h3 id="p01-ranger-les-scores-dans-une-liste">P01 — Ranger les scores
dans une liste</h3>
<p>Une liste Python permet de représenter un tableau d’entiers. Chaque
score est associé à une position appelée <strong>indice</strong>. Le
premier indice est 0. Avec quatre scores, le dernier indice est 3.</p>
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
<td>Indice dans la liste</td>
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
<div class="sourceCode" id="cb1"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(scores[<span class="dv">1</span>])    <span class="co"># lit le score de la deuxième manche</span></span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>scores[<span class="dv">2</span>] <span class="op">=</span> <span class="dv">7</span>       <span class="co"># corrige le score de la troisième manche</span></span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(<span class="bu">len</span>(scores))  <span class="co"># affiche le nombre d&#39;éléments</span></span></code></pre></div>
<blockquote>
<p><strong>À retenir.</strong> Pour les indices positifs ou nuls, une
liste de longueur <code>n</code> utilise les indices de 0 à
<code>n - 1</code>. Par exemple, sur quatre scores,
<code>scores[4]</code> déclenche une erreur <code>IndexError</code>.</p>
</blockquote>
<h4 id="à-vous">À vous</h4>
<ol type="1">
<li>Sur papier, prévoyez ce qu’affiche le programme et écrivez l’état de
<code>scores</code> après la correction. Vérifiez en l’exécutant.</li>
<li>Ajoutez deux lignes pour corriger la quatrième manche à 16 puis
afficher son score. Vérifiez que la première manche vaut encore 8.</li>
<li>Sur une liste de douze scores, quel indice lit le score de la
douzième manche ? Écrivez une expression qui lit le dernier score de
toute liste <code>scores</code> contenant au moins un élément.</li>
</ol>
<h3 id="p02-parcourir-et-transformer-une-liste">P02 — Parcourir et
transformer une liste</h3>
<p>Combien de manches atteignent 12 points ? Sur quatre scores, on
compte de tête ; sur cent, il faut que le programme lise chaque case à
notre place.</p>
<p>Repartons des quatre scores d’origine. Pour compter les manches
réussies, on lit chaque score. Un compteur augmente seulement si le
score atteint le seuil.</p>
<div class="sourceCode" id="cb2"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>scores <span class="op">=</span> [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>]</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>seuil <span class="op">=</span> <span class="dv">12</span></span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>reussites <span class="op">=</span> <span class="dv">0</span></span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a><span class="cf">for</span> score <span class="kw">in</span> scores:</span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>    <span class="cf">if</span> score <span class="op">&gt;=</span> seuil:</span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a>        reussites <span class="op">=</span> reussites <span class="op">+</span> <span class="dv">1</span></span>
<span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(reussites)</span></code></pre></div>
<p>Quand seule la valeur compte, <code>for score in scores</code>
suffit. Quand on doit aussi connaître le numéro de manche ou écrire dans
une case, on peut utiliser <code>for i in range(len(scores))</code> et
accéder à <code>scores[i]</code>.</p>
<p>Le jeu accorde maintenant un bonus de deux points par manche. On veut
la nouvelle série sans perdre les scores d’origine, qui servent encore
au classement.</p>
<p>Une <strong>compréhension</strong> construit un tableau en appliquant
une expression à chaque élément. Ici, <code>scores</code> conserve les
valeurs d’origine et <code>avec_bonus</code> en contient de
nouvelles.</p>
<div class="sourceCode" id="cb3"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a>avec_bonus <span class="op">=</span> [score <span class="op">+</span> <span class="dv">2</span> <span class="cf">for</span> score <span class="kw">in</span> scores]</span></code></pre></div>
<blockquote>
<p><strong>À retenir.</strong> <code>for score in scores</code> lit
chaque valeur ; <code>for i in range(len(scores))</code> donne aussi la
position. Un compteur commence à 0 avant la boucle et augmente dans la
boucle. Une compréhension <code>[expression for x in tableau]</code>
crée une nouvelle liste sans modifier l’ancienne.</p>
</blockquote>
<h4 id="à-vous-1">À vous</h4>
<ol type="1">
<li>Tracez les valeurs successives du compteur pour le seuil 12, puis
pour le seuil 16. Vérifiez sur ordinateur.</li>
<li>Écrivez une fonction <code>compter_reussites(scores, seuil)</code>.
Testez-la avec la liste d’exemple au seuil 12, avec <code>[12]</code> au
seuil 12 et avec une liste vide.</li>
<li>Construisez par compréhension une liste qui triple chaque score.
Vérifiez la première et la dernière valeur avec le tableau
d’origine.</li>
<li>En extension, affichez les numéros de manche dont le score atteint
le seuil.</li>
</ol>
<h3 id="p03-renvoyer-un-bilan-dans-un-tuple">P03 — Renvoyer un bilan
dans un tuple</h3>
<p>Le bilan d’une partie comporte deux nombres : le total et le nombre
de manches réussies. Or <code>return</code> ne renvoie qu’une seule
valeur. Comment une fonction peut-elle rendre les deux ?</p>
<p>Un <strong>tuple</strong>, ou p-uplet, regroupe un nombre donné de
valeurs dans un ordre convenu. Comme pour une liste, les indices partent
de 0. Les éléments du tuple ne se remplacent pas après sa création. Une
fonction peut ainsi renvoyer plusieurs informations ensemble.</p>
<div class="sourceCode" id="cb4"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="kw">def</span> bilan(scores, seuil):</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a>    total <span class="op">=</span> <span class="dv">0</span></span>
<span id="cb4-3"><a href="#cb4-3" aria-hidden="true" tabindex="-1"></a>    reussites <span class="op">=</span> <span class="dv">0</span></span>
<span id="cb4-4"><a href="#cb4-4" aria-hidden="true" tabindex="-1"></a>    <span class="cf">for</span> score <span class="kw">in</span> scores:</span>
<span id="cb4-5"><a href="#cb4-5" aria-hidden="true" tabindex="-1"></a>        total <span class="op">=</span> total <span class="op">+</span> score</span>
<span id="cb4-6"><a href="#cb4-6" aria-hidden="true" tabindex="-1"></a>        <span class="cf">if</span> score <span class="op">&gt;=</span> seuil:</span>
<span id="cb4-7"><a href="#cb4-7" aria-hidden="true" tabindex="-1"></a>            reussites <span class="op">=</span> reussites <span class="op">+</span> <span class="dv">1</span></span>
<span id="cb4-8"><a href="#cb4-8" aria-hidden="true" tabindex="-1"></a>    <span class="cf">return</span> (total, reussites)</span>
<span id="cb4-9"><a href="#cb4-9" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb4-10"><a href="#cb4-10" aria-hidden="true" tabindex="-1"></a>total, reussites <span class="op">=</span> bilan([<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>], <span class="dv">12</span>)</span></code></pre></div>
<p>La dernière ligne <strong>déballe</strong> le tuple en deux
variables. L’ordre permet de savoir quel résultat va dans chaque
variable.</p>
<blockquote>
<p><strong>À retenir.</strong> <code>return (a, b)</code> renvoie un
seul objet qui contient deux valeurs. On les récupère par indice,
<code>resultat[0]</code>, ou en déballant, <code>a, b = resultat</code>.
L’ordre est une convention à respecter partout.</p>
</blockquote>
<h4 id="à-vous-2">À vous</h4>
<ol type="1">
<li>Prévoyez les deux valeurs de <code>bilan([8, 12, 5, 15], 12)</code>
ainsi que celles de <code>bilan([3, 4], 12)</code>. Vérifiez.</li>
<li>Écrivez une fonction <code>bilan_bonus(scores, seuil)</code> qui
renvoie le bilan après un bonus de deux points par manche. Réutilisez la
compréhension et la fonction <code>bilan</code>.</li>
</ol>
<h3 id="p04-lire-une-grille-de-scores">P04 — Lire une grille de
scores</h3>
<p>On range les scores de plusieurs joueurs dans une liste de listes.
Chaque ligne représente un joueur. Chaque colonne correspond à une
manche.</p>
<div class="sourceCode" id="cb5"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a>grille <span class="op">=</span> [</span>
<span id="cb5-2"><a href="#cb5-2" aria-hidden="true" tabindex="-1"></a>    [<span class="dv">8</span>, <span class="dv">12</span>, <span class="dv">5</span>, <span class="dv">15</span>],  <span class="co"># joueur 1</span></span>
<span id="cb5-3"><a href="#cb5-3" aria-hidden="true" tabindex="-1"></a>    [<span class="dv">9</span>,  <span class="dv">4</span>, <span class="dv">8</span>, <span class="dv">10</span>],  <span class="co"># joueur 2</span></span>
<span id="cb5-4"><a href="#cb5-4" aria-hidden="true" tabindex="-1"></a>]</span>
<span id="cb5-5"><a href="#cb5-5" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(grille[<span class="dv">1</span>][<span class="dv">2</span>])</span></code></pre></div>
<p><code>grille[1]</code> sélectionne la deuxième ligne. Le deuxième
indice, <code>[2]</code>, sélectionne son troisième score.</p>
<blockquote>
<p><strong>À retenir.</strong> Dans <code>grille[i][j]</code>, le
premier indice choisit la ligne (le joueur), le second la colonne (la
manche). <code>grille[i]</code> est elle-même une liste : on peut la
passer à une fonction comme <code>bilan</code>.</p>
</blockquote>
<h4 id="à-vous-3">À vous</h4>
<ol type="1">
<li>Prévoyez le résultat du programme, puis vérifiez.</li>
<li>Le joueur 2 a marqué 14 à la deuxième manche. Corrigez la case
correspondante puis affichez le bilan de la ligne du joueur 2 au seuil
12.</li>
<li>En extension, affichez le score de la première manche de chaque
joueur en parcourant les lignes.</li>
</ol>
<h3 id="p05-nommer-les-informations-dans-un-dictionnaire">P05 — Nommer
les informations dans un dictionnaire</h3>
<p>Le bilan <code>(40, 2)</code> est correct, mais lequel des deux
nombres est le total ? Il faut se souvenir de l’ordre. On préférerait
écrire « total » plutôt que « indice 0 ».</p>
<p>Un <strong>dictionnaire</strong> associe une clé à une valeur. On
accède au champ <code>&quot;total&quot;</code> avec son nom. On peut aussi
associer des enregistrements entiers aux noms des joueurs. L’exemple
reprend la fonction <code>bilan</code> de P03 et la grille de P04.</p>
<div class="sourceCode" id="cb6"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a>total, reussites <span class="op">=</span> bilan(grille[<span class="dv">0</span>], <span class="dv">12</span>)</span>
<span id="cb6-2"><a href="#cb6-2" aria-hidden="true" tabindex="-1"></a>fiche_iris <span class="op">=</span> {<span class="st">&quot;total&quot;</span>: total, <span class="st">&quot;reussites&quot;</span>: reussites}</span>
<span id="cb6-3"><a href="#cb6-3" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(fiche_iris[<span class="st">&quot;total&quot;</span>])</span>
<span id="cb6-4"><a href="#cb6-4" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb6-5"><a href="#cb6-5" aria-hidden="true" tabindex="-1"></a>bilans <span class="op">=</span> {<span class="st">&quot;Iris&quot;</span>: fiche_iris}</span>
<span id="cb6-6"><a href="#cb6-6" aria-hidden="true" tabindex="-1"></a><span class="cf">for</span> nom, fiche <span class="kw">in</span> bilans.items():</span>
<span id="cb6-7"><a href="#cb6-7" aria-hidden="true" tabindex="-1"></a>    <span class="bu">print</span>(nom, fiche[<span class="st">&quot;total&quot;</span>])</span></code></pre></div>
<p><code>keys()</code> fournit les clés, <code>values()</code> les
valeurs et <code>items()</code> les couples (clé, valeur).</p>
<blockquote>
<p><strong>À retenir.</strong> Une liste se lit par position, un
dictionnaire par nom : <code>fiche[&quot;total&quot;]</code>. Écrire
<code>d[cle] = valeur</code> crée l’entrée si la clé n’existe pas
encore, ou remplace sa valeur sinon.</p>
</blockquote>
<h4 id="mini-projet-afficher-le-tableau-de-bord">Mini-projet — Afficher
le tableau de bord</h4>
<ol type="1">
<li>Utilisez la grille de P04 après la correction. Associez la première
ligne à Iris et la deuxième à Noah.</li>
<li>Ajoutez à <code>bilans</code> une entrée pour Noah avec son total et
son nombre de réussites.</li>
<li>Parcourez <code>bilans</code> et affichez une ligne par joueur avec
son nom, son total et ses réussites.</li>
<li>Vérifiez à la main ce que doit afficher le programme. Essayez
ensuite en remplaçant la ligne de Noah par <code>[0, 1, 2, 3]</code>.
Expliquez à l’oral quel élément vous retrouvez grâce à un indice et quel
champ vous retrouvez grâce à une clé.</li>
</ol>
<p>Votre fichier Python contient les fonctions de calcul, les données
d’exemple et l’affichage du bilan. Travail individuel sans IA
générative. Prévoyez le résultat avant chaque test.</p>
<details class="corriges"><summary>Corrigés — à ouvrir après avoir cherché</summary>
<h3 id="p01-ranger-les-scores-dans-une-liste-1">P01 — Ranger les scores
dans une liste</h3>
<ol type="1">
<li>Le programme affiche 12 puis 4. La liste devient
<code>[8, 12, 7, 15]</code> : seule la troisième manche a changé.</li>
<li><code>scores[3] = 16</code> corrige la quatrième manche, puis
<code>print(scores[3])</code> affiche 16. <code>print(scores[0])</code>
affiche toujours 8.</li>
<li>La douzième manche est à l’indice 11. Pour toute liste non vide,
<code>scores[len(scores) - 1]</code> lit le dernier score : le dernier
indice vaut la longueur moins 1.</li>
</ol>
</details>
