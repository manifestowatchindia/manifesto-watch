// Professional cartographic data from Simplemaps.com
// Copyright (c) 2024 Pareto Software, LLC DBA Simplemaps.com
// Free for Commercial Use: https://simplemaps.com/resources/svg-license
// Attribution appreciated: https://simplemaps.com

export interface StatePathData {
  id: string;
  name: string;
  pathData: string;
}

// Mapping between Simplemaps.com state IDs and our state names
export const STATE_CODE_MAP: Record<string, string> = {
  'INAN': 'Andaman and Nicobar',
  'INTG': 'Telangana',
  'INAP': 'Andhra Pradesh',
  'INAR': 'Arunachal Pradesh',
  'INAS': 'Assam',
  'INBR': 'Bihar',
  'INCH': 'Chandigarh',
  'INCT': 'Chhattisgarh',
  'INDH': 'Dādra and Nagar Haveli and Damān and Diu',
  'INDL': 'Delhi',
  'INGA': 'Goa',
  'INGJ': 'Gujarat',
  'INHR': 'Haryana',
  'INHP': 'Himachal Pradesh',
  'INJH': 'Jharkhand',
  'INKA': 'Karnataka',
  'INKL': 'Kerala',
  'INMP': 'Madhya Pradesh',
  'INMH': 'Maharashtra',
  'INMN': 'Manipur',
  'INML': 'Meghalaya',
  'INMZ': 'Mizoram',
  'INNL': 'Nagaland',
  'INOR': 'Orissa', // Note: In stateGovernments array, it's "Odisha"
  'INPB': 'Punjab',
  'INRJ': 'Rajasthan',
  'INSK': 'Sikkim',
  'INTN': 'Tamil Nadu',
  'INTR': 'Tripura',
  'INUP': 'Uttar Pradesh',
  'INUT': 'Uttaranchal', // Note: In stateGovernments array, it's "Uttarakhand"
  'INWB': 'West Bengal',
  'INJK': 'Jammu and Kashmir',
  'INLA': 'Ladakh',
  'INLD': 'Lakshadweep',
  'INPY': 'Puducherry'
};

// Helper function to normalize state names for matching
export const normalizeStateName = (name: string): string => {
  // Handle common variations
  const normalized = name
    .replace('Dādra', 'Dadra')
    .replace('Damān', 'Daman')
    .replace('Orissa', 'Odisha')
    .replace('Uttaranchal', 'Uttarakhand')
    .replace('Jammu and Kashmir', 'Jammu & Kashmir')
    .replace(/\s+/g, ' ') // Normalize multiple spaces
    .trim();
  
  return normalized;
};
