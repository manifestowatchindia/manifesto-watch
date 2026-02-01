/**
 * Tests for LiveTrackerWidget Component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { LiveTrackerWidget, PromiseStats } from '../LiveTrackerWidget';

// Mock useInViewAnimation hook
jest.mock('../../../hooks/useInViewAnimation', () => ({
  useInViewAnimation: () => ({
    ref: { current: null },
    isInView: true,
    hasAnimated: true,
  }),
}));

// Helper to wrap component with Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const mockStats: PromiseStats = {
  total: 150,
  delivered: 68,
  inProgress: 42,
  actioned: 15,
  notStarted: 10,
  deferred: 15,
  deliveryRate: 45.3,
  lastUpdated: new Date().toISOString(),
  trend: 'up',
  trendValue: 5,
  comparisonPeriod: {
    label: 'Previous Term',
    deliveryRate: 38,
  },
};

describe('LiveTrackerWidget', () => {
  describe('Basic Rendering', () => {
    it('renders the widget with default props', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      expect(screen.getByTestId('live-tracker-widget')).toBeInTheDocument();
    });

    it('renders custom title and subtitle', () => {
      renderWithRouter(
        <LiveTrackerWidget 
          stats={mockStats} 
          title="Test Tracker" 
          subtitle="Test Manifesto" 
        />
      );
      
      expect(screen.getByText('Test Tracker')).toBeInTheDocument();
      expect(screen.getByText('Test Manifesto')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithRouter(
        <LiveTrackerWidget stats={mockStats} className="custom-class" />
      );
      
      expect(screen.getByTestId('live-tracker-widget')).toHaveClass('custom-class');
    });

    it('uses custom data-testid', () => {
      renderWithRouter(
        <LiveTrackerWidget stats={mockStats} data-testid="my-tracker" />
      );
      
      expect(screen.getByTestId('my-tracker')).toBeInTheDocument();
    });
  });

  describe('Stats Display', () => {
    it('displays total promise count', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      expect(screen.getByTestId('total-count')).toBeInTheDocument();
    });

    it('displays status breakdown', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      expect(screen.getByTestId('status-breakdown')).toBeInTheDocument();
    });

    it('displays all status categories', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      // Check by test ids since text may appear multiple times
      expect(screen.getByTestId('status-delivered')).toBeInTheDocument();
      expect(screen.getByTestId('status-under-implementation')).toBeInTheDocument();
      expect(screen.getByTestId('status-actioned')).toBeInTheDocument();
      expect(screen.getByTestId('status-announced')).toBeInTheDocument();
      expect(screen.getByTestId('status-deferred')).toBeInTheDocument();
    });

    it('displays delivery rate', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      expect(screen.getByTestId('delivery-rate')).toBeInTheDocument();
    });

    it('displays trend indicator when trendValue is provided', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      expect(screen.getByText(/5% vs last quarter/)).toBeInTheDocument();
    });

    it('displays comparison period when provided', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      expect(screen.getByText(/vs Previous Term/)).toBeInTheDocument();
      expect(screen.getByText('38%')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading skeleton when isLoading is true', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} isLoading={true} />);
      
      expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
    });

    it('does not show stats when loading', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} isLoading={true} />);
      
      expect(screen.queryByTestId('status-breakdown')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('shows error message when error prop is provided', () => {
      renderWithRouter(
        <LiveTrackerWidget stats={mockStats} error="Failed to load data" />
      );
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    });

    it('does not show stats when there is an error', () => {
      renderWithRouter(
        <LiveTrackerWidget stats={mockStats} error="Error occurred" />
      );
      
      expect(screen.queryByTestId('status-breakdown')).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('has a "View All Promises" link', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      const viewAllLink = screen.getByTestId('view-all-link');
      expect(viewAllLink).toBeInTheDocument();
      expect(viewAllLink).toHaveAttribute('href', '/promises');
    });

    it('status items link to filtered promises page', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      const deliveredLink = screen.getByTestId('status-delivered');
      expect(deliveredLink).toHaveAttribute('href', '/promises?status=delivered');
    });
  });

  describe('Interactions', () => {
    it('calls onStatusClick when a status is clicked', () => {
      const onStatusClick = jest.fn();
      renderWithRouter(
        <LiveTrackerWidget stats={mockStats} onStatusClick={onStatusClick} />
      );
      
      fireEvent.click(screen.getByTestId('status-delivered'));
      
      expect(onStatusClick).toHaveBeenCalledWith('Delivered');
    });

    it('toggles collapse on mobile expand button click', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      const expandButton = screen.getByRole('button', { name: /collapse|expand/i });
      
      fireEvent.click(expandButton);
      expect(expandButton).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(expandButton);
      expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labelledby for the widget', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      expect(screen.getByRole('region', { name: /tracker/i })).toBeInTheDocument();
    });

    it('status breakdown has proper list role', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      expect(screen.getByRole('list', { name: /promise status breakdown/i })).toBeInTheDocument();
    });

    it('progress ring has progressbar role', () => {
      renderWithRouter(<LiveTrackerWidget stats={mockStats} />);
      
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Last Updated', () => {
    it('shows "Just now" for very recent updates', () => {
      const recentStats = {
        ...mockStats,
        lastUpdated: new Date().toISOString(),
      };
      
      renderWithRouter(<LiveTrackerWidget stats={recentStats} />);
      
      expect(screen.getByText(/updated just now/i)).toBeInTheDocument();
    });

    it('shows relative time for older updates', () => {
      const oldStats = {
        ...mockStats,
        lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      };
      
      renderWithRouter(<LiveTrackerWidget stats={oldStats} />);
      
      expect(screen.getByText(/updated 2 hours ago/i)).toBeInTheDocument();
    });
  });

  describe('Trend Display', () => {
    it('shows positive trend with up icon', () => {
      const upTrendStats = { ...mockStats, trend: 'up' as const, trendValue: 10 };
      renderWithRouter(<LiveTrackerWidget stats={upTrendStats} />);
      
      expect(screen.getByText('📈')).toBeInTheDocument();
      expect(screen.getByText(/\+10% vs last quarter/)).toBeInTheDocument();
    });

    it('shows negative trend with down icon', () => {
      const downTrendStats = { ...mockStats, trend: 'down' as const, trendValue: 5 };
      renderWithRouter(<LiveTrackerWidget stats={downTrendStats} />);
      
      expect(screen.getByText('📉')).toBeInTheDocument();
      expect(screen.getByText(/-5% vs last quarter/)).toBeInTheDocument();
    });

    it('does not show trend when trendValue is 0', () => {
      const noTrendStats = { ...mockStats, trend: 'stable' as const, trendValue: 0 };
      renderWithRouter(<LiveTrackerWidget stats={noTrendStats} />);
      
      expect(screen.queryByText(/vs last quarter/)).not.toBeInTheDocument();
    });
  });
});
