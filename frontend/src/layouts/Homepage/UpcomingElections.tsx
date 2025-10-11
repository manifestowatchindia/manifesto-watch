import React, { useState } from 'react';

export const UpcomingElections: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // All upcoming elections data
    const allElections = [
        // 2026 Elections
        {
            id: 1,
            state: 'Assam',
            year: '2026',
            backgroundImage: '/static/images/assam-election.jpg'
        },
        {
            id: 2,
            state: 'Kerala',
            year: '2026',
            backgroundImage: '/static/images/kerala-election.jpg'
        },
        {
            id: 3,
            state: 'Tamil Nadu',
            year: '2026',
            backgroundImage: '/static/images/tamilnadu-election.jpg'
        },
        {
            id: 4,
            state: 'West Bengal',
            year: '2026',
            backgroundImage: '/static/images/westbengal-election.jpg'
        },
        // 2027 Elections
        {
            id: 5,
            state: 'Uttar Pradesh',
            year: '2027',
            backgroundImage: '/static/images/uttarpradesh-election.jpg'
        },
        {
            id: 6,
            state: 'Gujarat',
            year: '2027',
            backgroundImage: '/static/images/gujarat-election.jpg'
        },
        {
            id: 7,
            state: 'Punjab',
            year: '2027',
            backgroundImage: '/static/images/punjab-election.jpg'
        },
        {
            id: 8,
            state: 'Goa',
            year: '2027',
            backgroundImage: '/static/images/goa-election.jpg'
        }
    ];

    // Show 4 elections at a time, but scroll one by one
    const itemsPerPage = 4;
    const totalSlides = allElections.length - itemsPerPage + 1;
    
    const upcomingElections = allElections.slice(
        currentIndex,
        currentIndex + itemsPerPage
    );

    const handleNext = () => {
        if (currentIndex < totalSlides - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="container my-5 py-4">
            {/* Section Header */}
            <div className="text-center mb-4">
                <h2 className="fw-bold text-white mb-2">Upcoming Assembly Elections</h2>
            </div>

            {/* Election Cards with Navigation */}
            <div className="position-relative">
                {/* Previous Arrow */}
                {currentIndex > 0 && (
                    <button
                        className="carousel-arrow carousel-arrow-left"
                        onClick={handlePrev}
                        aria-label="Previous elections"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                )}

                {/* Election Cards */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {upcomingElections.map(election => (
                        <div key={election.id} className="col">
                            <div 
                                className="election-card position-relative overflow-hidden"
                                style={{
                                    backgroundImage: `url(${election.backgroundImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '250px',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                {/* Overlay */}
                                <div className="election-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center">
                                    <h3 className="text-white fw-bold mb-2">{election.state}</h3>
                                    <p className="text-white fs-5 mb-0">Election {election.year}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Next Arrow */}
                {currentIndex < totalSlides - 1 && (
                    <button
                        className="carousel-arrow carousel-arrow-right"
                        onClick={handleNext}
                        aria-label="Next elections"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                )}
            </div>

            {/* Pagination Dots */}
            <div className="text-center mt-4">
                <div className="d-inline-flex gap-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};