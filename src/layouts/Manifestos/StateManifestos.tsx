import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { getManifestos } from '../../services/manifestoService';
import { Manifesto } from '../../lib/types';
import { getPartyLogo } from '../../utils/partyLogos';
import { PartyManifestoCard, ReleaseStatus } from '../../components/election/PartyManifestoCard';

/**
 * State Manifestos Page
 * 
 * Displays election manifestos for State Legislative Assembly and 
 * Union Territory elections with search, filtering, and responsive grid layout
 */

/**
 * Skeleton loader for manifesto cards during loading state
 */
const ManifestoCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden animate-pulse">
        <div className="bg-gray-100 px-6 py-4 border-b-2 border-gray-200">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                    <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
            </div>
        </div>
        <div className="p-6">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            </div>
            <div className="flex gap-3 mt-6">
                <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    </div>
);

/**
 * Statistics card component for summary display
 */
const StatCard: React.FC<{ label: string; value: string | number; icon: string }> = ({ label, value, icon }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
        <div className="text-2xl mb-2">{icon}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
    </div>
);

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
    const availableStates = useMemo(() => {
        return Array.from(
            new Set(manifestos.map(m => m.region_name).filter(Boolean))
        ).sort() as string[];
    }, [manifestos]);

    // Get unique years for filter
    const availableYears = useMemo(() => {
        return Array.from(
            new Set(manifestos.map(m => m.election_year.toString()))
        ).sort((a, b) => parseInt(b) - parseInt(a));
    }, [manifestos]);

    // Filter manifestos
    const filteredManifestos = useMemo(() => {
        return manifestos.filter(manifesto => {
            const matchesState = selectedState === 'All' || manifesto.region_name === selectedState;
            const matchesYear = selectedYear === 'All' || manifesto.election_year.toString() === selectedYear;
            const matchesSearch = 
                manifesto.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                manifesto.region_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                manifesto.alliance_name?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesState && matchesYear && matchesSearch;
        });
    }, [manifestos, selectedState, selectedYear, searchTerm]);

    // Get election type label
    const getElectionTypeLabel = (type: string) => {
        return type === 'ut_assembly' ? 'Union Territory Assembly' : 'State Legislative Assembly';
    };

    // Map API manifesto to PartyManifestoCard props
    const mapManifestoToCardProps = (manifesto: Manifesto) => {
        // Determine release status based on document availability
        const releaseStatus: ReleaseStatus = manifesto.document_url ? 'released' : 'not-released';
        
        // Build key promises from manifesto data (if available)
        const keyPromises: string[] = [];
        if (manifesto.region_name) {
            keyPromises.push(`${getElectionTypeLabel(manifesto.election_type)} - ${manifesto.election_year}`);
        }
        if (manifesto.alliance_name) {
            keyPromises.push(`Alliance: ${manifesto.alliance_name}`);
        }
        keyPromises.push(`Language: ${manifesto.language || 'English'}`);
        if (manifesto.is_winner) {
            keyPromises.push('🏆 Election Winner');
        }
        
        return {
            party: manifesto.party_name,
            logo: getPartyLogo(manifesto.party_name),
            releaseStatus,
            keyPromises,
            documentUrl: manifesto.document_url || undefined,
        };
    };

    // Handle card actions
    const handleDownload = (manifesto: Manifesto) => {
        if (manifesto.document_url) {
            window.open(manifesto.document_url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <>
            <SEO 
                title="State and Union Territory Manifestos | Manifesto Watch"
                description="Access election manifestos from political parties for State Legislative Assembly and Union Territory elections across India."
                canonicalUrl="https://www.manifestowatch.in/manifestos/states"
            />
            
            <div className="min-h-screen bg-gray-900">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 py-16 md:py-20 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                        }}></div>
                    </div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                State & Union Territory Manifestos
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 mb-6">
                                Access election manifestos from political parties contesting State Legislative Assembly and Union Territory elections across India
                            </p>
                            
                            {/* Navigation breadcrumb */}
                            <nav className="flex items-center justify-center gap-2 text-white/60 text-sm">
                                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                                <span>›</span>
                                <Link to="/manifestos" className="hover:text-white transition-colors">Manifestos</Link>
                                <span>›</span>
                                <span className="text-white">States</span>
                            </nav>
                        </div>

                        {/* Stats Summary */}
                        {!loading && !error && manifestos.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
                                <StatCard icon="📄" value={manifestos.length} label="Total Manifestos" />
                                <StatCard icon="🗺️" value={availableStates.length} label="States & UTs" />
                                <StatCard icon="📅" value={availableYears.length} label="Election Years" />
                                <StatCard icon="🏆" value={manifestos.filter(m => m.is_winner).length} label="Winners" />
                            </div>
                        )}
                    </div>
                </section>

                {/* Filters Section */}
                <section className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 py-6 sticky top-0 z-20">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                            {/* State Filter */}
                            <div className="lg:w-56">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Filter by State/UT
                                </label>
                                <select 
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:opacity-50"
                                    value={selectedState}
                                    onChange={(e) => setSelectedState(e.target.value)}
                                    disabled={loading}
                                    aria-label="Filter by state or union territory"
                                >
                                    <option value="All">All States & UTs</option>
                                    {availableStates.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Filter */}
                            <div className="lg:w-40">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Filter by Year
                                </label>
                                <select 
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:opacity-50"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    disabled={loading}
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
                                        className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:opacity-50"
                                        placeholder="Search by party, state, or alliance..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        disabled={loading}
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
                            <div className="lg:w-auto text-center lg:text-right self-end">
                                <p className="text-gray-400 text-sm">
                                    Showing <span className="text-white font-semibold">{filteredManifestos.length}</span> manifesto(s)
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        {/* Loading State */}
                        {loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <ManifestoCardSkeleton key={i} />
                                ))}
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-900/30 border border-red-700 rounded-xl p-6 text-center max-w-2xl mx-auto">
                                <div className="text-4xl mb-4">⚠️</div>
                                <h3 className="text-xl font-bold text-red-300 mb-2">Failed to Load Manifestos</h3>
                                <p className="text-red-200 mb-4">{error}</p>
                                <button 
                                    onClick={fetchStateManifestos}
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && !error && filteredManifestos.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📭</div>
                                <h3 className="text-2xl font-bold text-white mb-2">No manifestos found</h3>
                                <p className="text-gray-400 mb-6">
                                    {manifestos.length === 0 
                                        ? 'No state manifestos are available yet.' 
                                        : 'Try adjusting your filters or search terms'}
                                </p>
                                {manifestos.length > 0 && (
                                    <button
                                        onClick={() => {
                                            setSelectedState('All');
                                            setSelectedYear('All');
                                            setSearchTerm('');
                                        }}
                                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Manifestos Grid */}
                        {!loading && !error && filteredManifestos.length > 0 && (
                            <>
                                {/* Section Header */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        {selectedState !== 'All' 
                                            ? `${selectedState} Manifestos` 
                                            : selectedYear !== 'All' 
                                                ? `${selectedYear} State Elections`
                                                : 'All State & UT Manifestos'}
                                    </h2>
                                    <p className="text-gray-400">
                                        Browse election manifestos from various political parties
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredManifestos.map((manifesto) => {
                                        const cardProps = mapManifestoToCardProps(manifesto);
                                        return (
                                            <div key={manifesto.id} className="relative">
                                                {/* State/Year Badge */}
                                                <div className="absolute -top-3 left-4 z-10 flex gap-2">
                                                    <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                        {manifesto.region_name}
                                                    </span>
                                                    <span className="bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                        {manifesto.election_year}
                                                    </span>
                                                    {manifesto.is_winner && (
                                                        <span className="bg-yellow-500 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
                                                            🏆 Winner
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="pt-4">
                                                    <PartyManifestoCard
                                                        {...cardProps}
                                                        onDownload={manifesto.document_url ? () => handleDownload(manifesto) : undefined}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        {/* Info Banner */}
                        <div className="mt-12 bg-gradient-to-r from-green-900/50 to-teal-900/50 border border-green-700/50 rounded-xl p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <span className="text-green-400">📍</span>
                                        State & UT Elections
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        State Legislative Assembly elections are held every 5 years to elect MLAs who form the state government. 
                                        Union Territory elections follow similar patterns for UTs with legislative assemblies. 
                                        Manifestos contain promises specific to each state's needs and priorities.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        to="/manifestos/central"
                                        className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors text-center"
                                    >
                                        View Central Manifestos
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

export default StateManifestos;