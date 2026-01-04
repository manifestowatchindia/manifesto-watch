/**
 * Promise Service - Service layer for promise data
 * This provides a loosely coupled architecture by abstracting data sources
 */

import { Promise as PromiseType } from '../lib/types';
import { fetchPromises as apiFetchPromises, fetchPromisesByCategory as apiFetchPromisesByCategory } from './api';

/**
 * Interface for Promise Data Repository
 * This allows easy swapping of data sources (API, mock, etc.)
 */
export interface IPromiseRepository {
  getAllPromises(): Promise<PromiseType[]>;
  getPromisesByCategory(categoryId: string): Promise<PromiseType[]>;
  getPromiseById(id: string): Promise<PromiseType | undefined>;
}

/**
 * API Repository - Fetches data from backend API
 */
class ApiPromiseRepository implements IPromiseRepository {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.CACHE_TTL;
  }

  async getAllPromises(): Promise<PromiseType[]> {
    const cacheKey = 'all-promises';
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const response = await apiFetchPromises();
      
      if (response.error) {
        throw new Error(response.error);
      }

      const promises = this.transformApiData(response.data as any[]);
      this.cache.set(cacheKey, { data: promises, timestamp: Date.now() });
      
      return promises;
    } catch (error) {
      console.error('API fetch failed:', error);
      throw error;
    }
  }

  async getPromisesByCategory(categoryId: string): Promise<PromiseType[]> {
    const cacheKey = `category-${categoryId}`;
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const response = await apiFetchPromisesByCategory(categoryId);
      
      if (response.error) {
        throw new Error(response.error);
      }

      const promises = this.transformApiData(response.data as any[]);
      this.cache.set(cacheKey, { data: promises, timestamp: Date.now() });
      
      return promises;
    } catch (error) {
      console.error(`API fetch failed for category ${categoryId}:`, error);
      throw error;
    }
  }

  async getPromiseById(id: string): Promise<PromiseType | undefined> {
    try {
      const allPromises = await this.getAllPromises();
      return allPromises.find(p => p.id === id);
    } catch (error) {
      console.error(`API fetch failed for promise ${id}:`, error);
      throw error;
    }
  }

  private transformApiData(data: any[]): PromiseType[] {
    return data.map((p: any) => ({
      id: p.id,
      title: p.title,
      categoryId: p.category_id,
      subTheme: p.sub_theme,
      type: p.type,
      timeline: p.timeline,
      measurable: p.measurable,
      metric: p.metric,
      hasBudgetMention: p.has_budget_mention,
      status: p.status,
      geography: p.geography,
      description: p.description,
      citations: p.citations || []
    }));
  }

  clearCache(): void {
    this.cache.clear();
  }
}

/**
 * Promise Service - Main service interface
 * This is what components should use - provides clean API abstraction
 */
class PromiseService {
  private repository: IPromiseRepository;

  constructor(repository?: IPromiseRepository) {
    // Use API repository for all data
    this.repository = repository || new ApiPromiseRepository();
  }

  /**
   * Set a different repository (useful for testing or switching data sources)
   */
  setRepository(repository: IPromiseRepository): void {
    this.repository = repository;
  }

  /**
   * Get all promises
   */
  async getAllPromises(): Promise<PromiseType[]> {
    return this.repository.getAllPromises();
  }

  /**
   * Get promises filtered by category
   */
  async getPromisesByCategory(categoryId: string): Promise<PromiseType[]> {
    return this.repository.getPromisesByCategory(categoryId);
  }

  /**
   * Get a single promise by ID
   */
  async getPromiseById(id: string): Promise<PromiseType | undefined> {
    return this.repository.getPromiseById(id);
  }

  /**
   * Filter promises by multiple criteria
   */
  async filterPromises(criteria: {
    categoryId?: string;
    status?: string;
    type?: string;
    timeline?: string;
    geography?: string;
    measurable?: boolean;
    hasBudget?: boolean;
    searchQuery?: string;
  }): Promise<PromiseType[]> {
    let promises = criteria.categoryId
      ? await this.getPromisesByCategory(criteria.categoryId)
      : await this.getAllPromises();

    if (criteria.status) {
      promises = promises.filter(p => p.status === criteria.status);
    }

    if (criteria.type) {
      promises = promises.filter(p => p.type === criteria.type);
    }

    if (criteria.timeline) {
      promises = promises.filter(p => p.timeline === criteria.timeline);
    }

    if (criteria.geography) {
      promises = promises.filter(p => p.geography === criteria.geography);
    }

    if (criteria.measurable !== undefined) {
      promises = promises.filter(p => p.measurable === criteria.measurable);
    }

    if (criteria.hasBudget !== undefined) {
      promises = promises.filter(p => p.hasBudgetMention === criteria.hasBudget);
    }

    if (criteria.searchQuery) {
      const searchLower = criteria.searchQuery.toLowerCase();
      promises = promises.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.subTheme?.toLowerCase().includes(searchLower)
      );
    }

    return promises;
  }

  /**
   * Get statistics for a set of promises
   */
  getStats(promises: PromiseType[]) {
    const total = promises.length;
    const measurableCount = promises.filter(p => p.measurable).length;
    const withBudgetCount = promises.filter(p => p.hasBudgetMention).length;

    const statusBreakdown = {
      'Announced': 0,
      'Actioned': 0,
      'Under implementation': 0,
      'Delivered': 0,
      'Deferred': 0
    };

    promises.forEach(p => {
      if (p.status in statusBreakdown) {
        statusBreakdown[p.status as keyof typeof statusBreakdown]++;
      }
    });

    return {
      total,
      measurableCount,
      withBudgetCount,
      measurablePercent: total > 0 ? Math.round((measurableCount / total) * 100) : 0,
      withBudgetPercent: total > 0 ? Math.round((withBudgetCount / total) * 100) : 0,
      statusBreakdown
    };
  }

  /**
   * Clear any caches (useful for forcing refresh)
   */
  clearCache(): void {
    if (this.repository instanceof ApiPromiseRepository) {
      this.repository.clearCache();
    }
  }
}

// Export singleton instance
export const promiseService = new PromiseService();

// Export classes for testing/custom implementations
export { PromiseService, ApiPromiseRepository };
