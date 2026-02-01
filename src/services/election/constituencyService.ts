import { cacheManager } from '../api/cache-manager';
import { API_CONFIG, buildApiUrl } from '../../lib/config';
import { Promise as PromiseType } from '../../lib/types';

/**
 * Constituency Service
 * 
 * Manages constituency data for state elections including
 * constituency details, candidates, and local promises.
 */

// Types
export interface Candidate {
    id: string;
    name: string;
    party: string;
    partyLogo?: string;
    age?: number;
    education?: string;
    profession?: string;
    criminalCases?: number;
    assets?: number;
    isIncumbent?: boolean;
}

export interface ConstituencyData {
    id: string;
    name: string;
    state: string;
    electionId: string;
    number: number;
    voters: number;
    pollingBooths?: number;
    incumbent?: string;
    incumbentParty?: string;
    reservationStatus?: 'General' | 'SC' | 'ST' | 'None';
    candidates?: Candidate[];
    keyPromises?: PromiseType[];
    lastElectionResults?: {
        winner: string;
        winnerParty: string;
        margin: number;
        voterTurnout: number;
    };
}

export interface ConstituencyListItem {
    id: string;
    name: string;
    number: number;
    voters: number;
    reservationStatus?: string;
    incumbent?: string;
    incumbentParty?: string;
}

export interface ConstituencyPromise extends PromiseType {
    relevanceToConstituency?: string;
    localImpact?: string;
}

// Cache configuration
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

/**
 * Fetch constituencies from API
 */
async function fetchConstituencies(electionId: string): Promise<ConstituencyListItem[]> {
    const url = buildApiUrl(`/api/v1/elections/${electionId}/constituencies`);
    
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    });
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    return await response.json();
}

/**
 * Fetch constituency details from API
 */
async function fetchConstituencyById(constituencyId: string): Promise<ConstituencyData> {
    const url = buildApiUrl(`/api/v1/constituencies/${constituencyId}`);
    
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    });
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    return await response.json();
}

/**
 * Fetch promises for constituency from API
 */
async function fetchConstituencyPromises(constituencyId: string): Promise<ConstituencyPromise[]> {
    const url = buildApiUrl(`/api/v1/constituencies/${constituencyId}/promises`);
    
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    });
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    return await response.json();
}

/**
 * Get all constituencies for a given election
 */
export const getConstituenciesByElection = async (
    electionId: string
): Promise<ConstituencyListItem[]> => {
    const cacheKey = `constituencies_${electionId}`;
    
    // Check cache first
    const cached = cacheManager.get<ConstituencyListItem[]>(cacheKey);
    if (cached) {
        return cached;
    }

    try {
        const response = await fetchConstituencies(electionId);
        
        // Cache the result
        cacheManager.set(cacheKey, response, CACHE_TTL);
        
        return response;
    } catch (error) {
        console.error(`Error fetching constituencies for election ${electionId}:`, error);
        
        // Return mock data for development
        return getMockConstituencies(electionId);
    }
};

/**
 * Get detailed information for a specific constituency
 */
export const getConstituencyById = async (
    constituencyId: string
): Promise<ConstituencyData | null> => {
    const cacheKey = `constituency_${constituencyId}`;
    
    // Check cache first
    const cached = cacheManager.get<ConstituencyData>(cacheKey);
    if (cached) {
        return cached;
    }

    try {
        const response = await fetchConstituencyById(constituencyId);
        
        // Cache the result
        cacheManager.set(cacheKey, response, CACHE_TTL);
        
        return response;
    } catch (error) {
        console.error(`Error fetching constituency ${constituencyId}:`, error);
        
        // Return mock data for development
        return getMockConstituencyById(constituencyId);
    }
};

/**
 * Get promises relevant to a specific constituency
 */
