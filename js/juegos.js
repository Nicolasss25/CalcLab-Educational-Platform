/* ═══════════════════════════════════════════════════════
   CalcLab · juegos.js  (v3 — 10 juegos)
   Juegos 1-5 originales + 5 nuevos
   ═══════════════════════════════════════════════════════ */

/* ── INIT SECCIÓN ── */
function initJuegos() {
  const cont = document.getElementById('juegos-content');
  if (!cont) return;
  cont.innerHTML = `
    <div class="games-grid">
      <div class="g-card" onclick="abrirJuego('hangman')">
        <span class="g-icon">🔤</span>
        <div class="g-name">Ahorcado Matemático</div>
        <div class="g-desc">Adivina el término de cálculo letra por letra</div>
      </div>
      <div class="g-card" onclick="abrirJuego('memory')">
        <span class="g-icon">🃏</span>
        <div class="g-name">Memoria de Fórmulas</div>
        <div class="g-desc">Empareja función con su derivada</div>
      </div>
      <div class="g-card" onclick="abrirJuego('speed')">
        <span class="g-icon">⚡</span>
        <div class="g-name">Velocidad de Cálculo</div>
        <div class="g-desc">Derivadas básicas contra el reloj</div>
      </div>
      <div class="g-card" onclick="abrirJuego('puzzle')">
        <span class="g-icon">🧩</span>
        <div class="g-name">Puzzle de Límites</div>
        <div class="g-desc">Ordena los pasos de resolución</div>
      </div>
      <div class="g-card" onclick="abrirJuego('rules')">
        <span class="g-icon">📋</span>
        <div class="g-name">¿Qué Regla Aplico?</div>
        <div class="g-desc">Identifica la regla de derivación correcta</div>
      </div>
      <div class="g-card" onclick="abrirJuego('trueo')">
        <span class="g-icon">✅</span>
        <div class="g-name">Verdadero o Falso</div>
        <div class="g-desc">¿Es correcta la derivada mostrada?</div>
      </div>
      <div class="g-card" onclick="abrirJuego('completa')">
        <span class="g-icon">🔢</span>
        <div class="g-name">Completa la Derivada</div>
        <div class="g-desc">Escribe el resultado correcto</div>
      </div>
      <div class="g-card" onclick="abrirJuego('empareja')">
        <span class="g-icon">🔗</span>
        <div class="g-name">Empareja el Límite</div>
        <div class="g-desc">Une cada límite con su valor</div>
      </div>
      <div class="g-card" onclick="abrirJuego('cadena')">
        <span class="g-icon">⛓️</span>
        <div class="g-name">Constructor de Cadena</div>
        <div class="g-desc">Construye la derivada por cadena paso a paso</div>
      </div>
      <div class="g-card" onclick="abrirJuego('crucigrama')">
        <span class="g-icon">📰</span>
        <div class="g-name">Crucigrama de Cálculo</div>
        <div class="g-desc">Completa el crucigrama con términos de cálculo</div>
      </div>
    </div>
    <div id="zone-hangman"  class="game-zone" style="display:none"></div>
    <div id="zone-memory"   class="game-zone" style="display:none"></div>
    <div id="zone-speed"    class="game-zone" style="display:none"></div>
    <div id="zone-puzzle"   class="game-zone" style="display:none"></div>
    <div id="zone-rules"    class="game-zone" style="display:none"></div>
    <div id="zone-trueo"    class="game-zone" style="display:none"></div>
    <div id="zone-completa" class="game-zone" style="display:none"></div>
    <div id="zone-empareja" class="game-zone" style="display:none"></div>
    <div id="zone-cadena"   class="game-zone" style="display:none"></div>
    <div id="zone-crucigrama" class="game-zone" style="display:none"></div>`;
}

function abrirJuego(id) {
  ['hangman','memory','speed','puzzle','rules','trueo','completa','empareja','cadena','crucigrama']
    .forEach(g => { const z=document.getElementById('zone-'+g); if(z) z.style.display='none'; });
  const zona = document.getElementById('zone-'+id);
  if (!zona) return;
  zona.style.display = 'block';
  zona.scrollIntoView({ behavior:'smooth', block:'nearest' });
  if (id==='hangman')   initHangman();
  if (id==='memory')    initMemory();
  if (id==='speed')     initSpeed();
  if (id==='puzzle')    initPuzzle();
  if (id==='rules')     initRules();
  if (id==='trueo')     initTrueFalse();
  if (id==='completa')  initCompleta();
  if (id==='empareja')  initEmpareja();
  if (id==='cadena')    initCadena();
  if (id==='crucigrama') initCrucigrama();
}
function cerrarJuego(id) { const z=document.getElementById('zone-'+id); if(z) z.style.display='none'; }
function cabJuego(titulo, id) {
  return `<div class="game-hdr"><h3>${titulo}</h3><button class="close-game-btn" onclick="cerrarJuego('${id}')">✕</button></div>`;
}

/* ══════════════════════════════════════════════════════
   JUEGO 1 — AHORCADO MATEMÁTICO (palabras fáciles)
══════════════════════════════════════════════════════ */
const PALABRAS_HANG = [
  { palabra:'SENO',      pista:'Función trig. Su derivada es coseno' },
  { palabra:'COSENO',    pista:'Función trig. Su derivada es −seno' },
  { palabra:'LIMITE',    pista:'Valor al que se acerca f(x) cuando x→a' },
  { palabra:'CADENA',    pista:'Regla para derivar funciones compuestas' },
  { palabra:'POTENCIA',  pista:'Regla: d/dx[xⁿ] = nxⁿ⁻¹' },
  { palabra:'PRODUCTO',  pista:'Regla: (u·v)\'= u\'v + uv\'' },
  { palabra:'COCIENTE',  pista:'Regla: (u/v)\'= (u\'v − uv\')/v²' },
  { palabra:'DERIVADA',  pista:'Tasa de cambio instantánea de una función' },
  { palabra:'TANGENTE',  pista:'Su derivada es sec²(x)' },
  { palabra:'LOGARITMO', pista:'d/dx[ln(x)] = 1/x' },
  { palabra:'CONTINUA',  pista:'Función sin saltos ni huecos' },
  { palabra:'POLINOMIO', pista:'Suma de términos con potencias enteras' },
  { palabra:'INFINITO',  pista:'Valor al que tiende una función sin parar' },
  { palabra:'PENDIENTE', pista:'La derivada en un punto representa esto' },
  { palabra:'SECANTE',   pista:'Función trig. 1/cos(x)' },
  { palabra:'COTANGENTE',pista:'Función trig. cos(x)/sin(x)' },
  { palabra:'COSECANTE', pista:'Función trig. 1/sin(x)' },
];

const HORCA=['  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========',
'  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========',
'  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========',
'  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========',
'  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========',
'  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========',
'  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n========='];

