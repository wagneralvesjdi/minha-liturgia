'use strict';

/* ---------- Via Sacra ---------- */
/* Via Sacra Tradicional — as catorze estações na sequência clássica
   rezada pela Igreja há séculos. A aclamação "Nós Vos adoramos, ó
   Cristo..." é fórmula tradicional de domínio público, repetida em
   toda Via Sacra católica. As meditações de cada estação são texto
   original escrito para este app, inspiradas na estrutura clássica
   de meditação (o que aconteceu, o que isso pede de mim, um pedido
   de graça) — não reproduzem nenhuma obra de terceiros.
   Outras Vias Sacras da paróquia (beneditina, das Santas Chagas)
   entram aos poucos, como modos adicionais. */

const SINAL_CRUZ_VS = 'Em nome do Pai, e do Filho, e do Espírito Santo. Amém.';
const ACLAMACAO_VS = 'Nós Vos adoramos, ó Cristo, e Vos bendizemos, porque, pela vossa Santa Cruz, remistes o mundo.';

const ESTACOES_TRADICIONAL = [
  {
    titulo: 'Jesus é Condenado à Morte',
    meditacao: 'Pilatos vê a inocência de Jesus, mas cede à pressão da multidão e o condena para agradar aos homens. Senhor, quantas vezes eu também calo a verdade ou faço o que é errado só para agradar aos outros? Dai-me a coragem de defender a justiça, mesmo quando isso me custar caro.',
  },
  {
    titulo: 'Jesus é Carregado com a Cruz',
    meditacao: 'Jesus recebe a cruz pesada e a abraça sem resistir, sabendo que ali está a salvação do mundo. Ensinai-me, Senhor, a receber as cruzes da minha vida não com revolta, mas com a confiança de que, unidas à Vossa, elas também se tornam caminho de vida.',
  },
  {
    titulo: 'Jesus Cai pela Primeira Vez',
    meditacao: 'Exausto e ferido, Jesus cai ao chão sob o peso da cruz e dos pecados do mundo. Quantas vezes eu caio nos mesmos pecados e me sinto sem forças para recomeçar? Dai-me, Senhor, a graça de me levantar sempre, confiando na Vossa misericórdia.',
  },
  {
    titulo: 'Jesus Encontra sua Mãe Santíssima',
    meditacao: 'No caminho do Calvário, os olhos de Jesus encontram os de Maria, que sofre em silêncio ao lado dele. Mãe de Deus, ensinai-me a permanecer fiel mesmo diante da dor, e a oferecer, como vós, o meu sofrimento unido ao de Cristo.',
  },
  {
    titulo: 'Simão Cirineu Ajuda Jesus a Carregar a Cruz',
    meditacao: 'Forçado a princípio, Simão acaba por dividir com Jesus o peso da cruz. Senhor, tantas vezes hesito em ajudar quem sofre ao meu redor. Dai-me um coração pronto a carregar, com alegria, a cruz do meu irmão.',
  },
  {
    titulo: 'Verônica Limpa o Rosto de Jesus',
    meditacao: 'Em meio ao desprezo da multidão, uma mulher se aproxima e, com um simples gesto de ternura, consola o rosto ferido de Jesus. Ensinai-me, Senhor, a ter coragem para praticar pequenos gestos de compaixão, mesmo quando isso for mal visto pelos outros.',
  },
  {
    titulo: 'Jesus Cai pela Segunda Vez',
    meditacao: 'Mais uma vez o corpo de Jesus desaba sob o peso da cruz, e mais uma vez Ele se levanta. Quando o desânimo insiste em voltar na minha vida, dai-me, Senhor, a mesma perseverança para continuar seguindo em frente.',
  },
  {
    titulo: 'Jesus Consola as Mulheres de Jerusalém',
    meditacao: 'Mesmo sofrendo, Jesus se volta para consolar quem chora por ele, pedindo que chorem antes por seus próprios pecados. Ensinai-me, Senhor, a não me fechar na minha própria dor, mas a ter olhos para o sofrimento e a conversão dos outros.',
  },
  {
    titulo: 'Jesus Cai pela Terceira Vez',
    meditacao: 'Já quase sem forças, Jesus cai uma última vez antes do Calvário. Senhor, quando eu sentir que já não aguento mais lutar contra o mesmo pecado, lembrai-me de que a Vossa graça é sempre suficiente para me levantar de novo.',
  },
  {
    titulo: 'Jesus é Despojado de suas Vestes',
    meditacao: 'Jesus é publicamente humilhado, despojado até das suas próprias roupas. Livrai-me, Senhor, do apego às coisas e à imagem que quero passar aos outros, e ensinai-me a verdadeira humildade que Vós me mostrastes.',
  },
  {
    titulo: 'Jesus é Pregado na Cruz',
    meditacao: 'As mãos que curaram e abençoaram são agora perfuradas por cravos. Jesus, cada pecado meu foi um desses cravos. Dai-me um coração verdadeiramente arrependido, capaz de mudar de vida por amor a Vós.',
  },
  {
    titulo: 'Jesus Morre na Cruz',
    meditacao: 'No alto da cruz, Jesus entrega o espírito ao Pai, consumando a Sua obra de amor por cada um de nós. Diante deste amor tão grande, Senhor, ensinai-me a não viver mais para mim mesmo, mas para Aquele que morreu e ressuscitou por mim.',
  },
  {
    titulo: 'Jesus é Descido da Cruz',
    meditacao: 'Maria recebe em seus braços o corpo sem vida do Filho, repetindo em silêncio o "sim" que disse desde a Anunciação. Mãe dolorosa, ensinai-me a confiar em Deus mesmo quando tudo parece perdido.',
  },
  {
    titulo: 'Jesus é Posto no Sepulcro',
    meditacao: 'O corpo de Jesus é envolto e colocado no sepulcro, e uma pedra fecha a entrada. Mas esse silêncio não é o fim: é a véspera da vida nova. Senhor, ensinai-me a esperar com fé, mesmo nos momentos em que pareceis estar ausente ou em silêncio.',
  },
];

