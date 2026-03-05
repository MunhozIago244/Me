import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navItems, availableForWork } from "../../data/metadata";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useSoundPreference } from "../../hooks/useSoundPreference";

/**
 * Header fixo com blur glassmorphism, seção ativa,
 * badge de disponibilidade, toggle de som e menu mobile.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { enabled: soundEnabled, toggle: toggleSound } = useSoundPreference();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-base/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-bg-base/70 backdrop-blur-sm"
      }`}
      role="banner"
    >
      {/* Gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-accent-green via-accent-blue to-accent-green opacity-40" />

      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <a
          href="#"
          className="font-mono text-text-primary text-lg hover:text-accent-green transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="text-accent-green">$</span> iago_munhoz
          <span className="animate-pulse text-accent-green">_</span>
        </a>

        {/* ── Nav Links ── */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative font-mono text-sm transition-colors py-1 ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-0.5 transition-all duration-300"
                  style={{
                    width: isActive ? "100%" : "0%",
                    backgroundColor: item.color,
                  }}
                />
              </a>
            );
          })}
        </div>

        {/* ── Right side: Availability + Sound + Language + Mobile Menu ── */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Availability badge */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono ${
              availableForWork
                ? "border-accent-green/40 bg-accent-green/10 text-accent-green"
                : "border-accent-red/40 bg-accent-red/10 text-accent-red"
            }`}
            title={
              availableForWork
                ? "Open to new opportunities"
                : "Not available"
            }
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                availableForWork
                  ? "bg-accent-green animate-pulse"
                  : "bg-accent-red"
              }`}
            />
            <span className="hidden lg:inline">
              {availableForWork ? "available" : "unavailable"}
            </span>
          </div>

          {/* Sound toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm px-2 py-1 rounded border border-transparent hover:border-grid"
            title={soundEnabled ? "Disable typing sound" : "Enable typing sound"}
            aria-label={
              soundEnabled ? "Disable typing sound" : "Enable typing sound"
            }
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>

          <LanguageSwitcher />
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg-base/95 backdrop-blur-md border-t border-grid">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-mono text-sm py-3 px-4 rounded-lg transition-colors ${
                    isActive
                      ? "bg-accent-green/10 text-accent-green"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                  }`}
                >
                  <span style={{ color: item.color }}>&gt;</span> {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
