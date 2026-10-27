/**
 * Módulo 3: Actividad Física para Sedentarios y Temporizador Accesible
 */

import { speakText } from './voice.js';

const exerciseVoiceData = {
  1: {
    title: 'Paso 1: Caminata suave en tu lugar',
    duration: '5 a 10 minutos',
    instructions:
      'Marcha suave levantando los pies del suelo como si fueras por un sendero tranquilo.',
    benefit:
      'Despierta el corazón y oxigena tus pulmones sin lastimar tus rodillas.'
  },
  2: {
    title: 'Paso 2: Estirar brazos y espalda',
    duration: '2 a 3 minutos',
    instructions:
      'Entrelaza tus dedos, llévalos hacia arriba al cielo y respira hondo y despacio.',
    benefit:
      'Alivia el dolor del cuello y la espalda tras cargar peso o estar sentado.'
  },
  3: {
    title: 'Paso 3: Sentarse y pararse de una silla',
    duration: '10 repeticiones',
    instructions:
      'Siéntate en una silla firme y ponte de pie despacio sin usar las manos si puedes.',
    benefit:
      'Fortalece las piernas y rodillas para que puedas caminar y agacharte sin dolor.'
  },
  4: {
    title: 'Paso 4: Círculos con tobillos y pies',
    duration: '2 a 3 minutos',
    instructions:
      'Sentado en la silla, levanta un pie y haz círculos suaves en el aire hacia los dos lados.',
    benefit:
      'Evita que se hinchen las piernas y hace que la sangre circule libremente.'
  }
};

export function getExercisesNarrationSummary() {
  const completedCount = document.querySelectorAll('.exercise-card.completed')
    .length;
  return `Estás en la sección de ejercicios sencillos para moverte sin salir de casa. Llevas ${completedCount} de 4 ejercicios completados hoy. Tu reto saludable tiene cuatro pasos: Paso 1, caminata suave en tu lugar. Paso 2, estirar brazos y espalda. Paso 3, sentarse y pararse de una silla. Y Paso 4, círculos con tobillos y pies. Puedes pulsar el botón de escuchar instrucciones en cualquiera de ellos.`;
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function initExercises() {
  // 1. Narración individual por tarjeta de ejercicio
  const voiceExerciseButtons = document.querySelectorAll('.btn-voice-exercise');
  voiceExerciseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const exId = btn.getAttribute('data-exercise');
      const data = exerciseVoiceData[exId];
      const card = document.getElementById(`card-ex-${exId}`);
      if (data) {
        const texto = `${data.title}. Duración recomendada: ${data.duration}. Cómo hacerlo: ${data.instructions}. ¿Para qué ayuda? ${data.benefit}`;
        speakText(texto, btn, card);
      }
    });
  });

  // 2. Marcar ejercicios completados
  const toggleButtons = document.querySelectorAll('.btn-toggle-exercise');
  const completedCounterText = document.getElementById('completedCounterText');

  function updateCompletedCounter() {
    const completedCards = document.querySelectorAll('.exercise-card.completed')
      .length;
    if (completedCards === 4) {
      completedCounterText.textContent = '¡Ronda Completa! 🥳🎉';
    } else {
      completedCounterText.textContent = `${completedCards} de 4 listos`;
    }
  }

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cardId = btn.getAttribute('data-target');
      const card = document.getElementById(cardId);
      const isDone = card.classList.toggle('completed');
      btn.setAttribute('aria-pressed', isDone ? 'true' : 'false');

      const span = btn.querySelector('span');
      if (span) {
        span.textContent = isDone
          ? '✅ ¡Completado!'
          : '⬜ Marcar como Hecho';
      }
      updateCompletedCounter();
    });
  });

  // 3. Temporizador Simple con <dialog closedby="any">
  const timerDialog = document.getElementById('timerOverlay');
  const timerDisplay = document.getElementById('timerDisplay');
  const btnTimerStart = document.getElementById('btnTimerStart');
  const btnTimerClose = document.getElementById('btnTimerClose');
  const timerButtons = document.querySelectorAll('.btn-timer-trigger');

  let timerInterval = null;
  let initialSeconds = 300;
  let remainingSeconds = 300;
  let isTimerRunning = false;

  function stopTimerInterval() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    isTimerRunning = false;
  }

  timerButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const timeSec = parseInt(btn.getAttribute('data-time'), 10) || 120;
      initialSeconds = timeSec;
      remainingSeconds = timeSec;
      stopTimerInterval();
      timerDisplay.textContent = formatTime(remainingSeconds);
      btnTimerStart.textContent = '▶️ Comenzar';
      if (typeof timerDialog.showModal === 'function') {
        timerDialog.showModal();
      } else {
        timerDialog.setAttribute('open', '');
      }
    });
  });

  btnTimerStart.addEventListener('click', () => {
    if (!isTimerRunning) {
      if (remainingSeconds <= 0) {
        remainingSeconds = initialSeconds;
        timerDisplay.textContent = formatTime(remainingSeconds);
      }
      isTimerRunning = true;
      btnTimerStart.textContent = '⏸️ Pausar';
      timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds--;
          timerDisplay.textContent = formatTime(remainingSeconds);
        } else {
          stopTimerInterval();
          timerDisplay.textContent = '¡Tiempo! 🔔';
          btnTimerStart.textContent = '🔄 Reiniciar';
        }
      }, 1000);
    } else {
      stopTimerInterval();
      btnTimerStart.textContent = '▶️ Continuar';
    }
  });

  btnTimerClose.addEventListener('click', () => {
    if (typeof timerDialog.close === 'function') {
      timerDialog.close();
    } else {
      timerDialog.removeAttribute('open');
      stopTimerInterval();
    }
  });

  timerDialog.addEventListener('close', () => {
    stopTimerInterval();
  });

  // Fallback para navegadores sin soporte nativo de `closedby` en <dialog>
  if (
    typeof HTMLDialogElement !== 'undefined' &&
    !('closedBy' in HTMLDialogElement.prototype)
  ) {
    timerDialog.addEventListener('click', (event) => {
      if (event.target !== timerDialog) return;

      const rect = timerDialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (isDialogContent) return;

      timerDialog.close();
    });
  }
}
