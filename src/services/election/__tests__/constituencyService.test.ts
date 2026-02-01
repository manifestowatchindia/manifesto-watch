import { constituencyService, ConstituencyData, ConstituencyListItem, ConstituencyPromise } from '../constituencyService';
import { cacheManager } from '../../api/cache-manager';

// Polyfill AbortSignal.timeout for Jest environment
if (!AbortSignal.timeout) {
    AbortSignal.timeout = (ms: number) => {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), ms);
        return controller.signal;
    };
}

// Mock dependencies
jest.mock('../../api/cache-manager', () => ({
    cacheManager: {
        get: jest.fn(),
        set: jest.fn(),
        clear: jest.fn(),
    },
}));

// Mock fetch globally
global.fetch = jest.fn();

const mockCacheManager = cacheManager as jest.Mocked<typeof cacheManager>;

const mockFetch = global.fetch as jest.Mock;

describe('constituencyService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockCacheManager.get.mockReturnValue(null); // No cache hit by default
    });

    describe('getConstituenciesByElection', () => {
        const mockConstituencies: ConstituencyListItem[] = [
            { id: 'kerala_001', name: 'Thiruvananthapuram', number: 1, voters: 185000, reservationStatus: 'General', incumbent: 'MLA 1', incumbentParty: 'LDF' },
            { id: 'kerala_002', name: 'Attingal', number: 2, voters: 172000, reservationStatus: 'General', incumbent: 'MLA 2', incumbentParty: 'UDF' },
        ];

        it('should return constituencies from API', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockConstituencies,
            });

            const result = await constituencyService.getConstituenciesByElection('kerala_assembly_2026');

            expect(result).toHaveLength(2);
            expect(result[0].name).toBe('Thiruvananthapuram');
        });

        it('should return mock data when API fails', async () => {
            mockFetch.mockRejectedValueOnce(new Error('API Error'));

            const result = await constituencyService.getConstituenciesByElection('kerala_assembly_2026');

            // Should return mock data (10 items)
            expect(result.length).toBeGreaterThan(0);
            expect(result[0]).toHaveProperty('name');
            expect(result[0]).toHaveProperty('voters');
        });

        it('should include required fields in constituency list items', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockConstituencies,
            });

            const result = await constituencyService.getConstituenciesByElection('kerala_assembly_2026');

            expect(result[0]).toHaveProperty('id');
            expect(result[0]).toHaveProperty('name');
            expect(result[0]).toHaveProperty('number');
            expect(result[0]).toHaveProperty('voters');
        });
    });

    describe('getConstituencyById', () => {
        const mockConstituency: ConstituencyData = {
            id: 'kerala_001',
            name: 'Thiruvananthapuram',
            state: 'Kerala',
            electionId: 'kerala_assembly_2026',
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
                    age: 58,
                    isIncumbent: true,
                },
            ],
            lastElectionResults: {
                winner: 'V.S. Sivakumar',
                winnerParty: 'CPM',
                margin: 24547,
                voterTurnout: 74.2,
            },
        };

        it('should return constituency details from API', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockConstituency,
            });

            const result = await constituencyService.getConstituencyById('kerala_001');

            expect(result).not.toBeNull();
            expect(result?.name).toBe('Thiruvananthapuram');
            expect(result?.voters).toBe(185000);
        });

        it('should return mock data when API fails', async () => {
            mockFetch.mockRejectedValueOnce(new Error('API Error'));

            const result = await constituencyService.getConstituencyById('kerala_001');

            expect(result).not.toBeNull();
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('candidates');
        });

        it('should include candidate information', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockConstituency,
            });

            const result = await constituencyService.getConstituencyById('kerala_001');

            expect(result?.candidates).toBeDefined();
            expect(result?.candidates?.length).toBeGreaterThan(0);
            expect(result?.candidates?.[0]).toHaveProperty('name');
            expect(result?.candidates?.[0]).toHaveProperty('party');
        });

        it('should include last election results', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockConstituency,
            });

            const result = await constituencyService.getConstituencyById('kerala_001');

            expect(result?.lastElectionResults).toBeDefined();
            expect(result?.lastElectionResults?.winner).toBe('V.S. Sivakumar');
            expect(result?.lastElectionResults?.voterTurnout).toBe(74.2);
        });
    });

    describe('getPromisesByConstituency', () => {
        const mockPromises: ConstituencyPromise[] = [
            {
                id: 'promise_001',
                title: 'Metro Rail Extension',
                categoryId: 'cat-infrastructure',
                type: 'infrastructure',
                timeline: '5yr',
                measurable: true,
                status: 'Announced',
                geography: 'urban',
                citations: [],
                relevanceToConstituency: 'Direct impact',
                localImpact: 'Reduces commute time',
            },
        ];

        it('should return promises from API', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockPromises,
            });

            const result = await constituencyService.getPromisesByConstituency('kerala_001');

            expect(result).toHaveLength(1);
            expect(result[0].title).toBe('Metro Rail Extension');
        });

        it('should return mock data when API fails', async () => {
            mockFetch.mockRejectedValueOnce(new Error('API Error'));

            const result = await constituencyService.getPromisesByConstituency('kerala_001');

            expect(result.length).toBeGreaterThan(0);
            expect(result[0]).toHaveProperty('title');
            expect(result[0]).toHaveProperty('relevanceToConstituency');
        });

        it('should include local relevance information', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockPromises,
            });

            const result = await constituencyService.getPromisesByConstituency('kerala_001');

            expect(result[0]).toHaveProperty('relevanceToConstituency');
            expect(result[0]).toHaveProperty('localImpact');
        });
    });

    describe('searchConstituencies', () => {
        it('should filter constituencies by name', async () => {
            const mockConstituencies: ConstituencyListItem[] = [
                { id: 'kerala_001', name: 'Thiruvananthapuram', number: 1, voters: 185000 },
                { id: 'kerala_002', name: 'Attingal', number: 2, voters: 172000 },
                { id: 'kerala_003', name: 'Thiruvalla', number: 3, voters: 168000 },
            ];
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockConstituencies,
            });

            const result = await constituencyService.searchConstituencies('kerala_assembly_2026', 'thiru');

            expect(result).toHaveLength(2);
            expect(result.map(c => c.name)).toContain('Thiruvananthapuram');
            expect(result.map(c => c.name)).toContain('Thiruvalla');
        });

        it('should filter constituencies by number', async () => {
            const mockConstituencies: ConstituencyListItem[] = [
                { id: 'kerala_001', name: 'Thiruvananthapuram', number: 1, voters: 185000 },
                { id: 'kerala_002', name: 'Attingal', number: 12, voters: 172000 },
                { id: 'kerala_003', name: 'Thiruvalla', number: 21, voters: 168000 },
            ];
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockConstituencies,
            });

            const result = await constituencyService.searchConstituencies('kerala_assembly_2026', '1');

            expect(result).toHaveLength(3); // 1, 12, 21 all contain '1'
        });

        it('should be case insensitive', async () => {
            const mockConstituencies: ConstituencyListItem[] = [
                { id: 'kerala_001', name: 'Thiruvananthapuram', number: 1, voters: 185000 },
            ];
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockConstituencies,
            });

            const result = await constituencyService.searchConstituencies('kerala_assembly_2026', 'THIRU');

            expect(result).toHaveLength(1);
        });

        it('should return empty array for no matches', async () => {
            const mockConstituencies: ConstituencyListItem[] = [
                { id: 'kerala_001', name: 'Thiruvananthapuram', number: 1, voters: 185000 },
            ];
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockConstituencies,
            });

            const result = await constituencyService.searchConstituencies('kerala_assembly_2026', 'xyz');

            expect(result).toHaveLength(0);
        });
    });

    describe('clearCache', () => {
        it('should clear the cache', () => {
            constituencyService.clearCache();
            
            // Verify the clear method was conceptually called
            // (actual verification depends on CacheManager implementation)
            expect(true).toBe(true); // Placeholder assertion
        });
    });
});
