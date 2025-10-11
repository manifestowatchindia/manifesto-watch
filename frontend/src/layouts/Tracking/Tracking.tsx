import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { GovernmentDashboard } from '../GovernmentDashboard/GovernmentDashboard';
import './Tracking.css';

export const Tracking: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'central' | 'states'>('central');

    return (
        <div className="tracking-page">
            <SEO 
                title="Government Tracking | Central & State Progress Monitoring | Manifesto Watch"
                description="Track government promises and progress at both central and state levels. Monitor completion status, view latest updates, and analyze performance across India's political landscape."
                keywords="government tracking, promise tracker, central government, state governments, accountability, progress monitoring, manifesto tracking, india governance"
                canonicalUrl="https://www.manifestowatch.in/tracking"
            />

            {/* Header Section */}
            <div className="tracking-header-container">
                <div className="container-fluid">
                    <div className="tracking-header">
                        <div className="tracking-header-content">
                            <h1 className="tracking-main-title">
                                <i className="fas fa-tasks me-3"></i>
                                Government Promise Tracking
                            </h1>
                            <p className="tracking-main-subtitle">
                                Monitor government commitments, track progress, and stay informed about the latest developments
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="tabs-container">
                <div className="container-fluid">
                    <div className="tabs-navigation">
                        <button 
                            className={`tab-button ${activeTab === 'central' ? 'active' : ''}`}
                            onClick={() => setActiveTab('central')}
                        >
                            <i className="fas fa-landmark me-2"></i>
                            <span className="tab-label">Central Government</span>
                            <span className="tab-description">National Level Tracking</span>
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'states' ? 'active' : ''}`}
                            onClick={() => setActiveTab('states')}
                        >
                            <i className="fas fa-map-marked-alt me-2"></i>
                            <span className="tab-label">States & UTs</span>
                            <span className="tab-description">Legislative Assemblies</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="tab-content-container">
                {activeTab === 'central' && (
                    <div className="tab-content active">
                        <GovernmentDashboard />
                    </div>
                )}

                {activeTab === 'states' && (
                    <div className="tab-content active">
                        <div className="states-dashboard-placeholder">
                            <div className="container-fluid">
                                <div className="placeholder-content">
                                    <div className="placeholder-icon">
                                        <i className="fas fa-map-marked-alt"></i>
                                    </div>
                                    <h2 className="placeholder-title">
                                        State & UT Dashboards Coming Soon
                                    </h2>
                                    <p className="placeholder-description">
                                        We're building comprehensive tracking dashboards for all 28 states and 8 Union Territories. 
                                        Each dashboard will provide detailed promise tracking, progress monitoring, and latest updates 
                                        for individual state governments.
                                    </p>
                                    
                                    <div className="placeholder-features">
                                        <h4 className="features-title">What to Expect:</h4>
                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <div className="feature-card">
                                                    <i className="fas fa-chart-line feature-icon"></i>
                                                    <h5>State-wise Progress</h5>
                                                    <p>Track promises and completion status for each state government</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <div className="feature-card">
                                                    <i className="fas fa-newspaper feature-icon"></i>
                                                    <h5>Latest Updates</h5>
                                                    <p>Stay informed about recent developments in your state</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <div className="feature-card">
                                                    <i className="fas fa-balance-scale feature-icon"></i>
                                                    <h5>Comparative Analysis</h5>
                                                    <p>Compare performance across states and identify best practices</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="states-grid-preview">
                                        <h4 className="preview-title">States & UTs Covered:</h4>
                                        <div className="states-grid">
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Andhra Pradesh
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Arunachal Pradesh
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Assam
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Bihar
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Chhattisgarh
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Goa
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Gujarat
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Haryana
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Himachal Pradesh
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Jharkhand
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Karnataka
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Kerala
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Madhya Pradesh
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Maharashtra
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Manipur
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Meghalaya
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Mizoram
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Nagaland
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Odisha
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Punjab
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Rajasthan
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Sikkim
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Tamil Nadu
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Telangana
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Tripura
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Uttar Pradesh
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Uttarakhand
                                            </div>
                                            <div className="state-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                West Bengal
                                            </div>
                                            <div className="state-item ut-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Delhi (NCT)
                                            </div>
                                            <div className="state-item ut-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Puducherry
                                            </div>
                                            <div className="state-item ut-item">
                                                <i className="fas fa-circle-notch fa-spin me-2"></i>
                                                Jammu & Kashmir
                                            </div>
                                        </div>
                                    </div>

                                    <div className="placeholder-cta">
                                        <p className="cta-text">
                                            <i className="fas fa-bell me-2"></i>
                                            Want to be notified when state dashboards launch?
                                        </p>
                                        <a href="/contact" className="btn btn-warning btn-lg">
                                            <i className="fas fa-envelope me-2"></i>
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
