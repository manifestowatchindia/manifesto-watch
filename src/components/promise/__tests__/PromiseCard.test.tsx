import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PromiseCard, Promise, PromiseCardProps } from '../PromiseCard';

// Mock promise data
const mockPromise: Promise = {
  id: 'promise-1',
  title: '100,000 Government Jobs in 5 Years',
  description:
    'Create 1 lakh government jobs across teaching, police, healthcare, and administrative departments over 5-year term (2026-2031).',
  party: {
    id: 'ldf',
    name: 'LDF (CPM-led)',
    logo: '/logos/ldf.png',
    color: '#FF0000',
  },
  category: 'Employment',
  subcategory: 'Government Jobs',
  verified: true,
  verificationSource: 'Manifesto page 34',
  metrics: {
    budget: '₹15,000 Crores',
    timeline: '5 years (2026-2031)',
    scope: 'State-wide, All 140 constituencies',
    beneficiaries: 'Youth, Unemployed graduates',
  },
  progress: {
    percentage: 67,
    status: 'in-progress',
    startDate: '2021-05-20',
    lastUpdated: '2026-01-15',
  },
  tags: ['Jobs', 'Youth', 'Government'],
};

const mockPromiseMinimal: Promise = {
  id: 'promise-2',
  title: 'Basic Promise',
  description: 'A basic promise with minimal data',
  party: {
    id: 'party-1',
    name: 'Test Party',
  },
  category: 'Healthcare',
  verified: false,
};

