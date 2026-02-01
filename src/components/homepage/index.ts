/**
 * Homepage Components Index
 * Phase 4 - Content-Rich Homepage Components
 */

// Core Hero Components
export { HeroSection } from './HeroSection';
export type { HeroSectionProps } from './HeroSection';

export { HeroSectionOverlay } from './HeroSectionOverlay';
export type { HeroSectionOverlayProps } from './HeroSectionOverlay';

export { ElectionCountdownStrip, type UpcomingElection } from './ElectionCountdownStrip';
export type { ElectionCountdownStripProps } from './ElectionCountdownStrip';

export { CountdownTimer } from './CountdownTimer';
export type { CountdownTimerProps } from './CountdownTimer';

// Live Promise Tracker Components (STORY-055)
export { LiveTrackerWidget } from './LiveTrackerWidget';
export type { LiveTrackerWidgetProps, PromiseStats } from './LiveTrackerWidget';

export { StatusBreakdown } from './StatusBreakdown';
export type { StatusBreakdownProps, StatusItem } from './StatusBreakdown';

// Top Promises Section Components (STORY-057)
export { TopPromisesSection } from './TopPromisesSection';
export type { TopPromisesSectionProps } from './TopPromisesSection';

export { CategoryTabs } from './CategoryTabs';
export type { CategoryTabsProps, CategoryTab } from './CategoryTabs';

export { CuratedPromiseCard } from './CuratedPromiseCard';
export type { CuratedPromiseCardProps, CuratedPromise } from './CuratedPromiseCard';

// State Election Hubs Components (STORY-058)
export { StateElectionHubs } from './StateElectionHubs';
export type { StateElectionHubsProps, StateHub, HubSection, HubContent, QuickLink } from './StateElectionHubs';

export { StateHubCard } from './StateHubCard';
export type { StateHubCardProps } from './StateHubCard';

export { HubSectionGrid } from './HubSectionGrid';
export type { HubSectionGridProps } from './HubSectionGrid';

export { HubContentCarousel } from './HubContentCarousel';
export type { HubContentCarouselProps } from './HubContentCarousel';

// Interactive India Map Components (STORY-059)
export { InteractiveIndiaMap } from './InteractiveIndiaMap';
export type { InteractiveIndiaMapProps } from './InteractiveIndiaMap';

export { MapViewToggle } from './MapViewToggle';
export type { MapViewToggleProps, MapViewMode, ViewOption } from './MapViewToggle';

export { MapLegend } from './MapLegend';
export type { MapLegendProps, LegendItem } from './MapLegend';

export { MapTooltip } from './MapTooltip';
export type { MapTooltipProps, StateData } from './MapTooltip';

// Data Hub Section Components (STORY-060)
export { DataHubSection } from './DataHubSection';
export type { DataHubSectionProps } from './DataHubSection';

export { DataToolCard } from './DataToolCard';
export type { DataToolCardProps, DataTool } from './DataToolCard';

// Manifesto Library Section Components (STORY-061)
export { ManifestoLibrarySection } from './ManifestoLibrarySection';
export type { ManifestoLibrarySectionProps, ManifestoCategory } from './ManifestoLibrarySection';

export { ManifestoDownloadCard } from './ManifestoDownloadCard';
export type { ManifestoDownloadCardProps, ManifestoCardData } from './ManifestoDownloadCard';

// Subscribe & Social Section Components (STORY-064)
export { SubscribeSocialSection } from './SubscribeSocialSection';
export type { SubscribeSocialSectionProps, SubscriptionFormData } from './SubscribeSocialSection';

export { SocialLinks } from './SocialLinks';
export type { SocialLinksProps, SocialLink } from './SocialLinks';

// About ManifestoWatch Section Components (STORY-068)
export { AboutManifestoWatch } from './AboutManifestoWatch';
export type { AboutManifestoWatchProps } from './AboutManifestoWatch';

export { TrustIndicatorCard } from './TrustIndicatorCard';
export type { TrustIndicatorCardProps, TrustIndicator } from './TrustIndicatorCard';

// Section Utilities (STORY-066)
export { SectionErrorBoundary } from './SectionErrorBoundary';
export type { SectionErrorBoundaryProps } from './SectionErrorBoundary';

export { SectionSkeleton } from './SectionSkeleton';
export type { SectionSkeletonProps, SectionSkeletonVariant } from './SectionSkeleton';

// Homepage SEO & Meta Tags (STORY-067)
export { default as HomepageSEO } from './HomepageSEO';
export type { default as HomepageSEOProps } from './HomepageSEO';
