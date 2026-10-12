// Copie de Prof/NSI/supports/2026-2027/1g/lire-octet-cinematic/src/{content,app}.js — ne pas modifier ici.
// Textes et paramètres des étapes. kind choisit le dessin dans app.js ; i/phase pilotent la trace.
const chapters = ["DÉPART", "MÉTHODE", "LE CODE", "EXÉCUTION", "PIÈGES", "BILAN"];
const beats = [
  {chapter: 0, kind: "intro", title: "Huit caractères. Un nombre.", sub: "Comment lire_octet transforme \"01001101\" en 77.", take: "", time: 25,
   note: "Annoncer l’objectif : comprendre ligne par ligne la fonction du TP. On ne découvre pas une nouvelle notion : on rejoue l’algorithme que les élèves appliquent déjà à la main."},
  {chapter: 0, kind: "problem", title: "Python reçoit un texte.", sub: "\"01001101\" est une chaîne de caractères, pas un nombre.", take: "La fonction doit fabriquer l’entier à partir des caractères.", time: 40,
   note: "Faire remarquer les guillemets. bits[0] est le caractère \"0\", bits[1] le caractère \"1\". On compare donc avec \"1\" (texte), pas avec 1 (nombre)."},
  {chapter: 1, kind: "method", step: 0, title: "À la main, on donne un poids à chaque bit.", sub: "De gauche à droite : 128, 64, 32… jusqu’à 1.", take: "Le poids est divisé par 2 à chaque pas vers la droite.", time: 35,
   note: "Faire relire les poids de gauche à droite à voix haute : chaque poids est la moitié du précédent. C’est exactement ce que fera la variable poids."},
  {chapter: 1, kind: "method", step: 1, title: "On additionne les poids des 1.", sub: "Les 0 ne rapportent rien.", take: "C’est cette méthode que le programme va reproduire.", time: 40,
   note: "Demander la somme avant de l’afficher. 64 + 8 + 4 + 1 = 77. Question de transition : l’ordinateur peut-il voir tout l’octet d’un coup ? Non, il lit un caractère à la fois."},
  {chapter: 2, kind: "ideas", n: 2, title: "Deux variables avant la boucle.", sub: "Préparer avant de répéter.", take: "total accumule ; poids indique ce que vaut le bit courant.", time: 40,
   note: "total est un accumulateur : il commence à 0, comme une somme vide. poids commence à 128 parce que le premier caractère lu est celui de gauche."},
  {chapter: 2, kind: "ideas", n: 3, title: "Un caractère à chaque tour.", sub: "for bit in bits parcourt la chaîne de gauche à droite.", take: "Huit caractères : la boucle fait huit tours.", time: 35,
   note: "À chaque tour, la variable bit prend le caractère suivant : \"0\", puis \"1\", puis \"0\"… On ne manipule pas d’indice."},
  {chapter: 2, kind: "ideas", n: 5, title: "Ajouter si c’est un 1, puis diviser.", sub: "Deux actions par tour, dans cet ordre.", take: "La division du poids a lieu à chaque tour, que le bit soit 0 ou 1.", time: 45,
   note: "Faire repérer l’indentation : poids = poids // 2 est au niveau du if, pas dedans. On y reviendra dans les pièges."},
  {chapter: 3, kind: "trace", i: -1, title: "Avant la boucle.", sub: "Lignes 2 et 3 : les deux variables sont créées.", take: "Aucun caractère n’est encore lu : total vaut 0.", time: 30,
   note: "Présenter le tableau de bord : à droite, la chaîne ; le cadre bleu montrera le caractère lu ; en dessous, les valeurs des variables."},
  {chapter: 3, kind: "trace", i: 0, phase: "test", title: "Tour 1 : on lit \"0\".", sub: "Le test bit == \"1\" est faux.", take: "Faux : la ligne 6 est sautée, total ne change pas.", time: 35,
   note: "Faire prédire le résultat du test avant d’avancer. Le poids 128 n’est pas ajouté."},
  {chapter: 3, kind: "trace", i: 0, phase: "half", title: "Tour 1 : le poids est divisé.", sub: "Ligne 7, exécutée même si le bit vaut 0.", take: "Le caractère suivant vaudra 64.", time: 30,
   note: "// est la division entière : 128 // 2 = 64."},
  {chapter: 3, kind: "trace", i: 1, phase: "test", title: "Tour 2 : on lit \"1\".", sub: "Le test bit == \"1\" est vrai.", take: "Vrai : on entre dans le if.", time: 25,
   note: "Faire dire quelle ligne sera exécutée ensuite : la ligne 6."},
  {chapter: 3, kind: "trace", i: 1, phase: "add", title: "Tour 2 : on ajoute le poids.", sub: "total = total + poids", take: "Le 1 en deuxième position rapporte 64.", time: 30,
   note: "Lire la ligne de droite à gauche : on calcule total + poids (0 + 64), puis on range le résultat dans total."},
  {chapter: 3, kind: "trace", i: 1, phase: "half", title: "Tour 2 : on divise encore.", sub: "Le poids passe à 32.", take: "Chaque tour : tester, peut-être ajouter, toujours diviser.", time: 25,
   note: "Faire formuler le schéma d’un tour par un élève. Les tours suivants sont joués en une seule étape."},
  {chapter: 3, kind: "trace", i: 2, phase: "full", title: "Tour 3 : \"0\".", sub: "Rien à ajouter, le poids passe de 32 à 16.", take: "total reste 64.", time: 20,
   note: "À partir d’ici, demander la prédiction des deux variables avant chaque avance."},
  {chapter: 3, kind: "trace", i: 3, phase: "full", title: "Tour 4 : \"0\".", sub: "Rien à ajouter, le poids passe de 16 à 8.", take: "total reste 64.", time: 20,
   note: "Faire vérifier sur la chaîne : le quatrième caractère de 01001101 est bien un 0."},
  {chapter: 3, kind: "trace", i: 4, phase: "full", title: "Tour 5 : \"1\".", sub: "On ajoute 8, puis le poids passe à 4.", take: "total = 64 + 8 = 72", time: 20,
   note: "Comparer avec la somme faite à la main : 64 et 8 sont bien deux des poids retenus."},
  {chapter: 3, kind: "trace", i: 5, phase: "full", title: "Tour 6 : \"1\".", sub: "On ajoute 4, puis le poids passe à 2.", take: "total = 72 + 4 = 76", time: 20,
   note: "Les cases jaunes sont les poids déjà ajoutés."},
  {chapter: 3, kind: "trace", i: 6, phase: "full", title: "Tour 7 : \"0\".", sub: "Rien à ajouter, le poids passe à 1.", take: "total reste 76.", time: 20,
   note: "Demander : que vaudra total après le dernier tour ?"},
  {chapter: 3, kind: "trace", i: 7, phase: "full", title: "Tour 8 : \"1\".", sub: "On ajoute 1, puis 1 // 2 donne 0.", take: "total = 76 + 1 = 77", time: 25,
   note: "Le poids final vaut 0 mais il ne sert plus : la boucle est terminée."},
  {chapter: 3, kind: "trace", i: 8, title: "La boucle est finie.", sub: "return total renvoie 77 ; print l’affiche.", take: "lire_octet(\"01001101\") renvoie 77.", time: 30,
   note: "Distinguer renvoyer (return, la valeur revient au programme) et afficher (print, la valeur apparaît dans la console)."},
  {chapter: 3, kind: "table", title: "Toute l’exécution, dans un tableau.", sub: "Le tableau de trace : une ligne par tour.", take: "Faire ce tableau à la main, c’est prévoir ce que fera le programme.", time: 45,
   note: "Proposer de refaire ce tableau sur papier avec \"10101100\" (résultat attendu : 172, présent dans les tests du TP)."},
  {chapter: 4, kind: "indent", title: "Piège 1 : l’indentation.", sub: "Si la division passe dans le if…", take: "Le poids ne baisse plus qu’après un 1 : on obtient 240 au lieu de 77.", time: 45,
   note: "Résultat vérifié en Python : 240. Avec cette erreur, les 0 ne font plus avancer le poids. Faire retrouver 128 + 64 + 32 + 16 sur le schéma."},
  {chapter: 4, kind: "slash", title: "Piège 2 : / au lieu de //.", sub: "Les deux divisent, mais pas avec le même type de résultat.", take: "/ donne un flottant : le programme affiche 77.0 au lieu de 77.", time: 40,
   note: "128 / 2 vaut 64.0 (float). Le résultat reste juste numériquement, mais la fonction doit renvoyer un entier (int) : les tests == 77 passent d’ailleurs, mais l’affichage trahit l’erreur."},
  {chapter: 5, kind: "tests", title: "Vérifier avec des tests.", sub: "Des octets dont on connaît déjà la valeur.", take: "Tester les cas extrêmes : 0, 1, 128 et 255.", time: 40,
   note: "Ce sont les assert du fichier du TP. int(bits, 2) est interdit dans l’exercice mais sert ici de contre-vérification."},
  {chapter: 5, kind: "summary", title: "Trois idées à retenir.", sub: "Elles reviendront dans beaucoup d’autres algorithmes.", take: "Parcourir, tester, accumuler.", time: 40,
   note: "L’accumulateur réapparaîtra pour les sommes, moyennes et comptages. Demander un autre exemple d’accumulateur (compter les 1 d’un octet)."}
];
const scene = document.querySelector('#scene');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
// Intégrée dans une page (site Starlight) : clavier, plein écran et échelle limités au conteneur .lo-embed.
const embed = scene.closest?.('.lo-embed') || null;
let index = 0;
const BITS = '01001101', weights = [128,64,32,16,8,4,2,1];
const text = (x,y,value,size=26,cls='',extra='') => `<text x="${x}" y="${y}" font-size="${size}" class="${cls}" ${extra}>${value}</text>`;
const line = (x1,y1,x2,y2,extra='') => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="#52615c" stroke-width="2" ${extra}/>`;
const motion = (id,body) => `<g data-motion="${id}">${body}</g>`;
const rect = (x,y,w,h,fill='#1c2625',stroke='#52615c',r=0,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
const middle = 'text-anchor="middle"', end = 'text-anchor="end"';
const arrow = (x1,y,x2) => line(x1,y,x2,y,'stroke="#86dce8" stroke-width="3" marker-end="url(#arrow)"');
const kw = s => `<tspan class="kw">${s}</tspan>`, str = s => `<tspan class="str">${s}</tspan>`, num = s => `<tspan class="num">${s}</tspan>`;

// Exécution de lire_octet(BITS) jusqu’au tour i ; phase = étape atteinte dans ce tour.
function state(i,phase='test'){
 let total=0,poids=128;const parts=[];
 for(let k=0;k<Math.min(i,8);k++){if(BITS[k]==='1'){total+=poids;parts.push(poids);}poids=Math.floor(poids/2);}
 if(i>=0&&i<8&&phase!=='test'){if(BITS[i]==='1'){total+=poids;parts.push(poids);}if(phase!=='add')poids=Math.floor(poids/2);}
 return {total,poids,parts};
}

// Panneau de code : [indentation, contenu]. Les variantes servent aux pièges.
const CODE_X=130,CHAR=13.2,lineY=n=>392+(n-1)*35;
function codeLines(variant){
 return [[0,`${kw('def')} lire_octet(bits):`],[4,`total = ${num(0)}`],[4,`poids = ${num(128)}`],[4,`${kw('for')} bit ${kw('in')} bits:`],
  [8,`${kw('if')} bit == ${str('"1"')}:`],[12,'total = total + poids'],[variant==='indent'?12:8,`poids = poids ${variant==='slash'?'/':'//'} ${num(2)}`],
  [4,`${kw('return')} total`],[0,''],[0,`print(lire_octet(${str('"01001101"')}))`]];
}
function code(variant='ok',lines=[],tag='',bad=false){
 const panel=motion('code-'+variant,`${rect(64,300,656,450,'#1b2523','#52615c',8)}${text(92,333,'LIRE_OCTET.PY',16,'label dim')}${line(64,350,720,350)}${codeLines(variant).map(([indent,body],k)=>`${text(92,lineY(k+1),k+1,17,'mono dim')}${text(CODE_X+indent*CHAR,lineY(k+1),body,22,'mono')}`).join('')}`);
 const color=bad?'#ffb69a':'#86dce8';
 const hl=lines.length?motion('code-hl',`${rect(72,lineY(lines[0])-26,640,(lines[lines.length-1]-lines[0])*35+36,color+'22','none',4)}${rect(72,lineY(lines[0])-26,4,(lines[lines.length-1]-lines[0])*35+36,color,'none')}`):'';
 return panel+hl+(tag?motion('tour',text(692,333,tag,16,'label '+(bad?'peach':'lime'),end)):'');
}

// Colonne de droite : la chaîne, son curseur et les variables.
const cellX=i=>780+i*96;
function cells(i,phase,{shown=weights,cursor=true,lit}={}){
 return [...BITS].map((b,k)=>{
  const on=lit?lit[k]:b==='1'&&(k<i||(k===i&&phase&&phase!=='test'));
  const done=lit?false:k<i||(k===i&&phase&&phase!=='test');
  return motion('cell-'+k,`${rect(cellX(k),300,84,92,on?'#ffd46c':'#1b2523',on?'#ffd46c':'#52615c',4)}${text(cellX(k)+42,363,b,50,'mono',`${middle} style="fill:${on?'#121718':done?'var(--done)':'var(--paper)'}"`)}`)
   +motion('w-'+k,text(cellX(k)+42,428,shown[k],22,'mono '+(on?'lime':'dim'),middle));
 }).join('')+(cursor&&i>=0&&i<8?motion('cursor',rect(cellX(i)-8,288,100,154,'none','#86dce8',6,'stroke-width="3"')):'');
}
function variable(name,x,value,detail,cls){
 return motion(name+'-box',`${rect(x,470,360,140,'#1b2523','#52615c',8)}${text(x+22,503,name.toUpperCase(),16,'label dim')}`)
  +motion(name+'-val',`${text(x+22,578,value,60,'mono '+cls)}${text(x+338,598,detail,18,'mono dim',end)}`);
}
function calc(top,bottom,cls){return motion('calc',`${text(780,670,top,24,'mono dim')}${text(780,720,bottom,30,'mono '+cls)}`);}

function trace(b){
 const {i,phase}=b,s=state(i,phase);
 const pre=phase==='half'?state(i,'add'):state(i,'test');
 const bit=BITS[i];
 const lines={test:[4,5],add:[6],half:[7],full:[4,7]}[phase]||(i<0?[2,3]:[8,10]);
 const tag=i<0?'AVANT LA BOUCLE':i>7?'APRÈS LA BOUCLE':`TOUR ${i+1} / 8`;
 let c;
 if(i<0)c=calc('total = 0 · poids = 128','Aucun caractère lu.','');
 else if(i>7)c=calc('return total','Console : 77','lime');
 else if(phase==='test')c=calc(`bit = "${bit}"`,`bit == "1"  →  ${bit==='1'?'True':'False'}`,bit==='1'?'lime':'peach');
 else if(phase==='add')c=calc('total = total + poids',`total = ${pre.total} + ${pre.poids} = ${s.total}`,'lime');
 else if(phase==='half')c=calc('poids = poids // 2',`poids = ${pre.poids} // 2 = ${s.poids}`,'blue');
 else c=calc(bit==='1'?`"1" → total = ${pre.total} + ${pre.poids} = ${s.total}`:`"0" → total reste ${s.total}`,`poids = ${pre.poids} // 2 = ${s.poids}`,'blue');
 return code('ok',lines,tag)+cells(i,phase)+variable('total',780,s.total,s.parts.join(' + ')||'somme vide','lime')+variable('poids',1176,s.poids,i>7?'ne sert plus':'','blue')+c;
}

