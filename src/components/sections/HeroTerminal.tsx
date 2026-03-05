import TerminalWindow from "../ui/TerminalWindow";
import TypewriterEffect from "../ui/TypewriterEffect";
import Button from "../ui/Button";
import { bootSequence, RESUME_URL } from "../../data/metadata";
import { ArrowRight, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Hero Section — "Boot Sequence Terminal"
 * Tela cheia com terminal animado + sub-heading + CTAs.
 */
export default function HeroTerminal() {
  const { t } = useTranslation();
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20"
      aria-label="Hero section"
    >
      {/* ── Partículas sutis ── */}
      <Particles />

      {/* ── Terminal ── */}
      <TerminalWindow className="relative z-10">
        <TypewriterEffect
          lines={bootSequence}
          charDelay={20}
          lineDelay={60}
          startDelay={800}
        />
      </TerminalWindow>

      {/* ── Sub-heading ── */}
      <div className="relative z-10 mt-12 text-center max-w-3xl animate-fade-in-up">
        <h1 className="sr-only">Iago Munhoz — Full Stack Architect</h1>
        <h2 className="text-2xl md:text-3xl font-mono text-accent-blue mb-4">
          {t("hero.role")}
        </h2>
        <p className="text-text-secondary leading-relaxed text-base md:text-lg">
          {t("hero.description")}
          <span className="text-accent-yellow">{t("hero.highlight")}</span>
        </p>
      </div>

      {/* ── CTA Buttons ── */}
      <div className="relative z-10 mt-8 flex flex-wrap gap-4 justify-center animate-fade-in-up animation-delay-300">
        <Button
          variant="primary"
          icon={<ArrowRight size={16} />}
          onClick={() =>
            document
              .querySelector("#projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {t("hero.cta_projects")}
        </Button>

        <Button
          variant="secondary"
          icon={<Download size={16} />}
          onClick={() => window.open(RESUME_URL, "_blank")}
        >
          {t("hero.cta_resume")}
        </Button>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-text-secondary z-10">
        <div className="w-5 h-8 border-2 border-text-secondary rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-text-secondary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ── Partículas sutis flutuando (pontos de luz) ── */
function Particles() {
  // Gera posições estáticas no build para evitar layout shift
  const dots = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 7) % 100}%`,
    top: `${(i * 23 + 13) % 100}%`,
    delay: `${(i * 0.3) % 5}s`,
    duration: `${4 + (i % 4)}s`,
    size: i % 3 === 0 ? 2 : 1,
  }));

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-accent-green animate-float"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            opacity: 0.15 + (dot.id % 5) * 0.05,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}
    </div>
  );
}