let hgPals,hgIdx2,hgPalabra,hgAdivinadas,hgErrores;
function initHangman(){hgPals=[...PALABRAS_HANG].sort(()=>Math.random()-.5);hgIdx2=0;startHW();}
function startHW(){const e=hgPals[hgIdx2%hgPals.length];hgPalabra=e.palabra;hgAdivinadas=new Set();hgErrores=0;renderH(e.pista);}
function renderH(pista){
  const z=document.getElementById('zone-hangman');
  const g=[...hgPalabra].every(c=>hgAdivinadas.has(c));
  const p=hgErrores>=6;
  const cajas=hgPalabra.split('').map(c=>`<div class="l-box">${hgAdivinadas.has(c)?c:''}</div>`).join('');
  const teclas='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').map(l=>{
    let cls='kb-key';
    if(hgAdivinadas.has(l))cls+=hgPalabra.includes(l)?' hit':' miss';
    return `<button class="${cls}" onclick="teclaH('${l}')" ${hgAdivinadas.has(l)||g||p?'disabled':''}>${l}</button>`;
  }).join('');
  let msg=`Errores: ${hgErrores}/6`,col='var(--text2)';
  if(g){msg='🎉 ¡Correcto! '+hgPalabra;col='var(--green2)';}
  if(p){msg='💀 Era: '+hgPalabra;col='#fca5a5';}
  z.innerHTML=cabJuego('🔤 Ahorcado Matemático','hangman')+`
    <div style="display:flex;gap:1.5rem;flex-wrap:wrap;align-items:flex-start">
      <pre class="hang-figure">${HORCA[Math.min(hgErrores,6)]}</pre>
      <div style="flex:1;min-width:220px">
        <div class="hang-hint">💡 ${pista}</div>
        <div class="hang-word">${cajas}</div>
        <div style="font-size:.85rem;color:${col};margin-bottom:.6rem">${msg}</div>
        <div class="keyboard-grid">${teclas}</div>
        ${g||p?`<button class="btn-primary" style="margin-top:1rem;width:auto;padding:.6rem 1.4rem" onclick="hgIdx2++;startHW()">Siguiente →</button>`:''}
      </div>
    </div>`;
}
function teclaH(l){
  if(hgAdivinadas.has(l))return;
  hgAdivinadas.add(l);
  if(!hgPalabra.includes(l))hgErrores++;
  if([...hgPalabra].every(c=>hgAdivinadas.has(c))){window.sumarXP(15);window.mostrarXP(15,'¡Palabra adivinada!');}
  renderH(hgPals[hgIdx2%hgPals.length].pista);
}

/* ══════════════════════════════════════════════════════
   JUEGO 2 — MEMORIA (sin cambios)
══════════════════════════════════════════════════════ */
const PARES_MEM=[
  {a:'f(x) = xⁿ',     b:"f'(x) = n·xⁿ⁻¹"},
  {a:'f(x) = sin(x)', b:"f'(x) = cos(x)"},
  {a:'f(x) = cos(x)', b:"f'(x) = -sin(x)"},
  {a:'f(x) = eˣ',      b:"f'(x) = eˣ"},
  {a:'f(x) = ln(x)',  b:"f'(x) = 1/x"},
  {a:'f(x) = tan(x)', b:"f'(x) = sec²(x)"},
  {a:'f(x) = u·v',    b:"f'= u'v+uv'"},
  {a:'f(x) = u/v',    b:"f'=(u'v-uv')/v²"},
];
let mFlip=[],mPares=0,mTries=0,mLock=false;
function initMemory(){
  mFlip=[];mPares=0;mTries=0;mLock=false;
  const cards=[];
  PARES_MEM.forEach((p,i)=>{cards.push({id:i*2,par:i,txt:p.a});cards.push({id:i*2+1,par:i,txt:p.b});});
  cards.sort(()=>Math.random()-.5);
  const z=document.getElementById('zone-memory');
  z.innerHTML=cabJuego('🃏 Memoria de Fórmulas','memory')+`
    <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text2);margin-bottom:.75rem">
      <span>Pares: <strong id="mp">0</strong>/8</span>
      <span>Intentos: <strong id="mt">0</strong></span>
    </div>
    <div class="mem-grid" id="mem-grid"></div>
    <button class="btn-secondary" style="margin-top:1rem" onclick="initMemory()">🔄 Nueva partida</button>`;
  const g=document.getElementById('mem-grid');
  cards.forEach(c=>{
    const d=document.createElement('div');
    d.className='mem-card';d.dataset.par=c.par;d.dataset.id=c.id;d.dataset.txt=c.txt;
    d.onclick=()=>flipM(d);g.appendChild(d);
  });
}
function flipM(card){
  if(mLock||card.classList.contains('flipped')||card.classList.contains('matched'))return;
  card.textContent=card.dataset.txt;card.classList.add('flipped');mFlip.push(card);
  if(mFlip.length===2){
    mLock=true;mTries++;document.getElementById('mt').textContent=mTries;
    if(mFlip[0].dataset.par===mFlip[1].dataset.par){
      mFlip.forEach(c=>{c.classList.remove('flipped');c.classList.add('matched');});
      mFlip=[];mPares++;mLock=false;document.getElementById('mp').textContent=mPares;
      if(mPares===8){window.sumarXP(30);window.mostrarXP(30,'¡Memoria completa!');}
    }else{
      setTimeout(()=>{mFlip.forEach(c=>{c.textContent='';c.classList.remove('flipped');});mFlip=[];mLock=false;},900);
    }
  }
}

