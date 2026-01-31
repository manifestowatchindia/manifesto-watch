/**
 * ElectionCard Component Tests
 * Comprehensive test suite for ElectionCard component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ElectionCard } from '../ElectionCard';
import { Election } from '../../../lib/types';
import { electionService } from '../../../services/election/electionService';

// Mock the electionService
jest.mock('../../../services/election/electionService', () => ({
  electionService: {
    calculateCountdown: jest.fn(),
    getUrgencyLevel: jest.fn(),
  },
}));

describe('ElectionCard', () => {
  const mockElection: Election = {
    id: 'kerala-2026',
    state: 'Kerala',
    date: '2026-04-15',
    constituencies: 140,
    voters: 26700000,
    parties: ['LDF', 'UDF', 'NDA', 'Others'],
    manifestosReleased: 4,
    promisesTracked: 456,
    electionType: 'state_assembly',
    regionCode: 'KL',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (electionService.calculateCountdown as jest.Mock).mockReturnValue({
      days: 45,
      hours: 12,
      minutes: 30,
      seconds: 15,
      totalMilliseconds: 3932415000,
    });
    (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');
  });

  describe('Rendering', () => {
    it('should render election state name', () => {
      render(<ElectionCard election={mockElection} />);
      expect(screen.getByText('Kerala')).toBeInTheDocument();
    });

    it('should render election type and date', () => {
      render(<ElectionCard election={mockElection} />);
      expect(screen.getByText(/Assembly Election/)).toBeInTheDocument();
      expect(screen.getByText(/2026-04-15/)).toBeInTheDocument();
    });

    it('should render region code when provided', () => {
      render(<ElectionCard election={mockElection} />);
      expect(screen.getByText(/Region: KL/)).toBeInTheDocument();
    });

    it('should not render region code when not provided', () => {
      const electionWithoutRegion = { ...mockElection, regionCode: undefined };
      render(<ElectionCard election={electionWithoutRegion} />);
      expect(screen.queryByText(/Region:/)).not.toBeInTheDocument();
    });

    it('should render all statistics', () => {
      render(<ElectionCard election={mockElection} />);
      
      // Check labels
      expect(screen.getByText('Constituencies')).toBeInTheDocument();
      expect(screen.getByText('Voters')).toBeInTheDocument();
      expect(screen.getByText('Parties')).toBeInTheDocument();
      expect(screen.getByText('Manifestos')).toBeInTheDocument();
      expect(screen.getByText('Promises')).toBeInTheDocument();
      
      // Check values
      expect(screen.getByText('140')).toBeInTheDocument();
      expect(screen.getByText('2.67 Cr')).toBeInTheDocument(); // 26.7M formatted
      expect(screen.getAllByText('4')[0]).toBeInTheDocument(); // parties.length (multiple instances might exist)
      expect(screen.getByText('456')).toBeInTheDocument();
    });

    it('should render verified badge', () => {
      render(<ElectionCard election={mockElection} />);
      expect(screen.getByText(/✓ Verified/)).toBeInTheDocument();
    });

    it('should render view details button', () => {
      render(<ElectionCard election={mockElection} />);
      expect(screen.getByRole('button', { name: /View details/i })).toBeInTheDocument();
    });
  });

  describe('Days Remaining Badge', () => {
    it('should display days remaining for future elections', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      
      render(<ElectionCard election={mockElection} />);
      expect(screen.getByText(/45 Days/)).toBeInTheDocument();
      expect(screen.getByLabelText(/45 Days remaining/)).toBeInTheDocument();
    });

    it('should display "1 Day" for singular day remaining', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 1,
        hours: 5,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 105015000,
      });
      
      render(<ElectionCard election={mockElection} />);
      expect(screen.getByText(/1 Day/)).toBeInTheDocument();
    });

    it('should display "Today" when election is today', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 0,
        hours: 5,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 19815000,
      });
      
      render(<ElectionCard election={mockElection} />);
      expect(screen.getByText(/Today/)).toBeInTheDocument();
    });

    it('should display "Concluded" for past elections', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: -86400000, // -1 day
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('past');
      
      render(<ElectionCard election={mockElection} />);
      expect(screen.getByText(/Concluded/)).toBeInTheDocument();
    });
  });

  describe('Urgency Styling', () => {
    it('should apply high urgency styles', () => {
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('high');
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 15,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 1296000000,
      });
      
      const { container } = render(<ElectionCard election={mockElection} />);
      
      // Check for red gradient in badge
      const badge = screen.getByLabelText(/15 Days remaining/);
      expect(badge).toHaveClass('from-red-500', 'to-red-600');
      
      // Check for red gradient in accent line
      const accentLine = container.querySelector('.h-1.w-full');
      expect(accentLine).toHaveClass('from-red-500', 'to-red-600');
    });

    it('should apply medium urgency styles', () => {
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');
      
      const { container } = render(<ElectionCard election={mockElection} />);
      
      const badge = screen.getByLabelText(/45 Days remaining/);
      expect(badge).toHaveClass('from-orange-500', 'to-orange-600');
      
      const accentLine = container.querySelector('.h-1.w-full');
      expect(accentLine).toHaveClass('from-orange-500', 'to-orange-600');
    });

    it('should apply low urgency styles', () => {
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('low');
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 120,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 10368000000,
      });
      
      const { container } = render(<ElectionCard election={mockElection} />);
      
      const badge = screen.getByLabelText(/120 Days remaining/);
      expect(badge).toHaveClass('from-green-500', 'to-green-600');
      
      const accentLine = container.querySelector('.h-1.w-full');
      expect(accentLine).toHaveClass('from-green-500', 'to-green-600');
    });

    it('should apply past election styles', () => {
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('past');
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: -86400000,
      });
      
      const { container } = render(<ElectionCard election={mockElection} />);
      
      const badge = screen.getByLabelText(/Concluded remaining/);
      expect(badge).toHaveClass('from-gray-400', 'to-gray-500');
      
      const accentLine = container.querySelector('.h-1.w-full');
      expect(accentLine).toHaveClass('from-gray-400', 'to-gray-500');
    });
  });

  describe('Number Formatting', () => {
    it('should format numbers in crores', () => {
      const electionWithCrores = {
        ...mockElection,
        voters: 26700000, // 2.67 Cr
      };
      
      render(<ElectionCard election={electionWithCrores} />);
      expect(screen.getByText('2.67 Cr')).toBeInTheDocument();
    });

    it('should format numbers in lakhs', () => {
      const electionWithLakhs = {
        ...mockElection,
        voters: 500000, // 5.00 L
      };
      
      render(<ElectionCard election={electionWithLakhs} />);
      expect(screen.getByText('5.00 L')).toBeInTheDocument();
    });

    it('should format numbers in thousands', () => {
      const electionWithThousands = {
        ...mockElection,
        voters: 5000, // 5.0K
      };
      
      render(<ElectionCard election={electionWithThousands} />);
      expect(screen.getByText('5.0K')).toBeInTheDocument();
    });

    it('should display small numbers without formatting', () => {
      const electionWithSmallNumber = {
        ...mockElection,
        voters: 500,
      };
      
      render(<ElectionCard election={electionWithSmallNumber} />);
      expect(screen.getByText('500')).toBeInTheDocument();
    });
  });

  describe('Election Type Formatting', () => {
    it('should format assembly-election type', () => {
      render(<ElectionCard election={mockElection} />);
      expect(screen.getByText(/Assembly Election/)).toBeInTheDocument();
    });

    it('should format lok_sabha election type', () => {
      const lokSabhaElection = {
        ...mockElection,
        electionType: 'lok_sabha' as const,
      };
      
      render(<ElectionCard election={lokSabhaElection} />);
      expect(screen.getByText(/Lok Sabha/)).toBeInTheDocument();
    });

    it('should format vidhan_sabha election type', () => {
      const vidhanSabhaElection = {
        ...mockElection,
        electionType: 'vidhan_sabha' as const,
      };
      
      render(<ElectionCard election={vidhanSabhaElection} />);
      expect(screen.getByText(/Vidhan Sabha/)).toBeInTheDocument();
    });
  });

  describe('Click Interactions', () => {
    it('should call onViewDetails with election ID when button is clicked', () => {
      const onViewDetails = jest.fn();
      
      render(<ElectionCard election={mockElection} onViewDetails={onViewDetails} />);
      
      const button = screen.getByRole('button', { name: /View details/i });
      fireEvent.click(button);
      
      expect(onViewDetails).toHaveBeenCalledTimes(1);
      expect(onViewDetails).toHaveBeenCalledWith('kerala-2026');
    });

    it('should not throw error when onViewDetails is not provided', () => {
      render(<ElectionCard election={mockElection} />);
      
      const button = screen.getByRole('button', { name: /View details/i });
      
      expect(() => {
        fireEvent.click(button);
      }).not.toThrow();
    });

    it('should trigger onViewDetails on Enter key press', () => {
      const onViewDetails = jest.fn();
      
      render(<ElectionCard election={mockElection} onViewDetails={onViewDetails} />);
      
      const button = screen.getByRole('button', { name: /View details/i });
      fireEvent.keyPress(button, { key: 'Enter', code: 'Enter', charCode: 13 });
      
      expect(onViewDetails).toHaveBeenCalledWith('kerala-2026');
    });

    it('should trigger onViewDetails on Space key press', () => {
      const onViewDetails = jest.fn();
      
      render(<ElectionCard election={mockElection} onViewDetails={onViewDetails} />);
      
      const button = screen.getByRole('button', { name: /View details/i });
      fireEvent.keyPress(button, { key: ' ', code: 'Space', charCode: 32 });
      
      expect(onViewDetails).toHaveBeenCalledWith('kerala-2026');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on card', () => {
      render(<ElectionCard election={mockElection} />);
      
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-label', expect.stringContaining('Kerala'));
      expect(card).toHaveAttribute('aria-label', expect.stringContaining('Assembly Election'));
    });

    it('should have proper ARIA label on badge', () => {
      render(<ElectionCard election={mockElection} />);
      
      expect(screen.getByLabelText(/45 Days remaining/)).toBeInTheDocument();
    });

    it('should have proper ARIA label on button', () => {
      render(<ElectionCard election={mockElection} />);
      
      const button = screen.getByRole('button', { name: /View details for Kerala election/i });
      expect(button).toBeInTheDocument();
    });

    it('should have focus visible styles', () => {
      const { container } = render(<ElectionCard election={mockElection} />);
      
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('focus-within:ring-2', 'focus-within:ring-blue-500');
    });

    it('should have keyboard accessible button', () => {
      render(<ElectionCard election={mockElection} />);
      
      const button = screen.getByRole('button', { name: /View details/i });
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid classes', () => {
      const { container } = render(<ElectionCard election={mockElection} />);
      
      const statsGrid = container.querySelector('.grid.grid-cols-2.sm\\:grid-cols-3');
      expect(statsGrid).toBeInTheDocument();
    });

    it('should have responsive text sizing', () => {
      render(<ElectionCard election={mockElection} />);
      
      const heading = screen.getByText('Kerala');
      expect(heading).toHaveClass('text-2xl');
    });
  });

  describe('Hover Effects', () => {
    it('should have hover transition classes', () => {
      const { container } = render(<ElectionCard election={mockElection} />);
      
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('transition-all', 'duration-300', 'hover:shadow-lg', 'hover:scale-[1.02]');
    });

    it('should have hover effect on button', () => {
      render(<ElectionCard election={mockElection} />);
      
      const button = screen.getByRole('button', { name: /View details/i });
      expect(button).toHaveClass('hover:bg-blue-700');
    });

    it('should have active scale effect on button', () => {
      render(<ElectionCard election={mockElection} />);
      
      const button = screen.getByRole('button', { name: /View details/i });
      expect(button).toHaveClass('active:scale-[0.98]');
    });
  });

  describe('Edge Cases', () => {
    it('should handle election with minimal data', () => {
      const minimalElection: Election = {
        id: 'test-2026',
        state: 'Test State',
        date: '2026-06-01',
        constituencies: 50,
        voters: 1000000,
        parties: ['Party A', 'Party B'],
        manifestosReleased: 2,
        promisesTracked: 100,
        electionType: 'state_assembly',
      };
      
      render(<ElectionCard election={minimalElection} />);
      expect(screen.getByText('Test State')).toBeInTheDocument();
    });

    it('should handle very large numbers correctly', () => {
      const largeElection = {
        ...mockElection,
        voters: 100000000, // 10 Cr
      };
      
      render(<ElectionCard election={largeElection} />);
      expect(screen.getByText('10.00 Cr')).toBeInTheDocument();
    });

    it('should handle election with many parties', () => {
      const manyPartiesElection = {
        ...mockElection,
        parties: Array(20).fill('Party').map((p, i) => `${p}${i + 1}`),
      };
      
      render(<ElectionCard election={manyPartiesElection} />);
      expect(screen.getByText('20')).toBeInTheDocument(); // parties count
    });
  });
});
