/**
 * Manifesto Service
 * Handles fetching manifesto data from API only
 */

import { Manifesto, ManifestoFilter } from '../lib/types';
import { API_CONFIG, API_ENDPOINTS, buildApiUrl } from '../lib/config';

// Cache
let manifestoCache: { data: Manifesto[]; timestamp: number } | null = null;

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
 * Check if cache is valid
 */
function isCacheValid(): boolean {
  if (!manifestoCache) return false;
  const now = Date.now();
  return (now - manifestoCache.timestamp) < API_CONFIG.CACHE_TTL;
}

/**
 * Main function to get manifestos
 */
export async function getManifestos(filters?: ManifestoFilter): Promise<Manifesto[]> {
  // Check cache first
  if (isCacheValid() && !filters) {
    return manifestoCache!.data;
  }
  
  try {
    const data = await fetchFromApi(filters);
    
    // Update cache
    if (!filters) {
      manifestoCache = {
        data,
        timestamp: Date.now()
      };
    }
    
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
  try {
    const url = buildApiUrl(API_ENDPOINTS.MANIFESTO_BY_ID(id));
    const response = await fetch(url, {
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    });
    
    if (response.ok) {
      return await response.json();
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
 * Clear cache
 */
export function clearManifestoCache(): void {
  manifestoCache = null;
}
