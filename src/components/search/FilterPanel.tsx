import React, { useState, useCallback } from 'react';
import { PromiseStatus } from '../../lib/types';
import { categories } from '../../data/categories';

/**
 * Filter state interface for search filters
 */
export interface FilterState {
  categories: string[];
  statuses: string[];
  state?: string;
  parties: string[];
  timeline?: string;
}

/**
 * FilterPanel component props
 */
export interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApply: () => void;
  onClear: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

// Available filter options
const STATUS_OPTIONS: { value: PromiseStatus; label: string; color: string }[] = [
  { value: 'Announced', label: 'Announced', color: 'bg-blue-100 text-blue-800' },
  { value: 'Actioned', label: 'Actioned', color: 'bg-purple-100 text-purple-800' },
  { value: 'Under implementation', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'Delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'Deferred', label: 'Deferred', color: 'bg-red-100 text-red-800' },
];

const STATE_OPTIONS = [
  { value: '', label: 'All States' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'tamil-nadu', label: 'Tamil Nadu' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
  { value: 'west-bengal', label: 'West Bengal' },
  { value: 'assam', label: 'Assam' },
  { value: 'delhi', label: 'Delhi' },
];

const PARTY_OPTIONS = [
  { value: 'bjp', label: 'BJP', color: '#FF9933' },
  { value: 'inc', label: 'INC (Congress)', color: '#19AAED' },
  { value: 'aap', label: 'AAP', color: '#0072B1' },
  { value: 'cpm', label: 'CPM', color: '#FF0000' },
  { value: 'tmc', label: 'TMC', color: '#1C8B8C' },
  { value: 'dmk', label: 'DMK', color: '#FF0000' },
  { value: 'trs', label: 'BRS', color: '#FF66B2' },
  { value: 'sp', label: 'Samajwadi Party', color: '#FF0000' },
  { value: 'bsp', label: 'BSP', color: '#22409A' },
  { value: 'jdu', label: 'JD(U)', color: '#003366' },
];

const TIMELINE_OPTIONS = [
  { value: '', label: 'All Timelines' },
  { value: '100d', label: 'First 100 Days' },
  { value: '1yr', label: 'Within 1 Year' },
  { value: '3yr', label: 'Within 3 Years' },
  { value: '5yr', label: 'Full Term (5 Years)' },
  { value: '2047', label: 'Long-term (2047)' },
];

/**
 * FilterPanel Component
 * 
 * A comprehensive filter panel for searching and filtering promises.
 * Features:
 * - Category filter (multi-select checkboxes)
 * - Status filter (multi-select with color badges)
 * - State filter (dropdown)
 * - Party filter (multi-select)
 * - Timeline filter (dropdown)
 * - Apply and Clear buttons
 * - Active filter badges showing current selections
 * - Collapsible on mobile
 * 
 * @component
 * @example
 * <FilterPanel
 *   filters={filters}
 *   onFilterChange={setFilters}
 *   onApply={handleApply}
 *   onClear={handleClear}
 * />
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onApply,
  onClear,
  isCollapsed = false,
  onToggleCollapse,
  className = '',
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    status: true,
    state: true,
    parties: false,
    timeline: true,
  });

  /**
   * Toggle a filter section's expanded state
   */
  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  /**
   * Handle category checkbox change
   */
  const handleCategoryChange = useCallback((categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...filters.categories, categoryId];
    onFilterChange({ ...filters, categories: newCategories });
  }, [filters, onFilterChange]);

  /**
   * Handle status checkbox change
   */
  const handleStatusChange = useCallback((status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    onFilterChange({ ...filters, statuses: newStatuses });
  }, [filters, onFilterChange]);

  /**
   * Handle party checkbox change
   */
  const handlePartyChange = useCallback((partyId: string) => {
    const newParties = filters.parties.includes(partyId)
      ? filters.parties.filter(p => p !== partyId)
      : [...filters.parties, partyId];
    onFilterChange({ ...filters, parties: newParties });
  }, [filters, onFilterChange]);

  /**
   * Handle state dropdown change
   */
  const handleStateChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, state: e.target.value || undefined });
  }, [filters, onFilterChange]);

  /**
   * Handle timeline dropdown change
   */
  const handleTimelineChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, timeline: e.target.value || undefined });
  }, [filters, onFilterChange]);

  /**
   * Get count of active filters
   */
  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    count += filters.categories.length;
    count += filters.statuses.length;
    count += filters.parties.length;
    if (filters.state) count++;
    if (filters.timeline) count++;
    return count;
  }, [filters]);

  /**
   * Remove a specific filter
   */
  const removeFilter = useCallback((type: string, value?: string) => {
    switch (type) {
      case 'category':
        onFilterChange({ ...filters, categories: filters.categories.filter(c => c !== value) });
        break;
      case 'status':
        onFilterChange({ ...filters, statuses: filters.statuses.filter(s => s !== value) });
        break;
      case 'party':
        onFilterChange({ ...filters, parties: filters.parties.filter(p => p !== value) });
        break;
      case 'state':
        onFilterChange({ ...filters, state: undefined });
        break;
      case 'timeline':
        onFilterChange({ ...filters, timeline: undefined });
        break;
    }
  }, [filters, onFilterChange]);

  const activeFilterCount = getActiveFilterCount();

  // Render section header with expand/collapse
  const renderSectionHeader = (title: string, section: string, count?: number) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-700 hover:text-gray-900"
      aria-expanded={expandedSections[section]}
      aria-controls={`section-${section}`}
    >
      <span className="flex items-center gap-2">
        {title}
        {count !== undefined && count > 0 && (
          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
            {count}
          </span>
        )}
      </span>
      <svg
        className={`w-5 h-5 transition-transform ${expandedSections[section] ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  return (
    <aside
      className={`bg-white rounded-lg shadow-md ${className}`}
      aria-label="Search filters"
      data-testid="filter-panel"
    >
      {/* Mobile collapse toggle */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex items-center justify-between w-full p-4 border-b border-gray-200"
          aria-expanded={!isCollapsed}
          aria-controls="filter-content"
        >
          <span className="font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Desktop header */}
      <div className="hidden md:block p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h2>
      </div>

      {/* Filter content */}
      <div
        id="filter-content"
        className={`${isCollapsed ? 'hidden' : 'block'} md:block`}
      >
        {/* Active filter badges */}
        {activeFilterCount > 0 && (
          <div className="p-4 border-b border-gray-200" data-testid="active-filters">
            <div className="flex flex-wrap gap-2">
              {filters.categories.map(catId => {
                const cat = categories.find(c => c.id === catId);
                return cat ? (
                  <span
                    key={`cat-${catId}`}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {cat.name}
                    <button
                      type="button"
                      onClick={() => removeFilter('category', catId)}
                      className="hover:text-red-500"
                      aria-label={`Remove ${cat.name} filter`}
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
              {filters.statuses.map(status => (
                <span
                  key={`status-${status}`}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {status}
                  <button
                    type="button"
                    onClick={() => removeFilter('status', status)}
                    className="hover:text-red-500"
                    aria-label={`Remove ${status} filter`}
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.parties.map(partyId => {
                const party = PARTY_OPTIONS.find(p => p.value === partyId);
                return party ? (
                  <span
                    key={`party-${partyId}`}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {party.label}
                    <button
                      type="button"
                      onClick={() => removeFilter('party', partyId)}
                      className="hover:text-red-500"
                      aria-label={`Remove ${party.label} filter`}
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
              {filters.state && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  {STATE_OPTIONS.find(s => s.value === filters.state)?.label}
                  <button
                    type="button"
                    onClick={() => removeFilter('state')}
                    className="hover:text-red-500"
                    aria-label="Remove state filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.timeline && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  {TIMELINE_OPTIONS.find(t => t.value === filters.timeline)?.label}
                  <button
                    type="button"
                    onClick={() => removeFilter('timeline')}
                    className="hover:text-red-500"
                    aria-label="Remove timeline filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-4 space-y-4">
          {/* Category Filter */}
          <div className="border-b border-gray-100 pb-4">
            {renderSectionHeader('Categories', 'categories', filters.categories.length)}
            {expandedSections.categories && (
              <div id="section-categories" className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {categories.slice(0, 8).map(category => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      aria-label={category.name}
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="border-b border-gray-100 pb-4">
            {renderSectionHeader('Status', 'status', filters.statuses.length)}
            {expandedSections.status && (
              <div id="section-status" className="mt-2 space-y-2">
                {STATUS_OPTIONS.map(option => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={filters.statuses.includes(option.value)}
                      onChange={() => handleStatusChange(option.value)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      aria-label={option.label}
                    />
                    <span className={`text-xs px-2 py-0.5 rounded ${option.color}`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* State Filter */}
          <div className="border-b border-gray-100 pb-4">
            {renderSectionHeader('State', 'state', filters.state ? 1 : 0)}
            {expandedSections.state && (
              <div id="section-state" className="mt-2">
                <select
                  value={filters.state || ''}
                  onChange={handleStateChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Select state"
                >
                  {STATE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Party Filter */}
          <div className="border-b border-gray-100 pb-4">
            {renderSectionHeader('Political Party', 'parties', filters.parties.length)}
            {expandedSections.parties && (
              <div id="section-parties" className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {PARTY_OPTIONS.map(party => (
                  <label
                    key={party.value}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={filters.parties.includes(party.value)}
                      onChange={() => handlePartyChange(party.value)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      aria-label={party.label}
                    />
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: party.color }}
                    />
                    <span className="text-sm text-gray-700">{party.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Timeline Filter */}
          <div className="pb-4">
            {renderSectionHeader('Timeline', 'timeline', filters.timeline ? 1 : 0)}
            {expandedSections.timeline && (
              <div id="section-timeline" className="mt-2">
                <select
                  value={filters.timeline || ''}
                  onChange={handleTimelineChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Select timeline"
                >
                  {TIMELINE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onApply}
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={onClear}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              disabled={activeFilterCount === 0}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