function diagram(b){
 switch(b.kind){
 case 'intro':return `${[...BITS].map((d,k)=>motion('big-'+k,`${rect(100+k*100,400,88,110,d==='1'?'#ffd46c':'#1b2523',d==='1'?'#ffd46c':'#52615c',4)}${text(144+k*100,478,d,62,'mono',`${middle} style="fill:${d==='1'?'#121718':'var(--paper)'}"`)}`)).join('')}${text(100,570,'TEXTE · 8 CARACTÈRES',18,'label dim')}${arrow(930,455,1070)}${motion('result',text(1110,525,'77',200,'heavy lime'))}${text(1116,570,'ENTIER',18,'label dim')}${text(100,700,'→  UNE BOUCLE, DEUX VARIABLES, UNE ADDITION',20,'mono lime')}`;
 case 'problem':return `${motion('input',text(90,520,'"01001101"',52,'mono peach'))}${text(92,590,'bits : str (texte)',22,'mono dim')}${arrow(430,503,540)}${motion('machine',`${rect(560,420,480,170,'#1b2523','#ffd46c',8)}${text(800,518,'lire_octet(bits)',36,'mono',middle)}`)}${arrow(1060,503,1170)}${motion('output',text(1210,555,'?',140,'heavy lime'))}${text(1212,590,'int (entier)',22,'mono dim')}${text(800,700,'bits[0] vaut "0", bits[1] vaut "1"… : des caractères, un par un.',26,'dim',middle)}`;
 case 'method':return `${[...BITS].map((d,k)=>{const on=b.step&&d==='1';return motion('m-'+k,`${rect(128+k*174,330,124,138,on?'#ffd46c':'#1b2523',on?'#ffd46c':'#52615c',4)}${text(190+k*174,428,d,78,'mono',`${middle} style="fill:${on?'#121718':'var(--paper)'}"`)}`)+motion('mw-'+k,text(190+k*174,525,weights[k],32,'mono '+(on?'lime':'dim'),middle));}).join('')}${b.step?'':`<g>${[0,1,2,3,4,5,6].map(k=>`${text(277+k*174,575,'÷2',20,'mono blue',middle)}`).join('')}</g>`}${motion('method-sum',b.step?text(800,690,'64 + 8 + 4 + 1 = 77',46,'mono lime',middle):text(800,690,'Chaque poids est la moitié du précédent.',30,'',middle))}`;
 case 'ideas':{
  const notes=[[2,'total : la somme, qui démarre à 0'],[3,'poids : celui du caractère de gauche'],[4,'bit prend chaque caractère, de gauche à droite'],[5.5,'si le caractère est "1", on ajoute le poids'],[7,'à chaque tour, le poids est divisé par 2']];
  const lines=b.n===2?[2,3]:b.n===3?[4]:[5,7];
  return code('ok',lines)+notes.slice(0,b.n).map(([n,label],k)=>motion('note-'+k,`${line(600,lineY(n)-8,770,lineY(n)-8,'stroke="#86dce8" stroke-dasharray="4 6"')}<circle cx="600" cy="${lineY(n)-8}" r="5" fill="#86dce8"/>${text(790,lineY(n),label,24,k>=b.n-(b.n===2?2:b.n===3?1:2)?'':'dim')}`)).join('');
 }
 case 'trace':return trace(b);
 case 'table':{
  const cols=[800,920,1040,1190,1380],rows=[];
  for(let k=0;k<8;k++){const before=state(k),after=state(k,'full'),one=BITS[k]==='1';
   rows.push(motion('row-'+k,`${text(cols[0],372+k*42,k+1,22,'mono dim')}${text(cols[1],372+k*42,'"'+BITS[k]+'"',22,'mono '+(one?'peach':'dim'))}${text(cols[2],372+k*42,before.poids,22,'mono '+(one?'lime':'dim'))}${text(cols[3],372+k*42,one?'True':'False',22,'mono '+(one?'lime':'dim'))}${text(cols[4],372+k*42,after.total,22,'mono '+(one?'lime':''))}`));}
  return code('ok',[4,7],'8 TOURS')+['TOUR','BIT','POIDS','BIT == "1"','TOTAL'].map((h,k)=>text(cols[k],322,h,15,'label dim')).join('')+line(780,336,1536,336)+rows.join('')+motion('table-end',text(780,722,'renvoyé : 77 · poids final : 0',26,'mono lime'));
 }
 case 'indent':{
  const used=[],lit=[];let poids=128,total=0;
  for(const d of BITS){used.push(poids);lit.push(d==='1');if(d==='1'){total+=poids;poids=Math.floor(poids/2);}}
  return code('indent',[7],'ERREUR',true)+cells(-1,null,{shown:used,cursor:false,lit})+motion('bad-sum',`${text(780,520,'128 + 64 + 32 + 16 = '+total,38,'mono peach')}${text(780,585,'Après un "0", le poids ne change plus.',26,'')}${text(780,650,'Attendu : 77',26,'mono lime')}`);
 }
 case 'slash':return code('slash',[7],'ERREUR',true)+motion('slash-good',`${text(780,330,'AVEC //  ·  DIVISION ENTIÈRE',16,'label lime')}${text(780,395,'128 // 2 = 64',40,'mono')}${text(780,450,'lire_octet(…) → 77',30,'mono lime')}`)+line(780,500,1536,500)+motion('slash-bad',`${text(780,555,'AVEC /  ·  DIVISION DÉCIMALE',16,'label peach')}${text(780,620,'128 / 2 = 64.0',40,'mono')}${text(780,675,'lire_octet(…) → 77.0',30,'mono peach')}`);
 case 'tests':{
  const rows=[['00000000',0],['00000001',1],['10000000',128],['11111111',255],['01001101',77]];
  return code('ok',[])+rows.map(([v,r],k)=>motion('test-'+k,`${text(780,350+k*62,`lire_octet(${str('"'+v+'"')})`,26,'mono')}${text(1536,350+k*62,r,30,'mono lime',end)}`)).join('')+line(780,660,1536,660)+motion('test-int',`${text(780,712,'int("01001101", 2)',26,'mono blue')}${text(1536,712,'77',30,'mono blue',end)}`);
 }
 case 'summary':return [['PARCOURIR','for bit in bits'],['TESTER','if bit == "1"'],['ACCUMULER','total = total + poids'],['DIVISER','poids = poids // 2']].map(([name,detail],k)=>motion('summary-'+k,`${text(84,376+k*100,'0'+(k+1),20,'mono dim')}${text(171,381+k*100,name,42,'heavy '+(k===2?'lime':''))}${text(760,379+k*100,detail,32,'mono '+(k===2?'lime':'blue'))}${line(171,408+k*100,1515,408+k*100)}`)).join('');
 }
}
function markup(b){
 return `<svg viewBox="0 0 1600 900" role="group" aria-labelledby="scene-title scene-description"><title id="scene-title">${b.title}</title><desc id="scene-description">${b.sub} ${b.take}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#86dce8"/></marker><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#a3b0ad" stroke-opacity=".035"/></pattern></defs><rect width="1600" height="900" fill="url(#grid)"/>${text(67,120,`${String(b.chapter+1).padStart(2,'0')} / ${chapters[b.chapter]}`,17,'label lime')}${motion('heading',`${text(64,210,b.title,b.kind==='intro'?70:58,'heavy')}${text(67,262,b.sub,26,'dim')}`)}<g data-scene-body="">${diagram(b)}</g>${b.take?motion('takeaway',`${line(64,778,1536,778)}<circle cx="74" cy="799" r="5" fill="#ffd46c"/>${text(94,807,b.take,23)}`):''}</svg>`;
}

