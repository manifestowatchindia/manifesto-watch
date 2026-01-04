import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { getManifestos } from '../../services/manifestoService';
import { Manifesto } from '../../lib/types';
import { getPartyLogo } from '../../utils/partyLogos';
import './Manifestos.css';

export const StateManifestos: React.FC = () => {
    const [manifestos, setManifestos] = useState<Manifesto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string>('All');
    const [selectedYear, setSelectedYear] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetchStateManifestos();
    }, []);

    const fetchStateManifestos = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch both state and UT manifestos
            const stateData = await getManifestos({ type: 'state_assembly' });
            const utData = await getManifestos({ type: 'ut_assembly' });
            
            // Combine both arrays
            const allData = [...stateData, ...utData];
            
            // Sort by election year (descending) and party name
            const sorted = allData.sort((a, b) => {
                if (b.election_year !== a.election_year) {
                    return b.election_year - a.election_year;
                }
                return a.party_name.localeCompare(b.party_name);
            });
            
            setManifestos(sorted);
        } catch (err) {
            console.error('Error fetching state manifestos:', err);
            setError('Failed to load state manifestos. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    // Get unique states/UTs for filter
    const availableStates = Array.from(
        new Set(manifestos.map(m => m.region_name).filter(Boolean))
    ).sort() as string[];

    // Get unique years for filter
    const availableYears = Array.from(
        new Set(manifestos.map(m => m.election_year.toString()))
    ).sort((a, b) => parseInt(b) - parseInt(a));

    // Filter manifestos
    const filteredManifestos = manifestos.filter(manifesto => {
        const matchesState = selectedState === 'All' || manifesto.region_name === selectedState;
        const matchesYear = selectedYear === 'All' || manifesto.election_year.toString() === selectedYear;
        const matchesSearch = 
            manifesto.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            manifesto.region_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            manifesto.alliance_name?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesState && matchesYear && matchesSearch;
    });

    // Get election type label
    const getElectionTypeLabel = (type: string) => {
        return type === 'ut_assembly' ? 'Union Territory Assembly' : 'State Legislative Assembly';
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

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

                {/* Filters Section */}
                <div className="filters-section">
                    <div className="container">
                        <div className="row g-3 align-items-center">
                            <div className="col-md-3">
                                <label className="form-label text-white">Filter by State/UT</label>
                                <select 
                                    className="form-select"
                                    value={selectedState}
                                    onChange={(e) => setSelectedState(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="All">All States & UTs</option>
                                    {availableStates.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label text-white">Filter by Year</label>
                                <select 
                                    className="form-select"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="All">All Years</option>
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-white">Search Manifestos</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by party, state, or alliance..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="manifestos-content">
                    <div className="container">
                        {loading && (
                            <div className="text-center py-5">
                                <div className="spinner-border text-warning" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="text-white mt-3">Loading state manifestos...</p>
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {error}
                                <button 
                                    className="btn btn-sm btn-outline-danger ms-3"
                                    onClick={fetchStateManifestos}
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {!loading && !error && filteredManifestos.length === 0 && (
                            <div className="alert alert-info text-center" role="alert">
                                <i className="bi bi-info-circle me-2"></i>
                                No manifestos found matching your criteria.
                            </div>
                        )}

                        {!loading && !error && filteredManifestos.length > 0 && (
                            <>
                                <div className="results-summary mb-4">
                                    <p className="text-white-50">
                                        Showing {filteredManifestos.length} manifesto{filteredManifestos.length !== 1 ? 's' : ''}
                                    </p>
                                </div>

                                <div className="row g-4">
                                    {filteredManifestos.map((manifesto) => (
                                        <div key={manifesto.id} className="col-md-6 col-lg-4">
                                            <div className="manifesto-card h-100">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <div className="manifesto-badge">
                                                            {getElectionTypeLabel(manifesto.election_type)}
                                                        </div>
                                                        <div className="d-flex gap-2">
                                                            <span className="badge bg-warning text-dark">
                                                                {manifesto.election_year}
                                                            </span>
                                                            {manifesto.is_winner && (
                                                                <span className="badge bg-success">
                                                                    <i className="bi bi-trophy-fill me-1"></i>
                                                                    Winner
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Party Logo and Name */}
                                                    <div className="d-flex align-items-center mb-3">
                                                        <img 
                                                            src={getPartyLogo(manifesto.party_name)}
                                                            alt={`${manifesto.party_name} logo`}
                                                            className="party-logo me-3"
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                                objectFit: 'contain',
                                                                borderRadius: '8px',
                                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                                padding: '5px'
                                                            }}
                                                            onError={(e) => {
                                                                // Fallback to placeholder if image fails to load
                                                                e.currentTarget.src = '/static/images/party-logos/default-party.svg';
                                                            }}
                                                        />
                                                        <h5 className="card-title text-white mb-0">
                                                            {manifesto.party_name}
                                                        </h5>
                                                    </div>

                                                    {manifesto.region_name && (
                                                        <p className="text-warning mb-2">
                                                            <i className="bi bi-geo-alt me-1"></i>
                                                            {manifesto.region_name}
                                                        </p>
                                                    )}

                                                    {manifesto.alliance_name && (
                                                        <p className="text-white-50 small mb-2">
                                                            <i className="bi bi-people me-1"></i>
                                                            {manifesto.alliance_name}
                                                        </p>
                                                    )}

                                                    <div className="manifesto-meta mt-3">
                                                        <div className="meta-item">
                                                            <i className="bi bi-calendar3 me-1"></i>
                                                            <span className="text-white-50 small">
                                                                Published: {formatDate(manifesto.published_date)}
                                                            </span>
                                                        </div>
                                                        <div className="meta-item">
                                                            <i className="bi bi-translate me-1"></i>
                                                            <span className="text-white-50 small text-capitalize">
                                                                {manifesto.language}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="d-grid gap-2 mt-4">
                                                        {manifesto.document_url ? (
                                                            <a 
                                                                href={manifesto.document_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-outline-warning"
                                                            >
                                                                <i className="bi bi-download me-2"></i>
                                                                Download PDF
                                                            </a>
                                                        ) : (
                                                            <button className="btn btn-outline-secondary" disabled>
                                                                <i className="bi bi-file-earmark-x me-2"></i>
                                                                PDF Not Available
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
