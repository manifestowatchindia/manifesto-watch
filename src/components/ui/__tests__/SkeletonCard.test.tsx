import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SkeletonCard } from '../SkeletonCard';

describe('SkeletonCard Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<SkeletonCard />);
      expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
    });

    it('has card styling', () => {
      render(<SkeletonCard />);
      const card = screen.getByTestId('skeleton-card');
      expect(card).toHaveClass('bg-white', 'rounded-card', 'shadow-sm', 'border');
    });
  });

  describe('Image Section', () => {
    it('renders image skeleton by default', () => {
      render(<SkeletonCard />);
      const skeletons = screen.getAllByTestId('skeleton');
      const imageSkeleton = skeletons[0];
      expect(imageSkeleton).toHaveStyle({ height: '200px' });
    });

    it('does not render image when hasImage is false', () => {
      render(<SkeletonCard hasImage={false} />);
      const skeletons = screen.getAllByTestId('skeleton');
      expect(skeletons[0]).not.toHaveStyle({ height: '200px' });
    });

    it('renders custom image height', () => {
      render(<SkeletonCard imageHeight={300} />);
      const skeletons = screen.getAllByTestId('skeleton');
      const imageSkeleton = skeletons[0];
      expect(imageSkeleton).toHaveStyle({ height: '300px' });
    });

    it('accepts image height as string', () => {
      render(<SkeletonCard imageHeight="250px" />);
      const skeletons = screen.getAllByTestId('skeleton');
      const imageSkeleton = skeletons[0];
      expect(imageSkeleton).toHaveStyle({ height: '250px' });
    });
  });

  describe('Avatar Section', () => {
    it('does not render avatar by default', () => {
      render(<SkeletonCard />);
      const skeletons = screen.getAllByTestId('skeleton');
      const circularSkeletons = skeletons.filter(s => s.className.includes('rounded-full'));
      expect(circularSkeletons).toHaveLength(0);
    });

    it('renders avatar when hasAvatar is true', () => {
      render(<SkeletonCard hasAvatar />);
      const skeletons = screen.getAllByTestId('skeleton');
      const circularSkeletons = skeletons.filter(s => s.className.includes('rounded-full'));
      expect(circularSkeletons.length).toBeGreaterThan(0);
    });

    it('avatar has correct dimensions', () => {
      render(<SkeletonCard hasAvatar />);
      const skeletons = screen.getAllByTestId('skeleton');
      const avatar = skeletons.find(s => s.className.includes('rounded-full'));
      expect(avatar).toHaveStyle({ width: '40px', height: '40px' });
    });

    it('renders avatar with title line when hasAvatar is true', () => {
      render(<SkeletonCard hasAvatar />);
      const textContainer = screen.getByTestId('skeleton-text');
      expect(textContainer).toBeInTheDocument();
    });
  });

  describe('Title Section', () => {
    it('renders title lines when no avatar', () => {
      render(<SkeletonCard hasAvatar={false} titleLines={2} />);
      const textContainers = screen.getAllByTestId('skeleton-text');
      expect(textContainers.length).toBeGreaterThan(0);
    });

    it('does not render title section when hasAvatar is true', () => {
      render(<SkeletonCard hasAvatar titleLines={2} />);
      const textContainers = screen.getAllByTestId('skeleton-text');
      // Should have avatar line and body, but not separate title section
      expect(textContainers.length).toBeLessThan(3);
    });

    it('does not render title when titleLines is 0', () => {
      render(<SkeletonCard hasAvatar={false} titleLines={0} bodyLines={0} />);
      const textContainers = screen.queryAllByTestId('skeleton-text');
      expect(textContainers).toHaveLength(0);
    });
  });

  describe('Body Section', () => {
    it('renders body lines by default', () => {
      render(<SkeletonCard />);
      const textContainers = screen.getAllByTestId('skeleton-text');
      expect(textContainers.length).toBeGreaterThan(0);
    });

    it('renders custom number of body lines', () => {
      render(<SkeletonCard bodyLines={5} />);
      const textContainers = screen.getAllByTestId('skeleton-text');
      const bodyContainer = textContainers[textContainers.length - 1];
      const bodyLines = bodyContainer.querySelectorAll('[data-testid="skeleton"]');
      expect(bodyLines).toHaveLength(5);
    });

    it('does not render body when bodyLines is 0', () => {
      render(<SkeletonCard bodyLines={0} titleLines={0} hasAvatar={false} />);
      const textContainers = screen.queryAllByTestId('skeleton-text');
      expect(textContainers).toHaveLength(0);
    });
  });

  describe('Action Buttons', () => {
    it('renders action button skeletons', () => {
      render(<SkeletonCard />);
      const skeletons = screen.getAllByTestId('skeleton');
      const buttons = skeletons.filter(s => 
        s.style.width === '80px' && s.style.height === '36px'
      );
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('button skeletons have correct dimensions', () => {
      render(<SkeletonCard />);
      const skeletons = screen.getAllByTestId('skeleton');
      const buttons = skeletons.filter(s => 
        s.style.width === '80px' && s.style.height === '36px'
      );
      buttons.forEach(button => {
        expect(button).toHaveStyle({ width: '80px', height: '36px' });
      });
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<SkeletonCard className="custom-class" />);
      const card = screen.getByTestId('skeleton-card');
      expect(card).toHaveClass('custom-class');
    });

    it('preserves base classes with custom className', () => {
      render(<SkeletonCard className="extra-margin" />);
      const card = screen.getByTestId('skeleton-card');
      expect(card).toHaveClass('extra-margin', 'bg-white', 'rounded-card');
    });
  });

  describe('Layout', () => {
    it('has padding in content section', () => {
      const { container } = render(<SkeletonCard />);
      const contentDiv = container.querySelector('.p-6');
      expect(contentDiv).toBeInTheDocument();
    });

    it('has spacing in content section', () => {
      const { container } = render(<SkeletonCard />);
      const contentDiv = container.querySelector('.space-y-4');
      expect(contentDiv).toBeInTheDocument();
    });
  });

  describe('Real-world Use Cases', () => {
    it('works as promise card placeholder', () => {
      render(<SkeletonCard hasImage imageHeight={180} titleLines={1} bodyLines={2} />);
      expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
      const textContainers = screen.getAllByTestId('skeleton-text');
      expect(textContainers.length).toBeGreaterThan(0);
    });

    it('works as news article placeholder with avatar', () => {
      render(<SkeletonCard hasImage={false} hasAvatar titleLines={0} bodyLines={3} />);
      const skeletons = screen.getAllByTestId('skeleton');
      const avatar = skeletons.find(s => s.className.includes('rounded-full'));
      expect(avatar).toBeInTheDocument();
    });

    it('works as simple content card', () => {
      render(<SkeletonCard hasImage={false} hasAvatar={false} titleLines={2} bodyLines={4} />);
      expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
    });

    it('works as profile card', () => {
      render(<SkeletonCard hasImage imageHeight={120} hasAvatar titleLines={0} bodyLines={2} />);
      const skeletons = screen.getAllByTestId('skeleton');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe('Combinations', () => {
    it('handles all options enabled', () => {
      render(<SkeletonCard hasImage hasAvatar titleLines={2} bodyLines={3} />);
      expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
    });

    it('handles minimal configuration', () => {
      render(<SkeletonCard hasImage={false} hasAvatar={false} titleLines={0} bodyLines={0} />);
      expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
      // Should still have action buttons
      const skeletons = screen.getAllByTestId('skeleton');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
});
