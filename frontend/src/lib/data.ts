import { Promise, PromiseStatus, FilterState, AggregatedStats } from './types';
import promisesData from '../data/promises.json';

export const promises: Promise[] = promisesData as Promise[];

export const getPromisesByCategory = (categoryId: string): Promise[] => {
  return promises.filter(p => p.categoryId === categoryId);
};

export const filterPromises = (promises: Promise[], filters: FilterState): Promise[] => {
  let filtered = [...promises];

  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter(p => filters.status!.includes(p.status));
  }

  if (filters.type && filters.type.length > 0) {
    filtered = filtered.filter(p => filters.type!.includes(p.type));
  }

  if (filters.timeline && filters.timeline.length > 0) {
    filtered = filtered.filter(p => filters.timeline!.includes(p.timeline));
  }

  if (filters.geography && filters.geography.length > 0) {
    filtered = filtered.filter(p => filters.geography!.includes(p.geography));
  }

  if (filters.measurable !== undefined) {
    filtered = filtered.filter(p => p.measurable === filters.measurable);
  }

  if (filters.hasBudget !== undefined) {
    filtered = filtered.filter(p => p.hasBudgetMention === filters.hasBudget);
  }

  if (filters.search && filters.search.trim()) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower) ||
      p.subTheme?.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};

export const getAggregatedStats = (promises: Promise[]): AggregatedStats => {
  const total = promises.length;
  const measurableCount = promises.filter(p => p.measurable).length;
  const withBudgetCount = promises.filter(p => p.hasBudgetMention).length;

  const statusBreakdown: Record<PromiseStatus, number> = {
    'Announced': 0,
    'Actioned': 0,
    'Under implementation': 0,
    'Delivered': 0,
    'Deferred': 0
  };

  const typeBreakdown: Record<string, number> = {
    'policy': 0,
    'program': 0,
    'infrastructure': 0,
    'legal': 0
  };

  const timelineBreakdown: Record<string, number> = {
    '100d': 0,
    '5yr': 0,
    '2047': 0
  };

  promises.forEach(p => {
    statusBreakdown[p.status]++;
    typeBreakdown[p.type]++;
    timelineBreakdown[p.timeline]++;
  });

  return {
    totalPromises: total,
    measurablePercent: total > 0 ? Math.round((measurableCount / total) * 100) : 0,
    withBudgetPercent: total > 0 ? Math.round((withBudgetCount / total) * 100) : 0,
    statusBreakdown: statusBreakdown as any,
    typeBreakdown: typeBreakdown as any,
    timelineBreakdown: timelineBreakdown as any
  };
};

export const getSubThemes = (promises: Promise[]): string[] => {
  const themes = new Set<string>();
  promises.forEach(p => {
    if (p.subTheme) themes.add(p.subTheme);
  });
  return Array.from(themes).sort();
};

export const getPromiseById = (id: string): Promise | undefined => {
  return promises.find(p => p.id === id);
};
