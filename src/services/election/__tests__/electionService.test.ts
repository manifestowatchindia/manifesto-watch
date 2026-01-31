/**
 * Election Service Tests
 * Comprehensive test suite for ElectionService
 */

import { electionService } from '../electionService';
import { Election, CountdownData } from '../../../lib/types';
import { cacheManager } from '../../api/cache-manager';

// Mock fetch globally
global.fetch = jest.fn();

// Mock cacheManager
jest.mock('../../api/cache-manager', () => ({
  cacheManager: {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    clear: jest.fn(),
  },
}));

describe('ElectionService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('getActiveElections', () => {
    const mockElections: Election[] = [
      {
        id: 'election-1',
        state: 'Karnataka',
        date: '2026-04-15T00:00:00Z',
        constituencies: 224,
        voters: 50000000,
        parties: ['BJP', 'INC', 'JDS'],
        manifestosReleased: 3,
        promisesTracked: 150,
        electionType: 'state_assembly',
        regionCode: 'KA',
      },
      {
        id: 'election-2',
        state: 'Kerala',
        date: '2026-03-01T00:00:00Z',
        constituencies: 140,
        voters: 25000000,
        parties: ['CPM', 'INC', 'BJP'],
        manifestosReleased: 3,
        promisesTracked: 120,
        electionType: 'state_assembly',
        regionCode: 'KL',
      },
    ];

    it('should fetch active elections from API', async () => {
      // Mock cache miss
      (cacheManager.get as jest.Mock).mockReturnValue(null);

      // Mock successful API response
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: mockElections,
        }),
      });

      const result = await electionService.getActiveElections();

      // Check that both elections are returned and sorted (Kerala before Karnataka)
      expect(result).toHaveLength(2);
      expect(result[0].state).toBe('Kerala');
      expect(result[1].state).toBe('Karnataka');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(cacheManager.set).toHaveBeenCalledTimes(1);
    });

    it('should return cached elections if available', async () => {
      // Mock cache hit
      (cacheManager.get as jest.Mock).mockReturnValue(mockElections);

      const result = await electionService.getActiveElections();

      expect(result).toEqual(mockElections);
      expect(global.fetch).not.toHaveBeenCalled();
      expect(cacheManager.get).toHaveBeenCalledTimes(1);
    });

    it('should sort elections by date (closest first)', async () => {
      const unsortedElections = [...mockElections];
      
      // Mock cache miss
      (cacheManager.get as jest.Mock).mockReturnValue(null);

      // Mock API response with unsorted elections
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: unsortedElections,
        }),
      });

      const result = await electionService.getActiveElections();

      // Kerala (March 1) should come before Karnataka (April 15)
      expect(result[0].state).toBe('Kerala');
      expect(result[1].state).toBe('Karnataka');
    });

    it('should include user_state parameter when provided', async () => {
      (cacheManager.get as jest.Mock).mockReturnValue(null);

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: mockElections,
        }),
      });

      await electionService.getActiveElections(180, 'Kerala');

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchCall).toContain('user_state=Kerala');
    });

    it('should include days_threshold parameter', async () => {
      (cacheManager.get as jest.Mock).mockReturnValue(null);

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: mockElections,
        }),
      });

      await electionService.getActiveElections(90);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchCall).toContain('days_threshold=90');
    });

    it('should return empty array on API error', async () => {
      (cacheManager.get as jest.Mock).mockReturnValue(null);

      // Mock API error
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      // Spy on console.error
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await electionService.getActiveElections();

      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();
      
      // Restore console.error
      consoleErrorSpy.mockRestore();
    });

    it('should return empty array on API failure response', async () => {
      (cacheManager.get as jest.Mock).mockReturnValue(null);

      // Mock failed API response
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const result = await electionService.getActiveElections();

      expect(result).toEqual([]);
    });

    it('should handle API timeout', async () => {
      (cacheManager.get as jest.Mock).mockReturnValue(null);

      // Mock timeout error
      (global.fetch as jest.Mock).mockRejectedValue(new DOMException('Timeout', 'TimeoutError'));

      const result = await electionService.getActiveElections();

      expect(result).toEqual([]);
    });
  });

  describe('getElectionById', () => {
    const mockElection: Election = {
      id: 'election-1',
      state: 'Karnataka',
      date: '2026-04-15T00:00:00Z',
      constituencies: 224,
      voters: 50000000,
      parties: ['BJP', 'INC', 'JDS'],
      manifestosReleased: 3,
      promisesTracked: 150,
      electionType: 'state_assembly',
      regionCode: 'KA',
    };

    it('should fetch election by ID from API', async () => {
      (cacheManager.get as jest.Mock).mockReturnValue(null);

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: mockElection,
        }),
      });

      const result = await electionService.getElectionById('election-1');

      expect(result).toEqual(mockElection);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(cacheManager.set).toHaveBeenCalledTimes(1);
    });

    it('should return cached election if available', async () => {
      (cacheManager.get as jest.Mock).mockReturnValue(mockElection);

      const result = await electionService.getElectionById('election-1');

      expect(result).toEqual(mockElection);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should return null if election not found (404)', async () => {
      (cacheManager.get as jest.Mock).mockReturnValue(null);

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const result = await electionService.getElectionById('nonexistent');

      expect(result).toBeNull();
    });

    it('should return null on API error', async () => {
      (cacheManager.get as jest.Mock).mockReturnValue(null);

      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await electionService.getElectionById('election-1');

      expect(result).toBeNull();
    });
  });

  describe('calculateCountdown', () => {
    beforeAll(() => {
      // Mock current date to 2026-02-01T00:00:00Z for consistent testing
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-02-01T00:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should calculate countdown correctly', () => {
      // 30 days from Feb 1 = March 3
      const futureDate = '2026-03-03T00:00:00Z';
      const countdown = electionService.calculateCountdown(futureDate);

      expect(countdown.days).toBe(30);
      expect(countdown.hours).toBe(0);
      expect(countdown.minutes).toBe(0);
      expect(countdown.seconds).toBe(0);
      expect(countdown.totalMilliseconds).toBeGreaterThan(0);
    });

    it('should calculate hours, minutes, seconds correctly', () => {
      // 1 day, 2 hours, 30 minutes, 45 seconds from now
      const now = new Date('2026-02-01T00:00:00Z').getTime();
      const future = now + (1 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000) + (30 * 60 * 1000) + (45 * 1000);
      const futureDate = new Date(future).toISOString();

      const countdown = electionService.calculateCountdown(futureDate);

      expect(countdown.days).toBe(1);
      expect(countdown.hours).toBe(2);
      expect(countdown.minutes).toBe(30);
      expect(countdown.seconds).toBe(45);
    });

    it('should return zeros for past dates', () => {
      const pastDate = '2025-01-01T00:00:00Z';
      const countdown = electionService.calculateCountdown(pastDate);

      expect(countdown.days).toBe(0);
      expect(countdown.hours).toBe(0);
      expect(countdown.minutes).toBe(0);
      expect(countdown.seconds).toBe(0);
      expect(countdown.totalMilliseconds).toBe(0);
    });

    it('should handle invalid date strings gracefully', () => {
      const countdown = electionService.calculateCountdown('invalid-date');

      expect(countdown.days).toBe(0);
      expect(countdown.hours).toBe(0);
      expect(countdown.minutes).toBe(0);
      expect(countdown.seconds).toBe(0);
    });
  });

  describe('getUserState', () => {
    it('should return null if geolocation not supported', async () => {
      // Mock navigator.geolocation as undefined
      const originalGeolocation = navigator.geolocation;
      Object.defineProperty(navigator, 'geolocation', {
        value: undefined,
        configurable: true,
      });

      const state = await electionService.getUserState();

      expect(state).toBeNull();

      // Restore
      Object.defineProperty(navigator, 'geolocation', {
        value: originalGeolocation,
        configurable: true,
      });
    });

    it('should return null if user denies geolocation', async () => {
      // Mock geolocation with rejection
      const mockGeolocation = {
        getCurrentPosition: jest.fn((success, error) => {
          error(new GeolocationPositionError());
        }),
      };

      Object.defineProperty(navigator, 'geolocation', {
        value: mockGeolocation,
        configurable: true,
      });

      const state = await electionService.getUserState();

      expect(state).toBeNull();
    });

    it('should log coordinates when geolocation succeeds', async () => {
      const mockPosition: GeolocationPosition = {
        coords: {
          latitude: 12.9716,
          longitude: 77.5946,
          accuracy: 100,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      };

      const mockGeolocation = {
        getCurrentPosition: jest.fn((success) => {
          success(mockPosition);
        }),
      };

      Object.defineProperty(navigator, 'geolocation', {
        value: mockGeolocation,
        configurable: true,
      });

      const consoleSpy = jest.spyOn(console, 'log');

      const state = await electionService.getUserState();

      // Should log coordinates but return null (reverse geocoding not implemented)
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('User location')
      );
      expect(state).toBeNull();
    });
  });

  describe('isUrgent', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-02-01T00:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return true for elections within threshold', () => {
      // 20 days from now
      const date = '2026-02-21T00:00:00Z';
      const urgent = electionService.isUrgent(date, 30);

      expect(urgent).toBe(true);
    });

    it('should return false for elections beyond threshold', () => {
      // 60 days from now
      const date = '2026-04-02T00:00:00Z';
      const urgent = electionService.isUrgent(date, 30);

      expect(urgent).toBe(false);
    });

    it('should return false for past elections', () => {
      const date = '2025-01-01T00:00:00Z';
      const urgent = electionService.isUrgent(date, 30);

      expect(urgent).toBe(false);
    });
  });

  describe('getUrgencyLevel', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-02-01T00:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return "high" for elections < 30 days', () => {
      const date = '2026-02-20T00:00:00Z'; // 19 days
      const level = electionService.getUrgencyLevel(date);

      expect(level).toBe('high');
    });

    it('should return "medium" for elections 30-90 days', () => {
      const date = '2026-03-15T00:00:00Z'; // ~42 days
      const level = electionService.getUrgencyLevel(date);

      expect(level).toBe('medium');
    });

    it('should return "low" for elections > 90 days', () => {
      const date = '2026-06-01T00:00:00Z'; // ~120 days
      const level = electionService.getUrgencyLevel(date);

      expect(level).toBe('low');
    });

    it('should return "past" for past elections', () => {
      const date = '2025-01-01T00:00:00Z';
      const level = electionService.getUrgencyLevel(date);

      expect(level).toBe('past');
    });
  });

  describe('formatCountdown', () => {
    it('should format days correctly', () => {
      const countdown: CountdownData = {
        days: 45,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 3888000000,
      };

      const formatted = electionService.formatCountdown(countdown);

      expect(formatted).toBe('45 days');
    });

    it('should format days and hours', () => {
      const countdown: CountdownData = {
        days: 5,
        hours: 3,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 442800000,
      };

      const formatted = electionService.formatCountdown(countdown);

      expect(formatted).toBe('5 days, 3 hours');
    });

    it('should format hours and minutes when days = 0', () => {
      const countdown: CountdownData = {
        days: 0,
        hours: 12,
        minutes: 30,
        seconds: 0,
        totalMilliseconds: 45000000,
      };

      const formatted = electionService.formatCountdown(countdown);

      expect(formatted).toBe('12 hours, 30 minutes');
    });

    it('should format minutes and seconds when hours = 0', () => {
      const countdown: CountdownData = {
        days: 0,
        hours: 0,
        minutes: 15,
        seconds: 45,
        totalMilliseconds: 945000,
      };

      const formatted = electionService.formatCountdown(countdown);

      expect(formatted).toBe('15 minutes, 45 seconds');
    });

    it('should handle singular units correctly', () => {
      const countdown: CountdownData = {
        days: 1,
        hours: 1,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 90000000,
      };

      const formatted = electionService.formatCountdown(countdown);

      expect(formatted).toBe('1 day, 1 hour');
    });

    it('should return "Election has passed" for past dates', () => {
      const countdown: CountdownData = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 0,
      };

      const formatted = electionService.formatCountdown(countdown);

      expect(formatted).toBe('Election has passed');
    });
  });

  describe('clearCache', () => {
    it('should log cache clearing', () => {
      const consoleSpy = jest.spyOn(console, 'log');

      electionService.clearCache();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Cache clearing not fully implemented')
      );
    });
  });
});
