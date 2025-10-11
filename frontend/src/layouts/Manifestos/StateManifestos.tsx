import React from 'react';
import SEO from '../../components/SEO';
import './Manifestos.css';

export const StateManifestos: React.FC = () => {
    return (
        <>
            <SEO 
                title="State and Union Territory Manifestos | Manifesto Watch"
                description="Access election manifestos from political parties for State Legislative Assembly and Union Territory elections across India."
                canonicalUrl="https://www.manifestowatch.in/manifestos/states"
            />
            
            <div className="manifestos-page">
                {/* Hero Section */}
                <div className="manifestos-hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto text-center">
                                <h1 className="display-4 fw-bold text-white mb-3">
                                    State & Union Territory Manifestos
                                </h1>
                                <p className="lead text-white-50 mb-4">
                                    Access election manifestos from political parties contesting State Legislative Assembly and Union Territory elections
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coming Soon Section */}
                <div className="manifestos-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <div className="coming-soon-card text-center p-5">
                                    <div className="mb-4">
                                        <i className="bi bi-file-earmark-text" style={{ fontSize: '4rem', color: 'var(--accent-color)' }}></i>
                                    </div>
                                    <h2 className="text-white mb-3">Coming Soon!</h2>
                                    <p className="text-white-50 mb-4">
                                        We are working on adding manifestos from all 28 states and 8 union territories. 
                                        This section will include manifestos from recent state assembly elections.
                                    </p>
                                    <div className="row g-3 text-start mt-4">
                                        <div className="col-md-6">
                                            <h5 className="text-warning mb-3">
                                                <i className="bi bi-check-circle me-2"></i>
                                                What's Coming
                                            </h5>
                                            <ul className="text-white-50">
                                                <li>28 State manifestos</li>
                                                <li>8 Union Territory manifestos</li>
                                                <li>Major political parties</li>
                                                <li>Historical manifestos</li>
                                                <li>Regional party manifestos</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="text-warning mb-3">
                                                <i className="bi bi-list-check me-2"></i>
                                                Features
                                            </h5>
                                            <ul className="text-white-50">
                                                <li>Filter by state/UT</li>
                                                <li>Filter by political party</li>
                                                <li>Search functionality</li>
                                                <li>Download manifestos</li>
                                                <li>Key highlights</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <a href="/" className="btn btn-warning btn-lg">
                                            <i className="bi bi-house-door me-2"></i>
                                            Back to Home
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
