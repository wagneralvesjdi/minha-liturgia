'use strict';

/* ---------- Utilidades de data ---------- */

function pad2(n) { return String(n).padStart(2, '0'); }

function toISODate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function fromISODate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

const DIAS_SEMANA = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function formatDateBR(date) {
  return `${DIAS_SEMANA[date.getDay()]}, ${date.getDate()} de ${MESES[date.getMonth()]} de ${date.getFullYear()}`;
}

/* ---------- Cálculo litúrgico local (ano A/B/C, tempo litúrgico) ---------- */

// Domingo de Páscoa (algoritmo de Meeus/Jones/Butcher)
function computeEaster(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day, 12, 0, 0);
}

// Primeiro domingo do Advento: domingo entre 27/nov e 3/dez
function adventStart(year) {
  for (let day = 27; day <= 33; day++) {
    const d = day > 30 ? day - 30 : day;
    const month = day > 30 ? 11 : 10; // dezembro = 11, novembro = 10 (0-index)
    const dt = new Date(year, month, d, 12, 0, 0);
    if (dt.getDay() === 0) return dt;
  }
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function computeLiturgicalInfo(date) {
  const year = date.getFullYear();
  const advThis = adventStart(year);

  // Ano litúrgico "N": conjunto de domingos nomeado pelo ano em que termina (Cristo Rei)
  const N = date >= advThis ? year + 1 : year;
  const mod = ((N % 3) + 3) % 3;
  const cycleLetter = mod === 1 ? 'A' : mod === 2 ? 'B' : 'C';

  // Ciclo ferial (semana) I = anos ímpares, II = anos pares
  const weekdayCycle = year % 2 === 0 ? 'II' : 'I';

  // Tempo litúrgico aproximado
  const easter = computeEaster(year);
  const ashWednesday = addDays(easter, -46);
  const pentecost = addDays(easter, 49);
  const christmas = new Date(year, 11, 25, 12, 0, 0);
  const epiphanyJan6 = new Date(year, 0, 6, 12, 0, 0);
  const baptismLordSunday = addDays(epiphanyJan6, (7 - epiphanyJan6.getDay()) % 7);

  let season;
  if (date.getMonth() === 11 && date >= christmas) season = 'Natal';
  else if (date.getMonth() === 0 && date <= baptismLordSunday) season = 'Natal';
  else if (date >= advThis && date < christmas) season = 'Advento';
  else if (date >= ashWednesday && date < easter) season = 'Quaresma';
  else if (date >= easter && date <= pentecost) season = 'Páscoa';
  else season = 'Tempo Comum';

  return {
    cycleLetter,
    weekdayCycle,
    season,
    liturgicalYearLabel: `Ano ${cycleLetter} (leitura semanal ciclo ${weekdayCycle}) · ${season}`,
  };
}

/* ---------- Cores litúrgicas ---------- */

function colorClass(corApi) {
  const map = {
    'Verde': 'color-verde',
    'Vermelho': 'color-vermelho',
    'Roxo': 'color-roxo',
    'Rosa': 'color-rosa',
    'Branco': 'color-branco',
    'Dourado': 'color-dourado',
  };
  return map[corApi] || 'color-roxo';
}

/* ---------- Busca da liturgia (API + cache offline) ---------- */

const API_BASE = 'https://liturgia.up.railway.app/v2';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const CACHE_PREFIX = 'minhaLiturgia:';

function cacheKey(iso) { return CACHE_PREFIX + iso; }

function saveCache(iso, data) {
  try {
    localStorage.setItem(cacheKey(iso), JSON.stringify({ data, savedAt: Date.now() }));
  } catch (e) { /* armazenamento indisponível, segue sem cache */ }
}

function readCache(iso) {
  try {
    const raw = localStorage.getItem(cacheKey(iso));
    if (!raw) return null;
    return JSON.parse(raw).data;
  } catch (e) { return null; }
}

async function fetchJson(url, timeoutMs = 9000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function fetchLiturgy(date) {
  const iso = toISODate(date);
  const dia = pad2(date.getDate());
  const mes = pad2(date.getMonth() + 1);
  const ano = date.getFullYear();
  const directUrl = `${API_BASE}/${dia}-${mes}-${ano}`;

  if (!navigator.onLine) {
    const cached = readCache(iso);
    if (cached) return { data: cached, fromCache: true };
    throw new Error('Sem conexão e sem dados salvos para esta data.');
  }

  try {
    const data = await fetchJson(directUrl);
    saveCache(iso, data);
    return { data, fromCache: false };
  } catch (directErr) {
    try {
      const data = await fetchJson(CORS_PROXY + encodeURIComponent(directUrl));
      saveCache(iso, data);
      return { data, fromCache: false };
    } catch (proxyErr) {
      const cached = readCache(iso);
      if (cached) return { data: cached, fromCache: true };
      throw new Error('Não foi possível obter a liturgia desta data agora.');
    }
  }
}

/* ---------- Renderização ---------- */

const el = (id) => document.getElementById(id);

function firstOf(arr) { return Array.isArray(arr) && arr.length ? arr[0] : null; }

/* Em datas com memória facultativa, a API pode trazer mais de uma opção
   de leitura para a mesma categoria (ex.: a leitura ferial e a leitura
   própria do santo do dia). pickOption() busca a opção escolhida pelo
   usuário; por padrão, a primeira (índice 0), igual ao comportamento
   de antes desta funcionalidade existir. */
function pickOption(items, idx) {
  if (!Array.isArray(items) || !items.length) return null;
  return items[idx] || items[0];
}

let selectedReadingIndex = { primeira: 0, salmo: 0, segunda: 0, evangelho: 0 };

function readingOptionLabel(item, idx) {
  if (item && item.titulo) return item.titulo.trim();
  return `Opção ${idx + 1}`;
}

function renderReadingOptions(containerId, items, currentIdx, onSelect) {
  const container = el(containerId);
  if (!container) return;
  if (!Array.isArray(items) || items.length < 2) {
    container.classList.add('hidden');
    container.innerHTML = '';
    return;
  }
  container.classList.remove('hidden');
  container.innerHTML = '';
  items.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn subtle' + (idx === currentIdx ? ' active' : '');
    btn.textContent = readingOptionLabel(item, idx);
    btn.addEventListener('click', () => onSelect(idx));
    container.appendChild(btn);
  });
}

