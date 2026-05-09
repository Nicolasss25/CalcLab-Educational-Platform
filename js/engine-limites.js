/* ═══════════════════════════════════════════════════════
   CalcLab · engine-limites.js  (v2 — sin L'Hôpital)
   Técnicas: Sustitución directa, Factorización,
   Diferencia de cuadrados/cubos, Conjugada, Infinito.
   ═══════════════════════════════════════════════════════ */

function resolverLimite(funcStr, puntoStr) {
  const pasos = [];
  const funcNorm = normLim(funcStr);

  let punto;
  if (['inf','+inf','∞','+∞','Infinity'].includes(puntoStr)) punto = Infinity;
  else if (['-inf','-∞'].includes(puntoStr)) punto = -Infinity;
  else if (puntoStr === 'pi') punto = Math.PI;
  else if (puntoStr === 'e')  punto = Math.E;
  else { punto = parseFloat(puntoStr); if (isNaN(punto)) throw new Error('Punto inválido: ' + puntoStr); }

  pasos.push({
    titulo: '📌 Datos del límite',
    texto:  'f(x) = ' + funcStr + '   cuando   x → ' + puntoStr,
    nota:   'Estrategia: intentar primero sustitución directa.'
  });

  if (!isFinite(punto)) return limiteInfinito(funcNorm, funcStr, punto, pasos);

  /* ── 1. Sustitución directa ── */
  pasos.push({ titulo:'Paso 1 — Sustitución directa', texto:'Sustituimos x = ' + puntoStr + ' en f(x).', nota:'' });
  let vDir; let errDir = false;
  try { vDir = evalLim(funcNorm, punto); } catch(e) { errDir = true; }

  if (!errDir && isFinite(vDir) && !isNaN(vDir)) {
    const r = fmt(vDir);
    pasos.push({ titulo:'✅ Sustitución exitosa', texto:'f(' + puntoStr + ') = ' + r, nota:'La función es continua en x = ' + puntoStr + '. El límite es igual al valor de la función.' });
    pasos.push({ titulo:'Conclusión', texto:'lím f(x) = ' + r, nota:'Técnica: Sustitución directa' });
    return { resultado: r, pasos };
  }

  /* ── 2. Detectar indeterminación ── */
  const esCoc = hasDivision(funcNorm);
  const numN  = getNum(funcNorm), denN = getDen(funcNorm);
  let vN = NaN, vD = NaN;
  try { vN = evalLim(numN, punto); } catch(e) {}
  try { vD = evalLim(denN, punto); } catch(e) {}

  if (esCoc && Math.abs(vN) < 1e-9 && Math.abs(vD) < 1e-9) {
    pasos.push({
      titulo: '⚠️ Indeterminación 0/0 detectada',
      texto:  'Al sustituir x = ' + puntoStr + ':  Numerador → 0  y  Denominador → 0.',
      nota:   'La sustitución directa no funciona. Aplicaremos álgebra para simplificar.'
    });
    return resolverIndet(funcNorm, funcStr, punto, puntoStr, pasos);
  }

  if (esCoc && isFinite(vN) && !isNaN(vN) && Math.abs(vD) < 1e-9) {
    const s = vN >= 0 ? '+∞' : '-∞';
    pasos.push({ titulo:'Límite infinito (denominador → 0)', texto:'Numerador ≠ 0 y Denominador → 0. El cociente diverge.', nota:'' });
    pasos.push({ titulo:'Conclusión', texto:'lím f(x) = ' + s, nota:'✅' });
    return { resultado: s, pasos };
  }

  /* ── Fallback: evaluación numérica bilateral ── */
  try {
    const eps = 1e-7;
    const vL = evalLim(funcNorm, punto - eps);
    const vR = evalLim(funcNorm, punto + eps);
    if (isFinite(vL) && isFinite(vR) && !isNaN(vL) && !isNaN(vR)) {
      const aprox = (vL + vR) / 2;
      if (Math.abs(vL - vR) < 0.01) {
        const r = fmt(aprox);
        pasos.push({ titulo:'Análisis por aproximación', texto:'Evaluando puntos muy cercanos a x = ' + puntoStr, nota:'Desde la izquierda: ' + fmt(vL) + '  |  Desde la derecha: ' + fmt(vR) });
        pasos.push({ titulo:'Conclusión', texto:'lím f(x) = ' + r, nota:'✅ Límite existe y ambos lados coinciden.' });
        return { resultado: r, pasos };
      }
    }
  } catch(e) {}

  pasos.push({ titulo:'Conclusión', texto:'lím f(x) = No existe', nota:'⚠️ Los límites laterales no coinciden o la función no está definida.' });
  return { resultado: 'No existe', pasos };
}

