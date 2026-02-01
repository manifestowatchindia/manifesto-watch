import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SearchBar } from '../../components/search/SearchBar';
import { FilterPanel, FilterState } from '../../components/search/FilterPanel';
import { SearchResults, SearchResult } from '../../components/search/SearchResults';

/**
 * Default empty filter state
 */
const DEFAULT_FILTERS: FilterState = {
  categories: [],
  statuses: [],
  state: undefined,
  parties: [],
  timeline: undefined,
};

/**
 * Mock search results for development
 * In production, this would be replaced with actual API calls
 */
const generateMockResults = (query: string, filters: FilterState): SearchResult[] => {
  if (!query || query.length < 2) return [];
  
  const baseResults: SearchResult[] = [
    {
      type: 'promise',
      id: 'promise-1',
      title: '100,000 Government Jobs in 5 Years',
      description: 'Create 100,000 new government jobs across teaching, police, healthcare, and administrative departments.',
      relevance_score: 0.95,
      highlighted: `Create <mark>100,000</mark> new government <mark>${query}</mark> over 5 years`,
      category: 'Employment',
      status: 'Announced',
      party: 'LDF',
      state: 'Kerala',
    },
    {
      type: 'promise',
      id: 'promise-2',
      title: 'Universal Healthcare Coverage',
      description: 'Provide free healthcare to all citizens through enhanced government hospitals.',
      relevance_score: 0.88,
      highlighted: `Provide free <mark>healthcare</mark> to all citizens`,
      category: 'Healthcare',
      status: 'Under implementation',
      party: 'UDF',
      state: 'Kerala',
    },
    {
      type: 'manifesto',
      id: 'manifesto-1',
      title: 'BJP Election Manifesto 2024',
      description: 'Full manifesto document for 2024 Lok Sabha elections covering all major policy areas.',
      relevance_score: 0.82,
      highlighted: '',
      party: 'BJP',
      date: '2024-03-15',
    },
    {
      type: 'promise',
      id: 'promise-3',
      title: 'Free Education Up to Graduation',
      description: 'Make education free for all students from school to undergraduate level.',
      relevance_score: 0.78,
      highlighted: `Make <mark>education</mark> free for all students`,
      category: 'Education',
      status: 'Announced',
      party: 'AAP',
      state: 'Delhi',
    },
    {
      type: 'category',
      id: 'cat-1',
      title: 'Employment & Jobs',
      description: 'All promises related to job creation, unemployment benefits, and employment programs.',
      relevance_score: 0.72,
      highlighted: '',
    },
    {
      type: 'promise',
      id: 'promise-4',
      title: 'Farmer Loan Waiver',
      description: 'Complete waiver of agricultural loans up to ₹2 lakh for small and marginal farmers.',
      relevance_score: 0.68,
      highlighted: `Complete waiver of <mark>agricultural loans</mark>`,
      category: 'Agriculture',
      status: 'Delivered',
      party: 'INC',
      state: 'Karnataka',
    },
    {
      type: 'party',
      id: 'party-1',
      title: 'Bharatiya Janata Party (BJP)',
      description: 'National political party founded in 1980. Currently the ruling party at the center.',
      relevance_score: 0.65,
      highlighted: '',
    },
    {
      type: 'promise',
      id: 'promise-5',
      title: 'Smart Cities Development',
      description: 'Transform 100 cities into smart cities with digital infrastructure and modern amenities.',
      relevance_score: 0.62,
      highlighted: `Transform 100 cities into <mark>smart cities</mark>`,
      category: 'Infrastructure',
      status: 'Under implementation',
      party: 'BJP',
      state: undefined,
    },
  ];

  // Apply filters
  let filteredResults = [...baseResults];

  // Filter by categories
  if (filters.categories.length > 0) {
    filteredResults = filteredResults.filter(
      r => r.category && filters.categories.some(c => 
        r.category?.toLowerCase().includes(c.toLowerCase().replace('cat-', ''))
      )
    );
  }

  // Filter by status
  if (filters.statuses.length > 0) {
    filteredResults = filteredResults.filter(
      r => r.status && filters.statuses.includes(r.status)
    );
  }

  // Filter by state
  if (filters.state) {
    filteredResults = filteredResults.filter(
      r => r.state?.toLowerCase().replace(' ', '-') === filters.state
    );
  }

  // Filter by parties
  if (filters.parties.length > 0) {
    filteredResults = filteredResults.filter(
      r => r.party && filters.parties.some(p => 
        r.party?.toLowerCase().includes(p.toLowerCase())
      )
    );
  }

  return filteredResults;
};

/**
 * SearchPage Layout
 * 
 * A comprehensive search page with:
 * - SearchBar at top
 * - FilterPanel on left sidebar (desktop) or collapsible (mobile)
 * - SearchResults in main area
 * - URL-synced search query and filters
 * - Browser back/forward navigation support
 * - SEO optimized with dynamic meta tags
 * - Responsive design
 * 
 * @component
 * @example
 * // Route: /search?q=healthcare&category=health&status=Delivered
 */
