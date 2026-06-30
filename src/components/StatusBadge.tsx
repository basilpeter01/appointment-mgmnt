import type { AppointmentStatus } from "../data/appointments";

export function StatusBadge({ status }: { status: AppointmentStatus | string }) {
  const map: Record<string, string> = {
    Confirmed: "med-badge med-badge-info",
    Pending: "med-badge med-badge-warning",
    Cancelled: "med-badge med-badge-danger",
    Completed: "med-badge med-badge-success",
    Waiting: "med-badge med-badge-warning",
    "In Progress": "med-badge med-badge-blue",
    "No-show": "med-badge med-badge-danger",
  };
  return <span className={map[status] ?? "med-badge med-badge-info"}>{status}</span>;
}