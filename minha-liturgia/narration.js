/* Narração por voz (Web Speech API) — sem download, sem custo, funciona offline
   com a voz de TTS já instalada no aparelho. */
(function () {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  let currentBtn = null;
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
    if (state === 'playing') btn.textContent = '⏸ Pausar narração';
    else if (state === 'paused') btn.textContent = '▶ Continuar narração';
    else btn.textContent = btn.dataset.narrationLabel || '🔊 Ouvir';
  }

  function stop() {
    if (!supported) return;
    speechSynthesis.cancel();
    if (currentBtn) setLabel(currentBtn, 'idle');
    currentBtn = null;
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

    speechSynthesis.cancel();
    if (currentBtn && currentBtn !== btn) setLabel(currentBtn, 'idle');

    const text = (getText() || '').trim();
    if (!text) {
      if (window.showToast) window.showToast('Nada para narrar aqui ainda.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    if (ptVoice) utterance.voice = ptVoice;
    utterance.rate = 0.95;
    utterance.onend = () => { setLabel(btn, 'idle'); currentBtn = null; };
    utterance.onerror = () => { setLabel(btn, 'idle'); currentBtn = null; };

    currentBtn = btn;
    setLabel(btn, 'playing');
    speechSynthesis.speak(utterance);
  }

  window.MinhaLiturgiaNarration = { supported, toggle, stop };
})();
