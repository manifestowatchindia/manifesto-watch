import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Homepage } from './layouts/Homepage/Homepage';
import { ContactUs } from './layouts/ContactUs/ContactUs';
import { AboutUs } from './layouts/AboutUs/AboutUs';
import { NewsUpdates } from './layouts/NewsUpdates/NewsUpdates';


const App: React.FC = () => {
  return (
   <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/news" element={<NewsUpdates />} />
      </Routes>
      <Footer />
    </div>
   </Router>
  );
};

export default App;