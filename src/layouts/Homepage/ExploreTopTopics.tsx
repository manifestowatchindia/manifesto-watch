export const ExploreTopTopics: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <div className="relative w-full h-[600px] overflow-hidden">
                <img 
                    src="/static/images/democracy_v2.jpg" 
                    alt="Democracy" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex justify-center items-center">
                    <div className="text-center text-white px-4 max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                            Tracking Manifestos, Measuring Progress.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

