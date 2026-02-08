/**
 * Sistema de Audio - ¿Voy a Morir Mañana?
 * Genera sonidos sintetizados con Web Audio API
 */

class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.isInitialized = false;
        this.ambientNodes = null;
    }

    /**
     * Inicializa el contexto de audio (requiere interacción del usuario)
     */
    init() {
        if (this.isInitialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isInitialized = true;
        } catch (e) {
            console.log('Web Audio API no soportada');
        }
    }

    /**
     * Genera ruido blanco/rosa para el viento
     */
    createNoiseBuffer(duration = 2) {
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Ruido rosa (más suave que blanco)
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
            b6 = white * 0.115926;
        }
        return buffer;
    }

    /**
     * Sonido de ruleta girando para el splash
     */
    playSpinningSound() {
        if (!this.isInitialized) return;

        const now = this.audioContext.currentTime;
        const duration = 3.5;

        // Crear oscilador para el sonido mecánico de ruleta
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.type = 'sawtooth';

        // Frecuencia que decelera (simula ruleta parando)
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(30, now + duration);

        // Filtro para suavizar
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(300, now + duration);

        // Volumen con fade out
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + duration);

        // Añadir clicks mecánicos
        this.playMechanicalClicks(duration);
    }

    /**
     * Clicks mecánicos de la ruleta
     */
    playMechanicalClicks(duration) {
        const now = this.audioContext.currentTime;
        let clickTime = 0;
        let interval = 0.05; // Empieza rápido

        while (clickTime < duration) {
            this.playClick(now + clickTime, 0.08);
            clickTime += interval;
            interval *= 1.08; // Decelera gradualmente
        }
    }

    /**
     * Un click individual
     */
    playClick(time, volume = 0.1) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(800, time);
        oscillator.frequency.exponentialRampToValueAtTime(200, time + 0.02);

        gainNode.gain.setValueAtTime(volume, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start(time);
        oscillator.stop(time + 0.03);
    }

    /**
     * Inicia el ambiente atmosférico (drone + viento)
     */
    startAmbient() {
        if (!this.isInitialized || this.ambientNodes) return;

        const now = this.audioContext.currentTime;

        // === DRONE (acorde sostenido) ===
        const droneGain = this.audioContext.createGain();
        droneGain.gain.setValueAtTime(0, now);
        droneGain.gain.linearRampToValueAtTime(0.08, now + 3); // Fade in lento
        droneGain.connect(this.audioContext.destination);

        // Acorde menor misterioso (A2, E3, A3, C4)
        const frequencies = [110, 164.81, 220, 261.63];
        const oscillators = frequencies.map(freq => {
            const osc = this.audioContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            // Añadir ligera modulación para movimiento
            const lfo = this.audioContext.createOscillator();
            const lfoGain = this.audioContext.createGain();
            lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.1, now);
            lfoGain.gain.setValueAtTime(2, now);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start(now);

            osc.connect(droneGain);
            osc.start(now);
            return { osc, lfo };
        });

        // === VIENTO ===
        const windGain = this.audioContext.createGain();
        const windFilter = this.audioContext.createBiquadFilter();

        windFilter.type = 'bandpass';
        windFilter.frequency.setValueAtTime(400, now);
        windFilter.Q.setValueAtTime(0.5, now);

        windGain.gain.setValueAtTime(0, now);
        windGain.gain.linearRampToValueAtTime(0.12, now + 2);

        // Crear fuente de ruido para el viento
        const noiseBuffer = this.createNoiseBuffer(2);
        const windSource = this.audioContext.createBufferSource();
        windSource.buffer = noiseBuffer;
        windSource.loop = true;

        // LFO para modulación del viento
        const windLfo = this.audioContext.createOscillator();
        const windLfoGain = this.audioContext.createGain();
        windLfo.frequency.setValueAtTime(0.2, now);
        windLfoGain.gain.setValueAtTime(200, now);
        windLfo.connect(windLfoGain);
        windLfoGain.connect(windFilter.frequency);
        windLfo.start(now);

        windSource.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(this.audioContext.destination);
        windSource.start(now);

        // Guardar referencias para poder parar luego
        this.ambientNodes = {
            droneGain,
            oscillators,
            windSource,
            windGain,
            windLfo
        };
    }

    /**
     * Para el ambiente
     */
    stopAmbient() {
        if (!this.ambientNodes) return;

        const now = this.audioContext.currentTime;

        // Fade out
        this.ambientNodes.droneGain.gain.linearRampToValueAtTime(0, now + 1);
        this.ambientNodes.windGain.gain.linearRampToValueAtTime(0, now + 1);

        setTimeout(() => {
            this.ambientNodes.oscillators.forEach(({ osc, lfo }) => {
                osc.stop();
                lfo.stop();
            });
            this.ambientNodes.windSource.stop();
            this.ambientNodes.windLfo.stop();
            this.ambientNodes = null;
        }, 1500);
    }

    /**
     * Sonido de botón hover (sutil)
     */
    playHover() {
        if (!this.isInitialized) return;

        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, now);

        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    /**
     * Sonido de botón click
     */
    playButtonClick() {
        if (!this.isInitialized) return;

        const now = this.audioContext.currentTime;

        // Sonido de "destino revelado" misterioso
        const osc1 = this.audioContext.createOscillator();
        const osc2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(220, now + 0.3);
        osc2.frequency.setValueAtTime(550, now);
        osc2.frequency.exponentialRampToValueAtTime(275, now + 0.3);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(500, now + 0.3);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.4);
        osc2.stop(now + 0.4);
    }

    /**
     * Sonido de revelación del destino (dramático)
     */
    playReveal(isYes = false) {
        if (!this.isInitialized) return;

        const now = this.audioContext.currentTime;

        if (isYes) {
            // Sonido ominoso para "Sí"
            this.playOminousReveal();
        } else {
            // Sonido de alivio para "No"
            this.playReliefReveal();
        }
    }

    playOminousReveal() {
        const now = this.audioContext.currentTime;

        // Acorde menor descendente y tenebroso
        const frequencies = [146.83, 174.61, 220]; // D3, F3, A3 (Dm)

        frequencies.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 2);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 2);

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.start(now + i * 0.1);
            osc.stop(now + 2);
        });
    }

    playReliefReveal() {
        const now = this.audioContext.currentTime;

        // Sonido de campana/gong de alivio
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + 1.5);

        // Armónicos
        [2, 3, 4].forEach(mult => {
            const harmonic = this.audioContext.createOscillator();
            const hGain = this.audioContext.createGain();

            harmonic.type = 'sine';
            harmonic.frequency.setValueAtTime(523.25 * mult, now);

            hGain.gain.setValueAtTime(0.1 / mult, now);
            hGain.gain.exponentialRampToValueAtTime(0.001, now + 1);

            harmonic.connect(hGain);
            hGain.connect(this.audioContext.destination);

            harmonic.start(now);
            harmonic.stop(now + 1);
        });
    }

    /**
     * Sonido de compartir
     */
    playShare() {
        if (!this.isInitialized) return;

        const now = this.audioContext.currentTime;

        // Sonido tipo "whoosh" de envío
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, now);
        filter.frequency.linearRampToValueAtTime(2000, now + 0.15);
        filter.frequency.linearRampToValueAtTime(300, now + 0.3);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + 0.3);
    }
}

// Instancia global
const audioSystem = new AudioSystem();
