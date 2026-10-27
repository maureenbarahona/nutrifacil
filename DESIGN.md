---
name: NutriFácil Salud Rural
project_id: "13111963190776096599"
colors:
  bg-app: "#F4F8F5"
  surface-card: "#FFFFFF"
  surface-subtle: "#EBF3ED"
  surface-hover: "#D9EADF"
  surface-completed: "#F2FBF5"
  surface-instructions: "#F9FAF9"
  text-main: "#132A1C"
  text-heading: "#14532D"
  text-muted: "#3D5545"
  border-color: "#C3D9C9"
  border-focus: "#146C36"
  primary: "#15803D"
  primary-hover: "#166534"
  primary-accent: "#16A34A"
  primary-soft: "#DCFCE7"
  secondary: "#0369A1"
  secondary-soft: "#E0F2FE"
  focus-ring: "#F59E0B"
  imc-bajo: "#0284C7"
  imc-bajo-bg: "#E0F2FE"
  imc-bajo-text: "#0369A1"
  imc-normal: "#15803D"
  imc-normal-bg: "#DCFCE7"
  imc-normal-text: "#14532D"
  imc-sobrepeso: "#D97706"
  imc-sobrepeso-bg: "#FEF3C7"
  imc-sobrepeso-text: "#92400E"
  imc-obesidad: "#DC2626"
  imc-obesidad-bg: "#FEE2E2"
  imc-obesidad-text: "#991B1B"
  audio-idle-bg: "#E8F5E9"
  audio-idle-border: "#2E7D32"
  audio-idle-text: "#1B5E20"
  audio-speaking-bg: "#FEE2E2"
  audio-speaking-border: "#DC2626"
  audio-speaking-text: "#991B1B"
  speaking-highlight-bg: "#F0FDF4"
  speaking-highlight-outline: "#16A34A"
typography:
  font-heading: "'Outfit', system-ui, -apple-system, sans-serif"
  font-body: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
  display-timer:
    fontFamily: Outfit
    fontSize: 72px
    fontWeight: "800"
    letterSpacing: 2px
  display-imc-score:
    fontFamily: Outfit
    fontSize: 64px
    fontWeight: "800"
    lineHeight: "1.0"
  heading-page:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: "800"
    lineHeight: "1.2"
  heading-section:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: "800"
  heading-brand:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: "800"
    lineHeight: "1.1"
  heading-card:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: "800"
    lineHeight: "1.2"
  heading-item:
    fontFamily: Outfit
    fontSize: 22px
    fontWeight: "700"
    lineHeight: "1.2"
  heading-sub:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: "700"
  body-lead:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.5"
  body-intro:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: "400"
    lineHeight: "1.6"
  body-base:
    fontFamily: Plus Jakarta Sans
    fontSize: 19px
    fontWeight: "400"
    lineHeight: "1.6"
  body-secondary:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: "600"
    lineHeight: "1.4"
  label-meta:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: "600"
rounded:
  sm: 12px
  md: 20px
  lg: 28px
  pill: 9999px
shadows:
  sm: "0 4px 10px rgba(19, 42, 28, 0.06)"
  md: "0 8px 24px rgba(19, 42, 28, 0.08)"
  lg: "0 16px 36px rgba(19, 42, 28, 0.12)"
---

# Sistema de Diseño — NutriFácil Salud Rural

> **Stitch Project ID:** `13111963190776096599`  
> **Pantallas de referencia:**
> - `188298c8446346ff8ad023ff922f176f` — *NutriFácil - SPA Accesible de Salud y Nutrición*
> - `8074912a1b9740f2ad07f6f1e7e70538` — *NutriFácil - Con Narración de Voz Accesible (Web Speech API)*

---

## 1. Filosofía Visual y Propósito

**NutriFácil Salud Rural** está diseñado como una guía interactiva de salud, antropometría y actividad física de **alto contraste, baja carga cognitiva y máxima accesibilidad** para familias rurales, personas mayores y usuarios con baja alfabetización digital o fatiga visual.

- **Claridad Empática:** Lenguaje llano acompañado de iconografía expresiva, controles táctiles sobredimensionados y retroalimentación por colores tipo semáforo OMS.
- **Accesibilidad Primero (WCAG AAA):** Tamaño de fuente base de `19px` con modo de ampliación dinámica al `120%` (`A+ Letra Más Grande`), anillos de enfoque de alto contraste (`4px solid #F59E0B`) y soporte integrado de narración por voz (`Web Speech API`).

---

## 2. Paleta de Colores

### 2.1 Superficies y Fondos

