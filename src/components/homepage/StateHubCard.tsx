/**
 * StateHubCard - Individual state election hub card
 * Phase 4 - STORY-058
 * Displays state info with election date, ruling party, and seats
 */

import React from 'react';
import type { StateHub } from './StateElectionHubs';

export interface StateHubCardProps {
    /** State hub data */
    state: StateHub;
    /** Days until election */
    daysUntil: number;
    /** Whether this card is currently selected */
    isSelected: boolean;
    /** Callback when card is selected */
    onSelect: () => void;
}

/**
 * State emoji map for visual identification
 */
const STATE_EMOJIS: Record<string, string> = {
    KL: '🌴',
    TN: '🏛️',
    WB: '🐯',
    AS: '🦏',
    KA: '🏰',
    MH: '🌊',
    UP: '🕌',
    RJ: '🏜️',
    GJ: '🦁',
    MP: '🐅',
    BR: '🏞️',
    AP: '🌿',
};

/**
 * Format date for display
 */
const formatElectionDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

/**
 * State Hub Card Component
 * Shows state info with visual appeal and selection state
 */
export const StateHubCard: React.FC<StateHubCardProps> = ({
    state,
    daysUntil,
    isSelected,
    onSelect,
}) => {
    const stateEmoji = STATE_EMOJIS[state.stateCode] || '🗳️';
    const isUrgent = daysUntil <= 100;

    return (
        <button
            onClick={onSelect}
            className={`
                state-hub-card relative flex-shrink-0 w-64 md:w-72 rounded-xl overflow-hidden
                transition-all duration-300 cursor-pointer text-left
                ${isSelected ? 'ring-2 ring-offset-2 scale-105' : 'hover:scale-102'}
            `}
            style={{
                scrollSnapAlign: 'start',
                backgroundColor: 'var(--color-bg-card)',
                boxShadow: isSelected ? 'var(--shadow-accent)' : 'var(--shadow-md)',
                // Ring styles handled by Tailwind classes above
            }}
            role="option"
            aria-selected={isSelected}
            aria-label={`${state.stateName} election hub - ${daysUntil} days until election`}
        >
            {/* State Image Background with Overlay */}
            <div 
                className="h-32 md:h-40 relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${state.rulingPartyColor}, ${state.rulingPartyColor}99)`,
                }}
            >
                {/* State Emoji as visual */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 text-7xl md:text-8xl">
                    {stateEmoji}
                </div>
                
                {/* Overlay gradient */}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                    }}
                />
                
                {/* State name and election type */}
                <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-xs uppercase tracking-wider text-white/80 mb-1">
                        Assembly 2026
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                        <span>{stateEmoji}</span>
                        {state.stateName}
                    </h3>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                    <div 
                        className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-accent-tertiary)' }}
                    >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-4">
                {/* Election Date & Countdown */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm">
                        <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            style={{ color: 'var(--color-text-tertiary)' }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span style={{ color: 'var(--color-text-secondary)' }}>
                            {formatElectionDate(state.electionDate)}
                        </span>
                    </div>
                    <span 
                        className={`text-sm font-bold px-2 py-1 rounded ${isUrgent ? 'animate-pulse' : ''}`}
                        style={{
                            backgroundColor: isUrgent ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                            color: isUrgent ? '#ef4444' : '#22c55e',
                        }}
                    >
                        {daysUntil} days
                    </span>
                </div>

                {/* Ruling Party & Seats */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: state.rulingPartyColor }}
                        />
                        <span 
                            className="text-sm font-medium"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Ruling: {state.rulingParty}
                        </span>
                    </div>
                    <span 
                        className="text-sm"
                        style={{ color: 'var(--color-text-tertiary)' }}
                    >
                        {state.totalSeats} seats
                    </span>
                </div>

                {/* Quick stats on hover (visible when selected) */}
                {isSelected && (
                    <div 
                        className="mt-3 pt-3 border-t text-xs"
                        style={{ borderColor: 'var(--color-border-subtle)' }}
                    >
                        <div 
                            className="flex justify-between"
                            style={{ color: 'var(--color-text-tertiary)' }}
                        >
                            <span>{state.contentSections.reduce((acc, s) => acc + s.contentCount, 0)} articles</span>
                            <span>{state.featuredContent.length} featured</span>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .hover\\:scale-102:hover {
                    transform: scale(1.02);
                }
            `}</style>
        </button>
    );
};

export default StateHubCard;
