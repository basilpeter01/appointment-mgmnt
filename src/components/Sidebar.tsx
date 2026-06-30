import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FaHeartbeat } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export type SidebarItem = {
  key: string;
  label: string;
  icon: ReactNode;
};

export function Sidebar({
  items,
  active,
  onSelect,
}: {
  items: SidebarItem[];
  active: string;
  onSelect: (key: string) => void;
}) {
  const navigate = useNavigate();
  return (
    <aside className="dash-sidebar">
      <Link to="/" className="dash-brand">
        <span className="mark"><FaHeartbeat /></span>
        <span>MediCare</span>
      </Link>
      <nav className="dash-nav">
        {items.map((it) => (
          <button
            key={it.key}
            className={`dash-link ${active === it.key ? "is-active" : ""}`}
            onClick={() => onSelect(it.key)}
          >
            {it.icon}
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
      <button className="dash-link dash-logout" onClick={() => navigate({ to: "/login" })}>
        <FiLogOut />
        <span>Logout</span>
      </button>
    </aside>
  );
}