import React from 'react';
import { Link } from 'react-router-dom';
import { ExploreTopTopics } from '../Homepage/ExploreTopTopics';

export const HomePage: React.FC = () => {
  return (
    <div>
      <ExploreTopTopics />
      
      {/* Featured Manifestos Section */}
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">Featured Manifestos</h2>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card bg-dark text-white">
                  <div className="card-body">
                    <h5 className="card-title">BJP Manifesto 2024</h5>
                    <p className="card-text">Key promises and commitments from the Bharatiya Janata Party for the 2024 elections.</p>
                    <Link to="/manifestos" className="btn btn-primary">Read More</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card bg-dark text-white">
                  <div className="card-body">
                    <h5 className="card-title">Congress Manifesto 2024</h5>
                    <p className="card-text">Indian National Congress promises and policy positions for the upcoming elections.</p>
                    <Link to="/manifestos" className="btn btn-primary">Read More</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card bg-dark text-white">
                  <div className="card-body">
                    <h5 className="card-title">AAP Manifesto 2024</h5>
                    <p className="card-text">Aam Aadmi Party's vision and commitments for transparent governance.</p>
                    <Link to="/manifestos" className="btn btn-primary">Read More</Link>
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