/**
 * ElectionCountdownStrip Component
 * A horizontal strip showing countdowns for multiple upcoming elections
 * Scrollable on mobile, full display on desktop
 * 
 * Color Palette Reference:
 * - Background: --color-bg-elevated (#1a1a1a)
 * - Cards: --color-bg-card (#0d0d0d)
 * - Urgency High: --color-status-deferred (#F44336)
 * - Urgency Medium: --color-status-actioned (#FF9800)
 * - Urgency Low: --color-status-delivered (#4CAF50)
 * - Text: --color-text-primary (#FFFFFF), --color-text-muted (#888888)
 * - Accent: --color-accent-tertiary (#00D4AA) for links
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useCountdown } from '../../hooks/useCountdown';

export interface UpcomingElection {
  id: string;
  state: string;
  stateCode: string;
  electionType: 'assembly' | 'lok_sabha' | 'by_election';
  electionDate: string; // ISO date string
  flagUrl?: string;
  totalSeats?: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface ElectionCountdownStripProps {
  /** Array of upcoming elections to display */
  elections: UpcomingElection[];
  /** Maximum number of elections to show */
  maxDisplay?: number;
  /** Custom className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// State flag emojis (fallback when no image)
const STATE_FLAGS: Record<string, string> = {
  kerala: '🌴',
  'tamil-nadu': '🏛️',
  'tamil nadu': '🏛️',
  'west-bengal': '🌸',
  'west bengal': '🌸',
  assam: '🦏',
  punjab: '🌾',
  uttarakhand: '🏔️',
  goa: '🏖️',
  manipur: '🎋',
  karnataka: '🏰',
  telangana: '🏯',
  rajasthan: '🐪',
  'madhya-pradesh': '🐅',
  'madhya pradesh': '🐅',
  chhattisgarh: '🌲',
  maharashtra: '🚂',
  haryana: '🏏',
  jharkhand: '💎',
  delhi: '🏛️',
  bihar: '🌾',
  andhra: '🌊',
  'andhra-pradesh': '🌊',
  odisha: '🛕',
  gujarat: '🦁',
};

/**
 * Individual Election Card within the strip
 * Uses ManifestoWatch Design System colors
 */
