'use strict';

/* ---------- Bíblia Sagrada (Antigo e Novo Testamento, tradução Ave Maria) ---------- */

const BIBLE_URL = 'https://raw.githubusercontent.com/fidalgobr/bibliaAveMariaJSON/master/bibliaAveMaria.json';

let bibleData = null;
let bibleLoadPromise = null;
let currentTestament = null; // 'AT' | 'NT'
let currentBook = null;
let currentChapter = null;

const bel = (id) => document.getElementById(id);

function testamentBooks(key) {
  if (!bibleData) return [];
  return key === 'AT' ? bibleData.antigoTestamento : bibleData.novoTestamento;
}

function loadBible() {
  if (bibleData) return Promise.resolve(bibleData);
  if (bibleLoadPromise) return bibleLoadPromise;

  const statusEl = bel('bibleStatus');
  if (statusEl) { statusEl.textContent = 'Baixando a Bíblia Sagrada (~6 MB, só na primeira vez)…'; statusEl.classList.remove('error'); }

  bibleLoadPromise = fetch(BIBLE_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      bibleData = data;
      if (statusEl) statusEl.textContent = '';
      return bibleData;
    })
    .catch((err) => {
      bibleLoadPromise = null;
      if (statusEl) {
        statusEl.textContent = 'Não foi possível baixar a Bíblia agora. Verifique a conexão e tente de novo.';
        statusEl.classList.add('error');
      }
      throw err;
    });

  return bibleLoadPromise;
}

function bibleStepShow(step) {
  if (step !== 'reader' && window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
  ['testament', 'search', 'books', 'chapters', 'reader'].forEach((s) => {
    const el = bel(`bible-step-${s}`);
    if (el) el.classList.toggle('hidden', s !== step);
  });
}

function normalizeText(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function searchBible(query) {
  const q = normalizeText(query.trim());
  if (!q || !bibleData) return [];
  const results = [];
  [['antigoTestamento', 'AT'], ['novoTestamento', 'NT']].forEach(([key, sigla]) => {
    (bibleData[key] || []).forEach((livro) => {
      livro.capitulos.forEach((cap) => {
        cap.versiculos.forEach((v) => {
          if (normalizeText(v.texto).includes(q)) {
            results.push({ testamento: sigla, livro, capitulo: cap, versiculo: v });
          }
        });
      });
    });
  });
  return results;
}

let bibleSearchDebounce = null;

function renderBibleSearchResults(query) {
  const box = bel('bibleSearchResults');
  box.innerHTML = '';

  const results = searchBible(query);
  if (!results.length) {
    const p = document.createElement('p');
    p.className = 'status';
    p.textContent = 'Nada encontrado para esse termo.';
    box.appendChild(p);
  } else {
    const info = document.createElement('p');
    info.className = 'status';
    const total = results.length;
    info.textContent = total > 80 ? `${total} versículos encontrados — mostrando os 80 primeiros.` : `${total} versículo${total === 1 ? '' : 's'} encontrado${total === 1 ? '' : 's'}.`;
    box.appendChild(info);

    results.slice(0, 80).forEach((r) => {
      const btn = document.createElement('button');
      btn.className = 'book-btn';
      const snippet = r.versiculo.texto.length > 140 ? r.versiculo.texto.slice(0, 140) + '…' : r.versiculo.texto;
      btn.innerHTML = `<span>${r.livro.nome} ${r.capitulo.capitulo},${r.versiculo.versiculo}</span><small>${snippet}</small>`;
      btn.addEventListener('click', () => goToVerseResult(r));
      box.appendChild(btn);
    });
  }

  bibleStepShow('search');
}

function goToVerseResult(r) {
  currentTestament = r.testamento;
  currentBook = r.livro;
  selectChapter(r.capitulo);
  const target = bel(`v-${r.versiculo.versiculo}`);
  if (target) {
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('verse-highlight');
      setTimeout(() => target.classList.remove('verse-highlight'), 1600);
    }, 60);
  }
}

