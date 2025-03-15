import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: "#000 ", color: "#fff" }}>
      {/* Top Divider */}
      <hr style={{ borderTop: "1px solid #ccc", margin: 0 }} />

      <div className="container text-center py-4">
        <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", margin: 0 }}>
          Contact us:{" "}
          <a
            href="mailto:manifestowatchindia@gmail.com"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            manifestowatchindia@gmail.com
          </a>
        </p>
        <p style={{ fontFamily: "Times New Roman, serif", fontSize: "0.9rem", margin: 0, marginTop: "0.5rem" }}>
          &copy; {new Date().getFullYear()} Manifesto Watch. All rights reserved.
        </p>
      </div>

      {/* Bottom Divider */}
      <hr style={{ borderTop: "1px solid #ccc", margin: 0 }} />
    </footer>
  );
};

export default Footer;
