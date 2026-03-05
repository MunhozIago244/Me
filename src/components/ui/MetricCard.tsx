import type { ReactNode } from "react";

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: string | ReactNode;
  label: string;
  children?: ReactNode;
  accentColor?: string;
}

/**
 * Card de métrica para o dashboard.
 * Aceita children para gráficos / barras extras.
 */
export default function MetricCard({
  icon,
  title,
  value,
  label,
  children,
  accentColor = "#50fa7b",
}: MetricCardProps) {
  return (
    <div className="bg-bg-secondary border border-grid rounded-lg p-5 font-mono hover:border-text-secondary transition-colors group">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 text-text-secondary text-sm">
        {icon}
        <span>{title}</span>
      </div>

      {/* Value */}
      <div className="text-3xl font-bold mb-1" style={{ color: accentColor }}>
        {value}
      </div>

      {/* Label */}
      <div className="text-xs text-text-secondary">{label}</div>

      {/* Extra content */}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
