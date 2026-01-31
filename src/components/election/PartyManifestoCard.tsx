import React from 'react';

/**
 * Party Manifesto Card Component
 * 
 * Displays a party's manifesto information including release status,
 * key promises, and action buttons
 * 
 * @example
 * <PartyManifestoCard
 *   party="LDF (CPM-led)"
 *   logo="/logos/ldf.png"
 *   releaseStatus="released"
 *   keyPromises={['100K jobs', '₹2000 pension', 'Free rice']}
 *   documentUrl="/manifestos/ldf-2026.pdf"
 *   onReadFull={() => navigate('/manifestos/ldf')}
 *   onTrackPromises={() => navigate('/tracking?party=ldf')}
 * />
 */

export type ReleaseStatus = 'released' | 'expected' | 'not-released';

export interface PartyManifestoCardProps {
  party: string;
  logo?: string;
  releaseStatus: ReleaseStatus;
  expectedDate?: string;
  keyPromises?: string[];
  documentUrl?: string;
  onReadFull?: () => void;
  onTrackPromises?: () => void;
  onDownload?: () => void;
  className?: string;
}

const statusConfig = {
  released: {
    label: 'Released',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-500',
    icon: '✓',
  },
  expected: {
    label: 'Expected Soon',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-500',
    icon: '⏰',
  },
  'not-released': {
    label: 'Not Released',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-400',
    icon: '○',
  },
} as const;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-IN', options);
};

export const PartyManifestoCard: React.FC<PartyManifestoCardProps> = ({
  party,
  logo,
  releaseStatus,
  expectedDate,
  keyPromises = [],
  documentUrl,
  onReadFull,
  onTrackPromises,
  onDownload,
  className = '',
}) => {
  const config = statusConfig[releaseStatus];
  const isReleased = releaseStatus === 'released';
  const hasKeyPromises = keyPromises.length > 0;

  const handleReadFull = () => {
    if (onReadFull) {
      onReadFull();
    }
  };

  const handleTrackPromises = () => {
    if (onTrackPromises) {
      onTrackPromises();
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else if (documentUrl) {
      window.open(documentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${className}`}
    >
      {/* Header with party info and status */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b-2 border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {logo ? (
              <img
                src={logo}
                alt={`${party} logo`}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
                {party.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-900">{party}</h3>
              <p className="text-sm text-gray-600">Manifesto 2026</p>
            </div>
          </div>

          {/* Status badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.textColor} font-semibold text-sm border-2 ${config.borderColor}`}
          >
            <span aria-hidden="true">{config.icon}</span>
            <span>{config.label}</span>
          </div>
        </div>

        {/* Expected date if applicable */}
        {expectedDate && releaseStatus === 'expected' && (
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium">Expected: </span>
            {formatDate(expectedDate)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {isReleased && hasKeyPromises ? (
          <>
            {/* Key promises section */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Key Promises
              </h4>
              <ul className="space-y-2">
                {keyPromises.slice(0, 4).map((promise, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="text-blue-600 font-bold mt-0.5" aria-hidden="true">
                      •
                    </span>
                    <span className="flex-1 leading-relaxed">{promise}</span>
                  </li>
                ))}
              </ul>
              {keyPromises.length > 4 && (
                <p className="text-sm text-gray-500 mt-2 italic">
                  +{keyPromises.length - 4} more promises
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="mb-6 text-center py-4">
            <p className="text-gray-500 italic">
              {releaseStatus === 'expected'
                ? 'Manifesto will be available soon. Check back later.'
                : 'Manifesto not yet released.'}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Read Full Manifesto button */}
          <button
            onClick={handleReadFull}
            disabled={!isReleased || !onReadFull}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isReleased && onReadFull
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label={`Read full manifesto for ${party}`}
          >
            📄 Read Full Manifesto
          </button>

          {/* Track Promises button */}
          {isReleased && onTrackPromises && (
            <button
              onClick={handleTrackPromises}
              className="flex-1 px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 active:scale-95 shadow-md hover:shadow-lg transition-all duration-200"
              aria-label={`Track promises for ${party}`}
            >
              📊 Track Promises
            </button>
          )}

          {/* Download button */}
          {isReleased && documentUrl && (
            <button
              onClick={handleDownload}
              className="px-4 py-3 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 active:scale-95 shadow-md hover:shadow-lg transition-all duration-200"
              aria-label={`Download manifesto PDF for ${party}`}
              title="Download PDF"
            >
              ⬇️
            </button>
          )}
        </div>

        {/* Document info */}
        {isReleased && documentUrl && (
          <div className="mt-4 text-xs text-gray-500 text-center">
            <span>PDF document available for download</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartyManifestoCard;
