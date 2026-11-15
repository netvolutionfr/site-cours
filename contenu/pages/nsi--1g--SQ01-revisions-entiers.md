<div class="sequence-overview">
<section id="objectifs" class="objectives">
<h3>Objectifs</h3>
<ul>
<li>Convertir entre les bases 2, 10 et 16 en expliquant sa méthode.</li>
<li>Prévoir une taille, un dépassement et lire un entier signé.</li>
<li>Programmer et tester quelques fonctions en Python.</li>
</ul>
</section>
<section id="prérequis" class="prerequisites">
<h3>Prérequis</h3>
<ul>
<li>Poids des bits, octet, puissances de 2 et quartets.</li>
<li>Fonctions Python, conditions, boucles, <code>//</code> et
<code>%</code>.</li>
</ul>
</section>
<section id="parcours" class="outline">
<h3>Parcours</h3>
<table>
<thead>
<tr>
<th>Partie</th>
<th>Travail</th>
</tr>
</thead>
<tbody>
<tr>
<td>A</td>
<td>Sur papier : chercher avant de vérifier</td>
</tr>
<tr>
<td>B</td>
<td>Sur ordinateur : programmer puis tester</td>
</tr>
<tr>
<td>Corrigés</td>
<td>Vérifier après une recherche personnelle</td>
</tr>
</tbody>
</table>
</section>
</div>
<h3 id="a-sur-papier">A — Sur papier</h3>
<p>Travail individuel ; sans calculatrice pour préparer les conditions
de l’évaluation. Justifiez chaque réponse. En cas de blocage, consultez
la partie correspondante du cours, puis recommencez seul.</p>
<h4 id="lire-et-écrire">1. Lire et écrire</h4>
<ol type="1">
<li>Convertir <code>01101001</code> en décimal en détaillant les
poids.</li>
<li>Écrire 53 sur huit bits ; expliquer votre décomposition.</li>
<li>Sur six bits non signés, combien de valeurs sont possibles ? Quel
est le maximum ?</li>
</ol>
<h4 id="changer-de-base">2. Changer de base</h4>
<ol type="1">
<li>Convertir <code>10111100</code> en hexadécimal en regroupant les
bits.</li>
<li>Convertir <code>2F</code> en binaire sur huit bits puis en décimal.
F vaut 15.</li>
<li>Prévoir le résultat et le type de <code>bin(10)</code> et
<code>int(&quot;1010&quot;, 2)</code>.</li>
</ol>
<h4 id="tailles-et-compteur">3. Tailles et compteur</h4>
<ol type="1">
<li>Combien de bits au minimum pour 127 ? pour 128 ? Justifier avec des
puissances de 2.</li>
<li>Un entier non signé sur huit bits vaut 254 ; on ajoute 5 et on ne
conserve que huit bits. Que lit-on ? Pourquoi ?</li>
<li>Quelle taille suffit toujours pour la somme de deux entiers non
signés de huit bits ? Justifier par le plus grand cas.</li>
</ol>
<h4 id="entiers-signés">4. Entiers signés</h4>
<p>Dans chaque question, le codage est le complément à 2 sur huit
bits.</p>
<ol type="1">
<li>Donner l’intervalle des valeurs possibles.</li>
<li>Écrire −12 : partir de +12, inverser, ajouter 1.</li>
<li>Lire <code>11110000</code> : expliquer chaque étape.</li>
<li>Le calcul 100 + 40 tient-il ? Que signifie un résultat négatif dans
ce cas ?</li>
</ol>
<h3 id="b-sur-ordinateur-prévoir-programmer-tester">B — Sur ordinateur :
prévoir, programmer, tester</h3>
<p>Sur la page en ligne, complétez chaque fonction, puis cliquez sur
<strong>Tester</strong>. Prévoyez d’abord les résultats sur papier ; si
un test échoue, comparez le résultat attendu et observé. Ne modifiez pas
les tests. L’IA est interdite : les fonctions sont à construire
personnellement.</p>
<h4 id="lire-un-octet">5. Lire un octet</h4>
<p>Écrire <code>lire_bits(bits)</code> : pour une chaîne de
<code>0</code> et de <code>1</code>, accumuler la valeur en partant de
la gauche. À chaque caractère, multiplier le total précédent par 2 puis
ajouter la valeur du caractère. Exemple : <code>&quot;101&quot;</code> donne 5.
Une chaîne vide donne 0.</p>
<section class="exo-py" data-lettre>
<div class="editeur"><textarea wrap="off" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Votre code Python">def lire_bits(bits):
    total = 0
    # Parcourir les caractères de bits
    ...
    return total</textarea><div class="barre"><button type="button" data-action="tester">▶ Tester</button><button type="button" data-action="executer">Exécuter</button><button type="button" data-action="indenter" title="Insérer 4 espaces">⇥ Indenter</button><button type="button" data-action="reset">Recommencer</button></div><pre class="sortie" hidden></pre><div class="resultats" aria-live="polite"></div></div><script type="application/json" class="tests">["lire_bits(\"\") == 0","lire_bits(\"0\") == 0","lire_bits(\"101\") == 5","lire_bits(\"01101001\") == 105","lire_bits(\"11111111\") == 255"]</script></section>
