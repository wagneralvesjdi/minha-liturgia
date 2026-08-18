'use strict';

/* ---------- Santo Terço / Rosário ---------- */
/* Seis modalidades: Terço (um só mistério), Rosário Completo (os quatro
   mistérios seguidos), Terço da Misericórdia, Terço de São Miguel Arcanjo,
   Terço do Rosário da Libertação e Terço das Santas Chagas. Os quatro
   grupos de mistérios (Gozosos, Dolorosos, Gloriosos, Luminosos) com seus
   frutos espirituais, e as orações fixas do Rosário segundo a tradição
   católica. O Terço do Rosário da Libertação usa meditações originais
   escritas para este app; os demais reproduzem devoções tradicionais de
   domínio público. */

const ORACOES = {
  sinalCruz: 'Em nome do Pai, e do Filho, e do Espírito Santo. Amém.',
  credo: 'Creio em Deus Pai todo-poderoso, Criador do Céu e da Terra; e em Jesus Cristo, seu único Filho, Nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado, desceu à mansão dos mortos, ressuscitou ao terceiro dia, subiu aos Céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.',
  paiNosso: 'Pai Nosso que estais nos Céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no Céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação; mas livrai-nos do mal. Amém.',
  aveMaria: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.',
  gloria: 'Glória ao Pai, e ao Filho, e ao Espírito Santo. Assim como era no princípio, agora e sempre. Amém.',
  fatima: 'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu, principalmente as que mais precisarem.',
  salveRainha: 'Salve, Rainha, Mãe de misericórdia, vida, doçura, esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria!',
  oracaoFinalRosario: 'Ó Deus, cujo Filho unigênito, por sua vida, morte e ressurreição, nos alcançou os prêmios da vida eterna, concedei-nos, nós vo-lo pedimos, que, meditando estes mistérios do Santíssimo Rosário da Virgem Maria, imitemos o que eles contêm e alcancemos o que eles prometem. Por Cristo, nosso Senhor. Amém.',
  oferecimento: 'Ó meu Deus, eu Vos ofereço este terço que vou rezar, meditando os mistérios de nossa Redenção, para glória de Deus, honra da Virgem Maria e proveito de minha alma. Concedei-me, por este terço, fé viva, esperança firme e caridade ardente; arrependimento verdadeiro dos meus pecados; a imitação fiel das virtudes de Jesus e de Maria; e a graça de perseverar até o fim. Amém.',
  acaoDeGracas: 'Agradecemos-Vos, ó Deus, pela graça de termos rezado este terço em louvor a Vós e em honra de Nossa Senhora. Que os mistérios aqui meditados permaneçam vivos em nosso coração, e que Maria, nossa Mãe, nos conduza sempre mais perto de Jesus, seu Filho. Por Cristo, nosso Senhor. Amém.',
  ofertaMisericordia: 'Eterno Pai, eu Vos ofereço o Corpo e Sangue, a Alma e Divindade de vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro.',
  pedidoMisericordia: 'Pela sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.',
  santoImortal: 'Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e de todo o mundo.',
  confioEmVos: 'Ó Sangue e Água que jorrastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós!',
  oracaoSaoMiguel: 'São Miguel Arcanjo, defendei-nos no combate; sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos; e vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a satanás e a todos os espíritos malignos, que andam pelo mundo para perder as almas. Amém.',
  ofertaChagas: 'Eterno Pai, eu Vos ofereço as Chagas de Nosso Senhor Jesus Cristo, para curar as chagas de nossas almas.',
  pedidoChagas: 'Meu Jesus, perdão e misericórdia, pelos méritos de vossas Santas Chagas.',
};

