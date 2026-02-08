/**
 * ¿Voy a Morir Mañana? - Aplicación Principal
 * Un oráculo de dudosa fiabilidad con estética victoriana
 */

// =============================================
// RESPUESTAS DEL ORÁCULO
// =============================================

const RESPUESTAS_NO = [
    "No, mañana parece que no.",
    "No, aún toca aguantar a la suegra un día más.",
    "No, no te libras de madrugar.",
    "No, el lunes sigue existiendo para ti.",
    "No, tus facturas seguirán llegando puntualmente.",
    "No, todavía tienes que terminar esa serie.",
    "No, el WiFi no se va a arreglar solo.",
    "No, tu jefe te espera mañana con una sonrisa.",
    "No, aún quedan lunes por sufrir.",
    "No, el gimnasio te sigue esperando... otra vez.",
    "No, tu ex seguirá publicando stories feliz.",
    "No, mañana hay que sacar al perro.",
    "No, la declaración de la renta no se hace sola.",
    "No, aún te queda mucha cola del supermercado.",
    "No, el vecino seguirá haciendo obras.",
    "No, te toca renovar el DNI pronto.",
    "No, tus plantas necesitan agua mañana.",
    "No, hay una reunión que podría ser un email esperándote.",
    "No, el dentista te tiene cita el mes que viene.",
    "No, aún no has probado todos los sabores de helado.",
    "No, Netflix acaba de añadir contenido nuevo.",
    "No, mañana es otro día para procrastinar.",
    "No, el frigorífico no se va a limpiar solo.",
    "No, tu madre quiere que la llames.",
    "No, toca pagar el alquiler a fin de mes.",
    "No, los memes no se van a ver solos.",
    "No, alguien tiene que quejarse del tiempo.",
    "No, tu playlist de Spotify te necesita.",
    "No, hay demasiados kebabs por probar aún.",
    "No, tu silla del escritorio sigue sin arreglarse.",
    "No, el gato no se va a alimentar solo.",
    "No, quedan muchos cafés por tomar.",
    "No, aún no has visto el amanecer desde tu ventana.",
    "No, hay gente que aún te debe dinero.",
    "No, tu cama te espera para otra siesta.",
    "No, el universo dice que sigas aguantando.",
    "No, hay pizzas que aún no has probado.",
    "No, mañana sale el sol... probablemente.",
    "No, te falta discutir con alguien en internet.",
    "No, hay muchos chistes malos por contar.",
    "No, tu móvil necesita que lo cargues mañana.",
    "No, alguien tiene que oprimir el botón del ascensor.",
    "No, las ofertas del Black Friday te esperan.",
    "No, todavía no has encontrado calcetines que hagan juego.",
    "No, la lavadora sigue acumulando ropa.",
    "No, hay demasiadas fotos de comida sin subir a Instagram.",
    "No, te falta ver cómo acaba la política este año.",
    "No, hay colas de tráfico que experimentar.",
    "No, aún te queda batería... en la vida.",
    "No, pero mañana sigue habiendo trabajo."
];

const RESPUESTA_SI = `Sí, pero recuerda que esto es una app para sacar dinero con publicidad y que quizá no tenga ni idea. Insisto, quizá. Por si acaso TEN CUIDADO.`;

// =============================================
// CONSTANTES
// =============================================

const STORAGE_KEY = 'voyAMorirManana_lastUse';
const SPLASH_DURATION = 4300; // 4.3 segundos (3.5s animación + 0.8s fade)

// =============================================
// ELEMENTOS DEL DOM
// =============================================

const elements = {
    splashScreen: document.getElementById('splash-screen'),
    mainScreen: document.getElementById('main-screen'),
    resultScreen: document.getElementById('result-screen'),
    revealBtn: document.getElementById('reveal-btn'),
    waitMessage: document.getElementById('wait-message'),
    resultCard: document.getElementById('result-card'),
    resultText: document.getElementById('result-text'),
    resultDate: document.getElementById('result-date'),
    shareBtn: document.getElementById('share-btn'),
    newQueryBtn: document.getElementById('new-query-btn')
};

// =============================================
// FUNCIONES DE UTILIDAD
// =============================================

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD
 */
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

/**
 * Verifica si ya se usó la app hoy
 */
function hasUsedToday() {
    const lastUse = localStorage.getItem(STORAGE_KEY);
    return lastUse === getTodayDate();
}

/**
 * Guarda la fecha de uso actual
 */
function saveUsage() {
    localStorage.setItem(STORAGE_KEY, getTodayDate());
}

/**
 * Genera una respuesta aleatoria
 * 99% probabilidad de "No", 1% de "Sí"
 */
function generateResponse() {
    const random = Math.random() * 100;

    if (random < 1) {
        return {
            isYes: true,
            text: RESPUESTA_SI
        };
    } else {
        const randomIndex = Math.floor(Math.random() * RESPUESTAS_NO.length);
        return {
            isYes: false,
            text: RESPUESTAS_NO[randomIndex]
        };
    }
}

