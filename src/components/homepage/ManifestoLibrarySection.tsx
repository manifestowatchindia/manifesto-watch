/**
 * ManifestoLibrarySection - Manifesto Library section for the homepage
 * Phase 4 - STORY-061
 * Displays a grid of manifesto documents for download
 */

import React, { useState, useMemo, useCallback } from 'react';
import { ManifestoDownloadCard, ManifestoCardData } from './ManifestoDownloadCard';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

export type ManifestoCategory = 'central-2024' | 'state-2024' | 'archives';

export interface ManifestoLibrarySectionProps {
    /** Array of manifestos to display */
    manifestos?: ManifestoCardData[];
    /** Section title */
    title?: string;
    /** Section subtitle */
    subtitle?: string;
    /** Default active category */
    defaultCategory?: ManifestoCategory;
    /** Maximum manifestos to display per category */
    maxManifestos?: number;
    /** Show "Browse All" link */
    showBrowseAll?: boolean;
    /** Browse All URL */
    browseAllUrl?: string;
    /** Total manifesto count for the footer text */
    totalCount?: number;
    /** Download handler */
    onDownload?: (manifesto: ManifestoCardData) => void;
}

/**
 * Category tab data
 */
interface CategoryTab {
    id: ManifestoCategory;
    label: string;
    icon: string;
}

const CATEGORY_TABS: CategoryTab[] = [
    { id: 'central-2024', label: 'Central 2024', icon: '🏛️' },
    { id: 'state-2024', label: 'State 2024', icon: '🗺️' },
    { id: 'archives', label: 'Historical Archives', icon: '📚' },
];

/**
 * Default manifesto data
 */
const DEFAULT_MANIFESTOS: ManifestoCardData[] = [
    // Central 2024
    {
        id: 'bjp-ls-2024',
        partyName: 'BJP',
        partyColor: '#FF9933',
        electionName: 'Lok Sabha',
        electionYear: 2024,
        languages: ['English', 'Hindi'],
        documentUrl: '/manifestos/bjp-lok-sabha-2024.pdf',
        isWinner: true,
        downloadCount: 45000,
    },
    {
        id: 'inc-ls-2024',
        partyName: 'Indian National Congress',
        partyColor: '#00BFFF',
        electionName: 'Lok Sabha',
        electionYear: 2024,
        languages: ['English', 'Hindi'],
        documentUrl: '/manifestos/inc-lok-sabha-2024.pdf',
        downloadCount: 32000,
    },
    {
        id: 'aap-ls-2024',
        partyName: 'Aam Aadmi Party',
        partyColor: '#0066CC',
        electionName: 'Lok Sabha',
        electionYear: 2024,
        languages: ['English', 'Hindi', 'Punjabi'],
        documentUrl: '/manifestos/aap-lok-sabha-2024.pdf',
        downloadCount: 18000,
    },
    // State 2024
    {
        id: 'bjp-mh-2024',
        partyName: 'BJP',
        partyColor: '#FF9933',
        electionName: 'Maharashtra Assembly',
        electionYear: 2024,
        languages: ['English', 'Marathi'],
        documentUrl: '/manifestos/bjp-maharashtra-2024.pdf',
        isWinner: true,
        downloadCount: 12000,
    },
    {
        id: 'inc-hr-2024',
        partyName: 'Indian National Congress',
        partyColor: '#00BFFF',
        electionName: 'Haryana Assembly',
        electionYear: 2024,
        languages: ['English', 'Hindi'],
        documentUrl: '/manifestos/inc-haryana-2024.pdf',
        downloadCount: 8500,
    },
    {
        id: 'dmk-tn-2024',
        partyName: 'DMK',
        partyColor: '#D32F2F',
        electionName: 'Tamil Nadu By-election',
        electionYear: 2024,
        languages: ['English', 'Tamil'],
        documentUrl: null,
        downloadCount: 0,
    },
    // Archives
    {
        id: 'bjp-ls-2019',
        partyName: 'BJP',
        partyColor: '#FF9933',
        electionName: 'Lok Sabha',
        electionYear: 2019,
        languages: ['English', 'Hindi'],
        documentUrl: '/manifestos/bjp-lok-sabha-2019.pdf',
        isWinner: true,
        downloadCount: 89000,
    },
    {
        id: 'inc-ls-2019',
        partyName: 'Indian National Congress',
        partyColor: '#00BFFF',
        electionName: 'Lok Sabha',
        electionYear: 2019,
        languages: ['English', 'Hindi'],
        documentUrl: '/manifestos/inc-lok-sabha-2019.pdf',
        downloadCount: 56000,
    },
    {
        id: 'bjp-ls-2014',
        partyName: 'BJP',
        partyColor: '#FF9933',
        electionName: 'Lok Sabha',
        electionYear: 2014,
        languages: ['English', 'Hindi'],
        documentUrl: '/manifestos/bjp-lok-sabha-2014.pdf',
        isWinner: true,
        downloadCount: 125000,
    },
];

/**
 * Filter manifestos by category
 */
const filterByCategory = (manifestos: ManifestoCardData[], category: ManifestoCategory): ManifestoCardData[] => {
    switch (category) {
        case 'central-2024':
            return manifestos.filter(m => 
                m.electionYear === 2024 && 
                m.electionName.toLowerCase().includes('lok sabha')
            );
        case 'state-2024':
            return manifestos.filter(m => 
                m.electionYear === 2024 && 
                !m.electionName.toLowerCase().includes('lok sabha')
            );
        case 'archives':
            return manifestos.filter(m => m.electionYear < 2024);
        default:
            return manifestos;
    }
};

/**
 * ManifestoLibrarySection Component
 * Displays manifestos organized by category with download options
 */
