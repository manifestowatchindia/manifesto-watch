import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, simply alert the user. Later, integrate with an API.
    alert("Thank you! Your message has been sent.");
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "700px",
        margin: "auto",
        padding: "40px 0",
        fontFamily: "Georgia, serif",
        color: "#000"
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "20px" }}>
        Contact Us
      </h2>
      <p
        style={{
          textAlign: "center",
          fontFamily: "Times New Roman, serif",
          fontSize: "1rem",
          marginBottom: "40px"
        }}
      >
        We’d love to hear from you. Please fill out the form below to get in touch.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label style={{ fontWeight: "bold" }}>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your Name"
            onChange={handleChange}
            required
            style={{ fontFamily: "Georgia, serif" }}
          />
        </div>
        <div className="mb-3">
          <label style={{ fontWeight: "bold" }}>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Your Email"
            onChange={handleChange}
            required
            style={{ fontFamily: "Georgia, serif" }}
          />
        </div>
        <div className="mb-3">
          <label style={{ fontWeight: "bold" }}>Subject</label>
          <input
            type="text"
            name="subject"
            className="form-control"
            placeholder="Subject"
            onChange={handleChange}
            required
            style={{ fontFamily: "Georgia, serif" }}
          />
        </div>
        <div className="mb-3">
          <label style={{ fontWeight: "bold" }}>Message</label>
          <textarea
            name="message"
            className="form-control"
            rows={5}
            placeholder="Your Message"
            onChange={handleChange}
            required
            style={{ fontFamily: "Georgia, serif" }}
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-dark"
            style={{ fontFamily: "Georgia, serif", padding: "10px 30px" }}
          >
            Send Message
          </button>
        </div>
      </form>

      {/* Social Media Links Section */}
      <div className="text-center mt-4">
        <h5 style={{ fontFamily: "Georgia, serif" }}>Follow Us</h5>
        <p>
          <a
            href="https://www.youtube.com/ManifestoWatchIndia"
            target="_blank"
            rel="noreferrer"
            className="text-dark text-decoration-none me-3"
            style={{ fontFamily: "Georgia, serif" }}
          >
            YouTube
          </a>
          <a
            href="https://www.linkedin.com/company/manifesto-watch"
            target="_blank"
            rel="noreferrer"
            className="text-dark text-decoration-none me-3"
            style={{ fontFamily: "Georgia, serif" }}
          >
            LinkedIn
          </a>
          <a
            href="https://www.facebook.com/ManifestoWatch"
            target="_blank"
            rel="noreferrer"
            className="text-dark text-decoration-none me-3"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Facebook
          </a>
          <a
            href="https://x.com/imanifestowatch"
            target="_blank"
            rel="noreferrer"
            className="text-dark text-decoration-none me-3"
            style={{ fontFamily: "Georgia, serif" }}
          >
            X
          </a>
          <a
            href="https://www.instagram.com/ManifestoWatch"
            target="_blank"
            rel="noreferrer"
            className="text-dark text-decoration-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Instagram
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
