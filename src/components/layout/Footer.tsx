import { RESUME_URL } from "../../data/metadata";

/**
 * Footer "System Info" com links, quote e easter egg.
 */
export default function Footer() {
  return (
    <footer
      className="border-t border-grid py-12 mt-24 bg-bg-base"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* ── System Info ── */}
          <div className="font-mono text-sm">
            <h4 className="text-accent-blue mb-3">$ system --info</h4>
            <div className="space-y-1 text-text-primary">
              <p>Built with React + TypeScript</p>
              <p>Styled with Tailwind CSS v4</p>
              <p>Hosted on Vercel</p>
              <p>Version: 2.0.1</p>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="font-mono text-sm">
            <h4 className="text-accent-blue mb-3">$ ls ./links</h4>
            <div className="space-y-1">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-primary hover:text-accent-green transition-colors"
              >
                → resume.pdf
              </a>
              <a
                href="https://github.com/MunhozIago244"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-primary hover:text-accent-green transition-colors"
              >
                → github.com/MunhozIago244
              </a>
              <a
                href="https://linkedin.com/in/munhoz-iago"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-primary hover:text-accent-green transition-colors"
              >
                → linkedin.com/in/munhoz-iago
              </a>
              <span className="block text-text-primary/50 cursor-not-allowed select-none">
                → blog (coming soon)
              </span>
            </div>
          </div>

          {/* ── Philosophy ── */}
          <div className="font-mono text-sm">
            <h4 className="text-accent-blue mb-3">$ cat ./philosophy.txt</h4>
            <p className="text-text-primary italic leading-relaxed">
              "Code is poetry. Architecture is art. Solving problems is my
              craft."
            </p>
          </div>
        </div>

        {/* ── Copyright + Easter Egg ── */}
        <div className="text-center pt-8 border-t border-grid">
          <p className="text-text-primary text-sm font-mono">
            © {new Date().getFullYear()} Iago Munhoz. Built with ❤️ and ☕
          </p>
          <p className="text-text-primary text-xs font-mono mt-2">
            → <span className="text-accent-green">Tip:</span> Try pressing{" "}
            <kbd className="px-2 py-0.5 bg-code rounded text-text-primary">
              Ctrl
            </kbd>{" "}
            +{" "}
            <kbd className="px-2 py-0.5 bg-code rounded text-text-primary">
              K
            </kbd>{" "}
            for a surprise 😉
          </p>
        </div>
      </div>
    </footer>
  );
}
