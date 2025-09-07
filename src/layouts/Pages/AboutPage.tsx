import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-5">About Manifesto Watch</h1>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h3 className="mb-4">Our Mission</h3>
              <p className="lead">
                Manifesto Watch is dedicated to promoting transparency and accountability in Indian politics 
                by tracking and analyzing political manifestos and their implementation.
              </p>
              
              <h3 className="mb-4 mt-5">What We Do</h3>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="d-flex">
                    <i className="fas fa-search fa-2x text-primary me-3 mt-2"></i>
                    <div>
                      <h5>Track Promises</h5>
                      <p>We monitor and document promises made by political parties in their manifestos.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex">
                    <i className="fas fa-chart-line fa-2x text-primary me-3 mt-2"></i>
                    <div>
                      <h5>Measure Progress</h5>
                      <p>We track the implementation status of manifesto promises and commitments.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex">
                    <i className="fas fa-balance-scale fa-2x text-primary me-3 mt-2"></i>
                    <div>
                      <h5>Compare Manifestos</h5>
                      <p>We provide tools to compare promises across different political parties.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex">
                    <i className="fas fa-users fa-2x text-primary me-3 mt-2"></i>
                    <div>
                      <h5>Engage Citizens</h5>
                      <p>We empower citizens with information to make informed electoral choices.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="mb-4 mt-5">Our Values</h3>
              <ul className="list-unstyled">
                <li className="mb-2"><i className="fas fa-check text-primary me-2"></i> Non-partisan and objective analysis</li>
                <li className="mb-2"><i className="fas fa-check text-primary me-2"></i> Transparent methodology and data sources</li>
                <li className="mb-2"><i className="fas fa-check text-primary me-2"></i> Commitment to factual accuracy</li>
                <li className="mb-2"><i className="fas fa-check text-primary me-2"></i> Open access to information</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};