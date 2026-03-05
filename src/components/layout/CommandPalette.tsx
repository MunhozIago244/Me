import { useState, useEffect, useRef, useCallback } from "react";
import { FileText, Rocket, Code2, Layers, Mail, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getResumeUrl } from "../../data/metadata";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Command {
  icon: React.ReactNode;
  label: string;
  shortcut: string;
  action: () => void;
}

/**
 * Command Palette estilo VS Code / Raycast.
 * Abre com Ctrl+K, permite navegação rápida.
 */
export default function CommandPalette({
  isOpen,
  onClose,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { i18n } = useTranslation();

  /** Wrapper que limpa query ao fechar, garantindo estado limpo na reabertura */
  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  const commands: Command[] = [
    {
      icon: <Mail size={18} />,
      label: "Contact Me",
      shortcut: "C",
      action: () => {
        document
          .querySelector("#contact")
          ?.scrollIntoView({ behavior: "smooth" });
        handleClose();
      },
    },
    {
      icon: <FileText size={18} />,
      label: "Download Resume",
      shortcut: "R",
      action: () => {
        window.open(getResumeUrl(i18n.language), "_blank");
        handleClose();
      },
    },
    {
      icon: <Rocket size={18} />,
      label: "View Projects",
      shortcut: "P",
      action: () => {
        document
          .querySelector("#projects")
          ?.scrollIntoView({ behavior: "smooth" });
        handleClose();
      },
    },
    {
      icon: <Code2 size={18} />,
      label: "Tech Stack",
      shortcut: "S",
      action: () => {
        document
          .querySelector("#stack")
          ?.scrollIntoView({ behavior: "smooth" });
        handleClose();
      },
    },
    {
      icon: <Layers size={18} />,
      label: "Metrics Dashboard",
      shortcut: "M",
      action: () => {
        document
          .querySelector("#metrics")
          ?.scrollIntoView({ behavior: "smooth" });
        handleClose();
      },
    },
    {
      icon: <Moon size={18} />,
      label: "Toggle Theme (Dark/Darker)",
      shortcut: "T",
      action: () => {
        document.documentElement.classList.toggle("darker");
        handleClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()),
  );

  // Foca no input quando abre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Fecha com Esc
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center pt-[20vh]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Palette */}
      <div
        className="relative w-full max-w-lg mx-4 bg-bg-secondary border border-grid rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-grid">
          <Code2 size={18} className="text-text-secondary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-text-primary font-mono text-sm outline-none placeholder:text-text-secondary"
          />
          <kbd className="text-xs text-text-secondary bg-code px-2 py-1 rounded">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.map((cmd) => (
            <button
              key={cmd.label}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-mono text-text-primary hover:bg-grid transition-colors group"
              onClick={cmd.action}
            >
              <span className="text-text-secondary group-hover:text-accent-blue transition-colors">
                {cmd.icon}
              </span>
              <span className="flex-1">{cmd.label}</span>
              <kbd className="text-xs text-text-secondary bg-code px-2 py-1 rounded">
                {cmd.shortcut}
              </kbd>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-text-secondary font-mono">
              No commands found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
