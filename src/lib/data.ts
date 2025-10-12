import { Promise as PromiseType, PromiseStatus, FilterState, AggregatedStats } from './types';

// Mock data for promises - Frontend only version
const mockPromises: PromiseType[] = [
  {
    id: 'bjp-2024-1',
    title: 'Build 3 Crore Houses Under PM Awas Yojana',
    categoryId: 'cat-1',
    subTheme: 'Housing for All',
    type: 'program',
    timeline: '5yr',
    measurable: true,
    metric: { label: 'Houses Built', target: '3 Crore', unit: 'houses' },
    hasBudgetMention: true,
    status: 'Under implementation',
    geography: 'national',
    description: 'Provide affordable housing to all eligible families under the PM Awas Yojana scheme.',
    citations: [
      { label: 'BJP Manifesto 2024', url: '#' },
      { label: 'Official Announcement', url: '#' }
    ]
  },
  {
    id: 'bjp-2024-2',
    title: 'Establish 1000 New Medical Colleges',
    categoryId: 'cat-2',
    subTheme: 'Medical Education',
    type: 'infrastructure',
    timeline: '5yr',
    measurable: true,
    metric: { label: 'Medical Colleges', target: '1000', unit: 'colleges' },
    hasBudgetMention: true,
    status: 'Under implementation',
    geography: 'national',
    description: 'Expand medical education infrastructure to address doctor shortage and improve healthcare access.',
    citations: [
      { label: 'BJP Manifesto 2024', url: '#' },
      { label: 'Ministry of Health', url: '#' }
    ]
  },
  {
    id: 'bjp-2024-3',
    title: 'Double Farmers Income by 2024',
    categoryId: 'cat-5',
    subTheme: 'Agricultural Income',
    type: 'policy',
    timeline: '5yr',
    measurable: true,
    metric: { label: 'Income Increase', target: '100%', unit: 'percentage' },
    hasBudgetMention: true,
    status: 'Under implementation',
    geography: 'rural',
    description: 'Implement comprehensive measures to double the income of farmers through various schemes and reforms.',
    citations: [
      { label: 'BJP Manifesto 2024', url: '#' },
      { label: 'Agriculture Ministry', url: '#' }
    ]
  },
  {
    id: 'bjp-2024-4',
    title: 'Create 2 Crore Jobs in Manufacturing',
    categoryId: 'cat-4',
    subTheme: 'Employment Generation',
    type: 'program',
    timeline: '5yr',
    measurable: true,
    metric: { label: 'Jobs Created', target: '2 Crore', unit: 'jobs' },
    hasBudgetMention: true,
    status: 'Under implementation',
    geography: 'national',
    description: 'Generate employment opportunities in the manufacturing sector through various initiatives.',
    citations: [
      { label: 'BJP Manifesto 2024', url: '#' },
      { label: 'Make in India', url: '#' }
    ]
  },
  {
    id: 'bjp-2024-5',
    title: 'Digital India - 100% Internet Connectivity',
    categoryId: 'cat-7',
    subTheme: 'Digital Infrastructure',
    type: 'infrastructure',
    timeline: '5yr',
    measurable: true,
    metric: { label: 'Coverage', target: '100%', unit: 'percentage' },
    hasBudgetMention: true,
    status: 'Under implementation',
    geography: 'national',
    description: 'Ensure 100% internet connectivity across India through digital infrastructure development.',
    citations: [
      { label: 'BJP Manifesto 2024', url: '#' },
      { label: 'Digital India Initiative', url: '#' }
    ]
  }
];

// Cache for promises
let promisesCache: PromiseType[] | null = null;

// Fetch promises - Now returns mock data instead of API calls
export const fetchPromises = async (): Promise<PromiseType[]> => {
  if (promisesCache) {
    return promisesCache;
  }

  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  
  promisesCache = mockPromises;
  return promisesCache;
};

export const getPromisesByCategory = async (categoryId: string): Promise<PromiseType[]> => {
  const allPromises = await fetchPromises();
  return allPromises.filter((p: PromiseType) => p.categoryId === categoryId);
};

export const filterPromises = (promises: PromiseType[], filters: FilterState): PromiseType[] => {
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

export const getAggregatedStats = (promises: PromiseType[]): AggregatedStats => {
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
    if (p.status in statusBreakdown) {
      statusBreakdown[p.status as PromiseStatus]++;
    }
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

export const getSubThemes = (promises: PromiseType[]): string[] => {
  const themes = new Set<string>();
  promises.forEach(p => {
    if (p.subTheme) themes.add(p.subTheme);
  });
  return Array.from(themes).sort();
};

export const getPromiseById = async (id: string): Promise<PromiseType | undefined> => {
  const allPromises = await fetchPromises();
  return allPromises.find(p => p.id === id);
};
