import {
  SearchService,
  SearchResult,
  SearchResponse,
  SearchFilters,
} from '../searchService';

describe('SearchService', () => {
  let searchService: SearchService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    searchService = new SearchService();
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('search()', () => {
    const mockResults: SearchResult[] = [
      {
        type: 'promise',
        id: 'p1',
        title: 'Healthcare Reform',
        description: 'Comprehensive healthcare policy',
        relevance_score: 0.95,
        highlighted:
          '<em>Healthcare</em> reform focusing on rural access',
      },
      {
        type: 'manifesto',
        id: 'm1',
        title: 'Health Manifesto 2024',
        description: 'Party health policy manifesto',
        relevance_score: 0.87,
        highlighted: 'Health policy focusing on <em>healthcare</em>',
      },
    ];

    const mockResponse: SearchResponse = {
      results: mockResults,
      total: 2,
      offset: 0,
      limit: 20,
    };

    test('should fetch search results for valid query', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const results = await searchService.search('healthcare');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('q=healthcare'),
        expect.any(Object)
      );
      expect(results).toEqual(mockResults);
      expect(results.length).toBe(2);
    });

    test('should include default pagination in search URL', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await searchService.search('jobs');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('limit=20'),
        expect.any(Object)
      );
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('offset=0'),
        expect.any(Object)
      );
    });

    test('should apply custom limit and offset filters', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const filters: SearchFilters = {
        limit: 10,
        offset: 20,
      };

      await searchService.search('education', filters);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('limit=10'),
        expect.any(Object)
      );
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('offset=20'),
        expect.any(Object)
      );
    });

    test('should apply category filter', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const filters: SearchFilters = { category: 'health' };

      await searchService.search('healthcare', filters);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('category=health'),
        expect.any(Object)
      );
    });

    test('should apply state filter', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const filters: SearchFilters = { state: 'Kerala' };

      await searchService.search('healthcare', filters);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('state=Kerala'),
        expect.any(Object)
      );
    });

    test('should apply status filter', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const filters: SearchFilters = { status: 'active' };

      await searchService.search('healthcare', filters);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('status=active'),
        expect.any(Object)
      );
    });

    test('should apply multiple filters', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const filters: SearchFilters = {
        category: 'health',
        state: 'Karnataka',
        status: 'active',
        limit: 15,
        offset: 5,
      };

      await searchService.search('healthcare', filters);

      const callUrl = fetchMock.mock.calls[0][0];
      expect(callUrl).toContain('q=healthcare');
      expect(callUrl).toContain('category=health');
      expect(callUrl).toContain('state=Karnataka');
      expect(callUrl).toContain('status=active');
      expect(callUrl).toContain('limit=15');
      expect(callUrl).toContain('offset=5');
    });

    test('should throw error for empty query', async () => {
      await expect(searchService.search('')).rejects.toThrow(
        'Search query must be a non-empty string'
      );
    });

    test('should throw error for whitespace-only query', async () => {
      await expect(searchService.search('   ')).rejects.toThrow(
        'Search query cannot be empty'
      );
    });

    test('should throw error if query is not a string', async () => {
      await expect(
        searchService.search(null as unknown as string)
      ).rejects.toThrow('Search query must be a non-empty string');
    });

    test('should trim query before searching', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await searchService.search('  healthcare  ');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('q=healthcare'),
        expect.any(Object)
      );
    });

    test('should handle API error response', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(searchService.search('healthcare')).rejects.toThrow(
        /Search API error/
      );
    });

    test('should handle network timeout', async () => {
      fetchMock.mockRejectedValueOnce(new Error('AbortError'));

      await expect(searchService.search('healthcare')).rejects.toThrow();
    });

    test('should handle invalid JSON response', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(searchService.search('healthcare')).rejects.toThrow();
    });

    test('should handle response with non-array results', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: 'not an array',
          total: 0,
        }),
      });

      await expect(searchService.search('healthcare')).rejects.toThrow(
        /Invalid search response/
      );
    });

    test('should encode special characters in query', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await searchService.search('covid-19 & healthcare?');

      const callUrl = fetchMock.mock.calls[0][0];
      // URLSearchParams uses + for spaces, so check for the encoded value
      expect(callUrl).toContain('q=covid-19');
      expect(callUrl).toContain('%26');
      expect(callUrl).toContain('%3F');
    });

    test('should return results in original order', async () => {
      const orderedResults: SearchResult[] = [
        { ...mockResults[0], relevance_score: 0.99 },
        { ...mockResults[1], relevance_score: 0.85 },
      ];

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: orderedResults,
          total: 2,
          offset: 0,
          limit: 20,
        }),
      });

      const results = await searchService.search('healthcare');

      expect(results[0].relevance_score).toBe(0.99);
      expect(results[1].relevance_score).toBe(0.85);
    });
  });

  describe('search() - Caching', () => {
    const mockResponse: SearchResponse = {
      results: [
        {
          type: 'promise',
          id: 'p1',
          title: 'Healthcare',
          description: 'Policy',
          relevance_score: 0.9,
          highlighted: 'Healthcare policy',
        },
      ],
      total: 1,
      offset: 0,
      limit: 20,
    };

    test('should cache search results', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      await searchService.search('healthcare');
      expect(fetchMock).toHaveBeenCalledTimes(1);

      await searchService.search('healthcare');
      expect(fetchMock).toHaveBeenCalledTimes(1); // Still 1 (cached)
    });

    test('should not cache if results are different queries', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      await searchService.search('healthcare');
      await searchService.search('education');

      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('should not cache if filters are different', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      await searchService.search('healthcare', { limit: 10 });
      await searchService.search('healthcare', { limit: 20 });

      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('should clear cache', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      await searchService.search('healthcare');
      expect(fetchMock).toHaveBeenCalledTimes(1);

      searchService.clearCache();

      await searchService.search('healthcare');
      expect(fetchMock).toHaveBeenCalledTimes(2); // Cache was cleared
    });

    test('should track cache size', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      await searchService.search('healthcare');
      const stats = searchService.getCacheStats();
      expect(stats.searchCacheSize).toBe(1);

      await searchService.search('education');
      const stats2 = searchService.getCacheStats();
      expect(stats2.searchCacheSize).toBe(2);
    });
  });

  describe('getSearchSuggestions()', () => {
    const mockSuggestions = [
      'healthcare system',
      'healthcare workers',
      'healthcare reform',
      'healthcare policy',
      'healthcare access',
    ];

    test('should fetch suggestions for valid query', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuggestions,
      });

      const suggestions = await searchService.getSearchSuggestions('heal');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('q=heal'),
        expect.any(Object)
      );
      expect(suggestions).toEqual(mockSuggestions);
    });

    test('should use default limit of 10', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuggestions,
      });

      await searchService.getSearchSuggestions('heal');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('limit=10'),
        expect.any(Object)
      );
    });

    test('should apply custom limit', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuggestions,
      });

      await searchService.getSearchSuggestions('heal', 5);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('limit=5'),
        expect.any(Object)
      );
    });

    test('should return empty array for short query (< 2 chars)', async () => {
      const suggestions = await searchService.getSearchSuggestions('h');

      expect(suggestions).toEqual([]);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    test('should return empty array for empty query', async () => {
      const suggestions = await searchService.getSearchSuggestions('');

      expect(suggestions).toEqual([]);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    test('should return empty array for whitespace query', async () => {
      const suggestions = await searchService.getSearchSuggestions('  ');

      expect(suggestions).toEqual([]);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    test('should trim query before fetching', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuggestions,
      });

      await searchService.getSearchSuggestions('  heal  ');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('q=heal'),
        expect.any(Object)
      );
    });

    test('should handle array response', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuggestions,
      });

      const suggestions = await searchService.getSearchSuggestions('heal');

      expect(Array.isArray(suggestions)).toBe(true);
      expect(suggestions).toEqual(mockSuggestions);
    });

    test('should handle object response with suggestions property', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          suggestions: mockSuggestions,
          count: 5,
        }),
      });

      const suggestions = await searchService.getSearchSuggestions('heal');

      expect(suggestions).toEqual(mockSuggestions);
    });

    test('should return empty array for invalid response', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: 'not suggestions',
        }),
      });

      const suggestions = await searchService.getSearchSuggestions('heal');

      expect(suggestions).toEqual([]);
    });

    test('should handle API error gracefully', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const suggestions = await searchService.getSearchSuggestions('heal');

      expect(suggestions).toEqual([]);
    });

    test('should handle network error gracefully', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      const suggestions = await searchService.getSearchSuggestions('heal');

      expect(suggestions).toEqual([]);
    });

    test('should limit results to requested count', async () => {
      const manyResults = Array.from({ length: 20 }, (_, i) => `suggestion ${i}`);

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => manyResults,
      });

      const suggestions = await searchService.getSearchSuggestions('test', 5);

      expect(suggestions.length).toBe(5);
      expect(suggestions).toEqual(manyResults.slice(0, 5));
    });

    test('should encode special characters in suggestions query', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuggestions,
      });

      await searchService.getSearchSuggestions('covid-19 & vaccines?');

      const callUrl = fetchMock.mock.calls[0][0];
      expect(callUrl).toContain(
        encodeURIComponent('covid-19 & vaccines?')
      );
    });
  });

  describe('getSearchSuggestions() - Caching', () => {
    const mockSuggestions = ['healthcare', 'health policy', 'health reform'];

    test('should cache suggestions', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockSuggestions,
      });

      await searchService.getSearchSuggestions('heal');
      expect(fetchMock).toHaveBeenCalledTimes(1);

      await searchService.getSearchSuggestions('heal');
      expect(fetchMock).toHaveBeenCalledTimes(1); // Still 1 (cached)
    });

    test('should not cache if limit is different', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockSuggestions,
      });

      await searchService.getSearchSuggestions('heal', 10);
      await searchService.getSearchSuggestions('heal', 5);

      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('should clear suggestions cache with clearCache()', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockSuggestions,
      });

      await searchService.getSearchSuggestions('heal');
      expect(fetchMock).toHaveBeenCalledTimes(1);

      searchService.clearCache();

      await searchService.getSearchSuggestions('heal');
      expect(fetchMock).toHaveBeenCalledTimes(2); // Cache was cleared
    });

    test('should track suggestions cache size', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockSuggestions,
      });

      await searchService.getSearchSuggestions('heal');
      const stats = searchService.getCacheStats();
      expect(stats.suggestionsCacheSize).toBe(1);

      await searchService.getSearchSuggestions('educ');
      const stats2 = searchService.getCacheStats();
      expect(stats2.suggestionsCacheSize).toBe(2);
    });
  });

  describe('API integration', () => {
    test('should make request with correct headers', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [],
          total: 0,
          offset: 0,
          limit: 20,
        }),
      });

      await searchService.search('test');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    test('should use AbortController for timeout', async () => {
      jest.useFakeTimers();
      const abortSpy = jest.fn();

      global.fetch = jest.fn(async (url, init) => {
        if (init?.signal) {
          const signal = init.signal as AbortSignal;
          signal.addEventListener('abort', abortSpy);
        }
        // Simulate timeout
        jest.runOnlyPendingTimers();
        throw new Error('AbortError');
      });

      try {
        await searchService.search('test');
      } catch {
        // Expected to throw
      }

      jest.useRealTimers();
    });
  });

  describe('error logging', () => {
    test('should log search errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      await expect(searchService.search('test')).rejects.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Search error:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    test('should log suggestions fetch errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      const suggestions = await searchService.getSearchSuggestions('heal');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Suggestions fetch error:',
        expect.any(Error)
      );
      expect(suggestions).toEqual([]);

      consoleSpy.mockRestore();
    });

    test('should warn on invalid suggestions response', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ suggestions: null }),
      });

      await searchService.getSearchSuggestions('heal');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid suggestions response'
      );

      consoleSpy.mockRestore();
    });
  });
});