<h4 id="un-compteur-sur-huit-bits">6. Un compteur sur huit bits</h4>
<p>Écrire <code>ajouter(a, b)</code> pour deux entiers de 0 à 255 : la
fonction renvoie la somme en ne gardant que huit bits. Indice : utiliser
le reste de la division par 256.</p>
<section class="exo-py" data-lettre>
<div class="editeur"><textarea wrap="off" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Votre code Python">def ajouter(a, b):
    ...</textarea><div class="barre"><button type="button" data-action="tester">▶ Tester</button><button type="button" data-action="executer">Exécuter</button><button type="button" data-action="indenter" title="Insérer 4 espaces">⇥ Indenter</button><button type="button" data-action="reset">Recommencer</button></div><pre class="sortie" hidden></pre><div class="resultats" aria-live="polite"></div></div><script type="application/json" class="tests">["ajouter(12, 5) == 17","ajouter(254, 1) == 255","ajouter(254, 5) == 3","ajouter(255, 255) == 254"]</script></section>
<h4 id="lire-un-octet-signé">7. Lire un octet signé</h4>
<p>Écrire <code>signe(n)</code> pour un entier de 0 à 255 représentant
la valeur non signée d’un octet. Si <code>n</code> est inférieur à 128,
renvoyer <code>n</code>. Sinon renvoyer <code>n - 256</code> : par
exemple 255 correspond à −1.</p>
<section class="exo-py" data-lettre>
<div class="editeur"><textarea wrap="off" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Votre code Python">def signe(n):
    ...</textarea><div class="barre"><button type="button" data-action="tester">▶ Tester</button><button type="button" data-action="executer">Exécuter</button><button type="button" data-action="indenter" title="Insérer 4 espaces">⇥ Indenter</button><button type="button" data-action="reset">Recommencer</button></div><pre class="sortie" hidden></pre><div class="resultats" aria-live="polite"></div></div><script type="application/json" class="tests">["signe(0) == 0","signe(127) == 127","signe(128) == -128","signe(240) == -16","signe(255) == -1"]</script></section>
