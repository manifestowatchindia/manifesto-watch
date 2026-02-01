/**
 * MapLegend Component
 * STORY-059 - Interactive India Map Section
 * 
 * Legend component showing color meanings for different map view modes
 */

import React from 'react';
import { MapViewMode } from './MapViewToggle';

export interface LegendItem {
    color: string;
    label: string;
    value?: number | string;
}

export interface MapLegendProps {
    /** Current map view mode */
    viewMode: MapViewMode;
    /** Whether to show counts/values */
    showCounts?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Legend items for each view mode
 */
const LEGEND_ITEMS: Record<MapViewMode, LegendItem[]> = {
    'ruling-party': [
        { color: '#FF9933', label: 'BJP', value: 12 },
        { color: '#00BFFF', label: 'INC', value: 4 },
        { color: '#228B22', label: 'AITC', value: 1 },
        { color: '#FF0000', label: 'DMK', value: 1 },
        { color: '#0066CC', label: 'AAP', value: 2 },
        { color: '#800080', label: 'Regional Parties', value: 8 },
        { color: '#666666', label: 'Other', value: 8 },
    ],
    'election-status': [
        { color: 'var(--color-accent-primary, #f97316)', label: 'Upcoming (< 6 months)', value: 4 },
        { color: 'var(--color-accent-tertiary, #14b8a6)', label: 'Upcoming (6-12 months)', value: 3 },
        { color: 'var(--color-text-tertiary, #9ca3af)', label: 'No Election Soon', value: 21 },
        { color: 'var(--color-status-delivered, #10b981)', label: 'Recently Completed', value: 8 },
    ],
    'promise-delivery': [
        { color: '#10b981', label: '> 60% Delivered' },
        { color: '#22c55e', label: '40-60% Delivered' },
        { color: '#eab308', label: '20-40% Delivered' },
        { color: '#f97316', label: '< 20% Delivered' },
        { color: '#9ca3af', label: 'No Data' },
    ],
};

/**
 * MapLegend - Shows color key for the current map view
 */
export const MapLegend: React.FC<MapLegendProps> = ({
    viewMode,
    showCounts = true,
    className = '',
}) => {
    const items = LEGEND_ITEMS[viewMode];

    return (
        <div className={`map-legend ${className}`} aria-label={`Map legend for ${viewMode} view`}>
            <div className="legend-header">
                <span className="legend-title">
                    {viewMode === 'ruling-party' && 'Ruling Parties'}
                    {viewMode === 'election-status' && 'Election Status'}
                    {viewMode === 'promise-delivery' && 'Promise Delivery Rate'}
                </span>
            </div>
            <div className="legend-items">
                {items.map((item, index) => (
                    <div key={index} className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor: item.color }}
                            aria-hidden="true"
                        />
                        <span className="legend-label">{item.label}</span>
                        {showCounts && item.value !== undefined && (
                            <span className="legend-count">({item.value})</span>
                        )}
                    </div>
                ))}
            </div>

            <style>{`
                .map-legend {
                    background-color: var(--color-bg-primary, #ffffff);
                    border-radius: 0.5rem;
                    border: 1px solid var(--color-border-light, #e5e7eb);
                    padding: 1rem;
                    min-width: 180px;
                }

                .legend-header {
                    margin-bottom: 0.75rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid var(--color-border-light, #e5e7eb);
                }

                .legend-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--color-text-secondary, #6b7280);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .legend-items {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                }

                .legend-color {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                    flex-shrink: 0;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }

                .legend-label {
                    color: var(--color-text-primary, #1f2937);
                    flex: 1;
                }

                .legend-count {
                    color: var(--color-text-tertiary, #9ca3af);
                    font-size: 0.75rem;
                }

                @media (max-width: 768px) {
                    .map-legend {
                        padding: 0.75rem;
                    }

                    .legend-items {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.375rem;
                    }

                    .legend-item {
                        font-size: 0.75rem;
                    }

                    .legend-color {
                        width: 10px;
                        height: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default MapLegend;
