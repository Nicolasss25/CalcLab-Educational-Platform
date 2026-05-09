/* ═══════════════════════════════════════════════════════
   CalcLab · prueba.js
   Sistema de prueba por niveles con ranking galáctico.
   ═══════════════════════════════════════════════════════ */

let qzNivel   = 1;
let qzIdx     = 0;
let qzXP      = 0;
let qzPregs   = [];
let qzRespondido = false;

/* ═══════════════════════════════════════════════════════
   BANCO DE PREGUNTAS
═══════════════════════════════════════════════════════ */
const BANCO_QUIZ = {
  1: [
    { q:'¿Cuál es la derivada de f(x) = x⁴?',
      formula:'f(x) = x⁴',
      opts:["f'(x) = 4x³","f'(x) = x³","f'(x) = 4x⁴","f'(x) = 4"],
      ok:0, exp:'📌 Regla de la potencia: d/dx[xⁿ] = n·xⁿ⁻¹\nd/dx[x⁴] = 4·x³' },
    { q:'¿Cuánto vale el límite?',
      formula:'lím (x→3) de  2x + 1',
      opts:['7','6','8','5'], ok:0,
      exp:'📌 Sustitución directa: f(3) = 2(3)+1 = 7' },
    { q:'¿Cuál es la derivada de una constante?',
      formula:'f(x) = 12',
      opts:["f'(x) = 0","f'(x) = 12","f'(x) = 1","f'(x) = 12x"],
      ok:0, exp:'📌 d/dx[c] = 0. La derivada de cualquier número constante es siempre cero.' },
    { q:'¿Cuál es la derivada de f(x) = x?',
      formula:'f(x) = x',
      opts:["f'(x) = 1","f'(x) = x","f'(x) = 0","f'(x) = 2"],
      ok:0, exp:'📌 d/dx[x¹] = 1·x⁰ = 1' },
    { q:'¿Cuánto vale el límite?',
      formula:'lím (x→2) de  x² + 1',
      opts:['5','4','6','3'], ok:0,
      exp:'📌 f(2) = 4+1 = 5. Sustitución directa en una función continua.' },
    { q:'¿Cuál es la derivada de f(x) = 3x²?',
      formula:'f(x) = 3x²',
      opts:["f'(x) = 6x","f'(x) = 3x","f'(x) = 6x²","f'(x) = 6"],
      ok:0, exp:'📌 d/dx[3x²] = 3·2·x¹ = 6x' },
    { q:'¿Cuál es la derivada de sin(x)?',
      formula:'f(x) = sin(x)',
      opts:['cos(x)','-cos(x)','-sin(x)','tan(x)'],
      ok:0, exp:'📌 Derivada fundamental: d/dx[sin(x)] = cos(x)' },
    { q:'¿Cuánto vale?',
      formula:'lím (x→0) de  x³ + 5',
      opts:['5','0','3','1'], ok:0,
      exp:'📌 f(0) = 0+5 = 5. Sustitución directa.' },
  ],
  2: [
    { q:'¿Cuál es la derivada usando la regla del producto?',
      formula:'f(x) = x² · sin(x)',
      opts:["2x·sin(x)+x²·cos(x)","2x·cos(x)","x²·cos(x)","2x·sin(x)"],
      ok:0, exp:'📌 Regla del producto (u·v)\'=u\'v+uv\':\nu=x², u\'=2x  |  v=sin(x), v\'=cos(x)\n→ 2x·sin(x) + x²·cos(x)' },
    { q:'¿Qué indeterminación tiene al sustituir x=1?',
      formula:'lím (x→1) de  (x²−1)/(x−1)',
      opts:['0/0','∞/∞','0·∞','Ninguna'],
      ok:0, exp:'📌 Sustituyendo: (1−1)/(1−1) = 0/0. Hay que factorizar.' },
    { q:'¿Cuánto vale el límite tras factorizar?',
      formula:'lím (x→1) de  (x²−1)/(x−1)',
      opts:['2','0','1','∞'],
      ok:0, exp:'📌 x²−1=(x+1)(x−1). Cancelar (x−1) → x+1. En x=1: 1+1=2' },
    { q:'¿Cuál es la derivada de eˣ?',
      formula:'f(x) = eˣ',
      opts:['eˣ','x·eˣ⁻¹','eˣ⁻¹','1/eˣ'],
      ok:0, exp:'📌 d/dx[eˣ] = eˣ. La función exponencial es su propia derivada.' },
    { q:'¿Cuál es la derivada de ln(x)?',
      formula:'f(x) = ln(x)',
      opts:['1/x','ln(x)/x','x','1/ln(x)'],
      ok:0, exp:'📌 d/dx[ln(x)] = 1/x (para x>0). Derivada fundamental.' },
    { q:'¿Cuánto vale el límite al infinito?',
      formula:'lím (x→∞) de  1/x',
      opts:['0','1','∞','-1'],
      ok:0, exp:'📌 Cuando x→∞, el denominador crece → 1/x→0' },
    { q:'¿Cuál es la derivada de cos(x)?',
      formula:'f(x) = cos(x)',
      opts:['-sin(x)','sin(x)','-cos(x)','cos(x)'],
      ok:0, exp:'📌 d/dx[cos(x)] = -sin(x). Atención al signo negativo.' },
    { q:'¿Cuánto vale el límite al infinito?',
      formula:'lím (x→∞) de  (2x+1)/(x+3)',
      opts:['2','0','∞','1/3'],
      ok:0, exp:'📌 Grados iguales (1=1). Coeficientes líderes: 2/1 = 2.' },
  ],
  3: [
    { q:'¿Cuál es la derivada aplicando la regla de la cadena?',
      formula:"f(x) = sin(x²+1)",
      opts:["2x·cos(x²+1)","cos(x²+1)","2x·sin(x²+1)","-2x·cos(x²+1)"],
      ok:0, exp:'📌 Cadena: d/dx[sin(u)] = cos(u)·u\'\nExterior: sin → cos(x²+1)\nInterior: u=x²+1 → u\'=2x\n→ 2x·cos(x²+1)' },
    { q:'¿Cuánto vale el límite notable?',
      formula:'lím (x→0) de  sin(x)/x',
      opts:['1','0','∞','No existe'],
      ok:0, exp:'📌 Límite fundamental trigonométrico: lím(x→0) sin(x)/x = 1' },
    { q:'¿Cuál es la derivada usando la regla del cociente?',
      formula:'f(x) = sin(x)/x',
      opts:["(x·cos(x)−sin(x))/x²","cos(x)/1","cos(x)/x","-sin(x)/x²"],
      ok:0, exp:'📌 (u/v)\'=(u\'v−uv\')/v²\nu=sin(x), u\'=cos(x)  |  v=x, v\'=1\n→ (cos(x)·x − sin(x)·1)/x²' },
    { q:'¿Cuál es la segunda derivada?',
      formula:'f(x) = x⁴ − 3x² + 5',
      opts:["12x²−6","4x³−6x","12x³−6x","4x²−6"],
      ok:0, exp:'📌 f\'(x)=4x³−6x\nf\'\'(x)=12x²−6\nAplicar regla de la potencia dos veces.' },
    { q:'¿Cuánto vale el límite al infinito?',
      formula:'lím (x→∞) de  (3x²+2x)/(x²−5)',
      opts:['3','0','∞','2'],
      ok:0, exp:'📌 Grados iguales (2=2). Coeficientes líderes: 3/1 = 3.' },
    { q:'¿Cuál es la derivada usando la cadena?',
      formula:'f(x) = exp(x²)',
      opts:["2x·exp(x²)","exp(x²)","x²·exp(x²)","2·exp(x²)"],
      ok:0, exp:'📌 d/dx[eᵘ]=eᵘ·u\'\nu=x², u\'=2x\n→ 2x·exp(x²)' },
    { q:'¿Qué regla se aplica a esta función?',
      formula:"f(x) = (x²+1)⁵",
      opts:["Cadena: n·uⁿ⁻¹·u'","Potencia simple","Producto","Cociente"],
      ok:0, exp:'📌 No es potencia simple porque la base no es x puro. Es una composición → Regla de la cadena: d/dx[uⁿ]=n·uⁿ⁻¹·u\'' },
    { q:'¿Cuánto vale el límite?',
      formula:'lím (x→1) de  (x³−1)/(x−1)',
      opts:['3','0','1','∞'],
      ok:0, exp:'📌 x³−1=(x−1)(x²+x+1). Cancelar (x−1).\nlím(x→1)(x²+x+1)=1+1+1=3' },
  ],
  4: [
    { q:'¿Cuál es la derivada implícita dy/dx?',
      formula:'x² + y² = 25',
      opts:['dy/dx = −x/y','dy/dx = x/y','dy/dx = −y/x','dy/dx = y/x'],
      ok:0, exp:'📌 Derivar ambos lados respecto a x:\n2x + 2y·(dy/dx) = 0\n→ dy/dx = −x/y' },
    { q:'¿Cuánto vale el límite?',
      formula:'lím (x→∞) de  (5x³−2x)/(x³+1)',
      opts:['5','0','∞','−2'],
      ok:0, exp:'📌 Grados iguales (3=3). Coeficientes líderes: 5/1 = 5.' },
    { q:'¿Cuál es la derivada del arcotangente?',
      formula:'f(x) = arctan(x)',
      opts:['1/(1+x²)','1/√(1−x²)','−1/(1+x²)','1/cos²(x)'],
      ok:0, exp:'📌 Fórmula fundamental: d/dx[arctan(x)] = 1/(1+x²)' },
    { q:'¿Cuál es la derivada con la cadena?',
      formula:'f(x) = ln(x²+1)',
      opts:['2x/(x²+1)','1/(x²+1)','2x·ln(x²+1)','1/x'],
      ok:0, exp:'📌 d/dx[ln(u)] = u\'/u\nu=x²+1, u\'=2x → 2x/(x²+1)' },
    { q:'¿Cuánto vale el límite notable?',
      formula:'lím (x→0) de  (1−cos x)/x²',
      opts:['1/2','0','1','∞'],
      ok:0, exp:'📌 Usando identidad: 1−cosx = 2sin²(x/2)\n→ (1/2)[sin(x/2)/(x/2)]² → (1/2)·1² = 1/2' },
    { q:'¿Cuál es la derivada compuesta doble?',
      formula:'f(x) = exp(sin(x))',
      opts:["cos(x)·exp(sin(x))","exp(sin(x))","sin(x)·exp(cos(x))","-sin(x)·exp(sin(x))"],
      ok:0, exp:'📌 Cadena doble: d/dx[eᵘ]=eᵘ·u\'  con u=sin(x)\nu\'=cos(x)\n→ cos(x)·exp(sin(x))' },
    { q:'¿Cuál es la derivada del producto triple?',
      formula:'f(x) = x · eˣ · sin(x)',
      opts:["eˣ·sin(x)+x·eˣ·sin(x)+x·eˣ·cos(x)","eˣ(sin x+cos x)","x·eˣ·cos(x)","eˣ·sin(x)+x·eˣ·cos(x)"],
      ok:0, exp:'📌 (uvw)\'=u\'vw+uv\'w+uvw\'\nu=x,u\'=1 | v=eˣ,v\'=eˣ | w=sin(x),w\'=cos(x)\n→ eˣ·sin(x)+x·eˣ·sin(x)+x·eˣ·cos(x)' },
    { q:'¿Cuánto vale el límite lateral?',
      formula:'lím (x→0⁺) de  x·ln(x)',
      opts:['0','−∞','1','∞'],
      ok:0, exp:'📌 Forma 0·(−∞). Reescribir: ln(x)/(1/x) → −∞/∞\nDividir: (1/x)/(−1/x²) = −x → 0 cuando x→0⁺' },
  ]
};

