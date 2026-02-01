/**
 * HubSectionGrid - Grid of content sections for a state hub
 * Phase 4 - STORY-058
 * Displays DeKoder-style sections: On Record, On Ground, Snippets, Gen Z, Specials
 */

import React from 'react';
import type { HubSection } from './StateElectionHubs';

export interface HubSectionGridProps {
    /** Array of hub sections to display */
    sections: HubSection[];
    /** State name for accessibility */
    stateName: string;
    /** State code for URLs */
    stateCode: string;
}

/**
 * Format date relative to now
 */
const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
};

/**
 * Section color map for visual variety
 */
const SECTION_COLORS: Record<string, string> = {
    'on-record': 'var(--color-accent-primary)',
    'on-ground': 'var(--color-accent-tertiary)',
    'snippets': '#8B5CF6',
    'gen-z': '#EC4899',
    'specials': '#F59E0B',
};

/**
 * Hub Section Grid Component
 * Displays content sections in a responsive grid
 */
export const HubSectionGrid: React.FC<HubSectionGridProps> = ({
    sections,
    stateName,
    stateCode,
}) => {
    return (
        <div 
            className="hub-section-grid"
            role="navigation"
            aria-label={`${stateName} content sections`}
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                {sections.map((section) => {
                    const sectionColor = SECTION_COLORS[section.id] || 'var(--color-accent-primary)';
                    const isNew = new Date(section.latestContentDate) > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

                    return (
                        <a
                            key={section.id}
                            href={`/states/${stateCode.toLowerCase()}/${section.id}`}
                            className="hub-section-card group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{
                                backgroundColor: 'var(--color-bg-card)',
                            }}
                        >
                            {/* Section Icon Background */}
                            <div 
                                className="h-20 md:h-24 relative flex items-center justify-center"
                                style={{
                                    background: `linear-gradient(135deg, ${sectionColor}20, ${sectionColor}05)`,
                                }}
                            >
                                {/* Large Emoji Icon */}
                                <span 
                                    className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-110"
                                    role="img"
                                    aria-hidden="true"
                                >
                                    {section.icon}
                                </span>

                                {/* New Content Badge */}
                                {isNew && (
                                    <span 
                                        className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
                                        style={{ backgroundColor: sectionColor }}
                                        aria-label="New content available"
                                    />
                                )}
                            </div>

                            {/* Section Info */}
                            <div className="p-3">
                                <h4 
                                    className="font-semibold text-sm md:text-base mb-1 truncate"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {section.name}
                                </h4>
                                <div 
                                    className="flex items-center justify-between text-xs"
                                    style={{ color: 'var(--color-text-tertiary)' }}
                                >
                                    <span>{section.contentCount} items</span>
                                    <span>{formatRelativeDate(section.latestContentDate)}</span>
                                </div>
                            </div>

                            {/* Hover accent line */}
                            <div 
                                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                                style={{ backgroundColor: sectionColor }}
                            />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default HubSectionGrid;
