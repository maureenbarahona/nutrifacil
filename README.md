# 🌱 NutriFácil Salud Rural

Aplicación web accesible (SPA) de salud, nutrición, antropometría y actividad física diseñada con alto contraste (WCAG AAA), controles táctiles grandes y soporte de narración por voz mediante **Web Speech API**.

## ✨ Características Principales

1. **⚖️ Calculadora Interactiva de Peso e IMC (Semáforo OMS):**
   - Controles táctiles grandes (`−` / `+`), campos numéricos y deslizadores sincronizados.
   - Semáforo visual OMS (Bajo peso, Normal, Sobrepeso, Obesidad) con recomendaciones prácticas para el hogar rural.
2. **📖 Libro Interactivo "¿Qué es Medir el Cuerpo?" (Antropometría):**
   - Guía ilustrada de 3 páginas en lenguaje claro sobre la importancia de medir el peso, la estatura y la cintura.
3. **🚶 Ejercicios Sencillos sin Salir de Casa:**
   - Rutina de 4 pasos pensada para personas sedentarias o que pasan muchas horas sentadas, con marcador de progreso y temporizador integrado (`<dialog closedby="any">`).
4. **🔊 Narración por Voz + Modo de Letra Grande (`A+`):**
   - Lectura en voz alta global y por tarjeta en español (`Web Speech API`) con resaltado visual de la sección activa.
   - Botón `A+ Letra Más Grande` que escala la interfaz al `120%`.

## 🚀 Ejecución Local

```bash
python3 -m http.server 8080
```
Luego abre `http://localhost:8080` en tu navegador.

## ☁️ Despliegue en Google Cloud Run

El proyecto incluye un `Dockerfile` optimizado con `nginx:1.27-alpine` y compresión Gzip que escucha dinámicamente en la variable de entorno `$PORT`:

```bash
gcloud run deploy nutrifacil \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```
