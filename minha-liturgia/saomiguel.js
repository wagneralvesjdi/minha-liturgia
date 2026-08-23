'use strict';

/* ---------- Instituto Hesed ---------- */

const HESED_ORACOES = [
  {
    titulo: 'Oração a São Miguel Arcanjo',
    texto:
      'São Miguel Arcanjo, defendei-nos no combate; sede nosso refúgio contra a maldade e as ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos; e vós, Príncipe da milícia celeste, pela virtude divina, precipitai ao inferno a Satanás e a todos os espíritos malignos que andam pelo mundo para perder as almas. Amém.',
    fonteNota:
      'Também chamada de "Pequeno Exorcismo de Leão XIII" (1886), de uso universal na Igreja. Reproduzida aqui na redação tradicional consagrada — a edição do Devocionário do Instituto Hesed traz este trecho com uma pequena falha de diagramação.',
  },
  {
    titulo: 'Ladainha de São Miguel Arcanjo',
    texto:
      'Senhor, tende piedade de nós.\nJesus Cristo, tende piedade de nós.\nSenhor, tende piedade de nós.\n\nJesus Cristo, ouvi-nos.\nJesus Cristo, atendei-nos.\n\nPai celeste que sois Deus, tende piedade de nós.\nFilho, Redentor do mundo, que sois Deus, tende piedade de nós.\nEspírito Santo, que sois Deus, tende piedade de nós.\nTrindade Santa, que sois um único Deus, tende piedade de nós.\n\nSanta Maria, Rainha dos Anjos, rogai por nós.\nSão Miguel, rogai por nós.\nSão Miguel, cheio da graça de Deus, rogai por nós.\nSão Miguel, perfeito adorador do Verbo Divino, rogai por nós.\nSão Miguel, coroado de honra e glória, rogai por nós.\nSão Miguel, poderosíssimo Príncipe dos exércitos do Senhor, rogai por nós.\nSão Miguel, porta-estandarte da Santíssima Trindade, rogai por nós.\nSão Miguel, guardião do Paraíso, rogai por nós.\nSão Miguel, guia e consolador do povo israelita, rogai por nós.\nSão Miguel, esplendor e fortaleza da Igreja militante, rogai por nós.\nSão Miguel, honra e alegria da Igreja triunfante, rogai por nós.\nSão Miguel, luz dos Anjos, rogai por nós.\nSão Miguel, baluarte dos cristãos, rogai por nós.\nSão Miguel, força daqueles que combatem pelo estandarte da Cruz, rogai por nós.\nSão Miguel, luz e confiança das almas no último momento da vida, rogai por nós.\nSão Miguel, socorro muito certo, rogai por nós.\nSão Miguel, nosso auxílio em todas as adversidades, rogai por nós.\nSão Miguel, arauto da sentença eterna, rogai por nós.\nSão Miguel, consolador das almas que estão no Purgatório, rogai por nós.\nSão Miguel, a quem o Senhor incumbiu de receber as almas depois da morte, rogai por nós.\nSão Miguel, nosso Príncipe, rogai por nós.\nSão Miguel, nosso Advogado, rogai por nós.\n\nCordeiro de Deus, que tirais o pecado do mundo, perdoai-nos, Senhor.\nCordeiro de Deus, que tirais o pecado do mundo, ouvi-nos, Senhor.\nCordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós.\n\nCristo, ouvi-nos.\nCristo, atendei-nos.\n\nV. Rogai por nós, ó glorioso São Miguel, príncipe da Igreja de Jesus Cristo.\nR. Para que sejamos dignos de suas promessas.\n\nOremos:\nSenhor Jesus Cristo, santificai-nos por Vossa bênção sempre nova e concedei-nos, pela intercessão de São Miguel, esta sabedoria que nos ensina a ajuntar riquezas no céu e trocar os bens do tempo pela eternidade. Vós, que viveis e reinais pelos séculos dos séculos. Amém.',
    fonteNota:
      'Ladainha tradicional em honra a São Miguel Arcanjo, sem autoria individual identificada, reproduzida conforme o Devocionário Quaresma de São Miguel 2026 do Instituto Hesed.',
  },
  {
    titulo: 'Consagração a São Miguel Arcanjo',
    texto:
      'Gloriosíssimo Príncipe das Hierarquias Angélicas, valente arauto de Deus Altíssimo, zeloso campeão da glória do Senhor, terror dos anjos rebeldes, amor e delícia dos Anjos fiéis, meu diletíssimo Arcanjo São Miguel, desejando pertencer ao número dos vossos devotos e servos, hoje me ofereço a vós, dou-me e consagro-me a vós. Coloco a minha pessoa, a minha família e os meus bens sob a vossa potentíssima proteção. É muito pouca coisa a oferta que vos faço, sendo eu um miserável pecador, mas não duvido de que vós quereis aumentar o fervor no meu coração e proteger aquele que a vós recorre. Recordai aquele que hoje se coloca sob o vosso patrocínio e, de hoje em diante, protegei-me, assisti-me em todas as dificuldades da minha existência terrena, alcançai-me o perdão dos meus muitos e graves pecados, a graça de amar de todo o coração o meu Deus, o meu doce Salvador Jesus e a minha doce Mãe, Maria, e impetrai-me os auxílios necessários para obter a coroa da glória.\n\nDefendei a minha alma contra todos os seus inimigos e, quando chegar a hora de deixar este mundo, vinde então, Príncipe gloriosíssimo, assistir-me na luta final, e que o vosso gládio potente afaste para longe, para os abismos da morte e do inferno, o anjo apóstata e soberbo que derrotastes em combate no Céu. Amém.',
    fonteNota:
      'Oração tradicional de consagração a São Miguel Arcanjo, reproduzida conforme o Devocionário Quaresma de São Miguel 2026 do Instituto Hesed.',
  },
];

