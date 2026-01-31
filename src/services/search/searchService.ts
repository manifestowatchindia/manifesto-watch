import { API_CONFIG, API_ENDPOINTS } from '../../lib/config';

/**
 * Search filter options for advanced search
 */
export interface SearchFilters {
  category?: string;
  state?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

/**
 * Individual search result item
 */
export interface SearchResult {
  type: 'promise' | 'manifesto' | 'party' | 'category';
  id: string;
  title: string;
  description: string;
  relevance_score: number;
  highlighted: string;
}

/**
 * Search API response wrapper
 */
export interface SearchResponse {
  results: SearchResult[];
  total: number;
  offset: number;
  limit: number;
}

/**
 * Search service for querying promises, manifestos, parties, and categories
 * 
 * Features:
 * - Full-text search with filters
 * - Auto-complete suggestions with debouncing
 * - Result caching (5-minute TTL)
 * - Pagination support
 * - Error handling and timeouts
 * - Type-safe result handling
 * 
 * @example
 * const searchService = new SearchService();
 * const results = await searchService.search('healthcare', { 
 *   category: 'health', 
 *   limit: 10 
 * });
 */
export class SearchService {
  private cache: Map<string, { data: SearchResponse; timestamp: number }> = new Map();
  private suggestionsCache: Map<string, { data: string[]; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly API_TIMEOUT = 10000; // 10 seconds

  /**
   * Search for promises, manifestos, parties, and categories
   * 
   * @param query Search query string (required)
   * @param filters Optional search filters (category, state, status, pagination)
   * @returns Array of search results
   * 
   * @example
   * const results = await searchService.search('jobs', {
   *   category: 'employment',
   *   state: 'Kerala',
   *   limit: 20,
   *   offset: 0
   * });
   */
  async search(query: string, filters?: SearchFilters): Promise<SearchResult[]> {
    // Validate query
    if (!query || typeof query !== 'string') {
      throw new Error('Search query must be a non-empty string');
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      throw new Error('Search query cannot be empty');
    }

    // Build cache key
    const cacheKey = this.buildCacheKey(trimmedQuery, filters);

    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data.results;
    }

    try {
      // Build search URL with filters
      const url = this.buildSearchUrl(trimmedQuery, filters);

      // Set up abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);

      // Fetch from API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Search API error: ${response.status} ${response.statusText}`
        );
      }

      const data: SearchResponse = await response.json();

      // Validate response
      if (!Array.isArray(data.results)) {
        throw new Error('Invalid search response: results is not an array');
      }

      // Cache results
      this.cache.set(cacheKey, { data, timestamp: Date.now() });

      return data.results;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  /**
   * Get search suggestions for auto-complete
   * 
   * Provides fast, frequently-updated suggestions based on common searches.
   * Results are cached for 5 minutes to reduce API load.
   * 
   * @param query Partial search query (minimum 2 characters)
   * @param limit Maximum number of suggestions to return (default: 10)
   * @returns Array of suggestion strings
   * 
   * @example
   * const suggestions = await searchService.getSearchSuggestions('heal', 10);
   * // Returns: ['healthcare system', 'healthcare workers', 'healthcare reform', ...]
   */
  async getSearchSuggestions(
    query: string,
    limit: number = 10
  ): Promise<string[]> {
    // Validate query
    if (!query || query.length < 2) {
      return [];
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      return [];
    }

    // Build cache key for suggestions
    const cacheKey = `suggestions:${trimmedQuery}:${limit}`;

    // Check cache
    const cached = this.suggestionsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      // Build suggestions URL
      const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SEARCH_SUGGESTIONS}?q=${encodeURIComponent(
        trimmedQuery
      )}&limit=${limit}`;

      // Set up abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);

      // Fetch from API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Suggestions API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Handle both array and object responses
      let suggestions: string[] = [];
      if (Array.isArray(data)) {
        suggestions = data;
      } else if (data && Array.isArray(data.suggestions)) {
        suggestions = data.suggestions;
      } else if (data && data.suggestions !== undefined) {
        // suggestions property exists but is not an array
        console.warn('Invalid suggestions response');
        return [];
      } else {
        suggestions = [];
      }

      // Validate suggestions
      if (!Array.isArray(suggestions)) {
        console.warn('Invalid suggestions response');
        return [];
      }

      // Filter and limit suggestions
      const limitedSuggestions = suggestions.slice(0, limit);

      // Cache suggestions
      this.suggestionsCache.set(cacheKey, {
        data: limitedSuggestions,
        timestamp: Date.now(),
      });

      return limitedSuggestions;
    } catch (error) {
      console.error('Suggestions fetch error:', error);
      return [];
    }
  }

  /**
   * Clear all cached search results
   * 
   * Useful for forcing a fresh search or after data updates
   */
  clearCache(): void {
    this.cache.clear();
    this.suggestionsCache.clear();
  }

  /**
   * Get cache statistics for monitoring
   * 
   * @returns Object with cache size information
   */
  getCacheStats(): { searchCacheSize: number; suggestionsCacheSize: number } {
    return {
      searchCacheSize: this.cache.size,
      suggestionsCacheSize: this.suggestionsCache.size,
    };
  }

  /**
   * Build cache key from query and filters
   */
  private buildCacheKey(query: string, filters?: SearchFilters): string {
    const filterParts: string[] = [];

    if (filters?.category) filterParts.push(`cat:${filters.category}`);
    if (filters?.state) filterParts.push(`state:${filters.state}`);
    if (filters?.status) filterParts.push(`status:${filters.status}`);
    if (filters?.limit) filterParts.push(`limit:${filters.limit}`);
    if (filters?.offset) filterParts.push(`offset:${filters.offset}`);

    const filterStr = filterParts.length > 0 ? `|${filterParts.join('|')}` : '';
    return `search:${query}${filterStr}`;
  }

  /**
   * Build search URL with query and filters
   */
  private buildSearchUrl(query: string, filters?: SearchFilters): string {
    const params = new URLSearchParams();

    // Add query
    params.append('q', query);

    // Add filters if provided
    if (filters?.category) params.append('category', filters.category);
    if (filters?.state) params.append('state', filters.state);
    if (filters?.status) params.append('status', filters.status);

    // Add pagination
    const limit = filters?.limit || 20;
    const offset = filters?.offset || 0;
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());

    return `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SEARCH}?${params.toString()}`;
  }
}

/**
 * Singleton instance for application-wide use
 */
export const searchService = new SearchService();

export default searchService;
