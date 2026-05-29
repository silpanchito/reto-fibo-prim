// ═══════════════════════════════════════════════════════════════
//  script.js — Lógica principal
//  Toda interacción con HTML usa SOLO document.getElementById()
// ═══════════════════════════════════════════════════════════════

// ── Mapa de frecuencias aproximadas a notas musicales ────────────
// Relaciona rangos de Hz con notas de la escala temperada
var NOTAS_MUSICALES = [
  { min: 16,  max: 32,  nota: "C0 - Do sub-grave",  instrumento: "órgano de tubos" },
  { min: 33,  max: 65,  nota: "C1 - Do grave",       instrumento: "contrabajo" },
  { min: 66,  max: 130, nota: "C2 - Do bajo",        instrumento: "tuba / bajo eléctrico" },
  { min: 131, max: 261, nota: "C3 - Do medio-bajo",  instrumento: "cello / guitarra bajo" },
  { min: 262, max: 392, nota: "C4 - Do central",     instrumento: "piano (octava media)" },
  { min: 393, max: 523, nota: "C5 - Do soprano",     instrumento: "flauta / violín" },
  { min: 524, max: 784, nota: "C6 - Do agudo",       instrumento: "piccolo / flauta aguda" },
  { min: 785, max: 1046,nota: "C7 - Do muy agudo",   instrumento: "silbato / campana" },
  { min: 1047,max: 2093,nota: "C8 - Do ultraagudo",  instrumento: "armónico de cuerda" },
  { min: 2094,max: 4186,nota: "C9 - Ultrafrecuencia",instrumento: "ultrasonido musical" }
];

// Obtener nota más cercana dado un número (Hz)
function obtenerNota(num) {
  for (var i = 0; i < NOTAS_MUSICALES.length; i++) {
    if (num >= NOTAS_MUSICALES[i].min && num <= NOTAS_MUSICALES[i].max) {
      return NOTAS_MUSICALES[i];
    }
  }
  if (num < 16)   return { nota: "Infrasonido (< 16 Hz)",    instrumento: "inaudible para humanos" };
  return           { nota: "Ultrasonido (> 4186 Hz)",         instrumento: "inaudible para humanos" };
}

// ───────────────────────────────────────────────────────────────
//  FUNCIÓN AUXILIAR: ¿Es primo?
//  Usa ciclo for + operador módulo, sin arrays, sin Math
// ───────────────────────────────────────────────────────────────
function esPrimo(numero) {
  if (numero < 2) return false;
  var contador = 0;
  for (var i = 1; i <= numero; i++) {
    if (numero % i === 0) {
      contador++;
    }
  }
  return contador === 2;
}