const MISTERIOS = {
  gozosos: {
    nome: 'Mistérios Gozosos',
    dias: 'Rezados às segundas-feiras e aos sábados',
    lista: [
      { titulo: 'A Anunciação do Anjo Gabriel a Maria', fruto: 'Fruto: a humildade' },
      { titulo: 'A Visitação de Maria à sua prima Isabel', fruto: 'Fruto: a caridade fraterna' },
      { titulo: 'O Nascimento de Jesus em Belém', fruto: 'Fruto: o desapego dos bens materiais' },
      { titulo: 'A Apresentação do Menino Jesus no Templo', fruto: 'Fruto: a obediência' },
      { titulo: 'O Encontro do Menino Jesus no Templo, entre os doutores', fruto: 'Fruto: a busca constante de Deus' },
    ],
  },
  dolorosos: {
    nome: 'Mistérios Dolorosos',
    dias: 'Rezados às terças-feiras e sextas-feiras',
    lista: [
      { titulo: 'A Agonia de Jesus no Horto das Oliveiras', fruto: 'Fruto: a contrição pelos nossos pecados' },
      { titulo: 'A Flagelação de Jesus', fruto: 'Fruto: a pureza' },
      { titulo: 'A Coroação de Espinhos', fruto: 'Fruto: a humildade e o desprezo do mundo' },
      { titulo: 'Jesus carrega a Cruz a caminho do Calvário', fruto: 'Fruto: a paciência nas provações' },
      { titulo: 'A Crucificação e Morte de Jesus', fruto: 'Fruto: a perseverança final' },
    ],
  },
  gloriosos: {
    nome: 'Mistérios Gloriosos',
    dias: 'Rezados às quartas-feiras e domingos',
    lista: [
      { titulo: 'A Ressurreição de Jesus', fruto: 'Fruto: a fé' },
      { titulo: 'A Ascensão de Jesus ao Céu', fruto: 'Fruto: a esperança' },
      { titulo: 'A Descida do Espírito Santo sobre os Apóstolos, em Pentecostes', fruto: 'Fruto: o zelo pelas almas' },
      { titulo: 'A Assunção de Nossa Senhora ao Céu', fruto: 'Fruto: a devoção a Maria' },
      { titulo: 'A Coroação de Nossa Senhora como Rainha do Céu e da Terra', fruto: 'Fruto: a perseverança na graça' },
    ],
  },
  luminosos: {
    nome: 'Mistérios Luminosos',
    dias: 'Rezados às quintas-feiras',
    lista: [
      { titulo: 'O Batismo de Jesus no Rio Jordão', fruto: 'Fruto: a fidelidade às promessas do Batismo' },
      { titulo: 'As Bodas de Caná', fruto: 'Fruto: a confiança na intercessão de Maria' },
      { titulo: 'O Anúncio do Reino de Deus, com o convite à conversão', fruto: 'Fruto: a conversão do coração' },
      { titulo: 'A Transfiguração de Jesus', fruto: 'Fruto: o desejo de santidade' },
      { titulo: 'A Instituição da Eucaristia', fruto: 'Fruto: a adoração e o amor à Eucaristia' },
    ],
  },
};

const COROS_ANJOS = [
  { nome: 'Serafins', graca: 'sejamos abrasados pelo fogo da caridade perfeita' },
  { nome: 'Querubins', graca: 'nos seja concedida a graça de deixar os caminhos do pecado e correr pelas veredas da perfeição cristã' },
  { nome: 'Tronos', graca: 'seja infundido em nossos corações um espírito verdadeiro e sincero de humildade' },
  { nome: 'Dominações', graca: 'nos seja dada a graça de governar os nossos sentidos e vencer qualquer paixão desregrada' },
  { nome: 'Potestades', graca: 'sejam protegidas as nossas almas contra as ciladas e tentações do demônio' },
  { nome: 'Virtudes', graca: 'sejamos preservados do mal e de cair em tentação, e jamais abusemos da graça de Deus' },
  { nome: 'Principados', graca: 'sejam cheias as nossas almas de um verdadeiro espírito de obediência' },
  { nome: 'Arcanjos', graca: 'nos seja dada a perseverança na fé e em todas as boas obras, até alcançarmos a glória do Céu' },
  { nome: 'Anjos', graca: 'sejamos protegidos por eles nesta vida mortal e conduzidos, na vida futura, à glória eterna' },
];

