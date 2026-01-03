/**
 * Tests for Promise Service
 */

import { promiseService } from '../promiseService';
import { Promise as PromiseType } from '../../lib/types';
import * as api from '../api';

// Mock the API module
jest.mock('../api');

describe('PromiseService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPromises', () => {
    it('should fetch all promises from API', async () => {
      const mockPromises = [
        {
          id: 'test-1',
          title: 'Test Promise 1',
          category_id: 'cat-1',
          status: 'Delivered',
          measurable: true,
          type: 'policy',
          timeline: '5yr',
          geography: 'national',
          citations: []
        },
        {
          id: 'test-2',
          title: 'Test Promise 2',
          category_id: 'cat-2',
          status: 'Under implementation',
          measurable: false,
          type: 'program',
          timeline: '100d',
          geography: 'state',
          citations: []
        }
      ];

      (api.fetchPromises as jest.Mock).mockResolvedValue({
        data: mockPromises,
        error: undefined
      });

      const result = await promiseService.getAllPromises();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('test-1');
      expect(result[0].categoryId).toBe('cat-1');
      expect(api.fetchPromises).toHaveBeenCalledTimes(1);
    });

    it('should throw error when API fails', async () => {
      (api.fetchPromises as jest.Mock).mockResolvedValue({
        data: [],
        error: 'API Error'
      });

      await expect(promiseService.getAllPromises()).rejects.toThrow('API Error');
    });

    it('should cache results for subsequent calls', async () => {
      const mockPromises = [
        {
          id: 'test-1',
          title: 'Test Promise 1',
          category_id: 'cat-1',
          status: 'Delivered',
          measurable: true,
          type: 'policy',
          timeline: '5yr',
          geography: 'national',
          citations: []
        }
      ];

      (api.fetchPromises as jest.Mock).mockResolvedValue({
        data: mockPromises,
        error: undefined
      });

      // First call
      await promiseService.getAllPromises();
      // Second call (should use cache)
      await promiseService.getAllPromises();

      // API should be called only once due to caching
      expect(api.fetchPromises).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPromisesByCategory', () => {
    it('should fetch promises for specific category', async () => {
      const mockPromises = [
        {
          id: 'test-1',
          title: 'Infrastructure Promise',
          category_id: 'cat-1',
          status: 'Delivered',
          measurable: true,
          type: 'infrastructure',
          timeline: '5yr',
          geography: 'national',
          citations: []
        }
      ];

      (api.fetchPromisesByCategory as jest.Mock).mockResolvedValue({
        data: mockPromises,
        error: undefined
      });

      const result = await promiseService.getPromisesByCategory('cat-1');

      expect(result).toHaveLength(1);
      expect(result[0].categoryId).toBe('cat-1');
      expect(api.fetchPromisesByCategory).toHaveBeenCalledWith('cat-1');
    });

    it('should throw error when API fails', async () => {
      (api.fetchPromisesByCategory as jest.Mock).mockResolvedValue({
        data: [],
        error: 'Category not found'
      });

      await expect(promiseService.getPromisesByCategory('invalid')).rejects.toThrow('Category not found');
    });
  });

  describe('getPromiseById', () => {
    it('should fetch single promise by ID', async () => {
      const mockPromises = [
        {
          id: 'test-1',
          title: 'Test Promise',
          category_id: 'cat-1',
          status: 'Delivered',
          measurable: true,
          type: 'policy',
          timeline: '5yr',
          geography: 'national',
          citations: []
        },
        {
          id: 'test-2',
          title: 'Another Promise',
          category_id: 'cat-2',
          status: 'Announced',
          measurable: false,
          type: 'program',
          timeline: '100d',
          geography: 'state',
          citations: []
        }
      ];

      (api.fetchPromises as jest.Mock).mockResolvedValue({
        data: mockPromises,
        error: undefined
      });

      const result = await promiseService.getPromiseById('test-1');

      expect(result).toBeDefined();
      expect(result?.id).toBe('test-1');
      expect(result?.title).toBe('Test Promise');
    });

    it('should return undefined for non-existent ID', async () => {
      (api.fetchPromises as jest.Mock).mockResolvedValue({
        data: [],
        error: undefined
      });

      const result = await promiseService.getPromiseById('non-existent');

      expect(result).toBeUndefined();
    });
  });

  describe('getStats', () => {
    it('should calculate correct statistics', () => {
      const mockPromises: PromiseType[] = [
        {
          id: '1',
          title: 'Promise 1',
          categoryId: 'cat-1',
          status: 'Delivered',
          measurable: true,
          hasBudgetMention: true,
          type: 'policy',
          timeline: '5yr',
          geography: 'national',
          citations: []
        },
        {
          id: '2',
          title: 'Promise 2',
          categoryId: 'cat-1',
          status: 'Under implementation',
          measurable: false,
          hasBudgetMention: true,
          type: 'program',
          timeline: '100d',
          geography: 'state',
          citations: []
        },
        {
          id: '3',
          title: 'Promise 3',
          categoryId: 'cat-2',
          status: 'Announced',
          measurable: true,
          hasBudgetMention: false,
          type: 'infrastructure',
          timeline: '2047',
          geography: 'urban',
          citations: []
        }
      ];

      const stats = promiseService.getStats(mockPromises);

      expect(stats.total).toBe(3);
      expect(stats.measurablePercent).toBe(67); // 2 out of 3
      expect(stats.withBudgetPercent).toBe(67); // 2 out of 3
      expect(stats.statusBreakdown.Delivered).toBe(1);
      expect(stats.statusBreakdown['Under implementation']).toBe(1);
      expect(stats.statusBreakdown.Announced).toBe(1);
    });

    it('should handle empty promise array', () => {
      const stats = promiseService.getStats([]);

      expect(stats.total).toBe(0);
      expect(stats.measurablePercent).toBe(0);
      expect(stats.withBudgetPercent).toBe(0);
    });
  });

  describe('filterPromises', () => {
    const mockPromises: PromiseType[] = [
      {
        id: '1',
        title: 'Healthcare Promise',
        categoryId: 'cat-2',
        status: 'Delivered',
        measurable: true,
        hasBudgetMention: true,
        type: 'policy',
        timeline: '5yr',
        geography: 'national',
        citations: []
      },
      {
        id: '2',
        title: 'Infrastructure Road',
        categoryId: 'cat-1',
        status: 'Under implementation',
        measurable: false,
        hasBudgetMention: false,
        type: 'infrastructure',
        timeline: '100d',
        geography: 'state',
        citations: []
      }
    ];

    beforeEach(() => {
      (api.fetchPromises as jest.Mock).mockResolvedValue({
        data: mockPromises,
        error: undefined
      });
    });

    it('should filter by category', async () => {
      const result = await promiseService.filterPromises({ categoryId: 'cat-2' });

      expect(result).toHaveLength(1);
      expect(result[0].categoryId).toBe('cat-2');
    });

    it('should filter by status', async () => {
      const result = await promiseService.filterPromises({ status: 'Delivered' });

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('Delivered');
    });

    it('should filter by search query', async () => {
      const result = await promiseService.filterPromises({ searchQuery: 'healthcare' });

      expect(result).toHaveLength(1);
      expect(result[0].title.toLowerCase()).toContain('healthcare');
    });

    it('should filter by measurable flag', async () => {
      const result = await promiseService.filterPromises({ measurable: true });

      expect(result).toHaveLength(1);
      expect(result[0].measurable).toBe(true);
    });

    it('should apply multiple filters', async () => {
      const result = await promiseService.filterPromises({
        categoryId: 'cat-1',
        status: 'Under implementation',
        measurable: false
      });

      expect(result).toHaveLength(1);
      expect(result[0].categoryId).toBe('cat-1');
      expect(result[0].status).toBe('Under implementation');
      expect(result[0].measurable).toBe(false);
    });
  });
});
