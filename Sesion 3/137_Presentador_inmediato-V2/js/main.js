// --- PLANTILLA DE MODELO.HTML EMBEBIDA ---
const TEMPLATE_MODELO = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=yes,minimal-ui">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>Presentador de diapositivas</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            height: 100%;
            overflow: hidden;
            background-color: #1a1a1a;
        }
        .presentation {
            position: relative;
            background-color: #1a1a1a;
            color: white;
            box-sizing: border-box;
        }
        /* SIZE: será reemplazado por la selección del usuario (horizontal/vertical) */
        %%PRESENTATION_STYLE%%
        .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            padding-bottom: 40px;
            box-sizing: border-box;
            opacity: 0;
            pointer-events: none;
        }
        .slide.active {
            opacity: 1;
            z-index: 1;
            pointer-events: auto;
        }
        .slide h2 {
            font-size: 2.3em;
            margin-bottom: 20px;
            text-align: center;
        }
        .slide p {
            font-size: 1.2em;
            max-width: 800px;
            text-align: center;
            margin-bottom: 20px;
        }
        .slide img, .slide video {
            max-width: 100%;
            max-height: 85%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.5);
        }
        .slide iframe {
            width: calc(100% - 120px);
            height: 85%;
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.5);
        }
        .slide-link-badge {
            position: absolute;
            bottom: 55px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(33,150,243,0.85);
            color: white;
            font-size: 0.8em;
            padding: 4px 12px;
            border-radius: 20px;
            cursor: pointer;
            z-index: 2;
            backdrop-filter: blur(4px);
            white-space: nowrap;
        }
        .slide-link-badge:hover {
            background: rgba(33,150,243,1);
        }
        .nav-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            font-size: 1.5em;
            border-radius: 50%;
            z-index: 2;
        }
        .nav-button:hover {
            background-color: rgba(255,255,255,0.3);
        }
        #prevBtn {
            left: 20px;
        }
        #nextBtn {
            right: 20px;
        }
        .indicators {
            position: absolute;
            bottom: 35px; /* Subido un poco para dejar espacio al footer */
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            z-index: 2;
        }
        .indicator {
            width: 12px;
            height: 12px;
            background-color: rgba(255,255,255,0.3);
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
        }
        .indicator.active {
            background-color: white;
        }
        
        /* Estilo del footer DE LA PRESENTACIÓN GENERADA */
        footer {
            position: absolute;
            bottom: 5px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.4);
            z-index: 3;
            pointer-events: none;
            font-family: sans-serif;
        }
        /* Estilos para lupa/zoom */
        .zoom-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .zoom-btn:hover {
            background: rgba(0, 0, 0, 0.8);
        }
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .lightbox.open {
            display: flex;
        }
        .lightbox img {
            max-width: 90vw;
            max-height: 90vh;
            border-radius: 8px;
        }
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 24px;
        }
        /* Fullscreen para iframes HTML */
        .fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 20px;
            box-sizing: border-box;
        }
        .fullscreen.open {
            display: flex;
        }
        .fullscreen iframe {
            width: 95vw;
            height: 95vh;
            border: none;
            border-radius: 8px;
            background: white;
        }
    </style>
</head>
<body>
    <div class="presentation">
        <div id="slideContainer">
            <!-- Las diapositivas se generarán dinámicamente aquí -->
        </div>
        
        <button id="prevBtn" class="nav-button">&#10094;</button>
        <button id="nextBtn" class="nav-button">&#10095;</button>
        
        <div class="indicators"></div>

        <!-- FOOTER EN EL HTML GENERADO -->
        <footer>Diseñado por Juan Guillermo Rivera Berrío con tecnología Gemini 3 Pro</footer>
    </div>

    <!-- Lightbox para zoom de imágenes -->
    <div id="lightbox" class="lightbox">
        <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
        <img id="lightboxImg" src="" alt="Imagen ampliada">
    </div>

    <!-- Fullscreen para iframes HTML -->
    <div id="fullscreen" class="fullscreen">
        <button class="lightbox-close" onclick="closeHtmlFullscreen()">&times;</button>
        <iframe id="fullscreenIframe" src=""></iframe>
    </div>