/* ══════════════════════════════════════════════════════
   JUEGO 3 — VELOCIDAD (sin cambios)
══════════════════════════════════════════════════════ */
const SPD=[
  {f:'x²',a:'2x',w:['x','2','x²']},{f:'x³',a:'3x²',w:['x²','3x','3x³']},
  {f:'sin(x)',a:'cos(x)',w:['-sin(x)','tan(x)','-cos(x)']},
  {f:'cos(x)',a:'-sin(x)',w:['sin(x)','-cos(x)','cos(x)']},
  {f:'eˣ',a:'eˣ',w:['xeˣ','eˣ⁻¹','1']},{f:'ln(x)',a:'1/x',w:['ln(x)/x','x','1/ln(x)']},
  {f:'tan(x)',a:'sec²(x)',w:['cos²(x)','-csc²(x)','1/cos(x)']},
  {f:'5x',a:'5',w:['5x','x','0']},{f:'√x',a:'1/(2√x)',w:['√x/2','2√x','1/√x']},
  {f:'1/x',a:'-1/x²',w:['1/x²','ln(x)','0']},{f:'x⁴',a:'4x³',w:['4x²','x³','4x⁴']},
  {f:'e²ˣ',a:'2e²ˣ',w:['e²ˣ','2xe²ˣ','2eˣ']},{f:'x⁵',a:'5x⁴',w:['5x³','x⁴','5x⁵']},
  {f:'csc(x)',a:'-csc(x)cot(x)',w:['csc²(x)','-csc²(x)','cot(x)']},
  {f:'sec(x)',a:'sec(x)tan(x)',w:['-sec(x)tan(x)','sec²(x)','tan(x)']},
  {f:'cot(x)',a:'-csc²(x)',w:['csc²(x)','-cot²(x)','sec²(x)']},
];
let sI,sScore,sStreak,sTimer,sActivo;
function initSpeed(){
  sScore=0;sStreak=0;sActivo=true;
  const z=document.getElementById('zone-speed');
  z.innerHTML=cabJuego('⚡ Velocidad de Cálculo','speed')+`
    <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text2);margin-bottom:.5rem">
      <span>Racha: <strong id="ss">0</strong></span><span>Puntos: <strong id="sc">0</strong></span>
    </div>
    <div class="spd-bar-wrap"><div class="spd-bar" id="sb" style="width:100%"></div></div>
    <div class="spd-func" id="sf">—</div>
    <div class="spd-opts" id="so"></div>
    <div id="sfin" style="display:none;text-align:center;padding:1.25rem">
      <div style="font-size:1.15rem;font-weight:800;margin-bottom:.4rem;font-family:'Orbitron',sans-serif">⏰ ¡Tiempo!</div>
      <div style="color:var(--text2);margin-bottom:1rem">Puntuación: <strong id="sfp"></strong></div>
      <button class="btn-primary" onclick="initSpeed()">🔄 Jugar de nuevo</button>
    </div>`;
  nextSpd();
}
function nextSpd(){
  if(!sActivo)return;
  sI=Math.floor(Math.random()*SPD.length);
  const q=SPD[sI];
  document.getElementById('sf').textContent='d/dx [ '+q.f+' ]';
  const all=[q.a,...q.w.slice(0,3)].sort(()=>Math.random()-.5);
  const so=document.getElementById('so');
  if(!so)return;
  so.innerHTML=all.map(op=>`<button class="q-opt-btn" onclick="rSpd('${op.replace(/'/g,"\\'")}','${q.a.replace(/'/g,"\\'")}')"> ${op}</button>`).join('');
  startSpdTimer();
}
function startSpdTimer(){
  clearInterval(sTimer);let t=100;
  const bar=document.getElementById('sb');if(bar)bar.style.width='100%';
  sTimer=setInterval(()=>{t-=2;if(bar)bar.style.width=t+'%';if(t<=0){clearInterval(sTimer);sStreak=0;const s=document.getElementById('ss');if(s)s.textContent=0;nextSpd();}},100);
}
function rSpd(r,c){
  clearInterval(sTimer);
  if(r===c){sStreak++;const pts=5+sStreak*2;sScore+=pts;const sc=document.getElementById('sc'),ss=document.getElementById('ss');if(sc)sc.textContent=sScore;if(ss)ss.textContent=sStreak;nextSpd();}
  else{sActivo=false;const fin=document.getElementById('sfin'),so=document.getElementById('so'),sf=document.getElementById('sf');if(fin)fin.style.display='block';if(so)so.style.display='none';if(sf)sf.style.display='none';const fp=document.getElementById('sfp');if(fp)fp.textContent=sScore+' puntos';if(sScore>0){window.sumarXP(sScore);window.mostrarXP(sScore,'¡Velocidad terminada!');}}
}

/* ══════════════════════════════════════════════════════
   JUEGO 4 — PUZZLE
══════════════════════════════════════════════════════ */
const PUZZLES=[
  {titulo:'Diferencia de cuadrados',formula:'lím (x→2) de (x²−4)/(x−2)',
   pasos:['Sustitución directa: (4−4)/(2−2) = 0/0  →  Indeterminación','Factorizar: x²−4 = (x+2)(x−2)','Cancelar factor (x−2) del num. y den.','Expresión simplificada: x+2','Evaluar en x=2: 2+2 = 4  →  lím = 4 ✅']},
  {titulo:'Regla de la cadena',formula:"f'(x) de  f(x) = (x²+1)³",
   pasos:['Identificar exterior: g(u)=u³  |  interior: u=x²+1','Derivar exterior: d/du[u³] = 3u²','Derivar interior: d/dx[x²+1] = 2x','Aplicar cadena: f\'(x) = 3u²·2x','Sustituir u: 6x(x²+1)² ✅']},
  {titulo:'Límite al infinito',formula:'lím (x→∞) de (3x²+2x)/(x²−5)',
   pasos:['Identificar grado numerador: 2 (término 3x²)','Identificar grado denominador: 2 (término x²)','Grados iguales → dividir todo por x²','Resultado: (3+2/x)/(1−5/x²)','Cuando x→∞: las fracciones →0, lím = 3 ✅']},
  {titulo:'Diferencia de cubos',formula:'lím (x→1) de (x³−1)/(x−1)',
   pasos:['Sustitución directa: 0/0 → Indeterminación','Fórmula: x³−1 = (x−1)(x²+x+1)','Cancelar factor (x−1)','Expresión simplificada: x²+x+1','Evaluar en x=1: 1+1+1 = 3  →  lím = 3 ✅']},
];
let pzI,pzSel;
function initPuzzle(){pzI=Math.floor(Math.random()*PUZZLES.length);pzSel=[];renderPzl();}
function renderPzl(){
  const p=PUZZLES[pzI];const mez=[...p.pasos].sort(()=>Math.random()-.5);window._pzM=mez;
  const z=document.getElementById('zone-puzzle');
  z.innerHTML=cabJuego('🧩 Puzzle de Límites','puzzle')+`
    <p style="font-size:.85rem;color:var(--text2);margin-bottom:.6rem">Toca los pasos en el <strong>orden correcto</strong>:</p>
    <div style="font-size:.8rem;color:var(--text3);margin-bottom:.35rem">${p.titulo}</div>
    <div class="pz-formula">${p.formula}</div>
    <div class="pz-steps" id="pzs"></div>
    <div id="pzfb" style="margin-top:.75rem"></div>
    <div style="display:flex;gap:.5rem;margin-top:1rem;flex-wrap:wrap">
      <button class="btn-primary" style="width:auto;padding:.6rem 1.4rem" onclick="checkPzl()">✓ Verificar</button>
      <button class="btn-secondary" onclick="initPuzzle()">🔄 Nuevo</button>
    </div>`;
  const el=document.getElementById('pzs');
  mez.forEach((paso,i)=>{
    const d=document.createElement('div');d.className='pz-step';d.dataset.orig=paso;
    d.innerHTML=`<span id="pzn${i}" style="min-width:1.4rem;font-weight:800;color:var(--violet4)"></span>${paso}`;
    d.onclick=()=>selPzl(d,i);el.appendChild(d);
  });
}
function selPzl(div,i){
  const ya=pzSel.findIndex(s=>s.i===i);
  if(ya>=0){pzSel.splice(ya,1);div.classList.remove('sel-ok');const n=document.getElementById('pzn'+i);if(n)n.textContent='';pzSel.forEach((s,k)=>{const nn=document.getElementById('pzn'+s.i);if(nn)nn.textContent=(k+1)+'.';}); }
  else{pzSel.push({i,paso:div.dataset.orig});div.classList.add('sel-ok');const n=document.getElementById('pzn'+i);if(n)n.textContent=pzSel.length+'.';}
}
function checkPzl(){
  const p=PUZZLES[pzI];const fb=document.getElementById('pzfb');
  if(pzSel.length!==p.pasos.length){fb.innerHTML='<div style="color:#fca5a5;font-size:.85rem">Selecciona los '+p.pasos.length+' pasos.</div>';return;}
  const ok=pzSel.map(s=>s.paso).every((paso,i)=>paso===p.pasos[i]);
  if(ok){fb.innerHTML='<div style="background:rgba(16,185,129,.12);border:1px solid rgba(52,211,153,.3);border-radius:10px;padding:.75rem;color:var(--green2)">🎉 ¡Correcto! +20 XP</div>';window.sumarXP(20);window.mostrarXP(20,'¡Puzzle resuelto!');}
  else{fb.innerHTML='<div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:.75rem;color:#fca5a5">❌ Orden incorrecto. Intenta de nuevo.</div>';pzSel=[];document.querySelectorAll('.pz-step').forEach(d=>{d.classList.remove('sel-ok','sel-err');const num=d.querySelector('[id^="pzn"]');if(num)num.textContent='';});}
}