const HESED_DIAS = [
  { dia: 1, passagem: 'Hebreus 1,14', pergunta: 'Em quais momentos da minha vida tenho agido como se estivesse sozinho, esquecendo que Deus cuida de mim e envia o auxílio do Céu para guardar os meus passos?' },
  { dia: 2, passagem: 'Êxodo 23,20-21', pergunta: 'Em qual área da minha vida Deus tem me convidado a confiar mais na sua condução do que nas minhas próprias certezas?' },
  { dia: 3, passagem: 'Gênesis 3,24', pergunta: 'Existe alguma culpa, erro ou ferida que ainda me faz acreditar que não há mais caminho de volta para Deus?' },
  { dia: 4, passagem: 'Gênesis 28,12-17; João 1,51', pergunta: 'Qual é a "pedra" que hoje pesa sobre o meu coração e que Deus me convida a transformar em um altar de encontro com Ele?' },
  { dia: 5, passagem: 'Gênesis 18,1-14; Hebreus 13,2', pergunta: 'Existe alguma promessa de Deus que eu já deixei de esperar, acreditando que é tarde demais para que ela se cumpra na minha vida?' },
  { dia: 6, passagem: 'Gênesis 21,15-19', pergunta: 'Será que, como Agar, eu tenho permitido que o sofrimento feche os meus olhos para as graças que Deus já colocou no meu caminho?' },
  { dia: 7, passagem: 'Gênesis 22,1-18', pergunta: 'Qual é o "monte" que Deus me convida a subir hoje pela fé, confiando que a sua providência se manifestará no tempo certo?' },
  { dia: 8, passagem: 'Josué 5,13-15', pergunta: 'Qual é a "Jericó" que hoje está diante de mim e que Deus me convida a enfrentar de joelhos, confiando que Ele combate ao meu lado?' },
  { dia: 9, passagem: 'Êxodo 14,19-20', pergunta: 'Será que tenho vivido mais preocupado com aquilo que me persegue do que confiante na proteção que Deus já colocou sobre a minha vida?' },
  { dia: 10, passagem: 'Números 22,22-31', pergunta: 'Existe algum obstáculo que hoje eu ainda vejo como castigo ou atraso, quando Deus pode estar usando essa situação para me proteger de um mal que eu não consigo enxergar?' },
  { dia: 11, passagem: '2 Samuel 24,17', pergunta: 'Existe algum erro que eu ainda não tive a humildade de reconhecer diante de Deus, preferindo me justificar em vez de confiar na sua misericórdia?' },
  { dia: 12, passagem: '1 Reis 19,7-8', pergunta: 'Em qual área da minha vida eu tenho insistido em caminhar apenas com as minhas forças, sem deixar que Deus me alimente e me fortaleça para continuar?' },
  { dia: 13, passagem: '2 Reis 6,16-17', pergunta: 'Tenho olhado mais para os problemas que me cercam ou para a presença de Deus e dos seus anjos, que jamais deixam de me acompanhar?' },
  { dia: 14, passagem: '2 Reis 19,35', pergunta: 'Qual é a "carta de ameaças" que eu ainda carrego sozinho, em vez de colocá-la, como Ezequias, nas mãos de Deus?' },
  { dia: 15, passagem: 'Tobias 12,12; 15', pergunta: 'Se eu pudesse rever a minha história com os olhos da fé, em quais momentos eu descobriria que Deus nunca me deixou caminhar sozinho?' },
  { dia: 16, passagem: 'Daniel 10,12; 13', pergunta: 'Qual é a oração que eu já pensei em abandonar, sem imaginar que Deus pode estar agindo por ela desde o primeiro dia?' },
  { dia: 17, passagem: 'Lucas 1,20', pergunta: 'Qual é o silêncio que hoje eu tenho dificuldade de aceitar, sem perceber que Deus pode estar preparando algo novo dentro de mim?' },
  { dia: 18, passagem: 'Lucas 1,26-38', pergunta: 'Qual é o "sim" que Deus tem esperado de mim, mas que eu ainda não tive a coragem de dar?' },
  { dia: 19, passagem: 'Mateus 1,20-24', pergunta: 'Existe alguma situação da minha vida que eu tenho tentado resolver sozinho, sem dar a Deus a oportunidade de me mostrar um caminho que eu ainda não consigo enxergar?' },
  { dia: 20, passagem: 'Lucas 2,10-14', pergunta: 'Será que eu tenho desistido de esperar justamente daquilo que Deus ainda deseja realizar na minha vida?' },
  { dia: 21, passagem: 'Mateus 4,10', pergunta: 'Existe alguma proposta, escolha ou "atalho" que hoje parece bom aos meus olhos, mas que pode estar me afastando da vontade de Deus?' },
  { dia: 22, passagem: 'João 1,45-51', pergunta: 'Qual é o "rótulo" que eu ainda carrego sobre a minha vida e que tem me impedido de acreditar no olhar e no chamado que Deus faz para mim?' },
  { dia: 23, passagem: 'Lucas 22,43-44', pergunta: 'Qual é o "cálice" que hoje eu tenho dificuldade de aceitar e que preciso colocar, como Jesus, nas mãos do Pai?' },
  { dia: 24, passagem: 'Mateus 28,2.5-8', pergunta: 'Qual é a "pedra" que hoje pesa sobre o meu coração e que eu preciso deixar Deus remover para voltar a viver a alegria da Ressurreição?' },
  { dia: 25, passagem: 'Atos dos Apóstolos 1,9-11', pergunta: 'Existe alguma situação da minha vida em que eu tenho permanecido paralisado, quando Deus está me chamando a dar o próximo passo?' },
  { dia: 26, passagem: 'Atos dos Apóstolos 5,19-20', pergunta: 'Qual é a "prisão" da minha vida da qual eu preciso deixar Deus me libertar para voltar a caminhar na missão que Ele preparou para mim?' },
  { dia: 27, passagem: 'Atos dos Apóstolos 8,26-31', pergunta: 'Qual é o caminho que Deus tem colocado diante de mim e que eu ainda tenho dificuldade de percorrer porque não consigo entender os seus planos?' },
  { dia: 28, passagem: 'Atos dos Apóstolos 10,3-4', pergunta: 'A minha oração tem transformado também a minha maneira de viver e de amar, como aconteceu com Cornélio?' },
  { dia: 29, passagem: 'Atos dos Apóstolos 12,5-11 (com destaque para Atos 12,5-7)', pergunta: 'O que hoje tem roubado a minha paz e o meu descanso, quando Deus me convida a confiar n\'Ele como Pedro confiou naquela noite?' },
  { dia: 30, passagem: 'Atos dos Apóstolos 27,23-25', pergunta: 'Em qual tempestade da minha vida Deus hoje me convida a permanecer firme, confiando na sua Palavra antes mesmo de ver o milagre acontecer?' },
  { dia: 31, passagem: 'Gálatas 1,8 e 1 João 4,1', pergunta: 'Tenho buscado discernir se as vozes que tenho escutado me conduzem para mais perto de Deus ou me afastam da verdade do Evangelho?' },
  { dia: 32, passagem: 'Hebreus 12,22-23', pergunta: 'Quando eu rezo, tenho consciência de que nunca estou sozinho, mas unido aos anjos e aos santos diante de Deus?' },
  { dia: 33, passagem: 'Apocalipse 1,20', pergunta: 'Tenho olhado para as pessoas à minha volta apenas com os olhos humanos... ou consigo enxergá-la como Cristo a vê, sustentada por um anjo e guardada por Deus?' },
  { dia: 34, passagem: 'Apocalipse 12,7-9', pergunta: 'Tenho vivido as minhas batalhas como quem luta sozinho... ou com a certeza de que Cristo já venceu e São Miguel combate ao meu lado?' },
  { dia: 35, passagem: 'Apocalipse 7,1.3', pergunta: 'Tenho vivido com medo dos ventos e das tempestades da vida... ou com a confiança de que Deus continua conduzindo a história e guardando aqueles que lhe pertencem?' },
  { dia: 36, passagem: 'Apocalipse 8,2.4', pergunta: 'Tenho feito silêncio suficiente para escutar a voz de Deus e acolher os seus chamados à conversão?' },
  { dia: 37, passagem: 'Apocalipse 10,1.8-11', pergunta: 'Tenho acolhido a Palavra de Deus apenas quando ela consola... ou também quando ela me pede uma mudança de vida?' },
  { dia: 38, passagem: 'Apocalipse 14,14-20', pergunta: 'O que Deus está amadurecendo em mim durante este tempo de espera?' },
  { dia: 39, passagem: 'Apocalipse 21,9-27', pergunta: 'Ao longo desta Quaresma, meu coração passou a desejar mais o Céu?' },
  { dia: 40, passagem: 'Apocalipse 22,1-5', pergunta: 'O que Deus realizou em mim ao longo destes quarenta dias?' },
];

