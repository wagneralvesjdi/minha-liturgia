# Minha Liturgia

Aplicativo web (PWA) com sete seções, acessíveis pela tela inicial:

- **Liturgia do Dia**: a celebração católica completa de qualquer data —
  Oração Coleta, Primeira Leitura, Salmo Responsorial, Segunda Leitura
  (quando houver), Evangelho, Oração sobre as Oferendas e Oração Final
  (pós-comunhão). Também indica o ano litúrgico (A, B ou C) e o tempo
  litúrgico do dia. A partir dela, o botão "Preparar homilia (15 min)"
  abre um **roteiro de apoio à homilia**: estrutura de tempo, perguntas-
  guia para cada leitura e sugestões de parágrafos do Catecismo
  relacionados aos temas do dia (veja detalhes abaixo).
- **Bíblia Sagrada**: todos os livros do Antigo e Novo Testamento (cânon
  católico, com os deuterocanônicos), navegando por testamento → livro →
  capítulo, com busca direta por número de versículo.
- **Orações Eucarísticas**: as cinco Orações Eucarísticas Ordinárias do
  Missal Romano (I a V), com as falas do sacerdote e as respostas da
  assembleia identificadas, e as palavras da consagração em destaque.
- **Catecismo**: busca por tema (ex.: "Eucaristia", "Batismo",
  "Mandamentos") ou navegação pela estrutura oficial completa (93 seções,
  todos os 2.865 parágrafos com o texto completo), com leitura de cada
  parágrafo — funciona 100% offline, sem depender de nenhum site externo.
- **Hora Santa**: o roteiro de adoração ao Santíssimo do Apostolado da
  Oração, separado por mês do ano, com as falas do padre e as respostas
  do povo identificadas.
- **Santo Terço**: reza o Terço (um grupo de mistérios), o Rosário
  Completo (os quatro grupos, 20 dezenas) ou o Terço da Misericórdia,
  podendo escolher entre os mistérios Gozosos, Dolorosos, Gloriosos e
  Luminosos, com o fruto espiritual de cada mistério.
- **Santo do Dia**: o santo ou festa de hoje, com breve história e
  reflexão, além de um calendário navegável com todos os dias do ano
  (mês → dia → leitura).
- **Santa Sé**: atalhos diretos para o site oficial do Vaticano
  (vatican.va) — encíclicas, exortações apostólicas, cartas, motu
  proprio, homilias, discursos, mensagens e audiências, organizados
  por pontificado (Papa atual, Francisco, Bento XVI, João Paulo II),
  além do Concílio Vaticano II, do Código de Direito Canônico e da
  Cúria Romana. São links externos — o conteúdo é lido no próprio site
  do Vaticano.

Funciona no navegador do celular e pode ser **instalado como app** (ícone
na tela inicial, abre em tela cheia, funciona offline para datas já
visitadas) e **compartilhado com outras pessoas** só enviando o link ou
usando o botão "Compartilhar".

## Como funciona

- `index.html`, `styles.css`, `app.js`: a tela inicial, a navegação entre
  seções e a lógica da Liturgia do Dia.
- `bible.js`: a lógica da seção Bíblia Sagrada.
- `eucharist.js`: os textos e a lógica da seção Orações Eucarísticas.
- `catechism.js`: a estrutura completa do Catecismo, o texto já embutido
  e a busca por tema/parágrafo.
- `horasanta.js`: o roteiro mensal da Hora Santa.
- `homilia.js`: monta o roteiro de apoio à homilia a partir das leituras
  do dia já carregadas e sugere parágrafos do Catecismo relacionados.
- `rosario.js`: as orações do Rosário, os quatro grupos de mistérios e a
  lógica do Terço, Rosário Completo e Terço da Misericórdia.
- `santos.js`: o calendário de santos (Calendário Romano Geral) com
  história e reflexão de cada um, e a lógica do santo do dia e do
  calendário anual.
- `manifest.json` + `sw.js`: tornam o app instalável (PWA) e capaz de
  funcionar offline (guarda a última liturgia e a Bíblia já baixada no
  aparelho).
- As leituras e orações do dia vêm de uma API pública de liturgia diária
  católica (rito romano): `https://liturgia.up.railway.app/v2/`.
- O **ano litúrgico (A/B/C)** e o **tempo litúrgico** (Advento, Natal,
  Quaresma, Páscoa, Tempo Comum) são calculados localmente no aplicativo,
  a partir da data escolhida (cálculo da Páscoa + início do Advento).
- O texto da **Bíblia Sagrada** (tradução Ave Maria, cânon católico
  completo) é buscado uma vez do repositório público
  `fidalgobr/bibliaAveMariaJSON` no GitHub e guardado em cache no aparelho
  (download único de alguns MB na primeira vez que a seção é aberta).
