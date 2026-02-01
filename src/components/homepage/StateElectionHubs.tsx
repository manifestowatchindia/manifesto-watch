/**
 * StateElectionHubs - Main container for State Election Hub Cards
 * Phase 4 - STORY-058
 * DeKoder Bihar-style state election hub with multiple content sections
 */

import React, { useState, useRef, useEffect } from 'react';
import { StateHubCard } from './StateHubCard';
import { HubSectionGrid } from './HubSectionGrid';
import { HubContentCarousel } from './HubContentCarousel';

/**
 * State Hub data structure
 */
export interface StateHub {
    stateCode: string;
    stateName: string;
    tagline: string;
    heroImageUrl: string;
    electionDate: string;
    rulingParty: string;
    rulingPartyColor: string;
    totalSeats: number;
    contentSections: HubSection[];
    quickLinks: QuickLink[];
    featuredContent: HubContent[];
}

export interface HubSection {
    id: string;
    name: string;
    icon: string;
    thumbnailUrl: string;
    contentCount: number;
    latestContentDate: string;
}

export interface HubContent {
    id: string;
    type: 'video' | 'article' | 'infographic';
    title: string;
    thumbnailUrl: string;
    duration?: string;
    isNew: boolean;
}

export interface QuickLink {
    id: string;
    label: string;
    icon: string;
    url: string;
}

export interface StateElectionHubsProps {
    /** Array of state hubs to display */
    states?: StateHub[];
    /** Section title */
    title?: string;
    /** Section subtitle */
    subtitle?: string;
}

/**
 * Default mock state hubs data
 * Will be replaced with API data
 */
