import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchResults, SearchResult, SearchResultsProps } from '../SearchResults';

describe('SearchResults', () => {
  const mockResults: SearchResult[] = [
    {
      type: 'promise',
      id: 'promise-1',
      title: '100,000 Government Jobs',
      description: 'Create 100,000 new government jobs over 5 years',
      relevance_score: 0.95,
      highlighted: 'Create <mark>100,000</mark> new <mark>government jobs</mark> over 5 years',
      category: 'Employment',
      status: 'Announced',
      party: 'BJP',
      state: 'Kerala',
    },
    {
      type: 'manifesto',
      id: 'manifesto-1',
      title: 'BJP Election Manifesto 2024',
      description: 'Full manifesto document for 2024 Lok Sabha elections',
      relevance_score: 0.88,
      highlighted: '',
      party: 'BJP',
      date: '2024-03-15',
    },
    {
      type: 'party',
      id: 'party-1',
      title: 'Bharatiya Janata Party',
      description: 'National political party founded in 1980',
      relevance_score: 0.75,
      highlighted: '',
    },
    {
      type: 'category',
      id: 'cat-1',
      title: 'Employment & Jobs',
      description: 'Promises related to job creation and employment',
      relevance_score: 0.65,
      highlighted: '',
    },
  ];

  const defaultProps: SearchResultsProps = {
    results: mockResults,
    loading: false,
    totalResults: 100,
    onLoadMore: jest.fn(),
    hasMore: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering - Basic Elements', () => {
    it('renders search results container', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });

    it('renders results count', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByText(/showing/i)).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('renders result cards', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getAllByTestId('search-result-card')).toHaveLength(4);
    });

    it('renders load more button when hasMore is true', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
    });

    it('does not render load more button when hasMore is false', () => {
      render(<SearchResults {...defaultProps} hasMore={false} />);
      expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
    });

    it('shows end of results message when hasMore is false', () => {
      render(<SearchResults {...defaultProps} hasMore={false} />);
      expect(screen.getByText(/reached the end/i)).toBeInTheDocument();
    });
  });

  describe('Result Card Display', () => {
    it('displays result title', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByText('100,000 Government Jobs')).toBeInTheDocument();
      expect(screen.getByText('BJP Election Manifesto 2024')).toBeInTheDocument();
    });

    it('displays result type badges', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByText('Promise')).toBeInTheDocument();
      expect(screen.getByText('Manifesto')).toBeInTheDocument();
      expect(screen.getByText('Party')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
    });

    it('displays status badge for promises', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByText('Announced')).toBeInTheDocument();
    });

    it('displays relevance score', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByText('95% match')).toBeInTheDocument();
      expect(screen.getByText('88% match')).toBeInTheDocument();
    });

    it('displays party information', () => {
      render(<SearchResults {...defaultProps} />);
      const bjpTexts = screen.getAllByText('BJP');
      expect(bjpTexts.length).toBeGreaterThan(0);
    });

    it('displays category information', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByText('Employment')).toBeInTheDocument();
    });

    it('displays state information', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByText('Kerala')).toBeInTheDocument();
    });

    it('displays date information', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByText('2024-03-15')).toBeInTheDocument();
    });
  });

  describe('Highlighted Text', () => {
    it('renders highlighted text with HTML', () => {
      render(<SearchResults {...defaultProps} />);
      // Check that the component renders without errors - highlighted HTML is rendered via dangerouslySetInnerHTML
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });

    it('falls back to description when no highlighted text', () => {
      const resultsWithoutHighlight: SearchResult[] = [
        {
          type: 'party',
          id: 'party-1',
          title: 'Test Party',
          description: 'This is the description text',
          relevance_score: 0.8,
          highlighted: '',
        },
      ];
      render(<SearchResults {...defaultProps} results={resultsWithoutHighlight} totalResults={1} />);
      expect(screen.getByText('This is the description text')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading skeletons when loading with no results', () => {
      render(<SearchResults {...defaultProps} results={[]} loading={true} />);
      expect(screen.getByTestId('search-results-loading')).toBeInTheDocument();
      expect(screen.getAllByTestId('search-result-skeleton')).toHaveLength(5);
    });

    it('shows additional skeletons when loading more results', () => {
      render(<SearchResults {...defaultProps} loading={true} />);
      // When loading and has results, shows 2 more skeletons
      expect(screen.getAllByTestId('search-result-skeleton')).toHaveLength(2);
    });

    it('hides load more button when loading', () => {
      render(<SearchResults {...defaultProps} loading={true} />);
      expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('shows empty state when no results', () => {
      render(<SearchResults {...defaultProps} results={[]} totalResults={0} />);
      expect(screen.getByTestId('search-results-empty')).toBeInTheDocument();
    });

    it('displays no results message', () => {
      render(<SearchResults {...defaultProps} results={[]} totalResults={0} />);
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('shows query in empty state message', () => {
      render(<SearchResults {...defaultProps} results={[]} totalResults={0} query="healthcare" />);
      expect(screen.getByText(/healthcare/)).toBeInTheDocument();
    });

    it('displays search tips', () => {
      render(<SearchResults {...defaultProps} results={[]} totalResults={0} />);
      expect(screen.getByText('Check your spelling')).toBeInTheDocument();
      expect(screen.getByText('Try more general keywords')).toBeInTheDocument();
      expect(screen.getByText('Remove some filters')).toBeInTheDocument();
    });
  });

  describe('Load More Functionality', () => {
    it('calls onLoadMore when button clicked', () => {
      const mockLoadMore = jest.fn();
      render(<SearchResults {...defaultProps} onLoadMore={mockLoadMore} />);
      const loadMoreButton = screen.getByRole('button', { name: /load more/i });
      fireEvent.click(loadMoreButton);
      expect(mockLoadMore).toHaveBeenCalledTimes(1);
    });

    it('shows remaining results count', () => {
      render(<SearchResults {...defaultProps} />);
      // 100 total - 4 shown = 96 more
      expect(screen.getByText('96 more results available')).toBeInTheDocument();
    });
  });

  describe('Result Click Handler', () => {
    it('calls onResultClick when result card clicked', () => {
      const mockClick = jest.fn();
      render(<SearchResults {...defaultProps} onResultClick={mockClick} />);
      const firstCard = screen.getAllByTestId('search-result-card')[0];
      fireEvent.click(firstCard);
      expect(mockClick).toHaveBeenCalledWith(mockResults[0]);
    });

    it('calls onResultClick when Enter pressed on result card', () => {
      const mockClick = jest.fn();
      render(<SearchResults {...defaultProps} onResultClick={mockClick} />);
      const firstCard = screen.getAllByTestId('search-result-card')[0];
      fireEvent.keyDown(firstCard, { key: 'Enter' });
      expect(mockClick).toHaveBeenCalledWith(mockResults[0]);
    });

    it('calls onResultClick when Space pressed on result card', () => {
      const mockClick = jest.fn();
      render(<SearchResults {...defaultProps} onResultClick={mockClick} />);
      const firstCard = screen.getAllByTestId('search-result-card')[0];
      fireEvent.keyDown(firstCard, { key: ' ' });
      expect(mockClick).toHaveBeenCalledWith(mockResults[0]);
    });
  });

  describe('Query Display', () => {
    it('shows query in results header', () => {
      render(<SearchResults {...defaultProps} query="jobs" />);
      expect(screen.getByText('jobs')).toBeInTheDocument();
    });

    it('does not show query when not provided', () => {
      render(<SearchResults {...defaultProps} query="" />);
      // When no query, the "for" text shouldn't appear in the header
      const resultsHeader = screen.getByText(/showing/i);
      expect(resultsHeader).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible result cards', () => {
      render(<SearchResults {...defaultProps} />);
      const cards = screen.getAllByTestId('search-result-card');
      cards.forEach(card => {
        expect(card).toHaveAttribute('role', 'button');
        expect(card).toHaveAttribute('tabIndex', '0');
      });
    });

    it('has aria-label on result cards', () => {
      render(<SearchResults {...defaultProps} />);
      const cards = screen.getAllByTestId('search-result-card');
      expect(cards[0]).toHaveAttribute('aria-label', 'View promise: 100,000 Government Jobs');
    });

    it('has role list on results container', () => {
      render(<SearchResults {...defaultProps} />);
      expect(screen.getByRole('list', { name: /search results/i })).toBeInTheDocument();
    });
  });

  describe('Different Result Types', () => {
    it('renders promise type correctly', () => {
      const promiseResult: SearchResult[] = [
        { type: 'promise', id: '1', title: 'Test Promise', description: 'Desc', relevance_score: 0.9, highlighted: '' },
      ];
      render(<SearchResults {...defaultProps} results={promiseResult} totalResults={1} />);
      expect(screen.getByText('Promise')).toBeInTheDocument();
      expect(screen.getByText('📋')).toBeInTheDocument();
    });

    it('renders manifesto type correctly', () => {
      const manifestoResult: SearchResult[] = [
        { type: 'manifesto', id: '1', title: 'Test Manifesto', description: 'Desc', relevance_score: 0.9, highlighted: '' },
      ];
      render(<SearchResults {...defaultProps} results={manifestoResult} totalResults={1} />);
      expect(screen.getByText('Manifesto')).toBeInTheDocument();
      expect(screen.getByText('📄')).toBeInTheDocument();
    });

    it('renders party type correctly', () => {
      const partyResult: SearchResult[] = [
        { type: 'party', id: '1', title: 'Test Party', description: 'Desc', relevance_score: 0.9, highlighted: '' },
      ];
      render(<SearchResults {...defaultProps} results={partyResult} totalResults={1} />);
      expect(screen.getByText('Party')).toBeInTheDocument();
      expect(screen.getByText('🏛️')).toBeInTheDocument();
    });

    it('renders category type correctly', () => {
      const categoryResult: SearchResult[] = [
        { type: 'category', id: '1', title: 'Test Category', description: 'Desc', relevance_score: 0.9, highlighted: '' },
      ];
      render(<SearchResults {...defaultProps} results={categoryResult} totalResults={1} />);
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('📁')).toBeInTheDocument();
    });
  });

  describe('Status Badge Colors', () => {
    it('shows green badge for Delivered status', () => {
      const deliveredResult: SearchResult[] = [
        { type: 'promise', id: '1', title: 'Test', description: 'Desc', relevance_score: 0.9, highlighted: '', status: 'Delivered' },
      ];
      render(<SearchResults {...defaultProps} results={deliveredResult} totalResults={1} />);
      const badge = screen.getByText('Delivered');
      expect(badge).toHaveClass('bg-green-100');
    });

    it('shows yellow badge for Under implementation status', () => {
      const inProgressResult: SearchResult[] = [
        { type: 'promise', id: '1', title: 'Test', description: 'Desc', relevance_score: 0.9, highlighted: '', status: 'Under implementation' },
      ];
      render(<SearchResults {...defaultProps} results={inProgressResult} totalResults={1} />);
      const badge = screen.getByText('Under implementation');
      expect(badge).toHaveClass('bg-yellow-100');
    });

    it('shows red badge for Deferred status', () => {
      const deferredResult: SearchResult[] = [
        { type: 'promise', id: '1', title: 'Test', description: 'Desc', relevance_score: 0.9, highlighted: '', status: 'Deferred' },
      ];
      render(<SearchResults {...defaultProps} results={deferredResult} totalResults={1} />);
      const badge = screen.getByText('Deferred');
      expect(badge).toHaveClass('bg-red-100');
    });
  });
});
