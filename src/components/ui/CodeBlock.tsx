import React from "react";

interface CodeBlockProps {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
}

/**
 * Bloco de código estilizado com numeração de linhas.
 */
export default function CodeBlock({
  children,
  language = "json",
  showLineNumbers = true,
}: CodeBlockProps) {
  const lines = children.split("\n");

  return (
    <div className="rounded-lg border border-grid bg-code overflow-hidden font-mono text-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-code border-b border-grid">
        <span className="text-xs text-text-secondary">{language}</span>
        <button
          className="text-xs text-text-secondary hover:text-accent-blue transition-colors"
          onClick={() => navigator.clipboard.writeText(children)}
          aria-label="Copy code"
        >
          copy
        </button>
      </div>

      {/* Code */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-text-primary">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="inline-block w-8 text-right mr-4 text-text-secondary select-none shrink-0">
                  {i + 1}
                </span>
              )}
              <span
                className={
                  line.startsWith("+")
                    ? "text-accent-green"
                    : line.startsWith("-")
                      ? "text-accent-red"
                      : ""
                }
              >
                {colorizeJSON(line)}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

/** Colorização simples de JSON */
function colorizeJSON(line: string): React.ReactNode {
  // Keys
  const withKeys = line.replace(/"([^"]+)":/g, '<KEY>"$1"</KEY>:');

  // String values
  const withValues = withKeys.replace(/: ?"([^"]+)"/g, ': <VAL>"$1"</VAL>');

  // Array string values
  const withArrayVals = withValues.replace(
    /(?<!=)"([^"<]+)"/g,
    '<VAL>"$1"</VAL>',
  );

  // Se não houve mudança, retorna como está
  if (!withArrayVals.includes("<KEY>") && !withArrayVals.includes("<VAL>")) {
    return <>{line}</>;
  }

  // Parse manual dos tokens
  const parts: React.ReactNode[] = [];
  let remaining = withArrayVals;
  let idx = 0;

  while (remaining.length > 0) {
    const keyStart = remaining.indexOf("<KEY>");
    const valStart = remaining.indexOf("<VAL>");

    const nextToken =
      keyStart !== -1 && (valStart === -1 || keyStart < valStart)
        ? "KEY"
        : valStart !== -1
          ? "VAL"
          : null;

    if (!nextToken) {
      parts.push(<span key={idx++}>{remaining}</span>);
      break;
    }

    const tagOpen = `<${nextToken}>`;
    const tagClose = `</${nextToken}>`;
    const start = remaining.indexOf(tagOpen);

    // Text before token
    if (start > 0) {
      parts.push(<span key={idx++}>{remaining.slice(0, start)}</span>);
    }

    const contentStart = start + tagOpen.length;
    const contentEnd = remaining.indexOf(tagClose, contentStart);
    const content = remaining.slice(contentStart, contentEnd);

    parts.push(
      <span
        key={idx++}
        className={
          nextToken === "KEY" ? "text-accent-blue" : "text-accent-yellow"
        }
      >
        {content}
      </span>,
    );

    remaining = remaining.slice(contentEnd + tagClose.length);
  }

  return <>{parts}</>;
}
