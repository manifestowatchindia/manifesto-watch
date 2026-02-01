/**
 * SectionSkeleton - Loading skeleton for homepage sections
 * Phase 4 - STORY-066
 * Shows placeholder UI while sections are loading
 */

import React from 'react';

export type SectionSkeletonVariant = 
    | 'hero'
    | 'tracker'
    | 'cards'
    | 'grid'
    | 'map'
    | 'form'
    | 'default';

export interface SectionSkeletonProps {
    /** Skeleton variant */
    variant?: SectionSkeletonVariant;
    /** Section height */
    height?: string | number;
    /** Section title (for accessibility) */
    title?: string;
}

const SkeletonBlock: React.FC<{ width?: string; height?: string; borderRadius?: string }> = ({
    width = '100%',
    height = '20px',
    borderRadius = '4px',
}) => (
    <div
        className="skeleton-block"
        style={{
            width,
            height,
            borderRadius,
            backgroundColor: '#e5e7eb',
            animation: 'pulse 1.5s ease-in-out infinite',
        }}
    />
);

const HeroSkeleton: React.FC = () => (
    <div
        style={{
            padding: '64px 24px',
            backgroundColor: '#1e3a8a',
            minHeight: '500px',
        }}
    >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <SkeletonBlock width="120px" height="24px" />
            <div style={{ height: '24px' }} />
            <SkeletonBlock width="80%" height="48px" />
            <div style={{ height: '16px' }} />
            <SkeletonBlock width="60%" height="24px" />
            <div style={{ height: '32px' }} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <SkeletonBlock width="150px" height="48px" borderRadius="8px" />
                <SkeletonBlock width="150px" height="48px" borderRadius="8px" />
            </div>
        </div>
    </div>
);

const TrackerSkeleton: React.FC = () => (
    <div style={{ padding: '48px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <SkeletonBlock width="200px" height="32px" />
            <div style={{ height: '24px' }} />
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ flex: '1', minWidth: '150px' }}>
                        <SkeletonBlock height="80px" borderRadius="8px" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const CardsSkeleton: React.FC = () => (
    <div style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SkeletonBlock width="250px" height="32px" />
            <div style={{ height: '24px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {[1, 2, 3].map((i) => (
                    <div key={i}>
                        <SkeletonBlock height="200px" borderRadius="12px" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const GridSkeleton: React.FC = () => (
    <div style={{ padding: '48px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SkeletonBlock width="200px" height="32px" />
            <div style={{ height: '24px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i}>
                        <SkeletonBlock height="160px" borderRadius="8px" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const MapSkeleton: React.FC = () => (
    <div style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SkeletonBlock width="200px" height="32px" />
            <div style={{ height: '24px' }} />
            <SkeletonBlock height="400px" borderRadius="12px" />
        </div>
    </div>
);

const FormSkeleton: React.FC = () => (
    <div style={{ padding: '48px 24px', backgroundColor: '#1f2937' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <SkeletonBlock width="200px" height="32px" />
            <div style={{ height: '24px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <SkeletonBlock height="200px" borderRadius="12px" />
                <SkeletonBlock height="200px" borderRadius="12px" />
            </div>
        </div>
    </div>
);

const DefaultSkeleton: React.FC<{ height?: string | number }> = ({ height = '300px' }) => (
    <div style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SkeletonBlock width="250px" height="32px" />
            <div style={{ height: '24px' }} />
            <SkeletonBlock height={typeof height === 'number' ? `${height}px` : height} borderRadius="12px" />
        </div>
    </div>
);

/**
 * SectionSkeleton Component
 */
export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({
    variant = 'default',
    height,
    title = 'Loading section',
}) => {
    const renderSkeleton = () => {
        switch (variant) {
            case 'hero':
                return <HeroSkeleton />;
            case 'tracker':
                return <TrackerSkeleton />;
            case 'cards':
                return <CardsSkeleton />;
            case 'grid':
                return <GridSkeleton />;
            case 'map':
                return <MapSkeleton />;
            case 'form':
                return <FormSkeleton />;
            default:
                return <DefaultSkeleton height={height} />;
        }
    };

    return (
        <div
            className="section-skeleton"
            data-testid={`section-skeleton-${variant}`}
            role="status"
            aria-label={title}
        >
            {renderSkeleton()}
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
            `}</style>
        </div>
    );
};

export default SectionSkeleton;
