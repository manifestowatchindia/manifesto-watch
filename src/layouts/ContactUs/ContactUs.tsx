import React, { useState } from 'react';

export const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 3000);
    };

    return (
        <div className="container my-5 py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    {/* Header Section */}
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-bold text-white mb-3">Contact Us</h1>
                        <p className="lead text-white-50">
                            Have questions or suggestions? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="row g-4">
                        {/* Contact Information */}
                        <div className="col-lg-4">
                            <div className="contact-info-card p-4 h-100">
                                <h3 className="text-white mb-4">Get In Touch</h3>
                                
                                <div className="contact-item mb-4">
                                    <div className="d-flex align-items-start">
                                        <div className="icon-box me-3">
                                            <i className="fas fa-envelope text-warning fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="text-white mb-1">Email</h5>
                                            <a href="mailto:contact@manifestowatch.in" className="text-white-50 text-decoration-none">
                                                contact@manifestowatch.in
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-item mb-4">
                                    <div className="d-flex align-items-start">
                                        <div className="icon-box me-3">
                                            <i className="fas fa-map-marker-alt text-warning fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="text-white mb-1">Location</h5>
                                            <p className="text-white-50 mb-0">
                                                India
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-item mb-4">
                                    <div className="d-flex align-items-start">
                                        <div className="icon-box me-3">
                                            <i className="fas fa-clock text-warning fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="text-white mb-1">Response Time</h5>
                                            <p className="text-white-50 mb-0">
                                                Within 24-48 hours
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="mt-5">
                                    <h5 className="text-white mb-3">Follow Us</h5>
                                    <div className="d-flex gap-3">
                                        <a href="#" className="social-icon">
                                            <i className="fab fa-twitter fs-5"></i>
                                        </a>
                                        <a href="#" className="social-icon">
                                            <i className="fab fa-facebook fs-5"></i>
                                        </a>
                                        <a href="#" className="social-icon">
                                            <i className="fab fa-instagram fs-5"></i>
                                        </a>
                                        <a href="#" className="social-icon">
                                            <i className="fab fa-linkedin fs-5"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="col-lg-8">
                            <div className="contact-form-card p-4">
                                <h3 className="text-white mb-4">Send us a Message</h3>
                                
                                {submitted && (
                                    <div className="alert alert-success" role="alert">
                                        <i className="fas fa-check-circle me-2"></i>
                                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="name" className="form-label text-white">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control contact-input"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your name"
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="email" className="form-label text-white">
                                                Your Email *
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control contact-input"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your email"
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="subject" className="form-label text-white">
                                                Subject *
                                            </label>
                                            <select
                                                className="form-select contact-input"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="manifesto">Manifesto Information</option>
                                                <option value="data">Data Request</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="report">Report an Issue</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="message" className="form-label text-white">
                                                Your Message *
                                            </label>
                                            <textarea
                                                className="form-control contact-input"
                                                id="message"
                                                name="message"
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                placeholder="Type your message here..."
                                            ></textarea>
                                        </div>

                                        <div className="col-12">
                                            <button type="submit" className="btn btn-warning btn-lg px-5">
                                                <i className="fas fa-paper-plane me-2"></i>
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-5 p-4 bg-dark rounded">
                        <div className="row text-center">
                            <div className="col-md-4 mb-3 mb-md-0">
                                <i className="fas fa-shield-alt text-warning fs-2 mb-3"></i>
                                <h5 className="text-white">Your Privacy Matters</h5>
                                <p className="text-white-50 small">
                                    We respect your privacy and will never share your information
                                </p>
                            </div>
                            <div className="col-md-4 mb-3 mb-md-0">
                                <i className="fas fa-headset text-warning fs-2 mb-3"></i>
                                <h5 className="text-white">Dedicated Support</h5>
                                <p className="text-white-50 small">
                                    Our team is here to help with any questions or concerns
                                </p>
                            </div>
                            <div className="col-md-4">
                                <i className="fas fa-comments text-warning fs-2 mb-3"></i>
                                <h5 className="text-white">Open Communication</h5>
                                <p className="text-white-50 small">
                                    We value your feedback and suggestions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};