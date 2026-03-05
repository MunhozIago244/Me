/**
 * Som de tecla suave gerado via Web Audio API.
 * Sem dependências externas — fallback silencioso se não suportado.
 */
export function playKeyClick(): void {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "square";
    // Pequena variação de pitch para naturalidade
    osc.frequency.setValueAtTime(500 + Math.random() * 250, ctx.currentTime);
    gain.gain.setValueAtTime(0.012, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

    osc.start();
    osc.stop(ctx.currentTime + 0.045);

    // Cleanup do AudioContext
    setTimeout(() => ctx.close(), 300);
  } catch {
    // Silently fail — não interromper a UX
  }
}