/* ---------- Frei Gilson (Itinerário São Miguel Arcanjo 2026 · Baixe Livros) ---------- */

const GILSON_ORACOES = [
  {
    titulo: 'Pequeno Exorcismo de Leão XIII',
    texto:
      'São Miguel Arcanjo, defendei-nos no combate. Sede o nosso refúgio contra as maldades e ciladas do demônio. Que Deus manifeste o seu poder sobre ele. Eis a nossa humilde súplica.\n\nE vós, Príncipe da Milícia Celeste, com o poder que Deus vos conferiu, precipitai no inferno Satanás e os outros espíritos malignos, que andam pelo mundo tentando as almas. Amém.',
    fonteNota:
      'Também conhecida como Oração a São Miguel Arcanjo, composição tradicional atribuída ao papa Leão XIII (1886), de uso universal na Igreja. Reproduzida conforme o Itinerário São Miguel Arcanjo 2026 (Frei Gilson · Baixe Livros).',
  },
  {
    titulo: 'Ladainha de São Miguel Arcanjo',
    texto:
      'Senhor, tende piedade de nós.\nJesus Cristo, tende piedade de nós.\nSenhor, tende piedade de nós.\n\nJesus Cristo, ouvi-nos.\nJesus Cristo, atendei-nos.\n\nPai Celeste, que sois Deus, tende piedade de nós.\nFilho Redentor do Mundo, que sois Deus, tende piedade de nós.\nEspírito Santo, que sois Deus, tende piedade de nós.\nTrindade Santa, que sois um único Deus, tende piedade de nós.\n\nSanta Maria, Rainha dos Anjos, rogai por nós.\nSão Miguel, rogai por nós.\nSão Miguel, cheio da graça de Deus, rogai por nós.\nSão Miguel, perfeito adorador do Verbo Divino, rogai por nós.\nSão Miguel, coroado de honra e de glória, rogai por nós.\nSão Miguel, poderosíssimo príncipe dos exércitos do Senhor, rogai por nós.\nSão Miguel, força daqueles que combatem pelo estandarte da cruz, rogai por nós.\nSão Miguel, luz e confiança das almas no último momento da vida, rogai por nós.\nSão Miguel, socorro muito certo, rogai por nós.\nSão Miguel, nosso auxílio em todas as adversidades, rogai por nós.\nSão Miguel, arauto da sentença eterna, rogai por nós.\nSão Miguel, consolador das almas que estão no Purgatório, rogai por nós.\nSão Miguel, a quem o Senhor incumbiu de receber as almas do Purgatório, rogai por nós.\nSão Miguel, nosso príncipe, rogai por nós.\nSão Miguel, nosso advogado, rogai por nós.\n\nCordeiro de Deus, que tirais o pecado do mundo, perdoai-nos, Senhor.\nCordeiro de Deus, que tirais o pecado do mundo, ouvi-nos, Senhor.\nCordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós, Senhor.\n\nRogai por nós, ó glorioso São Miguel, príncipe da Igreja de Cristo, para que sejamos dignos de Suas promessas.\n\nOração: Senhor Jesus, santificai-nos por uma bênção sempre nova e concedei-nos, pela intercessão de São Miguel, essa sabedoria que nos ensina a ajuntar riquezas do céu e a trocar os bens do tempo presente pelos da eternidade. Vós que viveis e reinais pelos séculos dos séculos. Amém.',
    fonteNota:
      'Ladainha tradicional em honra a São Miguel Arcanjo, sem autoria individual identificada. Reproduzida conforme o Itinerário São Miguel Arcanjo 2026 (Frei Gilson · Baixe Livros).',
  },
  {
    titulo: 'Consagração a São Miguel',
    texto:
      'Ó Príncipe nobilíssimo dos Anjos, valoroso guerreiro do Altíssimo, zeloso defensor da glória do Senhor, terror dos espíritos rebeldes, amor e delícia de todos os Anjos justos, meu diletíssimo Arcanjo São Miguel, desejando eu fazer parte do número dos vossos devotos e servos, a vós hoje me consagro, me dou e me ofereço, e ponho-me a mim próprio, a minha família e tudo o que me pertence, debaixo da vossa poderosíssima proteção.\n\nÉ pequena a oferta do meu serviço, sendo como sou um miserável pecador, mas vós engrandecereis o afeto do meu coração; recordai-vos que de hoje em diante estou debaixo do vosso sustento e deveis assistir-me em toda a minha vida e obter-me o perdão dos meus muitos e graves pecados, a graça de amar a Deus de todo o coração, ao meu querido Salvador Jesus Cristo e a minha Mãe Maria Santíssima.\n\nObtende-me aqueles auxílios que me são necessários para obter a coroa da eterna glória. Defendei-me dos inimigos da alma, especialmente na hora da morte. Vinde, ó príncipe gloriosíssimo, assistir-me na última luta e com a vossa arma poderosa lançai para longe, precipitando nos abismos do inferno, aquele anjo quebrador de promessas e soberbo que um dia prostrastes no combate no Céu.\n\nSão Miguel Arcanjo, defendei-nos no combate, para que não pereçamos no supremo juízo.',
    fonteNota:
      'Oração tradicional de consagração a São Miguel Arcanjo, sem autoria individual identificada. Reproduzida conforme o Itinerário São Miguel Arcanjo 2026 (Frei Gilson · Baixe Livros).',
  },
];

