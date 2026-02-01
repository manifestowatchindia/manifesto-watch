/**
 * InteractiveIndiaMap Component
 * STORY-059 - Interactive India Map Section (Enhanced)
 * 
 * Homepage section featuring an interactive India map with:
 * - Multiple view modes (ruling party, election status, promise delivery)
 * - State tooltips on hover
 * - Click navigation to state hubs
 * - Responsive design with mobile optimizations
 * 
 * Uses professional cartographic SVG data from /static/in.svg
 */

import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapViewToggle, MapViewMode } from './MapViewToggle';
import { MapLegend } from './MapLegend';
import { MapTooltip, StateData } from './MapTooltip';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';
import { STATE_CODE_MAP, normalizeStateName } from '../../utils/indiaMapPaths';

export interface InteractiveIndiaMapProps {
    /** Optional title override */
    title?: string;
    /** Optional subtitle override */
    subtitle?: string;
    /** Additional CSS classes */
    className?: string;
}

/**
 * State data interface for map visualization (without path - loaded from SVG)
 */
interface StateMapData extends StateData {
    // path is loaded dynamically from SVG file
}

/**
 * Mock state data - will be replaced with API data
 * Note: paths are loaded dynamically from /static/in.svg
 */
const STATES_DATA: Record<string, StateMapData> = {
    'Jammu & Kashmir': {
        name: 'Jammu & Kashmir',
        code: 'JK',
        rulingParty: 'NC-INC Alliance',
        partyColor: '#00BFFF',
        chiefMinister: 'Omar Abdullah',
        nextElection: 'March 2030',
        daysUntilElection: 1825,
        totalPromises: 45,
        deliveredPromises: 12,
        deliveryRate: 26.7,
    },
    'Himachal Pradesh': {
        name: 'Himachal Pradesh',
        code: 'HP',
        rulingParty: 'INC',
        partyColor: '#00BFFF',
        chiefMinister: 'Sukhvinder Singh Sukhu',
        nextElection: 'December 2027',
        daysUntilElection: 940,
        totalPromises: 38,
        deliveredPromises: 18,
        deliveryRate: 47.4,
    },
    'Punjab': {
        name: 'Punjab',
        code: 'PB',
        rulingParty: 'AAP',
        partyColor: '#0066CC',
        chiefMinister: 'Bhagwant Mann',
        nextElection: 'March 2027',
        daysUntilElection: 640,
        totalPromises: 92,
        deliveredPromises: 35,
        deliveryRate: 38.0,
    },
    'Haryana': {
        name: 'Haryana',
        code: 'HR',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Nayab Singh Saini',
        nextElection: 'October 2029',
        daysUntilElection: 1540,
        totalPromises: 65,
        deliveredPromises: 28,
        deliveryRate: 43.1,
    },
    'Uttarakhand': {
        name: 'Uttarakhand',
        code: 'UK',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Pushkar Singh Dhami',
        nextElection: 'February 2027',
        daysUntilElection: 610,
        totalPromises: 48,
        deliveredPromises: 22,
        deliveryRate: 45.8,
    },
    'Rajasthan': {
        name: 'Rajasthan',
        code: 'RJ',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Bhajan Lal Sharma',
        nextElection: 'December 2028',
        daysUntilElection: 1280,
        totalPromises: 125,
        deliveredPromises: 42,
        deliveryRate: 33.6,
    },
    'Uttar Pradesh': {
        name: 'Uttar Pradesh',
        code: 'UP',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Yogi Adityanath',
        nextElection: 'March 2027',
        daysUntilElection: 640,
        totalPromises: 215,
        deliveredPromises: 98,
        deliveryRate: 45.6,
    },
    'Bihar': {
        name: 'Bihar',
        code: 'BR',
        rulingParty: 'JD(U)-BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Nitish Kumar',
        nextElection: 'November 2025',
        daysUntilElection: 150,
        totalPromises: 88,
        deliveredPromises: 32,
        deliveryRate: 36.4,
    },
    'Jharkhand': {
        name: 'Jharkhand',
        code: 'JH',
        rulingParty: 'JMM-INC',
        partyColor: '#228B22',
        chiefMinister: 'Hemant Soren',
        nextElection: 'November 2029',
        daysUntilElection: 1570,
        totalPromises: 56,
        deliveredPromises: 18,
        deliveryRate: 32.1,
    },
    'West Bengal': {
        name: 'West Bengal',
        code: 'WB',
        rulingParty: 'AITC',
        partyColor: '#228B22',
        chiefMinister: 'Mamata Banerjee',
        nextElection: 'May 2026',
        daysUntilElection: 365,
        totalPromises: 110,
        deliveredPromises: 52,
        deliveryRate: 47.3,
    },
    'Sikkim': {
        name: 'Sikkim',
        code: 'SK',
        rulingParty: 'SKM',
        partyColor: '#800080',
        chiefMinister: 'Prem Singh Tamang',
        nextElection: 'April 2029',
        daysUntilElection: 1400,
        totalPromises: 22,
        deliveredPromises: 14,
        deliveryRate: 63.6,
    },
    'Arunachal Pradesh': {
        name: 'Arunachal Pradesh',
        code: 'AR',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Pema Khandu',
        nextElection: 'April 2029',
        daysUntilElection: 1400,
        totalPromises: 28,
        deliveredPromises: 15,
        deliveryRate: 53.6,
    },
    'Assam': {
        name: 'Assam',
        code: 'AS',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Himanta Biswa Sarma',
        nextElection: 'April 2026',
        daysUntilElection: 300,
        totalPromises: 75,
        deliveredPromises: 38,
        deliveryRate: 50.7,
    },
    'Nagaland': {
        name: 'Nagaland',
        code: 'NL',
        rulingParty: 'NDPP-BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Neiphiu Rio',
        nextElection: 'March 2028',
        daysUntilElection: 1010,
        totalPromises: 18,
        deliveredPromises: 8,
        deliveryRate: 44.4,
    },
    'Manipur': {
        name: 'Manipur',
        code: 'MN',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'N. Biren Singh',
        nextElection: 'March 2027',
        daysUntilElection: 640,
        totalPromises: 25,
        deliveredPromises: 9,
        deliveryRate: 36.0,
    },
    'Mizoram': {
        name: 'Mizoram',
        code: 'MZ',
        rulingParty: 'ZPM',
        partyColor: '#800080',
        chiefMinister: 'Lalduhoma',
        nextElection: 'November 2028',
        daysUntilElection: 1250,
        totalPromises: 20,
        deliveredPromises: 6,
        deliveryRate: 30.0,
    },
    'Tripura': {
        name: 'Tripura',
        code: 'TR',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Manik Saha',
        nextElection: 'March 2028',
        daysUntilElection: 1010,
        totalPromises: 32,
        deliveredPromises: 14,
        deliveryRate: 43.8,
    },
    'Meghalaya': {
        name: 'Meghalaya',
        code: 'ML',
        rulingParty: 'NPP-BJP',
        partyColor: '#800080',
        chiefMinister: 'Conrad K. Sangma',
        nextElection: 'March 2028',
        daysUntilElection: 1010,
        totalPromises: 24,
        deliveredPromises: 11,
        deliveryRate: 45.8,
    },
    'Madhya Pradesh': {
        name: 'Madhya Pradesh',
        code: 'MP',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Mohan Yadav',
        nextElection: 'November 2028',
        daysUntilElection: 1250,
        totalPromises: 145,
        deliveredPromises: 58,
        deliveryRate: 40.0,
    },
    'Chhattisgarh': {
        name: 'Chhattisgarh',
        code: 'CG',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Vishnu Deo Sai',
        nextElection: 'November 2028',
        daysUntilElection: 1250,
        totalPromises: 68,
        deliveredPromises: 25,
        deliveryRate: 36.8,
    },
    'Odisha': {
        name: 'Odisha',
        code: 'OD',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Mohan Charan Majhi',
        nextElection: 'May 2029',
        daysUntilElection: 1430,
        totalPromises: 82,
        deliveredPromises: 28,
        deliveryRate: 34.1,
    },
    'Gujarat': {
        name: 'Gujarat',
        code: 'GJ',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Bhupendra Patel',
        nextElection: 'December 2027',
        daysUntilElection: 940,
        totalPromises: 112,
        deliveredPromises: 62,
        deliveryRate: 55.4,
    },
    'Maharashtra': {
        name: 'Maharashtra',
        code: 'MH',
        rulingParty: 'BJP-NCP-SS',
        partyColor: '#FF9933',
        chiefMinister: 'Devendra Fadnavis',
        nextElection: 'November 2029',
        daysUntilElection: 1570,
        totalPromises: 185,
        deliveredPromises: 78,
        deliveryRate: 42.2,
    },
    'Goa': {
        name: 'Goa',
        code: 'GA',
        rulingParty: 'BJP',
        partyColor: '#FF9933',
        chiefMinister: 'Pramod Sawant',
        nextElection: 'March 2027',
        daysUntilElection: 640,
        totalPromises: 28,
        deliveredPromises: 16,
        deliveryRate: 57.1,
    },
    'Telangana': {
        name: 'Telangana',
        code: 'TG',
        rulingParty: 'INC',
        partyColor: '#00BFFF',
        chiefMinister: 'A. Revanth Reddy',
        nextElection: 'November 2028',
        daysUntilElection: 1250,
        totalPromises: 95,
        deliveredPromises: 35,
        deliveryRate: 36.8,
    },
    'Andhra Pradesh': {
        name: 'Andhra Pradesh',
        code: 'AP',
        rulingParty: 'TDP-JSP-BJP',
        partyColor: '#FFFF00',
        chiefMinister: 'N. Chandrababu Naidu',
        nextElection: 'May 2029',
        daysUntilElection: 1430,
        totalPromises: 105,
        deliveredPromises: 38,
        deliveryRate: 36.2,
    },
    'Karnataka': {
        name: 'Karnataka',
        code: 'KA',
        rulingParty: 'INC',
        partyColor: '#00BFFF',
        chiefMinister: 'Siddaramaiah',
        nextElection: 'May 2028',
        daysUntilElection: 1070,
        totalPromises: 138,
        deliveredPromises: 52,
        deliveryRate: 37.7,
    },
    'Kerala': {
        name: 'Kerala',
        code: 'KL',
        rulingParty: 'LDF (CPI-M)',
        partyColor: '#FF0000',
        chiefMinister: 'Pinarayi Vijayan',
        nextElection: 'May 2026',
        daysUntilElection: 365,
        totalPromises: 85,
        deliveredPromises: 48,
        deliveryRate: 56.5,
    },
    'Tamil Nadu': {
        name: 'Tamil Nadu',
        code: 'TN',
        rulingParty: 'DMK',
        partyColor: '#FF0000',
        chiefMinister: 'M.K. Stalin',
        nextElection: 'May 2026',
        daysUntilElection: 365,
        totalPromises: 158,
        deliveredPromises: 82,
        deliveryRate: 51.9,
    },
    'Delhi': {
        name: 'Delhi',
        code: 'DL',
        rulingParty: 'AAP',
        partyColor: '#0066CC',
        chiefMinister: 'Atishi',
        nextElection: 'February 2025',
        daysUntilElection: 30,
        totalPromises: 72,
        deliveredPromises: 45,
        deliveryRate: 62.5,
    },
    // Union Territories and additional regions
    'Ladakh': {
        name: 'Ladakh',
        code: 'LA',
        rulingParty: 'UT Administration',
        partyColor: '#9ca3af',
        chiefMinister: 'Lt. Governor',
        nextElection: 'N/A',
        daysUntilElection: 0,
        totalPromises: 0,
        deliveredPromises: 0,
        deliveryRate: 0,
    },
    'Chandigarh': {
        name: 'Chandigarh',
        code: 'CH',
        rulingParty: 'UT Administration',
        partyColor: '#9ca3af',
        chiefMinister: 'Administrator',
        nextElection: 'N/A',
        daysUntilElection: 0,
        totalPromises: 0,
        deliveredPromises: 0,
        deliveryRate: 0,
    },
    'Puducherry': {
        name: 'Puducherry',
        code: 'PY',
        rulingParty: 'NDA',
        partyColor: '#FF9933',
        chiefMinister: 'N. Rangasamy',
        nextElection: 'May 2026',
        daysUntilElection: 365,
        totalPromises: 25,
        deliveredPromises: 10,
        deliveryRate: 40.0,
    },
    'Andaman and Nicobar': {
        name: 'Andaman and Nicobar',
        code: 'AN',
        rulingParty: 'UT Administration',
        partyColor: '#9ca3af',
        chiefMinister: 'Lt. Governor',
        nextElection: 'N/A',
        daysUntilElection: 0,
        totalPromises: 0,
        deliveredPromises: 0,
        deliveryRate: 0,
    },
    'Lakshadweep': {
        name: 'Lakshadweep',
        code: 'LD',
        rulingParty: 'UT Administration',
        partyColor: '#9ca3af',
        chiefMinister: 'Administrator',
        nextElection: 'N/A',
        daysUntilElection: 0,
        totalPromises: 0,
        deliveredPromises: 0,
        deliveryRate: 0,
    },
    'Dadra and Nagar Haveli and Daman and Diu': {
        name: 'Dadra and Nagar Haveli and Daman and Diu',
        code: 'DD',
        rulingParty: 'UT Administration',
        partyColor: '#9ca3af',
        chiefMinister: 'Administrator',
        nextElection: 'N/A',
        daysUntilElection: 0,
        totalPromises: 0,
        deliveredPromises: 0,
        deliveryRate: 0,
    },
};

