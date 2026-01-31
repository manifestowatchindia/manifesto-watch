/**
 * Integration tests for CacheManager with API services
 */

import { promiseService, ApiPromiseRepository } from '../promiseService';
import { getManifestos, getManifestoById, clearManifestoCache } from '../manifestoService';
import cacheManager from '../api/cache-manager';
import * as api from '../api';

// Mock the API module
jest.mock('../api');

describe('CacheManager Integration with Services', () => {
  beforeEach(() => {
    // Clear cache before each test
    cacheManager.clear();
    cacheManager.resetStats();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cacheManager.clear();
  });

  describe('promiseService integration', () => {
    const mockPromises = [
      {
        id: '1',
        title: 'Promise 1',
        category_id: 'cat1',
        type: 'policy',
        timeline: '5yr',
        measurable: true,
        status: 'Announced',
        geography: 'national',
        citations: []
      },
      {
        id: '2',
        title: 'Promise 2',
        category_id: 'cat1',
        type: 'program',
        timeline: '100d',
        measurable: false,
        status: 'Under implementation',
        geography: 'state',
        citations: []
      }
    ];

    beforeEach(() => {
      (api.fetchPromises as jest.Mock).mockResolvedValue({
        data: mockPromises,
        error: null
      });
      (api.fetchPromisesByCategory as jest.Mock).mockResolvedValue({
        data: mockPromises,
        error: null
      });
    });

    it('should cache promises on first fetch', async () => {
      const promises = await promiseService.getAllPromises();

      expect(promises).toHaveLength(2);
      expect(api.fetchPromises).toHaveBeenCalledTimes(1);

      // Check cache statistics
      const stats = cacheManager.getStats();
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should use cache on second fetch without API call', async () => {
      // First fetch - should hit API
      await promiseService.getAllPromises();
      expect(api.fetchPromises).toHaveBeenCalledTimes(1);

      // Second fetch - should use cache
      await promiseService.getAllPromises();
      expect(api.fetchPromises).toHaveBeenCalledTimes(1); // Still 1, not called again

      // Check cache hit rate
      const stats = cacheManager.getStats();
      expect(stats.hits).toBeGreaterThan(0);
    });

    it('should cache promises by category separately', async () => {
      const categoryId = 'cat1';

      // Fetch all promises
      await promiseService.getAllPromises();

      // Fetch by category - should be separate cache entry
      await promiseService.getPromisesByCategory(categoryId);

      expect(api.fetchPromises).toHaveBeenCalledTimes(1);
      expect(api.fetchPromisesByCategory).toHaveBeenCalledTimes(1);

      const stats = cacheManager.getStats();
      expect(stats.size).toBeGreaterThanOrEqual(2); // At least 2 cache entries
    });

    it('should clear promise cache correctly', async () => {
      // Fetch and cache promises
      await promiseService.getAllPromises();
      await promiseService.getPromisesByCategory('cat1');

      const statsBeforeClear = cacheManager.getStats();
      expect(statsBeforeClear.size).toBeGreaterThan(0);

      // Clear cache
      promiseService.clearCache();

      const statsAfterClear = cacheManager.getStats();
      expect(statsAfterClear.size).toBe(0);
    });

    it('should cache individual promises from getAllPromises', async () => {
      // Fetch all promises
      await promiseService.getAllPromises();

      // Get individual promise - should use cached data
      const promise = await promiseService.getPromiseById('1');

      expect(promise).toBeDefined();
      expect(promise?.id).toBe('1');
      expect(api.fetchPromises).toHaveBeenCalledTimes(1); // Only called once
    });

    it('should generate correct cache keys', async () => {
      await promiseService.getAllPromises();
      await promiseService.getPromisesByCategory('cat1');
      await promiseService.getPromiseById('1');

      const keys = cacheManager.getKeys();

      expect(keys).toContain('promises:all');
      expect(keys).toContain('promises:category:cat1');
      expect(keys).toContain('promises:id:1');
    });

    it('should track cache statistics accurately', async () => {
      // First fetch - cache miss
      await promiseService.getAllPromises();

      // Second fetch - cache hit
      await promiseService.getAllPromises();

      // Third fetch - cache hit
      await promiseService.getAllPromises();

      const stats = cacheManager.getStats();
      expect(stats.hits).toBe(2); // 2 cache hits
      expect(stats.misses).toBe(1); // 1 cache miss
      expect(stats.hitRate).toBe(66.67); // 2/3 = 66.67%
    });
  });

  describe('manifestoService integration', () => {
    const mockManifestos = [
      {
        id: 'm1',
        title: 'Manifesto 1',
        party: 'Party A',
        year: 2024,
        type: 'lok_sabha'
      },
      {
        id: 'm2',
        title: 'Manifesto 2',
        party: 'Party B',
        year: 2024,
        type: 'state_assembly'
      }
    ];

    let originalFetch: typeof global.fetch;

    beforeEach(() => {
      // Save original fetch
      originalFetch = global.fetch;
      
      // Mock AbortSignal.timeout if not available
      if (!AbortSignal.timeout) {
        (AbortSignal as any).timeout = jest.fn(() => new AbortController().signal);
      }
      
      // Mock fetch globally for manifestoService
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: async () => mockManifestos,
      } as Response);
    });

    afterEach(() => {
      // Restore original fetch
      global.fetch = originalFetch;
    });

    it('should cache manifestos on first fetch', async () => {
      const manifestos = await getManifestos();

      expect(manifestos).toHaveLength(2);
      expect(global.fetch).toHaveBeenCalledTimes(1);

      const stats = cacheManager.getStats();
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should use cache on second fetch', async () => {
      // First fetch
      await getManifestos();
      expect(global.fetch).toHaveBeenCalledTimes(1);

      // Second fetch - should use cache
      await getManifestos();
      expect(global.fetch).toHaveBeenCalledTimes(1); // Not called again

      const stats = cacheManager.getStats();
      expect(stats.hits).toBeGreaterThan(0);
    });

    it('should cache manifestos with different filters separately', async () => {
      // Fetch all
      await getManifestos();

      // Fetch with filter
      await getManifestos({ year: 2024 });

      expect(global.fetch).toHaveBeenCalledTimes(2);

      const keys = cacheManager.getKeys();
      expect(keys).toContain('manifestos:all');
      expect(keys.some(key => key.startsWith('manifestos:') && key.includes('2024'))).toBe(true);
    });

    it('should cache individual manifesto by ID', async () => {
      const mockManifesto = mockManifestos[0];
      
      // Override fetch for this specific test
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: async () => mockManifesto,
      } as Response);

      // First fetch
      const manifesto1 = await getManifestoById('m1');
      expect(manifesto1).toEqual(mockManifesto);
      expect(global.fetch).toHaveBeenCalledTimes(1);

      // Second fetch - should use cache
      const manifesto2 = await getManifestoById('m1');
      expect(manifesto2).toEqual(mockManifesto);
      expect(global.fetch).toHaveBeenCalledTimes(1); // Not called again

      const keys = cacheManager.getKeys();
      expect(keys).toContain('manifestos:id:m1');
    });

    it('should clear manifesto cache correctly', async () => {
      await getManifestos();
      await getManifestos({ year: 2024 });

      const statsBeforeClear = cacheManager.getStats();
      expect(statsBeforeClear.size).toBeGreaterThan(0);

      clearManifestoCache();

      const statsAfterClear = cacheManager.getStats();
      expect(statsAfterClear.size).toBe(0);
    });
  });

  describe('Cache performance', () => {
    beforeEach(() => {
      (api.fetchPromises as jest.Mock).mockResolvedValue({
        data: Array(100).fill(null).map((_, i) => ({
          id: `p${i}`,
          title: `Promise ${i}`,
          category_id: 'cat1',
          type: 'policy',
          timeline: '5yr',
          measurable: true,
          status: 'Announced',
          geography: 'national',
          citations: []
        })),
        error: null
      });
    });

    it('should handle large datasets efficiently', async () => {
      // First fetch
      await promiseService.getAllPromises();

      // Second fetch (cached) - should reuse cache
      await promiseService.getAllPromises();

      // Verify cache is being used
      expect(api.fetchPromises).toHaveBeenCalledTimes(1); // Only called once
      
      const stats = cacheManager.getStats();
      expect(stats.hits).toBe(1); // 1 cache hit
      expect(stats.misses).toBe(1); // 1 cache miss
      expect(stats.hitRate).toBe(50); // 1 hit, 1 miss = 50%
    });

    it('should track cache size', async () => {
      await promiseService.getAllPromises();

      const sizeInBytes = cacheManager.getSizeInBytes();
      expect(sizeInBytes).toBeGreaterThan(0);
    });
  });

  describe('Cache expiration', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      (api.fetchPromises as jest.Mock).mockResolvedValue({
        data: [{ id: '1', title: 'Test' }],
        error: null
      });
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should refetch after cache expiration', async () => {
      // First fetch
      await promiseService.getAllPromises();
      expect(api.fetchPromises).toHaveBeenCalledTimes(1);

      // Advance time past TTL (5 minutes)
      jest.advanceTimersByTime(5 * 60 * 1000 + 1000);

      // Second fetch - cache expired, should refetch
      await promiseService.getAllPromises();
      expect(api.fetchPromises).toHaveBeenCalledTimes(2);

      const stats = cacheManager.getStats();
      expect(stats.expired).toBeGreaterThan(0);
    });
  });

  describe('Error handling with cache', () => {
    it('should handle API errors gracefully', async () => {
      (api.fetchPromises as jest.Mock).mockResolvedValue({
        data: [],
        error: 'API Error'
      });

      await expect(promiseService.getAllPromises()).rejects.toThrow('API Error');

      // Cache should not have invalid data
      const stats = cacheManager.getStats();
      expect(stats.size).toBe(0);
    });

    it('should not cache on API failure', async () => {
      (api.fetchPromises as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(promiseService.getAllPromises()).rejects.toThrow('Network error');

      // No cache entry should be created
      const keys = cacheManager.getKeys();
      expect(keys.filter(k => k.startsWith('promises:'))).toHaveLength(0);
    });
  });
});
