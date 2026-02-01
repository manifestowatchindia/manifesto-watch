/**
 * DataHubSection - Data Hub section for the homepage
 * Phase 4 - STORY-060
 * Displays a grid of data tools for election analysis
 */

import React, { useMemo, useCallback } from 'react';
import { DataToolCard, DataTool } from './DataToolCard';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

export interface DataHubSectionProps {
    /** Array of data tools to display */
    tools?: DataTool[];
    /** Section title */
    title?: string;
    /** Section subtitle */
    subtitle?: string;
    /** Maximum tools to display */
    maxTools?: number;
    /** Show "View All" link */
    showViewAll?: boolean;
    /** View All URL */
    viewAllUrl?: string;
    /** Click handler for tools */
    onToolClick?: (tool: DataTool) => void;
}

/**
 * Default data tools for the Data Hub
 */
const DEFAULT_DATA_TOOLS: DataTool[] = [
    {
        id: 'winner-maps',
        name: 'Winner Maps',
        description: 'See which party won each constituency with interactive maps',
        icon: '🗺️',
        previewImageUrl: '/static/images/tools/winner-maps.jpg',
        path: '/data-hub/winner-maps',
        isNew: true,
    },
    {
        id: 'voter-turnout',
        name: 'Voter Turnout',
        description: 'Historical turnout trends by state and constituency',
        icon: '📈',
        previewImageUrl: '/static/images/tools/voter-turnout.jpg',
        path: '/data-hub/voter-turnout',
    },
    {
        id: 'party-performance',
        name: 'Party Performance',
        description: 'Track party success across multiple elections',
        icon: '📊',
        previewImageUrl: '/static/images/tools/party-performance.jpg',
        path: '/data-hub/party-performance',
    },
    {
        id: 'promise-tracker',
        name: 'Promise Tracker',
        description: 'Monitor manifesto delivery rates by party and government',
        icon: '✅',
        previewImageUrl: '/static/images/tools/promise-tracker.jpg',
        path: '/promises',
    },
    {
        id: 'seat-calculator',
        name: 'Seat Calculator',
        description: 'Predict seats from vote share using electoral data',
        icon: '🧮',
        previewImageUrl: '/static/images/tools/seat-calculator.jpg',
        path: '/data-hub/seat-calculator',
        isNew: true,
    },
    {
        id: 'historical-data',
        name: 'Historical Data',
        description: 'Election results and statistics since 1951',
        icon: '📚',
        previewImageUrl: '/static/images/tools/historical-data.jpg',
        path: '/data-hub/historical',
    },
];

/**
 * Data Hub Section Component
 * Displays a grid of data analysis tools
 */
export const DataHubSection: React.FC<DataHubSectionProps> = ({
    tools = DEFAULT_DATA_TOOLS,
    title = 'Data Hub',
    subtitle = 'Deep dive into India\'s biggest election database',
    maxTools = 6,
    showViewAll = true,
    viewAllUrl = '/data-hub',
    onToolClick,
}) => {
    const { ref, isInView, hasAnimated } = useInViewAnimation({
        threshold: 0.1,
        triggerOnce: true,
    });

    // Limit displayed tools
    const displayedTools = useMemo(() => {
        return tools.slice(0, maxTools);
    }, [tools, maxTools]);

    // Handle tool click
    const handleToolClick = useCallback((tool: DataTool) => {
        if (onToolClick) {
            onToolClick(tool);
        } else {
            // Default navigation
            window.location.href = tool.path;
        }
    }, [onToolClick]);

    // Handle View All click
    const handleViewAllClick = () => {
        window.location.href = viewAllUrl;
    };

    const shouldAnimate = isInView || hasAnimated;

    return (
        <section
            ref={ref}
            className="data-hub-section"
            data-testid="data-hub-section"
            aria-labelledby="data-hub-title"
            style={{
                padding: '64px 24px',
                backgroundColor: '#f8fafc',
            }}
        >
            <div
                className="data-hub-container"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {/* Section Header */}
                <header
                    className="data-hub-header"
                    style={{
                        marginBottom: '40px',
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
                            📊
                        </span>
                        <span
                            style={{
                                color: '#3b82f6',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            Data Hub
                        </span>
                    </div>

                    <h2
                        id="data-hub-title"
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
                        className="data-hub-subtitle"
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

                {/* Tools Grid */}
                <div
                    className="data-hub-grid"
                    data-testid="data-hub-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px',
                        marginBottom: showViewAll ? '40px' : '0',
                    }}
                >
                    {displayedTools.map((tool, index) => (
                        <div
                            key={tool.id}
                            style={{
                                opacity: shouldAnimate ? 1 : 0,
                                transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                                transition: `opacity 0.6s ease ${0.1 + index * 0.1}s, transform 0.6s ease ${0.1 + index * 0.1}s`,
                            }}
                        >
                            <DataToolCard
                                tool={tool}
                                onClick={handleToolClick}
                                testId={`data-tool-card-${tool.id}`}
                            />
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                {showViewAll && tools.length > maxTools && (
                    <div
                        className="data-hub-footer"
                        style={{
                            textAlign: 'center',
                            opacity: shouldAnimate ? 1 : 0,
                            transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s',
                        }}
                    >
                        <button
                            onClick={handleViewAllClick}
                            className="view-all-btn"
                            data-testid="data-hub-view-all"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                backgroundColor: '#3b82f6',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#2563eb';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#3b82f6';
                            }}
                        >
                            <span>Explore All Data Tools</span>
                            <span aria-hidden="true">→</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DataHubSection;