export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filterCollapsed, setFilterCollapsed] = useState(true);
  const [page, setPage] = useState(1);

  // Get query from URL params
  const query = searchParams.get('q') || '';

  // Parse filters from URL params
  const filters: FilterState = useMemo(() => ({
    categories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
    statuses: searchParams.get('statuses')?.split(',').filter(Boolean) || [],
    state: searchParams.get('state') || undefined,
    parties: searchParams.get('parties')?.split(',').filter(Boolean) || [],
    timeline: searchParams.get('timeline') || undefined,
  }), [searchParams]);

  /**
   * Update URL params when filters change
   */
  const updateUrlParams = useCallback((newQuery?: string, newFilters?: FilterState) => {
    const q = newQuery !== undefined ? newQuery : query;
    const f = newFilters || filters;

    const params = new URLSearchParams();
    
    if (q) params.set('q', q);
    if (f.categories.length > 0) params.set('categories', f.categories.join(','));
    if (f.statuses.length > 0) params.set('statuses', f.statuses.join(','));
    if (f.state) params.set('state', f.state);
    if (f.parties.length > 0) params.set('parties', f.parties.join(','));
    if (f.timeline) params.set('timeline', f.timeline);

    setSearchParams(params, { replace: true });
  }, [query, filters, setSearchParams]);

  /**
   * Perform search with current query and filters
   */
  const performSearch = useCallback(async (searchQuery: string, searchFilters: FilterState, pageNum: number = 1) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      setTotalResults(0);
      setHasMore(false);
      return;
    }

    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, replace with actual API call:
      // const response = await searchService.search(searchQuery, {
      //   ...searchFilters,
      //   limit: 10,
      //   offset: (pageNum - 1) * 10,
      // });

      const mockResults = generateMockResults(searchQuery, searchFilters);
      
      if (pageNum === 1) {
        setResults(mockResults);
      } else {
        setResults(prev => [...prev, ...mockResults]);
      }

      setTotalResults(mockResults.length * 3); // Mock total
      setHasMore(mockResults.length >= 5 && pageNum < 3);
      setPage(pageNum);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotalResults(0);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle search submission from SearchBar
   */
  const handleSearch = useCallback((newQuery: string) => {
    updateUrlParams(newQuery, filters);
    performSearch(newQuery, filters, 1);
  }, [filters, updateUrlParams, performSearch]);

  /**
   * Handle filter changes
   */
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    updateUrlParams(query, newFilters);
  }, [query, updateUrlParams]);

  /**
   * Handle apply filters
   */
  const handleApplyFilters = useCallback(() => {
    performSearch(query, filters, 1);
    setFilterCollapsed(true);
  }, [query, filters, performSearch]);

  /**
   * Handle clear all filters
   */
  const handleClearFilters = useCallback(() => {
    updateUrlParams(query, DEFAULT_FILTERS);
    performSearch(query, DEFAULT_FILTERS, 1);
  }, [query, updateUrlParams, performSearch]);

  /**
   * Handle load more results
   */
  const handleLoadMore = useCallback(() => {
    performSearch(query, filters, page + 1);
  }, [query, filters, page, performSearch]);

  /**
   * Handle result card click
   */
  const handleResultClick = useCallback((result: SearchResult) => {
    // Navigate based on result type
    switch (result.type) {
      case 'promise':
        navigate(`/tracking?promise=${result.id}`);
        break;
      case 'manifesto':
        navigate(`/manifestos/${result.id}`);
        break;
      case 'party':
        navigate(`/parties/${result.id}`);
        break;
      case 'category':
        navigate(`/tracking?category=${result.id}`);
        break;
      default:
        break;
    }
  }, [navigate]);

  /**
   * Toggle filter panel on mobile
   */
  const handleToggleFilters = useCallback(() => {
    setFilterCollapsed(prev => !prev);
  }, []);

  // Perform search on mount if query exists
  useEffect(() => {
    if (query) {
      performSearch(query, filters, 1);
    }
  }, []); // Only on mount

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.categories.length;
    count += filters.statuses.length;
    count += filters.parties.length;
    if (filters.state) count++;
    if (filters.timeline) count++;
    return count;
  }, [filters]);

  return (
    <>
      <Helmet>
        <title>
          {query 
            ? `Search: ${query} | ManifestoWatch.in` 
            : 'Search Promises & Manifestos | ManifestoWatch.in'}
        </title>
        <meta 
          name="description" 
          content={query
            ? `Search results for "${query}" - Find promises, manifestos, and party information on ManifestoWatch.in`
            : 'Search through thousands of political promises, manifestos, and party information. Track government accountability.'
          }
        />
        <meta name="keywords" content={`${query || 'promises'}, manifesto, political, search, India, elections`} />
        <link rel="canonical" href={`https://manifestowatch.in/search${query ? `?q=${encodeURIComponent(query)}` : ''}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Search Promises & Manifestos
            </h1>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search promises, manifestos, parties..."
              showTrending={!query}
              trendingSearches={['healthcare', 'jobs', 'education', 'infrastructure', 'farmers']}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Mobile Filter Toggle Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={handleToggleFilters}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 w-full justify-center"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Filter Panel - Sidebar */}
            <aside className={`md:w-72 lg:w-80 flex-shrink-0 ${filterCollapsed ? 'hidden md:block' : 'block'}`}>
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
                isCollapsed={filterCollapsed}
                onToggleCollapse={handleToggleFilters}
              />
            </aside>

            {/* Search Results - Main Area */}
            <main className="flex-1 min-w-0">
              {/* Results Info Bar */}
              {query && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-gray-600">
                      {loading ? (
                        'Searching...'
                      ) : (
                        <>
                          Found <span className="font-semibold">{totalResults.toLocaleString()}</span> results 
                          for "<span className="font-semibold">{query}</span>"
                        </>
                      )}
                    </p>
                    
                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        onClick={handleClearFilters}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Search Results */}
              <SearchResults
                results={results}
                loading={loading}
                totalResults={totalResults}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                onResultClick={handleResultClick}
                query={query}
              />

              {/* Initial State - No Query */}
              {!query && !loading && results.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Start Your Search
                  </h2>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    Search through thousands of political promises, party manifestos, and election data from across India.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="text-sm text-gray-500">Popular searches:</span>
                    {['healthcare', 'jobs', 'education', 'farmers', 'infrastructure'].map(term => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleSearch(term)}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
