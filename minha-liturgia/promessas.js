'use strict';

/* ---------- Preciosas Promessas ---------- */
/* Inspirado na tradicional "caixinha de promessas": um botão sorteia um
   versículo bíblico e mostra uma breve reflexão. O texto do versículo vem
   da mesma Bíblia (tradução Ave Maria) já usada na seção Bíblia Sagrada;
   as reflexões são originais, escritas para este app. Referências
   conferidas uma a uma contra o texto da tradução usada no app, já que a
   numeração dos Salmos na Bíblia Católica (Vulgata/Septuaginta) difere,
   em boa parte do saltério, da numeração comum em bíblias protestantes. */

const PROMESSAS = [
  { livro: 'Salmos', capitulo: 22, versiculo: 1, reflexao: 'Nesta imagem tão simples e tão profunda, Davi resume toda a confiança que podemos ter em Deus: um pastor não deixa faltar nada às suas ovelhas. Quando a vida parecer incerta, lembre-se de que você não caminha sozinho — há Alguém que conhece cada passo do seu caminho e cuida de você com atenção de pastor.' },
  { livro: 'Salmos', capitulo: 22, versiculo: 4, reflexao: 'Há vales escuros na vida de todos: momentos de dor, medo ou solidão em que a luz parece distante. Mas a promessa deste versículo não é que o vale vá desaparecer, e sim que Deus caminha dentro dele com você — o bordão e o báculo do pastor são sinais de proteção que não falham, mesmo na escuridão mais densa.' },
  { livro: 'Salmos', capitulo: 9, versiculo: 10, reflexao: 'Quando tudo parece pesar demais, Deus se oferece como refúgio — um lugar seguro para onde correr sem medo de ser rejeitado. Ele não espera que você chegue forte ou resolvido; espera apenas que você chegue, e é ali, na fraqueza reconhecida, que sua proteção se manifesta com mais força.' },
  { livro: 'Salmos', capitulo: 17, versiculo: 3, reflexao: 'Rochedo, fortaleza, escudo: as imagens se acumulam para dizer uma única coisa — em Deus não há instabilidade. Quando o chão da vida parece se mover sob os pés, é bom lembrar que existe uma rocha que não se abala, e é nela que podemos apoiar nossa confiança.' },
  { livro: 'Salmos', capitulo: 36, versiculo: 5, reflexao: 'Entregar o próprio caminho a Deus não é desistir de agir, é confiar que ele conduz o que está além do nosso controle. Esperar nele, com paciência, é reconhecer que os tempos de Deus, mesmo quando não entendemos, trabalham a nosso favor.' },
  { livro: 'Salmos', capitulo: 36, versiculo: 34, reflexao: 'A promessa aqui é dupla: confiar em Deus e seguir os seus caminhos andam juntos. Não é uma confiança passiva, mas uma confiança que se traduz em modo de viver — e é essa confiança ativa que Deus promete exaltar no tempo certo.' },
  { livro: 'Provérbios', capitulo: 3, versiculo: 5, reflexao: 'Nem sempre a nossa própria sabedoria basta para entender o que estamos vivendo. Este provérbio convida a um gesto de humildade: confiar de coração inteiro em Deus, mesmo quando a lógica humana não encontra respostas.' },
  { livro: 'Provérbios', capitulo: 16, versiculo: 3, reflexao: 'Antes de começar qualquer projeto, trabalho ou decisão importante, vale a pena entregá-lo a Deus em oração. Não é garantia de que tudo sairá exatamente como planejamos, mas é a certeza de que caminhamos acompanhados por Aquele que conhece o melhor caminho.' },
  { livro: 'Provérbios', capitulo: 18, versiculo: 10, reflexao: 'O nome do Senhor, diz o provérbio, é como uma torre forte: um lugar alto e seguro para onde o justo corre em busca de proteção. Em dias de aflição, invocar esse nome com fé é encontrar um abrigo que nenhuma tempestade consegue derrubar.' },
  { livro: 'Isaías', capitulo: 40, versiculo: 31, reflexao: 'Quando as próprias forças se esgotam, a promessa de Isaías é clara: quem espera no Senhor recebe forças renovadas, como asas de águia. Não é uma força que vem de nós mesmos, mas um dom que Deus concede a quem persevera na confiança.' },
  { livro: 'Isaías', capitulo: 58, versiculo: 11, reflexao: 'Deus não promete apenas guiar de longe — promete guiar constantemente, alimentar mesmo no deserto, renovar o vigor de quem parece já não ter mais forças. A imagem do jardim bem irrigado é a promessa de uma vida que floresce mesmo em terreno árido.' },
  { livro: 'Isaías', capitulo: 43, versiculo: 1, reflexao: 'Deus não chama pelo número, chama pelo nome — é assim que Isaías descreve o amor de Deus por cada pessoa, único e pessoal. Saber que pertencemos a ele, e que fomos resgatados por ele, é o fundamento mais firme contra qualquer medo.' },
  { livro: 'Isaías', capitulo: 43, versiculo: 2, reflexao: 'A promessa não é a ausência de dificuldades — águas para atravessar, fogo para enfrentar —, mas a certeza de que Deus estará presente em cada uma delas. Não somos poupados das provações da vida, mas somos acompanhados nelas até o fim.' },
  { livro: 'Isaías', capitulo: 26, versiculo: 3, reflexao: 'A paz verdadeira, diz o profeta, nasce da confiança em Deus e de um caráter firme, não das circunstâncias externas. Quando os pensamentos insistem em se voltar para Deus, mesmo em meio à instabilidade, a paz encontra onde permanecer.' },
  { livro: 'Jeremias', capitulo: 29, versiculo: 11, reflexao: 'Mesmo quando o presente parece incerto ou o futuro difícil de enxergar, Deus garante que os seus planos para nós são de bem, não de mal — de esperança, não de desespero. Essa promessa não elimina as dificuldades do caminho, mas ilumina o horizonte para o qual caminhamos.' },
  { livro: 'Jeremias', capitulo: 1, versiculo: 5, reflexao: 'Antes mesmo de você nascer, Deus já te conhecia e já tinha um propósito para a sua vida. Nenhuma circunstância do nascimento ou da história pessoal diminui esse chamado: você foi pensado e querido por Deus antes de qualquer outra coisa.' },
  { livro: 'São Mateus', capitulo: 11, versiculo: 28, reflexao: 'O convite de Jesus não exige que cheguemos até ele já aliviados ou resolvidos — é justamente para quem está cansado e sobrecarregado que ele estende a mão. Esse alívio prometido não é a ausência de fardos, mas a companhia de Alguém disposto a carregá-los com a gente.' },
  { livro: 'São Mateus', capitulo: 6, versiculo: 33, reflexao: 'Quando as preocupações do dia a dia parecem tomar todo o espaço, Jesus propõe uma ordem diferente: buscar primeiro o Reino de Deus e deixar que o resto se organize a partir daí. Não é uma promessa de que os problemas desaparecerão, mas de que, buscando Deus em primeiro lugar, tudo o mais encontra o seu devido lugar.' },
  { livro: 'São Mateus', capitulo: 18, versiculo: 20, reflexao: 'Não é preciso uma multidão, nem um templo grandioso, para que Jesus esteja presente — basta que duas ou três pessoas se reúnam em seu nome. Essa promessa é um convite para valorizar os pequenos momentos de oração em comunidade, em família, entre amigos.' },
  { livro: 'São João', capitulo: 3, versiculo: 16, reflexao: 'Este versículo resume o coração do Evangelho: o amor de Deus não é abstrato, tomou a forma concreta de um Filho entregue por nós. Acreditar nesse amor é abrir a porta para uma vida que já não termina na morte, mas continua para sempre.' },
  { livro: 'São João', capitulo: 14, versiculo: 6, reflexao: 'Quando não sabemos que direção tomar, Jesus se apresenta não apenas como quem mostra o caminho, mas como o próprio caminho. Segui-lo é a garantia de não se perder, porque ele mesmo é quem nos conduz ao Pai.' },
  { livro: 'São João', capitulo: 14, versiculo: 27, reflexao: 'A paz que Jesus oferece não é a ausência de problemas, como costuma ser a paz do mundo — é uma paz que resiste mesmo em meio à tempestade. Por isso ele pede algo muito concreto: que o coração não se perturbe nem se atemorize, porque essa paz já foi dada.' },
  { livro: 'Romanos', capitulo: 8, versiculo: 28, reflexao: 'Não é uma promessa de que tudo o que acontece é bom em si mesmo, mas de que Deus é capaz de transformar até as circunstâncias mais difíceis em algo que serve ao bem de quem o ama. É uma promessa que sustenta a esperança mesmo quando não enxergamos o sentido do que estamos vivendo.' },
  { livro: 'Romanos', capitulo: 8, versiculo: 38, versiculoFim: 39, reflexao: 'Paulo esgota a lista de tudo o que poderia separar-nos de Deus — morte, vida, anjos, presente, futuro — só para concluir que nada, absolutamente nada, tem esse poder. É uma das promessas mais radicais da Escritura: o amor de Deus em Cristo é definitivamente maior do que qualquer coisa que possamos enfrentar.' },
  { livro: 'Filipenses', capitulo: 4, versiculo: 6, reflexao: 'A ansiedade tenta ocupar o espaço que deveria ser da oração. Paulo não pede que finjamos não ter preocupações, mas que as levemos a Deus em oração, com ação de graças — transformando a inquietação em diálogo confiante.' },
  { livro: 'Filipenses', capitulo: 4, versiculo: 13, reflexao: 'Esta promessa não é sobre força própria, mas sobre a força que vem de Cristo. Não somos chamados a enfrentar tudo sozinhos — é nele, que conforta e sustenta, que encontramos capacidade para o que parecia impossível.' },
  { livro: 'Filipenses', capitulo: 4, versiculo: 19, reflexao: 'A promessa de Paulo não é de luxo, mas de suficiência: Deus proverá, segundo a sua glória, tudo aquilo de que realmente precisamos. É um convite a confiar que, mesmo quando os recursos parecem escassos, a providência de Deus não falha.' },
  { livro: 'II Coríntios', capitulo: 12, versiculo: 9, reflexao: 'Paulo pediu para que sua fraqueza fosse tirada, e a resposta de Deus foi diferente do que ele esperava: não a remoção do problema, mas a graça suficiente para atravessá-lo. Às vezes a resposta de Deus às nossas fraquezas não é eliminá-las, mas manifestar nelas a sua força.' },
  { livro: 'II Timóteo', capitulo: 1, versiculo: 7, reflexao: 'O medo paralisante não vem de Deus — o espírito que ele dá é de fortaleza, de amor e de sabedoria. Quando o medo tentar dominar o coração, vale lembrar de onde ele não vem, e a quem pedir a coragem que falta.' },
  { livro: 'Hebreus', capitulo: 13, versiculo: 5, reflexao: 'A promessa é antiga — repetida desde os tempos de Moisés — e continua firme: Deus não abandona quem confia nele. Essa certeza é o antídoto contra a ganância e a ansiedade: contentar-se com o que se tem, sabendo que a companhia de Deus nunca falta.' },
  { livro: 'Hebreus', capitulo: 11, versiculo: 1, reflexao: 'A fé não elimina a incerteza, mas dá um fundamento sólido para a esperança mesmo naquilo que ainda não vemos. É essa certeza, mais do que qualquer prova visível, que sustenta quem confia em Deus.' },
  { livro: 'I São Pedro', capitulo: 5, versiculo: 7, reflexao: 'Não é preciso carregar sozinho o peso das preocupações — a Escritura convida a entregá-las a Deus, porque ele tem cuidado de nós. É uma imagem de alívio: colocar nas mãos de Deus aquilo que pesa demais para as nossas.' },
  { livro: 'I São João', capitulo: 4, versiculo: 8, reflexao: 'Antes de qualquer definição teológica complexa, a Escritura resume Deus com três palavras simples: Deus é amor. Conhecer verdadeiramente a Deus, portanto, é aprender a amar — porque é impossível separar as duas coisas.' },
  { livro: 'I São João', capitulo: 1, versiculo: 9, reflexao: 'O perdão de Deus não depende do nosso merecimento, mas da sua fidelidade. Basta reconhecer o pecado diante dele para encontrar, sem demora, perdão e purificação — uma promessa que renova a esperança de quem se sente indigno.' },
  { livro: 'I São João', capitulo: 5, versiculo: 14, reflexao: 'Orar com confiança não significa ter certeza de que Deus dará exatamente o que pedimos, mas de que ele nos ouve quando pedimos o que está de acordo com a sua vontade. É uma confiança que liberta a oração do medo de não ser ouvida.' },
  { livro: 'Apocalipse', capitulo: 21, versiculo: 4, reflexao: 'No fim de tudo, a Escritura promete um consolo definitivo: Deus mesmo enxugará cada lágrima, e a dor, o luto e a morte não terão mais lugar. É uma esperança que não elimina o sofrimento de hoje, mas garante que ele não terá a última palavra.' },
  { livro: 'Josué', capitulo: 1, versiculo: 9, reflexao: 'A ordem de Deus a Josué vem acompanhada de uma promessa: o Senhor está contigo em qualquer parte para onde fores. É essa presença constante, mais do que qualquer capacidade própria, que sustenta a coragem diante do desconhecido.' },
  { livro: 'Deuteronômio', capitulo: 31, versiculo: 8, reflexao: 'Antes de qualquer batalha ou desafio, a promessa é a mesma de sempre: Deus marcha à frente, permanece ao lado, e não abandona. Não há motivo, então, para o medo tomar conta do coração.' },
  { livro: 'Deuteronômio', capitulo: 33, versiculo: 27, reflexao: 'A imagem dos braços eternos que sustentam é um convite ao descanso: não é preciso segurar tudo sozinho, porque há um apoio que não cede, mesmo debaixo do peso mais difícil de carregar.' },
  { livro: 'Números', capitulo: 6, versiculo: 24, reflexao: 'Uma das bênçãos mais antigas da Escritura, pronunciada há milênios sobre o povo de Deus, continua atual: que o Senhor abençoe e guarde cada pessoa que a recebe hoje, em cada detalhe do seu dia.' },
  { livro: 'II Crônicas', capitulo: 7, versiculo: 14, reflexao: 'A promessa de restauração vem acompanhada de um convite: humildade, oração, conversão. Não é Deus que se afasta de nós, mas nós que, ao voltarmos para ele de coração sincero, encontramos a cura que já estava disponível.' },
  { livro: 'I Coríntios', capitulo: 10, versiculo: 13, reflexao: 'Nenhuma tentação ou provação é maior do que a força que Deus concede para enfrentá-la. Essa promessa não elimina a dificuldade da luta, mas garante que sempre existe, junto com ela, um caminho de saída.' },
  { livro: 'Colossenses', capitulo: 3, versiculo: 15, reflexao: 'Paulo pede que a paz de Cristo reine no coração — não apenas que esteja presente, mas que governe, que seja o critério das decisões e reações do dia a dia. É um convite a deixar que essa paz, e não a ansiedade, tenha a palavra final.' },
  { livro: 'Efésios', capitulo: 3, versiculo: 20, reflexao: 'Deus é capaz de agir muito além do que conseguimos pedir ou até imaginar. Essa promessa amplia os limites da nossa esperança: não estamos limitados à nossa própria capacidade de sonhar o que Deus pode fazer.' },
  { livro: 'São Tiago', capitulo: 1, versiculo: 5, reflexao: 'Quando falta clareza para decidir o que fazer, a Escritura oferece um caminho simples: pedir sabedoria a Deus, que a concede a todos, sem reprovar quem pede. Não é preciso ter todas as respostas — basta ter a humildade de perguntar.' },
  { livro: 'São Tiago', capitulo: 1, versiculo: 12, reflexao: 'A promessa não é livrar-se da provação, mas suportá-la com perseverança até o fim — e é a essa perseverança que Deus promete a coroa da vida. O que hoje parece apenas cansaço pode ser, aos olhos de Deus, o caminho para uma recompensa que ainda não se vê.' },
  { livro: 'Gálatas', capitulo: 5, versiculo: 22, reflexao: 'Amor, alegria, paz, paciência: esses não são esforços que fabricamos sozinhos, mas frutos que nascem de uma vida guiada pelo Espírito de Deus. Deixar-se conduzir por ele é o que torna esse fruto possível.' },
  { livro: 'Habacuc', capitulo: 3, versiculo: 18, reflexao: 'Mesmo quando tudo parece faltar — como descreve o profeta, figueira sem fruto, campos sem colheita —, ainda é possível escolher a alegria em Deus. Essa alegria não depende das circunstâncias, mas da certeza de que ele é a nossa salvação.' },
  { livro: 'Salmos', capitulo: 90, versiculo: 1, versiculoFim: 2, reflexao: 'Habitar sob a proteção do Altíssimo é fazer dele o lugar onde moramos, não apenas um socorro ocasional. É essa confiança constante — Deus como refúgio, cidadela e apoio — que sustenta quem faz dele a sua morada.' },
  { livro: 'Salmos', capitulo: 26, versiculo: 1, reflexao: 'Quando o Senhor é a luz e a salvação, o medo perde o seu poder — não porque os perigos desapareçam, mas porque há uma confiança maior do que eles. É essa certeza que permite perguntar, sem medo da resposta: a quem temerei?' },
  { livro: 'Salmos', capitulo: 4, versiculo: 9, reflexao: 'Há uma paz que só vem de Deus: a segurança de adormecer tranquilo, sabendo que o repouso não depende das próprias forças, mas da proteção divina. É uma promessa simples e profunda para as noites de inquietação.' },
  { livro: 'Salmos', capitulo: 33, versiculo: 19, reflexao: 'Deus não se afasta de quem está ferido ou abatido — pelo contrário, é justamente aí que ele se aproxima. Essa promessa é um convite a não esconder a dor, mas a levá-la, sem vergonha, à presença de quem promete estar perto.' },
  { livro: 'Salmos', capitulo: 102, versiculo: 3, versiculoFim: 4, reflexao: 'Perdão, cura, resgate, coroa de bondade: o salmo enumera, um a um, os benefícios de quem se volta para Deus. Nenhuma falta é grande demais para o seu perdão, e nenhuma enfermidade está fora do alcance da sua misericórdia.' },
  { livro: 'Salmos', capitulo: 117, versiculo: 24, reflexao: 'Cada novo dia é, antes de tudo, um dia que Deus fez — e essa simples constatação já é motivo de alegria. Independentemente do que o dia trouxer, ele começa como um presente, não como uma obrigação.' },
  { livro: 'Salmos', capitulo: 29, versiculo: 6, reflexao: 'A promessa não nega a dor da noite, mas garante que ela não é definitiva: de manhã, volta a alegria. É uma imagem de esperança para quem atravessa um momento difícil — o choro de hoje não é a última palavra.' },
  { livro: 'Miquéias', capitulo: 6, versiculo: 8, reflexao: 'Diante de tantas perguntas sobre o que Deus espera de nós, o profeta resume tudo em três atitudes simples: praticar a justiça, amar a bondade e andar com humildade diante de Deus. Não é uma fórmula complicada — é um caminho de vida ao alcance de todos.' },
];

