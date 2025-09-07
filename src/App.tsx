import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/Pages/HomePage';
import { ManifestosPage } from './layouts/Pages/ManifestosPage';
import { ComparisonsPage } from './layouts/Pages/ComparisonsPage';
import { AboutPage } from './layouts/Pages/AboutPage';
import { ContactPage } from './layouts/Pages/ContactPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/manifestos" element={<ManifestosPage />} />
            <Route path="/comparisons" element={<ComparisonsPage />} />
            <Route path="/promises" element={<ManifestosPage />} />
            <Route path="/news" element={<ManifestosPage />} />
            <Route path="/data" element={<ComparisonsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;