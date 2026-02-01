/**
 * HeroSection Component
 * Full-width hero section with multi-election countdown banner
 * Phase 4 Homepage redesign - DeKoder inspired
 * 
 * Color Palette Reference:
 * - Background: --color-bg-primary (#000000)
 * - Gradient: --gradient-hero (orange gradient)
 * - Accent: --color-accent-primary (#FF4500)
 * - Teal: --color-accent-tertiary (#00D4AA)
 * - Text: --color-text-primary (#FFFFFF), --color-text-secondary (#CCCCCC)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ElectionCountdownStrip, UpcomingElection } from './ElectionCountdownStrip';
import { Button } from '../ui/Button';

export interface HeroSectionProps {
  /** List of upcoming elections for the countdown strip */
  elections: UpcomingElection[];
  /** Main tagline text */
  tagline?: string;
  /** Subtitle/description text */
  subtitle?: string;
  /** Primary CTA configuration */
  primaryCTA?: {
    text: string;
    link: string;
  };
  /** Secondary CTA configuration */
  secondaryCTA?: {
    text: string;
    link: string;
  };
  /** Custom className for styling */
  className?: string;
  /** Show election countdown strip */
  showCountdownStrip?: boolean;
  /** Background variant */
  variant?: 'gradient' | 'dark' | 'image';
  /** Background image URL (when variant is 'image') */
  backgroundImage?: string;
}

