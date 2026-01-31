import React from 'react';

/**
 * Search result type
 */
export type SearchResultType = 'promise' | 'manifesto' | 'party' | 'category';

/**
 * Individual search result item
 */
export interface SearchResult {
  type: SearchResultType;
  id: string;
  title: string;
  description: string;
  relevance_score: number;
  highlighted: string;
  // Optional fields based on result type
  category?: string;
  status?: string;
  party?: string;
  state?: string;
  date?: string;
}

/**
 * SearchResults component props
 */
export interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  totalResults: number;
  onLoadMore: () => void;
  hasMore: boolean;
  onResultClick?: (result: SearchResult) => void;
  query?: string;
  className?: string;
}

/**
 * Get icon for result type
 */
const getTypeIcon = (type: SearchResultType): string => {
  switch (type) {
    case 'promise':
      return '📋';
    case 'manifesto':
      return '📄';
    case 'party':
      return '🏛️';
    case 'category':
      return '📁';
    default:
      return '📌';
  }
};

/**
 * Get badge color for result type
 */
const getTypeBadgeClass = (type: SearchResultType): string => {
  switch (type) {
    case 'promise':
      return 'bg-blue-100 text-blue-800';
    case 'manifesto':
      return 'bg-purple-100 text-purple-800';
    case 'party':
      return 'bg-orange-100 text-orange-800';
    case 'category':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Get status badge color
 */
const getStatusBadgeClass = (status?: string): string => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800';
    case 'Under implementation':
      return 'bg-yellow-100 text-yellow-800';
    case 'Announced':
      return 'bg-blue-100 text-blue-800';
    case 'Actioned':
      return 'bg-purple-100 text-purple-800';
    case 'Deferred':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Skeleton loader for search results
 */
const SearchResultSkeleton: React.FC = () => (
  <div className="animate-pulse" data-testid="search-result-skeleton">
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-1" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Single search result card
 */
const SearchResultCard: React.FC<{
  result: SearchResult;
  onClick?: (result: SearchResult) => void;
}> = ({ result, onClick }) => {
  const handleClick = () => {
    onClick?.(result);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(result);
    }
  };

  return (
    <article
      className="bg-white rounded-lg border border-gray-200 p-4 mb-3 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${result.type}: ${result.title}`}
      data-testid="search-result-card"
    >
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div className="text-2xl" aria-hidden="true">
          {getTypeIcon(result.type)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Type and Meta Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeBadgeClass(result.type)}`}>
              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
            </span>
            
            {result.status && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadgeClass(result.status)}`}>
                {result.status}
              </span>
            )}

            {result.relevance_score > 0 && (
              <span className="text-xs text-gray-500" title="Relevance score">
                {Math.round(result.relevance_score * 100)}% match
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {result.title}
          </h3>

          {/* Description or Highlighted Text */}
          {result.highlighted ? (
            <p
              className="text-sm text-gray-600 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: result.highlighted }}
            />
          ) : (
            <p className="text-sm text-gray-600 line-clamp-2">
              {result.description}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
            {result.party && (
              <span className="flex items-center gap-1">
                <span>🏛️</span>
                {result.party}
              </span>
            )}
            {result.category && (
              <span className="flex items-center gap-1">
                <span>📁</span>
                {result.category}
              </span>
            )}
            {result.state && (
              <span className="flex items-center gap-1">
                <span>📍</span>
                {result.state}
              </span>
            )}
            {result.date && (
              <span className="flex items-center gap-1">
                <span>📅</span>
                {result.date}
              </span>
            )}
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="text-gray-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  );
};

/**
 * SearchResults Component
 * 
 * Displays search results in a list format with:
 * - Result cards with type indicators (promise/manifesto/party/category)
 * - Highlighted matching text
 * - Relevance score display
 * - Loading skeletons
 * - Empty state (no results)
 * - Pagination with "Load More" button
 * 
 * @component
 * @example
 * <SearchResults
 *   results={searchResults}
 *   loading={isLoading}
 *   totalResults={100}
 *   onLoadMore={handleLoadMore}
 *   hasMore={true}
 * />
 */
export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  totalResults,
  onLoadMore,
  hasMore,
  onResultClick,
  query,
  className = '',
}) => {
  // Loading state with skeletons
  if (loading && results.length === 0) {
    return (
      <div className={`${className}`} data-testid="search-results-loading">
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        {[1, 2, 3, 4, 5].map(i => (
          <SearchResultSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!loading && results.length === 0) {
    return (
      <div
        className={`text-center py-12 ${className}`}
        data-testid="search-results-empty"
      >
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No results found
        </h3>
        {query ? (
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any results for "<strong>{query}</strong>". Try different keywords or adjust your filters.
          </p>
        ) : (
          <p className="text-gray-500 max-w-md mx-auto">
            Try searching for promises, manifestos, parties, or categories to see results here.
          </p>
        )}
        <div className="mt-6 space-y-2 text-sm text-gray-500">
          <p>💡 Tips:</p>
          <ul className="list-disc list-inside">
            <li>Check your spelling</li>
            <li>Try more general keywords</li>
            <li>Remove some filters</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`} data-testid="search-results">
      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          {totalResults > 0 ? (
            <>
              Showing <span className="font-medium">{results.length}</span> of{' '}
              <span className="font-medium">{totalResults.toLocaleString()}</span> results
              {query && (
                <> for "<span className="font-medium">{query}</span>"</>
              )}
            </>
          ) : (
            'No results'
          )}
        </p>
      </div>

      {/* Results list */}
      <div className="space-y-0" role="list" aria-label="Search results">
        {results.map((result, index) => (
          <SearchResultCard
            key={`${result.type}-${result.id}-${index}`}
            result={result}
            onClick={onResultClick}
          />
        ))}
      </div>

      {/* Loading more indicator */}
      {loading && results.length > 0 && (
        <div className="py-4">
          <SearchResultSkeleton />
          <SearchResultSkeleton />
        </div>
      )}

      {/* Load More button */}
      {hasMore && !loading && (
        <div className="text-center py-6">
          <button
            type="button"
            onClick={onLoadMore}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Load More Results
          </button>
          <p className="text-xs text-gray-500 mt-2">
            {totalResults - results.length} more results available
          </p>
        </div>
      )}

      {/* End of results */}
      {!hasMore && results.length > 0 && (
        <div className="text-center py-6 border-t border-gray-200 mt-4">
          <p className="text-sm text-gray-500">
            ✓ You've reached the end of the results
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
