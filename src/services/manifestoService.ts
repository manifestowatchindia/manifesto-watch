/**
 * Manifesto Service
 * Handles fetching manifesto data from API with centralized caching
 */

import { Manifesto, ManifestoFilter } from '../lib/types';
import { API_CONFIG, API_ENDPOINTS, buildApiUrl } from '../lib/config';
import cacheManager from './api/cache-manager';

/**
 * Fetch manifestos from API
 */
async function fetchFromApi(filters?: ManifestoFilter): Promise<Manifesto[]> {
  const url = buildApiUrl(API_ENDPOINTS.MANIFESTOS, filters);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

/**
 * Generate cache key from filters
 */
function generateCacheKey(filters?: ManifestoFilter): string {
  if (!filters) return 'manifestos:all';
  return `manifestos:${JSON.stringify(filters)}`;
}

/**
 * Main function to get manifestos
 */
export async function getManifestos(filters?: ManifestoFilter): Promise<Manifesto[]> {
  const cacheKey = generateCacheKey(filters);
  
  // Check cache first
  const cached = cacheManager.get<Manifesto[]>(cacheKey);
  if (cached) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Cache Hit] Manifestos ${filters ? 'with filters' : 'all'}`);
    }
    return cached;
  }

  // Cache miss - fetch from API
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Cache Miss] Manifestos ${filters ? 'with filters' : 'all'} - fetching from API`);
  }
  
  try {
    const data = await fetchFromApi(filters);
    
    // Store in cache with 5 minute TTL
    cacheManager.set(cacheKey, data, API_CONFIG.CACHE_TTL);
    
    return data;
  } catch (error) {
    console.error('Failed to fetch manifestos from API:', error);
    throw error;
  }
}

/**
 * Get a single manifesto by ID
 */
export async function getManifestoById(id: string): Promise<Manifesto | null> {
  const cacheKey = `manifestos:id:${id}`;
  
  // Check cache first
  const cached = cacheManager.get<Manifesto>(cacheKey);
  if (cached) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Cache Hit] Manifesto ${id}`);
    }
    return cached;
  }

  // Cache miss - fetch from API
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Cache Miss] Manifesto ${id} - fetching from API`);
  }

  try {
    const url = buildApiUrl(API_ENDPOINTS.MANIFESTO_BY_ID(id));
    const response = await fetch(url, {
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    });
    
    if (response.ok) {
      const manifesto = await response.json();
      
      // Store in cache
      cacheManager.set(cacheKey, manifesto, API_CONFIG.CACHE_TTL);
      
      return manifesto;
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to fetch manifesto ${id} from API:`, error);
    throw error;
  }
}

/**
 * Get manifestos by election type
 */
export async function getManifestosByType(type: string): Promise<Manifesto[]> {
  return getManifestos({ type: type as any });
}

/**
 * Get manifestos by year
 */
export async function getManifestosByYear(year: number): Promise<Manifesto[]> {
  return getManifestos({ year });
}

/**
 * Get manifestos by party
 */
export async function getManifestosByParty(party: string): Promise<Manifesto[]> {
  return getManifestos({ party });
}

/**
 * Clear manifesto cache
 */
export function clearManifestoCache(): void {
  const keys = cacheManager.getKeys();
  keys.forEach(key => {
    if (key.startsWith('manifestos:')) {
      cacheManager.delete(key);
    }
  });
}
