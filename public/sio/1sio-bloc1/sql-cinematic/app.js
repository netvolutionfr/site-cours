// Rendu et navigation. Chaque temps est un état stable reconstruit par markup(beat) ;
// les transitions animent les objets nommés [data-motion] (lignes de table, lignes de requête…).
const scene = document.querySelector('#scene');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let index = 0;
// Deux modes : page autonome (index.html) ou intégrée dans une page du site (data-mode="embarque").
const root = document.querySelector('.cine');
const embedded = root?.dataset?.mode === 'embarque';
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const text = (x,y,value,size=26,cls='',extra='') => `<text x="${x}" y="${y}" font-size="${size}" class="${cls}" ${extra}>${value}</text>`;
const line = (x1,y1,x2,y2,cls='wire',extra='') => `<path d="M${x1} ${y1}L${x2} ${y2}" class="${cls}" ${extra}/>`;
const motion = (name,body) => `<g data-motion="${name}">${body}</g>`;
const rect = (x,y,w,h,fill='#1c2625',stroke='#52615c',r=0,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
const fr = (v,dec=2) => Number.isInteger(v)&&dec===0?String(v):v.toFixed(dec).replace('.',',');
const cell = (col,v) => v===null?'NULL':col==='prix'?fr(v):String(v);

// Coloration SQL : mots-clés en vert, textes en orange, nombres et fonctions en bleu.
const KEYWORDS = /^(SELECT|FROM|WHERE|AND|OR|NOT|GROUP|ORDER|BY|ASC|DESC|DISTINCT|LIKE|IS|NULL|JOIN|ON|LIMIT)$/;
function sql(src){
 return esc(src).split(/('[^']*'|\b[A-Z]{2,}\b|\b\d+(?:\.\d+)?\b)/).map(t=>{
  if(!t)return '';
  if(t.startsWith("'"))return `<tspan class="peach">${t}</tspan>`;
  if(KEYWORDS.test(t))return `<tspan class="lime">${t}</tspan>`;
  if(/^(COUNT|SUM|AVG|MIN|MAX|\d.*)$/.test(t))return `<tspan class="blue">${t}</tspan>`;
  return t;
 }).join('');
}

// Panneau de requête, à gauche. Renvoie le dessin et l’ordonnée de son bas.
function query(b){
 const top=284,h=b.q.length*38+30;
 let out=rect(64,top,604,h,'#1c2625','#52615c',8);
 b.q.forEach((l,k)=>{
  const y=top+42+k*38,fresh=b.fresh?.includes(k);
  out+=motion(`q-${k}`,`${fresh?`${rect(64,y-27,604,36,'#d6fd78','none',0,'fill-opacity=".08"')}${rect(64,y-27,5,36,'#d6fd78','none')}`:''}${text(88,y,sql(l),24,'mono')}`);
 });
 return {svg:motion('query',out),bottom:top+h};
}

// Calcul du résultat d’une vue : lignes gardées, ordre, doublons, paquets, agrégat.
function compute(v){
 const t=tables[v.table];
 let rows=t.rows.map(r=>({r,kept:!v.where||v.where(r)}));
 const seen=new Set();
 rows.forEach(x=>{const val=x.r[v.key];x.first=!seen.has(val);seen.add(val);});
 if(v.mode==='remove')rows=rows.filter(x=>x.kept&&(!v.distinct||x.first));
 if(v.order){const {col,desc}=v.order;rows=[...rows].sort((a,b)=>(a.r[col]-b.r[col])*(desc?-1:1));}
 let groups=null;
 if(v.group){
  const names=[...new Set(t.rows.map(r=>r[v.group]))];
  groups=names.map(n=>({name:n,rows:rows.filter(x=>x.r[v.group]===n)}));
  rows=groups.flatMap(g=>g.rows);
 }
 const kept=rows.filter(x=>x.kept).map(x=>x.r);
 let agg=null;
 if(v.agg){
  const col=v.agg.col,vals=kept.map(r=>r[col]).filter(x=>x!==null);
  const sum=vals.reduce((n,x)=>n+x,0);
  const mean=()=>fr(sum/vals.length),lo=()=>fr(Math.min(...vals)),hi=()=>fr(Math.max(...vals));
  agg={count:()=>[String(kept.length)],sum:()=>[fr(sum,0)],avg:()=>[mean()],max:()=>[hi()],
   avgminmax:()=>[mean(),lo(),hi()],countcol:()=>[String(kept.length),String(vals.length)],
   countdistinct:()=>[String(new Set(vals).size)]}[v.agg.fn]();
 }
 return {t,rows,groups,kept,agg};
}

