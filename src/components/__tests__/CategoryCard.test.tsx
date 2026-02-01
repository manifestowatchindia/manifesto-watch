import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { CategoryCard } from '../CategoryCard';
import { Category } from '../../lib/types';
import { promiseService } from '../../services/promiseService';

// Mock react-router-dom
jest.mock('react-router-dom');

// Mock the promiseService
jest.mock('../../services/promiseService', () => ({
  promiseService: {
    getPromisesByCategory: jest.fn(),
    getStats: jest.fn(),
  },
}));

const mockCategory: Category = {
  id: 'cat-1',
  name: 'Infrastructure',
  slug: 'infrastructure',
  description: 'Building roads, bridges, and public facilities',
  color: '#FF4500',
  icon: 'Construction',
};

const mockPromises = [
  {
    id: '1',
    title: 'Build 100km of roads',
    categoryId: 'cat-1',
    status: 'Under implementation' as const,
    measurable: true,
  },
  {
    id: '2',
    title: 'Construct new bridge',
    categoryId: 'cat-1',
    status: 'Delivered' as const,
    measurable: true,
  },
];

const mockStats = {
  total: 2,
  measurablePercent: 100,
  withBudgetPercent: 50,
  statusBreakdown: {
    'Delivered': 1,
    'Under implementation': 1,
    'Actioned': 0,
    'Announced': 0,
    'Deferred': 0,
  },
  typeBreakdown: {},
  timelineBreakdown: {},
};

