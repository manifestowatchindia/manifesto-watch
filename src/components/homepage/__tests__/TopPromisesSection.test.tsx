/**
 * Tests for TopPromisesSection Component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { TopPromisesSection } from '../TopPromisesSection';
import { CuratedPromise } from '../CuratedPromiseCard';

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

const mockPromises: CuratedPromise[] = [
  {
    id: 'promise-1',
    title: 'Test Promise 1',
    partyId: 'bjp',
    partyName: 'BJP',
    partyColor: '#FF9933',
    status: 'Delivered',
    categorySlug: 'infrastructure-transport',
  },
  {
    id: 'promise-2',
    title: 'Test Promise 2',
    partyId: 'inc',
    partyName: 'Congress',
    partyColor: '#19AAED',
    status: 'Under implementation',
    categorySlug: 'health',
  },
];

describe('TopPromisesSection', () => {
  describe('Basic Rendering', () => {
    it('renders the section', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByTestId('top-promises-section')).toBeInTheDocument();
    });

    it('renders the title', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByText('Top Promises')).toBeInTheDocument();
    });

    it('renders the AI curated badge', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByText('Curated by AI')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} className="custom-class" />);
      
      expect(screen.getByTestId('top-promises-section')).toHaveClass('custom-class');
    });
  });

  describe('Category Tabs', () => {
    it('renders category tabs', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByTestId('category-tabs')).toBeInTheDocument();
    });

    it('renders "All" tab', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByTestId('tab-all')).toBeInTheDocument();
    });

    it('All tab is selected by default', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByTestId('tab-all')).toHaveAttribute('aria-selected', 'true');
    });

    it('changes category on tab click', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      const infrastructureTab = screen.getByTestId('tab-infrastructure-transport');
      fireEvent.click(infrastructureTab);
      
      expect(infrastructureTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Promise Cards', () => {
    it('renders promise cards', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByText('Test Promise 1')).toBeInTheDocument();
      expect(screen.getByText('Test Promise 2')).toBeInTheDocument();
    });

    it('renders party names on cards', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByText('BJP')).toBeInTheDocument();
      expect(screen.getByText('Congress')).toBeInTheDocument();
    });
  });

  describe('Sort Functionality', () => {
    it('renders sort dropdown', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
    });

    it('has "Most Impactful" as default sort', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      const select = screen.getByLabelText(/sort by/i) as HTMLSelectElement;
      expect(select.value).toBe('impact');
    });

    it('allows changing sort option', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      const select = screen.getByLabelText(/sort by/i);
      fireEvent.change(select, { target: { value: 'recent' } });
      
      expect((select as HTMLSelectElement).value).toBe('recent');
    });
  });

  describe('Loading State', () => {
    it('shows loading skeleton when isLoading is true', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} isLoading={true} />);
      
      // Should not show promises
      expect(screen.queryByText('Test Promise 1')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('shows error message when error is provided', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} error="Failed to load" />);
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Failed to load')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('shows empty state when no promises match category', () => {
      const noMatchPromises: CuratedPromise[] = [{
        id: 'promise-1',
        title: 'Test Promise',
        partyId: 'bjp',
        partyName: 'BJP',
        status: 'Delivered',
        categorySlug: 'non-existent-category',
      }];
      
      renderWithRouter(<TopPromisesSection promises={noMatchPromises} defaultCategory="cat-2" />);
      
      expect(screen.getByText(/no promises found/i)).toBeInTheDocument();
    });
  });

  describe('View All Link', () => {
    it('renders "View All Promises" link', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByTestId('view-all-promises-link')).toBeInTheDocument();
    });

    it('links to /promises when All is selected', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByTestId('view-all-promises-link')).toHaveAttribute('href', '/promises');
    });
  });

  describe('Accessibility', () => {
    it('has proper section labeling', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      expect(screen.getByRole('region', { name: /top promises/i })).toBeInTheDocument();
    });

    it('tabs have proper ARIA attributes', () => {
      renderWithRouter(<TopPromisesSection promises={mockPromises} />);
      
      const allTab = screen.getByTestId('tab-all');
      expect(allTab).toHaveAttribute('role', 'tab');
      expect(allTab).toHaveAttribute('aria-selected');
    });
  });
});