// La table, à droite : chaque ligne est un objet nommé qui glisse, s’éteint ou disparaît.
function table(b){
 const v=b.view,{t,rows,groups,agg}=compute(v),x0=v.table==='produits'?740:790;
 const W=t.widths.reduce((n,w)=>n+w,0),RH=groups?19:21,GAP=groups?9:0;
 const xs=t.widths.map((w,k)=>x0+t.widths.slice(0,k).reduce((n,x)=>n+x,0));
 const shown=c=>v.show===undefined||v.show.includes(c);
 let out=motion(`thead-${v.table}`,`${text(x0,270,v.table.toUpperCase(),16,'label lime')}${text(x0+W,270,`${t.rows.length} lignes en base`,15,'mono dim','text-anchor="end"')}${t.cols.map((c,k)=>text(xs[k],300,c,15,`mono ${c===v.key?'lime':shown(c)?'':'dim'}`,shown(c)||c===v.key?'':'opacity=".45"')).join('')}${line(x0-8,309,x0+W+8,309)}`);
 let y=327,current=null;
 const spans=[];
 rows.forEach(x=>{
  if(groups&&x.r[v.group]!==current){if(current!==null)y+=GAP;current=x.r[v.group];spans.push({name:current,top:y,n:0});}
  if(groups)spans[spans.length-1].n++;
  const trap=v.trap?.includes(x.r.id),dupe=v.dupes&&!x.first,mark=v.distinctMark;
  const bg=trap?rect(x0-8,y-15,W+16,RH,'#ffb69a','none',3,'fill-opacity=".22"'):x.kept&&v.where?rect(x0-8,y-15,W+16,RH,'#d6fd78','none',3,'fill-opacity=".09"'):'';
  const cells=t.cols.map((c,k)=>{
   const on=shown(c),isKey=c===v.key;
   let cls='mono';
   if(isKey&&x.kept&&(v.where||v.agg||v.group))cls+=mark&&!x.first?' dim':' lime';
   if(isKey&&dupe)cls='mono peach';
   if(trap&&c==='nom')cls='mono peach';
   const faded=!on&&!(isKey&&(v.agg||v.where||v.group||v.dupes||v.distinct));
   return text(xs[k]+(c==='prix'||c==='stock'||c==='id'?t.widths[k]-14:0),y,esc(cell(c,x.r[c])),15,cls,`${c==='prix'||c==='stock'||c==='id'?'text-anchor="end"':''} ${faded?'opacity=".22"':''}`);
  }).join('');
  out+=motion(`row-${v.table}-${x.r.id}`,`<g opacity="${x.kept||v.mode==='remove'?1:.2}">${bg}${cells}</g>`);
  y+=RH;
 });
 if(groups)spans.forEach(s=>{
  const y1=s.top-13,y2=s.top+(s.n-1)*RH+3,xb=x0+W+16;
  out+=motion(`grp-${s.name}`,`<path d="M${xb-6} ${y1}H${xb}V${y2}H${xb-6}" fill="none" stroke="#d6fd78" stroke-width="2"/>${v.groupCount?`<circle cx="${xb+26}" cy="${(y1+y2)/2}" r="15" fill="#d6fd78"/>${text(xb+26,(y1+y2)/2+6,String(s.n),17,'mono','text-anchor="middle" style="fill:#121718"')}`:''}`);
 });
 return {svg:out,rows,groups,agg,x0};
}

