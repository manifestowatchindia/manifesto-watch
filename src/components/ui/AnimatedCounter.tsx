/**
 * AnimatedCounter Component
 * Animates number counting up from 0 to target value
 * Uses requestAnimationFrame for smooth 60fps animation
 */

import React, { useEffect, useState, useRef } from 'react';

export interface AnimatedCounterProps {
  value: number;
  duration?: number;        // Animation duration in ms
  prefix?: string;          // Text before number (e.g., "$", "₹")
  suffix?: string;          // Text after number (e.g., "%", "+")
  decimals?: number;        // Number of decimal places
  shouldAnimate?: boolean;  // Control when animation starts
  className?: string;
  'data-testid'?: string;
}

/**
 * Easing function for smooth animation (ease-out-cubic)
 */
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

/**
 * Format number with commas for thousands
 */
const formatNumber = (num: number, decimals: number): string => {
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1500,
  prefix = '',
  suffix = '',
  decimals = 0,
  shouldAnimate = true,
  className = '',
  'data-testid': dataTestId,
}) => {
  const [displayValue, setDisplayValue] = useState(shouldAnimate ? 0 : value);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Don't animate if shouldAnimate is false
    if (!shouldAnimate) {
      setDisplayValue(value);
      return;
    }

    // Prevent re-animation if already animated
    if (hasAnimatedRef.current) {
      setDisplayValue(value);
      return;
    }

    // Reset for new animation
    setDisplayValue(0);
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      const currentValue = Math.round(easedProgress * value * Math.pow(10, decimals)) / Math.pow(10, decimals);
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        hasAnimatedRef.current = true;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, decimals, shouldAnimate]);

  return (
    <span 
      className={`tabular-nums ${className}`}
      data-testid={dataTestId}
      aria-live="polite"
    >
      {prefix}{formatNumber(displayValue, decimals)}{suffix}
    </span>
  );
};

export default AnimatedCounter;