/* ══════════════════════════════════════════════════════
   JUEGO 5 — ¿QUÉ REGLA APLICO?
══════════════════════════════════════════════════════ */
const RQ=[
  {f:'f(x) = x⁵·ln(x)',ok:'Producto',todas:['Producto','Cadena','Cociente','Potencia'],por:'Dos funciones multiplicadas: x⁵ y ln(x)'},
  {f:'f(x) = sin(3x²)',ok:'Cadena',todas:['Cadena','Producto','Suma','Cociente'],por:'sin aplicado a 3x². Composición.'},
  {f:'f(x) = (x³+1)/(x−2)',ok:'Cociente',todas:['Cociente','Producto','Cadena','Potencia'],por:'División de dos funciones.'},
  {f:'f(x) = (x²+3)⁴',ok:'Cadena',todas:['Cadena','Potencia','Producto','Cociente'],por:'Potencia aplicada a x²+3. No es x puro.'},
  {f:'f(x) = eˣ·sin(x)',ok:'Producto',todas:['Producto','Cadena','Cociente','Suma'],por:'Dos funciones multiplicadas: eˣ y sin(x)'},
  {f:'f(x) = ln(x²+1)',ok:'Cadena',todas:['Cadena','Logarítmica','Suma','Producto'],por:'ln aplicado a x²+1. Composición.'},
  {f:'f(x) = x⁷',ok:'Potencia',todas:['Potencia','Cadena','Exponencial','Producto'],por:'Potencia simple de x. d/dx[xⁿ]=nxⁿ⁻¹'},
  {f:'f(x) = cos(x)/eˣ',ok:'Cociente',todas:['Cociente','Cadena','Producto','Potencia'],por:'División de cos(x) entre eˣ.'},
  {f:'f(x) = tan(x³)',ok:'Cadena',todas:['Cadena','Tangente','Potencia','Suma'],por:'tan aplicado a x³. Composición.'},
  {f:'f(x) = 3x⁴−2x²+7',ok:'Suma',todas:['Suma','Cadena','Producto','Cociente'],por:'Suma de términos. Cada uno se deriva aparte.'},
];
let rlI,rlSc,rlPr;
function initRules(){rlI=0;rlSc=0;rlPr=[...RQ].sort(()=>Math.random()-.5).slice(0,8);showRule();}
function showRule(){
  if(rlI>=rlPr.length){
    const z=document.getElementById('zone-rules');
    z.innerHTML=cabJuego('📋 ¿Qué Regla Aplico?','rules')+`<div style="text-align:center;padding:1.5rem"><div style="font-size:2.5rem">🎓</div><h3 style="font-family:'Orbitron',sans-serif;font-size:.95rem;margin:.5rem 0">¡Completado!</h3><div style="font-size:1.8rem;font-weight:700;font-family:'JetBrains Mono',monospace;background:linear-gradient(135deg,var(--gold),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.75rem">${rlSc}/${rlPr.length*10} XP</div><button class="btn-primary" style="width:auto;padding:.6rem 1.4rem" onclick="initRules()">🔄 Jugar de nuevo</button></div>`;
    if(rlSc>0){window.sumarXP(rlSc);window.mostrarXP(rlSc,'¡Juego terminado!');}return;
  }
  const q=rlPr[rlI];const opts=[...q.todas].sort(()=>Math.random()-.5);
  const z=document.getElementById('zone-rules');
  z.innerHTML=cabJuego('📋 ¿Qué Regla Aplico?','rules')+`
    <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text2);margin-bottom:.75rem">
      <span>Pregunta <strong>${rlI+1}</strong>/${rlPr.length}</span>
      <span style="color:var(--violet4);font-family:'JetBrains Mono',monospace"><strong>${rlSc}</strong> XP</span>
    </div>
    <p style="font-size:.9rem;font-weight:700;margin-bottom:.5rem">¿Qué regla aplicarías?</p>
    <div class="pz-formula">${q.f}</div>
    <div class="rules-opts" id="rlop"></div>
    <div id="rlfb" style="margin-top:.75rem"></div>`;
  const el=document.getElementById('rlop');
  opts.forEach(op=>{
    const d=document.createElement('div');d.className='rule-opt';d.textContent=op;
    d.onclick=()=>ansRule(op,q);el.appendChild(d);
  });
}
function ansRule(r,q){
  document.querySelectorAll('.rule-opt').forEach(d=>{d.onclick=null;if(d.textContent.trim()===q.ok)d.classList.add('ok');else if(d.textContent.trim()===r&&r!==q.ok)d.classList.add('err');});
  const fb=document.getElementById('rlfb');
  if(r===q.ok){rlSc+=10;fb.innerHTML=`<div style="background:rgba(16,185,129,.1);border:1px solid rgba(52,211,153,.3);border-radius:10px;padding:.75rem;color:var(--green2)">✅ ¡Correcto! +10 XP<br><small>${q.por}</small></div>`;}
  else{fb.innerHTML=`<div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:.75rem;color:#fca5a5">❌ Era: <strong>${q.ok}</strong><br><small>${q.por}</small></div>`;}
  fb.innerHTML+=`<button class="btn-primary" style="margin-top:.75rem;width:auto;padding:.55rem 1.25rem" onclick="rlI++;showRule()">Siguiente →</button>`;
}

