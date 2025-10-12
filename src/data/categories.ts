import { Category } from '../lib/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Infrastructure & Transport',
    slug: 'infrastructure-transport',
    icon: 'Construction',
    description: 'Roads, railways, ports, airports, and connectivity projects',
    color: '#FF6B35'
  },
  {
    id: 'cat-2',
    name: 'Health',
    slug: 'health',
    icon: 'Heart',
    description: 'Healthcare facilities, medical insurance, and wellness programs',
    color: '#E74C3C'
  },
  {
    id: 'cat-3',
    name: 'Education & Skills',
    slug: 'education-skills',
    icon: 'GraduationCap',
    description: 'Schools, universities, vocational training, and skill development',
    color: '#3498DB'
  },
  {
    id: 'cat-4',
    name: 'Economy, Industry & Jobs',
    slug: 'economy-industry-jobs',
    icon: 'TrendingUp',
    description: 'Economic growth, industrial development, and employment generation',
    color: '#2ECC71'
  },
  {
    id: 'cat-5',
    name: 'Agriculture & Food',
    slug: 'agriculture-food',
    icon: 'Sprout',
    description: 'Farming, food security, agricultural reforms, and rural development',
    color: '#27AE60'
  },
  {
    id: 'cat-6',
    name: 'Social Welfare & Safety Nets',
    slug: 'social-welfare-safety-nets',
    icon: 'Shield',
    description: 'Poverty alleviation, social security, and welfare schemes',
    color: '#9B59B6'
  },
  {
    id: 'cat-7',
    name: 'Women & Children (Nari Shakti)',
    slug: 'women-children',
    icon: 'Users',
    description: 'Women empowerment, child welfare, and gender equality initiatives',
    color: '#E91E63'
  },
  {
    id: 'cat-8',
    name: 'Youth, Startups & Sports',
    slug: 'youth-startups-sports',
    icon: 'Rocket',
    description: 'Youth programs, startup ecosystem, and sports development',
    color: '#FF9800'
  },
  {
    id: 'cat-9',
    name: 'Urban Development, Housing & WASH',
    slug: 'urban-development-housing-wash',
    icon: 'Building2',
    description: 'Urban planning, affordable housing, water, and sanitation',
    color: '#00BCD4'
  },
  {
    id: 'cat-10',
    name: 'Energy, Environment & Climate',
    slug: 'energy-environment-climate',
    icon: 'Leaf',
    description: 'Renewable energy, environmental protection, and climate action',
    color: '#4CAF50'
  },
  {
    id: 'cat-11',
    name: 'Digital Public Infrastructure & Innovation',
    slug: 'digital-infrastructure-innovation',
    icon: 'Cpu',
    description: 'Digital India, technology infrastructure, and innovation',
    color: '#2196F3'
  },
  {
    id: 'cat-12',
    name: 'Governance, Law & Institutions',
    slug: 'governance-law-institutions',
    icon: 'Scale',
    description: 'Government reforms, legal framework, and institutional strengthening',
    color: '#795548'
  },
  {
    id: 'cat-13',
    name: 'Inclusive Development & Social Justice',
    slug: 'inclusive-development-social-justice',
    icon: 'HandHeart',
    description: 'SC/ST/OBC welfare, minority rights, and inclusive growth',
    color: '#FF5722'
  },
  {
    id: 'cat-14',
    name: 'Security, Defence & Global Role',
    slug: 'security-defence-global',
    icon: 'ShieldCheck',
    description: 'National security, defense modernization, and foreign policy',
    color: '#607D8B'
  },
  {
    id: 'cat-15',
    name: 'Miscellaneous',
    slug: 'miscellaneous',
    icon: 'MoreHorizontal',
    description: 'Other initiatives and cross-cutting themes',
    color: '#9E9E9E'
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(cat => cat.slug === slug);
};