const GILSON_DIAS = [
  { dia: 1, diaSemana: 'Sábado', data: '15/08', titulo: 'Entregar o caminho ao Senhor', passagem: 'Sl 36,5', livro: 'Salmos', capitulo: 36, versIni: 5, versFim: 5 },
  { dia: 2, diaSemana: 'Segunda-Feira', data: '17/08', titulo: 'Disciplina que conduz ao Céu', passagem: '1Cor 9,25', livro: '1 Coríntios', capitulo: 9, versIni: 25, versFim: 25 },
  { dia: 3, diaSemana: 'Terça-Feira', data: '18/08', titulo: 'Planos nas mãos de Deus', passagem: 'Pr 16,3', livro: 'Provérbios', capitulo: 16, versIni: 3, versFim: 3 },
  { dia: 4, diaSemana: 'Quarta-Feira', data: '19/08', titulo: 'Um coração novo', passagem: 'Ez 36,26', livro: 'Ezequiel', capitulo: 36, versIni: 26, versFim: 26 },
  { dia: 5, diaSemana: 'Quinta-Feira', data: '20/08', titulo: 'Templo de Deus, casa em ordem', passagem: '1Cor 3,16', livro: '1 Coríntios', capitulo: 3, versIni: 16, versFim: 16 },
  { dia: 6, diaSemana: 'Sexta-Feira', data: '21/08', titulo: 'Curar memórias feridas', passagem: 'Sl 146,3', livro: 'Salmos', capitulo: 146, versIni: 3, versFim: 3 },
  { dia: 7, diaSemana: 'Sábado', data: '22/08', titulo: 'Medo do futuro, não!', passagem: 'Is 41,10', livro: 'Isaías', capitulo: 41, versIni: 10, versFim: 10 },
  { dia: 8, diaSemana: 'Segunda-Feira', data: '24/08', titulo: 'Pais e filhos no Senhor', passagem: 'Cl 3,21', livro: 'Colossenses', capitulo: 3, versIni: 21, versFim: 21 },
  { dia: 9, diaSemana: 'Terça-Feira', data: '25/08', titulo: 'Governar as emoções', passagem: 'Pr 25,28', livro: 'Provérbios', capitulo: 25, versIni: 28, versFim: 28 },
  { dia: 10, diaSemana: 'Quarta-Feira', data: '26/08', titulo: 'Diálogo que escuta', passagem: 'Tg 1,19', livro: 'Tiago', capitulo: 1, versIni: 19, versFim: 19 },
  { dia: 11, diaSemana: 'Quinta-Feira', data: '27/08', titulo: 'Educar os filhos no Senhor', passagem: 'Dt 6,7', livro: 'Deuteronômio', capitulo: 6, versIni: 7, versFim: 7 },
  { dia: 12, diaSemana: 'Sexta-Feira', data: '28/08', titulo: 'Honestidade nos negócios', passagem: 'Pr 11,1', livro: 'Provérbios', capitulo: 11, versIni: 1, versFim: 1 },
  { dia: 13, diaSemana: 'Sábado', data: '29/08', titulo: 'Coerência que aponta para Cristo', passagem: 'Jo 3,30', livro: 'João', capitulo: 3, versIni: 30, versFim: 30 },
  { dia: 14, diaSemana: 'Segunda-Feira', data: '31/08', titulo: 'Oferecer as dores em amor', passagem: 'Cl 1,24', livro: 'Colossenses', capitulo: 1, versIni: 24, versFim: 24 },
  { dia: 15, diaSemana: 'Terça-Feira', data: '01/09', titulo: 'Administração fiel dos bens', passagem: 'Pr 3,9', livro: 'Provérbios', capitulo: 3, versIni: 9, versFim: 9 },
  { dia: 16, diaSemana: 'Quarta-Feira', data: '02/09', titulo: 'Ansiedade sob a graça', passagem: 'Fl 4,6-7', livro: 'Filipenses', capitulo: 4, versIni: 6, versFim: 7 },
  { dia: 17, diaSemana: 'Quinta-Feira', data: '03/09', titulo: 'Cuidar do corpo, templo do Espírito', passagem: '1Cor 6,19', livro: '1 Coríntios', capitulo: 6, versIni: 19, versFim: 19 },
  { dia: 18, diaSemana: 'Sexta-Feira', data: '04/09', titulo: 'Sobriedade do olhar', passagem: 'Sl 100,3', livro: 'Salmos', capitulo: 100, versIni: 3, versFim: 3 },
  { dia: 19, diaSemana: 'Sábado', data: '05/09', titulo: 'Afetos bem ordenados', passagem: '1Cor 13,5', livro: '1 Coríntios', capitulo: 13, versIni: 5, versFim: 5 },
  { dia: 20, diaSemana: 'Segunda-Feira', data: '07/09', titulo: 'Autodomínio e liberdade interior', passagem: '1Cor 6,12', livro: '1 Coríntios', capitulo: 6, versIni: 12, versFim: 12 },
  { dia: 21, diaSemana: 'Terça-Feira', data: '08/09', titulo: 'Descanso que cura', passagem: 'Pr 3,24', livro: 'Provérbios', capitulo: 3, versIni: 24, versFim: 24 },
  { dia: 22, diaSemana: 'Quarta-Feira', data: '09/09', titulo: 'Verdade no falar', passagem: 'Ef 4,25', livro: 'Efésios', capitulo: 4, versIni: 25, versFim: 25 },
  { dia: 23, diaSemana: 'Quinta-Feira', data: '10/09', titulo: 'Corrigir com caridade', passagem: 'Mt 18,15', livro: 'Mateus', capitulo: 18, versIni: 15, versFim: 15 },
  { dia: 24, diaSemana: 'Sexta-Feira', data: '11/09', titulo: 'Planejar com prudência', passagem: 'Lc 14,28', livro: 'Lucas', capitulo: 14, versIni: 28, versFim: 28 },
  { dia: 25, diaSemana: 'Sábado', data: '12/09', titulo: 'Integridade quando ninguém vê', passagem: 'Pr 11,3', livro: 'Provérbios', capitulo: 11, versIni: 3, versFim: 3 },
  { dia: 26, diaSemana: 'Segunda-Feira', data: '14/09', titulo: 'Gloriar-se na Cruz', passagem: 'Gl 6,14', livro: 'Gálatas', capitulo: 6, versIni: 14, versFim: 14 },
  { dia: 27, diaSemana: 'Terça-Feira', data: '15/09', titulo: 'De pé junto à Cruz', passagem: 'Jo 19,25', livro: 'João', capitulo: 19, versIni: 25, versFim: 25 },
  { dia: 28, diaSemana: 'Quarta-Feira', data: '16/09', titulo: 'Vocação e propósito', passagem: 'Jr 1,5', livro: 'Jeremias', capitulo: 1, versIni: 5, versFim: 5 },
  { dia: 29, diaSemana: 'Quinta-Feira', data: '17/09', titulo: 'Luz no mundo', passagem: 'Mt 5,16', livro: 'Mateus', capitulo: 5, versIni: 16, versFim: 16 },
  { dia: 30, diaSemana: 'Sexta-Feira', data: '18/09', titulo: 'Cuidar dos que sofrem', passagem: 'Tg 1,27', livro: 'Tiago', capitulo: 1, versIni: 27, versFim: 27 },
  { dia: 31, diaSemana: 'Sábado', data: '19/09', titulo: 'Comunicação que edifica', passagem: 'Ef 4,29', livro: 'Efésios', capitulo: 4, versIni: 29, versFim: 29 },
  { dia: 32, diaSemana: 'Segunda-Feira', data: '21/09', titulo: 'Providência de Deus', passagem: 'Mt 6,33', livro: 'Mateus', capitulo: 6, versIni: 33, versFim: 33 },
  { dia: 33, diaSemana: 'Terça-Feira', data: '22/09', titulo: 'Libertação de vícios', passagem: 'Jo 8,36', livro: 'João', capitulo: 8, versIni: 36, versFim: 36 },
  { dia: 34, diaSemana: 'Quarta-Feira', data: '23/09', titulo: 'Minha casa será abençoada', passagem: 'Lc 19,9', livro: 'Lucas', capitulo: 19, versIni: 9, versFim: 9 },
  { dia: 35, diaSemana: 'Quinta-Feira', data: '24/09', titulo: 'Perdoar os irmãos', passagem: 'Lc 6,37', livro: 'Lucas', capitulo: 6, versIni: 37, versFim: 37 },
  { dia: 36, diaSemana: 'Sexta-Feira', data: '25/09', titulo: 'Efusão do Espírito', passagem: 'Jl 3,1', livro: 'Joel', capitulo: 3, versIni: 1, versFim: 1 },
  { dia: 37, diaSemana: 'Sábado', data: '26/09', titulo: 'Virgem Maria, modelo da entrega', passagem: 'Lc 1,38', livro: 'Lucas', capitulo: 1, versIni: 38, versFim: 38 },
  { dia: 38, diaSemana: 'Domingo', data: '27/09', titulo: 'Perseverar com alegria', passagem: 'Hb 12,2', livro: 'Hebreus', capitulo: 12, versIni: 2, versFim: 2 },
  { dia: 39, diaSemana: 'Segunda-Feira', data: '28/09', titulo: 'Louvor pelas vitórias de Deus', passagem: 'Sl 99,4', livro: 'Salmos', capitulo: 99, versIni: 4, versFim: 4 },
  { dia: 40, diaSemana: 'Terça-Feira', data: '29/09', titulo: 'FESTA DE SÃO MIGUEL ARCANJO', passagem: 'Ap 12,7.10', livro: 'Apocalipse', capitulo: 12, versIni: 7, versFim: 10 },
];

