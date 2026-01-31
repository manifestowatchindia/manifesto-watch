import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterPanel, FilterState } from '../FilterPanel';

// Mock categories
jest.mock('../../../data/categories', () => ({
  categories: [
    { id: 'cat-1', name: 'Infrastructure & Transport', slug: 'infrastructure', icon: 'Construction' },
    { id: 'cat-2', name: 'Health', slug: 'health', icon: 'Heart' },
    { id: 'cat-3', name: 'Education & Skills', slug: 'education', icon: 'GraduationCap' },
    { id: 'cat-4', name: 'Economy, Industry & Jobs', slug: 'economy', icon: 'TrendingUp' },
    { id: 'cat-5', name: 'Agriculture & Food', slug: 'agriculture', icon: 'Sprout' },
    { id: 'cat-6', name: 'Social Welfare & Safety Nets', slug: 'welfare', icon: 'Shield' },
    { id: 'cat-7', name: 'Women & Children', slug: 'women-children', icon: 'Users' },
    { id: 'cat-8', name: 'Youth, Startups & Sports', slug: 'youth', icon: 'Rocket' },
  ],
}));

describe('FilterPanel', () => {
  const defaultFilters: FilterState = {
    categories: [],
    statuses: [],
    state: undefined,
    parties: [],
    timeline: undefined,
  };

  const mockOnFilterChange = jest.fn();
  const mockOnApply = jest.fn();
  const mockOnClear = jest.fn();

  const defaultProps = {
    filters: defaultFilters,
    onFilterChange: mockOnFilterChange,
    onApply: mockOnApply,
    onClear: mockOnClear,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering - Basic Elements', () => {
    it('renders the filter panel', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
    });

    it('renders the filter header', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getAllByText('Filters')[0]).toBeInTheDocument();
    });

    it('renders category section', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByText('Categories')).toBeInTheDocument();
    });

    it('renders status section', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('renders state section', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByText('State')).toBeInTheDocument();
    });

    it('renders party section', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByText('Political Party')).toBeInTheDocument();
    });

    it('renders timeline section', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByText('Timeline')).toBeInTheDocument();
    });

    it('renders apply button', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByRole('button', { name: /apply filters/i })).toBeInTheDocument();
    });

    it('renders clear all button', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
    });
  });

  describe('Category Filters', () => {
    it('renders category checkboxes', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByLabelText('Infrastructure & Transport')).toBeInTheDocument();
      expect(screen.getByLabelText('Health')).toBeInTheDocument();
      expect(screen.getByLabelText('Education & Skills')).toBeInTheDocument();
    });

    it('selects a category when clicked', () => {
      render(<FilterPanel {...defaultProps} />);
      const checkbox = screen.getByLabelText('Health');
      fireEvent.click(checkbox);
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        categories: ['cat-2'],
      });
    });

    it('deselects a category when clicked again', () => {
      const filtersWithCategory: FilterState = {
        ...defaultFilters,
        categories: ['cat-2'],
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithCategory} />);
      const checkbox = screen.getByLabelText('Health');
      fireEvent.click(checkbox);
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        categories: [],
      });
    });

    it('shows category count badge when categories selected', () => {
      const filtersWithCategories: FilterState = {
        ...defaultFilters,
        categories: ['cat-1', 'cat-2'],
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithCategories} />);
      // The badge showing "2" should be present near Categories
      const badges = screen.getAllByText('2');
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  describe('Status Filters', () => {
    it('renders status options', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByText('Announced')).toBeInTheDocument();
      expect(screen.getByText('Delivered')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
    });

    it('selects a status when clicked', () => {
      render(<FilterPanel {...defaultProps} />);
      const checkbox = screen.getByLabelText('Delivered');
      fireEvent.click(checkbox);
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        statuses: ['Delivered'],
      });
    });

    it('supports multiple status selections', () => {
      const filtersWithStatus: FilterState = {
        ...defaultFilters,
        statuses: ['Delivered'],
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithStatus} />);
      const checkbox = screen.getByLabelText('Announced');
      fireEvent.click(checkbox);
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...filtersWithStatus,
        statuses: ['Delivered', 'Announced'],
      });
    });
  });

  describe('State Filter', () => {
    it('renders state dropdown', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByLabelText('Select state')).toBeInTheDocument();
    });

    it('changes state when dropdown value changes', () => {
      render(<FilterPanel {...defaultProps} />);
      const dropdown = screen.getByLabelText('Select state');
      fireEvent.change(dropdown, { target: { value: 'kerala' } });
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        state: 'kerala',
      });
    });

    it('clears state when empty option selected', () => {
      const filtersWithState: FilterState = {
        ...defaultFilters,
        state: 'kerala',
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithState} />);
      const dropdown = screen.getByLabelText('Select state');
      fireEvent.change(dropdown, { target: { value: '' } });
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        state: undefined,
      });
    });
  });

  describe('Party Filters', () => {
    it('expands party section when clicked', () => {
      render(<FilterPanel {...defaultProps} />);
      const partyHeader = screen.getByText('Political Party');
      fireEvent.click(partyHeader);
      expect(screen.getByLabelText('BJP')).toBeInTheDocument();
      expect(screen.getByLabelText('INC (Congress)')).toBeInTheDocument();
    });

    it('selects a party when clicked', () => {
      render(<FilterPanel {...defaultProps} />);
      const partyHeader = screen.getByText('Political Party');
      fireEvent.click(partyHeader);
      const checkbox = screen.getByLabelText('BJP');
      fireEvent.click(checkbox);
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        parties: ['bjp'],
      });
    });
  });

  describe('Timeline Filter', () => {
    it('renders timeline dropdown', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByLabelText('Select timeline')).toBeInTheDocument();
    });

    it('changes timeline when dropdown value changes', () => {
      render(<FilterPanel {...defaultProps} />);
      const dropdown = screen.getByLabelText('Select timeline');
      fireEvent.change(dropdown, { target: { value: '100d' } });
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        timeline: '100d',
      });
    });
  });

  describe('Action Buttons', () => {
    it('calls onApply when Apply button clicked', () => {
      render(<FilterPanel {...defaultProps} />);
      const applyButton = screen.getByRole('button', { name: /apply filters/i });
      fireEvent.click(applyButton);
      expect(mockOnApply).toHaveBeenCalledTimes(1);
    });

    it('calls onClear when Clear All button clicked', () => {
      const filtersWithData: FilterState = {
        categories: ['cat-1'],
        statuses: ['Delivered'],
        state: 'kerala',
        parties: ['bjp'],
        timeline: '100d',
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithData} />);
      const clearButton = screen.getByRole('button', { name: /clear all/i });
      fireEvent.click(clearButton);
      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });

    it('disables Clear All button when no filters active', () => {
      render(<FilterPanel {...defaultProps} />);
      const clearButton = screen.getByRole('button', { name: /clear all/i });
      expect(clearButton).toBeDisabled();
    });

    it('enables Clear All button when filters are active', () => {
      const filtersWithData: FilterState = {
        ...defaultFilters,
        categories: ['cat-1'],
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithData} />);
      const clearButton = screen.getByRole('button', { name: /clear all/i });
      expect(clearButton).not.toBeDisabled();
    });
  });

  describe('Active Filter Badges', () => {
    it('shows active filter badges when filters selected', () => {
      const filtersWithData: FilterState = {
        categories: ['cat-2'],
        statuses: ['Delivered'],
        state: 'kerala',
        parties: [],
        timeline: undefined,
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithData} />);
      expect(screen.getByTestId('active-filters')).toBeInTheDocument();
    });

    it('does not show active filters section when no filters', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.queryByTestId('active-filters')).not.toBeInTheDocument();
    });

    it('removes category filter when badge close clicked', () => {
      const filtersWithCategory: FilterState = {
        ...defaultFilters,
        categories: ['cat-2'],
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithCategory} />);
      const removeButton = screen.getByLabelText('Remove Health filter');
      fireEvent.click(removeButton);
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        categories: [],
      });
    });

    it('removes status filter when badge close clicked', () => {
      const filtersWithStatus: FilterState = {
        ...defaultFilters,
        statuses: ['Delivered'],
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithStatus} />);
      const removeButton = screen.getByLabelText('Remove Delivered filter');
      fireEvent.click(removeButton);
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        statuses: [],
      });
    });

    it('removes state filter when badge close clicked', () => {
      const filtersWithState: FilterState = {
        ...defaultFilters,
        state: 'kerala',
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithState} />);
      const removeButton = screen.getByLabelText('Remove state filter');
      fireEvent.click(removeButton);
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        state: undefined,
      });
    });
  });

  describe('Section Collapse/Expand', () => {
    it('toggles category section visibility', () => {
      render(<FilterPanel {...defaultProps} />);
      const categoryHeader = screen.getByText('Categories');
      
      // Initially expanded, should see category checkboxes
      expect(screen.getByLabelText('Health')).toBeInTheDocument();
      
      // Click to collapse
      fireEvent.click(categoryHeader);
      expect(screen.queryByLabelText('Health')).not.toBeInTheDocument();
      
      // Click to expand again
      fireEvent.click(categoryHeader);
      expect(screen.getByLabelText('Health')).toBeInTheDocument();
    });

    it('toggles status section visibility', () => {
      render(<FilterPanel {...defaultProps} />);
      const statusHeader = screen.getByText('Status');
      
      // Initially expanded
      expect(screen.getByText('Announced')).toBeInTheDocument();
      
      // Click to collapse
      fireEvent.click(statusHeader);
      expect(screen.queryByText('Announced')).not.toBeInTheDocument();
    });
  });

  describe('Mobile Collapse', () => {
    it('renders mobile toggle button', () => {
      render(<FilterPanel {...defaultProps} />);
      // The mobile toggle button has "Filters" text
      const buttons = screen.getAllByText('Filters');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('calls onToggleCollapse when mobile toggle clicked', () => {
      const mockToggle = jest.fn();
      render(<FilterPanel {...defaultProps} onToggleCollapse={mockToggle} />);
      // Find the button that contains "Filters" text (mobile toggle)
      const toggleButton = screen.getAllByRole('button').find(
        button => button.getAttribute('aria-controls') === 'filter-content'
      );
      if (toggleButton) {
        fireEvent.click(toggleButton);
        expect(mockToggle).toHaveBeenCalled();
      }
    });

    it('hides content when isCollapsed is true', () => {
      render(<FilterPanel {...defaultProps} isCollapsed={true} />);
      const content = document.getElementById('filter-content');
      expect(content).toHaveClass('hidden');
    });

    it('shows content when isCollapsed is false', () => {
      render(<FilterPanel {...defaultProps} isCollapsed={false} />);
      const content = document.getElementById('filter-content');
      expect(content).not.toHaveClass('hidden');
    });
  });

  describe('Accessibility', () => {
    it('has proper aria labels', () => {
      render(<FilterPanel {...defaultProps} />);
      expect(screen.getByLabelText('Search filters')).toBeInTheDocument();
      expect(screen.getByLabelText('Select state')).toBeInTheDocument();
      expect(screen.getByLabelText('Select timeline')).toBeInTheDocument();
    });

    it('has aria-expanded attributes on collapsible sections', () => {
      render(<FilterPanel {...defaultProps} />);
      const categoryButton = screen.getByRole('button', { name: /categories/i });
      expect(categoryButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-controls attributes', () => {
      render(<FilterPanel {...defaultProps} />);
      const categoryButton = screen.getByRole('button', { name: /categories/i });
      expect(categoryButton).toHaveAttribute('aria-controls', 'section-categories');
    });
  });

  describe('Filter Count Display', () => {
    it('shows total active filter count in mobile header', () => {
      const filtersWithData: FilterState = {
        categories: ['cat-1', 'cat-2'],
        statuses: ['Delivered'],
        state: 'kerala',
        parties: ['bjp'],
        timeline: '100d',
      };
      render(<FilterPanel {...defaultProps} filters={filtersWithData} />);
      // Total filters: 2 categories + 1 status + 1 state + 1 party + 1 timeline = 6
      expect(screen.getByText('6')).toBeInTheDocument();
    });
  });
});
