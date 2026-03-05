import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  icon?: ReactNode;
}

const variants = {
  primary:
    "border border-accent-green text-accent-green hover:bg-accent-green hover:text-bg-base",
  secondary:
    "border border-text-secondary text-text-secondary hover:border-accent-blue hover:text-accent-blue",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-grid",
};

/**
 * Botão reutilizável estilizado como comando de terminal.
 */
export default function Button({
  variant = "primary",
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 px-6 py-3
        font-mono text-sm rounded
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:ring-offset-2 focus:ring-offset-bg-base
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
