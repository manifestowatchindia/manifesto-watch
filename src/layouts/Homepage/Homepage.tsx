import React from 'react';
import SEO from '../../components/SEO';
import { ExploreTopTopics } from './ExploreTopTopics';
import { UpcomingElections } from './UpcomingElections';

export const Homepage: React.FC = () => {
    return (
        <>
            <SEO 
                title="Manifesto Watch - Track Political Manifestos & Promises in India"
                description="Track and monitor political party manifestos, election promises, and their implementation across Indian states. Promoting transparency and accountability in Indian democracy."
                canonicalUrl="https://www.manifestowatch.in/"
            />
            <ExploreTopTopics />
            <UpcomingElections />
        </>
    );
};