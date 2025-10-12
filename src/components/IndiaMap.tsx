import React, { useState } from 'react';

interface StateGovernment {
    state: string;
    rulingParty: string;
    chiefMinister: string;
    termStart: string;
    termEnd: string;
    majorityType: string;
    partyColor: string;
}

interface IndiaMapProps {
    stateGovernments: StateGovernment[];
}

export const IndiaMap: React.FC<IndiaMapProps> = ({ stateGovernments }) => {
    const [hoveredState, setHoveredState] = useState<StateGovernment | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // Get state data by name
    const getStateData = (stateName: string): StateGovernment | undefined => {
        return stateGovernments.find(s => s.state === stateName);
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

    return (
        <div className="india-map-container">
            <svg
                viewBox="0 0 1000 1200"
                className="india-map-svg"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Jammu & Kashmir */}
                <path
                    d="M 210 80 L 230 70 L 250 75 L 270 85 L 285 95 L 295 110 L 300 130 L 295 145 L 280 155 L 260 160 L 240 155 L 225 145 L 215 130 L 210 110 Z"
                    fill={getStateFillColor('Jammu & Kashmir')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Jammu & Kashmir')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Jammu & Kashmir"
                />

                {/* Himachal Pradesh */}
                <path
                    d="M 250 160 L 270 155 L 290 160 L 305 170 L 315 185 L 310 200 L 295 205 L 275 200 L 260 190 L 250 175 Z"
                    fill={getStateFillColor('Himachal Pradesh')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Himachal Pradesh')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Himachal Pradesh"
                />

                {/* Punjab */}
                <path
                    d="M 230 180 L 250 175 L 270 180 L 285 195 L 280 210 L 260 215 L 240 210 L 225 195 Z"
                    fill={getStateFillColor('Punjab')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Punjab')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Punjab"
                />

                {/* Haryana */}
                <path
                    d="M 260 215 L 280 210 L 300 220 L 310 235 L 305 250 L 285 255 L 265 250 L 255 235 Z"
                    fill={getStateFillColor('Haryana')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Haryana')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Haryana"
                />

                {/* Uttarakhand */}
                <path
                    d="M 310 200 L 330 195 L 350 205 L 360 220 L 355 235 L 335 240 L 315 235 L 305 220 Z"
                    fill={getStateFillColor('Uttarakhand')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Uttarakhand')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Uttarakhand"
                />

                {/* Rajasthan */}
                <path
                    d="M 180 240 L 200 230 L 260 250 L 280 270 L 290 300 L 285 340 L 270 370 L 250 385 L 220 380 L 195 360 L 180 330 L 175 290 L 180 260 Z"
                    fill={getStateFillColor('Rajasthan')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Rajasthan')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Rajasthan"
                />

                {/* Uttar Pradesh */}
                <path
                    d="M 310 250 L 360 240 L 410 250 L 450 270 L 470 290 L 475 320 L 465 350 L 445 365 L 410 370 L 370 365 L 330 355 L 300 340 L 285 320 L 290 290 L 300 270 Z"
                    fill={getStateFillColor('Uttar Pradesh')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Uttar Pradesh')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Uttar Pradesh"
                />

                {/* Bihar */}
                <path
                    d="M 470 290 L 510 285 L 545 295 L 565 315 L 560 340 L 540 355 L 510 360 L 480 350 L 465 330 L 470 305 Z"
                    fill={getStateFillColor('Bihar')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Bihar')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Bihar"
                />

                {/* Jharkhand */}
                <path
                    d="M 510 360 L 540 355 L 565 365 L 580 385 L 575 410 L 550 425 L 520 420 L 500 405 L 495 380 Z"
                    fill={getStateFillColor('Jharkhand')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Jharkhand')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Jharkhand"
                />

                {/* West Bengal */}
                <path
                    d="M 565 315 L 600 310 L 630 325 L 650 350 L 655 380 L 645 410 L 620 430 L 590 435 L 565 425 L 550 405 L 555 375 L 560 345 Z"
                    fill={getStateFillColor('West Bengal')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'West Bengal')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="West Bengal"
                />

                {/* Sikkim */}
                <path
                    d="M 620 295 L 635 290 L 650 300 L 655 315 L 645 325 L 630 320 L 620 310 Z"
                    fill={getStateFillColor('Sikkim')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Sikkim')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Sikkim"
                />

                {/* Arunachal Pradesh */}
                <path
                    d="M 660 280 L 700 275 L 740 285 L 770 305 L 780 330 L 770 350 L 745 360 L 710 355 L 680 345 L 660 325 L 655 305 Z"
                    fill={getStateFillColor('Arunachal Pradesh')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Arunachal Pradesh')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Arunachal Pradesh"
                />

                {/* Assam */}
                <path
                    d="M 660 350 L 710 355 L 740 370 L 755 390 L 750 410 L 725 420 L 690 415 L 665 405 L 655 385 Z"
                    fill={getStateFillColor('Assam')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Assam')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Assam"
                />

                {/* Nagaland */}
                <path
                    d="M 755 390 L 775 385 L 790 395 L 795 410 L 785 425 L 765 430 L 750 420 L 750 405 Z"
                    fill={getStateFillColor('Nagaland')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Nagaland')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Nagaland"
                />

                {/* Manipur */}
                <path
                    d="M 765 430 L 785 425 L 800 435 L 805 450 L 795 465 L 775 470 L 760 460 L 760 445 Z"
                    fill={getStateFillColor('Manipur')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Manipur')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Manipur"
                />

                {/* Mizoram */}
                <path
                    d="M 750 470 L 775 470 L 790 485 L 790 505 L 775 520 L 755 520 L 740 505 L 740 485 Z"
                    fill={getStateFillColor('Mizoram')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Mizoram')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Mizoram"
                />

                {/* Tripura */}
                <path
                    d="M 680 440 L 705 435 L 720 445 L 725 465 L 715 480 L 695 485 L 675 475 L 670 460 Z"
                    fill={getStateFillColor('Tripura')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Tripura')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Tripura"
                />

                {/* Meghalaya */}
                <path
                    d="M 690 415 L 725 420 L 745 435 L 745 450 L 730 465 L 705 470 L 685 460 L 680 440 Z"
                    fill={getStateFillColor('Meghalaya')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Meghalaya')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Meghalaya"
                />

                {/* Madhya Pradesh */}
                <path
                    d="M 290 370 L 340 360 L 410 370 L 450 385 L 475 410 L 480 450 L 470 485 L 445 510 L 410 520 L 370 515 L 330 500 L 300 475 L 280 445 L 275 410 Z"
                    fill={getStateFillColor('Madhya Pradesh')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Madhya Pradesh')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Madhya Pradesh"
                />

                {/* Chhattisgarh */}
                <path
                    d="M 480 450 L 520 440 L 555 450 L 575 475 L 575 510 L 560 540 L 530 555 L 500 550 L 475 530 L 465 500 Z"
                    fill={getStateFillColor('Chhattisgarh')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Chhattisgarh')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Chhattisgarh"
                />

                {/* Odisha */}
                <path
                    d="M 560 540 L 595 530 L 625 545 L 645 570 L 650 605 L 635 635 L 605 650 L 570 645 L 545 625 L 535 595 L 540 565 Z"
                    fill={getStateFillColor('Odisha')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Odisha')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Odisha"
                />

                {/* Gujarat */}
                <path
                    d="M 140 390 L 180 380 L 220 390 L 250 415 L 265 450 L 260 490 L 240 525 L 210 540 L 175 535 L 145 515 L 125 480 L 120 440 L 130 410 Z"
                    fill={getStateFillColor('Gujarat')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Gujarat')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Gujarat"
                />

                {/* Maharashtra */}
                <path
                    d="M 260 490 L 300 480 L 350 490 L 390 510 L 420 540 L 430 580 L 420 620 L 395 655 L 360 675 L 320 680 L 280 665 L 250 640 L 230 605 L 235 560 L 250 525 Z"
                    fill={getStateFillColor('Maharashtra')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Maharashtra')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Maharashtra"
                />

                {/* Goa */}
                <path
                    d="M 280 665 L 300 660 L 315 670 L 320 685 L 310 700 L 290 705 L 275 695 L 270 680 Z"
                    fill={getStateFillColor('Goa')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Goa')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Goa"
                />

                {/* Telangana */}
                <path
                    d="M 430 580 L 465 570 L 500 580 L 520 605 L 520 635 L 505 660 L 475 670 L 445 665 L 420 645 L 415 615 Z"
                    fill={getStateFillColor('Telangana')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Telangana')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Telangana"
                />

                {/* Andhra Pradesh */}
                <path
                    d="M 475 670 L 520 660 L 560 670 L 590 695 L 600 730 L 590 765 L 565 790 L 530 800 L 495 795 L 465 775 L 445 745 L 440 710 L 450 685 Z"
                    fill={getStateFillColor('Andhra Pradesh')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Andhra Pradesh')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Andhra Pradesh"
                />

                {/* Karnataka */}
                <path
                    d="M 320 680 L 360 675 L 400 685 L 440 710 L 455 745 L 455 785 L 440 820 L 410 845 L 370 855 L 330 850 L 295 830 L 270 800 L 260 760 L 270 720 L 290 695 Z"
                    fill={getStateFillColor('Karnataka')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Karnataka')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Karnataka"
                />

                {/* Kerala */}
                <path
                    d="M 270 800 L 295 830 L 310 870 L 315 910 L 310 950 L 290 985 L 265 1005 L 240 1010 L 220 995 L 210 960 L 215 920 L 230 880 L 250 840 Z"
                    fill={getStateFillColor('Kerala')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Kerala')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Kerala"
                />

                {/* Tamil Nadu */}
                <path
                    d="M 330 850 L 370 855 L 410 870 L 445 895 L 470 930 L 475 970 L 465 1010 L 440 1045 L 405 1070 L 365 1080 L 325 1075 L 290 1055 L 265 1020 L 260 980 L 270 940 L 290 900 L 310 870 Z"
                    fill={getStateFillColor('Tamil Nadu')}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="state-path"
                    onMouseEnter={(e) => handleStateHover(e, 'Tamil Nadu')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleStateLeave}
                    data-state="Tamil Nadu"
                />
            </svg>

            {/* Tooltip */}
            {hoveredState && (
                <div
                    className="map-tooltip"
                    style={{
                        left: `${tooltipPosition.x + 15}px`,
                        top: `${tooltipPosition.y - 80}px`,
                    }}
                >
                    <div className="tooltip-header" style={{ backgroundColor: hoveredState.partyColor }}>
                        <h5 className="mb-0">{hoveredState.state}</h5>
                    </div>
                    <div className="tooltip-body">
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
                    </div>
                </div>
            )}
        </div>
    );
};
