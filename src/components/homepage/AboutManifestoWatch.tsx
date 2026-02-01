/**
 * AboutManifestoWatch - About section for the homepage
 * Phase 4 - STORY-068
 * Trust-building section explaining who we are and our mission
 */

import React from 'react';
import { TrustIndicatorCard, TrustIndicator } from './TrustIndicatorCard';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

export interface AboutManifestoWatchProps {
    /** Section title */
    title?: string;
    /** Mission statement */
    missionStatement?: string;
    /** Description paragraph */
    description?: string;
    /** Show team info */
    showTeam?: boolean;
    /** Show methodology link */
    showMethodology?: boolean;
    /** Custom trust indicators */
    trustIndicators?: TrustIndicator[];
    /** About page URL - currently disabled, to be discussed with PM */
    aboutUrl?: string;
    /** Methodology page URL */
    methodologyUrl?: string;
}

const DEFAULT_TRUST_INDICATORS: TrustIndicator[] = [
    {
        icon: '⚖️',
        title: 'Non-Partisan',
        description: 'We track ALL parties equally. No political affiliation or bias.',
    },
    {
        icon: '📊',
        title: 'Data-Driven',
        description: 'Every promise status is backed by verifiable sources and citations.',
    },
    {
        icon: '🔓',
        title: 'Open & Transparent',
        description: 'Our methodology is public. You can check and verify our work.',
    },
    {
        icon: '🇮🇳',
        title: 'Made in India',
        description: 'Built by Indians, for Indian democracy and informed voters.',
    },
];

const DEFAULT_MISSION = 'Data, not opinions. Accountability, not politics.';

const DEFAULT_DESCRIPTION = `ManifestoWatch is India's first comprehensive platform for tracking political promises. 
We believe voters deserve to know what was promised and what was delivered. 
Our mission is to promote transparency and accountability in Indian democracy.`;

/**
 * AboutManifestoWatch Component
 */
export const AboutManifestoWatch: React.FC<AboutManifestoWatchProps> = ({
    title = 'About ManifestoWatch',
    missionStatement = DEFAULT_MISSION,
    description = DEFAULT_DESCRIPTION,
    showTeam = false,
    showMethodology = true,
    trustIndicators = DEFAULT_TRUST_INDICATORS,
    aboutUrl = '/about',
    methodologyUrl = '/methodology',
}) => {
    const { ref, isInView, hasAnimated } = useInViewAnimation({
        threshold: 0.1,
        triggerOnce: true,
    });

    const shouldAnimate = isInView || hasAnimated;

    return (
        <section
            ref={ref}
            className="about-manifesto-watch"
            data-testid="about-manifesto-watch"
            aria-labelledby="about-title"
            style={{
                padding: '64px 24px',
                backgroundColor: '#000000',
            }}
        >
            <div
                className="about-container"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {/* Section Header */}
                <header
                    className="about-header"
                    style={{
                        marginBottom: '48px',
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
                        <span style={{ fontSize: '1.5rem' }} aria-hidden="true">ℹ️</span>
                        <span
                            style={{
                                color: '#059669',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            About Us
                        </span>
                    </div>

                    <h2
                        id="about-title"
                        style={{
                            margin: '0 0 16px 0',
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                            fontWeight: 700,
                            color: '#1f2937',
                        }}
                    >
                        {title}
                    </h2>

                    {/* Mission Statement */}
                    <p
                        className="mission-statement"
                        data-testid="mission-statement"
                        style={{
                            margin: '0 0 16px 0',
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: '#059669',
                            fontStyle: 'italic',
                        }}
                    >
                        "{missionStatement}"
                    </p>

                    {/* Description */}
                    <p
                        className="about-description"
                        style={{
                            margin: 0,
                            fontSize: '1.125rem',
                            color: '#6b7280',
                            maxWidth: '800px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            lineHeight: 1.7,
                        }}
                    >
                        {description}
                    </p>
                </header>

                {/* Trust Indicators Grid */}
                <div
                    className="trust-indicators-grid"
                    data-testid="trust-indicators-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '24px',
                        marginBottom: '48px',
                    }}
                >
                    {trustIndicators.map((indicator, index) => (
                        <div
                            key={indicator.title}
                            style={{
                                opacity: shouldAnimate ? 1 : 0,
                                transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                                transition: `opacity 0.6s ease ${0.1 + index * 0.1}s, transform 0.6s ease ${0.1 + index * 0.1}s`,
                            }}
                        >
                            <TrustIndicatorCard indicator={indicator} />
                        </div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div
                    className="about-ctas"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        flexWrap: 'wrap',
                        opacity: shouldAnimate ? 1 : 0,
                        transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                    }}
                >
                    {/* TODO: About page link - to be discussed with PM */}
                    {/* <a
                        href={aboutUrl}
                        className="cta-button primary"
                        data-testid="learn-more-link"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            backgroundColor: '#059669',
                            color: '#ffffff',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#047857';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#059669';
                        }}
                    >
                        <span>Learn More About Us</span>
                        <span aria-hidden="true">→</span>
                    </a> */}

                    {showMethodology && (
                        <a
                            href={methodologyUrl}
                            className="cta-button secondary"
                            data-testid="methodology-link"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                backgroundColor: '#ffffff',
                                color: '#059669',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                border: '2px solid #059669',
                                transition: 'background-color 0.2s ease, color 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#059669';
                                e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#ffffff';
                                e.currentTarget.style.color = '#059669';
                            }}
                        >
                            <span>See Our Methodology</span>
                            <span aria-hidden="true">→</span>
                        </a>
                    )}
                </div>

                {/* Team Info (optional) */}
                {showTeam && (
                    <div
                        className="team-info"
                        style={{
                            marginTop: '48px',
                            padding: '24px',
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            textAlign: 'center',
                        }}
                    >
                        <h3
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                color: '#1f2937',
                            }}
                        >
                            Our Team
                        </h3>
                        <p
                            style={{
                                margin: 0,
                                color: '#6b7280',
                            }}
                        >
                            ManifestoWatch is built by a team of developers, researchers, and political analysts 
                            committed to bringing transparency to Indian democracy.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AboutManifestoWatch;
