import { Link, NavLink, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { logout, selectUser } from '../features/auth/authSlice';
import './Navbar.css';

function Navbar() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
    <header className="navbar">
        <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
            <span className="navbar__logo">ABT</span>
            EventsByABT
        </Link>

        <nav className="navbar__links">
            <NavLink to="/events">Events</NavLink>
            {user && <NavLink to="/my-events">My Events</NavLink>}
        </nav>

        <div className="navbar__actions">
            {user ? (
                <>
                    <span className="navbar__user">{user.name}</span>
                    <button onClick={handleLogout} className="btn btn--outline">
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login" className="btn btn--outline">Login</Link>
                    <Link to="/register" className="btn btn--primary">Register</Link>
                </>
            )}
        </div>
        </div>
    </header>
    );
}

export default Navbar;