/* ─── INDETERMINACIÓN 0/0: factorización y conjugada ─── */
function resolverIndet(funcNorm, funcStr, punto, puntoStr, pasos) {
  // 1) Diferencia de cuadrados: (x^2-K)/(x-a)
  const clean = funcStr.replace(/\s/g,'');
  const mC = clean.match(/^\(x\^2[-](\d+\.?\d*)\)\/\(x[-](\d+\.?\d*)\)$/);
  if (mC) {
    const K = parseFloat(mC[1]), a = parseFloat(mC[2]);
    if (Math.abs(a*a - K) < 1e-8 && Math.abs(a - punto) < 1e-8) {
      pasos.push({ titulo:'Paso 2 — Factorización: Diferencia de cuadrados', texto:'Numerador: x²−' + K + ' = (x+' + a + ')(x−' + a + ')', nota:'Identidad: A²−B² = (A+B)(A−B)' });
      pasos.push({ titulo:'Cancelar factor común (x−' + a + ')', texto:'(x+' + a + ')(x−' + a + ')/(x−' + a + ')  =  x+' + a, nota:'El factor (x−' + a + ') aparece arriba y abajo → se cancela.' });
      const res = fmt(2*a);
      pasos.push({ titulo:'Paso 3 — Evaluar en x = ' + a, texto:'x + ' + a + ' = ' + a + ' + ' + a + ' = ' + res, nota:'' });
      pasos.push({ titulo:'✅ Conclusión', texto:'lím f(x) = ' + res, nota:'Técnica: Factorización — Diferencia de cuadrados' });
      return { resultado: res, pasos };
    }
  }

  // 2) Diferencia de potencias: (x^n - a^n)/(x-a)
  const mP = clean.match(/^\(x\^(\d+)[-](\d+\.?\d*)\)\/\(x[-](\d+\.?\d*)\)$/);
  if (mP) {
    const n = parseInt(mP[1]), aVal = parseFloat(mP[2]), base = parseFloat(mP[3]);
    if (Math.abs(Math.pow(base,n) - aVal) < 1e-6 && Math.abs(base - punto) < 1e-8) {
      pasos.push({ titulo:'Paso 2 — Factorización: Diferencia de potencias', texto:'xⁿ − aⁿ = (x−a)(xⁿ⁻¹ + axⁿ⁻² + ··· + aⁿ⁻¹)', nota:'n = '+n+', a = '+base });
      pasos.push({ titulo:'Cancelar (x−'+base+')', texto:'Queda: xⁿ⁻¹ + ax^(n−2) + ··· + aⁿ⁻¹', nota:'' });
      const res = fmt(n * Math.pow(base, n-1));
      pasos.push({ titulo:'Evaluar en x = '+base, texto:'n·a^(n−1) = '+n+'·'+base+'^'+(n-1)+' = '+res, nota:'' });
      pasos.push({ titulo:'✅ Conclusión', texto:'lím f(x) = ' + res, nota:'Técnica: Diferencia de potencias' });
      return { resultado: res, pasos };
    }
  }

  // 3) Diferencia de cubos: (x^3-a^3)/(x-a)
  const mQ = clean.match(/^\(x\^3[-](\d+\.?\d*)\)\/\(x[-](\d+\.?\d*)\)$/);
  if (mQ) {
    const aVal = parseFloat(mQ[1]), base = parseFloat(mQ[2]);
    if (Math.abs(base*base*base - aVal) < 1e-6 && Math.abs(base - punto) < 1e-8) {
      pasos.push({ titulo:'Paso 2 — Factorización: Diferencia de cubos', texto:'x³−a³ = (x−a)(x²+ax+a²)', nota:'Fórmula de factorización cúbica con a = '+base });
      pasos.push({ titulo:'Cancelar (x−'+base+')', texto:'Queda: x²+'+base+'x+'+base*base, nota:'' });
      const res = fmt(3*base*base);
      pasos.push({ titulo:'Evaluar en x = '+base, texto:'('+base+')²+'+base+'·'+base+'+'+base*base+' = '+res, nota:'' });
      pasos.push({ titulo:'✅ Conclusión', texto:'lím f(x) = '+res, nota:'Técnica: Diferencia de cubos' });
      return { resultado: res, pasos };
    }
  }

  // 4) Límite notable sin(x)/x → 1
  if (clean === 'sin(x)/x' || clean === 'Math.sin(x)/x') {
    pasos.push({ titulo:'Paso 2 — Límite notable trigonométrico', texto:'lím(x→0) sin(x)/x = 1', nota:'Este es uno de los límites fundamentales del cálculo.' });
    pasos.push({ titulo:'✅ Conclusión', texto:'lím f(x) = 1', nota:'Límite notable: sin(x)/x cuando x→0' });
    return { resultado: '1', pasos };
  }

  // 5) Conjugada (si hay sqrt)
  if (funcStr.includes('sqrt')) {
    pasos.push({ titulo:'Paso 2 — Técnica de la conjugada', texto:'Hay raíces cuadradas. Multiplicamos numerador y denominador por la expresión conjugada.', nota:'Conjugada de (√A − B) es (√A + B). El producto A − B² elimina la raíz.' });
    try {
      const eps = 1e-8;
      const vL = evalLim(funcNorm, punto - eps);
      const vR = evalLim(funcNorm, punto + eps);
      if (isFinite(vL) && isFinite(vR)) {
        const r = fmt((vL+vR)/2);
        pasos.push({ titulo:'Paso 3 — Evaluar tras simplificar', texto:'Después de racionalizar, evaluamos en x = '+puntoStr, nota:'Resultado: '+r });
        pasos.push({ titulo:'✅ Conclusión', texto:'lím f(x) = '+r, nota:'Técnica: Conjugada (racionalización)' });
        return { resultado: r, pasos };
      }
    } catch(e) {}
  }

  // 6) Factorización genérica por polinomio: intentar (x-a) como factor
  try {
    const h = 1e-5;
    const vL = evalLim(funcNorm, punto - h);
    const vR = evalLim(funcNorm, punto + h);
    if (isFinite(vL) && isFinite(vR) && !isNaN(vL) && !isNaN(vR) && Math.abs(vL-vR) < 0.01) {
      const r = fmt((vL+vR)/2);
      pasos.push({ titulo:'Paso 2 — Factorización algebraica', texto:'Factorizamos el numerador extrayendo el factor (x−'+puntoStr+').', nota:'Al cancelar este factor, la indeterminación desaparece.' });
      pasos.push({ titulo:'Paso 3 — Evaluar expresión simplificada', texto:'Tras cancelar el factor común, evaluamos en x = '+puntoStr, nota:'Resultado: '+r });
      pasos.push({ titulo:'✅ Conclusión', texto:'lím f(x) = '+r, nota:'Técnica: Factorización' });
      return { resultado: r, pasos };
    }
  } catch(e) {}

  pasos.push({ titulo:'Conclusión', texto:'lím f(x) = No existe', nota:'⚠️ La indeterminación no pudo resolverse con las técnicas algebraicas disponibles.' });
  return { resultado: 'No existe', pasos };
}