/**
 * Get fill color based on view mode
 */
function getStateColor(state: StateMapData | undefined, viewMode: MapViewMode): string {
    if (!state) return '#666666';
    
    switch (viewMode) {
        case 'ruling-party':
            return state.partyColor || '#666666';
        
        case 'election-status':
            if (!state.daysUntilElection) return '#9ca3af';
            if (state.daysUntilElection <= 0) return 'var(--color-status-delivered, #10b981)';
            if (state.daysUntilElection <= 180) return 'var(--color-accent-primary, #f97316)';
            if (state.daysUntilElection <= 365) return 'var(--color-accent-tertiary, #14b8a6)';
            return '#9ca3af';
        
        case 'promise-delivery':
            if (!state.deliveryRate) return '#9ca3af';
            if (state.deliveryRate >= 60) return '#10b981';
            if (state.deliveryRate >= 40) return '#22c55e';
            if (state.deliveryRate >= 20) return '#eab308';
            return '#f97316';
        
        default:
            return '#666666';
    }
}

/**
 * InteractiveIndiaMap - Main component for the India map section
 * Uses professional cartographic SVG data loaded from /static/in.svg
 */
export const InteractiveIndiaMap: React.FC<InteractiveIndiaMapProps> = ({
    title = 'Explore India',
    subtitle = 'Click on any state to explore election data, ruling parties, and promise tracking',
    className = '',
}) => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const { ref: animationRef, isInView } = useInViewAnimation({ threshold: 0.1 });

    // State for SVG content and view mode
    const [svgContent, setSvgContent] = useState<string>('');
    const [viewMode, setViewMode] = useState<MapViewMode>('ruling-party');
    const [hoveredState, setHoveredState] = useState<StateMapData | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // Load the accurate SVG map
    useEffect(() => {
        fetch('/static/in.svg')
            .then(response => response.text())
            .then(data => {
                setSvgContent(data);
            })
            .catch(error => {
                console.error('Error loading map:', error);
            });
    }, []);

    // Memoize SVG parsing to avoid re-parsing on every render
    const parsedPaths = useMemo(() => {
        if (!svgContent) return [];
        
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
        const paths = svgDoc.querySelectorAll('path[id^="IN"]');
        
        return Array.from(paths).map(path => ({
            stateCode: path.getAttribute('id') || '',
            svgStateName: path.getAttribute('name') || '',
            pathData: path.getAttribute('d') || ''
        }));
    }, [svgContent]);

    // Get state data by normalized name
    const getStateData = useCallback((stateName: string): StateMapData | undefined => {
        // Try exact match first
        if (STATES_DATA[stateName]) return STATES_DATA[stateName];
        
        // Try normalized match
        const normalized = normalizeStateName(stateName);
        return Object.values(STATES_DATA).find(s => 
            normalizeStateName(s.name) === normalized
        );
    }, []);

    // Handle state hover
    const handleStateHover = useCallback((e: React.MouseEvent<SVGPathElement>, stateName: string) => {
        const stateData = getStateData(stateName);
        if (stateData) {
            setHoveredState(stateData);
            setTooltipPosition({ x: e.clientX, y: e.clientY });
        }
    }, [getStateData]);

    // Handle mouse move for tooltip tracking
    const handleMouseMove = useCallback((e: React.MouseEvent<SVGPathElement>) => {
        setTooltipPosition({ x: e.clientX, y: e.clientY });
    }, []);

    // Handle mouse leave
    const handleStateLeave = useCallback(() => {
        setHoveredState(null);
    }, []);

    // Handle state click - navigate to state hub
    const handleStateClick = useCallback((stateName: string) => {
        const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
        navigate(`/state/${stateSlug}`);
    }, [navigate]);

    // Handle keyboard navigation
    const handleStateKeyDown = useCallback((e: React.KeyboardEvent<SVGPathElement>, stateName: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleStateClick(stateName);
        }
    }, [handleStateClick]);

    // Render state elements from parsed SVG paths
    const stateElements = useMemo(() => {
        return parsedPaths.map(({ stateCode, svgStateName, pathData }) => {
            // Map SVG state code to our state name
            const mappedName = STATE_CODE_MAP[stateCode] || svgStateName;
            const normalizedName = normalizeStateName(mappedName);
            const stateData = getStateData(normalizedName);
            
            // Skip states without data (small UTs)
            if (!stateData) return null;
            
            return (
                <path
                    key={stateCode}
                    d={pathData}
                    fill={getStateColor(stateData, viewMode)}
                    stroke="#FFFFFF"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, stateData.name)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    onClick={() => handleStateClick(stateData.name)}
                    onKeyDown={(e) => handleStateKeyDown(e, stateData.name)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${stateData.name}, ${stateData.rulingParty}`}
                    data-state={stateData.name}
                />
            );
        }).filter(Boolean);
    }, [parsedPaths, viewMode, getStateData, handleStateHover, handleMouseMove, handleStateLeave, handleStateClick, handleStateKeyDown]);

    return (
        <section
            ref={animationRef}
            className={`interactive-india-map-section ${className} ${isInView ? 'visible' : ''}`}
            aria-labelledby="india-map-heading"
        >
            <div className="container mx-auto px-4 py-12 md:py-16">
                {/* Section Header */}
                <div className="section-header text-center mb-8">
                    <h2 id="india-map-heading" className="section-title">
                        {title}
                    </h2>
                    <p className="section-subtitle">
                        {subtitle}
                    </p>
                </div>

                {/* View Toggle */}
                <div className="view-controls mb-6 flex justify-center">
                    <MapViewToggle
                        activeView={viewMode}
                        onViewChange={setViewMode}
                    />
                </div>

                {/* Map Container */}
                <div className="map-container" ref={containerRef}>
                    {/* Legend */}
                    <div className="map-legend-wrapper">
                        <MapLegend viewMode={viewMode} />
                    </div>

                    {/* SVG Map - Uses same viewBox as the working /interactive-map page */}
                    <div className="map-svg-wrapper">
                        <svg
                            viewBox="0 0 1000 1000"
                            className="india-map-svg"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Interactive map of India showing states"
                        >
                            <title>India Map - {viewMode === 'ruling-party' ? 'Ruling Parties' : viewMode === 'election-status' ? 'Election Status' : 'Promise Delivery'}</title>
                            {stateElements}
                        </svg>
                    </div>
                </div>

                {/* Tooltip */}
                <MapTooltip
                    stateData={hoveredState}
                    viewMode={viewMode}
                    position={tooltipPosition}
                    visible={!!hoveredState}
                />

                {/* Mobile hint */}
                <p className="mobile-hint text-center mt-4 text-sm text-[var(--color-text-tertiary)]">
                    <span className="md:hidden">Tap on any state to explore →</span>
                    <span className="hidden md:inline">Hover over a state for details, click to explore →</span>
                </p>
            </div>

            <style>{`
                .interactive-india-map-section {
                    background-color: var(--color-bg-primary, #ffffff);
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }

                .interactive-india-map-section.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .section-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--color-text-primary, #1f2937);
                    margin-bottom: 0.5rem;
                }

                .section-subtitle {
                    font-size: 1rem;
                    color: var(--color-text-secondary, #6b7280);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .map-container {
                    display: flex;
                    flex-direction: row;
                    gap: 2rem;
                    align-items: flex-start;
                    justify-content: center;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .map-legend-wrapper {
                    flex-shrink: 0;
                    position: sticky;
                    top: 100px;
                }

                .map-svg-wrapper {
                    flex: 1;
                    max-width: 600px;
                }

                .india-map-svg {
                    width: 100%;
                    height: auto;
                }

                .state-path {
                    cursor: pointer;
                    transition: fill 0.2s ease, filter 0.2s ease, transform 0.2s ease;
                    transform-origin: center;
                }

                .state-path:hover {
                    filter: brightness(1.1);
                }

                .state-path:focus-visible {
                    outline: 2px solid var(--color-accent-primary, #f97316);
                    outline-offset: 2px;
                }

                @media (max-width: 768px) {
                    .section-title {
                        font-size: 1.5rem;
                    }

                    .section-subtitle {
                        font-size: 0.875rem;
                    }

                    .map-container {
                        flex-direction: column;
                        align-items: center;
                    }

                    .map-legend-wrapper {
                        position: static;
                        width: 100%;
                        max-width: 400px;
                    }

                    .map-svg-wrapper {
                        width: 100%;
                        max-width: 400px;
                    }
                }

                @media (max-width: 480px) {
                    .map-svg-wrapper {
                        max-width: 320px;
                    }
                }
            `}</style>
        </section>
    );
};

export default InteractiveIndiaMap;
