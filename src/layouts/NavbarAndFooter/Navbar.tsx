import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../Images/PublicImages/logo.png';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isManifestosOpen, setIsManifestosOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    const toggleManifestos = () => setIsManifestosOpen(!isManifestosOpen);

    // Helper to determine if a route is active
    const isActive = (path: string) => location.pathname === path;

    // Helper to determine if any manifesto route is active
    const isManifestosActive = () => 
        location.pathname.startsWith('/manifestos');

    return (
        <>
            {/* Development Banner */}
            <div className="sticky top-0 z-50 bg-orange-500 text-black text-center py-3 px-4 font-semibold text-sm border-b-2 border-orange-600">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                This website is under development. Information displayed should not be taken as verified or official proof. Data is being continuously updated and validated.
            </div>
            
            {/* Navbar */}
            <nav className="bg-black text-white shadow-sm sticky top-[52px] z-40 border-b border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link 
                            to="/" 
                            onClick={closeMenu}
                            className="flex items-center hover:opacity-80 transition-opacity"
                        >
                            <img 
                                src={logo} 
                                alt="Manifesto Watch Logo" 
                                className="h-9 w-auto"
                            />
                        </Link>

                        {/* Hamburger Menu Button (Mobile) */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-colors"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-8">
                            <Link
                                to="/"
                                className={`text-sm font-bold transition-colors relative pb-1 ${
                                    isActive('/')
                                        ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/political-landscape"
                                className={`text-sm font-bold transition-colors relative pb-1 ${
                                    isActive('/political-landscape')
                                        ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                Political Landscape
                            </Link>
                            <Link
                                to="/interactive-map"
                                className={`text-sm font-bold transition-colors relative pb-1 ${
                                    isActive('/interactive-map')
                                        ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                Interactive Map
                            </Link>
                            <Link
                                to="/tracking"
                                className={`text-sm font-bold transition-colors relative pb-1 ${
                                    isActive('/tracking')
                                        ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                Tracking
                            </Link>
                            <Link
                                to="/news"
                                className={`text-sm font-bold transition-colors relative pb-1 ${
                                    isActive('/news')
                                        ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                News &amp; Updates
                            </Link>

                            {/* Manifestos Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={toggleManifestos}
                                    onBlur={() => setTimeout(() => setIsManifestosOpen(false), 200)}
                                    className={`text-sm font-bold transition-colors flex items-center relative pb-1 ${
                                        isManifestosActive()
                                            ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                    aria-expanded={isManifestosOpen}
                                    aria-haspopup="true"
                                >
                                    Manifestos
                                    <svg
                                        className={`ml-1 w-4 h-4 transition-transform ${
                                            isManifestosOpen ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {isManifestosOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-gray-700 z-50">
                                        <div className="py-1" role="menu" aria-orientation="vertical">
                                            <Link
                                                to="/manifestos/central"
                                                onClick={() => setIsManifestosOpen(false)}
                                                className={`block px-4 py-2 text-sm font-bold transition-colors ${
                                                    isActive('/manifestos/central')
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                }`}
                                                role="menuitem"
                                            >
                                                Central Government
                                            </Link>
                                            <Link
                                                to="/manifestos/states"
                                                onClick={() => setIsManifestosOpen(false)}
                                                className={`block px-4 py-2 text-sm font-bold transition-colors ${
                                                    isActive('/manifestos/states')
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                }`}
                                                role="menuitem"
                                            >
                                                States &amp; Union Territories
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/contact"
                                className={`text-sm font-bold transition-colors relative pb-1 ${
                                    isActive('/contact')
                                        ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="flex flex-col space-y-1 pb-3 bg-black">
                            <Link
                                to="/"
                                onClick={closeMenu}
                                className={`px-6 py-3 text-sm font-bold transition-colors border-l-4 ${
                                    isActive('/')
                                        ? 'border-white bg-gray-900 text-white'
                                        : 'border-transparent text-gray-300 hover:bg-gray-900 hover:border-gray-700'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/political-landscape"
                                onClick={closeMenu}
                                className={`px-6 py-3 text-sm font-bold transition-colors border-l-4 ${
                                    isActive('/political-landscape')
                                        ? 'border-white bg-gray-900 text-white'
                                        : 'border-transparent text-gray-300 hover:bg-gray-900 hover:border-gray-700'
                                }`}
                            >
                                Political Landscape
                            </Link>
                            <Link
                                to="/interactive-map"
                                onClick={closeMenu}
                                className={`px-6 py-3 text-sm font-bold transition-colors border-l-4 ${
                                    isActive('/interactive-map')
                                        ? 'border-white bg-gray-900 text-white'
                                        : 'border-transparent text-gray-300 hover:bg-gray-900 hover:border-gray-700'
                                }`}
                            >
                                Interactive Map
                            </Link>
                            <Link
                                to="/tracking"
                                onClick={closeMenu}
                                className={`px-6 py-3 text-sm font-bold transition-colors border-l-4 ${
                                    isActive('/tracking')
                                        ? 'border-white bg-gray-900 text-white'
                                        : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                                }`}
                            >
                                Tracking
                            </Link>
                            <Link
                                to="/news"
                                onClick={closeMenu}
                                className={`px-6 py-3 text-sm font-bold transition-colors border-l-4 ${
                                    isActive('/news')
                                        ? 'border-white bg-gray-900 text-white'
                                        : 'border-transparent text-gray-300 hover:bg-gray-900 hover:border-gray-700'
                                }`}
                            >
                                News &amp; Updates
                            </Link>

                            {/* Mobile Manifestos Submenu */}
                            <div>
                                <button
                                    onClick={toggleManifestos}
                                    className={`w-full text-left px-6 py-3 text-sm font-bold transition-colors flex items-center justify-between border-l-4 ${
                                        isManifestosActive()
                                            ? 'border-white bg-gray-900 text-white'
                                            : 'border-transparent text-gray-300 hover:bg-gray-900 hover:border-gray-700'
                                    }`}
                                    aria-expanded={isManifestosOpen}
                                >
                                    Manifestos
                                    <svg
                                        className={`w-4 h-4 transition-transform ${
                                            isManifestosOpen ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {isManifestosOpen && (
                                    <div className="ml-4 mt-1 space-y-1">
                                        <Link
                                            to="/manifestos/central"
                                            onClick={closeMenu}
                                            className={`block px-6 py-2 text-sm font-bold transition-colors ${
                                                isActive('/manifestos/central')
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                            }`}
                                        >
                                            Central Government
                                        </Link>
                                        <Link
                                            to="/manifestos/states"
                                            onClick={closeMenu}
                                            className={`block px-6 py-2 text-sm font-bold transition-colors ${
                                                isActive('/manifestos/states')
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                            }`}
                                        >
                                            States &amp; Union Territories
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/contact"
                                onClick={closeMenu}
                                className={`px-6 py-3 text-sm font-bold transition-colors border-l-4 ${
                                    isActive('/contact')
                                        ? 'border-white bg-gray-900 text-white'
                                        : 'border-transparent text-gray-300 hover:bg-gray-900 hover:border-gray-700'
                                }`}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};