const DEFAULT_STATE_HUBS: StateHub[] = [
    {
        stateCode: 'KL',
        stateName: 'Kerala',
        tagline: 'Ideas, Impact & Influences shaping Kerala',
        heroImageUrl: '/static/images/states/kerala-bg.jpg',
        electionDate: '2026-04-15',
        rulingParty: 'LDF',
        rulingPartyColor: '#E53935',
        totalSeats: 140,
        contentSections: [
            { id: 'on-record', name: 'On Record', icon: '📋', thumbnailUrl: '/static/images/sections/record.jpg', contentCount: 24, latestContentDate: '2025-01-10' },
            { id: 'on-ground', name: 'On Ground', icon: '🗺️', thumbnailUrl: '/static/images/sections/ground.jpg', contentCount: 18, latestContentDate: '2025-01-09' },
            { id: 'snippets', name: 'Snippets', icon: '✂️', thumbnailUrl: '/static/images/sections/snippets.jpg', contentCount: 45, latestContentDate: '2025-01-11' },
            { id: 'gen-z', name: 'Gen Z Voice', icon: '🎤', thumbnailUrl: '/static/images/sections/genz.jpg', contentCount: 12, latestContentDate: '2025-01-08' },
            { id: 'specials', name: 'Specials', icon: '⭐', thumbnailUrl: '/static/images/sections/specials.jpg', contentCount: 8, latestContentDate: '2025-01-05' },
        ],
        quickLinks: [
            { id: 'manifestos', label: 'Manifestos', icon: '📄', url: '/states/kerala/manifestos' },
            { id: 'promises', label: 'Promises', icon: '✓', url: '/states/kerala/promises' },
            { id: 'news', label: 'News', icon: '📰', url: '/states/kerala/news' },
            { id: 'predictions', label: 'Predictions', icon: '📊', url: '/states/kerala/predictions' },
        ],
        featuredContent: [
            { id: 'fc1', type: 'video', title: 'Kerala\'s Infrastructure Push: What\'s Delivered?', thumbnailUrl: '/static/images/content/kerala-infra.jpg', duration: '12:34', isNew: true },
            { id: 'fc2', type: 'article', title: 'LDF vs UDF: Manifesto Comparison 2026', thumbnailUrl: '/static/images/content/kerala-compare.jpg', isNew: true },
            { id: 'fc3', type: 'infographic', title: 'Kerala Promise Tracker', thumbnailUrl: '/static/images/content/kerala-tracker.jpg', isNew: false },
        ],
    },
    {
        stateCode: 'TN',
        stateName: 'Tamil Nadu',
        tagline: 'The Political Powerhouse of the South',
        heroImageUrl: '/static/images/states/tamilnadu-bg.jpg',
        electionDate: '2026-05-01',
        rulingParty: 'DMK',
        rulingPartyColor: '#D32F2F',
        totalSeats: 234,
        contentSections: [
            { id: 'on-record', name: 'On Record', icon: '📋', thumbnailUrl: '/static/images/sections/record.jpg', contentCount: 32, latestContentDate: '2025-01-10' },
            { id: 'on-ground', name: 'On Ground', icon: '🗺️', thumbnailUrl: '/static/images/sections/ground.jpg', contentCount: 22, latestContentDate: '2025-01-09' },
            { id: 'snippets', name: 'Snippets', icon: '✂️', thumbnailUrl: '/static/images/sections/snippets.jpg', contentCount: 56, latestContentDate: '2025-01-11' },
            { id: 'gen-z', name: 'Gen Z Voice', icon: '🎤', thumbnailUrl: '/static/images/sections/genz.jpg', contentCount: 15, latestContentDate: '2025-01-08' },
            { id: 'specials', name: 'Specials', icon: '⭐', thumbnailUrl: '/static/images/sections/specials.jpg', contentCount: 10, latestContentDate: '2025-01-05' },
        ],
        quickLinks: [
            { id: 'manifestos', label: 'Manifestos', icon: '📄', url: '/states/tamil-nadu/manifestos' },
            { id: 'promises', label: 'Promises', icon: '✓', url: '/states/tamil-nadu/promises' },
            { id: 'news', label: 'News', icon: '📰', url: '/states/tamil-nadu/news' },
            { id: 'predictions', label: 'Predictions', icon: '📊', url: '/states/tamil-nadu/predictions' },
        ],
        featuredContent: [
            { id: 'fc1', type: 'video', title: 'DMK\'s Dravidian Model: 2 Years On', thumbnailUrl: '/static/images/content/tn-dravidian.jpg', duration: '15:20', isNew: true },
            { id: 'fc2', type: 'article', title: 'Tamil Nadu: Key Election Issues 2026', thumbnailUrl: '/static/images/content/tn-issues.jpg', isNew: false },
        ],
    },
    {
        stateCode: 'WB',
        stateName: 'West Bengal',
        tagline: 'Where Culture Meets Politics',
        heroImageUrl: '/static/images/states/westbengal-bg.jpg',
        electionDate: '2026-05-15',
        rulingParty: 'TMC',
        rulingPartyColor: '#00BCD4',
        totalSeats: 294,
        contentSections: [
            { id: 'on-record', name: 'On Record', icon: '📋', thumbnailUrl: '/static/images/sections/record.jpg', contentCount: 28, latestContentDate: '2025-01-10' },
            { id: 'on-ground', name: 'On Ground', icon: '🗺️', thumbnailUrl: '/static/images/sections/ground.jpg', contentCount: 20, latestContentDate: '2025-01-09' },
            { id: 'snippets', name: 'Snippets', icon: '✂️', thumbnailUrl: '/static/images/sections/snippets.jpg', contentCount: 38, latestContentDate: '2025-01-11' },
            { id: 'gen-z', name: 'Gen Z Voice', icon: '🎤', thumbnailUrl: '/static/images/sections/genz.jpg', contentCount: 10, latestContentDate: '2025-01-08' },
            { id: 'specials', name: 'Specials', icon: '⭐', thumbnailUrl: '/static/images/sections/specials.jpg', contentCount: 6, latestContentDate: '2025-01-05' },
        ],
        quickLinks: [
            { id: 'manifestos', label: 'Manifestos', icon: '📄', url: '/states/west-bengal/manifestos' },
            { id: 'promises', label: 'Promises', icon: '✓', url: '/states/west-bengal/promises' },
            { id: 'news', label: 'News', icon: '📰', url: '/states/west-bengal/news' },
            { id: 'predictions', label: 'Predictions', icon: '📊', url: '/states/west-bengal/predictions' },
        ],
        featuredContent: [
            { id: 'fc1', type: 'article', title: 'TMC\'s Bengal Model: Promise vs Reality', thumbnailUrl: '/static/images/content/wb-model.jpg', isNew: true },
            { id: 'fc2', type: 'video', title: 'West Bengal Ground Report', thumbnailUrl: '/static/images/content/wb-ground.jpg', duration: '18:45', isNew: false },
        ],
    },
    {
        stateCode: 'AS',
        stateName: 'Assam',
        tagline: 'Gateway to the Northeast',
        heroImageUrl: '/static/images/states/assam-bg.jpg',
        electionDate: '2026-04-20',
        rulingParty: 'BJP',
        rulingPartyColor: '#FF9800',
        totalSeats: 126,
        contentSections: [
            { id: 'on-record', name: 'On Record', icon: '📋', thumbnailUrl: '/static/images/sections/record.jpg', contentCount: 16, latestContentDate: '2025-01-10' },
            { id: 'on-ground', name: 'On Ground', icon: '🗺️', thumbnailUrl: '/static/images/sections/ground.jpg', contentCount: 12, latestContentDate: '2025-01-09' },
            { id: 'snippets', name: 'Snippets', icon: '✂️', thumbnailUrl: '/static/images/sections/snippets.jpg', contentCount: 25, latestContentDate: '2025-01-11' },
            { id: 'gen-z', name: 'Gen Z Voice', icon: '🎤', thumbnailUrl: '/static/images/sections/genz.jpg', contentCount: 8, latestContentDate: '2025-01-08' },
            { id: 'specials', name: 'Specials', icon: '⭐', thumbnailUrl: '/static/images/sections/specials.jpg', contentCount: 5, latestContentDate: '2025-01-05' },
        ],
        quickLinks: [
            { id: 'manifestos', label: 'Manifestos', icon: '📄', url: '/states/assam/manifestos' },
            { id: 'promises', label: 'Promises', icon: '✓', url: '/states/assam/promises' },
            { id: 'news', label: 'News', icon: '📰', url: '/states/assam/news' },
            { id: 'predictions', label: 'Predictions', icon: '📊', url: '/states/assam/predictions' },
        ],
        featuredContent: [
            { id: 'fc1', type: 'video', title: 'BJP\'s Assam: Northeast Success Story?', thumbnailUrl: '/static/images/content/assam-bjp.jpg', duration: '10:15', isNew: true },
            { id: 'fc2', type: 'article', title: 'Assam 2026: Key Battlegrounds', thumbnailUrl: '/static/images/content/assam-battle.jpg', isNew: false },
        ],
    },
];

