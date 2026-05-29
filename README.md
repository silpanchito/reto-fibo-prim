# Matemáticas que resuelven problemas
## Fibonacci en la Naturaleza & Números Primos en la Música

**Proyecto del Desafío Web 2025** — HTML · CSS · JavaScript

---

## 📋 Descripción de la solución

### 🌿 Sección 1 — Fibonacci en la Naturaleza
Página web interactiva que aplica la serie de Fibonacci para modelar el crecimiento de niveles de una planta. El algoritmo calcula la serie usando solo variables simples (sin arreglos) y un ciclo `for`, mostrando los resultados en una **tabla** con el número de ramas por nivel. La interacción con el HTML se realiza completamente con `document.getElementById()`. Incluye diseño responsivo, galería de imágenes y secciones de contexto y conclusión.

### 🎵 Sección 2 — Números Primos en la Música
Página web interactiva que detecta números primos dentro de un **rango de frecuencias** ingresado por el usuario y los relaciona con notas musicales. El algoritmo recorre el rango con un ciclo `for` y cuenta divisores con el operador módulo para verificar si cada número es primo. Los resultados se muestran en chips visuales, estadísticas y tabla usando `document.getElementById()`. Incluye diseño responsivo y secciones de contexto, algoritmo y conclusión.

### 🔗 Sección 3 — Fibonacci & Primos combinados
Genera la serie de Fibonacci aplicando el algoritmo de verificación de primalidad a cada término. Los números que son simultáneamente Fibonacci y primos se resaltan visualmente. Si el valor cae en el rango audible (16–4186 Hz), se muestra la nota musical correspondiente. Resultado en burbujas visuales + tabla completa con `document.getElementById()`.

---

## 🗂️ Estructura del proyecto

```
desafio-fibonacci-primos/
│
├── index.html          ← Página principal
├── css/
│   └── estilos.css     ← Estilos + diseño responsivo
├── js/
│   └── script.js       ← Lógica: Fibonacci, primos, notas musicales
└── README.md
```

---

## ✅ Requisitos cumplidos

| Requisito | Detalle | Estado |
|-----------|---------|--------|
| HTML + CSS + JavaScript | Archivos separados y organizados | ✅ |
| `document.getElementById()` | Toda interacción con el HTML | ✅ |
| Formularios para ingresar datos | Niveles, rango Hz, número concreto, términos | ✅ |
| Resultados mostrados en la página | Tablas, chips, estadísticas | ✅ |
| Diseño responsivo | Móvil, tablet y escritorio | ✅ |
| Fibonacci sin arrays | Solo variables `a`, `b`, `c` + `for` | ✅ |
| Verificación de primos con módulo | Contador + `% == 0` | ✅ |
| Contexto del problema | En ambas secciones | ✅ |
| Explicación del algoritmo | Cards + bloque de código con syntax highlighting | ✅ |
| Galería de imágenes | 3 imágenes por sección | ✅ |
| Conclusión | En cada sección | ✅ |
| Repositorio Git | *(agregar link)* | ✅ |
| Página publicada | *(agregar link)* | ✅ |

---

## 🔧 Funcionalidades

- **Fibonacci:** Ingresa 1–30 niveles → tabla de ramas por nivel + burbujas visuales + total acumulado
- **Primos en rango:** Ingresa rango de Hz → chips + estadísticas (cantidad, porcentaje) + tabla con nota musical
- **Verificar número:** Ingresa cualquier número → primo/no primo + nota musical si aplica
- **Combinado:** Analiza N términos de Fibonacci → marca primos + tabla con notas musicales

---

## 🔗 Enlaces

- **Repositorio GitHub:** https://github.com/silpanchito/reto-fibo-prim
- **Página publicada:** https://silpanchito.github.io/reto-fibo-prim/

---

## Título del proyecto
Matemáticas que resuelven problemas: Fibonacci y Números Primos en la vida real

## Breve descripción
Página web interactiva que aplica la serie de Fibonacci para modelar el crecimiento de niveles de una planta. El algoritmo calcula la serie usando solo variables simples (sin arreglos) y un ciclo for, mostrando los resultados en una tabla con el número de ramas por nivel. La interacción con el HTML se realiza completamente con document.getElementById(). Incluye diseño responsivo, galería de imágenes y secciones de contexto y conclusión.

También detecta números primos dentro de un rango de frecuencias ingresado por el usuario y los relaciona con notas musicales. El algoritmo recorre el rango con un ciclo for y cuenta divisores con el operador módulo para verificar si cada número es primo. Los resultados se muestran en chips visuales, estadísticas y tabla usando document.getElementById(). Incluye diseño responsivo y secciones de contexto, algoritmo y conclusión.

---

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (variables custom, flexbox, grid, animaciones, media queries)
- JavaScript vanilla (sin librerías, sin jQuery)
- Google Fonts: Playfair Display + DM Sans + DM Mono
