import React from 'react';

export type BadgeVariant = 'completed' | 'in-progress' | 'delayed' | 'failed' | 'verified' | 'default';

export interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  icon,
  className = '',
  ...rest
}) => {
  // Base styles - always applied
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-caption font-semibold whitespace-nowrap';

  // Variant styles - color-coded backgrounds and text
  const variantStyles: Record<BadgeVariant, string> = {
    completed: 'bg-status-completed/10 text-status-completed border border-status-completed/20',
    'in-progress': 'bg-status-in-progress/10 text-status-in-progress border border-status-in-progress/20',
    delayed: 'bg-status-delayed/10 text-status-delayed border border-status-delayed/20',
    failed: 'bg-status-failed/10 text-status-failed border border-status-failed/20',
    verified: 'bg-status-verified/10 text-status-verified border border-status-verified/20',
    default: 'bg-gray-100 text-gray-700 border border-gray-200'
  };

  // Combine all styles
  const badgeClasses = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  return (
    <span className={badgeClasses} {...rest}>
      {icon && <span className="inline-flex" aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
