/**
 * Tests for useInViewAnimation Hook
 */

import { renderHook, act } from '@testing-library/react';
import { useInViewAnimation } from '../useInViewAnimation';

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
let observerCallback: (entries: IntersectionObserverEntry[]) => void;

const mockIntersectionObserver = jest.fn().mockImplementation((callback) => {
  observerCallback = callback;
  return {
    observe: mockObserve,
    unobserve: jest.fn(),
    disconnect: mockDisconnect,
  };
});

beforeEach(() => {
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  mockIntersectionObserver.mockClear();
  window.IntersectionObserver = mockIntersectionObserver as any;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useInViewAnimation', () => {
  it('should return ref, isInView, and hasAnimated', () => {
    const { result } = renderHook(() => useInViewAnimation());
    
    expect(result.current.ref).toBeDefined();
    expect(result.current.isInView).toBe(false);
    expect(result.current.hasAnimated).toBe(false);
  });

  it('should accept custom options', () => {
    const { result } = renderHook(() => useInViewAnimation({
      threshold: 0.5,
      triggerOnce: false,
      rootMargin: '100px',
      delay: 500,
    }));
    
    // Hook returns expected shape
    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.isInView).toBe('boolean');
    expect(typeof result.current.hasAnimated).toBe('boolean');
  });

  it('should start with isInView as false', () => {
    const { result } = renderHook(() => useInViewAnimation());
    
    expect(result.current.isInView).toBe(false);
  });

  it('should start with hasAnimated as false', () => {
    const { result } = renderHook(() => useInViewAnimation());
    
    expect(result.current.hasAnimated).toBe(false);
  });

  it('should handle triggerOnce option', () => {
    const { result: result1 } = renderHook(() => useInViewAnimation({ triggerOnce: true }));
    const { result: result2 } = renderHook(() => useInViewAnimation({ triggerOnce: false }));
    
    // Both should start as not in view
    expect(result1.current.isInView).toBe(false);
    expect(result2.current.isInView).toBe(false);
  });

  it('should handle different threshold values', () => {
    const { result } = renderHook(() => useInViewAnimation({ threshold: 0.8 }));
    
    // Hook should work with any threshold
    expect(result.current.ref).toBeDefined();
  });

  it('should handle delay option', () => {
    const { result } = renderHook(() => useInViewAnimation({ delay: 1000 }));
    
    // Hook should work with delay
    expect(result.current.ref).toBeDefined();
  });

  it('should handle rootMargin option', () => {
    const { result } = renderHook(() => useInViewAnimation({ rootMargin: '50px' }));
    
    expect(result.current.ref).toBeDefined();
  });

  it('should return stable ref across renders', () => {
    const { result, rerender } = renderHook(() => useInViewAnimation());
    
    const firstRef = result.current.ref;
    rerender();
    const secondRef = result.current.ref;
    
    expect(firstRef).toBe(secondRef);
  });
});
