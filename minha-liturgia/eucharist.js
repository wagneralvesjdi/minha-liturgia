'use strict';

/* ---------- Orações Eucarísticas (partes do sacerdote e respostas da assembleia) ---------- */

const DIALOGO_PREFACIO = [
  { tipo: 'sacerdote', texto: 'O Senhor esteja convosco.' },
  { tipo: 'assembleia', texto: 'Ele está no meio de nós.' },
  { tipo: 'sacerdote', texto: 'Corações ao alto.' },
  { tipo: 'assembleia', texto: 'O nosso coração está em Deus.' },
  { tipo: 'sacerdote', texto: 'Demos graças ao Senhor, nosso Deus.' },
  { tipo: 'assembleia', texto: 'É justo e necessário.' },
];

const NOTA_PREFACIO_VARIAVEL = [
  { tipo: 'nota', texto: 'Segue o Prefácio próprio do dia ou da celebração, terminando sempre com o canto do Santo.' },
];

const SANCTUS = [
  { tipo: 'assembleia', texto: 'Santo, Santo, Santo, Senhor, Deus do universo! O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!' },
];

const AMEM_FINAL = [
  { tipo: 'assembleia', texto: 'Amém.' },
];

function consagracaoPao(introSacerdote) {
  return [
    { tipo: 'sacerdote', texto: introSacerdote },
    { tipo: 'consagracao', texto: 'TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.' },
  ];
}

function consagracaoVinho(introSacerdote) {
  return [
    { tipo: 'sacerdote', texto: introSacerdote },
    { tipo: 'consagracao', texto: 'TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS, PARA REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.' },
    { tipo: 'sacerdote', texto: 'Eis o mistério da fé!' },
  ];
}

const DOXOLOGIA = { tipo: 'sacerdote', texto: 'Por Cristo, com Cristo, em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda a honra e toda a glória, agora e para sempre.' };

