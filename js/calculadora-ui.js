/* ═══════════════════════════════════════════════════════
   CalcLab · calculadora-ui.js  (v2)
   Teclado físico para límites y derivadas.
   — Límites: sin selector de tipo, solo punto
   — Derivadas: 6 funciones trig, sin arcsin/arccos/arctan
   ═══════════════════════════════════════════════════════ */

const CalcUI = {
  limites:   { expr: '' },
  derivadas: { expr: '', tipo: 'primera' },
};

/* ══════════════════════════════════════
   LAYOUTS DE TECLAS
══════════════════════════════════════ */
const TECLAS_LIMITES = [
  // Funciones trig (las 6 estándar)
  [
    { l:'sin', cls:'ckey-fn', v:'sin(' },
    { l:'cos', cls:'ckey-fn', v:'cos(' },
    { l:'tan', cls:'ckey-fn', v:'tan(' },
    { l:'csc', cls:'ckey-fn', v:'csc(' },
    { l:'sec', cls:'ckey-fn', v:'sec(' },
    { l:'cot', cls:'ckey-fn', v:'cot(' },
  ],
  // Otras funciones
  [
    { l:'ln',   cls:'ckey-fn',  v:'ln(' },
    { l:'exp',  cls:'ckey-fn',  v:'exp(' },
    { l:'√',    cls:'ckey-fn',  v:'sqrt(' },
    { l:'|x|',  cls:'ckey-fn',  v:'abs(' },
    { l:'π',    cls:'ckey-var', v:'pi' },
    { l:'∞',    cls:'ckey-var', v:'inf' },
  ],
  // Variable y potencias
  [
    { l:'x',   cls:'ckey-var', v:'x' },
    { l:'x²',  cls:'ckey-fn',  v:'x^2' },
    { l:'x³',  cls:'ckey-fn',  v:'x^3' },
    { l:'xⁿ',  cls:'ckey-fn',  v:'x^' },
    { l:'(',   cls:'ckey-op',  v:'(' },
    { l:')',   cls:'ckey-op',  v:')' },
  ],
  // Operadores
  [
    { l:'+',   cls:'ckey-op',  v:'+' },
    { l:'−',   cls:'ckey-op',  v:'-' },
    { l:'×',   cls:'ckey-op',  v:'*' },
    { l:'÷',   cls:'ckey-op',  v:'/' },
    { l:'^',   cls:'ckey-op',  v:'^' },
    { l:'.',   cls:'ckey-num', v:'.' },
  ],
  // 7 8 9
  [
    { l:'7', cls:'ckey-num', v:'7' },
    { l:'8', cls:'ckey-num', v:'8' },
    { l:'9', cls:'ckey-num', v:'9' },
    { l:'⌫', cls:'ckey-back',  v:'__back__', w:1 },
    { l:'C',  cls:'ckey-clear', v:'__clear__', w:2 },
  ],
  // 4 5 6
  [
    { l:'4', cls:'ckey-num', v:'4' },
    { l:'5', cls:'ckey-num', v:'5' },
    { l:'6', cls:'ckey-num', v:'6' },
    { l:'e', cls:'ckey-var', v:'e', w:3 },
  ],
  // 1 2 3
  [
    { l:'1', cls:'ckey-num', v:'1' },
    { l:'2', cls:'ckey-num', v:'2' },
    { l:'3', cls:'ckey-num', v:'3' },
    { l:'(−)', cls:'ckey-op', v:'-', w:3 },
  ],
  // 0 y CALCULAR
  [
    { l:'0', cls:'ckey-num', v:'0', w:2 },
    { l:'inf', cls:'ckey-var', v:'inf', w:1 },
    { l:'= CALCULAR LÍMITE', cls:'ckey-calc', v:'__calc__', w:3 },
  ],
];

