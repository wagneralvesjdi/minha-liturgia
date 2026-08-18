'use strict';

/* ---------- Apoio à Homilia ---------- */
/* Monta, a partir das leituras do dia já carregadas em "Liturgia do Dia",
   uma reflexão contínua (texto corrido, sem divisões em blocos cronometrados)
   para o ministro preparar uma homilia de cerca de 15 minutos, e sugere
   parágrafos do Catecismo relacionados aos temas presentes nas leituras.
   Não gera um texto pronto de homilia: o conteúdo teológico específico
   continua sendo responsabilidade do sacerdote ou ministro — o app oferece
   apenas um roteiro de reflexão e referências para aprofundamento. */

const CANON_767 = 'Cân. 767 §1-§2 do Código de Direito Canônico: "Entre as formas de pregação, ocupa lugar eminente a homilia, que é parte da própria liturgia [...]; nela, ao longo do ano litúrgico, se expõem, a partir do texto sagrado, os mistérios da fé e as normas de vida cristã. Nas missas celebradas aos domingos e dias festivos de preceito com participação do povo, deve haver homilia e não pode ser omitida a não ser por causa grave."';

const TEMAS_CATECISMO = [
  'fé', 'esperança', 'caridade', 'amor', 'perdão', 'misericórdia', 'batismo',
  'eucaristia', 'oração', 'conversão', 'pecado', 'graça', 'salvação',
  'ressurreição', 'cruz', 'sofrimento', 'paz', 'alegria', 'humildade',
  'obediência', 'fidelidade', 'família', 'casamento', 'pobres', 'justiça',
  'verdade', 'liberdade', 'vocação', 'discípulo', 'reino de deus', 'igreja',
  'espírito santo', 'trindade', 'encarnação', 'maria', 'virgem', 'anjos',
  'milagre', 'cura', 'jejum', 'penitência', 'confissão', 'comunhão',
  'sacerdócio', 'vida eterna', 'juízo', 'céu', 'glória', 'servir',
  'testemunho', 'unidade', 'comunidade', 'palavra de deus', 'luz',
  'caminho', 'semente', 'pão', 'vinha', 'pastor', 'ovelha',
];

