import React from 'react';

// TypeScript Interfaces
export type PromiseStatus = 'completed' | 'in-progress' | 'delayed' | 'not-started' | 'partially-completed';

export interface PartyPromiseData {
  promise: string;
  budget?: number;
  timeline?: string;
  pastRecord?: number; // 0-100 rating
  feasibilityScore?: number; // 0-100 score
  details: string;
}

export interface PromiseComparison {
  category: string;
  subcategory?: string;
  parties: {
    [partyId: string]: PartyPromiseData;
  };
  expertAnalysis?: string;
}

export interface ComparisonMatrixProps {
  category: string;
  parties: string[]; // Party IDs in display order
  partyNames: { [partyId: string]: string }; // Map party ID to display name
  comparisons: PromiseComparison[];
  className?: string;
}

// Utility Functions
const formatBudget = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(2)} K`;
  }
  return `₹${amount}`;
};

const getRatingStars = (rating: number): string => {
  const fullStars = Math.floor(rating / 20); // 0-100 scale to 0-5 stars
  const halfStar = (rating % 20) >= 10 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  return '⭐'.repeat(fullStars) + (halfStar ? '⭐' : '') + '☆'.repeat(emptyStars);
};

const getFeasibilityBadge = (score: number): { label: string; color: string } => {
  if (score >= 80) return { label: '✅ Highly Feasible', color: 'bg-green-100 text-green-800' };
  if (score >= 60) return { label: '✓ Feasible', color: 'bg-blue-100 text-blue-800' };
  if (score >= 40) return { label: '⚠️ Moderate Concerns', color: 'bg-yellow-100 text-yellow-800' };
  return { label: '⚠️ Major Concerns', color: 'bg-red-100 text-red-800' };
};

// Main Component
export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  category,
  parties,
  partyNames,
  comparisons,
  className = ''
}) => {
  if (!comparisons || comparisons.length === 0) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-600 text-lg">No comparison data available for this category.</p>
        <p className="text-gray-500 text-sm mt-2">Try selecting different parties or categories.</p>
      </div>
    );
  }

  return (
    <div className={`comparison-matrix ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Party Comparison: {category}
        </h2>
        <p className="text-gray-600">
          Comparing promises from {parties.length} parties
        </p>
      </div>

      {/* Desktop View: Grid Layout */}
      <div className="hidden md:block overflow-x-auto">
        {comparisons.map((comparison, compIndex) => (
          <div key={compIndex} className="mb-8">
            {/* Subcategory Title */}
            {comparison.subcategory && (
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {comparison.subcategory}
              </h3>
            )}

            {/* Comparison Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-32">
                      Aspect
                    </th>
                    {parties.map((partyId) => (
                      <th key={partyId} className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        {partyNames[partyId] || partyId}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Promise Row */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-700 align-top">
                      Promise
                    </td>
                    {parties.map((partyId) => {
                      const data = comparison.parties[partyId];
                      return (
                        <td key={partyId} className="px-4 py-4 text-sm text-gray-800 align-top">
                          {data ? (
                            <div className="space-y-1">
                              <p className="font-medium">{data.promise}</p>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">No promise</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Budget Row */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-700 align-top">
                      Budget
                    </td>
                    {parties.map((partyId) => {
                      const data = comparison.parties[partyId];
                      return (
                        <td key={partyId} className="px-4 py-4 text-sm text-gray-800 align-top">
                          {data?.budget ? (
                            <span className="font-semibold text-blue-600">
                              {formatBudget(data.budget)}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Not specified</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Timeline Row */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-700 align-top">
                      Timeline
                    </td>
                    {parties.map((partyId) => {
                      const data = comparison.parties[partyId];
                      return (
                        <td key={partyId} className="px-4 py-4 text-sm text-gray-800 align-top">
                          {data?.timeline ? (
                            <span className="text-gray-700">{data.timeline}</span>
                          ) : (
                            <span className="text-gray-400 italic">Not specified</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Past Record Row */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-700 align-top">
                      Past Record
                    </td>
                    {parties.map((partyId) => {
                      const data = comparison.parties[partyId];
                      return (
                        <td key={partyId} className="px-4 py-4 text-sm align-top">
                          {data?.pastRecord !== undefined ? (
                            <div className="space-y-1">
                              <div className="text-xl">{getRatingStars(data.pastRecord)}</div>
                              <div className="text-xs text-gray-600">{data.pastRecord}% completion</div>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">No history</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Feasibility Row */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-700 align-top">
                      Feasibility
                    </td>
                    {parties.map((partyId) => {
                      const data = comparison.parties[partyId];
                      return (
                        <td key={partyId} className="px-4 py-4 text-sm align-top">
                          {data?.feasibilityScore !== undefined ? (
                            <div className="space-y-1">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                getFeasibilityBadge(data.feasibilityScore).color
                              }`}>
                                {getFeasibilityBadge(data.feasibilityScore).label}
                              </span>
                              <div className="text-xs text-gray-600 mt-1">{data.feasibilityScore}% score</div>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">Not assessed</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Details Row */}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-700 align-top">
                      Details
                    </td>
                    {parties.map((partyId) => {
                      const data = comparison.parties[partyId];
                      return (
                        <td key={partyId} className="px-4 py-4 text-sm text-gray-700 align-top">
                          {data?.details ? (
                            <p className="text-sm leading-relaxed">{data.details}</p>
                          ) : (
                            <span className="text-gray-400 italic">No details</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Expert Analysis */}
            {comparison.expertAnalysis && (
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💡</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Expert Analysis</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{comparison.expertAnalysis}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View: Card Layout with Horizontal Scroll */}
      <div className="block md:hidden">
        {comparisons.map((comparison, compIndex) => (
          <div key={compIndex} className="mb-8">
            {/* Subcategory Title */}
            {comparison.subcategory && (
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {comparison.subcategory}
              </h3>
            )}

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-4" style={{ minWidth: 'max-content' }}>
                {parties.map((partyId) => {
                  const data = comparison.parties[partyId];
                  return (
                    <div
                      key={partyId}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                      style={{ minWidth: '280px', maxWidth: '280px' }}
                    >
                      {/* Party Name */}
                      <h4 className="font-bold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        {partyNames[partyId] || partyId}
                      </h4>

                      {data ? (
                        <div className="space-y-4">
                          {/* Promise */}
                          <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              Promise
                            </div>
                            <p className="text-sm font-medium text-gray-800">{data.promise}</p>
                          </div>

                          {/* Budget */}
                          {data.budget && (
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                                Budget
                              </div>
                              <p className="text-sm font-semibold text-blue-600">
                                {formatBudget(data.budget)}
                              </p>
                            </div>
                          )}

                          {/* Timeline */}
                          {data.timeline && (
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                                Timeline
                              </div>
                              <p className="text-sm text-gray-700">{data.timeline}</p>
                            </div>
                          )}

                          {/* Past Record */}
                          {data.pastRecord !== undefined && (
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                                Past Record
                              </div>
                              <div className="text-lg">{getRatingStars(data.pastRecord)}</div>
                              <div className="text-xs text-gray-600">{data.pastRecord}% completion</div>
                            </div>
                          )}

                          {/* Feasibility */}
                          {data.feasibilityScore !== undefined && (
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                                Feasibility
                              </div>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                getFeasibilityBadge(data.feasibilityScore).color
                              }`}>
                                {getFeasibilityBadge(data.feasibilityScore).label}
                              </span>
                              <div className="text-xs text-gray-600 mt-1">{data.feasibilityScore}% score</div>
                            </div>
                          )}

                          {/* Details */}
                          <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              Details
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{data.details}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-400 italic text-sm">No data available</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Expert Analysis */}
            {comparison.expertAnalysis && (
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <span className="text-xl mr-2">💡</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">Expert Analysis</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">{comparison.expertAnalysis}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonMatrix;
