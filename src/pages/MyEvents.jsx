import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { selectUser } from '../features/auth/authSlice';
import { getRegistrations } from '../features/registerations/registerationsSlice';
import MyEventCard from '../components/MyEventCard';
import './Events.css';

function MyEvents() {
  const user = useSelector(selectUser);
  const registrations = useSelector(getRegistrations);
  if (!user) {
    return <Navigate to="/login" />;
  }

  const myEvents = registrations[user.id] || [];
  const today = new Date().toLocaleDateString('en-CA');

  const upcoming = myEvents.filter((e) => e.date >= today);
  const completed = myEvents.filter((e) => e.date < today);

  return (
    <div>
      <h1 className="my-events-heading">My Events</h1>
      <p className="my-events-text">Welcome, {user.name}! Here are your registered events.</p>

      {myEvents.length === 0 && (
        <div className="my-events-empty">
          <p>You haven't registered for any events yet.</p>
          <Link to="/events" className="btn btn--primary">
            Browse Events
          </Link>
        </div>
      )}

      {myEvents.length > 0 && (
        <>
          <h2 className="my-events-section">Upcoming ({upcoming.length})</h2>

          {upcoming.length === 0 && (
            <p className="my-events-text">No upcoming events.</p>
          )}

          <div className="my-events-grid">
            {upcoming.map((event) => (
              <MyEventCard key={event.id} event={event} completed={false} />
            ))}
          </div>

          <h2 className="my-events-section">Completed ({completed.length})</h2>

          {completed.length === 0 && (
            <p className="my-events-text">No completed events.</p>
          )}

          <div className="my-events-grid">
            {completed.map((event) => (
              <MyEventCard key={event.id} event={event} completed={true} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyEvents;