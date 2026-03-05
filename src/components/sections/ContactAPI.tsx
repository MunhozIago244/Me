import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import type { ContactIntent } from "../../types/portfolio.types";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * ID do formulário Formspree.
 * Crie uma conta em formspree.io, crie um form e cole o ID aqui.
 * Exemplo: "xrgnbqjb"
 */
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? "";

/**
 * Seção de Contato — Interface "API Request Viewer" estilo Postman/Insomnia.
 * Envia mensagens reais via Formspree.
 */
export default function ContactAPI() {
  const [ref, isInView] = useInView<HTMLElement>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [intent, setIntent] = useState<ContactIntent>("hiring");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [messageId, setMessageId] = useState("");
  const [activeTab, setActiveTab] = useState<"body" | "headers" | "auth">("body");

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setStatus("loading");

    const endpoint = FORMSPREE_ID
      ? `https://formspree.io/f/${FORMSPREE_ID}`
      : "https://formspree.io/f/demo"; // fallback visual

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, company, message, intent }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setMessageId(`msg_${Date.now()}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const sent = status === "success";

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-24"
      aria-label="Contact section"
    >
      {/* ── Section Title ── */}
      <h2 className="text-xl md:text-2xl font-mono mb-2">
        <span className="text-accent-red">##</span> POST /api/v1/contact
      </h2>
      <p className="text-text-secondary text-sm font-mono mb-12">
        → initialize_connection.sh
      </p>

      <div
        className={`transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {!sent ? (
          <form onSubmit={handleSubmit}>
            {/* ── Method + Endpoint ── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <span className="px-4 py-2.5 bg-accent-green text-bg-base font-mono font-bold rounded text-sm text-center shrink-0">
                POST
              </span>
              <input
                type="text"
                value="https://iago-munhoz.dev/api/v1/contact"
                readOnly
                className="flex-1 px-4 py-2.5 bg-code border border-text-secondary text-text-primary font-mono text-sm rounded"
                aria-label="API endpoint"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-2.5 bg-accent-blue text-bg-base font-mono font-bold rounded hover:bg-accent-green transition-colors text-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "SEND"
                )}
              </button>
            </div>

            {/* ── Tabs ── */}
            <div className="flex gap-4 mb-4 border-b border-grid">
              {(["body", "headers", "auth"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`pb-2 px-1 font-mono text-sm capitalize transition-colors border-b-2 ${
                    activeTab === tab
                      ? "text-accent-blue border-accent-blue"
                      : "text-text-secondary border-transparent hover:text-text-primary"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ── Request Body ── */}
            {activeTab === "body" && (
              <div className="bg-code border border-text-secondary rounded-lg p-5 font-mono text-sm space-y-1">
                <div className="text-text-primary">{"{"}</div>

                <div className="ml-4 text-text-primary">
                  <span className="text-accent-blue">"from"</span>: {"{"}
                </div>

                <div className="ml-8 flex flex-wrap items-center gap-1">
                  <span className="text-accent-blue">"name"</span>:{" "}
                  <span className="text-accent-yellow">"</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    required
                    className="bg-transparent border-b border-text-secondary text-accent-yellow outline-none px-1 w-40 focus:border-accent-green transition-colors placeholder:text-text-secondary"
                    aria-label="Your name"
                  />
                  <span className="text-accent-yellow">"</span>,
                </div>

                <div className="ml-8 flex flex-wrap items-center gap-1">
                  <span className="text-accent-blue">"email"</span>:{" "}
                  <span className="text-accent-yellow">"</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="bg-transparent border-b border-text-secondary text-accent-yellow outline-none px-1 w-48 focus:border-accent-green transition-colors placeholder:text-text-secondary"
                    aria-label="Your email"
                  />
                  <span className="text-accent-yellow">"</span>,
                </div>

                <div className="ml-8 flex flex-wrap items-center gap-1">
                  <span className="text-accent-blue">"company"</span>:{" "}
                  <span className="text-text-secondary">"</span>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Empresa (opcional)"
                    className="bg-transparent border-b border-text-secondary text-text-secondary outline-none px-1 w-44 focus:border-accent-green focus:text-accent-yellow transition-colors placeholder:text-text-secondary/50"
                    aria-label="Your company"
                  />
                  <span className="text-text-secondary">"</span>
                </div>

                <div className="ml-4 text-text-primary">{"}"},</div>

                <div className="ml-4">
                  <span className="text-accent-blue">"message"</span>:{" "}
                  <span className="text-accent-yellow">"</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Sua mensagem aqui..."
                    required
                    rows={3}
                    className="block w-full mt-1 bg-bg-secondary border border-text-secondary text-accent-yellow outline-none p-2 rounded text-sm focus:border-accent-green transition-colors resize-none placeholder:text-text-secondary"
                    aria-label="Your message"
                  />
                  <span className="text-accent-yellow">"</span>,
                </div>

                <div className="ml-4 flex flex-wrap items-center gap-1">
                  <span className="text-accent-blue">"intent"</span>:{" "}
                  <span className="text-accent-yellow">"</span>
                  <select
                    value={intent}
                    onChange={(e) => setIntent(e.target.value as ContactIntent)}
                    className="bg-bg-secondary text-accent-blue border border-text-secondary px-2 py-1 rounded text-xs focus:border-accent-green outline-none"
                    aria-label="Contact intent"
                  >
                    <option value="hiring">Oportunidade de Trabalho</option>
                    <option value="project">Projeto/Freelance</option>
                    <option value="collaboration">Colaboração</option>
                    <option value="other">Apenas um Oi 👋</option>
                  </select>
                  <span className="text-accent-yellow">"</span>
                </div>

                <div className="text-text-primary">{"}"}</div>
              </div>
            )}

            {activeTab === "headers" && (
              <div className="bg-code border border-text-secondary rounded-lg p-5 font-mono text-sm">
                <div className="space-y-1 text-text-secondary">
                  <div>
                    <span className="text-accent-blue">Content-Type</span>:{" "}
                    application/json
                  </div>
                  <div>
                    <span className="text-accent-blue">Accept</span>:{" "}
                    application/json
                  </div>
                  <div>
                    <span className="text-accent-blue">X-Powered-By</span>:{" "}
                    <span className="text-accent-green">☕ + 💻</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "auth" && (
              <div className="bg-code border border-text-secondary rounded-lg p-5 font-mono text-sm text-text-secondary">
                <p className="text-accent-green">✓ No authentication required</p>
                <p className="mt-2">Public endpoint — all messages welcome!</p>
              </div>
            )}

            {/* Error state */}
            {status === "error" && (
              <div className="mt-4 p-4 bg-accent-red/10 border border-accent-red rounded-lg font-mono text-sm">
                <span className="text-accent-red font-bold">500 Internal Error</span>
                <p className="text-text-secondary mt-1">
                  Falha ao enviar. Tente via{" "}
                  <a
                    href="mailto:iagomunhoz48@gmail.com"
                    className="text-accent-blue hover:underline"
                  >
                    iagomunhoz48@gmail.com
                  </a>
                </p>
              </div>
            )}
          </form>
        ) : (
          /* ── Success Response ── */
          <div className="bg-bg-secondary border border-accent-green rounded-lg p-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent-green text-bg-base font-mono font-bold rounded text-sm">
                200 OK
              </span>
              <span className="text-text-secondary text-sm font-mono">
                Response Time: 42ms
              </span>
            </div>

            <pre className="text-accent-green font-mono text-sm whitespace-pre-wrap">
              {`{
  "status": "success",
  "message": "Message delivered successfully! 🚀",
  "data": {
    "messageId": "${messageId}",
    "responseTime": "< 24h",
    "channels": ["email", "linkedin"]
  }
}`}
            </pre>

            <button
              type="button"
              className="mt-4 text-xs text-text-secondary hover:text-accent-blue font-mono transition-colors"
              onClick={() => setStatus("idle")}
            >
              → send another request
            </button>
          </div>
        )}

        {/* ── Social Links ── */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:iagomunhoz48@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-code border border-text-secondary text-text-primary font-mono text-sm hover:border-accent-green hover:text-accent-green transition-colors rounded"
          >
            <Mail size={16} />
            <span>Send me an E-mail</span>
          </a>

          <a
            href="https://linkedin.com/in/munhoz-iago"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white font-mono text-sm hover:bg-[#0096d5] transition-colors rounded"
          >
            <LinkedinIcon size={16} />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/MunhozIago244"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-code border border-text-secondary text-text-primary font-mono text-sm hover:border-accent-blue hover:text-accent-blue transition-colors rounded"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
