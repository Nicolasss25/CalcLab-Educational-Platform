/* ═══════════════════════════════════════════════════════
   CalcLab · ejercicios.js
   Generador de ejercicios aleatorios con soluciones
   completas paso a paso.
   ═══════════════════════════════════════════════════════ */

let exTipo = 'limites';
let exDiff = 1;
let exActual = null;

/* ═══════════════════════════════════════════════════════
   BANCO DE EJERCICIOS
═══════════════════════════════════════════════════════ */
const BANCO_EX = {
  limites: {
    1: [
      { formula:'lím (x→2) de  3x + 1',       badge:'LÍMITE', hint:'Función continua. Intenta sustitución directa.',
        res:'7', pasos:[
          {t:'Tipo de función',c:'Función lineal 3x+1. No hay discontinuidades ni indeterminaciones.',n:''},
          {t:'Sustitución directa',c:'f(2) = 3·(2) + 1 = 6 + 1 = 7',n:'La función es continua en x=2.'},
          {t:'Conclusión',c:'lím (x→2) de 3x+1 = 7',n:'✅ Técnica: Sustitución directa'}
        ]},
      { formula:'lím (x→0) de  x² + 2x',      badge:'LÍMITE', hint:'Polinomio. Sustituye directamente.',
        res:'0', pasos:[
          {t:'Sustitución directa',c:'f(0) = (0)² + 2(0) = 0 + 0 = 0',n:'Polinomio continuo.'},
          {t:'Conclusión',c:'lím = 0',n:'✅'}
        ]},
      { formula:'lím (x→3) de  x² − 3x + 2',  badge:'LÍMITE', hint:'Polinomio. Evalúa en x=3.',
        res:'2', pasos:[
          {t:'Sustitución directa',c:'f(3) = 9 − 9 + 2 = 2',n:''},
          {t:'Conclusión',c:'lím = 2',n:'✅'}
        ]},
      { formula:'lím (x→4) de  √x',            badge:'LÍMITE', hint:'√4 = 2. Sustitución directa.',
        res:'2', pasos:[
          {t:'Sustitución directa',c:'f(4) = √4 = 2',n:''},
          {t:'Conclusión',c:'lím = 2',n:'✅'}
        ]},
      { formula:'lím (x→1) de  (x+2)/(x+1)',   badge:'LÍMITE', hint:'El denominador no se anula.',
        res:'3/2', pasos:[
          {t:'Sustitución directa',c:'f(1) = (1+2)/(1+1) = 3/2',n:'Denominador x+1 = 2 ≠ 0. Sin indeterminación.'},
          {t:'Conclusión',c:'lím = 3/2 = 1.5',n:'✅'}
        ]},
    ],
    2: [
      { formula:'lím (x→1) de  (x²−1)/(x−1)',  badge:'LÍMITE', hint:'Indeterminación 0/0. Factoriza x²−1.',
        res:'2', pasos:[
          {t:'Sustitución directa',c:'f(1) = (1−1)/(1−1) = 0/0',n:'Indeterminación → necesitamos factorizar.'},
          {t:'Factorización',c:'x²−1 = (x+1)(x−1)',n:'Diferencia de cuadrados: a²−b² = (a+b)(a−b)'},
          {t:'Cancelar factor',c:'(x+1)(x−1)/(x−1) → cancelar (x−1)',n:'Válido porque x ≠ 1 (límite, no evaluación)'},
          {t:'Expresión simplificada',c:'Queda: x+1',n:''},
          {t:'Evaluar',c:'lím(x→1) (x+1) = 1+1 = 2',n:''},
          {t:'Conclusión',c:'lím = 2',n:'✅ Técnica: Factorización — Diferencia de cuadrados'}
        ]},
      { formula:'lím (x→2) de  (x²−4)/(x−2)',  badge:'LÍMITE', hint:'x²−4 = (x+2)(x−2). Cancela (x−2).',
        res:'4', pasos:[
          {t:'Sustitución directa',c:'(4−4)/(2−2) = 0/0',n:'Indeterminación → factorizar.'},
          {t:'Factorización',c:'x²−4 = (x+2)(x−2)',n:''},
          {t:'Cancelar',c:'(x+2)(x−2)/(x−2) = x+2',n:''},
          {t:'Evaluar',c:'lím(x→2) (x+2) = 4',n:''},
          {t:'Conclusión',c:'lím = 4',n:'✅'}
        ]},
      { formula:'lím (x→0) de  sin(x)/x',      badge:'LÍMITE', hint:'Límite notable trigonométrico.',
        res:'1', pasos:[
          {t:'Sustitución directa',c:'sin(0)/0 = 0/0',n:'Indeterminación — límite notable.'},
          {t:'Límite notable',c:'lím(x→0) sin(x)/x = 1',n:'Este es uno de los límites fundamentales del cálculo. Se demuestra con la regla del emparedado (squeeze theorem).'},
          {t:'Conclusión',c:'lím = 1',n:'✅ Técnica: Límite notable trigonométrico'}
        ]},
      { formula:'lím (x→3) de  (x²−9)/(x−3)',  badge:'LÍMITE', hint:'x²−9 = (x+3)(x−3).',
        res:'6', pasos:[
          {t:'Sustitución directa',c:'(9−9)/(3−3) = 0/0',n:''},
          {t:'Factorización',c:'x²−9 = (x+3)(x−3)  →  cancelar (x−3)',n:''},
          {t:'Evaluar',c:'lím(x→3) (x+3) = 6',n:''},
          {t:'Conclusión',c:'lím = 6',n:'✅'}
        ]},
      { formula:'lím (x→∞) de  (2x+1)/(x+3)',  badge:'LÍMITE', hint:'Grados iguales (1=1). Cociente de coeficientes líderes.',
        res:'2', pasos:[
          {t:'Comparar grados',c:'Numerador: grado 1 (2x). Denominador: grado 1 (x).',n:'Grados iguales → dividir por x'},
          {t:'Dividir por x',c:'(2 + 1/x)/(1 + 3/x)',n:''},
          {t:'Tomar límite',c:'Cuando x→∞: 1/x→0, 3/x→0',n:''},
          {t:'Resultado',c:'2/1 = 2',n:''},
          {t:'Conclusión',c:'lím = 2',n:'✅ Técnica: Comparación de grados'}
        ]},
    ],
    3: [
      { formula:'lím (x→0) de  (1−cos x)/x²',  badge:'LÍMITE', hint:'Forma 0/0. Usar identidad trigonométrica o límite notable.',
        res:'1/2', pasos:[
          {t:'Sustitución directa',c:'(1−cos0)/0 = 0/0',n:'Indeterminación.'},
          {t:'Identidad trigonométrica',c:'1−cos(x) = 2sin²(x/2)',n:'Identidad del ángulo mitad.'},
          {t:'Sustituir',c:'2sin²(x/2)/x²',n:''},
          {t:'Reescribir',c:'(1/2)·[sin(x/2)/(x/2)]²',n:'Extraemos el factor 1/2'},
          {t:'Límite notable',c:'lím(u→0) sin(u)/u = 1, con u = x/2',n:''},
          {t:'Resultado',c:'(1/2)·1² = 1/2',n:''},
          {t:'Conclusión',c:'lím = 1/2',n:'✅'}
        ]},
      { formula:'lím (x→1) de  (x³−1)/(x−1)',  badge:'LÍMITE', hint:'Diferencia de cubos: x³−1 = (x−1)(x²+x+1).',
        res:'3', pasos:[
          {t:'Sustitución directa',c:'(1−1)/(1−1) = 0/0',n:''},
          {t:'Factorización — Diferencia de cubos',c:'x³−1 = (x−1)(x²+x+1)',n:'Fórmula: a³−b³ = (a−b)(a²+ab+b²)'},
          {t:'Cancelar',c:'(x−1)(x²+x+1)/(x−1) = x²+x+1',n:''},
          {t:'Evaluar',c:'lím(x→1) (x²+x+1) = 1+1+1 = 3',n:''},
          {t:'Conclusión',c:'lím = 3',n:'✅ Diferencia de cubos'}
        ]},
      { formula:'lím (x→0) de  (√(x+1)−1)/x',  badge:'LÍMITE', hint:'Multiplicar por la conjugada √(x+1)+1.',
        res:'1/2', pasos:[
          {t:'Sustitución directa',c:'(√1−1)/0 = 0/0',n:''},
          {t:'Multiplicar por conjugada',c:'Multiplicamos por (√(x+1)+1)/(√(x+1)+1)',n:'La conjugada de √(x+1)−1 es √(x+1)+1'},
          {t:'Numerador tras conjugada',c:'(√(x+1)−1)(√(x+1)+1) = (x+1)−1 = x',n:'Diferencia de cuadrados: (a−b)(a+b)=a²−b²'},
          {t:'Simplificar',c:'x / [x·(√(x+1)+1)] = 1/(√(x+1)+1)',n:'Cancelamos x'},
          {t:'Evaluar',c:'lím(x→0) 1/(√(0+1)+1) = 1/(1+1) = 1/2',n:''},
          {t:'Conclusión',c:'lím = 1/2',n:'✅ Técnica: Conjugada (racionalización)'}
        ]},
      { formula:'lím (x→∞) de  (3x³−2x)/(x³+x²)', badge:'LÍMITE', hint:'Grados iguales (3=3). Divide por x³.',
        res:'3', pasos:[
          {t:'Identificar término dominante',c:'En numerador: 3x³. En denominador: x³.',n:'Grados iguales → cociente de coeficientes líderes'},
          {t:'Dividir todo por x³',c:'(3−2/x²)/(1+1/x)',n:''},
          {t:'Límite',c:'Cuando x→∞: 2/x²→0, 1/x→0',n:''},
          {t:'Resultado',c:'3/1 = 3',n:''},
          {t:'Conclusión',c:'lím = 3',n:'✅'}
        ]},
    ]
  },

  derivadas: {
    1: [
      { formula:"f'(x) de  f(x) = x⁵",      badge:'DERIVADA', hint:'Regla de la potencia: d/dx[xⁿ]=nxⁿ⁻¹',
        res:"5x⁴", pasos:[
          {t:'Regla de la potencia',c:'d/dx[xⁿ] = n·xⁿ⁻¹',n:'📌 Multiplicamos por el exponente y restamos 1.'},
          {t:'Aplicar',c:'d/dx[x⁵] = 5·x⁵⁻¹ = 5x⁴',n:''},
          {t:'Resultado',c:"f'(x) = 5x⁴",n:'✅'}
        ]},
      { formula:"f'(x) de  f(x) = 3x² − 2x + 7", badge:'DERIVADA', hint:'Regla de la suma + potencia.',
        res:"6x − 2", pasos:[
          {t:'Regla de la suma',c:'Derivamos término a término.',n:'d/dx[f±g] = f\'±g\''},
          {t:'d/dx[3x²]',c:'3·2·x¹ = 6x',n:'Regla de la potencia con coeficiente'},
          {t:'d/dx[−2x]',c:'−2·1 = −2',n:''},
          {t:'d/dx[7]',c:'0',n:'Derivada de constante = 0'},
          {t:'Resultado',c:"f'(x) = 6x − 2",n:'✅'}
        ]},
      { formula:"f'(x) de  f(x) = sin(x)",   badge:'DERIVADA', hint:'Derivada fundamental del seno.',
        res:"cos(x)", pasos:[
          {t:'Derivada fundamental',c:'d/dx[sin(x)] = cos(x)',n:'📌 Memorizar: seno → coseno'},
          {t:'Resultado',c:"f'(x) = cos(x)",n:'✅'}
        ]},
      { formula:"f'(x) de  f(x) = 4eˣ",     badge:'DERIVADA', hint:'eˣ es su propia derivada.',
        res:"4eˣ", pasos:[
          {t:'Derivada de eˣ',c:'d/dx[eˣ] = eˣ',n:'📌 La exponencial eˣ es su propia derivada.'},
          {t:'Sacar constante',c:'d/dx[4eˣ] = 4·eˣ',n:''},
          {t:'Resultado',c:"f'(x) = 4eˣ",n:'✅'}
        ]},
      { formula:"f'(x) de  f(x) = ln(x)",    badge:'DERIVADA', hint:'d/dx[ln(x)] = 1/x',
        res:"1/x", pasos:[
          {t:'Derivada del logaritmo natural',c:'d/dx[ln(x)] = 1/x',n:'📌 Válido para x > 0'},
          {t:'Resultado',c:"f'(x) = 1/x",n:'✅'}
        ]},
    ],
    2: [
      { formula:"f'(x) de  f(x) = x²·sin(x)",  badge:'DERIVADA', hint:'Regla del producto: (u·v)\'=u\'v+uv\'',
        res:"2x·sin(x) + x²·cos(x)", pasos:[
          {t:'Regla del producto',c:'(u·v)\' = u\'·v + u·v\'',n:'📌 u = x²  |  v = sin(x)'},
          {t:'Derivar u',c:'u\' = d/dx[x²] = 2x',n:'Regla de la potencia'},
          {t:'Derivar v',c:'v\' = d/dx[sin(x)] = cos(x)',n:'Derivada fundamental'},
          {t:'Aplicar fórmula',c:'(2x)·sin(x) + x²·cos(x)',n:''},
          {t:'Resultado',c:"f'(x) = 2x·sin(x) + x²·cos(x)",n:'✅ Regla del producto'}
        ]},
      { formula:"f'(x) de  f(x) = sin(x)/x",   badge:'DERIVADA', hint:'Regla del cociente.',
        res:"(x·cos(x)−sin(x))/x²", pasos:[
          {t:'Regla del cociente',c:'(u/v)\' = (u\'v − uv\')/v²',n:'📌 u = sin(x)  |  v = x'},
          {t:'Derivar u',c:'u\' = cos(x)',n:''},
          {t:'Derivar v',c:'v\' = 1',n:''},
          {t:'Aplicar',c:'(cos(x)·x − sin(x)·1)/x²',n:''},
          {t:'Resultado',c:"f'(x) = (x·cos(x)−sin(x))/x²",n:'✅ Regla del cociente'}
        ]},
      { formula:"f'(x) de  f(x) = sin(3x)",    badge:'DERIVADA', hint:'Regla de la cadena. Interior: 3x.',
        res:"3·cos(3x)", pasos:[
          {t:'Regla de la cadena',c:'d/dx[sin(u)] = cos(u)·u\'',n:'📌 Exterior: sin → cos. Interior: u = 3x'},
          {t:'Derivar interior',c:'u\' = d/dx[3x] = 3',n:''},
          {t:'Aplicar',c:'cos(3x)·3 = 3·cos(3x)',n:''},
          {t:'Resultado',c:"f'(x) = 3·cos(3x)",n:'✅ Regla de la cadena'}
        ]},
      { formula:"f'(x) de  f(x) = exp(x²)",    badge:'DERIVADA', hint:'Regla de la cadena. Interior: x².',
        res:"2x·exp(x²)", pasos:[
          {t:'Regla de la cadena',c:'d/dx[eᵘ] = eᵘ·u\'',n:'📌 Exterior: eᵘ. Interior: u = x²'},
          {t:'Derivar interior',c:'u\' = d/dx[x²] = 2x',n:''},
          {t:'Aplicar',c:'exp(x²)·2x = 2x·exp(x²)',n:''},
          {t:'Resultado',c:"f'(x) = 2x·exp(x²)",n:'✅ Regla de la cadena'}
        ]},
      { formula:"f'(x) de  f(x) = ln(x²+1)",   badge:'DERIVADA', hint:'Cadena + derivada del logaritmo.',
        res:"2x/(x²+1)", pasos:[
          {t:'Regla de la cadena',c:'d/dx[ln(u)] = u\'/u',n:'📌 u = x²+1'},
          {t:'Derivar interior',c:'u\' = d/dx[x²+1] = 2x',n:''},
          {t:'Aplicar',c:'2x/(x²+1)',n:''},
          {t:'Resultado',c:"f'(x) = 2x/(x²+1)",n:'✅'}
        ]},
    ],
    3: [
      { formula:"f'(x) de  f(x) = (x²+1)⁵",    badge:'DERIVADA', hint:'Cadena con potencia: n·uⁿ⁻¹·u\'',
        res:"10x·(x²+1)⁴", pasos:[
          {t:'Regla de la cadena (potencia)',c:'d/dx[uⁿ] = n·uⁿ⁻¹·u\'',n:'📌 u = x²+1  |  n = 5'},
          {t:'Derivar interior',c:'u\' = 2x',n:''},
          {t:'Aplicar',c:'5·(x²+1)⁴·2x = 10x·(x²+1)⁴',n:''},
          {t:'Resultado',c:"f'(x) = 10x·(x²+1)⁴",n:'✅ Cadena con potencia'}
        ]},
      { formula:"f'(x) de  f(x) = ln(sin(x))",  badge:'DERIVADA', hint:'Cadena doble: ln exterior, sin interior.',
        res:"cos(x)/sin(x) = cot(x)", pasos:[
          {t:'Cadena doble',c:'d/dx[ln(sin(x))]',n:'Exterior: ln. Interior: sin(x)'},
          {t:'Paso 1 — derivar exterior',c:'d/dx[ln(u)] = 1/u  →  1/sin(x)',n:''},
          {t:'Paso 2 — derivar interior',c:'d/dx[sin(x)] = cos(x)',n:''},
          {t:'Multiplicar',c:'(1/sin(x))·cos(x) = cos(x)/sin(x)',n:''},
          {t:'Resultado',c:"f'(x) = cos(x)/sin(x) = cot(x)",n:'✅ Cadena doble'}
        ]},
      { formula:"f'(x) de  f(x) = x³·ln(x)",    badge:'DERIVADA', hint:'Producto: u=x³, v=ln(x).',
        res:"3x²·ln(x) + x²", pasos:[
          {t:'Regla del producto',c:'u = x³  |  v = ln(x)',n:''},
          {t:'u\' = 3x²',c:'Regla de la potencia',n:''},
          {t:'v\' = 1/x',c:'Derivada del logaritmo',n:''},
          {t:'Aplicar',c:'3x²·ln(x) + x³·(1/x) = 3x²·ln(x) + x²',n:''},
          {t:'Resultado',c:"f'(x) = 3x²·ln(x) + x²",n:'✅ Producto + cadena'}
        ]},
      { formula:"f'(x) de  f(x) = exp(sin(x))",  badge:'DERIVADA', hint:'Cadena doble: exp exterior, sin interior.',
        res:"cos(x)·exp(sin(x))", pasos:[
          {t:'Cadena doble',c:'d/dx[eᵘ] = eᵘ·u\'  con u = sin(x)',n:''},
          {t:'Derivar interior',c:'u\' = d/dx[sin(x)] = cos(x)',n:''},
          {t:'Aplicar',c:'exp(sin(x))·cos(x)',n:''},
          {t:'Resultado',c:"f'(x) = cos(x)·exp(sin(x))",n:'✅ Cadena doble'}
        ]},
      { formula:"f'(x) de  f(x) = arctan(x²)",  badge:'DERIVADA', hint:'Cadena: d/dx[arctan(u)]=u\'/(1+u²)',
        res:"2x/(1+x⁴)", pasos:[
          {t:'Derivada del arcotangente',c:'d/dx[arctan(u)] = u\'/(1+u²)',n:'📌 u = x²'},
          {t:'Derivar interior',c:'u\' = 2x',n:''},
          {t:'Aplicar',c:'2x/(1+(x²)²) = 2x/(1+x⁴)',n:''},
          {t:'Resultado',c:"f'(x) = 2x/(1+x⁴)",n:'✅'}
        ]},
    ]
  }
};

