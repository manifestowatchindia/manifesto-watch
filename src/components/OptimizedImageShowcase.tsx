import React, { useState } from 'react';
import { OptimizedImage } from './ui';

export const OptimizedImageShowcase: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const handleLoad = (id: string) => {
    setLoadedImages(prev => [...prev, id]);
  };

  const handleError = (id: string, error: Error) => {
    console.error(`Image ${id} failed:`, error.message);
    setFailedImages(prev => [...prev, id]);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div>
        <h1 className="text-display-sm font-bold text-gray-900 mb-2">OptimizedImage Component Showcase</h1>
        <p className="text-body text-gray-600">
          Lazy-loaded image component with WebP support, blur placeholders, and error handling
        </p>
      </div>

      {/* Priority Images (Above the Fold) */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">Priority Images (Eager Loading)</h2>
        <p className="text-body-sm text-gray-600">
          These images load immediately - use for above-the-fold content
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OptimizedImage
            src="/static/images/hero-banner.jpg"
            alt="Hero Banner"
            priority
            className="w-full h-64 rounded-lg"
            onLoadComplete={() => handleLoad('hero')}
          />
          
          <OptimizedImage
            src="/static/images/featured-card.jpg"
            alt="Featured Content"
            priority
            className="w-full h-64 rounded-lg"
          />
        </div>
      </section>

      {/* Lazy Loaded Images */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">Lazy Loaded Images</h2>
        <p className="text-body-sm text-gray-600">
          These images load only when scrolled into view (within 50px margin)
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <OptimizedImage
              key={num}
              src={`/static/images/thumbnail-${num}.jpg`}
              alt={`Thumbnail ${num}`}
              className="w-full h-32 rounded-lg"
              onLoadComplete={() => handleLoad(`thumb-${num}`)}
            />
          ))}
        </div>
      </section>

      {/* With Blur Placeholder */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">With Blur Placeholder</h2>
        <p className="text-body-sm text-gray-600">
          Low-resolution placeholder for smooth progressive loading
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OptimizedImage
            src="/static/images/large-image-1.jpg"
            alt="Large Image with Blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAA//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmg/9k="
            className="w-full h-96 rounded-lg"
            priority
          />
          
          <OptimizedImage
            src="/static/images/large-image-2.jpg"
            alt="Another Large Image"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmg/9k="
            className="w-full h-96 rounded-lg"
          />
        </div>
      </section>

      {/* Error Handling */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">Error Handling</h2>
        <p className="text-body-sm text-gray-600">
          Graceful fallback when images fail to load
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <OptimizedImage
            src="/non-existent-image-1.jpg"
            alt="Broken Image 1"
            className="w-full h-32 rounded-lg"
            onLoadError={(error) => handleError('broken-1', error)}
          />
          
          <OptimizedImage
            src="/non-existent-image-2.jpg"
            alt="Broken Image 2"
            className="w-full h-32 rounded-lg"
          />
          
          <OptimizedImage
            src="https://invalid-domain-xyz123.com/image.jpg"
            alt="Invalid URL"
            className="w-full h-32 rounded-lg"
          />
          
          <OptimizedImage
            src="/also-broken.png"
            alt="Another Broken Image"
            fallbackSrc="/static/images/default-placeholder.png"
            className="w-full h-32 rounded-lg"
          />
        </div>
      </section>

      {/* Real-world Use Cases */}
      <section className="space-y-6">
        <h2 className="text-heading-lg font-semibold text-gray-800">Real-world Use Cases</h2>
        
        {/* Promise Cards */}
        <div className="bg-white p-6 rounded-card shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-heading font-semibold text-gray-900">Promise Cards with Party Logos</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {['BJP', 'INC', 'AAP', 'CPM', 'TMC', 'DMK'].map((party) => (
              <div key={party} className="text-center">
                <OptimizedImage
                  src={`/static/images/logos/${party.toLowerCase()}.png`}
                  alt={`${party} Logo`}
                  className="w-16 h-16 mx-auto rounded-full"
                  priority
                />
                <p className="mt-2 text-body-sm font-medium">{party}</p>
              </div>
            ))}
          </div>
        </div>

        {/* News Articles */}
        <div className="bg-white p-6 rounded-card shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-heading font-semibold text-gray-900">News Article Thumbnails</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex gap-4">
                <OptimizedImage
                  src={`/static/images/news-${num}.jpg`}
                  alt={`News Article ${num}`}
                  className="w-24 h-24 rounded-lg flex-shrink-0"
                />
                <div>
                  <h4 className="text-body font-semibold line-clamp-2">
                    Breaking News: Important Update #{num}
                  </h4>
                  <p className="text-body-sm text-gray-600 mt-1 line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Election Map */}
        <div className="bg-white p-6 rounded-card shadow-sm border border-gray-200">
          <h3 className="text-heading font-semibold text-gray-900 mb-4">Interactive Map</h3>
          
          <OptimizedImage
            src="/static/images/india-election-map.png"
            alt="India Election Map"
            className="w-full h-auto rounded-lg"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmg/9k="
          />
        </div>
      </section>

      {/* Performance Stats */}
      <section className="bg-blue-50 p-6 rounded-lg space-y-3">
        <h2 className="text-heading-lg font-semibold text-gray-900">Performance Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-body text-gray-700">
          <li>✓ WebP format with JPEG/PNG fallback</li>
          <li>✓ Lazy loading with Intersection Observer</li>
          <li>✓ Priority loading for above-the-fold images</li>
          <li>✓ Blur placeholder for progressive loading</li>
          <li>✓ Shimmer effect during load</li>
          <li>✓ Smooth 500ms fade-in transition</li>
          <li>✓ Error fallback with user-friendly UI</li>
          <li>✓ Automatic retries with fallback images</li>
        </ul>
        
        <div className="mt-4 p-4 bg-white rounded-lg">
          <h3 className="font-semibold mb-2">Load Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-body-sm">
            <div>
              <span className="text-gray-600">Loaded:</span>
              <span className="ml-2 font-semibold text-green-600">{loadedImages.length}</span>
            </div>
            <div>
              <span className="text-gray-600">Failed:</span>
              <span className="ml-2 font-semibold text-red-600">{failedImages.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-heading-lg font-semibold text-gray-900 mb-3">Usage Example</h2>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-body-sm">
          <code>{`<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero Banner"
  priority
  blurDataURL="data:image/jpeg;base64,..."
  className="w-full h-96 rounded-lg"
  onLoadComplete={() => console.log('Loaded!')}
  onLoadError={(error) => console.error(error)}
/>`}</code>
        </pre>
      </section>
    </div>
  );
};

export default OptimizedImageShowcase;
