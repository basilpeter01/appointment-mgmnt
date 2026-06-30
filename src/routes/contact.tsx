import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiUser, FiMessageSquare, FiSend, FiCheckCircle } from "react-icons/fi";
import { SiteShell } from "../components/SiteShell";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — MediCare" }, { name: "description", content: "Get in touch with the MediCare team." }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <div className="med-page med-container info-page">
        <div className="info-hero">
          <div className="eyebrow">Contact us</div>
          <h1>We'd love to hear from you.</h1>
          <p>Questions, partnerships, or feedback — our team gets back within 24 hours.</p>
        </div>

        <div className="contact-grid">
          <aside className="contact-side">
            <h3>Get in touch</h3>
            <p>Reach our support team through any of these channels.</p>
            <div className="row"><div className="ic"><FiMapPin /></div><div><b>Headquarters</b><span>500 Medical Ave, Mumbai, India</span></div></div>
            <div className="row"><div className="ic"><FiPhone /></div><div><b>Phone</b><span>+91 800 123 4567</span></div></div>
            <div className="row"><div className="ic"><FiMail /></div><div><b>Email</b><span>care@medicare.app</span></div></div>
          </aside>

          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="med-field">
              <label>Full name</label>
              <div className="med-input-wrap"><FiUser /><input className="med-input" required placeholder="Your name" /></div>
            </div>
            <div className="med-field">
              <label>Email</label>
              <div className="med-input-wrap"><FiMail /><input className="med-input" type="email" required placeholder="you@example.com" /></div>
            </div>
            <div className="med-field">
              <label>Subject</label>
              <div className="med-input-wrap"><FiMessageSquare /><input className="med-input" required placeholder="How can we help?" /></div>
            </div>
            <div className="med-field">
              <label>Message</label>
              <textarea className="med-input med-input-plain" style={{ minHeight: 140, paddingTop: 12 }} required placeholder="Tell us more..." />
            </div>
            <button type="submit" className="med-btn med-btn-primary med-btn-lg">
              {sent ? <><FiCheckCircle /> Message sent</> : <>Send Message <FiSend /></>}
            </button>
          </form>
        </div>
      </div>
    </SiteShell>
  );
}