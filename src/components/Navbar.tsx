import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/doctors", label: "Doctors" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`nav-root ${scrolled ? "is-scrolled" : ""}`}>
      <div className="med-container nav-inner">
        <Link to="/" className="nav-brand">
          <span className="nav-brand-mark"><FaHeartbeat /></span>
          <span>Medi<b>Care</b></span>
        </Link>

        <nav className="nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link"
              activeProps={{ className: "nav-link is-active" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <Link to="/login" className="med-btn med-btn-ghost">Login</Link>
          <Link to="/register" className="med-btn med-btn-primary">Register</Link>
        </div>

        <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div className={`nav-mobile ${open ? "is-open" : ""}`}>
        {LINKS.map((l) => (
          <Link key={l.to} to={l.to} className="nav-link" activeProps={{ className: "nav-link is-active" }} activeOptions={{ exact: l.to === "/" }}>
            {l.label}
          </Link>
        ))}
        <div className="nav-cta">
          <Link to="/login" className="med-btn med-btn-outline">Login</Link>
          <Link to="/register" className="med-btn med-btn-primary">Register</Link>
        </div>
      </div>
    </header>
  );
}