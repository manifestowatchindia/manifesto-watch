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
        <div className="container mx-auto px-4 my-12 py-8">
            {/* Section Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Upcoming Assembly Elections
                </h2>
            </div>

            {/* Election Cards with Navigation */}
            <div className="relative">
                {/* Previous Arrow */}
                {currentIndex > 0 && (
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                        onClick={handlePrev}
                        aria-label="Previous elections"
                    >
                        <i className="fas fa-chevron-left text-primary-900"></i>
                    </button>
                )}

                {/* Election Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {upcomingElections.map(election => (
                        <div key={election.id} className="group">
                            <div 
                                className="relative overflow-hidden rounded-lg h-64 cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                style={{
                                    backgroundImage: `url(${election.backgroundImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-center items-center text-center p-4 transition-all duration-300 group-hover:from-black/90 group-hover:via-black/60">
                                    <h3 className="text-white text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:scale-110">
                                        {election.state}
                                    </h3>
                                    <p className="text-white text-lg">
                                        Election {election.year}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Next Arrow */}
                {currentIndex < totalSlides - 1 && (
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                        onClick={handleNext}
                        aria-label="Next elections"
                    >
                        <i className="fas fa-chevron-right text-primary-900"></i>
                    </button>
                )}
            </div>

            {/* Pagination Dots */}
            <div className="text-center mt-8">
                <div className="inline-flex gap-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'bg-white w-8' 
                                    : 'bg-white/40 hover:bg-white/60'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};