const MISTERIOS_LIBERTACAO = [
  {
    titulo: 'Libertação do Medo',
    texto: '"Não temas, porque eu te resgatei; eu te chamei pelo teu nome, tu és meu" (Is 43,1). Peçamos a Jesus que nos liberte de todo medo que paralisa o coração, e nos dê a confiança de filhos amados de Deus.',
  },
  {
    titulo: 'Libertação da Mágoa e do Rancor',
    texto: 'Peçamos a graça de perdoar quem nos feriu e de sermos libertos do peso de mágoas guardadas, para que o coração fique livre para amar de novo.',
  },
  {
    titulo: 'Libertação das Feridas de Família',
    texto: 'Peçamos a cura das feridas que vêm de longe, muitas vezes de geração em geração, e a graça de romper, em Cristo, os laços que escravizam a nossa história.',
  },
  {
    titulo: 'Libertação da Escravidão do Pecado',
    texto: '"Se o Filho vos libertar, sereis verdadeiramente livres" (Jo 8,36). Peçamos força para vencer os vícios e hábitos que nos afastam de Deus, confiando na liberdade que só Cristo dá.',
  },
  {
    titulo: 'Libertação para a Vida Nova em Cristo',
    texto: 'Agradeçamos a Deus pela liberdade que já nos foi dada em Cristo, e peçamos a graça de viver, a partir de hoje, como filhos verdadeiramente livres.',
  },
];

function blocoMisterio(numero, item) {
  return [
    { tipo: 'misterio', texto: `${numero}º Mistério — ${item.titulo}`, sub: item.fruto },
    { tipo: 'oracao', label: 'Pai Nosso', texto: ORACOES.paiNosso },
    { tipo: 'oracao', label: 'Ave Maria (10x)', texto: ORACOES.aveMaria },
    { tipo: 'oracao', label: 'Glória', texto: ORACOES.gloria },
    { tipo: 'oracao', label: 'Jaculatória de Fátima', texto: ORACOES.fatima },
  ];
}

function blocosAbertura() {
  return [
    { tipo: 'oracao', label: 'Sinal da Cruz', texto: ORACOES.sinalCruz },
    { tipo: 'oracao', label: 'Oferecimento', texto: ORACOES.oferecimento },
    { tipo: 'oracao', label: 'Credo', texto: ORACOES.credo },
    { tipo: 'oracao', label: 'Pai Nosso', texto: ORACOES.paiNosso },
    { tipo: 'nota', texto: 'Três Ave-Marias, pedindo o aumento da Fé, da Esperança e da Caridade.' },
    { tipo: 'oracao', label: 'Ave Maria (3x)', texto: ORACOES.aveMaria },
    { tipo: 'oracao', label: 'Glória', texto: ORACOES.gloria },
  ];
}

function blocosFechamento() {
  return [
    { tipo: 'oracao', label: 'Salve Rainha', texto: ORACOES.salveRainha },
    { tipo: 'nota', texto: 'V. Rogai por nós, Santa Mãe de Deus. R. Para que sejamos dignos das promessas de Cristo.' },
    { tipo: 'oracao', label: 'Oremos', texto: ORACOES.oracaoFinalRosario },
    { tipo: 'oracao', label: 'Ação de Graças', texto: ORACOES.acaoDeGracas },
    { tipo: 'oracao', label: 'Sinal da Cruz', texto: ORACOES.sinalCruz },
  ];
}

function buildTerco(chave) {
  const grupo = MISTERIOS[chave];
  let blocos = [];
  blocos.push({ tipo: 'nota', texto: `${grupo.nome} — ${grupo.dias}` });
  blocos = blocos.concat(blocosAbertura());
  grupo.lista.forEach((item, i) => { blocos = blocos.concat(blocoMisterio(i + 1, item)); });
  blocos = blocos.concat(blocosFechamento());
  return blocos;
}

function buildRosarioCompleto() {
  let blocos = [{ tipo: 'nota', texto: 'Rosário Completo — os quatro grupos de mistérios, 20 dezenas ao todo.' }];
  blocos = blocos.concat(blocosAbertura());
  let numero = 1;
  ['gozosos', 'dolorosos', 'gloriosos', 'luminosos'].forEach((chave) => {
    const grupo = MISTERIOS[chave];
    blocos.push({ tipo: 'nota', texto: grupo.nome });
    grupo.lista.forEach((item) => {
      blocos = blocos.concat(blocoMisterio(numero, item));
      numero += 1;
    });
  });
  blocos = blocos.concat(blocosFechamento());
  return blocos;
}

