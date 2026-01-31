/**
 * Election Service
 * Manages election data, countdown calculations, and geolocation detection
 */

import { Election, CountdownData } from '../../lib/types';
import { API_ENDPOINTS, buildApiUrl } from '../../lib/config';
import { cacheManager } from '../api/cache-manager';

/**
 * Election Service API Response
 */
interface ElectionApiResponse {
  success: boolean;
  data: Election[];
  error?: string;
}

interface SingleElectionApiResponse {
  success: boolean;
  data: Election;
  error?: string;
}

/**
 * Election Service
 * Provides methods to fetch and manage election data
 */
class ElectionService {
  private readonly CACHE_TTL = 60 * 60 * 1000; // 1 hour

  /**
   * Get active elections within a threshold
   * @param daysThreshold Number of days to look ahead (default: 180)
   * @param userState Optional state code to prioritize user's state
   * @returns Array of active elections sorted by date (closest first)
   */
  async getActiveElections(
    daysThreshold: number = 180,
    userState?: string
  ): Promise<Election[]> {
    try {
      // Build cache key
      const cacheKey = `elections-active-${daysThreshold}-${userState || 'all'}`;
      
      // Check cache first
      const cached = cacheManager.get<Election[]>(cacheKey);
      if (cached) {
        console.log('[Cache Hit] Active Elections');
        return cached;
      }

      // Build API URL with query params
      const params: Record<string, any> = {
        days_threshold: daysThreshold,
      };
      
      if (userState) {
        params.user_state = userState;
      }

      const url = buildApiUrl(API_ENDPOINTS.ELECTIONS_ACTIVE, params);

      // Fetch from API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result: ElectionApiResponse = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch elections');
      }

      // Sort elections by date (closest first)
      const sortedElections = this.sortElectionsByDate(result.data);

      // Cache the result
      cacheManager.set(cacheKey, sortedElections, this.CACHE_TTL);

      return sortedElections;
    } catch (error) {
      console.error('[ElectionService] Error fetching active elections:', error);
      
      // Return empty array on error (graceful degradation)
      return [];
    }
  }

  /**
   * Get election by ID
   * @param electionId Election ID
   * @returns Election data or null if not found
   */
  async getElectionById(electionId: string): Promise<Election | null> {
    try {
      // Build cache key
      const cacheKey = `election-${electionId}`;
      
      // Check cache first
      const cached = cacheManager.get<Election>(cacheKey);
      if (cached) {
        console.log(`[Cache Hit] Election ${electionId}`);
        return cached;
      }

      // Build API URL
      const url = buildApiUrl(API_ENDPOINTS.ELECTION_BY_ID(electionId));

      // Fetch from API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`[ElectionService] Election not found: ${electionId}`);
          return null;
        }
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result: SingleElectionApiResponse = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch election');
      }

      // Cache the result
      cacheManager.set(cacheKey, result.data, this.CACHE_TTL);

      return result.data;
    } catch (error) {
      console.error(`[ElectionService] Error fetching election ${electionId}:`, error);
      return null;
    }
  }

  /**
   * Calculate countdown to election date
   * @param electionDate ISO 8601 date string
   * @returns Countdown data (days, hours, minutes, seconds)
   */
  calculateCountdown(electionDate: string): CountdownData {
    try {
      const now = new Date().getTime();
      const target = new Date(electionDate).getTime();

      // Check for invalid date
      if (isNaN(target)) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalMilliseconds: 0,
        };
      }

      const totalMilliseconds = target - now;

      // If date is in the past, return zeros
      if (totalMilliseconds < 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalMilliseconds: 0,
        };
      }

      // Calculate time components
      const days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
      const hours = Math.floor((totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
        totalMilliseconds,
      };
    } catch (error) {
      console.error('[ElectionService] Error calculating countdown:', error);
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 0,
      };
    }
  }

  /**
   * Get user's state using geolocation (optional feature)
   * Uses browser Geolocation API and reverse geocoding
   * @returns State code (e.g., "KL" for Kerala) or null if unavailable
   */
  async getUserState(): Promise<string | null> {
    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        console.warn('[ElectionService] Geolocation not supported');
        return null;
      }

      // Get user's coordinates
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          maximumAge: 600000, // Cache for 10 minutes
        });
      });

      const { latitude, longitude } = position.coords;

      // In a production app, you would call a reverse geocoding API here
      // For now, we'll return null as this requires additional API integration
      console.log(`[ElectionService] User location: ${latitude}, ${longitude}`);
      console.warn('[ElectionService] Reverse geocoding not implemented');
      
      // TODO: Integrate with a reverse geocoding service
      // Example: Google Maps Geocoding API, OpenCage, or custom backend endpoint
      
      return null;
    } catch (error) {
      // Geolocation errors are expected (user denial, unavailable, timeout)
      console.warn('[ElectionService] Could not get user location:', error);
      return null;
    }
  }

  /**
   * Sort elections by date (closest first)
   * @param elections Array of elections
   * @returns Sorted array
   */
  private sortElectionsByDate(elections: Election[]): Election[] {
    return [...elections].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }

  /**
   * Check if election is within urgency threshold
   * @param electionDate ISO 8601 date string
   * @param days Urgency threshold in days
   * @returns true if election is within threshold
   */
  isUrgent(electionDate: string, days: number = 30): boolean {
    const countdown = this.calculateCountdown(electionDate);
    return countdown.days > 0 && countdown.days <= days;
  }

  /**
   * Get urgency level for UI styling
   * @param electionDate ISO 8601 date string
   * @returns 'high' (< 30 days), 'medium' (30-90 days), 'low' (> 90 days), or 'past'
   */
  getUrgencyLevel(electionDate: string): 'high' | 'medium' | 'low' | 'past' {
    const countdown = this.calculateCountdown(electionDate);
    
    if (countdown.totalMilliseconds <= 0) {
      return 'past';
    }
    
    if (countdown.days < 30) {
      return 'high';
    }
    
    if (countdown.days < 90) {
      return 'medium';
    }
    
    return 'low';
  }

  /**
   * Format countdown for display
   * @param countdown CountdownData object
   * @returns Formatted string (e.g., "45 days, 3 hours")
   */
  formatCountdown(countdown: CountdownData): string {
    if (countdown.totalMilliseconds <= 0) {
      return 'Election has passed';
    }

    const parts: string[] = [];

    if (countdown.days > 0) {
      parts.push(`${countdown.days} ${countdown.days === 1 ? 'day' : 'days'}`);
    }

    if (countdown.hours > 0 && countdown.days < 7) {
      parts.push(`${countdown.hours} ${countdown.hours === 1 ? 'hour' : 'hours'}`);
    }

    if (countdown.minutes > 0 && countdown.days === 0) {
      parts.push(`${countdown.minutes} ${countdown.minutes === 1 ? 'minute' : 'minutes'}`);
    }

    if (countdown.seconds > 0 && countdown.days === 0 && countdown.hours === 0) {
      parts.push(`${countdown.seconds} ${countdown.seconds === 1 ? 'second' : 'seconds'}`);
    }

    return parts.join(', ') || 'Less than a second';
  }

  /**
   * Clear all election-related cache
   */
  clearCache(): void {
    // Note: CacheManager doesn't have a method to clear by prefix yet
    // This would require enhancement to CacheManager
    console.log('[ElectionService] Cache clearing not fully implemented');
  }
}

// Export singleton instance
export const electionService = new ElectionService();
export default electionService;
