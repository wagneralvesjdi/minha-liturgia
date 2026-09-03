'use strict';

/* ---------- Meus Favoritos ---------- */
/* Guarda uma cópia do texto (não uma referência dinâmica) de orações,
   leituras e reflexões marcadas — funciona offline e não depende de
   reconstruir a navegação original de cada seção. */

const FAVORITOS_KEY = 'minhaLiturgia:favoritos';
const fel = (id) => document.getElementById(id);

function gerarId(titulo, texto) {
  const base = `${titulo}|${texto}`;
  let hash = 0;
  for (let i = 0; i < base.length; i++) hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
  return 'fav_' + hash.toString(36);
}

function listarFavoritos() {
  try {
    const raw = localStorage.getItem(FAVORITOS_KEY);
    const lista = raw ? JSON.parse(raw) : [];
    return Array.isArray(lista) ? lista.sort((a, b) => (b.criadoEm || 0) - (a.criadoEm || 0)) : [];
  } catch (e) { return []; }
}

function salvarFavoritos(lista) {
  try { localStorage.setItem(FAVORITOS_KEY, JSON.stringify(lista)); } catch (e) { /* sem storage disponível */ }
}

function existeFavorito(id) {
  return listarFavoritos().some((f) => f.id === id);
}

function adicionarFavorito(item) {
  const id = gerarId(item.titulo, item.texto);
  const lista = listarFavoritos();
  if (lista.some((f) => f.id === id)) return id;
  lista.push({ id, titulo: item.titulo, subtitulo: item.subtitulo || '', texto: item.texto, criadoEm: Date.now() });
  salvarFavoritos(lista);
  return id;
}

function removerFavorito(id) {
  salvarFavoritos(listarFavoritos().filter((f) => f.id !== id));
}

function setFavoritoBtnLabel(btn, ativo) {
  btn.textContent = ativo ? '★ Favoritado' : '☆ Favoritar';
  btn.classList.toggle('favorito-ativo', ativo);
}

/* Anexa o comportamento de favoritar a um botão. getItem() deve devolver
   { titulo, subtitulo, texto } no momento do clique (lido na hora, pra
   sempre favoritar o conteúdo atual da tela, mesmo que ela seja dinâmica). */
function attachFavoritoBtn(btn, getItem) {
  function atualizar() {
    const item = getItem();
    if (!item || !item.texto) { setFavoritoBtnLabel(btn, false); return; }
    setFavoritoBtnLabel(btn, existeFavorito(gerarId(item.titulo, item.texto)));
  }
  btn.addEventListener('click', () => {
    const item = getItem();
    if (!item || !item.texto) { if (window.showToast) window.showToast('Nada para favoritar aqui ainda.'); return; }
    const id = gerarId(item.titulo, item.texto);
    if (existeFavorito(id)) {
      removerFavorito(id);
      setFavoritoBtnLabel(btn, false);
      if (window.showToast) window.showToast('Removido dos favoritos.');
    } else {
      adicionarFavorito(item);
      setFavoritoBtnLabel(btn, true);
      if (window.showToast) window.showToast('Adicionado aos favoritos!');
    }
  });
  atualizar();
  return atualizar;
}

/* ---------- Tela "Meus Favoritos" ---------- */

function favoritosStepShow(step) {
  ['lista', 'leitura'].forEach((s) => {
    const el = fel(`favoritos-step-${s}`);
    if (el) el.classList.toggle('hidden', s !== step);
  });
}

function abrirFavorito(item) {
  fel('favoritoLeituraTitulo').textContent = item.titulo;
  fel('favoritoLeituraSubtitulo').textContent = item.subtitulo || '';
  fel('favoritoLeituraTexto').textContent = item.texto;
  favoritosStepShow('leitura');
  const narrateBtn = fel('narrateFavoritoBtn');
  if (narrateBtn) narrateBtn.dataset.favoritoAtualId = item.id;
}

function renderFavoritosList() {
  const list = fel('favoritosList');
  const vazio = fel('favoritosVazio');
  list.innerHTML = '';
  const favoritos = listarFavoritos();
  vazio.classList.toggle('hidden', favoritos.length > 0);
  favoritos.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = 'book-btn';
    btn.innerHTML = `<span>${item.titulo}</span><small>${(item.subtitulo || item.texto || '').slice(0, 70)}</small>`;
    btn.addEventListener('click', () => abrirFavorito(item));
    list.appendChild(btn);
  });
}

function initFavoritos() {
  renderFavoritosList();
  document.querySelectorAll('[data-back-to="favoritos-lista"]').forEach((b) => {
    b.addEventListener('click', () => {
      if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
      renderFavoritosList();
      favoritosStepShow('lista');
    });
  });

  fel('removerFavoritoBtn').addEventListener('click', () => {
    const id = fel('narrateFavoritoBtn').dataset.favoritoAtualId;
    if (id) removerFavorito(id);
    renderFavoritosList();
    favoritosStepShow('lista');
    if (window.showToast) window.showToast('Removido dos favoritos.');
  });

  fel('narrateFavoritoBtn').addEventListener('click', () => {
    if (window.MinhaLiturgiaNarration) {
      window.MinhaLiturgiaNarration.toggle(fel('narrateFavoritoBtn'), () =>
        `${fel('favoritoLeituraTitulo').textContent}. ${fel('favoritoLeituraTexto').textContent}`
      );
    }
  });
}

window.MinhaLiturgiaFavoritos = { initFavoritos, attachFavoritoBtn, renderFavoritosList };