- As **Orações Eucarísticas** I a IV ficam embutidas no próprio app
  (`eucharist.js`), já que são textos fixos do Missal Romano — o prefácio
  variável do dia não está incluído (fica indicado como "Segue o Prefácio
  próprio do dia"). A V (própria do Brasil) mostra apenas a estrutura
  fixa e a orientação de uso, remetendo ao Missal Romano para o texto
  integral — é um formulário menos difundido e de tradução protegida
  por direitos autorais, então o app não reproduz o corpo completo.
- O **Catecismo** tem o texto completo (edição oficial em português, os
  2.865 parágrafos) e a estrutura oficial (93 seções temáticas — Parte >
  Secção > Capítulo > Artigo) embutidos diretamente no app. Não depende de
  nenhum site externo: busca por tema, navegação pela estrutura e leitura
  de qualquer parágrafo funcionam totalmente offline.
- A **Hora Santa** (`horasanta.js`) fica embutida no app, transcrita do
  roteiro "Hora Santa — Apostolado da Oração". O mês de **dezembro está
  incompleto**: o documento original só trazia os cânticos de abertura
  daquele mês, sem o corpo da oração — o app avisa isso claramente na
  tela em vez de inventar o texto que falta.
- O **Santo Terço** (`rosario.js`) fica embutido no app: as orações fixas
  (Credo, Pai Nosso, Ave Maria, Glória, Salve Rainha etc.), os quatro
  grupos de mistérios com o fruto espiritual de cada um, e o Terço da
  Misericórdia — tudo funciona offline.
- O **Santo do Dia** (`santos.js`) traz os santos e festas de **data
  fixa** do Calendário Romano Geral, com breve história e reflexão,
  embutidos no app e funcionando offline. Cobre as datas mais conhecidas
  do calendário; dias sem memória própria aparecem como "Féria". Como o
  app mostra sempre a atribuição-padrão da data (sem calcular as
  substituições que podem ocorrer em certos anos, como quando um domingo
  ou uma solenidade prevalece sobre uma memória), pode raramente diferir
  do que é celebrado numa paróquia em um ano específico.
- O **Apoio à Homilia** (`homilia.js`) usa as leituras do dia já
  carregadas em "Liturgia do Dia" para montar um roteiro estrutural de
  cerca de 15 minutos (introdução, cada leitura, fio condutor, aplicação
  e conclusão, com o tempo sugerido para cada parte) e perguntas-guia
  para cada momento. Também identifica temas presentes nas leituras (por
  palavras-chave) e sugere seções do Catecismo relacionadas para
  aprofundamento. **O app não gera um texto pronto de homilia** — o
  conteúdo teológico específico de cada domingo continua sendo preparado
  pelo sacerdote ou ministro; o app só organiza o tempo e sugere
  caminhos. Cita também o Cân. 767 do Código de Direito Canônico, que
  trata da própria natureza da homilia.

## Publicar no GitHub Pages (para gerar um link compartilhável)

Já existe o workflow `.github/workflows/deploy-minha-liturgia.yml`, que
publica a pasta `minha-liturgia/` no GitHub Pages a cada push em `main`.
Para ativar:

1. No GitHub, vá em **Settings → Pages**.
2. Em "Build and deployment", escolha **Source: GitHub Actions**.
3. Faça um push/merge para a branch `main` (ou rode o workflow manualmente
   em **Actions → Deploy Minha Liturgia → Run workflow**).
4. Depois do primeiro deploy, o link ficará em algo como:
   `https://<seu-usuario>.github.io/<repositorio>/`
   (o próprio GitHub mostra a URL em Settings → Pages e na aba Actions).

## Compartilhar com outros celulares

- **Enviar o link**: qualquer pessoa que abrir a URL no navegador do
  celular (Android ou iPhone) já vê o app funcionando, sem precisar
  instalar nada.
- **Instalar como aplicativo**:
  - *Android/Chrome*: toca em "Instalar" (aparece automaticamente no app)
    ou no menu ⋮ → "Adicionar à tela inicial".
  - *iPhone/Safari*: toca no ícone de compartilhar (□↑) → "Adicionar à
    Tela de Início".
- **Botão "Compartilhar liturgia de hoje"**: usa o compartilhamento nativo
  do celular (WhatsApp, e-mail, etc.) para enviar o texto da liturgia do
  dia; se o navegador não suportar, o texto é copiado automaticamente
  para colar onde quiser.

## Rodar localmente para testar

Não precisa de instalação nem build — é HTML/CSS/JS puro. Basta servir a
pasta com qualquer servidor estático, por exemplo:

```bash
cd minha-liturgia
python3 -m http.server 8080
```

E abrir `http://localhost:8080` no navegador.

## Limitações conhecidas

- Depende da API pública de liturgia diária estar no ar; se a data
  pesquisada não existir na base (ex.: datas muito distantes), o app
  mostra uma mensagem de erro.
- Se o navegador bloquear a chamada direta à API por CORS, o app tenta
  automaticamente um proxy público (`api.allorigins.win`) como alternativa.
- A Bíblia é baixada inteira (texto completo, alguns MB) na primeira vez
  que a seção é aberta; depois disso fica em cache e abre offline.
- Os textos das Orações Eucarísticas foram digitados a partir do Missal
  Romano; vale conferir com o missal da paróquia antes de usar em
  celebração.
- O roteiro da Hora Santa de **dezembro está incompleto** (só os cânticos
  de abertura) porque assim veio no documento de origem.
- O **Santo do Dia** cobre as datas fixas mais conhecidas do Calendário
  Romano Geral (191 dos 366 dias do ano); os demais dias aparecem como
  "Féria, sem memória própria". O app não calcula as substituições
  litúrgicas que podem ocorrer em anos específicos (quando um domingo ou
  uma solenidade prevalece sobre uma memória).