/* ═══════════════════════════════════════════════════════
   RENDERIZAR SECCIÓN DE EJERCICIOS
═══════════════════════════════════════════════════════ */
function initEjercicios() {
  const cont = document.getElementById('ejercicios-content');
  if (!cont) return;

  cont.innerHTML = `
    <div class="space-card" style="margin-bottom:1.5rem">
      <div class="ex-config">
        <div class="ex-group">
          <span class="ex-lbl">Tipo de ejercicio</span>
          <div class="ex-toggle-row">
            <button class="ex-tgl active" id="etgl-lim"  onclick="setExTipo('limites',this)">∫ Límites</button>
            <button class="ex-tgl"        id="etgl-der"  onclick="setExTipo('derivadas',this)">∂ Derivadas</button>
            <button class="ex-tgl"        id="etgl-both" onclick="setExTipo('ambos',this)">🔀 Ambos</button>
          </div>
        </div>
        <div class="ex-group">
          <span class="ex-lbl">Dificultad</span>
          <div class="ex-toggle-row">
            <button class="ex-tgl diff-1 active" id="ediff-1" onclick="setExDiff(1,this)">⭐ Básico</button>
            <button class="ex-tgl diff-2"        id="ediff-2" onclick="setExDiff(2,this)">⭐⭐ Medio</button>
            <button class="ex-tgl diff-3"        id="ediff-3" onclick="setExDiff(3,this)">⭐⭐⭐ Difícil</button>
          </div>
        </div>
      </div>
      <button class="btn-gold" style="width:100%;font-family:'Orbitron',sans-serif;letter-spacing:.06em" onclick="generarEjercicio()">
        🎲 &nbsp; GENERAR EJERCICIO
      </button>
    </div>

    <div id="ex-display-area" style="display:none">
      <div class="ex-display">
        <div class="ex-badge-pill" id="ex-badge-pill">LÍMITE</div>
        <div class="ex-formula-big" id="ex-formula-big">—</div>
        <div class="ex-hint" id="ex-hint-txt"></div>
        <div class="ex-actions">
          <button class="btn-primary" onclick="mostrarSolucionEx()">📋 Ver solución paso a paso</button>
          <button class="btn-secondary" onclick="generarEjercicio()">🔄 Otro ejercicio</button>
        </div>
      </div>
      <div class="result-block" id="ex-result-block" style="display:none">
        <div class="result-header">
          <span class="result-label">Solución</span>
          <span class="result-value" id="ex-result-value"></span>
        </div>
        <div class="steps-title">📋 Solución paso a paso</div>
        <div class="steps-list" id="ex-steps-list"></div>
      </div>
    </div>`;
}