let promessaAtualIdx = null;
const prel = (id) => document.getElementById(id);

function sortearPromessa() {
  let idx;
  do {
    idx = Math.floor(Math.random() * PROMESSAS.length);
  } while (PROMESSAS.length > 1 && idx === promessaAtualIdx);
  promessaAtualIdx = idx;
  return PROMESSAS[idx];
}

function referenciaTexto(p) {
  return `${p.livro} ${p.capitulo},${p.versiculo}${p.versiculoFim ? '-' + p.versiculoFim : ''}`;
}

async function mostrarPromessa() {
  if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
  const p = sortearPromessa();
  const statusEl = prel('promessaStatus');
  const resultado = prel('promessaResultado');

  resultado.classList.add('hidden');
  statusEl.textContent = 'Sorteando uma promessa…';
  statusEl.classList.remove('hidden', 'error');

  try {
    if (window.MinhaLiturgiaBible) await window.MinhaLiturgiaBible.loadBible();
    const texto = window.MinhaLiturgiaBible && window.MinhaLiturgiaBible.getVerseRange(p.livro, p.capitulo, p.versiculo, p.versiculoFim);
    if (!texto) throw new Error('Versículo não encontrado');

    prel('promessaRef').textContent = referenciaTexto(p);
    prel('promessaTexto').textContent = texto;
    prel('promessaReflexao').textContent = p.reflexao;

    statusEl.classList.add('hidden');
    resultado.classList.remove('hidden');
  } catch (e) {
    statusEl.textContent = 'Não foi possível buscar o versículo agora. Verifique a conexão e tente de novo.';
    statusEl.classList.add('error');
  }
}

function initPromessas() {
  const btn = prel('promessaBtn');
  if (btn) btn.addEventListener('click', mostrarPromessa);
  const btnOutra = prel('promessaOutraBtn');
  if (btnOutra) btnOutra.addEventListener('click', mostrarPromessa);
  const narrateBtn = prel('narratePromessaBtn');
  if (narrateBtn) {
    narrateBtn.addEventListener('click', () => {
      if (window.MinhaLiturgiaNarration) {
        window.MinhaLiturgiaNarration.toggle(narrateBtn, () =>
          `${prel('promessaRef').textContent}. ${prel('promessaTexto').textContent} Reflexão. ${prel('promessaReflexao').textContent}`
        );
      }
    });
  }
}

window.MinhaLiturgiaPromessas = { initPromessas };
