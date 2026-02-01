/**
 * MapViewToggle Component
 * STORY-059 - Interactive India Map Section
 * 
 * Toggle control for switching between map view modes:
 * - Ruling Party view (default)
 * - Election Status view
 * - Promise Delivery view
 */

import React from 'react';

export type MapViewMode = 'ruling-party' | 'election-status' | 'promise-delivery';

export interface ViewOption {
    id: MapViewMode;
    label: string;
    description: string;
    icon: React.ReactNode;
}

export interface MapViewToggleProps {
    /** Currently selected view mode */
    activeView: MapViewMode;
    /** Callback when view mode changes */
    onViewChange: (view: MapViewMode) => void;
    /** Whether the toggle is disabled */
    disabled?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * View options configuration
 */
const VIEW_OPTIONS: ViewOption[] = [
    {
        id: 'ruling-party',
        label: 'Ruling Party',
        description: 'Color by ruling party',
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                <polyline points="17,21 17,13 7,13 7,21" />
                <polyline points="7,3 7,8 15,8" />
            </svg>
        ),
    },
    {
        id: 'election-status',
        label: 'Elections',
        description: 'Color by election status',
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
    },
    {
        id: 'promise-delivery',
        label: 'Promises',
        description: 'Color by promise delivery rate',
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
            </svg>
        ),
    },
];

/**
 * MapViewToggle - Toggle control for map visualization modes
 */
export const MapViewToggle: React.FC<MapViewToggleProps> = ({
    activeView,
    onViewChange,
    disabled = false,
    className = '',
}) => {
    return (
        <div
            className={`map-view-toggle ${className}`}
            role="tablist"
            aria-label="Map view options"
        >
            {VIEW_OPTIONS.map((option) => {
                const isActive = activeView === option.id;
                return (
                    <button
                        key={option.id}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`map-view-${option.id}`}
                        id={`tab-${option.id}`}
                        onClick={() => onViewChange(option.id)}
                        disabled={disabled}
                        className={`view-toggle-btn ${isActive ? 'active' : ''}`}
                        title={option.description}
                    >
                        <span className="view-toggle-icon" aria-hidden="true">
                            {option.icon}
                        </span>
                        <span className="view-toggle-label">{option.label}</span>
                    </button>
                );
            })}

            <style>{`
                .map-view-toggle {
                    display: inline-flex;
                    gap: 0.25rem;
                    padding: 0.25rem;
                    background-color: var(--color-bg-tertiary, #f3f4f6);
                    border-radius: 0.5rem;
                    border: 1px solid var(--color-border-light, #e5e7eb);
                }

                .view-toggle-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    border: none;
                    background: transparent;
                    color: var(--color-text-secondary, #6b7280);
                    font-size: 0.875rem;
                    font-weight: 500;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                }

                .view-toggle-btn:hover:not(:disabled) {
                    background-color: var(--color-bg-secondary, #ffffff);
                    color: var(--color-text-primary, #1f2937);
                }

                .view-toggle-btn:focus-visible {
                    outline: 2px solid var(--color-accent-primary, #f97316);
                    outline-offset: 2px;
                }

                .view-toggle-btn.active {
                    background-color: var(--color-bg-primary, #ffffff);
                    color: var(--color-accent-primary, #f97316);
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }

                .view-toggle-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .view-toggle-icon {
                    flex-shrink: 0;
                }

                @media (max-width: 640px) {
                    .map-view-toggle {
                        width: 100%;
                        justify-content: center;
                    }

                    .view-toggle-btn {
                        flex: 1;
                        justify-content: center;
                        padding: 0.5rem;
                    }

                    .view-toggle-label {
                        display: none;
                    }

                    .view-toggle-btn.active .view-toggle-label {
                        display: inline;
                    }
                }
            `}</style>
        </div>
    );
};

export default MapViewToggle;
