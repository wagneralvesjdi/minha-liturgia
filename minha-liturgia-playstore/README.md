# Minha Liturgia — versão Play Store (TWA)

Este é o "empacotamento" Android do [Minha Liturgia](https://wagneralvesjdi.github.io/minha-liturgia/)
para publicar na Google Play Store. Não é uma reescrita do app — é uma
**Trusted Web Activity (TWA)**: uma casca Android bem fina que abre o
mesmo site que já existe, em tela cheia, sem barra de endereço, usando o
Chrome instalado no aparelho. O conteúdo, as atualizações e tudo o mais
continuam vindo do site em `wagneralvesjdi.github.io/minha-liturgia/` — mexer
naquele repositório já atualiza automaticamente o que aparece dentro
deste app também.

## O que já está pronto aqui

- `app/` — projeto Android completo (Gradle), com ícones em todas as
  densidades, cores da marca e a configuração da TWA.
- `twa-manifest.json` — referência no formato do
  [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap), caso você
  queira usar essa ferramenta no futuro.
- `store-listing/` — ícone, imagem de destaque (feature graphic),
  screenshots reais do app e os textos prontos para colar na ficha da
  loja (`textos.md`).

## O que eu NÃO consegui fazer por aqui

O ambiente onde eu trabalho não tem acesso ao Android SDK nem ao
repositório Maven do Google (bloqueio de rede do sandbox), então **não
consegui compilar o projeto de ponta a ponta para confirmar que gera um
APK/AAB funcionando**. Validei o que dava para validar sem isso:

- Todos os arquivos XML são XML válido (achei e corrigi um comentário
  quebrado em `colors.xml` nessa checagem).
- O `twa-manifest.json` é JSON válido.
- A sintaxe Gradle (`build.gradle`, `settings.gradle`) chegou a ser
  processada pelo Gradle antes de falhar por falta de acesso à internet
  para baixar o plugin do Android — ou seja, não achou erro de sintaxe,
  só não conseguiu baixar as dependências.

A estrutura segue exatamente o que o Bubblewrap gera (mesma biblioteca,
`androidbrowserhelper`), então a expectativa é que funcione — mas o
primeiro build real precisa ser feito por você, no Android Studio.

## Sua chave de assinatura (IMPORTANTE)

Gerei uma keystore de assinatura (`minha-liturgia-release.jks`) e te
enviei o arquivo separadamente, junto com a senha. **Guarde os dois em
lugar seguro** (gerenciador de senhas, backup em nuvem privada) — nunca
num repositório público. Se você perder essa chave depois de publicar o
app, não vai conseguir enviar atualizações para a mesma ficha na Play
Store; só resta abrir uma ficha nova, perdendo avaliações e histórico.

O repositório `wagneralvesjdi/minha-liturgia` (onde este projeto vive) **é
público** — por isso o `.gitignore` já bloqueia arquivos `.jks`,
`.keystore` e `local.properties`, e o `gradle.properties` só tem
placeholders comentados. Nunca force a adição desses arquivos ao git.

A impressão digital SHA-256 dessa chave já está publicada em
`https://wagneralvesjdi.github.io/.well-known/assetlinks.json` (no
repositório `wagneralvesjdi/wagneralvesjdi.github.io`) e também
embutida em `app/src/main/res/values/strings.xml`. Se um dia você trocar
de keystore, precisa atualizar a impressão digital nos dois lugares.

## Passo a passo para gerar o app instalável

1. **Instale o [Android Studio](https://developer.android.com/studio)**
   (traz o Android SDK junto).
2. Abra a pasta `minha-liturgia-playstore/` como projeto no Android
   Studio (`File → Open`).
3. Deixe o Android Studio baixar as dependências (primeira vez demora
   alguns minutos).
4. Copie o arquivo `minha-liturgia-release.jks` que te enviei para
   dentro desta pasta (ele está no `.gitignore`, então não vai parar no
   git por engano).
5. Edite o `gradle.properties` local (não commitado) preenchendo:
   ```
   MINHALITURGIA_RELEASE_STORE_FILE=minha-liturgia-release.jks
   MINHALITURGIA_RELEASE_STORE_PASSWORD=<a senha que te enviei>
   MINHALITURGIA_RELEASE_KEY_ALIAS=minhaliturgia
   MINHALITURGIA_RELEASE_KEY_PASSWORD=<a mesma senha>
   ```
6. No Android Studio: `Build → Generate Signed Bundle / APK → Android App
   Bundle`, selecione a keystore e gere o `.aab` — é esse arquivo que
   sobe na Play Store (não o `.apk`).
7. **Teste antes de publicar**: instale o app num celular Android (ou
   emulador) e confirme que abre em tela cheia, sem barra de endereço do
   Chrome aparecendo. Se a barra aparecer, normalmente é porque o
   `assetlinks.json` ainda não propagou ou o pacote/impressão digital não
   batem — confira os dois arquivos mencionados acima.

## Checklist para publicar na Play Store

- [ ] Criar conta de desenvolvedor no [Google Play
      Console](https://play.google.com/console) (taxa única de US$ 25).
- [ ] Criar um novo app no Play Console.
- [ ] Preencher a ficha da loja com os textos de `store-listing/textos.md`.
- [ ] Subir os assets de `store-listing/`: `play_store_icon_512.png`,
      `feature-graphic.png` e as imagens de `screenshots/` (mínimo 2
      screenshots de celular exigidas pela Play Store).
- [ ] Preencher o questionário de classificação de conteúdo.
- [ ] Informar a URL da política de privacidade:
      `https://wagneralvesjdi.github.io/minha-liturgia/privacidade.html`
- [ ] Declarar que o app não coleta dados pessoais (Data safety /
      Segurança dos dados) — condizente com a política de privacidade.
- [ ] Enviar o `.aab` gerado no passo 6 acima.
- [ ] Escolher o tipo de lançamento (recomendo começar em **Teste
      interno** ou **Teste fechado** antes de ir para produção, para
      pegar problemas com poucos usuários primeiro).
- [ ] Enviar para revisão.

A revisão do Google costuma levar de algumas horas a poucos dias.

## Atualizando o app depois de publicado

Como é uma TWA, **a maior parte das atualizações de conteúdo não precisa
de novo envio à Play Store** — qualquer mudança no site
`wagneralvesjdi.github.io/minha-liturgia/` já aparece para quem tem o app
instalado (o mecanismo de atualização automática do PWA cuida disso).

Só é preciso gerar e enviar um novo `.aab` quando mudar algo *deste*
projeto Android especificamente: ícone, nome do app, cor da tela de
splash, `versionCode`/`versionName`, ou a URL de lançamento. Nesses
casos, aumente `versionCode` em `app/build.gradle`, gere um novo bundle
assinado com a **mesma keystore** e envie uma nova versão no Play
Console.