<details class="corriges"><summary>Corrigés — à ouvrir après avoir cherché</summary>
<h3 id="lire-et-écrire-1">1. Lire et écrire</h3>
<ol type="1">
<li><code>01101001</code> = 64 + 32 + 8 + 1 = <strong>105</strong>.</li>
<li>53 = 32 + 16 + 4 + 1, soit
<strong><code>00110101</code></strong>.</li>
<li>2⁶ = <strong>64 valeurs</strong>, de 0 à <strong>63</strong>.</li>
</ol>
<h3 id="changer-de-base-1">2. Changer de base</h3>
<ol type="1">
<li><code>1011 1100</code> = <strong>BC</strong>.</li>
<li><code>2F</code> = <strong><code>00101111</code></strong> = 2 × 16 +
15 = <strong>47</strong>.</li>
<li><code>bin(10)</code> renvoie le texte
<strong><code>&#39;0b1010&#39;</code></strong> ; <code>int(&quot;1010&quot;, 2)</code>
renvoie l’entier <strong>10</strong>.</li>
</ol>
<h3 id="tailles-et-compteur-1">3. Tailles et compteur</h3>
<ol type="1">
<li>64 ≤ 127 &lt; 128 : <strong>7 bits</strong>. 128 ≤ 128 &lt; 256 :
<strong>8 bits</strong>.</li>
<li>254 + 5 = 259 ; sur huit bits, 259 modulo 256 donne
<strong>3</strong>.</li>
<li><strong>9 bits</strong> : la somme maximale est 255 + 255 = 510,
inférieure à 512.</li>
</ol>
<h3 id="entiers-signés-1">4. Entiers signés</h3>
<ol type="1">
<li><strong>−128 à 127</strong>.</li>
<li>+12 = <code>00001100</code> ; inversion <code>11110011</code> ; +1 =
<strong><code>11110100</code></strong>.</li>
<li><code>11110000</code> → <code>00001111</code> →
<code>00010000</code> = 16, donc <strong>−16</strong>.</li>
<li>140 dépasse 127 : la somme ne tient pas. Un résultat négatif signale
un dépassement signé.</li>
</ol>
<h3 id="à-7.-programmation">5 à 7. Programmation</h3>
<div class="sourceCode" id="cb1"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="kw">def</span> lire_bits(bits):</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    total <span class="op">=</span> <span class="dv">0</span></span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    <span class="cf">for</span> bit <span class="kw">in</span> bits:</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>        total <span class="op">=</span> total <span class="op">*</span> <span class="dv">2</span> <span class="op">+</span> <span class="bu">int</span>(bit)</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    <span class="cf">return</span> total</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a><span class="kw">def</span> ajouter(a, b):</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    <span class="cf">return</span> (a <span class="op">+</span> b) <span class="op">%</span> <span class="dv">256</span></span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a><span class="kw">def</span> signe(n):</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    <span class="cf">if</span> n <span class="op">&lt;</span> <span class="dv">128</span>:</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        <span class="cf">return</span> n</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    <span class="cf">return</span> n <span class="op">-</span> <span class="dv">256</span></span></code></pre></div>
</details>
<div class="py-etat" id="py-etat" aria-live="polite">Chargement de Python… (quelques secondes, une seule fois)</div>
<script>
// Exercices Python : Pyodide dans un worker (module, exigé par Pyodide ≥ 314), pour pouvoir arrêter une boucle infinie.
(() => {
const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/";
const DELAI_MS = 4000;
const HARNESS = String.raw`
import json, sys

AIDES = {
    "IndentationError": "Vérifiez les espaces en début de ligne : le bloc sous def, if, for ou while doit être décalé de 4 espaces.",
    "SyntaxError": "Python ne comprend pas cette ligne : deux-points oubliés après if/for/while/def, parenthèse ou guillemet non fermé ?",
    "NameError": "Un nom est inconnu : faute de frappe, variable utilisée avant d'avoir reçu une valeur, ou fonction mal nommée ?",
    "TypeError": "Opération entre types incompatibles (texte et nombre ?) ou mauvais nombre de paramètres.",
    "ZeroDivisionError": "Division par zéro.",
    "UnboundLocalError": "Variable utilisée avant d'avoir reçu une valeur dans la fonction : initialisez-la avant la boucle.",
}

def _msg(e):
    nom = type(e).__name__
    ligne = getattr(e, "lineno", None)
    if ligne is None:
        tb = e.__traceback__
        while tb:
            if tb.tb_frame.f_code.co_filename == "<votre code>":
                ligne = tb.tb_lineno
            tb = tb.tb_next
    texte = f"{nom} : {getattr(e, 'msg', None) or e}"
    if ligne:
        texte += f" (ligne {ligne})"
    return {"texte": texte, "aide": AIDES.get(nom, "")}

def _run(code, tests):
    ns = {"__name__": "__main__"}
    r = {"erreur": None, "tests": []}
    try:
        exec(compile(code, "<votre code>", "exec"), ns)
    except BaseException as e:
        r["erreur"] = _msg(e)
        return json.dumps(r)
    for t in tests:
        appel, attendu = t.rsplit(" == ", 1) if " == " in t else (t, "True")
        item = {"appel": appel.strip(), "attendu": attendu.strip(), "ok": False, "aide": ""}
        try:
            v = eval(appel, ns)
            item["obtenu"] = repr(v)
            item["ok"] = bool(v == eval(attendu, ns))
            if v is None:
                item["aide"] = "La fonction renvoie None : manque-t-il return ? print affiche, mais ne renvoie pas le résultat."
        except BaseException as e:
            m = _msg(e)
            item["obtenu"], item["aide"] = m["texte"], m["aide"]
        r["tests"].append(item)
    return json.dumps(r)

_run(CODE, json.loads(TESTS))
`;
const SOURCE_WORKER = `
import { loadPyodide } from "${PYODIDE}pyodide.mjs";
const pret = loadPyodide({ indexURL: "${PYODIDE}" });
pret.then(() => postMessage({ pret: true }), err => postMessage({ echec: String(err) }));
onmessage = async (e) => {
  const py = await pret;
  let sortie = "";
  py.setStdout({ batched: s => { sortie += s + "\\n"; } });
  py.setStderr({ batched: s => { sortie += s + "\\n"; } });
  py.globals.set("CODE", e.data.code);
  py.globals.set("TESTS", JSON.stringify(e.data.tests));
  try {
    const res = py.runPython(e.data.harness);
    postMessage({ id: e.data.id, sortie, res: JSON.parse(res) });
  } catch (err) {
    postMessage({ id: e.data.id, sortie, res: { erreur: { texte: String(err), aide: "" }, tests: [] } });
  }
};`;
const url = URL.createObjectURL(new Blob([SOURCE_WORKER], { type: "text/javascript" }));
const etat = document.getElementById("py-etat");
let worker, pret, attente = null, compteur = 0;

function demarrer() {
  worker = new Worker(url, { type: "module" });
  worker.onerror = (e) => { etat.textContent = "Python n'a pas pu démarrer (" + (e.message || "erreur") + ") : rechargez la page."; etat.className = "py-etat ko"; };
  pret = new Promise((ok) => {
    worker.onmessage = (e) => {
      if (e.data.pret) { etat.textContent = "Python est prêt."; etat.className = "py-etat ok"; ok(); return; }
      if (e.data.echec) { etat.textContent = "Python n'a pas pu se charger : vérifiez la connexion puis rechargez la page."; etat.className = "py-etat ko"; return; }
      if (attente && e.data.id === attente.id) { clearTimeout(attente.minuteur); attente.ok(e.data); attente = null; }
    };
  });
}
demarrer();

async function executer(code, tests) {
  await pret;
  return new Promise((ok) => {
    const id = ++compteur;
    const minuteur = setTimeout(() => {
      worker.terminate();
      attente = null;
      etat.textContent = "Redémarrage de Python…"; etat.className = "py-etat";
      demarrer();
      ok({ sortie: "", res: { erreur: { texte: "Le programme tourne depuis plus de " + DELAI_MS / 1000 + " secondes et a été arrêté.", aide: "Boucle infinie ? Vérifiez que la condition du while finit par devenir fausse (la variable testée doit changer dans la boucle)." }, tests: [] } });
    }, DELAI_MS);
    attente = { id, ok, minuteur };
    worker.postMessage({ id, code, tests, harness: HARNESS });
  });
}

function stocker(cle, valeur) { try { localStorage.setItem(cle, valeur); } catch (e) {} }
function lire(cle) { try { return localStorage.getItem(cle); } catch (e) { return null; } }
function texte(balise, contenu, classe) { const el = document.createElement(balise); el.textContent = contenu; if (classe) el.className = classe; return el; }

const lettres = [];
function majCoffre() {
  document.querySelectorAll(".coffre").forEach(c => {
    const cases = c.querySelector(".cases") || c.appendChild(texte("p", "", "cases"));
    cases.textContent = lettres.map(l => l.ouverte ? l.valeur : "_").join(" ");
  });
}

document.querySelectorAll(".exo-py").forEach((exo, i) => {
  const zone = exo.querySelector("textarea");
  const depart = zone.value;
  const cle = "exo-py:" + location.pathname + ":" + i;
  const sauve = lire(cle);
  if (sauve !== null) zone.value = sauve;
  // La zone suit la hauteur du code : plus besoin de l'agrandir à la main.
  const ajuster = () => { if (!zone.offsetParent) return; zone.style.height = "auto"; zone.style.height = zone.scrollHeight + 2 + "px"; };
  ajuster();
  const tests = JSON.parse(exo.querySelector("script.tests").textContent);
  const sortie = exo.querySelector(".sortie");
  const resultats = exo.querySelector(".resultats");
  const lettre = { valeur: exo.dataset.lettre, ouverte: lire(cle + ":ok") === "1" };
  if (lettre.valeur) lettres.push(lettre);

  function inserer(txt) { zone.setRangeText(txt, zone.selectionStart, zone.selectionEnd, "end"); zone.focus(); stocker(cle, zone.value); ajuster(); }
  zone.addEventListener("input", () => { stocker(cle, zone.value); ajuster(); });
  zone.addEventListener("keydown", (e) => {
    if (e.key === "Tab") { e.preventDefault(); inserer("    "); }
    if (e.key === "Enter") {
      const debut = zone.value.lastIndexOf("\n", zone.selectionStart - 1) + 1;
      const ligne = zone.value.slice(debut, zone.selectionStart);
      const retrait = ligne.match(/^ */)[0] + (ligne.trimEnd().endsWith(":") ? "    " : "");
      e.preventDefault(); inserer("\n" + retrait);
    }
  });

  exo.querySelector(".barre").addEventListener("click", async (e) => {
    const action = e.target.dataset.action;
    if (!action) return;
    if (action === "indenter") return inserer("    ");
    if (action === "reset") { if (confirm("Revenir au code de départ ?")) { zone.value = depart; stocker(cle, depart); ajuster(); resultats.replaceChildren(); sortie.hidden = true; } return; }
    resultats.replaceChildren(texte("p", "Exécution…"));
    const { sortie: out, res } = await executer(zone.value, action === "tester" ? tests : []);
    sortie.hidden = !out;
    sortie.textContent = out;
    resultats.replaceChildren();
    if (res.erreur) {
      resultats.append(texte("p", res.erreur.texte, "ko"));
      if (res.erreur.aide) resultats.append(texte("p", res.erreur.aide, "aide"));
      return;
    }
    if (action !== "tester") { if (!out) resultats.append(texte("p", "Programme exécuté, rien n'a été affiché.")); return; }
    const table = document.createElement("table");
    const entete = table.insertRow();
    ["", "Appel", "Attendu", "Obtenu"].forEach(t => entete.append(texte("th", t)));
    res.tests.forEach(t => {
      const tr = table.insertRow();
      tr.className = t.ok ? "ok" : "ko";
      [t.ok ? "✓" : "✗", t.appel, t.attendu, t.obtenu].forEach(v => tr.insertCell().textContent = v);
      if (t.aide) { const a = table.insertRow(); const c = a.insertCell(); c.colSpan = 4; c.textContent = t.aide; c.className = "aide"; }
    });
    resultats.append(table);
    const reussis = res.tests.filter(t => t.ok).length;
    if (reussis === res.tests.length) {
      resultats.append(texte("p", "Tous les tests passent." + (lettre.valeur ? " Serrure ouverte : lettre « " + lettre.valeur + " »." : ""), "ok"));
      lettre.ouverte = true; stocker(cle + ":ok", "1"); majCoffre();
    } else {
      resultats.append(texte("p", reussis + " test(s) sur " + res.tests.length + " : lisez la ligne ✗, corrigez, retestez.", "ko"));
    }
  });
});
majCoffre();
})();
</script>
