/* Narração por voz (Web Speech API) — sem download, sem custo, funciona offline
   com a voz de TTS já instalada no aparelho. */
(function () {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  let currentBtn = null;
  let currentUtterance = null; // precisa ficar viva fora da função, senão o Chrome recolhe (GC) e a fala não sai
  let ptVoice = null;

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
    if (!supported) return;
    speechSynthesis.cancel();
    if (currentBtn) setLabel(currentBtn, 'idle');
    currentBtn = null;
    currentUtterance = null;
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

  window.MinhaLiturgiaNarration = { supported, toggle, stop, textFrom, textFromBlocos, toSpeechCase };
})();