// Carte de résultat sous la requête : nombre de lignes, ou valeur d’agrégat.
function result(b,top,tab){
 const v=b.view;
 if(b.conflict)return motion('result',`${text(64,top+28,'RÉSULTAT ATTENDU · UNE SEULE LIGNE',16,'label dim')}${rect(64,top+44,300,96,'#ffb69a22','#ffb69a',6)}${text(84,top+86,'nom = ?',34,'mono peach')}${text(84,top+120,'20 candidats',17,'dim')}${rect(380,top+44,288,96,'#1c2625','#d6fd78',6)}${text(400,top+86,'389,00',40,'mono lime')}${text(400,top+120,'MAX(prix)',17,'mono dim')}`);
 if(tab.agg){
  const vals=tab.agg,size=vals.length>2?44:vals.length===2?64:96;
  return motion('result',`${text(64,top+28,`RÉSULTAT · 1 LIGNE · ${v.agg.label}`,16,'label dim')}${text(64,top+56+size,vals.join('  ·  '),size,'heavy lime')}${line(tab.x0-20,top+40+size*0.66,Math.min(660,96+vals.join('  ·  ').length*size*0.62),top+40+size*0.66,'wire','stroke-dasharray="6 8" marker-end="url(#dim)"')}${text(tab.x0-24,top+28+size*0.66,`${tab.rows.filter(x=>x.kept).length} lignes → 1 valeur`,16,'mono dim','text-anchor="end"')}`);
 }
 const n=v.group?tab.groups.length:tab.rows.filter(x=>x.kept).length,cols=v.cols??(v.show?Math.max(1,v.show.length):tables[v.table].cols.length);
 return motion('result',`${text(64,top+28,'RÉSULTAT',16,'label dim')}${text(64,top+104,String(n),84,'heavy lime')}${text(64+String(n).length*52+18,top+70,n>1?'lignes':'ligne',28)}${text(64+String(n).length*52+18,top+104,`× ${cols} colonne${cols>1?'s':''}`,24,'dim')}`);
}
function ops(top){
 const items=[['=','égal'],['<>','différent'],['<','inférieur'],['>','supérieur'],['<=','inf. ou égal'],['>=','sup. ou égal']];
 return motion('ops',items.map(([o,l],k)=>{const x=64+(k%3)*204,y=top+(k>2?64:0);return `${rect(x,y,190,52,'#1c2625','#52615c',6)}${text(x+16,y+35,esc(o),26,'mono lime')}${text(x+66,y+33,l,17,'dim')}`;}).join(''));
}
function like(top){
 const items=[["'%Mario%'",'contient Mario','3'],["'Mario%'",'commence par Mario','1'],["'%Mario'",'finit par Mario','0']];
 return motion('like',items.map(([m,l,n],k)=>`${text(64,top+k*40,esc(m),22,'mono peach')}${text(250,top+k*40,l,20)}${text(668,top+k*40,`${n} ligne${n>1?'s':''}`,18,'mono dim','text-anchor="end"')}`).join('')+text(64,top+128,'_ remplace exactement un caractère.',18,'dim'));
}