/* ═══════════════════════════════════════════════════════
   RENDERIZAR SECCIÓN
═══════════════════════════════════════════════════════ */
function initPrueba() {
  const cont = document.getElementById('prueba-content');
  if (!cont) return;

  cont.innerHTML = `
    <div class="quiz-wrap">
      <div class="quiz-left">

        <div id="qz-start">
          <div class="space-card">
            <h3 style="font-family:'Orbitron',sans-serif;font-size:.95rem;letter-spacing:.04em;margin-bottom:.6rem">
              🚀 Selecciona un nivel para comenzar
            </h3>
            <p style="color:var(--text2);font-size:.85rem;margin-bottom:1.25rem;line-height:1.6">
              Cada prueba tiene 5 preguntas. Responde correctamente para ganar XP y subir en el ranking galáctico.
            </p>
            <div class="lvl-grid">
              <button class="lvl-btn lv1" onclick="iniciarPrueba(1)">🟢 Nivel 1<br><small>Básico · 10 XP</small></button>
              <button class="lvl-btn lv2" onclick="iniciarPrueba(2)">🟡 Nivel 2<br><small>Medio · 20 XP</small></button>
              <button class="lvl-btn lv3" onclick="iniciarPrueba(3)">🟠 Nivel 3<br><small>Avanzado · 30 XP</small></button>
              <button class="lvl-btn lv4" onclick="iniciarPrueba(4)">🔴 Nivel 4<br><small>Experto · 50 XP</small></button>
            </div>
          </div>
        </div>

        <div id="qz-play" style="display:none">
          <div class="quiz-bar">
            <span style="font-family:'JetBrains Mono',monospace">Q <strong id="q-num">1</strong>/5</span>
            <span class="q-lv-badge" id="q-lv-badge">Nivel 1</span>
            <span style="font-family:'JetBrains Mono',monospace;color:var(--gold2)">+<strong id="q-xp-ses">0</strong> XP</span>
          </div>
          <div class="q-dots" id="q-dots"></div>
          <div class="space-card">
            <p class="q-text" id="q-text"></p>
            <div class="q-formula-box" id="q-formula"></div>
            <div class="q-opts-grid" id="q-opts"></div>
            <div class="q-fb" id="q-fb"></div>
            <button class="btn-primary" id="btn-next" style="display:none;margin-top:1rem" onclick="siguienteQ()">
              Siguiente →
            </button>
          </div>
        </div>

        <div id="qz-end" style="display:none">
          <div class="space-card" style="text-align:center;padding:2.5rem">
            <div style="font-size:3.5rem;margin-bottom:.5rem">🏆</div>
            <h2 style="font-family:'Orbitron',sans-serif;font-size:1.1rem;letter-spacing:.04em;margin-bottom:.4rem">
              ¡Prueba completada!
            </h2>
            <div class="final-xp" id="final-xp"></div>
            <p id="final-msg" style="color:var(--text2);margin:.75rem 0 1.5rem;font-size:.9rem;line-height:1.6"></p>
            <div style="display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap">
              <button class="btn-primary" onclick="reiniciarPrueba()">Jugar de nuevo</button>
              <button class="btn-secondary" onclick="volverStart()">Cambiar nivel</button>
            </div>
          </div>
        </div>
      </div>

      <div class="quiz-right">
        <div class="space-card">
          <h3 style="font-family:'Orbitron',sans-serif;font-size:.88rem;letter-spacing:.06em;margin-bottom:1rem">
            🌌 RANKING GALÁCTICO
          </h3>
          <ol class="rank-list" id="rank-list">
            <li style="color:var(--text3);font-size:.82rem;padding:.4rem">
              Completa una prueba para aparecer aquí
            </li>
          </ol>
        </div>
      </div>
    </div>`;

  renderizarRanking();
}

