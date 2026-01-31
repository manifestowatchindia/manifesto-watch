import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select } from '../Select';

describe('Select Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('renders all options', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
    });

    it('renders with default selected value', () => {
      render(<Select options={mockOptions} value="option2" onChange={() => {}} />);
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('option2');
    });

    it('renders with custom children instead of options', () => {
      render(
        <Select options={[]}>
          <option value="custom1">Custom 1</option>
          <option value="custom2">Custom 2</option>
        </Select>
      );
      expect(screen.getByRole('option', { name: 'Custom 1' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Custom 2' })).toBeInTheDocument();
    });
  });

  describe('Label', () => {
    it('displays label when provided', () => {
      render(<Select label="Country" options={mockOptions} />);
      expect(screen.getByLabelText('Country')).toBeInTheDocument();
      expect(screen.getByText('Country')).toBeInTheDocument();
    });

    it('does not display label when not provided', () => {
      const { container } = render(<Select options={mockOptions} />);
      const label = container.querySelector('label');
      expect(label).not.toBeInTheDocument();
    });

    it('associates label with select via htmlFor and id', () => {
      render(<Select label="State" id="state-select" options={mockOptions} />);
      const label = screen.getByText('State');
      const select = screen.getByLabelText('State');
      expect(label).toHaveAttribute('for', 'state-select');
      expect(select).toHaveAttribute('id', 'state-select');
    });

    it('generates unique id when not provided', () => {
      render(<Select label="Test" options={mockOptions} />);
      const select = screen.getByLabelText('Test');
      expect(select).toHaveAttribute('id');
      expect(select.id).toMatch(/^select-/);
    });
  });

  describe('Error State', () => {
    it('displays error message when error prop is provided', () => {
      render(<Select options={mockOptions} error="Please select an option" />);
      expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });

    it('applies error styles when error is present', () => {
      render(<Select options={mockOptions} error="Error message" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    });

    it('has aria-invalid when error is present', () => {
      render(<Select options={mockOptions} error="Error" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });

    it('has aria-describedby pointing to error message', () => {
      render(<Select options={mockOptions} error="Error message" id="test-select" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'test-select-error');
      
      const errorMessage = screen.getByText('Error message');
      expect(errorMessage).toHaveAttribute('id', 'test-select-error');
    });

    it('error message has role alert', () => {
      render(<Select options={mockOptions} error="Error" />);
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Error');
    });

    it('does not display error message when error is not provided', () => {
      const { container } = render(<Select options={mockOptions} />);
      const errorMessage = container.querySelector('[role="alert"]');
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables select when disabled prop is true', () => {
      render(<Select options={mockOptions} disabled />);
      const select = screen.getByRole('combobox');
      expect(select).toBeDisabled();
    });

    it('applies disabled styles', () => {
      render(<Select options={mockOptions} disabled />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('bg-gray-100', 'text-gray-500', 'cursor-not-allowed', 'opacity-60');
    });

    it('does not apply disabled styles when not disabled', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('bg-white', 'hover:border-gray-400');
      expect(select).not.toHaveClass('bg-gray-100');
    });

    it('changes arrow icon color when disabled', () => {
      const { container } = render(<Select options={mockOptions} disabled />);
      const arrowIcon = container.querySelector('svg');
      expect(arrowIcon).toHaveClass('text-gray-400');
    });
  });

  describe('Focus State', () => {
    it('has focus ring classes', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-1');
    });

    it('has blue border on focus (brand-primary)', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('focus:border-brand-primary', 'focus:ring-brand-primary');
    });

    it('can receive focus', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      select.focus();
      expect(select).toHaveFocus();
    });
  });

  describe('Touch Target Size', () => {
    it('has minimum height of 44px', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('min-h-[44px]');
    });

    it('has proper padding', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('px-4', 'py-3');
    });
  });

  describe('Custom Arrow Icon', () => {
    it('renders custom arrow icon', () => {
      const { container } = render(<Select options={mockOptions} />);
      const arrowIcon = container.querySelector('svg');
      expect(arrowIcon).toBeInTheDocument();
    });

    it('positions arrow icon correctly', () => {
      const { container } = render(<Select options={mockOptions} />);
      const arrowContainer = container.querySelector('svg')?.parentElement;
      expect(arrowContainer).toHaveClass('absolute', 'right-3', 'top-1/2', '-translate-y-1/2');
    });

    it('arrow icon is not interactive', () => {
      const { container } = render(<Select options={mockOptions} />);
      const arrowContainer = container.querySelector('svg')?.parentElement;
      expect(arrowContainer).toHaveClass('pointer-events-none');
    });

    it('arrow icon has correct size', () => {
      const { container } = render(<Select options={mockOptions} />);
      const arrowIcon = container.querySelector('svg');
      expect(arrowIcon).toHaveClass('w-5', 'h-5');
    });

    it('arrow icon has aria-hidden', () => {
      const { container } = render(<Select options={mockOptions} />);
      const arrowIcon = container.querySelector('svg');
      expect(arrowIcon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Event Handlers', () => {
    it('fires onChange event when selection changes', () => {
      const handleChange = jest.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'option2' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('fires onFocus event', () => {
      const handleFocus = jest.fn();
      render(<Select options={mockOptions} onFocus={handleFocus} />);
      const select = screen.getByRole('combobox');
      fireEvent.focus(select);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('fires onBlur event', () => {
      const handleBlur = jest.fn();
      render(<Select options={mockOptions} onBlur={handleBlur} />);
      const select = screen.getByRole('combobox');
      fireEvent.blur(select);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to select element', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<Select ref={ref} options={mockOptions} />);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it('ref can be used to focus select', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<Select ref={ref} options={mockOptions} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Select options={mockOptions} className="custom-class" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('custom-class');
    });

    it('preserves base classes with custom className', () => {
      render(<Select options={mockOptions} className="extra-margin" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('extra-margin', 'min-h-[44px]', 'rounded-lg');
    });

    it('spreads additional props', () => {
      render(<Select options={mockOptions} data-testid="custom-select" name="category" />);
      const select = screen.getByTestId('custom-select');
      expect(select).toHaveAttribute('name', 'category');
    });
  });

  describe('Styling', () => {
    it('has full width', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('w-full');
    });

    it('has rounded corners', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('rounded-lg');
    });

    it('has border', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border', 'border-gray-300');
    });

    it('has smooth transitions', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('transition-all', 'duration-200');
    });

    it('has appearance-none to hide default arrow', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('appearance-none');
    });

    it('has extra right padding for custom arrow', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('pr-10');
    });
  });

  describe('Real-world Use Cases', () => {
    it('works as state selector', () => {
      const states = [
        { value: 'kerala', label: 'Kerala' },
        { value: 'karnataka', label: 'Karnataka' },
        { value: 'tamil-nadu', label: 'Tamil Nadu' },
      ];
      render(<Select label="Select State" options={states} />);
      expect(screen.getByLabelText('Select State')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Kerala' })).toBeInTheDocument();
    });

    it('works as category filter', () => {
      const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'education', label: 'Education' },
      ];
      render(<Select label="Filter by Category" options={categories} defaultValue="all" />);
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('all');
    });

    it('works in form validation scenario', () => {
      const { rerender } = render(
        <Select label="Category" options={mockOptions} value="" onChange={() => {}} />
      );
      
      // Simulate validation failure
      rerender(
        <Select 
          label="Category" 
          options={mockOptions} 
          value="" 
          onChange={() => {}} 
          error="Please select a category" 
        />
      );
      expect(screen.getByText('Please select a category')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('works with empty placeholder option', () => {
      render(
        <Select label="Choose an option" options={mockOptions}>
          <option value="">-- Select --</option>
          {mockOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Select>
      );
      expect(screen.getByRole('option', { name: '-- Select --' })).toBeInTheDocument();
    });
  });

  describe('Options Format', () => {
    it('handles options with special characters in labels', () => {
      const specialOptions = [
        { value: 'opt1', label: 'Option & Special' },
        { value: 'opt2', label: 'Option < Greater' },
      ];
      render(<Select options={specialOptions} />);
      expect(screen.getByRole('option', { name: 'Option & Special' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Option < Greater' })).toBeInTheDocument();
    });

    it('handles empty options array', () => {
      render(<Select options={[]} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
      const options = screen.queryAllByRole('option');
      expect(options).toHaveLength(0);
    });
  });
});
