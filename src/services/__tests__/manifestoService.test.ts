/**
 * Tests for Manifesto Service
 */

import { getManifestos, getManifestoById, clearManifestoCache } from '../manifestoService';
import * as api from '../api';

// Mock the API module
jest.mock('../api');

describe('ManifestoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearManifestoCache();
  });

  describe('getManifestos', () => {
    it('should fetch all manifestos from API', async () => {
      const mockManifestos = [
        {
          id: 'bjp-2024',
          party_name: 'BJP',
          election_year: 2024,
          election_type: 'lok_sabha',
          alliance_name: 'NDA',
          region_name: null,
          region_code: null,
          region_kind: 'national',
          language: 'English',
          document_url: 'https://example.com/bjp.pdf',
          published_date: '2024-04-14',
          is_winner: true
        },
        {
          id: 'india-2024',
          party_name: 'INC',
          election_year: 2024,
          election_type: 'lok_sabha',
          alliance_name: 'INDIA',
          region_name: null,
          region_code: null,
          region_kind: 'national',
          language: 'English',
          document_url: 'https://example.com/inc.pdf',
          published_date: '2024-04-10',
          is_winner: false
        }
      ];

      (api.fetchManifestos as jest.Mock).mockResolvedValue({
        data: mockManifestos,
        error: undefined
      });

      const result = await getManifestos();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('bjp-2024');
      expect(api.fetchManifestos).toHaveBeenCalledWith({});
    });

    it('should filter by election type', async () => {
      const mockManifestos = [
        {
          id: 'bjp-2024',
          party_name: 'BJP',
          election_year: 2024,
          election_type: 'lok_sabha',
          alliance_name: 'NDA',
          region_name: null,
          region_code: null,
          region_kind: 'national',
          language: 'English',
          document_url: 'https://example.com/bjp.pdf',
          published_date: '2024-04-14',
          is_winner: true
        }
      ];

      (api.fetchManifestos as jest.Mock).mockResolvedValue({
        data: mockManifestos,
        error: undefined
      });

      const result = await getManifestos({ type: 'lok_sabha' });

      expect(result).toHaveLength(1);
      expect(result[0].election_type).toBe('lok_sabha');
      expect(api.fetchManifestos).toHaveBeenCalledWith({ type: 'lok_sabha' });
    });

    it('should filter by year', async () => {
      const mockManifestos = [
        {
          id: 'bjp-2024',
          party_name: 'BJP',
          election_year: 2024,
          election_type: 'lok_sabha',
          alliance_name: 'NDA',
          region_name: null,
          region_code: null,
          region_kind: 'national',
          language: 'English',
          document_url: 'https://example.com/bjp.pdf',
          published_date: '2024-04-14',
          is_winner: true
        }
      ];

      (api.fetchManifestos as jest.Mock).mockResolvedValue({
        data: mockManifestos,
        error: undefined
      });

      const result = await getManifestos({ year: 2024 });

      expect(result).toHaveLength(1);
      expect(result[0].election_year).toBe(2024);
    });

    it('should filter by winner status', async () => {
      const mockManifestos = [
        {
          id: 'bjp-2024',
          party_name: 'BJP',
          election_year: 2024,
          election_type: 'lok_sabha',
          alliance_name: 'NDA',
          region_name: null,
          region_code: null,
          region_kind: 'national',
          language: 'English',
          document_url: 'https://example.com/bjp.pdf',
          published_date: '2024-04-14',
          is_winner: true
        }
      ];

      (api.fetchManifestos as jest.Mock).mockResolvedValue({
        data: mockManifestos,
        error: undefined
      });

      const result = await getManifestos({ isWinner: true });

      expect(result).toHaveLength(1);
      expect(result[0].is_winner).toBe(true);
    });

    it('should return empty array on API error', async () => {
      (api.fetchManifestos as jest.Mock).mockResolvedValue({
        data: [],
        error: 'API Error'
      });

      const result = await getManifestos();

      expect(result).toEqual([]);
    });

    it('should cache unfiltered results', async () => {
      const mockManifestos = [
        {
          id: 'bjp-2024',
          party_name: 'BJP',
          election_year: 2024,
          election_type: 'lok_sabha',
          alliance_name: 'NDA',
          region_name: null,
          region_code: null,
          region_kind: 'national',
          language: 'English',
          document_url: 'https://example.com/bjp.pdf',
          published_date: '2024-04-14',
          is_winner: true
        }
      ];

      (api.fetchManifestos as jest.Mock).mockResolvedValue({
        data: mockManifestos,
        error: undefined
      });

      // First call
      await getManifestos();
      // Second call (should use cache)
      await getManifestos();

      // API should be called only once due to caching
      expect(api.fetchManifestos).toHaveBeenCalledTimes(1);
    });

    it('should not cache filtered results', async () => {
      const mockManifestos = [
        {
          id: 'bjp-2024',
          party_name: 'BJP',
          election_year: 2024,
          election_type: 'lok_sabha',
          alliance_name: 'NDA',
          region_name: null,
          region_code: null,
          region_kind: 'national',
          language: 'English',
          document_url: 'https://example.com/bjp.pdf',
          published_date: '2024-04-14',
          is_winner: true
        }
      ];

      (api.fetchManifestos as jest.Mock).mockResolvedValue({
        data: mockManifestos,
        error: undefined
      });

      // Filtered calls should hit API each time
      await getManifestos({ year: 2024 });
      await getManifestos({ year: 2024 });

      expect(api.fetchManifestos).toHaveBeenCalledTimes(2);
    });
  });

  describe('getManifestoById', () => {
    it('should fetch single manifesto by ID', async () => {
      const mockManifesto = {
        id: 'bjp-2024',
        party_name: 'BJP',
        election_year: 2024,
        election_type: 'lok_sabha',
        alliance_name: 'NDA',
        region_name: null,
        region_code: null,
        region_kind: 'national',
        language: 'English',
        document_url: 'https://example.com/bjp.pdf',
        published_date: '2024-04-14',
        is_winner: true
      };

      (api.fetchManifestoById as jest.Mock).mockResolvedValue({
        data: mockManifesto,
        error: undefined
      });

      const result = await getManifestoById('bjp-2024');

      expect(result).toBeDefined();
      expect(result?.id).toBe('bjp-2024');
      expect(result?.party_name).toBe('BJP');
      expect(api.fetchManifestoById).toHaveBeenCalledWith('bjp-2024');
    });

    it('should return null for non-existent ID', async () => {
      (api.fetchManifestoById as jest.Mock).mockResolvedValue({
        data: null,
        error: 'Not found'
      });

      const result = await getManifestoById('non-existent');

      expect(result).toBeNull();
    });

    it('should return null on API error', async () => {
      (api.fetchManifestoById as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await getManifestoById('test-id');

      expect(result).toBeNull();
    });
  });

  describe('clearManifestoCache', () => {
    it('should clear cache and force new API call', async () => {
      const mockManifestos = [
        {
          id: 'bjp-2024',
          party_name: 'BJP',
          election_year: 2024,
          election_type: 'lok_sabha',
          alliance_name: 'NDA',
          region_name: null,
          region_code: null,
          region_kind: 'national',
          language: 'English',
          document_url: 'https://example.com/bjp.pdf',
          published_date: '2024-04-14',
          is_winner: true
        }
      ];

      (api.fetchManifestos as jest.Mock).mockResolvedValue({
        data: mockManifestos,
        error: undefined
      });

      // First call (caches result)
      await getManifestos();
      
      // Clear cache
      clearManifestoCache();
      
      // Second call (should hit API again)
      await getManifestos();

      expect(api.fetchManifestos).toHaveBeenCalledTimes(2);
    });
  });
});
