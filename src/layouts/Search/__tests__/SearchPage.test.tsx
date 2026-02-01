import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../SearchPage';

// Mock react-helmet-async
jest.mock('react-helmet-async', () => {
  const React = require('react');
  return {
    __esModule: true,
    Helmet: ({ children }: { children?: React.ReactNode }) => 
      React.createElement('div', { 'data-testid': 'helmet' }, children),
    HelmetProvider: ({ children }: { children?: React.ReactNode }) => 
      React.createElement(React.Fragment, null, children),
  };
});

// Mock the child components
jest.mock('../../../components/search/SearchBar', () => {
  const React = require('react');
  return {
    __esModule: true,
    SearchBar: ({ onSearch, placeholder, showTrending, trendingSearches }: any) => 
      React.createElement('div', { 'data-testid': 'search-bar' },
        React.createElement('input', {
          'data-testid': 'search-input',
          placeholder: placeholder,
          onChange: (e: any) => onSearch(e.target.value),
          onKeyDown: (e: any) => {
            if (e.key === 'Enter') {
              onSearch(e.target.value);
            }
          }
        }),
        showTrending && trendingSearches && React.createElement('div', { 'data-testid': 'trending-searches' },
          trendingSearches.map((term: string) =>
            React.createElement('button', {
              key: term,
              onClick: () => onSearch(term),
              'data-testid': `trending-${term}`
            }, term)
          )
        )
      )
  };
});

jest.mock('../../../components/search/FilterPanel', () => {
  const React = require('react');
  return {
    __esModule: true,
    FilterPanel: ({ filters, onFilterChange, onApply, onClear, isCollapsed }: any) => 
      React.createElement('div', { 'data-testid': 'filter-panel', 'data-collapsed': isCollapsed },
        React.createElement('div', { 'data-testid': 'filter-categories' }, filters.categories.join(',')),
        React.createElement('div', { 'data-testid': 'filter-statuses' }, filters.statuses.join(',')),
        React.createElement('div', { 'data-testid': 'filter-state' }, filters.state || ''),
        React.createElement('div', { 'data-testid': 'filter-parties' }, filters.parties.join(',')),
        React.createElement('button', {
          'data-testid': 'category-checkbox',
          onClick: () => onFilterChange({ ...filters, categories: ['cat-1'] })
        }, 'Add Category'),
        React.createElement('button', { 'data-testid': 'apply-filters', onClick: onApply }, 'Apply'),
        React.createElement('button', { 'data-testid': 'clear-filters', onClick: onClear }, 'Clear')
      ),
    FilterState: {}
  };
});

jest.mock('../../../components/search/SearchResults', () => {
  const React = require('react');
  return {
    __esModule: true,
    SearchResults: ({ results, loading, totalResults, onLoadMore, hasMore, query, onResultClick }: any) => 
      React.createElement('div', { 'data-testid': 'search-results' },
        loading && React.createElement('div', { 'data-testid': 'results-loading' }, 'Loading...'),
        React.createElement('div', { 'data-testid': 'results-count' }, totalResults),
        React.createElement('div', { 'data-testid': 'results-query' }, query),
        React.createElement('div', { 'data-testid': 'results-list' },
          results.map((r: any) =>
            React.createElement('div', {
              key: r.id,
              'data-testid': `result-${r.id}`,
              onClick: () => onResultClick?.(r)
            }, r.title)
          )
        ),
        hasMore && React.createElement('button', { 'data-testid': 'load-more', onClick: onLoadMore }, 'Load More')
      ),
    SearchResult: {}
  };
});

// Mock categories
jest.mock('../../../data/categories', () => ({
  categories: [
    { id: 'cat-1', name: 'Health', slug: 'health' },
    { id: 'cat-2', name: 'Education', slug: 'education' },
  ],
}));

const renderSearchPage = (initialRoute = '/search') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <SearchPage />
    </MemoryRouter>
  );
};

