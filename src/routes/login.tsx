import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FiMail, FiLock, FiArrowRight, FiCalendar, FiVideo, FiShield } from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — MediCare" }, { name: "description", content: "Sign in to manage your appointments and health records." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      
      navigate({ to: role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="mark"><FaHeartbeat /></span>
          <span>MediCare</span>
        </div>
        <div className="auth-hero">
          <h1>Welcome back to better, simpler healthcare.</h1>
          <p>Sign in to view your upcoming appointments, message your doctor, and stay on top of your health journey.</p>
        </div>
        <div className="auth-illus">
          <div className="tile"><div className="ic"><FiCalendar /></div><div><b>Instant booking</b><span>Live slots, one tap to confirm</span></div></div>
          <div className="tile"><div className="ic"><FiVideo /></div><div><b>Video consults</b><span>Secure care from your home</span></div></div>
          <div className="tile"><div className="ic"><FiShield /></div><div><b>Bank-grade security</b><span>Your records are encrypted</span></div></div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Sign in to MediCare</h2>
          <p className="sub">Welcome back. Please enter your details below.</p>

          <div className="role-picker" style={{ marginTop: 22 }}>
            <button type="button" className={`role-tile ${role === "patient" ? "is-active" : ""}`} onClick={() => setRole("patient")}>
              <div className="ic"><FaHeartbeat /></div>
              <div><b>Patient</b><span>Book & manage visits</span></div>
            </button>
            <button type="button" className={`role-tile ${role === "doctor" ? "is-active" : ""}`} onClick={() => setRole("doctor")}>
              <div className="ic"><FiCalendar /></div>
              <div><b>Doctor</b><span>Manage your schedule</span></div>
            </button>
          </div>

          <form className="auth-form" onSubmit={submit}>
            <div className="med-field">
              <label>Email address</label>
              <div className="med-input-wrap">
                <FiMail />
                <input className="med-input" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="med-field">
              <label>Password</label>
              <div className="med-input-wrap">
                <FiLock />
                <input className="med-input" type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            <div className="auth-row">
              <label><input type="checkbox" defaultChecked /> Remember me</label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="med-btn med-btn-primary med-btn-block med-btn-lg" style={{ opacity: loading ? 0.6 : 1 }}>
              {loading ? "Signing In..." : <>Sign In <FiArrowRight /></>}
            </button>
            {error && <div style={{ color: "var(--med-danger)", fontSize: 13, marginTop: 12, textAlign: "center" }}>{error}</div>}
          </form>

          <div className="auth-foot">
            New to MediCare? <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}