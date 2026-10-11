// Exercices Python : Pyodide dans un worker (module, exigé par Pyodide ≥ 314), pour pouvoir arrêter une boucle infinie.
(() => {
const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/";
const DELAI_MS = 4000;
const HARNESS = String.raw`
import json

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
  py.setStdout({ batched: s => { if (sortie.length < 12000) sortie += s.slice(0, 1000) + "\\n"; } });
  py.setStderr({ batched: s => { if (sortie.length < 12000) sortie += s.slice(0, 1000) + "\\n"; } });
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
let worker, pret, attente = null, compteur = 0, occupe = false;

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
  await Promise.race([pret, new Promise((_, rejet) => setTimeout(() => rejet(new Error("Python indisponible après 30 secondes : vérifiez Internet ou téléchargez le ZIP pour Thonny / EduPython.")), 30000))]);
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

document.querySelectorAll(".exo-py").forEach((exo, i) => {
  const zone = exo.querySelector("textarea");
  const depart = zone.defaultValue;
  const cle = "exo-py:" + location.pathname + ":" + i;
  const sauve = lire(cle);
  if (sauve !== null) zone.value = sauve;
  const tests = JSON.parse(exo.querySelector("script.tests").textContent);
  const sortie = exo.querySelector(".sortie");
  const resultats = exo.querySelector(".resultats");

  function inserer(txt) { zone.setRangeText(txt, zone.selectionStart, zone.selectionEnd, "end"); zone.focus(); stocker(cle, zone.value); }
  zone.addEventListener("input", () => stocker(cle, zone.value));
  zone.addEventListener("keydown", (e) => {
    // Tab conserve la navigation au clavier ; le bouton insère quatre espaces.
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
    if (action === "telecharger") {
      const contenu = zone.value + "\n# Tests\n" + tests.map(t => "assert " + t).join("\n") + "\n";
      const lien = document.createElement("a");
      lien.href = URL.createObjectURL(new Blob([contenu], { type: "text/plain;charset=utf-8" }));
      lien.download = exo.dataset.fichier; lien.click(); setTimeout(() => URL.revokeObjectURL(lien.href), 1000); return;
    }
    if (action === "indenter") return inserer("    ");
    if (action === "reset") { if (confirm("Revenir au code de départ ?")) { zone.value = depart; stocker(cle, depart); resultats.replaceChildren(); sortie.hidden = true; } return; }
    if (occupe) return;
    occupe = true;
    const boutons = document.querySelectorAll('[data-action="tester"], [data-action="executer"]');
    boutons.forEach(b => b.disabled = true);
    resultats.replaceChildren(texte("p", "Exécution…"));
    try {
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
      resultats.append(texte("p", "Tous les tests passent. Expliquez maintenant votre méthode.", "ok"));
    } else {
      resultats.append(texte("p", reussis + " test(s) sur " + res.tests.length + " : lisez la ligne ✗, corrigez, retestez.", "ko"));
    }
    } catch (erreur) { resultats.replaceChildren(texte("p", erreur.message, "ko")); }
    finally { occupe = false; boutons.forEach(b => b.disabled = false); }
  });
});
})();

const bits = [...document.querySelectorAll('.bits button')];
function actualiser() {
  const valeurs = bits.map(b => b.getAttribute('aria-pressed') === 'true' ? Number(b.querySelector('small').textContent) : 0);
  const total = valeurs.reduce((a, b) => a + b, 0);
  document.getElementById('valeur').textContent = bits.map(b => b.querySelector('strong').textContent).join('') + '₂ = ' + (valeurs.filter(Boolean).join(' + ') || '0') + ' = ' + total + '₁₀';
}
bits.forEach(b => b.addEventListener('click', () => { const actif = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(actif)); b.querySelector('strong').textContent = actif ? '1' : '0'; actualiser(); }));
actualiser();
document.querySelectorAll('[data-answer]').forEach(b => b.addEventListener('click', () => {
  const q = b.closest('.question'), valeur = q.querySelector('input').value.trim(), fb = q.querySelector('.fb');
  const valide = (b.dataset.kind === 'binary' ? /^[01]{8}$/ : /^[0-9]+$/).test(valeur);
  const ok = valide && (b.dataset.kind === 'binary' ? valeur === b.dataset.answer : Number(valeur) === Number(b.dataset.answer));
  fb.className = 'fb ' + (ok ? 'ok' : 'ko');
  fb.textContent = ok ? 'Juste. Vérifiez que vous pouvez expliquer votre calcul.' : !valide ? 'Saisissez ' + (b.dataset.kind === 'binary' ? 'exactement huit chiffres 0 ou 1.' : 'un entier positif ou nul.') : 'À reprendre : ' + b.dataset.hint;
}));

