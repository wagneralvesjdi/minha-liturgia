/* Narração por voz — dois motores:
   1) Áudio pré-gravado (voz mais natural), quando existir o arquivo.
   2) Web Speech API (voz do aparelho) como reserva — sem download, sem
      custo, funciona offline. Cada trecho pode ir migrando aos poucos
      do (2) pro (1) só trocando o arquivo de áudio, sem mexer no resto
      do app. */
(function () {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  let currentBtn = null;
  let currentUtterance = null; // precisa ficar viva fora da função, senão o Chrome recolhe (GC) e a fala não sai
  let currentAudio = null; // <audio> tocando fora de fila (playAudio avulso)
  let ptVoice = null;

  // Fila sequencial (ex.: oração guiada passo a passo, um item de cada vez).
  // Cada item pode ser uma string (fala por voz do aparelho) ou
  // { text, audioUrl, repeat } (toca o áudio gravado; se falhar, cai pra
  // fala; repeat repete esse mesmo passo N vezes antes de avançar —
  // usado pras dezenas, ex.: Ave Maria 10x).
  let queueItems = null;
  let queueIndex = 0;
  let queueBtn = null;
  let queueOnItemChange = null;
  let queueOnEnd = null;
  let queueAudio = null; // <audio> tocando dentro da fila, se o passo atual usa áudio gravado
  let queueCurrentItem = null;
  let queueRepeatDone = 0;
  // Estado explícito da fila — evita depender de checar queueAudio.paused /
  // speechSynthesis.speaking pra saber se dá pra pausar: no intervalo entre
  // clicar em "play" e o áudio/fala realmente começar (setTimeout de 80ms),
  // nenhum dos dois existe ainda, e pausar nesse instante caía num "else"
  // que zerava a fila inteira — parecia "voltar pro início" ao continuar.
  let queueState = 'idle'; // 'idle' | 'playing' | 'paused'

  function pickVoice() {
    const voices = speechSynthesis.getVoices();
    return (
      voices.find((v) => v.lang === 'pt-BR') ||
      voices.find((v) => v.lang && v.lang.startsWith('pt')) ||
      null
    );
  }

  if (supported) {
    ptVoice = pickVoice();
    speechSynthesis.onvoiceschanged = () => { ptVoice = pickVoice(); };
  }

  function setLabel(btn, state) {
    if (!btn) return;
    btn.dataset.narrationState = state;
    const compact = btn.dataset.narrationCompact === 'true';
    if (state === 'playing') btn.textContent = compact ? '⏸' : '⏸ Pausar narração';
    else if (state === 'paused') btn.textContent = compact ? '▶' : '▶ Continuar narração';
    else btn.textContent = compact ? '🔊' : (btn.dataset.narrationLabel || '🔊 Ouvir');
  }

  // Alguns motores de TTS do Android soletram letra por letra palavras em
  // CAIXA ALTA. Normaliza trechos assim (por frase, pra não mexer no que já
  // está em minúsculas) antes de mandar pro speechSynthesis.
  function toSpeechCase(s) {
    if (!s) return s;
    return s.replace(/[^.!?]+[.!?]*/g, (sentence) => {
      const letters = sentence.replace(/[^A-Za-zÀ-ÿ]/g, '');
      const upper = letters.replace(/[^A-ZÀ-Þ]/g, '');
      if (letters.length >= 6 && upper.length / letters.length > 0.7) {
        const lower = sentence.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }
      return sentence;
    });
  }

  function textFrom(el) {
    if (!el) return '';
    return toSpeechCase(el.textContent.replace(/\s+/g, ' ').trim());
  }

  function textFromBlocos(blocos, labelMap) {
    if (!Array.isArray(blocos)) return '';
    return blocos
      .map((b) => {
        const texto = toSpeechCase((b.texto || '').trim());
        const label = labelMap && labelMap[b.tipo];
        return label ? `${label}: ${texto}` : texto;
      })
      .filter(Boolean)
      .join(' ');
  }

  function stop() {
    if (currentAudio) { currentAudio.pause(); currentAudio.onended = null; currentAudio.onerror = null; currentAudio = null; }
    if (queueAudio) { queueAudio.pause(); queueAudio.onended = null; queueAudio.onerror = null; queueAudio = null; }
    if (supported) speechSynthesis.cancel();
    if (currentBtn) setLabel(currentBtn, 'idle');
    currentBtn = null;
    currentUtterance = null;
    if (queueBtn) setLabel(queueBtn, 'idle');
    queueItems = null;
    queueBtn = null;
    queueOnItemChange = null;
    queueOnEnd = null;
    queueCurrentItem = null;
    queueRepeatDone = 0;
    queueState = 'idle';
  }

  function speakNow(btn, text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    if (ptVoice) utterance.voice = ptVoice;
    utterance.rate = 0.95;
    utterance.onend = () => { setLabel(btn, 'idle'); currentBtn = null; currentUtterance = null; };
    utterance.onerror = () => { setLabel(btn, 'idle'); currentBtn = null; currentUtterance = null; };

    currentUtterance = utterance;
    currentBtn = btn;
    setLabel(btn, 'playing');
    speechSynthesis.speak(utterance);
  }

  function toggle(btn, getText) {
    if (!supported) {
      if (window.showToast) window.showToast('Seu navegador não suporta narração por voz.');
      return;
    }

    if (currentBtn === btn && speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setLabel(btn, 'paused');
      return;
    }
    if (currentBtn === btn && speechSynthesis.paused) {
      speechSynthesis.resume();
      setLabel(btn, 'playing');
      return;
    }

    const text = (getText() || '').trim();
    if (!text) {
      if (window.showToast) window.showToast('Nada para narrar aqui ainda.');
      return;
    }

    if (currentBtn && currentBtn !== btn) setLabel(currentBtn, 'idle');

    if (speechSynthesis.speaking || speechSynthesis.pending) {
      // Chamar speak() logo após cancel() no mesmo instante costuma ser ignorado
      // pelo motor de voz do Chrome/Android — um pequeno atraso evita a corrida.
      speechSynthesis.cancel();
      setTimeout(() => speakNow(btn, text), 80);
    } else {
      speakNow(btn, text);
    }
  }

  // Toca um único áudio gravado (voz mais natural). Se o arquivo não existir
  // ou falhar ao carregar, cai automaticamente pra voz do aparelho.
  function playAudio(btn, url, getFallbackText) {
    if (currentBtn === btn && currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      setLabel(btn, 'paused');
      return;
    }
    if (currentBtn === btn && currentAudio && currentAudio.paused) {
      currentAudio.play().catch(() => {});
      setLabel(btn, 'playing');
      return;
    }
    stop();
    const audio = new Audio(url);
    // onerror (falha ao carregar) e a rejeição de play() podem disparar os
    // dois pro mesmo erro — o guard evita cair pra voz do aparelho em dobro.
    // AbortError acontece quando o próprio pause() interrompe essa promise
    // (ex.: usuário pausa rápido logo após iniciar) — não é falha real, e
    // tratá-lo como tal derrubava currentAudio/currentBtn bem na hora que
    // o botão devia continuar "pausado", fazendo "continuar" reiniciar do
    // zero em vez de retomar de onde parou.
    let fallbackDone = false;
    const fallback = () => {
      if (fallbackDone) return;
      fallbackDone = true;
      currentAudio = null;
      currentBtn = null;
      if (supported && getFallbackText) toggle(btn, getFallbackText);
    };
    audio.onended = () => { setLabel(btn, 'idle'); currentBtn = null; currentAudio = null; };
    audio.onerror = fallback;
    currentAudio = audio;
    currentBtn = btn;
    setLabel(btn, 'playing');
    audio.play().catch((err) => { if (err && err.name !== 'AbortError') fallback(); });
  }

  function normalizeQueueItem(item) {
    if (typeof item === 'string') return { text: item, audioUrl: null, repeat: 1 };
    const repeat = (item && item.repeat) || 1;
    return { text: (item && item.text) || '', audioUrl: (item && item.audioUrl) || null, repeat };
  }

  // Repete o passo atual (ex.: 3ª de 10 Ave-Marias) antes de avançar pro
  // próximo passo da fila.
  function queueAdvance() {
    if (queueRepeatDone < (queueCurrentItem ? queueCurrentItem.repeat : 1)) {
      playCurrentRepeat();
      return;
    }
    queueIndex += 1;
    speakQueueItem();
  }

  function speakQueueSpeech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    if (ptVoice) utterance.voice = ptVoice;
    utterance.rate = 0.95;
    utterance.onend = queueAdvance;
    utterance.onerror = queueAdvance;
    currentUtterance = utterance;
    speechSynthesis.speak(utterance);
  }

  function speakQueueAudio(item) {
    const audio = new Audio(item.audioUrl);
    // Mesmo cuidado do playAudio: onerror e a rejeição de play() podem
    // disparar os dois pro mesmo erro, duplicando a fala de reserva. E o
    // mesmo cuidado com AbortError: um pause() logo após iniciar rejeita a
    // promise de play() sem ser uma falha real — ignorar evita cair pra
    // fala de reserva no meio de uma pausa normal.
    let fallbackDone = false;
    const fallback = () => {
      if (fallbackDone) return;
      fallbackDone = true;
      queueAudio = null;
      speakQueueSpeech(item.text);
    };
    audio.onended = () => { queueAudio = null; queueAdvance(); };
    audio.onerror = fallback;
    queueAudio = audio;
    audio.play().catch((err) => { if (err && err.name !== 'AbortError') fallback(); });
  }

  function playCurrentRepeat() {
    queueRepeatDone += 1;
    if (queueOnItemChange) {
      queueOnItemChange(queueIndex, queueItems.length, queueRepeatDone, queueCurrentItem.repeat);
    }
    if (queueCurrentItem.audioUrl) speakQueueAudio(queueCurrentItem);
    else speakQueueSpeech(queueCurrentItem.text);
  }

  function speakQueueItem() {
    if (!queueItems || queueIndex >= queueItems.length) {
      const btn = queueBtn;
      const onEnd = queueOnEnd;
      if (btn) setLabel(btn, 'idle');
      queueItems = null;
      queueBtn = null;
      queueOnItemChange = null;
      queueOnEnd = null;
      queueCurrentItem = null;
      queueRepeatDone = 0;
      queueState = 'idle';
      if (onEnd) onEnd();
      return;
    }
    queueCurrentItem = normalizeQueueItem(queueItems[queueIndex]);
    queueRepeatDone = 0;
    playCurrentRepeat();
  }

  // Só toca de fato se ninguém pausou nesse meio-tempo — usado depois do
  // pequeno atraso do início (ou de um pulo), pra não começar a tocar por
  // cima de uma pausa que aconteceu antes do áudio/fala existir de verdade.
  function attemptStartQueueItem() {
    if (queueState === 'playing') speakQueueItem();
  }

  function queuePause(btn) {
    if (queueAudio) queueAudio.pause();
    else if (queueCurrentItem && speechSynthesis.speaking) speechSynthesis.pause();
    // Se nem queueAudio nem fala existem ainda (pausou durante o atraso
    // inicial), não há nada pra pausar fisicamente — só marcar o estado já
    // resolve, porque attemptStartQueueItem vai checar antes de começar.
    queueState = 'paused';
    setLabel(btn, 'paused');
  }

  function queueResume(btn) {
    queueState = 'playing';
    setLabel(btn, 'playing');
    if (queueAudio) { queueAudio.play(); return; }
    if (queueCurrentItem && speechSynthesis.paused) { speechSynthesis.resume(); return; }
    // Pausou antes do passo atual ter começado de verdade — começa agora.
    if (!queueCurrentItem) speakQueueItem();
  }

  // Toca uma lista de passos em sequência — cada passo pode ser um texto
  // (voz do aparelho) ou { text, audioUrl } (áudio gravado, com a mesma
  // fala como reserva). Usado na oração guiada (ex.: terço), onde cada
  // passo precisa avançar sozinho e permitir voltar/pular sem perder a
  // posição.
  function playQueue(btn, items, { onItemChange, onEnd, startAt } = {}) {
    if (!supported) {
      if (window.showToast) window.showToast('Seu navegador não suporta narração por voz.');
      return;
    }
    if (queueBtn === btn && queueState === 'playing') { queuePause(btn); return; }
    if (queueBtn === btn && queueState === 'paused') { queueResume(btn); return; }
    stop();
    if (!Array.isArray(items) || !items.length) return;
    queueItems = items;
    queueIndex = typeof startAt === 'number' ? startAt : 0;
    queueBtn = btn;
    queueOnItemChange = onItemChange || null;
    queueOnEnd = onEnd || null;
    queueState = 'playing';
    setLabel(btn, 'playing');
    speechSynthesis.cancel();
    setTimeout(attemptStartQueueItem, 80);
  }

  function queueGoTo(index) {
    if (!queueItems) return;
    if (queueAudio) { queueAudio.pause(); queueAudio.onended = null; queueAudio.onerror = null; queueAudio = null; }
    speechSynthesis.cancel();
    queueCurrentItem = null;
    queueIndex = Math.max(0, Math.min(index, queueItems.length - 1));
    queueState = 'playing';
    setLabel(queueBtn, 'playing');
    setTimeout(attemptStartQueueItem, 80);
  }

  function queueRestart() { queueGoTo(0); }
  function queueNext() { if (queueItems) queueGoTo(queueIndex + 1); }
  function queuePrev() { if (queueItems) queueGoTo(queueIndex - 1); }
  function queueActive(btn) { return queueBtn === btn; }
  function queueIsPaused() { return queueState === 'paused'; }

  window.MinhaLiturgiaNarration = {
    supported, toggle, stop, textFrom, textFromBlocos, toSpeechCase, playAudio,
    playQueue, queueNext, queuePrev, queueGoTo, queueRestart, queueActive, queueIsPaused,
  };
})();
