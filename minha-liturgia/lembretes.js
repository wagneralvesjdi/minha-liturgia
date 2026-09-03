'use strict';

/* ---------- Lembretes de oração ---------- */
/* Sem servidor, sem push real — dispara enquanto o app estiver aberto
   (instalado e rodando em segundo plano funciona melhor no Android).
   Não é um despertador garantido do sistema; essa limitação é o preço de
   não termos backend nenhum (mantendo o app sem coleta de dados). */

const LEMBRETES_DEFAULT = [
  { id: 'laudes', titulo: 'Laudes', descricao: 'Oração da manhã', hora: '07:00' },
  { id: 'terco', titulo: 'Santo Terço', descricao: 'Um momento com Nossa Senhora', hora: '18:00' },
  { id: 'vesperas', titulo: 'Vésperas', descricao: 'Oração da tarde', hora: '18:30' },
  { id: 'completas', titulo: 'Completas', descricao: 'Antes de dormir', hora: '21:00' },
];

const LEMBRETES_KEY = 'minhaLiturgia:lembretes';
const LEMBRETES_DISPARO_KEY = 'minhaLiturgia:lembretesDisparo';
const lel = (id) => document.getElementById(id);

function carregarConfig() {
  let salvo = {};
  try { salvo = JSON.parse(localStorage.getItem(LEMBRETES_KEY) || '{}'); } catch (e) { salvo = {}; }
  const config = {};
  LEMBRETES_DEFAULT.forEach((item) => {
    config[item.id] = {
      enabled: !!(salvo[item.id] && salvo[item.id].enabled),
      hora: (salvo[item.id] && salvo[item.id].hora) || item.hora,
    };
  });
  return config;
}

function salvarConfig(config) {
  try { localStorage.setItem(LEMBRETES_KEY, JSON.stringify(config)); } catch (e) { /* sem storage disponível */ }
}

function carregarDisparos() {
  try { return JSON.parse(localStorage.getItem(LEMBRETES_DISPARO_KEY) || '{}'); } catch (e) { return {}; }
}

function marcarDisparado(id, hojeISO) {
  const disparos = carregarDisparos();
  disparos[id] = hojeISO;
  try { localStorage.setItem(LEMBRETES_DISPARO_KEY, JSON.stringify(disparos)); } catch (e) { /* sem storage disponível */ }
}

function suportaNotificacao() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

function dispararNotificacao(item) {
  const titulo = `🙏 ${item.titulo}`;
  const opcoes = { body: item.descricao, tag: 'minha-liturgia-lembrete-' + item.id, icon: 'icons/icon-192.png' };
  if (navigator.serviceWorker && navigator.serviceWorker.ready) {
    navigator.serviceWorker.ready.then((reg) => reg.showNotification(titulo, opcoes)).catch(() => {
      try { new Notification(titulo, opcoes); } catch (e) { /* sem suporte */ }
    });
  } else {
    try { new Notification(titulo, opcoes); } catch (e) { /* sem suporte */ }
  }
}

function verificarLembretes() {
  if (!suportaNotificacao() || Notification.permission !== 'granted') return;
  const config = carregarConfig();
  const disparos = carregarDisparos();
  const agora = new Date();
  const horaAtual = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
  const hojeISO = agora.toISOString().slice(0, 10);

  LEMBRETES_DEFAULT.forEach((item) => {
    const cfg = config[item.id];
    if (!cfg || !cfg.enabled) return;
    if (cfg.hora !== horaAtual) return;
    if (disparos[item.id] === hojeISO) return; // já disparou hoje
    dispararNotificacao(item);
    marcarDisparado(item.id, hojeISO);
  });
}

let verificadorIniciado = false;
function iniciarVerificadorLembretes() {
  if (verificadorIniciado) return;
  verificadorIniciado = true;
  verificarLembretes();
  setInterval(verificarLembretes, 30000);
}

/* ---------- Tela de configuração ---------- */

function atualizarStatusPermissao() {
  const btn = lel('lembretesPedirPermissaoBtn');
  const status = lel('lembretesStatus');
  if (!suportaNotificacao()) {
    btn.classList.add('hidden');
    status.textContent = 'Seu navegador não suporta notificações.';
    status.classList.remove('hidden');
    return;
  }
  if (Notification.permission === 'granted') {
    btn.classList.add('hidden');
    status.classList.add('hidden');
  } else if (Notification.permission === 'denied') {
    btn.classList.add('hidden');
    status.textContent = 'As notificações estão bloqueadas para este site nas configurações do navegador — os lembretes não vão aparecer até você permitir por lá.';
    status.classList.remove('hidden', 'error');
    status.classList.add('error');
  } else {
    btn.classList.remove('hidden');
    status.classList.add('hidden');
  }
}

function renderLembretesList() {
  const config = carregarConfig();
  const list = lel('lembretesList');
  list.innerHTML = '';

  LEMBRETES_DEFAULT.forEach((item) => {
    const cfg = config[item.id];
    const card = document.createElement('article');
    card.className = 'card lembrete-item';

    const info = document.createElement('div');
    info.className = 'lembrete-item-info';
    info.innerHTML = `<strong>${item.titulo}</strong><span class="eu-nota">${item.descricao}</span>`;

    const horaInput = document.createElement('input');
    horaInput.type = 'time';
    horaInput.value = cfg.hora;
    horaInput.className = 'lembrete-hora';
    horaInput.addEventListener('change', () => {
      const atual = carregarConfig();
      atual[item.id].hora = horaInput.value;
      salvarConfig(atual);
    });

    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'lembrete-toggle';
    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.checked = cfg.enabled;
    toggleInput.addEventListener('change', () => {
      if (toggleInput.checked && suportaNotificacao() && Notification.permission === 'default') {
        Notification.requestPermission().then((perm) => {
          atualizarStatusPermissao();
          if (perm !== 'granted') { toggleInput.checked = false; return; }
          const atual = carregarConfig();
          atual[item.id].enabled = true;
          salvarConfig(atual);
          iniciarVerificadorLembretes();
        });
        return;
      }
      if (toggleInput.checked && suportaNotificacao() && Notification.permission === 'denied') {
        toggleInput.checked = false;
        atualizarStatusPermissao();
        return;
      }
      const atual = carregarConfig();
      atual[item.id].enabled = toggleInput.checked;
      salvarConfig(atual);
      if (toggleInput.checked) iniciarVerificadorLembretes();
    });
    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(document.createElement('span')).className = 'lembrete-toggle-slider';

    card.appendChild(info);
    card.appendChild(horaInput);
    card.appendChild(toggleLabel);
    list.appendChild(card);
  });
}

function initLembretes() {
  atualizarStatusPermissao();
  renderLembretesList();
  lel('lembretesPedirPermissaoBtn').addEventListener('click', () => {
    Notification.requestPermission().then(() => {
      atualizarStatusPermissao();
      renderLembretesList();
    });
  });
}

window.MinhaLiturgiaLembretes = { initLembretes, iniciarVerificadorLembretes };