// ═══════════════════════════════════════════════════════════════
//  SECCIÓN 1 — FIBONACCI EN LA NATURALEZA
//  Muestra tabla de ramas por nivel + burbujas visuales
// ═══════════════════════════════════════════════════════════════
function calcularFibonacci() {
  // Leer valor del formulario con getElementById
  var niveles = parseInt(document.getElementById("niveles").value);
  var resultado = document.getElementById("resultadoFibonacci");

  // Validación
  if (isNaN(niveles) || niveles < 1 || niveles > 30) {
    resultado.className = "resultado resultado-error";
    resultado.style.display = "block";
    resultado.innerHTML = "⚠️ Por favor ingresa un número entre 1 y 30.";
    return;
  }

  // ── Algoritmo Fibonacci SIN arreglos (solo variables a, b, c) ──
  var a = 0;
  var b = 1;
  var c;

  // Guardar pares [nivel, valor] para la tabla — solo variables escalares
  // Se reconstruye recorriendo de nuevo al armar la tabla
  var total = 0;
  var ultimo = 0;

  // Primera pasada: calcular total y último
  var ta = 0, tb = 1, tc;
  if (niveles >= 1) { total += ta; }
  if (niveles >= 2) { total += tb; ultimo = tb; }
  for (var i = 3; i <= niveles; i++) {
    tc = ta + tb;
    total += tc;
    ultimo = tc;
    ta = tb;
    tb = tc;
  }
  if (niveles === 1) ultimo = 0;

  // ── Construir tabla de ramas por nivel ──────────────────────
  var tablaHTML = '<div class="tabla-wrap"><table class="fib-tabla">';
  tablaHTML += '<thead><tr><th>Nivel</th><th>Ramas en ese nivel</th><th>Total acumulado</th></tr></thead><tbody>';

  var ra = 0, rb = 1, rc;
  var acum = 0;

  if (niveles >= 1) {
    acum += ra;
    tablaHTML += '<tr><td><span class="nivel-badge">1</span></td><td>' + ra + '</td><td>' + acum + '</td></tr>';
  }
  if (niveles >= 2) {
    acum += rb;
    tablaHTML += '<tr><td><span class="nivel-badge">2</span></td><td>' + rb + '</td><td>' + acum + '</td></tr>';
  }
  for (var j = 3; j <= niveles; j++) {
    rc = ra + rb;
    acum += rc;
    tablaHTML += '<tr><td><span class="nivel-badge">' + j + '</span></td><td><strong>' + rc.toLocaleString() + '</strong></td><td>' + acum.toLocaleString() + '</td></tr>';
    ra = rb;
    rb = rc;
  }

  tablaHTML += '</tbody></table></div>';

  // ── Construir burbujas visuales (max 15 para no saturar) ────
  var maxBurbujas = niveles > 15 ? 15 : niveles;
  var ba = 0, bb = 1, bc;
  var burbujasHTML = '<div class="fib-sequence">';

  if (maxBurbujas >= 1) burbujasHTML += '<span class="fib-num">' + ba + '</span>';
  if (maxBurbujas >= 2) burbujasHTML += '<span class="fib-num">' + bb + '</span>';
  for (var k = 3; k <= maxBurbujas; k++) {
    bc = ba + bb;
    burbujasHTML += '<span class="fib-num">' + bc + '</span>';
    ba = bb;
    bb = bc;
  }
  if (niveles > 15) burbujasHTML += '<span class="fib-num fib-num-dots">…</span>';
  burbujasHTML += '</div>';

  // Mostrar resultado con getElementById
  resultado.className = "resultado";
  resultado.style.display = "block";
  resultado.innerHTML =
    '<h4>🌿 Crecimiento en ' + niveles + ' niveles</h4>' +
    '<p>Número de ramas por nivel siguiendo la serie de Fibonacci:</p>' +
    burbujasHTML +
    tablaHTML +
    '<p class="total-ahorro">' +
      '🌱 Nivel <strong>' + niveles + '</strong>: <strong>' + ultimo.toLocaleString() + '</strong> ramas nuevas&nbsp;&nbsp;·&nbsp;&nbsp;' +
      '🍃 Total acumulado: <strong>' + total.toLocaleString() + '</strong> ramas' +
    '</p>';
}

