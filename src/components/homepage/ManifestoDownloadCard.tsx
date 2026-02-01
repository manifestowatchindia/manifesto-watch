/**
 * ManifestoDownloadCard - Individual manifesto download card
 * Phase 4 - STORY-061
 * Shows manifesto info with download functionality
 */

import React from 'react';

export interface ManifestoCardData {
    id: string;
    partyName: string;
    partyColor: string;
    partyLogo?: string;
    electionName: string;
    electionYear: number;
    languages: string[];
    documentUrl: string | null;
    isWinner?: boolean;
    downloadCount?: number;
}

export interface ManifestoDownloadCardProps {
    /** Manifesto data to display */
    manifesto: ManifestoCardData;
    /** Click handler for download */
    onDownload?: (manifesto: ManifestoCardData) => void;
    /** Test ID for testing */
    testId?: string;
}

/**
 * Party color map for styling
 */
const PARTY_COLORS: Record<string, string> = {
    'BJP': '#FF9933',
    'INC': '#00BFFF',
    'AAP': '#0066CC',
    'DMK': '#D32F2F',
    'TMC': '#00BCD4',
    'BSP': '#2196F3',
    'SP': '#E91E63',
    'NCP': '#1976D2',
    'CPI': '#F44336',
    'CPM': '#D50000',
    'JDU': '#4CAF50',
    'RJD': '#8BC34A',
    'YSRCP': '#00796B',
    'TDP': '#FFEB3B',
    'BRS': '#E91E63',
    'Default': '#6B7280',
};

/**
 * Get party color based on name
 */
const getPartyColor = (partyName: string, providedColor?: string): string => {
    if (providedColor) return providedColor;
    
    // Check for common party abbreviations
    for (const [key, color] of Object.entries(PARTY_COLORS)) {
        if (partyName.toUpperCase().includes(key)) {
            return color;
        }
    }
    return PARTY_COLORS.Default;
};

/**
 * ManifestoDownloadCard Component
 * Displays a manifesto with download option
 */
export const ManifestoDownloadCard: React.FC<ManifestoDownloadCardProps> = ({
    manifesto,
    onDownload,
    testId,
}) => {
    const partyColor = getPartyColor(manifesto.partyName, manifesto.partyColor);

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDownload) {
            onDownload(manifesto);
        } else if (manifesto.documentUrl) {
            window.open(manifesto.documentUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDownload(e as any);
        }
    };

    return (
        <article
            className="manifesto-download-card"
            data-testid={testId || `manifesto-card-${manifesto.id}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
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
            {/* Party Color Banner */}
            <div
                className="party-banner"
                style={{
                    height: '6px',
                    backgroundColor: partyColor,
                }}
            />

            {/* Winner Badge */}
            {manifesto.isWinner && (
                <div
                    className="winner-badge"
                    style={{
                        position: 'absolute',
                        top: '14px',
                        right: '12px',
                        backgroundColor: '#22c55e',
                        color: '#ffffff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                >
                    <span aria-hidden="true">🏆</span>
                    <span>Winner</span>
                </div>
            )}

            {/* Card Content */}
            <div
                className="card-content"
                style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    flex: 1,
                }}
            >
                {/* Party Info */}
                <div
                    className="party-info"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}
                >
                    {/* Party Logo/Color Circle */}
                    <div
                        className="party-logo"
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: partyColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '1rem',
                            flexShrink: 0,
                            backgroundImage: manifesto.partyLogo ? `url(${manifesto.partyLogo})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {!manifesto.partyLogo && manifesto.partyName.substring(0, 3).toUpperCase()}
                    </div>

                    <div className="party-details">
                        <h3
                            className="party-name"
                            style={{
                                margin: 0,
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                color: '#1f2937',
                            }}
                        >
                            {manifesto.partyName}
                        </h3>
                        <p
                            className="election-info"
                            style={{
                                margin: 0,
                                fontSize: '0.875rem',
                                color: '#6b7280',
                            }}
                        >
                            {manifesto.electionName} {manifesto.electionYear}
                        </p>
                    </div>
                </div>

                {/* Languages */}
                <div
                    className="languages"
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                    }}
                >
                    {manifesto.languages.map((lang) => (
                        <span
                            key={lang}
                            className="language-tag"
                            style={{
                                padding: '4px 8px',
                                backgroundColor: '#f3f4f6',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                color: '#4b5563',
                            }}
                        >
                            {lang}
                        </span>
                    ))}
                </div>

                {/* Download Stats */}
                {manifesto.downloadCount !== undefined && manifesto.downloadCount > 0 && (
                    <p
                        className="download-stats"
                        style={{
                            margin: 0,
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                        }}
                    >
                        📥 {manifesto.downloadCount.toLocaleString()} downloads
                    </p>
                )}
            </div>

            {/* Download Button */}
            <div
                className="card-footer"
                style={{
                    padding: '16px 20px',
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb',
                }}
            >
                <button
                    onClick={handleDownload}
                    onKeyDown={handleKeyDown}
                    className="download-btn"
                    data-testid={`download-btn-${manifesto.id}`}
                    disabled={!manifesto.documentUrl}
                    aria-label={`Download ${manifesto.partyName} ${manifesto.electionName} ${manifesto.electionYear} manifesto`}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        backgroundColor: manifesto.documentUrl ? '#3b82f6' : '#d1d5db',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: manifesto.documentUrl ? 'pointer' : 'not-allowed',
                        transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        if (manifesto.documentUrl) {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (manifesto.documentUrl) {
                            e.currentTarget.style.backgroundColor = '#3b82f6';
                        }
                    }}
                >
                    <span aria-hidden="true">📥</span>
                    <span>{manifesto.documentUrl ? 'Download PDF' : 'Coming Soon'}</span>
                </button>
            </div>
        </article>
    );
};

export default ManifestoDownloadCard;
