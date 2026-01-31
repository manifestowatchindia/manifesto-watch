import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../../components/SEO';
import { ElectionCountdown } from '../../components/election/ElectionCountdown';
import { RulingPartyReportCard } from '../../components/election/RulingPartyReportCard';
import { electionService } from '../../services/election/electionService';
import { Election } from '../../lib/types';

/**
 * State Election Hub Layout
 * 
 * Comprehensive hub page for state/UT elections
 * Displays election information, party comparisons, promises, and statistics
 * 
 * Route: /elections/:state-:year
 * Example: /elections/kerala-2026
 */

export interface StateElectionHubProps {
  state?: string;
  year?: number;
}

export const StateElectionHub: React.FC<StateElectionHubProps> = () => {
  const { state, year } = useParams<{ state: string; year: string }>();
  const [election, setElection] = useState<Election | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'parties' | 'compare' | 'promises' | 'constituencies'
  >('overview');

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!state) {
          setError('State parameter is missing');
          return;
        }

        // In a real scenario, we'd fetch from API based on state and year
        // For now, we'll use the first active election as demo data
        const activeElections = await electionService.getActiveElections();
        const foundElection = activeElections[0];

        if (foundElection) {
          setElection(foundElection);
        } else {
          setError('Election data not found');
        }
      } catch (err) {
        console.error('Failed to fetch election data:', err);
        setError('Failed to load election data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchElectionData();
  }, [state, year]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
        <SEO
          title="Loading Election Hub"
          description="Loading state election information"
        />
        <div className="max-w-7xl mx-auto">
          {/* Header skeleton */}
          <div className="mb-8 animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-2/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
          </div>

          {/* Countdown skeleton */}
          <div className="mb-8 h-80 bg-gray-200 rounded-2xl animate-pulse"></div>

          {/* Stats cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !election) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <SEO
          title="Election Hub Error"
          description="Unable to load election information"
        />
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Unable to Load Election Data
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {error || 'The election information could not be found'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stateName = state
    ? state
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : election.state;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO
        title={`${stateName} Election 2026 - ManifestoWatch`}
        description={`Comprehensive election hub for ${stateName}. Track election promises, compare parties, and make informed voting decisions.`}
      />

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">
              Home
            </a>
            <span>›</span>
            <a href="/elections" className="hover:text-blue-600">
              Elections
            </a>
            <span>›</span>
            <span className="text-gray-900 font-semibold">{stateName}</span>
          </nav>
        </div>
      </div>

      {/* Page header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">🗳️</div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {stateName} Legislative Assembly Election 2026
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Election Date: {new Date(election.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })} • {electionService.calculateCountdown(election.date).days} Days
                to Go
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured countdown */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ElectionCountdown election={election} priority="primary" />
        </div>
      </div>

      {/* Quick stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Constituencies card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Constituencies
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {election.constituencies || 'N/A'}
            </div>
            <p className="text-sm text-gray-600">Total seats to be elected</p>
          </div>

          {/* Voters card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Eligible Voters
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {election.voters ? `${(election.voters / 10000000).toFixed(2)} Cr` : 'N/A'}
            </div>
            <p className="text-sm text-gray-600">Registered eligible voters</p>
          </div>

          {/* Parties card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Major Parties
            </div>
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {election.parties ? election.parties.length : 'N/A'}
            </div>
            <p className="text-sm text-gray-600">Competing in election</p>
          </div>

          {/* Promises card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Promises Tracked
            </div>
            <div className="text-4xl font-bold text-red-600 mb-2">2,847</div>
            <p className="text-sm text-gray-600">Promises from all parties</p>
          </div>
        </div>
      </div>

      {/* Ruling party report card */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Ruling Party Performance
        </h2>
        <RulingPartyReportCard
          party={{
            name: 'LDF (CPM-led)',
            logo: '',
          }}
          term="2021-2026"
          completionRate={67}
          breakdown={{
            completed: 156,
            inProgress: 89,
            delayed: 23,
            notStarted: 12,
          }}
          onViewReport={() => {
            console.log('View detailed report card');
          }}
        />
      </div>

      {/* Navigation tabs */}
      <div className="bg-white border-y border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'overview' as const, label: 'Overview' },
              { id: 'parties' as const, label: 'Parties' },
              { id: 'compare' as const, label: 'Compare' },
              { id: 'promises' as const, label: 'Promises' },
              { id: 'constituencies' as const, label: 'Constituencies' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Election Overview
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                This page provides a comprehensive view of the {stateName} Assembly Election. 
                Track promises from all competing parties, compare their positions on key issues, 
                and make an informed voting decision.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Use the tabs above to navigate between different sections: party manifestos, 
                promise comparisons, and constituency-level information.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'parties' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Party Manifestos</h3>
            <p className="text-gray-600">
              Party manifesto details and comparisons coming soon
            </p>
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-4">⚖️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Promise Comparison
            </h3>
            <p className="text-gray-600">
              Compare party promises side-by-side coming soon
            </p>
          </div>
        )}

        {activeTab === 'promises' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Promises</h3>
            <p className="text-gray-600">
              Browse and track all election promises coming soon
            </p>
          </div>
        )}

        {activeTab === 'constituencies' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Constituencies
            </h3>
            <p className="text-gray-600">
              Constituency-specific promises and information coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateElectionHub;
