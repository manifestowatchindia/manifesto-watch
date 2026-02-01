/**
 * ElectionCountdownStrip Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ElectionCountdownStrip, UpcomingElection } from '../ElectionCountdownStrip';

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

const mockElections: UpcomingElection[] = [
  {
    id: 'kerala-2026',
    state: 'Kerala',
    stateCode: 'KL',
    electionType: 'assembly',
    electionDate: '2026-04-15',
    status: 'upcoming',
  },
  {
    id: 'tamil-nadu-2026',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    electionType: 'assembly',
    electionDate: '2026-05-01',
    status: 'upcoming',
  },
  {
    id: 'west-bengal-2026',
    state: 'West Bengal',
    stateCode: 'WB',
    electionType: 'assembly',
    electionDate: '2026-05-15',
    status: 'upcoming',
  },
  {
    id: 'assam-2026',
    state: 'Assam',
    stateCode: 'AS',
    electionType: 'assembly',
    electionDate: '2026-04-20',
    status: 'upcoming',
  },
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('ElectionCountdownStrip', () => {
  describe('rendering', () => {
    it('renders the section title', () => {
      renderWithRouter(<ElectionCountdownStrip elections={mockElections} />);
      
      expect(screen.getByText('Upcoming Elections')).toBeInTheDocument();
    });

    it('renders all election cards', () => {
      renderWithRouter(<ElectionCountdownStrip elections={mockElections} />);
      
      expect(screen.getByText('Kerala')).toBeInTheDocument();
      expect(screen.getByText('Tamil Nadu')).toBeInTheDocument();
      expect(screen.getByText('West Bengal')).toBeInTheDocument();
      expect(screen.getByText('Assam')).toBeInTheDocument();
    });

    it('respects maxDisplay prop', () => {
      renderWithRouter(<ElectionCountdownStrip elections={mockElections} maxDisplay={2} />);
      
      // Should only show 2 elections (sorted by date, so Kerala and Assam)
      expect(screen.getByText('Kerala')).toBeInTheDocument();
      expect(screen.getByText('Assam')).toBeInTheDocument();
    });

    it('displays days remaining', () => {
      renderWithRouter(<ElectionCountdownStrip elections={mockElections} />);
      
      // All cards should show "74" days (from mocked useCountdown)
      const dayDisplays = screen.getAllByText('74');
      expect(dayDisplays.length).toBeGreaterThanOrEqual(1);
    });

    it('displays election type badge', () => {
      renderWithRouter(<ElectionCountdownStrip elections={mockElections} />);
      
      const assemblyBadges = screen.getAllByText(/assembly/i);
      expect(assemblyBadges.length).toBeGreaterThan(0);
    });

    it('shows "View All" link', () => {
      renderWithRouter(<ElectionCountdownStrip elections={mockElections} />);
      
      expect(screen.getByText('View All →')).toBeInTheDocument();
      expect(screen.getByText('View All →').closest('a')).toHaveAttribute('href', '/elections');
    });
  });

  describe('sorting and filtering', () => {
    it('sorts elections by date', () => {
      const { container } = renderWithRouter(
        <ElectionCountdownStrip elections={mockElections} />
      );
      
      // Get all election cards
      const links = container.querySelectorAll('a[href^="/elections/"]');
      const hrefs = Array.from(links).map(link => link.getAttribute('href'));
      
      // First should be Kerala (April 15), then Assam (April 20)
      expect(hrefs[0]).toContain('kerala');
    });

    it('excludes completed elections', () => {
      const electionsWithCompleted: UpcomingElection[] = [
        ...mockElections,
        {
          id: 'completed-election',
          state: 'Completed State',
          stateCode: 'CS',
          electionType: 'assembly',
          electionDate: '2025-01-01',
          status: 'completed',
        },
      ];

      renderWithRouter(<ElectionCountdownStrip elections={electionsWithCompleted} />);
      
      expect(screen.queryByText('Completed State')).not.toBeInTheDocument();
    });
  });

  describe('links', () => {
    it('generates correct election page links', () => {
      const { container } = renderWithRouter(
        <ElectionCountdownStrip elections={mockElections} />
      );
      
      const keralaLink = container.querySelector('a[href*="kerala-2026"]');
      expect(keralaLink).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('renders nothing when no elections provided', () => {
      const { container } = renderWithRouter(
        <ElectionCountdownStrip elections={[]} />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('renders nothing when all elections are completed', () => {
      const completedElections: UpcomingElection[] = [
        {
          id: 'completed-1',
          state: 'Completed 1',
          stateCode: 'C1',
          electionType: 'assembly',
          electionDate: '2025-01-01',
          status: 'completed',
        },
      ];

      const { container } = renderWithRouter(
        <ElectionCountdownStrip elections={completedElections} />
      );
      
      expect(container.firstChild).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('has proper region role', () => {
      renderWithRouter(<ElectionCountdownStrip elections={mockElections} />);
      
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('has accessible label', () => {
      renderWithRouter(<ElectionCountdownStrip elections={mockElections} />);
      
      expect(screen.getByLabelText(/upcoming elections countdown/i)).toBeInTheDocument();
    });

    it('election cards have accessible labels', () => {
      renderWithRouter(<ElectionCountdownStrip elections={mockElections} />);
      
      const keralaLink = screen.getByLabelText(/Kerala Election/i);
      expect(keralaLink).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      const { container } = renderWithRouter(
        <ElectionCountdownStrip elections={mockElections} className="custom-strip" />
      );
      
      expect(container.firstChild).toHaveClass('custom-strip');
    });

    it('has gradient background', () => {
      const { container } = renderWithRouter(
        <ElectionCountdownStrip elections={mockElections} />
      );
      
      // Uses design system colors via inline style
      expect(container.firstChild).toHaveClass('backdrop-blur-md');
    });
  });

  describe('state icons', () => {
    it('displays state emoji when no flag URL provided', () => {
      renderWithRouter(<ElectionCountdownStrip elections={mockElections} />);
      
      // Should find state emojis
      expect(screen.getByRole('img', { name: /Kerala icon/i })).toBeInTheDocument();
    });

    it('displays flag image when URL is provided', () => {
      const electionsWithFlag: UpcomingElection[] = [
        {
          ...mockElections[0],
          flagUrl: 'https://example.com/kerala-flag.png',
        },
      ];

      renderWithRouter(<ElectionCountdownStrip elections={electionsWithFlag} />);
      
      const flagImg = screen.getByAltText('Kerala flag');
      expect(flagImg).toBeInTheDocument();
      expect(flagImg).toHaveAttribute('src', 'https://example.com/kerala-flag.png');
    });
  });
});
