import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <p className="home-tag">React Assignment 2</p>

      <h1 className="home-title">EventsByABT</h1>
      <p className="home-text">Discover events, register, and manage them all in one place.</p>

      <div className="home-student">
        <p className="home-name">Ahmad Bin Tariq</p>
        <p className="home-roll">23L-2510</p>
      </div>

      <Link to="/events" className="btn btn--primary home-button">
        Explore Events
      </Link>
    </div>
  );
}

export default Home;