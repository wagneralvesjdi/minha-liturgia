'use strict';

/* ---------- Santa Sé ---------- */
/* Atalhos organizados para o site oficial do Vaticano (vatican.va):
   encíclicas, exortações apostólicas, cartas, homilias, discursos,
   mensagens e outros documentos, por pontificado, mais os documentos
   estruturais da Igreja (Concílio Vaticano II, Código de Direito
   Canônico, Cúria Romana). São só links — o conteúdo em si é lido no
   site do Vaticano, fora do app. */

const SANTASE_CATEGORIAS = [
  {
    titulo: 'Papa Leão XIV (atual)',
    nota: 'Pontificado ainda recente — o site do Vaticano organiza os documentos de cada papa aos poucos; comece pela página inicial para chegar ao que já estiver publicado.',
    entradas: [
      { titulo: 'Vatican.va — página inicial', url: 'https://www.vatican.va/content/vatican/pt.html' },
    ],
  },
  {
    titulo: 'Papa Francisco',
    entradas: [
      { titulo: 'Encíclicas', url: 'https://www.vatican.va/content/francesco/pt/encyclicals.index.html' },
      { titulo: 'Exortações Apostólicas', url: 'https://www.vatican.va/content/francesco/pt/apost_exhortations.index.html' },
      { titulo: 'Cartas Apostólicas', url: 'https://www.vatican.va/content/francesco/pt/apost_letters.index.html' },
      { titulo: 'Motu Proprio', url: 'https://www.vatican.va/content/francesco/pt/motu_proprio.index.html' },
      { titulo: 'Bulas', url: 'https://www.vatican.va/content/francesco/pt/bulls.index.html' },
      { titulo: 'Homilias', url: 'https://www.vatican.va/content/francesco/pt/homilies.index.html' },
      { titulo: 'Discursos', url: 'https://www.vatican.va/content/francesco/pt/speeches.index.html' },
      { titulo: 'Mensagens', url: 'https://www.vatican.va/content/francesco/pt/messages.index.html' },
      { titulo: 'Audiências Gerais', url: 'https://www.vatican.va/content/francesco/pt/audiences.index.html' },
      { titulo: 'Angelus e Regina Coeli', url: 'https://www.vatican.va/content/francesco/pt/angelus.index.html' },
      { titulo: 'Viagens Apostólicas', url: 'https://www.vatican.va/content/francesco/pt/travels.index.html' },
      { titulo: 'Cartas', url: 'https://www.vatican.va/content/francesco/pt/letters.index.html' },
    ],
  },
  {
    titulo: 'Papa Bento XVI',
    entradas: [
      { titulo: 'Encíclicas', url: 'https://www.vatican.va/content/benedict-xvi/pt/encyclicals.index.html' },
      { titulo: 'Exortações Apostólicas', url: 'https://www.vatican.va/content/benedict-xvi/pt/apost_exhortations.index.html' },
      { titulo: 'Cartas Apostólicas', url: 'https://www.vatican.va/content/benedict-xvi/pt/apost_letters.index.html' },
      { titulo: 'Motu Proprio', url: 'https://www.vatican.va/content/benedict-xvi/pt/motu_proprio.index.html' },
      { titulo: 'Homilias', url: 'https://www.vatican.va/content/benedict-xvi/pt/homilies.index.html' },
      { titulo: 'Discursos', url: 'https://www.vatican.va/content/benedict-xvi/pt/speeches.index.html' },
      { titulo: 'Audiências Gerais', url: 'https://www.vatican.va/content/benedict-xvi/pt/audiences.index.html' },
      { titulo: 'Viagens Apostólicas', url: 'https://www.vatican.va/content/benedict-xvi/pt/travels.index.html' },
    ],
  },
  {
    titulo: 'São João Paulo II',
    entradas: [
      { titulo: 'Encíclicas', url: 'https://www.vatican.va/content/john-paul-ii/pt/encyclicals.index.html' },
      { titulo: 'Exortações Apostólicas', url: 'https://www.vatican.va/content/john-paul-ii/pt/apost_exhortations.index.html' },
      { titulo: 'Cartas Apostólicas', url: 'https://www.vatican.va/content/john-paul-ii/pt/apost_letters.index.html' },
      { titulo: 'Homilias', url: 'https://www.vatican.va/content/john-paul-ii/pt/homilies.index.html' },
      { titulo: 'Discursos', url: 'https://www.vatican.va/content/john-paul-ii/pt/speeches.index.html' },
    ],
  },
  {
    titulo: 'Documentos e estruturas da Igreja',
    entradas: [
      { titulo: 'Concílio Vaticano II — todos os documentos', url: 'https://www.vatican.va/archive/hist_councils/ii_vatican_council/index.htm' },
      { titulo: 'Código de Direito Canônico', url: 'https://www.vatican.va/archive/cod-iuris-canonici/cic_index_po.html' },
      { titulo: 'Cúria Romana — Dicastérios e organismos', url: 'https://www.vatican.va/roman_curia/index.htm' },
      { titulo: 'Vatican.va — busca geral no site', url: 'https://www.vatican.va/content/vatican/pt.html' },
    ],
  },
];

const ssel = (id) => document.getElementById(id);

function santaseStepShow(step) {
  ['categorias', 'entradas'].forEach((s) => {
    const el = ssel(`santase-step-${s}`);
    if (el) el.classList.toggle('hidden', s !== step);
  });
}

function renderSantaseCategorias() {
  const list = ssel('santaseCategoriaList');
  list.innerHTML = '';
  SANTASE_CATEGORIAS.forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.className = 'book-btn';
    btn.innerHTML = `<span>${cat.titulo}</span><small>${cat.entradas.length} atalho${cat.entradas.length === 1 ? '' : 's'}</small>`;
    btn.addEventListener('click', () => openSantaseCategoria(idx));
    list.appendChild(btn);
  });
}

function openSantaseCategoria(idx) {
  const cat = SANTASE_CATEGORIAS[idx];
  if (!cat) return;

  ssel('santaseCategoriaTitle').textContent = cat.titulo;
  ssel('santaseCategoriaNota').textContent = cat.nota || '';
  ssel('santaseCategoriaNota').classList.toggle('hidden', !cat.nota);

  const list = ssel('santaseEntradaList');
  list.innerHTML = '';
  cat.entradas.forEach((entrada) => {
    const link = document.createElement('a');
    link.className = 'book-btn';
    link.href = entrada.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.innerHTML = `<span>${entrada.titulo}</span><small>vatican.va ↗</small>`;
    list.appendChild(link);
  });

  santaseStepShow('entradas');
}

function initSantaSe() {
  renderSantaseCategorias();
  document.querySelectorAll('[data-back-to="santase-categorias"]').forEach((b) => b.addEventListener('click', () => santaseStepShow('categorias')));
}

window.MinhaLiturgiaSantaSe = { initSantaSe };