function readingBlock(item) {
  if (!item) return '';
  const parts = [];
  if (item.titulo) parts.push(item.titulo.trim());
  if (item.texto) parts.push(item.texto.trim());
  return parts.join('\n\n');
}

function escapeHtml(s) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* A API de liturgia devolve o texto das leituras com os números de
   versículo colados direto na palavra seguinte (ex.: "1A palavra do
   Senhor... 2“Filho do homem..."). Aqui eles viram um <span> pequeno,
   igual ao número de versículo já usado na Bíblia Sagrada. */
const VERSE_NUM_RE = /(^|\s)(\d{1,3})(?=[A-ZÀ-Úa-zà-ú"“‘])/g;

function highlightVerseNumbers(texto) {
  return escapeHtml(texto).replace(VERSE_NUM_RE, (m, pre, num) => `${pre}<span class="verse-num">${num}</span>`);
}

function readingBlockHTML(item) {
  if (!item) return '';
  const parts = [];
  if (item.titulo) parts.push(escapeHtml(item.titulo.trim()));
  if (item.texto) parts.push(highlightVerseNumbers(item.texto.trim()));
  return parts.join('\n\n');
}

/* Separa o texto de uma leitura (com os números de versículo colados,
   ver VERSE_NUM_RE acima) em versículos individuais — usado para tirar
   um único versículo do evangelho do dia na tela inicial. */
function splitVerses(texto) {
  if (!texto) return [];
  const re = /(^|\s)(\d{1,3})(?=[A-ZÀ-Úa-zà-ú"“‘])/g;
  const matches = [...texto.matchAll(re)];
  if (!matches.length) return [{ num: null, texto: texto.trim() }];
  const versiculos = [];
  matches.forEach((m, i) => {
    const inicioConteudo = m.index + m[0].length;
    const fimConteudo = i + 1 < matches.length ? matches[i + 1].index : texto.length;
    const conteudo = texto.slice(inicioConteudo, fimConteudo).trim();
    if (conteudo) versiculos.push({ num: m[2], texto: conteudo });
  });
  return versiculos;
}

function pickDeterministic(arr, seedStr) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) hash = (hash * 31 + seedStr.charCodeAt(i)) >>> 0;
  return arr[hash % arr.length];
}

function setSection(sectionId, visible) {
  const s = el(sectionId);
  if (s) s.classList.toggle('hidden', !visible);
}

let lastRenderedText = '';
let lastNarrationText = '';
let lastRenderedDate = null;
let lastApiData = null;
let lastLiturgicalInfo = null;

function renderReadings(date, apiData, info) {
  const leituras = apiData.leituras || {};

  const primeiraItems = leituras.primeiraLeitura;
  renderReadingOptions('opts-primeira', primeiraItems, selectedReadingIndex.primeira, (idx) => {
    selectedReadingIndex.primeira = idx;
    renderReadings(date, apiData, info);
  });
  const primeira = pickOption(primeiraItems, selectedReadingIndex.primeira);
  el('ref-primeira').textContent = primeira ? primeira.referencia || '' : '';
  el('txt-primeira').innerHTML = readingBlockHTML(primeira) || 'Leitura não disponível para esta data.';

  const salmoItems = leituras.salmo;
  renderReadingOptions('opts-salmo', salmoItems, selectedReadingIndex.salmo, (idx) => {
    selectedReadingIndex.salmo = idx;
    renderReadings(date, apiData, info);
  });
  const salmo = pickOption(salmoItems, selectedReadingIndex.salmo);
  el('ref-salmo').textContent = salmo ? salmo.referencia || '' : '';
  el('refrao-salmo').textContent = salmo && salmo.refrao ? salmo.refrao : '';
  el('txt-salmo').innerHTML = salmo ? highlightVerseNumbers(salmo.texto || '') : 'Salmo não disponível para esta data.';

  const segundaItems = leituras.segundaLeitura;
  const segunda = pickOption(segundaItems, selectedReadingIndex.segunda);
  setSection('sec-segunda', !!segunda);
  renderReadingOptions('opts-segunda', segundaItems, selectedReadingIndex.segunda, (idx) => {
    selectedReadingIndex.segunda = idx;
    renderReadings(date, apiData, info);
  });
  if (segunda) {
    el('ref-segunda').textContent = segunda.referencia || '';
    el('txt-segunda').innerHTML = readingBlockHTML(segunda);
  }

  const evangelhoItems = leituras.evangelho;
  renderReadingOptions('opts-evangelho', evangelhoItems, selectedReadingIndex.evangelho, (idx) => {
    selectedReadingIndex.evangelho = idx;
    renderReadings(date, apiData, info);
  });
  const evangelho = pickOption(evangelhoItems, selectedReadingIndex.evangelho);
  el('ref-evangelho').textContent = evangelho ? evangelho.referencia || '' : '';
  el('txt-evangelho').innerHTML = readingBlockHTML(evangelho) || 'Evangelho não disponível para esta data.';

  lastRenderedText = buildShareText(date, apiData, info);
  lastNarrationText = buildNarrationText(date, apiData, info);
}

function render(date, apiData) {
  const info = computeLiturgicalInfo(date);
  const cor = apiData.cor || 'Roxo';

  el('colorBadge').textContent = cor;
  el('colorBadge').className = 'color-badge ' + colorClass(cor);
  el('celebrationTitle').textContent = apiData.liturgia || 'Liturgia do dia';
  el('dateLine').textContent = formatDateBR(date);
  el('cycleLine').textContent = info.liturgicalYearLabel;
  el('liturgyHeader').classList.remove('hidden');

  const oracoes = apiData.oracoes || {};
  el('txt-coleta').textContent = oracoes.coleta || 'Texto não disponível para esta data.';

  selectedReadingIndex = { primeira: 0, salmo: 0, segunda: 0, evangelho: 0 };
  renderReadings(date, apiData, info);

  setSection('sec-oferendas', !!oracoes.oferendas);
  if (oracoes.oferendas) el('txt-oferendas').textContent = oracoes.oferendas;

  setSection('sec-comunhao', !!oracoes.comunhao);
  if (oracoes.comunhao) el('txt-comunhao').textContent = oracoes.comunhao;

  el('liturgyBody').classList.remove('hidden');

  lastRenderedDate = date;
  lastApiData = apiData;
  lastLiturgicalInfo = info;
}

window.MinhaLiturgiaCurrentLiturgy = () => (
  lastApiData ? { date: lastRenderedDate, apiData: lastApiData, info: lastLiturgicalInfo } : null
);

function buildShareText(date, apiData, info) {
  const oracoes = apiData.oracoes || {};
  const leituras = apiData.leituras || {};
  const primeira = pickOption(leituras.primeiraLeitura, selectedReadingIndex.primeira);
  const salmo = pickOption(leituras.salmo, selectedReadingIndex.salmo);
  const segunda = pickOption(leituras.segundaLeitura, selectedReadingIndex.segunda);
  const evangelho = pickOption(leituras.evangelho, selectedReadingIndex.evangelho);

  const lines = [];
  lines.push(`✝️ MINHA LITURGIA — ${formatDateBR(date)}`);
  lines.push(apiData.liturgia || '');
  lines.push(`Cor litúrgica: ${apiData.cor || ''}  ·  ${info.liturgicalYearLabel}`);
  lines.push('');
  lines.push('ORAÇÃO COLETA');
  lines.push(oracoes.coleta || '—');
  lines.push('');
  if (primeira) {
    lines.push(`PRIMEIRA LEITURA — ${primeira.referencia || ''}`);
    lines.push(readingBlock(primeira));
    lines.push('');
  }
  if (salmo) {
    lines.push(`SALMO — ${salmo.referencia || ''}`);
    if (salmo.refrao) lines.push(salmo.refrao);
    lines.push(salmo.texto || '');
    lines.push('');
  }
  if (segunda) {
    lines.push(`SEGUNDA LEITURA — ${segunda.referencia || ''}`);
    lines.push(readingBlock(segunda));
    lines.push('');
  }
  if (evangelho) {
    lines.push(`EVANGELHO — ${evangelho.referencia || ''}`);
    lines.push(readingBlock(evangelho));
    lines.push('');
  }
  if (oracoes.oferendas) {
    lines.push('ORAÇÃO SOBRE AS OFERENDAS');
    lines.push(oracoes.oferendas);
    lines.push('');
  }
  if (oracoes.comunhao) {
    lines.push('ORAÇÃO FINAL (PÓS-COMUNHÃO)');
    lines.push(oracoes.comunhao);
    lines.push('');
  }
  lines.push('Compartilhado pelo app Minha Liturgia 🙏');

  return lines.join('\n');
}

/* Texto sem emojis, sem MAIÚSCULAS e com frases naturais — alguns motores de
   TTS do Android leem palavras em CAIXA ALTA soletrando letra por letra, e
   podem travar silenciosamente em certos emojis. */
function buildNarrationText(date, apiData, info) {
  const oracoes = apiData.oracoes || {};
  const leituras = apiData.leituras || {};
  const primeira = pickOption(leituras.primeiraLeitura, selectedReadingIndex.primeira);
  const salmo = pickOption(leituras.salmo, selectedReadingIndex.salmo);
  const segunda = pickOption(leituras.segundaLeitura, selectedReadingIndex.segunda);
  const evangelho = pickOption(leituras.evangelho, selectedReadingIndex.evangelho);

  const partes = [];
  partes.push(`Liturgia de ${formatDateBR(date)}.`);
  if (apiData.liturgia) partes.push(apiData.liturgia + '.');
  partes.push(`${info.liturgicalYearLabel}.`);

  partes.push('Oração coleta.');
  partes.push(oracoes.coleta || '');

  if (primeira) {
    partes.push(`Primeira leitura, ${primeira.referencia || ''}.`);
    partes.push(readingBlock(primeira));
  }
  if (salmo) {
    partes.push(`Salmo, ${salmo.referencia || ''}.`);
    if (salmo.refrao) partes.push(salmo.refrao);
    partes.push(salmo.texto || '');
  }
  if (segunda) {
    partes.push(`Segunda leitura, ${segunda.referencia || ''}.`);
    partes.push(readingBlock(segunda));
  }
  if (evangelho) {
    partes.push(`Evangelho, ${evangelho.referencia || ''}.`);
    partes.push(readingBlock(evangelho));
  }
  if (oracoes.oferendas) {
    partes.push('Oração sobre as oferendas.');
    partes.push(oracoes.oferendas);
  }
  if (oracoes.comunhao) {
    partes.push('Oração final, pós-comunhão.');
    partes.push(oracoes.comunhao);
  }

  return partes.filter(Boolean).join(' ');
}

/* ---------- Mensagem do Dia (tela inicial) ---------- */
/* Um único versículo tirado do Evangelho do dia, escolhido de forma
   determinística pela data — o mesmo versículo o dia inteiro, sem
   precisar de nenhum toque do usuário. */

const DAY_VERSE_CACHE_KEY = 'minhaLiturgia:dayVerse';

function renderDayVerse(iso, referencia, texto) {
  el('dayVerseRef').textContent = referencia || '';
  el('dayVerseText').textContent = texto;
  el('dayVerseCard').classList.remove('hidden');
}

async function initDayVerse() {
  const iso = toISODate(new Date());

  try {
    const cachedRaw = localStorage.getItem(DAY_VERSE_CACHE_KEY);
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw);
      if (cached.iso === iso && cached.texto) {
        renderDayVerse(iso, cached.referencia, cached.texto);
        return;
      }
    }
  } catch (e) { /* cache indisponível, segue para buscar de novo */ }

  try {
    const { data } = await fetchLiturgy(new Date());
    const evangelho = firstOf((data.leituras || {}).evangelho);
    if (!evangelho || !evangelho.texto) return;

    const versiculos = splitVerses(evangelho.texto);
    if (!versiculos.length) return;
    const escolhido = pickDeterministic(versiculos, iso);

    renderDayVerse(iso, evangelho.referencia, escolhido.texto);
    try {
      localStorage.setItem(DAY_VERSE_CACHE_KEY, JSON.stringify({ iso, referencia: evangelho.referencia, texto: escolhido.texto }));
    } catch (e) { /* sem storage disponível */ }
  } catch (e) {
    /* sem conexão e sem cache: a mensagem do dia simplesmente não aparece */
  }
}

/* ---------- Estado / controle de UI ---------- */

function setStatus(msg, isError) {
  const s = el('status');
  s.textContent = msg || '';
  s.classList.toggle('error', !!isError);
}

async function loadDate(date) {
  el('datePicker').value = toISODate(date);
  el('liturgyHeader').classList.add('hidden');
  el('liturgyBody').classList.add('hidden');
  el('offlineNote').classList.add('hidden');
  setStatus('Carregando liturgia…', false);
  try {
    const { data, fromCache } = await fetchLiturgy(date);
    render(date, data);
    setStatus('', false);
    if (fromCache) el('offlineNote').classList.remove('hidden');
  } catch (err) {
    setStatus(err.message || 'Erro ao carregar a liturgia.', true);
  }
}

function initDateNav() {
  const picker = el('datePicker');
  const today = new Date();
  picker.value = toISODate(today);

  picker.addEventListener('change', () => {
    if (picker.value) loadDate(fromISODate(picker.value));
  });

  el('prevDay').addEventListener('click', () => {
    const d = addDays(fromISODate(picker.value), -1);
    loadDate(d);
  });
  el('nextDay').addEventListener('click', () => {
    const d = addDays(fromISODate(picker.value), 1);
    loadDate(d);
  });
  el('todayBtn').addEventListener('click', () => loadDate(new Date()));

  loadDate(today);
}

/* ---------- Navegação entre telas (Início / Liturgia / Bíblia) ---------- */

let liturgiaInitialized = false;
let eucharistInitialized = false;
let catechismInitialized = false;
let horaSantaInitialized = false;
let rosarioInitialized = false;
let santosInitialized = false;
let santaseInitialized = false;
let oracoesDiversasInitialized = false;
let saoMiguelInitialized = false;
let promessasInitialized = false;

function showView(name) {
  if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();

  ['home', 'liturgia', 'biblia', 'eucaristia', 'catecismo', 'horasanta', 'rosario', 'santos', 'homilia', 'santase', 'oracoesdiversas', 'saomiguel', 'promessas'].forEach((v) => {
    const section = el(`view-${v}`);
    if (section) section.classList.toggle('hidden', v !== name);
  });

  const subtitle = el('pageSubtitle');
  if (name === 'liturgia') {
    subtitle.textContent = 'Celebração do dia segundo o rito romano';
    if (!liturgiaInitialized) { liturgiaInitialized = true; initDateNav(); }
  } else if (name === 'biblia') {
    subtitle.textContent = 'Antigo e Novo Testamento';
    if (window.MinhaLiturgiaBible) window.MinhaLiturgiaBible.enterBibleView();
  } else if (name === 'eucaristia') {
    subtitle.textContent = 'Sacerdote e assembleia';
    if (!eucharistInitialized && window.MinhaLiturgiaEucharist) {
      eucharistInitialized = true;
      window.MinhaLiturgiaEucharist.initEucharist();
    }
  } else if (name === 'catecismo') {
    subtitle.textContent = 'Busca por tema e por parágrafo';
    if (!catechismInitialized && window.MinhaLiturgiaCatechism) {
      catechismInitialized = true;
      window.MinhaLiturgiaCatechism.initCatechism();
    }
  } else if (name === 'horasanta') {
    subtitle.textContent = 'Roteiro mensal de adoração';
    if (!horaSantaInitialized && window.MinhaLiturgiaHoraSanta) {
      horaSantaInitialized = true;
      window.MinhaLiturgiaHoraSanta.initHoraSanta();
    }
  } else if (name === 'rosario') {
    subtitle.textContent = 'Terço, Rosário e Terço da Misericórdia';
    if (!rosarioInitialized && window.MinhaLiturgiaRosario) {
      rosarioInitialized = true;
      window.MinhaLiturgiaRosario.initRosario();
    }
  } else if (name === 'santos') {
    subtitle.textContent = 'Santo do dia e calendário do ano';
    if (!santosInitialized && window.MinhaLiturgiaSantos) {
      santosInitialized = true;
      window.MinhaLiturgiaSantos.initSantos();
    }
  } else if (name === 'homilia') {
    subtitle.textContent = 'Roteiro de apoio para a homilia';
    if (window.MinhaLiturgiaHomilia) window.MinhaLiturgiaHomilia.renderHomilia();
  } else if (name === 'santase') {
    subtitle.textContent = 'Documentos oficiais do Vaticano';
    if (!santaseInitialized && window.MinhaLiturgiaSantaSe) {
      santaseInitialized = true;
      window.MinhaLiturgiaSantaSe.initSantaSe();
    }
  } else if (name === 'oracoesdiversas') {
    subtitle.textContent = 'Cura, proteção, família e momentos difíceis';
    if (!oracoesDiversasInitialized && window.MinhaLiturgiaOracoesDiversas) {
      oracoesDiversasInitialized = true;
      window.MinhaLiturgiaOracoesDiversas.initOracoesDiversas();
    }
  } else if (name === 'saomiguel') {
    subtitle.textContent = 'Proteção, defesa e libertação contra o mal';
    if (!saoMiguelInitialized && window.MinhaLiturgiaSaoMiguel) {
      saoMiguelInitialized = true;
      window.MinhaLiturgiaSaoMiguel.initSaoMiguel();
    }
  } else if (name === 'promessas') {
    subtitle.textContent = 'Um versículo e uma breve reflexão';
    if (!promessasInitialized && window.MinhaLiturgiaPromessas) {
      promessasInitialized = true;
      window.MinhaLiturgiaPromessas.initPromessas();
    }
  } else {
    subtitle.textContent = 'Celebração do dia e Bíblia Sagrada';
  }

  history.replaceState(null, '', name === 'home' ? '#' : `#/${name}`);
}

window.MinhaLiturgiaShowView = showView;

function initRouter() {
  el('goLiturgia').addEventListener('click', () => showView('liturgia'));
  el('goBiblia').addEventListener('click', () => showView('biblia'));
  el('goEucaristia').addEventListener('click', () => showView('eucaristia'));
  el('goCatecismo').addEventListener('click', () => showView('catecismo'));
  el('goHoraSanta').addEventListener('click', () => showView('horasanta'));
  el('goRosario').addEventListener('click', () => showView('rosario'));
  el('goSantos').addEventListener('click', () => showView('santos'));
  el('goHomilia').addEventListener('click', () => showView('homilia'));
  el('goSantaSe').addEventListener('click', () => showView('santase'));
  el('goOracoesDiversas').addEventListener('click', () => showView('oracoesdiversas'));
  el('goSaoMiguel').addEventListener('click', () => showView('saomiguel'));
  el('goPromessas').addEventListener('click', () => showView('promessas'));
  el('dayVerseCard').addEventListener('click', () => showView('liturgia'));
  el('homeBtn').addEventListener('click', () => showView('home'));
  document.querySelectorAll('[data-back-to="home"]').forEach((b) => {
    b.addEventListener('click', () => showView('home'));
  });

  const initial = location.hash.replace('#/', '').replace('#', '');
  const validViews = ['liturgia', 'biblia', 'eucaristia', 'catecismo', 'horasanta', 'rosario', 'santos', 'homilia', 'santase', 'oracoesdiversas', 'saomiguel', 'promessas'];
  showView(validViews.includes(initial) ? initial : 'home');
}

/* ---------- Compartilhamento ---------- */

function showToast(msg) {
  const t = el('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2200);
}
window.showToast = showToast;

async function shareLiturgy() {
  if (!lastRenderedText) return;
  const shareData = {
    title: 'Minha Liturgia',
    text: lastRenderedText,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
  }
  await copyLiturgy();
}

async function copyLiturgy() {
  if (!lastRenderedText) return;
  try {
    await navigator.clipboard.writeText(lastRenderedText);
    showToast('Texto copiado! Cole no WhatsApp ou onde quiser.');
  } catch (e) {
    showToast('Não foi possível copiar automaticamente.');
  }
}

function initShare() {
  el('shareBtn').addEventListener('click', shareLiturgy);
  el('copyBtn').addEventListener('click', copyLiturgy);
  el('narrateLiturgyBtn').addEventListener('click', () => {
    if (window.MinhaLiturgiaNarration) {
      window.MinhaLiturgiaNarration.toggle(el('narrateLiturgyBtn'), () => lastNarrationText);
    }
  });
}

/* ---------- Tamanho da fonte ---------- */

const FONT_SCALE_KEY = 'minhaLiturgia:fontScale';
const FONT_SCALE_MIN = 0.85;
const FONT_SCALE_MAX = 1.6;
const FONT_SCALE_STEP = 0.1;

function applyFontScale(scale) {
  document.documentElement.style.setProperty('--txt-scale', scale);
  const pctBtn = el('fontSizeReset');
  if (pctBtn) pctBtn.textContent = `${Math.round(scale * 100)}%`;
}

function initFontSize() {
  let scale = parseFloat(localStorage.getItem(FONT_SCALE_KEY)) || 1;
  scale = Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, scale));
  applyFontScale(scale);

  function setScale(next) {
    scale = Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, next));
    applyFontScale(scale);
    try { localStorage.setItem(FONT_SCALE_KEY, scale); } catch (e) { /* sem storage disponível */ }
  }

  el('fontSizeDown').addEventListener('click', () => setScale(scale - FONT_SCALE_STEP));
  el('fontSizeUp').addEventListener('click', () => setScale(scale + FONT_SCALE_STEP));
  el('fontSizeReset').addEventListener('click', () => setScale(1));
}

