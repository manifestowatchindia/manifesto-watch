/**
 * Enhanced PromiseCard Component
 * Displays detailed promise information with metrics, status, and actions
 */

import React from 'react';

interface Party {
  id: string;
  name: string;
  logo?: string;
  color?: string;
}

interface PromiseMetrics {
  budget?: string;
  timeline?: string;
  scope?: string;
  beneficiaries?: string;
}

interface PromiseProgress {
  percentage: number;
  status: 'completed' | 'in-progress' | 'delayed' | 'not-started' | 'partially-completed';
  lastUpdated?: string;
  startDate?: string;
}

export interface Promise {
  id: string;
  title: string;
  description: string;
  party: Party;
  category: string;
  subcategory?: string;
  verified: boolean;
  verificationSource?: string;
  metrics?: PromiseMetrics;
  progress?: PromiseProgress;
  tags?: string[];
}

export interface PromiseCardProps {
  promise: Promise;
  onViewDetails?: (promiseId: string) => void;
  onAddToWatchlist?: (promiseId: string) => void;
  isInWatchlist?: boolean;
  variant?: 'default' | 'compact';
}

/**
 * PromiseCard Component
 * Displays comprehensive promise information in a card layout
 */
export const PromiseCard: React.FC<PromiseCardProps> = ({
  promise,
  onViewDetails,
  onAddToWatchlist,
  isInWatchlist = false,
  variant = 'default',
}) => {
  const {
    id,
    title,
    description,
    party,
    category,
    subcategory,
    verified,
    verificationSource,
    metrics,
    progress,
    tags,
  } = promise;

  // Status configuration
  const statusConfig = {
    completed: {
      label: 'Completed',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: '✅',
      progressColor: 'bg-green-500',
    },
    'in-progress': {
      label: 'In Progress',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: '🔄',
      progressColor: 'bg-blue-500',
    },
    delayed: {
      label: 'Delayed',
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: '⏸️',
      progressColor: 'bg-orange-500',
    },
    'not-started': {
      label: 'Not Started',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: '⏹️',
      progressColor: 'bg-gray-400',
    },
    'partially-completed': {
      label: 'Partially Completed',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: '⚡',
      progressColor: 'bg-yellow-500',
    },
  };

  const currentStatus = progress?.status || 'not-started';
  const statusInfo = statusConfig[currentStatus];

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    }
  };

  const handleAddToWatchlist = () => {
    if (onAddToWatchlist) {
      onAddToWatchlist(id);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    handler: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handler();
    }
  };

  if (variant === 'compact') {
    return (
      <div
        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300"
        role="article"
        aria-label={`Promise: ${title}`}
      >
        {/* Compact Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* Party Logo */}
          {party.logo ? (
            <img
              src={party.logo}
              alt={`${party.name} logo`}
              className="w-10 h-10 rounded object-contain"
            />
          ) : (
            <div
              className="w-10 h-10 rounded flex items-center justify-center text-xs font-semibold text-white"
              style={{ backgroundColor: party.color || '#6B7280' }}
            >
              {party.name.substring(0, 2).toUpperCase()}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-700">{party.name}</span>
              {verified && (
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                  title={verificationSource || 'Verified'}
                >
                  ✓ Verified
                </span>
              )}
            </div>
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
              {title}
            </h3>
          </div>
        </div>

        {/* Compact Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleViewDetails}
            onKeyDown={(e) => handleKeyDown(e, handleViewDetails)}
            className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            aria-label={`View details for ${title}`}
          >
            View Details
          </button>
          {onAddToWatchlist && (
            <button
              onClick={handleAddToWatchlist}
              onKeyDown={(e) => handleKeyDown(e, handleAddToWatchlist)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isInWatchlist
                  ? 'text-gray-600 bg-gray-100'
                  : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
              }`}
              aria-label={
                isInWatchlist
                  ? `Remove ${title} from watchlist`
                  : `Add ${title} to watchlist`
              }
              aria-pressed={isInWatchlist}
            >
              {isInWatchlist ? '★' : '☆'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Default (full) variant
  return (
    <div
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
      role="article"
      aria-label={`Promise: ${title}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start gap-4">
          {/* Party Logo */}
          {party.logo ? (
            <img
              src={party.logo}
              alt={`${party.name} logo`}
              className="w-16 h-16 rounded object-contain flex-shrink-0"
            />
          ) : (
            <div
              className="w-16 h-16 rounded flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
              style={{ backgroundColor: party.color || '#6B7280' }}
            >
              {party.name.substring(0, 2).toUpperCase()}
            </div>
          )}

          <div className="flex-1 min-w-0">
            {/* Party Name and Category */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">{party.name}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  {category}
                  {subcategory && ` > ${subcategory}`}
                </span>
              </div>
              {verified && (
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                  title={verificationSource || 'Verified from official manifesto'}
                >
                  ✓ Verified
                </span>
              )}
            </div>

            {/* Promise Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 border-b border-gray-200">
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
            Key Metrics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.budget && (
              <div>
                <div className="text-xs text-gray-600 mb-1">💰 Budget</div>
                <div className="text-base font-semibold text-gray-900">{metrics.budget}</div>
              </div>
            )}
            {metrics.timeline && (
              <div>
                <div className="text-xs text-gray-600 mb-1">⏱️ Timeline</div>
                <div className="text-base font-semibold text-gray-900">{metrics.timeline}</div>
              </div>
            )}
            {metrics.scope && (
              <div>
                <div className="text-xs text-gray-600 mb-1">📍 Scope</div>
                <div className="text-base font-semibold text-gray-900">{metrics.scope}</div>
              </div>
            )}
            {metrics.beneficiaries && (
              <div>
                <div className="text-xs text-gray-600 mb-1">👥 Beneficiaries</div>
                <div className="text-base font-semibold text-gray-900">
                  {metrics.beneficiaries}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Progress Section */}
      {progress && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Progress Tracking
            </h4>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}
            >
              {statusInfo.icon} {statusInfo.label}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Completion</span>
              <span className="text-sm font-bold text-gray-900">{progress.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${statusInfo.progressColor} transition-all duration-500 ease-out rounded-full`}
                style={{ width: `${progress.percentage}%` }}
                role="progressbar"
                aria-valuenow={progress.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${progress.percentage}% complete`}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            {progress.startDate && (
              <div>
                <span className="font-medium">Started:</span> {progress.startDate}
              </div>
            )}
            {progress.lastUpdated && (
              <div>
                <span className="font-medium">Last Updated:</span> {progress.lastUpdated}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-6 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleViewDetails}
            onKeyDown={(e) => handleKeyDown(e, handleViewDetails)}
            className="flex-1 px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`View detailed information for ${title}`}
          >
            View Detailed Report
          </button>
          {onAddToWatchlist && (
            <button
              onClick={handleAddToWatchlist}
              onKeyDown={(e) => handleKeyDown(e, handleAddToWatchlist)}
              className={`px-6 py-3 text-base font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] ${
                isInWatchlist
                  ? 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-500'
                  : 'text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50 focus:ring-blue-500'
              }`}
              aria-label={
                isInWatchlist
                  ? `Remove ${title} from watchlist`
                  : `Add ${title} to watchlist`
              }
              aria-pressed={isInWatchlist}
            >
              {isInWatchlist ? '★ In Watchlist' : '☆ Add to Watchlist'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromiseCard;
