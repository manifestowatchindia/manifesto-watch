import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { PartyManifestoCard, ReleaseStatus } from '../../components/election/PartyManifestoCard';

/**
 * Central Manifestos Page
 * 
 * Displays election manifestos for Lok Sabha (Central Government) elections
 * with search, filtering, and responsive grid layout using Tailwind CSS
 */

interface CentralManifesto {
    id: number;
    party: string;
    partyLogo?: string;
    year: number;
    election: string;
    pdfUrl?: string;
    highlights: string[];
    downloadSize?: string;
    pages?: number;
    publishedDate?: string;
    releaseStatus: ReleaseStatus;
    trackingEnabled?: boolean;
    trackingUrl?: string;
}

export const CentralManifestos: React.FC = () => {
    const navigate = useNavigate();
    const [selectedYear, setSelectedYear] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Central Government Manifestos Data
    const centralManifestos: CentralManifesto[] = [
        {
            id: 1,
            party: 'BJP+ (NDA Alliance)',
            partyLogo: '/static/images/bjp-logo.png',
            year: 2024,
            election: 'Lok Sabha Elections 2024',
            pdfUrl: '#',
            downloadSize: '5.2 MB',
            pages: 76,
            publishedDate: 'April 14, 2024',
            releaseStatus: 'released',
            trackingEnabled: true,
            trackingUrl: '/manifestos/central/2024/bjp/15pointsversion',
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
            releaseStatus: 'released',
            trackingEnabled: false,
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
            releaseStatus: 'released',
            trackingEnabled: false,
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
        },
        {
            id: 4,
            party: 'Indian National Congress (INC)',
            partyLogo: '/static/images/inc-logo.png',
            year: 2019,
            election: 'Lok Sabha Elections 2019',
            pdfUrl: '#',
            downloadSize: '5.4 MB',
            pages: 72,
            publishedDate: 'April 2, 2019',
            releaseStatus: 'released',
            trackingEnabled: false,
            highlights: [
                'NYAY scheme - Minimum Income Guarantee',
                'Job creation focus - Fill government vacancies',
                'Farmers loan waiver',
                'Healthcare expansion',
                'Education and skill development',
                'Women empowerment',
                'GST reform simplification',
                'National security commitment'
            ]
        }
    ];

    // Filter manifestos based on selected year and search term
    const filteredManifestos = useMemo(() => {
        return centralManifestos.filter(manifesto => {
            const matchesYear = selectedYear === 'All' || manifesto.year.toString() === selectedYear;
            const matchesSearch = manifesto.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                manifesto.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesYear && matchesSearch;
        });
    }, [centralManifestos, selectedYear, searchTerm]);

    // Get unique years for filter
    const availableYears = useMemo(() => {
        return Array.from(new Set(centralManifestos.map(m => m.year.toString()))).sort((a, b) => parseInt(b) - parseInt(a));
    }, [centralManifestos]);

    // Handlers for manifesto card actions
    const handleReadFull = (manifesto: CentralManifesto) => {
        if (manifesto.trackingEnabled && manifesto.trackingUrl) {
            navigate(manifesto.trackingUrl);
        }
    };

    const handleTrackPromises = (manifesto: CentralManifesto) => {
        if (manifesto.trackingUrl) {
            navigate(manifesto.trackingUrl);
        }
    };

    const handleDownload = (manifesto: CentralManifesto) => {
        if (manifesto.pdfUrl && manifesto.pdfUrl !== '#') {
            window.open(manifesto.pdfUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <>
            <SEO 
                title="Central Government Manifestos - Lok Sabha Elections | Manifesto Watch"
                description="Access election manifestos for Lok Sabha elections. Track political parties' promises, policy commitments, and key highlights for central government elections."
                canonicalUrl="https://www.manifestowatch.in/manifestos/central"
            />
            
            <div className="min-h-screen bg-gray-900">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 py-16 md:py-20 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                        }}></div>
                    </div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Central Government Manifestos
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 mb-6">
                                Access election manifestos for Lok Sabha elections. Track political parties' promises, policy commitments, and vision for India.
                            </p>
                            
                            {/* Navigation breadcrumb */}
                            <nav className="flex items-center justify-center gap-2 text-white/60 text-sm">
                                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                                <span>›</span>
                                <Link to="/manifestos" className="hover:text-white transition-colors">Manifestos</Link>
                                <span>›</span>
                                <span className="text-white">Central</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Filters Section */}
                <section className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 py-6 sticky top-0 z-20">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                            {/* Year Filter */}
                            <div className="md:w-48">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Filter by Year
                                </label>
                                <select 
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    aria-label="Filter by election year"
                                >
                                    <option value="All">All Years</option>
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Search Input */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Search Manifestos
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        🔍
                                    </span>
                                    <input 
                                        type="text"
                                        className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                                        placeholder="Search by party name or key promises..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        aria-label="Search manifestos"
                                    />
                                    {searchTerm && (
                                        <button 
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                            aria-label="Clear search"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Results count */}
                            <div className="md:w-auto text-center md:text-right self-end">
                                <p className="text-gray-400 text-sm">
                                    Showing <span className="text-white font-semibold">{filteredManifestos.length}</span> manifesto(s)
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Manifestos Grid */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        {/* Section Header */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {selectedYear === 'All' ? 'All Lok Sabha Elections' : `${selectedYear} Lok Sabha Elections`}
                            </h2>
                            <p className="text-gray-400">
                                Browse and track election manifestos from major political parties
                            </p>
                        </div>

                        {/* Manifestos Grid */}
                        {filteredManifestos.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredManifestos.map((manifesto) => (
                                    <PartyManifestoCard
                                        key={manifesto.id}
                                        party={manifesto.party}
                                        logo={manifesto.partyLogo}
                                        releaseStatus={manifesto.releaseStatus}
                                        keyPromises={manifesto.highlights}
                                        documentUrl={manifesto.pdfUrl !== '#' ? manifesto.pdfUrl : undefined}
                                        onReadFull={manifesto.trackingEnabled ? () => handleReadFull(manifesto) : undefined}
                                        onTrackPromises={manifesto.trackingEnabled ? () => handleTrackPromises(manifesto) : undefined}
                                        onDownload={manifesto.pdfUrl !== '#' ? () => handleDownload(manifesto) : undefined}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {filteredManifestos.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📭</div>
                                <h3 className="text-2xl font-bold text-white mb-2">No manifestos found</h3>
                                <p className="text-gray-400 mb-6">
                                    Try adjusting your filters or search terms
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedYear('All');
                                        setSearchTerm('');
                                    }}
                                    className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                        {/* Info Banner */}
                        <div className="mt-12 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-700/50 rounded-xl p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <span className="text-blue-400">ℹ️</span>
                                        About These Manifestos
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        Election manifestos are policy documents released by political parties outlining their promises 
                                        and vision if elected. We collect and archive these documents to promote transparency and enable 
                                        voters to make informed decisions. Currently displaying manifestos for Lok Sabha (Central Government) 
                                        elections.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        to="/manifestos/states"
                                        className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors text-center"
                                    >
                                        View State Manifestos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default CentralManifestos;