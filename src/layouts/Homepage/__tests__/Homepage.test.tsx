/**
 * Homepage Component Tests
 * Tests for homepage with integrated HeroSection (Multi-Election Countdown)
 * Updated to use design system colors
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Homepage } from '../Homepage';
import { electionService } from '../../../services/election/electionService';
import { Election } from '../../../lib/types';
import { UpcomingElection } from '../../../components/homepage';

// Mock child components
jest.mock('../ExploreTopTopics', () => ({
  ExploreTopTopics: () => <div data-testid="explore-top-topics">Explore Top Topics</div>,
}));

jest.mock('../../../components/SEO', () => ({
  __esModule: true,
  default: () => <div data-testid="seo">SEO</div>,
}));

// Mock HeroSection, LiveTrackerWidget, TopPromisesSection, StateElectionHubs, InteractiveIndiaMap, DataHubSection, ManifestoLibrarySection, AboutManifestoWatch, SubscribeSocialSection, SectionErrorBoundary, and HomepageSEO components
jest.mock('../../../components/homepage', () => ({
  HeroSection: ({ elections }: { elections: UpcomingElection[] }) => (
    <div data-testid="hero-section">
      <div data-testid="election-countdown-strip">
        {elections.map((election) => (
          <div key={election.id} data-testid={`election-card-${election.id}`}>
            Election: {election.state}
          </div>
        ))}
      </div>
      <div data-testid="hero-tagline">Track Political Promises. Hold Leaders Accountable.</div>
    </div>
  ),
  LiveTrackerWidget: ({ stats, title }: { stats: any; title: string }) => (
    <div data-testid="live-tracker-widget">
      <div>{title}</div>
      <div>Total: {stats.total}</div>
    </div>
  ),
  TopPromisesSection: () => (
    <div data-testid="top-promises-section">
      <div>Top Promises by Category</div>
    </div>
  ),
  StateElectionHubs: () => (
    <div data-testid="state-election-hubs">
      <div>State Election Hubs 2026</div>
    </div>
  ),
  InteractiveIndiaMap: () => (
    <div data-testid="interactive-india-map">
      <div>Explore India</div>
    </div>
  ),
  DataHubSection: () => (
    <div data-testid="data-hub-section">
      <div>Data Hub</div>
    </div>
  ),
  ManifestoLibrarySection: () => (
    <div data-testid="manifesto-library-section">
      <div>Manifesto Library</div>
    </div>
  ),
  AboutManifestoWatch: () => (
    <div data-testid="about-manifesto-watch">
      <div>About ManifestoWatch</div>
    </div>
  ),
  SubscribeSocialSection: () => (
    <div data-testid="subscribe-social-section">
      <div>Stay Informed</div>
    </div>
  ),
  SectionErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  HomepageSEO: () => <div data-testid="homepage-seo">SEO Meta Tags</div>,
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
    // Don't mock getUserState since it's no longer called in the new implementation
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

      expect(electionService.getActiveElections).toHaveBeenCalledWith(365);
    });

    it('should display elections in HeroSection', async () => {
      (electionService.getActiveElections as jest.Mock).mockResolvedValue([
        mockElectionKerala,
        mockElectionMaharashtra,
      ]);

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      });

      // Check that elections are displayed
      expect(screen.getByTestId('election-card-kerala-2026')).toBeInTheDocument();
      expect(screen.getByTestId('election-card-maharashtra-2026')).toBeInTheDocument();
    });

    it('should display hero tagline', async () => {
      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('hero-tagline')).toBeInTheDocument();
      });

      expect(screen.getByText(/Track Political Promises/)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should use default elections when API fails', async () => {
      (electionService.getActiveElections as jest.Mock).mockRejectedValue(
        new Error('API Error')
      );

      render(<Homepage />);

      // Should still render HeroSection with default elections
      await waitFor(() => {
        expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      });
    });

    it('should log error to console on failure', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('Network failure');
      (electionService.getActiveElections as jest.Mock).mockRejectedValue(error);

      render(<Homepage />);

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith(
          'Failed to fetch elections:',
          error
        );
      });

      consoleError.mockRestore();
    });
  });

  describe('Fallback Elections', () => {
    it('should display default elections when no elections are fetched', async () => {
      (electionService.getActiveElections as jest.Mock).mockResolvedValue([]);

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      });

      // Should have default elections (kerala, tamil-nadu, west-bengal, assam)
      expect(screen.getByTestId('election-card-kerala-2026')).toBeInTheDocument();
    });

    it('should display default elections when API returns null', async () => {
      (electionService.getActiveElections as jest.Mock).mockResolvedValue(null);

      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      });

      // Should have default elections
      expect(screen.getByTestId('election-card-kerala-2026')).toBeInTheDocument();
    });
  });

  describe('Component Rendering', () => {
    it('should render SEO component', async () => {
      render(<Homepage />);

      expect(screen.getByTestId('homepage-seo')).toBeInTheDocument();
    });

    it('should render ExploreTopTopics section', async () => {
      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('explore-top-topics')).toBeInTheDocument();
      });
    });

    it('should render InteractiveIndiaMap section', async () => {
      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('interactive-india-map')).toBeInTheDocument();
      });
    });

    it('should display HeroSection when election data is loaded', async () => {
      render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      });
    });
  });

  describe('Integration', () => {
    it('should complete full loading cycle successfully', async () => {
      render(<Homepage />);

      // Should start with loading
      expect(screen.getByRole('status')).toBeInTheDocument();

      // Should end with hero section
      await waitFor(() => {
        expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      });

      // Should not have loading anymore
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('should render all sections in correct order', async () => {
      const { container } = render(<Homepage />);

      await waitFor(() => {
        expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      });

      const sections = Array.from(container.querySelectorAll('section, div[data-testid]'));
      const testIds = sections
        .map(el => el.getAttribute('data-testid'))
        .filter(Boolean);

      // HomepageSEO should be first
      expect(testIds[0]).toBe('homepage-seo');
      // Then HeroSection
      expect(testIds).toContain('hero-section');
      // Then ExploreTopTopics
      expect(testIds).toContain('explore-top-topics');
    });
  });
});

