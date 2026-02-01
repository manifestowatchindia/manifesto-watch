import React, { useState, useEffect, useMemo } from 'react';
import { HeroSectionOverlay, UpcomingElection, TopPromisesSection, StateElectionHubs, InteractiveIndiaMap, AboutManifestoWatch, SectionErrorBoundary, HomepageSEO } from '../../components/homepage';
import { electionService } from '../../services/election/electionService';
import { Election } from '../../lib/types';

/**
 * Transform Election data to UpcomingElection format for HeroSection
 */
const transformToUpcomingElection = (election: Election): UpcomingElection => ({
    id: election.id,
    state: election.state,
    stateCode: election.regionCode || election.state.slice(0, 2).toUpperCase(),
    electionType: election.electionType === 'lok_sabha' ? 'lok_sabha' : 'assembly',
    electionDate: election.date,
    status: new Date(election.date) > new Date() ? 'upcoming' : 'completed',
    totalSeats: election.constituencies,
});

/**
 * Default upcoming elections for fallback
 * (Used when API is unavailable)
 */
const DEFAULT_UPCOMING_ELECTIONS: UpcomingElection[] = [
    {
        id: 'kerala-2026',
        state: 'Kerala',
        stateCode: 'KL',
        electionType: 'assembly',
        electionDate: '2026-04-15',
        status: 'upcoming',
        totalSeats: 140,
    },
    {
        id: 'tamil-nadu-2026',
        state: 'Tamil Nadu',
        stateCode: 'TN',
        electionType: 'assembly',
        electionDate: '2026-05-01',
        status: 'upcoming',
        totalSeats: 234,
    },
    {
        id: 'west-bengal-2026',
        state: 'West Bengal',
        stateCode: 'WB',
        electionType: 'assembly',
        electionDate: '2026-05-15',
        status: 'upcoming',
        totalSeats: 294,
    },
    {
        id: 'assam-2026',
        state: 'Assam',
        stateCode: 'AS',
        electionType: 'assembly',
        electionDate: '2026-04-20',
        status: 'upcoming',
        totalSeats: 126,
    },
];

export const Homepage: React.FC = () => {
    const [elections, setElections] = useState<Election[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Fetch active elections (within 365 days for more options)
                const fetchedElections = await electionService.getActiveElections(365);

                if (fetchedElections && fetchedElections.length > 0) {
                    setElections(fetchedElections);
                } else {
                    setElections([]);
                }
            } catch (err) {
                console.error('Failed to fetch elections:', err);
                setError('Unable to load election information');
                setElections([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchElections();
    }, []);

    // Transform elections for HeroSection
    const upcomingElections: UpcomingElection[] = useMemo(() => {
        if (elections.length > 0) {
            return elections.map(transformToUpcomingElection);
        }
        // Use default elections as fallback
        return DEFAULT_UPCOMING_ELECTIONS;
    }, [elections]);

    return (
        <>
            <HomepageSEO electionContext="Kerala, Tamil Nadu, West Bengal Elections 2026" />
            
            {/* Hero Section with Multi-Election Countdown */}
            {isLoading ? (
                <section className="bg-black py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-center items-center min-h-[500px]" role="status" aria-label="Loading election information">
                            <div className="animate-pulse space-y-6 w-full max-w-4xl">
                                {/* Skeleton for hero content */}
                                <div className="h-8 bg-white/10 rounded w-1/3 mx-auto"></div>
                                <div className="h-16 bg-white/10 rounded w-2/3 mx-auto"></div>
                                <div className="h-6 bg-white/10 rounded w-1/2 mx-auto"></div>
                                <div className="flex justify-center gap-4 mt-8">
                                    <div className="h-12 bg-white/10 rounded w-40"></div>
                                    <div className="h-12 bg-white/10 rounded w-40"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <HeroSectionOverlay
                    backgroundImage="/static/images/democracy_v2.jpg"
                    tagline="Track Political Promises.
Hold Leaders Accountable."
                    subtitle="India's most trusted platform for monitoring election manifestos and tracking promise delivery across all states."
                    primaryCTA={{
                        text: 'Track Your Election',
                        link: '/tracking',
                        icon: '🗳️',
                    }}
                    secondaryCTA={{
                        text: 'Compare Parties',
                        link: '/compare',
                        icon: '⚖️',
                    }}
                    searchPlaceholder="Search your state or constituency..."
                    voiceSearchEnabled={true}
                    stats={[
                        { icon: '📍', value: '28+', label: 'States Tracked' },
                        { icon: '📋', value: '100', label: 'Promises Monitored' },
                        { icon: '🎯', value: '50+', label: 'Parties Covered' },
                        { icon: '✅', value: '100%', label: 'Non-Partisan' },
                    ]}
                    parallaxEnabled={true}
                />
            )}

            {/* Top Promises by Category (STORY-057) */}
            <div className="bg-black">
                <TopPromisesSection />
            </div>

            {/* State Election Hub Cards (STORY-058) */}
            <div className="bg-black">
                <StateElectionHubs />
            </div>

            {/* Interactive India Map (STORY-059) */}
            <div className="bg-black">
                <InteractiveIndiaMap />
            </div>

            {/* About ManifestoWatch Trust Section (STORY-068) */}
            <div className="bg-black">
                <SectionErrorBoundary sectionName="about">
                    <AboutManifestoWatch />
                </SectionErrorBoundary>
            </div>
        </>
    );
};