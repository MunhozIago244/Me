import { useTranslation } from "react-i18next";

// Expandimos o array para conter a bandeira (emoji) e textos descritivos para acessibilidade.
// Nota: Em produção de altíssima fidelidade, recomendo usar SVGs (ex: pacote `flag-icons`)
// no lugar de emojis para garantir renderização idêntica em Windows, macOS e Linux.
const languages = [
  {
    code: "pt-BR",
    flag: "🇧🇷",
    label: "Português",
    ariaLabel: "Mudar idioma para Português",
  },
  {
    code: "en",
    flag: "🇺🇸",
    label: "English",
    ariaLabel: "Switch language to English",
  },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div
      className="inline-flex items-center gap-1 p-1 bg-black/30 backdrop-blur-md rounded-full border border-white/10 shadow-sm"
      role="group"
      aria-label="Seletor de idioma"
    >
      {languages.map((lang) => {
        const isActive = i18n.language === lang.code;

        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            disabled={isActive}
            aria-label={lang.ariaLabel}
            title={lang.label}
            className={`
              relative flex items-center justify-center w-8 h-8 rounded-full text-lg 
              transition-all duration-200 ease-in-out select-none
              ${
                isActive
                  ? "bg-black/40 shadow-inner scale-100 opacity-100 cursor-default ring-1 ring-white/20"
                  : "bg-transparent opacity-60 hover:opacity-100 hover:bg-white/10 hover:scale-105 cursor-pointer"
              }
            `}
          >
            {/* aria-hidden="true" impede que o leitor de tela leia o emoji de forma literal (ex: "Bandeira do Brasil") */}
            <span aria-hidden="true" className="leading-none drop-shadow-md">
              {lang.flag}
            </span>
          </button>
        );
      })}
    </div>
  );
}
