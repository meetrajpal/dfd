import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();

    return (
        <header id="header" className="header d-flex align-items-center sticky-top">
            <div className="container-fluid position-relative d-flex align-items-center justify-content-between">

                <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
                    <h1 className="sitename">Deepfake Gaurd</h1>
                </Link>

                {/* <nav id="navmenu" className="navmenu">
                    <ul>
                        {
                            (location.pathname != "/login") && (localStorage.getItem('token') == null) ?
                                <li><Link to="/login">Login</Link></li> : ""
                        }
                        {
                            (location.pathname != "/signup") && (localStorage.getItem('token') == null) ?
                                <li><Link to="/signup">Sign Up</Link></li> : ""
                        }
                    </ul>
                    <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                </nav> */}
                {
                    localStorage.getItem('token') == null ?
                        <Link className="btn-getstarted" to="login">Try for free</Link> :
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {localStorage.getItem('username')}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="#">Delete Account</a></li>
                                <li><a class="dropdown-item" href="#">Log out</a></li>
                            </ul>
                        </div>
                }
            </div>
        </header>
    );
}

export default Header;