const TECLAS_DERIVADAS = [
  // 6 funciones trigonométricas
  [
    { l:'sin', cls:'ckey-fn', v:'sin(' },
    { l:'cos', cls:'ckey-fn', v:'cos(' },
    { l:'tan', cls:'ckey-fn', v:'tan(' },
    { l:'csc', cls:'ckey-fn', v:'csc(' },
    { l:'sec', cls:'ckey-fn', v:'sec(' },
    { l:'cot', cls:'ckey-fn', v:'cot(' },
  ],
  // Otras funciones
  [
    { l:'ln',   cls:'ckey-fn',  v:'ln(' },
    { l:'exp',  cls:'ckey-fn',  v:'exp(' },
    { l:'√',    cls:'ckey-fn',  v:'sqrt(' },
    { l:'log',  cls:'ckey-fn',  v:'log(' },
    { l:'|x|',  cls:'ckey-fn',  v:'abs(' },
    { l:'π',    cls:'ckey-var', v:'pi' },
  ],
  // Variables y potencias
  [
    { l:'x',   cls:'ckey-var', v:'x' },
    { l:'y',   cls:'ckey-var', v:'y' },
    { l:'x²',  cls:'ckey-fn',  v:'x^2' },
    { l:'x³',  cls:'ckey-fn',  v:'x^3' },
    { l:'xⁿ',  cls:'ckey-fn',  v:'x^' },
    { l:'eˣ',  cls:'ckey-fn',  v:'exp(x)' },
  ],
  // Operadores
  [
    { l:'+',   cls:'ckey-op',  v:'+' },
    { l:'−',   cls:'ckey-op',  v:'-' },
    { l:'×',   cls:'ckey-op',  v:'*' },
    { l:'÷',   cls:'ckey-op',  v:'/' },
    { l:'^',   cls:'ckey-op',  v:'^' },
    { l:'.',   cls:'ckey-num', v:'.' },
  ],
  // Paréntesis + números
  [
    { l:'(', cls:'ckey-op',  v:'(' },
    { l:')', cls:'ckey-op',  v:')' },
    { l:'7', cls:'ckey-num', v:'7' },
    { l:'8', cls:'ckey-num', v:'8' },
    { l:'9', cls:'ckey-num', v:'9' },
    { l:'⌫', cls:'ckey-back', v:'__back__' },
  ],
  // 4 5 6
  [
    { l:'e',  cls:'ckey-var',  v:'e' },
    { l:'1/x',cls:'ckey-fn',  v:'1/x' },
    { l:'4',  cls:'ckey-num', v:'4' },
    { l:'5',  cls:'ckey-num', v:'5' },
    { l:'6',  cls:'ckey-num', v:'6' },
    { l:'C',  cls:'ckey-clear',v:'__clear__' },
  ],
  // 1 2 3
  [
    { l:'1', cls:'ckey-num', v:'1' },
    { l:'2', cls:'ckey-num', v:'2' },
    { l:'3', cls:'ckey-num', v:'3' },
    { l:'(−)',cls:'ckey-op', v:'-', w:3 },
  ],
  // 0 y CALCULAR
  [
    { l:'0',   cls:'ckey-num',  v:'0',      w:2 },
    { l:'x²+', cls:'ckey-fn',  v:'x^2+',   w:1 },
    { l:"= CALCULAR f'(x)", cls:'ckey-calc', v:'__calc__', w:3 },
  ],
];

/* ══════════════════════════════════════
   BUILD CALCULADORA LÍMITES
══════════════════════════════════════ */
function buildCalcLimites() {
  const ws = document.getElementById('ws-limites');
  if (!ws) return;

  ws.innerHTML = `
  <div class="calc-body">
    <div class="calc-brand">
      <span class="calc-brand-name">CalcLab · ∫ Límites</span>
      <span class="calc-model">CL-LIM-02</span>
    </div>

    <div class="calc-screen">
      <div class="screen-label">FUNCIÓN f(x)  —  lím cuando x →</div>
      <div class="screen-expr placeholder" id="lim-screen">Ingresa la función...</div>
      <div class="screen-meta">
        <span class="screen-type-badge">LÍMITE</span>
        <span class="screen-cursor"></span>
      </div>
    </div>

    <!-- Solo campo del punto -->
    <div class="calc-selectors" style="margin-bottom:.75rem">
      <div style="display:flex;flex-direction:column;gap:.3rem;flex:1">
        <div style="font-family:'JetBrains Mono',monospace;font-size:.6rem;color:rgba(34,211,238,.4);letter-spacing:.1em;text-transform:uppercase">
          x tiende a (ej: 1, 0, inf, -inf, pi)
        </div>
        <input id="lim-punto" class="calc-select" type="text" placeholder="1" value="0"/>
      </div>
    </div>

    <div class="calc-keyboard" id="lim-keyboard"></div>

    <div class="examples-section">
      <div class="examples-label">Ejemplos →</div>
      <div class="example-chips" id="lim-chips"></div>
    </div>
  </div>

  <div class="calc-result-panel">
    <div class="result-waiting" id="lim-waiting">
      <div class="result-waiting-icon">∫</div>
      <div>El resultado aparecerá aquí</div>
      <div style="font-size:.75rem;margin-top:.35rem;opacity:.5">Ingresa f(x) y presiona CALCULAR</div>
    </div>
    <div class="result-block" id="lim-result-block" style="display:none">
      <div class="result-header">
        <span class="result-label">Resultado</span>
        <span class="result-value" id="lim-result-value"></span>
      </div>
      <div class="steps-title">📋 Solución paso a paso</div>
      <div class="steps-list" id="lim-steps-list"></div>
    </div>
    <div class="error-msg" id="lim-error"></div>
  </div>`;

  buildKeyboard('lim-keyboard', TECLAS_LIMITES, 'limites');
  buildExamples('lim-chips', 'limites');
}

