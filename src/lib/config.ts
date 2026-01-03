/**
 * API Configuration
 * Central configuration for API endpoints and settings
 */

export const API_CONFIG = {
  // Base URL - can be overridden by environment variable
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000',
  
  // API version
  VERSION: 'v1',
  
  // Timeout settings
  TIMEOUT: 10000, // 10 seconds
  
  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Cache settings
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
};

// API Endpoints
export const API_ENDPOINTS = {
  // Manifesto endpoints
  MANIFESTOS: '/api/v1/manifestos',
  MANIFESTO_BY_ID: (id: string) => `/api/v1/manifestos/${id}`,
  
  // Promise endpoints
  PROMISES: '/api/v1/promises',
  PROMISE_BY_ID: (id: string) => `/api/v1/promises/${id}`,
  PROMISES_BY_CATEGORY: (categoryId: string) => `/api/v1/promises/category/${categoryId}`,
  PROMISES_BY_MANIFESTO: (manifestoId: string) => `/api/v1/promises/manifesto/${manifestoId}`,
  
  // Category endpoints
  CATEGORIES: '/api/v1/categories',
  CATEGORY_BY_ID: (id: string) => `/api/v1/categories/${id}`,
  
  // Stats endpoints
  STATS: '/api/v1/stats',
  STATS_BY_CATEGORY: (categoryId: string) => `/api/v1/stats/category/${categoryId}`,
  STATS_BY_MANIFESTO: (manifestoId: string) => `/api/v1/stats/manifesto/${manifestoId}`,
};

/**
 * Build full API URL
 */
export const buildApiUrl = (endpoint: string, params?: Record<string, any>): string => {
  const url = new URL(endpoint, API_CONFIG.BASE_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
};

/**
 * Check if API is available
 */
export const checkApiAvailability = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });
    return response.ok;
  } catch (error) {
    console.warn('API is not available:', error);
    return false;
  }
};
