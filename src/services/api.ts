/**
 * API Service - Now uses mock data instead of backend calls
 * Frontend-only version
 */

interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Mock data (same as in data.ts)
const mockPromises = [
  {
    id: 'bjp-2024-1',
    title: 'Build 3 Crore Houses Under PM Awas Yojana',
    category_id: 'cat-1',
    sub_theme: 'Housing for All',
    type: 'program',
    timeline: '5yr',
    measurable: true,
    metric: { label: 'Houses Built', target: '3 Crore', unit: 'houses' },
    has_budget_mention: true,
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
    category_id: 'cat-2',
    sub_theme: 'Medical Education',
    type: 'infrastructure',
    timeline: '5yr',
    measurable: true,
    metric: { label: 'Medical Colleges', target: '1000', unit: 'colleges' },
    has_budget_mention: true,
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
    category_id: 'cat-5',
    sub_theme: 'Agricultural Income',
    type: 'policy',
    timeline: '5yr',
    measurable: true,
    metric: { label: 'Income Increase', target: '100%', unit: 'percentage' },
    has_budget_mention: true,
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
    category_id: 'cat-4',
    sub_theme: 'Employment Generation',
    type: 'program',
    timeline: '5yr',
    measurable: true,
    metric: { label: 'Jobs Created', target: '2 Crore', unit: 'jobs' },
    has_budget_mention: true,
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
    category_id: 'cat-7',
    sub_theme: 'Digital Infrastructure',
    type: 'infrastructure',
    timeline: '5yr',
    measurable: true,
    metric: { label: 'Coverage', target: '100%', unit: 'percentage' },
    has_budget_mention: true,
    status: 'Under implementation',
    geography: 'national',
    description: 'Ensure 100% internet connectivity across India through digital infrastructure development.',
    citations: [
      { label: 'BJP Manifesto 2024', url: '#' },
      { label: 'Digital India Initiative', url: '#' }
    ]
  }
];

/**
 * Simulate API delay
 */
async function simulateApiDelay(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 100));
}

/**
 * Fetch all promises with optional filters
 */
export async function fetchPromises(filters?: {
  category_id?: string;
  manifesto_id?: string;
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<ApiResponse<any[]>> {
  await simulateApiDelay();
  
  let filteredPromises = [...mockPromises];
  
  if (filters?.category_id) {
    filteredPromises = filteredPromises.filter(p => p.category_id === filters.category_id);
  }
  
  if (filters?.status) {
    filteredPromises = filteredPromises.filter(p => p.status === filters.status);
  }
  
  if (filters?.limit) {
    filteredPromises = filteredPromises.slice(0, filters.limit);
  }
  
  return { data: filteredPromises };
}

/**
 * Fetch promises by category
 */
export async function fetchPromisesByCategory(categoryId: string, manifestoId?: string): Promise<ApiResponse<any[]>> {
  await simulateApiDelay();
  
  let filteredPromises = mockPromises.filter(p => p.category_id === categoryId);
  
  if (manifestoId) {
    // For now, we don't filter by manifesto since our mock data doesn't have manifesto_id
    // In a real scenario, you would filter here
  }
  
  return { data: filteredPromises };
}

/**
 * Fetch single promise by ID
 */
export async function fetchPromiseById(promiseId: string): Promise<ApiResponse<any>> {
  await simulateApiDelay();
  
  const promise = mockPromises.find(p => p.id === promiseId);
  
  if (!promise) {
    return { data: null, error: 'Promise not found' };
  }
  
  return { data: promise };
}

/**
 * Fetch categories (mock implementation)
 */
export async function fetchCategories(): Promise<ApiResponse<any[]>> {
  await simulateApiDelay();
  
  // Mock categories data
  const mockCategories = [
    { id: 'cat-1', name: 'Infrastructure & Transport' },
    { id: 'cat-2', name: 'Health' },
    { id: 'cat-3', name: 'Education & Skills' },
    { id: 'cat-4', name: 'Economy, Industry & Jobs' },
    { id: 'cat-5', name: 'Agriculture & Food' }
  ];
  
  return { data: mockCategories };
}

/**
 * Fetch single category by ID
 */
export async function fetchCategoryById(categoryId: string): Promise<ApiResponse<any>> {
  await simulateApiDelay();
  
  const categories = [
    { id: 'cat-1', name: 'Infrastructure & Transport' },
    { id: 'cat-2', name: 'Health' },
    { id: 'cat-3', name: 'Education & Skills' },
    { id: 'cat-4', name: 'Economy, Industry & Jobs' },
    { id: 'cat-5', name: 'Agriculture & Food' }
  ];
  
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) {
    return { data: null, error: 'Category not found' };
  }
  
  return { data: category };
}

/**
 * Fetch manifestos (mock implementation)
 */
export async function fetchManifestos(): Promise<ApiResponse<any[]>> {
  await simulateApiDelay();
  
  const mockManifestos = [
    { id: 'bjp-2024', name: 'BJP Manifesto 2024', party: 'BJP', year: 2024 }
  ];
  
  return { data: mockManifestos };
}