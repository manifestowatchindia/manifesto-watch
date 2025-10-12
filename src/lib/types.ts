export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  color?: string;
}

export type PromiseType = "policy" | "program" | "infrastructure" | "legal";
export type Timeline = "100d" | "5yr" | "2047";
export type PromiseStatus = "Announced" | "Actioned" | "Under implementation" | "Delivered" | "Deferred";
export type Geography = "national" | "state" | "urban" | "rural" | "mixed";

export interface Metric {
  label: string;
  target?: string;
  unit?: string;
}

export interface Citation {
  label: string;
  url: string;
}

export interface Promise {
  id: string;
  title: string;
  categoryId: string;
  subTheme?: string;
  type: PromiseType;
  timeline: Timeline;
  measurable: boolean;
  metric?: Metric;
  hasBudgetMention?: boolean;
  status: PromiseStatus;
  geography: Geography;
  citations: Citation[];
  description?: string;
}

export interface FilterState {
  status?: PromiseStatus[];
  type?: PromiseType[];
  timeline?: Timeline[];
  geography?: Geography[];
  measurable?: boolean;
  hasBudget?: boolean;
  search?: string;
}

export interface AggregatedStats {
  totalPromises: number;
  measurablePercent: number;
  withBudgetPercent: number;
  statusBreakdown: Record<PromiseStatus, number>;
  typeBreakdown: Record<PromiseType, number>;
  timelineBreakdown: Record<Timeline, number>;
}