export const getPromisesByConstituency = async (
    constituencyId: string
): Promise<ConstituencyPromise[]> => {
    const cacheKey = `constituency_promises_${constituencyId}`;
    
    // Check cache first
    const cached = cacheManager.get<ConstituencyPromise[]>(cacheKey);
    if (cached) {
        return cached;
    }

    try {
        const response = await fetchConstituencyPromises(constituencyId);
        
        // Cache the result
        cacheManager.set(cacheKey, response, CACHE_TTL);
        
        return response;
    } catch (error) {
        console.error(`Error fetching promises for constituency ${constituencyId}:`, error);
        
        // Return mock data for development
        return getMockConstituencyPromises(constituencyId);
    }
};

/**
 * Search constituencies by name
 */
export const searchConstituencies = async (
    electionId: string,
    query: string
): Promise<ConstituencyListItem[]> => {
    const constituencies = await getConstituenciesByElection(electionId);
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return constituencies.filter(c => 
        c.name.toLowerCase().includes(normalizedQuery) ||
        c.number.toString().includes(normalizedQuery)
    );
};

/**
 * Clear constituency cache
 */
export const clearConstituencyCache = (): void => {
    cacheManager.clear();
};

// Mock data functions for development
const getMockConstituencies = (electionId: string): ConstituencyListItem[] => {
    // Extract state from electionId (e.g., "kerala_assembly_2026" -> "Kerala")
    const statePart = electionId.split('_')[0];
    
    const constituencies: ConstituencyListItem[] = [
        { id: `${statePart}_001`, name: 'Thiruvananthapuram', number: 1, voters: 185000, reservationStatus: 'General', incumbent: 'Current MLA 1', incumbentParty: 'LDF' },
        { id: `${statePart}_002`, name: 'Attingal', number: 2, voters: 172000, reservationStatus: 'General', incumbent: 'Current MLA 2', incumbentParty: 'UDF' },
        { id: `${statePart}_003`, name: 'Chirayinkeezhu', number: 3, voters: 168000, reservationStatus: 'SC', incumbent: 'Current MLA 3', incumbentParty: 'LDF' },
        { id: `${statePart}_004`, name: 'Nedumangad', number: 4, voters: 175000, reservationStatus: 'General', incumbent: 'Current MLA 4', incumbentParty: 'LDF' },
        { id: `${statePart}_005`, name: 'Vamanapuram', number: 5, voters: 162000, reservationStatus: 'General', incumbent: 'Current MLA 5', incumbentParty: 'UDF' },
        { id: `${statePart}_006`, name: 'Aruvikkara', number: 6, voters: 158000, reservationStatus: 'SC', incumbent: 'Current MLA 6', incumbentParty: 'LDF' },
        { id: `${statePart}_007`, name: 'Kattakada', number: 7, voters: 171000, reservationStatus: 'General', incumbent: 'Current MLA 7', incumbentParty: 'UDF' },
        { id: `${statePart}_008`, name: 'Kovalam', number: 8, voters: 165000, reservationStatus: 'General', incumbent: 'Current MLA 8', incumbentParty: 'LDF' },
        { id: `${statePart}_009`, name: 'Neyyattinkara', number: 9, voters: 178000, reservationStatus: 'General', incumbent: 'Current MLA 9', incumbentParty: 'NDA' },
        { id: `${statePart}_010`, name: 'Parassala', number: 10, voters: 155000, reservationStatus: 'General', incumbent: 'Current MLA 10', incumbentParty: 'LDF' },
    ];
    
    return constituencies;
};