function buildTercoMisericordia() {
  let blocos = [
    { tipo: 'nota', texto: 'Terço da Misericórdia — rezado nas contas do terço comum, de preferência às 15h (Hora da Misericórdia).' },
    { tipo: 'oracao', label: 'Sinal da Cruz', texto: ORACOES.sinalCruz },
    { tipo: 'oracao', label: 'Pai Nosso', texto: ORACOES.paiNosso },
    { tipo: 'oracao', label: 'Ave Maria', texto: ORACOES.aveMaria },
    { tipo: 'oracao', label: 'Credo', texto: ORACOES.credo },
  ];
  for (let d = 1; d <= 5; d += 1) {
    blocos.push({ tipo: 'misterio', texto: `${d}ª Dezena`, sub: '' });
    blocos.push({ tipo: 'oracao', label: 'Na conta grande', texto: ORACOES.ofertaMisericordia });
    blocos.push({ tipo: 'oracao', label: 'Nas 10 contas pequenas (10x)', texto: ORACOES.pedidoMisericordia });
  }
  blocos.push({ tipo: 'oracao', label: 'Ao final (3x)', texto: ORACOES.santoImortal });
  blocos.push({ tipo: 'oracao', label: 'Oração final (3x)', texto: ORACOES.confioEmVos });
  blocos.push({ tipo: 'oracao', label: 'Sinal da Cruz', texto: ORACOES.sinalCruz });
  return blocos;
}

function blocoCoro(numero, coro) {
  return [
    {
      tipo: 'misterio',
      texto: `${numero}º Coro — Santos ${coro.nome}`,
      sub: `Por intercessão de São Miguel e do celeste coro dos Santos ${coro.nome}, digne-se o Senhor conceder-nos a graça de que ${coro.graca}. Amém.`,
    },
    { tipo: 'oracao', label: 'Pai Nosso', texto: ORACOES.paiNosso },
    { tipo: 'oracao', label: 'Ave Maria (3x)', texto: ORACOES.aveMaria },
  ];
}

function buildTercoSaoMiguel() {
  let blocos = [
    {
      tipo: 'nota',
      texto: 'Terço de São Miguel Arcanjo — devoção revelada à Beata Antônia d\'Astonac e aprovada pela Igreja. Nove saudações aos nove coros angélicos, cada uma com um Pai-Nosso e três Ave-Marias.',
    },
    { tipo: 'oracao', label: 'Sinal da Cruz', texto: ORACOES.sinalCruz },
  ];
  COROS_ANJOS.forEach((coro, i) => { blocos = blocos.concat(blocoCoro(i + 1, coro)); });
  blocos.push({
    tipo: 'nota',
    texto: 'Em honra aos quatro Arcanjos — São Miguel, São Gabriel, São Rafael e o nosso Anjo da Guarda — rezai quatro Pai-Nossos.',
  });
  blocos.push({ tipo: 'oracao', label: 'Pai Nosso (4x)', texto: ORACOES.paiNosso });
  blocos.push({ tipo: 'oracao', label: 'Oração a São Miguel Arcanjo', texto: ORACOES.oracaoSaoMiguel });
  blocos.push({ tipo: 'oracao', label: 'Sinal da Cruz', texto: ORACOES.sinalCruz });
  return blocos;
}

function blocoMisterioLibertacao(numero, item) {
  return [
    { tipo: 'misterio', texto: `${numero}º Mistério — ${item.titulo}`, sub: item.texto },
    { tipo: 'oracao', label: 'Pai Nosso', texto: ORACOES.paiNosso },
    { tipo: 'oracao', label: 'Ave Maria (10x)', texto: ORACOES.aveMaria },
    { tipo: 'oracao', label: 'Glória', texto: ORACOES.gloria },
  ];
}

function buildTercoLibertacao() {
  let blocos = [
    {
      tipo: 'nota',
      texto: 'Terço do Rosário da Libertação — meditação original para este app, inspirada em "Se o Filho vos libertar, sereis verdadeiramente livres" (Jo 8,36), rezada na estrutura tradicional do terço.',
    },
  ];
  blocos = blocos.concat(blocosAbertura());
  MISTERIOS_LIBERTACAO.forEach((item, i) => { blocos = blocos.concat(blocoMisterioLibertacao(i + 1, item)); });
  blocos = blocos.concat(blocosFechamento());
  return blocos;
}

