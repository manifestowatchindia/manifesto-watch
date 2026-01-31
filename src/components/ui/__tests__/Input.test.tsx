import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../Input';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(<Input value="Test value" onChange={() => {}} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Test value');
    });

    it('renders with custom type', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });
  });

  describe('Label', () => {
    it('displays label when provided', () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('does not display label when not provided', () => {
      const { container } = render(<Input />);
      const label = container.querySelector('label');
      expect(label).not.toBeInTheDocument();
    });

    it('associates label with input via htmlFor and id', () => {
      render(<Input label="Email" id="email-input" />);
      const label = screen.getByText('Email');
      const input = screen.getByLabelText('Email');
      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('generates unique id when not provided', () => {
      render(<Input label="Test" />);
      const input = screen.getByLabelText('Test');
      expect(input).toHaveAttribute('id');
      expect(input.id).toMatch(/^input-/);
    });
  });

  describe('Error State', () => {
    it('displays error message when error prop is provided', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error styles when error is present', () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    });

    it('has aria-invalid when error is present', () => {
      render(<Input error="Error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('has aria-describedby pointing to error message', () => {
      render(<Input error="Error message" id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
      
      const errorMessage = screen.getByText('Error message');
      expect(errorMessage).toHaveAttribute('id', 'test-input-error');
    });

    it('error message has role alert', () => {
      render(<Input error="Error" />);
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Error');
    });

    it('does not display error message when error is not provided', () => {
      const { container } = render(<Input />);
      const errorMessage = container.querySelector('[role="alert"]');
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled prop is true', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('applies disabled styles', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('bg-gray-100', 'text-gray-500', 'cursor-not-allowed', 'opacity-60');
    });

    it('does not apply disabled styles when not disabled', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('bg-white', 'hover:border-gray-400');
      expect(input).not.toHaveClass('bg-gray-100');
    });
  });

  describe('Focus State', () => {
    it('has focus ring classes', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-1');
    });

    it('has blue border on focus (brand-primary)', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('focus:border-brand-primary', 'focus:ring-brand-primary');
    });

    it('can receive focus', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe('Touch Target Size', () => {
    it('has minimum height of 44px', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('min-h-[44px]');
    });

    it('has proper padding', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('px-4', 'py-3');
    });
  });

  describe('Leading Icon Support', () => {
    it('renders with leading icon', () => {
      const icon = <span data-testid="leading-icon">🔍</span>;
      render(<Input leadingIcon={icon} />);
      expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    });

    it('adjusts padding when leading icon is present', () => {
      const icon = <span>🔍</span>;
      render(<Input leadingIcon={icon} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-11');
    });

    it('positions leading icon correctly', () => {
      const icon = <span data-testid="leading-icon">🔍</span>;
      const { container } = render(<Input leadingIcon={icon} />);
      const iconContainer = screen.getByTestId('leading-icon').parentElement;
      expect(iconContainer).toHaveClass('absolute', 'left-3', 'top-1/2', '-translate-y-1/2');
    });

    it('leading icon is not interactive', () => {
      const icon = <span data-testid="leading-icon">🔍</span>;
      const { container } = render(<Input leadingIcon={icon} />);
      const iconContainer = screen.getByTestId('leading-icon').parentElement;
      expect(iconContainer).toHaveClass('pointer-events-none');
    });
  });

  describe('Trailing Icon Support', () => {
    it('renders with trailing icon', () => {
      const icon = <span data-testid="trailing-icon">✓</span>;
      render(<Input trailingIcon={icon} />);
      expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
    });

    it('adjusts padding when trailing icon is present', () => {
      const icon = <span>✓</span>;
      render(<Input trailingIcon={icon} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pr-11');
    });

    it('positions trailing icon correctly', () => {
      const icon = <span data-testid="trailing-icon">✓</span>;
      const { container } = render(<Input trailingIcon={icon} />);
      const iconContainer = screen.getByTestId('trailing-icon').parentElement;
      expect(iconContainer).toHaveClass('absolute', 'right-3', 'top-1/2', '-translate-y-1/2');
    });

    it('trailing icon is not interactive', () => {
      const icon = <span data-testid="trailing-icon">✓</span>;
      const { container } = render(<Input trailingIcon={icon} />);
      const iconContainer = screen.getByTestId('trailing-icon').parentElement;
      expect(iconContainer).toHaveClass('pointer-events-none');
    });
  });

  describe('Both Icons', () => {
    it('renders with both leading and trailing icons', () => {
      const leadingIcon = <span data-testid="leading">🔍</span>;
      const trailingIcon = <span data-testid="trailing">✓</span>;
      render(<Input leadingIcon={leadingIcon} trailingIcon={trailingIcon} />);
      expect(screen.getByTestId('leading')).toBeInTheDocument();
      expect(screen.getByTestId('trailing')).toBeInTheDocument();
    });

    it('adjusts padding for both icons', () => {
      const leadingIcon = <span>🔍</span>;
      const trailingIcon = <span>✓</span>;
      render(<Input leadingIcon={leadingIcon} trailingIcon={trailingIcon} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-11', 'pr-11');
    });
  });

  describe('Event Handlers', () => {
    it('fires onChange event', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('fires onFocus event', () => {
      const handleFocus = jest.fn();
      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('fires onBlur event', () => {
      const handleBlur = jest.fn();
      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('ref can be used to focus input', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });

    it('preserves base classes with custom className', () => {
      render(<Input className="extra-margin" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('extra-margin', 'min-h-[44px]', 'rounded-lg');
    });

    it('spreads additional props', () => {
      render(<Input data-testid="custom-input" maxLength={10} />);
      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('maxLength', '10');
    });
  });

  describe('Styling', () => {
    it('has full width', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('w-full');
    });

    it('has rounded corners', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('rounded-lg');
    });

    it('has border', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border', 'border-gray-300');
    });

    it('has smooth transitions', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('transition-all', 'duration-200');
    });
  });

  describe('Real-world Use Cases', () => {
    it('works as email input', () => {
      render(<Input type="email" label="Email" placeholder="you@example.com" />);
      expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
      expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    });

    it('works as password input', () => {
      render(<Input type="password" label="Password" />);
      expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    });

    it('works as search input with icon', () => {
      const searchIcon = <span data-testid="search">🔍</span>;
      render(<Input type="search" placeholder="Search..." leadingIcon={searchIcon} />);
      expect(screen.getByTestId('search')).toBeInTheDocument();
    });

    it('works in form validation scenario', () => {
      const { rerender } = render(<Input label="Email" value="" onChange={() => {}} />);
      
      // Simulate validation failure
      rerender(<Input label="Email" value="" onChange={() => {}} error="Email is required" />);
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
