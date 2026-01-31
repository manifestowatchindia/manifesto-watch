/**
 * Homepage Component Tests
 * Tests for homepage with integrated ElectionCountdown
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Homepage } from '../Homepage';
import { electionService } from '../../../services/election/electionService';
import { Election } from '../../../lib/types';

// Mock child components
jest.mock('../ExploreTopTopics', () => ({
  ExploreTopTopics: () => <div data-testid="explore-top-topics">Explore Top Topics</div>,
}));

jest.mock('../UpcomingElections', () => ({
  UpcomingElections: () => <div data-testid="upcoming-elections">Upcoming Elections</div>,
}));

jest.mock('../../../components/SEO', () => ({
  __esModule: true,
  default: () => <div data-testid="seo">SEO</div>,
}));

jest.mock('../../../components/election/ElectionCountdown', () => ({
  ElectionCountdown: ({ election }: { election: Election }) => (
    <div data-testid="election-countdown">
      Election Countdown: {election.state}
    </div>
  ),
}));

// Mock electionService
jest.mock('../../../services/election/electionService', () => ({
  electionService: {
    getActiveElections: jest.fn(),
    getUserState: jest.fn(),
  },
}));

describe('Homepage', () => {
  const mockElectionKerala: Election = {
    id: 'kerala-2026',
    state: 'Kerala',
    date: '2026-04-15',
    constituencies: 140,
    voters: 26700000,
    parties: ['LDF', 'UDF', 'NDA'],
    manifestosReleased: 3,
    promisesTracked: 456,
    electionType: 'state_assembly',
    regionCode: 'KL',
  };

  const mockElectionMaharashtra: Election = {
    id: 'maharashtra-2026',
    state: 'Maharashtra',
    date: '2026-05-20',
    constituencies: 288,
    voters: 89000000,
    parties: ['MVA', 'NDA'],
    manifestosReleased: 2,
    promisesTracked: 678,
    electionType: 'state_assembly',
    regionCode: 'MH',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (electionService.getUserState as jest.Mock).mockResolvedValue(null);
    (electionService.getActiveElections as jest.Mock).mockResolvedValue([mockElectionKerala]);
  });

  describe('Loading State', () => {
    it('should display loading skeleton while fetching elections', () => {
      // Make the promise never resolve to keep loading state
      (electionService.getActiveElections as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );

      render(<Homepage />);

      expect(screen.getByRole('status', { name: /loading election information/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/loading election information/i)).toBeInTheDocument();
    });

    it('should have accessible loading state', () => {
      (electionService.getActiveElections as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );

      render(<Homepage />);

      const loadingElement = screen.getByRole('status');
      expect(loadingElement).toHaveAttribute('aria-label', 'Loading election information');
    });
  });

  describe('Election Fetching', () => {
    it('should fetch active elections on mount', async () => {
      render(<Homepage />);

      await waitFor(() => {
        expect(electionService.getActiveElections).toHaveBeenCalledTimes(1);
      });

      expect(electionService.getActiveElections).toHaveBeenCalledWith(180, undefined);
    });

    it('should attempt to get user state on mount', async () => {
      render(<Homepage />);

      await waitFor(() => {
        expect(electionService.getUserState).toHaveBeenCalledTimes(1);
      });
    });

    it('should display closest election by default', async () => {
      (electionService.getActiveElections as jest.Mock).mockResolvedValue([
        mockElectionKerala,
        mockElectionMaharashtra,
      ]);

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('election-countdown')).toBeInTheDocument();
      });

      expect(screen.getByText(/Election Countdown: Kerala/)).toBeInTheDocument();
    });

    it('should prioritize user state election when available', async () => {
      (electionService.getUserState as jest.Mock).mockResolvedValue('Maharashtra');
      (electionService.getActiveElections as jest.Mock).mockResolvedValue([
        mockElectionKerala,
        mockElectionMaharashtra,
      ]);

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('election-countdown')).toBeInTheDocument();
      });

      expect(screen.getByText(/Election Countdown: Maharashtra/)).toBeInTheDocument();
    });

    it('should pass user state to getActiveElections when available', async () => {
      (electionService.getUserState as jest.Mock).mockResolvedValue('Kerala');

      render(<Homepage />);

      await waitFor(() => {
        expect(electionService.getActiveElections).toHaveBeenCalledWith(180, 'Kerala');
      });
    });

    it('should use closest election when user state election not found', async () => {
      (electionService.getUserState as jest.Mock).mockResolvedValue('Tamil Nadu');
      (electionService.getActiveElections as jest.Mock).mockResolvedValue([
        mockElectionKerala,
        mockElectionMaharashtra,
      ]);

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('election-countdown')).toBeInTheDocument();
      });

      // Should show Kerala (first in array) since Tamil Nadu not found
      expect(screen.getByText(/Election Countdown: Kerala/)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error message when API fails', async () => {
      (electionService.getActiveElections as jest.Mock).mockRejectedValue(
        new Error('API Error')
      );

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      expect(screen.getByText(/Unable to load election information/)).toBeInTheDocument();
      expect(screen.getByText(/Please try refreshing the page/)).toBeInTheDocument();
    });

    it('should have accessible error message', async () => {
      (electionService.getActiveElections as jest.Mock).mockRejectedValue(
        new Error('API Error')
      );

      render(<Homepage />);

      await waitFor(() => {
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveAttribute('aria-live', 'polite');
      });
    });

    it('should log error to console on failure', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('Network failure');
      (electionService.getActiveElections as jest.Mock).mockRejectedValue(error);

      render(<Homepage />);

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith(
          'Failed to fetch featured election:',
          error
        );
      });

      consoleError.mockRestore();
    });

    it('should not display election countdown when error occurs', async () => {
      (electionService.getActiveElections as jest.Mock).mockRejectedValue(
        new Error('API Error')
      );

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      expect(screen.queryByTestId('election-countdown')).not.toBeInTheDocument();
    });
  });

  describe('No Elections State', () => {
    it('should display message when no elections are available', async () => {
      (electionService.getActiveElections as jest.Mock).mockResolvedValue([]);

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByText(/No Upcoming Elections/)).toBeInTheDocument();
      });

      expect(screen.getByText(/There are no elections scheduled/)).toBeInTheDocument();
    });

    it('should display message when elections is null', async () => {
      (electionService.getActiveElections as jest.Mock).mockResolvedValue(null);

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByText(/No Upcoming Elections/)).toBeInTheDocument();
      });
    });

    it('should not display election countdown when no elections available', async () => {
      (electionService.getActiveElections as jest.Mock).mockResolvedValue([]);

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByText(/No Upcoming Elections/)).toBeInTheDocument();
      });

      expect(screen.queryByTestId('election-countdown')).not.toBeInTheDocument();
    });
  });

  describe('Component Rendering', () => {
    it('should render SEO component', async () => {
      render(<Homepage />);

      expect(screen.getByTestId('seo')).toBeInTheDocument();
    });

    it('should render ExploreTopTopics section', async () => {
      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('explore-top-topics')).toBeInTheDocument();
      });
    });

    it('should render UpcomingElections section', async () => {
      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('upcoming-elections')).toBeInTheDocument();
      });
    });

    it('should display ElectionCountdown when election is available', async () => {
      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('election-countdown')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have gradient background section', async () => {
      const { container } = render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('election-countdown')).toBeInTheDocument();
      });

      const section = container.querySelector('section.bg-gradient-to-b');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('from-blue-50', 'to-white');
    });

    it('should have responsive padding classes', async () => {
      const { container } = render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('election-countdown')).toBeInTheDocument();
      });

      const section = container.querySelector('section');
      expect(section).toHaveClass('py-8', 'md:py-12');
    });

    it('should have container with responsive padding', async () => {
      const { container } = render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('election-countdown')).toBeInTheDocument();
      });

      const containerDiv = container.querySelector('.container.mx-auto.px-4');
      expect(containerDiv).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should complete full loading cycle successfully', async () => {
      render(<Homepage />);

      // Should start with loading
      expect(screen.getByRole('status')).toBeInTheDocument();

      // Should end with countdown
      await waitFor(() => {
        expect(screen.getByTestId('election-countdown')).toBeInTheDocument();
      });

      // Should not have loading or error
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should handle getUserState failure gracefully', async () => {
      (electionService.getUserState as jest.Mock).mockRejectedValue(
        new Error('Geolocation denied')
      );
      (electionService.getActiveElections as jest.Mock).mockResolvedValue([mockElectionKerala]);

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('election-countdown')).toBeInTheDocument();
      });

      // Should still show election (without user state)
      expect(screen.getByText(/Election Countdown: Kerala/)).toBeInTheDocument();
      
      // Should have been called without user state
      expect(electionService.getActiveElections).toHaveBeenCalledWith(180, undefined);
    });

    it('should render all sections in correct order', async () => {
      const { container } = render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('election-countdown')).toBeInTheDocument();
      });

      const sections = Array.from(container.querySelectorAll('section, div[data-testid]'));
      const testIds = sections
        .map(el => el.getAttribute('data-testid'))
        .filter(Boolean);

      // SEO should be first (in helmet)
      expect(testIds[0]).toBe('seo');
      // Election countdown section (no testid, but comes before others)
      // Then ExploreTopTopics
      expect(testIds).toContain('explore-top-topics');
      // Then UpcomingElections
      expect(testIds).toContain('upcoming-elections');
    });
  });
});
