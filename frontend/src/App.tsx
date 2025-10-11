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
const CentralManifestos = lazy(() => import('./layouts/Manifestos/CentralManifestos').then(module => ({ default: module.CentralManifestos })));
const StateManifestos = lazy(() => import('./layouts/Manifestos/StateManifestos').then(module => ({ default: module.StateManifestos })));
const Disclaimer = lazy(() => import('./layouts/Legal/Disclaimer').then(module => ({ default: module.Disclaimer })));
const TermsOfService = lazy(() => import('./layouts/Legal/TermsOfService').then(module => ({ default: module.TermsOfService })));
const PrivacyPolicy = lazy(() => import('./layouts/Legal/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const FAQ = lazy(() => import('./layouts/Legal/FAQ').then(module => ({ default: module.FAQ })));
const ManifestoWatchDashboard = lazy(() => import('./layouts/ManifestoWatch/ManifestoWatchDashboard').then(module => ({ default: module.ManifestoWatchDashboard })));
const CategoryDetailPage = lazy(() => import('./layouts/ManifestoWatch/CategoryDetailPage').then(module => ({ default: module.CategoryDetailPage })));
const BJP2024Tracker = lazy(() => import('./layouts/ManifestoWatch/BJP2024Tracker').then(module => ({ default: module.BJP2024Tracker })));

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
            <Route path="/manifestos/central" element={<CentralManifestos />} />
            <Route path="/manifestos/central/2024/bjp/15pointsversion" element={<BJP2024Tracker />} />
            <Route path="/manifestos/states" element={<StateManifestos />} />
            <Route path="/news" element={<NewsUpdates />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/government-dashboard" element={<ManifestoWatchDashboard />} />
            <Route path="/government-dashboard/category/:slug" element={<CategoryDetailPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
   </HelmetProvider>
  );
};

export default App;