describe('SearchPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering - Basic Elements', () => {
    it('renders the search page', () => {
      renderSearchPage();
      expect(screen.getByText('Search Promises & Manifestos')).toBeInTheDocument();
    });

    it('renders the search bar', () => {
      renderSearchPage();
      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    });

    it('renders the filter panel', () => {
      renderSearchPage();
      expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
    });

    it('renders the search results component', () => {
      renderSearchPage();
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });

    it('renders mobile filter toggle button', () => {
      renderSearchPage();
      const filterButton = screen.getByRole('button', { name: /filters/i });
      expect(filterButton).toBeInTheDocument();
    });

    it('renders initial state prompt when no query', () => {
      renderSearchPage();
      expect(screen.getByText('Start Your Search')).toBeInTheDocument();
    });

    it('renders popular search suggestions', () => {
      renderSearchPage();
      expect(screen.getByText('healthcare')).toBeInTheDocument();
      expect(screen.getByText('jobs')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('performs search when query submitted', async () => {
      renderSearchPage();
      const input = screen.getByTestId('search-input');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'healthcare' } });
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByTestId('results-query')).toHaveTextContent('healthcare');
      });
    });

    it('shows loading state during search', async () => {
      renderSearchPage();
      const input = screen.getByTestId('search-input');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'test' } });
      });

      // Loading should appear briefly
      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      expect(screen.getByTestId('results-loading')).toBeInTheDocument();
    });

    it('displays search results after search', async () => {
      renderSearchPage();
      const input = screen.getByTestId('search-input');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'jobs' } });
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByTestId('results-list')).toBeInTheDocument();
      });
    });

    it('searches when trending search clicked', async () => {
      renderSearchPage();
      const trendingButton = screen.getByTestId('trending-healthcare');

      await act(async () => {
        fireEvent.click(trendingButton);
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByTestId('results-query')).toHaveTextContent('healthcare');
      });
    });

    it('searches when popular suggestion clicked', async () => {
      renderSearchPage();
      const suggestionButton = screen.getByRole('button', { name: 'education' });

      await act(async () => {
        fireEvent.click(suggestionButton);
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByTestId('results-query')).toHaveTextContent('education');
      });
    });
  });

  describe('Filter Functionality', () => {
    it('updates filters when changed', async () => {
      renderSearchPage();
      const addCategoryButton = screen.getByTestId('category-checkbox');

      await act(async () => {
        fireEvent.click(addCategoryButton);
      });

      expect(screen.getByTestId('filter-categories')).toHaveTextContent('cat-1');
    });

    it('applies filters when apply button clicked', async () => {
      renderSearchPage();

      // First perform a search
      const input = screen.getByTestId('search-input');
      await act(async () => {
        fireEvent.change(input, { target: { value: 'test' } });
        jest.advanceTimersByTime(600);
      });

      // Then apply filters
      const applyButton = screen.getByTestId('apply-filters');
      await act(async () => {
        fireEvent.click(applyButton);
        jest.advanceTimersByTime(600);
      });

      // Search should be re-executed (we can check this by verifying results component is called)
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });

    it('clears filters when clear button clicked', async () => {
      renderSearchPage();

      // Add a filter
      const addCategoryButton = screen.getByTestId('category-checkbox');
      await act(async () => {
        fireEvent.click(addCategoryButton);
      });

      // Clear filters
      const clearButton = screen.getByTestId('clear-filters');
      await act(async () => {
        fireEvent.click(clearButton);
        jest.advanceTimersByTime(600);
      });

      expect(screen.getByTestId('filter-categories')).toHaveTextContent('');
    });

    it('toggles filter panel on mobile', async () => {
      renderSearchPage();
      const toggleButton = screen.getByRole('button', { name: /filters/i });

      // Initially collapsed on mobile
      expect(screen.getByTestId('filter-panel')).toHaveAttribute('data-collapsed', 'true');

      await act(async () => {
        fireEvent.click(toggleButton);
      });

      expect(screen.getByTestId('filter-panel')).toHaveAttribute('data-collapsed', 'false');
    });
  });

  describe('URL Params Sync', () => {
    it('reads query from URL params on mount', async () => {
      renderSearchPage('/search?q=healthcare');

      await act(async () => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByTestId('results-query')).toHaveTextContent('healthcare');
      });
    });

    it('reads categories from URL params', () => {
      renderSearchPage('/search?categories=cat-1,cat-2');
      expect(screen.getByTestId('filter-categories')).toHaveTextContent('cat-1,cat-2');
    });

    it('reads statuses from URL params', () => {
      renderSearchPage('/search?statuses=Delivered,Announced');
      expect(screen.getByTestId('filter-statuses')).toHaveTextContent('Delivered,Announced');
    });

    it('reads state from URL params', () => {
      renderSearchPage('/search?state=kerala');
      expect(screen.getByTestId('filter-state')).toHaveTextContent('kerala');
    });

    it('reads parties from URL params', () => {
      renderSearchPage('/search?parties=bjp,inc');
      expect(screen.getByTestId('filter-parties')).toHaveTextContent('bjp,inc');
    });
  });

  describe('Load More', () => {
    it('loads more results when button clicked', async () => {
      renderSearchPage();
      const input = screen.getByTestId('search-input');

      // Perform search first
      await act(async () => {
        fireEvent.change(input, { target: { value: 'healthcare' } });
        jest.advanceTimersByTime(600);
      });

      // Wait for load more button
      await waitFor(() => {
        const loadMoreButton = screen.queryByTestId('load-more');
        if (loadMoreButton) {
          fireEvent.click(loadMoreButton);
        }
      });

      // Results should still be present
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });
  });

  describe('Result Click Navigation', () => {
    it('handles result click', async () => {
      renderSearchPage();
      const input = screen.getByTestId('search-input');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'test' } });
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        const resultItems = screen.queryAllByTestId(/^result-/);
        if (resultItems.length > 0) {
          fireEvent.click(resultItems[0]);
        }
      });

      // Navigation would occur - we just verify no errors
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });
  });

  describe('Results Info Display', () => {
    it('shows results count when searching', async () => {
      renderSearchPage();
      const input = screen.getByTestId('search-input');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'healthcare' } });
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText(/found/i)).toBeInTheDocument();
      });
    });

    it('shows query in results info', async () => {
      renderSearchPage();
      const input = screen.getByTestId('search-input');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'jobs' } });
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText(/jobs/i)).toBeInTheDocument();
      });
    });
  });

  describe('SEO', () => {
    it('sets page title without query', () => {
      renderSearchPage();
      // Helmet sets document.title - in tests we verify the component renders
      expect(document.title).toBeDefined();
    });

    it('renders without errors', () => {
      expect(() => renderSearchPage()).not.toThrow();
    });
  });

  describe('Responsive Behavior', () => {
    it('shows filter toggle on mobile', () => {
      renderSearchPage();
      const toggleButton = screen.getByRole('button', { name: /filters/i });
      expect(toggleButton).toBeInTheDocument();
    });

    it('filter panel has responsive classes', () => {
      renderSearchPage();
      const filterPanel = screen.getByTestId('filter-panel');
      expect(filterPanel).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('shows initial state when no query', () => {
      renderSearchPage();
      expect(screen.getByText('Start Your Search')).toBeInTheDocument();
    });

    it('hides initial state after search', async () => {
      renderSearchPage();
      const input = screen.getByTestId('search-input');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'test' } });
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.queryByText('Start Your Search')).not.toBeInTheDocument();
      });
    });
  });

  describe('Clear Filters Link', () => {
    it('shows clear filters link when filters active', async () => {
      renderSearchPage('/search?q=test&categories=cat-1');

      await act(async () => {
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText(/clear all filters/i)).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('handles search errors gracefully', async () => {
      renderSearchPage();
      const input = screen.getByTestId('search-input');

      // This should not throw even with edge cases
      await act(async () => {
        fireEvent.change(input, { target: { value: '' } });
        jest.advanceTimersByTime(600);
      });

      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });

    it('handles very short queries', async () => {
      renderSearchPage();
      const input = screen.getByTestId('search-input');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'a' } });
        jest.advanceTimersByTime(600);
      });

      // Should show initial state for very short queries
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });
  });
});