<script type="module">
    const slideContainer = document.getElementById('slideContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelector('.indicators');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const fullscreen = document.getElementById('fullscreen');
    const fullscreenIframe = document.getElementById('fullscreenIframe');

    function resetIframeScroll(iframe) {
        const reset = () => {
            try {
                if (iframe.contentWindow) {
                    iframe.contentWindow.scrollTo(0, 0);
                }
                const doc = iframe.contentDocument || iframe.contentWindow?.document;
                if (doc) {
                    doc.documentElement.scrollTop = 0;
                    doc.body.scrollTop = 0;
                }
            } catch (error) {
                console.warn('No se pudo ajustar el scroll del iframe', error);
            }
        };

        iframe.addEventListener('load', reset);
        setTimeout(reset, 0);
    }

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('open');
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
    }

    function openHtmlFullscreen(b64Url) {
        const b64 = b64Url.split(',')[1];
        fullscreenIframe.removeAttribute('src');
        fullscreenIframe.srcdoc = decodeURIComponent(escape(atob(b64)));
        fullscreenIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
        resetIframeScroll(fullscreenIframe);
        fullscreen.classList.add('open');
    }

    function openPdfFullscreen(pdfUrl) {
        fullscreenIframe.removeAttribute('srcdoc');
        fullscreenIframe.removeAttribute('sandbox');
        fullscreenIframe.src = pdfUrl;
        fullscreen.classList.add('open');
    }

    function closeHtmlFullscreen() {
        fullscreen.classList.remove('open');
        fullscreenIframe.removeAttribute('src');
        fullscreenIframe.removeAttribute('srcdoc');
        fullscreenIframe.removeAttribute('sandbox');
        fullscreenIframe.src = '';
    }

    // Exponer funciones globalmente para onclick
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    window.openHtmlFullscreen = openHtmlFullscreen;
    window.closeHtmlFullscreen = closeHtmlFullscreen;

    let slides = [];
    let currentSlide = 0;

    const transitions = [
        { name: 'fade',           duration: '0.6s', easing: 'ease-in-out' },
        { name: 'slideLeft',      duration: '0.5s', easing: 'cubic-bezier(0.25,0.46,0.45,0.94)' },
        { name: 'slideRight',     duration: '0.5s', easing: 'cubic-bezier(0.25,0.46,0.45,0.94)' },
        { name: 'slideUp',        duration: '0.5s', easing: 'cubic-bezier(0.25,0.46,0.45,0.94)' },
        { name: 'slideDown',      duration: '0.5s', easing: 'cubic-bezier(0.25,0.46,0.45,0.94)' },
        { name: 'rotate',         duration: '0.7s', easing: 'ease-in-out' },
        { name: 'scale',          duration: '0.5s', easing: 'ease-out' },
        { name: 'flipX',          duration: '0.7s', easing: 'ease-in-out' },
        { name: 'flipY',          duration: '0.7s', easing: 'ease-in-out' },
        { name: 'zoomBlur',       duration: '0.6s', easing: 'ease-out' },
        { name: 'swingIn',        duration: '0.7s', easing: 'ease-out' },
        { name: 'bounceIn',       duration: '0.8s', easing: 'cubic-bezier(0.34,1.56,0.64,1)' },
        { name: 'glitch',         duration: '0.5s', easing: 'steps(4, end)' },
        { name: 'spiralIn',       duration: '0.7s', easing: 'ease-out' },
        { name: 'dropIn',         duration: '0.6s', easing: 'cubic-bezier(0.34,1.56,0.64,1)' },
        { name: 'unfold',         duration: '0.6s', easing: 'ease-in-out' },
        { name: 'skewIn',         duration: '0.55s', easing: 'ease-out' },
        { name: 'slideTopLeft',   duration: '0.55s', easing: 'cubic-bezier(0.25,0.46,0.45,0.94)' },
        { name: 'slideBottomRight',duration: '0.55s', easing: 'cubic-bezier(0.25,0.46,0.45,0.94)' },
        { name: 'flipDiagonal',   duration: '0.75s', easing: 'ease-in-out' },
        { name: 'rotateScale',    duration: '0.7s', easing: 'ease-in-out' },
        { name: 'blurIn',         duration: '0.6s', easing: 'ease-out' },
        { name: 'lightSpeed',     duration: '0.6s', easing: 'cubic-bezier(0.25,0.46,0.45,0.94)' },
        { name: 'jackInTheBox',   duration: '0.8s', easing: 'cubic-bezier(0.68,-0.55,0.27,1.55)' },
        { name: 'perspectiveFlip',duration: '0.8s', easing: 'ease-in-out' },
    ];

    function initSlides() {
        // Crear diapositivas dinámicamente
        mediaItems.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide' + (index === 0 ? ' active' : '');

            if (item.type === 'video') {
                const video = document.createElement('video');
                video.src = item.url;
                video.controls = true;
                video.autoplay = false;
                video.style.maxWidth = '100%';
                video.style.height = 'auto';
                video.style.borderRadius = '10px';
                video.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
                slide.appendChild(video);
            } else if (item.type === 'pdf') {
                const viewer = document.createElement('iframe');
                viewer.src = item.url;
                viewer.title = 'Visor de PDF';
                viewer.setAttribute('type', 'application/pdf');
                viewer.style.background = 'white';
                viewer.style.width = 'calc(100% - 120px)';
                viewer.style.height = '85%';
                viewer.style.maxWidth = '100%';
                viewer.style.border = 'none';
                viewer.style.borderRadius = '10px';
                viewer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
                slide.appendChild(viewer);
            } else if (item.type === 'html') {
                const iframe = document.createElement('iframe');
                // Decodificar base64 → texto HTML
                const b64 = item.url.split(',')[1];
                iframe.srcdoc = decodeURIComponent(escape(atob(b64)));
                iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
                resetIframeScroll(iframe);
                slide.appendChild(iframe);
            } else {
                const img = document.createElement('img');
                img.src = item.url;
                img.alt = 'Imagen ' + (index + 1);
                img.onerror = function () {
                    this.style.display = 'none';
                    const errorMsg = document.createElement('p');
                    errorMsg.textContent = 'Imagen ' + (index + 1) + ' no encontrada';
                    slide.appendChild(errorMsg);
                };
                slide.appendChild(img);

                // Botón de lupa para zoom de imagen
                if (item.type === 'image') {
                    const zoomBtn = document.createElement('button');
                    zoomBtn.className = 'zoom-btn';
                    zoomBtn.innerHTML = '&#x1F50D;';
                    zoomBtn.title = 'Ampliar imagen';
                    zoomBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        openLightbox(item.url);
                    });
                    slide.appendChild(zoomBtn);
                }
            }

            // Botón zoom para HTML y PDF
            if (item.type === 'html' || item.type === 'pdf') {
                const zoomBtn = document.createElement('button');
                zoomBtn.className = 'zoom-btn';
                zoomBtn.innerHTML = '&#x1F50D;';
                zoomBtn.title = item.type === 'html' ? 'Ver en pantalla completa' : 'Ampliar PDF';
                zoomBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (item.type === 'html') {
                        openHtmlFullscreen(item.url);
                    } else if (item.type === 'pdf') {
                        openPdfFullscreen(item.url);
                    }
                });
                slide.appendChild(zoomBtn);
            }

            // Badge de enlace si existe
            if (item.link) {
                const badge = document.createElement('span');
                badge.className = 'slide-link-badge';
                badge.textContent = '🔗 Ver enlace';
                badge.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const w = 900, h = 600;
                    const left = Math.round((screen.width - w) / 2);
                    const top = Math.round((screen.height - h) / 2);
                    window.open(item.link, '_blank', "noopener,noreferrer,width=" + w + ",height=" + h + ",left=" + left + ",top=" + top);
                });
                slide.appendChild(badge);
            }

            slideContainer.appendChild(slide);
        });

        slides = document.querySelectorAll('.slide');

        updateIndicators();
        updateButtonState();
    }

    function showSlide(index) {
        slides[currentSlide].style.animation = '';
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        currentSlide = index;

        updateIndicators();
        applyRandomTransition();
        updateButtonState();
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    function updateIndicators() {
        indicators.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (index === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            indicators.appendChild(dot);
        });
    }

    function updateButtonState() {
        prevBtn.disabled = (currentSlide === 0);
        nextBtn.disabled = (currentSlide === slides.length - 1);
    }

    function applyRandomTransition() {
        const t = transitions[Math.floor(Math.random() * transitions.length)];
        const el = slides[currentSlide];
        el.style.animation = 'none';
        el.offsetHeight; // forzar reflow
        el.style.animation = t.name + " " + t.duration + " " + t.easing + " forwards";
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Lightbox y fullscreen: cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeHtmlFullscreen();
        }
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Lightbox: cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Fullscreen: cerrar al hacer clic fuera del iframe
    fullscreen.addEventListener('click', (e) => {
        if (e.target === fullscreen) closeHtmlFullscreen();
    });

    // Add transition animations
    var transitionCSS = "" +
        "@keyframes fade        { from { opacity: 0; } to { opacity: 1; } }" +
        "@keyframes slideLeft   { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }" +
        "@keyframes slideRight  { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }" +
        "@keyframes slideUp     { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }" +
        "@keyframes slideDown   { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }" +
        "@keyframes rotate      { from { transform: rotate(180deg) scale(0); opacity: 0; } to { transform: rotate(0deg) scale(1); opacity: 1; } }" +
        "@keyframes scale       { from { transform: scale(0.2); opacity: 0; } to { transform: scale(1); opacity: 1; } }" +
        "@keyframes flipX       { from { transform: perspective(600px) rotateX(90deg); opacity: 0; } to { transform: perspective(600px) rotateX(0deg); opacity: 1; } }" +
        "@keyframes flipY       { from { transform: perspective(600px) rotateY(90deg); opacity: 0; } to { transform: perspective(600px) rotateY(0deg); opacity: 1; } }" +
        "@keyframes zoomBlur    { from { transform: scale(1.4); filter: blur(18px); opacity: 0; } to { transform: scale(1); filter: blur(0); opacity: 1; } }" +
        "@keyframes swingIn     { from { transform: perspective(600px) rotateY(-70deg) translateX(-60px); opacity: 0; } to { transform: perspective(600px) rotateY(0deg) translateX(0); opacity: 1; } }" +
        "@keyframes bounceIn    { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }" +
        "@keyframes glitch      { 0%   { transform: translate(-4px, 0) skewX(-3deg); opacity: 0.6; } 25%  { transform: translate(4px, -2px) skewX(3deg); opacity: 0.8; } 50%  { transform: translate(-2px, 2px) skewX(-1deg); opacity: 0.9; } 75%  { transform: translate(2px, 0) skewX(1deg); opacity: 1; } 100% { transform: translate(0, 0) skewX(0); opacity: 1; } }" +
        "@keyframes spiralIn    { from { transform: rotate(360deg) scale(0); opacity: 0; } to { transform: rotate(0deg) scale(1); opacity: 1; } }" +
        "@keyframes dropIn      { from { transform: translateY(-80px) scale(0.8); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }" +
        "@keyframes unfold      { 0%   { transform: scaleY(0) translateY(-50%); opacity: 0; } 60%  { transform: scaleY(1.05) translateY(0); opacity: 1; } 100% { transform: scaleY(1) translateY(0); opacity: 1; } }" +
        "@keyframes skewIn      { from { transform: skew(-20deg, -8deg) scale(0.9); opacity: 0; } to { transform: skew(0,0) scale(1); opacity: 1; } }" +
        "@keyframes slideTopLeft { from { transform: translate(-50%, -50%); opacity: 0; } to { transform: translate(0,0); opacity: 1; } }" +
        "@keyframes slideBottomRight { from { transform: translate(50%, 50%); opacity: 0; } to { transform: translate(0,0); opacity: 1; } }" +
        "@keyframes flipDiagonal { from { transform: rotate3d(1,1,0,120deg) scale(0.6); opacity: 0; } to { transform: rotate3d(0,0,0,0deg) scale(1); opacity: 1; } }" +
        "@keyframes rotateScale  { from { transform: rotate(180deg) scale(0); opacity: 0; } to { transform: rotate(0deg) scale(1); opacity: 1; } }" +
        "@keyframes blurIn       { from { filter: blur(30px); opacity: 0; transform: scale(1.05); } to { filter: blur(0); opacity: 1; transform: scale(1); } }" +
        "@keyframes lightSpeed   { from { transform: translateX(100%) skewX(-30deg); opacity: 0; } to { transform: translateX(0) skewX(0); opacity: 1; } }" +
        "@keyframes jackInTheBox { 0% {opacity:0;transform:scale(.1) rotate(30deg);transform-origin:center bottom;} 50%{transform:rotate(-10deg);} 70%{transform:rotate(3deg);} 100%{opacity:1;transform:scale(1) rotate(0);} }" +
        "@keyframes perspectiveFlip { from { transform: perspective(800px) rotateY(90deg); opacity: 0; } to { transform: perspective(800px) rotateY(0deg); opacity: 1; } }";
    
    const style = document.createElement('style');
    style.textContent = transitionCSS;
    document.head.appendChild(style);

    // ----------- MEDIOS INYECTADOS -----------
    const mediaItems = [
        // PLACEHOLDER_FOR_MEDIA
    ];

    // Ajuste de tamaño responsivo: calcula ancho desde la altura del viewport
    function resizePresentation() {
        const pres = document.querySelector('.presentation');
        if (!pres) return;
        const style = getComputedStyle(pres);
        const aspectWVal = style.getPropertyValue('--aspect-w');
        const aspectHVal = style.getPropertyValue('--aspect-h');
        const aspectW = (aspectWVal !== "" && !isNaN(parseFloat(aspectWVal))) ? parseFloat(aspectWVal) : 16;
        const aspectH = (aspectHVal !== "" && !isNaN(parseFloat(aspectHVal))) ? parseFloat(aspectHVal) : 9;
        const ratio = aspectW / aspectH;
        const maxWRaw = style.getPropertyValue('--preset-maxw') || '';
        const maxW = maxWRaw ? parseInt(maxWRaw) : 1280;

        // Si es modo responsive (proporción 0), no intervenimos con JS
        if (aspectW === 0 || isNaN(ratio)) {
            return;
        }

        // Cálculo de espacio reservado (márgenes y otros elementos fuera del presentador)
        let reservedH = 40; // Base: margen superior (20px) + margen inferior (20px)
        const possibleSelectors = ['.controls', '.top-controls', '#topControls', '.page-controls', '.page-footer', 'body > footer', '#pageFooter', '.controls-wrapper'];
        possibleSelectors.forEach(sel => {
            const el = document.querySelector(sel);
            if (el && !pres.contains(el) && el.offsetParent !== null) {
                reservedH += el.offsetHeight || 0;
            }
        });

        const availH = Math.max(200, window.innerHeight - reservedH);
        const availW = Math.max(200, document.documentElement.clientWidth - 40); // 20px de margen a cada lado

        let targetW, targetH;

        // Determinar si limitar por ancho o por alto basándose en la relación de aspecto
        if (availW / availH > ratio) {
            // El viewport es más ancho que la proporción -> limitar por altura
            targetH = availH;
            targetW = targetH * ratio;
        } else {
            // El viewport es más alto que la proporción -> limitar por ancho
            targetW = availW;
            targetH = targetW / ratio;
        }

        // No exceder el ancho máximo definido para el preset
        if (targetW > maxW) {
            targetW = maxW;
            targetH = targetW / ratio;
        }

        // Aplicar dimensiones
        pres.style.width = Math.round(targetW) + 'px';
        pres.style.height = Math.round(targetH) + 'px';
        pres.style.maxWidth = 'none'; 
        pres.style.minWidth = 'none';
        pres.style.margin = '0'; // Flexbox en body maneja el centrado
        pres.style.overflow = 'hidden';

        // Asegurar que las diapositivas ocupen todo el contenedor calculado
        const slds = pres.querySelectorAll('.slide');
        slds.forEach(s => { 
            s.style.height = pres.clientHeight + 'px'; 
            s.style.width = pres.clientWidth + 'px';
            s.style.padding = '20px';
            s.style.paddingBottom = '50px';
        });
    }

    window.addEventListener('resize', resizePresentation);
    window.addEventListener('orientationchange', resizePresentation);
    window.addEventListener('load', resizePresentation);
    document.addEventListener('DOMContentLoaded', resizePresentation);

    initSlides();
    // run after slides created and after media load
    // Asegurar redimensionamiento después de que se carguen las imágenes/videos
    setTimeout(()=>{
        const pres = document.querySelector('.presentation');
        if (!pres) return;
        const imgs = Array.from(pres.querySelectorAll('img'));
        
        imgs.forEach(img => {
            if (!img.complete) img.addEventListener('load', () => resizePresentation());
        });
        pres.querySelectorAll('video').forEach(v => {
            v.addEventListener('loadedmetadata', () => resizePresentation());
        });
        
        resizePresentation();
    }, 100);