/* ══════════════════════════════════════
   BUILD CALCULADORA DERIVADAS
══════════════════════════════════════ */
function buildCalcDerivadas() {
  const ws = document.getElementById('ws-derivadas');
  if (!ws) return;

  ws.innerHTML = `
  <div class="calc-body">
    <div class="calc-brand">
      <span class="calc-brand-name">CalcLab · ∂ Derivadas</span>
      <span class="calc-model">CL-DER-02</span>
    </div>

    <div class="calc-screen">
      <div class="screen-label" id="d-screen-label">PRIMERA DERIVADA f'(x)</div>
      <div class="screen-expr placeholder" id="d-screen">Ingresa la función...</div>
      <div class="screen-meta">
        <span class="screen-type-badge" id="d-tipo-badge">f'(x)</span>
        <span class="screen-cursor"></span>
      </div>
    </div>

    <!-- Tipo de derivada -->
    <div class="deriv-type-row">
      <button class="dtype-btn active" onclick="setDerivTipo('primera',this)">f'(x)</button>
      <button class="dtype-btn" onclick="setDerivTipo('segunda',this)">f''(x)</button>
      <button class="dtype-btn" onclick="setDerivTipo('nesima',this)">fⁿ(x)</button>
      <button class="dtype-btn" onclick="setDerivTipo('parcial',this)">∂f/∂x</button>
    </div>

    <div id="d-extras" style="display:none;margin-bottom:.75rem">
      <div style="display:flex;flex-direction:column;gap:.3rem">
        <div style="font-family:'JetBrains Mono',monospace;font-size:.6rem;color:rgba(34,211,238,.4);letter-spacing:.1em;text-transform:uppercase" id="d-extra-lbl">n =</div>
        <input id="d-extra-input" class="calc-select" type="text" placeholder="3" style="max-width:120px"/>
      </div>
    </div>

    <div class="calc-keyboard" id="d-keyboard"></div>

    <div class="examples-section">
      <div class="examples-label">Ejemplos →</div>
      <div class="example-chips" id="d-chips"></div>
    </div>
  </div>

  <div class="calc-result-panel">
    <div class="result-waiting" id="d-waiting">
      <div class="result-waiting-icon">∂</div>
      <div>El resultado aparecerá aquí</div>
      <div style="font-size:.75rem;margin-top:.35rem;opacity:.5">Ingresa f(x) y presiona CALCULAR</div>
    </div>
    <div class="result-block" id="d-result-block" style="display:none">
      <div class="result-header">
        <span class="result-label">Resultado</span>
        <span class="result-value" id="d-result-value"></span>
      </div>
      <div class="steps-title">📋 Solución paso a paso</div>
      <div class="steps-list" id="d-steps-list"></div>
    </div>
    <div class="error-msg" id="d-error"></div>
  </div>`;

  buildKeyboard('d-keyboard', TECLAS_DERIVADAS, 'derivadas');
  buildExamples('d-chips', 'derivadas');
}

/* ══════════════════════════════════════
   CONSTRUIR TECLADO
══════════════════════════════════════ */
function buildKeyboard(containerId, layout, calcType) {
  const cont = document.getElementById(containerId);
  if (!cont) return;
  cont.innerHTML = '';

  layout.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'key-row';
    row.forEach(key => {
      const btn = document.createElement('button');
      let cls = 'ckey ' + (key.cls || 'ckey-num');
      if (key.w === 2) cls += ' ckey-w2';
      if (key.w === 3) cls += ' ckey-w3';
      btn.className = cls;
      btn.textContent = key.l;
      btn.addEventListener('click', () => handleKey(key.v, calcType));
      rowEl.appendChild(btn);
    });
    cont.appendChild(rowEl);
  });
}