// ═══════════════════════════════════════════════════════════════
//  SECCIÓN 2A — PRIMOS EN UN RANGO DE FRECUENCIAS
//  Recorre el rango con for + módulo, muestra chips + tabla
// ═══════════════════════════════════════════════════════════════
function buscarPrimosEnRango() {
  // Leer valores del formulario con getElementById
  var desde = parseInt(document.getElementById("rangoDesde").value);
  var hasta  = parseInt(document.getElementById("rangoHasta").value);
  var resultado = document.getElementById("resultadoRango");

  // Validaciones
  if (isNaN(desde) || isNaN(hasta)) {
    resultado.className = "resultado resultado-error";
    resultado.style.display = "block";
    resultado.innerHTML = "⚠️ Ingresa ambos valores del rango.";
    return;
  }
  if (desde < 16 || hasta > 4200) {
    resultado.className = "resultado resultado-error";
    resultado.style.display = "block";
    resultado.innerHTML = "⚠️ El rango debe estar entre 16 Hz y 4200 Hz (rango audible).";
    return;
  }
  if (desde > hasta) {
    resultado.className = "resultado resultado-error";
    resultado.style.display = "block";
    resultado.innerHTML = "⚠️ El valor inicial debe ser menor que el final.";
    return;
  }
  if (hasta - desde > 2000) {
    resultado.className = "resultado resultado-error";
    resultado.style.display = "block";
    resultado.innerHTML = "⚠️ El rango no puede superar 2000 valores para mantener el rendimiento.";
    return;
  }

  // ── Recorrer rango con ciclo for + operador módulo ───────────
  var primosEncontrados = 0;
  var chipsHTML = '<div class="primos-list">';
  var tablaHTML = '<div class="tabla-wrap"><table class="fib-tabla"><thead><tr><th>Frecuencia (Hz)</th><th>¿Es primo?</th><th>Nota más cercana</th><th>Instrumento típico</th></tr></thead><tbody>';

  var maxChips = 40; // mostrar máximo 40 chips
  var chipsAgregados = 0;

  for (var num = desde; num <= hasta; num++) {
    var contador = 0;
    for (var i = 1; i <= num; i++) {
      if (num % i === 0) {
        contador++;
      }
    }
    if (contador === 2) {
      primosEncontrados++;
      var notaObj = obtenerNota(num);
      // Tabla (mostrar máx 30 filas)
      if (primosEncontrados <= 30) {
        tablaHTML += '<tr>' +
          '<td><strong>' + num + ' Hz</strong></td>' +
          '<td><span class="badge-primo">✓ Primo</span></td>' +
          '<td>' + notaObj.nota + '</td>' +
          '<td>' + notaObj.instrumento + '</td>' +
          '</tr>';
      }
      // Chips
      if (chipsAgregados < maxChips) {
        chipsHTML += '<span class="primo-chip" title="' + notaObj.nota + '">' + num + ' Hz</span>';
        chipsAgregados++;
      }
    }
  }

  chipsHTML += '</div>';
  if (primosEncontrados > 30) {
    tablaHTML += '<tr><td colspan="4" style="text-align:center;color:var(--txt-3);font-size:.85rem;">… y ' + (primosEncontrados - 30) + ' más</td></tr>';
  }
  tablaHTML += '</tbody></table></div>';

  // Estadísticas
  var porcentaje = (((hasta - desde + 1) > 0) ? (primosEncontrados / (hasta - desde + 1) * 100).toFixed(1) : 0);

  resultado.className = "resultado resultado-pink";
  resultado.style.display = "block";

  if (primosEncontrados === 0) {
    resultado.innerHTML = '<h4>🎵 Rango ' + desde + ' – ' + hasta + ' Hz</h4><p>No se encontraron frecuencias primas en este rango.</p>';
    return;
  }

  resultado.innerHTML =
    '<h4>🎵 Rango ' + desde + ' – ' + hasta + ' Hz</h4>' +
    '<div class="stats-row">' +
      '<div class="stat-box"><span class="stat-num">' + primosEncontrados + '</span><span class="stat-label">frecuencias primas</span></div>' +
      '<div class="stat-box"><span class="stat-num">' + porcentaje + '%</span><span class="stat-label">del rango</span></div>' +
      '<div class="stat-box"><span class="stat-num">' + (hasta - desde + 1) + '</span><span class="stat-label">números analizados</span></div>' +
    '</div>' +
    (chipsAgregados < primosEncontrados ? '<p style="font-size:.83rem;color:var(--txt-3);margin-bottom:8px;">Mostrando los primeros ' + maxChips + ' de ' + primosEncontrados + ':</p>' : '') +
    chipsHTML +
    '<p style="font-size:.88rem;color:var(--txt-2);margin:14px 0 8px;">Detalle de frecuencias primas y sus notas musicales:</p>' +
    tablaHTML;
}

// ═══════════════════════════════════════════════════════════════
//  SECCIÓN 2B — VERIFICAR UN NÚMERO CONCRETO
// ═══════════════════════════════════════════════════════════════
function verificarPrimo() {
  var numero = parseInt(document.getElementById("numero").value);
  var resultado = document.getElementById("resultadoPrimo");

  if (isNaN(numero) || numero < 2 || numero > 9999) {
    resultado.className = "resultado resultado-error";
    resultado.style.display = "block";
    resultado.innerHTML = "⚠️ Por favor ingresa un número entre 2 y 9999.";
    return;
  }

  // ── Algoritmo con contador y módulo ──────────────────────────
  var contador = 0;
  for (var i = 1; i <= numero; i++) {
    if (numero % i === 0) {
      contador++;
    }
  }

  var notaObj = obtenerNota(numero);
  resultado.style.display = "block";

  if (contador === 2) {
    resultado.className = "resultado resultado-pink";
    resultado.innerHTML =
      '<h4>✓ ' + numero + ' ES un número primo</h4>' +
      '<p>Solo es divisible entre <strong>1</strong> y <strong>' + numero + '</strong>.</p>' +
      '<p style="margin-top:10px;">🎵 Como frecuencia: <strong>' + numero + ' Hz</strong> → ' + notaObj.nota + ' · ' + notaObj.instrumento + '</p>' +
      '<p style="margin-top:6px;">Un compás de <strong>' + numero + '/4</strong> crearía un ritmo asimétrico imposible de subdividir uniformemente.</p>';
  } else {
    var divisores = "";
    for (var d = 1; d <= numero; d++) {
      if (numero % d === 0) {
        divisores += (divisores === "" ? "" : ", ") + d;
      }
    }
    resultado.className = "resultado resultado-pink";
    resultado.innerHTML =
      '<h4>✗ ' + numero + ' NO es un número primo</h4>' +
      '<p>Tiene <strong>' + contador + '</strong> divisores: ' + divisores + '</p>' +
      '<p style="margin-top:10px;">🎵 Como frecuencia: <strong>' + numero + ' Hz</strong> → ' + notaObj.nota + ' · ' + notaObj.instrumento + '</p>';
  }
}

