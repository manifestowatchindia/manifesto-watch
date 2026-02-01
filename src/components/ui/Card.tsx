import React from 'react';

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outline';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  children,
  className = '',
  onClick,
  ...rest
}) => {
  // Base styles - always applied
  const baseStyles = 'rounded-card transition-all duration-200';

  // Variant styles
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-md',
    outline: 'bg-transparent border-2 border-gray-300'
  };

  // Padding styles
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  // Hover effect - enhanced shadow and slight lift
  const hoverStyles = hover
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
    : '';

  // Interactive styles if onClick is provided
  const interactiveStyles = onClick
    ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2'
    : '';

  // Combine all styles
  const cardClasses = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${interactiveStyles} ${className}`.trim();

  // Use div or button semantics based on interactivity
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={cardClasses}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Card;
