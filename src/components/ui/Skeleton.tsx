import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'text',
  animation = 'wave',
  className = '',
  ...rest
}) => {
  // Convert width/height to style object
  const style: React.CSSProperties = {};
  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  // Base styles
  const baseClasses = 'bg-gray-200';

  // Variant styles
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  // Animation styles
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]',
    none: '',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`.trim();

  return (
    <div
      className={classes}
      style={style}
      data-testid="skeleton"
      aria-busy="true"
      aria-live="polite"
      {...rest}
    />
  );
};

export default Skeleton;
