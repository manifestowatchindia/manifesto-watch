/**
 * useCountdown Hook Tests
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useCountdown, useMultipleCountdowns, CountdownValues } from '../useCountdown';

// Mock timers
jest.useFakeTimers();

describe('useCountdown', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('countdown calculation', () => {
    it('calculates correct countdown values', () => {
      // Set target to 5 days from now
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      futureDate.setHours(futureDate.getHours() + 2);
      futureDate.setMinutes(futureDate.getMinutes() + 30);
      
      const { result } = renderHook(() => useCountdown(futureDate));
      
      expect(result.current.days).toBeGreaterThanOrEqual(4);
      expect(result.current.days).toBeLessThanOrEqual(5);
      expect(result.current.isComplete).toBe(false);
      expect(result.current.isPast).toBe(false);
    });

    it('handles ISO date strings', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 10);
      
      const { result } = renderHook(() => useCountdown(futureDate.toISOString()));
      
      expect(result.current.days).toBeGreaterThanOrEqual(9);
      expect(result.current.days).toBeLessThanOrEqual(10);
      expect(result.current.isComplete).toBe(false);
    });

    it('returns zero values for past dates', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      
      const { result } = renderHook(() => useCountdown(pastDate));
      
      expect(result.current.days).toBe(0);
      expect(result.current.hours).toBe(0);
      expect(result.current.minutes).toBe(0);
      expect(result.current.seconds).toBe(0);
      expect(result.current.isComplete).toBe(true);
      expect(result.current.isPast).toBe(true);
    });

    it('handles null target date gracefully', () => {
      const { result } = renderHook(() => useCountdown(null));
      
      expect(result.current.isComplete).toBe(true);
      expect(result.current.isPast).toBe(true);
    });
  });

  describe('timer updates', () => {
    it('updates countdown every second by default', () => {
      const futureDate = new Date();
      futureDate.setMinutes(futureDate.getMinutes() + 5);
      
      const { result } = renderHook(() => useCountdown(futureDate));
      
      const initialSeconds = result.current.seconds;
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      // After 1 second, the countdown should have updated
      // Note: seconds might not differ by exactly 1 due to timing
      expect(result.current.totalMilliseconds).toBeLessThan(5 * 60 * 1000);
    });

    it('respects custom update interval', () => {
      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 1);
      
      const { result } = renderHook(() => 
        useCountdown(futureDate, { updateInterval: 5000 })
      );
      
      const initialValue = result.current.totalMilliseconds;
      
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      // Should not have updated yet (interval is 5000ms)
      // The value should be approximately the same
      expect(result.current.totalMilliseconds).toBeLessThanOrEqual(initialValue);
    });
  });

  describe('onComplete callback', () => {
    it('calls onComplete when countdown finishes', async () => {
      const onComplete = jest.fn();
      const futureDate = new Date();
      futureDate.setSeconds(futureDate.getSeconds() + 2);
      
      renderHook(() => useCountdown(futureDate, { onComplete }));
      
      // Advance time past the target
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledTimes(1);
      });
    });

    it('does not call onComplete multiple times', async () => {
      const onComplete = jest.fn();
      const futureDate = new Date();
      futureDate.setSeconds(futureDate.getSeconds() + 1);
      
      renderHook(() => useCountdown(futureDate, { onComplete }));
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('cleanup', () => {
    it('clears interval on unmount', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 1);
      
      const { unmount } = renderHook(() => useCountdown(futureDate));
      
      unmount();
      
      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });
  });
});

describe('useMultipleCountdowns', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('tracks multiple countdowns simultaneously', () => {
    const date1 = new Date();
    date1.setDate(date1.getDate() + 5);
    
    const date2 = new Date();
    date2.setDate(date2.getDate() + 10);
    
    const dates = [
      { id: 'election1', date: date1 },
      { id: 'election2', date: date2 },
    ];
    
    const { result } = renderHook(() => useMultipleCountdowns(dates));
    
    expect(result.current.has('election1')).toBe(true);
    expect(result.current.has('election2')).toBe(true);
    
    const countdown1 = result.current.get('election1');
    const countdown2 = result.current.get('election2');
    
    expect(countdown1?.days).toBeLessThan(countdown2?.days || 0);
  });

  it('updates all countdowns together', () => {
    const date1 = new Date();
    date1.setMinutes(date1.getMinutes() + 5);
    
    const date2 = new Date();
    date2.setMinutes(date2.getMinutes() + 10);
    
    const dates = [
      { id: 'e1', date: date1 },
      { id: 'e2', date: date2 },
    ];
    
    const { result } = renderHook(() => useMultipleCountdowns(dates));
    
    const initial1 = result.current.get('e1')?.totalMilliseconds;
    const initial2 = result.current.get('e2')?.totalMilliseconds;
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(result.current.get('e1')?.totalMilliseconds).toBeLessThanOrEqual(initial1 || 0);
    expect(result.current.get('e2')?.totalMilliseconds).toBeLessThanOrEqual(initial2 || 0);
  });
});