describe('CategoryCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (promiseService.getPromisesByCategory as jest.Mock).mockResolvedValue(mockPromises);
    (promiseService.getStats as jest.Mock).mockReturnValue(mockStats);
  });

  const renderComponent = (category = mockCategory) => {
    return render(<CategoryCard category={category} />);
  };

  describe('Structure and Rendering', () => {
    it('should render category card with proper structure', async () => {
      renderComponent();
      
      await waitFor(() => {
        expect(screen.getByText('Infrastructure')).toBeInTheDocument();
      });
    });

    it('should render category name', async () => {
      renderComponent();
      
      await waitFor(() => {
        expect(screen.getByText('Infrastructure')).toBeInTheDocument();
      });
    });

    it('should render category description', async () => {
      renderComponent();
      
      await waitFor(() => {
        expect(screen.getByText('Building roads, bridges, and public facilities')).toBeInTheDocument();
      });
    });

    it('should have correct link to category detail page', () => {
      renderComponent();
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/government-dashboard/category/infrastructure');
    });
  });

  describe('Icon Display', () => {
    it('should render icon with correct Font Awesome class', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const icon = container.querySelector('.fa-tools');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should apply category color to icon', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const icon = container.querySelector('.fa-tools');
        expect(icon).toHaveStyle({ color: '#FF4500' });
      });
    });

    it('should render default icon for unknown icon type', async () => {
      const categoryWithUnknownIcon = {
        ...mockCategory,
        icon: 'UnknownIcon',
      };
      const { container } = renderComponent(categoryWithUnknownIcon);
      
      await waitFor(() => {
        const icon = container.querySelector('.fa-folder');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Statistics Display', () => {
    it('should display total promises count', async () => {
      renderComponent();
      
      await waitFor(() => {
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Promises')).toBeInTheDocument();
      });
    });

    it('should display measurable percentage', async () => {
      renderComponent();
      
      await waitFor(() => {
        expect(screen.getByText('100%')).toBeInTheDocument();
        expect(screen.getByText('Measurable')).toBeInTheDocument();
      });
    });

    it('should call promiseService with correct category ID', async () => {
      renderComponent();
      
      await waitFor(() => {
        expect(promiseService.getPromisesByCategory).toHaveBeenCalledWith('cat-1');
      });
    });

    it('should call getStats with fetched promises', async () => {
      renderComponent();
      
      await waitFor(() => {
        expect(promiseService.getStats).toHaveBeenCalledWith(mockPromises);
      });
    });
  });

  describe('Status Bar', () => {
    it('should render status distribution text', async () => {
      renderComponent();
      
      await waitFor(() => {
        expect(screen.getByText('Status Distribution')).toBeInTheDocument();
      });
    });

    it('should render view details link', async () => {
      renderComponent();
      
      await waitFor(() => {
        expect(screen.getByText('View Details →')).toBeInTheDocument();
      });
    });

    it('should render status bar segments', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const statusBars = container.querySelectorAll('.h-2 > div');
        expect(statusBars.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Styling and Tailwind Classes', () => {
    it('should have proper Tailwind background classes', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const card = container.querySelector('.bg-gray-900');
        expect(card).toBeInTheDocument();
      });
    });

    it('should have rounded corners', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const card = container.querySelector('.rounded-2xl');
        expect(card).toBeInTheDocument();
      });
    });

    it('should have transition classes for hover effects', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const card = container.querySelector('.transition-all');
        expect(card).toBeInTheDocument();
      });
    });

    it('should have color bar with correct color', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const colorBar = container.querySelector('.h-1');
        expect(colorBar).toHaveStyle({ backgroundColor: '#FF4500' });
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid for stats', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const grid = container.querySelector('.grid-cols-2');
        expect(grid).toBeInTheDocument();
      });
    });

    it('should have flex layout for icon and title', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const flex = container.querySelector('.flex.items-start');
        expect(flex).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should render component even when promise fetch fails', async () => {
      (promiseService.getPromisesByCategory as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
      
      renderComponent();
      
      // Component should still render with category name
      expect(screen.getByText('Infrastructure')).toBeInTheDocument();
    });

    it('should display zero stats when no promises', async () => {
      (promiseService.getPromisesByCategory as jest.Mock).mockResolvedValue([]);
      (promiseService.getStats as jest.Mock).mockReturnValue({
        total: 0,
        measurablePercent: 0,
        withBudgetPercent: 0,
        statusBreakdown: {},
        typeBreakdown: {},
        timelineBreakdown: {},
      });
      
      renderComponent();
      
      await waitFor(() => {
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('0%')).toBeInTheDocument();
      });
    });
  });

  describe('Color Variations', () => {
    it('should use default color when no color provided', async () => {
      const categoryNoColor = { ...mockCategory, color: undefined };
      const { container } = renderComponent(categoryNoColor);
      
      await waitFor(() => {
        const colorBar = container.querySelector('.h-1');
        expect(colorBar).toHaveStyle({ backgroundColor: '#FF4500' });
      });
    });

    it('should apply custom category color', async () => {
      const categoryCustomColor = { ...mockCategory, color: '#2196F3' };
      const { container } = renderComponent(categoryCustomColor);
      
      await waitFor(() => {
        const colorBar = container.querySelector('.h-1');
        expect(colorBar).toHaveStyle({ backgroundColor: '#2196F3' });
      });
    });
  });

  describe('Interactive Elements', () => {
    it('should have group class for hover effects', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const link = container.querySelector('.group');
        expect(link).toBeInTheDocument();
      });
    });

    it('should have cursor pointer', async () => {
      const { container } = renderComponent();
      
      await waitFor(() => {
        const card = container.querySelector('.cursor-pointer');
        expect(card).toBeInTheDocument();
      });
    });
  });
});

/**
 * Manual Testing Checklist
 * 
 * These require browser testing:
 * 
 * 1. Hover Effects:
 *    - Card lifts up on hover (-translate-y-2)
 *    - Shadow increases and changes color
 *    - Border color changes to category color
 *    - "View Details →" text changes color
 * 
 * 2. Click Navigation:
 *    - Clicking card navigates to correct category detail page
 *    - Link works from any part of the card
 * 
 * 3. Visual Appearance:
 *    - Color bar matches category color
 *    - Icon displays correctly with proper color
 *    - Stats are readable and properly aligned
 *    - Status bar shows correct proportions
 * 
 * 4. Responsive Behavior:
 *    - Card scales properly on different screen sizes
 *    - Grid layout adjusts correctly
 *    - Text wraps appropriately
 * 
 * 5. Different Categories:
 *    - Test with all 15 category icons
 *    - Verify different colors render correctly
 *    - Check with varying promise counts
 */
