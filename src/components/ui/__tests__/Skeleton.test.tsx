import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Skeleton } from '../Skeleton';

describe('Skeleton Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Skeleton />);
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('has aria-busy attribute', () => {
      render(<Skeleton />);
      expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-busy', 'true');
    });

    it('has aria-live attribute', () => {
      render(<Skeleton />);
      expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Variants', () => {
    it('renders text variant by default', () => {
      render(<Skeleton />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded', 'h-4');
    });

    it('renders rectangular variant', () => {
      render(<Skeleton variant="rectangular" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-lg');
    });

    it('renders circular variant', () => {
      render(<Skeleton variant="circular" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-full');
    });
  });

  describe('Animations', () => {
    it('uses wave animation by default', () => {
      render(<Skeleton />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('animate-shimmer', 'bg-gradient-to-r');
    });

    it('uses pulse animation when specified', () => {
      render(<Skeleton animation="pulse" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('animate-pulse');
    });

    it('has no animation when set to none', () => {
      render(<Skeleton animation="none" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).not.toHaveClass('animate-shimmer');
      expect(skeleton).not.toHaveClass('animate-pulse');
    });

    it('wave animation has gradient classes', () => {
      render(<Skeleton animation="wave" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('from-gray-200', 'via-gray-100', 'to-gray-200');
    });
  });

  describe('Dimensions', () => {
    it('accepts width as number', () => {
      render(<Skeleton width={100} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '100px' });
    });

    it('accepts width as string', () => {
      render(<Skeleton width="50%" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '50%' });
    });

    it('accepts height as number', () => {
      render(<Skeleton height={50} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ height: '50px' });
    });

    it('accepts height as string', () => {
      render(<Skeleton height="2rem" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ height: '2rem' });
    });

    it('accepts both width and height', () => {
      render(<Skeleton width={200} height={100} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Skeleton className="custom-class" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('custom-class');
    });

    it('preserves base classes with custom className', () => {
      render(<Skeleton className="extra-class" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('extra-class', 'bg-gray-200');
    });

    it('spreads additional props', () => {
      render(<Skeleton data-custom="value" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Styling', () => {
    it('has gray background', () => {
      render(<Skeleton />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('bg-gray-200');
    });

    it('text variant has default height', () => {
      render(<Skeleton variant="text" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('h-4');
    });

    it('applies rounded classes based on variant', () => {
      const { rerender } = render(<Skeleton variant="text" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded');

      rerender(<Skeleton variant="rectangular" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-lg');

      rerender(<Skeleton variant="circular" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');
    });
  });

  describe('Real-world Use Cases', () => {
    it('works as avatar placeholder', () => {
      render(<Skeleton variant="circular" width={48} height={48} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-full');
      expect(skeleton).toHaveStyle({ width: '48px', height: '48px' });
    });

    it('works as image placeholder', () => {
      render(<Skeleton variant="rectangular" width="100%" height={200} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-lg');
      expect(skeleton).toHaveStyle({ width: '100%', height: '200px' });
    });

    it('works as text line placeholder', () => {
      render(<Skeleton variant="text" width="80%" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('h-4');
      expect(skeleton).toHaveStyle({ width: '80%' });
    });

    it('works as button placeholder', () => {
      render(<Skeleton variant="rectangular" width={100} height={40} className="rounded-lg" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '100px', height: '40px' });
    });
  });

  describe('Accessibility', () => {
    it('indicates loading state with aria-busy', () => {
      render(<Skeleton />);
      expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-busy', 'true');
    });

    it('has aria-live for screen readers', () => {
      render(<Skeleton />);
      expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-live', 'polite');
    });
  });
});
