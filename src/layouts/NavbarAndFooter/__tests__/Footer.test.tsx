import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

/**
 * Footer Component Tests
 * Tests the structure, links, and responsive layout of the footer
 */

describe('Footer Component', () => {
  describe('Structure and Rendering', () => {
    it('should render footer with proper semantic HTML', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('bg-primary-900');
    });

    it('should render logo with alt text', () => {
      render(<Footer />);
      const logo = screen.getByAltText('Manifesto Watch Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass('h-12');
    });

    it('should render company description', () => {
      render(<Footer />);
      expect(screen.getByText(/Manifesto Watch is India's premier platform/i)).toBeInTheDocument();
    });

    it('should render copyright notice', () => {
      render(<Footer />);
      const year = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${year} Manifesto Watch`))).toBeInTheDocument();
    });

    it('should render disclaimer text', () => {
      render(<Footer />);
      expect(screen.getByText(/Manifesto Watch is an independent platform/i)).toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    it('should render all 5 social media icons', () => {
      render(<Footer />);
      expect(screen.getByLabelText('X (Twitter)')).toBeInTheDocument();
      expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    });

    it('should have proper external link attributes', () => {
      render(<Footer />);
      const twitterLink = screen.getByLabelText('X (Twitter)');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should have hover styles on social icons', () => {
      render(<Footer />);
      const twitterLink = screen.getByLabelText('X (Twitter)');
      expect(twitterLink).toHaveClass('hover:bg-primary-700');
    });
  });

  describe('Quick Links Section', () => {
    it('should render Quick Links heading', () => {
      render(<Footer />);
      expect(screen.getByText('Quick Links')).toBeInTheDocument();
    });

    it('should render all quick links', () => {
      render(<Footer />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About Us')).toBeInTheDocument();
      expect(screen.getByText('Central Manifestos')).toBeInTheDocument();
      expect(screen.getByText('State Manifestos')).toBeInTheDocument();
      expect(screen.getByText('Promise Tracking')).toBeInTheDocument();
      expect(screen.getByText('News Updates')).toBeInTheDocument();
    });

    it('should have correct href attributes', () => {
      render(<Footer />);
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveAttribute('href', '/');
    });
  });

  describe('Resources Section', () => {
    it('should render Resources heading', () => {
      render(<Footer />);
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });

    it('should render all resource links', () => {
      render(<Footer />);
      expect(screen.getByText('Political Landscape')).toBeInTheDocument();
      expect(screen.getByText('Interactive Map')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Upcoming Elections')).toBeInTheDocument();
      expect(screen.getByText('Election Calendar')).toBeInTheDocument();
    });
  });

  describe('Support Section', () => {
    it('should render Support heading', () => {
      render(<Footer />);
      expect(screen.getByText('Support')).toBeInTheDocument();
    });

    it('should render all support links', () => {
      render(<Footer />);
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
      expect(screen.getByText('FAQ')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
      expect(screen.getByText('Disclaimer')).toBeInTheDocument();
    });
  });

  describe('Contact Information', () => {
    it('should render Get in Touch heading', () => {
      render(<Footer />);
      expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    });

    it('should render email link', () => {
      render(<Footer />);
      const emailLink = screen.getByText('contact@manifestowatch.in');
      expect(emailLink).toBeInTheDocument();
      expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:contact@manifestowatch.in');
    });

    it('should render phone number', () => {
      render(<Footer />);
      expect(screen.getByText('+91-XXXX-XXXXXX')).toBeInTheDocument();
    });

    it('should render address', () => {
      render(<Footer />);
      expect(screen.getByText('New Delhi, India')).toBeInTheDocument();
    });
  });

  describe('Newsletter Subscription', () => {
    it('should render subscription heading', () => {
      render(<Footer />);
      expect(screen.getByText('Subscribe to Updates')).toBeInTheDocument();
    });

    it('should render email input', () => {
      render(<Footer />);
      const input = screen.getByPlaceholderText('Your email');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should render subscribe button', () => {
      render(<Footer />);
      const button = screen.getByLabelText('Subscribe');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid layout', () => {
      const { container } = render(<Footer />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-5');
    });

    it('should have responsive bottom bar layout', () => {
      const { container } = render(<Footer />);
      const bottomBar = container.querySelector('.flex.flex-col.md\\:flex-row');
      expect(bottomBar).toBeInTheDocument();
    });

    it('should have mobile-friendly text alignment', () => {
      render(<Footer />);
      const copyright = screen.getByText(/© \d{4} Manifesto Watch/);
      expect(copyright).toHaveClass('text-gray-400', 'text-sm');
    });
  });

  describe('Styling', () => {
    it('should have primary background color', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('bg-primary-900');
    });

    it('should have proper padding', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('py-12');
    });

    it('should have hover transitions on links', () => {
      render(<Footer />);
      const homeLink = screen.getByText('Home');
      expect(homeLink).toHaveClass('hover:text-white', 'transition-colors');
    });

    it('should have border on bottom bar', () => {
      const { container } = render(<Footer />);
      const bottomBar = container.querySelector('.border-t.border-gray-700');
      expect(bottomBar).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on email input', () => {
      render(<Footer />);
      const input = screen.getByPlaceholderText('Your email');
      expect(input).toHaveAttribute('aria-label', 'Email subscription');
    });

    it('should have aria-label on subscribe button', () => {
      render(<Footer />);
      const button = screen.getByLabelText('Subscribe');
      expect(button).toHaveAttribute('aria-label', 'Subscribe');
    });

    it('should have aria-labels on all social media links', () => {
      render(<Footer />);
      expect(screen.getByLabelText('X (Twitter)')).toHaveAttribute('aria-label');
      expect(screen.getByLabelText('Facebook')).toHaveAttribute('aria-label');
      expect(screen.getByLabelText('YouTube')).toHaveAttribute('aria-label');
      expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('aria-label');
      expect(screen.getByLabelText('Instagram')).toHaveAttribute('aria-label');
    });
  });
});

/**
 * Manual Testing Checklist
 * 
 * These require browser testing:
 * 
 * 1. Desktop Layout (≥1024px):
 *    - 5 columns display side by side
 *    - Logo visible and clear
 *    - All links aligned properly
 *    - Social icons in a row
 * 
 * 2. Tablet Layout (768px - 1024px):
 *    - 2 column layout
 *    - Content stacks appropriately
 * 
 * 3. Mobile Layout (<768px):
 *    - Single column layout
 *    - All sections stack vertically
 *    - Social icons remain horizontal
 *    - Email input and button work together
 * 
 * 4. Interactions:
 *    - All links navigate correctly
 *    - Social media links open in new tabs
 *    - Email input accepts input
 *    - Hover states work on all links
 *    - Subscribe button is clickable
 * 
 * 5. Visual:
 *    - Proper spacing between sections
 *    - Text is readable
 *    - Icons display correctly
 *    - Colors match design system
 */
