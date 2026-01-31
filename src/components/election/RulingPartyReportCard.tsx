import React from 'react';
import { ProgressRing } from '../ui/ProgressRing';

/**
 * Ruling Party Report Card
 * 
 * Displays the ruling party's performance on their previous election promises
 * Shows completion percentage and breakdown of promise statuses
 * 
 * @example
 * <RulingPartyReportCard
 *   party={{ name: 'LDF (CPM-led)', logo: '...' }}
 *   term="2021-2026"
 *   completionRate={67}
 *   breakdown={{
 *     completed: 156,
 *     inProgress: 89,
 *     delayed: 23,
 *     notStarted: 12
 *   }}
 *   onViewReport={() => navigate('/report')}
 * />
 */

export interface PromiseBreakdown {
  completed: number;
  inProgress: number;
  delayed: number;
  notStarted: number;
}

export interface PartyInfo {
  name: string;
  logo?: string;
}

export interface RulingPartyReportCardProps {
  party: PartyInfo;
  term: string;
  completionRate: number;
  breakdown: PromiseBreakdown;
  onViewReport?: () => void;
  className?: string;
}

export const RulingPartyReportCard: React.FC<RulingPartyReportCardProps> = ({
  party,
  term,
  completionRate,
  breakdown,
  onViewReport,
  className = '',
}) => {
  const total = 
    breakdown.completed + 
    breakdown.inProgress + 
    breakdown.delayed + 
    breakdown.notStarted;

  const isViewReportEnabled = typeof onViewReport === 'function';

  return (
    <div
      className={`bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {/* Header with party info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6 border-b-2 border-gray-200">
        <div className="flex items-center gap-4">
          {party.logo && (
            <img
              src={party.logo}
              alt={party.name}
              className="w-16 h-16 object-contain"
            />
          )}
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{party.name}</h3>
            <p className="text-sm text-gray-600">Term: {term}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-8">
        {/* Completion percentage section */}
        <div className="flex items-center gap-8 mb-8">
          <ProgressRing
            percentage={completionRate}
            size={140}
            strokeWidth={10}
            label="Promise\nCompletion"
          />
          
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-600 mb-2">
              OVERALL PERFORMANCE
            </p>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-gray-900">
                {completionRate}%
              </div>
              <div className="text-lg text-gray-600">of promises tracked</div>
            </div>
            
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              {completionRate >= 75 && 'Excellent track record on fulfilling election promises.'}
              {completionRate >= 50 && completionRate < 75 && 'Good progress with most promises on track.'}
              {completionRate < 50 && 'Below average completion rate on election promises.'}
            </p>
          </div>
        </div>

        {/* Breakdown section */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
            Promise Status Breakdown
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Completed */}
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <div className="text-3xl font-bold text-green-600">
                {breakdown.completed}
              </div>
              <p className="text-xs text-green-700 font-semibold mt-1">
                ✅ COMPLETED
              </p>
              <p className="text-xs text-green-600 mt-2">
                {((breakdown.completed / total) * 100).toFixed(0)}% of total
              </p>
            </div>

            {/* In Progress */}
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="text-3xl font-bold text-blue-600">
                {breakdown.inProgress}
              </div>
              <p className="text-xs text-blue-700 font-semibold mt-1">
                🔄 IN PROGRESS
              </p>
              <p className="text-xs text-blue-600 mt-2">
                {((breakdown.inProgress / total) * 100).toFixed(0)}% of total
              </p>
            </div>

            {/* Delayed */}
            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
              <div className="text-3xl font-bold text-orange-600">
                {breakdown.delayed}
              </div>
              <p className="text-xs text-orange-700 font-semibold mt-1">
                ⏸️ DELAYED
              </p>
              <p className="text-xs text-orange-600 mt-2">
                {((breakdown.delayed / total) * 100).toFixed(0)}% of total
              </p>
            </div>

            {/* Not Started */}
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
              <div className="text-3xl font-bold text-red-600">
                {breakdown.notStarted}
              </div>
              <p className="text-xs text-red-700 font-semibold mt-1">
                ❌ NOT STARTED
              </p>
              <p className="text-xs text-red-600 mt-2">
                {((breakdown.notStarted / total) * 100).toFixed(0)}% of total
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex gap-1 h-3 bg-gray-200 rounded-full overflow-hidden">
            {/* Completed bar */}
            <div
              className="bg-green-500"
              style={{
                width: `${(breakdown.completed / total) * 100}%`,
              }}
              role="progressbar"
              aria-valuenow={completionRate}
              aria-valuemin={0}
              aria-valuemax={100}
              title={`${breakdown.completed} completed`}
            />
            {/* In Progress bar */}
            <div
              className="bg-blue-500"
              style={{
                width: `${(breakdown.inProgress / total) * 100}%`,
              }}
              title={`${breakdown.inProgress} in progress`}
            />
            {/* Delayed bar */}
            <div
              className="bg-orange-500"
              style={{
                width: `${(breakdown.delayed / total) * 100}%`,
              }}
              title={`${breakdown.delayed} delayed`}
            />
            {/* Not Started bar */}
            <div
              className="bg-red-500"
              style={{
                width: `${(breakdown.notStarted / total) * 100}%`,
              }}
              title={`${breakdown.notStarted} not started`}
            />
          </div>
        </div>

        {/* Info text */}
        <p className="text-xs text-gray-500 text-center mb-6">
          Based on manifesto tracking data from previous term election cycle
        </p>

        {/* Action button */}
        <button
          onClick={onViewReport}
          disabled={!isViewReportEnabled}
          aria-disabled={!isViewReportEnabled}
          className={`w-full px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
            isViewReportEnabled
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 active:scale-95'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          aria-label={`View detailed report card for ${party.name}`}
        >
          View Detailed Report Card
        </button>
      </div>
    </div>
  );
};

export default RulingPartyReportCard;
