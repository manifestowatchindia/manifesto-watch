/**
 * ElectionCard Component
 * Compact card displaying election information with days remaining and key statistics
 */

import React from 'react';
import { Election } from '../../lib/types';
import { electionService } from '../../services/election/electionService';

interface ElectionCardProps {
  election: Election;
  onViewDetails?: (electionId: string) => void;
}

/**
 * ElectionCard Component
 * Displays election information in a card format with countdown badge
 */
export const ElectionCard: React.FC<ElectionCardProps> = ({
  election,
  onViewDetails,
}) => {
  const countdown = electionService.calculateCountdown(election.date);
  const urgencyLevel = electionService.getUrgencyLevel(election.date);
  
  // Calculate if election has passed
  const isPast = countdown.totalMilliseconds <= 0;
  
  // Format days remaining
  const daysRemaining = isPast 
    ? 'Concluded' 
    : countdown.days === 0 
      ? 'Today' 
      : countdown.days === 1 
        ? '1 Day' 
        : `${countdown.days} Days`;

  // Urgency badge colors
  const urgencyColors = {
    high: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
    medium: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
    low: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    past: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
  };

  // Urgency border colors for hover
  const urgencyBorders = {
    high: 'hover:border-red-300 hover:shadow-red-100',
    medium: 'hover:border-orange-300 hover:shadow-orange-100',
    low: 'hover:border-green-300 hover:shadow-green-100',
    past: 'hover:border-gray-300 hover:shadow-gray-100',
  };

  // Format numbers with Indian system
  const formatNumber = (num: number): string => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(2)} L`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Format election type display
  const formatElectionType = (type: string): string => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(election.id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleViewDetails();
    }
  };

  return (
    <div
      className={`
        relative bg-white rounded-xl border-2 border-gray-200 
        transition-all duration-300 ease-in-out
        ${urgencyBorders[urgencyLevel]}
        hover:shadow-lg hover:scale-[1.02]
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
        overflow-hidden
      `}
      role="article"
      aria-label={`${election.state} ${formatElectionType(election.electionType)} Election ${election.date}`}
    >
      {/* Days Remaining Badge */}
      <div
        className={`
          absolute top-4 right-4 px-4 py-2 rounded-full
          font-bold text-sm shadow-lg
          ${urgencyColors[urgencyLevel]}
        `}
        aria-label={`${daysRemaining} remaining`}
      >
        {isPast ? '✓' : '⏰'} {daysRemaining}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-4 pr-24">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {election.state}
          </h3>
          <p className="text-sm text-gray-600">
            {formatElectionType(election.electionType)} • {election.date}
          </p>
          {election.regionCode && (
            <p className="text-xs text-gray-500 mt-1">
              Region: {election.regionCode}
            </p>
          )}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {/* Constituencies */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Constituencies</span>
            <span className="text-lg font-bold text-gray-900">
              {election.constituencies}
            </span>
          </div>

          {/* Voters */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Voters</span>
            <span className="text-lg font-bold text-gray-900">
              {formatNumber(election.voters)}
            </span>
          </div>

          {/* Parties */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Parties</span>
            <span className="text-lg font-bold text-gray-900">
              {election.parties.length}
            </span>
          </div>

          {/* Manifestos */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Manifestos</span>
            <span className="text-lg font-bold text-blue-600">
              {election.manifestosReleased}
            </span>
          </div>

          {/* Promises */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Promises</span>
            <span className="text-lg font-bold text-green-600">
              {election.promisesTracked}
            </span>
          </div>

          {/* Verified Badge */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex items-center text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
              ✓ Verified
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleViewDetails}
          onKeyPress={handleKeyPress}
          className="
            w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
            py-3 px-6 rounded-lg transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            active:scale-[0.98]
          "
          aria-label={`View details for ${election.state} election`}
        >
          View Details →
        </button>
      </div>

      {/* Hover Accent Line */}
      <div
        className={`
          h-1 w-full transition-all duration-300
          ${urgencyLevel === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600' : ''}
          ${urgencyLevel === 'medium' ? 'bg-gradient-to-r from-orange-500 to-orange-600' : ''}
          ${urgencyLevel === 'low' ? 'bg-gradient-to-r from-green-500 to-green-600' : ''}
          ${urgencyLevel === 'past' ? 'bg-gradient-to-r from-gray-400 to-gray-500' : ''}
        `}
      />
    </div>
  );
};

export default ElectionCard;
