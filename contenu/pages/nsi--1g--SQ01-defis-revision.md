<p>Pour préparer l’évaluation du 23 novembre : cherchez d’abord sur
papier, sans calculatrice ni IA, et justifiez vos réponses. Les
exercices sont indépendants. Consultez la correction seulement après
avoir essayé. Vous pouvez utiliser une feuille séparée pour vos
calculs.</p>
<p>Rappel utile : puissances de 2 de 2⁰ à 2⁸ : 1, 2, 4, 8, 16, 32, 64,
128, 256. En hexadécimal, A à F représentent 10 à 15.</p>
<section id="objectif" class="objectives">
<h3>Objectif</h3>
<p>S’entraîner à représenter les entiers et expliquer ses calculs.</p>
</section>
<h3 id="exercices">12 exercices</h3>
<h4 id="les-lampes-du-musée">1. Les lampes du musée</h4>
<p>Huit lampes représentent, de gauche à droite, les poids 128 à 1. Les
lampes 64, 16, 8 et 2 sont allumées. Écrivez le motif binaire puis sa
valeur décimale. Quel est le plus petit changement de valeur obtenu en
inversant une seule lampe ?</p>
<h4 id="le-coffre-aux-poids">2. Le coffre aux poids</h4>
<p>Un coffre affiche le nombre 93 avec huit voyants binaires. Décomposez
93 en puissances de 2 puis dessinez les voyants allumés (1) et éteints
(0).</p>
<h4 id="une-base-extraterrestre">3. Une base extraterrestre</h4>
<p>Sur une planète, on écrit les nombres en base 3 avec les chiffres 0,
1 et 2. Convertissez <code>1202</code> en décimal, puis écrivez 20 en
base 3. Expliquez les poids utilisés.</p>
<h4 id="message-fragmenté">4. Message fragmenté</h4>
<p>Convertissez <code>101011011</code> en hexadécimal. Expliquez où
ajouter des zéros pour former des groupes de quatre bits sans changer la
valeur.</p>
<h4 id="palette-numérique">5. Palette numérique</h4>
<p>Une intensité lumineuse est codée par <code>D7</code> en hexadécimal.
Donnez son écriture binaire sur huit bits puis sa valeur décimale. Quel
est le code hexadécimal de l’intensité décimale 46 ?</p>
<h4 id="détective-des-bases">6. Détective des bases</h4>
<p>Une étiquette affirme : « <code>10000</code> en base 2 est supérieur
à <code>20</code> en base 10 car il comporte plus de chiffres ».
Déterminez les valeurs et expliquez l’erreur.</p>
<h4 id="billets-de-festival">7. Billets de festival</h4>
<p>On numérote les billets de 0 à 999. Combien de bits non signés
faut-il au minimum pour stocker chaque numéro ? Combien de numéros
différents ce codage permet-il ?</p>
<h4 id="somme-et-produit">8. Somme et produit</h4>
<p>Deux entiers non signés occupent chacun 5 bits. Quelles tailles
suffisent toujours pour leur somme et leur produit ? Justifiez avec les
bornes et montrez que ces tailles sont nécessaires dans le pire cas.</p>
<h4 id="lodomètre-minuscule">9. L’odomètre minuscule</h4>
<p>Un compteur non signé sur 4 bits indique 14. Il augmente de 3 et ne
conserve que ses quatre bits. Quelle valeur affiche-t-il ? Donnez aussi
l’écriture binaire de la somme avant et après troncature.</p>
<h4 id="deux-lectures-dun-motif">10. Deux lectures d’un motif</h4>
<p>Interprétez <code>11101011</code> sur huit bits d’abord comme entier
non signé, puis comme entier signé en complément à 2. Détaillez les deux
lectures.</p>
<h4 id="le-thermomètre">11. Le thermomètre</h4>
<p>Codez −23 en complément à 2 sur huit bits en détaillant les étapes.
Puis donnez les bornes des entiers signés sur 8 bits et expliquez
pourquoi +128 ne peut pas être codé ainsi.</p>
<h4 id="la-console-python">12. La console Python</h4>
<p>Sans exécuter, indiquez le résultat et son type pour
<code>bin(14)</code> et <code>int(&quot;1110&quot;, 2)</code>. Que signifie le
préfixe de la première réponse ?</p>
<h3 id="problème-1-inventer-un-badge-de-jeu">Problème 1 — Inventer un
badge de jeu</h3>
<p>Un badge stocke sur un octet une combinaison de deux champs non
signés : les <strong>3 bits de gauche</strong> codent une équipe (0 à 7)
et les <strong>5 bits de droite</strong> un numéro de joueur (0 à
31).</p>
<ol type="1">
<li>Construisez le badge de l’équipe 5 et du joueur 19. Donnez aussi son
écriture hexadécimale.</li>
<li>Un badge porte <code>01110110</code>. Retrouvez l’équipe et le
joueur. Pourquoi ne faut-il pas lire l’octet entier comme un seul numéro
de joueur ?</li>
<li>Le jeu veut maintenant 10 équipes tout en gardant 32 joueurs par
équipe. Un octet suffit-il avec ce découpage ? Proposez le nombre
minimal de bits par champ et le total.</li>
<li>Deux badges distincts peuvent-ils avoir le même motif avec ce
découpage ? Justifiez.</li>
</ol>
<h3 id="problème-2-concevoir-une-jauge-de-déplacement">Problème 2 —
Concevoir une jauge de déplacement</h3>
<p>Un robot mesure un déplacement entier signé, en centimètres. On
cherche un codage en complément à 2 permettant les valeurs de −300 à
+300 inclus.</p>
<ol type="1">
<li>Parmi 8, 16, 32 et 64 bits, choisissez la plus petite taille
adaptée. Justifiez avec les bornes signées.</li>
<li>Pour un prototype sur 8 bits, codez +45 et −45. Additionnez les deux
écritures et indiquez ce qui arrive à la retenue hors de l’octet. Quel
intérêt du complément à 2 cette opération illustre-t-elle ?</li>
<li>Un autre calcul sur ce prototype additionne +90 et +60. La valeur
mathématique est-elle représentable ? Quelle valeur signée donne le
motif obtenu en conservant huit bits ? Expliquez la différence.</li>
</ol>
<details class="corriges"><summary>Corrigés — à ouvrir après avoir cherché</summary>
<p>Ne regardez ces réponses qu’après avoir cherché : comparez surtout
les méthodes et reprenez vos erreurs.</p>
<h3 id="à-6">1 à 6</h3>
<ol type="1">
<li><code>01011010</code> = 64 + 16 + 8 + 2 = <strong>90</strong>.
Inverser la lampe de poids 1 change la valeur de
<strong>1</strong>.</li>
<li>93 = 64 + 16 + 8 + 4 + 1, soit
<strong><code>01011101</code></strong>.</li>
<li><code>1202</code>₃ = 1 × 27 + 2 × 9 + 0 × 3 + 2 =
<strong>47</strong>. 20 = 2 × 9 + 0 × 3 + 2, soit
<strong><code>202</code>₃</strong>.</li>
<li>Depuis la droite : <code>1 0101 1011</code>, complété en
<code>0001 0101 1011</code> : <strong>15B</strong>.</li>
<li><code>D7</code> = <code>1101 0111</code> = 13 × 16 + 7 =
<strong>215</strong>. 46 = 2 × 16 + 14 : <strong>2E</strong>.</li>
<li><code>10000</code>₂ = <strong>16</strong>, donc inférieur à 20. Le
nombre de chiffres ne suffit pas à comparer des écritures de bases
différentes.</li>
</ol>
<h3 id="à-12">7 à 12</h3>
<ol start="7" type="1">
<li>2⁹ = 512 ≤ 999 &lt; 1024 = 2¹⁰ : <strong>10 bits</strong>, soit
<strong>1024 valeurs</strong> de 0 à 1023.</li>
<li>Maximum 31 + 31 = 62 : <strong>6 bits</strong> sont nécessaires et
suffisants. Maximum 31 × 31 = 961, entre 512 et 1024 : <strong>10
bits</strong> sont nécessaires et suffisants.</li>
<li>14 + 3 = 17 = <code>10001</code> ; conserver quatre bits donne
<code>0001</code>, soit <strong>1</strong>.</li>
<li>Non signé : 128 + 64 + 32 + 8 + 2 + 1 = <strong>235</strong>. Signé
: 235 − 256 = <strong>−21</strong> (ou inversion <code>00010100</code>,
puis +1 : <code>00010101</code> = 21).</li>
<li>+23 = <code>00010111</code> ; inversion <code>11101000</code> ; +1 :
<strong><code>11101001</code></strong>. Bornes <strong>−128 à
+127</strong> : +128 dépasse le maximum.</li>
<li><code>bin(14)</code> donne la chaîne
<strong><code>0b1110</code></strong>, dont <code>0b</code> signale le
binaire. <code>int(&quot;1110&quot;, 2)</code> donne l’entier
<strong>14</strong>.</li>
</ol>
<h3 id="problème-1">Problème 1</h3>
<ol type="1">
<li>5 = <code>101</code> et 19 = <code>10011</code> :
<strong><code>10110011</code></strong>, soit <strong>B3</strong>.</li>
<li><code>011</code> = équipe <strong>3</strong> ; <code>10110</code> =
joueur <strong>22</strong>. Le découpage donne un rôle distinct à chaque
groupe de bits.</li>
<li>10 équipes exigent <strong>4 bits</strong> (8 valeurs ne suffisent
pas), 32 joueurs exigent <strong>5 bits</strong> : <strong>9
bits</strong> au minimum, donc un octet ne suffit pas.</li>
<li>Non : chaque champ occupe des positions fixes et possède une
écriture unique sur sa largeur ; un même motif détermine donc une seule
paire.</li>
</ol>
<h3 id="problème-2">Problème 2</h3>
<ol type="1">
<li>Sur 8 bits, les bornes sont −128 à +127, insuffisantes. Sur 16 bits,
elles sont −32768 à +32767 : <strong>16 bits</strong> suffisent.</li>
<li>+45 = <code>00101101</code> ; inversion puis ajout de 1 : −45 =
<code>11010011</code>. La somme est <code>1 00000000</code> ; la retenue
de gauche est écartée, il reste <strong>0</strong>. La même addition
binaire fonctionne pour les nombres signés.</li>
<li>90 + 60 = <strong>150</strong>, hors de l’intervalle signé.
<code>01011010</code> + <code>00111100</code> = <code>10010110</code> ;
sa lecture signée vaut 150 − 256 = <strong>−106</strong>. Il y a
dépassement : le motif conservé ne représente pas la somme mathématique
dans ce codage.</li>
</ol>
</details>
