import React from 'react';
import { Skeleton } from './Skeleton';

export interface SkeletonListProps {
  items?: number;
  hasAvatar?: boolean;
  hasIcon?: boolean;
  className?: string;
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
  items = 5,
  hasAvatar = false,
  hasIcon = false,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`.trim()} data-testid="skeleton-list">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
          {/* Avatar or Icon */}
          {hasAvatar && (
            <Skeleton variant="circular" width={48} height={48} />
          )}
          {hasIcon && !hasAvatar && (
            <Skeleton variant="rectangular" width={24} height={24} />
          )}

          {/* Content */}
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="90%" />
          </div>

          {/* Trailing element */}
          <Skeleton variant="rectangular" width={60} height={24} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonList;
