import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, disabled, children, ...rest }, ref) => {
    // Generate ID if not provided (for label association)
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    // Base select styles
    const baseStyles = 'w-full min-h-[44px] px-4 py-3 pr-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 appearance-none';

    // State styles
    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-gray-900'
      : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary text-gray-900';

    // Disabled styles
    const disabledStyles = disabled
      ? 'bg-gray-100 text-gray-500 cursor-not-allowed opacity-60'
      : 'bg-white hover:border-gray-400';

    const selectClasses = `${baseStyles} ${stateStyles} ${disabledStyles} ${className}`.trim();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-body-sm font-medium text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${selectId}-error` : undefined}
            {...rest}
          >
            {children || options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Custom arrow icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className={`w-5 h-5 ${disabled ? 'text-gray-400' : 'text-gray-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-2 text-body-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