function estacaoBloco(numero, estacao) {
  return [
    { tipo: 'misterio', texto: `${numero}ª Estação — ${estacao.titulo}`, sub: ACLAMACAO_VS },
    { tipo: 'oracao', label: 'Meditação', texto: estacao.meditacao },
    { tipo: 'nota', texto: 'Pai Nosso, Ave Maria e Glória ao Pai.' },
  ];
}

function buildViaSacraTradicional() {
  let blocos = [
    { tipo: 'nota', texto: 'Via Sacra Tradicional — as catorze estações do caminho de Jesus até o Calvário, na sequência clássica rezada pela Igreja.' },
    { tipo: 'oracao', label: 'Sinal da Cruz', texto: SINAL_CRUZ_VS },
  ];
  ESTACOES_TRADICIONAL.forEach((e, i) => { blocos = blocos.concat(estacaoBloco(i + 1, e)); });
  blocos.push({ tipo: 'oracao', label: 'Sinal da Cruz', texto: SINAL_CRUZ_VS });
  return blocos;
}

/* ---------- Renderização (mesma estrutura de leitura/narração guiada do Rosário) ---------- */

const vsel = (id) => document.getElementById(id);
let viaSacraBlocosAtual = [];

function viaSacraStepShow(step) {
  if (step !== 'reader' && window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
  ['modo', 'reader'].forEach((s) => {
    const el2 = vsel(`viasacra-step-${s}`);
    if (el2) el2.classList.toggle('hidden', s !== step);
  });
}

function renderViaSacraReader(titulo, blocos) {
  if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
  viaSacraBlocosAtual = blocos;
  vsel('viaSacraReaderTitle').textContent = titulo;
  const body = vsel('viaSacraBody');
  body.innerHTML = '';
  blocos.forEach((bloco, idx) => {
    const p = document.createElement('p');
    p.dataset.blocoIndex = idx;
    if (bloco.tipo === 'misterio') {
      p.className = 'eu-line eu-misterio';
      p.innerHTML = `<strong>${bloco.texto}</strong>${bloco.sub ? `<br><span class="eu-nota">${bloco.sub}</span>` : ''}`;
    } else if (bloco.tipo === 'oracao') {
      p.className = 'eu-line eu-sacerdote';
      p.innerHTML = `<span class="eu-label">${bloco.label}</span>${bloco.texto}`;
    } else {
      p.className = 'eu-line eu-nota';
      p.textContent = bloco.texto;
    }
    body.appendChild(p);
  });
  setViaSacraGuiadoLabel('idle', 0, blocos.length);
  viaSacraStepShow('reader');
  body.scrollIntoView({ block: 'start' });
}

function viaSacraTextoNarracao(bloco) {
  const texto = bloco.sub ? `${bloco.texto}. ${bloco.sub}` : bloco.texto;
  const textoFinal = bloco.label ? `${bloco.label}. ${texto}` : texto;
  return { text: textoFinal, audioUrl: bloco.audioUrl || null, repeat: bloco.vezes || 1 };
}

function setViaSacraGuiadoLabel(state, idx, total) {
  const btn = vsel('viaSacraGuiadoBtn');
  if (!btn) return;
  if (state === 'playing') btn.textContent = `⏸ Pausar (passo ${idx + 1} de ${total})`;
  else if (state === 'paused') btn.textContent = `▶ Continuar (passo ${idx + 1} de ${total})`;
  else btn.textContent = '🎧 Rezar guiado por áudio';
  vsel('viaSacraGuiadoNav').classList.toggle('hidden', state === 'idle');
}

function destacarBlocoViaSacra(idx) {
  const body = vsel('viaSacraBody');
  body.querySelectorAll('.bloco-atual').forEach((el) => el.classList.remove('bloco-atual'));
  const alvo = body.querySelector(`[data-bloco-index="${idx}"]`);
  if (alvo) {
    alvo.classList.add('bloco-atual');
    alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

let ultimoIndiceGuiadoViaSacra = 0;

function iniciarModoGuiadoViaSacra() {
  if (!window.MinhaLiturgiaNarration || !viaSacraBlocosAtual.length) return;
  const btn = vsel('viaSacraGuiadoBtn');
  if (window.MinhaLiturgiaNarration.queueActive(btn)) {
    window.MinhaLiturgiaNarration.playQueue(btn, null);
    const pausado = typeof speechSynthesis !== 'undefined' && speechSynthesis.paused;
    setViaSacraGuiadoLabel(pausado ? 'paused' : 'playing', ultimoIndiceGuiadoViaSacra, viaSacraBlocosAtual.length);
    return;
  }
  const textos = viaSacraBlocosAtual.map(viaSacraTextoNarracao);
  window.MinhaLiturgiaNarration.playQueue(btn, textos, {
    onItemChange: (idx, total) => {
      ultimoIndiceGuiadoViaSacra = idx;
      setViaSacraGuiadoLabel('playing', idx, total);
      destacarBlocoViaSacra(idx);
    },
    onEnd: () => {
      ultimoIndiceGuiadoViaSacra = 0;
      setViaSacraGuiadoLabel('idle', 0, viaSacraBlocosAtual.length);
      const body = vsel('viaSacraBody');
      body.querySelectorAll('.bloco-atual').forEach((el) => el.classList.remove('bloco-atual'));
    },
  });
}

function guiadoPularViaSacra(delta) {
  if (!window.MinhaLiturgiaNarration) return;
  const btn = vsel('viaSacraGuiadoBtn');
  if (!window.MinhaLiturgiaNarration.queueActive(btn)) return;
  window.MinhaLiturgiaNarration.queueGoTo(ultimoIndiceGuiadoViaSacra + delta);
}

function initViaSacra() {
  vsel('goViaSacraTradicional').addEventListener('click', () => {
    renderViaSacraReader('Via Sacra Tradicional', buildViaSacraTradicional());
  });
  document.querySelectorAll('[data-back-to="viasacra-modo"]').forEach((b) => {
    b.addEventListener('click', () => viaSacraStepShow('modo'));
  });
  vsel('viaSacraGuiadoBtn').addEventListener('click', iniciarModoGuiadoViaSacra);
  vsel('viaSacraGuiadoAnterior').addEventListener('click', () => guiadoPularViaSacra(-1));
  vsel('viaSacraGuiadoProximo').addEventListener('click', () => guiadoPularViaSacra(1));
}

window.MinhaLiturgiaViaSacra = { initViaSacra };
