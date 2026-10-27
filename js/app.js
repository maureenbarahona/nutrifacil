/**
 * NutriFácil Salud Rural — Punto de Entrada Principal (ES6+ Modular)
 */

import {
  initVoiceEngine,
  isVoiceButtonActive,
  speakText,
  stopSpeaking
} from './voice.js';
import {
  getCalculatorNarrationSummary,
  initCalculator
} from './calculator.js';
import { getBookNarrationSummary, initBook } from './book.js';
import {
  getExercisesNarrationSummary,
  initExercises
} from './exercises.js';

function initTabs() {
  const tabs = [
    {
      btn: document.getElementById('tab-calc'),
      pane: document.getElementById('pane-calc'),
      title: 'Calculadora de Peso (IMC) | NutriFácil'
    },
    {
      btn: document.getElementById('tab-book'),
      pane: document.getElementById('pane-book'),
      title: '¿Qué es Medir el Cuerpo? | NutriFácil'
    },
    {
      btn: document.getElementById('tab-exercise'),
      pane: document.getElementById('pane-exercise'),
      title: 'Ejercicios Sencillos | NutriFácil'
    }
  ];

  function activateTab(index, moveFocus = false) {
    stopSpeaking();
    tabs.forEach((t, idx) => {
      const isSelected = idx === index;
      t.btn.classList.toggle('active', isSelected);
      t.btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      t.btn.setAttribute('tabindex', isSelected ? '0' : '-1');
      t.pane.classList.toggle('active-pane', isSelected);
      t.pane.hidden = !isSelected;
    });

    document.title = tabs[index].title;
    if (moveFocus) {
      tabs[index].btn.focus();
    }
  }

  tabs.forEach(({ btn }, index) => {
    btn.addEventListener('click', () => activateTab(index, false));

    btn.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = tabs.length - 1;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        activateTab(targetIndex, true);
      }
    });
  });
}

function initTextSizeToggle() {
  const btnToggleTextSize = document.getElementById('toggleTextSize');
  let isLarge = false;

  btnToggleTextSize.addEventListener('click', () => {
    isLarge = !isLarge;
    document.body.classList.toggle('large-text-mode', isLarge);
    btnToggleTextSize.setAttribute('aria-pressed', isLarge ? 'true' : 'false');
    const labelSpan = btnToggleTextSize.querySelector('.text-size-label');
    if (labelSpan) {
      labelSpan.textContent = isLarge ? 'Texto Normal' : 'Letra Más Grande';
    }
  });
}

function initGlobalVoiceButton() {
  const btnGlobalVoice = document.getElementById('btnGlobalVoice');

  btnGlobalVoice.addEventListener('click', () => {
    if (isVoiceButtonActive(btnGlobalVoice)) {
      stopSpeaking();
      return;
    }

    const activePane = document.querySelector('.module-pane.active-pane');
    if (!activePane) return;

    let narracionTexto = '';
    if (activePane.id === 'pane-calc') {
      narracionTexto = getCalculatorNarrationSummary();
    } else if (activePane.id === 'pane-book') {
      narracionTexto = getBookNarrationSummary();
    } else if (activePane.id === 'pane-exercise') {
      narracionTexto = getExercisesNarrationSummary();
    }

    speakText(narracionTexto, btnGlobalVoice, activePane);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initVoiceEngine();
  initTabs();
  initTextSizeToggle();
  initCalculator();
  initBook();
  initExercises();
  initGlobalVoiceButton();
});
