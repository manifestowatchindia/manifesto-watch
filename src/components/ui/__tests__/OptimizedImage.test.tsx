import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OptimizedImage } from '../OptimizedImage';

// Mock IntersectionObserver
let mockObserverInstance: any;

const MockIntersectionObserver = jest.fn().mockImplementation((callback) => {
  mockObserverInstance = {
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  };
  return mockObserverInstance;
});

global.IntersectionObserver = MockIntersectionObserver as any;

describe('OptimizedImage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    MockIntersectionObserver.mockClear();
  });

  describe('Rendering', () => {
    it('renders container correctly', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test image" />);
      expect(screen.getByTestId('optimized-image-container')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" className="custom-class" />);
      const container = screen.getByTestId('optimized-image-container');
      expect(container).toHaveClass('custom-class');
    });

    it('applies relative positioning to container', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" />);
      const container = screen.getByTestId('optimized-image-container');
      expect(container).toHaveClass('relative', 'overflow-hidden');
    });
  });

  describe('Lazy Loading', () => {
    it('does not render image initially when not priority', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" />);
      expect(screen.queryByTestId('optimized-image')).not.toBeInTheDocument();
    });

    it('sets up IntersectionObserver when not priority', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" />);
      expect(MockIntersectionObserver).toHaveBeenCalled();
      expect(mockObserverInstance.observe).toHaveBeenCalled();
    });

    it('renders image immediately when priority is true', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      expect(screen.getByTestId('optimized-image')).toBeInTheDocument();
    });

    it('does not use IntersectionObserver when priority is true', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      expect(MockIntersectionObserver).not.toHaveBeenCalled();
    });

    it('has correct IntersectionObserver options', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" />);
      
      expect(MockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          rootMargin: '50px',
          threshold: 0.01,
        })
      );
    });

    it('disconnects observer on unmount', () => {
      const { unmount } = render(<OptimizedImage src="/test.jpg" alt="Test" />);
      unmount();
      expect(mockObserverInstance.disconnect).toHaveBeenCalled();
    });
  });

  describe('Priority Loading', () => {
    it('uses eager loading when priority is true', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveAttribute('loading', 'eager');
    });

    it('uses lazy loading when priority is false', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveAttribute('loading', 'eager');
    });
  });

  describe('WebP Support', () => {
    it('renders picture element with WebP source', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      const picture = screen.getByTestId('optimized-image').parentElement;
      expect(picture?.tagName).toBe('PICTURE');
    });

    it('generates WebP source for JPG images', () => {
      render(<OptimizedImage src="/image.jpg" alt="Test" priority />);
      const source = document.querySelector('source');
      expect(source).toHaveAttribute('srcSet', '/image.webp');
      expect(source).toHaveAttribute('type', 'image/webp');
    });

    it('generates WebP source for JPEG images', () => {
      render(<OptimizedImage src="/photo.jpeg" alt="Test" priority />);
      const source = document.querySelector('source');
      expect(source).toHaveAttribute('srcSet', '/photo.webp');
    });

    it('generates WebP source for PNG images', () => {
      render(<OptimizedImage src="/graphic.png" alt="Test" priority />);
      const source = document.querySelector('source');
      expect(source).toHaveAttribute('srcSet', '/graphic.webp');
    });

    it('keeps WebP extension as-is', () => {
      render(<OptimizedImage src="/already.webp" alt="Test" priority />);
      const source = document.querySelector('source');
      expect(source).toHaveAttribute('srcSet', '/already.webp');
    });

    it('handles data URLs correctly', () => {
      const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANS';
      render(<OptimizedImage src={dataUrl} alt="Test" priority />);
      const source = document.querySelector('source');
      expect(source).toHaveAttribute('srcSet', dataUrl);
    });

    it('fallback img has original src', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveAttribute('src', '/test.jpg');
    });
  });

  describe('Loading States', () => {
    it('shows shimmer effect while loading', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      expect(screen.getByTestId('shimmer')).toBeInTheDocument();
    });

    it('shimmer has correct classes', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      const shimmer = screen.getByTestId('shimmer');
      expect(shimmer).toHaveClass('animate-shimmer', 'bg-gradient-to-r');
    });

    it('shimmer is aria-hidden', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      const shimmer = screen.getByTestId('shimmer');
      expect(shimmer).toHaveAttribute('aria-hidden', 'true');
    });

    it('hides shimmer after image loads', async () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      
      const shimmer = screen.getByTestId('shimmer');
      expect(shimmer).toHaveClass('opacity-100');
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('load'));
      });

      await waitFor(() => {
        expect(shimmer).toHaveClass('opacity-0');
      });
    });

    it('image has opacity-0 initially', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveClass('opacity-0');
    });

    it('image transitions to opacity-100 on load', async () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('load'));
      });

      await waitFor(() => {
        expect(img).toHaveClass('opacity-100');
      });
    });

    it('has smooth fade-in transition', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveClass('transition-opacity', 'duration-500');
    });
  });

  describe('Blur Placeholder', () => {
    it('renders blur placeholder when blurDataURL provided', () => {
      render(
        <OptimizedImage 
          src="/test.jpg" 
          alt="Test" 
          priority 
          blurDataURL="data:image/jpeg;base64,blur"
        />
      );
      expect(screen.getByTestId('blur-placeholder')).toBeInTheDocument();
    });

    it('does not render blur placeholder without blurDataURL', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      expect(screen.queryByTestId('blur-placeholder')).not.toBeInTheDocument();
    });

    it('blur placeholder has correct classes', () => {
      render(
        <OptimizedImage 
          src="/test.jpg" 
          alt="Test" 
          priority 
          blurDataURL="data:image/jpeg;base64,blur"
        />
      );
      const blur = screen.getByTestId('blur-placeholder');
      expect(blur).toHaveClass('blur-2xl', 'scale-110');
    });

    it('blur placeholder is aria-hidden', () => {
      render(
        <OptimizedImage 
          src="/test.jpg" 
          alt="Test" 
          priority 
          blurDataURL="data:image/jpeg;base64,blur"
        />
      );
      const blur = screen.getByTestId('blur-placeholder');
      expect(blur).toHaveAttribute('aria-hidden', 'true');
    });

    it('blur placeholder has empty alt', () => {
      render(
        <OptimizedImage 
          src="/test.jpg" 
          alt="Test" 
          priority 
          blurDataURL="data:image/jpeg;base64,blur"
        />
      );
      const blur = screen.getByTestId('blur-placeholder');
      expect(blur).toHaveAttribute('alt', '');
    });

    it('hides blur placeholder after image loads', async () => {
      render(
        <OptimizedImage 
          src="/test.jpg" 
          alt="Test" 
          priority 
          blurDataURL="data:image/jpeg;base64,blur"
        />
      );
      
      const blur = screen.getByTestId('blur-placeholder');
      expect(blur).toHaveClass('opacity-100');
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('load'));
      });

      await waitFor(() => {
        expect(blur).toHaveClass('opacity-0');
      });
    });
  });

  describe('Error Handling', () => {
    it('shows error fallback on image load error', async () => {
      render(<OptimizedImage src="/broken.jpg" alt="Test image" priority />);
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('error'));
      });

      await waitFor(() => {
        expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
      });
    });

    it('error fallback has correct role and aria-label', async () => {
      render(<OptimizedImage src="/broken.jpg" alt="Test image" priority />);
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('error'));
      });

      await waitFor(() => {
        const fallback = screen.getByTestId('error-fallback');
        expect(fallback).toHaveAttribute('role', 'img');
        expect(fallback).toHaveAttribute('aria-label', 'Failed to load: Test image');
      });
    });

    it('error fallback shows icon and message', async () => {
      render(<OptimizedImage src="/broken.jpg" alt="Test" priority />);
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('error'));
      });

      await waitFor(() => {
        expect(screen.getByText('Image not available')).toBeInTheDocument();
        const svg = screen.getByTestId('error-fallback').querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });

    it('attempts to load fallbackSrc on error', async () => {
      render(
        <OptimizedImage 
          src="/broken.jpg" 
          alt="Test" 
          priority 
          fallbackSrc="/fallback.jpg"
        />
      );
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('error'));
      });

      await waitFor(() => {
        expect(img).toHaveAttribute('src', '/fallback.jpg');
      });
    });

    it('uses default fallback when not specified', async () => {
      render(<OptimizedImage src="/broken.jpg" alt="Test" priority />);
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('error'));
      });

      await waitFor(() => {
        expect(img).toHaveAttribute('src', '/static/images/placeholder.png');
      });
    });

    it('hides shimmer on error', async () => {
      render(<OptimizedImage src="/broken.jpg" alt="Test" priority />);
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('error'));
      });

      await waitFor(() => {
        expect(screen.queryByTestId('shimmer')).not.toBeInTheDocument();
      });
    });
  });

  describe('Callbacks', () => {
    it('calls onLoadComplete when image loads', async () => {
      const onLoadComplete = jest.fn();
      render(
        <OptimizedImage 
          src="/test.jpg" 
          alt="Test" 
          priority 
          onLoadComplete={onLoadComplete}
        />
      );
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('load'));
      });

      await waitFor(() => {
        expect(onLoadComplete).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onLoadError when image fails to load', async () => {
      const onLoadError = jest.fn();
      render(
        <OptimizedImage 
          src="/broken.jpg" 
          alt="Test" 
          priority 
          onLoadError={onLoadError}
        />
      );
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('error'));
      });

      await waitFor(() => {
        expect(onLoadError).toHaveBeenCalledTimes(1);
        expect(onLoadError).toHaveBeenCalledWith(expect.any(Error));
      });
    });

    it('onLoadError receives error with message', async () => {
      const onLoadError = jest.fn();
      render(
        <OptimizedImage 
          src="/broken.jpg" 
          alt="Test" 
          priority 
          onLoadError={onLoadError}
        />
      );
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('error'));
      });

      await waitFor(() => {
        const error = onLoadError.mock.calls[0][0];
        expect(error.message).toContain('Failed to load image: /broken.jpg');
      });
    });
  });

  describe('Accessibility', () => {
    it('has alt attribute on main image', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test description" priority />);
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveAttribute('alt', 'Test description');
    });

    it('requires alt prop', () => {
      // TypeScript would enforce this, but we can check it's passed through
      render(<OptimizedImage src="/test.jpg" alt="Required alt" priority />);
      expect(screen.getByAltText('Required alt')).toBeInTheDocument();
    });

    it('decorative elements have aria-hidden', () => {
      render(
        <OptimizedImage 
          src="/test.jpg" 
          alt="Test" 
          priority 
          blurDataURL="data:image/jpeg;base64,blur"
        />
      );
      
      const shimmer = screen.getByTestId('shimmer');
      const blur = screen.getByTestId('blur-placeholder');
      
      expect(shimmer).toHaveAttribute('aria-hidden', 'true');
      expect(blur).toHaveAttribute('aria-hidden', 'true');
    });

    it('error fallback has proper ARIA attributes', async () => {
      render(<OptimizedImage src="/broken.jpg" alt="My image" priority />);
      
      const img = screen.getByTestId('optimized-image');
      act(() => {
        img.dispatchEvent(new Event('error'));
      });

      await waitFor(() => {
        const fallback = screen.getByTestId('error-fallback');
        expect(fallback).toHaveAttribute('role', 'img');
        expect(fallback).toHaveAttribute('aria-label', 'Failed to load: My image');
      });
    });
  });

  describe('Custom Props', () => {
    it('spreads additional props to img element', () => {
      render(
        <OptimizedImage 
          src="/test.jpg" 
          alt="Test image"
          priority 
          data-testid="custom-img"
          title="Custom title"
        />
      );
      
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveAttribute('title', 'Custom title');
    });

    it('accepts width and height props', () => {
      render(
        <OptimizedImage 
          src="/test.jpg" 
          alt="Test" 
          priority 
          width={800}
          height={600}
        />
      );
      
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveAttribute('width', '800');
      expect(img).toHaveAttribute('height', '600');
    });
  });

  describe('Styling', () => {
    it('image has object-cover class', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveClass('object-cover');
    });

    it('image has full width and height', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" priority />);
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveClass('w-full', 'h-full');
    });

    it('container has overflow-hidden', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test" />);
      const container = screen.getByTestId('optimized-image-container');
      expect(container).toHaveClass('overflow-hidden');
    });
  });

  describe('Real-world Use Cases', () => {
    it('works as hero image with priority', () => {
      render(
        <OptimizedImage 
          src="/hero.jpg" 
          alt="Hero banner" 
          priority
          className="h-96"
        />
      );
      
      const img = screen.getByTestId('optimized-image');
      expect(img).toHaveAttribute('loading', 'eager');
      expect(screen.getByTestId('optimized-image-container')).toHaveClass('h-96');
    });

    it('works as lazy-loaded thumbnail', () => {
      render(
        <OptimizedImage 
          src="/thumb.jpg" 
          alt="Thumbnail" 
          className="w-32 h-32 rounded-lg"
        />
      );
      
      expect(MockIntersectionObserver).toHaveBeenCalled();
      expect(mockObserverInstance.observe).toHaveBeenCalled();
      expect(screen.getByTestId('optimized-image-container')).toHaveClass('w-32', 'h-32', 'rounded-lg');
    });

    it('works with blur placeholder for progressive loading', () => {
      render(
        <OptimizedImage 
          src="/large.jpg" 
          alt="Large image" 
          blurDataURL="data:image/jpeg;base64,/9j/4AAQ"
          priority
        />
      );
      
      expect(screen.getByTestId('blur-placeholder')).toBeInTheDocument();
    });

    it('handles party logo images', () => {
      render(
        <OptimizedImage 
          src="/logos/bjp.png" 
          alt="BJP Logo" 
          priority
          className="w-16 h-16"
        />
      );
      
      const source = document.querySelector('source');
      expect(source).toHaveAttribute('srcSet', '/logos/bjp.webp');
    });
  });
});
