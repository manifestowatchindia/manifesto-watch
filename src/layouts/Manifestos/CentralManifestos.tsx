import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import './Manifestos.css';

interface Manifesto {
    id: number;
    party: string;
    partyLogo: string;
    year: number;
    election: string;
    pdfUrl?: string;
    highlights: string[];
    downloadSize?: string;
    pages?: number;
    publishedDate?: string;
}

export const CentralManifestos: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<string>('2024');
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Central Government Manifestos Data
    const centralManifestos: Manifesto[] = [
        {
            id: 1,
            party: 'BJP+ (NDA Alliance - Current Government)',
            partyLogo: '/static/images/bjp-logo.png',
            year: 2024,
            election: 'Lok Sabha Elections 2024',
            pdfUrl: '#',
            downloadSize: '5.2 MB',
            pages: 76,
            publishedDate: 'April 14, 2024',
            highlights: [
                'Viksit Bharat 2047 - Vision for developed India',
                'Economic growth target of $7 trillion GDP',
                'Continuation of welfare schemes (PM-KISAN, Ayushman Bharat)',
                'Focus on infrastructure development',
                'Digital India expansion',
                'Manufacturing and Make in India initiatives',
                'Atmanirbhar Bharat (Self-reliant India)',
                'Women empowerment and safety',
                'Alliance: BJP, JD(U), Shiv Sena, LJP, and other NDA partners'
            ]
        },
        {
            id: 2,
            party: 'INDIA Alliance (I.N.D.I.A. Bloc)',
            partyLogo: '/static/images/india-alliance-logo.png',
            year: 2024,
            election: 'Lok Sabha Elections 2024',
            pdfUrl: '#',
            downloadSize: '4.8 MB',
            pages: 68,
            publishedDate: 'April 10, 2024',
            highlights: [
                'Social justice and inclusive development',
                'Caste census and reservation reforms',
                'Employment guarantee schemes expansion',
                'Healthcare for all - strengthening public health',
                'Farmers debt relief and MSP guarantee',
                'Education reforms and minority rights protection',
                'Federalism and state autonomy',
                'Women safety and empowerment initiatives',
                'Alliance: INC, AAP, TMC, DMK, Shiv Sena (UBT), NCP (SP), RJD, and 20+ parties'
            ]
        },
        {
            id: 3,
            party: 'Bharatiya Janata Party (BJP)',
            partyLogo: '/static/images/bjp-logo.png',
            year: 2019,
            election: 'Lok Sabha Elections 2019',
            pdfUrl: '#',
            downloadSize: '6.1 MB',
            pages: 84,
            publishedDate: 'April 8, 2019',
            highlights: [
                'Sabka Saath, Sabka Vikas, Sabka Vishwas',
                'National security and surgical strikes',
                'Economic reforms and GST implementation',
                'Digital India and cashless economy',
                'Swachh Bharat Mission',
                'Farmer welfare initiatives',
                'Jan Dhan Yojana expansion',
                'Housing for all'
            ]
        }
    ];

    // Filter manifestos based on selected year and search term
    const filteredManifestos = centralManifestos.filter(manifesto => {
        const matchesYear = selectedYear === 'All' || manifesto.year.toString() === selectedYear;
        const matchesSearch = manifesto.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            manifesto.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesYear && matchesSearch;
    });

    // Get unique years for filter
    const availableYears = Array.from(new Set(centralManifestos.map(m => m.year.toString()))).sort((a, b) => parseInt(b) - parseInt(a));

    return (
        <>
            <SEO 
                title="Central Government Manifestos - Lok Sabha Elections | Manifesto Watch"
                description="Access election manifestos for Lok Sabha elections. Track political parties' promises, policy commitments, and key highlights for central government elections."
                canonicalUrl="https://www.manifestowatch.in/manifestos/central"
            />
            
            <div className="manifestos-page">
                {/* Hero Section */}
                <div className="manifestos-hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto text-center">
                                <h1 className="display-4 fw-bold text-white mb-3">
                                    Central Government Manifestos
                                </h1>
                                <p className="lead text-white-50 mb-4">
                                    Access election manifestos for Lok Sabha elections. Track political parties' promises, policy commitments, and vision for India.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="filters-section">
                    <div className="container">
                        <div className="row g-3 align-items-center">
                            <div className="col-md-4">
                                <label className="form-label text-white">Filter by Election Year</label>
                                <select 
                                    className="form-select"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    <option value="All">All Years</option>
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-8">
                                <label className="form-label text-white">Search Manifestos</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by party name or key promises..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Manifestos Grid */}
                <div className="manifestos-content">
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col-12">
                                <h2 className="text-white mb-2">
                                    {selectedYear === 'All' ? 'All Elections' : `${selectedYear} Elections`}
                                </h2>
                                <p className="text-white-50">
                                    Showing {filteredManifestos.length} manifesto(s)
                                </p>
                            </div>
                        </div>

                        {filteredManifestos.length > 0 ? (
                            <div className="row g-4">
                                {filteredManifestos.map((manifesto) => (
                                    <div key={manifesto.id} className="col-lg-6 col-xl-4">
                                        <div className="manifesto-card">
                                            {/* Card Header */}
                                            <div className="manifesto-card-header">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="party-logo-placeholder">
                                                        <i className="bi bi-flag-fill"></i>
                                                    </div>
                                                    <div className="ms-3 flex-grow-1">
                                                        <h5 className="mb-1">{manifesto.party}</h5>
                                                        <p className="text-muted small mb-0">
                                                            <i className="bi bi-calendar3 me-1"></i>
                                                            {manifesto.election}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                {manifesto.publishedDate && (
                                                    <div className="manifesto-meta">
                                                        <span className="badge bg-primary">
                                                            <i className="bi bi-calendar-check me-1"></i>
                                                            Published: {manifesto.publishedDate}
                                                        </span>
                                                        {manifesto.pages && (
                                                            <span className="badge bg-secondary ms-2">
                                                                <i className="bi bi-file-earmark-text me-1"></i>
                                                                {manifesto.pages} pages
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Body */}
                                            <div className="manifesto-card-body">
                                                <h6 className="mb-3">Key Highlights:</h6>
                                                <ul className="highlights-list">
                                                    {manifesto.highlights.slice(0, 5).map((highlight, index) => (
                                                        <li key={index}>
                                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                    {manifesto.highlights.length > 5 && (
                                                        <li className="text-muted">
                                                            <i className="bi bi-three-dots me-2"></i>
                                                            +{manifesto.highlights.length - 5} more highlights
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>

                                            {/* Card Footer */}
                                            <div className="manifesto-card-footer">
                                                <div className="d-flex gap-2">
                                                    {/* Show Track Progress button only for BJP+ 2024 (current government) */}
                                                    {manifesto.party.includes('BJP+') && manifesto.year === 2024 ? (
                                                        <>
                                                            <Link 
                                                                to="/manifestos/central/2024/bjp/15pointsversion" 
                                                                className="btn btn-primary w-100"
                                                                style={{ textDecoration: 'none' }}
                                                            >
                                                                <i className="bi bi-bar-chart-line me-2"></i>
                                                                Track BJP+ Progress (2024-2029)
                                                            </Link>
                                                        </>
                                                    ) : manifesto.party.includes('INDIA Alliance') && manifesto.year === 2024 ? (
                                                        <>
                                                            <button className="btn btn-primary w-100" disabled>
                                                                <i className="bi bi-download me-2"></i>
                                                                Download PDF
                                                                {manifesto.downloadSize && (
                                                                    <span className="ms-2 small">({manifesto.downloadSize})</span>
                                                                )}
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className="btn btn-primary flex-grow-1" disabled>
                                                                <i className="bi bi-download me-2"></i>
                                                                Download PDF
                                                                {manifesto.downloadSize && (
                                                                    <span className="ms-2 small">({manifesto.downloadSize})</span>
                                                                )}
                                                            </button>
                                                            <button className="btn btn-outline-primary" disabled>
                                                                <i className="bi bi-eye"></i>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                                {!manifesto.party.includes('BJP+') || manifesto.year !== 2024 ? (
                                                    <p className="text-center text-muted small mt-2 mb-0">
                                                        <i className="bi bi-info-circle me-1"></i>
                                                        PDF uploads coming soon
                                                    </p>
                                                ) : (
                                                    <p className="text-center text-success small mt-2 mb-0">
                                                        <i className="bi bi-check-circle me-1"></i>
                                                        Current ruling government - Track live progress
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <div className="text-center py-5">
                                    <i className="bi bi-search display-1 text-muted"></i>
                                    <h3 className="text-white mt-3">No manifestos found</h3>
                                    <p className="text-white-50">
                                        Try adjusting your filters or search terms
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Info Banner */}
                        <div className="info-banner mt-5">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h5 className="mb-2">
                                        <i className="bi bi-info-circle-fill me-2"></i>
                                        About These Manifestos
                                    </h5>
                                    <p className="mb-0">
                                        Election manifestos are policy documents released by political parties outlining their promises 
                                        and vision if elected. We collect and archive these documents to promote transparency and enable 
                                        voters to make informed decisions. Currently displaying manifestos for Lok Sabha (Central Government) 
                                        elections. State-level manifestos will be added soon.
                                    </p>
                                </div>
                                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                    <button className="btn btn-outline-light" disabled>
                                        <i className="bi bi-upload me-2"></i>
                                        Submit Manifesto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
