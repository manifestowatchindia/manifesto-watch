import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ComparisonMatrix, { PromiseComparison } from '../../components/promise/ComparisonMatrix';

// TypeScript Interfaces
interface PartyOption {
  id: string;
  name: string;
  logo?: string;
}

interface CategoryOption {
  id: string;
  name: string;
}

// Mock data for development (will be replaced by API calls)
const MOCK_PARTIES: PartyOption[] = [
  { id: 'ldf', name: 'LDF (CPM-led)' },
  { id: 'udf', name: 'UDF (INC-led)' },
  { id: 'nda', name: 'NDA (BJP-led)' },
  { id: 'independent', name: 'Independent Candidates' }
];

const MOCK_CATEGORIES: CategoryOption[] = [
  { id: 'employment', name: 'Employment' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'education', name: 'Education' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'infrastructure', name: 'Infrastructure' },
  { id: 'welfare', name: 'Welfare Schemes' }
];

export const ComparisonPage: React.FC = () => {
  // URL params
  const { state, year } = useParams<{ state: string; year: string }>();

  // State management
  const [selectedParties, setSelectedParties] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<PromiseComparison[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format state name for display
  const formattedState = state
    ? state.charAt(0).toUpperCase() + state.slice(1).replace(/-/g, ' ')
    : 'State';

  // Handle party selection
  const handlePartyToggle = (partyId: string) => {
    setSelectedParties(prev =>
      prev.includes(partyId)
        ? prev.filter(id => id !== partyId)
        : [...prev, partyId]
    );
  };

  // Handle category selection
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle select all parties
  const handleSelectAllParties = () => {
    if (selectedParties.length === MOCK_PARTIES.length) {
      setSelectedParties([]);
    } else {
      setSelectedParties(MOCK_PARTIES.map(p => p.id));
    }
  };

  // Handle select all categories
  const handleSelectAllCategories = () => {
    if (selectedCategories.length === MOCK_CATEGORIES.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(MOCK_CATEGORIES.map(c => c.id));
    }
  };

  // Generate comparison
  const handleGenerateComparison = async () => {
    if (selectedParties.length < 2) {
      setError('Please select at least 2 parties to compare');
      return;
    }

    if (selectedCategories.length === 0) {
      setError('Please select at least 1 category');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock comparison data
      const mockData: PromiseComparison[] = selectedCategories.map(categoryId => ({
        category: MOCK_CATEGORIES.find(c => c.id === categoryId)?.name || categoryId,
        subcategory: 'Government Initiatives',
        parties: Object.fromEntries(
          selectedParties.map(partyId => [
            partyId,
            {
              promise: `${MOCK_PARTIES.find(p => p.id === partyId)?.name} promise for ${categoryId}`,
              budget: Math.floor(Math.random() * 500000000000),
              timeline: `${Math.floor(Math.random() * 5) + 1} years`,
              pastRecord: partyId !== 'nda' ? Math.floor(Math.random() * 100) : undefined,
              feasibilityScore: Math.floor(Math.random() * 100),
              details: `Detailed plan for ${categoryId} sector including infrastructure development and capacity building.`
            }
          ])
        ),
        expertAnalysis: `Expert analysis for ${categoryId} comparing all selected parties' approaches and feasibility.`
      }));

      setComparisonData(mockData);
    } catch (err) {
      setError('Failed to load comparison data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Download comparison as PDF (placeholder)
  const handleDownload = () => {
    alert('Download functionality will be implemented with PDF generation library');
  };

  // Share comparison (placeholder)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Party Comparison - ${formattedState} ${year}`,
        text: 'Check out this party comparison on ManifestoWatch.in',
        url: window.location.href
      }).catch(() => {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Clear all selections
  const handleClearAll = () => {
    setSelectedParties([]);
    setSelectedCategories([]);
    setComparisonData(null);
    setError(null);
  };

  return (
    <>
      <Helmet>
        <title>Compare Parties - {formattedState} Election {year} | ManifestoWatch.in</title>
        <meta
          name="description"
          content={`Compare party manifestos and promises for ${formattedState} election ${year}. Side-by-side analysis of budgets, timelines, and feasibility.`}
        />
        <meta name="keywords" content={`${formattedState} election, party comparison, manifesto comparison, ${year} promises`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Compare Party Manifestos
            </h1>
            <p className="text-lg text-gray-600">
              {formattedState} Election {year}
            </p>
          </div>

          {/* Selection Panel */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {/* Party Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Parties (minimum 2)
                </h2>
                <button
                  onClick={handleSelectAllParties}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {selectedParties.length === MOCK_PARTIES.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_PARTIES.map(party => (
                  <label
                    key={party.id}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedParties.includes(party.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedParties.includes(party.id)}
                      onChange={() => handlePartyToggle(party.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-800 font-medium">{party.name}</span>
                  </label>
                ))}
              </div>
              {selectedParties.length > 0 && (
                <div className="mt-3 text-sm text-gray-600">
                  {selectedParties.length} {selectedParties.length === 1 ? 'party' : 'parties'} selected
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Categories
                </h2>
                <button
                  onClick={handleSelectAllCategories}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {selectedCategories.length === MOCK_CATEGORIES.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {MOCK_CATEGORIES.map(category => (
                  <label
                    key={category.id}
                    className={`flex items-center space-x-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedCategories.includes(category.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-800 font-medium">{category.name}</span>
                  </label>
                ))}
              </div>
              {selectedCategories.length > 0 && (
                <div className="mt-3 text-sm text-gray-600">
                  {selectedCategories.length} {selectedCategories.length === 1 ? 'category' : 'categories'} selected
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGenerateComparison}
                disabled={isLoading || selectedParties.length < 2 || selectedCategories.length === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {isLoading ? 'Generating...' : 'Generate Comparison'}
              </button>
              <button
                onClick={handleClearAll}
                className="sm:flex-none bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Comparison Results */}
          {comparisonData && !isLoading && (
            <div>
              {/* Results Header with Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Comparison Results
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={handleShare}
                    className="bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>📤</span>
                    <span>Share</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>⬇️</span>
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Comparison Matrix for each category */}
              {selectedCategories.map(categoryId => {
                const categoryData = comparisonData.filter(
                  c => c.category === MOCK_CATEGORIES.find(cat => cat.id === categoryId)?.name
                );

                if (categoryData.length === 0) return null;

                const partyNames = Object.fromEntries(
                  MOCK_PARTIES.map(p => [p.id, p.name])
                );

                return (
                  <div key={categoryId} className="mb-8">
                    <ComparisonMatrix
                      category={categoryData[0].category}
                      parties={selectedParties}
                      partyNames={partyNames}
                      comparisons={categoryData}
                    />
                  </div>
                );
              })}

              {/* Disclaimer */}
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">⚠️ Disclaimer</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This comparison is based on official party manifestos and public statements. 
                  Past performance ratings are calculated from verified promise completion data. 
                  Feasibility scores are derived from expert analysis and may not reflect final outcomes. 
                  Always verify information with official sources before making voting decisions.
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Generating comparison...</p>
            </div>
          )}

          {/* Empty State */}
          {!comparisonData && !isLoading && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to Compare?
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Select at least 2 parties and 1 category above, then click "Generate Comparison" 
                to see a detailed side-by-side analysis of their promises.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ComparisonPage;