const ACLAMACAO_ANAMNESE = { tipo: 'assembleia', texto: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!' };

const INSTITUICAO_PAO_PADRAO = 'Na noite em que ia ser entregue, ele tomou o pão em suas mãos, deu-vos graças, e o partiu e deu a seus discípulos, dizendo:';
const INSTITUICAO_VINHO_PADRAO = 'Do mesmo modo, ao fim da ceia, ele tomou o cálice em suas mãos, deu-vos graças novamente e o deu a seus discípulos, dizendo:';

/* As dez Orações Eucarísticas abaixo (V, as quatro para Diversas
   Circunstâncias, as duas da Reconciliação e as três para Missas com
   Crianças) têm corpo próprio e variável, com direitos autorais da
   tradução do Missal Romano — por isso este roteiro traz apenas a
   estrutura fixa, comum a todas (diálogo, Santo, relato da instituição,
   consagração e doxologia), mais uma nota de orientação pastoral sobre
   quando usar cada uma. O texto integral de cada uma está no Ordinário
   da Missa do Missal Romano (3ª edição típica) ou no missal da paróquia. */
function corpoResumido(notaPastoral) {
  return [
    { tipo: 'nota', texto: notaPastoral },
    ...DIALOGO_PREFACIO,
    ...NOTA_PREFACIO_VARIAVEL,
    ...SANCTUS,
    { tipo: 'nota', texto: 'Segue a parte central desta Oração Eucarística, própria desta variante — consulte o Ordinário da Missa no Missal Romano para o texto completo até o relato da instituição.' },
    ...consagracaoPao(INSTITUICAO_PAO_PADRAO),
    ...consagracaoVinho(INSTITUICAO_VINHO_PADRAO),
    ACLAMACAO_ANAMNESE,
    { tipo: 'nota', texto: 'Segue a intercessão final própria desta Oração Eucarística, até a doxologia — consulte o Missal Romano.' },
    DOXOLOGIA,
    ...AMEM_FINAL,
  ];
}

const CAT_ORDINARIAS = 'Orações Eucarísticas Ordinárias (I a V)';

const EUCHARISTIC_PRAYERS = [
  {
    id: 'I',
    titulo: 'Oração Eucarística I',
    subtitulo: 'Cânon Romano — grandes solenidades',
    categoria: CAT_ORDINARIAS,
    blocos: [
      ...DIALOGO_PREFACIO,
      ...NOTA_PREFACIO_VARIAVEL,
      ...SANCTUS,
      { tipo: 'sacerdote', texto: 'Ó Pai clementíssimo, nós vos pedimos e suplicamos, por Jesus Cristo, vosso Filho e Senhor nosso, que aceiteis e abençoeis estes dons, estas oferendas, este sacrifício puro e santo, que vos apresentamos antes de tudo pela vossa Igreja santa e católica: concedei-lhe paz e proteção, unidade e governo em todo o mundo, com o vosso servo o Papa N., o nosso Bispo N., e todos os que zelam pela fé católica, transmitida pelos Apóstolos.' },
      { tipo: 'sacerdote', texto: 'Lembrai-vos, Senhor, dos vossos filhos e filhas e de todos os que cercam este altar, cuja fé e devoção conheceis. Por eles e todos os seus vos oferecemos este sacrifício de louvor, pela sua salvação e de toda a sua família, na esperança da sua salvação e da sua incolumidade; e agora vos rendem os seus votos a vós, ó Deus eterno, vivo e verdadeiro.' },
      { tipo: 'sacerdote', texto: 'Unidos numa só comunhão, veneramos e honramos primeiramente a memória gloriosa sempre Virgem Maria, Mãe de nosso Deus e Senhor Jesus Cristo, e também a de São José, seu esposo, dos vossos Santos Apóstolos e Mártires, e de todos os vossos Santos; por seus méritos e preces, concedei-nos, em tudo, o auxílio da vossa proteção.' },
      { tipo: 'sacerdote', texto: 'Aceitai, ó Pai, com bondade, esta oferenda da vossa família e de todos os vossos filhos; ordenai em vossa paz os nossos dias, livrai-nos da danação eterna e acolhei-nos entre os vossos eleitos.' },
      { tipo: 'sacerdote', texto: 'Dignai-vos, ó Pai, tornar esta oferenda perfeita, espiritual e digna de serdes agraciado, pois ela deve tornar-se para nós o Corpo e o Sangue de Jesus Cristo, vosso Filho muito amado e Senhor nosso.' },
      ...consagracaoPao('Na noite em que ia ser entregue, ele tomou o pão em suas mãos, e, erguendo os olhos a vós, ó Pai, deu graças e o partiu e deu a seus discípulos, dizendo:'),
      ...consagracaoVinho('Do mesmo modo, ao fim da ceia, ele tomou este cálice glorioso em suas mãos, deu-vos graças novamente e o deu a seus discípulos, dizendo:'),
      { tipo: 'assembleia', texto: 'Salvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição.' },
      { tipo: 'sacerdote', texto: 'Celebrando, pois, a memória da paixão do vosso Filho, da sua ressurreição dentre os mortos e gloriosa ascensão aos céus, nós, vossos ministros, e também o vosso povo santo, vos oferecemos, ó Pai, dentre os bens que nos destes, o sacrifício perfeito, santo e imaculado, pão de vida eterna e cálice de eterna salvação.' },
      { tipo: 'sacerdote', texto: 'Recebei, ó Pai, com bondade e paternal amor, esta oferenda, como recebestes os dons do vosso servo Abel, o sacrifício de Abraão, nosso pai na fé, e a oblação pura do sacerdote Melquisedeque.' },
      { tipo: 'sacerdote', texto: 'Nós vos suplicamos, ó Deus onipotente, que estas oferendas sejam levadas à vossa presença, para que todos nós, participando do altar da comunhão do Corpo e Sangue de vosso Filho, sejamos repletos de todas as graças e bênçãos celestes.' },
      { tipo: 'sacerdote', texto: 'Lembrai-vos também, ó Pai, dos vossos filhos e filhas que partiram desta vida com o sinal da fé e agora descansam em paz. Nós vos suplicamos que lhes concedais, a eles e a todos os que jazem em Cristo, o lugar do descanso, da luz e da paz.' },
      { tipo: 'sacerdote', texto: 'E a todos nós, pecadores, mas confiados em vossa infinita misericórdia, concedei participar da assembleia dos vossos Apóstolos e Mártires e de todos os vossos Santos; admiti-nos em sua companhia, não por nossos méritos, mas segundo a vossa bondade e misericórdia, por Jesus Cristo, Senhor nosso, por quem não cessais de criar e santificar estes bens e distribuí-los entre nós.' },
      DOXOLOGIA,
      ...AMEM_FINAL,
    ],
  },
  {
    id: 'II',
    titulo: 'Oração Eucarística II',
    subtitulo: 'A mais breve — indicada para dias feriais',
    categoria: CAT_ORDINARIAS,
    blocos: [
      ...DIALOGO_PREFACIO,
      ...NOTA_PREFACIO_VARIAVEL,
      ...SANCTUS,
      { tipo: 'sacerdote', texto: 'Na verdade, ó Pai, vós sois santo e fonte de toda santidade. Santificai estas oferendas, derramando sobre elas o vosso Espírito, de modo que se tornem para nós o Corpo e o Sangue de nosso Senhor Jesus Cristo.' },
      { tipo: 'sacerdote', texto: 'Estando para ser entregue e abraçando livremente a paixão, ele tomou o pão e deu graças, e o partiu e deu a seus discípulos, dizendo:' },
      { tipo: 'consagracao', texto: 'TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.' },
      ...consagracaoVinho('Do mesmo modo, ao fim da ceia, ele tomou o cálice em suas mãos, deu graças novamente e o deu a seus discípulos, dizendo:'),
      { tipo: 'assembleia', texto: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!' },
      { tipo: 'sacerdote', texto: 'Celebrando, ó Pai, a memória da morte e ressurreição do vosso Filho, nós vos oferecemos o pão da vida e o cálice da salvação, e vos agradecemos porque nos tornastes dignos de estar em vossa presença e vos servir.' },
      { tipo: 'sacerdote', texto: 'Nós vos suplicamos que, participando do Corpo e Sangue de Cristo, sejamos reunidos pelo Espírito Santo num só corpo.' },
      { tipo: 'sacerdote', texto: 'Lembrai-vos, Senhor, de vossa Igreja espalhada pela terra: e a fazei crescer na caridade, com o Papa N., o nosso Bispo N. e todo o clero.' },
      { tipo: 'sacerdote', texto: 'Lembrai-vos também de nossos irmãos que morreram na esperança da ressurreição e de todos os que partiram desta vida; recebei-os junto de vós na luz da vossa face.' },
      { tipo: 'sacerdote', texto: 'Enfim, nós vos pedimos, tende piedade de todos nós, e dai-nos participar da vida eterna, com a Virgem Maria, Mãe de Deus, com os Apóstolos e todos os santos que, ao longo dos séculos, viveram na vossa amizade, para que possamos merecer, com eles, o louvor eterno.' },
      DOXOLOGIA,
      ...AMEM_FINAL,
    ],
  },
  {
    id: 'III',
    titulo: 'Oração Eucarística III',
    subtitulo: 'Indicada para domingos e festas',
    categoria: CAT_ORDINARIAS,
    blocos: [
      ...DIALOGO_PREFACIO,
      ...NOTA_PREFACIO_VARIAVEL,
      ...SANCTUS,
      { tipo: 'sacerdote', texto: 'Na verdade, vós sois santo, ó Deus do universo, e tudo o que criastes proclama o vosso louvor, porque, por Jesus Cristo, vosso Filho e Senhor nosso, e pela força do Espírito Santo, dais vida e santidade a todas as coisas e não cessais de reunir o vosso povo, para que, do nascer ao pôr do sol, seja oferecido ao vosso nome um sacrifício perfeito.' },
      { tipo: 'sacerdote', texto: 'Por isso, ó Pai, nós vos pedimos que santifiqueis pelo mesmo Espírito as oferendas que vos apresentamos para serem consagradas, a fim de que se tornem o Corpo e o Sangue de Jesus Cristo, vosso Filho e Senhor nosso, que nos mandou celebrar este mistério.' },
      ...consagracaoPao('Na noite em que ia ser entregue, ele tomou o pão em suas mãos, e, erguendo os olhos a vós, ó Pai, deu graças e o partiu e deu a seus discípulos, dizendo:'),
      ...consagracaoVinho('Do mesmo modo, ao fim da ceia, ele tomou o cálice em suas mãos, deu graças novamente e o deu a seus discípulos, dizendo:'),
      { tipo: 'assembleia', texto: 'Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda.' },
      { tipo: 'sacerdote', texto: 'Celebrando agora, ó Pai, a memória do vosso Filho, da sua paixão que nos salva, da sua gloriosa ressurreição e ascensão ao céu, e enquanto esperamos a sua nova vinda, nós vos oferecemos em ação de graças este sacrifício de vida e santidade.' },
      { tipo: 'sacerdote', texto: 'Olhai com bondade a oferenda da vossa Igreja, reconhecei o sacrifício que nos reconcilia convosco, e concedei que, alimentando-nos com o Corpo e Sangue do vosso Filho, sejamos repletos do Espírito Santo, e nos tornemos em Cristo um só corpo e um só espírito.' },
      { tipo: 'sacerdote', texto: 'Que ele faça de nós uma oferenda perfeita para alcançarmos a vida eterna com os vossos santos escolhidos: com Maria, Mãe de Deus e da Igreja, seu esposo São José, os vossos Apóstolos e Mártires, e todos os santos, que não cessam de interceder por nós na vossa presença.' },
      { tipo: 'sacerdote', texto: 'E agora, nós vos pedimos, ó Pai, que este sacrifício da nossa reconciliação estenda a paz e a salvação ao mundo inteiro. Confirmai na fé e na caridade a vossa Igreja peregrina na terra: o vosso servo o Papa N., o nosso Bispo N., os bispos do mundo inteiro, o clero e todo o povo que conquistastes.' },
      { tipo: 'sacerdote', texto: 'Atendei as preces de vossa família, que hoje se reúne à vossa presença; e a todos os vossos filhos, dispersos pelo mundo, conduzi bondosamente, ó Pai, para a vossa morada.' },
      { tipo: 'sacerdote', texto: 'Recebei com bondade no vosso reino os nossos irmãos falecidos e todos os que partiram desta vida em vossa amizade; nós esperamos, junto com eles, alcançar a felicidade eterna, por Cristo, Senhor nosso, por quem concedeis ao mundo todos os bens.' },
      DOXOLOGIA,
      ...AMEM_FINAL,
    ],
  },
  {
    id: 'IV',
    titulo: 'Oração Eucarística IV',
    subtitulo: 'Com prefácio próprio, invariável',
    categoria: CAT_ORDINARIAS,
    blocos: [
      ...DIALOGO_PREFACIO,
      { tipo: 'sacerdote', texto: 'Na verdade, é justo dar-vos graças, e vosso dever nos leva a proclamar vossa glória, ó Pai Santo, porque só vós sois Deus vivo e verdadeiro, que existis antes de todos os séculos e permaneceis eternamente. Habitando em luz inacessível, vós sois único, bom e transcendente; e sois, no entanto, fonte de vida, criador de todas as coisas, que enriqueceis com vossas bênçãos e reconduzis todos os seres à comunhão convosco, através da luz e da vida que a todos comunicais por vosso Verbo, o vosso Filho amado, Senhor e Salvador nosso.' },
      { tipo: 'sacerdote', texto: 'Por isso, com todos os anjos, cercados de admiração diante de vosso esplendor, cantamos, sem cessar, o vosso louvor:' },
      ...SANCTUS,
      { tipo: 'sacerdote', texto: 'Na verdade, vós sois santo e digno de louvor, ó Deus, que amais os homens e sempre os assistis no caminho da santidade. Por isso enviastes, no correr dos tempos, o vosso Filho unigênito, que se fez homem por obra do Espírito Santo, nascendo da Virgem Maria, para cumprir a vossa vontade e reunir na Igreja, por meio da páscoa, um povo santo à vossa presença; e, estendendo as mãos ao suplício para vencer a morte e manifestar a ressurreição, cumpriu toda a vontade de vosso amor por nós.' },
      ...consagracaoPao('Na noite em que ia ser entregue, na ceia em que se despedia dos seus, tomou o pão em suas mãos, deu-vos graças e o partiu e deu a seus discípulos, dizendo:'),
      ...consagracaoVinho('Do mesmo modo, tomou o cálice cheio do fruto da videira, deu-vos graças novamente e o deu a seus discípulos, dizendo:'),
      { tipo: 'assembleia', texto: 'Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda.' },
      { tipo: 'sacerdote', texto: 'Celebrando, pois, ó Pai, a memória da nossa redenção, anunciamos a morte de Cristo e sua descida ao mundo dos mortos, proclamamos a sua ressurreição e ascensão à vossa direita, e, esperando a sua vinda gloriosa, nós vos oferecemos o seu Corpo e Sangue, sacrifício do vosso agrado e de toda a Igreja.' },
      { tipo: 'sacerdote', texto: 'Olhai, ó Pai, para a vítima que quisestes que fosse a nossa reconciliação convosco; concedei que, alimentando-nos com o Corpo e Sangue do vosso Filho, sejamos repletos do Espírito Santo e nos torneis em Cristo um só corpo e espírito.' },
      { tipo: 'sacerdote', texto: 'Que ele faça de nós uma oferenda perpétua a vós agradável, para que possamos alcançar os bens prometidos e herdados dos vossos eleitos, principalmente da Virgem Maria, Mãe de Deus, dos vossos santos Apóstolos e gloriosos Mártires, e de todos os Santos, que sempre nos assistem com sua intercessão.' },
      { tipo: 'sacerdote', texto: 'E agora nós vos pedimos, ó Pai, que este sacrifício de reconciliação traga a paz e a salvação ao mundo inteiro. Confirmai na fé e na caridade a vossa Igreja, enquanto ela caminha nesta terra: o vosso servo o Papa N., o nosso Bispo N., o corpo episcopal, o clero e o povo que conquistastes.' },
      { tipo: 'sacerdote', texto: 'Atendei as preces desta família, que reunistes na vossa presença. Reconduzi a vós, ó Pai misericordioso, todos os vossos filhos dispersos pelo mundo. E aos nossos irmãos falecidos e a todos os que partiram desta vida na vossa amizade, acolhei-os benignamente no vosso reino, onde esperamos alcançar, todos juntos, a plenitude eterna da vossa glória.' },
      DOXOLOGIA,
      ...AMEM_FINAL,
    ],
  },
  {
    id: 'V',
    titulo: 'Oração Eucarística V',
    subtitulo: '"Igreja Peregrina" — formulário próprio do Brasil',
    categoria: CAT_ORDINARIAS,
    blocos: corpoResumido('Formulário aprovado pela Santa Sé especialmente para a Igreja no Brasil, composto para o Congresso Eucarístico de Manaus (1975). Está centrado na caminhada do povo de Deus e na partilha fraterna.'),
  },
];

/* ---------- Renderização ---------- */

const eel = (id) => document.getElementById(id);

function renderPrayerList() {
  const list = eel('eucharistList');
  list.innerHTML = '';
  let categoriaAtual = null;
  EUCHARISTIC_PRAYERS.forEach((p, idx) => {
    if (p.categoria !== categoriaAtual) {
      categoriaAtual = p.categoria;
      const h = document.createElement('h3');
      h.className = 'cic-results-heading';
      h.textContent = categoriaAtual;
      list.appendChild(h);
    }
    const btn = document.createElement('button');
    btn.className = 'book-btn';
    btn.innerHTML = `<span>${p.titulo}</span><small>${p.subtitulo || ''}</small>`;
    btn.addEventListener('click', () => renderPrayerReader(idx));
    list.appendChild(btn);
  });
}

function renderPrayerReader(idx) {
  const prayer = EUCHARISTIC_PRAYERS[idx];
  eel('eucharistReaderTitle').textContent = prayer.titulo;
  const body = eel('eucharistBody');
  body.innerHTML = '';
  prayer.blocos.forEach((bloco) => {
    const p = document.createElement('p');
    if (bloco.tipo === 'sacerdote') {
      p.className = 'eu-line eu-sacerdote';
      p.innerHTML = `<span class="eu-label">Sacerdote</span>${bloco.texto}`;
    } else if (bloco.tipo === 'assembleia') {
      p.className = 'eu-line eu-assembleia';
      p.innerHTML = `<span class="eu-label">Assembleia</span>${bloco.texto}`;
    } else if (bloco.tipo === 'consagracao') {
      p.className = 'eu-line eu-consagracao';
      p.textContent = bloco.texto;
    } else {
      p.className = 'eu-line eu-nota';
      p.textContent = bloco.texto;
    }
    body.appendChild(p);
  });
  eel('view-eucaristia').querySelector('.bible-step:not(.hidden)')?.classList.add('hidden');
  eel('eucharist-step-list').classList.add('hidden');
  eel('eucharist-step-reader').classList.remove('hidden');
  body.scrollIntoView({ block: 'start' });
}

function backToPrayerList() {
  eel('eucharist-step-reader').classList.add('hidden');
  eel('eucharist-step-list').classList.remove('hidden');
}

function initEucharist() {
  renderPrayerList();
  document.querySelectorAll('[data-back-to="eucharist-list"]').forEach((b) => b.addEventListener('click', backToPrayerList));
}

window.MinhaLiturgiaEucharist = { initEucharist };
