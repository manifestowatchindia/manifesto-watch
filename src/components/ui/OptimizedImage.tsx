import React, { useState, useEffect, useRef } from 'react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  blurDataURL?: string;
  fallbackSrc?: string;
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  blurDataURL,
  fallbackSrc = '/static/images/placeholder.png',
  onLoadComplete,
  onLoadError,
  className = '',
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Load image when in view
  useEffect(() => {
    if (!isInView || currentSrc === src) return;

    setCurrentSrc(src);
  }, [isInView, src, currentSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadComplete?.();
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    setCurrentSrc(fallbackSrc);
    
    const error = new Error(`Failed to load image: ${src}`);
    onLoadError?.(error);
    
    // Try fallback
    if (currentSrc !== fallbackSrc) {
      const img = e.currentTarget;
      img.src = fallbackSrc;
    }
  };

  // Generate WebP source URL
  const getWebPSrc = (originalSrc: string): string => {
    if (!originalSrc || originalSrc.startsWith('data:')) return originalSrc;
    
    const extension = originalSrc.split('.').pop()?.toLowerCase();
    if (extension === 'webp') return originalSrc;
    
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  // Base container styles
  const containerClasses = `relative overflow-hidden ${className}`.trim();

  // Image styles
  const imageClasses = `w-full h-full object-cover transition-opacity duration-500 ${
    isLoaded ? 'opacity-100' : 'opacity-0'
  }`.trim();

  // Blur placeholder styles
  const blurPlaceholderClasses = `absolute inset-0 w-full h-full object-cover scale-110 blur-2xl transition-opacity duration-500 ${
    isLoaded ? 'opacity-0' : 'opacity-100'
  }`.trim();

  // Shimmer effect
  const shimmerClasses = `absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer transition-opacity duration-500 ${
    isLoaded ? 'opacity-0' : 'opacity-100'
  }`.trim();

  return (
    <div ref={imgRef} className={containerClasses} data-testid="optimized-image-container">
      {/* Shimmer loading effect */}
      {!hasError && (
        <div className={shimmerClasses} data-testid="shimmer" aria-hidden="true" />
      )}

      {/* Blur placeholder */}
      {blurDataURL && !hasError && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className={blurPlaceholderClasses}
          data-testid="blur-placeholder"
        />
      )}

      {/* Main image with WebP support */}
      {isInView && currentSrc && !hasError && (
        <picture>
          <source srcSet={getWebPSrc(currentSrc)} type="image/webp" />
          <img
            src={currentSrc}
            alt={alt}
            className={imageClasses}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            data-testid="optimized-image"
            {...rest}
          />
        </picture>
      )}

      {/* Error fallback */}
      {hasError && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500"
          data-testid="error-fallback"
          role="img"
          aria-label={`Failed to load: ${alt}`}
        >
          <svg
            className="w-12 h-12 mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-body-sm">Image not available</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
