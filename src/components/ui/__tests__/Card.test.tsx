import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '../Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders correctly with children', () => {
      render(
        <Card>
          <p>Card content</p>
        </Card>
      );
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders as div by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild;
      expect(card?.nodeName).toBe('DIV');
    });

    it('renders as button when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Clickable Card</Card>);
      const card = screen.getByRole('button');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant with correct styles', () => {
      const { container } = render(<Card variant="default">Default</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white', 'border', 'border-gray-200');
    });

    it('renders elevated variant with shadow', () => {
      const { container } = render(<Card variant="elevated">Elevated</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white', 'shadow-md');
    });

    it('renders outline variant with border', () => {
      const { container } = render(<Card variant="outline">Outline</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-transparent', 'border-2', 'border-gray-300');
    });

    it('applies default variant when variant prop is omitted', () => {
      const { container } = render(<Card>No variant specified</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white', 'border', 'border-gray-200');
    });
  });

  describe('Padding Sizes', () => {
    it('renders small padding with correct styles', () => {
      const { container } = render(<Card padding="sm">Small padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-4');
    });

    it('renders medium padding with correct styles', () => {
      const { container } = render(<Card padding="md">Medium padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-6');
    });

    it('renders large padding with correct styles', () => {
      const { container } = render(<Card padding="lg">Large padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-8');
    });

    it('applies medium padding by default', () => {
      const { container } = render(<Card>Default padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-6');
    });
  });

  describe('Border Radius', () => {
    it('has rounded-card class for 12px border radius', () => {
      const { container } = render(<Card>Rounded card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('rounded-card');
    });
  });

  describe('Hover Effect', () => {
    it('applies hover styles when hover prop is true', () => {
      const { container } = render(<Card hover>Hover me</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('hover:shadow-lg', 'hover:-translate-y-1', 'cursor-pointer');
    });

    it('does not apply hover styles when hover prop is false', () => {
      const { container } = render(<Card hover={false}>No hover</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('hover:shadow-lg');
      expect(card).not.toHaveClass('hover:-translate-y-1');
      expect(card).not.toHaveClass('cursor-pointer');
    });

    it('does not apply hover styles by default', () => {
      const { container } = render(<Card>Default - no hover</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('hover:shadow-lg');
    });
  });

  describe('Transitions', () => {
    it('has transition classes for smooth animations', () => {
      const { container } = render(<Card>Transition test</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('transition-all', 'duration-200');
    });
  });

  describe('Interactive Behavior', () => {
    it('fires onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Click me</Card>);
      const card = screen.getByRole('button');
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies interactive styles when onClick is provided', () => {
      const handleClick = jest.fn();
      const { container } = render(<Card onClick={handleClick}>Interactive</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('cursor-pointer', 'focus:outline-none', 'focus:ring-2', 'focus:ring-brand-primary');
    });

    it('does not apply interactive styles when onClick is not provided', () => {
      const { container } = render(<Card>Not interactive</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('focus:ring-2');
    });

    it('renders with button type when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Button card</Card>);
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('type', 'button');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      const { container } = render(<Card className="custom-class">Custom</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });

    it('preserves all default classes when custom className is added', () => {
      const { container } = render(
        <Card className="custom-class" variant="elevated" padding="lg">
          Custom with defaults
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('shadow-md');
      expect(card).toHaveClass('p-8');
      expect(card).toHaveClass('rounded-card');
    });

    it('spreads additional props to the element', () => {
      const { container } = render(
        <Card data-testid="custom-card" aria-label="Custom card">
          With extra props
        </Card>
      );
      const card = screen.getByTestId('custom-card');
      expect(card).toHaveAttribute('aria-label', 'Custom card');
    });
  });

  describe('Variant and Hover Combinations', () => {
    it('combines elevated variant with hover effect', () => {
      const { container } = render(
        <Card variant="elevated" hover>
          Elevated with hover
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('shadow-md', 'hover:shadow-lg', 'hover:-translate-y-1');
    });

    it('combines outline variant with hover effect', () => {
      const { container } = render(
        <Card variant="outline" hover>
          Outline with hover
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('border-2', 'border-gray-300', 'hover:shadow-lg');
    });
  });

  describe('Complex Content', () => {
    it('renders complex nested content', () => {
      render(
        <Card>
          <h2>Card Title</h2>
          <p>Card description</p>
          <button>Action</button>
        </Card>
      );
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('renders multiple cards independently', () => {
      render(
        <div>
          <Card variant="default">Card 1</Card>
          <Card variant="elevated">Card 2</Card>
          <Card variant="outline">Card 3</Card>
        </div>
      );
      expect(screen.getByText('Card 1')).toBeInTheDocument();
      expect(screen.getByText('Card 2')).toBeInTheDocument();
      expect(screen.getByText('Card 3')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('maintains responsive classes', () => {
      const { container } = render(
        <Card className="md:p-8 lg:p-10">
          Responsive padding
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('md:p-8', 'lg:p-10');
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible when interactive', () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Press Enter</Card>);
      const card = screen.getByRole('button');
      card.focus();
      expect(card).toHaveFocus();
    });

    it('has focus ring for keyboard navigation when interactive', () => {
      const handleClick = jest.fn();
      const { container } = render(<Card onClick={handleClick}>Keyboard nav</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('focus:ring-2', 'focus:ring-brand-primary');
    });
  });

  describe('Real-world Use Cases', () => {
    it('works as a promise card container', () => {
      render(
        <Card variant="elevated" padding="lg" hover>
          <h3>Promise Title</h3>
          <p>Promise description goes here</p>
          <span>Status: In Progress</span>
        </Card>
      );
      expect(screen.getByText('Promise Title')).toBeInTheDocument();
      expect(screen.getByText('Promise description goes here')).toBeInTheDocument();
      expect(screen.getByText('Status: In Progress')).toBeInTheDocument();
    });

    it('works as a clickable election card', () => {
      const handleClick = jest.fn();
      render(
        <Card variant="default" hover onClick={handleClick}>
          <h3>2024 Kerala Assembly Election</h3>
          <p>Days remaining: 45</p>
        </Card>
      );
      const card = screen.getByRole('button');
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalled();
      expect(screen.getByText('2024 Kerala Assembly Election')).toBeInTheDocument();
    });
  });
});
