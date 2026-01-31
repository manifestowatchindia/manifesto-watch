/**
 * ElectionCountdown Component
 * Displays a real-time countdown to an upcoming election with urgency indicators
 */

import React, { useState, useEffect } from 'react';
import { Election, CountdownData } from '../../lib/types';
import { electionService } from '../../services/election/electionService';

interface ElectionCountdownProps {
  election: Election;
  priority?: 'primary' | 'secondary';
}

/**
 * ElectionCountdown Component
 * Shows countdown timer with days, hours, minutes, seconds
 * Color-coded based on urgency level
 */
export const ElectionCountdown: React.FC<ElectionCountdownProps> = ({
  election,
  priority = 'primary',
}) => {
  const [countdown, setCountdown] = useState<CountdownData>(
    electionService.calculateCountdown(election.date)
  );

  // Update countdown every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCountdown = electionService.calculateCountdown(election.date);
      setCountdown(newCountdown);

      // Stop countdown if election has passed
      if (newCountdown.totalMilliseconds <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [election.date]);

  // Get urgency level for color coding
  const urgencyLevel = electionService.getUrgencyLevel(election.date);

  // Urgency colors
  const urgencyColors = {
    high: {
      bg: 'bg-gradient-to-br from-red-500 to-red-700',
      text: 'text-red-50',
      badge: 'bg-red-100 text-red-800',
      glow: 'shadow-red-500/50',
    },
    medium: {
      bg: 'bg-gradient-to-br from-orange-500 to-orange-700',
      text: 'text-orange-50',
      badge: 'bg-orange-100 text-orange-800',
      glow: 'shadow-orange-500/50',
    },
    low: {
      bg: 'bg-gradient-to-br from-green-500 to-green-700',
      text: 'text-green-50',
      badge: 'bg-green-100 text-green-800',
      glow: 'shadow-green-500/50',
    },
    past: {
      bg: 'bg-gradient-to-br from-gray-500 to-gray-700',
      text: 'text-gray-50',
      badge: 'bg-gray-100 text-gray-800',
      glow: 'shadow-gray-500/50',
    },
  };

  const colors = urgencyColors[urgencyLevel];

  // Format number with leading zero
  const formatNumber = (num: number): string => {
    return String(num).padStart(2, '0');
  };

  // Format large numbers with commas
  const formatLargeNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const isPrimary = priority === 'primary';

  if (countdown.totalMilliseconds <= 0) {
    return (
      <div
        className={`${colors.bg} ${colors.text} rounded-2xl p-8 shadow-2xl ${colors.glow} text-center`}
        role="status"
        aria-live="polite"
      >
        <div className="text-2xl font-bold mb-2">🗳️ {election.state} Election</div>
        <div className="text-lg opacity-90">Election has concluded</div>
      </div>
    );
  }

  return (
    <div
      className={`${colors.bg} ${colors.text} rounded-2xl shadow-2xl ${colors.glow} overflow-hidden transition-all duration-300 hover:scale-[1.02]`}
      role="region"
      aria-label={`Election countdown for ${election.state}`}
    >
      {/* Header */}
      <div className={`${isPrimary ? 'p-8 md:p-12' : 'p-6'} text-center`}>
        <div className={`${isPrimary ? 'text-3xl md:text-4xl' : 'text-2xl'} font-bold mb-2`}>
          🗳️ {election.state} Election {new Date(election.date).getFullYear()}
        </div>
        <div className={`${isPrimary ? 'text-lg md:text-xl' : 'text-base'} opacity-90`}>
          {election.electionType.replace('_', ' ').toUpperCase()}
        </div>
      </div>

      {/* Countdown Display */}
      <div className={`${isPrimary ? 'px-8 md:px-12 pb-8' : 'px-6 pb-6'}`}>
        <div
          className="grid grid-cols-4 gap-4 mb-8"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Days */}
          <div className="text-center">
            <div
              className={`bg-white/20 backdrop-blur-sm rounded-xl ${
                isPrimary ? 'p-4 md:p-6' : 'p-3'
              } mb-2 transition-all duration-300 hover:bg-white/30`}
            >
              <div
                className={`${
                  isPrimary ? 'text-4xl md:text-6xl' : 'text-3xl'
                } font-bold font-mono tabular-nums`}
                aria-label={`${countdown.days} days`}
              >
                {formatNumber(countdown.days)}
              </div>
            </div>
            <div className={`${isPrimary ? 'text-sm md:text-base' : 'text-xs'} uppercase tracking-wide opacity-90`}>
              Days
            </div>
          </div>

          {/* Hours */}
          <div className="text-center">
            <div
              className={`bg-white/20 backdrop-blur-sm rounded-xl ${
                isPrimary ? 'p-4 md:p-6' : 'p-3'
              } mb-2 transition-all duration-300 hover:bg-white/30`}
            >
              <div
                className={`${
                  isPrimary ? 'text-4xl md:text-6xl' : 'text-3xl'
                } font-bold font-mono tabular-nums`}
                aria-label={`${countdown.hours} hours`}
              >
                {formatNumber(countdown.hours)}
              </div>
            </div>
            <div className={`${isPrimary ? 'text-sm md:text-base' : 'text-xs'} uppercase tracking-wide opacity-90`}>
              Hours
            </div>
          </div>

          {/* Minutes */}
          <div className="text-center">
            <div
              className={`bg-white/20 backdrop-blur-sm rounded-xl ${
                isPrimary ? 'p-4 md:p-6' : 'p-3'
              } mb-2 transition-all duration-300 hover:bg-white/30`}
            >
              <div
                className={`${
                  isPrimary ? 'text-4xl md:text-6xl' : 'text-3xl'
                } font-bold font-mono tabular-nums`}
                aria-label={`${countdown.minutes} minutes`}
              >
                {formatNumber(countdown.minutes)}
              </div>
            </div>
            <div className={`${isPrimary ? 'text-sm md:text-base' : 'text-xs'} uppercase tracking-wide opacity-90`}>
              Minutes
            </div>
          </div>

          {/* Seconds */}
          <div className="text-center">
            <div
              className={`bg-white/20 backdrop-blur-sm rounded-xl ${
                isPrimary ? 'p-4 md:p-6' : 'p-3'
              } mb-2 transition-all duration-300 hover:bg-white/30`}
            >
              <div
                className={`${
                  isPrimary ? 'text-4xl md:text-6xl' : 'text-3xl'
                } font-bold font-mono tabular-nums`}
                aria-label={`${countdown.seconds} seconds`}
              >
                {formatNumber(countdown.seconds)}
              </div>
            </div>
            <div className={`${isPrimary ? 'text-sm md:text-base' : 'text-xs'} uppercase tracking-wide opacity-90`}>
              Seconds
            </div>
          </div>
        </div>

        {/* Election Details */}
        <div className={`bg-white/10 backdrop-blur-sm rounded-xl ${isPrimary ? 'p-6' : 'p-4'} mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className={`${isPrimary ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold mb-1`}>
                {formatLargeNumber(election.constituencies)}
              </div>
              <div className={`${isPrimary ? 'text-sm' : 'text-xs'} opacity-80`}>Constituencies</div>
            </div>
            <div>
              <div className={`${isPrimary ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold mb-1`}>
                {formatLargeNumber(election.voters)}
              </div>
              <div className={`${isPrimary ? 'text-sm' : 'text-xs'} opacity-80`}>Voters</div>
            </div>
            <div>
              <div className={`${isPrimary ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold mb-1`}>
                {election.parties.length}
              </div>
              <div className={`${isPrimary ? 'text-sm' : 'text-xs'} opacity-80`}>Major Parties</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        {isPrimary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={() => {
                // TODO: Navigate to tracking page
                console.log('Track Promises clicked');
              }}
            >
              📊 Track Promises
            </button>
            <button
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={() => {
                // TODO: Navigate to comparison page
                console.log('Compare Parties clicked');
              }}
            >
              ⚖️ Compare Parties
            </button>
            <button
              className="bg-white hover:bg-white/90 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              onClick={() => {
                // TODO: Open registration link
                window.open('https://www.nvsp.in/', '_blank', 'noopener,noreferrer');
              }}
            >
              📝 Register to Vote
            </button>
          </div>
        )}

        {/* Urgency Badge */}
        {isPrimary && (
          <div className="mt-6 text-center">
            <span
              className={`inline-block ${colors.badge} px-4 py-2 rounded-full text-sm font-semibold`}
            >
              {urgencyLevel === 'high' && '🔥 Voting Soon!'}
              {urgencyLevel === 'medium' && '⏰ Mark Your Calendar'}
              {urgencyLevel === 'low' && '📅 Plan Ahead'}
              {urgencyLevel === 'past' && '✅ Election Concluded'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectionCountdown;
