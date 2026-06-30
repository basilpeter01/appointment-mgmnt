export type AppointmentStatus = "Confirmed" | "Pending" | "Cancelled" | "Completed";

export type PatientAppointment = {
  id: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  status: AppointmentStatus;
};

export const PATIENT_APPOINTMENTS: PatientAppointment[] = [
  { id: "a1", doctorId: "d1", doctorName: "Dr. Aarav Sharma", department: "Cardiology", date: "2026-07-04", time: "10:30 AM", status: "Confirmed" },
  { id: "a2", doctorId: "d4", doctorName: "Dr. Ananya Verma", department: "Paediatrics", date: "2026-07-06", time: "12:00 PM", status: "Pending" },
  { id: "a3", doctorId: "d2", doctorName: "Dr. Priya Iyer", department: "Dermatology", date: "2026-07-10", time: "3:30 PM", status: "Confirmed" },
  { id: "a4", doctorId: "d5", doctorName: "Dr. Karan Singh", department: "Neurology", date: "2026-06-18", time: "11:00 AM", status: "Completed" },
  { id: "a5", doctorId: "d3", doctorName: "Dr. Rohan Mehta", department: "Orthopaedics", date: "2026-06-22", time: "9:30 AM", status: "Completed" },
  { id: "a6", doctorId: "d7", doctorName: "Dr. Vikram Joshi", department: "General Medicine", date: "2026-06-12", time: "2:00 PM", status: "Cancelled" },
];

export type DoctorPatient = {
  id: string;
  name: string;
  age: number;
  time: string;
  problem: string;
  status: "Waiting" | "In Progress" | "Completed" | "No-show";
};

export const DOCTOR_SCHEDULE: DoctorPatient[] = [
  { id: "p1", name: "Rahul Khanna", age: 34, time: "9:00 AM", problem: "Chest discomfort", status: "Completed" },
  { id: "p2", name: "Meera Joshi", age: 28, time: "9:30 AM", problem: "Follow-up consultation", status: "Completed" },
  { id: "p3", name: "Sandeep Patil", age: 52, time: "10:00 AM", problem: "Hypertension review", status: "In Progress" },
  { id: "p4", name: "Aisha Khan", age: 41, time: "10:30 AM", problem: "Palpitations", status: "Waiting" },
  { id: "p5", name: "Vikas Rao", age: 46, time: "11:00 AM", problem: "Routine check-up", status: "Waiting" },
  { id: "p6", name: "Pooja Mehra", age: 38, time: "11:30 AM", problem: "Cholesterol report", status: "Waiting" },
  { id: "p7", name: "Arun Bose", age: 60, time: "12:00 PM", problem: "Post-surgery review", status: "Waiting" },
];

export const REVIEWS = [
  { name: "Rahul K.", rating: 5, text: "Extremely patient and clear with explanations. The booking process was seamless." },
  { name: "Meera J.", rating: 5, text: "Felt heard for the first time. Highly recommend for anyone needing thorough care." },
  { name: "Sandeep P.", rating: 4, text: "Professional and efficient. Wait time at the hospital was minimal." },
];

export const SLOT_TIMES = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "11:30 AM", "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

// Slots that should appear booked for the demo
export const UNAVAILABLE_SLOTS = new Set(["10:00 AM", "11:30 AM", "2:30 PM", "4:00 PM"]);