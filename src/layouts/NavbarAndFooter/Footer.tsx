import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../Images/PublicImages/logo.png'

export const Footer: React.FC = () => {
  return (
    <footer className="footer main-color py-3">
      <div className="container-fluid">
        <div className="row align-items-center text-center text-md-start">
          {/* Logo */}
          <div className="col-12 col-md-3 mb-3 mb-md-0">
            <a href="#">
              <img src={logo} alt="Manifesto Watch Logo" style={{ height: '50px', width: 'auto' }} />
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="d-flex justify-content-center">
              <a href="#" className="footer-icon mx-2" aria-label="X">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="#" className="footer-icon mx-2" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="footer-icon mx-2" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="footer-icon mx-2" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="footer-icon mx-2" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Links and Copyright */}
          <div className="col-12 col-md-3">
            <ul className="footer-links list-unstyled text-center text-md-start">
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
            </ul>
            <p className="mb-0">&copy; {new Date().getFullYear()} Manifesto Watch. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};