/**
 * HeroSection Component
 * Creates an impactful hero section with election countdowns and CTAs
 * Uses ManifestoWatch Design System colors
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  elections,
  tagline = 'Track Political Promises. Hold Leaders Accountable.',
  subtitle = 'India\'s most comprehensive platform for monitoring election manifestos and tracking promise delivery across all states.',
  primaryCTA = { text: 'Explore Promises', link: '/tracking' },
  secondaryCTA = { text: 'Compare Parties', link: '/elections/kerala-2026/compare' },
  className = '',
  showCountdownStrip = true,
  variant = 'gradient',
  backgroundImage,
}) => {
  // Background styles based on variant - using design system colors
  // --color-bg-primary: #000000
  // --gradient-hero: linear-gradient(135deg, #FF4500 0%, #FF6B35 50%, #FF4500 100%)
  const backgroundStyles = {
    gradient: 'hero-gradient-bg', // Uses CSS variable gradient
    dark: 'bg-[var(--color-bg-primary)]',
    image: backgroundImage 
      ? `bg-cover bg-center bg-no-repeat` 
      : 'hero-gradient-bg',
  };

  return (
    <section
      className={`relative overflow-hidden ${backgroundStyles[variant]} ${className}`}
      style={
        variant === 'image' && backgroundImage 
          ? { backgroundImage: `url(${backgroundImage})` } 
          : variant === 'gradient' 
            ? { background: 'linear-gradient(135deg, #FF4500 0%, #FF6B35 50%, #0a0a0a 100%)' }
            : undefined
      }
      role="banner"
      aria-label="ManifestoWatch hero section"
    >
      {/* Background overlay for image variant */}
      {variant === 'image' && backgroundImage && (
        <div 
          className="absolute inset-0 backdrop-blur-sm" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        />
      )}

      {/* Animated background elements - using accent colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Floating circles - using --color-accent-primary (#FF4500) and --color-accent-tertiary (#00D4AA) */}
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: 'rgba(255, 69, 0, 0.15)' }} /* accent-primary with opacity */
        />
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ backgroundColor: 'rgba(0, 212, 170, 0.1)' }} /* accent-tertiary (teal) with opacity */
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(255, 107, 53, 0.08)' }} /* accent-secondary with opacity */
        />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-text-primary, white) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-text-primary, white) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Election Countdown Strip - uses --color-bg-elevated (#1a1a1a) */}
        {showCountdownStrip && elections.length > 0 && (
          <ElectionCountdownStrip 
            elections={elections}
            maxDisplay={4}
            className="border-b"
            style={{ borderColor: 'var(--color-border-light, rgba(255, 255, 255, 0.1))' }}
          />
        )}

        {/* Main Hero Content */}
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo/Brand Mark - using design system colors */}
            <div className="mb-6 md:mb-8">
              <span 
                className="inline-flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--color-text-secondary, #CCCCCC)'
                }}
              >
                <span className="text-lg">🗳️</span>
                <span className="font-medium" style={{ color: 'var(--color-text-primary, #FFFFFF)' }}>
                  ManifestoWatch.in
                </span>
                <span className="hidden sm:inline" style={{ color: 'var(--color-text-muted, #888888)' }}>|</span>
                <span className="hidden sm:inline" style={{ color: 'var(--color-text-muted, #888888)' }}>
                  Tracking Democracy
                </span>
              </span>
            </div>

            {/* Main Tagline - using --color-text-primary and --color-accent-tertiary */}
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: 'var(--color-text-primary, #FFFFFF)' }}
            >
              {tagline.split('.').map((sentence, index, arr) => (
                <React.Fragment key={index}>
                  <span style={index === 1 ? { color: 'var(--color-accent-tertiary, #00D4AA)' } : undefined}>
                    {sentence.trim()}
                  </span>
                  {index < arr.length - 1 && sentence.trim() && '.'}
                  {index < arr.length - 1 && sentence.trim() && <br className="hidden sm:inline" />}
                </React.Fragment>
              ))}
            </h1>

            {/* Subtitle - using --color-text-secondary */}
            <p 
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--color-text-secondary, #CCCCCC)', opacity: 0.8 }}
            >
              {subtitle}
            </p>

            {/* CTA Buttons - Primary uses --gradient-primary, Secondary uses --gradient-teal */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={primaryCTA.link}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto min-w-[200px] shadow-lg"
                  style={{ 
                    background: 'var(--gradient-primary, linear-gradient(135deg, #FF4500 0%, #FF6B35 100%))',
                    boxShadow: 'var(--shadow-accent, 0 5px 15px rgba(255, 69, 0, 0.4))'
                  }}
                >
                  <span className="mr-2">📋</span>
                  {primaryCTA.text}
                </Button>
              </Link>
              
              <Link to={secondaryCTA.link}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto min-w-[200px]"
                  style={{ 
                    borderColor: 'var(--color-border-teal, rgba(0, 212, 170, 0.3))',
                    color: 'var(--color-accent-tertiary, #00D4AA)',
                    borderWidth: '2px'
                  }}
                >
                  <span className="mr-2">⚖️</span>
                  {secondaryCTA.text}
                </Button>
              </Link>
            </div>

            {/* Trust Indicators - using --color-accent-tertiary for emphasis */}
            <div 
              className="mt-12 md:mt-16 pt-8"
              style={{ borderTop: '1px solid var(--color-border-light, rgba(255, 255, 255, 0.1))' }}
            >
              <p 
                className="text-sm mb-4"
                style={{ color: 'var(--color-text-muted, #888888)' }}
              >
                Trusted by voters across India
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                <div className="flex flex-col items-center">
                  <span 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: 'var(--color-text-primary, #FFFFFF)' }}
                  >
                    28+
                  </span>
                  <span 
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted, #888888)' }}
                  >
                    States Tracked
                  </span>
                </div>
                <div 
                  className="hidden sm:block w-px h-10"
                  style={{ backgroundColor: 'var(--color-border-light, rgba(255, 255, 255, 0.2))' }}
                />
                <div className="flex flex-col items-center">
                  <span 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: 'var(--color-accent-tertiary, #00D4AA)' }} /* Teal highlight */
                  >
                    1000+
                  </span>
                  <span 
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted, #888888)' }}
                  >
                    Promises Monitored
                  </span>
                </div>
                <div 
                  className="hidden sm:block w-px h-10"
                  style={{ backgroundColor: 'var(--color-border-light, rgba(255, 255, 255, 0.2))' }}
                />
                <div className="flex flex-col items-center">
                  <span 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: 'var(--color-text-primary, #FFFFFF)' }}
                  >
                    50+
                  </span>
                  <span 
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted, #888888)' }}
                  >
                    Political Parties
                  </span>
                </div>
                <div 
                  className="hidden sm:block w-px h-10"
                  style={{ backgroundColor: 'var(--color-border-light, rgba(255, 255, 255, 0.2))' }}
                />
                <div className="flex flex-col items-center">
                  <span 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: 'var(--color-accent-primary, #FF4500)' }} /* Orange highlight */
                  >
                    100%
                  </span>
                  <span 
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted, #888888)' }}
                  >
                    Non-Partisan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg 
            viewBox="0 0 1440 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path 
              d="M0 100V60C240 20 480 0 720 20C960 40 1200 80 1440 60V100H0Z" 
              fill="var(--color-text-primary, white)" 
              fillOpacity="0.05"
            />
            <path 
              d="M0 100V70C240 30 480 10 720 30C960 50 1200 90 1440 70V100H0Z" 
              fill="var(--color-text-primary, white)" 
              fillOpacity="0.03"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
