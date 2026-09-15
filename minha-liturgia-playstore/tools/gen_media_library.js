#!/usr/bin/env node
// Gera app/src/main/assets/media-library.json a partir das mesmas funções
// JS (rosario.js/viasacra.js) que montam a narração guiada no PWA — assim
// o app nativo (Android Auto) toca exatamente a mesma sequência do site,
// sem precisar transcrever tudo à mão numa segunda fonte de verdade.
//
// Rode sempre que o conteúdo do Terço/Rosário mudar em minha-liturgia/:
//   node tools/gen_media_library.js

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const WEB_BASE = path.join(__dirname, '..', '..', 'minha-liturgia');
const OUT_FILE = path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'media-library.json');
const AUDIO_BASE_URL = 'https://wagneralvesjdi.github.io/minha-liturgia/';

function loadIntoSandbox(sandbox, file) {
  const code = fs.readFileSync(path.join(WEB_BASE, file), 'utf8');
  vm.runInContext(code, sandbox, { filename: file });
}

const sandbox = {};
sandbox.window = sandbox;
sandbox.document = { getElementById: () => null, addEventListener: () => {} };
sandbox.console = console;
vm.createContext(sandbox);

loadIntoSandbox(sandbox, 'rosario.js');
loadIntoSandbox(sandbox, 'viasacra.js');

// Replica a mesma resolução de URL de áudio que o app usa (rosario.js,
// função que monta o player: bloco.audioUrl direto, senão
// audioUrlFor(chaveOracao) via a tabela AUDIO_IDS interna do script).
function resolveAudioUrl(bloco) {
  if (bloco.audioUrl) return bloco.audioUrl;
  if (bloco.chaveOracao && typeof sandbox.audioUrlFor === 'function') {
    return sandbox.audioUrlFor(bloco.chaveOracao);
  }
  return null;
}

// Achata em uma playlist plana de faixas {title, url}. Blocos com "vezes" > 1
// (ex.: Ave Maria 10x por dezena) viram N itens repetidos na fila — é
// exatamente como o app toca hoje (o mesmo áudio, tocado vezes vezes seguidas).
function flatten(blocos) {
  const tracks = [];
  let semAudio = 0;
  for (const b of blocos) {
    const url = resolveAudioUrl(b);
    if (!url) {
      semAudio++;
      continue;
    }
    const vezes = b.vezes || 1;
    const baseTitle = (b.label || b.texto || '')
      .replace(/\s+/g, ' ')
      .replace(/\s*\(\d+x\)\s*$/i, '')
      .trim();
    for (let i = 0; i < vezes; i++) {
      tracks.push({
        title: vezes > 1 ? `${baseTitle} (${i + 1}/${vezes})` : baseTitle,
        url: AUDIO_BASE_URL + url,
      });
    }
  }
  if (semAudio > 0) {
    console.log(`  (${semAudio} bloco(s) sem áudio pré-gravado, ignorado(s) — cai pra TTS no app)`);
  }
  return tracks;
}

const library = {
  generatedAt: new Date().toISOString(),
  categories: [
    { id: 'terco-gozosos', title: 'Terço — Mistérios Gozosos', tracks: flatten(sandbox.buildTerco('gozosos')) },
    { id: 'terco-dolorosos', title: 'Terço — Mistérios Dolorosos', tracks: flatten(sandbox.buildTerco('dolorosos')) },
    { id: 'terco-gloriosos', title: 'Terço — Mistérios Gloriosos', tracks: flatten(sandbox.buildTerco('gloriosos')) },
    { id: 'terco-luminosos', title: 'Terço — Mistérios Luminosos', tracks: flatten(sandbox.buildTerco('luminosos')) },
    { id: 'rosario-completo', title: 'Rosário Completo', tracks: flatten(sandbox.buildRosarioCompleto()) },
    { id: 'terco-misericordia', title: 'Terço da Misericórdia', tracks: flatten(sandbox.buildTercoMisericordia()) },
    { id: 'terco-sao-miguel', title: 'Terço de São Miguel Arcanjo', tracks: flatten(sandbox.buildTercoSaoMiguel()) },
    { id: 'terco-libertacao', title: 'Terço do Rosário da Libertação', tracks: flatten(sandbox.buildTercoLibertacao()) },
  ],
};

if (typeof sandbox.buildTercoChagas === 'function') {
  library.categories.push({
    id: 'terco-chagas',
    title: 'Terço das Santas Chagas',
    tracks: flatten(sandbox.buildTercoChagas()),
  });
}

// Via Sacra Tradicional NÃO entra: hoje as meditações de cada estação são
// só texto (TTS do navegador), sem áudio pré-gravado — não dá pra tocar em
// segundo plano no Android Auto sem gerar essas narrações primeiro.
console.log('Via Sacra Tradicional: sem áudio pré-gravado ainda — não incluída na biblioteca nativa.');

for (const cat of library.categories) {
  console.log(cat.id, '->', cat.tracks.length, 'faixas');
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(library, null, 2));
console.log('\nsalvo em', path.relative(process.cwd(), OUT_FILE));
