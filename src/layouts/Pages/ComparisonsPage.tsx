import React from 'react';

export const ComparisonsPage: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-5">Manifesto Comparisons</h1>
          <p className="text-center text-muted mb-5">
            Compare promises and commitments across different political parties.
          </p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Compare by Topics</h5>
              <div className="row mt-4">
                <div className="col-md-3 mb-3">
                  <div className="card bg-secondary text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-briefcase fa-2x mb-2"></i>
                      <h6>Employment</h6>
                      <p className="small">Job creation promises</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-secondary text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-graduation-cap fa-2x mb-2"></i>
                      <h6>Education</h6>
                      <p className="small">Educational reforms</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-secondary text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-heartbeat fa-2x mb-2"></i>
                      <h6>Healthcare</h6>
                      <p className="small">Health system improvements</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-secondary text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-leaf fa-2x mb-2"></i>
                      <h6>Environment</h6>
                      <p className="small">Climate action plans</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};