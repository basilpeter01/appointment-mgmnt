export type Doctor = {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  hospital: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  availableToday: boolean;
  languages: string[];
  about: string;
  hours: string;
  initials: string;
};

const ini = (n: string) =>
  n
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const make = (d: Omit<Doctor, "initials">): Doctor => ({ ...d, initials: ini(d.name) });

export const DOCTORS: Doctor[] = [
  make({
    id: "d1",
    name: "Dr. Aarav Sharma",
    qualification: "MBBS, MD (Cardiology)",
    specialization: "Cardiologist",
    hospital: "Apollo Hospitals",
    experience: 14,
    rating: 4.9,
    reviews: 312,
    fee: 800,
    availableToday: true,
    languages: ["English", "Hindi", "Marathi"],
    hours: "Mon–Sat · 10:00 AM – 7:00 PM",
    about:
      "Senior interventional cardiologist with 14+ years of experience treating coronary artery disease, heart failure, arrhythmias, and preventive cardiology. Published researcher and consultant at multiple tertiary care centers.",
  }),
  make({
    id: "d2",
    name: "Dr. Priya Iyer",
    qualification: "MBBS, MD (Dermatology)",
    specialization: "Dermatologist",
    hospital: "Fortis Healthcare",
    experience: 9,
    rating: 4.8,
    reviews: 248,
    fee: 650,
    availableToday: true,
    languages: ["English", "Tamil", "Hindi"],
    hours: "Mon–Fri · 11:00 AM – 6:00 PM",
    about:
      "Cosmetic and clinical dermatologist focused on evidence-based skincare, laser therapy, and chronic skin conditions. Trained at AIIMS with international fellowships in aesthetic dermatology.",
  }),
  make({
    id: "d3",
    name: "Dr. Rohan Mehta",
    qualification: "MBBS, MS (Orthopaedics)",
    specialization: "Orthopedic Surgeon",
    hospital: "Manipal Hospital",
    experience: 18,
    rating: 4.9,
    reviews: 502,
    fee: 900,
    availableToday: false,
    languages: ["English", "Hindi", "Gujarati"],
    hours: "Tue–Sun · 9:00 AM – 5:00 PM",
    about:
      "Specialist in joint replacement, sports injuries, and minimally invasive arthroscopic surgery. Has performed over 4000 procedures with industry-leading outcomes.",
  }),
  make({
    id: "d4",
    name: "Dr. Ananya Verma",
    qualification: "MBBS, DCH, MD (Paediatrics)",
    specialization: "Pediatrician",
    hospital: "Rainbow Children's Hospital",
    experience: 11,
    rating: 4.9,
    reviews: 421,
    fee: 600,
    availableToday: true,
    languages: ["English", "Hindi", "Bengali"],
    hours: "Mon–Sat · 10:00 AM – 8:00 PM",
    about:
      "Compassionate pediatric consultant focused on newborn care, developmental milestones, vaccinations, and adolescent health. Trusted by 5000+ families.",
  }),
  make({
    id: "d5",
    name: "Dr. Karan Singh",
    qualification: "MBBS, MD (Neurology), DM",
    specialization: "Neurologist",
    hospital: "Max Super Speciality",
    experience: 16,
    rating: 4.8,
    reviews: 287,
    fee: 1100,
    availableToday: true,
    languages: ["English", "Hindi", "Punjabi"],
    hours: "Mon–Fri · 9:30 AM – 4:30 PM",
    about:
      "Consultant neurologist treating epilepsy, stroke, migraine, and movement disorders. Active in clinical research with several peer-reviewed publications.",
  }),
  make({
    id: "d6",
    name: "Dr. Neha Kapoor",
    qualification: "MBBS, MD (Obstetrics & Gynecology)",
    specialization: "Gynecologist",
    hospital: "Cloudnine Hospital",
    experience: 12,
    rating: 4.9,
    reviews: 366,
    fee: 750,
    availableToday: false,
    languages: ["English", "Hindi"],
    hours: "Mon–Sat · 10:00 AM – 6:00 PM",
    about:
      "Expert in high-risk pregnancy management, infertility evaluation, and minimally invasive gynecologic surgery. Known for empathetic, patient-first care.",
  }),
  make({
    id: "d7",
    name: "Dr. Vikram Joshi",
    qualification: "MBBS, MD (General Medicine)",
    specialization: "General Physician",
    hospital: "Columbia Asia",
    experience: 8,
    rating: 4.7,
    reviews: 192,
    fee: 450,
    availableToday: true,
    languages: ["English", "Hindi", "Marathi"],
    hours: "Mon–Sun · 9:00 AM – 9:00 PM",
    about:
      "Family medicine consultant treating common acute and chronic illnesses including diabetes, hypertension, infections, and lifestyle disorders.",
  }),
  make({
    id: "d8",
    name: "Dr. Sneha Reddy",
    qualification: "MBBS, MS (ENT)",
    specialization: "ENT Specialist",
    hospital: "AIIMS",
    experience: 10,
    rating: 4.8,
    reviews: 211,
    fee: 700,
    availableToday: true,
    languages: ["English", "Telugu", "Hindi"],
    hours: "Mon–Sat · 10:00 AM – 5:00 PM",
    about:
      "ENT consultant specializing in sinus surgery, hearing disorders, voice clinics, and pediatric otolaryngology.",
  }),
  make({
    id: "d9",
    name: "Dr. Arjun Nair",
    qualification: "MBBS, MD (Psychiatry)",
    specialization: "Psychiatrist",
    hospital: "NIMHANS",
    experience: 13,
    rating: 4.9,
    reviews: 274,
    fee: 950,
    availableToday: false,
    languages: ["English", "Malayalam", "Hindi"],
    hours: "Tue–Sat · 11:00 AM – 7:00 PM",
    about:
      "Consultant psychiatrist providing therapy and medication management for anxiety, depression, sleep disorders, and adult ADHD with a confidential, judgement-free approach.",
  }),
];

export const SPECIALIZATIONS = [
  "Cardiologist",
  "Dermatologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Neurologist",
  "Gynecologist",
  "General Physician",
  "ENT Specialist",
  "Psychiatrist",
];

export const SPECIALITY_TILES = [
  { name: "Cardiology", desc: "Heart care" },
  { name: "Dermatology", desc: "Skin & hair" },
  { name: "Orthopaedics", desc: "Bones & joints" },
  { name: "Paediatrics", desc: "Child care" },
  { name: "Neurology", desc: "Brain & nerves" },
  { name: "Gynaecology", desc: "Women's health" },
];

export function getDoctor(id: string) {
  return DOCTORS.find((d) => d.id === id);
}