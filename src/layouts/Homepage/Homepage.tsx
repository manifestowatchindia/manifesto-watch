import React from 'react';
import { HeroSectionOverlay, TopPromisesSection, StateElectionHubs, InteractiveIndiaMap, AboutManifestoWatch, SectionErrorBoundary, HomepageSEO } from '../../components/homepage';

export const Homepage: React.FC = () => {
    const isLoading = false;

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