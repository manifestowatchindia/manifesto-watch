/**
 * LiveTrackerWidget Component
 * Real-time promise tracking widget with circular progress ring
 * Displays overall promise delivery stats with animated counters
 * 
 * STORY-055: Live Promise Tracker Widget
 */

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProgressRing } from '../ui/ProgressRing';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { StatusBreakdown, type StatusItem } from './StatusBreakdown';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import type { PromiseStatus } from '../../lib/types';

/**
 * Promise statistics interface
 */
export interface PromiseStats {
  total: number;
  delivered: number;
  inProgress: number;      // Under implementation
  actioned: number;        // Started/Actioned
  notStarted: number;      // Announced
  deferred: number;        // Deferred/Broken
  deliveryRate: number;    // Percentage
  lastUpdated: string;     // ISO date string
  trend: 'up' | 'down' | 'stable';
  trendValue?: number;     // Percentage change
  comparisonPeriod?: {
    label: string;
    deliveryRate: number;
  };
}

export interface LiveTrackerWidgetProps {
  stats: PromiseStats;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  error?: string | null;
  onStatusClick?: (status: PromiseStatus) => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * Format relative time for "last updated"
 */
const formatLastUpdated = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  } catch {
    return 'Recently';
  }
};

/**
 * Get trend indicator icon and color
 */
const getTrendIndicator = (trend: 'up' | 'down' | 'stable', value?: number) => {
  const config = {
    up: {
      icon: '📈',
      color: 'var(--color-status-delivered)',
      prefix: '+',
    },
    down: {
      icon: '📉',
      color: 'var(--color-status-deferred)',
      prefix: '-',
    },
    stable: {
      icon: '➡️',
      color: 'var(--color-text-muted)',
      prefix: '',
    },
  };
  
  return { ...config[trend], value };
};

/**
 * Loading skeleton for widget
 */
const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse" role="status" aria-label="Loading promise statistics">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      {/* Progress Ring Skeleton */}
      <div className="w-[180px] h-[180px] rounded-full bg-[var(--color-bg-elevated)]" />
      
      {/* Stats Skeleton */}
      <div className="flex-1 w-full space-y-4">
        <div className="h-4 bg-[var(--color-bg-elevated)] rounded w-24" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-[var(--color-bg-elevated)] rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * Error state display
 */
const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div 
    className="flex items-center justify-center p-8 rounded-xl bg-[var(--color-status-deferred)]/10 border border-[var(--color-status-deferred)]/30"
    role="alert"
  >
    <div className="text-center">
      <span className="text-4xl mb-3 block" aria-hidden="true">⚠️</span>
      <p className="text-[var(--color-status-deferred)] font-medium">{message}</p>
      <p className="text-[var(--color-text-muted)] text-sm mt-1">Please try again later</p>
    </div>
  </div>
);

