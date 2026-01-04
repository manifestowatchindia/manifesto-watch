/**
 * API Service - Fetches data from backend API only
 * No fallback to mock data
 */

import { API_CONFIG, API_ENDPOINTS, buildApiUrl } from '../lib/config';

interface ApiResponse<T> {
  data: T;
  error?: string;
}

/**
 * Fetch from backend API
 */
async function fetchFromBackend<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  const url = buildApiUrl(endpoint, params);
  
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
  
  return await response.json();
}

/**
 * Fetch all promises with optional filters
 */
export async function fetchPromises(filters?: {
  category_id?: string;
  manifesto_id?: string;
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<ApiResponse<any[]>> {
  try {
    const data = await fetchFromBackend<any[]>(API_ENDPOINTS.PROMISES, filters);
    return { data };
  } catch (error) {
    console.error('Failed to fetch promises from API:', error);
    return { data: [], error: (error as Error).message };
  }
}

/**
 * Fetch promises by category
 */
export async function fetchPromisesByCategory(categoryId: string, manifestoId?: string): Promise<ApiResponse<any[]>> {
  try {
    const params: Record<string, any> = { category_id: categoryId };
    if (manifestoId) {
      params.manifesto_id = manifestoId;
    }
    const data = await fetchFromBackend<any[]>(API_ENDPOINTS.PROMISES, params);
    return { data };
  } catch (error) {
    console.error('Failed to fetch promises by category from API:', error);
    return { data: [], error: (error as Error).message };
  }
}

/**
 * Fetch single promise by ID
 */
export async function fetchPromiseById(promiseId: string): Promise<ApiResponse<any>> {
  try {
    const data = await fetchFromBackend<any>(`${API_ENDPOINTS.PROMISES}/${promiseId}`);
    return { data };
  } catch (error) {
    console.error('Failed to fetch promise by ID from API:', error);
    return { data: null, error: (error as Error).message };
  }
}

/**
 * Fetch categories
 */
export async function fetchCategories(): Promise<ApiResponse<any[]>> {
  try {
    const data = await fetchFromBackend<any[]>(API_ENDPOINTS.CATEGORIES);
    return { data };
  } catch (error) {
    console.error('Failed to fetch categories from API:', error);
    return { data: [], error: (error as Error).message };
  }
}

/**
 * Fetch single category by ID
 */
export async function fetchCategoryById(categoryId: string): Promise<ApiResponse<any>> {
  try {
    const data = await fetchFromBackend<any>(`${API_ENDPOINTS.CATEGORIES}/${categoryId}`);
    return { data };
  } catch (error) {
    console.error('Failed to fetch category by ID from API:', error);
    return { data: null, error: (error as Error).message };
  }
}

/**
 * Fetch manifestos
 */
export async function fetchManifestos(): Promise<ApiResponse<any[]>> {
  try {
    const data = await fetchFromBackend<any[]>(API_ENDPOINTS.MANIFESTOS);
    return { data };
  } catch (error) {
    console.error('Failed to fetch manifestos from API:', error);
    return { data: [], error: (error as Error).message };
  }
}