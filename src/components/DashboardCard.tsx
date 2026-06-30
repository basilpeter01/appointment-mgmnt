import type { ReactNode } from "react";

export function DashboardCard({
  label, value, icon, tone = "blue", delta,
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  tone?: "blue" | "green" | "amber" | "rose";
  delta?: string;
}) {
  return (
    <div className="stat-card med-anim-up">
      <div className={`ic ${tone}`}>{icon}</div>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {delta && <div className="delta">{delta}</div>}
    </div>
  );
}