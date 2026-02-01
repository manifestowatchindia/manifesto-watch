/**
 * CountdownTimer Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CountdownTimer } from '../CountdownTimer';
import { CountdownValues } from '../../../hooks/useCountdown';

// Mock useCountdown hook - must be before imports that use it
const mockCountdownValue = {
  days: 74,
  hours: 12,
  minutes: 30,
  seconds: 45,
  totalMilliseconds: 6438645000,
  isComplete: false,
  isPast: false,
};

jest.mock('../../../hooks/useCountdown', () => ({
  useCountdown: () => mockCountdownValue,
  useMultipleCountdowns: jest.fn(),
}));

describe('CountdownTimer', () => {
  const futureDate = '2026-04-15T10:00:00Z';

  describe('rendering', () => {
    it('renders countdown values correctly', () => {
      render(<CountdownTimer targetDate={futureDate} />);
      
      expect(screen.getByText('74')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText('45')).toBeInTheDocument();
    });

    it('renders time unit labels', () => {
      render(<CountdownTimer targetDate={futureDate} />);
      
      expect(screen.getByText('Days')).toBeInTheDocument();
      expect(screen.getByText('Hours')).toBeInTheDocument();
      expect(screen.getByText('Min')).toBeInTheDocument();
      expect(screen.getByText('Sec')).toBeInTheDocument();
    });

    it('hides seconds when showSeconds is false', () => {
      render(<CountdownTimer targetDate={futureDate} showSeconds={false} />);
      
      expect(screen.getByText('Days')).toBeInTheDocument();
      expect(screen.getByText('Hours')).toBeInTheDocument();
      expect(screen.getByText('Min')).toBeInTheDocument();
      expect(screen.queryByText('Sec')).not.toBeInTheDocument();
    });

    it('uses compact labels when compact is true', () => {
      render(<CountdownTimer targetDate={futureDate} compact />);
      
      expect(screen.getByText('d')).toBeInTheDocument();
      expect(screen.getByText('h')).toBeInTheDocument();
      expect(screen.getByText('m')).toBeInTheDocument();
      expect(screen.getByText('s')).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it('applies small size styles', () => {
      const { container } = render(<CountdownTimer targetDate={futureDate} size="sm" />);
      
      // Check for small size class indicators
      expect(container.querySelector('.gap-1')).toBeInTheDocument();
    });

    it('applies medium size styles by default', () => {
      const { container } = render(<CountdownTimer targetDate={futureDate} />);
      
      expect(container.querySelector('.gap-2')).toBeInTheDocument();
    });

    it('applies large size styles', () => {
      const { container } = render(<CountdownTimer targetDate={futureDate} size="lg" />);
      
      expect(container.querySelector('.gap-3')).toBeInTheDocument();
    });
  });

  describe('with pre-calculated values', () => {
    it('uses provided countdownValues instead of calculating', () => {
      const customValues: CountdownValues = {
        days: 100,
        hours: 5,
        minutes: 10,
        seconds: 20,
        totalMilliseconds: 8658620000,
        isComplete: false,
        isPast: false,
      };

      render(<CountdownTimer targetDate={futureDate} countdownValues={customValues} />);
      
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('05')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
    });
  });

  describe('completed countdown', () => {
    it('shows completed state when countdown is done', () => {
      const completedValues: CountdownValues = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 0,
        isComplete: true,
        isPast: true,
      };

      render(<CountdownTimer targetDate={futureDate} countdownValues={completedValues} />);
      
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has timer role', () => {
      render(<CountdownTimer targetDate={futureDate} />);
      
      expect(screen.getByRole('timer')).toBeInTheDocument();
    });

    it('has aria-live polite attribute', () => {
      render(<CountdownTimer targetDate={futureDate} />);
      
      const timer = screen.getByRole('timer');
      expect(timer).toHaveAttribute('aria-live', 'polite');
    });

    it('provides screen reader accessible time announcement', () => {
      render(<CountdownTimer targetDate={futureDate} />);
      
      expect(screen.getByText(/remaining/i)).toBeInTheDocument();
    });

    it('accepts custom aria-label', () => {
      render(<CountdownTimer targetDate={futureDate} ariaLabel="Custom countdown label" />);
      
      const timer = screen.getByRole('timer');
      expect(timer).toHaveAttribute('aria-label', 'Custom countdown label');
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <CountdownTimer targetDate={futureDate} className="custom-class" />
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders separators between time units', () => {
      render(<CountdownTimer targetDate={futureDate} />);
      
      // Should have 3 separators (between days:hours, hours:minutes, minutes:seconds)
      const separators = screen.getAllByText(':');
      expect(separators).toHaveLength(3);
    });
  });
});