/* ══════════════════════════════════════════════════════
   JUEGO 6 — VERDADERO O FALSO
══════════════════════════════════════════════════════ */
const TF_QS=[
  {q:"¿Es correcta esta derivada?", formula:"f(x) = x³  →  f'(x) = 3x²", correcto:true, exp:"✅ Correcto. Regla de la potencia: 3·x^(3-1) = 3x²"},
  {q:"¿Es correcta esta derivada?", formula:"f(x) = sin(x)  →  f'(x) = -cos(x)", correcto:false, exp:"❌ Falso. d/dx[sin(x)] = cos(x) (positivo, no negativo)"},
  {q:"¿Es correcta esta derivada?", formula:"f(x) = eˣ  →  f'(x) = eˣ", correcto:true, exp:"✅ Correcto. La función eˣ es su propia derivada."},
  {q:"¿Es correcta esta derivada?", formula:"f(x) = ln(x)  →  f'(x) = x", correcto:false, exp:"❌ Falso. d/dx[ln(x)] = 1/x, no x."},
  {q:"¿Es correcto este límite?", formula:"lím(x→2) de x² = 4", correcto:true, exp:"✅ Correcto. Sustitución directa: 2² = 4."},
  {q:"¿Es correcto este límite?", formula:"lím(x→0) de sin(x)/x = 0", correcto:false, exp:"❌ Falso. lím(x→0) sin(x)/x = 1, es el límite notable trigonométrico."},
  {q:"¿Es correcta esta derivada?", formula:"f(x) = cos(x)  →  f'(x) = -sin(x)", correcto:true, exp:"✅ Correcto. d/dx[cos(x)] = -sin(x). Ojo al signo negativo."},
  {q:"¿Es correcta esta derivada?", formula:"f(x) = x²·sin(x)  →  f'(x) = 2x·cos(x)", correcto:false, exp:"❌ Falso. Se necesita la regla del producto: f'= 2x·sin(x) + x²·cos(x)"},
  {q:"¿Es correcta esta derivada?", formula:"f(x) = 5  →  f'(x) = 0", correcto:true, exp:"✅ Correcto. La derivada de cualquier constante es 0."},
  {q:"¿Es correcta esta derivada?", formula:"f(x) = tan(x)  →  f'(x) = sec²(x)", correcto:true, exp:"✅ Correcto. d/dx[tan(x)] = sec²(x) = 1/cos²(x)"},
  {q:"¿Es correcto este límite?", formula:"lím(x→∞) de 1/x = ∞", correcto:false, exp:"❌ Falso. Cuando x→∞, el denominador crece → 1/x → 0."},
  {q:"¿Es correcta esta derivada?", formula:"f(x) = sin(2x)  →  f'(x) = cos(2x)", correcto:false, exp:"❌ Falso. Por la regla de la cadena: f'= 2·cos(2x). Falta multiplicar por la derivada interior (2)."},
];
let tfIdx,tfSc,tfPregs;
function initTrueFalse(){
  tfIdx=0;tfSc=0;
  tfPregs=[...TF_QS].sort(()=>Math.random()-.5).slice(0,8);
  renderTF();
}
function renderTF(){
  const z=document.getElementById('zone-trueo');
  if(tfIdx>=tfPregs.length){
    z.innerHTML=cabJuego('✅ Verdadero o Falso','trueo')+`<div style="text-align:center;padding:1.5rem"><div style="font-size:2.5rem">🏁</div><h3 style="font-family:'Orbitron',sans-serif;font-size:.95rem;margin:.5rem 0">¡Completado!</h3><div style="font-size:1.8rem;font-weight:700;font-family:'JetBrains Mono',monospace;background:linear-gradient(135deg,var(--gold),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.75rem">${tfSc} XP</div><button class="btn-primary" style="width:auto;padding:.6rem 1.4rem" onclick="initTrueFalse()">🔄 Jugar de nuevo</button></div>`;
    if(tfSc>0){window.sumarXP(tfSc);window.mostrarXP(tfSc,'¡Verdadero o Falso!');}
    return;
  }
  const q=tfPregs[tfIdx];
  z.innerHTML=cabJuego('✅ Verdadero o Falso','trueo')+`
    <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text2);margin-bottom:.75rem">
      <span>Pregunta <strong>${tfIdx+1}</strong>/${tfPregs.length}</span>
      <span style="color:var(--violet4);font-family:'JetBrains Mono',monospace"><strong>${tfSc}</strong> XP</span>
    </div>
    <p style="font-size:.95rem;font-weight:700;margin-bottom:.75rem">${q.q}</p>
    <div class="pz-formula" style="font-size:1rem;margin-bottom:1.25rem">${q.formula}</div>
    <div style="display:flex;gap:.75rem;justify-content:center">
      <button class="btn-primary" style="width:auto;padding:.75rem 2rem;font-size:1rem" onclick="ansTF(true)">✅ Verdadero</button>
      <button style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);border-radius:12px;color:#fca5a5;font-weight:700;font-size:1rem;padding:.75rem 2rem;cursor:pointer;font-family:'Space Grotesk',sans-serif" onclick="ansTF(false)">❌ Falso</button>
    </div>
    <div id="tf-fb" style="margin-top:1rem"></div>`;
}
function ansTF(resp){
  const q=tfPregs[tfIdx];
  const fb=document.getElementById('tf-fb');
  const correcto=resp===q.correcto;
  if(correcto){tfSc+=10;fb.innerHTML=`<div style="background:rgba(16,185,129,.1);border:1px solid rgba(52,211,153,.3);border-radius:10px;padding:.85rem;color:var(--green2)">✅ ¡Correcto! +10 XP<br><small style="font-size:.85rem">${q.exp}</small></div>`;}
  else{fb.innerHTML=`<div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:.85rem;color:#fca5a5">❌ Incorrecto.<br><small style="font-size:.85rem">${q.exp}</small></div>`;}
  // Deshabilitar botones
  document.querySelectorAll('[onclick^="ansTF"]').forEach(b=>b.disabled=true);
  fb.innerHTML+=`<button class="btn-primary" style="margin-top:.75rem;width:auto;padding:.55rem 1.25rem" onclick="tfIdx++;renderTF()">Siguiente →</button>`;
}

