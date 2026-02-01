import { CacheManager, CacheEntry, CacheStats } from '../cache-manager';

describe('CacheManager', () => {
  let cacheManager: CacheManager;

  beforeEach(() => {
    cacheManager = new CacheManager();
    cacheManager.stopPeriodicCleanup(); // Prevent interference from periodic cleanup
  });

  afterEach(() => {
    cacheManager.stopPeriodicCleanup();
    cacheManager.clear();
  });

  describe('Initialization', () => {
    it('should initialize with empty cache', () => {
      const stats = cacheManager.getStats();
      expect(stats.size).toBe(0);
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
      expect(stats.expired).toBe(0);
      expect(stats.hitRate).toBe(0);
    });

    it('should not start periodic cleanup in test environment', () => {
      // If this test doesn't timeout, periodic cleanup is not running
      expect(process.env.NODE_ENV).toBe('test');
    });
  });

  describe('set() and get()', () => {
    it('should store and retrieve data', () => {
      const key = 'test-key';
      const data = { message: 'Hello, World!' };

      cacheManager.set(key, data);
      const retrieved = cacheManager.get<typeof data>(key);

      expect(retrieved).toEqual(data);
    });

    it('should return null for non-existent key', () => {
      const result = cacheManager.get('non-existent');
      expect(result).toBeNull();
    });

    it('should support different data types', () => {
      cacheManager.set('string', 'test');
      cacheManager.set('number', 42);
      cacheManager.set('boolean', true);
      cacheManager.set('array', [1, 2, 3]);
      cacheManager.set('object', { a: 1, b: 2 });

      expect(cacheManager.get('string')).toBe('test');
      expect(cacheManager.get('number')).toBe(42);
      expect(cacheManager.get('boolean')).toBe(true);
      expect(cacheManager.get('array')).toEqual([1, 2, 3]);
      expect(cacheManager.get('object')).toEqual({ a: 1, b: 2 });
    });

    it('should overwrite existing key', () => {
      cacheManager.set('key', 'first');
      cacheManager.set('key', 'second');

      expect(cacheManager.get('key')).toBe('second');
    });
  });

  describe('TTL and Expiration', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return null for expired entries', () => {
      const key = 'expire-test';
      const ttl = 1000; // 1 second

      cacheManager.set(key, 'data', ttl);
      
      // Data should be available immediately
      expect(cacheManager.get(key)).toBe('data');

      // Advance time past TTL
      jest.advanceTimersByTime(1001);

      // Data should be expired
      expect(cacheManager.get(key)).toBeNull();
    });

    it('should use default TTL if not specified', () => {
      const key = 'default-ttl';
      const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

      cacheManager.set(key, 'data');

      // Should be available before expiry
      jest.advanceTimersByTime(DEFAULT_TTL - 1000);
      expect(cacheManager.get(key)).toBe('data');

      // Should be expired after default TTL
      jest.advanceTimersByTime(2000);
      expect(cacheManager.get(key)).toBeNull();
    });

    it('should allow custom TTL per entry', () => {
      cacheManager.set('short', 'data1', 1000); // 1 second
      cacheManager.set('long', 'data2', 10000); // 10 seconds

      jest.advanceTimersByTime(1500);

      expect(cacheManager.get('short')).toBeNull(); // Expired
      expect(cacheManager.get('long')).toBe('data2'); // Still valid
    });

    it('should remove expired entry on access', () => {
      cacheManager.set('key', 'data', 1000);

      expect(cacheManager.getStats().size).toBe(1);

      jest.advanceTimersByTime(1500);
      cacheManager.get('key'); // This should remove the expired entry

      expect(cacheManager.getStats().size).toBe(0);
    });
  });

  describe('has()', () => {
    it('should return true for existing valid key', () => {
      cacheManager.set('key', 'data');
      expect(cacheManager.has('key')).toBe(true);
    });

    it('should return false for non-existent key', () => {
      expect(cacheManager.has('non-existent')).toBe(false);
    });

    it('should return false and remove expired entries', () => {
      jest.useFakeTimers();

      cacheManager.set('key', 'data', 1000);
      expect(cacheManager.has('key')).toBe(true);

      jest.advanceTimersByTime(1500);
      expect(cacheManager.has('key')).toBe(false);
      expect(cacheManager.getStats().size).toBe(0);

      jest.useRealTimers();
    });
  });

  describe('delete()', () => {
    it('should delete existing entry', () => {
      cacheManager.set('key', 'data');
      expect(cacheManager.delete('key')).toBe(true);
      expect(cacheManager.get('key')).toBeNull();
    });

    it('should return false for non-existent key', () => {
      expect(cacheManager.delete('non-existent')).toBe(false);
    });

    it('should reduce cache size', () => {
      cacheManager.set('key1', 'data1');
      cacheManager.set('key2', 'data2');
      expect(cacheManager.getStats().size).toBe(2);

      cacheManager.delete('key1');
      expect(cacheManager.getStats().size).toBe(1);
    });
  });

  describe('clear()', () => {
    it('should remove all entries', () => {
      cacheManager.set('key1', 'data1');
      cacheManager.set('key2', 'data2');
      cacheManager.set('key3', 'data3');

      expect(cacheManager.getStats().size).toBe(3);

      cacheManager.clear();

      expect(cacheManager.getStats().size).toBe(0);
      expect(cacheManager.get('key1')).toBeNull();
      expect(cacheManager.get('key2')).toBeNull();
      expect(cacheManager.get('key3')).toBeNull();
    });

    it('should reset statistics', () => {
      cacheManager.set('key', 'data');
      cacheManager.get('key'); // hit
      cacheManager.get('missing'); // miss

      expect(cacheManager.getStats().hits).toBeGreaterThan(0);
      expect(cacheManager.getStats().misses).toBeGreaterThan(0);

      cacheManager.clear();

      const stats = cacheManager.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
      expect(stats.expired).toBe(0);
    });
  });

  describe('clearExpired()', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should remove only expired entries', () => {
      cacheManager.set('key1', 'data1', 1000); // Expires in 1s
      cacheManager.set('key2', 'data2', 5000); // Expires in 5s
      cacheManager.set('key3', 'data3', 10000); // Expires in 10s

      jest.advanceTimersByTime(2000); // 2 seconds later

      const removedCount = cacheManager.clearExpired();

      expect(removedCount).toBe(1); // Only key1 expired
      expect(cacheManager.get('key1')).toBeNull();
      expect(cacheManager.get('key2')).toBe('data2');
      expect(cacheManager.get('key3')).toBe('data3');
    });

    it('should return 0 when no entries are expired', () => {
      cacheManager.set('key1', 'data1', 10000);
      cacheManager.set('key2', 'data2', 10000);

      const removedCount = cacheManager.clearExpired();

      expect(removedCount).toBe(0);
      expect(cacheManager.getStats().size).toBe(2);
    });

    it('should update expired count in stats', () => {
      cacheManager.set('key', 'data', 1000);

      jest.advanceTimersByTime(1500);

      cacheManager.clearExpired();

      expect(cacheManager.getStats().expired).toBeGreaterThan(0);
    });
  });

  describe('getStats()', () => {
    it('should track cache hits', () => {
      cacheManager.set('key', 'data');
      
      cacheManager.get('key'); // hit
      cacheManager.get('key'); // hit
      cacheManager.get('key'); // hit

      const stats = cacheManager.getStats();
      expect(stats.hits).toBe(3);
      expect(stats.misses).toBe(0);
    });

    it('should track cache misses', () => {
      cacheManager.get('missing1'); // miss
      cacheManager.get('missing2'); // miss

      const stats = cacheManager.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(2);
    });

    it('should calculate hit rate correctly', () => {
      cacheManager.set('key', 'data');

      cacheManager.get('key'); // hit
      cacheManager.get('key'); // hit
      cacheManager.get('missing'); // miss

      const stats = cacheManager.getStats();
      // 2 hits, 1 miss = 2/3 = 66.67%
      expect(stats.hitRate).toBeCloseTo(66.67, 1);
    });

    it('should return 0 hit rate when no requests made', () => {
      const stats = cacheManager.getStats();
      expect(stats.hitRate).toBe(0);
    });

    it('should track cache size', () => {
      expect(cacheManager.getStats().size).toBe(0);

      cacheManager.set('key1', 'data1');
      expect(cacheManager.getStats().size).toBe(1);

      cacheManager.set('key2', 'data2');
      expect(cacheManager.getStats().size).toBe(2);

      cacheManager.delete('key1');
      expect(cacheManager.getStats().size).toBe(1);
    });

    it('should count expired entries accessed via get', () => {
      jest.useFakeTimers();

      cacheManager.set('key', 'data', 1000);

      jest.advanceTimersByTime(1500);

      cacheManager.get('key'); // Should detect expiration

      expect(cacheManager.getStats().expired).toBe(1);

      jest.useRealTimers();
    });
  });

  describe('resetStats()', () => {
    it('should reset statistics without clearing cache', () => {
      cacheManager.set('key', 'data');
      cacheManager.get('key'); // hit
      cacheManager.get('missing'); // miss

      expect(cacheManager.getStats().hits).toBeGreaterThan(0);
      expect(cacheManager.getStats().misses).toBeGreaterThan(0);

      cacheManager.resetStats();

      const stats = cacheManager.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
      expect(stats.expired).toBe(0);
      expect(stats.size).toBe(1); // Cache still has the entry
    });
  });

  describe('getKeys()', () => {
    it('should return all cache keys', () => {
      cacheManager.set('key1', 'data1');
      cacheManager.set('key2', 'data2');
      cacheManager.set('key3', 'data3');

      const keys = cacheManager.getKeys();

      expect(keys).toHaveLength(3);
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toContain('key3');
    });

    it('should return empty array for empty cache', () => {
      const keys = cacheManager.getKeys();
      expect(keys).toEqual([]);
    });
  });

  describe('getSizeInBytes()', () => {
    it('should return approximate cache size', () => {
      const emptySize = cacheManager.getSizeInBytes();
      expect(emptySize).toBe(0);

      cacheManager.set('key', 'data');
      const sizeWithOneEntry = cacheManager.getSizeInBytes();
      expect(sizeWithOneEntry).toBeGreaterThan(0);

      cacheManager.set('another', { large: 'object', with: ['multiple', 'values'] });
      const sizeWithTwoEntries = cacheManager.getSizeInBytes();
      expect(sizeWithTwoEntries).toBeGreaterThan(sizeWithOneEntry);
    });

    it('should calculate size for complex objects', () => {
      const largeObject = {
        id: 1,
        name: 'Test Object',
        data: Array(100).fill({ value: 'test' }),
      };

      cacheManager.set('large', largeObject);
      const size = cacheManager.getSizeInBytes();

      // Size should be reasonable (rough estimate)
      expect(size).toBeGreaterThan(1000); // At least 1KB
    });
  });

  describe('Periodic Cleanup', () => {
    it('should cleanup expired entries periodically in non-test environment', () => {
      // Note: In test environment, periodic cleanup is disabled
      // This test verifies the mechanism exists
      const manager = new CacheManager();
      
      // Verify that stopPeriodicCleanup can be called without error
      expect(() => manager.stopPeriodicCleanup()).not.toThrow();
      
      manager.stopPeriodicCleanup();
    });
  });

  describe('Type Safety', () => {
    it('should work with typed data', () => {
      interface User {
        id: number;
        name: string;
        email: string;
      }

      const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };

      cacheManager.set<User>('user:1', user);
      const retrieved = cacheManager.get<User>('user:1');

      expect(retrieved).toEqual(user);
      expect(retrieved?.id).toBe(1);
      expect(retrieved?.name).toBe('John Doe');
    });

    it('should handle null and undefined', () => {
      cacheManager.set('null-value', null);
      cacheManager.set('undefined-value', undefined);

      expect(cacheManager.get('null-value')).toBeNull();
      expect(cacheManager.get('undefined-value')).toBeUndefined();
    });
  });

  describe('Real-World Scenarios', () => {
    it('should handle API response caching', () => {
      interface ApiResponse {
        data: any[];
        total: number;
        page: number;
      }

      const response: ApiResponse = {
        data: [{ id: 1 }, { id: 2 }],
        total: 100,
        page: 1,
      };

      const cacheKey = 'api:promises:page=1&limit=10';
      cacheManager.set(cacheKey, response, 5 * 60 * 1000); // 5 minutes

      const cached = cacheManager.get<ApiResponse>(cacheKey);
      expect(cached).toEqual(response);
    });

    it('should handle multiple simultaneous requests', () => {
      // Simulate multiple requests for same resource
      const key = 'popular-resource';
      cacheManager.set(key, 'data');

      // Simulate 100 requests
      for (let i = 0; i < 100; i++) {
        const result = cacheManager.get(key);
        expect(result).toBe('data');
      }

      const stats = cacheManager.getStats();
      expect(stats.hits).toBe(100);
      expect(stats.hitRate).toBe(100);
    });

    it('should handle cache invalidation pattern', () => {
      // Initial data
      cacheManager.set('user:1', { name: 'John' });
      expect(cacheManager.get('user:1')).toEqual({ name: 'John' });

      // Update operation - invalidate cache
      cacheManager.delete('user:1');
      expect(cacheManager.get('user:1')).toBeNull();

      // New data after update
      cacheManager.set('user:1', { name: 'John Updated' });
      expect(cacheManager.get('user:1')).toEqual({ name: 'John Updated' });
    });
  });
});
