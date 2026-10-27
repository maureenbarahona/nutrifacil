/**
 * Módulo 2: Libro Interactivo de Antropometría
 */

import { speakText, stopSpeaking } from './voice.js';

const bookPages = [
  {
    illustration: '📏',
    title: '¿Qué es Medir el Cuerpo?',
    lead: 'La palabra de doctores es "Antropometría", pero en nuestro hogar solo significa: aprender a medir nuestro cuerpo.',
    leadHtml:
      'La palabra de doctores es <strong>"Antropometría"</strong>, pero en nuestro hogar solo significa: <strong>aprender a medir nuestro cuerpo</strong>.',
    points: [
      {
        icon: '⚖️',
        text: 'Nos pesamos en una báscula para conocer nuestro peso actual.'
      },
      {
        icon: '📐',
        text: 'Medimos nuestra estatura y la cintura con una cinta métrica sencilla.'
      },
      {
        icon: '🩺',
        text: 'Es tan simple como saber cuánto mide un costal de maíz o un terreno: ¡nos dice cómo estamos por fuera y por dentro!'
      }
    ]
  },
  {
    illustration: '❤️',
    title: '¿Para Qué Nos Sirve Medirnos?',
    lead: 'Sirve para cuidar la vida antes de que nos dé una enfermedad y tener fuerza para trabajar y ver crecer a nuestra familia.',
    leadHtml:
      'Sirve para <strong>cuidar la vida antes de que nos dé una enfermedad</strong> y tener fuerza para trabajar y ver crecer a nuestra familia.',
    points: [
      {
        icon: '🫀',
        text: 'Previene infartos del corazón y dolores fuertes de pecho.'
      },
      {
        icon: '🩸',
        text: 'Ayuda a evitar la "azúcar alta" en la sangre (diabetes), que quita la vista y cansa el cuerpo.'
      },
      {
        icon: '💪',
        text: 'Nos da más energía para el trabajo en el campo, el taller o la casa sin agotarnos tan rápido.'
      }
    ]
  },
  {
    illustration: '🌱',
    title: '¿Cómo Nos Ayuda en el Día a Día?',
    lead: 'Nos enseña a tomar buenas decisiones fáciles y sin gastar dinero extra en nuestro hogar.',
    leadHtml:
      'Nos enseña a tomar <strong>buenas decisiones fáciles y sin gastar dinero extra</strong> en nuestro hogar.',
    points: [
      {
        icon: '🥕',
        text: 'Aprovechar lo que da la tierra: quelites, nopales, frijoles y calabazas ricas.'
      },
      {
        icon: '💧',
        text: 'Aprender que el agua simple es el mejor regalo para calmar la sed del trabajo.'
      },
      {
        icon: '👨‍👩‍👧',
        text: 'Enseñar a nuestros hijos y nietos a crecer sanos y fuertes para el futuro.'
      }
    ]
  }
];

let currentBookPage = 0;

export function getBookNarrationSummary() {
  const page = bookPages[currentBookPage];
  const puntos = page.points.map((p) => p.text).join('. ');
  return `Estás en el libro interactivo ¿Qué es medir el cuerpo? Página ${
    currentBookPage + 1
  } de ${bookPages.length}. ${page.title}. ${page.lead} ${puntos}`;
}

export function initBook() {
  const pageIllustration = document.getElementById('pageIllustration');
  const pageTitle = document.getElementById('pageTitle');
  const pageLead = document.getElementById('pageLead');
  const pagePoints = document.getElementById('pagePoints');
  const pageCounterText = document.getElementById('pageCounterText');
  const btnBookPrev = document.getElementById('btnBookPrev');
  const btnBookNext = document.getElementById('btnBookNext');
  const btnVoiceBook = document.getElementById('btnVoiceBook');
  const bookPageCard = document.getElementById('bookPageCard');
  const dots = [
    document.getElementById('dot-1'),
    document.getElementById('dot-2'),
    document.getElementById('dot-3')
  ];

  function updateBookUI() {
    stopSpeaking();
    const page = bookPages[currentBookPage];
    pageIllustration.textContent = page.illustration;
    pageTitle.textContent = page.title;
    pageLead.innerHTML = page.leadHtml;

    pagePoints.innerHTML = '';
    page.points.forEach((pt) => {
      const li = document.createElement('li');
      li.className = 'point-card-mini';

      const iconSpan = document.createElement('span');
      iconSpan.setAttribute('aria-hidden', 'true');
      iconSpan.textContent = pt.icon;

      const textSpan = document.createElement('span');
      textSpan.textContent = pt.text;

      li.append(iconSpan, textSpan);
      pagePoints.appendChild(li);
    });

    pageCounterText.textContent = `Página ${currentBookPage + 1} de ${
      bookPages.length
    }`;

    dots.forEach((dot, idx) => {
      const isCurrent = idx === currentBookPage;
      dot.classList.toggle('active', isCurrent);
      dot.setAttribute('aria-current', isCurrent ? 'step' : 'false');
    });

    btnBookPrev.disabled = currentBookPage === 0;
    if (currentBookPage === bookPages.length - 1) {
      btnBookNext.innerHTML =
        '<span>Volver al Inicio</span><span aria-hidden="true">🔄</span>';
    } else {
      btnBookNext.innerHTML =
        '<span>Siguiente Página</span><span aria-hidden="true">➡️</span>';
    }
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentBookPage = idx;
      updateBookUI();
    });
  });

  btnBookNext.addEventListener('click', () => {
    if (currentBookPage < bookPages.length - 1) {
      currentBookPage++;
    } else {
      currentBookPage = 0;
    }
    updateBookUI();
  });

  btnBookPrev.addEventListener('click', () => {
    if (currentBookPage > 0) {
      currentBookPage--;
      updateBookUI();
    }
  });

  btnVoiceBook.addEventListener('click', () => {
    const page = bookPages[currentBookPage];
    const puntos = page.points.map((p) => p.text).join('. ');
    const texto = `Página ${currentBookPage + 1}. ${page.title}. ${
      page.lead
    } Recuerda: ${puntos}`;
    speakText(texto, btnVoiceBook, bookPageCard);
  });

  updateBookUI();
}
