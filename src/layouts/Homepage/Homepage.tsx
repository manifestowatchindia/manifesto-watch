import React from 'react';
import { ExploreTopTopics } from './ExploreTopTopics';
import { UpcomingElections } from './UpcomingElections';

export const Homepage: React.FC = () => {
    return (
        <>
            <ExploreTopTopics />
            <UpcomingElections />
        </>
    );
};