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
              track visits, and manage from one simple dashboard.
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
              <li><Link to="/register">Get Started</Link></li>
            </ul>
          </div>


          <div className="footer-col">
            <h4>Github</h4>
            <ul>
              <a href="#" aria-label="Github"></a>
            </ul>
          </div>
        </div>
        <div className="footer-bottom"></div>
      </div>
    </footer>
  );
}