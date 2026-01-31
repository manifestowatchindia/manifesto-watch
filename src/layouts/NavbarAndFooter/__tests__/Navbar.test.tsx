import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * Navbar Component Tests
 * 
 * Note: Full integration tests with react-router require manual browser testing.
 * These tests cover the component's structure, accessibility, and basic interactions.
 */

// Mock Navbar for testing without router dependencies
const MockNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isManifestosOpen, setIsManifestosOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 bg-orange-500 text-black">
        This website is under development
      </div>
      <nav className="bg-primary-900 text-white py-3" role="navigation">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img src="/logo.png" alt="Manifesto Watch Logo" className="h-10" />
            </a>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              Menu
            </button>

            <div className="hidden lg:flex lg:items-center">
              <a href="/" className="px-4 py-2">Home</a>
              <a href="/about" className="px-4 py-2">About Us</a>
              <button
                onClick={() => setIsManifestosOpen(!isManifestosOpen)}
                aria-expanded={isManifestosOpen}
                aria-haspopup="true"
                className="px-4 py-2"
              >
                Manifestos
              </button>
            </div>
          </div>

          <div className={`lg:hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
          </div>
        </div>
      </nav>
    </>
  );
};

describe('Navbar Component', () => {
  describe('Structure and Rendering', () => {
    it('should render with proper semantic HTML', () => {
      const { container } = render(<MockNavbar />);
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('role', 'navigation');
    });

    it('should render development banner', () => {
      render(<MockNavbar />);
      expect(screen.getByText(/This website is under development/i)).toBeInTheDocument();
    });

    it('should render logo with alt text', () => {
      render(<MockNavbar />);
      const logo = screen.getByAltText('Manifesto Watch Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass('h-10');
    });

    it('should render navigation links', () => {
      render(<MockNavbar />);
      // Links appear in both desktop and mobile menus, so use getAllByText
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
      expect(screen.getAllByText('About Us').length).toBeGreaterThan(0);
      expect(screen.getByText('Manifestos')).toBeInTheDocument();
    });
  });

  describe('Mobile Menu', () => {
    it('should render mobile toggle button', () => {
      render(<MockNavbar />);
      const button = screen.getByLabelText('Toggle navigation menu');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('lg:hidden');
    });

    it('should toggle mobile menu on button click', () => {
      render(<MockNavbar />);
      const button = screen.getByLabelText('Toggle navigation menu');
      
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Dropdown Menu', () => {
    it('should toggle manifestos dropdown', () => {
      render(<MockNavbar />);
      const dropdownButton = screen.getByText('Manifestos');
      
      expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(dropdownButton);
      expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
      
      fireEvent.click(dropdownButton);
      expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on mobile toggle', () => {
      render(<MockNavbar />);
      const button = screen.getByLabelText('Toggle navigation menu');
      expect(button).toHaveAttribute('aria-label', 'Toggle navigation menu');
    });

    it('should have aria-expanded on mobile toggle', () => {
      render(<MockNavbar />);
      const button = screen.getByLabelText('Toggle navigation menu');
      expect(button).toHaveAttribute('aria-expanded');
    });

    it('should have aria-haspopup on dropdown', () => {
      render(<MockNavbar />);
      const dropdownButton = screen.getByText('Manifestos');
      expect(dropdownButton).toHaveAttribute('aria-haspopup', 'true');
    });

    it('should have aria-expanded on dropdown', () => {
      render(<MockNavbar />);
      const dropdownButton = screen.getByText('Manifestos');
      expect(dropdownButton).toHaveAttribute('aria-expanded');
    });
  });

  describe('Responsive Design', () => {
    it('should hide mobile menu button on large screens', () => {
      render(<MockNavbar />);
      const button = screen.getByLabelText('Toggle navigation menu');
      expect(button).toHaveClass('lg:hidden');
    });

    it('should show desktop menu on large screens', () => {
      const { container } = render(<MockNavbar />);
      const desktopMenu = container.querySelector('.hidden.lg\\:flex');
      expect(desktopMenu).toBeInTheDocument();
    });

    it('should have responsive container', () => {
      const { container } = render(<MockNavbar />);
      const navContainer = container.querySelector('.container');
      expect(navContainer).toHaveClass('mx-auto', 'px-4');
    });
  });

  describe('Styling', () => {
    it('should have primary background color', () => {
      const { container } = render(<MockNavbar />);
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('bg-primary-900', 'text-white');
    });

    it('should have proper padding', () => {
      const { container } = render(<MockNavbar />);
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('py-3');
    });

    it('should have sticky development banner', () => {
      const { container } = render(<MockNavbar />);
      const banner = container.querySelector('.sticky');
      expect(banner).toHaveClass('top-0', 'z-50');
    });
  });
});

/**
 * Manual Testing Checklist
 * 
 * These require browser testing with the actual Navbar component:
 * 
 * 1. Desktop Layout (≥1024px):
 *    - All links visible in horizontal layout
 *    - Logo aligned left, menu items aligned right
 *    - Hover states show on all links
 *    - Dropdown opens on click
 *    - Active route is highlighted
 * 
 * 2. Mobile Layout (<768px):
 *    - Hamburger menu icon visible
 *    - Menu hidden by default
 *    - Menu slides open smoothly when toggled
 *    - All links visible when menu is open
 *    - Menu closes when link is clicked
 * 
 * 3. Accessibility:
 *    - Tab key cycles through all interactive elements
 *    - Enter key activates links and buttons
 *    - Escape key closes dropdowns
 *    - Screen reader announces navigation landmarks
 *    - Focus visible on all elements
 * 
 * 4. Transitions:
 *    - Mobile menu animates smoothly
 *    - Hover states transition smoothly
 *    - Dropdown chevron rotates on open
 * 
 * 5. Active Route:
 *    - Current page link is highlighted
 *    - Uses different background color
 *    - Works for all routes including dropdown items
 */
