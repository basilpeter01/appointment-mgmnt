import { Link } from "@tanstack/react-router";
import { FaHeartbeat, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="footer-root">
      <div className="med-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-brand">
              <span className="nav-brand-mark"><FaHeartbeat /></span>
              <span>Medi<b>Care</b></span>
            </div>
            <p>
              Smarter healthcare scheduling for patients and doctors. Book appointments,
              track visits, and manage care from one beautifully simple dashboard.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link to="/doctors">Find Doctors</Link></li>
              <li><Link to="/patient-dashboard">Patient Portal</Link></li>
              <li><Link to="/doctor-dashboard">Doctor Portal</Link></li>
              <li><Link to="/register">Get Started</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li className="row"><FiMapPin /><span>500 Medical Ave, Mumbai, India</span></li>
              <li className="row"><FiPhone /><span>+91 800 123 4567</span></li>
              <li className="row"><FiMail /><span>care@medicare.app</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} MediCare. All rights reserved.</div>
      </div>
    </footer>
  );
}