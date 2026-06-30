import { Link } from "@tanstack/react-router";
import { FiStar, FiBriefcase, FiAward, FiMapPin } from "react-icons/fi";
import type { Doctor } from "../data/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="doc-card med-anim-up">
      {doctor.availableToday && (
        <span className="med-badge med-badge-success av-today">Available Today</span>
      )}
      <div className="doc-card-top">
        <div className="doc-avatar">{doctor.initials}</div>
        <div style={{ minWidth: 0 }}>
          <div className="name">{doctor.name}</div>
          <div className="qual">{doctor.qualification}</div>
          <span className="spec">{doctor.specialization}</span>
        </div>
      </div>

      <div className="doc-meta">
        <div className="item"><FiMapPin /> {doctor.hospital}</div>
        <div className="item"><FiBriefcase /> {doctor.experience} yrs exp</div>
        <div className="item"><FiStar /> {doctor.rating} ({doctor.reviews})</div>
        <div className="item"><FiAward /> Verified</div>
      </div>

      <div className="footer">
        <div className="fee">
          <b>₹{doctor.fee}</b>
          <span>Consultation fee</span>
        </div>
        <Link to="/book-appointment/$id" params={{ id: doctor.id }} className="med-btn med-btn-primary">
          Book Appointment
        </Link>
      </div>
    </div>
  );
}