<\/script>
</body>
</html>
`;

// Mapa de enlaces por índice de diapositiva (0-based)
const slideLinks = {};
let previousSlideIndex = null;

function onFilesSelected() {
    const files = document.getElementById("imageFiles").files;
    const selector = document.getElementById("slideSelector");
    const linkSection = document.getElementById("linkSection");

    if (files.length === 0) {
        linkSection.style.display = "none";
        return;
    }

    selector.innerHTML = '';
    const sorted = Array.from(files).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    sorted.forEach((file, i) => {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = "Diapositiva " + (i + 1) + " (" + file.name + ")";
        selector.appendChild(opt);
    });

    previousSlideIndex = "0";
    linkSection.style.display = "block";
    document.getElementById("linkInputWrapper").style.display = "block";
    document.getElementById("linkInput").value = "";
    document.getElementById("linkInput").placeholder = "https://...";
}

function onSlideSelected() {
    const selector = document.getElementById("slideSelector");
    const linkInput = document.getElementById("linkInput");

    // Guardar enlace de la diapositiva ANTERIOR (antes del cambio)
    if (previousSlideIndex !== null) {
        const val = linkInput.value.trim();
        if (val) {
            slideLinks[previousSlideIndex] = val;
        } else {
            delete slideLinks[previousSlideIndex];
        }
    }

    // Actualizar índice anterior al nuevo
    previousSlideIndex = selector.value;

    // Mostrar enlace guardado para la nueva diapositiva o limpiar
    const saved = slideLinks[selector.value];
    linkInput.value = saved || "";
    linkInput.placeholder = "https://...";
}

function saveCurrentLink() {
    const selector = document.getElementById("slideSelector");
    const linkInput = document.getElementById("linkInput");
    const val = linkInput.value.trim();
    if (val) {
        slideLinks[selector.value] = val;
    } else {
        delete slideLinks[selector.value];
    }
}

async function fileToBase64(file){
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function procesar(){

    const imagesInput = document.getElementById("imageFiles").files;

    if(imagesInput.length === 0){
        alert("Debes seleccionar al menos una imagen, video, PDF o archivo HTML.");
        return;
    }

    // Ordenar archivos por nombre (numérico si es posible)
    const files = Array.from(imagesInput).sort((a,b)=>{
        return a.name.localeCompare(b.name, undefined, {numeric:true});
    });

    const btn = document.querySelector("button");
    const originalText = btn.innerText;
    btn.innerText = "Procesando...";
    btn.disabled = true;

    try {
        // Guardar enlace del selector actual antes de procesar
        saveCurrentLink();

        const mediaItems = [];

        for(const file of files){
            const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
            const isHtml = file.type === 'text/html' || file.name.toLowerCase().endsWith('.html');
            const base64 = await fileToBase64(file);

            if (isPdf) {
                mediaItems.push({ type: 'pdf', url: base64 });
            } else if (isHtml) {
                mediaItems.push({ type: 'html', url: base64 });
            } else {
                const type = file.type.startsWith('video/') ? 'video' : 'image';
                mediaItems.push({ url: base64, type });
            }
        }

        // Crear contenido del arreglo para JS (incluyendo enlaces si existen)
        let arrayContent = "";
        mediaItems.forEach((item, i) => {
            const link = slideLinks[i] ? ", link: '" + slideLinks[i] + "'" : '';
            arrayContent += "        { url: '" + item.url + "', type: '" + item.type + "'" + link + " },\n";
        });

        // Usar la plantilla interna
        let htmlText = TEMPLATE_MODELO;

        // Reemplazar el placeholder
        const regex = /const mediaItems\s*=\s*\[[\s\S]*?\];/;
        const newArrayDefinition = "const mediaItems = [\n" + arrayContent + "    ];";
        
        htmlText = htmlText.replace(regex, newArrayDefinition);

        // Insertar estilos según el selector de tamaño (varios presets)
        const sizeSel = (document.getElementById('sizeSelector') && document.getElementById('sizeSelector').value) ? document.getElementById('sizeSelector').value : 'horizontal';
        let sizeStyles = '';
        // Helper para crear styles que respeten altura de viewport y escalen contenido
        function makeSize(maxW, ratioW, ratioH) {
            // Caso especial para responsive (Fullscreen puro sin JS)
            if (ratioW === 0) {
                return "/* Preset: Full Responsive (Original) */\n\
.presentation { --preset-maxw: 9999px; --aspect-w: 0; --aspect-h: 0; width: 100%; height: 100%; margin: 0; box-shadow: none; position: relative; }\n\
.presentation .slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 20px !important; padding-bottom: 40px !important; box-sizing: border-box; }\n\
.presentation img, .presentation video { max-width: 100%; max-height: 85%; object-fit: contain; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.5); }\n\
.presentation iframe { width: calc(100% - 120px); height: 85%; border: none; border-radius: 10px; }\n\
footer { bottom: 5px; position: absolute; width: 100%; text-align: center; }\n\
.indicators { bottom: 35px; position: absolute; width: 100%; display: flex; justify-content: center; }\n\
.slide-link-badge { bottom: 55px; }";
            }
            return "/* Preset: dinamico con ratio fijo + centrado Flexbox */\n\
body, html { display: flex !important; align-items: center; justify-content: center; }\n\
.presentation { --preset-maxw: " + maxW + "px; --aspect-w: " + ratioW + "; --aspect-h: " + ratioH + "; display:block; box-shadow: 0 0 50px rgba(0,0,0,0.5); }\n\
.presentation .slide { height: 100%; padding: 40px; padding-bottom: 85px; box-sizing: border-box; }\n\
.presentation img, .presentation video { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }\n\
.presentation iframe { width: 100%; height: 100%; border: none; border-radius: 10px; }";
        }

        switch (sizeSel) {
            case 'responsive':
                sizeStyles = makeSize(0, 0, 0);
                break;
            case 'horizontal':
                sizeStyles = makeSize(1280, 16, 9);
                break;
            case 'ppt-4-3':
                sizeStyles = makeSize(1024, 4, 3);
                break;
            case 'square-1-1':
                sizeStyles = makeSize(900, 1, 1);
                break;
            case 'ig-post-4-5':
                sizeStyles = makeSize(900, 4, 5);
                break;
            case 'tiktok-9-16':
                sizeStyles = makeSize(720, 9, 16);
                break;
            case 'poster-3-2':
                sizeStyles = makeSize(1000, 3, 2);
                break;
            case 'a4-portrait':
                sizeStyles = makeSize(794, 210, 297); // px width approx for A4 at 96dpi
                break;
            case 'vertical':
            default:
                sizeStyles = makeSize(900, 3, 4);
                break;
        }

        htmlText = htmlText.replace('%%PRESENTATION_STYLE%%', sizeStyles);

        // Descargar archivo nuevo
        const blob = new Blob([htmlText], {type:"text/html"});
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "presentacion_slides.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (err) {
        alert("Hubo un error al procesar los archivos.");
        console.error(err);
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}