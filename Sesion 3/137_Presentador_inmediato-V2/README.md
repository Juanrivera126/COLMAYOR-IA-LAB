# Generador de Presentaciones Inmediatas V2

Una herramienta web potente y sencilla para crear presentaciones interactivas y auto-contenidas en formato HTML a partir de imágenes, videos y archivos HTML externos.

## 🚀 Características Principales

- **Multi-formato**: Soporta imágenes (JPG, PNG, WEBP), videos (MP4) y archivos HTML.
- **Auto-contenido**: Genera un único archivo HTML que incluye todos los medios codificados en Base64. No necesita archivos externos para funcionar.
- **Diseño Responsive Inteligente**:
    - **Modo Responsive**: Ocupa el 100% de la pantalla (ancho y alto) adaptándose a cualquier dispositivo.
    - **Presets Fijos**: Incluye proporciones optimizadas para 16:9, 4:3, Instagram (1:1, 4:5), TikTok (9:16), Poster (3:2) y A4.
- **Interactividad**:
    - Navegación mediante flechas en pantalla, teclado (flechas izquierda/derecha) e indicadores táctiles.
    - Posibilidad de añadir enlaces personalizados a cada diapositiva con un botón emergente.
- **Experiencia Visual**:
    - 25 tipos de transiciones aleatorias (fades, slides, giros, zooms, efectos glitch, spirals, etc.).
    - Interfaz moderna en modo oscuro con efectos de desenfocado (backdrop-filter).

## 🛠️ Cómo usar la aplicación

1. **Selección de Archivos**: Sube tus imágenes, videos MP4 o archivos HTML. El orden se basa en el nombre del archivo.
2. **Configuración de Enlaces (Opcional)**: Selecciona una diapositiva en el menú desplegable y pega una URL si quieres que esa diapositiva tenga un enlace externo.
3. **Elegir Tamaño**: Selecciona el formato de salida deseado (por ejemplo, 16:9 para proyectores o Responsive para uso web general).
4. **Generar**: Haz clic en "Generar y Descargar HTML".
5. **Uso**: Abre el archivo descargado en cualquier navegador moderno.

## 💻 Detalles Técnicos

- **Core**: HTML5, CSS3 Vanilla y JavaScript moderno (ES6+).
- **Responsividad**: Utiliza variables CSS dinámicas y un motor de redimensionamiento en tiempo real para mantener la relación de aspecto bajo cualquier circunstancia.
- **Renderizado**: El contenedor de la presentación calcula el espacio disponible restando elementos de interfaz y márgenes para maximizar el área de visualización.

## ✒️ Créditos

Diseñado por **Juan Guillermo Rivera Berrío** con tecnología Gemini 3 Pro.

---
*Este proyecto es parte de la experimentación con herramientas de autoría rápida para contenido educativo y presentaciones web.*
