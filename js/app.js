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
    "No, pero mañana sigue habiendo trabajo.",
    // 50 respuestas nuevas
    "No, tu horóscopo dice que hoy no toca.",
    "No, el karma aún tiene planes contigo.",
    "No, Hacienda todavía no ha terminado contigo.",
    "No, tu cuñado necesita a alguien con quien discutir.",
    "No, los Reyes Magos aún no han venido este año.",
    "No, tu perro aún no ha aprendido a abrir la nevera solo.",
    "No, quedan demasiados domingos aburridos por vivir.",
    "No, tu abuela quiere verte comer más.",
    "No, el algoritmo de TikTok todavía te necesita.",
    "No, tienes pendiente devolver ese tupper.",
    "No, aún no has encontrado todas las contraseñas olvidadas.",
    "No, el microondas sigue sin limpiarse solo.",
    "No, tu última búsqueda de Google fue demasiado rara para dejarte ir.",
    "No, todavía quedan grupos de WhatsApp que ignorar.",
    "No, el universo quiere ver tu cara el lunes.",
    "No, tienes que ver quién gana la liga este año.",
    "No, tu playlist de 'Mañana empiezo el gym' sigue esperando.",
    "No, Mercadona no cierra, y tú tampoco.",
    "No, la humanidad te necesita... bueno, más o menos.",
    "No, tus vecinos necesitan escuchar tu música.",
    "No, el sofá aún tiene tu huella perfecta y la echaría de menos.",
    "No, quedan muchos 'ya voy' por decir.",
    "No, tu móvil tiene 47 actualizaciones pendientes.",
    "No, el próximo capítulo de tu serie favorita sale mañana.",
    "No, aún no has ganado la lotería, sería injusto.",
    "No, el Satisfyer no tiene modo póstumo.",
    "No, tu madre aún no sabe usar bien el móvil y te necesita.",
    "No, el destino dice que hoy no le apetece papeleo.",
    "No, tienes que ver el final de The Walking Dead... sin ironías.",
    "No, hay demasiados audios de WhatsApp sin escuchar.",
    "No, tu tarjeta del súper aún no ha acumulado suficientes puntos.",
    "No, los Lunes siguen siendo legales, alguien tiene que sufrirlos.",
    "No, tu ex todavía no ha engordado lo suficiente.",
    "No, el WiFi del vecino todavía funciona.",
    "No, tu foto de perfil todavía no tiene suficientes likes.",
    "No, hay churros que aún no has mojado en chocolate.",
    "No, tu suscripción de Amazon Prime caduca el mes que viene.",
    "No, los spoilers de tu serie aún no han llegado a Twitter.",
    "No, tienes cita con el médico dentro de 8 meses.",
    "No, todavía no has terminado de pagar el móvil.",
    "No, el grupo de padres del cole te necesita.",
    "No, aún quedan emojis por usar mal.",
    "No, tu pez de colores depende de ti.",
    "No, tienes que ver si este año nieva o no.",
    "No, Alexa se sentiría muy sola.",
    "No, tienes un paquete de Amazon en camino.",
    "No, el IVA no se paga solo.",
    "No, tus stories de Instagram necesitan público.",
    "No, la tostadora sigue atascándose y solo tú sabes arreglarla.",
    "No, el 2026 promete ser interesante, aguanta."
];

const RESPUESTA_SI = `Sí, pero recuerda que esto es una app para sacar dinero con publicidad y que quizá no tenga ni idea. Insisto, quizá. Por si acaso TEN CUIDADO.`;

// =============================================
// CONSTANTES
// =============================================

const STORAGE_KEY = 'voyAMorirManana_usageCount';
const STORAGE_DATE_KEY = 'voyAMorirManana_usageDate';
const MAX_DAILY_ATTEMPTS = 3;
const HISTORY_KEY = 'voyAMorirManana_history';
const SPLASH_DURATION = 4300; // 4.3 segundos (3.5s animación + 0.8s fade)

// =============================================
// ELEMENTOS DEL DOM
// =============================================

