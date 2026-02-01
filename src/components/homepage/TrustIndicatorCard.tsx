/**
 * TrustIndicatorCard - Individual trust indicator card
 * Phase 4 - STORY-068
 */

import React from 'react';

export interface TrustIndicator {
    icon: string;
    title: string;
    description: string;
}

export interface TrustIndicatorCardProps {
    /** Trust indicator data */
    indicator: TrustIndicator;
    /** Test ID for testing */
    testId?: string;
}

export const TrustIndicatorCard: React.FC<TrustIndicatorCardProps> = ({
    indicator,
    testId,
}) => {
    return (
        <div
            className="trust-indicator-card"
            data-testid={testId || `trust-indicator-${indicator.title.toLowerCase().replace(/\s+/g, '-')}`}
            style={{
                padding: '24px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
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
            <div
                className="indicator-icon"
                style={{
                    fontSize: '2.5rem',
                    marginBottom: '12px',
                }}
                aria-hidden="true"
            >
                {indicator.icon}
            </div>
            <h3
                style={{
                    margin: '0 0 8px 0',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#1f2937',
                }}
            >
                {indicator.title}
            </h3>
            <p
                style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    lineHeight: 1.5,
                }}
            >
                {indicator.description}
            </p>
        </div>
    );
};

export default TrustIndicatorCard;