/* ══════════════════════════════════════════════════════
   JUEGO 7 — COMPLETA LA DERIVADA (input de texto)
══════════════════════════════════════════════════════ */
const COMP_QS=[
  {q:'Completa la derivada de f(x) = x⁵',formula:'d/dx[x⁵] = ___',resp:['5x^4','5x4'],hint:'Regla de la potencia: n·xⁿ⁻¹'},
  {q:'Completa la derivada de f(x) = sin(x)',formula:'d/dx[sin(x)] = ___',resp:['cos(x)','cos x'],hint:'Derivada fundamental del seno'},
  {q:'Completa la derivada de f(x) = eˣ',formula:'d/dx[eˣ] = ___',resp:['e^x','exp(x)','eˣ','ex'],hint:'La exponencial es su propia derivada'},
  {q:'Completa la derivada de f(x) = ln(x)',formula:'d/dx[ln(x)] = ___',resp:['1/x'],hint:'Derivada fundamental del logaritmo'},
  {q:'Completa la derivada de f(x) = cos(x)',formula:'d/dx[cos(x)] = ___',resp:['-sin(x)','-sinx','-sin x'],hint:'Recuerda el signo negativo'},
  {q:'Completa la derivada de f(x) = tan(x)',formula:'d/dx[tan(x)] = ___',resp:['sec^2(x)','sec2(x)','sec²(x)'],hint:'Relacionada con secante al cuadrado'},
  {q:'Completa la derivada de f(x) = 7',formula:'d/dx[7] = ___',resp:['0'],hint:'Derivada de cualquier constante'},
  {q:'Completa la derivada de f(x) = x',formula:'d/dx[x] = ___',resp:['1'],hint:'Potencia 1: d/dx[x¹] = 1·x⁰ = 1'},
  {q:'Completa el límite',formula:'lím(x→0) sin(x)/x = ___',resp:['1'],hint:'Límite notable trigonométrico fundamental'},
  {q:'Completa el límite',formula:'lím(x→∞) 1/x = ___',resp:['0'],hint:'El denominador crece sin límite'},
];
let compIdx,compSc,compPregs;
function initCompleta(){
  compIdx=0;compSc=0;
  compPregs=[...COMP_QS].sort(()=>Math.random()-.5).slice(0,7);
  renderComp();
}
function renderComp(){
  const z=document.getElementById('zone-completa');
  if(compIdx>=compPregs.length){
    z.innerHTML=cabJuego('🔢 Completa la Derivada','completa')+`<div style="text-align:center;padding:1.5rem"><div style="font-size:2.5rem">✏️</div><h3 style="font-family:'Orbitron',sans-serif;font-size:.95rem;margin:.5rem 0">¡Completado!</h3><div style="font-size:1.8rem;font-weight:700;font-family:'JetBrains Mono',monospace;background:linear-gradient(135deg,var(--gold),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.75rem">${compSc} XP</div><button class="btn-primary" style="width:auto;padding:.6rem 1.4rem" onclick="initCompleta()">🔄 Jugar de nuevo</button></div>`;
    if(compSc>0){window.sumarXP(compSc);window.mostrarXP(compSc,'¡Completa terminado!');}
    return;
  }
  const q=compPregs[compIdx];
  z.innerHTML=cabJuego('🔢 Completa la Derivada','completa')+`
    <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text2);margin-bottom:.75rem">
      <span>Pregunta <strong>${compIdx+1}</strong>/${compPregs.length}</span>
      <span style="color:var(--violet4);font-family:'JetBrains Mono',monospace"><strong>${compSc}</strong> XP</span>
    </div>
    <p style="font-size:.95rem;font-weight:700;margin-bottom:.75rem">${q.q}</p>
    <div class="pz-formula" style="font-size:1.1rem;margin-bottom:1rem">${q.formula}</div>
    <div style="font-size:.8rem;color:var(--text3);margin-bottom:.5rem;font-style:italic">💡 Pista: ${q.hint}</div>
    <div style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap">
      <input id="comp-input" class="game-input" type="text" placeholder="Tu respuesta..." style="max-width:250px" onkeydown="if(event.key==='Enter')checkComp()"/>
      <button class="btn-primary" style="width:auto;padding:.65rem 1.25rem" onclick="checkComp()">✓ Verificar</button>
    </div>
    <div id="comp-fb" style="margin-top:.75rem"></div>`;
  setTimeout(()=>{const inp=document.getElementById('comp-input');if(inp)inp.focus();},100);
}
function checkComp(){
  const q=compPregs[compIdx];
  const inp=document.getElementById('comp-input');
  const fb=document.getElementById('comp-fb');
  if(!inp||!fb)return;
  const resp=inp.value.trim().toLowerCase().replace(/\s/g,'');
  const correcto=q.resp.some(r=>r.toLowerCase().replace(/\s/g,'')=== resp);
  if(correcto){
    compSc+=15;
    fb.innerHTML=`<div style="background:rgba(16,185,129,.1);border:1px solid rgba(52,211,153,.3);border-radius:10px;padding:.85rem;color:var(--green2)">✅ ¡Correcto! +15 XP<br><small>Respuesta: ${q.resp[0]}</small></div>`;
  }else{
    fb.innerHTML=`<div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:.85rem;color:#fca5a5">❌ Incorrecto. La respuesta era: <strong>${q.resp[0]}</strong></div>`;
  }
  inp.disabled=true;
  fb.innerHTML+=`<button class="btn-primary" style="margin-top:.75rem;width:auto;padding:.55rem 1.25rem" onclick="compIdx++;renderComp()">Siguiente →</button>`;
}

/* ══════════════════════════════════════════════════════
   JUEGO 8 — EMPAREJA EL LÍMITE (arrastrar/click)
══════════════════════════════════════════════════════ */
const EMP_PARES=[
  {lim:'lím(x→2) 3x+1',val:'7'},
  {lim:'lím(x→0) sin(x)/x',val:'1'},
  {lim:'lím(x→∞) 1/x',val:'0'},
  {lim:'lím(x→1) x²',val:'1'},
  {lim:'lím(x→3) x²−9)/(x−3)',val:'6'},
  {lim:'lím(x→0) x³+5',val:'5'},
];
let empSel=null,empScore=0,empMatched=0,empDone=[];
function initEmpareja(){
  empSel=null;empScore=0;empMatched=0;empDone=[];
  const pares=[...EMP_PARES].sort(()=>Math.random()-.5);
  const vals=[...pares.map(p=>p.val)].sort(()=>Math.random()-.5);
  const z=document.getElementById('zone-empareja');
  z.innerHTML=cabJuego('🔗 Empareja el Límite','empareja')+`
    <p style="font-size:.85rem;color:var(--text2);margin-bottom:1rem">Toca un límite y luego su valor correcto para emparejar.</p>
    <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text2);margin-bottom:.75rem">
      <span>Emparejados: <strong id="emp-ok">0</strong>/${pares.length}</span>
      <span style="color:var(--violet4);font-family:'JetBrains Mono',monospace">XP: <strong id="emp-xp">0</strong></span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem" id="emp-grid"></div>
    <div id="emp-fb" style="margin-top:.75rem"></div>`;
  const grid=document.getElementById('emp-grid');
  // Columna izquierda: límites
  const leftCol=document.createElement('div');leftCol.style.display='flex';leftCol.style.flexDirection='column';leftCol.style.gap='.5rem';
  pares.forEach((p,i)=>{
    const btn=document.createElement('button');
    btn.className='q-opt-btn';btn.style.fontSize='.78rem';btn.style.textAlign='left';btn.style.padding='.6rem .75rem';
    btn.textContent=p.lim;btn.dataset.lim=p.lim;btn.dataset.val=p.val;btn.dataset.side='lim';btn.id='el'+i;
    btn.onclick=()=>clickEmp(btn);leftCol.appendChild(btn);
  });
  // Columna derecha: valores
  const rightCol=document.createElement('div');rightCol.style.display='flex';rightCol.style.flexDirection='column';rightCol.style.gap='.5rem';
  vals.forEach((v,i)=>{
    const btn=document.createElement('button');
    btn.className='q-opt-btn';btn.style.fontSize='1rem';btn.style.fontWeight='800';
    btn.textContent=v;btn.dataset.val=v;btn.dataset.side='val';btn.id='ev'+i;
    btn.onclick=()=>clickEmp(btn);rightCol.appendChild(btn);
  });
  grid.appendChild(leftCol);grid.appendChild(rightCol);
}
function clickEmp(btn){
  if(btn.disabled||btn.classList.contains('correct'))return;
  if(!empSel){
    if(empSel) empSel.classList.remove('correct');
    empSel=btn;btn.style.borderColor='var(--violet3)';btn.style.background='rgba(124,58,237,.15)';
  }else{
    if(empSel===btn){empSel=null;btn.style.borderColor='';btn.style.background='';return;}
    // Verificar par
    let limBtn,valBtn;
    if(empSel.dataset.side==='lim'&&btn.dataset.side==='val'){limBtn=empSel;valBtn=btn;}
    else if(empSel.dataset.side==='val'&&btn.dataset.side==='lim'){limBtn=btn;valBtn=empSel;}
    else{empSel.style.borderColor='';empSel.style.background='';empSel=btn;btn.style.borderColor='var(--violet3)';btn.style.background='rgba(124,58,237,.15)';return;}
    if(limBtn.dataset.val===valBtn.dataset.val){
      limBtn.classList.add('correct');valBtn.classList.add('correct');
      limBtn.disabled=true;valBtn.disabled=true;
      limBtn.style.borderColor='';limBtn.style.background='';
      valBtn.style.borderColor='';valBtn.style.background='';
      empScore+=10;empMatched++;
      document.getElementById('emp-ok').textContent=empMatched;
      document.getElementById('emp-xp').textContent=empScore;
      if(empMatched===EMP_PARES.length){
        window.sumarXP(empScore);window.mostrarXP(empScore,'¡Todos emparejados!');
        document.getElementById('emp-fb').innerHTML=`<div style="background:rgba(16,185,129,.1);border:1px solid rgba(52,211,153,.3);border-radius:10px;padding:.75rem;color:var(--green2)">🎉 ¡Completaste todos los pares! +${empScore} XP<br><button class="btn-primary" style="margin-top:.5rem;width:auto;padding:.45rem 1rem;font-size:.82rem" onclick="initEmpareja()">🔄 Jugar de nuevo</button></div>`;
      }
    }else{
      limBtn.style.background='rgba(239,68,68,.1)';valBtn.style.background='rgba(239,68,68,.1)';
      setTimeout(()=>{limBtn.style.background='';limBtn.style.borderColor='';valBtn.style.background='';valBtn.style.borderColor='';},700);
    }
    empSel=null;
  }
}

