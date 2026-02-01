/**
 * useCountdown Hook
 * A custom hook for calculating and tracking countdown to a target date
 * Uses requestAnimationFrame for smooth, efficient updates
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
  isComplete: boolean;
  isPast: boolean;
}

export interface UseCountdownOptions {
  /** Update interval in milliseconds (default: 1000) */
  updateInterval?: number;
  /** Whether to use requestAnimationFrame for smoother updates */
  useRAF?: boolean;
  /** Callback when countdown completes */
  onComplete?: () => void;
}

/**
 * Calculate countdown values from target date
 */
const calculateCountdown = (targetDate: Date | string): CountdownValues => {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();
  const totalMilliseconds = target.getTime() - now.getTime();
  
  if (totalMilliseconds <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMilliseconds: 0,
      isComplete: true,
      isPast: true,
    };
  }

  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMilliseconds,
    isComplete: false,
    isPast: false,
  };
};

/**
 * Custom hook for countdown functionality
 * @param targetDate - The target date/time to count down to
 * @param options - Configuration options
 * @returns CountdownValues with days, hours, minutes, seconds, and status
 */
export const useCountdown = (
  targetDate: Date | string | null,
  options: UseCountdownOptions = {}
): CountdownValues => {
  const { 
    updateInterval = 1000, 
    useRAF = false,
    onComplete 
  } = options;

  const [countdown, setCountdown] = useState<CountdownValues>(() => 
    targetDate ? calculateCountdown(targetDate) : {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMilliseconds: 0,
      isComplete: true,
      isPast: true,
    }
  );

  const rafRef = useRef<number | undefined>(undefined);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const onCompleteCalledRef = useRef(false);

  const update = useCallback(() => {
    if (!targetDate) return;
    
    const newCountdown = calculateCountdown(targetDate);
    setCountdown(newCountdown);

    // Call onComplete callback once when countdown finishes
    if (newCountdown.isComplete && !onCompleteCalledRef.current && onComplete) {
      onCompleteCalledRef.current = true;
      onComplete();
    }
  }, [targetDate, onComplete]);

  useEffect(() => {
    if (!targetDate) return;

    // Reset the onComplete flag when target date changes
    onCompleteCalledRef.current = false;
    
    // Initial calculation
    update();

    if (useRAF) {
      // Use requestAnimationFrame for smoother updates
      let lastUpdate = Date.now();
      
      const tick = () => {
        const now = Date.now();
        if (now - lastUpdate >= updateInterval) {
          update();
          lastUpdate = now;
        }
        
        // Continue if not complete
        const currentCountdown = calculateCountdown(targetDate);
        if (!currentCountdown.isComplete) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      
      rafRef.current = requestAnimationFrame(tick);
    } else {
      // Use setInterval for standard updates
      intervalRef.current = setInterval(update, updateInterval);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [targetDate, updateInterval, useRAF, update]);

  return countdown;
};

/**
 * Hook to get countdown for multiple dates at once
 * Useful for displaying multiple election countdowns
 */
export const useMultipleCountdowns = (
  targetDates: Array<{ id: string; date: Date | string }>,
  options: UseCountdownOptions = {}
): Map<string, CountdownValues> => {
  const [countdowns, setCountdowns] = useState<Map<string, CountdownValues>>(() => {
    const initial = new Map<string, CountdownValues>();
    targetDates.forEach(({ id, date }) => {
      initial.set(id, calculateCountdown(date));
    });
    return initial;
  });

  const { updateInterval = 1000 } = options;

  useEffect(() => {
    const update = () => {
      const newCountdowns = new Map<string, CountdownValues>();
      targetDates.forEach(({ id, date }) => {
        newCountdowns.set(id, calculateCountdown(date));
      });
      setCountdowns(newCountdowns);
    };

    update();
    const intervalId = setInterval(update, updateInterval);

    return () => clearInterval(intervalId);
  }, [targetDates, updateInterval]);

  return countdowns;
};

export default useCountdown;