// Moteur de transitions repris de binaire-cinematic : chaque data-motion glisse ou se fond vers son nouvel état.
function planMotion(old,box,html,scale,order){
 const dx=old?(old.box.x-box.x)/scale:0,dy=old?(old.box.y-box.y)/scale:0;
 const moved=!!old&&(Math.abs(dx)>.5||Math.abs(dy)>.5);
 if(old&&old.html===html&&!moved&&old.opacity>.999)return null;
 return {dx,dy:moved?dy:old?0:24,opacity:moved?old.opacity:old&&old.html===html?old.opacity:0,
  delay:old?(old.html!==html&&!moved?90:0):80+Math.min(order*30,120),exit:!!old&&!moved&&old.html!==html};
}
function render(animate=true){
 const moving=animate&&!reduced.matches,outgoing=document.querySelector('#outgoing');
 const family=['ideas','trace','table','tests','indent','slash'].includes(beats[index].kind)?'code':beats[index].kind;
 const changeScene=scene.dataset.family!==family;
 const oldBody=scene.querySelector('[data-scene-body]');
 const bodyOpacity=moving&&oldBody?Number(getComputedStyle(oldBody).opacity):1;
 const positions=new Map(moving?[...scene.querySelectorAll('[data-motion]')].map(el=>{
  const style=getComputedStyle(el);
  return [el.dataset.motion,{box:el.getBoundingClientRect(),html:el.innerHTML,opacity:Number(style.opacity)*(el.closest('[data-scene-body]')?bodyOpacity:1),transform:style.transform,node:el}];
 }):[]);
 const oldDefs=moving?scene.querySelector('defs')?.outerHTML||'':'';
 [...scene.getAnimations({subtree:true}),...outgoing.getAnimations({subtree:true})].forEach(a=>a.cancel());
 outgoing.innerHTML='';scene.innerHTML=markup(beats[index]);scene.dataset.family=family;
 if(moving){
  const scale=Number(document.querySelector('#frame').style.getPropertyValue('--scale'))||1;
  // Mesurer tous les objets avant de commencer les écritures et les animations.
  const targets=[...scene.querySelectorAll('[data-motion]')].map(el=>({el,id:el.dataset.motion,box:el.getBoundingClientRect()}));
  const exits=[],seen=new Set();let entrance=0;
  function leave(old){const clone=old.node.cloneNode(true);clone.style.transform=old.transform;clone.style.opacity=old.opacity;exits.push(clone.outerHTML);}
  targets.forEach(({el,id,box})=>{
   const old=positions.get(id),plan=planMotion(old,box,el.innerHTML,scale,entrance);
   seen.add(id);if(!plan)return;if(!old)entrance++;
   if(plan.exit)leave(old);
   el.animate([{transform:`translate(${plan.dx}px,${plan.dy}px)`,opacity:plan.opacity},{transform:'translate(0,0)',opacity:1}],{
    duration:old&&!plan.exit?720:560,delay:plan.delay,fill:'backwards',easing:'cubic-bezier(.22,1,.36,1)'
   });
  });
  positions.forEach((old,id)=>{if(!seen.has(id))leave(old);});
  if(exits.length){
   const svg=`<svg viewBox="0 0 1600 900">${oldDefs}${exits.join('')}</svg>`;
   outgoing.innerHTML=svg.replace(/id="([^"]+)"/g,'id="exit-$1"').replace(/url\(#/g,'url(#exit-');
   const exit=outgoing.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-12px)'}],{duration:180,fill:'forwards',easing:'cubic-bezier(.16,1,.3,1)'});
   exit.onfinish=()=>{outgoing.innerHTML='';exit.cancel();};
  }
  if(changeScene)scene.querySelector('[data-scene-body]').animate([{opacity:0},{opacity:1}],{duration:260,delay:100,fill:'backwards',easing:'cubic-bezier(.22,1,.36,1)'});
 }
 document.querySelector('#counter').textContent=`${String(index+1).padStart(2,'0')} / ${beats.length}`;
 document.querySelector('#previous').disabled=index===0;
 document.querySelector('#next').disabled=index===beats.length-1;
 document.querySelectorAll('#chapters button').forEach((button,k)=>{button.classList.toggle('active',k===beats[index].chapter);if(k===beats[index].chapter)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
 const progress=document.querySelector('#progress');progress.style.width=`${(index+1)/beats.length*100}%`;progress.setAttribute('aria-valuenow',index+1);progress.setAttribute('aria-valuemax',beats.length);
 document.querySelector('#note-title').textContent=beats[index].title;
 document.querySelector('#note-text').textContent=beats[index].note;
 const elapsed=beats.slice(0,index).reduce((n,b)=>n+b.time,0);
 document.querySelector('#note-time').textContent=`Temps conseillé : ${beats[index].time} s · repère ${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,'0')} · aucune avance automatique`;
 if(!embed)document.title=`${index+1}/${beats.length} · ${beats[index].title} — lire_octet`;
 document.querySelector('#frame').dataset.beat=index;
}
function go(next){const target=Math.max(0,Math.min(beats.length-1,next));if(target!==index){index=target;render();}}
function resize(){document.querySelector('#frame').style.setProperty('--scale',embed?Math.min(embed.clientWidth/1600,embed.clientHeight/900):Math.min(innerWidth/1600,innerHeight/900));}
document.querySelector('#chapters').innerHTML=chapters.map((name,k)=>`<button data-chapter="${k}" aria-label="Chapitre ${name}">${name}</button>`).join('');
document.querySelector('#chapters').addEventListener('click',e=>{if(e.target.dataset.chapter!==undefined)go(beats.findIndex(b=>b.chapter===Number(e.target.dataset.chapter)));});
document.querySelector('#previous').onclick=()=>go(index-1);
document.querySelector('#next').onclick=()=>go(index+1);
const notes=document.querySelector('#notes');
function toggleNotes(){notes.open?notes.close():notes.showModal();}
document.querySelector('#notes-button').onclick=toggleNotes;
document.querySelector('#close-notes').onclick=()=>notes.close();
async function fullscreen(){try{document.fullscreenElement?await document.exitFullscreen():await (embed||document.documentElement).requestFullscreen();}catch{document.querySelector('#fullscreen').title='Plein écran indisponible dans ce navigateur';}}
document.querySelector('#fullscreen').onclick=fullscreen;
document.addEventListener('keydown',e=>{
 if(e.target.closest('input,textarea,select,[contenteditable="true"]')||e.altKey||e.ctrlKey||e.metaKey)return;
 if(embed&&!embed.contains(e.target))return;
 if(e.key.toLowerCase()==='n'){e.preventDefault();if(!e.repeat)toggleNotes();return;}
 if(notes.open)return;
 if(e.key===' '&&e.target.closest('button,a'))return;
 if(['ArrowRight','PageDown',' ','ArrowLeft','PageUp','Home','End','f','F'].includes(e.key)){e.preventDefault();if(e.repeat)return;
  if(['ArrowRight','PageDown',' '].includes(e.key))go(index+1);
  else if(['ArrowLeft','PageUp'].includes(e.key))go(index-1);
  else if(e.key==='Home')go(0);else if(e.key==='End')go(beats.length-1);else fullscreen();
 }
});
addEventListener('resize',resize);if(embed)new ResizeObserver(resize).observe(embed);reduced.addEventListener('change',()=>render(false));resize();render(false);
