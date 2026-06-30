import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { SiteShell } from "../components/SiteShell";
import { DoctorCard } from "../components/DoctorCard";
import { DOCTORS, SPECIALIZATIONS } from "../data/doctors";

export const Route = createFileRoute("/doctors")({
  head: () => ({ meta: [{ title: "Find Doctors — MediCare" }, { name: "description", content: "Search verified doctors by speciality, experience, and availability." }] }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("all");
  const [avail, setAvail] = useState("any");
  const [exp, setExp] = useState("any");

  const filtered = useMemo(() => {
    return DOCTORS.filter((d) => {
      if (q && !d.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (spec !== "all" && d.specialization !== spec) return false;
      if (avail === "today" && !d.availableToday) return false;
      if (exp === "5+" && d.experience < 5) return false;
      if (exp === "10+" && d.experience < 10) return false;
      if (exp === "15+" && d.experience < 15) return false;
      return true;
    });
  }, [q, spec, avail, exp]);

  return (
    <SiteShell>
      <div className="med-page" style={{ paddingTop: 72 }}>
        <section className="doctors-hero">
          <div className="med-container">
            <h1>Find the right doctor for you</h1>
            <p>500+ verified specialists across hospitals in India.</p>

            <div className="search-row">
              <div className="med-input-wrap">
                <FiSearch />
                <input className="med-input" placeholder="Search by doctor name" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <select className="med-input med-input-plain" value={spec} onChange={(e) => setSpec(e.target.value)}>
                <option value="all">All specialities</option>
                {SPECIALIZATIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select className="med-input med-input-plain" value={avail} onChange={(e) => setAvail(e.target.value)}>
                <option value="any">Any availability</option>
                <option value="today">Available today</option>
              </select>
              <select className="med-input med-input-plain" value={exp} onChange={(e) => setExp(e.target.value)}>
                <option value="any">Any experience</option>
                <option value="5+">5+ years</option>
                <option value="10+">10+ years</option>
                <option value="15+">15+ years</option>
              </select>
              <button className="med-btn med-btn-primary" onClick={() => { setQ(""); setSpec("all"); setAvail("any"); setExp("any"); }}>
                Reset
              </button>
            </div>
          </div>
        </section>

        <div className="med-container">
          <div className="doctors-toolbar">
            <div className="count"><b>{filtered.length}</b> doctors found</div>
            <div className="count">Sorted by relevance</div>
          </div>

          {filtered.length === 0 ? (
            <div className="doctors-empty">No doctors match your filters. Try resetting.</div>
          ) : (
            <div className="doctors-grid">
              {filtered.map((d) => <DoctorCard key={d.id} doctor={d} />)}
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}