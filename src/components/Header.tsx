import React from "react";

const Header: React.FC = () => {
  return (
    <header style={{ backgroundColor: "#fff", color: "#000" }}>
      {/* Masthead Section */}
      <div className="container text-center py-4">
        <h1 style={{ 
          fontFamily: "Georgia, serif", 
          fontSize: "2.5rem", 
          margin: 0 
        }}>
          Manifesto Watch
        </h1>
        <p style={{ 
          fontFamily: "Times New Roman, serif", 
          fontSize: "1rem", 
          fontStyle: "italic", 
          margin: 0 
        }}>
          From Promises to Progress
        </p>
      </div>

      {/* Horizontal Rule */}
      <hr style={{ borderTop: "1px solid #ccc", margin: 0 }} />

      {/* Navigation Bar */}
      <nav className="bg-white">
        <div className="container">
          <ul className="nav justify-content-center py-2 mb-0">
            <li className="nav-item">
              <a className="nav-link text-dark" href="/" style={{ fontFamily: "Georgia, serif" }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/manifestos" style={{ fontFamily: "Georgia, serif" }}>
                Manifestos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/progress" style={{ fontFamily: "Georgia, serif" }}>
                Progress Updates
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/news" style={{ fontFamily: "Georgia, serif" }}>
                Latest News
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/contact" style={{ fontFamily: "Georgia, serif" }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <hr style={{ borderTop: "1px solid #ccc", margin: 0 }} />
    </header>
  );
};

export default Header;
