import logo from '../../Images/PublicImages/logo.png'
export const Navbar = () => {
    return (
        <>
            {/* Navbar with Logo on the Left and Menu items on the Right */}
            <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
                <div className="container-fluid">
                    {/* Logo aligned on the left */}
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Manifesto Watch Logo" style={{ height: '40px', width: 'auto' }} />

                    </a>
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
                                <a className="nav-link" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Manifestos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Comparisons
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Key Promises
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    News &amp; Updates
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Data &amp; Analysis
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Additional sections/components can be added below */}
        </>
    );
}