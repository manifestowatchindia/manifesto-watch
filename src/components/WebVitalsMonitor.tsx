import React, { useEffect, useState } from 'react';
import { webVitalsTracker, VitalsReport, VitalsSummary } from '../lib/performance';

export const WebVitalsMonitor: React.FC = () => {
  const [reports, setReports] = useState<VitalsReport[]>([]);
  const [summary, setSummary] = useState<VitalsSummary | null>(null);

  useEffect(() => {
    // Subscribe to new reports
    const unsubscribe = webVitalsTracker.addListener((report: VitalsReport) => {
      setReports((prev) => [...prev, report]);
      setSummary(webVitalsTracker.getSummary());
    });

    // Get initial data
    setReports(webVitalsTracker.getReports());
    setSummary(webVitalsTracker.getSummary());

    return () => {
      unsubscribe();
    };
  }, []);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-600 bg-green-50';
      case 'needs-improvement':
        return 'text-orange-600 bg-orange-50';
      case 'poor':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
  };

  const getMetricThreshold = (name: string) => {
    const thresholds: { [key: string]: { good: number; poor: number } } = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 },
    };
    return thresholds[name];
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-md z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Web Vitals Monitor</h3>
        <span className="text-xs text-gray-500">DEV ONLY</span>
      </div>

      {reports.length === 0 ? (
        <p className="text-sm text-gray-500">Waiting for metrics...</p>
      ) : (
        <>
          {/* Latest Reports */}
          <div className="space-y-2 mb-4">
            {['LCP', 'FID', 'CLS', 'FCP', 'TTFB'].map((metricName) => {
              const report = webVitalsTracker.getLatestReport(metricName);
              if (!report) return null;

              const threshold = getMetricThreshold(metricName);

              return (
                <div key={metricName} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">{metricName}</span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${getRatingColor(
                        report.rating
                      )}`}
                    >
                      {report.rating.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatValue(metricName, report.value)}
                  </div>
                  {threshold && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Good: ≤{formatValue(metricName, threshold.good)}</span>
                        <span>Poor: &gt;{formatValue(metricName, threshold.poor)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            report.rating === 'good'
                              ? 'bg-green-500'
                              : report.rating === 'needs-improvement'
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                          }`}
                          style={{
                            width: `${Math.min(
                              (report.value / (threshold.poor * 1.2)) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          {summary && summary.reports.length > 0 && (
            <div className="border-t border-gray-200 pt-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Summary</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-green-50 rounded p-2">
                  <div className="text-lg font-bold text-green-600">
                    {summary.ratings.good}
                  </div>
                  <div className="text-xs text-gray-600">Good</div>
                </div>
                <div className="bg-orange-50 rounded p-2">
                  <div className="text-lg font-bold text-orange-600">
                    {summary.ratings.needsImprovement}
                  </div>
                  <div className="text-xs text-gray-600">Needs Work</div>
                </div>
                <div className="bg-red-50 rounded p-2">
                  <div className="text-lg font-bold text-red-600">
                    {summary.ratings.poor}
                  </div>
                  <div className="text-xs text-gray-600">Poor</div>
                </div>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-3 text-xs text-gray-500">
            <p>
              ✓ Tracking Core Web Vitals automatically
              <br />
              📊 Data sent to analytics in production
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default WebVitalsMonitor;
