/**
 * CuratedPromiseCard Component
 * Compact promise card for homepage grid display
 * Shows title, party, status, and share button
 * 
 * STORY-057: Top Promises by Category Section
 */

import React from 'react';
import { Link } from 'react-router-dom';
import type { PromiseStatus } from '../../lib/types';

export interface CuratedPromise {
  id: string;
  title: string;
  summary?: string;
  partyId: string;
  partyName: string;
  partyLogoUrl?: string;
  partyColor?: string;
  status: PromiseStatus;
  impactScore?: number;
  lastUpdated?: string;
  shareCount?: number;
  categorySlug: string;
}

export interface CuratedPromiseCardProps {
  promise: CuratedPromise;
  onShare?: (promise: CuratedPromise) => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * Get status configuration (color, icon, label)
 */
const getStatusConfig = (status: PromiseStatus) => {
  const configs: Record<PromiseStatus, { icon: string; label: string; color: string; bgClass: string }> = {
    'Delivered': {
      icon: '✅',
      label: 'Delivered',
      color: 'var(--color-status-delivered)',
      bgClass: 'bg-[var(--color-status-delivered)]/20',
    },
    'Under implementation': {
      icon: '🔄',
      label: 'In Progress',
      color: 'var(--color-status-implementation)',
      bgClass: 'bg-[var(--color-status-implementation)]/20',
    },
    'Actioned': {
      icon: '🎯',
      label: 'Started',
      color: 'var(--color-status-actioned)',
      bgClass: 'bg-[var(--color-status-actioned)]/20',
    },
    'Announced': {
      icon: '⏳',
      label: 'Pending',
      color: 'var(--color-status-announced)',
      bgClass: 'bg-[var(--color-status-announced)]/20',
    },
    'Deferred': {
      icon: '❌',
      label: 'Deferred',
      color: 'var(--color-status-deferred)',
      bgClass: 'bg-[var(--color-status-deferred)]/20',
    },
  };
  return configs[status] || configs['Announced'];
};

/**
 * Get party color circle style
 */
const getPartyColorStyle = (color?: string) => {
  const defaultColors: Record<string, string> = {
    'BJP': '#FF9933',
    'INC': '#19AAED',
    'AAP': '#0066CC',
    'TMC': '#20C646',
    'DMK': '#E30613',
    'YSRCP': '#1569C7',
  };
  return color || defaultColors['BJP'] || 'var(--color-accent-primary)';
};

export const CuratedPromiseCard: React.FC<CuratedPromiseCardProps> = ({
  promise,
  onShare,
  className = '',
  'data-testid': dataTestId,
}) => {
  const statusConfig = getStatusConfig(promise.status);
  const partyColor = getPartyColorStyle(promise.partyColor);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onShare) {
      onShare(promise);
      return;
    }

    // Default share behavior
    if (navigator.share) {
      try {
        await navigator.share({
          title: promise.title,
          text: `Check out this promise: ${promise.title}`,
          url: `${window.location.origin}/promises/${promise.id}`,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/promises/${promise.id}`);
    }
  };

  return (
    <Link
      to={`/promises/${promise.id}`}
      className={`
        group block rounded-xl overflow-hidden
        bg-[var(--color-bg-card)] border border-[var(--color-border-default)]
        transition-all duration-300
        hover:border-[var(--color-border-accent)]
        hover:shadow-[var(--shadow-card-hover)]
        hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50
        ${className}
      `}
      data-testid={dataTestId || `promise-card-${promise.id}`}
    >
      {/* Top Accent Line */}
      <div 
        className="h-1 w-full"
        style={{ backgroundColor: partyColor }}
        aria-hidden="true"
      />

      <div className="p-4">
        {/* Title */}
        <h3 className="text-[var(--color-text-primary)] font-semibold text-sm leading-tight mb-3 line-clamp-2 min-h-[2.5rem]
                       group-hover:text-[var(--color-accent-tertiary)] transition-colors">
          {promise.title}
        </h3>

        {/* Summary (optional) */}
        {promise.summary && (
          <p className="text-[var(--color-text-muted)] text-xs line-clamp-2 mb-3">
            {promise.summary}
          </p>
        )}

        {/* Party Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span 
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: partyColor }}
            aria-hidden="true"
          />
          <span className="text-[var(--color-text-secondary)] text-xs font-medium">
            {promise.partyName}
          </span>
        </div>

        {/* Status & Share Row */}
        <div className="flex items-center justify-between">
          {/* Status Badge */}
          <span 
            className={`
              inline-flex items-center gap-1.5 px-2 py-1 rounded-lg
              text-xs font-medium ${statusConfig.bgClass}
            `}
            style={{ color: statusConfig.color }}
          >
            <span aria-hidden="true">{statusConfig.icon}</span>
            <span>{statusConfig.label}</span>
          </span>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-lg
                       text-[var(--color-text-muted)]
                       hover:bg-[var(--color-bg-elevated)]
                       hover:text-[var(--color-accent-tertiary)]
                       transition-all duration-200
                       opacity-0 group-hover:opacity-100
                       focus:opacity-100 focus:outline-none"
            aria-label={`Share ${promise.title}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        {/* Impact/Share Count (optional) */}
        {(promise.impactScore || promise.shareCount) && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[var(--color-border-light)]">
            {promise.impactScore && (
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <span aria-hidden="true">⭐</span>
                Impact: {promise.impactScore}/10
              </span>
            )}
            {promise.shareCount && (
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <span aria-hidden="true">📤</span>
                {promise.shareCount} shares
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CuratedPromiseCard;