const getMockConstituencyById = (constituencyId: string): ConstituencyData => {
    const statePart = constituencyId.split('_')[0];
    const state = statePart.charAt(0).toUpperCase() + statePart.slice(1);
    
    return {
        id: constituencyId,
        name: 'Thiruvananthapuram',
        state: state,
        electionId: `${statePart}_assembly_2026`,
        number: 1,
        voters: 185000,
        pollingBooths: 245,
        incumbent: 'V.S. Sivakumar',
        incumbentParty: 'LDF (CPM)',
        reservationStatus: 'General',
        candidates: [
            {
                id: 'cand_001',
                name: 'V.S. Sivakumar',
                party: 'CPM (LDF)',
                partyLogo: '/static/images/party-logos/cpm.png',
                age: 58,
                education: 'MA Political Science',
                profession: 'Politician',
                criminalCases: 0,
                assets: 15000000,
                isIncumbent: true,
            },
            {
                id: 'cand_002',
                name: 'Shashi Tharoor',
                party: 'INC (UDF)',
                partyLogo: '/static/images/party-logos/inc.png',
                age: 67,
                education: 'PhD',
                profession: 'Author, Politician',
                criminalCases: 1,
                assets: 85000000,
                isIncumbent: false,
            },
            {
                id: 'cand_003',
                name: 'Kummanam Rajasekharan',
                party: 'BJP (NDA)',
                partyLogo: '/static/images/party-logos/bjp.png',
                age: 65,
                education: 'MA History',
                profession: 'RSS Leader',
                criminalCases: 0,
                assets: 12000000,
                isIncumbent: false,
            },
        ],
        lastElectionResults: {
            winner: 'V.S. Sivakumar',
            winnerParty: 'CPM',
            margin: 24547,
            voterTurnout: 74.2,
        },
    };
};

const getMockConstituencyPromises = (constituencyId: string): ConstituencyPromise[] => {
    return [
        {
            id: 'promise_local_001',
            title: 'Metro Rail Extension to Thiruvananthapuram',
            categoryId: 'cat-infrastructure',
            type: 'infrastructure',
            timeline: '5yr',
            measurable: true,
            metric: { label: 'Metro Stations', target: '15', unit: 'stations' },
            status: 'Announced',
            geography: 'urban',
            citations: [{ label: 'LDF Manifesto 2026', url: '#' }],
            description: 'Extension of Kochi Metro to Thiruvananthapuram with 15 stations covering major areas.',
            relevanceToConstituency: 'Direct impact - 3 stations planned within constituency',
            localImpact: 'Expected to reduce commute time by 40% and create 5,000 local jobs',
        },
        {
            id: 'promise_local_002',
            title: 'New Government Medical College',
            categoryId: 'cat-healthcare',
            type: 'infrastructure',
            timeline: '5yr',
            measurable: true,
            metric: { label: 'Bed Capacity', target: '500', unit: 'beds' },
            status: 'Announced',
            geography: 'state',
            citations: [{ label: 'UDF Manifesto 2026', url: '#' }],
            description: 'Establishment of a new government medical college with 500-bed hospital.',
            relevanceToConstituency: 'Located within constituency boundaries',
            localImpact: 'Will serve 5 lakh population and create 2,000 healthcare jobs',
        },
        {
            id: 'promise_local_003',
            title: 'IT Park Expansion - Phase 2',
            categoryId: 'cat-employment',
            type: 'infrastructure',
            timeline: '5yr',
            measurable: true,
            metric: { label: 'Jobs Created', target: '25000', unit: 'jobs' },
            status: 'Announced',
            geography: 'urban',
            citations: [{ label: 'LDF Manifesto 2026', url: '#' }],
            description: 'Expansion of Technopark with Phase 2 adding 2 million sq ft of IT space.',
            relevanceToConstituency: 'Major employment hub for constituency residents',
            localImpact: '25,000 direct jobs and 50,000 indirect employment opportunities',
        },
        {
            id: 'promise_local_004',
            title: 'Smart City Mission Phase 2',
            categoryId: 'cat-infrastructure',
            type: 'program',
            timeline: '5yr',
            measurable: true,
            metric: { label: 'Investment', target: '2000', unit: 'crores' },
            status: 'Announced',
            geography: 'urban',
            citations: [{ label: 'NDA Manifesto 2026', url: '#' }],
            description: 'Continuation of Smart City projects with focus on digital infrastructure.',
            relevanceToConstituency: 'Thiruvananthapuram is a Smart City mission city',
            localImpact: 'Improved urban amenities, traffic management, and e-governance',
        },
    ];
};

// Constituency Service object for easier imports
export const constituencyService = {
    getConstituenciesByElection,
    getConstituencyById,
    getPromisesByConstituency,
    searchConstituencies,
    clearCache: clearConstituencyCache,
};

export default constituencyService;
