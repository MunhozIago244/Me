import type { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Janela de terminal estilizada (macOS-like).
 * Usada na hero section e em code blocks.
 */
export default function TerminalWindow({
  title = "bash — iago@system:~",
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`w-full max-w-3xl rounded-lg border border-grid bg-code shadow-2xl shadow-black/40 overflow-hidden ${className}`}
      role="region"
      aria-label="Terminal window"
    >
      {/* ── Title Bar ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-code border-b border-grid select-none">
        <div className="flex gap-2">
          <div
            className="w-3 h-3 rounded-full bg-accent-red"
            aria-hidden="true"
          />
          <div
            className="w-3 h-3 rounded-full bg-accent-yellow"
            aria-hidden="true"
          />
          <div
            className="w-3 h-3 rounded-full bg-accent-green"
            aria-hidden="true"
          />
        </div>
        <span className="text-xs text-text-secondary font-mono">{title}</span>
        <div className="w-14" /> {/* Spacer for centering */}
      </div>

      {/* ── Body ── */}
      <div className="p-6 font-mono text-sm leading-relaxed text-text-primary overflow-y-auto max-h-[60vh]">
        {children}
      </div>
    </div>
  );
}