| Token CSS | Valor Hex | Uso Principal |
|---|---|---|
| `--bg-app` | `#F4F8F5` | Fondo general de la aplicación (verde niebla muy suave que reduce el deslumbramiento) |
| `--surface-card` | `#FFFFFF` | Contenedores principales, tarjetas de módulos, encabezado y pie de página |
| `--surface-subtle` | `#EBF3ED` | Bloques de entrada, fondos de medidores, cajas de consejos y estados inactivos |
| *(Hover sutil)* | `#D9EADF` | Estado `:hover` en botones de herramientas y disparadores secundarios |
| *(Tarjeta completada)* | `#F2FBF5` | Fondo de tarjetas de ejercicios completados |
| *(Instrucción)* | `#F9FAF9` | Recuadros de instrucciones paso a paso con borde punteado |

### 2.2 Texto y Bordes

| Token CSS | Valor Hex | Uso Principal |
|---|---|---|
| `--text-main` | `#132A1C` | Texto principal de alto contraste (verde bosque profundo, reemplaza al negro puro) |
| *(Heading Dark)* | `#14532D` | Títulos principales (`h1`–`h4`), etiquetas destacadas y botones numéricos |
| `--text-muted` | `#3D5545` | Subtítulos, descripciones secundarias, unidades (`kg`, `cm`) y marcadores de rango |
| `--border-color` | `#C3D9C9` | Bordes estructurales de tarjetas (`2px`–`3px`), divisores y controles |
| `--border-focus` | `#146C36` | Borde de énfasis en elementos activos o enfocados |
| `--focus-ring` | `#F59E0B` | Anillo de foco accesible (`4px solid #F59E0B`, `outline-offset: 3px`) |

### 2.3 Colores de Marca y Acciones Semánticas

| Token CSS | Valor Hex | Uso Principal |
|---|---|---|
| `--primary` | `#15803D` | Verde Salud Principal — CTAs primarios, pestañas activas, indicadores de progreso |
| `--primary-hover` | `#166534` | Estado `:hover` de botones primarios |
| *(Brand Gradient)* | `#16A34A` → `#15803D` | Gradiente `135deg` para el ícono de marca circular y resaltados activos |
| `--primary-soft` | `#DCFCE7` | Fondo de pestaña activa y estados seleccionados |
| `--secondary` | `#0369A1` | Azul Apoyo — insignias de duración, botones de narración local y acentos informativos |
| `--secondary-soft` | `#E0F2FE` | Fondo suave para pastillas de tiempo y tarjetas informativas |

### 2.4 Semáforo Nutricional OMS (IMC)

| Categoría | Token Barra | Color Principal | Fondo de Tarjeta | Borde | Texto |
|---|---|---|---|---|---|
| **Bajo Peso** (`< 18.5`) | `--imc-bajo` | `#0284C7` | `#E0F2FE` | `#0284C7` | `#0369A1` |
| **Peso Normal** (`18.5 – 24.9`) | `--imc-normal` | `#15803D` | `#DCFCE7` | `#15803D` | `#14532D` |
| **Sobrepeso** (`25.0 – 29.9`) | `--imc-sobrepeso` | `#D97706` | `#FEF3C7` | `#D97706` | `#92400E` |
| **Obesidad** (`>= 30.0`) | `--imc-obesidad` | `#DC2626` | `#FEE2E2` | `#DC2626` | `#991B1B` |

### 2.5 Estados de Narración por Voz (Web Speech API)

| Estado | Fondo | Borde / Contorno | Texto |
|---|---|---|---|
| **Botón Global Voz (Reposo)** | `#E8F5E9` | `2px solid #2E7D32` | `#1B5E20` |
| **Botón Voz Ejercicio (Reposo)** | `#F0FDF4` | `2px solid #86EFAC` | `#166534` |
| **Narrando Activamente (`.speaking`)** | `#FEE2E2` | `2px solid #DC2626` | `#991B1B` |
| **Sección Resaltada (`.speaking-highlight`)** | `#F0FDF4` | `3px solid #16A34A` | `#132A1C` |

---

## 3. Tipografía

### 3.1 Familias Tipográficas

Importadas desde Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
```

- **Títulos y Números Destacados (`--font-heading`):** `'Outfit', system-ui, -apple-system, sans-serif`
  - Pesos utilizados: `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
  - Seleccionada por su geometría redondeada, amigable y números grandes de lectura instantánea.
- **Cuerpo de Texto y Controles (`--font-body`):** `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
  - Pesos utilizados: `400` (Regular), `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
  - Seleccionada por su gran altura de la `x` y excelente legibilidad en pantallas pequeñas o bajo luz solar intensa.

### 3.2 Escala Tipográfica

