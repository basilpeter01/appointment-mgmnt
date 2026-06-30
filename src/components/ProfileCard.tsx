import { FiEdit2, FiMail } from "react-icons/fi";

export function ProfileCard({
  name, role, email,
}: { name: string; role: string; email: string }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="profile-card">
      <div className="av">{initials}</div>
      <h3>{name}</h3>
      <div className="sub">{role}</div>
      <div className="sub" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 8 }}>
        <FiMail /> {email}
      </div>
      <div className="actions">
        <button className="med-btn med-btn-outline"><FiEdit2 /> Edit Profile</button>
      </div>
    </div>
  );
}