import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from '../Badge';

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders correctly with children', () => {
      render(<Badge variant="default">Badge Text</Badge>);
      expect(screen.getByText('Badge Text')).toBeInTheDocument();
    });

    it('renders as span element', () => {
      const { container } = render(<Badge variant="default">Status</Badge>);
      const badge = container.firstChild;
      expect(badge?.nodeName).toBe('SPAN');
    });

    it('renders with required variant prop', () => {
      render(<Badge variant="completed">Completed</Badge>);
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders completed variant with correct colors', () => {
      const { container } = render(<Badge variant="completed">Completed</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-status-completed/10', 'text-status-completed', 'border-status-completed/20');
    });

    it('renders in-progress variant with correct colors', () => {
      const { container } = render(<Badge variant="in-progress">In Progress</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-status-in-progress/10', 'text-status-in-progress', 'border-status-in-progress/20');
    });

    it('renders delayed variant with correct colors', () => {
      const { container } = render(<Badge variant="delayed">Delayed</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-status-delayed/10', 'text-status-delayed', 'border-status-delayed/20');
    });

    it('renders failed variant with correct colors', () => {
      const { container } = render(<Badge variant="failed">Failed</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-status-failed/10', 'text-status-failed', 'border-status-failed/20');
    });

    it('renders verified variant with correct colors', () => {
      const { container } = render(<Badge variant="verified">Verified</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-status-verified/10', 'text-status-verified', 'border-status-verified/20');
    });

    it('renders default variant with correct colors', () => {
      const { container } = render(<Badge variant="default">Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-700', 'border-gray-200');
    });
  });

  describe('Styling', () => {
    it('has pill-shaped border radius', () => {
      const { container } = render(<Badge variant="default">Pill Shape</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('rounded-pill');
    });

    it('has small text size (12px)', () => {
      const { container } = render(<Badge variant="default">Small Text</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('text-caption');
    });

    it('has semi-bold font weight', () => {
      const { container } = render(<Badge variant="default">Semi-bold</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('font-semibold');
    });

    it('has proper padding', () => {
      const { container } = render(<Badge variant="default">Padded</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-3', 'py-1');
    });

    it('prevents text wrapping', () => {
      const { container } = render(<Badge variant="default">No Wrap Text</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('whitespace-nowrap');
    });

    it('displays as inline-flex', () => {
      const { container } = render(<Badge variant="default">Inline</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('inline-flex', 'items-center');
    });
  });

  describe('Icon Support', () => {
    it('renders with icon when provided', () => {
      const icon = <span data-testid="badge-icon">✓</span>;
      render(<Badge variant="completed" icon={icon}>Completed</Badge>);
      expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('renders without icon when not provided', () => {
      const { container } = render(<Badge variant="default">No Icon</Badge>);
      const badge = container.firstChild as HTMLElement;
      const iconSpan = badge.querySelector('[aria-hidden="true"]');
      expect(iconSpan).not.toBeInTheDocument();
    });

    it('icon has aria-hidden attribute', () => {
      const icon = <span data-testid="badge-icon">✓</span>;
      render(<Badge variant="verified" icon={icon}>Verified</Badge>);
      const iconWrapper = screen.getByTestId('badge-icon').parentElement;
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    });

    it('icon has correct spacing from text', () => {
      const icon = <span data-testid="badge-icon">✓</span>;
      const { container } = render(<Badge variant="completed" icon={icon}>Done</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('gap-1.5');
    });

    it('renders multiple badges with different icons independently', () => {
      render(
        <>
          <Badge variant="completed" icon={<span data-testid="check-icon">✓</span>}>
            Done
          </Badge>
          <Badge variant="failed" icon={<span data-testid="cross-icon">✗</span>}>
            Failed
          </Badge>
        </>
      );
      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
      expect(screen.getByTestId('cross-icon')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      const { container } = render(
        <Badge variant="default" className="custom-class">
          Custom
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('custom-class');
    });

    it('preserves base classes when custom className is added', () => {
      const { container } = render(
        <Badge variant="completed" className="extra-margin">
          Custom + Base
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('extra-margin');
      expect(badge).toHaveClass('rounded-pill', 'text-caption', 'font-semibold');
    });

    it('spreads additional props to the element', () => {
      const { container } = render(
        <Badge variant="default" data-testid="custom-badge" aria-label="Status badge">
          With Props
        </Badge>
      );
      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('aria-label', 'Status badge');
    });
  });

  describe('Color Contrast', () => {
    it('uses light background with darker text for readability', () => {
      const { container } = render(<Badge variant="completed">High Contrast</Badge>);
      const badge = container.firstChild as HTMLElement;
      // Background has /10 opacity, text is solid, border has /20 opacity
      expect(badge.className).toMatch(/bg-status-completed\/10/);
      expect(badge.className).toMatch(/text-status-completed(?!\/)/); // text without opacity
      expect(badge.className).toMatch(/border-status-completed\/20/);
    });
  });

  describe('Real-world Use Cases', () => {
    it('works as a promise status badge', () => {
      render(<Badge variant="in-progress">In Progress</Badge>);
      expect(screen.getByText('In Progress')).toBeInTheDocument();
    });

    it('works as a verification badge with icon', () => {
      render(
        <Badge variant="verified" icon={<span>✓</span>}>
          Verified
        </Badge>
      );
      expect(screen.getByText('Verified')).toBeInTheDocument();
    });

    it('works in a list of multiple statuses', () => {
      render(
        <div>
          <Badge variant="completed">45 Completed</Badge>
          <Badge variant="in-progress">23 In Progress</Badge>
          <Badge variant="delayed">8 Delayed</Badge>
          <Badge variant="failed">2 Failed</Badge>
        </div>
      );
      expect(screen.getByText('45 Completed')).toBeInTheDocument();
      expect(screen.getByText('23 In Progress')).toBeInTheDocument();
      expect(screen.getByText('8 Delayed')).toBeInTheDocument();
      expect(screen.getByText('2 Failed')).toBeInTheDocument();
    });

    it('works as a category tag', () => {
      render(<Badge variant="default">Healthcare</Badge>);
      expect(screen.getByText('Healthcare')).toBeInTheDocument();
    });

    it('works inline with text content', () => {
      render(
        <p>
          Promise status: <Badge variant="completed">Completed</Badge> on Dec 2025
        </p>
      );
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText(/Promise status:/)).toBeInTheDocument();
    });
  });

  describe('Multiple Badges', () => {
    it('renders multiple badges with different variants', () => {
      const { container } = render(
        <div>
          <Badge variant="completed">Done</Badge>
          <Badge variant="in-progress">Working</Badge>
          <Badge variant="delayed">Late</Badge>
        </div>
      );
      const badges = container.querySelectorAll('span.rounded-pill');
      expect(badges).toHaveLength(3);
    });

    it('maintains independent styling for each badge', () => {
      const { container } = render(
        <>
          <Badge variant="completed">Badge 1</Badge>
          <Badge variant="failed">Badge 2</Badge>
        </>
      );
      const badges = container.querySelectorAll('span.rounded-pill');
      expect(badges[0]).toHaveClass('text-status-completed');
      expect(badges[1]).toHaveClass('text-status-failed');
    });
  });

  describe('Accessibility', () => {
    it('renders semantic HTML', () => {
      const { container } = render(<Badge variant="completed">Accessible</Badge>);
      const badge = container.firstChild;
      expect(badge?.nodeName).toBe('SPAN');
    });

    it('allows custom aria attributes', () => {
      render(
        <Badge variant="completed" aria-label="Promise completed successfully">
          Done
        </Badge>
      );
      const badge = screen.getByLabelText('Promise completed successfully');
      expect(badge).toBeInTheDocument();
    });

    it('icon does not interfere with screen readers', () => {
      const icon = <span>✓</span>;
      render(<Badge variant="verified" icon={icon}>Verified by Officials</Badge>);
      // Icon wrapper should have aria-hidden
      const badge = screen.getByText('Verified by Officials').parentElement;
      const iconWrapper = badge?.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
    });
  });
});
