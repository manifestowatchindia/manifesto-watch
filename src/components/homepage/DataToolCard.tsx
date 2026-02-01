/**
 * DataToolCard - Individual data tool card component
 * Phase 4 - STORY-060
 * Shows data tool info with preview image and navigation
 */

import React from 'react';

export interface DataTool {
    id: string;
    name: string;
    description: string;
    icon: string;
    previewImageUrl: string;
    path: string;
    isNew?: boolean;
    isPremium?: boolean;
}

export interface DataToolCardProps {
    /** Data tool to display */
    tool: DataTool;
    /** Click handler */
    onClick?: (tool: DataTool) => void;
    /** Test ID for testing */
    testId?: string;
}

/**
 * DataToolCard Component
 * Displays a data tool with icon, preview, and navigation
 */
export const DataToolCard: React.FC<DataToolCardProps> = ({
    tool,
    onClick,
    testId,
}) => {
    const handleClick = () => {
        onClick?.(tool);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <article
            className="data-tool-card"
            data-testid={testId || `data-tool-card-${tool.id}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`Open ${tool.name} - ${tool.description}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                border: '1px solid #e5e7eb',
                position: 'relative',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }}
        >
            {/* Badges */}
            <div
                className="tool-badges"
                style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 10,
                }}
            >
                {tool.isNew && (
                    <span
                        className="badge-new"
                        style={{
                            backgroundColor: '#22c55e',
                            color: '#ffffff',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                        }}
                    >
                        New
                    </span>
                )}
                {tool.isPremium && (
                    <span
                        className="badge-premium"
                        style={{
                            backgroundColor: '#f59e0b',
                            color: '#ffffff',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                        }}
                    >
                        ⭐ Premium
                    </span>
                )}
            </div>

            {/* Preview Image */}
            <div
                className="tool-preview"
                style={{
                    width: '100%',
                    height: '140px',
                    backgroundColor: '#f8fafc',
                    backgroundImage: tool.previewImageUrl ? `url(${tool.previewImageUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid #e5e7eb',
                }}
            >
                {!tool.previewImageUrl && (
                    <span
                        className="tool-icon-large"
                        style={{
                            fontSize: '3rem',
                        }}
                        aria-hidden="true"
                    >
                        {tool.icon}
                    </span>
                )}
            </div>

            {/* Tool Info */}
            <div
                className="tool-info"
                style={{
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}
            >
                <div
                    className="tool-header"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <span
                        className="tool-icon"
                        style={{ fontSize: '1.25rem' }}
                        aria-hidden="true"
                    >
                        {tool.icon}
                    </span>
                    <h3
                        className="tool-name"
                        style={{
                            margin: 0,
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#1f2937',
                        }}
                    >
                        {tool.name}
                    </h3>
                </div>

                <p
                    className="tool-description"
                    style={{
                        margin: 0,
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        lineHeight: 1.5,
                    }}
                >
                    {tool.description}
                </p>

                <div
                    className="tool-cta"
                    style={{
                        marginTop: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#3b82f6',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                    }}
                >
                    <span>Explore</span>
                    <span aria-hidden="true">→</span>
                </div>
            </div>
        </article>
    );
};

export default DataToolCard;