| Rol / Elemento | Familia | Tamaño Desktop | Tamaño Móvil (`<= 640px`) | Peso | Altura de Línea |
|---|---|---|---|---|---|
| **Display Temporizador** (`.timer-display-huge`) | `Outfit` | `72px` | `72px` | `800` | `1.0` (`letter-spacing: 2px`) |
| **Puntaje IMC** (`.imc-score-big`) | `Outfit` | `64px` | `64px` | `800` | `1.0` |
| **Input Numérico** (`.stepper-input`) | `Outfit` | `36px` | `30px` | `800` | `1.0` |
| **Título de Página Libro** (`.page-narrative h3`) | `Outfit` | `36px` | `28px` | `800` | `1.2` |
| **Título de Módulo** (`.card-header-intro h2`) | `Outfit` | `32px` | `28px` | `800` | `1.2` |
| **Título de Marca** (`.brand-text h1`) | `Outfit` | `28px` | `28px` | `800` | `1.1` |
| **CTA Principal / Tarjeta Estado** (`.btn-calculate`, `h3`) | `Outfit` | `24px` | `22px` | `800` | `1.2` |
| **Párrafo Guía Libro** (`.lead-simple`) | `Plus Jakarta Sans` | `24px` | `20px` | `600` | `1.5` |
| **Etiquetas de Campo / Ejercicio** (`.field-label`, `h4`) | `Outfit` | `22px` | `20px` | `700`–`800` | `1.2` |
| **Pestañas de Navegación** (`.tab-button`) | `Outfit` | `20px` | `18px` | `700` | `1.2` |
| **Cuerpo Base** (`body`) | `Plus Jakarta Sans` | `19px` | `19px` | `400` | `1.6` |
| **Consejos y Descripciones** (`.advice-item`, `.exercise-texts p`) | `Plus Jakarta Sans` | `17px` | `17px` | `400`–`600` | `1.4`–`1.6` |
| **Notas / Metadatos** (`.brand-text p`, `.range-markers`) | `Plus Jakarta Sans` | `15px` | `15px` | `600` | `1.4` |

> **Modo de Texto Grande (`body.large-text-mode`):** Escala globalmente el tamaño de fuente al `120%` mediante el botón accesible `A+ Letra Más Grande`.

---

## 4. Geometría, Bordes y Sombras

### 4.1 Radios de Borde (`border-radius`)
- `--radius-sm`: `12px` — Botones de herramientas de cabecera, recuadros de instrucciones y alertas de pie de página.
- `--radius-md`: `20px` — Pestañas de navegación, bloques de formulario, botones de acción (`+`/`-`, calcular) y tarjetas de estado.
- `--radius-lg`: `28px` — Tarjetas contenedoras principales (`.card`), panel de resultados IMC, libro interactivo y tarjetas de ejercicios.
- **Círculos / Pastillas (`50%` / `20px`–`30px`):** Ícono de marca (`54x54px`), insignias numéricas (`32x32px`) e ilustración del libro (`200x200px`).

### 4.2 Elevación y Sombras
Sombras suaves teñidas con el tono verde bosque (`rgba(19, 42, 28, ...)`):
- `--shadow-sm`: `0 4px 10px rgba(19, 42, 28, 0.06)` — Cabecera, pestaña activa y botones `+`/`-`.
- `--shadow-md`: `0 8px 24px rgba(19, 42, 28, 0.08)` — Tarjetas de módulo principales.
- `--shadow-lg`: `0 16px 36px rgba(19, 42, 28, 0.12)` — Libro interactivo y modal de temporizador.
- **Sombra CTA Primario:** `0 6px 16px rgba(21, 128, 61, 0.35)` (elevándose a `0 8px 20px rgba(21, 128, 61, 0.45)` en `:hover`).

---

## 5. Layout y Componentes Clave

- **Ancho Máximo de Contenedor:** `1100px` centrado (`margin: 0 auto`, `padding: 0 20px`), `900px` para el módulo de libro interactivo.
- **Puntos de Quiebre (Breakpoints):**
  - `<= 900px` (Tablet): Las grillas de 2 columnas (`.calc-layout`, `.exercises-grid`, `.page-content-grid`) pasan a 1 sola columna.
  - `<= 640px` (Móvil): Las 3 pestañas superiores se apilan verticalmente (`grid-template-columns: 1fr`), y los controles `stepper` reducen sus botones laterales de `76px` a `60px` de ancho y `60px` de alto.
- **Controles Táctiles de Gran Tamaño:**
  - Botones `stepper` (`−` / `+`): `76x70px` en escritorio (`60x60px` en móvil) con borde sólido de `3px`.
  - Botón Calcular (`.btn-calculate`): Altura mínima de `68px`.
  - Pestañas de navegación (`.tab-button`) y navegación de libro (`.btn-book-nav`): Altura mínima de `64px`.
  - Botón de marcar ejercicio completado (`.btn-toggle-exercise`): Altura mínima de `54px`.