function renderBookList() {
  const books = testamentBooks(currentTestament);
  bel('testamentTitle').textContent = currentTestament === 'AT' ? 'Antigo Testamento' : 'Novo Testamento';
  const list = bel('bookList');
  list.innerHTML = '';
  books.forEach((book, idx) => {
    const btn = document.createElement('button');
    btn.className = 'book-btn';
    btn.innerHTML = `<span>${book.nome}</span><small>${book.capitulos.length} cap.</small>`;
    btn.addEventListener('click', () => selectBook(idx));
    list.appendChild(btn);
  });
  bibleStepShow('books');
}

function selectBook(idx) {
  currentBook = testamentBooks(currentTestament)[idx];
  bel('bookTitle').textContent = currentBook.nome;
  const grid = bel('chapterGrid');
  grid.innerHTML = '';
  currentBook.capitulos.forEach((cap) => {
    const btn = document.createElement('button');
    btn.className = 'chapter-btn';
    btn.textContent = cap.capitulo;
    btn.addEventListener('click', () => selectChapter(cap));
    grid.appendChild(btn);
  });
  bibleStepShow('chapters');
}

function selectChapter(capitulo) {
  if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
  currentChapter = capitulo;
  bel('readerTitle').textContent = `${currentBook.nome} ${capitulo.capitulo}`;
  const list = bel('verseList');
  list.innerHTML = '';
  capitulo.versiculos.forEach((v) => {
    const p = document.createElement('p');
    p.className = 'verse';
    p.id = `v-${v.versiculo}`;
    const num = document.createElement('span');
    num.className = 'verse-num';
    num.textContent = v.versiculo;
    p.appendChild(num);
    p.appendChild(document.createTextNode(' ' + v.texto));
    list.appendChild(p);
  });
  bel('verseJumpInput').value = '';
  bibleStepShow('reader');
  list.scrollIntoView({ block: 'start' });
}

function narrateChapterText() {
  if (!currentBook || !currentChapter) return '';
  const corpo = currentChapter.versiculos.map((v) => v.texto).join(' ');
  return `${currentBook.nome}, capítulo ${currentChapter.capitulo}. ${corpo}`;
}

function jumpToVerse() {
  const n = parseInt(bel('verseJumpInput').value, 10);
  if (!n) return;
  const target = bel(`v-${n}`);
  if (!target) {
    if (window.showToast) window.showToast('Este capítulo não tem esse versículo.');
    return;
  }
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.classList.add('verse-highlight');
  setTimeout(() => target.classList.remove('verse-highlight'), 1600);
}

async function chooseTestament(key) {
  currentTestament = key;
  try {
    await loadBible();
    renderBookList();
  } catch (e) { /* mensagem de erro já exibida em #bibleStatus */ }
}

function initBible() {
  bel('chooseAT').addEventListener('click', () => chooseTestament('AT'));
  bel('chooseNT').addEventListener('click', () => chooseTestament('NT'));

  document.querySelectorAll('[data-back-to="testament"]').forEach((b) => b.addEventListener('click', () => bibleStepShow('testament')));
  document.querySelectorAll('[data-back-to="books"]').forEach((b) => b.addEventListener('click', () => bibleStepShow('books')));
  document.querySelectorAll('[data-back-to="chapters"]').forEach((b) => b.addEventListener('click', () => bibleStepShow('chapters')));

  bel('verseJumpBtn').addEventListener('click', jumpToVerse);
  bel('verseJumpInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') jumpToVerse(); });

  bel('narrateBibleBtn').addEventListener('click', () => {
    if (window.MinhaLiturgiaNarration) {
      window.MinhaLiturgiaNarration.toggle(bel('narrateBibleBtn'), narrateChapterText);
    }
  });

  const searchInput = bel('bibleSearchInput');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    clearTimeout(bibleSearchDebounce);
    if (!query.trim()) return;
    bibleSearchDebounce = setTimeout(async () => {
      const statusEl = bel('bibleSearchStatus');
      if (!bibleData) {
        statusEl.textContent = 'Carregando a Bíblia para buscar…';
        try { await loadBible(); } catch (e) { statusEl.textContent = 'Não foi possível carregar a Bíblia para buscar agora.'; return; }
      }
      statusEl.textContent = '';
      renderBibleSearchResults(query);
    }, 350);
  });
}