export const ManifestoLibrarySection: React.FC<ManifestoLibrarySectionProps> = ({
    manifestos = DEFAULT_MANIFESTOS,
    title = 'Manifesto Library',
    subtitle = 'Access original party documents and manifestos',
    defaultCategory = 'central-2024',
    maxManifestos = 6,
    showBrowseAll = true,
    browseAllUrl = '/manifestos',
    totalCount = 250,
    onDownload,
}) => {
    const [activeCategory, setActiveCategory] = useState<ManifestoCategory>(defaultCategory);
    
    const { ref, isInView, hasAnimated } = useInViewAnimation({
        threshold: 0.1,
        triggerOnce: true,
    });

    // Filter manifestos by active category
    const filteredManifestos = useMemo(() => {
        const filtered = filterByCategory(manifestos, activeCategory);
        return filtered.slice(0, maxManifestos);
    }, [manifestos, activeCategory, maxManifestos]);

    // Handle category change
    const handleCategoryChange = useCallback((category: ManifestoCategory) => {
        setActiveCategory(category);
    }, []);

    // Handle manifesto download
    const handleDownload = useCallback((manifesto: ManifestoCardData) => {
        if (onDownload) {
            onDownload(manifesto);
        } else if (manifesto.documentUrl) {
            // Track download and open
            console.log(`Downloading manifesto: ${manifesto.id}`);
            window.open(manifesto.documentUrl, '_blank', 'noopener,noreferrer');
        }
    }, [onDownload]);

    // Handle Browse All click
    const handleBrowseAll = () => {
        window.location.href = browseAllUrl;
    };

    const shouldAnimate = isInView || hasAnimated;

    return (
        <section
            ref={ref}
            className="manifesto-library-section"
            data-testid="manifesto-library-section"
            aria-labelledby="manifesto-library-title"
            style={{
                padding: '64px 24px',
                backgroundColor: '#ffffff',
            }}
        >
            <div
                className="manifesto-library-container"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {/* Section Header */}
                <header
                    className="manifesto-library-header"
                    style={{
                        marginBottom: '32px',
                        textAlign: 'center',
                        opacity: shouldAnimate ? 1 : 0,
                        transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}
                >
                    <div
                        className="section-label"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginBottom: '12px',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '1.5rem',
                            }}
                            aria-hidden="true"
                        >
                            📜
                        </span>
                        <span
                            style={{
                                color: '#7c3aed',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            Manifesto Library
                        </span>
                    </div>

                    <h2
                        id="manifesto-library-title"
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                            fontWeight: 700,
                            color: '#1f2937',
                        }}
                    >
                        {title}
                    </h2>

                    <p
                        className="manifesto-library-subtitle"
                        style={{
                            margin: 0,
                            fontSize: '1.125rem',
                            color: '#6b7280',
                            maxWidth: '600px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        {subtitle}
                    </p>
                </header>

                {/* Category Tabs */}
                <div
                    className="category-tabs"
                    data-testid="manifesto-category-tabs"
                    role="tablist"
                    aria-label="Manifesto categories"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        marginBottom: '32px',
                        flexWrap: 'wrap',
                        opacity: shouldAnimate ? 1 : 0,
                        transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
                    }}
                >
                    {CATEGORY_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={activeCategory === tab.id}
                            aria-controls={`tabpanel-${tab.id}`}
                            data-testid={`category-tab-${tab.id}`}
                            onClick={() => handleCategoryChange(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                backgroundColor: activeCategory === tab.id ? '#7c3aed' : '#f3f4f6',
                                color: activeCategory === tab.id ? '#ffffff' : '#4b5563',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease, color 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                if (activeCategory !== tab.id) {
                                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeCategory !== tab.id) {
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }
                            }}
                        >
                            <span aria-hidden="true">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Manifestos Grid */}
                <div
                    className="manifestos-grid"
                    data-testid="manifestos-grid"
                    role="tabpanel"
                    id={`tabpanel-${activeCategory}`}
                    aria-labelledby={`category-tab-${activeCategory}`}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '24px',
                        marginBottom: showBrowseAll ? '40px' : '0',
                    }}
                >
                    {filteredManifestos.length > 0 ? (
                        filteredManifestos.map((manifesto, index) => (
                            <div
                                key={manifesto.id}
                                style={{
                                    opacity: shouldAnimate ? 1 : 0,
                                    transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                                    transition: `opacity 0.6s ease ${0.15 + index * 0.1}s, transform 0.6s ease ${0.15 + index * 0.1}s`,
                                }}
                            >
                                <ManifestoDownloadCard
                                    manifesto={manifesto}
                                    onDownload={handleDownload}
                                    testId={`manifesto-card-${manifesto.id}`}
                                />
                            </div>
                        ))
                    ) : (
                        <div
                            className="no-manifestos"
                            data-testid="no-manifestos-message"
                            style={{
                                gridColumn: '1 / -1',
                                padding: '48px 24px',
                                textAlign: 'center',
                                color: '#6b7280',
                            }}
                        >
                            <span style={{ fontSize: '2rem' }}>📄</span>
                            <p style={{ margin: '12px 0 0 0' }}>
                                No manifestos available in this category yet.
                            </p>
                        </div>
                    )}
                </div>

                {/* Browse All Link */}
                {showBrowseAll && (
                    <div
                        className="manifesto-library-footer"
                        style={{
                            textAlign: 'center',
                            opacity: shouldAnimate ? 1 : 0,
                            transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s',
                        }}
                    >
                        <button
                            onClick={handleBrowseAll}
                            className="browse-all-btn"
                            data-testid="manifesto-browse-all"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                backgroundColor: '#7c3aed',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#6d28d9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#7c3aed';
                            }}
                        >
                            <span>Browse All {totalCount}+ Manifestos</span>
                            <span aria-hidden="true">→</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ManifestoLibrarySection;
