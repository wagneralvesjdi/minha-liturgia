'use strict';

/* ---------- PDF da Celebração Completa ---------- */
/* Monta a celebração do dia (Oração Coleta, leituras, Salmo, orações) mais
   a reflexão de apoio à homilia num único documento imprimível, e usa a
   impressão nativa do navegador (window.print) para gerar o PDF — funciona
   offline, em qualquer aparelho, sem bibliotecas externas. */

function pel(id) { return document.getElementById(id); }

function escapeHtml(s) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function paragrafosHtml(texto) {
  return escapeHtml(texto)
    .split(/\n{2,}/)
    .map((t) => `<p>${t.replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

function celebracaoParaImpressao(apiData, date, info) {
  const oracoes = apiData.oracoes || {};
  const leituras = apiData.leituras || {};
  const primeira = pickOption(leituras.primeiraLeitura, selectedReadingIndex.primeira);
  const salmo = pickOption(leituras.salmo, selectedReadingIndex.salmo);
  const segunda = pickOption(leituras.segundaLeitura, selectedReadingIndex.segunda);
  const evangelho = pickOption(leituras.evangelho, selectedReadingIndex.evangelho);

  const partes = [];
  partes.push('<h1>Minha Liturgia</h1>');
  partes.push(`<p class="pdf-sub">${escapeHtml(apiData.liturgia || 'Liturgia do dia')} — ${escapeHtml(formatDateBR(date))}</p>`);
  partes.push(`<p class="pdf-sub">${escapeHtml(info.liturgicalYearLabel || '')}</p>`);

  partes.push('<h2>Oração Coleta</h2>' + paragrafosHtml(oracoes.coleta || '—'));

  if (primeira) {
    partes.push('<h2>Primeira Leitura</h2>');
    partes.push(`<p class="pdf-ref">${escapeHtml(primeira.referencia || '')}</p>`);
    partes.push(paragrafosHtml(readingBlock(primeira)));
  }
  if (salmo) {
    partes.push('<h2>Salmo Responsorial</h2>');
    partes.push(`<p class="pdf-ref">${escapeHtml(salmo.referencia || '')}</p>`);
    if (salmo.refrao) partes.push(`<p class="pdf-refrao">${escapeHtml(salmo.refrao)}</p>`);
    partes.push(paragrafosHtml(salmo.texto || ''));
  }
  if (segunda) {
    partes.push('<h2>Segunda Leitura</h2>');
    partes.push(`<p class="pdf-ref">${escapeHtml(segunda.referencia || '')}</p>`);
    partes.push(paragrafosHtml(readingBlock(segunda)));
  }
  if (evangelho) {
    partes.push('<h2>Evangelho</h2>');
    partes.push(`<p class="pdf-ref">${escapeHtml(evangelho.referencia || '')}</p>`);
    partes.push(paragrafosHtml(readingBlock(evangelho)));
  }
  if (oracoes.oferendas) {
    partes.push('<h2>Oração sobre as Oferendas</h2>');
    partes.push(paragrafosHtml(oracoes.oferendas));
  }
  if (oracoes.comunhao) {
    partes.push('<h2>Oração Final (Pós-Comunhão)</h2>');
    partes.push(paragrafosHtml(oracoes.comunhao));
  }
  return partes.join('\n');
}

function reflexaoParaImpressao(apiData, info) {
  if (!window.MinhaLiturgiaHomilia) return '';
  const paragrafos = window.MinhaLiturgiaHomilia.gerarReflexaoParagrafos(apiData, info);
  if (!paragrafos || !paragrafos.length) return '';
  const corpo = paragrafos.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n');
  return `<h2 class="pdf-reflexao-titulo">Reflexão para a Homilia</h2>${corpo}`;
}

function gerarPdfCelebracao() {
  const atual = window.MinhaLiturgiaCurrentLiturgy ? window.MinhaLiturgiaCurrentLiturgy() : null;
  if (!atual) {
    if (window.showToast) window.showToast('Escolha uma data em "Liturgia do Dia" primeiro.');
    return;
  }
  const { date, apiData, info } = atual;
  const area = pel('pdfPrintArea');
  area.innerHTML = celebracaoParaImpressao(apiData, date, info) + reflexaoParaImpressao(apiData, info);

  document.body.classList.add('pdf-print-mode');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.print();
    });
  });
}

window.addEventListener('afterprint', () => {
  document.body.classList.remove('pdf-print-mode');
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = pel('pdfBtn');
  if (btn) btn.addEventListener('click', gerarPdfCelebracao);
});

window.MinhaLiturgiaPDF = { gerarPdfCelebracao };
