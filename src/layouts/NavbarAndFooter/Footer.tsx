import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../Images/PublicImages/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src={logo} alt="Manifesto Watch Logo" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Manifesto Watch is India's premier platform for tracking political promises and government accountability. 
              We provide comprehensive analysis of election manifestos and real-time progress tracking.
            </p>
            <div className="flex gap-3 mt-4">
              <a 
                href="https://twitter.com/manifestowatch" 
                className="w-9 h-9 flex items-center justify-center bg-primary-800 hover:bg-primary-700 text-white rounded-full transition-colors"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-x-twitter"></i>
              </a>
              <a 
                href="https://facebook.com/manifestowatch" 
                className="w-9 h-9 flex items-center justify-center bg-primary-800 hover:bg-primary-700 text-white rounded-full transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://youtube.com/@manifestowatch" 
                className="w-9 h-9 flex items-center justify-center bg-primary-800 hover:bg-primary-700 text-white rounded-full transition-colors"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a 
                href="https://linkedin.com/company/manifestowatch" 
                className="w-9 h-9 flex items-center justify-center bg-primary-800 hover:bg-primary-700 text-white rounded-full transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a 
                href="https://instagram.com/manifestowatch" 
                className="w-9 h-9 flex items-center justify-center bg-primary-800 hover:bg-primary-700 text-white rounded-full transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="/manifestos/central" className="text-gray-400 hover:text-white transition-colors text-sm">Central Manifestos</a></li>
              <li><a href="/manifestos/states" className="text-gray-400 hover:text-white transition-colors text-sm">State Manifestos</a></li>
              <li><a href="/tracking" className="text-gray-400 hover:text-white transition-colors text-sm">Promise Tracking</a></li>
              <li><a href="/news" className="text-gray-400 hover:text-white transition-colors text-sm">News Updates</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-white font-semibold mb-4">Resources</h5>
            <ul className="space-y-2">
              <li><a href="/political-landscape" className="text-gray-400 hover:text-white transition-colors text-sm">Political Landscape</a></li>
              <li><a href="/interactive-map" className="text-gray-400 hover:text-white transition-colors text-sm">Interactive Map</a></li>
              <li><a href="/government-dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">Dashboard</a></li>
              <li><a href="/upcoming-elections" className="text-gray-400 hover:text-white transition-colors text-sm">Upcoming Elections</a></li>
              <li><a href="/election-calendar" className="text-gray-400 hover:text-white transition-colors text-sm">Election Calendar</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-white font-semibold mb-4">Support</h5>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="/disclaimer" className="text-gray-400 hover:text-white transition-colors text-sm">Disclaimer</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-white font-semibold mb-4">Get in Touch</h5>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-2 text-gray-500"></i>
                <a href="mailto:contact@manifestowatch.in" className="hover:text-white transition-colors">
                  contact@manifestowatch.in
                </a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-2 text-gray-500"></i>
                <span>+91-XXXX-XXXXXX</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2 text-gray-500"></i>
                <span>New Delhi, India</span>
              </li>
            </ul>
            <div className="mt-6">
              <h6 className="text-white text-sm font-medium mb-3">Subscribe to Updates</h6>
              <div className="flex">
                <input 
                  type="email" 
                  className="flex-1 px-3 py-2 bg-primary-800 border border-primary-700 text-white text-sm rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-500"
                  placeholder="Your email"
                  aria-label="Email subscription"
                />
                <button 
                  className="px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-r-md transition-colors"
                  type="button"
                  aria-label="Subscribe"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Manifesto Watch. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Made with <i className="fas fa-heart text-red-500"></i> for a transparent India
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6">
          <p className="text-gray-500 text-xs text-center leading-relaxed">
            Manifesto Watch is an independent platform. We are not affiliated with any political party. 
            All information is compiled from publicly available sources and verified to the best of our ability.
          </p>
        </div>
      </div>
    </footer>
  );
};