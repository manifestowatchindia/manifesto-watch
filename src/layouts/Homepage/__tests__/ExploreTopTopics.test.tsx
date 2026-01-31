import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExploreTopTopics } from '../ExploreTopTopics';

/**
 * ExploreTopTopics Component Tests
 * Tests the hero section of the homepage
 */

describe('ExploreTopTopics Component', () => {
  describe('Structure and Rendering', () => {
    it('should render hero section', () => {
      const { container } = render(<ExploreTopTopics />);
      const heroSection = container.querySelector('.relative.w-full');
      expect(heroSection).toBeInTheDocument();
    });

    it('should render hero image', () => {
      render(<ExploreTopTopics />);
      const image = screen.getByAltText('Democracy');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/static/images/democracy_v2.jpg');
    });

    it('should render hero heading', () => {
      render(<ExploreTopTopics />);
      expect(screen.getByText(/Tracking Manifestos, Measuring Progress/i)).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should have responsive hero height', () => {
      const { container } = render(<ExploreTopTopics />);
      const heroSection = container.querySelector('.relative.w-full');
      expect(heroSection).toHaveClass('h-[600px]');
    });

    it('should have image covering full area', () => {
      render(<ExploreTopTopics />);
      const image = screen.getByAltText('Democracy');
      expect(image).toHaveClass('w-full', 'h-full', 'object-cover');
    });

    it('should have gradient overlay', () => {
      const { container } = render(<ExploreTopTopics />);
      const overlay = container.querySelector('.absolute.inset-0');
      expect(overlay).toHaveClass('bg-gradient-to-b');
    });
  });

  describe('Typography', () => {
    it('should have responsive heading sizes', () => {
      render(<ExploreTopTopics />);
      const heading = screen.getByText(/Tracking Manifestos, Measuring Progress/i);
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl');
    });

    it('should have bold heading', () => {
      render(<ExploreTopTopics />);
      const heading = screen.getByText(/Tracking Manifestos, Measuring Progress/i);
      expect(heading).toHaveClass('font-bold');
    });

    it('should have white text', () => {
      render(<ExploreTopTopics />);
      const heading = screen.getByText(/Tracking Manifestos, Measuring Progress/i);
      // The parent div has text-white class
      expect(heading.parentElement).toHaveClass('text-white');
    });
  });

  describe('Accessibility', () => {
    it('should have alt text on hero image', () => {
      render(<ExploreTopTopics />);
      const image = screen.getByAltText('Democracy');
      expect(image).toHaveAttribute('alt', 'Democracy');
    });

    it('should use semantic heading', () => {
      render(<ExploreTopTopics />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });
});

/**
 * Manual Testing Checklist
 * 
 * 1. Visual:
 *    - Hero image displays correctly
 *    - Gradient overlay is visible
 *    - Text is readable over the image
 *    - Heading is centered
 * 
 * 2. Responsive:
 *    - Hero height is appropriate on all screens
 *    - Text size scales properly (mobile: text-4xl, tablet: text-5xl, desktop: text-6xl)
 *    - Image covers full width without distortion
 * 
 * 3. Performance:
 *    - Image loads quickly
 *    - No layout shift when image loads
 */
