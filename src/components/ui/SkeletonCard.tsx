import React from 'react';
import { Skeleton } from './Skeleton';
import { SkeletonText } from './SkeletonText';

export interface SkeletonCardProps {
  hasImage?: boolean;
  imageHeight?: string | number;
  hasAvatar?: boolean;
  titleLines?: number;
  bodyLines?: number;
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  hasImage = true,
  imageHeight = 200,
  hasAvatar = false,
  titleLines = 1,
  bodyLines = 3,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-card shadow-sm border border-gray-200 overflow-hidden ${className}`.trim()} data-testid="skeleton-card">
      {/* Image */}
      {hasImage && (
        <Skeleton variant="rectangular" height={imageHeight} className="rounded-none" />
      )}

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Avatar + Title */}
        {hasAvatar && (
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1">
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
        )}

        {/* Title */}
        {!hasAvatar && titleLines > 0 && (
          <SkeletonText lines={titleLines} lastLineWidth="60%" />
        )}

        {/* Body */}
        {bodyLines > 0 && (
          <SkeletonText lines={bodyLines} lastLineWidth="75%" />
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width={80} height={36} />
          <Skeleton variant="rectangular" width={80} height={36} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
