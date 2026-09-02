'use strict';

/* ---------- Liturgia das Horas (versão devocional) ---------- */
/* Esta NÃO é a tradução oficial do Ofício Divino (protegida pela CNBB/
   Paulus) — é uma estrutura própria de oração para os 5 momentos do dia,
   inspirada na Liturgia das Horas, usando salmos e cânticos da nossa
   própria Bíblia (Ave Maria) e orações tradicionais de domínio público
   (Pai Nosso, Salve Rainha). Quem quiser o Ofício Divino oficial completo
   pode usar o aplicativo oficial da CNBB. */

const PAI_NOSSO = 'Pai Nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação; mas livrai-nos do mal. Amém.';

const SALVE_RAINHA = 'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo.';

const HORAS = [
  {
    id: 'oficio',
    titulo: 'Ofício e Invitatório',
    subtitulo: 'Ao acordar',
    versiculoAbertura: ['Senhor, abri os meus lábios.', 'E a minha boca proclamará o vosso louvor.'],
    salmos: [{ livro: 'Salmos', capitulo: 94, versIni: 1, versFim: 11, titulo: 'Salmo 94 — Vinde, exultemos de alegria' }],
    cantico: null,
    leituraBreve: null,
    preces: [
      'Abri, Senhor, o meu coração para este novo dia que começa.',
      'Dai-me a graça de vos buscar em tudo o que eu fizer.',
      'Guardai-me do mal e conduzi os meus passos.',
    ],
    oracao: 'fixa',
    oracaoTexto: 'Deus eterno e todo-poderoso, que nos fazeis chegar ao início deste dia: guardai-nos hoje com o vosso poder, para que não caiamos em nenhum pecado, mas que todos os nossos pensamentos, palavras e ações se dirijam sempre a cumprir a vossa vontade. Por Cristo, nosso Senhor.',
    versiculoFinal: ['Bendigamos ao Senhor.', 'Graças a Deus.'],
  },
  {
    id: 'laudes',
    titulo: 'Laudes',
    subtitulo: 'Oração da manhã',
    versiculoAbertura: ['Ó Deus, vinde em meu auxílio.', 'Senhor, apressai-vos em me socorrer.'],
    salmos: [
      { livro: 'Salmos', capitulo: 62, versIni: 1, versFim: 9, titulo: 'Salmo 62 — A alma sedenta de Deus' },
      { livro: 'Salmos', capitulo: 150, versIni: 1, versFim: 5, titulo: 'Salmo 150 — Louvai o Senhor' },
    ],
    cantico: { livro: 'São Lucas', capitulo: 1, versIni: 68, versFim: 79, nome: 'Cântico de Zacarias (Benedictus)' },
    leituraBreve: null,
    preces: [
      'Que este dia seja todo vosso, Senhor: nossas palavras, nosso trabalho, nosso descanso.',
      'Abençoai as pessoas que vamos encontrar hoje.',
      'Dai luz a quem decide, força a quem trabalha, consolo a quem sofre.',
    ],
    oracao: 'coleta',
    oracaoTexto: 'Deus, nosso Pai, que fazeis nascer o sol sobre todos: iluminai este dia com a vossa presença, e que tudo o que fizermos seja para a vossa glória e o bem de todos. Por Cristo, nosso Senhor.',
    versiculoFinal: ['O Senhor nos abençoe, nos livre de todo mal e nos conduza à vida eterna.', 'Amém.'],
  },
  {
    id: 'horamedia',
    titulo: 'Hora Média',
    subtitulo: 'Ao meio-dia',
    versiculoAbertura: ['Ó Deus, vinde em meu auxílio.', 'Senhor, apressai-vos em me socorrer.'],
    salmos: [{ livro: 'Salmos', capitulo: 66, versIni: 1, versFim: 8, titulo: 'Salmo 66 — Que os povos vos louvem' }],
    cantico: null,
    leituraBreve: { livro: 'São Mateus', capitulo: 11, versIni: 28, versFim: 30, referencia: 'Mt 11,28-30' },
    preces: [
      'No meio deste dia, paramos um instante para lembrar de vós, Senhor.',
      'Renovai as nossas forças para o que ainda falta hoje.',
    ],
    oracao: 'fixa',
    oracaoTexto: 'Senhor, no calor deste dia, socorrei-nos com o orvalho do vosso Espírito Santo, e ajudai-nos a levar com paz o que ainda temos pela frente. Por Cristo, nosso Senhor.',
    versiculoFinal: ['Bendigamos ao Senhor.', 'Graças a Deus.'],
  },
  {
    id: 'vesperas',
    titulo: 'Vésperas',
    subtitulo: 'Oração da tarde',
    versiculoAbertura: ['Ó Deus, vinde em meu auxílio.', 'Senhor, apressai-vos em me socorrer.'],
    salmos: [{ livro: 'Salmos', capitulo: 140, versIni: 1, versFim: 8, titulo: 'Salmo 140 — Como incenso, suba a minha oração' }],
    cantico: { livro: 'São Lucas', capitulo: 1, versIni: 46, versFim: 55, nome: 'Cântico de Maria (Magnificat)' },
    leituraBreve: null,
    preces: [
      'Ao cair da tarde, agradecemos por este dia que vos pertence, Senhor.',
      'Perdoai o que fizemos de errado e recebei o pouco que fizemos de bem.',
      'Cuidai de quem amamos e de quem já não está mais entre nós.',
    ],
    oracao: 'coleta',
    oracaoTexto: 'Senhor, ao entardecer deste dia, recebei o nosso louvor: perdoai as nossas faltas, e que a noite que se aproxima nos encontre em paz convosco e com todos. Por Cristo, nosso Senhor.',
    versiculoFinal: ['O Senhor nos dê uma noite tranquila e um bom fim.', 'Amém.'],
  },
  {
    id: 'completas',
    titulo: 'Completas',
    subtitulo: 'Antes de dormir',
    versiculoAbertura: ['Ó Deus, vinde em meu auxílio.', 'Senhor, apressai-vos em me socorrer.'],
    salmos: [{ livro: 'Salmos', capitulo: 4, versIni: 1, versFim: 9, titulo: 'Salmo 4 — Deitar-me-ei em paz' }],
    cantico: { livro: 'São Lucas', capitulo: 2, versIni: 29, versFim: 32, nome: 'Cântico de Simeão (Nunc Dimittis)' },
    leituraBreve: null,
    preces: [
      'Senhor, examino este dia diante de vós, com tudo o que fiz de bom e de errado.',
      'Perdoai as minhas faltas e recebei o que ofereci de coração.',
      'Guardai o meu sono e o de quem eu amo, nesta noite.',
    ],
    oracao: 'fixa',
    oracaoTexto: 'Visitai, Senhor, esta casa e afastai dela todas as ciladas do inimigo. Que os vossos santos anjos aqui habitem e nos guardem em paz, e que a vossa bênção esteja sempre sobre nós. Por Cristo, nosso Senhor.',
    versiculoFinal: null,
    antifonaMariana: { titulo: 'Salve Rainha', texto: SALVE_RAINHA },
  },
];

