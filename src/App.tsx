import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { ExploreTopTopics } from './layouts/Homepage/ExploreTopTopics';


const App: React.FC = () => {
  return (
   <div>
    <Navbar />
    <ExploreTopTopics/>
    </div>
  );
};

export default App;