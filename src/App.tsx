import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';

// Lazy load heavy components for better performance
const Homepage = lazy(() => import('./layouts/Homepage/Homepage').then(module => ({ default: module.Homepage })));
const ContactUs = lazy(() => import('./layouts/ContactUs/ContactUs').then(module => ({ default: module.ContactUs })));
const AboutUs = lazy(() => import('./layouts/AboutUs/AboutUs').then(module => ({ default: module.AboutUs })));
const NewsUpdates = lazy(() => import('./layouts/NewsUpdates/NewsUpdates').then(module => ({ default: module.NewsUpdates })));
const PoliticalLandscape = lazy(() => import('./layouts/PoliticalLandscape/PoliticalLandscape').then(module => ({ default: module.PoliticalLandscape })));
const InteractiveMap = lazy(() => import('./layouts/InteractiveMap/InteractiveMap').then(module => ({ default: module.InteractiveMap })));
const Tracking = lazy(() => import('./layouts/Tracking/Tracking').then(module => ({ default: module.Tracking })));

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="text-white">Loading...</p>
  </div>
);


const App: React.FC = () => {
  return (
   <HelmetProvider>
    <Router>
      <div>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/political-landscape" element={<PoliticalLandscape />} />
            <Route path="/interactive-map" element={<InteractiveMap />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/news" element={<NewsUpdates />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
   </HelmetProvider>
  );
};

export default App;