import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  FiHome, FiCalendar, FiUsers, FiUser, FiCheckCircle, FiX,
  FiClock, FiActivity,
} from "react-icons/fi";
import { Sidebar, type SidebarItem } from "../components/Sidebar";
import { DashboardCard } from "../components/DashboardCard";
import { StatusBadge } from "../components/StatusBadge";
import { ProfileCard } from "../components/ProfileCard";
import { DOCTOR_SCHEDULE, type DoctorPatient } from "../data/appointments";

export const Route = createFileRoute("/doctor-dashboard")({
  head: () => ({ meta: [{ title: "Doctor Dashboard — MediCare" }, { name: "description", content: "Manage today's schedule, patients, and appointments." }] }),
  component: DoctorDashboard,
});

const ITEMS: SidebarItem[] = [
  { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
  { key: "schedule", label: "Today's Schedule", icon: <FiCalendar /> },
  { key: "patients", label: "Patients", icon: <FiUsers /> },
  { key: "appointments", label: "Appointments", icon: <FiActivity /> },
  { key: "profile", label: "Profile", icon: <FiUser /> },
];

function DoctorDashboard() {
  const [active, setActive] = useState("dashboard");
  const [schedule, setSchedule] = useState<DoctorPatient[]>(DOCTOR_SCHEDULE);

  const totals = {
    patients: schedule.length,
    appts: schedule.length,
    completed: schedule.filter((s) => s.status === "Completed").length,
    free: 4,
  };

  const setStatus = (id: string, status: DoctorPatient["status"]) =>
    setSchedule((arr) => arr.map((s) => (s.id === id ? { ...s, status } : s)));

  return (
    <div className="dash-shell">
      <Sidebar items={ITEMS} active={active} onSelect={setActive} />
      <div className="dash-main">
        <div className="dash-header">
          <div>
            <h1>
              {active === "dashboard" && "Good morning, Dr. Sharma"}
              {active === "schedule" && "Today's Schedule"}
              {active === "patients" && "Patient List"}
              {active === "appointments" && "All Appointments"}
              {active === "profile" && "Your Profile"}
            </h1>
            <p>You have {totals.patients} patients scheduled today.</p>
          </div>
          <div className="dash-user">
            <div className="av">AS</div>
            <div>
              <b>Dr. Aarav Sharma</b>
              <span>Cardiologist</span>
            </div>
          </div>
        </div>

        {(active === "dashboard" || active === "appointments") && (
          <div className="stats-grid">
            <DashboardCard label="Today's Patients" value={totals.patients} icon={<FiUsers />} tone="blue" delta="+2 from yesterday" />
            <DashboardCard label="Today's Appointments" value={totals.appts} icon={<FiCalendar />} tone="amber" />
            <DashboardCard label="Completed" value={totals.completed} icon={<FiCheckCircle />} tone="green" />
            <DashboardCard label="Available Slots" value={totals.free} icon={<FiClock />} tone="rose" />
          </div>
        )}

        {(active === "dashboard" || active === "schedule") && (
          <div className="dash-panel">
            <div className="head">
              <h3>Today's Schedule</h3>
              <span style={{ fontSize: 13, color: "var(--med-muted)" }}>{new Date().toDateString()}</span>
            </div>
            <ScheduleTable rows={schedule} onStatus={setStatus} />
          </div>
        )}

        {(active === "dashboard" || active === "patients") && (
          <div className="dash-panel">
            <div className="head"><h3>Patients</h3></div>
            <PatientTable rows={schedule} onStatus={setStatus} />
          </div>
        )}

        {active === "appointments" && (
          <div className="dash-panel">
            <div className="head"><h3>Today's Appointments</h3></div>
            <ScheduleTable rows={schedule} onStatus={setStatus} />
          </div>
        )}

        {active === "profile" && (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 22 }}>
            <ProfileCard name="Dr. Aarav Sharma" role="Cardiologist · 14 yrs experience" email="aarav.sharma@medicare.app" />
            <div className="dash-panel" style={{ margin: 0 }}>
              <div className="head"><h3>Practice Details</h3></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Specialization" value="Interventional Cardiology" />
                <Field label="Qualification" value="MBBS, MD (Cardiology)" />
                <Field label="Hospital" value="Apollo Hospitals" />
                <Field label="Consultation Fee" value="₹800" />
                <Field label="Languages" value="English, Hindi, Marathi" />
                <Field label="Hours" value="Mon–Sat · 10 AM – 7 PM" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "var(--med-bg)", padding: 14, borderRadius: 12 }}>
      <div style={{ fontSize: 12, color: "var(--med-muted)" }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--med-ink)", marginTop: 2 }}>{value}</div>
    </div>
  );
}

function ScheduleTable({ rows, onStatus }: { rows: DoctorPatient[]; onStatus: (id: string, s: DoctorPatient["status"]) => void }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="dash-table">
        <thead>
          <tr><th>Time</th><th>Patient</th><th>Problem</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td><b>{p.time}</b></td>
              <td>
                <div className="doc-cell">
                  <div className="av">{p.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
                  <div>
                    <b>{p.name}</b>
                    <span>Age {p.age}</span>
                  </div>
                </div>
              </td>
              <td>{p.problem}</td>
              <td><StatusBadge status={p.status} /></td>
              <td>
                {p.status !== "Completed" && p.status !== "No-show" ? (
                  <div className="actions">
                    <button className="icon-btn ok" title="Mark Completed" onClick={() => onStatus(p.id, "Completed")}><FiCheckCircle /></button>
                    <button className="icon-btn danger" title="Mark No-show" onClick={() => onStatus(p.id, "No-show")}><FiX /></button>
                  </div>
                ) : <span style={{ fontSize: 12, color: "var(--med-muted)" }}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PatientTable({ rows, onStatus }: { rows: DoctorPatient[]; onStatus: (id: string, s: DoctorPatient["status"]) => void }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="dash-table">
        <thead>
          <tr><th>Patient</th><th>Age</th><th>Appointment Time</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td>
                <div className="doc-cell">
                  <div className="av">{p.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
                  <div>
                    <b>{p.name}</b>
                    <span>{p.problem}</span>
                  </div>
                </div>
              </td>
              <td>{p.age}</td>
              <td>{p.time}</td>
              <td><StatusBadge status={p.status} /></td>
              <td>
                {p.status !== "Completed" && p.status !== "No-show" ? (
                  <div className="actions">
                    <button className="icon-btn ok" onClick={() => onStatus(p.id, "Completed")} title="Completed"><FiCheckCircle /></button>
                    <button className="icon-btn danger" onClick={() => onStatus(p.id, "No-show")} title="No-show"><FiX /></button>
                  </div>
                ) : <span style={{ fontSize: 12, color: "var(--med-muted)" }}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}