'use strict';

/* ---------- Orações Diversas ---------- */
/* Orações originais para necessidades do dia a dia — cura, proteção,
   família, trabalho, momentos difíceis — mais a tradicional Oração a
   São Miguel Arcanjo (Papa Leão XIII, 1886, de domínio público).
   Textos próprios, escritos para este app; não reproduzem nenhuma
   obra de terceiros. */

const ORACOES_DIVERSAS = [
  {
    titulo: 'Pela Saúde de Quem Está Doente',
    texto: 'Senhor Jesus, que passastes pelo mundo curando os enfermos e consolando os aflitos, olhai com bondade para [diga o nome], que hoje sofre na saúde do corpo. Tocai essa doença com a vossa mão de médico divino: dai força aos médicos que cuidam dele(a), paciência a quem o(a) acompanha, e a ele(a) mesmo a certeza de que não está sozinho(a) nessa provação. Se for da vossa vontade, concedei a cura completa; e, enquanto ela não vem, dai a graça de viver esse tempo com fé, sem perder a esperança nem a paz do coração. Maria, Saúde dos Enfermos, intercedei por nós. Amém.',
  },
  {
    titulo: 'De Proteção Contra Todo Mal',
    texto: 'Senhor, meu Deus, vós que sois mais forte que qualquer mal, cobri-me hoje com a vossa proteção. Afastai de mim e da minha casa tudo o que vem para destruir: o medo que paralisa, a inveja que envenena, a discórdia que separa. Colocai os vossos anjos de guarda ao meu redor, para que eu ande seguro pelos caminhos deste dia. Que nenhuma força contrária a vós tenha poder sobre a minha vida, minha família e meu trabalho, porque a vós pertenço, e em vós ponho toda a minha confiança. Por Cristo, nosso Senhor. Amém.',
  },
  {
    titulo: 'Para Caminhar na Luz',
    texto: 'Pai de bondade, vós me fizestes filho(a) da luz pelo Batismo; não deixai que eu volte a andar às escuras. Dissipai em mim tudo o que é confusão, mentira ou trevas, e acendei de novo, se estiver fraca, a chama da fé que recebi. Que Cristo, luz do mundo, ilumine as decisões que preciso tomar hoje, e que eu tenha coragem de escolher sempre o caminho que leva a vós. Amém.',
  },
  {
    titulo: 'Pela Cura das Feridas Interiores',
    texto: 'Senhor Jesus, médico das almas, sei que carrego feridas que não se veem por fora: mágoas antigas, palavras que doeram, momentos em que fui ferido(a) e não consegui perdoar. Entrai nesses lugares escondidos do meu coração e curai o que só vós enxergais. Ajudai-me a olhar para o meu passado sem medo, entregando a vós cada lembrança que ainda pesa, para que eu possa viver livre, capaz de amar sem as marcas do que me machucou. Coração de Jesus, manso e humilde, fazei o meu coração semelhante ao vosso. Amém.',
  },
  {
    titulo: 'Antes de Sair de Casa',
    texto: 'Senhor, antes de sair, entrego a vós este dia inteiro: o trabalho ou o estudo que me espera, as pessoas que vou encontrar, as decisões que vou precisar tomar. Ide comigo por onde eu for, e trazei-me de volta em segurança. Guardai também quem fica em casa, e minha família toda, onde quer que cada um esteja. Que tudo o que eu fizer hoje seja para o bem e para a vossa glória. Anjo da guarda, caminhai ao meu lado. Amém.',
  },
  {
    titulo: 'Por Trabalho e Sustento',
    texto: 'São José, que sustentastes a Sagrada Família com o suor do vosso trabalho, olhai por mim, que hoje preciso de uma oportunidade para trabalhar e sustentar os meus. Abri portas onde parecem fechadas, dai-me perseverança para não desanimar a cada recusa, e humildade para começar de novo quantas vezes for preciso. Que eu nunca perca a dignidade nem a esperança nessa busca, e que, quando o trabalho vier, eu o exerça com honestidade e gratidão a Deus. Amém.',
  },
  {
    titulo: 'Pelas Finanças da Família',
    texto: 'Senhor, vós conheceis as contas que não fecham e as noites de preocupação com o dinheiro que falta. Não peço riqueza, peço o suficiente para viver com dignidade e ainda poder ajudar quem tem menos do que eu. Dai-me sabedoria para administrar bem o pouco ou o muito que tenho, coragem para enfrentar as dívidas sem desespero, e a confiança de que vós não abandonais quem trabalha e confia em vós. Livrai a minha família da ansiedade pelo amanhã, e ensinai-nos a viver de mãos abertas, dando o que podemos e recebendo com gratidão o que vem de vós. Amém.',
  },
  {
    titulo: 'Pela Bênção da Família',
    texto: 'Senhor, abençoai esta família que é minha: os que moram comigo e os que já seguiram seus próprios caminhos. Que a nossa casa seja lugar de acolhida e não de brigas, de perdão e não de rancor guardado. Abençoai o trabalho de cada um, a saúde de cada um, os sonhos de cada um. Onde há distância entre nós, aproximai; onde há mágoa antiga, curai; onde já existe amor, fazei crescer ainda mais. Que a paz do Senhor habite nesta casa hoje e sempre. Amém.',
  },
  {
    titulo: 'De Consagração da Casa',
    texto: 'Senhor Deus, esta casa é dom vosso, e a vós a entrego de coração. Abençoai cada cômodo, cada pessoa que aqui mora e cada visita que aqui entrar. Que dentro destas paredes se viva a paz, se pratique a caridade e se reze com fé. Afastai daqui tudo o que fere a comunhão entre nós, e fazei desta casa um lugar onde a vossa presença se sinta em cada gesto simples do dia a dia — no pão partido, na conversa em família, no descanso depois do trabalho. Maria e José, guardai este lar sob o vosso olhar. Amém.',
  },
  {
    titulo: 'De Consagração da Família a Jesus e Maria',
    texto: 'Jesus e Maria, entrego a vós esta família, com tudo o que ela é: as alegrias que vivemos juntos e as dificuldades que ainda enfrentamos. Sede o centro da nossa casa, o motivo pelo qual nos esforçamos por nos entender e por recomeçar depois de cada desentendimento. Ensinai-nos a amar como vós amastes em Nazaré: com paciência, com trabalho, com oração simples e constante. Que, um dia, todos os que fazem parte desta família estejam reunidos convosco na eternidade. Amém.',
  },
  {
    titulo: 'Pelos Filhos',
    texto: 'Senhor, os filhos que me destes são, antes de tudo, vossos; eu os recebi para cuidar deles pelo tempo que vós me confiardes essa missão. Abençoai cada um: dai-lhes saúde, dai-lhes bons amigos, dai-lhes um coração capaz de reconhecer o bem e recusar o mal. Onde eu errar como pai/mãe, corrigi com a vossa graça o que faltar em mim. Protegei-os dos perigos que não posso controlar, e sede vós, sempre, o verdadeiro guia da vida deles, hoje e quando eu já não estiver aqui para cuidar. Amém.',
  },
  {
    titulo: 'Nos Tempos Difíceis',
    texto: '"Nada temas, porque eu te resgatei; eu te chamei pelo teu nome, tu és meu" (Is 43,1). Senhor, estou atravessando um tempo difícil, e confesso que às vezes minhas forças não bastam. Peço-vos: sede vós a força que me falta. Onde há medo, dai coragem; onde há cansaço, dai fôlego; onde há vontade de desistir, lembrai-me de que já venci outras provações convosco ao meu lado. Não peço que a dificuldade desapareça agora, mas que eu não a atravesse sozinho(a). Ficai comigo, Senhor. Amém.',
  },
  {
    titulo: 'Para Pedir Ânimo',
    texto: '"Eu vim para que tenham vida, e a tenham em abundância" (Jo 10,10). Senhor, hoje o desânimo pesa mais do que o costume. Reacendei em mim a vontade de continuar. Lembrai-me de que já superei dias difíceis antes, e de que a vossa graça não falta justamente quando mais preciso dela. Dai-me um sinal, hoje, de que estais comigo — pode ser pequeno, basta que eu tenha olhos para reconhecê-lo. Levantai-me, Senhor, e ponde-me de novo a caminhar. Amém.',
  },
  {
    titulo: 'Pela Cura da História da Família',
    texto: 'Senhor, olho para trás e vejo, na história da minha família, feridas que se repetem de geração em geração: rupturas, vícios, silêncios que nunca foram curados. Coloco diante de vós tudo o que vem de longe e ainda pesa sobre nós hoje. Quebrai, pelo poder da cruz de Cristo, o que precisa ser quebrado, e curai, pelo sangue do Cordeiro, o que ainda sangra em nossa memória de família. Que a próxima geração herde de nós mais fé e mais paz do que recebemos, e que a bênção do Senhor, e não a repetição da dor, seja o que passamos adiante. Amém.',
  },
  {
    titulo: 'Alma de Cristo',
    fonteNota: 'Oração medieval ("Anima Christi"), de origem anônima — a atribuição a São Tomás de Aquino é tradicional, embora hoje se considere incerta. Também associada a Santo Inácio de Loyola, que a incluiu nos Exercícios Espirituais. Domínio público, de uso universal na Igreja.',
    texto: 'Alma de Cristo, santificai-me.\nCorpo de Cristo, salvai-me.\nSangue de Cristo, inebriai-me.\nÁgua do lado de Cristo, lavai-me.\nPaixão de Cristo, confortai-me.\nÓ bom Jesus, ouvi-me.\nDentro das Vossas chagas, escondei-me.\nNão permitais que eu me separe de Vós.\nDo inimigo maligno defendei-me.\nNa hora da minha morte, chamai-me.\nMandai-me ir para Vós, para que Vos louve com os Vossos Santos, pelos séculos dos séculos. Amém.',
  },
  {
    titulo: 'Oração a São Miguel Arcanjo',
    fonteNota: 'Composição tradicional atribuída ao papa Leão XIII (1886), de uso universal na Igreja — não é conteúdo original deste app.',
    texto: 'São Miguel Arcanjo, defendei-nos no combate; sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos; e vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a satanás e a todos os espíritos malignos, que andam pelo mundo para perder as almas. Amém.',
  },
  {
    titulo: 'Pequeno Exorcismo de Santo Antônio',
    fonteNota: 'Fórmula tradicional antiga, ligada à Cruz de São Bento e à devoção a Santo Antônio, de uso comum na Igreja.',
    texto: 'Eis a cruz do Senhor! Fugi, forças inimigas! Venceu o Leão de Judá, a Raiz de Davi! Aleluia!\n\nEm latim:\nEcce Crucem Domini! Fugite partes adversae! Vicit Leo de tribu Juda, Radix David! Alleluia!',
  },
  {
    titulo: 'Ato de Contrição',
    fonteNota: 'Fórmula tradicional do catecismo católico, de uso universal na Igreja — não é conteúdo original deste app.',
    texto: 'Meu Deus, porque sois infinitamente bom e Vos amo de todo o meu coração, pesa-me de Vos ter ofendido e, com o auxílio da Vossa divina graça, proponho firmemente emendar-me e nunca mais Vos tornar a ofender. Peço e espero o perdão das minhas culpas pela Vossa infinita misericórdia. Amém.',
  },
  {
    titulo: 'Oração de São Bento',
    fonteNota: 'Fórmula tradicional ligada à Medalha de São Bento ("Vade Retro Satana"), de origem medieval e uso universal na Igreja.',
    texto: 'A Cruz Sagrada seja a minha luz. Não seja o dragão o meu guia. Retira-te, Satanás! Nunca me aconselhes coisas vãs. É mau o que tu me ofereces. Bebe tu mesmo os teus venenos. Amém.\n\nEm latim:\nCrux Sacra Sit Mihi Lux. Non Draco Sit Mihi Dux. Vade Retro Satana! Numquam Suade Mihi Vana. Sunt Mala Quae Libas. Ipse Venena Bibas. Amen.',
  },
  {
    titulo: 'Nada te Perturbe (Santa Teresa d\'Ávila)',
    fonteNota: 'Poema de Santa Teresa d\'Ávila, Doutora da Igreja (1515-1582), de domínio público — conhecido como o "marcador de página" da santa.',
    texto: 'Nada te perturbe,\nnada te espante,\ntudo passa,\nDeus não muda.\nA paciência tudo alcança;\nquem a Deus tem,\nnada lhe falta:\nsó Deus basta.\n\nEleva o pensamento,\nao céu sobe,\npor nada te angusties,\nnada te perturbe.\n\nA Jesus Cristo segue,\ncom grande entrega,\ne, venha o que vier,\nnada te espante.\n\nVês a glória do mundo?\nÉ glória vã;\nnada tem de estável,\ntudo passa.\n\nDeseja as coisas celestes,\nque para sempre duram;\nfiel e rico em promessas,\nDeus não muda.\n\nAma-o como merece,\nbondade imensa;\nquem a Deus tem,\nmesmo que passe por momentos difíceis,\nsendo Deus o seu tesouro,\nnada lhe falta.\nSó Deus basta!',
  },
  {
    titulo: 'A Santo Antônio, Contra o Mal',
    fonteNota: 'Oração original escrita para este app, invocando a intercessão de Santo Antônio.',
    texto: 'Bem-aventurado Santo Antônio, martelo dos hereges e terror dos demônios, vós que em vida expulsastes o mal com a força da vossa fé e a pureza do vosso coração, socorrei-me agora nesta hora de combate espiritual. Alcançai-me de Deus a graça de reconhecer as ciladas do inimigo antes que me alcancem, e a coragem de resistir a elas com a mesma firmeza que vos tornou terror para as forças das trevas. Afastai de mim, e de todos os que amo, qualquer influência maligna, qualquer tentação que me afaste de Deus, qualquer trevas que queiram habitar onde só deveria haver luz. Vós que sempre trouxestes o Menino Jesus nos braços, colocai-o também no centro do meu coração, para que, onde Ele reina, o mal não tenha lugar. Santo Antônio, rogai por mim. Amém.',
  },
  {
    titulo: 'Consagração Diária a Nossa Senhora',
    fonteNota: 'Oração tradicional mariana, de uso comum na devoção católica, sem autoria individual identificada — domínio público.',
    texto: 'Ó minha Senhora, ó minha Mãe, eu me ofereço todo a Vós, e, em prova de minha devoção para convosco, eu Vos consagro neste dia meus olhos, meus ouvidos, minha boca, meu coração e, inteiramente, todo o meu ser. E, como assim sou Vosso, ó incomparável Mãe, guardai-me e defendei-me como coisa e propriedade Vossa. Amém.',
  },
  {
    titulo: 'Consagração ao Sagrado Coração de Jesus',
    fonteNota: 'Oração tradicional de consagração ao Sagrado Coração de Jesus, de uso comum na devoção católica, sem autoria individual identificada — domínio público.',
    texto: 'Em nome do Pai, do Filho e do Espírito Santo. Amém.\n\nEntrego-me e consagro ao Sagrado Coração de Jesus Cristo minha vida, minhas ações, dores e sofrimentos, para que eu utilize meu corpo somente para honrar, amar e glorificar o Sagrado Coração.\n\nEsse é meu propósito definitivo e único: ser todo de Deus e fazer tudo por amor a Ele; ao mesmo tempo, renunciar, com todo meu coração, qualquer coisa que não lhe compraz; além de tomar-te, Ó Sagrado Coração, para que sejas ele o único objeto de meu amor, o guardião de minha vida, meu seguro de salvação, o remédio para minhas fraquezas e inconstâncias, a solução aos erros de minha vida e meu refúgio seguro à hora da morte.',
  },
  {
    titulo: 'Oração de São Francisco de Assis',
    fonteNota: 'Oração da Paz, tradicionalmente associada a São Francisco de Assis, embora sua autoria real seja incerta (primeiro registro conhecido é do início do século XX). De domínio público e uso universal na Igreja.',
    texto: 'Senhor, fazei de mim um instrumento de vossa paz! Onde houver ódio, que eu leve o amor, onde houver ofensa, que eu leve o perdão. Onde houver discórdia, que eu leve a união. Onde houver dúvida, que eu leve a fé. Onde houver o erro, que eu leve a verdade. Onde houver desespero, que eu leve a esperança. Onde houver tristeza, que eu leve a alegria. Onde houver trevas, que eu leve a luz!\n\nÓ Mestre, fazei que eu procure mais consolar, que ser consolado. Compreender, que ser compreendido. Amar, que ser amado. Pois é dando, que se recebe. Perdoando, que se é perdoado e é morrendo, que se vive para a vida eterna!',
  },
  {
    titulo: 'Oração de Libertação de São Patrício',
    fonteNota: 'A "Lorica de São Patrício" (também chamada Couraça ou Escudo de São Patrício), oração tradicional atribuída ao santo padroeiro da Irlanda (séc. V), de domínio público e uso universal na Igreja.',
    texto: 'Levanto-me, neste dia que amanhece,\nPor uma grande força, pela invocação da Trindade,\nPela fé na Tríade,\nPela afirmação da unidade\nDo Criador da Criação.\n\nLevanto-me neste dia que amanhece,\nPela força do nascimento de Cristo em Seu batismo,\nPela força da crucificação e do sepultamento,\nPela força da ressurreição e ascensão,\nPela força da descida para o Julgamento Final.\n\nLevanto-me, neste dia que amanhece,\nPela força do amor dos Querubins,\nEm obediência aos Anjos,\nA serviço dos Arcanjos,\nPela esperança da ressurreição e da recompensa,\nPelas orações dos Patriarcas,\nPelas previsões dos Profetas,\nPela pregação dos Apóstolos\nPela fé dos Confessores,\nPela inocência das Virgens santas,\nPelos atos dos Bem-aventurados.\n\nLevanto-me neste dia que amanhece,\nPela força do céu:\nLuz do sol,\nClarão da lua,\nEsplendor do fogo,\nPressa do relâmpago,\nPresteza do vento,\nProfundeza dos mares,\nFirmeza da terra,\nSolidez da rocha.\n\nLevanto-me neste dia que amanhece,\nPela força de Deus a me empurrar,\nPela força de Deus a me amparar,\nPela sabedoria de Deus a me guiar,\nPelo olhar de Deus a vigiar meu caminho,\nPelo ouvido de Deus a me escutar,\nPela palavra de Deus em mim falar,\nPela mão de Deus a me guardar,\nPelo caminho de Deus à minha frente,\nPelo escudo de Deus que me protege,\nPela hóstia de Deus que me salva,\nDas armadilhas do demônio,\nDas tentações do vício,\nDe todos que me desejam mal,\nLonge e perto de mim,\nAgindo só ou em grupo.\n\nConclamo, hoje, tais forças a me protegerem contra o mal,\nContra qualquer força cruel que ameace meu corpo e minha alma,\nContra a encantação de falsos profetas,\nContra as leis negras do paganismo,\nContra as leis falsas dos hereges,\nContra a arte da idolatria,\nContra feitiços de bruxas e magos,\nContra saberes que corrompem o corpo e a alma.\nCristo guarde-me hoje,\nContra veneno, contra fogo,\nContra afogamento, contra ferimento,\nPara que eu possa receber e desfrutar a recompensa.\nCristo comigo, Cristo à minha frente, Cristo atrás de mim,\nCristo em mim, Cristo em baixo de mim, Cristo acima de mim,\nCristo à minha direita, Cristo à minha esquerda,\nCristo ao me deitar,\nCristo ao me sentar,\nCristo ao me levantar,\nCristo no coração de todos os que pensarem em mim,\nCristo na boca de todos que falarem em mim,\nCristo em todos os olhos que me virem,\nCristo em todos os ouvidos que me ouvirem.\n\nLevanto-me, neste dia que amanhece,\nPor uma grande força, pela invocação da Trindade,\nPela fé na Tríade,\nPela afirmação da Unidade,\nPelo Criador da Criação.\n\nAmém.',
  },
  {
    titulo: 'Fica Comigo, Senhor (São Padre Pio)',
    fonteNota: 'Oração atribuída a São Pio de Pietrelcina (Padre Pio, 1887-1968), de uso devocional amplamente difundido, especialmente após a Comunhão Eucarística.',
    texto: 'Fica comigo, Senhor!\nFica Senhor comigo, pois preciso da Tua presença para não te esquecer.\nSabes quão facilmente posso te abandonar.\nFica Senhor comigo, porque sou fraco e preciso da Tua força para não cair.\nFica Senhor comigo, porque és minha vida, e sem Ti perco o fervor.\nFica Senhor comigo, porque és minha luz, e sem Ti reina a escuridão.\nFica Senhor comigo, para me mostrar Tua vontade.\nFica Senhor comigo, para que ouça Tua voz e te siga.\nFica Senhor comigo, pois desejo amar-te e permanecer sempre em tua companhia.\nFica Senhor comigo, se queres que te seja fiel.\nFica Senhor comigo, porque, por mais pobre que seja minha alma, quero que se transforme num lugar de consolação para Ti, um ninho de amor.\n\nFica comigo, Jesus, pois se faz tarde e o dia chega ao fim; a vida passa, e a morte, o julgamento e a eternidade se aproximam. Preciso de Ti para renovar minhas energias e não parar no caminho. Está ficando tarde, a morte avança e eu tenho medo da escuridão, das tentações, da falta de fé, da cruz, das tristezas.\n\nOh, quanto preciso de Ti, meu Jesus, nesta noite de exílio!\n\nFica comigo nesta noite, Jesus, pois ao longo da vida, com todos os seus perigos, eu preciso de Ti. Faze, Senhor, que te reconheça como te reconheceram teus discípulos ao partir do pão, a fim de que a Comunhão Eucarística seja a luz a dissipar a escuridão, a força a me sustentar, a única alegria do meu coração.\n\nFica comigo, Senhor, porque na hora da morte quero estar unido a Ti, se não pela Comunhão, ao menos pela graça e pelo amor!\n\nFica comigo, Jesus. Não peço consolações divinas, porque não às mereço, mas apenas o presente da tua presença, ah, isso sim eu te suplico!\n\nFica Senhor comigo, pois é só a Ti que procuro o Teu amor, a Tua graça, a Tua vontade, o Teu coração, o Teu Espírito, porque te amo, e a única recompensa que te peço é poder amar-te sempre mais.\n\nComo este amor resoluto, desejo amar-te de todo o coração enquanto estiver na terra, para continuar a te amar perfeitamente por toda a eternidade. Assim seja.\n\nSão Padre Pio, rogai por nós!',
  },
  {
    titulo: 'Súplica de Libertação (Invocação ao Sangue de Cristo)',
    fonteNota: 'Oração de libertação da tradição popular católica, centrada no poder redentor do Sangue de Cristo, de autoria não identificada.',
    texto: 'Senhor Jesus, pelo Teu Sangue Precioso derramado na cruz, liberta-me de toda opressão, medo, angústia e depressão. Que o Teu Sangue purifique a minha mente, o meu corpo e a minha casa. Quebra toda corrente de maldição e afasta de mim e da minha família qualquer força das trevas. Amém.',
  },
  {
    titulo: 'Oração de São João Paulo II pelas Famílias',
    fonteNota: 'Oração composta pelo papa São João Paulo II, amplamente difundida pela Igreja em encontros e pastorais familiares.',
    texto: 'Deus, de quem procede toda a paternidade no céu e na terra,\nPai, que és Amor e Vida,\nfaz que cada família humana sobre a terra se torne,\npor meio do Teu Filho, Jesus Cristo, nascido de Mulher,\ne do Espírito Santo, fonte da caridade divina,\num verdadeiro santuário da vida e do amor\npara as gerações que se renovam sem cessar.\n\nFaz que a Tua graça guie os pensamentos e as obras dos esposos\npara o bem de suas famílias\ne de todas as famílias do mundo.\n\nFaz que as jovens gerações encontrem na família\num forte apoio humano\npara o seu crescimento na verdade e no amor.\n\nFaz que o amor, confortado pela graça do sacramento do matrimônio,\nmostre-se mais forte do que qualquer fraqueza\ne qualquer crise que, às vezes, afetam as nossas famílias.\n\nFaz, enfim, Te pedimos por intercessão da Sagrada Família de Nazaré,\nque a Igreja, no meio de todas as nações da terra,\npossa cumprir frutuosamente a sua missão\nna família e por meio da família.\n\nTu que és a Vida, a Verdade e o Amor,\nna unidade do Filho e do Espírito Santo.\nAmém.',
  },
  {
    titulo: 'Ladainha de São Miguel Arcanjo',
    fonteNota: 'Ladainha tradicional em honra a São Miguel Arcanjo, de uso devocional consagrado na Igreja, sem autoria individual identificada.',
    texto: 'Senhor, tende piedade de nós.\nJesus Cristo, tende piedade de nós.\nSenhor, tende piedade de nós.\nJesus Cristo, ouvi-nos.\nJesus Cristo, atendei-nos.\nPai Celeste, que sois Deus, tende piedade de nós.\nFilho Redentor do Mundo, que sois Deus, tende piedade de nós.\nEspírito Santo, que sois Deus, tende piedade de nós.\nTrindade Santa, que sois um único Deus, tende piedade de nós.\n\nSanta Maria, Rainha dos Anjos, rogai por nós.\nSão Miguel, rogai por nós.\nSão Miguel, cheio da graça de Deus, rogai por nós.\nSão Miguel, perfeito adorador do Verbo Divino, rogai por nós.\nSão Miguel, coroado de honra e de glória, rogai por nós.\nSão Miguel, poderosíssimo príncipe dos exércitos do Senhor, rogai por nós.\nSão Miguel, porta-estandarte da Santíssima Trindade, rogai por nós.\nSão Miguel, guardião do Paraíso, rogai por nós.\nSão Miguel, guia e consolador do povo israelita, rogai por nós.\nSão Miguel, esplendor e fortaleza da Igreja militante, rogai por nós.\nSão Miguel, honra e alegria da Igreja triunfante, rogai por nós.\nSão Miguel, luz dos anjos, rogai por nós.\nSão Miguel, baluarte dos cristãos, rogai por nós.\nSão Miguel, força daqueles que combatem pelo estandarte da cruz, rogai por nós.\nSão Miguel, luz e confiança das almas no último momento da vida, rogai por nós.\nSão Miguel, socorro muito certo, rogai por nós.\nSão Miguel, nosso auxílio em todas as adversidades, rogai por nós.\nSão Miguel, arauto da sentença eterna, rogai por nós.\nSão Miguel, consolador das almas que estão no Purgatório, rogai por nós.\nSão Miguel, a quem o Senhor incumbiu de receber as almas que estão no Purgatório, rogai por nós.\nSão Miguel, nosso príncipe, rogai por nós.\nSão Miguel, nosso advogado, rogai por nós.\n\nCordeiro de Deus, que tirais o pecado do mundo, perdoai-nos, Senhor.\nCordeiro de Deus, que tirais o pecado do mundo, ouvi-nos, Senhor.\nCordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós, Senhor.\n\nRogai por nós, ó glorioso São Miguel, príncipe da Igreja de Cristo, para que sejamos dignos de Suas promessas.\n\nOração: Senhor Jesus, santificai-nos por uma bênção sempre nova e concedei-nos, pela intercessão de São Miguel, essa sabedoria que nos ensina a ajuntar riquezas do céu e a trocar os bens do tempo presente pelos da eternidade. Vós que viveis e reinais em todos os séculos dos séculos. Amém.',
  },
  {
    titulo: 'Consagração a São Miguel Arcanjo',
    fonteNota: 'Oração tradicional de consagração a São Miguel Arcanjo, de uso devocional consagrado na Igreja, sem autoria individual identificada.',
    texto: 'Ó Príncipe nobilíssimo dos Anjos, valoroso guerreiro do Altíssimo, zeloso defensor da glória do Senhor, terror dos espíritos rebeldes, amor e delícia de todos os Anjos justos, meu diletíssimo Arcanjo São Miguel, desejando eu fazer parte do número dos vossos devotos e servos, a vós, hoje, me consagro, me dou e ofereço, e ponho-me a mim próprio, a minha família e tudo o que me pertence debaixo da vossa poderosíssima proteção.\n\nÉ pequena a oferta do meu serviço, sendo como sou um miserável pecador, mas vós engrandecereis o afeto do meu coração; recordai-vos que, de hoje em diante, estou debaixo do vosso sustento, e deveis assistir-me em toda a minha vida e obter-me o perdão dos meus muitos e graves pecados, a graça de amar a Deus de todo coração, ao meu querido Salvador Jesus Cristo e a minha Mãe Maria Santíssima.',
  },
];