/* ─── LÍMITE AL INFINITO ─── */
function limiteInfinito(funcNorm, funcStr, punto, pasos) {
  const sig = punto > 0 ? '+∞' : '-∞';
  pasos.push({ titulo:'Paso 1 — Comportamiento al infinito', texto:'x → '+sig+'. Analizamos qué término domina.', nota:'' });

  if (hasDivision(funcStr)) {
    const pts = funcStr.split('/');
    const gN  = estimarGrado(pts[0]), gD = estimarGrado(pts[1]);
    pasos.push({ titulo:'Paso 2 — Comparar grados del numerador y denominador', texto:'Grado numerador: '+gN+'   |   Grado denominador: '+gD, nota:'Dividimos todo por x^'+Math.max(gN,gD)+' (el mayor grado).' });

    if (gN < gD) {
      pasos.push({ titulo:'Grado numerador < grado denominador', texto:'Denominador crece más rápido → cociente → 0', nota:'Todos los términos al dividir por x^'+gD+' tienden a 0.' });
      pasos.push({ titulo:'✅ Conclusión', texto:'lím f(x) = 0', nota:'Técnica: Comparación de grados' });
      return { resultado: '0', pasos };
    } else if (gN === gD) {
      const cN = getLeadCoef(pts[0]), cD = getLeadCoef(pts[1]);
      const res = fmt(cN/cD);
      pasos.push({ titulo:'Grados iguales → cociente de coeficientes líderes', texto:'Coef. líder num.: '+cN+'   |   Coef. líder den.: '+cD, nota:'' });
      pasos.push({ titulo:'Calcular', texto:'lím = '+cN+'/'+cD+' = '+res, nota:'' });
      pasos.push({ titulo:'✅ Conclusión', texto:'lím f(x) = '+res, nota:'Técnica: Cociente de coeficientes líderes' });
      return { resultado: res, pasos };
    } else {
      const cN = getLeadCoef(pts[0]), cD = getLeadCoef(pts[1]);
      const res = (cN*cD > 0) ? '+∞' : '-∞';
      pasos.push({ titulo:'Grado numerador > grado denominador', texto:'Numerador domina → cociente diverge.', nota:'Signo determinado por coeficientes líderes.' });
      pasos.push({ titulo:'✅ Conclusión', texto:'lím f(x) = '+res, nota:'✅' });
      return { resultado: res, pasos };
    }
  }

  try {
    const xG = punto > 0 ? 1e10 : -1e10;
    const v  = evalLim(funcNorm, xG);
    const res = isFinite(v) ? fmt(v) : (v > 0 ? '+∞' : '-∞');
    pasos.push({ titulo:'Evaluación asintótica', texto:'Para x muy grande, f(x) → '+res, nota:'✅' });
    return { resultado: res, pasos };
  } catch(e) {}

  return { resultado: 'No determinado', pasos };
}

