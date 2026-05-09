/* ═══════════════════════════════════════════════════════
   CalcLab · teoria.js  v4
   Sección de teoría completa: Derivadas y Límites
   Dos pestañas, contenido exhaustivo y bien organizado.
   ═══════════════════════════════════════════════════════ */

function initTeoria() {
  const cont = document.getElementById('teoria-content');
  if (!cont) return;

  cont.innerHTML = `
  <div class="teoria-tabs">
    <button class="ttab active" onclick="switchTeoria('derivadas',this)">∂ Derivadas</button>
    <button class="ttab"        onclick="switchTeoria('limites',this)">∫ Límites</button>
  </div>

  <!-- ════════════ DERIVADAS ════════════ -->
  <div class="ttab-content active" id="tc-derivadas">

    <div class="teoria-hero">
      <div class="teoria-icon">∂</div>
      <div>
        <h3>Derivadas — Todo lo que necesitas saber</h3>
        <p>Desde la definición hasta las reglas avanzadas. Consulta cualquier sección cuando la necesites.</p>
      </div>
    </div>

    <!-- ÍNDICE RÁPIDO -->
    <div class="tc-indice">
      <span class="tc-ind-label">Ir a →</span>
      <a class="tc-ind-link" href="#d-def">Definición</a>
      <a class="tc-ind-link" href="#d-basicas">Reglas básicas</a>
      <a class="tc-ind-link" href="#d-trig">Trig</a>
      <a class="tc-ind-link" href="#d-producto">Producto</a>
      <a class="tc-ind-link" href="#d-cociente">Cociente</a>
      <a class="tc-ind-link" href="#d-cadena">Cadena</a>
      <a class="tc-ind-link" href="#d-tabla">Tabla</a>
      <a class="tc-ind-link" href="#d-ejemplos">Ejemplos</a>
    </div>

    <div class="teoria-grid">

      <!-- DEFINICIÓN -->
      <div class="teoria-card tc-blue tc-wide" id="d-def">
        <div class="tc-head">📌 ¿Qué es una derivada?</div>
        <div class="tc-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-items:start">
            <div>
              <p>La derivada de f(x) en el punto x es la <strong>tasa de cambio instantánea</strong> de la función en ese punto. Geométricamente, es la <strong>pendiente de la recta tangente</strong> a la curva en ese punto.</p>
              <div class="tc-formula">f'(x) = lím(h→0) [f(x+h) − f(x)] / h</div>
              <p>Esta fórmula calcula la pendiente de una recta "cada vez más pequeña" hasta que se vuelve tangente a la curva.</p>
            </div>
            <div>
              <div class="tc-concepto-box">
                <div class="tc-concepto-title">💡 Intuición</div>
                <p>Si f(x) describe la posición de un auto, entonces f'(x) es su <strong>velocidad</strong> en cada instante.</p>
                <p style="margin-top:.5rem">Si f(x) es la velocidad, f'(x) es la <strong>aceleración</strong>.</p>
              </div>
              <div class="tc-concepto-box" style="margin-top:.6rem">
                <div class="tc-concepto-title">📐 Notaciones</div>
                <div class="tc-formula-sm">f'(x)  =  dy/dx  =  Df(x)  =  ẏ</div>
                <p style="font-size:.78rem;color:var(--text2);margin-top:.35rem">Todas representan lo mismo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- REGLAS BÁSICAS -->
      <div class="teoria-card tc-violet" id="d-basicas">
        <div class="tc-head">⚡ Reglas básicas — Las 4 esenciales</div>
        <div class="tc-body">
          <div class="tc-regla-item">
            <div class="tc-regla-nombre">1. Constante</div>
            <div class="tc-regla-formula">d/dx[c] = 0</div>
            <div class="tc-regla-ejemplo">d/dx[7] = 0 &nbsp;|&nbsp; d/dx[-5] = 0</div>
            <div class="tc-regla-why">¿Por qué? Una constante no cambia → tasa de cambio = 0.</div>
          </div>
          <div class="tc-regla-item">
            <div class="tc-regla-nombre">2. Potencia</div>
            <div class="tc-regla-formula">d/dx[xⁿ] = n · xⁿ⁻¹</div>
            <div class="tc-regla-ejemplo">d/dx[x³] = 3x² &nbsp;|&nbsp; d/dx[x⁵] = 5x⁴ &nbsp;|&nbsp; d/dx[x] = 1</div>
            <div class="tc-regla-why">El exponente baja como coeficiente y se resta 1 al exponente.</div>
          </div>
          <div class="tc-regla-item">
            <div class="tc-regla-nombre">3. Constante × función</div>
            <div class="tc-regla-formula">d/dx[c·f(x)] = c · f'(x)</div>
            <div class="tc-regla-ejemplo">d/dx[3x²] = 3·2x = 6x &nbsp;|&nbsp; d/dx[5sin(x)] = 5cos(x)</div>
            <div class="tc-regla-why">La constante "sale" y se multiplica por la derivada de la función.</div>
          </div>
          <div class="tc-regla-item">
            <div class="tc-regla-nombre">4. Suma / Resta</div>
            <div class="tc-regla-formula">d/dx[f ± g] = f' ± g'</div>
            <div class="tc-regla-ejemplo">d/dx[x² + 3x] = 2x + 3 &nbsp;|&nbsp; d/dx[sin(x) − x²] = cos(x) − 2x</div>
            <div class="tc-regla-why">Se deriva cada término por separado y se suman/restan.</div>
          </div>
        </div>
      </div>

      <!-- TRIG -->
      <div class="teoria-card tc-pink" id="d-trig">
        <div class="tc-head">📐 Las 6 derivadas trigonométricas</div>
        <div class="tc-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">
            <div class="tc-trig-card">
              <div class="tc-trig-fn">sin(x)</div>
              <div class="tc-trig-arrow">→</div>
              <div class="tc-trig-der">cos(x)</div>
              <div class="tc-trig-mem">+ coseno</div>
            </div>
            <div class="tc-trig-card">
              <div class="tc-trig-fn">cos(x)</div>
              <div class="tc-trig-arrow">→</div>
              <div class="tc-trig-der">−sin(x)</div>
              <div class="tc-trig-mem">− seno</div>
            </div>
            <div class="tc-trig-card">
              <div class="tc-trig-fn">tan(x)</div>
              <div class="tc-trig-arrow">→</div>
              <div class="tc-trig-der">sec²(x)</div>
              <div class="tc-trig-mem">secante²</div>
            </div>
            <div class="tc-trig-card">
              <div class="tc-trig-fn">csc(x)</div>
              <div class="tc-trig-arrow">→</div>
              <div class="tc-trig-der">−csc(x)cot(x)</div>
              <div class="tc-trig-mem">− csc·cot</div>
            </div>
            <div class="tc-trig-card">
              <div class="tc-trig-fn">sec(x)</div>
              <div class="tc-trig-arrow">→</div>
              <div class="tc-trig-der">sec(x)tan(x)</div>
              <div class="tc-trig-mem">sec·tan</div>
            </div>
            <div class="tc-trig-card">
              <div class="tc-trig-fn">cot(x)</div>
              <div class="tc-trig-arrow">→</div>
              <div class="tc-trig-der">−csc²(x)</div>
              <div class="tc-trig-mem">− cosecante²</div>
            </div>
          </div>
          <div class="tc-tip-box" style="margin-top:.85rem">
            💡 <strong>Truco para recordar:</strong> Las funciones que empiezan con "co" (coseno, cosecante, cotangente) llevan signo <strong>negativo</strong> en su derivada.
          </div>
        </div>
      </div>

      <!-- PRODUCTO -->
      <div class="teoria-card tc-gold" id="d-producto">
        <div class="tc-head">✖️ Regla del Producto</div>
        <div class="tc-body">
          <div class="tc-formula">(u · v)' = u'·v + u·v'</div>
          <div style="margin:.75rem 0">
            <p><strong>¿Cuándo usarla?</strong> Cuando dos funciones están multiplicadas y ninguna es simplemente una constante.</p>
          </div>
          <div class="tc-pasos-regla">
            <div class="tc-paso-r"><span class="tc-paso-n">1</span> Identifica u y v (los dos factores)</div>
            <div class="tc-paso-r"><span class="tc-paso-n">2</span> Calcula u' (deriva el primero)</div>
            <div class="tc-paso-r"><span class="tc-paso-n">3</span> Calcula v' (deriva el segundo)</div>
            <div class="tc-paso-r"><span class="tc-paso-n">4</span> Aplica: (u' × v) + (u × v')</div>
          </div>
          <div class="tc-ejemplo" style="margin-top:.85rem">
            <div class="tc-ej-title">Ejemplo: f(x) = x² · sin(x)</div>
            <div class="tc-formula-sm">u = x²  →  u' = 2x</div>
            <div class="tc-formula-sm">v = sin(x)  →  v' = cos(x)</div>
            <div class="tc-formula-sm" style="color:var(--green2)">f'(x) = 2x·sin(x) + x²·cos(x) ✅</div>
          </div>
          <div class="tc-ejemplo" style="margin-top:.5rem">
            <div class="tc-ej-title">Ejemplo 2: f(x) = x³ · eˣ</div>
            <div class="tc-formula-sm">u = x³  →  u' = 3x²</div>
            <div class="tc-formula-sm">v = eˣ  →  v' = eˣ</div>
            <div class="tc-formula-sm" style="color:var(--green2)">f'(x) = 3x²·eˣ + x³·eˣ = eˣ(3x² + x³) ✅</div>
          </div>
        </div>
      </div>

      <!-- COCIENTE -->
      <div class="teoria-card tc-cyan" id="d-cociente">
        <div class="tc-head">➗ Regla del Cociente</div>
        <div class="tc-body">
          <div class="tc-formula">(u/v)' = (u'v − uv') / v²</div>
          <div style="margin:.75rem 0">
            <p><strong>¿Cuándo usarla?</strong> Cuando una función está dividida por otra (ambas contienen x).</p>
          </div>
          <div class="tc-tip-box">
            ⚠️ <strong>Atención al signo:</strong> En el numerador es RESTA (u'v <em>menos</em> uv'), NO suma. El orden importa.
          </div>
          <div class="tc-pasos-regla" style="margin-top:.75rem">
            <div class="tc-paso-r"><span class="tc-paso-n">1</span> u = numerador, v = denominador</div>
            <div class="tc-paso-r"><span class="tc-paso-n">2</span> Calcula u' y v' por separado</div>
            <div class="tc-paso-r"><span class="tc-paso-n">3</span> Numerador = u'v − uv'</div>
            <div class="tc-paso-r"><span class="tc-paso-n">4</span> Denominador = v² (el denominador al cuadrado)</div>
          </div>
          <div class="tc-ejemplo" style="margin-top:.85rem">
            <div class="tc-ej-title">Ejemplo: f(x) = sin(x)/x</div>
            <div class="tc-formula-sm">u = sin(x)  →  u' = cos(x)</div>
            <div class="tc-formula-sm">v = x  →  v' = 1</div>
            <div class="tc-formula-sm" style="color:var(--green2)">f'(x) = (cos(x)·x − sin(x)·1) / x² = (x·cos(x) − sin(x))/x² ✅</div>
          </div>
          <div class="tc-ejemplo" style="margin-top:.5rem">
            <div class="tc-ej-title">Ejemplo 2: f(x) = eˣ/x²</div>
            <div class="tc-formula-sm">u = eˣ → u' = eˣ  |  v = x² → v' = 2x</div>
            <div class="tc-formula-sm" style="color:var(--green2)">f'(x) = (eˣ·x² − eˣ·2x)/x⁴ = eˣ(x²−2x)/x⁴ ✅</div>
          </div>
        </div>
      </div>

      <!-- CADENA -->
      <div class="teoria-card tc-blue tc-wide" id="d-cadena">
        <div class="tc-head">⛓️ Regla de la Cadena — La más importante</div>
        <div class="tc-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;align-items:start">
            <div>
              <div class="tc-formula">d/dx[f(g(x))] = f'(g(x)) · g'(x)</div>
              <p style="margin:.65rem 0"><strong>¿Cuándo usarla?</strong> Cuando una función "conocida" (sin, cos, exp, etc.) tiene ADENTRO otra función que no es solo x.</p>
              <div class="tc-pasos-regla">
                <div class="tc-paso-r"><span class="tc-paso-n">1</span> Identifica la función EXTERIOR (la que está "afuera")</div>
                <div class="tc-paso-r"><span class="tc-paso-n">2</span> Identifica la función INTERIOR u = g(x)</div>
                <div class="tc-paso-r"><span class="tc-paso-n">3</span> Deriva la exterior evaluada en u</div>
                <div class="tc-paso-r"><span class="tc-paso-n">4</span> Deriva la interior: u'</div>
                <div class="tc-paso-r"><span class="tc-paso-n">5</span> Multiplica: [exterior derivada] × u'</div>
              </div>
              <div class="tc-tip-box" style="margin-top:.75rem">
                💡 <strong>Regla nemotécnica:</strong> "Deriva de afuera hacia adentro y multiplica por la derivada de lo que está adentro."
              </div>
            </div>
            <div>
              <div style="display:flex;flex-direction:column;gap:.5rem">
                <div class="tc-ejemplo">
                  <div class="tc-ej-title">sin(x²)</div>
                  <div class="tc-formula-sm">Exterior: sin → cos | Interior: x² → 2x</div>
                  <div class="tc-formula-sm" style="color:var(--green2)">→ cos(x²) · 2x = 2x·cos(x²)</div>
                </div>
                <div class="tc-ejemplo">
                  <div class="tc-ej-title">exp(3x)</div>
                  <div class="tc-formula-sm">Exterior: eᵘ → eᵘ | Interior: 3x → 3</div>
                  <div class="tc-formula-sm" style="color:var(--green2)">→ exp(3x) · 3 = 3exp(3x)</div>
                </div>
                <div class="tc-ejemplo">
                  <div class="tc-ej-title">ln(x²+1)</div>
                  <div class="tc-formula-sm">Exterior: ln → 1/u | Interior: x²+1 → 2x</div>
                  <div class="tc-formula-sm" style="color:var(--green2)">→ (1/(x²+1)) · 2x = 2x/(x²+1)</div>
                </div>
                <div class="tc-ejemplo">
                  <div class="tc-ej-title">(x²+1)⁵</div>
                  <div class="tc-formula-sm">Exterior: u⁵ → 5u⁴ | Interior: x²+1 → 2x</div>
                  <div class="tc-formula-sm" style="color:var(--green2)">→ 5(x²+1)⁴ · 2x = 10x(x²+1)⁴</div>
                </div>
                <div class="tc-ejemplo">
                  <div class="tc-ej-title">Cadena doble: exp(sin(x))</div>
                  <div class="tc-formula-sm">Exterior: eᵘ → eᵘ | Interior: sin(x) → cos(x)</div>
                  <div class="tc-formula-sm" style="color:var(--green2)">→ exp(sin(x)) · cos(x)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLA COMPLETA -->
      <div class="teoria-card tc-green tc-wide" id="d-tabla">
        <div class="tc-head">📋 Tabla completa de derivadas</div>
        <div class="tc-body">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.35rem">
            <div class="tc-tabla-col">
              <div class="tc-tabla-hdr">Función f(x)</div>
              <div class="tc-tabla-hdr">Derivada f'(x)</div>
              <div class="tc-tabla-hdr">Notas</div>
            </div>
            ${[
              ['c (constante)','0','c es cualquier número'],
              ['x','1',''],
              ['xⁿ','n·xⁿ⁻¹','n puede ser fraccional o negativo'],
              ['c·f(x)','c·f\'(x)','la constante "sale"'],
              ['f(x)±g(x)',"f'(x)±g'(x)",'término a término'],
              ['eˣ','eˣ','única función = propia derivada'],
              ['aˣ','aˣ·ln(a)','a es base constante'],
              ['ln(x)','1/x','x > 0'],
              ['log_a(x)','1/(x·ln a)',''],
              ['sin(x)','cos(x)',''],
              ['cos(x)','-sin(x)','¡ojo el signo negativo!'],
              ['tan(x)','sec²(x)','= 1/cos²(x)'],
              ['csc(x)','-csc(x)cot(x)',''],
              ['sec(x)','sec(x)tan(x)',''],
              ['cot(x)','-csc²(x)',''],
              ['arcsin(x)','1/√(1-x²)','|x| < 1'],
              ['arccos(x)','-1/√(1-x²)',''],
              ['arctan(x)','1/(1+x²)',''],
              ['√x = x^(1/2)','1/(2√x)','= (1/2)x^(-1/2)'],
              ['1/x = x^(-1)','-1/x²',''],
            ].map(([f,d,n])=>`
              <div class="tc-tabla-row" style="grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:.35rem">
                <div class="tc-tabla-cell tc-cell-fn">${f}</div>
                <div class="tc-tabla-cell tc-cell-der">${d}</div>
                <div class="tc-tabla-cell tc-cell-note">${n}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- EJEMPLOS RESUELTOS -->
      <div class="teoria-card tc-violet tc-wide" id="d-ejemplos">
        <div class="tc-head">🧩 Ejemplos resueltos — De menor a mayor dificultad</div>
        <div class="tc-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Básico: f(x) = 3x⁴ − 2x² + 7</div>
              <div class="tc-ec-paso">Regla: Suma/Resta término a término</div>
              <div class="tc-ec-linea">d/dx[3x⁴] = 12x³ (regla potencia: 3·4·x³)</div>
              <div class="tc-ec-linea">d/dx[-2x²] = -4x (regla potencia: -2·2·x)</div>
              <div class="tc-ec-linea">d/dx[7] = 0 (constante)</div>
              <div class="tc-ec-res">f'(x) = 12x³ − 4x</div>
            </div>

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Producto: f(x) = x² · ln(x)</div>
              <div class="tc-ec-paso">Regla: Producto → (u·v)' = u'v + uv'</div>
              <div class="tc-ec-linea">u = x² → u' = 2x</div>
              <div class="tc-ec-linea">v = ln(x) → v' = 1/x</div>
              <div class="tc-ec-linea">f'= 2x·ln(x) + x²·(1/x)</div>
              <div class="tc-ec-res">f'(x) = 2x·ln(x) + x</div>
            </div>

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Cadena: f(x) = sin(x³)</div>
              <div class="tc-ec-paso">Regla: Cadena → d/dx[sin(u)] = cos(u)·u'</div>
              <div class="tc-ec-linea">Exterior: sin(·) → cos(·)</div>
              <div class="tc-ec-linea">Interior: u = x³ → u' = 3x²</div>
              <div class="tc-ec-linea">f'= cos(x³) · 3x²</div>
              <div class="tc-ec-res">f'(x) = 3x²·cos(x³)</div>
            </div>

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Cociente: f(x) = (x²+1)/(x−1)</div>
              <div class="tc-ec-paso">Regla: Cociente → (u'v − uv')/v²</div>
              <div class="tc-ec-linea">u = x²+1 → u' = 2x</div>
              <div class="tc-ec-linea">v = x−1 → v' = 1</div>
              <div class="tc-ec-linea">f'= [2x·(x−1) − (x²+1)·1]/(x−1)²</div>
              <div class="tc-ec-res">f'(x) = (x²−2x−1)/(x−1)²</div>
            </div>

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Cadena doble: f(x) = ln(sin(x²))</div>
              <div class="tc-ec-paso">Hay 3 funciones anidadas: ln → sin → x²</div>
              <div class="tc-ec-linea">Capa 1: d/dx[ln(u)] = 1/u con u=sin(x²)</div>
              <div class="tc-ec-linea">Capa 2: d/dx[sin(v)] = cos(v) con v=x²</div>
              <div class="tc-ec-linea">Capa 3: d/dx[x²] = 2x</div>
              <div class="tc-ec-linea">f'= (1/sin(x²)) · cos(x²) · 2x</div>
              <div class="tc-ec-res">f'(x) = 2x·cos(x²)/sin(x²)</div>
            </div>

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Combinada: f(x) = x²·exp(sin(x))</div>
              <div class="tc-ec-paso">Regla: Producto. u=x², v=exp(sin(x))</div>
              <div class="tc-ec-linea">u' = 2x</div>
              <div class="tc-ec-linea">v' = exp(sin(x))·cos(x) [cadena]</div>
              <div class="tc-ec-linea">f'= 2x·exp(sin(x)) + x²·exp(sin(x))·cos(x)</div>
              <div class="tc-ec-res">f'= exp(sin(x))·[2x + x²cos(x)]</div>
            </div>

          </div>
        </div>
      </div>

    </div><!-- fin teoria-grid -->
  </div><!-- fin tc-derivadas -->

  <!-- ════════════ LÍMITES ════════════ -->
  <div class="ttab-content" id="tc-limites">

    <div class="teoria-hero">
      <div class="teoria-icon">∫</div>
      <div>
        <h3>Límites — Guía completa</h3>
        <p>Definición, propiedades, técnicas de resolución y límites notables con ejemplos.</p>
      </div>
    </div>

    <!-- ÍNDICE -->
    <div class="tc-indice">
      <span class="tc-ind-label">Ir a →</span>
      <a class="tc-ind-link" href="#l-def">Definición</a>
      <a class="tc-ind-link" href="#l-props">Propiedades</a>
      <a class="tc-ind-link" href="#l-tecnicas">Técnicas</a>
      <a class="tc-ind-link" href="#l-notables">Notables</a>
      <a class="tc-ind-link" href="#l-infinito">Al infinito</a>
      <a class="tc-ind-link" href="#l-indet">Indeterminaciones</a>
      <a class="tc-ind-link" href="#l-ejemplos">Ejemplos</a>
    </div>

    <div class="teoria-grid">

      <!-- DEFINICIÓN -->
      <div class="teoria-card tc-blue tc-wide" id="l-def">
        <div class="tc-head">📌 ¿Qué es un límite?</div>
        <div class="tc-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-items:start">
            <div>
              <p>El límite de f(x) cuando x → a es el valor al que se <strong>aproxima</strong> la función cuando x se acerca a a, <em>sin necesariamente llegar a a</em>.</p>
              <div class="tc-formula">lím(x→a) f(x) = L</div>
              <p>Esto significa que f(x) puede aproximarse a L tanto como queramos haciendo x suficientemente cercano a a.</p>
              <div class="tc-tip-box" style="margin-top:.65rem">
                💡 <strong>Clave:</strong> El límite describe el comportamiento de la función <em>cerca</em> del punto, no necesariamente <em>en</em> el punto. f(a) puede no existir y el límite sí existir.
              </div>
            </div>
            <div>
              <div class="tc-concepto-box">
                <div class="tc-concepto-title">Límites laterales</div>
                <div class="tc-formula-sm">lím(x→a⁺) f(x) → se acerca desde la derecha</div>
                <div class="tc-formula-sm">lím(x→a⁻) f(x) → se acerca desde la izquierda</div>
                <p style="font-size:.8rem;color:var(--text2);margin-top:.4rem">El límite <strong>existe</strong> ⟺ ambos laterales son iguales.</p>
              </div>
              <div class="tc-concepto-box" style="margin-top:.6rem">
                <div class="tc-concepto-title">Continuidad</div>
                <p style="font-size:.82rem;color:var(--text2)">f es continua en a si:</p>
                <div class="tc-formula-sm">lím(x→a) f(x) = f(a)</div>
                <p style="font-size:.78rem;color:var(--text3);margin-top:.3rem">El límite existe, f(a) existe y son iguales.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PROPIEDADES -->
      <div class="teoria-card tc-violet" id="l-props">
        <div class="tc-head">📐 Propiedades algebraicas de los límites</div>
        <div class="tc-body">
          <p style="margin-bottom:.65rem">Si lím(x→a) f(x) = L y lím(x→a) g(x) = M, entonces:</p>
          <div class="tc-prop-list">
            <div class="tc-prop highlight">
              <span>Suma</span>
              <span>lím [f+g] = L + M</span>
            </div>
            <div class="tc-prop highlight">
              <span>Resta</span>
              <span>lím [f−g] = L − M</span>
            </div>
            <div class="tc-prop highlight">
              <span>Producto</span>
              <span>lím [f·g] = L · M</span>
            </div>
            <div class="tc-prop highlight">
              <span>Cociente</span>
              <span>lím [f/g] = L/M  (M ≠ 0)</span>
            </div>
            <div class="tc-prop highlight">
              <span>Constante</span>
              <span>lím [c·f] = c · L</span>
            </div>
            <div class="tc-prop highlight">
              <span>Potencia</span>
              <span>lím [f]ⁿ = Lⁿ</span>
            </div>
            <div class="tc-prop highlight">
              <span>Raíz</span>
              <span>lím √f = √L  (L ≥ 0)</span>
            </div>
          </div>
          <div class="tc-tip-box" style="margin-top:.75rem">
            💡 Estas propiedades solo aplican cuando los límites individuales existen y son finitos.
          </div>
        </div>
      </div>

      <!-- TÉCNICAS -->
      <div class="teoria-card tc-cyan tc-wide" id="l-tecnicas">
        <div class="tc-head">🔧 Técnicas de resolución — Paso a paso</div>
        <div class="tc-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">

            <div class="tc-tecnica-bloque">
              <div class="tc-tec-num">1</div>
              <div>
                <div class="tc-tec-title">Sustitución directa</div>
                <div class="tc-tec-desc">Simplemente reemplazamos x por el valor del punto. Funciona cuando la función es continua en ese punto.</div>
                <div class="tc-formula-sm">lím(x→3) (x²+1) → 3²+1 = 10 ✅</div>
                <div class="tc-tec-cuando">⚠️ Si obtienes 0/0, necesitas otra técnica.</div>
              </div>
            </div>

            <div class="tc-tecnica-bloque">
              <div class="tc-tec-num">2</div>
              <div>
                <div class="tc-tec-title">Factorización</div>
                <div class="tc-tec-desc">Cuando hay 0/0: factorizar numerador y denominador para cancelar el factor común que produce la indeterminación.</div>
                <div class="tc-formula-sm">lím(x→2) (x²-4)/(x-2)</div>
                <div class="tc-formula-sm">= lím(x→2) (x+2)(x-2)/(x-2)</div>
                <div class="tc-formula-sm" style="color:var(--green2)">= lím(x→2) (x+2) = 4 ✅</div>
              </div>
            </div>

            <div class="tc-tecnica-bloque">
              <div class="tc-tec-num">3</div>
              <div>
                <div class="tc-tec-title">Conjugada (racionalización)</div>
                <div class="tc-tec-desc">Cuando hay raíces cuadradas: multiplicar por la conjugada para eliminarlas.</div>
                <div class="tc-formula-sm">lím(x→0) (√(x+1)−1)/x</div>
                <div class="tc-formula-sm">× (√(x+1)+1)/(√(x+1)+1)</div>
                <div class="tc-formula-sm">= lím x/(x(√(x+1)+1))</div>
                <div class="tc-formula-sm" style="color:var(--green2)">= 1/2 ✅</div>
              </div>
            </div>

            <div class="tc-tecnica-bloque">
              <div class="tc-tec-num">4</div>
              <div>
                <div class="tc-tec-title">Comparación de grados (∞)</div>
                <div class="tc-tec-desc">Para límites al infinito con cocientes: dividir por el término de mayor grado.</div>
                <div class="tc-formula-sm">lím(x→∞) (3x²+x)/(x²-5)</div>
                <div class="tc-formula-sm">÷ x²: (3+1/x)/(1-5/x²)</div>
                <div class="tc-formula-sm" style="color:var(--green2)">→ 3/1 = 3 ✅</div>
              </div>
            </div>

            <div class="tc-tecnica-bloque">
              <div class="tc-tec-num">5</div>
              <div>
                <div class="tc-tec-title">Factorización especial: Diferencia de cubos</div>
                <div class="tc-tec-desc">a³−b³ = (a−b)(a²+ab+b²)</div>
                <div class="tc-formula-sm">lím(x→1) (x³-1)/(x-1)</div>
                <div class="tc-formula-sm">= lím (x-1)(x²+x+1)/(x-1)</div>
                <div class="tc-formula-sm" style="color:var(--green2)">= lím(x²+x+1) = 3 ✅</div>
              </div>
            </div>

            <div class="tc-tecnica-bloque">
              <div class="tc-tec-num">6</div>
              <div>
                <div class="tc-tec-title">Límites notables trigonométricos</div>
                <div class="tc-tec-desc">Identidades fundamentales para límites con trig.</div>
                <div class="tc-formula-sm" style="color:var(--indigo2)">lím(x→0) sin(x)/x = 1</div>
                <div class="tc-formula-sm" style="color:var(--indigo2)">lím(x→0) tan(x)/x = 1</div>
                <div class="tc-formula-sm" style="color:var(--indigo2)">lím(x→0) (1−cos x)/x² = 1/2</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- NOTABLES -->
      <div class="teoria-card tc-pink" id="l-notables">
        <div class="tc-head">⭐ Límites notables — Memorizar</div>
        <div class="tc-body">
          <div class="tc-prop-list">
            <div class="tc-prop highlight"><span>lím(x→0) sin(x)/x</span><span>= 1</span></div>
            <div class="tc-prop highlight"><span>lím(x→0) tan(x)/x</span><span>= 1</span></div>
            <div class="tc-prop highlight"><span>lím(x→0) (1−cos x)/x</span><span>= 0</span></div>
            <div class="tc-prop highlight"><span>lím(x→0) (1−cos x)/x²</span><span>= 1/2</span></div>
            <div class="tc-prop highlight"><span>lím(x→0) (eˣ−1)/x</span><span>= 1</span></div>
            <div class="tc-prop highlight"><span>lím(x→0) (aˣ−1)/x</span><span>= ln(a)</span></div>
            <div class="tc-prop highlight"><span>lím(x→0) ln(1+x)/x</span><span>= 1</span></div>
            <div class="tc-prop highlight"><span>lím(x→∞) (1+1/x)ˣ</span><span>= e ≈ 2.718</span></div>
            <div class="tc-prop highlight"><span>lím(x→0) (1+x)^(1/x)</span><span>= e</span></div>
            <div class="tc-prop highlight"><span>lím(x→0) arcsin(x)/x</span><span>= 1</span></div>
            <div class="tc-prop"><span>lím(x→0) sin(ax)/sin(bx)</span><span>= a/b</span></div>
            <div class="tc-prop"><span>lím(x→0) sin(ax)/(bx)</span><span>= a/b</span></div>
          </div>
        </div>
      </div>

      <!-- AL INFINITO -->
      <div class="teoria-card tc-gold" id="l-infinito">
        <div class="tc-head">∞ Límites al infinito — Reglas de comparación</div>
        <div class="tc-body">
          <p style="margin-bottom:.7rem">Para cocientes de polinomios cuando x→±∞:</p>
          <div class="tc-tabla-simple">
            <div class="tc-ts-hdr">
              <span>Situación</span><span>Resultado</span><span>Ejemplo</span>
            </div>
            <div class="tc-ts-row">
              <span>Grado num. &lt; Grado den.</span>
              <span style="color:var(--green2)">0</span>
              <span class="tc-formula-sm">(3x)/(x²) → 0</span>
            </div>
            <div class="tc-ts-row">
              <span>Grado num. = Grado den.</span>
              <span style="color:var(--indigo2)">coef. líderes</span>
              <span class="tc-formula-sm">(3x²)/(2x²) → 3/2</span>
            </div>
            <div class="tc-ts-row">
              <span>Grado num. &gt; Grado den.</span>
              <span style="color:#fca5a5">±∞</span>
              <span class="tc-formula-sm">(x³)/x → ∞</span>
            </div>
          </div>
          <div class="tc-tip-box" style="margin-top:.75rem">
            💡 <strong>Velocidades de crecimiento</strong> (de más lento a más rápido):<br>
            <span style="font-family:var(--font-mono)">ln(x) ≪ x^n ≪ eˣ ≪ x^x</span>
          </div>
          <div style="margin-top:.75rem">
            <div class="tc-formula-sm">lím(x→∞) ln(x)/x = 0  (la recta domina al logaritmo)</div>
            <div class="tc-formula-sm">lím(x→∞) x^n/eˣ = 0  (la exponencial domina a cualquier potencia)</div>
          </div>
        </div>
      </div>

      <!-- INDETERMINACIONES -->
      <div class="teoria-card tc-green" id="l-indet">
        <div class="tc-head">⚠️ Formas indeterminadas</div>
        <div class="tc-body">
          <p style="margin-bottom:.65rem">Una forma indeterminada ocurre cuando la sustitución directa no da un resultado definido:</p>
          <div class="tc-prop-list">
            <div class="tc-prop highlight"><span>0/0</span><span>Factorizar o racionalizar</span></div>
            <div class="tc-prop highlight"><span>∞/∞</span><span>Comparar grados</span></div>
            <div class="tc-prop highlight"><span>0·∞</span><span>Reescribir como 0/(1/∞) o ∞/(1/0)</span></div>
            <div class="tc-prop highlight"><span>∞−∞</span><span>Factorizar o combinar fracciones</span></div>
            <div class="tc-prop highlight"><span>1^∞</span><span>Usar lím(1+1/n)ⁿ = e</span></div>
            <div class="tc-prop highlight"><span>0⁰ o ∞⁰</span><span>Tomar logaritmo</span></div>
          </div>
          <div class="tc-tip-box" style="margin-top:.75rem">
            ⚠️ Estas formas NO tienen un valor definido sin análisis adicional. Son puntos de partida para aplicar técnicas algebraicas.
          </div>
        </div>
      </div>

      <!-- EJEMPLOS LÍMITES -->
      <div class="teoria-card tc-violet tc-wide" id="l-ejemplos">
        <div class="tc-head">🧩 Ejemplos resueltos de límites</div>
        <div class="tc-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Directo: lím(x→4) (x²−2x)</div>
              <div class="tc-ec-paso">Función continua → sustitución directa</div>
              <div class="tc-ec-linea">f(4) = 4²−2·4 = 16−8 = 8</div>
              <div class="tc-ec-res">lím = 8 ✅</div>
            </div>

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Factorizar: lím(x→3) (x²-9)/(x-3)</div>
              <div class="tc-ec-paso">0/0 → factorizar x²-9</div>
              <div class="tc-ec-linea">x²-9 = (x+3)(x-3)</div>
              <div class="tc-ec-linea">= lím(x→3) (x+3)(x-3)/(x-3)</div>
              <div class="tc-ec-linea">= lím(x→3) (x+3)</div>
              <div class="tc-ec-res">= 3+3 = 6 ✅</div>
            </div>

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Conjugada: lím(x→0) (√(x+4)−2)/x</div>
              <div class="tc-ec-paso">0/0 → multiplicar por conjugada (√(x+4)+2)</div>
              <div class="tc-ec-linea">Num: (√(x+4))²−4 = x+4−4 = x</div>
              <div class="tc-ec-linea">= lím x / (x·(√(x+4)+2))</div>
              <div class="tc-ec-linea">= lím 1/(√(x+4)+2)</div>
              <div class="tc-ec-res">= 1/(√4+2) = 1/4 ✅</div>
            </div>

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Infinito: lím(x→∞) (5x³-x)/(2x³+7)</div>
              <div class="tc-ec-paso">Grados iguales (3) → dividir por x³</div>
              <div class="tc-ec-linea">(5-1/x²)/(2+7/x³)</div>
              <div class="tc-ec-linea">Cuando x→∞: 1/x²→0, 7/x³→0</div>
              <div class="tc-ec-res">= 5/2 ✅</div>
            </div>

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Notable: lím(x→0) sin(3x)/(2x)</div>
              <div class="tc-ec-paso">Usar lím sin(ax)/(bx) = a/b</div>
              <div class="tc-ec-linea">Reescribir: (3/2)·sin(3x)/(3x)</div>
              <div class="tc-ec-linea">lím sin(3x)/(3x) = 1 (límite notable)</div>
              <div class="tc-ec-res">= (3/2)·1 = 3/2 ✅</div>
            </div>

            <div class="tc-ejemplo-completo">
              <div class="tc-ec-titulo">Cubos: lím(x→2) (x³-8)/(x-2)</div>
              <div class="tc-ec-paso">0/0 → diferencia de cubos: a³-b³=(a-b)(a²+ab+b²)</div>
              <div class="tc-ec-linea">x³-8 = (x-2)(x²+2x+4)</div>
              <div class="tc-ec-linea">= lím(x→2) (x²+2x+4)</div>
              <div class="tc-ec-res">= 4+4+4 = 12 ✅</div>
            </div>

          </div>
        </div>
      </div>

    </div><!-- fin teoria-grid límites -->
  </div><!-- fin tc-limites -->`;

  /* Scroll smooth para los anclajes */
  cont.querySelectorAll('.tc-ind-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function switchTeoria(tab, btn) {
  document.querySelectorAll('.ttab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.ttab-content').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const tc = document.getElementById('tc-' + tab);
  if (tc) tc.classList.add('active');
}