function normalizeText(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function leituraTexto(item) {
  if (!item) return '';
  return [item.titulo, item.texto].filter(Boolean).join('\n\n');
}

function extrairTextos(apiData) {
  const leituras = apiData.leituras || {};
  const salmoSelecionado = pickOption(leituras.salmo, selectedReadingIndex.salmo);
  return {
    primeira: leituraTexto(pickOption(leituras.primeiraLeitura, selectedReadingIndex.primeira)),
    salmo: salmoSelecionado ? (salmoSelecionado.texto || '') : '',
    segunda: leituraTexto(pickOption(leituras.segundaLeitura, selectedReadingIndex.segunda)),
    evangelho: leituraTexto(pickOption(leituras.evangelho, selectedReadingIndex.evangelho)),
  };
}

function extrairTemas(apiData) {
  const textos = extrairTextos(apiData);
  const textoTotal = normalizeText(Object.values(textos).join(' '));
  return TEMAS_CATECISMO.filter((tema) => temaNoTexto(tema, textoTotal));
}

function temaNoTexto(tema, textoNormalizado) {
  const q = normalizeText(tema).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${q}\\b`).test(textoNormalizado);
}

function sugestoesCatecismo(temas) {
  if (!window.MinhaLiturgiaCatechism) return [];
  const vistos = new Set();
  const sugestoes = [];
  temas.forEach((tema) => {
    if (sugestoes.length >= 6) return;
    const { grupos } = window.MinhaLiturgiaCatechism.searchCatechism(tema);
    grupos
      .filter((g) => temaNoTexto(tema, normalizeText(g.titulo)))
      .forEach((g) => {
        if (vistos.has(g.slug) || sugestoes.length >= 6) return;
        vistos.add(g.slug);
        sugestoes.push(g);
      });
  });
  return sugestoes;
}

function citarTrecho(texto, max) {
  if (!texto) return '';
  const t = texto.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  const corte = t.slice(0, max);
  const ultimoEspaco = corte.lastIndexOf(' ');
  return corte.slice(0, ultimoEspaco > 0 ? ultimoEspaco : max).trim() + '…';
}

/* ---------- Reflexão contínua ---------- */
/* Retorna um array de parágrafos de texto corrido (sem títulos nem blocos
   cronometrados) — usado tanto na tela quanto na geração do PDF. */
function gerarReflexaoParagrafos(apiData, info) {
  const textos = extrairTextos(apiData);
  const tituloLit = apiData.liturgia || 'a liturgia de hoje';
  const paragrafos = [];

  paragrafos.push(
    `A celebração de hoje — ${tituloLit}, no ${(info.liturgicalYearLabel || '').toLowerCase()} — reúne leituras que, juntas, apontam para uma só mensagem. Antes de escrever a homilia, vale reler os textos seguidos, em silêncio, e perguntar: qual é o fio que os une? É essa pergunta que deve guiar toda a preparação, e não o desejo de comentar tudo o que cada trecho permitiria dizer.`
  );

  if (textos.primeira) {
    paragrafos.push(
      `A Primeira Leitura abre o caminho: "${citarTrecho(textos.primeira, 220)}" Esse texto revela algo sobre quem é Deus e como Ele age na história de seu povo — vale perguntar-se o que essa ação divina tem a dizer à comunidade que hoje a escuta, e que contexto histórico ajuda a compreendê-la com mais profundidade.`
    );
  }

  if (textos.salmo) {
    paragrafos.push(
      `O Salmo Responsorial é a resposta orante do povo a essa Palavra: "${citarTrecho(textos.salmo, 160)}" Mais do que uma pausa entre as leituras, ele é uma ponte, e pode ser retomado na homilia como eco do que a Primeira Leitura revelou, sem repetir o que já foi dito.`
    );
  }

  if (textos.segunda) {
    paragrafos.push(
      `A Segunda Leitura traz um ensinamento apostólico: "${citarTrecho(textos.segunda, 220)}" Nem sempre está diretamente ligada às outras leituras do dia — por isso vale cuidado para não forçar uma conexão artificial; se o texto não dialogar naturalmente com o fio condutor escolhido, é legítimo dar a ele menos peso na homilia.`
    );
  }

  if (textos.evangelho) {
    paragrafos.push(
      `O Evangelho é o coração da celebração: "${citarTrecho(textos.evangelho, 260)}" Qual é a ação de Jesus nesse trecho? Que convite, implícito ou explícito, ele dirige a quem ouve hoje? É a partir dessa pergunta que nasce o fio condutor da homilia — uma única ideia central, capaz de amarrar as leituras entre si sem dispersar a atenção da assembleia.`
    );
  }

  paragrafos.push(
    `Escolhido o fio condutor, a homilia ganha força quando desce à vida concreta: um exemplo da família, do trabalho, da comunidade — algo que a assembleia reconheça no seu dia a dia e que ilumine, à luz do texto, o que ainda está por converter ou agradecer. ${CANON_767}`
  );

  paragrafos.push(
    `Para fechar, um convite breve e prático — algo que cada pessoa possa levar consigo e viver ainda esta semana — costuma valer mais do que um resumo do que já foi dito. Uma homilia de cerca de 15 minutos não precisa esgotar o texto: precisa abrir uma porta.`
  );

  return paragrafos;
}

const hel = (id) => document.getElementById(id);

function renderHomilia() {
  const body = hel('homiliaBody');
  body.innerHTML = '';

  const atual = window.MinhaLiturgiaCurrentLiturgy ? window.MinhaLiturgiaCurrentLiturgy() : null;
  if (!atual) {
    const p = document.createElement('p');
    p.className = 'status';
    p.textContent = 'Primeiro escolha uma data em "Liturgia do Dia" para gerar a reflexão de apoio à homilia com as leituras daquele dia.';
    body.appendChild(p);
    const btn = document.createElement('button');
    btn.className = 'btn primary';
    btn.textContent = 'Ir para Liturgia do Dia';
    btn.addEventListener('click', () => window.MinhaLiturgiaShowView('liturgia'));
    body.appendChild(btn);
    return;
  }

  const { date, apiData, info } = atual;

  const header = document.createElement('div');
  header.className = 'card liturgy-header';
  header.innerHTML = `<h2>Apoio à Homilia</h2><p class="date-line">${apiData.liturgia || 'Liturgia do dia'} — ${date.toLocaleDateString('pt-BR')}</p><p class="cycle-line">${info ? info.liturgicalYearLabel : ''}</p>`;
  body.appendChild(header);

  const intro = document.createElement('p');
  intro.className = 'fieis-note';
  intro.textContent = 'Reflexão contínua para preparar uma homilia de cerca de 15 minutos, com base nas leituras de hoje. O conteúdo teológico de cada parte continua sendo preparado pelo ministro.';
  body.appendChild(intro);

  const art = document.createElement('article');
  art.className = 'card section';
  const paragrafos = gerarReflexaoParagrafos(apiData, info);
  paragrafos.forEach((texto) => {
    const p = document.createElement('p');
    p.className = 'reflexao-text';
    p.textContent = texto;
    art.appendChild(p);
  });
  body.appendChild(art);

  const pdfBtn = document.createElement('button');
  pdfBtn.className = 'btn primary';
  pdfBtn.textContent = 'Baixar PDF da Celebração Completa';
  pdfBtn.addEventListener('click', () => {
    if (window.MinhaLiturgiaPDF) window.MinhaLiturgiaPDF.gerarPdfCelebracao();
  });
  body.appendChild(pdfBtn);

  const temas = extrairTemas(apiData);
  const sugestoes = sugestoesCatecismo(temas);
  if (sugestoes.length) {
    const artCic = document.createElement('article');
    artCic.className = 'card section';
    const h3 = document.createElement('h3');
    h3.textContent = 'Aprofundamento no Catecismo';
    artCic.appendChild(h3);
    const p = document.createElement('p');
    p.className = 'eu-nota';
    p.textContent = `Temas identificados nas leituras de hoje: ${temas.join(', ')}.`;
    artCic.appendChild(p);
    const list = document.createElement('div');
    list.className = 'book-list';
    sugestoes.forEach((g) => {
      const btn = document.createElement('button');
      btn.className = 'book-btn';
      const faixa = g.paragrafos.length ? `§§ ${g.paragrafos[0]}–${g.paragrafos[g.paragrafos.length - 1]}` : '';
      btn.innerHTML = `<span>${g.titulo}</span><small>${faixa}</small>`;
      btn.addEventListener('click', () => {
        window.MinhaLiturgiaShowView('catecismo');
        window.MinhaLiturgiaCatechism.openGroup(g.slug);
      });
      list.appendChild(btn);
    });
    artCic.appendChild(list);
    body.appendChild(artCic);
  }
}

window.MinhaLiturgiaHomilia = { renderHomilia, gerarReflexaoParagrafos, extrairTextos };
