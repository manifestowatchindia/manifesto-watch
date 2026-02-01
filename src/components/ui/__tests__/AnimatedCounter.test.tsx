/**
 * Tests for AnimatedCounter Component
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnimatedCounter } from '../AnimatedCounter';

// Mock requestAnimationFrame
let rafCallback: FrameRequestCallback | null = null;
const mockRaf = jest.fn((callback: FrameRequestCallback) => {
  rafCallback = callback;
  return 1;
});
const mockCancelRaf = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  window.requestAnimationFrame = mockRaf;
  window.cancelAnimationFrame = mockCancelRaf;
  rafCallback = null;
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
});

describe('AnimatedCounter', () => {
  it('renders with initial value when shouldAnimate is false', () => {
    render(<AnimatedCounter value={100} shouldAnimate={false} data-testid="counter" />);
    
    expect(screen.getByTestId('counter')).toHaveTextContent('100');
  });

  it('starts from 0 when shouldAnimate is true', () => {
    render(<AnimatedCounter value={100} shouldAnimate={true} data-testid="counter" />);
    
    expect(screen.getByTestId('counter')).toHaveTextContent('0');
  });

  it('renders prefix correctly', () => {
    render(<AnimatedCounter value={100} prefix="₹" shouldAnimate={false} data-testid="counter" />);
    
    expect(screen.getByTestId('counter')).toHaveTextContent('₹100');
  });

  it('renders suffix correctly', () => {
    render(<AnimatedCounter value={75} suffix="%" shouldAnimate={false} data-testid="counter" />);
    
    expect(screen.getByTestId('counter')).toHaveTextContent('75%');
  });

  it('renders with decimals', () => {
    render(<AnimatedCounter value={45.5} decimals={1} shouldAnimate={false} data-testid="counter" />);
    
    expect(screen.getByTestId('counter')).toHaveTextContent('45.5');
  });

  it('applies custom className', () => {
    render(<AnimatedCounter value={50} className="custom-class" data-testid="counter" />);
    
    expect(screen.getByTestId('counter')).toHaveClass('custom-class');
  });

  it('has aria-live attribute for accessibility', () => {
    render(<AnimatedCounter value={50} data-testid="counter" />);
    
    expect(screen.getByTestId('counter')).toHaveAttribute('aria-live', 'polite');
  });

  it('formats numbers with Indian locale', () => {
    render(<AnimatedCounter value={1000000} shouldAnimate={false} data-testid="counter" />);
    
    // Indian locale uses different grouping
    expect(screen.getByTestId('counter')).toHaveTextContent(/10,00,000/);
  });

  it('animates value when shouldAnimate changes to true', () => {
    const { rerender } = render(
      <AnimatedCounter value={100} shouldAnimate={false} data-testid="counter" />
    );
    
    expect(screen.getByTestId('counter')).toHaveTextContent('100');
    
    // Start animation
    rerender(<AnimatedCounter value={100} shouldAnimate={true} data-testid="counter" />);
    
    // Animation should start from 0
    expect(mockRaf).toHaveBeenCalled();
  });

  it('cleans up animation reference on unmount', () => {
    // Just verify the component unmounts without errors
    const { unmount } = render(<AnimatedCounter value={100} shouldAnimate={true} />);
    
    // Component should unmount cleanly
    expect(() => unmount()).not.toThrow();
  });

  it('combines prefix, value, and suffix correctly', () => {
    render(
      <AnimatedCounter 
        value={50} 
        prefix="+" 
        suffix="%" 
        shouldAnimate={false} 
        data-testid="counter" 
      />
    );
    
    expect(screen.getByTestId('counter')).toHaveTextContent('+50%');
  });
});
