import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo">ABT</span>
          EventsByABT
        </Link>

        <nav className="navbar__links">
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/my-events">My Events</NavLink>
        </nav>

        <div className="navbar__actions">
          <Link to="/login" className="btn btn--outline">Login</Link>
          <Link to="/register" className="btn btn--primary">Register</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;