/* ─── CONTROLES ─── */
function setExTipo(tipo, btn) {
  exTipo = tipo;
  ['etgl-lim','etgl-der','etgl-both'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  if (btn) btn.classList.add('active');
  ocultarResultadoEx();
}

function setExDiff(d, btn) {
  exDiff = d;
  [1,2,3].forEach(n => {
    const el = document.getElementById('ediff-' + n);
    if (el) el.classList.remove('active');
  });
  if (btn) btn.classList.add('active');
  ocultarResultadoEx();
}

function ocultarResultadoEx() {
  const rb = document.getElementById('ex-result-block');
  if (rb) rb.style.display = 'none';
}

/* ─── GENERAR ─── */
function generarEjercicio() {
  let tipo;
  if (exTipo === 'ambos') tipo = Math.random() < 0.5 ? 'limites' : 'derivadas';
  else tipo = exTipo;

  const banco = BANCO_EX[tipo][exDiff];
  const idx   = Math.floor(Math.random() * banco.length);
  exActual    = { tipo, diff: exDiff, idx };

  const ej = banco[idx];
  document.getElementById('ex-badge-pill').textContent  = ej.badge;
  document.getElementById('ex-formula-big').textContent = ej.formula;
  document.getElementById('ex-hint-txt').textContent    = '💡 ' + ej.hint;

  document.getElementById('ex-display-area').style.display = 'block';
  ocultarResultadoEx();
  document.getElementById('ex-display-area').scrollIntoView({ behavior:'smooth', block:'nearest' });
}

/* ─── MOSTRAR SOLUCIÓN ─── */
function mostrarSolucionEx() {
  if (!exActual) return;
  const ej = BANCO_EX[exActual.tipo][exActual.diff][exActual.idx];

  document.getElementById('ex-result-value').textContent = ej.res;

  const list = document.getElementById('ex-steps-list');
  list.innerHTML = '';
  ej.pasos.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'step-row';
    div.style.animationDelay = (i * 0.07) + 's';
    div.innerHTML = `
      <div class="step-num">${i + 1}</div>
      <div class="step-body">
        <div class="step-title">${p.t}</div>
        <div class="step-text">${p.c}</div>
        ${p.n ? '<div class="step-note">' + p.n + '</div>' : ''}
      </div>`;
    list.appendChild(div);
  });

  const rb = document.getElementById('ex-result-block');
  rb.style.display = 'block';
  rb.scrollIntoView({ behavior:'smooth', block:'nearest' });
}
