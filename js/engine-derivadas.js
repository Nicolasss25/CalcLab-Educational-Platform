/* ═══════════════════════════════════════════════════════════════
   CalcLab · engine-derivadas.js  v4
   Motor de derivadas con pasos MUY didácticos.
   Explicaciones pensadas para quien NUNCA ha visto derivadas.
   ═══════════════════════════════════════════════════════════════ */

/* ─── ENTRADA PRINCIPAL ─── */
function derivarPrimera(funcStr) {
  const pasos = [];
  pasos.push({
    titulo: 'Función que vamos a derivar',
    texto:  'f(x) = ' + funcStr,
    nota:   '¿Qué es una derivada? Es la "velocidad de cambio" de la función. Nos dice cuánto cambia f(x) cuando x cambia un poquito. Analizaremos la estructura de esta función para elegir la regla correcta.'
  });
  const resultado = derivar(funcStr.trim(), pasos, 0);
  pasos.push({ titulo: '✅ Resultado final', texto: "f'(x) = " + resultado, nota: '' });
  return { resultado: "f'(x) = " + resultado, pasos };
}

function derivarSegunda(funcStr) {
  const pasos = [];
  pasos.push({
    titulo: 'Segunda derivada f\'\'(x)',
    texto:  'Para obtener f\'\'(x) necesitamos derivar DOS VECES.',
    nota:   'Paso A: derivar f(x) para obtener f\'(x). Paso B: derivar f\'(x) para obtener f\'\'(x).\nf(x) = ' + funcStr
  });
  const r1   = derivarPrimera(funcStr);
  const fp   = r1.resultado.replace(/^f'\(x\)\s*=\s*/, '').trim();
  pasos.push(...r1.pasos);
  pasos.push({ titulo: '↩ Ahora derivamos f\'(x) una vez más', texto: "Tenemos f'(x) = " + fp, nota: 'Aplicamos exactamente las mismas reglas de derivación a esta nueva expresión.' });
  const sp = [];
  let fpp;
  try { fpp = derivar(fp, sp, 0); pasos.push(...sp); }
  catch { fpp = "d/dx[" + fp + "]"; }
  pasos.push({ titulo: '✅ Resultado final', texto: "f''(x) = " + fpp, nota: 'La segunda derivada nos indica la concavidad de la función (si "sonríe" ∪ o "llora" ∩).' });
  return { resultado: "f''(x) = " + fpp, pasos };
}

function derivarNesima(funcStr, nStr) {
  const n    = parseInt(nStr) || 3;
  const pasos= [];
  const fc   = funcStr.trim().replace(/\s/g,'');
  pasos.push({ titulo: 'Derivada de orden ' + n, texto: 'f(x) = ' + funcStr, nota: 'Derivaremos ' + n + ' veces. Para funciones conocidas existen fórmulas directas.' });

  if (fc==='sin(x)') {
    const C=['sin(x)','cos(x)','-sin(x)','-cos(x)'];
    const r=C[((n%4)+4)%4];
    pasos.push({ titulo:'Ciclo del seno', texto:'Las derivadas de sin(x) forman un ciclo de 4 pasos:\nsin(x) → cos(x) → -sin(x) → -cos(x) → sin(x) → ...', nota:'Para saber cuál corresponde al orden n, calculamos n mod 4.' });
    pasos.push({ titulo:'Calcular posición', texto: n + ' mod 4 = ' + (n%4) + '\nPosición 0 = sin | 1 = cos | 2 = -sin | 3 = -cos', nota:'' });
    pasos.push({ titulo:'✅ Resultado', texto:'f^(' + n + ')(x) = ' + r, nota:'' });
    return { resultado:'f^('+n+')(x) = '+r, pasos };
  }
  if (fc==='cos(x)') {
    const C=['cos(x)','-sin(x)','-cos(x)','sin(x)'];
    const r=C[((n%4)+4)%4];
    pasos.push({ titulo:'Ciclo del coseno', texto:'cos(x) → -sin(x) → -cos(x) → sin(x) → cos(x) → ...', nota:n+' mod 4 = '+(n%4) });
    pasos.push({ titulo:'✅ Resultado', texto:'f^('+n+')(x) = '+r, nota:'' });
    return { resultado:'f^('+n+')(x) = '+r, pasos };
  }
  if (fc==='exp(x)') {
    pasos.push({ titulo:'Propiedad especial de eˣ', texto:'La función eˣ tiene la propiedad única de que su derivada es ella misma.', nota:'Por eso, sin importar cuántas veces derivemos, siempre obtenemos eˣ.' });
    pasos.push({ titulo:'✅ Resultado', texto:'f^('+n+')(x) = eˣ', nota:'' });
    return { resultado:'f^('+n+')(x) = exp(x)', pasos };
  }

  // Potencia
  const mp = fc.match(/^([+-]?\d*\.?\d*)\*?x\^([+-]?\d+\.?\d*)$/) || fc.match(/^x\^([+-]?\d+\.?\d*)$/);
  if (mp) {
    const c = mp[2]!==undefined?(mp[1]===''||mp[1]==='+'?1:mp[1]==='-'?-1:parseFloat(mp[1])||1):1;
    const m = parseFloat(mp[2]??mp[1]);
    pasos.push({ titulo:'Regla para potencias (derivación repetida)', texto:'Cada vez que derivamos x^m multiplicamos por el exponente actual y lo reducimos en 1.', nota:'' });
    if (n > m) { pasos.push({ titulo:'✅ Resultado', texto:'f^('+n+')(x) = 0', nota:'Cuando el orden de derivación supera el grado del polinomio, el resultado es 0.' }); return { resultado:'f^('+n+')(x) = 0', pasos }; }
    let prod=c, fs=[];
    for(let k=0;k<n;k++){fs.push(m-k);prod*=(m-k);}
    const eF=m-n;
    const r=eF===0?fmtN(prod):eF===1?fmtN(prod)+'x':fmtN(prod)+'x^'+eF;
    pasos.push({ titulo:'Cálculo', texto:'Multiplicamos: '+c+'·'+fs.join('·')+' = '+fmtN(prod)+'\nNuevo exponente: '+m+' - '+n+' = '+eF, nota:'' });
    pasos.push({ titulo:'✅ Resultado', texto:'f^('+n+')(x) = '+r, nota:'' });
    return { resultado:'f^('+n+')(x) = '+r, pasos };
  }

  // Genérico iterativo
  pasos.push({ titulo:'Derivación iterativa', texto:'Derivaremos la función ' + n + ' veces aplicando las reglas.', nota:'' });
  let actual=funcStr;
  for(let k=1;k<=Math.min(n,5);k++){const sp=[];actual=derivar(actual,sp,0);pasos.push({titulo:'Derivada '+k,texto:'f^('+k+')(x) = '+actual,nota:k<n?'Continuamos...':''});if(k<=2&&k<n)pasos.push(...sp.slice(-1));}
  pasos.push({ titulo:'✅ Resultado', texto:'f^('+n+')(x) = '+actual, nota:'' });
  return { resultado:'f^('+n+')(x) = '+actual, pasos };
}

function derivarParcial(funcStr, varStr) {
  const v=varStr.trim()||'x';
  const pasos=[];
  pasos.push({ titulo:'Derivada parcial ∂f/∂'+v, texto:'f = '+funcStr, nota:'En derivadas parciales, tratamos todas las variables EXCEPTO "'+v+'" como si fueran números fijos (constantes).\nLuego derivamos normalmente respecto a "'+v+'".' });
  const funcX=funcStr.replace(new RegExp('\\b'+v+'\\b','g'),'x');
  const sp=[];
  const d=derivar(funcX,sp,0);
  pasos.push(...sp);
  const res=d.replace(/\bx\b/g,v);
  pasos.push({ titulo:'✅ Resultado', texto:'∂f/∂'+v+' = '+res, nota:'' });
  return { resultado:'∂f/∂'+v+' = '+res, pasos };
}

/* ═══════════════════════════════════════════════════════════════
   NÚCLEO: derivar(expr, pasos, profundidad)
═══════════════════════════════════════════════════════════════ */
function derivar(expr, pasos, prof) {
  prof = prof||0;
  if (prof>8) return 'd/dx['+expr+']';
  expr = expr.trim();

  /* 1. CONSTANTE */
  if (/^[+-]?\d+(\.\d+)?$/.test(expr)) {
    pasos.push({
      titulo:'Regla de la constante',
      texto: 'd/dx[' + expr + '] = 0',
      nota:  '📌 REGLA: La derivada de cualquier número constante siempre es CERO.\n¿Por qué? Porque una constante no cambia cuando x cambia, por tanto su tasa de cambio es 0.\nEjemplos: d/dx[5] = 0, d/dx[100] = 0, d/dx[-7] = 0'
    });
    return '0';
  }

  /* 2. VARIABLE x */
  if (expr==='x'||expr==='+x') {
    pasos.push({
      titulo:'Regla de la potencia con n=1',
      texto: 'd/dx[x] = 1',
      nota:  '📌 REGLA: d/dx[x¹] = 1·x⁰ = 1·1 = 1\n¿Por qué? Aplicamos la regla de la potencia: el exponente 1 baja y multiplicamos, y el nuevo exponente es 1-1=0, entonces x⁰=1.\nSiempre que veas solo "x", su derivada es 1.'
    });
    return '1';
  }

  /* 3. cx (lineal) */
  const mL=expr.replace(/\s/g,'').match(/^([+-]?\d+\.?\d*)\*?x$/);
  if (mL) {
    const c=mL[1];
    pasos.push({
      titulo:'Función lineal (recta)',
      texto: 'd/dx[' + c + 'x] = ' + c,
      nota:  '📌 REGLA: d/dx[c·x] = c\n¿Por qué? La constante c se multiplica por la derivada de x, que es 1.\nc·d/dx[x] = c·1 = c\nEsto tiene sentido: una recta y = cx siempre tiene pendiente c en cada punto.'
    });
    return c;
  }

  /* 4. POTENCIA c·x^n */
  {
    const e=expr.replace(/\s/g,'');
    const p1=e.match(/^([+-]?\d+\.?\d*)\*?x\^([+-]?\d+\.?\d*)$/);
    const p2=e.match(/^x\^([+-]?\d+\.?\d*)$/);
    if (p1) return _potencia(parseFloat(p1[1]),parseFloat(p1[2]),expr,pasos);
    if (p2) return _potencia(1,parseFloat(p2[1]),expr,pasos);
  }

  /* 5. FUNCIONES TRIG + CADENA */
  const fns=['sin','cos','tan','csc','sec','cot','exp','ln','sqrt','arctan','arcsin','arccos'];
  for(const fn of fns){
    const arg=_getArg(fn,expr);
    if(arg!==null) return _cadena(fn,arg,expr,pasos,prof);
  }

  /* 6. POTENCIA COMPUESTA (u)^n */
  {
    const mu=_detectPotComp(expr);
    if(mu) return _cadenaPotencia(mu.u,mu.n,expr,pasos,prof);
  }

  /* 7. SUMA/RESTA */
  {
    const terms=_splitSuma(expr);
    if(terms.length>1){
      pasos.push({
        titulo:'Regla de la suma y resta',
        texto: "d/dx[f(x) ± g(x)] = f'(x) ± g'(x)",
        nota:  '📌 REGLA: La derivada de una suma o resta se calcula término a término.\nSimplemente derivamos cada parte por separado y sumamos o restamos los resultados.\nEjemplo: d/dx[x² + 3x] = d/dx[x²] + d/dx[3x] = 2x + 3'
      });
      const parts=terms.map(t=>{const sp=[];const d=derivar(t.term,sp,prof+1);pasos.push({titulo:'Derivar término: '+t.term,texto:'d/dx['+t.term+'] = '+d,nota:''});pasos.push(...sp);return t.signo+d;});
      const r=parts.join('').replace(/^\+/,'');
      pasos.push({titulo:'Unir resultados',texto:"f'(x) = "+r,nota:'Sumamos todas las derivadas parciales obtenidas.'});
      return r;
    }
  }

  /* 8. PRODUCTO u·v */
  {
    const pp=_splitProducto(expr);
    if(pp.length===2) return _producto(pp[0],pp[1],expr,pasos,prof);
  }

  /* 9. COCIENTE u/v */
  {
    const cc=_splitCociente(expr);
    if(cc) return _cociente(cc.num,cc.den,expr,pasos,prof);
  }

  /* 10. GENÉRICO */
  pasos.push({titulo:'Función compuesta — Regla de la cadena',texto:"d/dx[f(g(x))] = f'(g(x)) · g'(x)",nota:'La expresión requiere identificar la función exterior e interior manualmente.'});
  return 'd/dx['+expr+']';
}

/* ═══════ IMPLEMENTACIONES DE REGLAS ═══════ */

function _potencia(c,n,orig,pasos) {
  pasos.push({
    titulo:'Regla de la potencia',
    texto: 'd/dx[' + orig + ']',
    nota:  '📌 REGLA: d/dx[c·xⁿ] = c·n·xⁿ⁻¹\nPasos: (1) Baja el exponente n multiplicándolo por el coeficiente c. (2) Resta 1 al exponente.\nRecuerda: el exponente BAJA y se RESTA 1.'
  });
  const nc=c*n, nn=n-1;
  let r=nn===0?fmtN(nc):nn===1?fmtN(nc)+'x':fmtN(nc)+'x^'+nn;
  pasos.push({
    titulo:'Aplicar la regla',
    texto: 'Coeficiente nuevo = '+c+' × '+n+' = '+fmtN(nc)+'\nExponente nuevo   = '+n+' − 1 = '+nn+'\nResultado: '+r,
    nota:  nn<0?'Con exponente negativo: x^(-'+Math.abs(nn)+') = 1/x^'+Math.abs(nn):'✅ Derivada calculada correctamente.'
  });
  return r;
}

function _cadena(fn,u,orig,pasos,prof) {
  const simple=(u==='x');

  const INFO={
    sin:   {der:'cos(u)',    desc:'El seno se convierte en coseno',        signo:'+'},
    cos:   {der:'-sin(u)',   desc:'El coseno se convierte en -seno (con signo negativo)', signo:'-'},
    tan:   {der:'sec²(u)',   desc:'La tangente se convierte en secante al cuadrado'},
    csc:   {der:'-csc(u)·cot(u)', desc:'Cosecante: d/dx[csc(u)] = -csc(u)·cot(u)'},
    sec:   {der:'sec(u)·tan(u)',  desc:'Secante: d/dx[sec(u)] = sec(u)·tan(u)'},
    cot:   {der:'-csc²(u)',  desc:'Cotangente: d/dx[cot(u)] = -csc²(u)'},
    exp:   {der:'exp(u)',    desc:'La exponencial eˣ se mantiene igual (es su propia derivada)'},
    ln:    {der:'1/u',       desc:'El logaritmo natural se convierte en 1 dividido el argumento'},
    sqrt:  {der:'1/(2√u)',   desc:'La raíz cuadrada se convierte en 1 partido el doble de la raíz'},
    arctan:{der:'1/(1+u²)',  desc:'El arcotangente se convierte en 1/(1+u²)'},
    arcsin:{der:'1/√(1-u²)',desc:'El arcoseno se convierte en 1/√(1-u²)'},
    arccos:{der:'-1/√(1-u²)',desc:'El arcocoseno se convierte en -1/√(1-u²)'},
  };
  const info=INFO[fn]||{der:"f'(u)",desc:'función'};

  if (simple) {
    pasos.push({
      titulo:'Derivada de '+fn+'(x)',
      texto: 'd/dx['+fn+'(x)] = '+_extSimple(fn,'x'),
      nota:  '📌 DERIVADA FUNDAMENTAL: '+info.desc+'.\nEsta es una de las derivadas básicas que debemos memorizar. No se puede simplificar más.'
    });
    return _extSimple(fn,'x');
  }

  /* Caso compuesto: fn(u) donde u ≠ x → REGLA DE LA CADENA */
  pasos.push({
    titulo:'⛓️ Regla de la CADENA — '+fn+'(u)',
    texto: 'd/dx['+fn+'(u)] = [derivada de '+fn+'] · [derivada de u]\nFórmula: d/dx['+fn+'(u)] = '+info.der.replace('u',u)+' · u\'',
    nota:  '📌 REGLA DE LA CADENA: Cuando una función conocida tiene OTRA función adentro, usamos:\n1. Derivar la función exterior ('+fn+') → obtenemos: '+info.der+'\n2. Mantener el argumento u = '+u+' sin tocar\n3. Derivar el argumento interior (u = '+u+') → llamamos este resultado u\'\n4. Multiplicar exterior × interior\'.\n📌 '+info.desc+'.'
  });

  pasos.push({
    titulo:'Paso 1 — Identificar exterior e interior',
    texto: 'Función EXTERIOR: '+fn+'(·)\nFunción INTERIOR: u = '+u+'\n\nDerivada de la exterior evaluada en u: '+info.der.replace(/u/g,'('+u+')'),
    nota:  'Mantenemos el argumento u = '+u+' igual, no lo tocamos en este paso.'
  });

  const sp=[];
  const du=derivar(u,sp,prof+1);

  pasos.push({
    titulo:'Paso 2 — Derivar la función interior u = '+u,
    texto: "u' = d/dx["+u+'] = '+du,
    nota:  'Aquí aplicamos cualquier regla necesaria para derivar u = '+u
  });
  pasos.push(...sp);

  const ext=_extSimple(fn,u);
  const r=_prodSim(ext,du);
  pasos.push({
    titulo:'Paso 3 — Multiplicar exterior × interior\'',
    texto: '('+ext+') · ('+du+')\n= '+r,
    nota:  '✅ Resultado final de la regla de la cadena para '+fn+'('+u+')'
  });
  return r;
}

function _cadenaPotencia(u,n,orig,pasos,prof) {
  pasos.push({
    titulo:'⛓️ Regla de la CADENA con POTENCIA — (u)^'+n,
    texto: 'd/dx[(u)^'+n+'] = '+n+'·(u)^'+(n-1)+'·u\'',
    nota:  '📌 REGLA: Cuando tenemos una expresión entre paréntesis elevada a una potencia:\n1. Bajamos el exponente n como coeficiente: n·(u)^(n-1)\n2. Multiplicamos por la derivada del interior u\'\nNota: La diferencia con la regla de la potencia simple es que aquí u NO es solo x, sino una expresión más compleja.'
  });
  pasos.push({titulo:'Paso 1 — Derivada exterior',texto:'Exterior: (·)^'+n+' → al derivar: '+n+'·(·)^'+(n-1)+'\nEvaluado en u: '+n+'·('+u+')^'+(n-1),nota:'Mantenemos el interior u = '+u+' sin tocar.'});
  const sp=[];
  const du=derivar(u,sp,prof+1);
  pasos.push({titulo:'Paso 2 — Derivada interior u = '+u,texto:"u' = "+du,nota:''});
  pasos.push(...sp);
  const r=n+'·('+u+')^'+(n-1)+'·('+du+')';
  pasos.push({titulo:'Paso 3 — Multiplicar',texto:r,nota:'✅ Cadena con potencia completada.'});
  return r;
}

function _producto(u,v,orig,pasos,prof) {
  pasos.push({
    titulo:'Regla del PRODUCTO',
    texto: "d/dx[u·v] = u'·v + u·v'",
    nota:  '📌 REGLA: Cuando dos funciones están multiplicadas, usamos la regla del producto.\nFórmula: (u·v)\' = u\'·v + u·v\'\nTruco para recordar: "Deriva el primero y deja el segundo, más deja el primero y deriva el segundo"\nu = '+u+'\nv = '+v
  });
  pasos.push({titulo:'Identificar u y v',texto:'u = '+u+'\nv = '+v,nota:'Vamos a derivar cada parte por separado.'});
  const sp1=[],sp2=[];
  const du=derivar(u,sp1,prof+1);
  const dv=derivar(v,sp2,prof+1);
  pasos.push({titulo:"Derivar u = "+u,texto:"u' = d/dx["+u+'] = '+du,nota:''});
  pasos.push(...sp1);
  pasos.push({titulo:"Derivar v = "+v,texto:"v' = d/dx["+v+'] = '+dv,nota:''});
  pasos.push(...sp2);
  const r='('+du+')·('+v+') + ('+u+')·('+dv+')';
  pasos.push({
    titulo:'Aplicar fórmula del producto',
    texto: "u'·v + u·v'\n= ("+du+')·('+v+') + ('+u+')·('+dv+')\n= '+r,
    nota:  "u' = "+du+'   |   v\' = '+dv+'\n✅ Resultado del producto.'
  });
  return r;
}

function _cociente(u,v,orig,pasos,prof) {
  pasos.push({
    titulo:'Regla del COCIENTE',
    texto: "d/dx[u/v] = (u'·v − u·v') / v²",
    nota:  "📌 REGLA: Cuando una función está dividida por otra, usamos la regla del cociente.\nFórmula: (u/v)' = (u'v − uv') / v²\n⚠️ IMPORTANTE: el signo en el numerador es RESTA (−), no suma. El orden importa.\nTruco: 'Lo de arriba derivado por lo de abajo, MENOS lo de arriba por lo de abajo derivado, todo dividido en lo de abajo al cuadrado.'\nu = "+u+'\nv = '+v
  });
  pasos.push({titulo:'Identificar u y v',texto:'Numerador u = '+u+'\nDenominador v = '+v,nota:''});
  const sp1=[],sp2=[];
  const du=derivar(u,sp1,prof+1);
  const dv=derivar(v,sp2,prof+1);
  pasos.push({titulo:"Derivar el numerador u = "+u,texto:"u' = "+du,nota:''});
  pasos.push(...sp1);
  pasos.push({titulo:"Derivar el denominador v = "+v,texto:"v' = "+dv,nota:''});
  pasos.push(...sp2);
  const r='[('+du+')·('+v+') − ('+u+')·('+dv+')] / ('+v+')²';
  pasos.push({
    titulo:'Aplicar la fórmula del cociente',
    texto: '(u\'v − uv\') / v²\n= [('+du+')·('+v+') − ('+u+')·('+dv+')] / ('+v+')²\n= '+r,
    nota:  "u' = "+du+'   |   v\' = '+dv+'\n✅ Recuerda: el denominador siempre va al cuadrado v².'
  });
  return r;
}

/* ═══ UTILIDADES ═══ */
function _extSimple(fn,u){
  switch(fn){
    case 'sin':   return 'cos('+u+')';
    case 'cos':   return '-sin('+u+')';
    case 'tan':   return 'sec²('+u+')';
    case 'csc':   return '-csc('+u+')·cot('+u+')';
    case 'sec':   return 'sec('+u+')·tan('+u+')';
    case 'cot':   return '-csc²('+u+')';
    case 'exp':   return 'exp('+u+')';
    case 'ln':    return '1/('+u+')';
    case 'sqrt':  return '1/(2·sqrt('+u+'))';
    case 'arctan':return '1/(1+('+u+')^2)';
    case 'arcsin':return '1/sqrt(1-('+u+')^2)';
    case 'arccos':return '-1/sqrt(1-('+u+')^2)';
    default:      return fn+"'("+u+')';
  }
}

function _getArg(nombre,expr){
  expr=expr.trim();
  const pref=nombre+'(';
  if(!expr.startsWith(pref)||!expr.endsWith(')'))return null;
  const inner=expr.slice(pref.length,-1).trim();
  let d=0;
  for(const c of inner){if(c==='(')d++;else if(c===')'){d--;if(d<0)return null;}}
  return d===0?inner:null;
}

function _detectPotComp(expr){
  const m=expr.match(/^\((.+)\)\^([+-]?\d+\.?\d*)$/);
  if(!m)return null;
  const inner=m[1];if(inner==='x')return null;
  let d=0;for(const c of inner){if(c==='(')d++;else if(c===')'){d--;if(d<0)return null;}}
  return d===0?{u:inner,n:parseFloat(m[2])}:null;
}

function _splitSuma(expr){
  const T=[];let cur='',d=0,sg='+';
  for(let i=0;i<expr.length;i++){
    const c=expr[i];
    if(c==='(')d++;else if(c===')')d--;
    else if((c==='+'||c==='-')&&d===0&&i>0){if(cur.trim())T.push({signo:sg,term:cur.trim()});sg=c;cur='';continue;}
    cur+=c;
  }
  if(cur.trim())T.push({signo:sg,term:cur.trim()});
  return T;
}

function _splitProducto(expr){
  let d=0;
  for(let i=0;i<expr.length;i++){
    if(expr[i]==='(')d++;else if(expr[i]===')') d--;
    else if(expr[i]==='*'&&d===0){
      const u=expr.slice(0,i).trim(),v=expr.slice(i+1).trim();
      if(u&&v)return[u,v];
    }
  }
  return[];
}

function _splitCociente(expr){
  let d=0;
  for(let i=0;i<expr.length;i++){
    if(expr[i]==='(')d++;else if(expr[i]===')') d--;
    else if(expr[i]==='/'&&d===0){
      if(i+1<expr.length&&(expr[i+1]==='/'||expr[i+1]==='*'))continue;
      const num=expr.slice(0,i).trim(),den=expr.slice(i+1).trim();
      if(num&&den)return{num,den};
    }
  }
  return null;
}

function _prodSim(a,b){
  if(a==='1')return b;if(b==='1')return a;
  if(a==='0'||b==='0')return'0';
  if(a==='-1')return'-'+b;
  return'('+a+')·('+b+')';
}

function fmtN(v){
  if(!isFinite(v))return String(v);
  const r=Math.round(v*1e9)/1e9;
  if(Math.abs(r-Math.round(r))<1e-9)return String(Math.round(r));
  return parseFloat(r.toFixed(4)).toString();
}

function limpiar(expr){return expr.trim().replace(/\*\*/g,'^').replace(/\s+/g,'');}
