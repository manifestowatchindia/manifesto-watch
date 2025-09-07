import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../Images/PublicImages/logo.png'

export const Footer: React.FC = () => {
  return (
    <footer className="footer main-color py-3">
      <div className="container-fluid">
        <div className="row align-items-center text-center text-md-start">
          {/* Logo */}
          <div className="col-12 col-md-3 mb-3 mb-md-0">
            <Link to="/">
              <img src={logo} alt="Manifesto Watch Logo" style={{ height: '50px', width: 'auto' }} />
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="d-flex justify-content-center">
              <a href="https://twitter.com/manifestowatch" className="footer-icon mx-2" aria-label="X" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://facebook.com/manifestowatch" className="footer-icon mx-2" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://youtube.com/manifestowatch" className="footer-icon mx-2" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://linkedin.com/company/manifestowatch" className="footer-icon mx-2" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://instagram.com/manifestowatch" className="footer-icon mx-2" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Links and Copyright */}
          <div className="col-12 col-md-3">
            <ul className="footer-links list-unstyled text-center text-md-start">
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
            <p className="mb-0">&copy; {new Date().getFullYear()} Manifesto Watch. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};