const GILSON_DIARIO_CAMPOS = [
  { chave: 'proposito', label: 'Propósito do dia' },
  { chave: 'meditacao', label: 'O que tirei da meditação' },
  { chave: 'pregacao', label: 'O que mais me marcou' },
  { chave: 'missa', label: 'Intenções para a Santa Missa' },
];

const HESED_FIDELIDADE_KEY = 'liturgia_quaresma_saomiguel_fidelidade';
const GILSON_FIDELIDADE_KEY = 'liturgia_quaresma_gilson_fidelidade';
const GILSON_DIARIO_KEY = 'liturgia_quaresma_gilson_diario';

const smel = (id) => document.getElementById(id);

function lerLista(chave) {
  try {
    const raw = localStorage.getItem(chave);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function salvarLista(chave, dias) {
  try {
    localStorage.setItem(chave, JSON.stringify(dias));
  } catch (e) {
    /* localStorage indisponível: fidelidade não será lembrada nesta sessão */
  }
}

function lerDiario() {
  try {
    const raw = localStorage.getItem(GILSON_DIARIO_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function salvarDiario(diario) {
  try {
    localStorage.setItem(GILSON_DIARIO_KEY, JSON.stringify(diario));
  } catch (e) {
    /* localStorage indisponível: diário não será lembrado nesta sessão */
  }
}

/* ---------- Passagem bíblica dedicada (compartilhada pelas duas trilhas) ---------- */

let passagemVoltarStep = 'saomiguel-step-hesed-roteiro';

function parsePassagemPrimaria(passagemStr) {
  let s = passagemStr.replace(/\([^)]*\)/g, '').trim();
  s = s.split(/ e /i)[0].trim();
  const parts = s.split(';').map((p) => p.trim());
  const first = parts[0];
  const m = first.match(/^(.+?)\s+(\d+)\s*,\s*([\d.\-–]+)$/);
  if (!m) return null;
  const livro = m[1].trim();
  const capitulo = parseInt(m[2], 10);
  let verseSpec = m[3];

  for (let i = 1; i < parts.length; i++) {
    if (/^[\d.\-–]+$/.test(parts[i])) verseSpec += '.' + parts[i];
    else break;
  }

  const nums = [];
  verseSpec.split('.').forEach((grp) => {
    const range = grp.match(/^(\d+)\s*[-–]\s*(\d+)$/);
    if (range) nums.push(parseInt(range[1], 10), parseInt(range[2], 10));
    else if (/^\d+$/.test(grp)) nums.push(parseInt(grp, 10));
  });
  if (!nums.length) return null;

  return { livro, capitulo, versIni: Math.min(...nums), versFim: Math.max(...nums) };
}

let ultimaPassagemLida = null;

async function abrirPassagemDedicada(item, voltarStepId) {
  if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
  ultimaPassagemLida = null;
  passagemVoltarStep = voltarStepId;
  const ref = item.livro
    ? { livro: item.livro, capitulo: item.capitulo, versIni: item.versIni, versFim: item.versFim }
    : parsePassagemPrimaria(item.passagem);

  if (!ref || !window.MinhaLiturgiaBible) {
    if (window.showToast) window.showToast('Não foi possível abrir esta passagem automaticamente.');
    return;
  }

  smel(voltarStepId).classList.add('hidden');
  smel('saomiguel-step-passagem').classList.remove('hidden');
  const titulo = item.titulo ? `${item.dia}º Dia — ${item.titulo}` : `${item.dia}º Dia — ${item.passagem}`;
  smel('quaresmaPassagemTitulo').textContent = titulo;
  const versosEl = smel('quaresmaPassagemVersos');
  versosEl.innerHTML = '';
  const statusEl = smel('quaresmaPassagemStatus');
  statusEl.textContent = 'Carregando a passagem…';
  statusEl.classList.remove('hidden');

  const resultado = await window.MinhaLiturgiaBible.getPassageVerses(ref.livro, ref.capitulo, ref.versIni, ref.versFim);
  if (!resultado) {
    statusEl.textContent = 'Não foi possível localizar esta passagem automaticamente. Busque manualmente na Bíblia.';
    return;
  }

  statusEl.classList.add('hidden');
  ultimaPassagemLida = resultado;
  smel('quaresmaPassagemRef').textContent = `${resultado.livroNome} ${resultado.capitulo}`;
  resultado.versiculos.forEach((v) => {
    const p = document.createElement('p');
    p.className = 'verse';
    const num = document.createElement('span');
    num.className = 'verse-num';
    num.textContent = v.numero;
    p.appendChild(num);
    p.appendChild(document.createTextNode(' ' + v.texto));
    versosEl.appendChild(p);
  });
}

/* ---------- Renderização genérica de listas de orações ---------- */

function renderOracoesList(listaId, oracoes, tituloId, textoId, notaId, stepListaId, stepLeituraId) {
  const list = smel(listaId);
  list.innerHTML = '';
  oracoes.forEach((oracao) => {
    const btn = document.createElement('button');
    btn.className = 'book-btn';
    btn.innerHTML = `<span>${oracao.titulo}</span>`;
    btn.addEventListener('click', () => {
      if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
      smel(tituloId).textContent = oracao.titulo;
      smel(textoId).textContent = oracao.texto;
      const notaEl = smel(notaId);
      notaEl.textContent = oracao.fonteNota || '';
      notaEl.classList.toggle('hidden', !oracao.fonteNota);
      smel(stepListaId).classList.add('hidden');
      smel(stepLeituraId).classList.remove('hidden');
    });
    list.appendChild(btn);
  });
}

/* ---------- Instituto Hesed: roteiro ---------- */

function renderHesedRoteiro() {
  const marcados = new Set(lerLista(HESED_FIDELIDADE_KEY));
  const list = smel('quaresmaRoteiroList');
  list.innerHTML = '';

  HESED_DIAS.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card section quaresma-dia';

    const header = document.createElement('div');
    header.className = 'quaresma-dia-header';

    const titulo = document.createElement('h3');
    titulo.textContent = `${item.dia}º Dia`;
    header.appendChild(titulo);

    const check = document.createElement('label');
    check.className = 'quaresma-dia-check';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = marcados.has(item.dia);
    input.addEventListener('change', () => {
      const atuais = new Set(lerLista(HESED_FIDELIDADE_KEY));
      if (input.checked) atuais.add(item.dia);
      else atuais.delete(item.dia);
      salvarLista(HESED_FIDELIDADE_KEY, Array.from(atuais));
    });
    check.appendChild(input);
    check.appendChild(document.createTextNode(' Rezado'));
    header.appendChild(check);

    card.appendChild(header);

    const passagem = document.createElement('button');
    passagem.type = 'button';
    passagem.className = 'reference quaresma-passagem-link';
    passagem.innerHTML = `<strong>Passagem bíblica:</strong> ${item.passagem} <span class="quaresma-passagem-icone" aria-hidden="true">›</span>`;
    passagem.addEventListener('click', () => abrirPassagemDedicada(item, 'saomiguel-step-hesed-roteiro'));
    card.appendChild(passagem);

    const pergunta = document.createElement('p');
    pergunta.className = 'prayer-text';
    pergunta.innerHTML = `<strong>Pergunta para reflexão:</strong> ${item.pergunta}`;
    card.appendChild(pergunta);

    list.appendChild(card);
  });
}

/* ---------- Frei Gilson: roteiro ---------- */

function renderGilsonRoteiro() {
  const marcados = new Set(lerLista(GILSON_FIDELIDADE_KEY));
  const diario = lerDiario();
  const list = smel('gilsonRoteiroList');
  list.innerHTML = '';

  GILSON_DIAS.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card section quaresma-dia';

    const header = document.createElement('div');
    header.className = 'quaresma-dia-header';

    const titulo = document.createElement('h3');
    titulo.textContent = `${item.dia}º Dia`;
    header.appendChild(titulo);

    const check = document.createElement('label');
    check.className = 'quaresma-dia-check';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = marcados.has(item.dia);
    input.addEventListener('change', () => {
      const atuais = new Set(lerLista(GILSON_FIDELIDADE_KEY));
      if (input.checked) atuais.add(item.dia);
      else atuais.delete(item.dia);
      salvarLista(GILSON_FIDELIDADE_KEY, Array.from(atuais));
    });
    check.appendChild(input);
    check.appendChild(document.createTextNode(' Rezado'));
    header.appendChild(check);

    card.appendChild(header);

    const dataLinha = document.createElement('p');
    dataLinha.className = 'date-line';
    dataLinha.textContent = `${item.diaSemana} · ${item.data}`;
    card.appendChild(dataLinha);

    const temaTitulo = document.createElement('p');
    temaTitulo.className = 'refrain';
    temaTitulo.textContent = item.titulo;
    card.appendChild(temaTitulo);

    const passagem = document.createElement('button');
    passagem.type = 'button';
    passagem.className = 'reference quaresma-passagem-link';
    passagem.innerHTML = `<strong>Passagem bíblica:</strong> ${item.passagem} <span class="quaresma-passagem-icone" aria-hidden="true">›</span>`;
    passagem.addEventListener('click', () => abrirPassagemDedicada(item, 'saomiguel-step-gilson-roteiro'));
    card.appendChild(passagem);

    const diarioDetails = document.createElement('details');
    diarioDetails.className = 'quaresma-diario';
    const summary = document.createElement('summary');
    summary.textContent = 'Meu diário deste dia';
    diarioDetails.appendChild(summary);

    const diaDiario = diario[item.dia] || {};
    GILSON_DIARIO_CAMPOS.forEach((campo) => {
      const label = document.createElement('label');
      label.className = 'quaresma-diario-label';
      label.textContent = campo.label;
      const textarea = document.createElement('textarea');
      textarea.className = 'quaresma-diario-textarea';
      textarea.rows = 2;
      textarea.value = diaDiario[campo.chave] || '';
      textarea.addEventListener('change', () => {
        const atual = lerDiario();
        atual[item.dia] = atual[item.dia] || {};
        atual[item.dia][campo.chave] = textarea.value;
        salvarDiario(atual);
      });
      label.appendChild(textarea);
      diarioDetails.appendChild(label);
    });

    card.appendChild(diarioDetails);
    list.appendChild(card);
  });
}

