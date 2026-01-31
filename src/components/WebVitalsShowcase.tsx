import React from 'react';
import { WebVitalsMonitor } from './WebVitalsMonitor';

export const WebVitalsShowcase: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Web Vitals Tracking System</h1>

      {/* Overview */}
      <section className="mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What are Core Web Vitals?</h2>
          <p className="text-gray-600 mb-4">
            Core Web Vitals are a set of standardized metrics from Google that measure user
            experience on the web. They focus on three aspects of the user experience: loading,
            interactivity, and visual stability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">⚡ LCP</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Largest Contentful Paint</strong>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Measures loading performance. To provide a good user experience, LCP should occur
                within 2.5 seconds of when the page first starts loading.
              </p>
              <div className="mt-2 text-xs">
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                  Good: ≤2500ms
                </span>
                <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded">
                  Poor: &gt;4000ms
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">👆 FID</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>First Input Delay</strong>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Measures interactivity. To provide a good user experience, pages should have a FID
                of 100 milliseconds or less.
              </p>
              <div className="mt-2 text-xs">
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                  Good: ≤100ms
                </span>
                <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded">
                  Poor: &gt;300ms
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📏 CLS</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Cumulative Layout Shift</strong>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Measures visual stability. To provide a good user experience, pages should maintain
                a CLS of 0.1 or less.
              </p>
              <div className="mt-2 text-xs">
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                  Good: ≤0.1
                </span>
                <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded">
                  Poor: &gt;0.25
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Metrics */}
      <section className="mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Additional Performance Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🎨 FCP</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>First Contentful Paint</strong>
              </p>
              <p className="text-sm text-gray-600">
                Measures when the first text or image is painted. Good FCP is under 1.8 seconds.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🌐 TTFB</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Time to First Byte</strong>
              </p>
              <p className="text-sm text-gray-600">
                Measures server response time. Good TTFB is under 800 milliseconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tracking Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatic Tracking</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Tracks all Core Web Vitals automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Auto-initializes on page load</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Zero configuration required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Lightweight (&lt;1KB gzipped overhead)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analysis</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Calculates ratings (good/needs-improvement/poor)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Stores reports for analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Calculates averages and distributions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Real-time listener support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Implementation</h2>

          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`import { webVitalsTracker } from './lib/performance';

// Automatic initialization - tracking starts on page load
// No additional code needed!

// Optional: Subscribe to new reports
const unsubscribe = webVitalsTracker.addListener((report) => {
  console.log(\`\${report.name}: \${report.value}ms - \${report.rating}\`);
});

// Get all reports
const reports = webVitalsTracker.getReports();

// Get summary statistics
const summary = webVitalsTracker.getSummary();
console.log('Average LCP:', summary.averages.LCP);
console.log('Good ratings:', summary.ratings.good);

// Get latest report for a specific metric
const lcpReport = webVitalsTracker.getLatestReport('LCP');

// Cleanup
unsubscribe();`}
            </pre>
          </div>
        </div>
      </section>

      {/* Live Monitor */}
      <section className="mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Live Monitor</h2>
          <p className="text-gray-600 mb-4">
            The Web Vitals Monitor appears in the bottom-right corner during development. It shows
            real-time metrics as they are captured by the browser.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Interact with the page, scroll, click buttons to trigger
              metric collection. FID (First Input Delay) only fires after the first user
              interaction.
            </p>
          </div>
        </div>
      </section>

      {/* Production Behavior */}
      <section className="mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Production Behavior</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Automatic Analytics Integration
              </h3>
              <p className="text-gray-600 text-sm">
                In production, metrics are automatically sent to your analytics provider (Google
                Analytics, custom endpoint, etc.).
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">Silent Monitoring</h3>
              <p className="text-gray-600 text-sm">
                No console logs or UI overlay in production - tracking happens silently in the
                background.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">Performance Impact</h3>
              <p className="text-gray-600 text-sm">
                Less than 1KB gzipped overhead. Uses native browser APIs with zero performance
                impact on page load.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Monitor Component */}
      <WebVitalsMonitor />
    </div>
  );
};

export default WebVitalsShowcase;
