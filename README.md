# MediCare (Medinova Connect)

A modern, full-stack healthcare application built on the **MERN** stack (MongoDB, Express, React, Node.js) designed to seamlessly connect patients and doctors.

## 🚀 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, TanStack Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Tooling:** Concurrently (to run both frontend and backend seamlessly)

## ✨ Features

- **Role-Based Authentication (RBAC):** Strict security roles for `Admin`, `Doctor`, and `Patient`.
- **System Administrator:** Private, secure `/admin-dashboard` to exclusively create and provision new Doctor accounts.
- **Patient Dashboard:** Patients can view their personal profiles and track upcoming and past appointments.
- **Doctor Dashboard:** Doctors get a dedicated workspace to view their daily schedule, track patient lists, and edit their practice profile.
- **Appointment Booking:** Seamless UI flow for patients to select dates, choose time slots, and book appointments with specific doctors.
- **Dynamic State:** The UI reacts to user input. Appointments populate on dashboards only when actively booked, and doctor profiles update instantly upon editing.

## 🛡️ Security & Libraries Used

This project implements modern web security and architecture standards:

### Backend Libraries
- **`bcryptjs`**: Used to securely hash user passwords before storing them in MongoDB. Passwords are never stored in plain text.
- **`jsonwebtoken` (JWT)**: Used for stateless authentication. Upon login, the server issues a digitally signed token.
- **`mongoose`**: An Object Data Modeling (ODM) library for MongoDB that enforces a strict schema (e.g., ensuring `email` is uniquely constrained).
- **`cors`**: Middleware to enable Cross-Origin Resource Sharing, ensuring the Vite frontend can securely talk to the Express API.
- **`dotenv`**: Manages environment variables so secrets (like MongoDB URI and JWT Keys) are never hardcoded in the source code.

### Frontend Libraries
- **`React 19` & `Vite`**: For blazing fast rendering and hot-module replacement during development.
- **`@tanstack/react-router`**: Type-safe, file-based routing. Allows features like "Protected Routes" (checking `localStorage` tokens before granting access to `/admin-dashboard`).
- **`Tailwind CSS`**: Utility-first CSS framework for rapid, responsive UI design without leaving the HTML.
- **`react-icons`**: Extensive icon library used for modern UI flourishes across the dashboards.

## 📦 Getting Started

### Prerequisites
Make sure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/) (v20+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally, or a MongoDB Atlas cloud URI)

### 1. Clone & Install
Clone this repository and install all dependencies (this installs packages for both the Vite frontend and the Express backend).
```bash
git clone https://github.com/Er-ine/medinova-connect.git
cd medinova-connect
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory and configure your MongoDB connection string and JWT secret:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medinova
JWT_SECRET=your_jwt_key
```
*(If you are using MongoDB Atlas, replace the `MONGO_URI` with your cloud connection string).*

### 3. Run the Application
Start both the React frontend and the Express backend concurrently with a single command:
```bash
npm run dev
```

- **Frontend** will run on `http://localhost:8080` (or the port specified by Vite in your terminal)
- **Backend API** will run on `http://localhost:5000`

## 📂 Project Structure

```text
medinova-connect/
├── backend/              # Express backend source code
│   ├── models/           # Mongoose schemas (User.js)
│   ├── routes/           # API Endpoints (auth.js)
│   └── server.js         # Backend entry point
├── src/                  # React frontend source code
│   ├── components/       # Reusable UI components (Sidebar, Cards, etc.)
│   ├── data/             # Mock data (Doctors list, schedule)
│   ├── routes/           # TanStack router page components
│   └── styles/           # Tailwind and global CSS
├── .env                  # Environment variables (Ignored in Git)
├── package.json          # Project dependencies & scripts
└── vite.config.ts        # Vite build configuration
```
