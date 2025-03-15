import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow" style={{ backgroundColor: '#1051ab' }}>
      <div className="container">
        {/* Logo */}
        <a 
          className="navbar-brand" 
          href="/" 
          style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.75rem' }}
        >
          Manifesto Watch
        </a>

        {/* Navbar Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span 
            className="navbar-toggler-icon" 
            style={{ filter: 'invert(1)' }}  // Invert color for visibility on dark background
          ></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/" style={{ color: '#ffffff' }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/manifestos" style={{ color: '#ffffff' }}>
                Manifestos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/progress" style={{ color: '#ffffff' }}>
                Progress Updates
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/news" style={{ color: '#ffffff' }}>
                Latest News
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/fact-check" style={{ color: '#ffffff' }}>
                Fact Check
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact" style={{ color: '#ffffff' }}>
                Contact
              </a>
            </li>
          </ul>
          <a 
            href="/track" 
            className="btn ms-3" 
            style={{ backgroundColor: '#ffffff', color: '#1051ab' }}
          >
            Track Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
