import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../../components/SEO';
import { STATE_CODE_MAP, normalizeStateName } from '../../utils/indiaMapPaths';

interface StateGovernment {
    state: string;
    rulingParty: string;
    chiefMinister: string; // For states and UTs with assemblies, this is CM; for other UTs, this is Administrator/LG
    termStart: string;
    termEnd: string;
    majorityType: 'Simple Majority' | 'Coalition' | 'President\'s Rule' | 'Union Territory';
    partyColor: string;
    isUT?: boolean; // Flag to identify Union Territories without legislative assemblies
}

export const InteractiveMap: React.FC = () => {
    const [hoveredState, setHoveredState] = useState<StateGovernment | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [svgContent, setSvgContent] = useState<string>('');

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

    // Current state governments data (as of 2025)
    const stateGovernments: StateGovernment[] = [
        {
            state: 'Andhra Pradesh',
            rulingParty: 'Telugu Desam Party',
            chiefMinister: 'N. Chandrababu Naidu',
            termStart: 'June 2024',
            termEnd: 'June 2029',
            majorityType: 'Coalition',
            partyColor: '#FFEB3B'
        },
        {
            state: 'Arunachal Pradesh',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Pema Khandu',
            termStart: 'June 2024',
            termEnd: 'June 2029',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Assam',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Himanta Biswa Sarma',
            termStart: 'May 2021',
            termEnd: 'March 2026',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Bihar',
            rulingParty: 'National Democratic Alliance',
            chiefMinister: 'Nitish Kumar',
            termStart: 'January 2024',
            termEnd: 'December 2025',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Chhattisgarh',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Vishnu Deo Sai',
            termStart: 'December 2023',
            termEnd: 'December 2028',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Goa',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Pramod Sawant',
            termStart: 'March 2022',
            termEnd: 'March 2027',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Gujarat',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Bhupendra Patel',
            termStart: 'December 2022',
            termEnd: 'December 2027',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Haryana',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Nayab Singh Saini',
            termStart: 'March 2024',
            termEnd: 'October 2029',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Himachal Pradesh',
            rulingParty: 'Indian National Congress',
            chiefMinister: 'Sukhvinder Singh Sukhu',
            termStart: 'December 2022',
            termEnd: 'December 2027',
            majorityType: 'Simple Majority',
            partyColor: '#19AAED'
        },
        {
            state: 'Jharkhand',
            rulingParty: 'Jharkhand Mukti Morcha',
            chiefMinister: 'Hemant Soren',
            termStart: 'July 2024',
            termEnd: 'December 2029',
            majorityType: 'Coalition',
            partyColor: '#2E7D32'
        },
        {
            state: 'Karnataka',
            rulingParty: 'Indian National Congress',
            chiefMinister: 'Siddaramaiah',
            termStart: 'May 2023',
            termEnd: 'May 2028',
            majorityType: 'Simple Majority',
            partyColor: '#19AAED'
        },
        {
            state: 'Kerala',
            rulingParty: 'Communist Party of India (Marxist)',
            chiefMinister: 'Pinarayi Vijayan',
            termStart: 'May 2021',
            termEnd: 'May 2026',
            majorityType: 'Coalition',
            partyColor: '#FF0000'
        },
        {
            state: 'Madhya Pradesh',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Mohan Yadav',
            termStart: 'December 2023',
            termEnd: 'December 2028',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Maharashtra',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Eknath Shinde',
            termStart: 'June 2022',
            termEnd: 'October 2024',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Manipur',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'N. Biren Singh',
            termStart: 'March 2022',
            termEnd: 'March 2027',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Meghalaya',
            rulingParty: 'National People\'s Party',
            chiefMinister: 'Conrad Sangma',
            termStart: 'March 2023',
            termEnd: 'March 2028',
            majorityType: 'Coalition',
            partyColor: '#FFA500'
        },
        {
            state: 'Mizoram',
            rulingParty: 'Zoram People\'s Movement',
            chiefMinister: 'Lalduhoma',
            termStart: 'December 2023',
            termEnd: 'December 2028',
            majorityType: 'Simple Majority',
            partyColor: '#008080'
        },
        {
            state: 'Nagaland',
            rulingParty: 'Nationalist Democratic Progressive Party',
            chiefMinister: 'Neiphiu Rio',
            termStart: 'March 2023',
            termEnd: 'March 2028',
            majorityType: 'Coalition',
            partyColor: '#FFD700'
        },
        {
            state: 'Odisha',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Mohan Charan Majhi',
            termStart: 'June 2024',
            termEnd: 'June 2029',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Punjab',
            rulingParty: 'Aam Aadmi Party',
            chiefMinister: 'Bhagwant Mann',
            termStart: 'March 2022',
            termEnd: 'March 2027',
            majorityType: 'Simple Majority',
            partyColor: '#0171BB'
        },
        {
            state: 'Rajasthan',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Bhajan Lal Sharma',
            termStart: 'December 2023',
            termEnd: 'December 2028',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Sikkim',
            rulingParty: 'Sikkim Krantikari Morcha',
            chiefMinister: 'Prem Singh Tamang',
            termStart: 'June 2024',
            termEnd: 'June 2029',
            majorityType: 'Simple Majority',
            partyColor: '#FF1744'
        },
        {
            state: 'Tamil Nadu',
            rulingParty: 'Dravida Munnetra Kazhagam',
            chiefMinister: 'M. K. Stalin',
            termStart: 'May 2021',
            termEnd: 'May 2026',
            majorityType: 'Coalition',
            partyColor: '#FF0000'
        },
        {
            state: 'Telangana',
            rulingParty: 'Indian National Congress',
            chiefMinister: 'A. Revanth Reddy',
            termStart: 'December 2023',
            termEnd: 'December 2028',
            majorityType: 'Simple Majority',
            partyColor: '#19AAED'
        },
        {
            state: 'Tripura',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Manik Saha',
            termStart: 'March 2023',
            termEnd: 'March 2028',
            majorityType: 'Coalition',
            partyColor: '#FF9933'
        },
        {
            state: 'Uttar Pradesh',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Yogi Adityanath',
            termStart: 'March 2022',
            termEnd: 'March 2027',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'Uttarakhand',
            rulingParty: 'Bharatiya Janata Party',
            chiefMinister: 'Pushkar Singh Dhami',
            termStart: 'March 2022',
            termEnd: 'March 2027',
            majorityType: 'Simple Majority',
            partyColor: '#FF9933'
        },
        {
            state: 'West Bengal',
            rulingParty: 'All India Trinamool Congress',
            chiefMinister: 'Mamata Banerjee',
            termStart: 'May 2021',
            termEnd: 'May 2026',
            majorityType: 'Simple Majority',
            partyColor: '#20C4CB'
        },
        // Union Territories with Legislative Assemblies
        {
            state: 'Delhi',
            rulingParty: 'Aam Aadmi Party',
            chiefMinister: 'Atishi Marlena Singh',
            termStart: 'September 2024',
            termEnd: 'February 2025',
            majorityType: 'Simple Majority',
            partyColor: '#0171BB'
        },
        {
            state: 'Puducherry',
            rulingParty: 'All India N.R. Congress',
            chiefMinister: 'N. Rangasamy',
            termStart: 'May 2021',
            termEnd: 'May 2026',
            majorityType: 'Coalition',
            partyColor: '#FFB300'
        },
        {
            state: 'Jammu & Kashmir',
            rulingParty: 'Jammu & Kashmir National Conference',
            chiefMinister: 'Omar Abdullah',
            termStart: 'October 2024',
            termEnd: 'October 2029',
            majorityType: 'Coalition',
            partyColor: '#FF0000'
        },
        // Other Union Territories (without Legislative Assemblies)
        {
            state: 'Ladakh',
            rulingParty: 'Union Territory',
            chiefMinister: 'Brigadier (Dr) BD Mishra (LG)',
            termStart: 'October 2019',
            termEnd: 'Ongoing',
            majorityType: 'Union Territory',
            partyColor: '#9E9E9E',
            isUT: true
        },
        {
            state: 'Andaman and Nicobar',
            rulingParty: 'Union Territory',
            chiefMinister: 'Admiral DK Joshi (LG)',
            termStart: 'October 2022',
            termEnd: 'Ongoing',
            majorityType: 'Union Territory',
            partyColor: '#9E9E9E',
            isUT: true
        },
        {
            state: 'Lakshadweep',
            rulingParty: 'Union Territory',
            chiefMinister: 'Praful Khoda Patel (Administrator)',
            termStart: 'December 2020',
            termEnd: 'Ongoing',
            majorityType: 'Union Territory',
            partyColor: '#9E9E9E',
            isUT: true
        },
        {
            state: 'Chandigarh',
            rulingParty: 'Union Territory',
            chiefMinister: 'Banwarilal Purohit (Administrator)',
            termStart: 'July 2024',
            termEnd: 'Ongoing',
            majorityType: 'Union Territory',
            partyColor: '#9E9E9E',
            isUT: true
        },
        {
            state: 'Dadra and Nagar Haveli and Daman and Diu',
            rulingParty: 'Union Territory',
            chiefMinister: 'Praful Khoda Patel (Administrator)',
            termStart: 'July 2021',
            termEnd: 'Ongoing',
            majorityType: 'Union Territory',
            partyColor: '#9E9E9E',
            isUT: true
        }
    ];

    // Get state data by name (handle name variations)
    const getStateData = (stateName: string): StateGovernment | undefined => {
        // First try exact match
        let state = stateGovernments.find(s => s.state === stateName);
        if (state) return state;
        
        // Try normalized name match
        const normalizedName = normalizeStateName(stateName);
        state = stateGovernments.find(s => s.state === normalizedName || normalizeStateName(s.state) === normalizedName);
        
        return state;
    };

    // Handle mouse enter on state
    const handleStateHover = (e: React.MouseEvent<SVGPathElement>, stateName: string) => {
        const stateData = getStateData(stateName);
        if (stateData) {
            setHoveredState(stateData);
            setTooltipPosition({ x: e.clientX, y: e.clientY });
        }
    };

    // Handle mouse move for tooltip positioning
    const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
        setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    // Handle mouse leave
    const handleStateLeave = () => {
        setHoveredState(null);
    };

    // Get fill color for state
    const getStateFillColor = (stateName: string): string => {
        const stateData = getStateData(stateName);
        return stateData ? stateData.partyColor : '#666666';
    };

    // Party statistics
    const partyStats = stateGovernments.reduce((acc, gov) => {
        acc[gov.rulingParty] = (acc[gov.rulingParty] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="interactive-map-page">
            <SEO 
                title="Interactive Political Map of India | Manifesto Watch"
                description="Explore India's interactive political map. Hover over states to view ruling parties, chief ministers, and government details. Visual representation of India's political landscape."
                keywords="india map, political map india, interactive map, state governments, ruling parties map, india political geography"
                canonicalUrl="https://www.manifestowatch.in/interactive-map"
            />

            {/* Hero Section */}
            <div className="map-page-hero">
                <div className="container">
                    <h1 className="map-hero-title">
                        <i className="fas fa-map-marked-alt me-3"></i>
                        Interactive Political Map of India
                    </h1>
                    <p className="map-hero-subtitle">
                        Hover over any state or UT to discover who's in power
                    </p>
                    <p className="text-white-50 small">
                        <i className="fas fa-info-circle me-2"></i>
                        Click and drag to explore • Updated: October 2025
                    </p>
                </div>
            </div>

            <div className="container my-5">
                {/* Quick Stats */}
                <div className="row mb-4">
                    <div className="col-md-3 col-6 mb-3">
                        <div className="quick-stat-card text-center">
                            <h2 className="stat-number text-warning">{stateGovernments.filter(s => !s.isUT).length}</h2>
                            <p className="stat-label">States + 3 UTs</p>
                            <small className="text-white-50 d-block mt-1">with Assemblies</small>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mb-3">
                        <div className="quick-stat-card text-center">
                            <h2 className="stat-number text-warning">{stateGovernments.filter(s => s.isUT).length}</h2>
                            <p className="stat-label">Other UTs</p>
                            <small className="text-white-50 d-block mt-1">Central Admin</small>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mb-3">
                        <div className="quick-stat-card text-center">
                            <h2 className="stat-number text-warning">{partyStats['Bharatiya Janata Party'] || 0}</h2>
                            <p className="stat-label">BJP Ruled</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mb-3">
                        <div className="quick-stat-card text-center">
                            <h2 className="stat-number text-warning">{partyStats['Indian National Congress'] || 0}</h2>
                            <p className="stat-label">INC Ruled</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mb-3">
                        <div className="quick-stat-card text-center">
                            <h2 className="stat-number text-warning">{Object.keys(partyStats).length}</h2>
                            <p className="stat-label">Total Parties</p>
                        </div>
                    </div>
                </div>

                {/* Main Map Container */}
                <div className="row">
                    <div className="col-12">
                        <div className="main-map-section">
                            <div className="india-map-container">
                                {/* Professional cartographic boundaries from Simplemaps.com */}
                                {/* Map data © 2024 Simplemaps.com - Licensed for commercial use */}
                                <svg
                                    viewBox="0 0 1000 1000"
                                    className="india-map-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Dynamic rendering of accurate state boundaries from professional cartographic data */}
                                    {parsedPaths.map(({ stateCode, svgStateName, pathData }) => {
                                        // Map SVG state code to our state name using STATE_CODE_MAP
                                        const mappedName = STATE_CODE_MAP[stateCode] || svgStateName;
                                        const normalizedName = normalizeStateName(mappedName);
                                        
                                        // Find matching state data from stateGovernments array
                                        const stateData = getStateData(normalizedName);
                                        if (!stateData) {
                                            // Skip states not in our data (like small UTs without government data)
                                            return null;
                                        }
                                        
                                        return (
                                            <path
                                                key={stateCode}
                                                d={pathData}
                                                fill={getStateFillColor(stateData.state)}
                                                stroke="#FFFFFF"
                                                strokeWidth="0.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="state-path"
                                                onMouseEnter={(e) => handleStateHover(e, stateData.state)}
                                                onMouseMove={handleMouseMove}
                                                onMouseLeave={handleStateLeave}
                                                data-state={stateData.state}
                                            />
                                        );
                                    }).filter(Boolean)}
                                </svg>

                                {/* Hover Tooltip */}
                                {hoveredState && (
                                    <div 
                                        className="map-tooltip" 
                                        style={{
                                            left: `${tooltipPosition.x}px`,
                                            top: `${tooltipPosition.y}px`
                                        }}
                                    >
                                        <div className="tooltip-header" style={{ backgroundColor: hoveredState.partyColor }}>
                                            <h5>{hoveredState.state}</h5>
                                            {hoveredState.isUT && <small className="badge bg-light text-dark ms-2">UT</small>}
                                        </div>
                                        <div className="tooltip-body">
                                            {!hoveredState.isUT && (
                                                <>
                                                    <div className="tooltip-row">
                                                        <span className="tooltip-label">Ruling Party:</span>
                                                        <span className="tooltip-value">{hoveredState.rulingParty}</span>
                                                    </div>
                                                    <div className="tooltip-row">
                                                        <span className="tooltip-label">Chief Minister:</span>
                                                        <span className="tooltip-value">{hoveredState.chiefMinister}</span>
                                                    </div>
                                                    <div className="tooltip-row">
                                                        <span className="tooltip-label">Government Type:</span>
                                                        <span className="tooltip-value">{hoveredState.majorityType}</span>
                                                    </div>
                                                </>
                                            )}
                                            {hoveredState.isUT && (
                                                <>
                                                    <div className="tooltip-row">
                                                        <span className="tooltip-label">Type:</span>
                                                        <span className="tooltip-value">Union Territory</span>
                                                    </div>
                                                    <div className="tooltip-row">
                                                        <span className="tooltip-label">Administrator:</span>
                                                        <span className="tooltip-value">{hoveredState.chiefMinister}</span>
                                                    </div>
                                                    <div className="tooltip-row">
                                                        <span className="tooltip-label">Since:</span>
                                                        <span className="tooltip-value">{hoveredState.termStart}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Party Legend */}
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="map-legend">
                            <h5 className="text-white text-center mb-3">
                                <i className="fas fa-palette me-2"></i>
                                Party Distribution
                            </h5>
                            <div className="legend-grid">
                                <div className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: '#FF9933' }}></div>
                                    <span className="legend-label">BJP</span>
                                    <span className="legend-count">({partyStats['Bharatiya Janata Party'] || 0} regions)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: '#19AAED' }}></div>
                                    <span className="legend-label">INC</span>
                                    <span className="legend-count">({partyStats['Indian National Congress'] || 0} regions)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: '#0171BB' }}></div>
                                    <span className="legend-label">AAP</span>
                                    <span className="legend-count">({partyStats['Aam Aadmi Party'] || 0} regions)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: '#FF0000' }}></div>
                                    <span className="legend-label">JKNC/DMK</span>
                                    <span className="legend-count">({(partyStats['Jammu & Kashmir National Conference'] || 0) + (partyStats['Dravida Munnetra Kazhagam'] || 0)} regions)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: '#20C4CB' }}></div>
                                    <span className="legend-label">TMC</span>
                                    <span className="legend-count">({partyStats['All India Trinamool Congress'] || 0} regions)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: '#2E7D32' }}></div>
                                    <span className="legend-label">JMM</span>
                                    <span className="legend-count">({partyStats['Jharkhand Mukti Morcha'] || 0} regions)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: '#9E9E9E' }}></div>
                                    <span className="legend-label">UTs</span>
                                    <span className="legend-count">({partyStats['Union Territory'] || 0} territories)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: '#666666' }}></div>
                                    <span className="legend-label">Others</span>
                                    <span className="legend-count">({Object.keys(partyStats).length - 7} parties)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="map-instructions">
                            <h5 className="text-white mb-3">
                                <i className="fas fa-question-circle me-2"></i>
                                How to Use
                            </h5>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="instruction-card">
                                        <i className="fas fa-mouse-pointer fa-2x mb-2 text-warning"></i>
                                        <h6 className="text-white">Hover to Explore</h6>
                                        <p className="text-white-50 small">Move your cursor over any state or UT to see detailed information</p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="instruction-card">
                                        <i className="fas fa-palette fa-2x mb-2 text-warning"></i>
                                        <h6 className="text-white">Color Coded</h6>
                                        <p className="text-white-50 small">Each party has a unique color for easy identification</p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="instruction-card">
                                        <i className="fas fa-info-circle fa-2x mb-2 text-warning"></i>
                                        <h6 className="text-white">Complete Coverage</h6>
                                        <p className="text-white-50 small">28 states + 8 UTs including Delhi, Puducherry, J&K, Ladakh, Andaman, Lakshadweep, Chandigarh & DNH-DD</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Attribution */}
                <div className="row mt-4">
                    <div className="col-12 text-center">
                        <p className="text-white-50 small mb-0">
                            <i className="fas fa-map-marked-alt me-2"></i>
                            Map boundaries © 2024 <a href="https://simplemaps.com" target="_blank" rel="noopener noreferrer" className="text-warning text-decoration-none">Simplemaps.com</a> - Professional cartographic data
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
