import { createFileRoute, Link } from "@tanstack/react-router";
import { FiTarget, FiHeart, FiUsers, FiShield, FiAward, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import { SiteShell } from "../components/SiteShell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — MediCare" }, { name: "description", content: "MediCare is on a mission to make quality healthcare simple, fast, and accessible." }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <div className="med-page med-container info-page">
        <div className="info-hero">
          <div className="eyebrow">About MediCare</div>
          <h1>Healthcare, the way it should feel.</h1>
          <p>We're building tools that connect patients with the right doctors, faster — and give clinicians more time to focus on care, not admin.</p>
        </div>

        <div className="info-grid">
          {[
            { ic: <FiTarget />, t: "Our mission", d: "Make booking trusted healthcare as easy as ordering a ride." },
            { ic: <FiHeart />, t: "Our values", d: "Empathy first, evidence always, technology that disappears." },
            { ic: <FiUsers />, t: "Our community", d: "50,000+ patients and 500+ verified doctors across India." },
            { ic: <FiShield />, t: "Privacy by design", d: "Your records are encrypted end-to-end and never sold." },
            { ic: <FiAward />, t: "Trusted network", d: "We partner with leading hospitals and verified specialists." },
            { ic: <FiTrendingUp />, t: "Always improving", d: "Weekly improvements driven by real patient and doctor feedback." },
          ].map((c) => (
            <div className="info-card" key={c.t}>
              <div className="ic">{c.ic}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>

        <div className="cta-band" style={{ marginTop: 60 }}>
          <div>
            <h2>Join the future of healthcare</h2>
            <p>Create your free account in under a minute.</p>
          </div>
          <Link to="/register" className="med-btn med-btn-lg" style={{ background: "#fff", color: "var(--med-blue-700)" }}>
            Get Started <FiArrowRight />
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}