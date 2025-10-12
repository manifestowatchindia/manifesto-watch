import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../Images/PublicImages/logo.png'

export const Footer: React.FC = () => {
  return (
    <footer className="footer main-color py-5">
      <div className="container">
        {/* Main Footer Content */}
        <div className="row g-4">
          {/* About Section */}
          <div className="col-lg-3 col-md-6">
            <div className="mb-3">
              <img src={logo} alt="Manifesto Watch Logo" style={{ height: '50px', width: 'auto' }} />
            </div>
            <p className="text-white-50 small">
              Manifesto Watch is India's premier platform for tracking political promises and government accountability. 
              We provide comprehensive analysis of election manifestos and real-time progress tracking.
            </p>
            <div className="d-flex gap-2 mt-3">
              <a href="#" className="footer-icon" aria-label="X">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="#" className="footer-icon" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="footer-icon" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="footer-icon" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="footer-icon" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/manifestos/central" className="footer-link">Central Manifestos</a></li>
              <li><a href="/manifestos/states" className="footer-link">State Manifestos</a></li>
              <li><a href="/tracking" className="footer-link">Promise Tracking</a></li>
              <li><a href="/news" className="footer-link">News Updates</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3">Resources</h5>
            <ul className="footer-links list-unstyled">
              <li><a href="/political-landscape" className="footer-link">Political Landscape</a></li>
              <li><a href="/interactive-map" className="footer-link">Interactive Map</a></li>
              <li><a href="/government-dashboard" className="footer-link">Dashboard</a></li>
              <li><a href="/upcoming-elections" className="footer-link">Upcoming Elections</a></li>
              <li><a href="/election-calendar" className="footer-link">Election Calendar</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3">Support</h5>
            <ul className="footer-links list-unstyled">
              <li><a href="/contact" className="footer-link">Contact Us</a></li>
              <li><a href="/faq" className="footer-link">FAQ</a></li>
              <li><a href="/privacy-policy" className="footer-link">Privacy Policy</a></li>
              <li><a href="/terms" className="footer-link">Terms of Service</a></li>
              <li><a href="/disclaimer" className="footer-link">Disclaimer</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3">Get in Touch</h5>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2">
                <i className="fas fa-envelope me-2"></i>
                <a href="mailto:contact@manifestowatch.in" className="footer-link">contact@manifestowatch.in</a>
              </li>
              <li className="mb-2">
                <i className="fas fa-phone me-2"></i>
                <span>+91-XXXX-XXXXXX</span>
              </li>
              <li className="mb-3">
                <i className="fas fa-map-marker-alt me-2"></i>
                <span>New Delhi, India</span>
              </li>
            </ul>
            <div className="mt-3">
              <h6 className="text-white small mb-2">Subscribe to Updates</h6>
              <div className="input-group input-group-sm">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email"
                  aria-label="Email subscription"
                />
                <button className="btn btn-outline-light" type="button">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="row mt-4 pt-4 border-top border-secondary">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-white-50 small">
              &copy; {new Date().getFullYear()} Manifesto Watch. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 text-white-50 small">
              Made with <i className="fas fa-heart text-danger"></i> for a transparent India
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="mb-0 text-white-50" style={{ fontSize: '0.75rem' }}>
              Manifesto Watch is an independent platform. We are not affiliated with any political party. 
              All information is compiled from publicly available sources and verified to the best of our ability.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};