/* ══════════════════════════════════════
   MANEJAR TECLA
══════════════════════════════════════ */
function handleKey(val, calcType) {
  const state = CalcUI[calcType];
  if (val === '__clear__') { state.expr = ''; }
  else if (val === '__back__') { state.expr = state.expr.slice(0, -1); }
  else if (val === '__calc__') {
    if (calcType === 'limites')   ejecutarLimite();
    if (calcType === 'derivadas') ejecutarDerivada();
    return;
  } else { state.expr += val; }
  updateScreen(calcType);
}

function updateScreen(calcType) {
  const scr = document.getElementById(calcType === 'limites' ? 'lim-screen' : 'd-screen');
  if (!scr) return;
  const expr = CalcUI[calcType].expr;
  scr.textContent = expr || 'Ingresa la función...';
  scr.classList.toggle('placeholder', !expr);
}

/* ══════════════════════════════════════
   TIPO DE DERIVADA
══════════════════════════════════════ */
function setDerivTipo(tipo, btn) {
  CalcUI.derivadas.tipo = tipo;
  document.querySelectorAll('.dtype-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const lblMap = { primera:"f'(x) — Primera", segunda:"f''(x) — Segunda", nesima:"fⁿ(x) — N-ésima", parcial:"∂f/∂x — Parcial" };
  const badgeMap= { primera:"f'(x)", segunda:"f''(x)", nesima:"fⁿ(x)", parcial:"∂f/∂x" };
  const lbl = document.getElementById('d-screen-label');
  const bdg = document.getElementById('d-tipo-badge');
  if (lbl) lbl.textContent = lblMap[tipo] || tipo;
  if (bdg) bdg.textContent = badgeMap[tipo] || tipo;

  const extras = document.getElementById('d-extras');
  const exLbl  = document.getElementById('d-extra-lbl');
  const exInp  = document.getElementById('d-extra-input');
  if (extras) {
    extras.style.display = (tipo === 'nesima' || tipo === 'parcial') ? 'block' : 'none';
    if (tipo === 'nesima'  && exLbl) { exLbl.textContent = 'n ='; if(exInp) exInp.placeholder='3'; }
    if (tipo === 'parcial' && exLbl) { exLbl.textContent = 'Variable (x o y):'; if(exInp) exInp.placeholder='x'; }
  }
}

/* ══════════════════════════════════════
   EJECUTAR CÁLCULO
══════════════════════════════════════ */
function ejecutarLimite() {
  const funcStr = CalcUI.limites.expr.trim();
  const punto   = (document.getElementById('lim-punto')?.value || '0').trim();
  const errEl   = document.getElementById('lim-error');
  if (errEl) { errEl.classList.remove('show'); errEl.textContent = ''; }
  if (!funcStr) { showErr('lim-error','Ingresa una función con el teclado.'); return; }
  try {
    const res = resolverLimite(funcStr, punto);
    mostrarResultado('lim', res);
  } catch(e) { showErr('lim-error', 'Error: ' + e.message); }
}

function ejecutarDerivada() {
  const funcStr = CalcUI.derivadas.expr.trim();
  const tipo    = CalcUI.derivadas.tipo || 'primera';
  const extraVal= (document.getElementById('d-extra-input')?.value || '').trim();
  const errEl   = document.getElementById('d-error');
  if (errEl) { errEl.classList.remove('show'); errEl.textContent = ''; }
  if (!funcStr) { showErr('d-error','Ingresa una función con el teclado.'); return; }
  try {
    let res;
    if      (tipo==='primera') res = derivarPrimera(funcStr);
    else if (tipo==='segunda') res = derivarSegunda(funcStr);
    else if (tipo==='nesima')  res = derivarNesima(funcStr, extraVal||'3');
    else if (tipo==='parcial') res = derivarParcial(funcStr, extraVal||'x');
    else res = derivarPrimera(funcStr);
    mostrarResultado('d', res);
  } catch(e) { showErr('d-error','Error: '+e.message); }
}

/* ══════════════════════════════════════
   MOSTRAR RESULTADO — con scroll
══════════════════════════════════════ */
function mostrarResultado(prefix, resultado) {
  const waiting = document.getElementById(prefix+'-waiting');
  const block   = document.getElementById(prefix+'-result-block');
  const valEl   = document.getElementById(prefix+'-result-value');
  const stepsEl = document.getElementById(prefix+'-steps-list');
  const panelEl = document.querySelector('#ws-'+( prefix==='lim'?'limites':'derivadas')+' .calc-result-panel');

  if (waiting) waiting.style.display = 'none';
  if (block)   block.style.display = 'block';
  if (valEl)   valEl.textContent = resultado.resultado;

  if (stepsEl) {
    stepsEl.innerHTML = '';
    (resultado.pasos || []).forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'step-row';
      div.style.animationDelay = (i * 0.06) + 's';
      const titulo = (p.titulo||'').toLowerCase();
      if (titulo.includes('cadena')) div.classList.add('highlight-cadena');
      else if (titulo.includes('producto')) div.classList.add('highlight-product');
      else if (titulo.includes('cociente')) div.classList.add('highlight-quotient');
      div.innerHTML = `
        <div class="step-num">${i+1}</div>
        <div class="step-body">
          <div class="step-title">${p.titulo||''}</div>
          <div class="step-text">${p.texto||''}</div>
          ${p.nota?'<div class="step-note">'+p.nota+'</div>':''}
        </div>`;
      stepsEl.appendChild(div);
    });
  }

  // Scroll al panel de resultados
  setTimeout(() => {
    if (block) block.scrollIntoView({ behavior:'smooth', block:'nearest' });
    if (panelEl) panelEl.scrollTop = 0;
  }, 100);
}

function showErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
}

/* ══════════════════════════════════════
   EJEMPLOS
══════════════════════════════════════ */
const EJ_LIMITES = [
  { l:'(x²-1)/(x-1), x→1', f:'(x^2-1)/(x-1)',        p:'1'  },
  { l:'sin(x)/x, x→0',      f:'sin(x)/x',              p:'0'  },
  { l:'(x²-4)/(x-2), x→2', f:'(x^2-4)/(x-2)',        p:'2'  },
  { l:'(x³-1)/(x-1), x→1', f:'(x^3-1)/(x-1)',        p:'1'  },
  { l:'(3x²+x)/(x²-5),x→∞',f:'(3*x^2+x)/(x^2-5)',   p:'inf'},
  { l:'(√(x+1)-1)/x, x→0', f:'(sqrt(x+1)-1)/x',     p:'0'  },
  { l:'(1-cos x)/x², x→0', f:'(1-cos(x))/x^2',      p:'0'  },
];

const EJ_DERIVADAS = [
  { l:'x⁴ (potencia)',       f:'x^4'         },
  { l:'sin(x²) (cadena)',    f:'sin(x^2)'    },
  { l:'cos(3x) (cadena)',    f:'cos(3*x)'    },
  { l:'tan(x) (trig)',       f:'tan(x)'      },
  { l:'csc(x) (trig)',       f:'csc(x)'      },
  { l:'sec(x) (trig)',       f:'sec(x)'      },
  { l:'cot(x) (trig)',       f:'cot(x)'      },
  { l:'exp(x²) (cadena)',    f:'exp(x^2)'    },
  { l:'ln(x²+1) (cadena)',   f:'ln(x^2+1)'  },
  { l:'x²·sin(x) (prod.)',   f:'x^2*sin(x)' },
  { l:'sin(x)/x (coc.)',     f:'sin(x)/x'   },
  { l:'(x²+1)⁵ (cadena+pot)',f:'(x^2+1)^5' },
];

function buildExamples(containerId, type) {
  const cont = document.getElementById(containerId);
  if (!cont) return;
  cont.innerHTML = '';
  const ejs = type === 'limites' ? EJ_LIMITES : EJ_DERIVADAS;
  ejs.forEach(ej => {
    const btn = document.createElement('button');
    btn.className = 'ex-chip-btn';
    btn.textContent = ej.l;
    btn.onclick = () => {
      if (type === 'limites') {
        CalcUI.limites.expr = ej.f;
        updateScreen('limites');
        const pi = document.getElementById('lim-punto');
        if (pi && ej.p) pi.value = ej.p;
      } else {
        CalcUI.derivadas.expr = ej.f;
        updateScreen('derivadas');
      }
    };
    cont.appendChild(btn);
  });
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
function initCalcLimites()   { buildCalcLimites(); }
function initCalcDerivadas() { buildCalcDerivadas(); }
