# Generador de Cuestionarios con IA a partir de PDF

Aplicación web que genera cuestionarios de opción múltiple basados en el contenido de un documento PDF, utilizando la API de Pollinations AI. Incluye generación de imágenes ilustrativas para cada pregunta.

## Requisitos

- Navegador web moderno (Chrome, Edge, Firefox)
- Conexión a Internet
- API Key de [Pollinations.ai](https://enter.pollinations.ai/)

## Uso

1. **Obtener API Key** — Haz clic en "Obtener" para autenticarte en Pollinations, o ingresa tu `plln_sk_...` manualmente.

2. **Cargar PDF** — Haz clic en "Seleccionar PDF" y elige un documento. La app extraerá el texto automáticamente.

3. **Configurar el cuestionario:**
   - Número de preguntas (4–20)
   - Idioma (Español, English, Français)
   - Tiempo por pregunta
   - Estilo artístico para las imágenes
   - Modelo de imagen (`zimage`, `klein`, `gptimage`)
   - Modelo de texto (`openai`, `openai-fast`, `gemini-fast`, `gpt-5.4-mini`)

4. **Generar** — Haz clic en "Generar Cuestionario". La IA creará preguntas basadas en el PDF y generará imágenes para cada una.

5. **Responder** — Selecciona una opción para cada pregunta. El temporizador muestra el tiempo restante.

6. **Personalizar imágenes:**
   - **Regenerar imagen** — Edita el prompt visual y haz clic en "Regenerar Imagen".
   - **Subir imagen** — Haz clic en "Subir imagen" para reemplazar la imagen generada por una propia.

7. **Descargar** — Al finalizar, haz clic en "Descargar Cuestionario" para obtener un HTML autónomo con las preguntas, imágenes y temporizador.

## Personalización

- **Paleta de colores** — Haz clic en "Cambiar Paleta" para alternar entre 24 combinaciones de colores.
- **Modelos** — Puedes cambiar los modelos de imagen y texto antes de generar.

## Tecnologías

- [pdf.js](https://mozilla.github.io/pdf.js/) — Extracción de texto de PDF
- [Pollinations AI](https://pollinations.ai/) — Generación de preguntas e imágenes vía API
- HTML, CSS, JavaScript vanilla (sin dependencias de framework)