/* ══════════════════════════════════════════════════════
   JUEGO 9 — CONSTRUCTOR DE CADENA
══════════════════════════════════════════════════════ */
const CADENA_QS=[
  {func:'sin(x²)',exterior:'sin(·)',interior:'x²',derExt:'cos(u)',derInt:'2x',resp:'2x·cos(x²)',pasos:['Exterior: sin(·) → derivada exterior: cos(·)','Interior: x² → derivada interior: 2x','Multiplicar: cos(x²) · 2x = 2x·cos(x²)']},
  {func:'exp(x³)',exterior:'exp(·)',interior:'x³',derExt:'exp(u)',derInt:'3x²',resp:'3x²·exp(x³)',pasos:['Exterior: exp(·) → derivada exterior: exp(·) (igual)','Interior: x³ → derivada interior: 3x²','Multiplicar: exp(x³) · 3x² = 3x²·exp(x³)']},
  {func:'ln(x²+1)',exterior:'ln(·)',interior:'x²+1',derExt:'1/u',derInt:'2x',resp:'2x/(x²+1)',pasos:['Exterior: ln(·) → derivada exterior: 1/u = 1/(x²+1)','Interior: x²+1 → derivada interior: 2x','Multiplicar: 2x/(x²+1)']},
  {func:'cos(2x)',exterior:'cos(·)',interior:'2x',derExt:'-sin(u)',derInt:'2',resp:'-2·sin(2x)',pasos:['Exterior: cos(·) → derivada exterior: -sin(·)','Interior: 2x → derivada interior: 2','Multiplicar: -sin(2x) · 2 = -2·sin(2x)']},
  {func:'(x²+3)⁴',exterior:'(·)⁴',interior:'x²+3',derExt:'4(u)³',derInt:'2x',resp:'8x·(x²+3)³',pasos:['Exterior: (·)⁴ → derivada exterior: 4(·)³ = 4(x²+3)³','Interior: x²+3 → derivada interior: 2x','Multiplicar: 4(x²+3)³ · 2x = 8x(x²+3)³']},
];
let cadIdx,cadSc,cadEtapa,cadQ;
function initCadena(){cadIdx=0;cadSc=0;showCadena();}
function showCadena(){
  const z=document.getElementById('zone-cadena');
  if(cadIdx>=CADENA_QS.length){
    z.innerHTML=cabJuego('⛓️ Constructor de Cadena','cadena')+`<div style="text-align:center;padding:1.5rem"><div style="font-size:2.5rem">⛓️</div><h3 style="font-family:'Orbitron',sans-serif;font-size:.95rem;margin:.5rem 0">¡Completado!</h3><div style="font-size:1.8rem;font-weight:700;font-family:'JetBrains Mono',monospace;background:linear-gradient(135deg,var(--gold),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.75rem">${cadSc} XP</div><button class="btn-primary" style="width:auto;padding:.6rem 1.4rem" onclick="initCadena()">🔄 Jugar de nuevo</button></div>`;
    if(cadSc>0){window.sumarXP(cadSc);window.mostrarXP(cadSc,'¡Cadena completada!');}
    return;
  }
  cadQ=CADENA_QS[cadIdx];cadEtapa=0;renderCadena();
}
function renderCadena(){
  const z=document.getElementById('zone-cadena');
  const q=cadQ;
  const etapaDesc=['¿Cuál es la función EXTERIOR?','¿Cuál es la derivada del INTERIOR?','¿Cuál es el resultado final multiplicando?'];
  const opciones=[
    [[q.exterior,'(·)²','ln(·)','(·)³'].sort(()=>Math.random()-.5), q.exterior],
    [[q.derInt,'3x','1','x'].sort(()=>Math.random()-.5), q.derInt],
    [[q.resp,'2x·sin(x²)','cos(x)·ln(x)','x²·eˣ'].sort(()=>Math.random()-.5), q.resp],
  ];
  const [opts,correcta]=opciones[cadEtapa];
  z.innerHTML=cabJuego('⛓️ Constructor de Cadena','cadena')+`
    <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text2);margin-bottom:.75rem">
      <span>Función <strong>${cadIdx+1}</strong>/${CADENA_QS.length} · Paso <strong>${cadEtapa+1}</strong>/3</span>
      <span style="color:var(--violet4);font-family:'JetBrains Mono',monospace"><strong>${cadSc}</strong> XP</span>
    </div>
    <div style="font-size:.82rem;color:var(--cyan2);margin-bottom:.5rem;font-family:'JetBrains Mono',monospace">Aplicando la regla de la cadena a:</div>
    <div class="pz-formula" style="font-size:1.2rem;margin-bottom:.75rem">f(x) = ${q.func}</div>
    ${cadEtapa>0?`<div style="font-size:.8rem;color:var(--text3);margin-bottom:.5rem">✅ Exterior: ${q.exterior} → d/du: ${q.derExt}</div>`:''}
    <p style="font-size:.95rem;font-weight:700;margin-bottom:.75rem">${etapaDesc[cadEtapa]}</p>
    <div class="q-opts-grid" id="cad-opts"></div>
    <div id="cad-fb" style="margin-top:.75rem"></div>`;
  const el=document.getElementById('cad-opts');
  opts.forEach(op=>{
    const btn=document.createElement('button');
    btn.className='q-opt-btn';btn.style.fontFamily="'JetBrains Mono',monospace";btn.textContent=op;
    btn.onclick=()=>ansCadena(op,correcta);el.appendChild(btn);
  });
}
function ansCadena(resp,correcta){
  document.querySelectorAll('#cad-opts .q-opt-btn').forEach(b=>{b.disabled=true;if(b.textContent.trim()===correcta)b.classList.add('correct');else if(b.textContent.trim()===resp&&resp!==correcta)b.classList.add('wrong');});
  const fb=document.getElementById('cad-fb');
  if(resp===correcta){
    cadSc+=8;
    const msgs=['✅ ¡Correcto! Identificaste la función exterior.','✅ ¡Correcto! Calculaste bien la derivada interior.','✅ ¡Correcto! Aplicaste la regla de la cadena perfectamente.'];
    fb.innerHTML=`<div style="background:rgba(16,185,129,.1);border:1px solid rgba(52,211,153,.3);border-radius:10px;padding:.75rem;color:var(--green2)">${msgs[cadEtapa]} +8 XP</div>`;
  }else{
    const msgs=[`La exterior es: ${cadQ.exterior}`,`La derivada interior es: ${cadQ.derInt}`,`El resultado final es: ${cadQ.resp}`];
    fb.innerHTML=`<div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:.75rem;color:#fca5a5">❌ ${msgs[cadEtapa]}</div>`;
  }
  const siguiente= cadEtapa<2 ? ()=>{cadEtapa++;renderCadena();} : ()=>{cadIdx++;showCadena();};
  fb.innerHTML+=`<button class="btn-primary" style="margin-top:.75rem;width:auto;padding:.55rem 1.25rem" onclick="(${siguiente.toString()})()">Siguiente →</button>`;
}

