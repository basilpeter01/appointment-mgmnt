import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  FiHome, FiCalendar, FiUser, FiCheckCircle, FiXCircle,
  FiClock, FiUsers, FiX, FiSearch,
} from "react-icons/fi";
import { Sidebar, type SidebarItem } from "../components/Sidebar";
import { DashboardCard } from "../components/DashboardCard";
import { StatusBadge } from "../components/StatusBadge";
import { ProfileCard } from "../components/ProfileCard";
import { PATIENT_APPOINTMENTS, type PatientAppointment } from "../data/appointments";

export const Route = createFileRoute("/patient-dashboard")({
  head: () => ({ meta: [{ title: "Patient Dashboard — MediCare" }, { name: "description", content: "Manage your appointments and visits." }] }),
  component: PatientDashboard,
});

const ITEMS: SidebarItem[] = [
  { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
  { key: "appointments", label: "Appointments", icon: <FiCalendar /> },
  { key: "profile", label: "Profile", icon: <FiUser /> },
];

function PatientDashboard() {
  const [active, setActive] = useState("dashboard");
  const [list, setList] = useState<PatientAppointment[]>(PATIENT_APPOINTMENTS);
  const [userName, setUserName] = useState("Aarya Sinha");
  const [userEmail, setUserEmail] = useState("aarya.sinha@example.com");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const initials = userName.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  const upcoming = list.filter((a) => a.status === "Confirmed" || a.status === "Pending");
  const past = list.filter((a) => a.status === "Completed" || a.status === "Cancelled");

  const stats = {
    upcoming: upcoming.length,
    completed: list.filter((a) => a.status === "Completed").length,
    cancelled: list.filter((a) => a.status === "Cancelled").length,
    doctors: new Set(list.map((a) => a.doctorId)).size,
  };

  const cancel = (id: string) => {
    setList((arr) => arr.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a)));
  };

  return (
    <div className="dash-shell">
      <Sidebar items={ITEMS} active={active} onSelect={setActive} />
      <div className="dash-main">
        <div className="dash-header">
          <div>
            <h1>
              {active === "dashboard" && `Welcome back, ${userName}`}
              {active === "appointments" && "Your Appointments"}
              {active === "profile" && "Your Profile"}
            </h1>
            <p>Here's a snapshot of your healthcare activity.</p>
          </div>
          <div className="dash-user">
            <div className="av">{initials}</div>
            <div>
              <b>{userName}</b>
              <span>Patient</span>
            </div>
          </div>
        </div>

        {active === "dashboard" && (
          <>
            <div className="stats-grid">
              <DashboardCard label="Upcoming" value={stats.upcoming} icon={<FiCalendar />} tone="blue" delta="2 this week" />
              <DashboardCard label="Completed" value={stats.completed} icon={<FiCheckCircle />} tone="green" />
              <DashboardCard label="Cancelled" value={stats.cancelled} icon={<FiXCircle />} tone="rose" />
              <DashboardCard label="Doctors Visited" value={stats.doctors} icon={<FiUsers />} tone="amber" />
            </div>

            <div className="dash-panel">
              <div className="head">
                <h3>Upcoming Appointments</h3>
                <Link to="/doctors" className="med-btn med-btn-primary">Book New</Link>
              </div>
              <AppointmentTable rows={upcoming} onCancel={cancel} showActions />
            </div>

            <div className="dash-panel">
              <div className="head"><h3>Past Appointments</h3></div>
              <AppointmentTable rows={past} />
            </div>
          </>
        )}

        {active === "appointments" && (
          <>
            <div className="dash-panel">
              <div className="head">
                <h3>All Upcoming</h3>
                <div className="med-input-wrap" style={{ width: 260 }}>
                  <FiSearch />
                  <input className="med-input" placeholder="Search appointments" />
                </div>
              </div>
              <AppointmentTable rows={upcoming} onCancel={cancel} showActions />
            </div>
            <div className="dash-panel">
              <div className="head"><h3>History</h3></div>
              <AppointmentTable rows={past} />
            </div>
          </>
        )}

        {active === "profile" && (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 22 }}>
            <ProfileCard name={userName} role="Patient · Member since 2024" email={userEmail} />
            <div className="dash-panel" style={{ margin: 0 }}>
              <div className="head"><h3>Personal Information</h3></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <ProfileField label="Full Name" value={userName} />
                <ProfileField label="Email" value={userEmail} />
                <ProfileField label="Phone" value="+91 98765 43210" />
                <ProfileField label="Date of Birth" value="14 Mar 1995" />
                <ProfileField label="Gender" value="Female" />
                <ProfileField label="Blood Group" value="O+" />
                <ProfileField label="City" value="Mumbai" />
                <ProfileField label="Emergency Contact" value="+91 98123 45678" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "var(--med-bg)", padding: 14, borderRadius: 12 }}>
      <div style={{ fontSize: 12, color: "var(--med-muted)" }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--med-ink)", marginTop: 2 }}>{value}</div>
    </div>
  );
}

function AppointmentTable({
  rows, onCancel, showActions,
}: {
  rows: PatientAppointment[];
  onCancel?: (id: string) => void;
  showActions?: boolean;
}) {
  if (rows.length === 0) {
    return <div className="dash-empty">No appointments to show.</div>;
  }
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Department</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            {showActions && <th></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => {
            const initials = a.doctorName.replace(/^Dr\.?\s*/i, "").split(" ").map((p) => p[0]).slice(0,2).join("");
            return (
              <tr key={a.id}>
                <td>
                  <div className="doc-cell">
                    <div className="av">{initials}</div>
                    <div>
                      <b>{a.doctorName}</b>
                      <span style={{color: "var(--med-muted)", fontSize: 13}}>Doctor</span>
                    </div>
                  </div>
                </td>
                <td>{a.department}</td>
                <td><span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><FiCalendar size={14} />{a.date}</span></td>
                <td><span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><FiClock size={14} />{a.time}</span></td>
                <td><StatusBadge status={a.status} /></td>
                {showActions && (
                  <td>
                    {a.status === "Confirmed" || a.status === "Pending" ? (
                      <div className="actions">
                        <button className="icon-btn danger" title="Cancel" onClick={() => onCancel?.(a.id)}><FiX /></button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: "var(--med-muted)" }}>—</span>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}