function enterBibleView() {
  if (!bibleData && !bibleLoadPromise) loadBible().catch(() => {});
}

function getVerseRange(livroNome, capituloNum, versiculoIni, versiculoFim) {
  if (!bibleData) return null;
  const todosLivros = [...(bibleData.antigoTestamento || []), ...(bibleData.novoTestamento || [])];
  const livro = todosLivros.find((b) => b.nome === livroNome);
  if (!livro) return null;
  const cap = livro.capitulos.find((c) => c.capitulo === capituloNum);
  if (!cap) return null;
  const fim = versiculoFim || versiculoIni;
  const versiculos = cap.versiculos.filter((v) => v.versiculo >= versiculoIni && v.versiculo <= fim);
  if (!versiculos.length) return null;
  return versiculos.map((v) => v.texto).join(' ');
}

const ROMANO_POR_ARABICO = { 1: 'I', 2: 'II', 3: 'III' };

function nomesCandidatos(nomeAprox) {
  const candidatos = [nomeAprox];
  const m = nomeAprox.match(/^([123])\s+(.+)$/);
  if (m) candidatos.push(`${ROMANO_POR_ARABICO[m[1]]} ${m[2]}`);
  candidatos.push(`São ${nomeAprox}`, `Santo ${nomeAprox}`);
  return candidatos;
}

function findBibleBook(nomeAprox) {
  if (!bibleData) return null;
  const todosLivros = [
    ...(bibleData.antigoTestamento || []).map((livro) => ({ livro, testamento: 'AT' })),
    ...(bibleData.novoTestamento || []).map((livro) => ({ livro, testamento: 'NT' })),
  ];
  const candidatosNorm = nomesCandidatos(nomeAprox).map(normalizeText);
  for (const cand of candidatosNorm) {
    const achado = todosLivros.find((x) => normalizeText(x.livro.nome) === cand);
    if (achado) return achado;
  }
  const core = normalizeText(nomeAprox).replace(/^(123|i{1,3})\s+/, '').trim();
  return todosLivros.find((x) => normalizeText(x.livro.nome).includes(core)) || null;
}

function highlightVerseRange(versIni, versFim) {
  const fim = versFim || versIni;
  const primeiro = bel(`v-${versIni}`);
  if (primeiro) {
    setTimeout(() => primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
  }
  for (let n = versIni; n <= fim; n++) {
    const el = bel(`v-${n}`);
    if (el) el.classList.add('verse-highlight');
  }
  setTimeout(() => {
    for (let n = versIni; n <= fim; n++) {
      const el = bel(`v-${n}`);
      if (el) el.classList.remove('verse-highlight');
    }
  }, 2200);
}

async function getPassageVerses(livroNomeAprox, capituloNum, versIni, versFim) {
  try {
    await loadBible();
  } catch (e) {
    return null;
  }
  const achado = findBibleBook(livroNomeAprox);
  if (!achado) return null;
  const cap = achado.livro.capitulos.find((c) => c.capitulo === capituloNum);
  if (!cap) return null;
  const fim = versFim || versIni;
  const versiculos = cap.versiculos.filter((v) => v.versiculo >= versIni && v.versiculo <= fim);
  if (!versiculos.length) return null;
  return {
    livroNome: achado.livro.nome,
    capitulo: capituloNum,
    versiculos: versiculos.map((v) => ({ numero: v.versiculo, texto: v.texto })),
  };
}

async function goToPassage(livroNomeAprox, capituloNum, versIni, versFim) {
  try {
    await loadBible();
  } catch (e) {
    return false;
  }
  const achado = findBibleBook(livroNomeAprox);
  if (!achado) return false;
  currentTestament = achado.testamento;
  currentBook = achado.livro;
  const cap = currentBook.capitulos.find((c) => c.capitulo === capituloNum);
  if (!cap) return false;
  selectChapter(cap);
  highlightVerseRange(versIni, versFim);
  return true;
}

window.MinhaLiturgiaBible = { initBible, enterBibleView, loadBible, getVerseRange, goToPassage, getPassageVerses };
