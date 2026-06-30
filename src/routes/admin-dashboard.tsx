import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { FiLogOut, FiPlus, FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";

export const Route = createFileRoute("/admin-dashboard")({
  head: () => ({ meta: [{ title: "Admin Portal — MediCare" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Admin");
  
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      navigate({ to: "/login" });
    }
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate({ to: "/" });
  };

  const submitDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/create-doctor", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create doctor");

      setSuccess(`Doctor ${form.name} created successfully!`);
      setForm({ name: "", email: "", phone: "", password: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <div className="dash-sidebar">
        <div className="dash-logo" style={{ color: "var(--med-blue-600)" }}>
          <FaShieldAlt /> <span>Admin Portal</span>
        </div>

        <div className="dash-nav">
          <button className="nav-item is-active">
            <FiPlus /> <span>Add Doctor</span>
          </button>
        </div>

        <div className="dash-bottom">
          <button className="nav-item" onClick={logout} style={{ color: "var(--med-danger)" }}>
            <FiLogOut /> <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dash-main">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Add New Doctor</h1>
            <p className="dash-subtitle">Create accounts for medical professionals</p>
          </div>
          <div className="dash-user">
            <div className="av" style={{ background: "var(--med-blue-600)", color: "#fff" }}>AD</div>
            <div>
              <b>{userName}</b>
              <span>System Administrator</span>
            </div>
          </div>
        </div>

        <div className="dash-panel" style={{ maxWidth: 600, margin: "0 auto", marginTop: 40 }}>
          <div className="head">
            <h3>Doctor Credentials</h3>
          </div>
          
          {success && (
            <div style={{ padding: 12, background: "#dcfce7", color: "#166534", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
              {success}
            </div>
          )}
          {error && (
            <div style={{ padding: 12, background: "#fee2e2", color: "#991b1b", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
              {error}
            </div>
          )}

          <form onSubmit={submitDoctor} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="med-field">
              <label>Doctor's Full Name</label>
              <div className="med-input-wrap">
                <FiUser />
                <input required className="med-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Dr. Sarah Johnson" />
              </div>
            </div>

            <div className="med-field">
              <label>Email Address</label>
              <div className="med-input-wrap">
                <FiMail />
                <input required type="email" className="med-input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="doctor@medicare.app" />
              </div>
            </div>

            <div className="med-field">
              <label>Phone Number</label>
              <div className="med-input-wrap">
                <FiPhone />
                <input required className="med-input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98765 43210" />
              </div>
            </div>

            <div className="med-field">
              <label>Temporary Password</label>
              <div className="med-input-wrap">
                <FiLock />
                <input required type="password" className="med-input" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="At least 8 characters" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="med-btn med-btn-primary med-btn-lg" style={{ marginTop: 8 }}>
              {loading ? "Creating Account..." : "Create Doctor Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