/* ══════════════════════════════════════════════════════
   JUEGO 10 — CRUCIGRAMA DE CÁLCULO
══════════════════════════════════════════════════════ */
const CRUC={
  horizontal:[
    {n:1,pista:'Derivada de sin(x)',resp:'COS',r:0,c:0},
    {n:3,pista:'Derivada de eˣ (en español)',resp:'EXPONENCIAL',r:2,c:0},
    {n:5,pista:'Regla para f(g(x)): regla de la ___',resp:'CADENA',r:4,c:1},
  ],
  vertical:[
    {n:1,pista:'lím(x→0) sin(x)/x = ___ (en letras)',resp:'UNO',r:0,c:0},
    {n:2,pista:'d/dx[constante] = ___',resp:'CERO',r:0,c:4},
    {n:4,pista:'Regla para f/g',resp:'COCIENTE',r:3,c:3},
  ]
};
let crucRespuestas={};
function initCrucigrama(){
  crucRespuestas={};
  const z=document.getElementById('zone-crucigrama');
  z.innerHTML=cabJuego('📰 Crucigrama de Cálculo','crucigrama')+`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:start">
      <div>
        <div style="font-size:.8rem;color:var(--text2);margin-bottom:.75rem;font-weight:700">HORIZONTAL</div>
        ${CRUC.horizontal.map(p=>`
          <div style="margin-bottom:.85rem">
            <div style="font-size:.78rem;color:var(--violet4);font-family:'JetBrains Mono',monospace;margin-bottom:.3rem">${p.n} →  ${p.pista}</div>
            <input id="ch${p.n}" class="game-input" type="text" maxlength="${p.resp.length}" placeholder="${'_'.repeat(p.resp.length)}" style="max-width:200px;text-transform:uppercase;letter-spacing:.15em;font-weight:700" oninput="this.value=this.value.toUpperCase()"/>
          </div>`).join('')}
        <div style="font-size:.8rem;color:var(--text2);margin-bottom:.75rem;font-weight:700;margin-top:.5rem">VERTICAL</div>
        ${CRUC.vertical.map(p=>`
          <div style="margin-bottom:.85rem">
            <div style="font-size:.78rem;color:var(--cyan2);font-family:'JetBrains Mono',monospace;margin-bottom:.3rem">${p.n} ↓  ${p.pista}</div>
            <input id="cv${p.n}" class="game-input" type="text" maxlength="${p.resp.length}" placeholder="${'_'.repeat(p.resp.length)}" style="max-width:200px;text-transform:uppercase;letter-spacing:.15em;font-weight:700" oninput="this.value=this.value.toUpperCase()"/>
          </div>`).join('')}
        <button class="btn-primary" style="width:100%;margin-top:.5rem" onclick="checkCrucigrama()">✓ Verificar crucigrama</button>
      </div>
      <div id="cruc-fb"></div>
    </div>`;
}
function checkCrucigrama(){
  let correctas=0,total=0;
  const fb=document.getElementById('cruc-fb');
  let html='<div style="font-weight:700;margin-bottom:.75rem;font-family:\'Orbitron\',sans-serif;font-size:.85rem">Resultados:</div>';
  CRUC.horizontal.forEach(p=>{
    total++;
    const val=(document.getElementById('ch'+p.n)?.value||'').trim().toUpperCase();
    const ok=val===p.resp;
    if(ok)correctas++;
    html+=`<div style="font-size:.82rem;margin-bottom:.4rem;color:${ok?'var(--green2)':'#fca5a5'}">${ok?'✅':'❌'} ${p.n}→ Resp: <strong>${p.resp}</strong></div>`;
  });
  CRUC.vertical.forEach(p=>{
    total++;
    const val=(document.getElementById('cv'+p.n)?.value||'').trim().toUpperCase();
    const ok=val===p.resp;
    if(ok)correctas++;
    html+=`<div style="font-size:.82rem;margin-bottom:.4rem;color:${ok?'var(--green2)':'#fca5a5'}">${ok?'✅':'❌'} ${p.n}↓ Resp: <strong>${p.resp}</strong></div>`;
  });
  const xp=correctas*12;
  html+=`<div style="margin-top:.75rem;padding:.75rem;background:rgba(124,58,237,.1);border:1px solid rgba(167,139,250,.3);border-radius:10px;text-align:center"><span style="font-family:'JetBrains Mono',monospace;font-size:1.2rem;color:var(--violet4)">${correctas}/${total} correctas → +${xp} XP</span></div>`;
  html+=`<button class="btn-secondary" style="width:100%;margin-top:.75rem" onclick="initCrucigrama()">🔄 Nuevo crucigrama</button>`;
  fb.innerHTML=html;
  if(xp>0){window.sumarXP(xp);window.mostrarXP(xp,'¡Crucigrama resuelto!');}
}
