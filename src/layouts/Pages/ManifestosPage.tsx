import React from 'react';
import { Manifesto } from '../../types';

export const ManifestosPage: React.FC = () => {
  const manifestos: Manifesto[] = [
    {
      id: 'bjp-2024',
      party: 'Bharatiya Janata Party (BJP)',
      year: '2024',
      title: 'Sankalp Patra 2024',
      description: 'Modi ki Guarantee - Building a Viksit Bharat',
      status: 'Active',
      promises: 127
    },
    {
      id: 'congress-2024',
      party: 'Indian National Congress',
      year: '2024',
      title: 'Nyay Patra 2024',
      description: 'Justice for All - A Vision for India',
      status: 'Active',
      promises: 95
    },
    {
      id: 'aap-2024',
      party: 'Aam Aadmi Party (AAP)',
      year: '2024',
      title: 'Guarantee Card 2024',
      description: 'Delivering on Promises',
      status: 'Active',
      promises: 68
    }
  ];

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-5">Political Manifestos</h1>
          <p className="text-center text-muted mb-5">
            Explore manifestos from various political parties and track their promises and commitments.
          </p>
        </div>
      </div>
      
      <div className="row">
        {manifestos.map((manifesto) => (
          <div key={manifesto.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card bg-dark text-white h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{manifesto.party}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{manifesto.title}</h6>
                <p className="card-text flex-grow-1">{manifesto.description}</p>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary">{manifesto.year}</span>
                    <span className={`badge ${manifesto.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                      {manifesto.status}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{manifesto.promises} Promises</small>
                    <a href={`/manifestos/${manifesto.id}`} className="btn btn-primary btn-sm">
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};