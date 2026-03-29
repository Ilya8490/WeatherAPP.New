import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

export function MetricCard({ label, value, icon }: MetricCardProps) {
  return (
    <div className="rounded-[24px] bg-[rgb(var(--bg-soft))] p-4 transition duration-300 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium muted">{label}</span>
        <span className="text-[rgb(var(--text-secondary))]">{icon}</span>
      </div>
      <p className="mt-5 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
