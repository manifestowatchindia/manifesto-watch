/**
 * Tests for API Service
 */

import {
  fetchPromises,
  fetchPromisesByCategory,
  fetchPromiseById,
  fetchCategories,
  fetchCategoryById,
  fetchManifestos,
  fetchManifestoById
} from '../api';
import { API_CONFIG } from '../../lib/config';

// Mock fetch globally
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('fetchPromises', () => {
    it('should fetch promises successfully', async () => {
      const mockData = [
        { id: '1', title: 'Promise 1' },
        { id: '2', title: 'Promise 2' }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchPromises();

      expect(result.data).toEqual(mockData);
      expect(result.error).toBeUndefined();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/promises'),
        expect.any(Object)
      );
    });

    it('should handle fetch errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      const result = await fetchPromises();

      expect(result.data).toEqual([]);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('500');
    });

    it('should pass query parameters correctly', async () => {
      const mockData = [{ id: '1', category_id: 'cat-1' }];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      await fetchPromises({ category_id: 'cat-1', limit: 10 });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('category_id=cat-1'),
        expect.any(Object)
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=10'),
        expect.any(Object)
      );
    });

    it('should handle network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchPromises();

      expect(result.data).toEqual([]);
      expect(result.error).toBe('Network error');
    });
  });

  describe('fetchPromisesByCategory', () => {
    it('should fetch promises for specific category', async () => {
      const mockData = [{ id: '1', category_id: 'cat-1' }];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchPromisesByCategory('cat-1');

      expect(result.data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('category_id=cat-1'),
        expect.any(Object)
      );
    });

    it('should include manifesto ID if provided', async () => {
      const mockData = [{ id: '1', category_id: 'cat-1', manifesto_id: 'bjp-2024' }];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      await fetchPromisesByCategory('cat-1', 'bjp-2024');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('manifesto_id=bjp-2024'),
        expect.any(Object)
      );
    });
  });

  describe('fetchPromiseById', () => {
    it('should fetch single promise by ID', async () => {
      const mockData = { id: 'test-1', title: 'Test Promise' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchPromiseById('test-1');

      expect(result.data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/promises/test-1'),
        expect.any(Object)
      );
    });

    it('should return null for non-existent promise', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      const result = await fetchPromiseById('non-existent');

      expect(result.data).toBeNull();
      expect(result.error).toBeDefined();
    });
  });

  describe('fetchCategories', () => {
    it('should fetch all categories', async () => {
      const mockData = [
        { id: 'cat-1', name: 'Infrastructure' },
        { id: 'cat-2', name: 'Health' }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchCategories();

      expect(result.data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/categories'),
        expect.any(Object)
      );
    });
  });

  describe('fetchCategoryById', () => {
    it('should fetch single category by ID', async () => {
      const mockData = { id: 'cat-1', name: 'Infrastructure' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchCategoryById('cat-1');

      expect(result.data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/categories/cat-1'),
        expect.any(Object)
      );
    });
  });

  describe('fetchManifestos', () => {
    it('should fetch all manifestos', async () => {
      const mockData = [
        { id: 'bjp-2024', party_name: 'BJP' },
        { id: 'india-2024', party_name: 'INC' }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchManifestos();

      expect(result.data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/manifestos'),
        expect.any(Object)
      );
    });

    it('should filter by type', async () => {
      const mockData = [{ id: 'bjp-2024', election_type: 'lok_sabha' }];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      await fetchManifestos({ type: 'lok_sabha' });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('type=lok_sabha'),
        expect.any(Object)
      );
    });
  });

  describe('fetchManifestoById', () => {
    it('should fetch single manifesto by ID', async () => {
      const mockData = { id: 'bjp-2024', party_name: 'BJP' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchManifestoById('bjp-2024');

      expect(result.data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/manifestos/bjp-2024'),
        expect.any(Object)
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle timeout errors', async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 100)
        )
      );

      const result = await fetchPromises();

      expect(result.data).toEqual([]);
      expect(result.error).toBeDefined();
    });

    it('should handle JSON parse errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        }
      });

      const result = await fetchPromises();

      expect(result.data).toEqual([]);
      expect(result.error).toBeDefined();
    });
  });
});
