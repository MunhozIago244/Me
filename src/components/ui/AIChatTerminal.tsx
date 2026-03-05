/**
 * AIChatTerminal — AI-powered portfolio assistant
 *
 * Inspired by the research_agent.py pattern from the Claude Agent SDK cookbooks:
 * - Specialized system prompt (like RESEARCH_SYSTEM_PROMPT in research_agent.py)
 * - Streaming responses (like async iteration over agent.receive_response())
 * - Multi-turn conversation management
 *
 * Uses @anthropic-ai/sdk with dangerouslyAllowBrowser: true
 * (appropriate for personal portfolio demos — add VITE_ANTHROPIC_API_KEY to .env)
 */

import { useState, useRef, useEffect } from "react";
import Anthropic from "@anthropic-ai/sdk";
import { experiences } from "../../data/experiences.data";
import { skills } from "../../data/skills.data";

/* ── System prompt — inspired by research_agent.py specialization pattern ── */
const PORTFOLIO_SYSTEM_PROMPT = `You are an AI assistant embedded in Iago Munhoz's portfolio website.
You represent Iago and answer questions about his professional profile on his behalf.

## About Iago Munhoz
- Full Stack Architect & System Designer based in Brazil (available for remote work worldwide)
- 5+ years of professional experience in software development
- Email: iagomunhoz48@gmail.com
- LinkedIn: linkedin.com/in/munhoz-iago
- GitHub: github.com/MunhozIago244
- Currently available for new opportunities

## Professional Experience
${experiences.map((e) => `### ${e.company} — ${e.role} (${e.period})
${e.description}
Key highlights: ${e.highlights.join("; ")}
Tech: ${e.tech.join(", ")}`).join("\n\n")}

## Technical Skills
${skills.map((s) => `- ${s.technology} [${s.proficiency}] — ${s.years} years`).join("\n")}

## Instructions
- Answer concisely and professionally, as if you are Iago's personal representative
- Be enthusiastic about his work and skills
- For hiring/opportunity questions, encourage contacting via email: iagomunhoz48@gmail.com
- Keep responses short (2-4 sentences) unless the question clearly requires detail
- Use a friendly, developer-to-developer tone
- If asked about things you don't know, say you'd recommend contacting Iago directly`;

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

const SUGGESTIONS = [
  "What's Iago's main stack?",
  "Tell me about his Bosch experience",
  "Is he available for hire?",
  "What makes him stand out?",
];

export default function AIChatTerminal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>(
    import.meta.env.VITE_ANTHROPIC_API_KEY ?? "",
  );
  const [keyPrompt, setKeyPrompt] = useState(false);
  const [tempKey, setTempKey] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const key = apiKey.trim();
    if (!key) {
      setKeyPrompt(true);
      return;
    }

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Build conversation history for multi-turn (like continue_conversation in research_agent.py)
    const history = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Add placeholder streaming message
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", streaming: true },
    ]);

    try {
      const client = new Anthropic({
        apiKey: key,
        dangerouslyAllowBrowser: true,
      });

      // Stream response — mirrors the async iteration pattern from research_agent.py
      const stream = await client.messages.stream({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: PORTFOLIO_SYSTEM_PROMPT,
        messages: history,
      });

      let accumulated = "";
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          accumulated += chunk.delta.text;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: accumulated,
              streaming: true,
            };
            return updated;
          });
        }
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: accumulated,
          streaming: false,
        };
        return updated;
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `[error] ${msg}`,
          streaming: false,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-bg-secondary border border-accent-purple text-accent-purple font-mono text-sm rounded-lg shadow-lg hover:bg-accent-purple hover:text-bg-base transition-all duration-200 group"
        aria-label="Open AI chat assistant"
      >
        <span className="text-base leading-none">⚡</span>
        <span className="hidden sm:inline">ask_ai.sh</span>
        <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
      </button>

      {/* ── Chat modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-100 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-6"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Terminal window */}
          <div className="relative w-full max-w-lg sm:max-w-md bg-bg-secondary border border-accent-purple rounded-xl shadow-2xl shadow-purple-500/20 flex flex-col overflow-hidden animate-fade-in-up max-h-[85vh]">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-code border-b border-grid select-none shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-accent-red" />
                <div className="w-3 h-3 rounded-full bg-accent-yellow" />
                <div className="w-3 h-3 rounded-full bg-accent-green" />
              </div>
              <span className="text-xs text-text-secondary font-mono">
                bash — portfolio_ai.sh
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-text-secondary hover:text-text-primary text-xs font-mono transition-colors"
              >
                [×]
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-4 min-h-[200px]">
              {messages.length === 0 && !keyPrompt && (
                <div className="space-y-3">
                  <p className="text-accent-green text-xs">
                    $ claude --system portfolio_assistant.md
                  </p>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    AI assistant powered by Claude. Ask me anything about Iago's
                    background, skills, or availability.
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-text-secondary text-xs">
                      // Suggested queries:
                    </p>
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendMessage(s)}
                        className="block w-full text-left text-xs text-accent-blue hover:text-accent-green transition-colors py-1 truncate"
                      >
                        &gt; {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* API key prompt */}
              {keyPrompt && (
                <div className="space-y-3">
                  <p className="text-accent-yellow text-xs">
                    [warn] VITE_ANTHROPIC_API_KEY not set
                  </p>
                  <p className="text-text-secondary text-xs">
                    Enter your Anthropic API key to use the chat (stored in
                    memory only, never sent anywhere except api.anthropic.com):
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={tempKey}
                      onChange={(e) => setTempKey(e.target.value)}
                      placeholder="sk-ant-..."
                      className="flex-1 bg-code border border-grid text-text-primary text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-accent-purple"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (tempKey.trim()) {
                          setApiKey(tempKey.trim());
                          setKeyPrompt(false);
                        }
                      }}
                      className="px-3 py-2 bg-accent-purple text-bg-base text-xs font-mono rounded hover:opacity-80 transition-opacity"
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xs text-text-secondary">
                    {msg.role === "user" ? (
                      <span className="text-accent-green">$ you</span>
                    ) : (
                      <span className="text-accent-purple">$ claude</span>
                    )}
                  </p>
                  <p className="text-text-primary text-xs leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                    {msg.streaming && (
                      <span className="inline-block w-1.5 h-3.5 bg-accent-purple ml-0.5 animate-pulse align-middle" />
                    )}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!keyPrompt && (
              <div className="border-t border-grid px-4 py-3 flex items-center gap-2 shrink-0 bg-code">
                <span className="text-accent-green text-xs font-mono shrink-0">
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Iago..."
                  disabled={loading}
                  className="flex-1 bg-transparent text-text-primary text-xs font-mono focus:outline-none placeholder:text-text-secondary disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  className="text-accent-purple text-xs font-mono hover:text-accent-green transition-colors disabled:opacity-40"
                >
                  {loading ? "..." : "[enter]"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