/* ---------- Navegação ---------- */

function initSaoMiguel() {
  renderOracoesList('saoMiguelList', HESED_ORACOES, 'saoMiguelTitulo', 'saoMiguelTexto', 'saoMiguelNota', 'saomiguel-step-hesed', 'saomiguel-step-hesed-leitura');
  renderOracoesList('gilsonOracoesList', GILSON_ORACOES, 'gilsonOracaoTitulo', 'gilsonOracaoTexto', 'gilsonOracaoNota', 'saomiguel-step-gilson', 'saomiguel-step-gilson-leitura');
  renderHesedRoteiro();
  renderGilsonRoteiro();

  smel('goSaoMiguelHesed').addEventListener('click', () => {
    smel('saomiguel-step-home').classList.add('hidden');
    smel('saomiguel-step-hesed').classList.remove('hidden');
  });
  smel('goSaoMiguelGilson').addEventListener('click', () => {
    smel('saomiguel-step-home').classList.add('hidden');
    smel('saomiguel-step-gilson').classList.remove('hidden');
  });

  document.querySelectorAll('[data-back-to="saomiguel-home"]').forEach((b) => {
    b.addEventListener('click', () => {
      ['saomiguel-step-hesed', 'saomiguel-step-hesed-leitura', 'saomiguel-step-hesed-roteiro',
        'saomiguel-step-gilson', 'saomiguel-step-gilson-leitura', 'saomiguel-step-gilson-roteiro',
        'saomiguel-step-passagem'].forEach((id) => smel(id).classList.add('hidden'));
      smel('saomiguel-step-home').classList.remove('hidden');
    });
  });

  document.querySelectorAll('[data-back-to="saomiguel-hesed"]').forEach((b) => {
    b.addEventListener('click', () => {
      if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
      smel('saomiguel-step-hesed-leitura').classList.add('hidden');
      smel('saomiguel-step-hesed-roteiro').classList.add('hidden');
      smel('saomiguel-step-hesed').classList.remove('hidden');
    });
  });

  document.querySelectorAll('[data-back-to="saomiguel-gilson"]').forEach((b) => {
    b.addEventListener('click', () => {
      if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
      smel('saomiguel-step-gilson-leitura').classList.add('hidden');
      smel('saomiguel-step-gilson-roteiro').classList.add('hidden');
      smel('saomiguel-step-gilson').classList.remove('hidden');
    });
  });

  smel('goHesedRoteiro').addEventListener('click', () => {
    smel('saomiguel-step-hesed').classList.add('hidden');
    smel('saomiguel-step-hesed-roteiro').classList.remove('hidden');
  });
  smel('goGilsonRoteiro').addEventListener('click', () => {
    smel('saomiguel-step-gilson').classList.add('hidden');
    smel('saomiguel-step-gilson-roteiro').classList.remove('hidden');
  });

  smel('quaresmaPassagemVoltar').addEventListener('click', () => {
    if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
    smel('saomiguel-step-passagem').classList.add('hidden');
    smel(passagemVoltarStep).classList.remove('hidden');
  });

  smel('narrateSaoMiguelBtn').addEventListener('click', () => {
    if (window.MinhaLiturgiaNarration) {
      window.MinhaLiturgiaNarration.toggle(smel('narrateSaoMiguelBtn'), () =>
        `${smel('saoMiguelTitulo').textContent}. ${smel('saoMiguelTexto').textContent}`
      );
    }
  });
  smel('narrateGilsonOracaoBtn').addEventListener('click', () => {
    if (window.MinhaLiturgiaNarration) {
      window.MinhaLiturgiaNarration.toggle(smel('narrateGilsonOracaoBtn'), () =>
        `${smel('gilsonOracaoTitulo').textContent}. ${smel('gilsonOracaoTexto').textContent}`
      );
    }
  });
  smel('narrateQuaresmaPassagemBtn').addEventListener('click', () => {
    if (window.MinhaLiturgiaNarration) {
      window.MinhaLiturgiaNarration.toggle(smel('narrateQuaresmaPassagemBtn'), () => {
        if (!ultimaPassagemLida) return '';
        return `${ultimaPassagemLida.livroNome} ${ultimaPassagemLida.capitulo}. ${ultimaPassagemLida.versiculos.map((v) => v.texto).join(' ')}`;
      });
    }
  });
}

window.MinhaLiturgiaSaoMiguel = { initSaoMiguel };
