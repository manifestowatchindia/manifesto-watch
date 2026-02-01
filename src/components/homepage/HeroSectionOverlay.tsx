/**
 * HeroSectionOverlay Component
 * Powerful hero section with background image and dark overlay
 * Based on Option C: Background Image with Overlay design specification
 * 
 * Features:
 * - Real photo background with gradient overlay
 * - Glass-morphism UI elements
 * - Parallax scroll effect
 * - High contrast for readability
 * - WCAG 2.1 Level AA compliant
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export interface HeroSectionOverlayProps {
  /** Background image URL */
  backgroundImage: string;
  /** Tagline/headline */
  tagline?: string;
  /** Subtitle/description */
  subtitle?: string;
  /** Primary CTA configuration */
  primaryCTA?: {
    text: string;
    link: string;
    icon?: string;
  };
  /** Secondary CTA configuration */
  secondaryCTA?: {
    text: string;
    link: string;
    icon?: string;
  };
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Enable voice search */
  voiceSearchEnabled?: boolean;
  /** User counter text */
  userCountText?: string;
  /** Statistics to display */
  stats?: Array<{
    icon: string;
    value: string;
    label: string;
  }>;
  /** Enable parallax effect */
  parallaxEnabled?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * HeroSectionOverlay Component
 * Creates an impactful hero with real photography and overlay
 */
export const HeroSectionOverlay: React.FC<HeroSectionOverlayProps> = ({
  backgroundImage,
  tagline = 'Track Political Promises.\nHold Leaders Accountable.',
  subtitle = "India's most trusted platform for monitoring election manifestos and tracking promise delivery across all states.",
  primaryCTA = { 
    text: 'Track Your Election', 
    link: '/tracking',
    icon: '🗳️'
  },
  secondaryCTA = { 
    text: 'Compare Parties', 
    link: '/compare',
    icon: '⚖️'
  },
  searchPlaceholder = 'Search your state or constituency...',
  voiceSearchEnabled = true,
  userCountText = 'Join 2.5M+ Indians tracking democracy',
  stats = [
    { icon: '📍', value: '28+', label: 'States Tracked' },
    { icon: '📋', value: '1,000+', label: 'Promises Monitored' },
    { icon: '🎯', value: '50+', label: 'Parties Covered' },
    { icon: '✅', value: '100%', label: 'Non-Partisan' },
  ],
  parallaxEnabled = true,
  className = '',
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Parallax effect
  useEffect(() => {
    if (!parallaxEnabled || !imageRef.current) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5; // Moves at 50% speed
      
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxEnabled]);

  // Staggered fade-in animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className={`hero-section-overlay relative overflow-hidden ${className}`}
      role="banner"
      aria-label="ManifestoWatch hero section"
      style={{ minHeight: '90vh' }}
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="hero-background-image absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7) contrast(1.1)',
          zIndex: 0,
        }}
        role="presentation"
        aria-hidden="true"
      />

      {/* Dark Gradient Overlay */}
      <div
        className="hero-overlay absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.65) 100%)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="hero-content relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 py-16">
        {/* Main Headline */}
        <h1
          className={`hero-headline text-center mb-6 transition-all duration-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#FFFFFF',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            letterSpacing: '-0.5px',
            transitionDelay: '0.7s',
            whiteSpace: 'pre-line',
          }}
        >
          {tagline}
        </h1>

        {/* Subtitle */}
        <p
          className={`hero-subtitle text-center mb-10 max-w-2xl transition-all duration-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#E5E7EB',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            transitionDelay: '0.9s',
          }}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className={`hero-cta-buttons flex flex-wrap gap-4 justify-center mb-8 transition-all duration-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1.1s' }}
        >
          <Link
            to={primaryCTA.link}
            className="hero-cta-primary px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F6B 100%)',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 8px 24px rgba(255, 107, 53, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 107, 53, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.4)';
            }}
          >
            {primaryCTA.icon && <span>{primaryCTA.icon}</span>}
            {primaryCTA.text}
          </Link>

          <Link
            to={secondaryCTA.link}
            className="hero-cta-secondary px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center gap-2"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              color: '#FFFFFF',
              border: '2px solid rgba(255, 255, 255, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {secondaryCTA.icon && <span>{secondaryCTA.icon}</span>}
            {secondaryCTA.text}
          </Link>
        </div>

        {/* Stats Grid */}
        <div
          className={`hero-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl transition-all duration-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1.5s' }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="hero-stats-card text-center p-6 rounded-2xl transition-all duration-300 cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className="hero-stats-number text-3xl font-bold mb-1"
                style={{ color: '#FFFFFF' }}
              >
                {stat.value}
              </div>
              <div
                className="hero-stats-label text-sm uppercase tracking-wider"
                style={{ color: '#E5E7EB' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSectionOverlay;