const lhel = (id) => document.getElementById(id);

let ultimaHoraId = null;
let ultimaHoraNarracao = '';

function lhStepShow(step) {
  if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
  ['home', 'leitura'].forEach((s) => {
    const el = lhel(`lh-step-${s}`);
    if (el) el.classList.toggle('hidden', s !== step);
  });
}

function renderHomeList() {
  const list = lhel('lhHorasList');
  list.innerHTML = '';
  HORAS.forEach((hora) => {
    const btn = document.createElement('button');
    btn.className = 'book-btn';
    btn.innerHTML = `<span>${hora.titulo}</span><small>${hora.subtitulo}</small>`;
    btn.addEventListener('click', () => abrirHora(hora.id));
    list.appendChild(btn);
  });
}

function coletaDoDia() {
  if (window.MinhaLiturgiaCurrentLiturgy) {
    const atual = window.MinhaLiturgiaCurrentLiturgy();
    if (atual && atual.apiData && atual.apiData.oracoes && atual.apiData.oracoes.coleta) {
      return atual.apiData.oracoes.coleta;
    }
  }
  return null;
}

async function abrirHora(id) {
  const hora = HORAS.find((h) => h.id === id);
  if (!hora) return;
  if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
  ultimaHoraId = id;
  ultimaHoraNarracao = '';

  lhStepShow('leitura');
  lhel('lhReaderTitle').textContent = hora.titulo;
  lhel('lhReaderSubtitle').textContent = hora.subtitulo;

  const body = lhel('lhBody');
  body.innerHTML = '';
  const narrPartes = [`${hora.titulo}, ${hora.subtitulo}.`];

  function addBloco(tituloTexto, className) {
    const article = document.createElement('article');
    article.className = 'card section' + (className ? ' ' + className : '');
    if (tituloTexto) {
      const h = document.createElement('h3');
      h.textContent = tituloTexto;
      article.appendChild(h);
    }
    body.appendChild(article);
    return article;
  }

  // Versículo de abertura
  const versEl = addBloco(null);
  const vLine = document.createElement('p');
  vLine.className = 'reference';
  vLine.textContent = `℣. ${hora.versiculoAbertura[0]}`;
  const rLine = document.createElement('p');
  rLine.className = 'prayer-text';
  rLine.textContent = `℟. ${hora.versiculoAbertura[1]}`;
  versEl.appendChild(vLine);
  versEl.appendChild(rLine);
  narrPartes.push(`${hora.versiculoAbertura[0]} ${hora.versiculoAbertura[1]}`);

  // Salmos
  if (window.MinhaLiturgiaBible) await window.MinhaLiturgiaBible.loadBible().catch(() => {});
  for (const salmo of hora.salmos) {
    const salmoEl = addBloco(salmo.titulo);
    const resultado = window.MinhaLiturgiaBible
      ? await window.MinhaLiturgiaBible.getPassageVerses(salmo.livro, salmo.capitulo, salmo.versIni, salmo.versFim)
      : null;
    if (resultado) {
      const list = document.createElement('div');
      list.className = 'verse-list';
      resultado.versiculos.forEach((v) => {
        const p = document.createElement('p');
        p.className = 'verse';
        const num = document.createElement('span');
        num.className = 'verse-num';
        num.textContent = v.numero;
        p.appendChild(num);
        p.appendChild(document.createTextNode(' ' + v.texto));
        list.appendChild(p);
      });
      salmoEl.appendChild(list);
      narrPartes.push(`${salmo.titulo}. ${resultado.versiculos.map((v) => v.texto).join(' ')}`);
    } else {
      const p = document.createElement('p');
      p.className = 'status error';
      p.textContent = 'Não foi possível carregar este salmo agora.';
      salmoEl.appendChild(p);
    }
  }

  // Cântico
  if (hora.cantico) {
    const c = hora.cantico;
    const canticoEl = addBloco(c.nome);
    const resultado = window.MinhaLiturgiaBible
      ? await window.MinhaLiturgiaBible.getPassageVerses(c.livro, c.capitulo, c.versIni, c.versFim)
      : null;
    if (resultado) {
      const list = document.createElement('div');
      list.className = 'verse-list';
      resultado.versiculos.forEach((v) => {
        const p = document.createElement('p');
        p.className = 'verse';
        const num = document.createElement('span');
        num.className = 'verse-num';
        num.textContent = v.numero;
        p.appendChild(num);
        p.appendChild(document.createTextNode(' ' + v.texto));
        list.appendChild(p);
      });
      canticoEl.appendChild(list);
      narrPartes.push(`${c.nome}. ${resultado.versiculos.map((v) => v.texto).join(' ')}`);
    }
  }

  // Leitura breve
  if (hora.leituraBreve) {
    const lb = hora.leituraBreve;
    const leituraEl = addBloco('Leitura Breve');
    const resultado = window.MinhaLiturgiaBible
      ? await window.MinhaLiturgiaBible.getPassageVerses(lb.livro, lb.capitulo, lb.versIni, lb.versFim)
      : null;
    if (resultado) {
      const ref = document.createElement('p');
      ref.className = 'reference';
      ref.textContent = lb.referencia;
      const texto = document.createElement('p');
      texto.className = 'reading-text';
      texto.textContent = resultado.versiculos.map((v) => v.texto).join(' ');
      leituraEl.appendChild(ref);
      leituraEl.appendChild(texto);
      narrPartes.push(`Leitura breve, ${lb.referencia}. ${resultado.versiculos.map((v) => v.texto).join(' ')}`);
    }
  }

  // Preces
  const precesEl = addBloco('Preces');
  hora.preces.forEach((linha) => {
    const p = document.createElement('p');
    p.className = 'prayer-text';
    p.textContent = linha;
    precesEl.appendChild(p);
  });
  narrPartes.push(`Preces. ${hora.preces.join(' ')}`);

  // Pai Nosso
  const paiNossoEl = addBloco('Pai Nosso');
  const paiNossoP = document.createElement('p');
  paiNossoP.className = 'prayer-text';
  paiNossoP.textContent = PAI_NOSSO;
  paiNossoEl.appendChild(paiNossoP);
  narrPartes.push(PAI_NOSSO);

  // Oração final
  const oracaoTexto = hora.oracao === 'coleta' ? (coletaDoDia() || hora.oracaoTexto) : hora.oracaoTexto;
  const oracaoEl = addBloco('Oração');
  const oracaoP = document.createElement('p');
  oracaoP.className = 'prayer-text';
  oracaoP.textContent = oracaoTexto;
  oracaoEl.appendChild(oracaoP);
  narrPartes.push(`Oração. ${oracaoTexto}`);

  // Antífona mariana (Completas) ou versículo final
  if (hora.antifonaMariana) {
    const antEl = addBloco(hora.antifonaMariana.titulo);
    const antP = document.createElement('p');
    antP.className = 'prayer-text';
    antP.textContent = hora.antifonaMariana.texto;
    antEl.appendChild(antP);
    narrPartes.push(`${hora.antifonaMariana.titulo}. ${hora.antifonaMariana.texto}`);
  } else if (hora.versiculoFinal) {
    const finalEl = addBloco(null);
    const fv = document.createElement('p');
    fv.className = 'reference';
    fv.textContent = `℣. ${hora.versiculoFinal[0]}`;
    const fr = document.createElement('p');
    fr.className = 'prayer-text';
    fr.textContent = `℟. ${hora.versiculoFinal[1]}`;
    finalEl.appendChild(fv);
    finalEl.appendChild(fr);
    narrPartes.push(`${hora.versiculoFinal[0]} ${hora.versiculoFinal[1]}`);
  }

  ultimaHoraNarracao = narrPartes.join(' ');
  body.scrollIntoView({ block: 'start' });
}

function initLiturgiaDasHoras() {
  renderHomeList();
  document.querySelectorAll('[data-back-to="lh-home"]').forEach((b) => b.addEventListener('click', () => lhStepShow('home')));
  lhel('narrateLhBtn').addEventListener('click', () => {
    if (window.MinhaLiturgiaNarration) {
      window.MinhaLiturgiaNarration.toggle(lhel('narrateLhBtn'), () => ultimaHoraNarracao);
    }
  });
}

window.MinhaLiturgiaDasHoras = { initLiturgiaDasHoras };
