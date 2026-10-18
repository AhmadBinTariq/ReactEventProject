import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { cancelEvent } from '../features/registerations/registerationsSlice';
import './EventCard.css';

function MyEventCard({ event, completed }) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    function handleCancel() {
        dispatch(cancelEvent({ userId: user.id, eventId: event.id }));
    }

    return (
        <div className="event-card">
        <img className="event-card-image" src={event.image} alt={event.name} />

        <div className="event-card-body">
            <p className="event-card-category">{event.category}</p>

            <Link to={`/events/${event.id}`}>
            <h3 className="event-card-title">{event.name}</h3>
            </Link>

            <p className="event-card-info">Date: {event.date}</p>
            <p className="event-card-info">Time: {event.time}</p>
            <p className="event-card-info">Venue: {event.venue}</p>
            <p className="event-card-info">City: {event.city}</p>

            {completed ? (
            <p className="my-card-done">Completed</p>
            ) : (
            <button className="btn btn--outline my-card-cancel" onClick={handleCancel}>
                Cancel Registration
            </button>
            )}
        </div>
        </div>
    );
}

export default MyEventCard;