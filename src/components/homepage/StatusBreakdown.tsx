/**
 * StatusBreakdown Component
 * Displays promise status breakdown with counts and clickable items
 * Uses design system colors for each status
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import type { PromiseStatus } from '../../lib/types';

export interface StatusItem {
  status: PromiseStatus;
  count: number;
  label: string;
  icon: string;
  filterValue: string;  // URL query param value
}

export interface StatusBreakdownProps {
  stats: StatusItem[];
  total: number;
  shouldAnimate?: boolean;
  onStatusClick?: (status: PromiseStatus) => void;
  baseUrl?: string;  // Base URL for navigation (default: /promises)
  className?: string;
  'data-testid'?: string;
}

/**
 * Get CSS variable color for each status
 */
const getStatusColor = (status: PromiseStatus): string => {
  const colorMap: Record<PromiseStatus, string> = {
    'Delivered': 'var(--color-status-delivered)',
    'Under implementation': 'var(--color-status-implementation)',
    'Actioned': 'var(--color-status-actioned)',
    'Announced': 'var(--color-status-announced)',
    'Deferred': 'var(--color-status-deferred)',
  };
  return colorMap[status] || 'var(--color-text-muted)';
};

/**
 * Get status icon background class
 */
const getStatusBgClass = (status: PromiseStatus): string => {
  const bgMap: Record<PromiseStatus, string> = {
    'Delivered': 'bg-[var(--color-status-delivered)]/20',
    'Under implementation': 'bg-[var(--color-status-implementation)]/20',
    'Actioned': 'bg-[var(--color-status-actioned)]/20',
    'Announced': 'bg-[var(--color-status-announced)]/20',
    'Deferred': 'bg-[var(--color-status-deferred)]/20',
  };
  return bgMap[status] || 'bg-gray-500/20';
};

export const StatusBreakdown: React.FC<StatusBreakdownProps> = ({
  stats,
  total,
  shouldAnimate = true,
  onStatusClick,
  baseUrl = '/promises',
  className = '',
  'data-testid': dataTestId,
}) => {
  const handleClick = (status: PromiseStatus) => {
    if (onStatusClick) {
      onStatusClick(status);
    }
  };

  return (
    <div 
      className={`space-y-3 ${className}`}
      data-testid={dataTestId}
    >
      {/* Total Count Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border-light)] pb-3">
        <span className="text-[var(--color-text-secondary)] text-sm font-medium">
          Total Promises
        </span>
        <span className="text-[var(--color-text-primary)] text-xl font-bold">
          <AnimatedCounter 
            value={total} 
            shouldAnimate={shouldAnimate}
            data-testid="total-count"
          />
        </span>
      </div>

      {/* Status Items */}
      <ul className="space-y-2" aria-label="Promise status breakdown">
        {stats.map((item) => {
          const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
          const statusColor = getStatusColor(item.status);
          const bgClass = getStatusBgClass(item.status);
          
          return (
            <li key={item.status}>
              <Link
                to={`${baseUrl}?status=${item.filterValue}`}
                onClick={() => handleClick(item.status)}
                className={`
                  flex items-center justify-between p-2 rounded-lg
                  transition-all duration-200 group
                  hover:bg-[var(--color-bg-elevated)]
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50
                `}
                data-testid={`status-${item.filterValue}`}
                aria-label={`${item.label}: ${item.count} promises (${percentage}%)`}
              >
                <div className="flex items-center gap-3">
                  {/* Status Icon */}
                  <span 
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      text-lg ${bgClass}
                      group-hover:scale-110 transition-transform duration-200
                    `}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  
                  {/* Status Label */}
                  <span 
                    className="text-[var(--color-text-secondary)] text-sm font-medium
                               group-hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Count */}
                  <span 
                    className="text-[var(--color-text-primary)] font-bold tabular-nums"
                    style={{ color: statusColor }}
                  >
                    <AnimatedCounter 
                      value={item.count} 
                      shouldAnimate={shouldAnimate}
                    />
                  </span>
                  
                  {/* Percentage Badge */}
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ 
                      backgroundColor: `${statusColor}20`,
                      color: statusColor,
                    }}
                  >
                    {percentage}%
                  </span>
                  
                  {/* Arrow */}
                  <svg 
                    className="w-4 h-4 text-[var(--color-text-muted)] 
                               group-hover:text-[var(--color-accent-tertiary)]
                               group-hover:translate-x-1 transition-all duration-200"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatusBreakdown;