// ═══════════════════════════════════════════════════════════════
//  SECCIÓN COMBINADA
//  Genera serie Fibonacci, marca primos, tabla + burbujas
// ═══════════════════════════════════════════════════════════════
function calcularCombinado() {
  var terminos = parseInt(document.getElementById("terminosCombinados").value);
  var resultado = document.getElementById("resultadoCombinado");

  if (isNaN(terminos) || terminos < 2 || terminos > 25) {
    resultado.className = "resultado resultado-error";
    resultado.style.display = "block";
    resultado.innerHTML = "⚠️ Por favor ingresa un número entre 2 y 25.";
    return;
  }

  // ── Generar Fibonacci SIN arreglos, guardar con variables ────
  // Usamos variables simples y reconstruimos dos veces:
  // 1ra pasada: burbujas visuales
  // 2da pasada: tabla

  // Arrays solo para renderizado final (el algoritmo usa a,b,c)
  // Se construye el HTML directamente sin almacenar en array
  var a = 0, b = 1, c;
  var primosTotales = 0;
  var listaPrimos = "";

  // Burbujas
  var burbujasHTML = '<div class="fib-sequence">';
  var esPrimA = esPrimo(a);
  var esPrimB = esPrimo(b);
  if (esPrimA) { primosTotales++; listaPrimos += a + " "; }
  if (esPrimB) { primosTotales++; listaPrimos += b + " "; }
  burbujasHTML += '<span class="fib-num' + (esPrimA ? ' es-primo' : '') + '" title="' + a + (esPrimA ? ' — primo' : '') + '">' + a + '</span>';
  if (terminos >= 2) burbujasHTML += '<span class="fib-num' + (esPrimB ? ' es-primo' : '') + '" title="' + b + (esPrimB ? ' — primo' : '') + '">' + b + '</span>';
  for (var i = 3; i <= terminos; i++) {
    c = a + b;
    var esPrimC = esPrimo(c);
    if (esPrimC) { primosTotales++; listaPrimos += c + " "; }
    burbujasHTML += '<span class="fib-num' + (esPrimC ? ' es-primo' : '') + '" title="' + c + (esPrimC ? ' — primo' : '') + '">' + c + '</span>';
    a = b; b = c;
  }
  burbujasHTML += '</div>';

  // Tabla — segunda pasada
  var ta = 0, tb = 1, tc;
  var tablaHTML = '<div class="tabla-wrap"><table class="fib-tabla"><thead><tr><th>Término</th><th>Valor</th><th>¿Es primo?</th><th>Nota musical</th></tr></thead><tbody>';
  var ep0 = esPrimo(ta);
  var ep1 = esPrimo(tb);
  var nota0 = ta > 0 ? obtenerNota(ta).nota : "—";
  var nota1 = tb > 0 ? obtenerNota(tb).nota : "—";
  tablaHTML += '<tr><td>1</td><td>' + ta + '</td><td>' + (ep0 ? '<span class="badge-primo">✓ Primo</span>' : '—') + '</td><td>' + nota0 + '</td></tr>';
  if (terminos >= 2) tablaHTML += '<tr><td>2</td><td>' + tb + '</td><td>' + (ep1 ? '<span class="badge-primo">✓ Primo</span>' : '—') + '</td><td>' + nota1 + '</td></tr>';
  for (var j = 3; j <= terminos; j++) {
    tc = ta + tb;
    var epC = esPrimo(tc);
    var notaC = tc >= 16 ? obtenerNota(tc).nota : "—";
    tablaHTML += '<tr><td>' + j + '</td><td><strong>' + tc.toLocaleString() + '</strong></td><td>' + (epC ? '<span class="badge-primo">✓ Primo</span>' : '—') + '</td><td style="font-size:.82rem">' + notaC + '</td></tr>';
    ta = tb; tb = tc;
  }
  tablaHTML += '</tbody></table></div>';

  resultado.className = "resultado resultado-purple";
  resultado.style.display = "block";
  resultado.innerHTML =
    '<h4>🔗 ' + terminos + ' términos analizados</h4>' +
    '<p>Los números <strong>resaltados en azul</strong> son también primos. La tabla muestra su nota musical correspondiente si están en rango audible:</p>' +
    burbujasHTML +
    tablaHTML +
    '<p class="total-ahorro">✨ Fibonacci-primos encontrados: <strong>' + primosTotales + '</strong>&nbsp;&nbsp;→&nbsp;&nbsp;' + (listaPrimos.trim() || "Ninguno") + '</p>';
}