const oel = (id) => document.getElementById(id);

function renderOracoesDiversasList() {
  const list = oel('oracoesDiversasList');
  list.innerHTML = '';
  const ordenadas = ORACOES_DIVERSAS
    .map((o, idx) => ({ o, idx }))
    .sort((a, b) => a.o.titulo.localeCompare(b.o.titulo, 'pt-BR'));
  ordenadas.forEach(({ o, idx }) => {
    const btn = document.createElement('button');
    btn.className = 'book-btn';
    btn.innerHTML = `<span>${o.titulo}</span>`;
    btn.addEventListener('click', () => openOracaoDiversa(idx));
    list.appendChild(btn);
  });
}

let atualizarFavoritoOracaoDiversa = null;

function openOracaoDiversa(idx) {
  const o = ORACOES_DIVERSAS[idx];
  if (!o) return;

  if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
  oel('oracaoDiversaTitulo').textContent = o.titulo;
  oel('oracaoDiversaTexto').textContent = o.texto;
  const notaEl = oel('oracaoDiversaNota');
  notaEl.textContent = o.fonteNota || '';
  notaEl.classList.toggle('hidden', !o.fonteNota);
  if (atualizarFavoritoOracaoDiversa) atualizarFavoritoOracaoDiversa();

  oel('oracoesdiversas-step-lista').classList.add('hidden');
  oel('oracoesdiversas-step-leitura').classList.remove('hidden');
}