/**
 * Calculate days until election
 */
const getDaysUntil = (dateString: string): number => {
    const targetDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * State Election Hubs Section
 * DeKoder Bihar-style layout with hub cards and content sections
 */
export const StateElectionHubs: React.FC<StateElectionHubsProps> = ({
    states = DEFAULT_STATE_HUBS,
    title = 'State Election Hubs 2026',
    subtitle = 'Deep dive into upcoming state assembly elections',
}) => {
    const [selectedState, setSelectedState] = useState<StateHub>(states[0]);
    const [isExpanded, setIsExpanded] = useState(false);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Check scroll availability
    const checkScrollButtons = () => {
        const container = cardsContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth - 10
            );
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const container = cardsContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            window.addEventListener('resize', checkScrollButtons);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollButtons);
            }
            window.removeEventListener('resize', checkScrollButtons);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        const container = cardsContainerRef.current;
        if (container) {
            const scrollAmount = 300;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const handleStateSelect = (state: StateHub) => {
        setSelectedState(state);
        setIsExpanded(true);
    };

    return (
        <section 
            className="state-election-hubs py-12 md:py-20"
            aria-labelledby="state-hubs-title"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <header className="text-center mb-8 md:mb-12">
                    <h2 
                        id="state-hubs-title"
                        className="text-3xl md:text-4xl font-bold mb-3"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {title}
                    </h2>
                    <p 
                        className="text-lg md:text-xl max-w-2xl mx-auto"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {subtitle}
                    </p>
                </header>

                {/* State Hub Cards - Horizontal Scrollable */}
                <div className="relative mb-8 md:mb-12">
                    {/* Scroll Left Button */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                            style={{
                                backgroundColor: 'var(--color-bg-elevated)',
                                color: 'var(--color-text-primary)',
                            }}
                            aria-label="Scroll states left"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Cards Container */}
                    <div
                        ref={cardsContainerRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-2 -mx-2 md:justify-center"
                        style={{ scrollSnapType: 'x mandatory' }}
                        role="listbox"
                        aria-label="Select a state to view election hub"
                    >
                        {states.map((state) => (
                            <StateHubCard
                                key={state.stateCode}
                                state={state}
                                daysUntil={getDaysUntil(state.electionDate)}
                                isSelected={selectedState.stateCode === state.stateCode}
                                onSelect={() => handleStateSelect(state)}
                            />
                        ))}
                    </div>

                    {/* Scroll Right Button */}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                            style={{
                                backgroundColor: 'var(--color-bg-elevated)',
                                color: 'var(--color-text-primary)',
                            }}
                            aria-label="Scroll states right"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Expanded State Hub Content */}
                {isExpanded && selectedState && (
                    <div 
                        className="state-hub-expanded animate-fade-in"
                        role="region"
                        aria-label={`${selectedState.stateName} election hub details`}
                    >
                        {/* State Header with Tagline */}
                        <div 
                            className="rounded-xl p-6 md:p-8 mb-6"
                            style={{
                                background: `linear-gradient(135deg, ${selectedState.rulingPartyColor}15, var(--color-bg-card))`,
                                borderLeft: `4px solid ${selectedState.rulingPartyColor}`,
                            }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h3 
                                        className="text-2xl md:text-3xl font-bold mb-2"
                                        style={{ color: 'var(--color-text-primary)' }}
                                    >
                                        {selectedState.stateName} Dekoded
                                    </h3>
                                    <p 
                                        className="text-lg italic"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        "{selectedState.tagline}"
                                    </p>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {selectedState.quickLinks.map((link) => (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                                            style={{
                                                backgroundColor: 'var(--color-bg-elevated)',
                                                color: 'var(--color-text-primary)',
                                            }}
                                        >
                                            <span>{link.icon}</span>
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content Sections Grid */}
                        <HubSectionGrid 
                            sections={selectedState.contentSections}
                            stateName={selectedState.stateName}
                            stateCode={selectedState.stateCode}
                        />

                        {/* Featured Content Carousel */}
                        {selectedState.featuredContent.length > 0 && (
                            <div className="mt-8">
                                <HubContentCarousel 
                                    content={selectedState.featuredContent}
                                    stateName={selectedState.stateName}
                                />
                            </div>
                        )}

                        {/* View Full Coverage CTA */}
                        <div className="text-center mt-8">
                            <a
                                href={`/states/${selectedState.stateCode.toLowerCase()}`}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
                                style={{
                                    background: 'var(--gradient-primary)',
                                    color: 'white',
                                }}
                            >
                                View Full {selectedState.stateName} Coverage
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                )}

                {/* Collapsed hint */}
                {!isExpanded && (
                    <p 
                        className="text-center text-sm"
                        style={{ color: 'var(--color-text-tertiary)' }}
                    >
                        Click on a state card to explore detailed election coverage
                    </p>
                )}
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default StateElectionHubs;
