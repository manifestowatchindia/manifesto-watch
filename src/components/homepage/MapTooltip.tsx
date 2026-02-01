/**
 * MapTooltip Component
 * STORY-059 - Interactive India Map Section
 * 
 * Tooltip component for displaying state information on hover
 */

import React from 'react';
import { MapViewMode } from './MapViewToggle';

export interface StateData {
    /** State name */
    name: string;
    /** State code (2 letter) */
    code: string;
    /** Ruling party */
    rulingParty?: string;
    /** Party color */
    partyColor?: string;
    /** Chief Minister name */
    chiefMinister?: string;
    /** Next election date */
    nextElection?: string;
    /** Days until next election */
    daysUntilElection?: number;
    /** Total promises tracked */
    totalPromises?: number;
    /** Promises delivered */
    deliveredPromises?: number;
    /** Delivery rate percentage */
    deliveryRate?: number;
    /** Population (optional) */
    population?: string;
}

export interface MapTooltipProps {
    /** State data to display */
    stateData: StateData | null;
    /** Current view mode to determine content */
    viewMode: MapViewMode;
    /** Tooltip position */
    position: { x: number; y: number };
    /** Whether tooltip is visible */
    visible: boolean;
}

/**
 * MapTooltip - Displays contextual state information on hover
 */
export const MapTooltip: React.FC<MapTooltipProps> = ({
    stateData,
    viewMode,
    position,
    visible,
}) => {
    if (!visible || !stateData) {
        return null;
    }

    const tooltipStyle: React.CSSProperties = {
        left: `${position.x + 15}px`,
        top: `${position.y - 10}px`,
    };

    return (
        <div
            className="map-tooltip"
            style={tooltipStyle}
            role="tooltip"
            aria-hidden={!visible}
        >
            {/* Header with state name */}
            <div
                className="tooltip-header"
                style={{
                    backgroundColor: stateData.partyColor || 'var(--color-bg-secondary)',
                }}
            >
                <span className="tooltip-state-name">{stateData.name}</span>
                <span className="tooltip-state-code">{stateData.code}</span>
            </div>

            {/* Content based on view mode */}
            <div className="tooltip-content">
                {viewMode === 'ruling-party' && (
                    <>
                        <div className="tooltip-row">
                            <span className="tooltip-label">Ruling Party</span>
                            <span className="tooltip-value">{stateData.rulingParty || 'N/A'}</span>
                        </div>
                        <div className="tooltip-row">
                            <span className="tooltip-label">Chief Minister</span>
                            <span className="tooltip-value">{stateData.chiefMinister || 'N/A'}</span>
                        </div>
                        {stateData.nextElection && (
                            <div className="tooltip-row">
                                <span className="tooltip-label">Next Election</span>
                                <span className="tooltip-value">{stateData.nextElection}</span>
                            </div>
                        )}
                    </>
                )}

                {viewMode === 'election-status' && (
                    <>
                        {stateData.nextElection ? (
                            <>
                                <div className="tooltip-row">
                                    <span className="tooltip-label">Next Election</span>
                                    <span className="tooltip-value">{stateData.nextElection}</span>
                                </div>
                                {stateData.daysUntilElection !== undefined && (
                                    <div className="tooltip-row highlight">
                                        <span className="tooltip-label">Days Until</span>
                                        <span className="tooltip-value countdown">
                                            {stateData.daysUntilElection > 0
                                                ? `${stateData.daysUntilElection} days`
                                                : 'Completed'}
                                        </span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="tooltip-row">
                                <span className="tooltip-label">Status</span>
                                <span className="tooltip-value">No upcoming election</span>
                            </div>
                        )}
                        <div className="tooltip-row">
                            <span className="tooltip-label">Ruling Party</span>
                            <span className="tooltip-value">{stateData.rulingParty || 'N/A'}</span>
                        </div>
                    </>
                )}

                {viewMode === 'promise-delivery' && (
                    <>
                        <div className="tooltip-row">
                            <span className="tooltip-label">Total Promises</span>
                            <span className="tooltip-value">{stateData.totalPromises || 0}</span>
                        </div>
                        <div className="tooltip-row">
                            <span className="tooltip-label">Delivered</span>
                            <span className="tooltip-value">{stateData.deliveredPromises || 0}</span>
                        </div>
                        {stateData.deliveryRate !== undefined && (
                            <div className="tooltip-row highlight">
                                <span className="tooltip-label">Delivery Rate</span>
                                <span className={`tooltip-value rate ${getDeliveryRateClass(stateData.deliveryRate)}`}>
                                    {stateData.deliveryRate.toFixed(1)}%
                                </span>
                            </div>
                        )}
                    </>
                )}

                {/* CTA hint */}
                <div className="tooltip-cta">
                    Click to explore state hub →
                </div>
            </div>

            <style>{`
                .map-tooltip {
                    position: fixed;
                    z-index: 1000;
                    min-width: 200px;
                    max-width: 280px;
                    background-color: var(--color-bg-primary, #ffffff);
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                    pointer-events: none;
                    animation: tooltipFadeIn 0.15s ease;
                }

                @keyframes tooltipFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(5px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .tooltip-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 1rem;
                    color: white;
                }

                .tooltip-state-name {
                    font-weight: 600;
                    font-size: 0.9375rem;
                }

                .tooltip-state-code {
                    font-size: 0.75rem;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 0.125rem 0.375rem;
                    border-radius: 0.25rem;
                }

                .tooltip-content {
                    padding: 0.75rem 1rem;
                }

                .tooltip-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.375rem 0;
                    border-bottom: 1px solid var(--color-border-light, #e5e7eb);
                }

                .tooltip-row:last-of-type {
                    border-bottom: none;
                }

                .tooltip-row.highlight {
                    background-color: var(--color-bg-secondary, #f9fafb);
                    margin: 0.25rem -1rem;
                    padding: 0.5rem 1rem;
                }

                .tooltip-label {
                    font-size: 0.75rem;
                    color: var(--color-text-secondary, #6b7280);
                }

                .tooltip-value {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--color-text-primary, #1f2937);
                }

                .tooltip-value.countdown {
                    color: var(--color-accent-primary, #f97316);
                }

                .tooltip-value.rate.high {
                    color: var(--color-status-delivered, #10b981);
                }

                .tooltip-value.rate.medium {
                    color: var(--color-status-actioned, #eab308);
                }

                .tooltip-value.rate.low {
                    color: var(--color-accent-primary, #f97316);
                }

                .tooltip-cta {
                    margin-top: 0.5rem;
                    padding-top: 0.5rem;
                    border-top: 1px dashed var(--color-border-light, #e5e7eb);
                    font-size: 0.75rem;
                    color: var(--color-accent-primary, #f97316);
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

/**
 * Get CSS class for delivery rate styling
 */
function getDeliveryRateClass(rate: number): string {
    if (rate >= 50) return 'high';
    if (rate >= 25) return 'medium';
    return 'low';
}

export default MapTooltip;
