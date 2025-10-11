import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Homepage } from './layouts/Homepage/Homepage';
import { ContactUs } from './layouts/ContactUs/ContactUs';
import { AboutUs } from './layouts/AboutUs/AboutUs';
import { NewsUpdates } from './layouts/NewsUpdates/NewsUpdates';
import { PoliticalLandscape } from './layouts/PoliticalLandscape/PoliticalLandscape';
import { InteractiveMap } from './layouts/InteractiveMap/InteractiveMap';


const App: React.FC = () => {
  return (
   <HelmetProvider>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/political-landscape" element={<PoliticalLandscape />} />
          <Route path="/interactive-map" element={<InteractiveMap />} />
          <Route path="/news" element={<NewsUpdates />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
   </HelmetProvider>
  );
};

export default App;