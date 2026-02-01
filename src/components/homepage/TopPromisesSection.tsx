/**
 * TopPromisesSection Component
 * Main section showing curated promises by category
 * Features tabbed navigation and responsive grid
 * 
 * STORY-057: Top Promises by Category Section
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CategoryTabs, type CategoryTab } from './CategoryTabs';
import { CuratedPromiseCard, type CuratedPromise } from './CuratedPromiseCard';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import { categories as defaultCategories } from '../../data/categories';

export interface TopPromisesSectionProps {
  promises?: CuratedPromise[];
  categories?: CategoryTab[];
  defaultCategory?: string;
  isLoading?: boolean;
  error?: string | null;
  onCategoryChange?: (categoryId: string) => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * Mock promises for initial display
 * Will be replaced with API data
 */
const MOCK_PROMISES: CuratedPromise[] = [
  {
    id: 'promise-1',
    title: 'Bullet Train Network: Mumbai-Ahmedabad High-Speed Rail',
    summary: 'Complete the first bullet train corridor by 2028',
    partyId: 'bjp',
    partyName: 'BJP',
    partyColor: '#FF9933',
    status: 'Under implementation',
    impactScore: 9,
    categorySlug: 'infrastructure-transport',
  },
  {
    id: 'promise-2',
    title: 'AIIMS in Every State - Healthcare Infrastructure Expansion',
    summary: 'Establish AIIMS-like institutions in all states',
    partyId: 'bjp',
    partyName: 'BJP',
    partyColor: '#FF9933',
    status: 'Actioned',
    impactScore: 8,
    categorySlug: 'health',
  },
  {
    id: 'promise-3',
    title: 'MSP Legal Guarantee for Farmers',
    summary: 'Ensure minimum support price for all major crops',
    partyId: 'inc',
    partyName: 'Congress',
    partyColor: '#19AAED',
    status: 'Announced',
    impactScore: 9,
    categorySlug: 'agriculture-food',
  },
  {
    id: 'promise-4',
    title: 'PM-KISAN: Direct Cash Transfer to Farmers',
    summary: '₹6,000 annual support to 11 crore farmers',
    partyId: 'bjp',
    partyName: 'BJP',
    partyColor: '#FF9933',
    status: 'Delivered',
    impactScore: 8,
    categorySlug: 'agriculture-food',
  },
  {
    id: 'promise-5',
    title: 'National Education Policy Implementation',
    summary: 'Transform education with NEP 2020 reforms',
    partyId: 'bjp',
    partyName: 'BJP',
    partyColor: '#FF9933',
    status: 'Under implementation',
    impactScore: 9,
    categorySlug: 'education-skills',
  },
  {
    id: 'promise-6',
    title: 'Metro Expansion in Tier-2 Cities',
    summary: 'Bring metro connectivity to 50 new cities',
    partyId: 'bjp',
    partyName: 'BJP',
    partyColor: '#FF9933',
    status: 'Under implementation',
    impactScore: 7,
    categorySlug: 'infrastructure-transport',
  },
  {
    id: 'promise-7',
    title: 'Startup India 2.0 - ₹10,000 Cr Fund',
    summary: 'Expand startup ecosystem with new funding',
    partyId: 'bjp',
    partyName: 'BJP',
    partyColor: '#FF9933',
    status: 'Actioned',
    impactScore: 8,
    categorySlug: 'youth-startups-sports',
  },
  {
    id: 'promise-8',
    title: 'Ayushman Bharat Expansion - 50 Cr Coverage',
    summary: 'Health insurance for 50 crore citizens',
    partyId: 'bjp',
    partyName: 'BJP',
    partyColor: '#FF9933',
    status: 'Delivered',
    impactScore: 10,
    categorySlug: 'health',
  },
];

/**
 * Loading skeleton for promises grid
 */
const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="animate-pulse rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-default)] p-4">
        <div className="h-1 w-full bg-[var(--color-bg-elevated)] rounded mb-4" />
        <div className="h-4 bg-[var(--color-bg-elevated)] rounded w-3/4 mb-2" />
        <div className="h-4 bg-[var(--color-bg-elevated)] rounded w-1/2 mb-4" />
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 rounded-full bg-[var(--color-bg-elevated)]" />
          <div className="h-3 bg-[var(--color-bg-elevated)] rounded w-16" />
        </div>
        <div className="h-6 bg-[var(--color-bg-elevated)] rounded w-20" />
      </div>
    ))}
  </div>
);

