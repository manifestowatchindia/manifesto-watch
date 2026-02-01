/**
 * CategoryTabs Component
 * Horizontal scrollable tab navigation for categories
 * Uses design system colors
 * 
 * STORY-057: Top Promises by Category Section
 */

import React, { useRef, useEffect, useState } from 'react';

export interface CategoryTab {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count?: number;
}

export interface CategoryTabsProps {
  categories: CategoryTab[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * Get icon component for category
 */
const getCategoryIcon = (iconName: string): string => {
  const iconMap: Record<string, string> = {
    'Construction': '🛤️',
    'Heart': '🏥',
    'GraduationCap': '🎓',
    'TrendingUp': '💰',
    'Sprout': '🌾',
    'Shield': '🛡️',
    'Users': '👩‍👧',
    'Rocket': '🚀',
    'Building2': '🏙️',
    'Leaf': '🌿',
    'Cpu': '💻',
    'Scale': '⚖️',
    'Flag': '🏳️',
    'Globe': '🌍',
    'Star': '⭐',
  };
  return iconMap[iconName] || '📋';
};

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className = '',
  'data-testid': dataTestId = 'category-tabs',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  // Check scroll position for arrow visibility
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setShowLeftScroll(container.scrollLeft > 0);
    setShowRightScroll(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [categories]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  // Scroll active tab into view
  useEffect(() => {
    const activeTab = document.querySelector(`[data-tab-id="${activeCategory}"]`);
    if (activeTab && typeof activeTab.scrollIntoView === 'function') {
      try {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } catch {
        // scrollIntoView with options may not be supported in all browsers
      }
    }
  }, [activeCategory]);

  return (
    <div 
      className={`relative ${className}`}
      data-testid={dataTestId}
    >
      {/* Left Scroll Button */}
      {showLeftScroll && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 rounded-full
                     bg-[var(--color-bg-elevated)] shadow-lg
                     flex items-center justify-center
                     hover:bg-[var(--color-bg-secondary)]
                     transition-all duration-200
                     border border-[var(--color-border-default)]"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Tabs Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-2 py-1"
        role="tablist"
        aria-label="Promise categories"
      >
        {/* All Tab */}
        <button
          role="tab"
          aria-selected={activeCategory === 'all'}
          data-tab-id="all"
          onClick={() => onCategoryChange('all')}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl
            whitespace-nowrap font-medium text-sm
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50
            ${activeCategory === 'all'
              ? 'bg-[var(--color-accent-primary)] text-white shadow-[var(--shadow-accent)]'
              : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
            }
          `}
          data-testid="tab-all"
        >
          <span aria-hidden="true">📊</span>
          <span>All</span>
        </button>

        {/* Category Tabs */}
        {categories.map((category) => (
          <button
            key={category.id}
            role="tab"
            aria-selected={activeCategory === category.id}
            data-tab-id={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl
              whitespace-nowrap font-medium text-sm
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50
              ${activeCategory === category.id
                ? 'bg-[var(--color-accent-primary)] text-white shadow-[var(--shadow-accent)]'
                : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
              }
            `}
            data-testid={`tab-${category.slug}`}
          >
            <span aria-hidden="true">{getCategoryIcon(category.icon)}</span>
            <span>{category.name}</span>
            {category.count !== undefined && (
              <span 
                className={`
                  text-xs px-1.5 py-0.5 rounded-full
                  ${activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--color-bg-primary)] text-[var(--color-text-muted)]'
                  }
                `}
              >
                {category.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Right Scroll Button */}
      {showRightScroll && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 rounded-full
                     bg-[var(--color-bg-elevated)] shadow-lg
                     flex items-center justify-center
                     hover:bg-[var(--color-bg-secondary)]
                     transition-all duration-200
                     border border-[var(--color-border-default)]"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Gradient Fades */}
      {showLeftScroll && (
        <div 
          className="absolute left-10 top-0 bottom-0 w-8 pointer-events-none
                     bg-gradient-to-r from-[var(--color-bg-secondary)] to-transparent"
          aria-hidden="true"
        />
      )}
      {showRightScroll && (
        <div 
          className="absolute right-10 top-0 bottom-0 w-8 pointer-events-none
                     bg-gradient-to-l from-[var(--color-bg-secondary)] to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default CategoryTabs;
