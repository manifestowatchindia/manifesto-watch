/**
 * HeroSection Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { HeroSection } from '../HeroSection';
import { UpcomingElection } from '../ElectionCountdownStrip';

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
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('HeroSection', () => {
  describe('rendering', () => {
    it('renders the default tagline', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText(/Track Political Promises/i)).toBeInTheDocument();
    });

    it('renders custom tagline', () => {
      renderWithRouter(
        <HeroSection 
          elections={mockElections} 
          tagline="Custom Tagline Here"
        />
      );
      
      expect(screen.getByText(/Custom Tagline Here/i)).toBeInTheDocument();
    });

    it('renders subtitle text', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      expect(screen.getByText(/comprehensive platform/i)).toBeInTheDocument();
    });

    it('renders custom subtitle', () => {
      renderWithRouter(
        <HeroSection 
          elections={mockElections} 
          subtitle="Custom subtitle text here"
        />
      );
      
      expect(screen.getByText('Custom subtitle text here')).toBeInTheDocument();
    });

    it('renders brand mark', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      expect(screen.getByText('ManifestoWatch.in')).toBeInTheDocument();
    });
  });

  describe('CTA buttons', () => {
    it('renders default primary CTA', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      const primaryButton = screen.getByRole('button', { name: /Explore Promises/i });
      expect(primaryButton).toBeInTheDocument();
    });

    it('renders default secondary CTA', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      const secondaryButton = screen.getByRole('button', { name: /Compare Parties/i });
      expect(secondaryButton).toBeInTheDocument();
    });

    it('renders custom CTAs', () => {
      renderWithRouter(
        <HeroSection 
          elections={mockElections}
          primaryCTA={{ text: 'Custom Primary', link: '/custom-primary' }}
          secondaryCTA={{ text: 'Custom Secondary', link: '/custom-secondary' }}
        />
      );
      
      expect(screen.getByRole('button', { name: /Custom Primary/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Custom Secondary/i })).toBeInTheDocument();
    });

    it('links to correct URLs', () => {
      const { container } = renderWithRouter(
        <HeroSection 
          elections={mockElections}
          primaryCTA={{ text: 'Primary', link: '/test-link' }}
        />
      );
      
      const link = container.querySelector('a[href="/test-link"]');
      expect(link).toBeInTheDocument();
    });
  });

  describe('election countdown strip', () => {
    it('shows countdown strip by default', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      expect(screen.getByText('Upcoming Elections')).toBeInTheDocument();
    });

    it('hides countdown strip when showCountdownStrip is false', () => {
      renderWithRouter(
        <HeroSection 
          elections={mockElections} 
          showCountdownStrip={false}
        />
      );
      
      expect(screen.queryByText('Upcoming Elections')).not.toBeInTheDocument();
    });

    it('hides countdown strip when no elections', () => {
      renderWithRouter(<HeroSection elections={[]} />);
      
      expect(screen.queryByText('Upcoming Elections')).not.toBeInTheDocument();
    });
  });

  describe('trust indicators', () => {
    it('renders trust indicator stats', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      expect(screen.getByText('28+')).toBeInTheDocument();
      expect(screen.getByText('States Tracked')).toBeInTheDocument();
      expect(screen.getByText('1000+')).toBeInTheDocument();
      expect(screen.getByText('Promises Monitored')).toBeInTheDocument();
    });

    it('renders non-partisan indicator', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('Non-Partisan')).toBeInTheDocument();
    });
  });

  describe('background variants', () => {
    it('applies gradient background by default', () => {
      const { container } = renderWithRouter(
        <HeroSection elections={mockElections} />
      );
      
      const section = container.querySelector('section');
      // Uses hero-gradient-bg class or inline gradient style
      expect(section).toHaveClass('hero-gradient-bg');
    });

    it('applies dark background variant', () => {
      const { container } = renderWithRouter(
        <HeroSection elections={mockElections} variant="dark" />
      );
      
      const section = container.querySelector('section');
      // Uses design system variable for dark background
      expect(section).toHaveClass('bg-[var(--color-bg-primary)]');
    });

    it('applies image background with overlay', () => {
      const { container } = renderWithRouter(
        <HeroSection 
          elections={mockElections} 
          variant="image"
          backgroundImage="https://example.com/bg.jpg"
        />
      );
      
      // Should have overlay div with backdrop-blur-sm
      const overlay = container.querySelector('.backdrop-blur-sm');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has banner role', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('has accessible label', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      expect(screen.getByLabelText(/hero section/i)).toBeInTheDocument();
    });

    it('heading is level 1', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('decorative elements are hidden from screen readers', () => {
      const { container } = renderWithRouter(
        <HeroSection elections={mockElections} />
      );
      
      const decorativeElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeElements.length).toBeGreaterThan(0);
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      const { container } = renderWithRouter(
        <HeroSection elections={mockElections} className="custom-hero" />
      );
      
      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-hero');
    });

    it('has responsive container', () => {
      const { container } = renderWithRouter(
        <HeroSection elections={mockElections} />
      );
      
      expect(container.querySelector('.container')).toBeInTheDocument();
    });
  });

  describe('responsive design', () => {
    it('has responsive padding classes', () => {
      const { container } = renderWithRouter(
        <HeroSection elections={mockElections} />
      );
      
      const contentDiv = container.querySelector('.py-16');
      expect(contentDiv).toBeInTheDocument();
    });

    it('has responsive typography classes', () => {
      renderWithRouter(<HeroSection elections={mockElections} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-3xl');
      expect(heading).toHaveClass('md:text-5xl');
    });
  });
});
