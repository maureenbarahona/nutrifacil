/**
 * Módulo 1: Calculadora de IMC Interactiva (Clasificación OMS)
 */

import { speakText } from './voice.js';

let currentState = {
  peso: 68,
  talla: 162,
  imcFormateado: '25.9',
  statusText: 'Sobrepeso Leve',
  descText:
    'Tienes un poco de peso de más. Con pequeños cambios cotidianos cuidarás tu corazón.',
  consejos: []
};

export function getCalculatorNarrationSummary() {
  return `Bienvenido a NutriFácil. Estás en la calculadora de peso y estatura. Tu peso actual registrado es ${currentState.peso} kilos y tu estatura es ${currentState.talla} centímetros. Tu resultado de salud es ${currentState.imcFormateado}, con estado: ${currentState.statusText}. ${currentState.descText}. Puedes cambiar los valores con los botones más y menos de la pantalla.`;
}

export function initCalculator() {
  const pesoInput = document.getElementById('pesoInput');
  const pesoRange = document.getElementById('pesoRange');
  const btnPesoPlus = document.getElementById('btnPesoPlus');
  const btnPesoMinus = document.getElementById('btnPesoMinus');

  const tallaInput = document.getElementById('tallaInput');
  const tallaRange = document.getElementById('tallaRange');
  const btnTallaPlus = document.getElementById('btnTallaPlus');
  const btnTallaMinus = document.getElementById('btnTallaMinus');

  const resultImcNumber = document.getElementById('resultImcNumber');
  const trafficPointer = document.getElementById('trafficPointer');
  const statusCard = document.getElementById('statusCard');
  const statusEmoji = document.getElementById('statusEmoji');
  const statusTitle = document.getElementById('statusTitle');
  const statusDesc = document.getElementById('statusDesc');
  const adviceList = document.getElementById('adviceList');
  const btnRecalcular = document.getElementById('btnRecalcular');
  const btnResetear = document.getElementById('btnResetearValores');
  const btnVoiceCalc = document.getElementById('btnVoiceCalc');
  const imcResultSection = document.getElementById('imcResultSection');

  function renderConsejos(consejos) {
    adviceList.innerHTML = '';
    consejos.forEach((c) => {
      const li = document.createElement('li');
      li.className = 'advice-item';

      const iconSpan = document.createElement('span');
      iconSpan.className = 'advice-icon-bullet';
      iconSpan.setAttribute('aria-hidden', 'true');
      iconSpan.textContent = c.icon;

      const textSpan = document.createElement('span');
      textSpan.textContent = c.text;

      li.append(iconSpan, textSpan);
      adviceList.appendChild(li);
    });
  }

  function calcularIMC() {
    const peso = parseFloat(pesoInput.value);
    const tallaCm = parseFloat(tallaInput.value);
    const tallaM = tallaCm / 100;
    if (!peso || !tallaM || tallaM <= 0) return;

    const imc = peso / (tallaM * tallaM);
    const imcFormateado = imc.toFixed(1);
    resultImcNumber.textContent = imcFormateado;

    statusCard.className = 'result-status-card';

    let pct = ((imc - 15) / (35 - 15)) * 100;
    pct = Math.max(5, Math.min(95, pct));
    trafficPointer.style.left = `${pct}%`;

    let statusText = '';
    let descText = '';
    let consejos = [];

    if (imc < 18.5) {
      statusCard.classList.add('status-bajo');
      statusEmoji.textContent = '💧';
      statusText = 'Bajo Peso';
      descText =
        'Tu cuerpo necesita más energía y nutrientes para estar fuerte y con energía.';
      consejos = [
        {
          icon: '🥣',
          text: 'Come tres comidas completas al día incluyendo frijoles, lentejas, huevo o maíz.'
        },
        {
          icon: '🥑',
          text: 'Come semillas como cacahuates, pepitas de calabaza y aguacate para ganar fuerza.'
        },
        {
          icon: '🥛',
          text: 'Toma atoles naturales o leche si está a tu alcance para nutrir tus huesos.'
        }
      ];
    } else if (imc >= 18.5 && imc < 25.0) {
      statusCard.classList.add('status-normal');
      statusEmoji.textContent = '🌟';
      statusText = '¡Peso Saludable y Normal!';
      descText =
        '¡Felicidades! Tu peso está en el rango ideal para proteger tu corazón y vivir con salud.';
      consejos = [
        {
          icon: '🥬',
          text: 'Sigue comiendo verduras frescas, hojas verdes y frutas de temporada.'
        },
        {
          icon: '💧',
          text: 'Continúa bebiendo agua limpia y natural todos los días.'
        },
        {
          icon: '🚶',
          text: 'Mantente activo caminando, cuidando el huerto o haciendo tus tareas diarias.'
        }
      ];
    } else if (imc >= 25.0 && imc < 30.0) {
      statusCard.classList.add('status-sobre');
      statusEmoji.textContent = '⚠️';
      statusText = 'Sobrepeso Leve';
      descText =
        'Tienes un poco de peso de más. Con pequeños cambios cotidianos cuidarás tu corazón.';
      consejos = [
        {
          icon: '🥤',
          text: 'Disminuye refrescos embotellados y panes dulces; cámbialos por agua y fruta fresca.'
        },
        {
          icon: '🍲',
          text: 'Sirve más frijoles y verduras en tu plato y menos comidas fritas en mucha manteca o aceite.'
        },
        {
          icon: '🚶‍♂️',
          text: 'Camina 20 a 30 minutos todos los días después de comer o por la tarde.'
        }
      ];
    } else {
      statusCard.classList.add('status-obe');
      statusEmoji.textContent = '🚨';
      statusText = 'Atención: Nivel de Obesidad';
      descText =
        'El exceso de peso puede cansar tu corazón y subir el azúcar en la sangre. Es momento de cuidarse.';
      consejos = [
        {
          icon: '🏥',
          text: 'Acude a tu centro de salud para que un médico o enfermera revise tu presión y azúcar.'
        },
        {
          icon: '🚫',
          text: 'Evita por completo bebidas con exceso de azúcar, frituras y comida empaquetada.'
        },
        {
          icon: '🪑',
          text: 'Haz los ejercicios sencillos de la Pestaña 3 para moverte sin lastimar tus rodillas.'
        }
      ];
    }

    currentState = {
      peso,
      talla: tallaCm,
      imcFormateado,
      statusText,
      descText,
      consejos
    };

    statusTitle.textContent = statusText;
    statusDesc.textContent = descText;
    renderConsejos(consejos);
  }

  function syncPeso(val) {
    const clean = Math.min(Math.max(parseInt(val, 10) || 35, 30), 250);
    pesoInput.value = String(clean);
    pesoRange.value = String(Math.min(Math.max(clean, 35), 150));
    calcularIMC();
  }

  function syncTalla(val) {
    const clean = Math.min(Math.max(parseInt(val, 10) || 120, 100), 220);
    tallaInput.value = String(clean);
    tallaRange.value = String(Math.min(Math.max(clean, 120), 200));
    calcularIMC();
  }

  pesoInput.addEventListener('change', (e) => syncPeso(e.target.value));
  pesoInput.addEventListener('input', () => calcularIMC());
  pesoRange.addEventListener('input', (e) => syncPeso(e.target.value));
  btnPesoPlus.addEventListener('click', () =>
    syncPeso((parseInt(pesoInput.value, 10) || 68) + 1)
  );
  btnPesoMinus.addEventListener('click', () =>
    syncPeso((parseInt(pesoInput.value, 10) || 68) - 1)
  );

  tallaInput.addEventListener('change', (e) => syncTalla(e.target.value));
  tallaInput.addEventListener('input', () => calcularIMC());
  tallaRange.addEventListener('input', (e) => syncTalla(e.target.value));
  btnTallaPlus.addEventListener('click', () =>
    syncTalla((parseInt(tallaInput.value, 10) || 162) + 1)
  );
  btnTallaMinus.addEventListener('click', () =>
    syncTalla((parseInt(tallaInput.value, 10) || 162) - 1)
  );

  btnResetear.addEventListener('click', () => {
    syncPeso(68);
    syncTalla(162);
  });

  btnRecalcular.addEventListener('click', () => calcularIMC());

  btnVoiceCalc.addEventListener('click', () => {
    const consejosTexto = currentState.consejos
      .map((c, i) => `Consejo ${i + 1}: ${c.text}`)
      .join('. ');
    const textoCompleto = `Resultado de tu peso y estatura. Con un peso de ${currentState.peso} kilos y una estatura de ${currentState.talla} centímetros, tu número de salud es ${currentState.imcFormateado}. Tu clasificación es: ${currentState.statusText}. ${currentState.descText}. Consejos prácticos para tu hogar: ${consejosTexto}`;
    speakText(textoCompleto, btnVoiceCalc, imcResultSection);
  });

  calcularIMC();
}
