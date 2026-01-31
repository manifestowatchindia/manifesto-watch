import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { constituencyService, ConstituencyData, ConstituencyPromise } from '../../services/election/constituencyService';

/**
 * ConstituencyView Layout
 * 
 * Detailed view of a specific constituency within an election
 * Displays voter information, candidates, local promises, and historical data
 * 
 * Route: /elections/:state-:year/constituencies/:id
 * Example: /elections/kerala-2026/constituencies/kerala_001
 */

export interface ConstituencyViewProps {
    constituencyId?: string;
}

export const ConstituencyView: React.FC<ConstituencyViewProps> = () => {
    const { state, year, id } = useParams<{ state: string; year: string; id: string }>();
    const [constituency, setConstituency] = useState<ConstituencyData | null>(null);
    const [promises, setPromises] = useState<ConstituencyPromise[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<'overview' | 'candidates' | 'promises' | 'history'>('overview');

    useEffect(() => {
        const fetchConstituencyData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (!id) {
                    setError('Constituency ID is missing');
                    return;
                }

                const [constituencyData, promisesData] = await Promise.all([
                    constituencyService.getConstituencyById(id),
                    constituencyService.getPromisesByConstituency(id),
                ]);

                if (constituencyData) {
                    setConstituency(constituencyData);
                    setPromises(promisesData);
                } else {
                    setError('Constituency not found');
                }
            } catch (err) {
                console.error('Failed to fetch constituency data:', err);
                setError('Failed to load constituency data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConstituencyData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
                <SEO
                    title="Loading Constituency"
                    description="Loading constituency information"
                />
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb skeleton */}
                    <div className="mb-6 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    
                    {/* Header skeleton */}
                    <div className="mb-8 animate-pulse">
                        <div className="h-10 bg-gray-200 rounded-lg w-2/3 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
                    </div>

                    {/* Stats skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                    </div>

                    {/* Content skeleton */}
                    <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (error || !constituency) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
                <SEO
                    title="Constituency Not Found"
                    description="The requested constituency could not be found"
                />
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Constituency Not Found
                        </h1>
                        <p className="text-gray-600 mb-8">
                            {error || "We couldn't find the constituency you're looking for."}
                        </p>
                        <Link
                            to={`/elections/${state}-${year}`}
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Election Hub
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const formatNumber = (num: number): string => {
        if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const getStatusColor = (status: string): string => {
        const colors: Record<string, string> = {
            'Fulfilled': 'bg-green-100 text-green-800 border-green-200',
            'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
            'Partially Fulfilled': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'Announced': 'bg-purple-100 text-purple-800 border-purple-200',
            'Not Started': 'bg-gray-100 text-gray-800 border-gray-200',
            'Broken': 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <SEO
                title={`${constituency.name} Constituency - ${constituency.state} Elections ${year}`}
                description={`View detailed information about ${constituency.name} constituency including candidates, voter statistics, and local promises for ${constituency.state} ${year} elections.`}
            />

            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm text-blue-100 mb-4">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <Link to={`/elections/${state}-${year}`} className="hover:text-white transition-colors">
                            {state?.charAt(0).toUpperCase()}{state?.slice(1)} {year}
                        </Link>
                        <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white font-medium">{constituency.name}</span>
                    </nav>

                    {/* Title */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                    #{constituency.number}
                                </span>
                                {constituency.reservationStatus && constituency.reservationStatus !== 'General' && (
                                    <span className="bg-orange-400/90 px-3 py-1 rounded-full text-sm font-medium">
                                        {constituency.reservationStatus}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                {constituency.name}
                            </h1>
                            <p className="text-blue-100 text-lg">
                                {constituency.state} Legislative Assembly Constituency
                            </p>
                        </div>
                        
                        {/* Voting Booth Locator Link */}
                        <a
                            href="https://eci.gov.in/voter-portal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Find Your Polling Booth
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-lg p-5 text-center">
                        <div className="text-3xl font-bold text-blue-600">{formatNumber(constituency.voters)}</div>
                        <div className="text-gray-600 text-sm mt-1">Registered Voters</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-5 text-center">
                        <div className="text-3xl font-bold text-green-600">{constituency.pollingBooths}</div>
                        <div className="text-gray-600 text-sm mt-1">Polling Booths</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-5 text-center">
                        <div className="text-3xl font-bold text-purple-600">{constituency.candidates?.length || 0}</div>
                        <div className="text-gray-600 text-sm mt-1">Candidates</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-5 text-center">
                        <div className="text-3xl font-bold text-orange-600">{promises.length}</div>
                        <div className="text-gray-600 text-sm mt-1">Local Promises</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Section Navigation */}
                <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-lg p-2 shadow-sm">
                    {(['overview', 'candidates', 'promises', 'history'] as const).map((section) => (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                                activeSection === section
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {section}
                        </button>
                    ))}
                </div>

                {/* Overview Section */}
                {activeSection === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Incumbent Info */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Current Representative
                                </h2>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                        {constituency.incumbent?.charAt(0) || '?'}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {constituency.incumbent || 'Information not available'}
                                        </h3>
                                        <p className="text-gray-600">{constituency.incumbentParty || 'Party information not available'}</p>
                                    </div>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        Incumbent
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Constituency Number</span>
                                    <span className="font-semibold text-gray-900">#{constituency.number}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">State</span>
                                    <span className="font-semibold text-gray-900">{constituency.state}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Reservation Status</span>
                                    <span className="font-semibold text-gray-900">{constituency.reservationStatus || 'General'}</span>
                                </div>
                                {constituency.lastElectionResults && (
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">Last Turnout</span>
                                        <span className="font-semibold text-green-600">{constituency.lastElectionResults.voterTurnout}%</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Candidates Section */}
                {activeSection === 'candidates' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Candidates ({constituency.candidates?.length || 0})
                        </h2>
                        
                        {constituency.candidates && constituency.candidates.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {constituency.candidates.map((candidate) => (
                                    <div 
                                        key={candidate.id} 
                                        className={`relative p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                                            candidate.isIncumbent ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                                        }`}
                                    >
                                        {candidate.isIncumbent && (
                                            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                Incumbent
                                            </span>
                                        )}
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                                                {candidate.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">{candidate.name}</h3>
                                                <p className="text-blue-600 font-medium">{candidate.party}</p>
                                                <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
                                                    {candidate.age && <span>Age: {candidate.age}</span>}
                                                    {candidate.education && <span>• {candidate.education}</span>}
                                                </div>
                                                {candidate.criminalCases !== undefined && candidate.criminalCases > 0 && (
                                                    <div className="mt-2 text-sm text-red-600 flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        {candidate.criminalCases} criminal case(s) declared
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <p className="text-lg font-medium">Candidate list not yet available</p>
                                <p className="text-sm mt-2">Candidates will be announced closer to the election date.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Promises Section */}
                {activeSection === 'promises' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Local Promises ({promises.length})
                        </h2>

                        {promises.length > 0 ? (
                            <div className="space-y-4">
                                {promises.map((promise) => (
                                    <div key={promise.id} className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900">{promise.title}</h3>
                                                {promise.relevanceToConstituency && (
                                                    <p className="text-blue-600 text-sm mt-1 flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                        </svg>
                                                        {promise.relevanceToConstituency}
                                                    </p>
                                                )}
                                                {promise.localImpact && (
                                                    <p className="text-gray-600 text-sm mt-2">
                                                        <strong>Local Impact:</strong> {promise.localImpact}
                                                    </p>
                                                )}
                                            </div>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(promise.status)}`}>
                                                {promise.status}
                                            </span>
                                        </div>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <span className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-600 capitalize">
                                                {promise.type}
                                            </span>
                                            {promise.timeline && (
                                                <span className="px-2 py-1 bg-blue-100 rounded text-xs text-blue-700">
                                                    {promise.timeline}
                                                </span>
                                            )}
                                            {promise.measurable && (
                                                <span className="px-2 py-1 bg-green-100 rounded text-xs text-green-700">
                                                    Measurable
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <p className="text-lg font-medium">No local promises tracked yet</p>
                                <p className="text-sm mt-2">Promises relevant to this constituency will appear here.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* History Section */}
                {activeSection === 'history' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Election History
                        </h2>

                        {constituency.lastElectionResults ? (
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Last Election Results</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                            <div className="text-sm text-gray-500 mb-1">Winner</div>
                                            <div className="font-semibold text-gray-900">{constituency.lastElectionResults.winner}</div>
                                        </div>
                                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                            <div className="text-sm text-gray-500 mb-1">Party</div>
                                            <div className="font-semibold text-blue-600">{constituency.lastElectionResults.winnerParty}</div>
                                        </div>
                                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                            <div className="text-sm text-gray-500 mb-1">Victory Margin</div>
                                            <div className="font-semibold text-green-600">{formatNumber(constituency.lastElectionResults.margin)} votes</div>
                                        </div>
                                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                            <div className="text-sm text-gray-500 mb-1">Voter Turnout</div>
                                            <div className="font-semibold text-purple-600">{constituency.lastElectionResults.voterTurnout}%</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Historical trend placeholder */}
                                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Historical Trends</h3>
                                    <p className="text-gray-600 text-sm">
                                        Detailed election history and trend analysis for this constituency will be available soon.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p className="text-lg font-medium">Historical data not available</p>
                                <p className="text-sm mt-2">Election history for this constituency will be added soon.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConstituencyView;
