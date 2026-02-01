/**
 * HubContentCarousel - Horizontal carousel of featured content
 * Phase 4 - STORY-058
 * Displays featured videos, articles, and infographics
 */

import React, { useRef, useState, useEffect } from 'react';
import type { HubContent } from './StateElectionHubs';

export interface HubContentCarouselProps {
    /** Array of featured content */
    content: HubContent[];
    /** State name for accessibility */
    stateName: string;
}

/**
 * Content type icons
 */
const CONTENT_TYPE_ICONS: Record<string, { icon: string; color: string }> = {
    video: { icon: '▶️', color: '#EF4444' },
    article: { icon: '📰', color: 'var(--color-accent-primary)' },
    infographic: { icon: '📊', color: 'var(--color-accent-tertiary)' },
};

/**
 * Hub Content Carousel Component
 * Horizontally scrollable carousel of featured content items
 */
export const HubContentCarousel: React.FC<HubContentCarouselProps> = ({
    content,
    stateName,
}) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScrollButtons = () => {
        const container = carouselRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth - 10
            );
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const container = carouselRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            window.addEventListener('resize', checkScrollButtons);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollButtons);
            }
            window.removeEventListener('resize', checkScrollButtons);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        const container = carouselRef.current;
        if (container) {
            const scrollAmount = 280;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (content.length === 0) return null;

    return (
        <div 
            className="hub-content-carousel"
            aria-label={`Featured content from ${stateName}`}
        >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <h4 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    Featured Content
                </h4>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                        style={{
                            backgroundColor: 'var(--color-bg-elevated)',
                            color: 'var(--color-text-primary)',
                        }}
                        aria-label="Scroll content left"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                        style={{
                            backgroundColor: 'var(--color-bg-elevated)',
                            color: 'var(--color-text-primary)',
                        }}
                        aria-label="Scroll content right"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content Cards */}
            <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {content.map((item) => {
                    const typeInfo = CONTENT_TYPE_ICONS[item.type] || CONTENT_TYPE_ICONS.article;

                    return (
                        <a
                            key={item.id}
                            href={`/content/${item.id}`}
                            className="content-card flex-shrink-0 w-64 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                            style={{
                                scrollSnapAlign: 'start',
                                backgroundColor: 'var(--color-bg-card)',
                            }}
                        >
                            {/* Thumbnail */}
                            <div className="relative h-36 overflow-hidden">
                                {/* Placeholder background (image would load here) */}
                                <div 
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{ 
                                        background: `linear-gradient(135deg, ${typeInfo.color}30, ${typeInfo.color}10)`,
                                    }}
                                >
                                    <span className="text-5xl opacity-50">{typeInfo.icon}</span>
                                </div>

                                {/* Content Type Badge */}
                                <span 
                                    className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white"
                                    style={{ backgroundColor: typeInfo.color }}
                                >
                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                </span>

                                {/* New Badge */}
                                {item.isNew && (
                                    <span 
                                        className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white"
                                        style={{ backgroundColor: 'var(--color-accent-tertiary)' }}
                                    >
                                        NEW
                                    </span>
                                )}

                                {/* Duration Badge for Videos */}
                                {item.type === 'video' && item.duration && (
                                    <span 
                                        className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium text-white bg-black/70"
                                    >
                                        {item.duration}
                                    </span>
                                )}

                                {/* Play Button Overlay for Videos */}
                                {item.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div 
                                            className="w-14 h-14 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                                        >
                                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content Title */}
                            <div className="p-3">
                                <h5 
                                    className="font-medium text-sm line-clamp-2 group-hover:text-[var(--color-accent-primary)] transition-colors"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {item.title}
                                </h5>
                            </div>
                        </a>
                    );
                })}
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default HubContentCarousel;