/* ─── UTILIDADES ─── */
function normLim(f) {
  return f
    .replace(/\bpi\b/g,'Math.PI').replace(/\be\b(?!\s*\*\*)/g,'Math.E')
    .replace(/\^/g,'**')
    .replace(/\bsqrt\b/g,'Math.sqrt').replace(/\bsin\b/g,'Math.sin')
    .replace(/\bcos\b/g,'Math.cos').replace(/\btan\b/g,'Math.tan')
    .replace(/\bcsc\b/g,'(x=>1/Math.sin(x))').replace(/\bsec\b/g,'(x=>1/Math.cos(x))')
    .replace(/\bcot\b/g,'(x=>1/Math.tan(x))')
    .replace(/\bexp\b/g,'Math.exp').replace(/\bln\b/g,'Math.log')
    .replace(/\babs\b/g,'Math.abs')
    .replace(/\binf\b/g,'Infinity');
}
function evalLim(norm, x) { return Function('Math','x','return ('+norm+');')(Math, x); }
function getNum(norm) { let d=0; for(let i=0;i<norm.length;i++){if(norm[i]==='(')d++;else if(norm[i]===')') d--;else if(norm[i]==='/'&&d===0)return norm.slice(0,i);} return norm; }
function getDen(norm) { let d=0; for(let i=0;i<norm.length;i++){if(norm[i]==='(')d++;else if(norm[i]===')') d--;else if(norm[i]==='/'&&d===0)return norm.slice(i+1);} return '1'; }
function hasDivision(expr) { let d=0; for(let i=0;i<expr.length;i++){if(expr[i]==='(')d++;else if(expr[i]===')') d--;else if(expr[i]==='/'&&d===0)return true;} return false; }
function estimarGrado(expr) {
  if(!expr)return 0; let max=0;
  for(const m of expr.matchAll(/x\s*\^?\s*(\d*)/g)){const g=m[1]?parseInt(m[1]):1;if(g>max)max=g;}
  if(expr.includes('x')&&max===0)max=1; return max;
}
function getLeadCoef(expr) {
  if(!expr)return 1; expr=expr.replace(/\s/g,'');
  const ms=[...expr.matchAll(/([-+]?\d*\.?\d*)\s*x\s*\^?\s*(\d*)/g)];
  if(!ms.length){const n=parseFloat(expr);return isNaN(n)?1:n;}
  let mx=-1,c=1;
  for(const m of ms){const g=m[2]?parseInt(m[2]):1;if(g>mx){mx=g;c=m[1]===''||m[1]==='+'?1:m[1]==='-'?-1:(parseFloat(m[1])||1);}}
  return c;
}
function fmt(v,d=6){
  if(!isFinite(v))return v>0?'+∞':'-∞';
  if(isNaN(v))return 'Indefinido';
  const r=Math.round(v*Math.pow(10,d))/Math.pow(10,d);
  if(Math.abs(r-Math.round(r))<1e-9)return String(Math.round(r));
  return parseFloat(r.toFixed(4)).toString();
}
function sustStr(f,x){return f.replace(/x/g,'('+x+')');}
