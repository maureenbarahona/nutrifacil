/**
 * Módulo de Narración por Voz Open-Source
 *
 * Motor primario:
 *   - Piper VITS Web (`@diffusionstudio/vits-web`, licencia MIT) ejecutándose 100% en el
 *     navegador vía WebAssembly + ONNX Runtime Web con voz neuronal en español (`es_ES-carlfm-x_low`).
 *
 * Motor de respaldo inmediato:
 *   - meSpeak.js (`mespeak` v2.0.2, port open-source de eSpeak a JS/WASM) con voz en
 *     español latinoamericano (`es/es-la.json`), generando audio WAV (`data:audio/x-wav;base64,...`)
 *     reproducido mediante el elemento estándar HTML5 `<audio>`.
 */

const PIPER_VOICE_ID = 'es_ES-carlfm-x_low';
const MESPEAK_CONFIG_URL =
  'https://cdn.jsdelivr.net/npm/mespeak@2.0.2/mespeak_config.json';
const MESPEAK_VOICE_URL =
  'https://cdn.jsdelivr.net/npm/mespeak@2.0.2/voices/es/es-la.json';

let activeVoiceButton = null;
let activeHighlightElement = null;
let currentAudio = null;
let currentAudioObjectUrl = null;
let activeSessionId = 0;
let isSessionActive = false;

let vitsModulePromise = null;
let meSpeakReady = false;
let meSpeakInitPromise = null;

/**
 * Carga perezosa de `@diffusionstudio/vits-web` (Piper TTS en WebAssembly)
 */
async function getVitsModule() {
  if (!vitsModulePromise) {
    vitsModulePromise = import(
      'https://cdn.jsdelivr.net/npm/@diffusionstudio/vits-web@1.0.3/+esm'
    ).catch(async () => {
      return import('https://esm.sh/@diffusionstudio/vits-web@1.0.3');
    });
  }
  return vitsModulePromise;
}

/**
 * Inicializa `meSpeak.js` (eSpeak open-source) con configuración y voz `es-la`
 */
function ensureMeSpeakReady() {
  if (meSpeakReady) return Promise.resolve(true);
  if (meSpeakInitPromise) return meSpeakInitPromise;

  meSpeakInitPromise = new Promise((resolve) => {
    const tryInit = (attemptsLeft) => {
      const ms = window.meSpeak;
      if (!ms) {
        if (attemptsLeft > 0) {
          setTimeout(() => tryInit(attemptsLeft - 1), 150);
        } else {
          resolve(false);
        }
        return;
      }

      try {
        if (!ms.isConfigLoaded()) {
          ms.loadConfig(MESPEAK_CONFIG_URL, () => {
            ms.loadVoice(MESPEAK_VOICE_URL, (success) => {
              meSpeakReady = Boolean(success);
              resolve(meSpeakReady);
            });
          });
        } else {
          ms.loadVoice(MESPEAK_VOICE_URL, (success) => {
            meSpeakReady = Boolean(success);
            resolve(meSpeakReady);
          });
        }
      } catch (err) {
        console.warn('Error inicializando meSpeak:', err);
        resolve(false);
      }
    };

    tryInit(20);
  });

  return meSpeakInitPromise;
}

export function initVoiceEngine() {
  // Precargar configuración ligera de meSpeak (~150 KB) en segundo plano
  ensureMeSpeakReady();
}

function setButtonLabel(button, message) {
  if (!button) return;
  if (button.id === 'btnGlobalVoice') {
    const labelEl = button.querySelector('.voice-label');
    if (labelEl) labelEl.textContent = message;
  } else {
    const span = button.querySelector('span');
    if (span) span.textContent = message;
  }
}

export function resetVoiceUI() {
  if (activeVoiceButton) {
    activeVoiceButton.classList.remove('speaking');
    activeVoiceButton.setAttribute('aria-pressed', 'false');

    if (activeVoiceButton.id === 'btnGlobalVoice') {
      const iconEl = activeVoiceButton.querySelector('.voice-icon');
      const labelEl = activeVoiceButton.querySelector('.voice-label');
      const wavesEl = document.getElementById('globalSoundWaves');
      if (iconEl) iconEl.textContent = '🔊';
      if (labelEl) labelEl.textContent = 'Escuchar en Voz Alta';
      if (wavesEl) wavesEl.classList.remove('is-active');
    } else if (activeVoiceButton.id === 'btnVoiceCalc') {
      setButtonLabel(activeVoiceButton, '🔊 Escuchar resultado y consejos');
    } else if (activeVoiceButton.id === 'btnVoiceBook') {
      setButtonLabel(activeVoiceButton, '🔊 Escuchar esta página');
    } else if (activeVoiceButton.classList.contains('btn-voice-exercise')) {
      setButtonLabel(activeVoiceButton, '🔊 Escuchar instrucciones');
    }

    activeVoiceButton = null;
  }

  if (activeHighlightElement) {
    activeHighlightElement.classList.remove('speaking-highlight');
    activeHighlightElement = null;
  }
}

function cleanupAudioElement() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.removeAttribute('src');
      currentAudio.load();
    } catch {
      // Ignorar errores al limpiar audio
    }
    currentAudio = null;
  }
  if (currentAudioObjectUrl) {
    URL.revokeObjectURL(currentAudioObjectUrl);
    currentAudioObjectUrl = null;
  }
}

export function stopSpeaking() {
  activeSessionId++;
  isSessionActive = false;
  cleanupAudioElement();
  if (window.meSpeak && typeof window.meSpeak.stop === 'function') {
    try {
      window.meSpeak.stop();
    } catch {
      // Ignorar
    }
  }
  resetVoiceUI();
}

