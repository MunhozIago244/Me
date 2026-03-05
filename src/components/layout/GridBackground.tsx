/**
 * Background grid sutil estilo papel milimetrado de engenharia.
 * Renderiza linhas horizontais e verticais via CSS puro.
 */
export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Grid principal */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e2440 1px, transparent 1px),
            linear-gradient(to bottom, #1e2440 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Grid secundária mais fina */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e2440 1px, transparent 1px),
            linear-gradient(to bottom, #1e2440 1px, transparent 1px)
          `,
          backgroundSize: "15px 15px",
        }}
      />

      {/* Vignette radial */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, #0a0e27 70%)",
        }}
      />
    </div>
  );
}