function initOracoesDiversas() {
  renderOracoesDiversasList();
  document.querySelectorAll('[data-back-to="oracoesdiversas-lista"]').forEach((b) => {
    b.addEventListener('click', () => {
      if (window.MinhaLiturgiaNarration) window.MinhaLiturgiaNarration.stop();
      oel('oracoesdiversas-step-leitura').classList.add('hidden');
      oel('oracoesdiversas-step-lista').classList.remove('hidden');
    });
  });
  if (window.MinhaLiturgiaFavoritos) {
    atualizarFavoritoOracaoDiversa = window.MinhaLiturgiaFavoritos.attachFavoritoBtn(
      oel('favoritarOracaoDiversaBtn'),
      () => ({ titulo: oel('oracaoDiversaTitulo').textContent, texto: oel('oracaoDiversaTexto').textContent })
    );
  }
  oel('narrateOracaoDiversaBtn').addEventListener('click', () => {
    if (window.MinhaLiturgiaNarration) {
      window.MinhaLiturgiaNarration.toggle(oel('narrateOracaoDiversaBtn'), () =>
        `${oel('oracaoDiversaTitulo').textContent}. ${oel('oracaoDiversaTexto').textContent}`
      );
    }
  });
}

window.MinhaLiturgiaOracoesDiversas = { initOracoesDiversas };
