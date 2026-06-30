import { FiCalendar, FiClock } from "react-icons/fi";
import type { PatientAppointment } from "../data/appointments";

export function AppointmentCard({ a }: { a: PatientAppointment }) {
  const initials = a.doctorName.replace(/^Dr\.?\s*/i, "").split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <div className="appt-card">
      <div className="av">{initials}</div>
      <div className="info">
        <b>{a.doctorName}</b>
        <span>{a.department}</span>
      </div>
      <div style={{ display: "flex", gap: 14, fontSize: 13, color: "var(--med-muted)" }}>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}><FiCalendar />{a.date}</span>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}><FiClock />{a.time}</span>
      </div>
    </div>
  );
}