/* ─── INICIAR ─── */
function iniciarPrueba(nivel) {
  qzNivel      = nivel;
  qzIdx        = 0;
  qzXP         = 0;
  qzRespondido = false;

  const banco = [...BANCO_QUIZ[nivel]].sort(() => Math.random() - 0.5);
  qzPregs     = banco.slice(0, 5);

  document.getElementById('qz-start').style.display = 'none';
  document.getElementById('qz-end').style.display   = 'none';
  document.getElementById('qz-play').style.display  = '';
  document.getElementById('q-lv-badge').textContent  = 'Nivel ' + nivel;

  renderizarDots();
  cargarPregunta();
}

/* ─── CARGAR PREGUNTA ─── */
function cargarPregunta() {
  const preg = qzPregs[qzIdx];
  qzRespondido = false;

  document.getElementById('q-num').textContent     = qzIdx + 1;
  document.getElementById('q-xp-ses').textContent  = qzXP;
  document.getElementById('q-text').textContent    = preg.q;
  document.getElementById('q-formula').textContent = preg.formula;

  const fb = document.getElementById('q-fb');
  fb.className = 'q-fb';
  fb.innerHTML = '';
  document.getElementById('btn-next').style.display = 'none';

  renderizarDots();

  const optsEl = document.getElementById('q-opts');
  optsEl.innerHTML = '';
  preg.opts.forEach((op, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-opt-btn';
    btn.textContent = op;
    btn.onclick = () => responderQ(i);
    optsEl.appendChild(btn);
  });
}

