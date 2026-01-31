import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { ExploreTopTopics } from './ExploreTopTopics';
import { UpcomingElections } from './UpcomingElections';
import { ElectionCountdown } from '../../components/election/ElectionCountdown';
import { electionService } from '../../services/election/electionService';
import { Election } from '../../lib/types';

export const Homepage: React.FC = () => {
    const [featuredElection, setFeaturedElection] = useState<Election | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedElection = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Try to get user's state for personalization (with error handling)
                let userState: string | null = null;
                try {
                    userState = await electionService.getUserState();
                } catch (geoError) {
                    // Silently fail geolocation - not critical
                    console.log('Geolocation unavailable, showing default election');
                }

                // Fetch active elections (within 180 days)
                const elections = await electionService.getActiveElections(180, userState || undefined);

                if (elections && elections.length > 0) {
                    // Prioritize user's state election if available
                    const userStateElection = userState 
                        ? elections.find(e => e.state.toLowerCase() === userState!.toLowerCase())
                        : null;

                    // Use user's state election or closest election
                    setFeaturedElection(userStateElection || elections[0]);
                } else {
                    setFeaturedElection(null);
                }
            } catch (err) {
                console.error('Failed to fetch featured election:', err);
                setError('Unable to load election information');
                setFeaturedElection(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedElection();
    }, []);

    return (
        <>
            <SEO 
                title="Manifesto Watch - Track Political Manifestos & Promises in India"
                description="Track and monitor political party manifestos, election promises, and their implementation across Indian states. Promoting transparency and accountability in Indian democracy."
                canonicalUrl="https://www.manifestowatch.in/"
            />
            
            {/* Featured Election Countdown Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white py-8 md:py-12">
                <div className="container mx-auto px-4">
                    {isLoading && (
                        <div className="flex justify-center items-center min-h-[400px]" role="status" aria-label="Loading election information">
                            <div className="animate-pulse space-y-4 w-full max-w-4xl">
                                {/* Skeleton for countdown */}
                                <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto"></div>
                                <div className="h-64 bg-gray-200 rounded-lg"></div>
                                <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto"></div>
                            </div>
                        </div>
                    )}

                    {error && !isLoading && (
                        <div 
                            className="max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center"
                            role="alert"
                            aria-live="polite"
                        >
                            <p className="text-red-800 font-semibold mb-2">⚠️ {error}</p>
                            <p className="text-red-600 text-sm">
                                Please try refreshing the page or check back later.
                            </p>
                        </div>
                    )}

                    {!isLoading && !error && featuredElection && (
                        <div className="max-w-6xl mx-auto">
                            <ElectionCountdown election={featuredElection} priority="primary" />
                        </div>
                    )}

                    {!isLoading && !error && !featuredElection && (
                        <div className="max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                            <p className="text-blue-800 font-semibold mb-2">📅 No Upcoming Elections</p>
                            <p className="text-blue-600 text-sm">
                                There are no elections scheduled in the near future. Check back later for updates!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <ExploreTopTopics />
            <UpcomingElections />
        </>
    );
};