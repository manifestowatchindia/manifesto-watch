/**
 * CountdownTimer Component
 * A compact, animated countdown timer for election dates
 * Used within the ElectionCountdownStrip
 * 
 * Color Palette Reference:
 * - Background: --color-bg-elevated (#1a1a1a) with opacity
 * - Text: --color-text-primary (#FFFFFF), --color-text-secondary (#CCCCCC)
 * - Accent: --color-accent-tertiary (#00D4AA) for completion states
 */

import React from 'react';
import { useCountdown, CountdownValues } from '../../hooks/useCountdown';

export interface CountdownTimerProps {
  /** Target date/time for the countdown */
  targetDate: Date | string;
  /** Optional pre-calculated countdown values (for server-side rendering or parent-managed state) */
  countdownValues?: CountdownValues;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show seconds (can be hidden on mobile for cleaner display) */
  showSeconds?: boolean;
  /** Use compact format (74d instead of 74 Days) */
  compact?: boolean;
  /** Custom className for styling */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * Format number with leading zero
 */
const formatNumber = (num: number): string => {
  return String(num).padStart(2, '0');
};

/**
 * CountdownTimer Component
 * Displays days, hours, minutes, and optionally seconds in a styled format
 * Uses ManifestoWatch Design System colors
 */
export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  countdownValues,
  size = 'md',
  showSeconds = true,
  compact = false,
  className = '',
  ariaLabel,
}) => {
  // Use provided values or calculate internally
  const calculatedCountdown = useCountdown(countdownValues ? null : targetDate);
  const countdown = countdownValues || calculatedCountdown;

  // Size-based styles
  const sizeStyles = {
    sm: {
      container: 'gap-1',
      unit: 'min-w-[36px] px-1.5 py-1',
      number: 'text-lg font-bold',
      label: 'text-[10px]',
      separator: 'text-lg',
    },
    md: {
      container: 'gap-2',
      unit: 'min-w-[48px] px-2 py-1.5',
      number: 'text-2xl font-bold',
      label: 'text-xs',
      separator: 'text-2xl',
    },
    lg: {
      container: 'gap-3',
      unit: 'min-w-[64px] px-3 py-2',
      number: 'text-4xl font-bold',
      label: 'text-sm',
      separator: 'text-4xl',
    },
  };

  const styles = sizeStyles[size];

  if (countdown.isComplete) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <span 
          className={`${styles.number}`}
          style={{ color: countdown.isPast ? 'var(--color-text-secondary, #CCCCCC)' : 'var(--color-accent-tertiary, #00D4AA)' }}
        >
          {countdown.isPast ? 'Completed' : 'Starting Soon'}
        </span>
      </div>
    );
  }

  const timeUnits = [
    { value: countdown.days, label: compact ? 'd' : 'Days', fullLabel: 'days' },
    { value: countdown.hours, label: compact ? 'h' : 'Hours', fullLabel: 'hours' },
    { value: countdown.minutes, label: compact ? 'm' : 'Min', fullLabel: 'minutes' },
    ...(showSeconds 
      ? [{ value: countdown.seconds, label: compact ? 's' : 'Sec', fullLabel: 'seconds' }] 
      : []
    ),
  ];

  const accessibleTime = `${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes${showSeconds ? `, ${countdown.seconds} seconds` : ''}`;

  return (
    <div
      className={`flex items-center justify-center ${styles.container} ${className}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel || `Countdown: ${accessibleTime}`}
    >
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.fullLabel}>
          {/* Time Unit Block - using design system colors */}
          <div className="flex flex-col items-center">
            <div 
              className={`backdrop-blur-sm rounded-lg ${styles.unit} text-center`}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }} /* --color-text-primary with opacity */
            >
              <span 
                className={`${styles.number} font-mono tabular-nums block leading-none`}
                style={{ color: 'var(--color-text-primary, #FFFFFF)' }}
                aria-hidden="true"
              >
                {formatNumber(unit.value)}
              </span>
            </div>
            <span 
              className={`${styles.label} uppercase tracking-wider mt-1`}
              style={{ color: 'var(--color-text-secondary, #CCCCCC)' }}
              aria-hidden="true"
            >
              {unit.label}
            </span>
          </div>

          {/* Separator (except after last unit) */}
          {index < timeUnits.length - 1 && (
            <span 
              className={`${styles.separator} font-light self-start mt-1`}
              style={{ color: 'var(--color-text-muted, #888888)' }}
              aria-hidden="true"
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
      
      {/* Screen reader only - full time announcement */}
      <span className="sr-only">{accessibleTime} remaining</span>
    </div>
  );
};

export default CountdownTimer;