function diagram(b){
 switch(b.kind){
 case 'intro':return `${motion('hero',text(58,560,'SELECT',230,'heavy'))}${text(70,640,'CONSTRUIRE UNE REQUÊTE, CLAUSE PAR CLAUSE',24,'label lime')}${motion('glyph',`<g transform="translate(1120 330)">${[0,1,2,3,4,5].map(k=>`${rect(0,k*44,340,34,k===2||k===4?'#d6fd78':'#1c2625',k===2||k===4?'none':'#52615c',4,k===2||k===4?'fill-opacity=".85"':'')}${line(14,k*44+17,k===2||k===4?120:200,k*44+17,'wire','stroke-width="3"')}`).join('')}${text(360,112,'←',40,'lime')}${text(360,200,'←',40,'lime')}</g>`)}${text(70,720,'→  APPUYEZ POUR CONSTRUIRE',18,'mono lime')}`;
 case 'skeleton':{
  const rows=[['SELECT','colonnes','Quoi afficher ?',true],['FROM','table','Dans quelle table ?',true],['WHERE','conditions','Quelles lignes garder ?',false],['GROUP BY','colonne','Quels paquets former ?',false],['ORDER BY','colonne','Dans quel ordre ?',false]];
  return rows.map(([k,p,qu,req],i)=>motion(`sk-${i}`,`${text(96,350+i*84,String(i+1),20,'mono dim')}${text(150,352+i*84,k,46,'mono lime')}${text(440,352+i*84,p,30,'mono dim')}${text(760,350+i*84,qu,32)}${text(1500,350+i*84,req?'OBLIGATOIRE':'AU BESOIN',15,req?'label lime':'label dim','text-anchor="end"')}${line(150,372+i*84,1500,372+i*84)}`)).join('')+motion('semi',text(150,770-30,';',46,'mono lime')+text(190,740,'le point-virgule termine la requête',20,'dim'));
 }
 case 'table':{
  const q=query(b),tab=table(b);
  const top=q.bottom+26;
  return `${q.svg}${tab.svg}${result(b,top,tab)}${b.ops?ops(top+150):''}${b.like?like(top+180):''}`;
 }
 case 'order':{
  const written=['SELECT','FROM','WHERE','GROUP BY','ORDER BY'],exec=['FROM','WHERE','GROUP BY','SELECT','ORDER BY'];
  const what={FROM:'partir de la table',WHERE:'garder des lignes','GROUP BY':'former les paquets',SELECT:'agrégats, colonnes','ORDER BY':'trier le résultat'};
  return `${text(100,320,'ORDRE D’ÉCRITURE',17,'label dim')}${text(960,320,'ORDRE D’EXÉCUTION',17,'label lime')}${written.map((w,i)=>motion(`w-${w}`,`${text(100,384+i*80,w,38,'mono')}`)).join('')}${exec.map((w,i)=>motion(`e-${w}`,`${text(960,384+i*80,`${i+1}`,20,'mono lime')}${text(1000,384+i*80,w,38,'mono lime')}${text(1000,412+i*80,what[w],18,'dim')}`)).join('')}${written.map((w,i)=>{const j=exec.indexOf(w);return `<path data-draw="" d="M${330} ${372+i*80}C${620} ${372+i*80} ${660} ${372+j*80} ${940} ${372+j*80}" fill="none" stroke="${i===j?'#52615c':'#9abaff'}" stroke-width="2" marker-end="url(#${i===j?'dim':'blue'})"/>`;}).join('')}`;
 }
 case 'quiz':{
  const qs=[['SELECT nom FROM produits','WHERE stock = 0;','4'],['SELECT COUNT(*) FROM produits','WHERE stock = 0;','1'],['SELECT DISTINCT categorie','FROM produits;','3']];
  return qs.map(([a,c,n],k)=>motion(`quiz-${k}`,`${text(97,350+k*130,'0'+(k+1),19,'mono dim')}${text(160,350+k*130,sql(a),30,'mono')}${text(160,392+k*130,sql(c),30,'mono')}${text(1440,380+k*130,b.level?n:'?',72,'heavy '+(b.level?'lime':'dim'),'text-anchor="end"')}${b.level?text(1440,412+k*130,n==='1'?'ligne':'lignes',18,'dim','text-anchor="end"'):''}${line(160,418+k*130,1460,418+k*130)}`)).join('');
 }
 case 'roadmap':{
  const steps=[['SELECT','Lire, filtrer, trier, compter',true],['JOIN','Relier deux tables'],['DELETE','Supprimer des lignes'],['INSERT','Ajouter des lignes'],['UPDATE','Modifier des valeurs']];
  return `${line(140,470,1460,470,'wire dotted')}${steps.map(([k,d,done],i)=>motion(`road-${i}`,`<circle cx="${140+i*330}" cy="470" r="${done?22:16}" fill="${done?'#d6fd78':'#1c2625'}" stroke="${done?'none':'#52615c'}" stroke-width="2"/>${text(140+i*330,410,k,done?44:36,`mono ${done?'lime':''}`,'text-anchor="middle"')}${text(140+i*330,540,d,21,done?'':'dim','text-anchor="middle"')}${text(140+i*330,580,done?'AUJOURD’HUI':'À VENIR',14,done?'label lime':'label dim','text-anchor="middle"')}`)).join('')}`;
 }
 }
}
function markup(b){
 const isIntro=b.kind==='intro';
 return `<svg viewBox="0 0 1600 900" role="img" aria-labelledby="scene-title scene-description"><title id="scene-title">${esc(b.title)}</title><desc id="scene-description">${esc(b.sub)} ${esc(b.take)}${b.q?' Requête : '+esc(b.q.join(' ')):''}</desc><defs>${['lime','blue','dim'].map(c=>`<marker id="${c}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="var(--${c==='dim'?'muted':c})"/></marker>`).join('')}<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#a3b0ad" stroke-opacity=".04"/></pattern></defs><rect width="1600" height="900" fill="url(#grid)"/>${text(67,118,`${String(b.chapter).padStart(2,'0')} / ${chapters[b.chapter]}`,17,'label lime')}${motion('heading',`${text(64,190,esc(b.title),isIntro?70:54,'heavy')}${text(67,236,esc(b.sub),24,'dim')}`)}${diagram(b)}${isIntro?'':motion('takeaway',`${line(64,778,1536,778)}<circle cx="74" cy="799" r="5" fill="#d6fd78"/>${text(94,807,esc(b.take),24)}`)}</svg>`;
}
function render(animate=true){
 const positions=new Map([...scene.querySelectorAll('[data-motion]')].map(el=>[el.dataset.motion,{box:el.getBoundingClientRect(),html:el.innerHTML}]));
 scene.getAnimations({subtree:true}).forEach(a=>a.cancel());
 scene.innerHTML=markup(beats[index]);
 if(animate&&!reduced.matches){
  const scale=Number(document.querySelector('#frame').style.getPropertyValue('--scale'))||1;
  const present=new Set([...scene.querySelectorAll('[data-motion]')].map(el=>el.dataset.motion));
  // Les lignes de table qui quittent le résultat s’effacent sur place au lieu de disparaître d’un coup.
  const svg=scene.querySelector('svg');
  positions.forEach((p,name)=>{if(present.has(name)||!name.startsWith('row-'))return;svg.insertAdjacentHTML('beforeend',`<g data-ghost>${p.html}</g>`);const g=svg.lastElementChild;g.animate([{opacity:1},{opacity:0,transform:'translateX(24px)'}],{duration:450,easing:'ease-in',fill:'forwards'}).onfinish=()=>g.remove();});
  scene.querySelectorAll('[data-motion]').forEach((el,k)=>{
   const previous=positions.get(el.dataset.motion),old=previous?.box,now=el.getBoundingClientRect();
   if(previous?.html===el.innerHTML&&Math.abs(old.x-now.x)<1&&Math.abs(old.y-now.y)<1)return;
   const isRow=el.dataset.motion.startsWith('row-');
   const dx=old?(old.x-now.x)/scale:0,dy=old?(old.y-now.y)/scale:isRow?0:35;
   el.style.transformBox='fill-box';el.style.transformOrigin='0 0';
   const sx=old&&!isRow?Math.max(.4,Math.min(2.5,old.width/now.width)):1,sy=old&&!isRow?Math.max(.4,Math.min(2.5,old.height/now.height)):1;
   el.animate([{transform:`translate(${dx}px,${dy}px) scale(${sx},${sy})`,opacity:old?(isRow?1:.65):0},{transform:'translate(0,0) scale(1)',opacity:1}],{duration:isRow?700:850,delay:old?(isRow?Math.min(k*12,240):0):Math.min(k*25,300),easing:'cubic-bezier(.16,1,.3,1)'});
  });
  scene.querySelectorAll('[data-draw]').forEach(el=>{const owner=el.closest('[data-motion]');if(owner&&positions.has(owner.dataset.motion))return;const length=el.getTotalLength();el.animate([{strokeDasharray:length,strokeDashoffset:length},{strokeDasharray:length,strokeDashoffset:0}],{duration:900,delay:300,easing:'cubic-bezier(.4,0,.2,1)',fill:'backwards'});});
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
 if(!embedded)document.title=`${index+1}/${beats.length} · ${beats[index].title} — SQL`;
 document.querySelector('#frame').dataset.beat=index;
}
function go(next){const target=Math.max(0,Math.min(beats.length-1,next));if(target!==index){index=target;render();}}
function resize(){const free=!embedded||document.fullscreenElement===root;document.querySelector('#frame').style.setProperty('--scale',free?Math.min(innerWidth/1600,innerHeight/900):root.clientWidth/1600);}
document.querySelector('#chapters').innerHTML=chapters.map((name,k)=>`<button data-chapter="${k}" aria-label="Chapitre ${name}">${name}</button>`).join('');
document.querySelector('#chapters').addEventListener('click',e=>{if(e.target.dataset.chapter!==undefined)go(beats.findIndex(b=>b.chapter===Number(e.target.dataset.chapter)));});
document.querySelector('#previous').onclick=()=>go(index-1);
document.querySelector('#next').onclick=()=>go(index+1);
const notes=document.querySelector('#notes');
function toggleNotes(){notes.open?notes.close():notes.showModal();}
document.querySelector('#notes-button').onclick=toggleNotes;
document.querySelector('#close-notes').onclick=()=>notes.close();
async function fullscreen(){try{document.fullscreenElement?await document.exitFullscreen():await (embedded?root:document.documentElement).requestFullscreen();}catch{document.querySelector('#fullscreen').title='Plein écran indisponible dans ce navigateur';}}
document.querySelector('#fullscreen').onclick=fullscreen;
document.addEventListener('keydown',e=>{
 if(e.target.closest('input,textarea,select,[contenteditable="true"]')||e.altKey||e.ctrlKey||e.metaKey)return;
 // Intégrée au site : les touches ne pilotent la présentation que si elle a le focus (clic dessus) ou en plein écran.
 if(embedded&&!root.contains(e.target)&&document.fullscreenElement!==root)return;
 if(e.key.toLowerCase()==='n'){e.preventDefault();if(!e.repeat)toggleNotes();return;}
 if(notes.open)return;
 if(e.key===' '&&e.target.closest('button,a'))return;
 if(['ArrowRight','PageDown',' ','ArrowLeft','PageUp','Home','End','f','F'].includes(e.key)){e.preventDefault();if(e.repeat)return;
  if(['ArrowRight','PageDown',' '].includes(e.key))go(index+1);
  else if(['ArrowLeft','PageUp'].includes(e.key))go(index-1);
  else if(e.key==='Home')go(0);else if(e.key==='End')go(beats.length-1);else fullscreen();
 }
});
// #12 dans l’adresse ouvre directement le temps 12 (reprise en classe, captures de contrôle).
const start=!embedded&&typeof location!=='undefined'?parseInt(location.hash.slice(1),10):NaN;
if(start>0)index=Math.min(beats.length,start)-1;
addEventListener('resize',resize);document.addEventListener('fullscreenchange',resize);if(embedded&&typeof ResizeObserver!=='undefined')new ResizeObserver(resize).observe(root);
if(embedded)root.addEventListener('click',e=>{if(!e.target.closest('button,a,dialog'))root.focus();});reduced.addEventListener('change',()=>render(false));resize();render(false);