export const LiveTrackerWidget: React.FC<LiveTrackerWidgetProps> = ({
  stats,
  title = 'BJP 2024 Promise Tracker',
  subtitle = 'Lok Sabha Manifesto',
  isLoading = false,
  error = null,
  onStatusClick,
  className = '',
  'data-testid': dataTestId = 'live-tracker-widget',
}) => {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.2 });
  const [isExpanded, setIsExpanded] = useState(true);

  // Build status breakdown items
  const statusItems: StatusItem[] = useMemo(() => [
    {
      status: 'Delivered' as PromiseStatus,
      count: stats.delivered,
      label: 'Delivered',
      icon: '✅',
      filterValue: 'delivered',
    },
    {
      status: 'Under implementation' as PromiseStatus,
      count: stats.inProgress,
      label: 'In Progress',
      icon: '🔄',
      filterValue: 'under-implementation',
    },
    {
      status: 'Actioned' as PromiseStatus,
      count: stats.actioned,
      label: 'Started',
      icon: '🎯',
      filterValue: 'actioned',
    },
    {
      status: 'Announced' as PromiseStatus,
      count: stats.notStarted,
      label: 'Not Started',
      icon: '⏳',
      filterValue: 'announced',
    },
    {
      status: 'Deferred' as PromiseStatus,
      count: stats.deferred,
      label: 'Deferred',
      icon: '❌',
      filterValue: 'deferred',
    },
  ], [stats]);

  const trendInfo = getTrendIndicator(stats.trend, stats.trendValue);
  const lastUpdatedText = formatLastUpdated(stats.lastUpdated);

  return (
    <section
      ref={ref}
      className={`
        relative overflow-hidden rounded-2xl
        bg-[var(--color-bg-card)] border border-[var(--color-border-default)]
        shadow-[var(--shadow-card)]
        transition-all duration-300
        hover:shadow-[var(--shadow-card-hover)]
        hover:border-[var(--color-border-accent)]
        ${className}
      `}
      data-testid={dataTestId}
      aria-labelledby="tracker-title"
    >
      {/* Decorative Gradient Accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'var(--gradient-primary)' }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="p-6 pb-4 border-b border-[var(--color-border-light)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span 
              className="text-2xl"
              aria-hidden="true"
            >
              🏛️
            </span>
            <div>
              <h2 
                id="tracker-title"
                className="text-lg font-bold text-[var(--color-text-primary)]"
              >
                {title}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                {subtitle}
              </p>
            </div>
          </div>
          
          {/* Mobile Expand/Collapse Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-[var(--color-bg-elevated)] 
                       hover:bg-[var(--color-bg-secondary)] transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <svg 
              className={`w-5 h-5 text-[var(--color-text-secondary)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${!isExpanded ? 'hidden md:block' : ''}`}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Progress Ring Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <ProgressRing
                  percentage={isInView ? stats.deliveryRate : 0}
                  size={180}
                  strokeWidth={12}
                  label="Delivered"
                  className="drop-shadow-lg"
                />
                
                {/* Decorative Glow */}
                <div 
                  className="absolute inset-0 rounded-full opacity-20 blur-xl"
                  style={{ 
                    background: stats.deliveryRate >= 50 
                      ? 'var(--color-status-delivered)' 
                      : stats.deliveryRate >= 30 
                        ? 'var(--color-status-actioned)'
                        : 'var(--color-status-deferred)'
                  }}
                  aria-hidden="true"
                />
              </div>
              
              {/* Delivery Rate Label */}
              <div className="mt-4 text-center">
                <p className="text-[var(--color-text-muted)] text-sm">
                  Delivery Rate
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: 'var(--color-status-delivered)' }}>
                  <AnimatedCounter 
                    value={stats.deliveryRate} 
                    suffix="%"
                    decimals={1}
                    shouldAnimate={isInView}
                    data-testid="delivery-rate"
                  />
                </p>
              </div>
            </div>

            {/* Status Breakdown Section */}
            <div className="flex-1 w-full">
              <StatusBreakdown
                stats={statusItems}
                total={stats.total}
                shouldAnimate={isInView}
                onStatusClick={onStatusClick}
                data-testid="status-breakdown"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {!isLoading && !error && (
        <div className="px-6 py-4 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-light)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Trend & Last Updated */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {/* Trend Indicator */}
              {stats.trendValue !== undefined && stats.trendValue !== 0 && (
                <div 
                  className="flex items-center gap-1.5"
                  style={{ color: trendInfo.color }}
                >
                  <span aria-hidden="true">{trendInfo.icon}</span>
                  <span className="font-medium">
                    {trendInfo.prefix}{Math.abs(stats.trendValue)}% vs last quarter
                  </span>
                </div>
              )}
              
              {/* Comparison Period */}
              {stats.comparisonPeriod && (
                <div className="text-[var(--color-text-muted)]">
                  <span>vs {stats.comparisonPeriod.label}: </span>
                  <span 
                    className="font-medium"
                    style={{ 
                      color: stats.deliveryRate > stats.comparisonPeriod.deliveryRate 
                        ? 'var(--color-status-delivered)' 
                        : 'var(--color-status-deferred)'
                    }}
                  >
                    {stats.comparisonPeriod.deliveryRate}%
                  </span>
                </div>
              )}
              
              {/* Last Updated */}
              <div className="text-[var(--color-text-muted)] flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Updated {lastUpdatedText}</span>
              </div>
            </div>

            {/* View All Button */}
            <Link
              to="/promises"
              className="
                inline-flex items-center gap-2 px-4 py-2 rounded-lg
                font-medium text-sm
                bg-[var(--color-accent-tertiary)] text-[var(--color-bg-primary)]
                hover:brightness-110 active:brightness-90
                transition-all duration-200
                shadow-[var(--shadow-teal)]
                hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-tertiary)]/50
              "
              data-testid="view-all-link"
            >
              View All Promises
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default LiveTrackerWidget;
