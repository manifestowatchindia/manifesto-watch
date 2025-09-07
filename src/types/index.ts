// Type definitions for Manifesto Watch application

export interface Manifesto {
  id: string;
  party: string;
  year: string;
  title: string;
  description: string;
  status: 'Active' | 'Archived' | 'Draft';
  promises: number;
  datePublished?: string;
  lastUpdated?: string;
}

export interface Promise {
  id: string;
  manifestoId: string;
  title: string;
  description: string;
  category: string;
  status: 'Fulfilled' | 'In Progress' | 'Not Started' | 'Broken';
  priority: 'High' | 'Medium' | 'Low';
  progress?: number; // 0-100
  lastUpdated?: string;
}

export interface Party {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  website?: string;
  foundedYear?: number;
  leader?: string;
}

export interface ComparisonTopic {
  id: string;
  name: string;
  description: string;
  icon: string;
  manifestos: {
    manifestoId: string;
    promises: Promise[];
  }[];
}

export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}