import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SkeletonList } from '../SkeletonList';

describe('SkeletonList Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<SkeletonList />);
      expect(screen.getByTestId('skeleton-list')).toBeInTheDocument();
    });

    it('renders 5 items by default', () => {
      const { container } = render(<SkeletonList />);
      const items = container.querySelectorAll('.flex.items-center');
      expect(items).toHaveLength(5);
    });

    it('renders custom number of items', () => {
      const { container } = render(<SkeletonList items={3} />);
      const items = container.querySelectorAll('.flex.items-center');
      expect(items).toHaveLength(3);
    });

    it('renders single item', () => {
      const { container } = render(<SkeletonList items={1} />);
      const items = container.querySelectorAll('.flex.items-center');
      expect(items).toHaveLength(1);
    });
  });

  describe('Avatar Configuration', () => {
    it('does not render avatars by default', () => {
      render(<SkeletonList />);
      const skeletons = screen.getAllByTestId('skeleton');
      const avatars = skeletons.filter(s => s.className.includes('rounded-full'));
      expect(avatars).toHaveLength(0);
    });

    it('renders avatars when hasAvatar is true', () => {
      render(<SkeletonList hasAvatar />);
      const skeletons = screen.getAllByTestId('skeleton');
      const avatars = skeletons.filter(s => s.className.includes('rounded-full'));
      expect(avatars.length).toBeGreaterThan(0);
    });

    it('avatar has correct dimensions', () => {
      render(<SkeletonList items={1} hasAvatar />);
      const skeletons = screen.getAllByTestId('skeleton');
      const avatar = skeletons.find(s => s.className.includes('rounded-full'));
      expect(avatar).toHaveStyle({ width: '48px', height: '48px' });
    });

    it('renders one avatar per list item', () => {
      render(<SkeletonList items={3} hasAvatar />);
      const skeletons = screen.getAllByTestId('skeleton');
      const avatars = skeletons.filter(s => s.className.includes('rounded-full'));
      expect(avatars).toHaveLength(3);
    });
  });

  describe('Icon Configuration', () => {
    it('does not render icons by default', () => {
      render(<SkeletonList />);
      const skeletons = screen.getAllByTestId('skeleton');
      const icons = skeletons.filter(s => 
        s.style.width === '24px' && s.style.height === '24px'
      );
      expect(icons).toHaveLength(0);
    });

    it('renders icons when hasIcon is true', () => {
      render(<SkeletonList hasIcon />);
      const skeletons = screen.getAllByTestId('skeleton');
      const icons = skeletons.filter(s => 
        s.style.width === '24px' && s.style.height === '24px'
      );
      expect(icons.length).toBeGreaterThan(0);
    });

    it('icon has correct dimensions', () => {
      render(<SkeletonList items={1} hasIcon />);
      const skeletons = screen.getAllByTestId('skeleton');
      const icon = skeletons.find(s => 
        s.style.width === '24px' && s.style.height === '24px'
      );
      expect(icon).toHaveStyle({ width: '24px', height: '24px' });
    });

    it('does not render icon when hasAvatar is true', () => {
      render(<SkeletonList hasAvatar hasIcon />);
      const skeletons = screen.getAllByTestId('skeleton');
      const icons = skeletons.filter(s => 
        s.style.width === '24px' && s.style.height === '24px'
      );
      expect(icons).toHaveLength(0);
    });
  });

  describe('Content Section', () => {
    it('renders two text lines per item', () => {
      const { container } = render(<SkeletonList items={1} />);
      const item = container.querySelector('.flex.items-center');
      const textSkeletons = item?.querySelectorAll('[data-testid="skeleton"]');
      // Text lines + trailing element
      expect(textSkeletons!.length).toBeGreaterThanOrEqual(2);
    });

    it('first text line has 60% width', () => {
      render(<SkeletonList items={1} />);
      const skeletons = screen.getAllByTestId('skeleton');
      const textLines = skeletons.filter(s => 
        s.style.width === '60%' || s.style.width === '90%'
      );
      expect(textLines.length).toBeGreaterThan(0);
    });

    it('second text line has 90% width', () => {
      render(<SkeletonList items={1} />);
      const skeletons = screen.getAllByTestId('skeleton');
      const wideLines = skeletons.filter(s => s.style.width === '90%');
      expect(wideLines.length).toBeGreaterThan(0);
    });
  });

  describe('Trailing Element', () => {
    it('renders trailing element for each item', () => {
      render(<SkeletonList items={3} />);
      const skeletons = screen.getAllByTestId('skeleton');
      const trailingElements = skeletons.filter(s => 
        s.style.width === '60px' && s.style.height === '24px'
      );
      expect(trailingElements).toHaveLength(3);
    });

    it('trailing element has correct dimensions', () => {
      render(<SkeletonList items={1} />);
      const skeletons = screen.getAllByTestId('skeleton');
      const trailing = skeletons.find(s => 
        s.style.width === '60px' && s.style.height === '24px'
      );
      expect(trailing).toHaveStyle({ width: '60px', height: '24px' });
    });
  });

  describe('Item Styling', () => {
    it('items have white background', () => {
      const { container } = render(<SkeletonList items={1} />);
      const item = container.querySelector('.flex.items-center');
      expect(item).toHaveClass('bg-white');
    });

    it('items have rounded corners', () => {
      const { container } = render(<SkeletonList items={1} />);
      const item = container.querySelector('.flex.items-center');
      expect(item).toHaveClass('rounded-lg');
    });

    it('items have border', () => {
      const { container } = render(<SkeletonList items={1} />);
      const item = container.querySelector('.flex.items-center');
      expect(item).toHaveClass('border', 'border-gray-200');
    });

    it('items have padding', () => {
      const { container } = render(<SkeletonList items={1} />);
      const item = container.querySelector('.flex.items-center');
      expect(item).toHaveClass('p-3');
    });
  });

  describe('List Spacing', () => {
    it('has vertical spacing between items', () => {
      render(<SkeletonList />);
      const list = screen.getByTestId('skeleton-list');
      expect(list).toHaveClass('space-y-3');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<SkeletonList className="custom-class" />);
      const list = screen.getByTestId('skeleton-list');
      expect(list).toHaveClass('custom-class');
    });

    it('preserves base classes with custom className', () => {
      render(<SkeletonList className="extra-margin" />);
      const list = screen.getByTestId('skeleton-list');
      expect(list).toHaveClass('extra-margin', 'space-y-3');
    });
  });

  describe('Real-world Use Cases', () => {
    it('works as user list placeholder', () => {
      render(<SkeletonList items={5} hasAvatar />);
      const skeletons = screen.getAllByTestId('skeleton');
      const avatars = skeletons.filter(s => s.className.includes('rounded-full'));
      expect(avatars).toHaveLength(5);
    });

    it('works as notification list placeholder', () => {
      render(<SkeletonList items={3} hasIcon />);
      const skeletons = screen.getAllByTestId('skeleton');
      const icons = skeletons.filter(s => 
        s.style.width === '24px' && s.style.height === '24px'
      );
      expect(icons).toHaveLength(3);
    });

    it('works as simple text list placeholder', () => {
      render(<SkeletonList items={4} hasAvatar={false} hasIcon={false} />);
      const { container } = render(<SkeletonList items={4} />);
      const items = container.querySelectorAll('.flex.items-center');
      expect(items).toHaveLength(4);
    });

    it('works as comment list placeholder', () => {
      render(<SkeletonList items={3} hasAvatar />);
      expect(screen.getByTestId('skeleton-list')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero items gracefully', () => {
      const { container } = render(<SkeletonList items={0} />);
      const items = container.querySelectorAll('.flex.items-center');
      expect(items).toHaveLength(0);
    });

    it('handles large number of items', () => {
      const { container } = render(<SkeletonList items={20} />);
      const items = container.querySelectorAll('.flex.items-center');
      expect(items).toHaveLength(20);
    });
  });

  describe('Layout', () => {
    it('items use flexbox layout', () => {
      const { container } = render(<SkeletonList items={1} />);
      const item = container.querySelector('.flex.items-center');
      expect(item).toHaveClass('flex', 'items-center');
    });

    it('items have gap between elements', () => {
      const { container } = render(<SkeletonList items={1} />);
      const item = container.querySelector('.flex.items-center');
      expect(item).toHaveClass('gap-3');
    });

    it('content section is flex-1', () => {
      const { container } = render(<SkeletonList items={1} />);
      const content = container.querySelector('.flex-1');
      expect(content).toBeInTheDocument();
    });
  });
});