const elements = {
    startScreen: document.getElementById('start-screen'),
    splashScreen: document.getElementById('splash-screen'),
    mainScreen: document.getElementById('main-screen'),
    resultScreen: document.getElementById('result-screen'),
    revealBtn: document.getElementById('reveal-btn'),
    waitMessage: document.getElementById('wait-message'),
    waitMessageText: document.getElementById('wait-message-text'),
    waitMessageTime: document.getElementById('wait-message-time'),
    attemptsInfo: document.getElementById('attempts-info'),
    resultCard: document.getElementById('result-card'),
    resultText: document.getElementById('result-text'),
    resultDate: document.getElementById('result-date'),
    shareBtn: document.getElementById('share-btn'),
    newQueryBtn: document.getElementById('new-query-btn'),
    historyBtn: document.getElementById('history-btn'),
    historyModal: document.getElementById('history-modal'),
    historyList: document.getElementById('history-list'),
    closeHistoryBtn: document.getElementById('close-history-btn'),
    soundToggle: document.getElementById('sound-toggle'),
    soundIconOn: document.getElementById('sound-icon-on'),
    soundIconOff: document.getElementById('sound-icon-off'),
    confirmModal: document.getElementById('confirm-modal'),
    confirmYesBtn: document.getElementById('confirm-yes-btn'),
    confirmNoBtn: document.getElementById('confirm-no-btn'),
    shareModal: document.getElementById('share-modal'),
    closeShareBtn: document.getElementById('close-share-btn')
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
 * Obtiene el número de usos hoy
 */
function getUsageCountToday() {
    const storedDate = localStorage.getItem(STORAGE_DATE_KEY);
    if (storedDate !== getTodayDate()) {
        // Nuevo día, resetear contador
        return 0;
    }
    return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
}

/**
 * Obtiene los intentos restantes hoy
 */
function getRemainingAttempts() {
    return MAX_DAILY_ATTEMPTS - getUsageCountToday();
}

/**
 * Verifica si ya se agotaron los intentos de hoy
 */
function hasUsedAllToday() {
    return getUsageCountToday() >= MAX_DAILY_ATTEMPTS;
}

/**
 * Guarda un uso
 */
function saveUsage() {
    const today = getTodayDate();
    const storedDate = localStorage.getItem(STORAGE_DATE_KEY);
    let count = 0;
    if (storedDate === today) {
        count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    }
    count++;
    localStorage.setItem(STORAGE_DATE_KEY, today);
    localStorage.setItem(STORAGE_KEY, count.toString());
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
// FUNCIONES DE HISTORIAL
// =============================================

/**
 * Guarda una profecía en el historial
 */
function saveToHistory(text, isYes) {
    const history = getHistory();
    history.unshift({
        text: text,
        isYes: isYes,
        date: formatDate(),
        timestamp: Date.now()
    });
    // Mantener máximo 50 entradas
    if (history.length > 50) {
        history.pop();
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

/**
 * Obtiene el historial de profecías
 */
function getHistory() {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
}

/**
 * Muestra el modal de historial
 */
function showHistoryModal() {
    const history = getHistory();

    if (history.length === 0) {
        elements.historyList.innerHTML = '<p class="history-empty">No hay profecías anteriores... todavía.</p>';
    } else {
        elements.historyList.innerHTML = history.map(item => `
            <div class="history-item ${item.isYes ? 'history-yes' : ''}">
                <div class="history-date">${item.date}</div>
                <div class="history-text">"${item.text}"</div>
            </div>
        `).join('');
    }

    elements.historyModal.classList.remove('hidden');
}

/**
 * Cierra el modal de historial
 */
function closeHistoryModal() {
    elements.historyModal.classList.add('hidden');
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

    const remaining = getRemainingAttempts();

    if (remaining <= 0) {
        // Sin intentos restantes
        elements.revealBtn.classList.add('hidden');
        elements.waitMessage.classList.remove('hidden');
        elements.waitMessageText.textContent = 'Ya has agotado tus 3 intentos de hoy.';
        elements.waitMessageTime.textContent = 'Vuelve mañana... si llegas.';
        if (elements.attemptsInfo) elements.attemptsInfo.classList.add('hidden');
    } else {
        elements.revealBtn.classList.remove('hidden');
        elements.waitMessage.classList.add('hidden');
        // Mostrar intentos restantes
        if (elements.attemptsInfo) {
            elements.attemptsInfo.classList.remove('hidden');
            if (remaining === MAX_DAILY_ATTEMPTS) {
                elements.attemptsInfo.textContent = `Puedes tentar a la suerte ${remaining} veces hoy.`;
            } else if (remaining === 1) {
                elements.attemptsInfo.textContent = '⚠️ Te queda 1 último intento por hoy.';
            } else {
                elements.attemptsInfo.textContent = `Puedes probar suerte ${remaining} veces más por hoy.`;
            }
        }
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
 * Genera el texto para compartir
 */
function getShareText() {
    const resultText = elements.resultText.textContent;
    return `🔮 ¿Voy a morir mañana?\n\n"${resultText}"\n\n💀 Consulta tu destino descargando la app "Voy a morir" de tu tienda de aplicaciones.`;
}

/**
 * Muestra el menú de compartir personalizado
 */
function shareResult() {
    const shareText = getShareText();
    const encodedText = encodeURIComponent(shareText);
    const pageUrl = encodeURIComponent(window.location.href);

    // Configurar los enlaces de cada app
    document.getElementById('share-whatsapp').href = `https://api.whatsapp.com/send?text=${encodedText}`;
    document.getElementById('share-telegram').href = `https://t.me/share/url?url=${pageUrl}&text=${encodedText}`;
    document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?text=${encodedText}`;
    document.getElementById('share-email').href = `mailto:?subject=${encodeURIComponent('¿Voy a Morir Mañana?')}&body=${encodedText}`;

    // Mostrar modal
    elements.shareModal.classList.remove('hidden');
}

/**
 * Copia texto al portapapeles con feedback visual
 */
function copyShareText() {
    const shareText = getShareText();
    navigator.clipboard.writeText(shareText).then(() => {
        const copyBtn = document.getElementById('share-copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="share-app-icon">✓</span><span>¡Copiado!</span>';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 1500);
    }).catch(() => {
        // Fallback para navegadores sin clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = shareText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        const copyBtn = document.getElementById('share-copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="share-app-icon">✓</span><span>¡Copiado!</span>';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 1500);
    });
}

/**
 * Cierra el modal de compartir
 */
function closeShareModal() {
    elements.shareModal.classList.add('hidden');
}

// =============================================
// EVENT LISTENERS
// =============================================

/**
 * Inicializa los eventos de la aplicación
 */
function initEventListeners() {
    // Función que ejecuta la revelación del destino
    function executeReveal() {
        audioSystem.playButtonClick();

        // Guardar uso
        saveUsage();

        // Generar y mostrar respuesta
        const response = generateResponse();
        showResultScreen(response);

        // Guardar en historial
        saveToHistory(response.text, response.isYes);

        // Sonido de revelación
        setTimeout(() => {
            audioSystem.playReveal(response.isYes);
        }, 300);
    }

    // Botón de revelar destino - muestra confirmación
    elements.revealBtn.addEventListener('click', () => {
        audioSystem.playButtonClick();
        elements.confirmModal.classList.remove('hidden');
    });

    // Confirmación: Sí, estoy seguro
    elements.confirmYesBtn.addEventListener('click', () => {
        elements.confirmModal.classList.add('hidden');
        executeReveal();
    });

    // Confirmación: No, cancelar
    elements.confirmNoBtn.addEventListener('click', () => {
        audioSystem.playButtonClick();
        elements.confirmModal.classList.add('hidden');
    });

    // Cerrar confirmación al hacer click fuera
    elements.confirmModal.addEventListener('click', (e) => {
        if (e.target === elements.confirmModal) {
            elements.confirmModal.classList.add('hidden');
        }
    });

    // Hover en botón principal
    elements.revealBtn.addEventListener('mouseenter', () => {
        audioSystem.playHover();
    });

    // Botón de compartir
    elements.shareBtn.addEventListener('click', () => {
        audioSystem.playButtonClick();
        shareResult();
    });

    // Cerrar modal de compartir
    elements.closeShareBtn.addEventListener('click', () => {
        audioSystem.playButtonClick();
        closeShareModal();
    });

    // Cerrar modal de compartir al hacer click fuera
    elements.shareModal.addEventListener('click', (e) => {
        if (e.target === elements.shareModal) {
            closeShareModal();
        }
    });

    // Botón de copiar en modal de compartir
    document.getElementById('share-copy').addEventListener('click', () => {
        copyShareText();
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

    // Botón de ver historial
    elements.historyBtn.addEventListener('click', () => {
        audioSystem.playButtonClick();
        showHistoryModal();
    });

    // Cerrar historial
    elements.closeHistoryBtn.addEventListener('click', () => {
        audioSystem.playButtonClick();
        closeHistoryModal();
    });

    // Cerrar historial al hacer click fuera
    elements.historyModal.addEventListener('click', (e) => {
        if (e.target === elements.historyModal) {
            closeHistoryModal();
        }
    });

    // Botón de sonido (mute/unmute)
    elements.soundToggle.addEventListener('click', () => {
        const isMuted = audioSystem.toggleMute();

        // Cambiar iconos
        elements.soundIconOn.classList.toggle('hidden', isMuted);
        elements.soundIconOff.classList.toggle('hidden', !isMuted);
        elements.soundToggle.classList.toggle('muted', isMuted);
    });
}

// =============================================
// INICIALIZACIÓN
// =============================================

/**
 * Inicializa la aplicación
 */
function init() {
    // Configurar event listeners (con protección contra errores)
    try {
        initEventListeners();
    } catch (e) {
        console.error('Error inicializando listeners:', e);
    }

    // Ocultar splash inicialmente (se mostrará después del click)
    elements.splashScreen.classList.add('hidden');

    // Handler para la pantalla de inicio
    let startHandled = false;
    const handleStart = (e) => {
        if (startHandled) return;
        startHandled = true;

        // Prevenir efecto de toque azul en móviles
        if (e) e.preventDefault();

        // Iniciar audio
        audioSystem.init();

        // Ocultar pantalla de inicio
        elements.startScreen.style.opacity = '0';
        elements.startScreen.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            elements.startScreen.classList.add('hidden');

            // Mostrar splash y reproducir sonido de ruleta
            elements.splashScreen.classList.remove('hidden');
            audioSystem.playSpinningSound();

            // Mostrar pantalla principal después del splash
            setTimeout(() => {
                showMainScreen();
                // Iniciar ambiente atmosférico
                audioSystem.startAmbient();
            }, SPLASH_DURATION);
        }, 300);

        // Remover listeners
        elements.startScreen.removeEventListener('click', handleStart);
        elements.startScreen.removeEventListener('touchstart', handleStart);
    };

    elements.startScreen.addEventListener('click', handleStart);
    elements.startScreen.addEventListener('touchstart', handleStart, { passive: false });
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
