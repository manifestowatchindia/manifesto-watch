export const ExploreTopTopics: React.FC = () => {
    return (
        <div className="spotlight d-flex flex-column align-items-center">
            {/* Main Section */}
            <div className="image-section-wrapper">
                <img src="/static/images/democracy_v2.jpg" alt="Democracy" className="image-section" />
                <div className="overlay d-flex justify-content-center align-items-center">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bold">Empowering Voices, Shaping the Future.</h1>
                        <p className="fs-4">Explore manifestos that shape tomorrow.</p>
                        <a href="#explore" className="btn btn-primary">Explore NOW</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