/**
 * Formatea la fecha para mostrar
 */
function formatDate() {
    const now = new Date();
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return now.toLocaleDateString('es-ES', options);
}

// =============================================
// FUNCIONES DE NAVEGACIÓN
// =============================================

/**
 * Muestra la pantalla principal
 */
function showMainScreen() {
    elements.splashScreen.classList.add('hidden');
    elements.mainScreen.classList.remove('hidden');
    elements.resultScreen.classList.add('hidden');

    // Verificar si ya se usó hoy
    if (hasUsedToday()) {
        elements.revealBtn.classList.add('hidden');
        elements.waitMessage.classList.remove('hidden');
    } else {
        elements.revealBtn.classList.remove('hidden');
        elements.waitMessage.classList.add('hidden');
    }
}

/**
 * Muestra la pantalla de resultado
 */
function showResultScreen(response) {
    elements.mainScreen.classList.add('hidden');
    elements.resultScreen.classList.remove('hidden');

    // Configurar la tarjeta según la respuesta
    elements.resultText.textContent = response.text;
    elements.resultDate.textContent = formatDate();

    if (response.isYes) {
        elements.resultCard.classList.add('result-yes');
    } else {
        elements.resultCard.classList.remove('result-yes');
    }

    // Añadir clase de animación
    elements.resultCard.classList.add('animate-in');
}

// =============================================
// FUNCIONES DE COMPARTIR
// =============================================

/**
 * Comparte el resultado usando Web Share API o clipboard
 */
async function shareResult() {
    const resultText = elements.resultText.textContent;
    const shareText = `🔮 ¿Voy a morir mañana?\n\n"${resultText}"\n\n💀 Consulta tu destino en: [URL de la app]`;

    // Intentar usar Web Share API (disponible en móviles)
    if (navigator.share) {
        try {
            await navigator.share({
                title: '¿Voy a Morir Mañana?',
                text: shareText
            });
            return;
        } catch (err) {
            // Si el usuario cancela o hay error, usar fallback
            if (err.name !== 'AbortError') {
                console.log('Error compartiendo:', err);
            }
        }
    }

    // Fallback: copiar al portapapeles
    try {
        await navigator.clipboard.writeText(shareText);

        // Feedback visual
        const originalText = elements.shareBtn.innerHTML;
        elements.shareBtn.innerHTML = '<span>✓</span> ¡Copiado!';
        elements.shareBtn.style.background = 'linear-gradient(135deg, #2a4a2a, #1a1a1a)';

        setTimeout(() => {
            elements.shareBtn.innerHTML = originalText;
            elements.shareBtn.style.background = '';
        }, 2000);
    } catch (err) {
        console.error('Error copiando:', err);
        alert('No se pudo compartir. Copia el texto manualmente.');
    }
}

// =============================================
// EVENT LISTENERS
// =============================================

/**
 * Inicializa los eventos de la aplicación
 */
function initEventListeners() {
    // Botón de revelar destino
    elements.revealBtn.addEventListener('click', () => {
        audioSystem.playButtonClick();

        // Guardar uso
        saveUsage();

        // Generar y mostrar respuesta
        const response = generateResponse();
        showResultScreen(response);

        // Sonido de revelación
        setTimeout(() => {
            audioSystem.playReveal(response.isYes);
        }, 300);
    });

    // Hover en botón principal
    elements.revealBtn.addEventListener('mouseenter', () => {
        audioSystem.playHover();
    });

    // Botón de compartir
    elements.shareBtn.addEventListener('click', () => {
        audioSystem.playShare();
        shareResult();
    });

    elements.shareBtn.addEventListener('mouseenter', () => {
        audioSystem.playHover();
    });

    // Botón de volver
    elements.newQueryBtn.addEventListener('click', () => {
        audioSystem.playButtonClick();
        showMainScreen();
    });

    elements.newQueryBtn.addEventListener('mouseenter', () => {
        audioSystem.playHover();
    });
}

// =============================================
// INICIALIZACIÓN
// =============================================

/**
 * Inicializa la aplicación
 */
function init() {
    // Configurar event listeners
    initEventListeners();

    // Iniciar audio al primer click (requerido por navegadores)
    const startAudio = () => {
        audioSystem.init();
        audioSystem.playSpinningSound();
        document.removeEventListener('click', startAudio);
        document.removeEventListener('touchstart', startAudio);
    };
    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio);

    // Mostrar pantalla principal después del splash
    setTimeout(() => {
        showMainScreen();
        // Iniciar ambiente atmosférico
        if (audioSystem.isInitialized) {
            audioSystem.startAmbient();
        }
    }, SPLASH_DURATION);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// =============================================
// DEBUG: Función para resetear (solo desarrollo)
// =============================================

// Descomentar para testing:
// window.resetApp = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     location.reload();
// };