/* ─── RESPONDER ─── */
function responderQ(idx) {
  if (qzRespondido) return;
  qzRespondido = true;

  const preg   = qzPregs[qzIdx];
  const xpTabla = [0, 10, 20, 30, 50];
  const xp     = xpTabla[qzNivel];
  const opts   = document.querySelectorAll('.q-opt-btn');

  opts.forEach(b => b.disabled = true);

  const fb = document.getElementById('q-fb');

  if (idx === preg.ok) {
    opts[idx].classList.add('correct');
    qzXP += xp;
    document.getElementById('q-xp-ses').textContent = qzXP;
    fb.className = 'q-fb show ok';
    fb.innerHTML = '✅ ¡Correcto! +' + xp + ' XP<br><small style="white-space:pre-line;font-family:\'JetBrains Mono\',monospace">' + preg.exp + '</small>';
    window.mostrarXP(xp, '¡Correcto!');
  } else {
    opts[idx].classList.add('wrong');
    opts[preg.ok].classList.add('correct');
    fb.className = 'q-fb show err';
    fb.innerHTML = '❌ Incorrecto. Era: <strong>' + preg.opts[preg.ok] + '</strong><br><small style="white-space:pre-line;font-family:\'JetBrains Mono\',monospace">' + preg.exp + '</small>';
  }

  if (qzIdx < 4) {
    document.getElementById('btn-next').style.display = '';
  } else {
    setTimeout(terminarPrueba, 2000);
  }
}

