import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

interface Metric {
  name: string;
  value: number;
  id: string;
  delta: number;
  navigationType?: string;
}

export interface VitalsReport {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  id: string;
  delta: number;
  navigationType?: string;
}

export interface VitalsSummary {
  reports: VitalsReport[];
  averages: {
    [key: string]: number;
  };
  ratings: {
    good: number;
    needsImprovement: number;
    poor: number;
  };
}

/**
 * Rating thresholds based on Core Web Vitals recommendations
 * https://web.dev/vitals/
 */
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

/**
 * Calculate rating based on metric name and value
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  
  if (!threshold) {
    return 'good';
  }

  if (value <= threshold.good) {
    return 'good';
  } else if (value <= threshold.poor) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}

/**
 * Web Vitals Tracker Class
 * Tracks Core Web Vitals and provides analytics
 */
class WebVitalsTracker {
  private reports: VitalsReport[] = [];
  private listeners: ((report: VitalsReport) => void)[] = [];
  private isInitialized = false;

  /**
   * Initialize tracking for all Core Web Vitals
   */
  initialize(): void {
    if (this.isInitialized) {
      console.warn('[WebVitals] Already initialized');
      return;
    }

    this.isInitialized = true;

    // Track LCP (Largest Contentful Paint)
    getLCP(this.handleMetric);

    // Track FID (First Input Delay)
    getFID(this.handleMetric);

    // Track CLS (Cumulative Layout Shift)
    getCLS(this.handleMetric);

    // Track FCP (First Contentful Paint)
    getFCP(this.handleMetric);

    // Track TTFB (Time to First Byte)
    getTTFB(this.handleMetric);

    if (process.env.NODE_ENV === 'development') {
      console.log('[WebVitals] Tracking initialized');
    }
  }

  /**
   * Handle metric callback from web-vitals
   */
  private handleMetric = (metric: Metric): void => {
    const report: VitalsReport = {
      name: metric.name,
      value: metric.value,
      rating: getRating(metric.name, metric.value),
      timestamp: Date.now(),
      id: metric.id,
      delta: metric.delta,
      navigationType: metric.navigationType,
    };

    // Store report
    this.reports.push(report);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[WebVitals] ${report.name}:`, {
        value: this.formatValue(report.name, report.value),
        rating: report.rating,
        delta: report.delta,
      });
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(report);
    }

    // Notify listeners
    this.listeners.forEach(listener => listener(report));
  };

  /**
   * Format value for display based on metric type
   */
  private formatValue(name: string, value: number): string {
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
  }

  /**
   * Send metric to analytics service
   * Override this method to integrate with your analytics provider
   */
  private sendToAnalytics(report: VitalsReport): void {
    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', report.name, {
        event_category: 'Web Vitals',
        event_label: report.id,
        value: Math.round(report.value),
        metric_rating: report.rating,
        non_interaction: true,
      });
    }

    // Example: Send to custom analytics endpoint
    if (typeof window !== 'undefined' && (window as any).fetch) {
      fetch('/api/analytics/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
        keepalive: true,
      }).catch(err => {
        console.error('[WebVitals] Failed to send to analytics:', err);
      });
    }
  }

  /**
   * Add listener for metric reports
   */
  addListener(callback: (report: VitalsReport) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  /**
   * Get all stored reports
   */
  getReports(): VitalsReport[] {
    return [...this.reports];
  }

  /**
   * Get summary statistics
   */
  getSummary(): VitalsSummary {
    const averages: { [key: string]: number } = {};
    const counts: { [key: string]: number } = {};

    // Calculate averages
    this.reports.forEach(report => {
      if (!averages[report.name]) {
        averages[report.name] = 0;
        counts[report.name] = 0;
      }
      averages[report.name] += report.value;
      counts[report.name]++;
    });

    Object.keys(averages).forEach(key => {
      averages[key] = averages[key] / counts[key];
    });

    // Calculate rating distribution
    const ratings = {
      good: 0,
      needsImprovement: 0,
      poor: 0,
    };

    this.reports.forEach(report => {
      if (report.rating === 'good') {
        ratings.good++;
      } else if (report.rating === 'needs-improvement') {
        ratings.needsImprovement++;
      } else {
        ratings.poor++;
      }
    });

    return {
      reports: this.reports,
      averages,
      ratings,
    };
  }

  /**
   * Get latest report for a specific metric
   */
  getLatestReport(metricName: string): VitalsReport | null {
    const filtered = this.reports.filter(r => r.name === metricName);
    return filtered.length > 0 ? filtered[filtered.length - 1] : null;
  }

  /**
   * Clear all stored reports
   */
  clearReports(): void {
    this.reports = [];
  }

  /**
   * Check if tracker is initialized
   */
  isTracking(): boolean {
    return this.isInitialized;
  }
}

// Singleton instance
export const webVitalsTracker = new WebVitalsTracker();

// Export for convenience
export default webVitalsTracker;

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  // Wait for page load to ensure accurate measurements
  if (document.readyState === 'complete') {
    webVitalsTracker.initialize();
  } else {
    window.addEventListener('load', () => {
      webVitalsTracker.initialize();
    });
  }
}