describe('PromiseCard', () => {
  describe('Rendering - Default Variant', () => {
    it('should render party logo when provided', () => {
      render(<PromiseCard promise={mockPromise} />);
      const logo = screen.getByAltText('LDF (CPM-led) logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logos/ldf.png');
    });

    it('should render party initials when logo is not provided', () => {
      render(<PromiseCard promise={mockPromiseMinimal} />);
      const initials = screen.getByText('TE');
      expect(initials).toBeInTheDocument();
    });

    it('should render promise title', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText('100,000 Government Jobs in 5 Years')).toBeInTheDocument();
    });

    it('should render promise description', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(
        screen.getByText(/Create 1 lakh government jobs across teaching/)
      ).toBeInTheDocument();
    });

    it('should render party name', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText('LDF (CPM-led)')).toBeInTheDocument();
    });

    it('should render category and subcategory', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText(/Employment > Government Jobs/)).toBeInTheDocument();
    });

    it('should render verification badge when verified', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText('✓ Verified')).toBeInTheDocument();
    });

    it('should not render verification badge when not verified', () => {
      render(<PromiseCard promise={mockPromiseMinimal} />);
      expect(screen.queryByText('✓ Verified')).not.toBeInTheDocument();
    });

    it('should render tags when provided', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText('Jobs')).toBeInTheDocument();
      expect(screen.getByText('Youth')).toBeInTheDocument();
      expect(screen.getByText('Government')).toBeInTheDocument();
    });
  });

  describe('Key Metrics Section', () => {
    it('should render all metrics when provided', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText('₹15,000 Crores')).toBeInTheDocument();
      expect(screen.getByText('5 years (2026-2031)')).toBeInTheDocument();
      expect(screen.getByText('State-wide, All 140 constituencies')).toBeInTheDocument();
      expect(screen.getByText('Youth, Unemployed graduates')).toBeInTheDocument();
    });

    it('should not render metrics section when no metrics provided', () => {
      render(<PromiseCard promise={mockPromiseMinimal} />);
      expect(screen.queryByText('Key Metrics')).not.toBeInTheDocument();
    });
  });

  describe('Progress Section', () => {
    it('should render progress section when progress data provided', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText('Progress Tracking')).toBeInTheDocument();
    });

    it('should render progress percentage', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText('67%')).toBeInTheDocument();
    });

    it('should render progress bar with correct percentage', () => {
      render(<PromiseCard promise={mockPromise} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '67');
      expect(progressBar).toHaveStyle({ width: '67%' });
    });

    it('should render status badge for in-progress status', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText(/🔄 In Progress/)).toBeInTheDocument();
    });

    it('should render status badge for completed status', () => {
      const completedPromise = {
        ...mockPromise,
        progress: { ...mockPromise.progress!, status: 'completed' as const },
      };
      render(<PromiseCard promise={completedPromise} />);
      expect(screen.getByText(/✅ Completed/)).toBeInTheDocument();
    });

    it('should render status badge for delayed status', () => {
      const delayedPromise = {
        ...mockPromise,
        progress: { ...mockPromise.progress!, status: 'delayed' as const },
      };
      render(<PromiseCard promise={delayedPromise} />);
      expect(screen.getByText(/⏸️ Delayed/)).toBeInTheDocument();
    });

    it('should render status badge for not-started status', () => {
      const notStartedPromise = {
        ...mockPromise,
        progress: { ...mockPromise.progress!, status: 'not-started' as const },
      };
      render(<PromiseCard promise={notStartedPromise} />);
      expect(screen.getByText(/⏹️ Not Started/)).toBeInTheDocument();
    });

    it('should render status badge for partially-completed status', () => {
      const partialPromise = {
        ...mockPromise,
        progress: { ...mockPromise.progress!, status: 'partially-completed' as const },
      };
      render(<PromiseCard promise={partialPromise} />);
      expect(screen.getByText(/⚡ Partially Completed/)).toBeInTheDocument();
    });

    it('should render start date when provided', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText(/Started:/)).toBeInTheDocument();
      expect(screen.getByText(/2021-05-20/)).toBeInTheDocument();
    });

    it('should render last updated date when provided', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText(/Last Updated:/)).toBeInTheDocument();
      expect(screen.getByText(/2026-01-15/)).toBeInTheDocument();
    });

    it('should not render progress section when no progress data', () => {
      render(<PromiseCard promise={mockPromiseMinimal} />);
      expect(screen.queryByText('Progress Tracking')).not.toBeInTheDocument();
    });
  });

  describe('Button Interactions', () => {
    it('should render View Detailed Report button', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.getByText('View Detailed Report')).toBeInTheDocument();
    });

    it('should call onViewDetails when View Detailed Report button is clicked', () => {
      const onViewDetails = jest.fn();
      render(<PromiseCard promise={mockPromise} onViewDetails={onViewDetails} />);
      const button = screen.getByText('View Detailed Report');
      fireEvent.click(button);
      expect(onViewDetails).toHaveBeenCalledWith('promise-1');
    });

    it('should not throw error when View Detailed Report clicked without handler', () => {
      render(<PromiseCard promise={mockPromise} />);
      const button = screen.getByText('View Detailed Report');
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('should render Add to Watchlist button when handler provided', () => {
      const onAddToWatchlist = jest.fn();
      render(<PromiseCard promise={mockPromise} onAddToWatchlist={onAddToWatchlist} />);
      expect(screen.getByText('☆ Add to Watchlist')).toBeInTheDocument();
    });

    it('should not render Add to Watchlist button when no handler provided', () => {
      render(<PromiseCard promise={mockPromise} />);
      expect(screen.queryByText(/Watchlist/)).not.toBeInTheDocument();
    });

    it('should call onAddToWatchlist when Add to Watchlist button is clicked', () => {
      const onAddToWatchlist = jest.fn();
      render(<PromiseCard promise={mockPromise} onAddToWatchlist={onAddToWatchlist} />);
      const button = screen.getByText('☆ Add to Watchlist');
      fireEvent.click(button);
      expect(onAddToWatchlist).toHaveBeenCalledWith('promise-1');
    });

    it('should display In Watchlist when isInWatchlist is true', () => {
      const onAddToWatchlist = jest.fn();
      render(
        <PromiseCard
          promise={mockPromise}
          onAddToWatchlist={onAddToWatchlist}
          isInWatchlist={true}
        />
      );
      expect(screen.getByText('★ In Watchlist')).toBeInTheDocument();
    });

    it('should trigger onViewDetails on Enter key press', () => {
      const onViewDetails = jest.fn();
      render(<PromiseCard promise={mockPromise} onViewDetails={onViewDetails} />);
      const button = screen.getByText('View Detailed Report');
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      expect(onViewDetails).toHaveBeenCalledWith('promise-1');
    });

    it('should trigger onViewDetails on Space key press', () => {
      const onViewDetails = jest.fn();
      render(<PromiseCard promise={mockPromise} onViewDetails={onViewDetails} />);
      const button = screen.getByText('View Detailed Report');
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      expect(onViewDetails).toHaveBeenCalledWith('promise-1');
    });
  });

  describe('Compact Variant', () => {
    it('should render compact layout when variant is compact', () => {
      const { container } = render(
        <PromiseCard promise={mockPromise} variant="compact" />
      );
      // Compact variant has simpler structure with fewer sections
      expect(screen.queryByText('Key Metrics')).not.toBeInTheDocument();
      expect(screen.queryByText('Progress Tracking')).not.toBeInTheDocument();
    });

    it('should render party logo in compact variant', () => {
      render(<PromiseCard promise={mockPromise} variant="compact" />);
      const logo = screen.getByAltText('LDF (CPM-led) logo');
      expect(logo).toBeInTheDocument();
    });

    it('should render title in compact variant', () => {
      render(<PromiseCard promise={mockPromise} variant="compact" />);
      expect(screen.getByText('100,000 Government Jobs in 5 Years')).toBeInTheDocument();
    });

    it('should render View Details button in compact variant', () => {
      render(<PromiseCard promise={mockPromise} variant="compact" />);
      expect(screen.getByText('View Details')).toBeInTheDocument();
    });

    it('should render watchlist button as star icon in compact variant', () => {
      const onAddToWatchlist = jest.fn();
      render(
        <PromiseCard
          promise={mockPromise}
          variant="compact"
          onAddToWatchlist={onAddToWatchlist}
        />
      );
      expect(screen.getByText('☆')).toBeInTheDocument();
    });

    it('should call handlers in compact variant', () => {
      const onViewDetails = jest.fn();
      const onAddToWatchlist = jest.fn();
      render(
        <PromiseCard
          promise={mockPromise}
          variant="compact"
          onViewDetails={onViewDetails}
          onAddToWatchlist={onAddToWatchlist}
        />
      );
      fireEvent.click(screen.getByText('View Details'));
      expect(onViewDetails).toHaveBeenCalledWith('promise-1');
      fireEvent.click(screen.getByText('☆'));
      expect(onAddToWatchlist).toHaveBeenCalledWith('promise-1');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on card', () => {
      const { container } = render(<PromiseCard promise={mockPromise} />);
      const article = container.querySelector('[role="article"]');
      expect(article).toHaveAttribute(
        'aria-label',
        'Promise: 100,000 Government Jobs in 5 Years'
      );
    });

    it('should have proper ARIA labels on View Details button', () => {
      render(<PromiseCard promise={mockPromise} />);
      const button = screen.getByLabelText(
        /View detailed information for 100,000 Government Jobs/
      );
      expect(button).toBeInTheDocument();
    });

    it('should have proper ARIA labels on Add to Watchlist button', () => {
      const onAddToWatchlist = jest.fn();
      render(<PromiseCard promise={mockPromise} onAddToWatchlist={onAddToWatchlist} />);
      const button = screen.getByLabelText(/Add .* to watchlist/);
      expect(button).toBeInTheDocument();
    });

    it('should have aria-pressed attribute on watchlist button', () => {
      const onAddToWatchlist = jest.fn();
      render(
        <PromiseCard
          promise={mockPromise}
          onAddToWatchlist={onAddToWatchlist}
          isInWatchlist={true}
        />
      );
      const button = screen.getByText('★ In Watchlist');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should have proper progress bar ARIA attributes', () => {
      render(<PromiseCard promise={mockPromise} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '67');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-label', '67% complete');
    });

    it('should have keyboard navigation support', () => {
      const onViewDetails = jest.fn();
      render(<PromiseCard promise={mockPromise} onViewDetails={onViewDetails} />);
      const button = screen.getByText('View Detailed Report');
      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });

  describe('Hover Effects', () => {
    it('should have hover transition classes', () => {
      const { container } = render(<PromiseCard promise={mockPromise} />);
      const card = container.querySelector('[role="article"]');
      expect(card).toHaveClass('hover:shadow-lg');
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('hover:scale-[1.01]');
    });

    it('should have hover classes on buttons', () => {
      render(<PromiseCard promise={mockPromise} />);
      const button = screen.getByText('View Detailed Report');
      expect(button).toHaveClass('hover:bg-blue-700');
    });
  });

  describe('Edge Cases', () => {
    it('should handle promise with no optional fields', () => {
      const minimalPromise: Promise = {
        id: 'min-1',
        title: 'Minimal Promise',
        description: 'Description only',
        party: { id: 'p1', name: 'Party' },
        category: 'Category',
        verified: false,
      };
      render(<PromiseCard promise={minimalPromise} />);
      expect(screen.getByText('Minimal Promise')).toBeInTheDocument();
      expect(screen.getByText('Description only')).toBeInTheDocument();
    });

    it('should handle 0% progress', () => {
      const zeroProgressPromise = {
        ...mockPromise,
        progress: { percentage: 0, status: 'not-started' as const },
      };
      render(<PromiseCard promise={zeroProgressPromise} />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('should handle 100% progress', () => {
      const completePromise = {
        ...mockPromise,
        progress: { percentage: 100, status: 'completed' as const },
      };
      render(<PromiseCard promise={completePromise} />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('should handle very long titles gracefully', () => {
      const longTitlePromise = {
        ...mockPromise,
        title:
          'This is an extremely long promise title that should be displayed properly without breaking the layout or causing any issues with the user interface design and responsive behavior',
      };
      render(<PromiseCard promise={longTitlePromise} />);
      expect(screen.getByText(/This is an extremely long promise title/)).toBeInTheDocument();
    });

    it('should handle missing party color', () => {
      const noColorPromise = {
        ...mockPromiseMinimal,
        party: { ...mockPromiseMinimal.party, color: undefined },
      };
      const { container } = render(<PromiseCard promise={noColorPromise} />);
      const initialsDiv = container.querySelector('div[style*="background-color"]');
      expect(initialsDiv).toBeInTheDocument();
    });
  });
});