function blocoDezenaChagas(numero) {
  return [
    { tipo: 'misterio', texto: `${numero}ª Dezena`, sub: '' },
    { tipo: 'oracao', label: 'Na conta grande', texto: ORACOES.ofertaChagas },
    { tipo: 'oracao', label: 'Nas 10 contas pequenas (10x)', texto: ORACOES.pedidoChagas },
  ];
}

function buildTercoChagas() {
  let blocos = [
    {
      tipo: 'nota',
      texto: 'Terço das Santas Chagas — devoção revelada à Irmã Maria Marta Chambon (1841-1907), Clarissa, e aprovada pela Igreja. Cinco dezenas em honra das Cinco Chagas de Cristo.',
    },
    { tipo: 'oracao', label: 'Sinal da Cruz', texto: ORACOES.sinalCruz },
  ];
  for (let d = 1; d <= 5; d += 1) blocos = blocos.concat(blocoDezenaChagas(d));
  blocos.push({
    tipo: 'oracao',
    label: 'Oração final',
    texto: 'Eterno Pai, eu Vos ofereço as Chagas de Nosso Senhor Jesus Cristo para curar as chagas de nossas almas, para reparar os pecados do mundo e para a salvação de todas as almas.',
  });
  blocos.push({ tipo: 'oracao', label: 'Sinal da Cruz', texto: ORACOES.sinalCruz });
  return blocos;
}

/* ---------- Renderização ---------- */

const rel = (id) => document.getElementById(id);
let rosarioMisterioAtual = null;

function rosarioStepShow(step) {
  ['modo', 'misterio', 'reader'].forEach((s) => {
    const el2 = rel(`rosario-step-${s}`);
    if (el2) el2.classList.toggle('hidden', s !== step);
  });
}

function renderReader(titulo, blocos) {
  rel('rosarioReaderTitle').textContent = titulo;
  const body = rel('rosarioBody');
  body.innerHTML = '';
  blocos.forEach((bloco) => {
    const p = document.createElement('p');
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
  rosarioStepShow('reader');
  body.scrollIntoView({ block: 'start' });
}

function openMisterioList() {
  const list = rel('rosarioMisterioList');
  list.innerHTML = '';
  Object.keys(MISTERIOS).forEach((chave) => {
    const grupo = MISTERIOS[chave];
    const btn = document.createElement('button');
    btn.className = 'book-btn';
    btn.innerHTML = `<span>${grupo.nome}</span><small>${grupo.dias}</small>`;
    btn.addEventListener('click', () => {
      rosarioMisterioAtual = chave;
      renderReader(`Terço — ${grupo.nome}`, buildTerco(chave));
    });
    list.appendChild(btn);
  });
  rosarioStepShow('misterio');
}

function initRosario() {
  rel('goTerco').addEventListener('click', openMisterioList);
  rel('goRosarioCompleto').addEventListener('click', () => {
    rosarioMisterioAtual = null;
    renderReader('Rosário Completo', buildRosarioCompleto());
  });
  rel('goTercoMisericordia').addEventListener('click', () => {
    rosarioMisterioAtual = null;
    renderReader('Terço da Misericórdia', buildTercoMisericordia());
  });
  rel('goTercoSaoMiguel').addEventListener('click', () => {
    rosarioMisterioAtual = null;
    renderReader('Terço de São Miguel Arcanjo', buildTercoSaoMiguel());
  });
  rel('goTercoLibertacao').addEventListener('click', () => {
    rosarioMisterioAtual = null;
    renderReader('Terço do Rosário da Libertação', buildTercoLibertacao());
  });
  rel('goTercoChagas').addEventListener('click', () => {
    rosarioMisterioAtual = null;
    renderReader('Terço das Santas Chagas', buildTercoChagas());
  });

  document.querySelectorAll('[data-back-to="rosario-modo"]').forEach((b) => b.addEventListener('click', () => rosarioStepShow('modo')));
  document.querySelectorAll('[data-back-to="rosario-misterio"]').forEach((b) => {
    b.addEventListener('click', () => {
      if (rosarioMisterioAtual) rosarioStepShow('misterio');
      else rosarioStepShow('modo');
    });
  });
}

window.MinhaLiturgiaRosario = { initRosario };
