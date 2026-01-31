/**
 * ElectionCountdown Component Tests
 * Comprehensive test suite for ElectionCountdown component
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ElectionCountdown } from '../ElectionCountdown';
import { Election } from '../../../lib/types';
import { electionService } from '../../../services/election/electionService';

// Mock electionService
jest.mock('../../../services/election/electionService', () => ({
  electionService: {
    calculateCountdown: jest.fn(),
    getUrgencyLevel: jest.fn(),
  },
}));

describe('ElectionCountdown', () => {
  // Mock election data
  const mockElection: Election = {
    id: 'election-1',
    state: 'Karnataka',
    date: '2026-04-15T00:00:00Z',
    constituencies: 224,
    voters: 50000000,
    parties: ['BJP', 'INC', 'JDS'],
    manifestosReleased: 3,
    promisesTracked: 150,
    electionType: 'state_assembly',
    regionCode: 'KA',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render countdown with election details', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      render(<ElectionCountdown election={mockElection} />);

      // Check election header
      expect(screen.getByText(/Karnataka Election 2026/i)).toBeInTheDocument();
      expect(screen.getByText(/STATE ASSEMBLY/i)).toBeInTheDocument();

      // Check countdown numbers
      expect(screen.getByLabelText('45 days')).toHaveTextContent('45');
      expect(screen.getByLabelText('12 hours')).toHaveTextContent('12');
      expect(screen.getByLabelText('30 minutes')).toHaveTextContent('30');
      expect(screen.getByLabelText('15 seconds')).toHaveTextContent('15');

      // Check countdown labels
      expect(screen.getByText('Days')).toBeInTheDocument();
      expect(screen.getByText('Hours')).toBeInTheDocument();
      expect(screen.getByText('Minutes')).toBeInTheDocument();
      expect(screen.getByText('Seconds')).toBeInTheDocument();
    });

    it('should render election statistics', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      render(<ElectionCountdown election={mockElection} />);

      // Check statistics (formatted with Indian number system)
      expect(screen.getByText('5,00,00,000')).toBeInTheDocument(); // voters
      expect(screen.getByText('224')).toBeInTheDocument(); // constituencies
      expect(screen.getByText('3')).toBeInTheDocument(); // parties

      expect(screen.getByText('Constituencies')).toBeInTheDocument();
      expect(screen.getByText('Voters')).toBeInTheDocument();
      expect(screen.getByText('Major Parties')).toBeInTheDocument();
    });

    it('should render CTA buttons for primary priority', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      render(<ElectionCountdown election={mockElection} priority="primary" />);

      expect(screen.getByText('📊 Track Promises')).toBeInTheDocument();
      expect(screen.getByText('⚖️ Compare Parties')).toBeInTheDocument();
      expect(screen.getByText('📝 Register to Vote')).toBeInTheDocument();
    });

    it('should not render CTA buttons for secondary priority', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      render(<ElectionCountdown election={mockElection} priority="secondary" />);

      expect(screen.queryByText('📊 Track Promises')).not.toBeInTheDocument();
      expect(screen.queryByText('⚖️ Compare Parties')).not.toBeInTheDocument();
      expect(screen.queryByText('📝 Register to Vote')).not.toBeInTheDocument();
    });
  });

  describe('Countdown Logic', () => {
    it('should update countdown every second', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      const { rerender } = render(<ElectionCountdown election={mockElection} />);

      // Initial render should show 15 seconds
      expect(screen.getByLabelText(/15 seconds/)).toBeInTheDocument();

      // Update the mock to return 14 seconds
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 14,
        totalMilliseconds: 3932414000,
      });

      // Advance timer to trigger the interval
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // The component should have called calculateCountdown again and updated
      expect(screen.getByLabelText(/14 seconds/)).toBeInTheDocument();
    });

    it('should stop countdown when election passes', async () => {
      let callCount = 0;
      (electionService.calculateCountdown as jest.Mock).mockImplementation(() => {
        callCount++;
        if (callCount > 2) {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalMilliseconds: 0,
          };
        }
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 3 - callCount,
          totalMilliseconds: (3 - callCount) * 1000,
        };
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('high');

      render(<ElectionCountdown election={mockElection} />);

      // Advance timer to pass election
      jest.advanceTimersByTime(3000);

      await waitFor(() => {
        expect(screen.getByText(/Election has concluded/i)).toBeInTheDocument();
      });
    });

    it('should clear interval on unmount', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      const { unmount } = render(<ElectionCountdown election={mockElection} />);

      // Get number of pending timers before unmount
      const timersBefore = jest.getTimerCount();
      expect(timersBefore).toBe(1);

      unmount();

      // Verify timer was cleared
      const timersAfter = jest.getTimerCount();
      expect(timersAfter).toBe(0);
    });
  });

  describe('Urgency Levels', () => {
    it('should apply high urgency styles (< 30 days)', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 15,
        hours: 5,
        minutes: 30,
        seconds: 45,
        totalMilliseconds: 1315845000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('high');

      const { container } = render(<ElectionCountdown election={mockElection} />);

      // Check for red gradient classes
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv.className).toContain('from-red-500');
      expect(mainDiv.className).toContain('to-red-700');

      // Check urgency badge
      expect(screen.getByText('🔥 Voting Soon!')).toBeInTheDocument();
    });

    it('should apply medium urgency styles (30-90 days)', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 60,
        hours: 12,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 5184000000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      const { container } = render(<ElectionCountdown election={mockElection} />);

      // Check for orange gradient classes
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv.className).toContain('from-orange-500');
      expect(mainDiv.className).toContain('to-orange-700');

      // Check urgency badge
      expect(screen.getByText('⏰ Mark Your Calendar')).toBeInTheDocument();
    });

    it('should apply low urgency styles (> 90 days)', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 120,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 10368000000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('low');

      const { container } = render(<ElectionCountdown election={mockElection} />);

      // Check for green gradient classes
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv.className).toContain('from-green-500');
      expect(mainDiv.className).toContain('to-green-700');

      // Check urgency badge
      expect(screen.getByText('📅 Plan Ahead')).toBeInTheDocument();
    });

    it('should handle past elections', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 0,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('past');

      render(<ElectionCountdown election={mockElection} />);

      expect(screen.getByText(/Election has concluded/i)).toBeInTheDocument();
      expect(screen.getByText(/Karnataka Election/i)).toBeInTheDocument();
    });
  });

  describe('Number Formatting', () => {
    it('should format countdown numbers with leading zeros', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 5,
        hours: 3,
        minutes: 9,
        seconds: 1,
        totalMilliseconds: 442141000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('high');

      render(<ElectionCountdown election={mockElection} />);

      expect(screen.getByLabelText('5 days')).toHaveTextContent('05');
      expect(screen.getByLabelText('3 hours')).toHaveTextContent('03');
      expect(screen.getByLabelText('9 minutes')).toHaveTextContent('09');
      expect(screen.getByLabelText('1 seconds')).toHaveTextContent('01');
    });

    it('should format large numbers with Indian number system', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      render(<ElectionCountdown election={mockElection} />);

      // 50000000 voters should be formatted as 5,00,00,000
      expect(screen.getByText('5,00,00,000')).toBeInTheDocument();
      // 224 constituencies should remain as is
      expect(screen.getByText('224')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      render(<ElectionCountdown election={mockElection} />);

      // Check region label
      expect(screen.getByRole('region', { name: /Election countdown for Karnataka/i })).toBeInTheDocument();

      // Check timer role
      expect(screen.getByRole('timer')).toBeInTheDocument();

      // Check individual number labels
      expect(screen.getByLabelText('45 days')).toBeInTheDocument();
      expect(screen.getByLabelText('12 hours')).toBeInTheDocument();
      expect(screen.getByLabelText('30 minutes')).toBeInTheDocument();
      expect(screen.getByLabelText('15 seconds')).toBeInTheDocument();
    });

    it('should have aria-live for real-time updates', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      const { container } = render(<ElectionCountdown election={mockElection} />);

      const timer = container.querySelector('[role="timer"]');
      expect(timer).toHaveAttribute('aria-live', 'polite');
      expect(timer).toHaveAttribute('aria-atomic', 'true');
    });

    it('should have keyboard-accessible buttons', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      render(<ElectionCountdown election={mockElection} priority="primary" />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        // Should not have tabindex -1
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should apply primary size classes', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      const { container } = render(<ElectionCountdown election={mockElection} priority="primary" />);

      // Check for responsive padding classes
      expect(container.innerHTML).toContain('p-8');
      expect(container.innerHTML).toContain('md:p-12');
    });

    it('should apply secondary size classes', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      const { container } = render(<ElectionCountdown election={mockElection} priority="secondary" />);

      // Check for smaller padding
      expect(container.innerHTML).toContain('p-6');
      expect(container.innerHTML).not.toContain('md:p-12');
    });
  });

  describe('Button Interactions', () => {
    it('should log console message for Track Promises button', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      render(<ElectionCountdown election={mockElection} priority="primary" />);

      const trackButton = screen.getByText('📊 Track Promises');
      trackButton.click();

      expect(consoleSpy).toHaveBeenCalledWith('Track Promises clicked');

      consoleSpy.mockRestore();
    });

    it('should log console message for Compare Parties button', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      render(<ElectionCountdown election={mockElection} priority="primary" />);

      const compareButton = screen.getByText('⚖️ Compare Parties');
      compareButton.click();

      expect(consoleSpy).toHaveBeenCalledWith('Compare Parties clicked');

      consoleSpy.mockRestore();
    });

    it('should open registration link in new window', () => {
      (electionService.calculateCountdown as jest.Mock).mockReturnValue({
        days: 45,
        hours: 12,
        minutes: 30,
        seconds: 15,
        totalMilliseconds: 3932415000,
      });
      (electionService.getUrgencyLevel as jest.Mock).mockReturnValue('medium');

      const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation();

      render(<ElectionCountdown election={mockElection} priority="primary" />);

      const registerButton = screen.getByText('📝 Register to Vote');
      registerButton.click();

      expect(windowOpenSpy).toHaveBeenCalledWith(
        'https://www.nvsp.in/',
        '_blank',
        'noopener,noreferrer'
      );

      windowOpenSpy.mockRestore();
    });
  });
});