/* ─── SIGUIENTE ─── */
function siguienteQ() {
  qzIdx++;
  if (qzIdx >= qzPregs.length) { terminarPrueba(); return; }
  cargarPregunta();
}

/* ─── TERMINAR ─── */
function terminarPrueba() {
  document.getElementById('qz-play').style.display = 'none';
  document.getElementById('qz-end').style.display  = '';

  document.getElementById('final-xp').textContent = '+' + qzXP + ' XP';

  const max  = [0, 50, 100, 150, 250][qzNivel];
  const pct  = qzXP / max;
  const msgs = [
    '¡Sigue estudiando! Cada intento cuenta. 💪',
    'Buen intento. Repasa los conceptos e inténtalo de nuevo.',
    '¡Bien! Vas mejorando. Sigue practicando.',
    '¡Excelente resultado! Casi perfecto.',
    '🌌 ¡Perfecto! Dominas este nivel como un experto galáctico.'
  ];
  const mIdx = pct === 0 ? 0 : pct < 0.4 ? 1 : pct < 0.7 ? 2 : pct < 1 ? 3 : 4;
  document.getElementById('final-msg').textContent = msgs[mIdx];

  // Sumar al score global
  window.sumarXP(qzXP);

  // Guardar ranking
  const nombre = document.getElementById('pilot-name')?.value?.trim() || 'Explorador';
  guardarRanking(nombre, qzXP);
  renderizarRanking();
}

/* ─── REINICIAR ─── */
function reiniciarPrueba() {
  document.getElementById('qz-end').style.display  = 'none';
  iniciarPrueba(qzNivel);
}

function volverStart() {
  document.getElementById('qz-end').style.display  = 'none';
  document.getElementById('qz-play').style.display = 'none';
  document.getElementById('qz-start').style.display = '';
}

/* ─── DOTS ─── */
function renderizarDots() {
  const el = document.getElementById('q-dots');
  if (!el) return;
  el.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const d = document.createElement('div');
    d.className = 'q-dot' +
      (i < qzIdx ? ' done' : i === qzIdx ? ' current' : '');
    el.appendChild(d);
  }
}

/* ═══════════════════════════════════════════════════════
   RANKING (localStorage)
═══════════════════════════════════════════════════════ */
function guardarRanking(nombre, xp) {
  let rank = JSON.parse(localStorage.getItem('calclab_rank') || '[]');
  const i  = rank.findIndex(r => r.nombre === nombre);
  if (i >= 0) rank[i].xp += xp;
  else rank.push({ nombre, xp });
  rank.sort((a, b) => b.xp - a.xp);
  localStorage.setItem('calclab_rank', JSON.stringify(rank));
}

function renderizarRanking() {
  const rank = JSON.parse(localStorage.getItem('calclab_rank') || '[]');
  const el   = document.getElementById('rank-list');
  if (!el) return;

  if (!rank.length) {
    el.innerHTML = '<li style="color:var(--text3);font-size:.82rem;padding:.4rem">Completa una prueba para aparecer aquí</li>';
    return;
  }

  const medallas = ['🥇','🥈','🥉'];
  el.innerHTML = rank.slice(0, 10).map((r, i) => `
    <li class="rank-item">
      <div class="rank-pos">${i < 3 ? medallas[i] : i + 1}</div>
      <div class="rank-name">${r.nombre}</div>
      <div class="rank-score">${r.xp} XP</div>
    </li>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  // El ranking se renderiza cuando se entra a la sección
});
