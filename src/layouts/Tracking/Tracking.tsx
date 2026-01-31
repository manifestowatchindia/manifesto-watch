import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { PromiseCard, Promise as PromiseType } from '../../components/promise/PromiseCard';
import { FilterPanel, FilterState } from '../../components/search/FilterPanel';

/**
 * Promise data for the tracking page
 * In production, this would come from an API
 */
interface TrackingPromise {
  id: number;
  category: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'Completed' | 'In Progress' | 'Delayed' | 'Not Started';
  progress: number;
  lastUpdate: string;
  details: string;
  party?: string;
  state?: string;
}

interface Update {
  id: number;
  date: string;
  category: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

/**
 * Loading skeleton for promise cards
 */
const PromiseCardSkeleton: React.FC = () => (
  <div className="bg-gray-800 rounded-xl p-5 animate-pulse border border-gray-700">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="h-5 bg-gray-700 rounded w-24 mb-2"></div>
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      </div>
      <div className="h-7 bg-gray-700 rounded w-24"></div>
    </div>
    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
    <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-2 bg-gray-700 rounded-full w-full mb-4"></div>
    <div className="flex justify-between">
      <div className="h-4 bg-gray-700 rounded w-32"></div>
      <div className="h-4 bg-gray-700 rounded w-32"></div>
    </div>
  </div>
);

/**
 * Skeleton for stats cards
 */
const StatCardSkeleton: React.FC = () => (
  <div className="bg-gray-800 rounded-xl p-5 animate-pulse border border-gray-700">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-8 bg-gray-700 rounded w-16 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  </div>
);

/**
 * Update card skeleton
 */
const UpdateCardSkeleton: React.FC = () => (
  <div className="bg-gray-800/50 rounded-lg p-4 animate-pulse border border-gray-700">
    <div className="flex justify-between mb-2">
      <div className="h-4 bg-gray-700 rounded w-24"></div>
      <div className="h-5 bg-gray-700 rounded w-16"></div>
    </div>
    <div className="h-4 bg-gray-700 rounded w-16 mb-2"></div>
    <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-full"></div>
  </div>
);

/**
 * Stats card component
 */
interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  percentage?: number;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, percentage, colorClass }) => (
  <div className={`bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-all duration-300`}>
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center text-white text-xl`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-gray-400 text-sm">{label}</p>
        {percentage !== undefined && (
          <span className="text-xs text-gray-500">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  </div>
);

/**
 * Main Tracking Page Component
 */
export const Tracking: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'central' | 'states'>('central');
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    statuses: [],
    state: undefined,
    parties: [],
    timeline: undefined,
  });
  
  // Simulated loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Central Government Promises Data
  const promises: TrackingPromise[] = useMemo(() => [
    {
      id: 1,
      category: 'Infrastructure',
      title: 'National Highway Development',
      description: 'Construction of 25,000 km of National Highways',
      targetDate: 'March 2025',
      status: 'In Progress',
      progress: 78,
      lastUpdate: 'October 2025',
      details: '19,500 km completed. Major projects include Delhi-Mumbai Expressway (85% complete), Bangalore-Chennai Expressway (72% complete).',
      party: 'BJP',
    },
    {
      id: 2,
      category: 'Healthcare',
      title: 'Ayushman Bharat Expansion',
      description: 'Coverage for 50 crore families under PM-JAY',
      targetDate: 'December 2024',
      status: 'Completed',
      progress: 100,
      lastUpdate: 'September 2025',
      details: 'Target achieved with 51.2 crore families enrolled. 5.8 crore hospital admissions processed.',
      party: 'BJP',
    },
    {
      id: 3,
      category: 'Education',
      title: 'Digital Education Infrastructure',
      description: 'Smart classrooms in 1.5 lakh government schools',
      targetDate: 'June 2025',
      status: 'In Progress',
      progress: 65,
      lastUpdate: 'October 2025',
      details: '97,500 schools equipped with smart classrooms. Focus on rural areas with 42% coverage achieved.',
      party: 'BJP',
    },
    {
      id: 4,
      category: 'Economy',
      title: 'Make in India Manufacturing Hubs',
      description: '12 new manufacturing clusters across India',
      targetDate: 'March 2026',
      status: 'In Progress',
      progress: 55,
      lastUpdate: 'September 2025',
      details: '7 clusters operational (Tamil Nadu, Gujarat, Maharashtra). 45,000+ jobs created so far.',
      party: 'BJP',
    },
    {
      id: 5,
      category: 'Environment',
      title: 'Renewable Energy Target',
      description: '500 GW renewable energy capacity',
      targetDate: 'December 2030',
      status: 'In Progress',
      progress: 42,
      lastUpdate: 'October 2025',
      details: '210 GW achieved. Major solar and wind projects in Rajasthan, Gujarat, and Karnataka.',
      party: 'BJP',
    },
    {
      id: 6,
      category: 'Agriculture',
      title: 'Farmers Income Doubling',
      description: 'Double farmers income through MSP and market access',
      targetDate: 'December 2025',
      status: 'In Progress',
      progress: 68,
      lastUpdate: 'September 2025',
      details: 'Average farmer income increased by 68% since 2019. MSP increased for 23 crops.',
      party: 'BJP',
    },
    {
      id: 7,
      category: 'Infrastructure',
      title: 'Metro Rail Expansion',
      description: 'Metro connectivity in 50 cities',
      targetDate: 'December 2026',
      status: 'In Progress',
      progress: 48,
      lastUpdate: 'October 2025',
      details: '24 cities now have operational metro. Construction ongoing in 15 more cities.',
      party: 'BJP',
    },
    {
      id: 8,
      category: 'Digital India',
      title: 'BharatNet Village Connectivity',
      description: 'Broadband connectivity to all 6.5 lakh villages',
      targetDate: 'March 2025',
      status: 'Delayed',
      progress: 72,
      lastUpdate: 'October 2025',
      details: '4.68 lakh villages connected. Rural broadband penetration increased from 2% to 12%.',
      party: 'BJP',
    },
    {
      id: 9,
      category: 'Housing',
      title: 'Pradhan Mantri Awas Yojana - Urban',
      description: '2 crore urban housing units',
      targetDate: 'December 2024',
      status: 'Completed',
      progress: 100,
      lastUpdate: 'September 2025',
      details: 'Target achieved: 2.1 crore houses sanctioned, 1.8 crore completed and handed over.',
      party: 'BJP',
    },
    {
      id: 10,
      category: 'Water',
      title: 'Jal Jeevan Mission',
      description: 'Tap water connection to all rural households',
      targetDate: 'March 2024',
      status: 'In Progress',
      progress: 85,
      lastUpdate: 'October 2025',
      details: '14.7 crore (85%) of rural households now have tap water connections. States like Goa, Telangana achieved 100%.',
      party: 'BJP',
    },
  ], []);

  // Latest Updates Data
  const latestUpdates: Update[] = useMemo(() => [
    {
      id: 1,
      date: 'October 10, 2025',
      category: 'Infrastructure',
      title: 'Delhi-Mumbai Expressway Phase 1 Inaugurated',
      description: 'First 200km stretch of Delhi-Mumbai Expressway opened for traffic, reducing travel time by 3 hours.',
      impact: 'High'
    },
    {
      id: 2,
      date: 'October 8, 2025',
      category: 'Healthcare',
      title: 'AIIMS Expansion Approved',
      description: '5 new AIIMS hospitals approved for Assam, Bihar, Jharkhand, Odisha, and Rajasthan.',
      impact: 'High'
    },
    {
      id: 3,
      date: 'October 5, 2025',
      category: 'Economy',
      title: 'GST Collection Crosses ₹2 Lakh Crore',
      description: 'Record GST collection of ₹2.10 lakh crore in September 2025, indicating strong economic growth.',
      impact: 'High'
    },
    {
      id: 4,
      date: 'October 3, 2025',
      category: 'Digital India',
      title: 'Aadhaar-Based Services Reach 500 Crore Transactions',
      description: 'Aadhaar authentication reaches milestone of 500 crore monthly transactions.',
      impact: 'Medium'
    },
    {
      id: 5,
      date: 'October 1, 2025',
      category: 'Agriculture',
      title: 'Kisan Credit Card Scheme Expanded',
      description: '3 crore new KCC issued. Interest subvention extended to fisheries and animal husbandry.',
      impact: 'Medium'
    },
  ], []);

  // Convert TrackingPromise to PromiseType for PromiseCard
  const convertToPromiseType = useCallback((promise: TrackingPromise): PromiseType => {
    const statusMap: Record<TrackingPromise['status'], 'completed' | 'in-progress' | 'delayed' | 'not-started'> = {
      'Completed': 'completed',
      'In Progress': 'in-progress',
      'Delayed': 'delayed',
      'Not Started': 'not-started',
    };

    return {
      id: `promise-${promise.id}`,
      title: promise.title,
      description: promise.description,
      party: {
        id: (promise.party || 'central').toLowerCase(),
        name: promise.party || 'Central Government',
        color: promise.party === 'BJP' ? '#FF9933' : '#2563EB',
      },
      category: promise.category,
      verified: true,
      verificationSource: 'Official Government Data',
      metrics: {
        timeline: promise.targetDate,
      },
      progress: {
        percentage: promise.progress,
        status: statusMap[promise.status],
        lastUpdated: promise.lastUpdate,
      },
      tags: [promise.category],
    };
  }, []);

  // Filter promises based on selected filters
  const filteredPromises = useMemo(() => {
    return promises.filter(promise => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(promise.category.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.statuses.length > 0) {
        const statusMap: Record<string, string> = {
          'Announced': 'Not Started',
          'Actioned': 'In Progress',
          'Under implementation': 'In Progress',
          'Delivered': 'Completed',
          'Deferred': 'Delayed',
        };
        const hasMatch = filters.statuses.some(s => statusMap[s] === promise.status || s.toLowerCase() === promise.status.toLowerCase());
        if (!hasMatch) return false;
      }

      // Party filter
      if (filters.parties.length > 0 && promise.party && !filters.parties.includes(promise.party.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [promises, filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = promises.length;
    const completed = promises.filter(p => p.status === 'Completed').length;
    const inProgress = promises.filter(p => p.status === 'In Progress').length;
    const delayed = promises.filter(p => p.status === 'Delayed').length;
    const overallProgress = Math.round(promises.reduce((sum, p) => sum + p.progress, 0) / total);

    return {
      total,
      completed,
      inProgress,
      delayed,
      overallProgress,
      completedPercent: Math.round((completed / total) * 100),
      inProgressPercent: Math.round((inProgress / total) * 100),
      delayedPercent: Math.round((delayed / total) * 100),
    };
  }, [promises]);

  // Handlers
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleApplyFilters = useCallback(() => {
    // Filters are already applied reactively
    setIsFilterCollapsed(true);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      categories: [],
      statuses: [],
      state: undefined,
      parties: [],
      timeline: undefined,
    });
  }, []);

  const handleViewDetails = useCallback((promiseId: string) => {
    // Navigate to promise detail page
    navigate(`/promise/${promiseId}`);
  }, [navigate]);

  // Get impact color class
  const getImpactColor = (impact: Update['impact']): string => {
    switch (impact) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Get progress bar color
  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.statuses.length > 0) count += filters.statuses.length;
    if (filters.parties.length > 0) count += filters.parties.length;
    if (filters.state) count += 1;
    if (filters.timeline) count += 1;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-900">
      <SEO 
        title="Government Tracking | Central & State Progress Monitoring | Manifesto Watch"
        description="Track government promises and progress at both central and state levels. Monitor completion status, view latest updates, and analyze performance across India's political landscape."
        keywords="government tracking, promise tracker, central government, state governments, accountability, progress monitoring, manifesto tracking, india governance"
        canonicalUrl="https://www.manifestowatch.in/tracking"
      />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.1)_30%,rgba(255,255,255,0.1)_70%,transparent_70%)] bg-[length:60px_60px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl" role="img" aria-label="tasks">📋</span>
              Government Promise Tracking
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Monitor government commitments, track progress, and stay informed about the latest developments
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-0">
            <button 
              className={`flex flex-col items-center px-6 sm:px-10 py-4 border-b-2 transition-all duration-300 ${
                activeTab === 'central' 
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
              onClick={() => { setActiveTab('central'); setIsLoading(true); }}
            >
              <span className="text-2xl mb-1">🏛️</span>
              <span className="font-semibold text-sm sm:text-base">Central Government</span>
              <span className="text-xs text-gray-500">National Level Tracking</span>
            </button>
            <button 
              className={`flex flex-col items-center px-6 sm:px-10 py-4 border-b-2 transition-all duration-300 ${
                activeTab === 'states' 
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
              onClick={() => { setActiveTab('states'); setIsLoading(true); }}
            >
              <span className="text-2xl mb-1">🗺️</span>
              <span className="font-semibold text-sm sm:text-base">States & UTs</span>
              <span className="text-xs text-gray-500">Legislative Assemblies</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[calc(100vh-300px)]">
        {activeTab === 'central' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* Statistics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {isLoading ? (
                <>
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                </>
              ) : (
                <>
                  <StatCard
                    icon={<span>📋</span>}
                    value={stats.total}
                    label="Total Promises"
                    colorClass="bg-blue-600"
                  />
                  <StatCard
                    icon={<span>✅</span>}
                    value={stats.completed}
                    label="Completed"
                    percentage={stats.completedPercent}
                    colorClass="bg-green-600"
                  />
                  <StatCard
                    icon={<span>🔄</span>}
                    value={stats.inProgress}
                    label="In Progress"
                    percentage={stats.inProgressPercent}
                    colorClass="bg-blue-600"
                  />
                  <StatCard
                    icon={<span>⚠️</span>}
                    value={stats.delayed}
                    label="Delayed"
                    percentage={stats.delayedPercent}
                    colorClass="bg-yellow-600"
                  />
                </>
              )}
            </div>

            {/* Overall Progress Bar */}
            <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <span>📊</span>
                  Overall Completion Progress
                </h4>
                <span className="text-2xl font-bold text-orange-400">
                  {isLoading ? '--' : `${stats.overallProgress}%`}
                </span>
              </div>
              <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                {isLoading ? (
                  <div className="h-full bg-gray-600 animate-pulse"></div>
                ) : (
                  <div 
                    className={`h-full ${getProgressColor(stats.overallProgress)} transition-all duration-1000 ease-out rounded-full`}
                    style={{ width: `${stats.overallProgress}%` }}
                    role="progressbar"
                    aria-valuenow={stats.overallProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                )}
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Average completion across all {stats.total} tracked promises and initiatives
              </p>
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white"
              >
                <span className="flex items-center gap-2">
                  <span>🎛️</span>
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </span>
                <span className={`transition-transform duration-300 ${isFilterCollapsed ? '' : 'rotate-180'}`}>
                  ▼
                </span>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filter Panel */}
              <div className={`lg:w-72 flex-shrink-0 ${isFilterCollapsed ? 'hidden lg:block' : 'block'}`}>
                <div className="sticky top-32">
                  <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApply={handleApplyFilters}
                    onClear={handleClearFilters}
                    isCollapsed={false}
                    className="bg-gray-800 rounded-xl border border-gray-700"
                  />
                </div>
              </div>

              {/* Promises List */}
              <div className="flex-1">
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span>📝</span>
                      Government Promises Tracker
                    </h3>
                    <span className="text-sm text-gray-400">
                      {isLoading ? '--' : `${filteredPromises.length} promises`}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 space-y-4">
                    {isLoading ? (
                      <>
                        <PromiseCardSkeleton />
                        <PromiseCardSkeleton />
                        <PromiseCardSkeleton />
                      </>
                    ) : filteredPromises.length === 0 ? (
                      <div className="text-center py-12">
                        <span className="text-5xl mb-4 block">🔍</span>
                        <h4 className="text-xl font-semibold text-white mb-2">No promises found</h4>
                        <p className="text-gray-400 mb-4">Try adjusting your filters to see more results</p>
                        <button
                          onClick={handleClearFilters}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    ) : (
                      filteredPromises.map((promise) => (
                        <PromiseCard
                          key={promise.id}
                          promise={convertToPromiseType(promise)}
                          onViewDetails={handleViewDetails}
                          variant="default"
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Latest Updates Sidebar */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden sticky top-32">
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span>📰</span>
                      Latest Updates
                    </h3>
                  </div>

                  <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                    {isLoading ? (
                      <>
                        <UpdateCardSkeleton />
                        <UpdateCardSkeleton />
                        <UpdateCardSkeleton />
                      </>
                    ) : (
                      latestUpdates.map((update) => (
                        <div 
                          key={update.id} 
                          className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <span>📅</span> {update.date}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded border ${getImpactColor(update.impact)}`}>
                              {update.impact}
                            </span>
                          </div>
                          <span className="inline-block text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded mb-2">
                            {update.category}
                          </span>
                          <h6 className="text-white font-medium text-sm mb-1">{update.title}</h6>
                          <p className="text-gray-400 text-xs line-clamp-2">{update.description}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="p-4 border-t border-gray-700">
                    <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                      <h4 className="text-white text-sm font-medium flex items-center gap-2 mb-2">
                        <span>💡</span>
                        About This Dashboard
                      </h4>
                      <p className="text-gray-400 text-xs mb-3">
                        Data is updated regularly based on official government sources.
                      </p>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li><strong className="text-green-400">Completed:</strong> Promise fully delivered</li>
                        <li><strong className="text-blue-400">In Progress:</strong> Work ongoing</li>
                        <li><strong className="text-yellow-400">Delayed:</strong> Behind timeline</li>
                        <li><strong className="text-gray-500">Not Started:</strong> Yet to begin</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'states' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            <div className="text-center">
              {/* Placeholder Icon */}
              <div className="w-28 h-28 mx-auto mb-8 bg-orange-500/10 border-2 border-orange-500/30 rounded-full flex items-center justify-center">
                <span className="text-6xl">🗺️</span>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">
                State & UT Dashboards Coming Soon
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                We're building comprehensive tracking dashboards for all 28 states and 8 Union Territories.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-colors">
                  <span className="text-4xl mb-4 block">📊</span>
                  <h5 className="text-white font-semibold mb-2">State-wise Progress</h5>
                  <p className="text-gray-400 text-sm">Track promises and completion status for each state government</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-colors">
                  <span className="text-4xl mb-4 block">📰</span>
                  <h5 className="text-white font-semibold mb-2">Latest Updates</h5>
                  <p className="text-gray-400 text-sm">Stay informed about recent developments in your state</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-colors">
                  <span className="text-4xl mb-4 block">⚖️</span>
                  <h5 className="text-white font-semibold mb-2">Comparative Analysis</h5>
                  <p className="text-gray-400 text-sm">Compare performance across states and identify best practices</p>
                </div>
              </div>

              {/* States Grid */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
                <h4 className="text-white font-semibold mb-4">States & UTs Covered</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {[
                    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
                    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
                    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
                    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
                    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
                    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
                  ].map((state) => (
                    <div 
                      key={state}
                      className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 flex items-center gap-2"
                    >
                      <span className="text-orange-400 animate-spin-slow">⏳</span>
                      {state}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-700">
                  {['Delhi (NCT)', 'Puducherry', 'Jammu & Kashmir'].map((ut) => (
                    <div 
                      key={ut}
                      className="bg-blue-900/20 border border-blue-700/50 rounded-lg px-3 py-2 text-sm text-blue-300 flex items-center gap-2"
                    >
                      <span className="text-blue-400 animate-spin-slow">⏳</span>
                      {ut}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-6">
                <p className="text-white mb-4 flex items-center justify-center gap-2">
                  <span>🔔</span>
                  Want to be notified when state dashboards launch?
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors"
                >
                  <span>✉️</span>
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Tracking;
