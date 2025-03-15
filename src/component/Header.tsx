import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand text-primary" href="/">
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
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/manifestos">
                Manifestos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/progress">
                Progress Updates
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/news">
                Latest News
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/fact-check">
                Fact Check
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
          </ul>
          <a href="/track" className="btn btn-primary ms-3">
            Track Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
