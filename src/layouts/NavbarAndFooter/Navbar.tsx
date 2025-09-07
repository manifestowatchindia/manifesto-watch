import { Link } from 'react-router-dom';
import logo from '../../Images/PublicImages/logo.png'

export const Navbar = () => {
    return (
        <>
            {/* Navbar with Logo on the Left and Menu items on the Right */}
            <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
                <div className="container-fluid">
                    {/* Logo aligned on the left */}
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Manifesto Watch Logo" style={{ height: '40px', width: 'auto' }} />

                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle Navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Menu items aligned to the right using ms-auto */}
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/manifestos">
                                    Manifestos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/comparisons">
                                    Comparisons
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/promises">
                                    Key Promises
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/news">
                                    News &amp; Updates
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/data">
                                    Data &amp; Analysis
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Additional sections/components can be added below */}
        </>
    );
}