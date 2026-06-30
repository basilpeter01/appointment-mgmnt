import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock, FiArrowRight, FiCalendar, FiVideo, FiShield } from "react-icons/fi";
import { FaHeartbeat, FaUserMd } from "react-icons/fa";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create Account — MediCare" }, { name: "description", content: "Create your free MediCare account to book doctors and manage care." }] }),
  component: RegisterPage,
});

function scorePassword(p: string) {
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
const LABELS = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);

  const strength = useMemo(() => scorePassword(form.password), [form.password]);

  const upd = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm || !agree) return;
    navigate({ to: role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard" });
  };

  return (
    <div className="auth-shell">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="mark"><FaHeartbeat /></span>
          <span>MediCare</span>
        </div>
        <div className="auth-hero">
          <h1>Create your free MediCare account.</h1>
          <p>Join 50,000+ patients and doctors using MediCare to manage healthcare seamlessly.</p>
        </div>
        <div className="auth-illus">
          <div className="tile"><div className="ic"><FiCalendar /></div><div><b>500+ doctors</b><span>Across 25+ specialities</span></div></div>
          <div className="tile"><div className="ic"><FiVideo /></div><div><b>Video consultations</b><span>Care from anywhere</span></div></div>
          <div className="tile"><div className="ic"><FiShield /></div><div><b>Encrypted records</b><span>Your data is protected</span></div></div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Create your account</h2>
          <p className="sub">Takes less than a minute. No credit card required.</p>

          <div className="role-picker" style={{ marginTop: 22 }}>
            <button type="button" className={`role-tile ${role === "patient" ? "is-active" : ""}`} onClick={() => setRole("patient")}>
              <div className="ic"><FaHeartbeat /></div>
              <div><b>Patient</b><span>Book & track visits</span></div>
            </button>
            <button type="button" className={`role-tile ${role === "doctor" ? "is-active" : ""}`} onClick={() => setRole("doctor")}>
              <div className="ic"><FaUserMd /></div>
              <div><b>Doctor</b><span>Manage practice</span></div>
            </button>
          </div>

          <form className="auth-form" onSubmit={submit}>
            <div className="med-field">
              <label>Full name</label>
              <div className="med-input-wrap">
                <FiUser />
                <input className="med-input" required value={form.name} onChange={(e) => upd("name", e.target.value)} placeholder="Jane Doe" />
              </div>
            </div>
            <div className="med-field">
              <label>Email</label>
              <div className="med-input-wrap">
                <FiMail />
                <input className="med-input" type="email" required value={form.email} onChange={(e) => upd("email", e.target.value)} placeholder="you@example.com" />
              </div>
            </div>
            <div className="med-field">
              <label>Phone number</label>
              <div className="med-input-wrap">
                <FiPhone />
                <input className="med-input" required value={form.phone} onChange={(e) => upd("phone", e.target.value)} placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className="med-field">
              <label>Password</label>
              <div className="med-input-wrap">
                <FiLock />
                <input className="med-input" type="password" required value={form.password} onChange={(e) => upd("password", e.target.value)} placeholder="At least 8 characters" />
              </div>
              <div className="pwd-strength">
                <div className="pwd-bars">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className={`bar ${strength >= i ? `is-on-${Math.min(strength,4)}` : ""}`} />
                  ))}
                </div>
                <span className="label">{LABELS[strength]}</span>
              </div>
            </div>
            <div className="med-field">
              <label>Confirm password</label>
              <div className="med-input-wrap">
                <FiLock />
                <input className="med-input" type="password" required value={form.confirm} onChange={(e) => upd("confirm", e.target.value)} placeholder="Repeat password" />
              </div>
              {form.confirm && form.confirm !== form.password && (
                <span className="label" style={{ color: "var(--med-danger)", fontSize: 12 }}>Passwords don't match</span>
              )}
            </div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "var(--med-muted)" }}>
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 3 }} />
              <span>I agree to MediCare's <a href="#" style={{ color: "var(--med-blue-600)", fontWeight: 600 }}>Terms of Service</a> and <a href="#" style={{ color: "var(--med-blue-600)", fontWeight: 600 }}>Privacy Policy</a>.</span>
            </label>

            <button type="submit" disabled={!agree} className="med-btn med-btn-primary med-btn-block med-btn-lg" style={{ opacity: agree ? 1 : 0.6 }}>
              Create Account <FiArrowRight />
            </button>
          </form>

          <div className="auth-foot">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}