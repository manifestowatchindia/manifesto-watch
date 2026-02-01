import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { UpcomingElections } from '../UpcomingElections';

/**
 * UpcomingElections Component Tests
 * Tests the upcoming elections carousel section
 */

describe('UpcomingElections Component', () => {
  describe('Structure and Rendering', () => {
    it('should render section heading', () => {
      render(<UpcomingElections />);
      expect(screen.getByText('Upcoming Assembly Elections')).toBeInTheDocument();
    });

    it('should render 4 election cards initially', () => {
      render(<UpcomingElections />);
      // First 4 elections: Assam, Kerala, Tamil Nadu, West Bengal
      expect(screen.getByText('Assam')).toBeInTheDocument();
      expect(screen.getByText('Kerala')).toBeInTheDocument();
      expect(screen.getByText('Tamil Nadu')).toBeInTheDocument();
      expect(screen.getByText('West Bengal')).toBeInTheDocument();
    });

    it('should render election years', () => {
      render(<UpcomingElections />);
      const elections2026 = screen.getAllByText(/Election 2026/i);
      expect(elections2026.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation Controls', () => {
    it('should not show previous arrow initially', () => {
      render(<UpcomingElections />);
      const prevButton = screen.queryByLabelText('Previous elections');
      expect(prevButton).not.toBeInTheDocument();
    });

    it('should show next arrow initially', () => {
      render(<UpcomingElections />);
      const nextButton = screen.getByLabelText('Next elections');
      expect(nextButton).toBeInTheDocument();
    });

    it('should navigate to next slide when next button clicked', () => {
      render(<UpcomingElections />);
      const nextButton = screen.getByLabelText('Next elections');
      
      // Click next
      fireEvent.click(nextButton);
      
      // Should now show Uttar Pradesh (5th election)
      expect(screen.getByText('Uttar Pradesh')).toBeInTheDocument();
    });

    it('should show previous arrow after navigating forward', () => {
      render(<UpcomingElections />);
      const nextButton = screen.getByLabelText('Next elections');
      
      // Navigate forward
      fireEvent.click(nextButton);
      
      // Previous button should now be visible
      const prevButton = screen.getByLabelText('Previous elections');
      expect(prevButton).toBeInTheDocument();
    });

    it('should navigate back when previous button clicked', () => {
      render(<UpcomingElections />);
      const nextButton = screen.getByLabelText('Next elections');
      
      // Navigate forward
      fireEvent.click(nextButton);
      
      // Navigate back
      const prevButton = screen.getByLabelText('Previous elections');
      fireEvent.click(prevButton);
      
      // Should be back to showing first 4
      expect(screen.getByText('Assam')).toBeInTheDocument();
    });
  });

  describe('Pagination Dots', () => {
    it('should render pagination dots', () => {
      render(<UpcomingElections />);
      // With 8 elections showing 4 at a time, there should be 5 slides (8-4+1)
      const dots = screen.getAllByRole('button', { name: /Go to slide/i });
      expect(dots).toHaveLength(5);
    });

    it('should highlight active dot', () => {
      render(<UpcomingElections />);
      const firstDot = screen.getByLabelText('Go to slide 1');
      expect(firstDot).toHaveClass('bg-white', 'w-8');
    });

    it('should navigate to specific slide when dot clicked', () => {
      render(<UpcomingElections />);
      const thirdDot = screen.getByLabelText('Go to slide 3');
      
      // Click third dot
      fireEvent.click(thirdDot);
      
      // Should show elections starting from index 2
      expect(screen.getByText('Tamil Nadu')).toBeInTheDocument();
      expect(screen.getByText('Uttar Pradesh')).toBeInTheDocument();
    });
  });

  describe('Election Cards', () => {
    it('should have hover effects on cards', () => {
      const { container } = render(<UpcomingElections />);
      const cards = container.querySelectorAll('.group');
      expect(cards.length).toBe(4);
    });

    it('should have background images', () => {
      const { container } = render(<UpcomingElections />);
      const cardWithImage = container.querySelector('[style*="background-image"]');
      expect(cardWithImage).toBeInTheDocument();
    });

    it('should have gradient overlay', () => {
      const { container } = render(<UpcomingElections />);
      const overlay = container.querySelector('.bg-gradient-to-t');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid layout', () => {
      const { container } = render(<UpcomingElections />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    });

    it('should have responsive heading size', () => {
      render(<UpcomingElections />);
      const heading = screen.getByText('Upcoming Assembly Elections');
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl');
    });

    it('should have responsive container padding', () => {
      const { container } = render(<UpcomingElections />);
      const mainContainer = container.querySelector('.container');
      expect(mainContainer).toHaveClass('mx-auto', 'px-4');
    });
  });

  describe('Styling', () => {
    it('should have white text on cards', () => {
      render(<UpcomingElections />);
      const stateName = screen.getByText('Assam');
      expect(stateName).toHaveClass('text-white');
    });

    it('should have rounded cards', () => {
      const { container } = render(<UpcomingElections />);
      const card = container.querySelector('.rounded-lg');
      expect(card).toBeInTheDocument();
    });

    it('should have shadow on cards', () => {
      const { container } = render(<UpcomingElections />);
      const card = container.querySelector('.shadow-lg');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on navigation buttons', () => {
      render(<UpcomingElections />);
      const nextButton = screen.getByLabelText('Next elections');
      expect(nextButton).toHaveAttribute('aria-label', 'Next elections');
    });

    it('should have aria-labels on pagination dots', () => {
      render(<UpcomingElections />);
      const dots = screen.getAllByRole('button', { name: /Go to slide/i });
      dots.forEach((dot, index) => {
        expect(dot).toHaveAttribute('aria-label', `Go to slide ${index + 1}`);
      });
    });

    it('should use semantic heading', () => {
      render(<UpcomingElections />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Upcoming Assembly Elections');
    });
  });
});

/**
 * Manual Testing Checklist
 * 
 * 1. Navigation:
 *    - Next/Previous arrows work smoothly
 *    - Pagination dots navigate correctly
 *    - Arrow visibility updates correctly
 *    - Can navigate to all slides
 * 
 * 2. Visual:
 *    - Election cards display background images
 *    - Hover effects work (scale, overlay darkness)
 *    - Text is readable over all images
 *    - Arrows are positioned correctly
 * 
 * 3. Responsive:
 *    - Mobile: 1 column layout
 *    - Tablet: 2 column layout
 *    - Desktop: 4 column layout
 *    - Arrows position adjusts on different screens
 * 
 * 4. Interactions:
 *    - Cards are clickable (cursor pointer)
 *    - Smooth transitions between slides
 *    - Pagination dots update active state
 *    - Hover effects on all interactive elements
 */
