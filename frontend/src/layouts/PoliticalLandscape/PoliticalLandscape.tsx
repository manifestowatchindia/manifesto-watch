import React, { useState } from 'react';
import SEO from '../../components/SEO';

interface StateGovernment {
    state: string;
    rulingParty: string;
    chiefMinister: string;
    termStart: string;
    termEnd: string;
    majorityType: 'Simple Majority' | 'Coalition' | 'President\'s Rule';
    partyColor: string;
}

export const PoliticalLandscape: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterParty, setFilterParty] = useState<string>('all');

    // Current state governments data (as of 2025)
    const stateGovernments: StateGovernment[] = [
        {
            state: 'Andhra Pradesh',
            rulingParty: 'Telugu Desam Party',
            chiefMinister: 'N. Chandrababu Naidu',
            termStart: 'June 2024',
            termEnd: 'June 2029',
            majorityType: 'Coalition',
            partyColor: '#FFEB3B'
        },
        {
            state: 'Arunachal Pradesh',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Pema Khandu',
            termStart: 'June 2024',
            termEnd: 'June 2029',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Assam',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Himanta Biswa Sarma',
            termStart: 'May 2021',
            termEnd: 'March 2026',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Bihar',
            rulingParty: 'National Democratic Alliance',
            chiefMinister: 'Nitish Kumar',
            termStart: 'November 2020',
            termEnd: 'November 2025',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Chhattisgarh',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Vishnu Deo Sai',
            termStart: 'December 2023',
            termEnd: 'December 2028',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Goa',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Pramod Sawant',
            termStart: 'March 2022',
            termEnd: 'February 2027',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Gujarat',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Bhupendra Patel',
            termStart: 'December 2022',
            termEnd: 'December 2027',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Haryana',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Nayab Singh Saini',
            termStart: 'October 2024',
            termEnd: 'October 2029',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Himachal Pradesh',
            rulingParty: 'Indian National Congress',
            chiefMinister: 'Sukhvinder Singh Sukhu',
            termStart: 'December 2022',
            termEnd: 'December 2027',
            majorityType: 'Simple Majority',
            partyColor: '#19AAED'
        },
        {
            state: 'Jharkhand',
            rulingParty: 'Jharkhand Mukti Morcha',
            chiefMinister: 'Hemant Soren',
            termStart: 'December 2019',
            termEnd: 'November 2024',
            majorityType: 'Coalition',
            partyColor: '#2E7D32'
        },
        {
            state: 'Karnataka',
            rulingParty: 'Indian National Congress',
            chiefMinister: 'Siddaramaiah',
            termStart: 'May 2023',
            termEnd: 'May 2028',
            majorityType: 'Simple Majority',
            partyColor: '#19AAED'
        },
        {
            state: 'Kerala',
            rulingParty: 'Left Democratic Front',
            chiefMinister: 'Pinarayi Vijayan',
            termStart: 'May 2021',
            termEnd: 'April 2026',
            majorityType: 'Coalition',
            partyColor: '#FF0000'
        },
        {
            state: 'Madhya Pradesh',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Mohan Yadav',
            termStart: 'December 2023',
            termEnd: 'December 2028',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Maharashtra',
            rulingParty: 'Mahayuti Alliance',
            chiefMinister: 'Eknath Shinde',
            termStart: 'June 2022',
            termEnd: 'November 2024',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Manipur',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'N. Biren Singh',
            termStart: 'March 2022',
            termEnd: 'March 2027',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Meghalaya',
            rulingParty: 'National People\'s Party',
            chiefMinister: 'Conrad Sangma',
            termStart: 'March 2023',
            termEnd: 'March 2028',
            majorityType: 'Coalition',
            partyColor: '#00CED1'
        },
        {
            state: 'Mizoram',
            rulingParty: 'Zoram People\'s Movement',
            chiefMinister: 'Lalduhoma',
            termStart: 'December 2023',
            termEnd: 'December 2028',
            majorityType: 'Simple Majority',
            partyColor: '#4CAF50'
        },
        {
            state: 'Nagaland',
            rulingParty: 'Nationalist Democratic Progressive Party',
            chiefMinister: 'Neiphiu Rio',
            termStart: 'March 2023',
            termEnd: 'March 2028',
            majorityType: 'Coalition',
            partyColor: '#FF6B6B'
        },
        {
            state: 'Odisha',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Mohan Charan Majhi',
            termStart: 'June 2024',
            termEnd: 'June 2029',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Punjab',
            rulingParty: 'Aam Aadmi Party',
            chiefMinister: 'Bhagwant Mann',
            termStart: 'March 2022',
            termEnd: 'February 2027',
            majorityType: 'Simple Majority',
            partyColor: '#0171BB'
        },
        {
            state: 'Rajasthan',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Bhajan Lal Sharma',
            termStart: 'December 2023',
            termEnd: 'December 2028',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Sikkim',
            rulingParty: 'Sikkim Krantikari Morcha',
            chiefMinister: 'Prem Singh Tamang',
            termStart: 'June 2024',
            termEnd: 'June 2029',
            majorityType: 'Simple Majority',
            partyColor: '#DC143C'
        },
        {
            state: 'Tamil Nadu',
            rulingParty: 'Dravida Munnetra Kazhagam',
            chiefMinister: 'M. K. Stalin',
            termStart: 'May 2021',
            termEnd: 'April 2026',
            majorityType: 'Coalition',
            partyColor: '#FF0000'
        },
        {
            state: 'Telangana',
            rulingParty: 'Indian National Congress',
            chiefMinister: 'A. Revanth Reddy',
            termStart: 'December 2023',
            termEnd: 'December 2028',
            majorityType: 'Simple Majority',
            partyColor: '#19AAED'
        },
        {
            state: 'Tripura',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Manik Saha',
            termStart: 'March 2023',
            termEnd: 'March 2028',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Uttar Pradesh',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Yogi Adityanath',
            termStart: 'March 2022',
            termEnd: 'February 2027',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Uttarakhand',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Pushkar Singh Dhami',
            termStart: 'March 2022',
            termEnd: 'March 2027',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'West Bengal',
            rulingParty: 'All India Trinamool Congress',
            chiefMinister: 'Mamata Banerjee',
            termStart: 'May 2021',
            termEnd: 'April 2026',
            majorityType: 'Simple Majority',
            partyColor: '#20C4CB'
        }
    ];

    // Get unique parties for filter
    const uniqueParties = Array.from(new Set(stateGovernments.map(gov => gov.rulingParty))).sort();

    // Filter states based on search and party filter
    const filteredStates = stateGovernments.filter(gov => {
        const matchesSearch = gov.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            gov.rulingParty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            gov.chiefMinister.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesParty = filterParty === 'all' || gov.rulingParty === filterParty;
        
        return matchesSearch && matchesParty;
    });

    // Get party statistics
    const partyStats = stateGovernments.reduce((acc, gov) => {
        acc[gov.rulingParty] = (acc[gov.rulingParty] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="political-landscape-page">
            <SEO 
                title="Political Landscape - Current State Governments in India | Manifesto Watch"
                description="Explore India's current political landscape. View ruling parties, chief ministers, and government details for all Indian states and union territories."
                keywords="india political landscape, state governments india, ruling parties, chief ministers india, current government, political map india"
                canonicalUrl="https://www.manifestowatch.in/political-landscape"
            />

            {/* Hero Section */}
            <div className="landscape-hero-section">
                <div className="container">
                    <h1 className="landscape-hero-title">India's Political Landscape</h1>
                    <p className="landscape-hero-subtitle">
                        Current ruling parties and chief ministers across all Indian states
                    </p>
                    <p className="text-white-50 small">
                        <i className="fas fa-sync-alt me-2"></i>
                        Last updated: October 2025
                    </p>
                </div>
            </div>

            <div className="container my-5">
                {/* Statistics Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="stats-card p-4">
                            <h3 className="text-white mb-4">
                                <i className="fas fa-chart-pie me-2"></i>
                                Party Distribution
                            </h3>
                            <div className="row">
                                {Object.entries(partyStats)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 5)
                                    .map(([party, count]) => (
                                        <div key={party} className="col-md-4 col-lg-2 mb-3">
                                            <div className="stat-item text-center">
                                                <h2 className="text-warning mb-0">{count}</h2>
                                                <p className="text-white-50 small mb-0">{party}</p>
                                            </div>
                                        </div>
                                    ))}
                                <div className="col-md-4 col-lg-2 mb-3">
                                    <div className="stat-item text-center">
                                        <h2 className="text-warning mb-0">{stateGovernments.length}</h2>
                                        <p className="text-white-50 small mb-0">Total States</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="row mb-4">
                    <div className="col-lg-6 mb-3">
                        <div className="search-box">
                            <i className="fas fa-search search-icon"></i>
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Search by state, party, or chief minister..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <select
                            className="form-select filter-select"
                            value={filterParty}
                            onChange={(e) => setFilterParty(e.target.value)}
                        >
                            <option value="all">All Parties ({stateGovernments.length})</option>
                            {uniqueParties.map(party => (
                                <option key={party} value={party}>
                                    {party} ({partyStats[party]})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-3">
                    <p className="text-white-50">
                        Showing {filteredStates.length} of {stateGovernments.length} states
                    </p>
                </div>

                {/* States Grid */}
                <div className="row g-4">
                    {filteredStates.map((gov) => (
                        <div key={gov.state} className="col-lg-6">
                            <div className="state-card">
                                <div 
                                    className="state-card-header" 
                                    style={{ borderLeftColor: gov.partyColor }}
                                >
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h4 className="state-name mb-2">
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                {gov.state}
                                            </h4>
                                            <span 
                                                className="party-badge"
                                                style={{ backgroundColor: gov.partyColor + '20', color: gov.partyColor }}
                                            >
                                                {gov.rulingParty}
                                            </span>
                                        </div>
                                        <span className={`majority-badge ${gov.majorityType.toLowerCase().replace(' ', '-').replace("'", '')}`}>
                                            {gov.majorityType}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="state-card-body">
                                    <div className="info-row">
                                        <div className="info-label">
                                            <i className="fas fa-user-tie me-2"></i>
                                            Chief Minister
                                        </div>
                                        <div className="info-value">{gov.chiefMinister}</div>
                                    </div>
                                    
                                    <div className="info-row">
                                        <div className="info-label">
                                            <i className="fas fa-calendar-alt me-2"></i>
                                            Term Period
                                        </div>
                                        <div className="info-value">
                                            {gov.termStart} - {gov.termEnd}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results Message */}
                {filteredStates.length === 0 && (
                    <div className="text-center py-5">
                        <i className="fas fa-search fa-3x text-white-50 mb-3"></i>
                        <h4 className="text-white">No states found</h4>
                        <p className="text-white-50">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}

                {/* Disclaimer */}
                <div className="mt-5 p-4 bg-dark rounded">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="text-warning mb-3">
                                <i className="fas fa-info-circle me-2"></i>
                                Information Note
                            </h5>
                            <p className="text-white-50 small mb-2">
                                <i className="fas fa-check-circle text-success me-2"></i>
                                Data reflects current state governments as of October 2025
                            </p>
                            <p className="text-white-50 small mb-2">
                                <i className="fas fa-sync-alt text-warning me-2"></i>
                                Information is updated regularly after election results
                            </p>
                            <p className="text-white-50 small mb-0">
                                <i className="fas fa-balance-scale text-info me-2"></i>
                                This is non-partisan, factual information for citizen awareness
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
