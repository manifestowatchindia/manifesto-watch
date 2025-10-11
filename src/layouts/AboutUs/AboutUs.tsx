import React from 'react';
import SEO from '../../components/SEO';

export const AboutUs: React.FC = () => {
    return (
        <div className="about-us-page">
            <SEO 
                title="About Us - Manifesto Watch | Promoting Political Transparency in India"
                description="Learn about Manifesto Watch's mission to promote transparency and accountability in Indian politics by tracking manifestos and election promises."
                keywords="about manifesto watch, political transparency india, election accountability, manifesto tracking, political promises monitoring"
                canonicalUrl="https://www.manifestowatch.in/about"
            />
            {/* Hero Section */}
            <div className="about-hero-section">
                <div className="container py-5">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <h1 className="display-3 fw-bold text-white mb-4">About Manifesto Watch</h1>
                            <p className="lead text-white-50 mb-4">
                                Empowering citizens with transparency, accountability, and data-driven insights 
                                into political promises and their implementation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="container my-5 py-5">
                <div className="row g-4 mb-5">
                    <div className="col-md-6">
                        <div className="about-card h-100 p-5">
                            <div className="icon-box-large mb-4">
                                <i className="fas fa-bullseye text-warning fs-1"></i>
                            </div>
                            <h2 className="text-white mb-3">Our Mission</h2>
                            <p className="text-white-50 lead">
                                To create a transparent platform that tracks political manifestos and holds 
                                parties accountable for their promises, enabling informed democratic participation.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="about-card h-100 p-5">
                            <div className="icon-box-large mb-4">
                                <i className="fas fa-eye text-warning fs-1"></i>
                            </div>
                            <h2 className="text-white mb-3">Our Vision</h2>
                            <p className="text-white-50 lead">
                                A future where every citizen has access to comprehensive, unbiased information 
                                about political promises and their fulfillment, strengthening Indian democracy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* What We Do */}
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold text-white mb-3">What We Do</h2>
                    <p className="lead text-white-50 mb-5">
                        We provide comprehensive tools and data to track political accountability
                    </p>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-lg-4 col-md-6">
                        <div className="feature-card text-center p-4">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-book-open text-warning fs-2"></i>
                            </div>
                            <h4 className="text-white mb-3">Track Manifestos</h4>
                            <p className="text-white-50">
                                Comprehensive database of political manifestos from major parties across 
                                state and national elections.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="feature-card text-center p-4">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-balance-scale text-warning fs-2"></i>
                            </div>
                            <h4 className="text-white mb-3">Compare Promises</h4>
                            <p className="text-white-50">
                                Side-by-side comparison of promises made by different parties on key issues 
                                affecting citizens.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="feature-card text-center p-4">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-chart-line text-warning fs-2"></i>
                            </div>
                            <h4 className="text-white mb-3">Monitor Progress</h4>
                            <p className="text-white-50">
                                Track implementation status of promises with data-driven insights and 
                                timeline analysis.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="feature-card text-center p-4">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-search text-warning fs-2"></i>
                            </div>
                            <h4 className="text-white mb-3">Fact-Check Claims</h4>
                            <p className="text-white-50">
                                Verify political claims against actual implementation with credible sources 
                                and documentation.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="feature-card text-center p-4">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-database text-warning fs-2"></i>
                            </div>
                            <h4 className="text-white mb-3">Data & Analytics</h4>
                            <p className="text-white-50">
                                Comprehensive data visualization and analysis tools to understand election 
                                trends and patterns.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="feature-card text-center p-4">
                            <div className="feature-icon mb-3">
                                <i className="fas fa-users text-warning fs-2"></i>
                            </div>
                            <h4 className="text-white mb-3">Citizen Engagement</h4>
                            <p className="text-white-50">
                                Platform for citizens to report on ground reality and share feedback on 
                                promise implementation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why It Matters */}
                <div className="about-card p-5 mb-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <h2 className="display-6 fw-bold text-white mb-4">Why This Matters</h2>
                            <p className="text-white-50 mb-3">
                                In a thriving democracy, accountability is not just important—it's essential. 
                                Political parties make numerous promises during elections, but tracking their 
                                fulfillment has always been challenging for ordinary citizens.
                            </p>
                            <p className="text-white-50 mb-3">
                                Manifesto Watch bridges this gap by providing a centralized, unbiased platform 
                                where citizens can:
                            </p>
                            <ul className="text-white-50">
                                <li className="mb-2">Access complete manifesto documents</li>
                                <li className="mb-2">Track promise fulfillment in real-time</li>
                                <li className="mb-2">Compare parties based on their track records</li>
                                <li className="mb-2">Make informed voting decisions</li>
                                <li className="mb-2">Hold elected representatives accountable</li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <div className="stats-grid">
                                <div className="stat-item text-center p-4">
                                    <h3 className="text-warning display-4 fw-bold mb-2">8</h3>
                                    <p className="text-white-50">Upcoming Elections</p>
                                </div>
                                <div className="stat-item text-center p-4">
                                    <h3 className="text-warning display-4 fw-bold mb-2">28</h3>
                                    <p className="text-white-50">States Covered</p>
                                </div>
                                <div className="stat-item text-center p-4">
                                    <h3 className="text-warning display-4 fw-bold mb-2">100+</h3>
                                    <p className="text-white-50">Manifestos Tracked</p>
                                </div>
                                <div className="stat-item text-center p-4">
                                    <h3 className="text-warning display-4 fw-bold mb-2">1000+</h3>
                                    <p className="text-white-50">Promises Monitored</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Values */}
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold text-white mb-5">Our Core Values</h2>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-md-3">
                        <div className="value-card text-center p-4">
                            <div className="value-icon mb-3">
                                <i className="fas fa-handshake text-warning fs-1"></i>
                            </div>
                            <h5 className="text-white mb-2">Transparency</h5>
                            <p className="text-white-50 small">
                                Complete openness in data sources and methodology
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="value-card text-center p-4">
                            <div className="value-icon mb-3">
                                <i className="fas fa-balance-scale-right text-warning fs-1"></i>
                            </div>
                            <h5 className="text-white mb-2">Non-Partisan</h5>
                            <p className="text-white-50 small">
                                Unbiased coverage of all political parties
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="value-card text-center p-4">
                            <div className="value-icon mb-3">
                                <i className="fas fa-check-circle text-warning fs-1"></i>
                            </div>
                            <h5 className="text-white mb-2">Accuracy</h5>
                            <p className="text-white-50 small">
                                Verified data from credible sources
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="value-card text-center p-4">
                            <div className="value-icon mb-3">
                                <i className="fas fa-universal-access text-warning fs-1"></i>
                            </div>
                            <h5 className="text-white mb-2">Accessibility</h5>
                            <p className="text-white-50 small">
                                Free access for all citizens of India
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="cta-section text-center p-5">
                    <h2 className="text-white mb-3">Join Us in Strengthening Democracy</h2>
                    <p className="text-white-50 mb-4 lead">
                        Together, we can build a more transparent and accountable political system
                    </p>
                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <a href="/contact" className="btn btn-warning btn-lg px-5">
                            <i className="fas fa-envelope me-2"></i>
                            Get In Touch
                        </a>
                        <button className="btn btn-outline-light btn-lg px-5">
                            <i className="fas fa-heart me-2"></i>
                            Support Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};