/* ---------- Instalação (PWA) ---------- */

function initInstallPrompt() {
  let deferredPrompt = null;
  const btn = el('installBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btn.classList.remove('hidden');
  });

  btn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    btn.classList.add('hidden');
  });

  window.addEventListener('appinstalled', () => {
    btn.classList.add('hidden');
  });
}

/* ---------- Service worker ---------- */

function showUpdateBanner() {
  const banner = el('updateBanner');
  if (banner) banner.classList.remove('hidden');
}

function initServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then((reg) => {
      // Verifica se há versão nova assim que o app abre, ignorando o
      // cache HTTP do próprio sw.js (updateViaCache: 'none' acima).
      reg.update().catch(() => {});
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reg.update().catch(() => {});
      });

      reg.addEventListener('updatefound', () => {
        const novo = reg.installing;
        if (!novo) return;
        novo.addEventListener('statechange', () => {
          if (novo.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateBanner();
          }
        });
      });
    }).catch(() => {});
  });

  const btn = el('updateBannerBtn');
  if (btn) btn.addEventListener('click', () => window.location.reload());
}

/* ---------- Início ---------- */

document.addEventListener('DOMContentLoaded', () => {
  initFontSize();
  initShare();
  initInstallPrompt();
  initServiceWorker();
  if (window.MinhaLiturgiaBible) window.MinhaLiturgiaBible.initBible();
  initRouter();
  initDayVerse();
});
