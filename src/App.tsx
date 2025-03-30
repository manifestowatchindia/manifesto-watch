import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';


const App: React.FC = () => {
  return (
   <div>
    <Navbar />
    <Footer />
    </div>
  );
};

export default App;