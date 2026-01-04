/**
 * Party Logo Utility
 * Maps party names to their logo images
 */

// Party logo mapping - maps party name (normalized) to logo filename
const PARTY_LOGO_MAP: Record<string, string> = {
  // National Parties
  'bharatiya janata party': 'bjp.png',
  'bjp': 'bjp.png',
  'indian national congress': 'inc.png',
  'congress': 'inc.png',
  'inc': 'inc.png',
  'aam aadmi party': 'aap.png',
  'aap': 'aap.png',
  'communist party of india (marxist)': 'cpim.png',
  'cpi(m)': 'cpim.png',
  'communist party of india': 'cpi.png',
  'cpi': 'cpi.png',
  'bahujan samaj party': 'bsp.png',
  'bsp': 'bsp.png',
  'nationalist congress party': 'ncp.png',
  'ncp': 'ncp.png',
  'trinamool congress': 'tmc.png',
  'tmc': 'tmc.png',
  'all india trinamool congress': 'tmc.png',
  
  // Regional Parties
  'shiv sena': 'shivsena.png',
  'dravida munnetra kazhagam': 'dmk.png',
  'dmk': 'dmk.png',
  'all india anna dravida munnetra kazhagam': 'aiadmk.png',
  'aiadmk': 'aiadmk.png',
  'telugu desam party': 'tdp.png',
  'tdp': 'tdp.png',
  'biju janata dal': 'bjd.png',
  'bjd': 'bjd.png',
  'samajwadi party': 'sp.png',
  'sp': 'sp.png',
  'rashtriya janata dal': 'rjd.png',
  'rjd': 'rjd.png',
  'janata dal (united)': 'jdu.png',
  'jd(u)': 'jdu.png',
  'janata dal (secular)': 'jds.png',
  'jd(s)': 'jds.png',
  'shiromani akali dal': 'akali.png',
  'akali dal': 'akali.png',
  'ysr congress party': 'ysrcp.png',
  'ysrcp': 'ysrcp.png',
  
  // Alliances
  'nda alliance': 'nda.png',
  'india alliance': 'india-alliance.png',
  'upa': 'upa.png',
};

// Default logo for unknown parties
const DEFAULT_LOGO = 'default-party.svg';

/**
 * Get party logo path based on party name
 * @param partyName - Name of the political party
 * @returns Path to the party logo image
 */
export function getPartyLogo(partyName: string): string {
  if (!partyName) {
    return `/static/images/party-logos/${DEFAULT_LOGO}`;
  }
  
  // Normalize party name (lowercase, trim)
  const normalizedName = partyName.toLowerCase().trim();
  
  // Check if we have a logo for this party
  const logoFileName = PARTY_LOGO_MAP[normalizedName];
  
  if (logoFileName) {
    return `/static/images/party-logos/${logoFileName}`;
  }
  
  // Try to match partial names (e.g., "Bharatiya Janata Party (BJP)" -> "bjp")
  for (const [key, fileName] of Object.entries(PARTY_LOGO_MAP)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return `/static/images/party-logos/${fileName}`;
    }
  }
  
  // Return default logo if no match found
  return `/static/images/party-logos/${DEFAULT_LOGO}`;
}

/**
 * Get party short name/abbreviation
 * @param partyName - Name of the political party
 * @returns Short name or abbreviation
 */
export function getPartyShortName(partyName: string): string {
  const shortNames: Record<string, string> = {
    'bharatiya janata party': 'BJP',
    'indian national congress': 'INC',
    'aam aadmi party': 'AAP',
    'communist party of india (marxist)': 'CPI(M)',
    'communist party of india': 'CPI',
    'bahujan samaj party': 'BSP',
    'nationalist congress party': 'NCP',
    'all india trinamool congress': 'TMC',
    'trinamool congress': 'TMC',
    'shiv sena': 'Shiv Sena',
    'dravida munnetra kazhagam': 'DMK',
    'all india anna dravida munnetra kazhagam': 'AIADMK',
    'telugu desam party': 'TDP',
    'biju janata dal': 'BJD',
    'samajwadi party': 'SP',
    'rashtriya janata dal': 'RJD',
    'janata dal (united)': 'JD(U)',
    'janata dal (secular)': 'JD(S)',
    'shiromani akali dal': 'Akali Dal',
    'ysr congress party': 'YSRCP',
  };
  
  const normalizedName = partyName.toLowerCase().trim();
  return shortNames[normalizedName] || partyName;
}

/**
 * Check if party logo exists
 * @param partyName - Name of the political party
 * @returns true if logo mapping exists
 */
export function hasPartyLogo(partyName: string): boolean {
  const normalizedName = partyName.toLowerCase().trim();
  return normalizedName in PARTY_LOGO_MAP;
}
