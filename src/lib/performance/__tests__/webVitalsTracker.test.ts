import { webVitalsTracker, VitalsReport } from '../webVitalsTracker';

// Mock web-vitals
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

describe('WebVitalsTracker', () => {
  beforeEach(() => {
    // Clear reports before each test
    webVitalsTracker.clearReports();
    
    // Clear mock calls
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('initializes tracking for all Core Web Vitals', () => {
      // Create new instance to test initialization
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      expect(getLCP).toHaveBeenCalled();
      expect(getFID).toHaveBeenCalled();
      expect(getCLS).toHaveBeenCalled();
      expect(getFCP).toHaveBeenCalled();
      expect(getTTFB).toHaveBeenCalled();
    });

    it('does not initialize twice', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      
      tracker.initialize();
      const firstCallCount = (getLCP as jest.Mock).mock.calls.length;
      
      tracker.initialize();
      const secondCallCount = (getLCP as jest.Mock).mock.calls.length;

      expect(secondCallCount).toBe(firstCallCount);
    });

    it('sets isTracking to true after initialization', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      
      expect(tracker.isTracking()).toBe(false);
      tracker.initialize();
      expect(tracker.isTracking()).toBe(true);
    });
  });

  describe('Rating Calculation', () => {
    it('calculates LCP rating correctly', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      // Get the callback passed to getLCP
      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];

      // Good LCP
      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      let report = tracker.getLatestReport('LCP');
      expect(report?.rating).toBe('good');

      // Needs improvement
      lcpCallback({
        name: 'LCP',
        value: 3500,
        id: 'lcp-2',
        delta: 3500,
        navigationType: 'navigate',
      });

      report = tracker.getLatestReport('LCP');
      expect(report?.rating).toBe('needs-improvement');

      // Poor
      lcpCallback({
        name: 'LCP',
        value: 5000,
        id: 'lcp-3',
        delta: 5000,
        navigationType: 'navigate',
      });

      report = tracker.getLatestReport('LCP');
      expect(report?.rating).toBe('poor');
    });

    it('calculates FID rating correctly', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const fidCallback = (getFID as jest.Mock).mock.calls[0][0];

      // Good FID
      fidCallback({
        name: 'FID',
        value: 50,
        id: 'fid-1',
        delta: 50,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('FID')?.rating).toBe('good');

      // Needs improvement
      fidCallback({
        name: 'FID',
        value: 200,
        id: 'fid-2',
        delta: 200,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('FID')?.rating).toBe('needs-improvement');

      // Poor
      fidCallback({
        name: 'FID',
        value: 400,
        id: 'fid-3',
        delta: 400,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('FID')?.rating).toBe('poor');
    });

    it('calculates CLS rating correctly', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const clsCallback = (getCLS as jest.Mock).mock.calls[0][0];

      // Good CLS
      clsCallback({
        name: 'CLS',
        value: 0.05,
        id: 'cls-1',
        delta: 0.05,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('CLS')?.rating).toBe('good');

      // Needs improvement
      clsCallback({
        name: 'CLS',
        value: 0.15,
        id: 'cls-2',
        delta: 0.15,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('CLS')?.rating).toBe('needs-improvement');

      // Poor
      clsCallback({
        name: 'CLS',
        value: 0.30,
        id: 'cls-3',
        delta: 0.30,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('CLS')?.rating).toBe('poor');
    });

    it('calculates FCP rating correctly', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const fcpCallback = (getFCP as jest.Mock).mock.calls[0][0];

      // Good
      fcpCallback({
        name: 'FCP',
        value: 1500,
        id: 'fcp-1',
        delta: 1500,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('FCP')?.rating).toBe('good');

      // Needs improvement
      fcpCallback({
        name: 'FCP',
        value: 2500,
        id: 'fcp-2',
        delta: 2500,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('FCP')?.rating).toBe('needs-improvement');

      // Poor
      fcpCallback({
        name: 'FCP',
        value: 3500,
        id: 'fcp-3',
        delta: 3500,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('FCP')?.rating).toBe('poor');
    });

    it('calculates TTFB rating correctly', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const ttfbCallback = (getTTFB as jest.Mock).mock.calls[0][0];

      // Good
      ttfbCallback({
        name: 'TTFB',
        value: 500,
        id: 'ttfb-1',
        delta: 500,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('TTFB')?.rating).toBe('good');

      // Needs improvement
      ttfbCallback({
        name: 'TTFB',
        value: 1200,
        id: 'ttfb-2',
        delta: 1200,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('TTFB')?.rating).toBe('needs-improvement');

      // Poor
      ttfbCallback({
        name: 'TTFB',
        value: 2000,
        id: 'ttfb-3',
        delta: 2000,
        navigationType: 'navigate',
      });

      expect(tracker.getLatestReport('TTFB')?.rating).toBe('poor');
    });
  });

  describe('Report Storage', () => {
    it('stores reports correctly', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];

      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      const reports = tracker.getReports();
      expect(reports).toHaveLength(1);
      expect(reports[0].name).toBe('LCP');
      expect(reports[0].value).toBe(2000);
    });

    it('stores multiple reports', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];
      const fidCallback = (getFID as jest.Mock).mock.calls[0][0];

      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      fidCallback({
        name: 'FID',
        value: 50,
        id: 'fid-1',
        delta: 50,
        navigationType: 'navigate',
      });

      const reports = tracker.getReports();
      expect(reports).toHaveLength(2);
    });

    it('clears reports', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];

      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      expect(tracker.getReports()).toHaveLength(1);

      tracker.clearReports();
      expect(tracker.getReports()).toHaveLength(0);
    });
  });

  describe('getLatestReport', () => {
    it('returns latest report for a metric', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];

      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      lcpCallback({
        name: 'LCP',
        value: 2500,
        id: 'lcp-2',
        delta: 2500,
        navigationType: 'navigate',
      });

      const latest = tracker.getLatestReport('LCP');
      expect(latest?.value).toBe(2500);
      expect(latest?.id).toBe('lcp-2');
    });

    it('returns null for non-existent metric', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const latest = tracker.getLatestReport('LCP');
      expect(latest).toBeNull();
    });
  });

  describe('getSummary', () => {
    it('calculates averages correctly', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];

      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      lcpCallback({
        name: 'LCP',
        value: 3000,
        id: 'lcp-2',
        delta: 3000,
        navigationType: 'navigate',
      });

      const summary = tracker.getSummary();
      expect(summary.averages.LCP).toBe(2500);
    });

    it('calculates rating distribution correctly', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];

      // Good
      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      // Needs improvement
      lcpCallback({
        name: 'LCP',
        value: 3500,
        id: 'lcp-2',
        delta: 3500,
        navigationType: 'navigate',
      });

      // Poor
      lcpCallback({
        name: 'LCP',
        value: 5000,
        id: 'lcp-3',
        delta: 5000,
        navigationType: 'navigate',
      });

      const summary = tracker.getSummary();
      expect(summary.ratings.good).toBe(1);
      expect(summary.ratings.needsImprovement).toBe(1);
      expect(summary.ratings.poor).toBe(1);
    });

    it('returns empty summary when no reports', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      
      const summary = tracker.getSummary();
      expect(summary.reports).toHaveLength(0);
      expect(Object.keys(summary.averages)).toHaveLength(0);
      expect(summary.ratings.good).toBe(0);
    });
  });

  describe('Listeners', () => {
    it('calls listeners when metric is reported', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const listener = jest.fn();
      tracker.addListener(listener);

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];

      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'LCP',
          value: 2000,
        })
      );
    });

    it('allows multiple listeners', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const listener1 = jest.fn();
      const listener2 = jest.fn();
      
      tracker.addListener(listener1);
      tracker.addListener(listener2);

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];

      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });

    it('unsubscribes listeners correctly', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const listener = jest.fn();
      const unsubscribe = tracker.addListener(listener);

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];

      // First call
      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      expect(listener).toHaveBeenCalledTimes(1);

      // Unsubscribe
      unsubscribe();

      // Second call
      lcpCallback({
        name: 'LCP',
        value: 2500,
        id: 'lcp-2',
        delta: 2500,
        navigationType: 'navigate',
      });

      // Still only called once
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('Report Structure', () => {
    it('includes all required fields', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];

      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      const report = tracker.getLatestReport('LCP');

      expect(report).toHaveProperty('name');
      expect(report).toHaveProperty('value');
      expect(report).toHaveProperty('rating');
      expect(report).toHaveProperty('timestamp');
      expect(report).toHaveProperty('id');
      expect(report).toHaveProperty('delta');
      expect(report).toHaveProperty('navigationType');
    });

    it('timestamp is current time', () => {
      const tracker = new (webVitalsTracker.constructor as any)();
      tracker.initialize();

      const lcpCallback = (getLCP as jest.Mock).mock.calls[0][0];
      const before = Date.now();

      lcpCallback({
        name: 'LCP',
        value: 2000,
        id: 'lcp-1',
        delta: 2000,
        navigationType: 'navigate',
      });

      const after = Date.now();
      const report = tracker.getLatestReport('LCP');

      expect(report?.timestamp).toBeGreaterThanOrEqual(before);
      expect(report?.timestamp).toBeLessThanOrEqual(after);
    });
  });
});