/**
 * Divide un bloque de texto en frases manejables para iniciar la reproducción
 * de la primera frase sin esperar a que se sintetice todo el párrafo.
 */
function splitIntoSentences(text) {
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?¡¿:;])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Reproduce un URL de audio (Blob URL o Data URL) y resuelve al finalizar.
 */
function playAudioSource(src, sessionId, isObjectUrl = false) {
  return new Promise((resolve, reject) => {
    if (sessionId !== activeSessionId) {
      if (isObjectUrl) URL.revokeObjectURL(src);
      resolve(false);
      return;
    }

    cleanupAudioElement();
    if (isObjectUrl) {
      currentAudioObjectUrl = src;
    }

    const audio = new Audio(src);
    currentAudio = audio;

    audio.onended = () => {
      cleanupAudioElement();
      resolve(true);
    };

    audio.onerror = (err) => {
      cleanupAudioElement();
      reject(err);
    };

    audio.play().catch((err) => {
      cleanupAudioElement();
      reject(err);
    });
  });
}

/**
 * Sintetiza y reproduce usando Piper VITS Web (`@diffusionstudio/vits-web`)
 */
async function speakWithPiperVits(text, triggerButton, sessionId) {
  const tts = await getVitsModule();
  if (sessionId !== activeSessionId) return true;

  const sentences = splitIntoSentences(text);
  if (sentences.length === 0) return true;

  for (let i = 0; i < sentences.length; i++) {
    if (sessionId !== activeSessionId) return true;

    const sentence = sentences[i];
    if (i === 0) {
      setButtonLabel(
        triggerButton,
        triggerButton?.id === 'btnGlobalVoice'
          ? 'Preparando voz...'
          : '⏳ Preparando voz...'
      );
    }

    const wavBlob = await tts.predict(
      {
        text: sentence,
        voiceId: PIPER_VOICE_ID
      },
      (progress) => {
        if (sessionId !== activeSessionId) return;
        if (progress && progress.total > 0) {
          const pct = Math.min(
            99,
            Math.round((progress.loaded * 100) / progress.total)
          );
          setButtonLabel(
            triggerButton,
            triggerButton?.id === 'btnGlobalVoice'
              ? `Cargando voz (${pct}%)`
              : `⏳ Cargando voz (${pct}%)`
          );
        }
      }
    );

    if (sessionId !== activeSessionId) return true;

    setButtonLabel(
      triggerButton,
      triggerButton?.id === 'btnGlobalVoice'
        ? 'Detener Voz'
        : '⏹ Detener lectura'
    );

    const objectUrl = URL.createObjectURL(wavBlob);
    await playAudioSource(objectUrl, sessionId, true);
  }

  return true;
}

/**
 * Sintetiza y reproduce usando `meSpeak.js` (eSpeak Open-Source WAV en memoria)
 */
async function speakWithMeSpeak(text, triggerButton, sessionId) {
  const ready = await ensureMeSpeakReady();
  if (!ready || !window.meSpeak) {
    throw new Error('meSpeak no disponible');
  }
  if (sessionId !== activeSessionId) return true;

  setButtonLabel(
    triggerButton,
    triggerButton?.id === 'btnGlobalVoice' ? 'Detener Voz' : '⏹ Detener lectura'
  );

  const sentences = splitIntoSentences(text);
  for (const sentence of sentences) {
    if (sessionId !== activeSessionId) return true;

    const dataUrl = await new Promise((resolve, reject) => {
      window.meSpeak.speak(
        sentence,
        {
          rawdata: 'mime',
          amplitude: 100,
          pitch: 50,
          speed: 150
        },
        (success, _id, stream) => {
          if (success && stream) {
            resolve(stream);
          } else {
            reject(new Error('Fallo al sintetizar WAV con meSpeak'));
          }
        }
      );
    });

    if (sessionId !== activeSessionId) return true;
    await playAudioSource(dataUrl, sessionId, false);
  }

  return true;
}

export async function speakText(text, triggerButton, highlightElement = null) {
  // Si el mismo botón ya está activo, detener la narración
  if (activeVoiceButton === triggerButton && isSessionActive) {
    stopSpeaking();
    return;
  }

  stopSpeaking();

  const sessionId = ++activeSessionId;
  isSessionActive = true;
  activeVoiceButton = triggerButton;
  activeHighlightElement = highlightElement;

  if (triggerButton) {
    triggerButton.classList.add('speaking');
    triggerButton.setAttribute('aria-pressed', 'true');

    if (triggerButton.id === 'btnGlobalVoice') {
      const iconEl = triggerButton.querySelector('.voice-icon');
      const wavesEl = document.getElementById('globalSoundWaves');
      if (iconEl) iconEl.textContent = '⏹';
      if (wavesEl) wavesEl.classList.add('is-active');
    }
  }

  if (highlightElement) {
    highlightElement.classList.add('speaking-highlight');
  }

  try {
    // 1. Intentar síntesis neuronal open-source con Piper VITS Web (WASM)
    await speakWithPiperVits(text, triggerButton, sessionId);
  } catch (piperErr) {
    console.warn(
      'Piper VITS Web no disponible, usando motor open-source meSpeak (eSpeak WASM/JS):',
      piperErr
    );
    try {
      // 2. Respaldo inmediato open-source con meSpeak.js (eSpeak WAV sobre HTML5 <audio>)
      await speakWithMeSpeak(text, triggerButton, sessionId);
    } catch (meSpeakErr) {
      console.error('Error en motores TTS open-source:', meSpeakErr);
    }
  } finally {
    if (sessionId === activeSessionId) {
      isSessionActive = false;
      resetVoiceUI();
    }
  }
}

export function isVoiceButtonActive(button) {
  return Boolean(isSessionActive && activeVoiceButton === button);
}
