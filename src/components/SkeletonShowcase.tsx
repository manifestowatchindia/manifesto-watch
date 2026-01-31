import React, { useState, useEffect } from 'react';
import { Skeleton, SkeletonText, SkeletonCard, SkeletonList } from './ui';

export const SkeletonShowcase: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [simulateLoading, setSimulateLoading] = useState(false);

  useEffect(() => {
    if (simulateLoading) {
      setShowContent(false);
      const timer = setTimeout(() => {
        setShowContent(true);
        setSimulateLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [simulateLoading]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Skeleton Loading Components</h1>

      {/* Base Skeleton Component */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Base Skeleton</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Text Variant (default)</p>
            <Skeleton />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Rectangular Variant</p>
            <Skeleton variant="rectangular" height={100} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Circular Variant</p>
            <Skeleton variant="circular" width={60} height={60} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Custom Width</p>
            <Skeleton width="60%" />
          </div>
        </div>
      </section>

      {/* Animation Types */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Animation Types</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Wave Animation (default)</p>
            <Skeleton animation="wave" height={40} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Pulse Animation</p>
            <Skeleton animation="pulse" height={40} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">No Animation</p>
            <Skeleton animation="none" height={40} />
          </div>
        </div>
      </section>

      {/* SkeletonText Component */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">SkeletonText</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">3 Lines (default)</p>
            <SkeletonText />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Title (1 line, 60% width)</p>
            <SkeletonText lines={1} width="60%" lastLineWidth="60%" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Paragraph (5 lines)</p>
            <SkeletonText lines={5} lastLineWidth="65%" />
          </div>
        </div>
      </section>

      {/* SkeletonCard Component */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">SkeletonCard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Default Card</p>
            <SkeletonCard />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">With Avatar</p>
            <SkeletonCard hasAvatar />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">No Image</p>
            <SkeletonCard hasImage={false} titleLines={2} bodyLines={3} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Custom Configuration</p>
            <SkeletonCard imageHeight={120} titleLines={2} bodyLines={2} />
          </div>
        </div>
      </section>

      {/* SkeletonList Component */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">SkeletonList</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Default List (5 items)</p>
            <SkeletonList />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">With Avatars</p>
            <SkeletonList items={3} hasAvatar />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">With Icons</p>
            <SkeletonList items={3} hasIcon />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Minimal (2 items)</p>
            <SkeletonList items={2} />
          </div>
        </div>
      </section>

      {/* Interactive Loading Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Loading Demo</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <button
            onClick={() => setSimulateLoading(true)}
            disabled={simulateLoading}
            className="mb-6 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {simulateLoading ? 'Loading...' : 'Simulate Loading'}
          </button>

          {!showContent ? (
            <div className="space-y-4">
              <SkeletonCard />
            </div>
          ) : (
            <div className="bg-white rounded-card shadow-sm border border-gray-200 overflow-hidden">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Sample"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Content Loaded Successfully
                </h3>
                <p className="text-gray-600 mb-4">
                  This is the actual content that appears after loading completes.
                  The skeleton provides visual feedback during the loading state.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-brand-primary text-white rounded-lg">
                    Action
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Real-world Use Cases */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Real-world Use Cases</h2>
        
        {/* Promise Card Loading */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Promise Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SkeletonCard imageHeight={160} titleLines={2} bodyLines={2} />
            <SkeletonCard imageHeight={160} titleLines={2} bodyLines={2} />
            <SkeletonCard imageHeight={160} titleLines={2} bodyLines={2} />
          </div>
        </div>

        {/* News Feed Loading */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">News Feed</h3>
          <SkeletonList items={4} hasAvatar />
        </div>

        {/* User Comments Loading */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">User Comments</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="flex-1">
                    <Skeleton width="30%" className="mb-2" />
                    <SkeletonText lines={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accessibility Features</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span><strong>aria-busy:</strong> Indicates loading state to screen readers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span><strong>aria-live="polite":</strong> Announces content changes without interrupting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span><strong>Reduced motion support:</strong> Respects prefers-reduced-motion settings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span><strong>Semantic structure:</strong> Maintains proper layout hierarchy during loading</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Usage Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Usage Example</h2>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
          <pre className="text-sm">
{`import { 
  Skeleton, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonList 
} from './components/ui';

// Basic skeleton
<Skeleton variant="rectangular" height={100} />

// Text placeholder
<SkeletonText lines={3} />

// Card placeholder
<SkeletonCard hasImage imageHeight={200} />

// List placeholder
<SkeletonList items={5} hasAvatar />

// Custom configuration
<Skeleton 
  variant="circular" 
  width={60} 
  height={60}
  animation="pulse" 
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default SkeletonShowcase;