export const TopPromisesSection: React.FC<TopPromisesSectionProps> = ({
  promises = MOCK_PROMISES,
  categories,
  defaultCategory = 'all',
  isLoading = false,
  error = null,
  onCategoryChange,
  className = '',
  'data-testid': dataTestId = 'top-promises-section',
}) => {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [sortBy, setSortBy] = useState<'impact' | 'recent' | 'shares'>('impact');

  // Convert categories to tab format
  const categoryTabs: CategoryTab[] = useMemo(() => {
    if (categories) return categories;
    
    // Use top 6 categories from default
    return defaultCategories.slice(0, 6).map(cat => ({
      id: cat.id,
      name: cat.name.split(' & ')[0], // Shorten name for tabs
      slug: cat.slug,
      icon: cat.icon,
      count: promises.filter(p => p.categorySlug === cat.slug).length,
    }));
  }, [categories, promises]);

  // Filter promises by active category
  const filteredPromises = useMemo(() => {
    let filtered = promises;
    
    if (activeCategory !== 'all') {
      const category = categoryTabs.find(c => c.id === activeCategory);
      if (category) {
        filtered = promises.filter(p => p.categorySlug === category.slug);
      }
    }

    // Sort
    return filtered.slice().sort((a, b) => {
      switch (sortBy) {
        case 'impact':
          return (b.impactScore || 0) - (a.impactScore || 0);
        case 'shares':
          return (b.shareCount || 0) - (a.shareCount || 0);
        case 'recent':
          return new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime();
        default:
          return 0;
      }
    }).slice(0, 4); // Show 4 promises max
  }, [promises, activeCategory, categoryTabs, sortBy]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  }, [onCategoryChange]);

  // Get current category for "View All" link
  const currentCategorySlug = useMemo(() => {
    if (activeCategory === 'all') return '';
    const category = categoryTabs.find(c => c.id === activeCategory);
    return category?.slug || '';
  }, [activeCategory, categoryTabs]);

  return (
    <section
      ref={ref}
      className={`py-12 md:py-16 bg-[var(--color-bg-secondary)] ${className}`}
      data-testid={dataTestId}
      aria-labelledby="top-promises-title"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 
              id="top-promises-title"
              className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] flex items-center gap-3"
            >
              Top Promises
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                           bg-[var(--color-accent-tertiary)]/20 text-[var(--color-accent-tertiary)]"
              >
                <span aria-hidden="true">🤖</span>
                <span>Curated by AI</span>
              </span>
            </h2>
            <p className="text-[var(--color-text-muted)] mt-2">
              Browse key promises from leading political parties
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-[var(--color-text-muted)]">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-lg text-sm font-medium
                         bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]
                         border border-[var(--color-border-default)]
                         focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50"
            >
              <option value="impact">Most Impactful</option>
              <option value="recent">Recently Updated</option>
              <option value="shares">Most Shared</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categoryTabs}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          className="mb-8"
        />

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div 
            className="text-center py-12 rounded-xl bg-[var(--color-status-deferred)]/10 border border-[var(--color-status-deferred)]/30"
            role="alert"
          >
            <span className="text-4xl mb-3 block" aria-hidden="true">⚠️</span>
            <p className="text-[var(--color-status-deferred)] font-medium">{error}</p>
          </div>
        ) : filteredPromises.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-4xl mb-3 block" aria-hidden="true">📭</span>
            <p className="text-[var(--color-text-muted)]">No promises found in this category</p>
          </div>
        ) : (
          <div 
            className={`
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4
              transition-opacity duration-500
              ${isInView ? 'opacity-100' : 'opacity-0'}
            `}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory}`}
          >
            {filteredPromises.map((promise, index) => (
              <div
                key={promise.id}
                className="transition-all duration-300"
                style={{
                  transitionDelay: isInView ? `${index * 100}ms` : '0ms',
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                }}
              >
                <CuratedPromiseCard promise={promise} />
              </div>
            ))}
          </div>
        )}

        {/* View All Link */}
        {filteredPromises.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to={currentCategorySlug ? `/category/${currentCategorySlug}` : '/promises'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                         font-medium text-sm
                         bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]
                         border border-[var(--color-border-default)]
                         hover:border-[var(--color-accent-tertiary)]
                         hover:text-[var(--color-accent-tertiary)]
                         transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-tertiary)]/50"
              data-testid="view-all-promises-link"
            >
              View All {activeCategory !== 'all' ? categoryTabs.find(c => c.id === activeCategory)?.name : ''} Promises
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopPromisesSection;
