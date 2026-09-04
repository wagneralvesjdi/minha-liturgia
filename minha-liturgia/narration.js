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
      currentAudio.play();
      setLabel(btn, 'playing');
      return;
    }
    stop();
    const audio = new Audio(url);
    audio.onended = () => { setLabel(btn, 'idle'); currentBtn = null; currentAudio = null; };
    audio.onerror = () => {
      currentAudio = null;
      currentBtn = null;
      if (supported && getFallbackText) toggle(btn, getFallbackText);
    };
    currentAudio = audio;
    currentBtn = btn;
    setLabel(btn, 'playing');
    audio.play().catch(() => {
      currentAudio = null;
      currentBtn = null;
      if (supported && getFallbackText) toggle(btn, getFallbackText);
    });
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
    audio.onended = () => { queueAudio = null; queueAdvance(); };
    audio.onerror = () => { queueAudio = null; speakQueueSpeech(item.text); };
    queueAudio = audio;
    audio.play().catch(() => { queueAudio = null; speakQueueSpeech(item.text); });
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
      if (onEnd) onEnd();
      return;
    }
    queueCurrentItem = normalizeQueueItem(queueItems[queueIndex]);
    queueRepeatDone = 0;
    playCurrentRepeat();
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
    if (queueBtn === btn) {
      if (queueAudio && !queueAudio.paused) { queueAudio.pause(); setLabel(btn, 'paused'); return; }
      if (queueAudio && queueAudio.paused) { queueAudio.play(); setLabel(btn, 'playing'); return; }
      if (speechSynthesis.speaking && !speechSynthesis.paused) { speechSynthesis.pause(); setLabel(btn, 'paused'); return; }
      if (speechSynthesis.paused) { speechSynthesis.resume(); setLabel(btn, 'playing'); return; }
    }
    stop();
    if (!Array.isArray(items) || !items.length) return;
    queueItems = items;
    queueIndex = typeof startAt === 'number' ? startAt : 0;
    queueBtn = btn;
    queueOnItemChange = onItemChange || null;
    queueOnEnd = onEnd || null;
    setLabel(btn, 'playing');
    speechSynthesis.cancel();
    setTimeout(speakQueueItem, 80);
  }

  function queueGoTo(index) {
    if (!queueItems) return;
    if (queueAudio) { queueAudio.pause(); queueAudio.onended = null; queueAudio.onerror = null; queueAudio = null; }
    speechSynthesis.cancel();
    queueIndex = Math.max(0, Math.min(index, queueItems.length - 1));
    setTimeout(speakQueueItem, 80);
  }

  function queueNext() { if (queueItems) queueGoTo(queueIndex + 1); }
  function queuePrev() { if (queueItems) queueGoTo(queueIndex - 1); }
  function queueActive(btn) { return queueBtn === btn; }

  window.MinhaLiturgiaNarration = {
    supported, toggle, stop, textFrom, textFromBlocos, toSpeechCase, playAudio,
    playQueue, queueNext, queuePrev, queueGoTo, queueActive,
  };
})();
