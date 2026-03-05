import { useState, useCallback, useEffect, lazy, Suspense } from "react";

/* ── Layout ── */
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import GridBackground from "./components/layout/GridBackground";
import CommandPalette from "./components/layout/CommandPalette";

/* ── Sections ── */
import HeroTerminal from "./components/sections/HeroTerminal";
import AboutSystem from "./components/sections/AboutSystem";
import ExperienceSection from "./components/sections/ExperienceSection";
import TechStackSQL from "./components/sections/TechStackSQL";
import ProjectsGitLog from "./components/sections/ProjectsGitLog";
import MetricsDashboard from "./components/sections/MetricsDashboard";
import ContactAPI from "./components/sections/ContactAPI";

/* ── Effects ── */
import MatrixRain from "./components/effects/MatrixRain";
import CursorTrail from "./components/effects/CursorTrail";

/* ── UI ── */
import ScrollProgress from "./components/ui/ScrollProgress";
import LoadingScreen from "./components/ui/LoadingScreen";
import ErrorBoundary from "./components/ui/ErrorBoundary";

/* ── Lazy loaded components (code splitting) ── */
const AIChatTerminal = lazy(() => import("./components/ui/AIChatTerminal"));

/* ── Utils ── */
import { printConsoleEasterEggs } from "./data/metadata";
import { useKeyPress, useKonamiCode } from "./hooks/useKeyPress";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [hireMode, setHireMode] = useState(false);

  // Command Palette — Ctrl+K
  useKeyPress("k", () => setPaletteOpen(true), { ctrl: true });

  // Konami Code Easter Egg
  useKonamiCode(
    useCallback(() => {
      setKonamiActivated(true);
      setTimeout(() => setKonamiActivated(false), 5000);
    }, []),
  );

  // Console Easter Eggs
  useEffect(() => {
    printConsoleEasterEggs();
  }, []);

  // ?hire=true easter egg — abre modal especial para recrutadores
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("hire") || window.location.hash === "#hire-me") {
      setHireMode(true);
    }
  }, []);

  return (
    <>
      {/* ── Loading Screen — aparece antes do conteúdo ── */}
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <div
        className={`relative min-h-screen bg-bg-base text-text-primary overflow-x-hidden transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* ── Scroll Progress Bar ── */}
        <ScrollProgress />

        {/* ── Background Layers ── */}
        <MatrixRain />
        <GridBackground />
        <CursorTrail />

        {/* ── Header ── */}
        <Header />

        {/* ── Main Content ── */}
        <ErrorBoundary>
          <main>
            <HeroTerminal />
            <AboutSystem />
            <ExperienceSection />
            <TechStackSQL />
            <ProjectsGitLog />
            <MetricsDashboard />
            <ContactAPI />
          </main>
        </ErrorBoundary>

        {/* ── Footer ── */}
        <Footer />

        {/* ── AI Chat Terminal (lazy loaded) ── */}
        <Suspense fallback={null}>
          <AIChatTerminal />
        </Suspense>

        {/* ── Command Palette ── */}
        <CommandPalette
          isOpen={paletteOpen}
          onClose={() => setPaletteOpen(false)}
        />

        {/* ── Konami Code Easter Egg ── */}
        {konamiActivated && (
          <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in-up">
            <div className="text-center font-mono space-y-4">
              <div className="text-6xl">🎮</div>
              <h3 className="text-3xl text-accent-green font-bold">
                KONAMI CODE ACTIVATED!
              </h3>
              <p className="text-accent-blue text-lg">
                You found the secret! You're clearly a dev of culture 🧑‍💻
              </p>
              <p className="text-accent-yellow text-sm">
                Achievement Unlocked: "True Gamer Developer"
              </p>
              <p className="text-text-secondary text-xs mt-4">
                Closing in 5 seconds...
              </p>
            </div>
          </div>
        )}

        {/* ── ?hire=true Easter Egg ── */}
        {hireMode && (
          <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in-up">
            <div className="max-w-lg w-full mx-4 bg-bg-secondary border border-accent-green rounded-xl p-8 font-mono">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-accent-red" />
                <div className="w-3 h-3 rounded-full bg-accent-yellow" />
                <div className="w-3 h-3 rounded-full bg-accent-green" />
                <span className="ml-4 text-text-secondary text-xs">
                  bash — recruiter_mode.sh
                </span>
              </div>

              <p className="text-accent-green text-sm mb-1">
                $ cat ./candidate_profile.json
              </p>
              <pre className="text-sm text-text-primary mt-3 leading-relaxed">
                {`{
  "name": "Iago Munhoz",
  "role": "Full Stack Architect",
  "status": "✅ AVAILABLE",
  "experience": "5+ years",
  "location": "Brasil (Remote OK)",
  "stack": ["Java", "React", "Node.js", "AWS"],
  "contact": "iagomunhoz48@gmail.com"
}`}
              </pre>

              <div className="mt-6 flex gap-3">
                <a
                  href="mailto:iagomunhoz48@gmail.com"
                  className="flex-1 text-center px-4 py-2 bg-accent-green text-bg-base font-bold rounded hover:bg-accent-blue transition-colors text-sm"
                >
                  Send Offer
                </a>
                <button
                  type="button"
                  className="px-4 py-2 border border-grid text-text-secondary rounded hover:border-text-secondary transition-colors text-sm"
                  onClick={() => setHireMode(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