const ElectionCard: React.FC<{ 
  election: UpcomingElection;
  isFirst?: boolean;
}> = ({ election, isFirst = false }) => {
  const countdown = useCountdown(election.electionDate);
  const stateKey = election.state.toLowerCase().replace(/\s+/g, '-');
  const stateEmoji = STATE_FLAGS[stateKey] || STATE_FLAGS[election.state.toLowerCase()] || '🗳️';
  
  // Format election date for display
  const formattedDate = new Date(election.electionDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Election year for URL
  const electionYear = new Date(election.electionDate).getFullYear();

  // Urgency indicator based on days remaining - using design system status colors
  // --color-status-deferred: #F44336 (red - high urgency)
  // --color-status-actioned: #FF9800 (orange - medium urgency)
  // --color-status-delivered: #4CAF50 (green - low urgency)
  const getUrgencyStyles = (days: number): { bg: string; border: string } => {
    if (days <= 30) return { 
      bg: 'rgba(244, 67, 54, 0.1)', // --color-status-deferred with opacity
      border: 'rgba(244, 67, 54, 0.5)' 
    };
    if (days <= 90) return { 
      bg: 'rgba(255, 152, 0, 0.1)', // --color-status-actioned with opacity
      border: 'rgba(255, 152, 0, 0.5)' 
    };
    return { 
      bg: 'rgba(76, 175, 80, 0.1)', // --color-status-delivered with opacity
      border: 'rgba(76, 175, 80, 0.5)' 
    };
  };

  const urgencyStyles = countdown.isComplete 
    ? { bg: 'rgba(158, 158, 158, 0.1)', border: 'rgba(158, 158, 158, 0.5)' } // --color-status-announced
    : getUrgencyStyles(countdown.days);

  return (
    <Link
      to={`/elections/${stateKey}-${electionYear}`}
      className={`
        flex-shrink-0 flex flex-col items-center justify-center
        px-4 py-3 md:px-6 md:py-4
        border-2 rounded-xl
        hover:border-opacity-60
        transition-all duration-200
        min-w-[160px] md:min-w-[200px]
        ${isFirst ? 'ml-0' : ''}
      `}
      style={{
        backgroundColor: urgencyStyles.bg,
        borderColor: urgencyStyles.border,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.borderColor = 'var(--color-border-accent, rgba(255, 69, 0, 0.3))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = urgencyStyles.bg;
        e.currentTarget.style.borderColor = urgencyStyles.border;
      }}
      aria-label={`${election.state} Election - ${countdown.days} days remaining`}
    >
      {/* State Flag/Emoji and Name */}
      <div className="flex items-center gap-2 mb-2">
        {election.flagUrl ? (
          <img 
            src={election.flagUrl} 
            alt={`${election.state} flag`}
            className="w-6 h-4 object-cover rounded"
            loading="lazy"
          />
        ) : (
          <span className="text-lg" role="img" aria-label={`${election.state} icon`}>
            {stateEmoji}
          </span>
        )}
        <span 
          className="font-semibold text-sm md:text-base truncate max-w-[100px] md:max-w-[140px]"
          style={{ color: 'var(--color-text-primary, #FFFFFF)' }}
        >
          {election.state}
        </span>
      </div>

      {/* Days Remaining - Large Display */}
      <div className="text-center mb-1">
        {countdown.isComplete ? (
          <span 
            className="text-2xl md:text-3xl font-bold"
            style={{ color: 'var(--color-text-secondary, #CCCCCC)' }}
          >
            Done
          </span>
        ) : (
          <>
            <span 
              className="text-3xl md:text-4xl font-bold tabular-nums"
              style={{ color: 'var(--color-text-primary, #FFFFFF)' }}
            >
              {countdown.days}
            </span>
            <span 
              className="text-sm ml-1"
              style={{ color: 'var(--color-text-secondary, #CCCCCC)' }}
            >
              {countdown.days === 1 ? 'Day' : 'Days'}
            </span>
          </>
        )}
      </div>

      {/* Election Date */}
      <span 
        className="text-xs"
        style={{ color: 'var(--color-text-muted, #888888)' }}
      >
        {formattedDate}
      </span>

      {/* Election Type Badge */}
      <span 
        className="mt-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'var(--color-text-muted, #888888)'
        }}
      >
        {election.electionType.replace('_', ' ')}
      </span>
    </Link>
  );
};

/**
 * ElectionCountdownStrip Component
 * Displays a horizontal strip of election countdown cards
 * Uses ManifestoWatch Design System colors
 */
export const ElectionCountdownStrip: React.FC<ElectionCountdownStripProps> = ({
  elections,
  maxDisplay = 4,
  className = '',
  style,
}) => {
  // Sort by date and filter to upcoming/ongoing only, limit to maxDisplay
  const sortedElections = [...elections]
    .filter(e => e.status !== 'completed')
    .sort((a, b) => new Date(a.electionDate).getTime() - new Date(b.electionDate).getTime())
    .slice(0, maxDisplay);

  if (sortedElections.length === 0) {
    return null;
  }

  return (
    <div 
      className={`backdrop-blur-md ${className}`}
      style={{
        // Using design system colors
        background: 'linear-gradient(90deg, var(--color-bg-elevated, #1a1a1a) 0%, var(--color-bg-secondary, #0a0a0a) 50%, var(--color-bg-elevated, #1a1a1a) 100%)',
        ...style
      }}
      role="region"
      aria-label="Upcoming elections countdown"
    >
      <div className="container mx-auto px-4 py-3">
        {/* Section Label */}
        <div className="flex items-center justify-between mb-3">
          <h2 
            className="text-xs md:text-sm font-semibold uppercase tracking-wider flex items-center gap-2"
            style={{ color: 'var(--color-text-secondary, #CCCCCC)' }}
          >
            <span className="text-lg">🗳️</span>
            Upcoming Elections
          </h2>
          <Link 
            to="/elections"
            className="text-xs transition-colors"
            style={{ color: 'var(--color-accent-tertiary, #00D4AA)' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            View All →
          </Link>
        </div>

        {/* Elections Strip - Scrollable on mobile */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-3 md:gap-4 pb-2 md:justify-center">
            {sortedElections.map((election, index) => (
              <ElectionCard 
                key={election.id} 
                election={election}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex justify-center mt-2 md:hidden">
          <div className="flex gap-1">
            {sortedElections.map((_, index) => (
              <div 
                key={index}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--color-border-light, rgba(255, 255, 255, 0.3))' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionCountdownStrip;
