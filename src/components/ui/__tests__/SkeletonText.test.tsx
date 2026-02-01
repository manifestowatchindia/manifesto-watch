import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SkeletonText } from '../SkeletonText';

describe('SkeletonText Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<SkeletonText />);
      expect(screen.getByTestId('skeleton-text')).toBeInTheDocument();
    });

    it('renders 3 lines by default', () => {
      render(<SkeletonText />);
      const skeletons = screen.getAllByTestId('skeleton');
      expect(skeletons).toHaveLength(3);
    });

    it('renders custom number of lines', () => {
      render(<SkeletonText lines={5} />);
      const skeletons = screen.getAllByTestId('skeleton');
      expect(skeletons).toHaveLength(5);
    });

    it('renders single line', () => {
      render(<SkeletonText lines={1} />);
      const skeletons = screen.getAllByTestId('skeleton');
      expect(skeletons).toHaveLength(1);
    });
  });

  describe('Width Configuration', () => {
    it('applies default width to all lines except last', () => {
      render(<SkeletonText lines={3} />);
      const skeletons = screen.getAllByTestId('skeleton');
      
      expect(skeletons[0]).toHaveStyle({ width: '100%' });
      expect(skeletons[1]).toHaveStyle({ width: '100%' });
      expect(skeletons[2]).toHaveStyle({ width: '80%' });
    });

    it('applies custom width', () => {
      render(<SkeletonText lines={2} width="90%" />);
      const skeletons = screen.getAllByTestId('skeleton');
      
      expect(skeletons[0]).toHaveStyle({ width: '90%' });
    });

    it('applies custom last line width', () => {
      render(<SkeletonText lines={2} lastLineWidth="60%" />);
      const skeletons = screen.getAllByTestId('skeleton');
      
      expect(skeletons[1]).toHaveStyle({ width: '60%' });
    });

    it('accepts numeric width', () => {
      render(<SkeletonText lines={2} width={200} />);
      const skeletons = screen.getAllByTestId('skeleton');
      
      expect(skeletons[0]).toHaveStyle({ width: '200px' });
    });
  });

  describe('Spacing', () => {
    it('has vertical spacing between lines', () => {
      render(<SkeletonText />);
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveClass('space-y-2');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<SkeletonText className="custom-class" />);
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveClass('custom-class');
    });

    it('preserves base classes with custom className', () => {
      render(<SkeletonText className="extra-margin" />);
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveClass('extra-margin', 'space-y-2');
    });
  });

  describe('Line Variants', () => {
    it('all lines use text variant', () => {
      render(<SkeletonText lines={3} />);
      const skeletons = screen.getAllByTestId('skeleton');
      
      skeletons.forEach(skeleton => {
        expect(skeleton).toHaveClass('h-4', 'rounded');
      });
    });
  });

  describe('Real-world Use Cases', () => {
    it('works for paragraph placeholder', () => {
      render(<SkeletonText lines={4} width="100%" lastLineWidth="70%" />);
      const skeletons = screen.getAllByTestId('skeleton');
      
      expect(skeletons).toHaveLength(4);
      expect(skeletons[3]).toHaveStyle({ width: '70%' });
    });

    it('works for title placeholder', () => {
      render(<SkeletonText lines={1} width="60%" lastLineWidth="60%" />);
      const skeletons = screen.getAllByTestId('skeleton');
      
      expect(skeletons).toHaveLength(1);
      expect(skeletons[0]).toHaveStyle({ width: '60%' });
    });

    it('works for multi-line description', () => {
      render(<SkeletonText lines={3} width="95%" lastLineWidth="75%" />);
      const skeletons = screen.getAllByTestId('skeleton');
      
      expect(skeletons).toHaveLength(3);
      expect(skeletons[0]).toHaveStyle({ width: '95%' });
      expect(skeletons[2]).toHaveStyle({ width: '75%' });
    });
  });

  describe('Edge Cases', () => {
    it('handles zero lines gracefully', () => {
      render(<SkeletonText lines={0} />);
      const skeletons = screen.queryAllByTestId('skeleton');
      expect(skeletons).toHaveLength(0);
    });

    it('handles large number of lines', () => {
      render(<SkeletonText lines={10} />);
      const skeletons = screen.getAllByTestId('skeleton');
      expect(skeletons).toHaveLength(10);
    });
  });
});
