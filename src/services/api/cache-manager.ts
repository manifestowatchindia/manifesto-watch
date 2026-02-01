/**
 * CacheManager - Centralized caching service for API responses
 * 
 * Features:
 * - TTL-based expiration (default 5 minutes)
 * - Automatic cleanup of expired entries
 * - Cache statistics tracking
 * - Type-safe with TypeScript generics
 */

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  expired: number;
  hitRate: number;
}

export class CacheManager {
  private cache: Map<string, CacheEntry<any>>;
  private readonly DEFAULT_TTL: number = 5 * 60 * 1000; // 5 minutes
  private stats = {
    hits: 0,
    misses: 0,
    expired: 0,
  };
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.cache = new Map();
    this.startPeriodicCleanup();
  }

  /**
   * Get cached data if it exists and hasn't expired
   * @param key - Cache key
   * @returns Cached data or null if not found/expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      return null;
    }

    const now = Date.now();
    if (now > entry.expiresAt) {
      // Expired entry
      this.cache.delete(key);
      this.stats.expired++;
      this.stats.misses++;
      return null;
    }

    this.stats.hits++;
    return entry.data as T;
  }

  /**
   * Store data in cache with optional TTL
   * @param key - Cache key
   * @param data - Data to cache
   * @param ttl - Time to live in milliseconds (default: 5 minutes)
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const expiresAt = now + (ttl ?? this.DEFAULT_TTL);

    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt,
    });
  }

  /**
   * Check if a key exists and hasn't expired
   * @param key - Cache key
   * @returns True if key exists and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const now = Date.now();
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      this.stats.expired++;
      return false;
    }

    return true;
  }

  /**
   * Delete a specific cache entry
   * @param key - Cache key
   * @returns True if entry was deleted, false if not found
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      expired: 0,
    };
  }

  /**
   * Remove all expired entries from cache
   * @returns Number of expired entries removed
   */
  clearExpired(): number {
    const now = Date.now();
    let removedCount = 0;

    Array.from(this.cache.entries()).forEach(([key, entry]) => {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        removedCount++;
        this.stats.expired++;
      }
    });

    return removedCount;
  }

  /**
   * Get cache statistics
   * @returns Cache statistics including hit rate
   */
  getStats(): CacheStats {
    const { hits, misses, expired } = this.stats;
    const totalRequests = hits + misses;
    const hitRate = totalRequests > 0 ? (hits / totalRequests) * 100 : 0;

    return {
      size: this.cache.size,
      hits,
      misses,
      expired,
      hitRate: parseFloat(hitRate.toFixed(2)),
    };
  }

  /**
   * Reset cache statistics
   */
  resetStats(): void {
    this.stats = {
      hits: 0,
      misses: 0,
      expired: 0,
    };
  }

  /**
   * Start periodic cleanup of expired entries (every 5 minutes)
   */
  private startPeriodicCleanup(): void {
    // Don't start in test environment to avoid timer issues
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
    this.cleanupInterval = setInterval(() => {
      const removed = this.clearExpired();
      if (removed > 0 && process.env.NODE_ENV === 'development') {
        console.log(`[CacheManager] Cleaned up ${removed} expired entries`);
      }
    }, CLEANUP_INTERVAL);
  }

  /**
   * Stop periodic cleanup (useful for cleanup in tests or unmounting)
   */
  stopPeriodicCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Get all cache keys (useful for debugging)
   * @returns Array of cache keys
   */
  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache size in bytes (approximate)
   * @returns Approximate cache size in bytes
   */
  getSizeInBytes(): number {
    let size = 0;
    Array.from(this.cache.entries()).forEach(([key, entry]) => {
      // Approximate: key length + JSON string length
      size += key.length * 2; // UTF-16 chars
      size += JSON.stringify(entry.data).length * 2;
    });
    return size;
  }
}

// Singleton instance
export const cacheManager = new CacheManager();

// Export for testing
export default cacheManager;
