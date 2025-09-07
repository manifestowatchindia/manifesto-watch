import React from 'react';

export const ContactPage: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-5">Contact Us</h1>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h3 className="mb-4">Get in Touch</h3>
              <p className="mb-4">
                Have questions, suggestions, or want to contribute to our mission? We'd love to hear from you.
              </p>
              
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h5><i className="fas fa-envelope text-primary me-2"></i>Email</h5>
                  <p>info@manifestowatch.org</p>
                  
                  <h5 className="mt-4"><i className="fas fa-phone text-primary me-2"></i>Phone</h5>
                  <p>+91 98765 43210</p>
                  
                  <h5 className="mt-4"><i className="fas fa-map-marker-alt text-primary me-2"></i>Address</h5>
                  <p>
                    Manifesto Watch India<br />
                    New Delhi, India
                  </p>
                </div>
                
                <div className="col-md-6">
                  <h5>Follow Us</h5>
                  <div className="d-flex flex-column">
                    <a href="https://twitter.com/manifestowatch" className="text-white text-decoration-none mb-2" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter text-primary me-2"></i> Twitter
                    </a>
                    <a href="https://facebook.com/manifestowatch" className="text-white text-decoration-none mb-2" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook text-primary me-2"></i> Facebook
                    </a>
                    <a href="https://linkedin.com/company/manifestowatch" className="text-white text-decoration-none mb-2" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin text-primary me-2"></i> LinkedIn
                    </a>
                    <a href="https://youtube.com/manifestowatch" className="text-white text-decoration-none mb-2" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-youtube text-primary me-2"></i> YouTube
                    </a>
                  </div>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <h5 className="mb-3">Send us a Message</h5>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control bg-secondary text-white border-0" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control bg-secondary text-white border-0" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input type="text" className="form-control bg-secondary text-white border-0" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea className="form-control bg-secondary text-white border-0" rows={5}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};