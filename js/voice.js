/**
 * Módulo de Narración por Voz (Web Speech API)
 * Proporciona síntesis de voz accesible en español con resaltado visual.
 */

const hasSpeechSynthesis =
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  'SpeechSynthesisUtterance' in window;

let activeVoiceButton = null;
let activeHighlightElement = null;
let spanishVoices = [];

function loadVoices() {
  if (!hasSpeechSynthesis) return;
  const voices = window.speechSynthesis.getVoices();
  spanishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('es'));
}

export function initVoiceEngine() {
  if (!hasSpeechSynthesis) return;
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
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
      const span = activeVoiceButton.querySelector('span');
      if (span) span.textContent = '🔊 Escuchar resultado y consejos';
    } else if (activeVoiceButton.id === 'btnVoiceBook') {
      const span = activeVoiceButton.querySelector('span');
      if (span) span.textContent = '🔊 Escuchar esta página';
    } else if (activeVoiceButton.classList.contains('btn-voice-exercise')) {
      const span = activeVoiceButton.querySelector('span');
      if (span) span.textContent = '🔊 Escuchar instrucciones';
    }

    activeVoiceButton = null;
  }

  if (activeHighlightElement) {
    activeHighlightElement.classList.remove('speaking-highlight');
    activeHighlightElement = null;
  }
}

export function stopSpeaking() {
  if (!hasSpeechSynthesis) return;
  window.speechSynthesis.cancel();
  resetVoiceUI();
}

export function speakText(text, triggerButton, highlightElement = null) {
  if (!hasSpeechSynthesis) {
    window.alert(
      'Tu navegador no tiene activada la lectura de voz. Puedes leer los textos directamente en pantalla.'
    );
    return;
  }

  if (activeVoiceButton === triggerButton && window.speechSynthesis.speaking) {
    stopSpeaking();
    return;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-MX';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  if (spanishVoices.length > 0) {
    const preferredVoice =
      spanishVoices.find(
        (v) => v.lang.includes('MX') || v.lang.includes('419') || v.lang.includes('ES')
      ) || spanishVoices[0];
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  }

  activeVoiceButton = triggerButton;
  activeHighlightElement = highlightElement;

  if (triggerButton) {
    triggerButton.classList.add('speaking');
    triggerButton.setAttribute('aria-pressed', 'true');

    if (triggerButton.id === 'btnGlobalVoice') {
      const iconEl = triggerButton.querySelector('.voice-icon');
      const labelEl = triggerButton.querySelector('.voice-label');
      const wavesEl = document.getElementById('globalSoundWaves');
      if (iconEl) iconEl.textContent = '⏹';
      if (labelEl) labelEl.textContent = 'Detener Voz';
      if (wavesEl) wavesEl.classList.add('is-active');
    } else {
      const span = triggerButton.querySelector('span');
      if (span) span.textContent = '⏹ Detener lectura';
    }
  }

  if (highlightElement) {
    highlightElement.classList.add('speaking-highlight');
  }

  utterance.onend = () => {
    resetVoiceUI();
  };

  utterance.onerror = () => {
    resetVoiceUI();
  };

  window.speechSynthesis.speak(utterance);
}

export function isVoiceButtonActive(button) {
  return Boolean(
    hasSpeechSynthesis &&
      activeVoiceButton === button &&
      window.speechSynthesis.speaking
  );
}
