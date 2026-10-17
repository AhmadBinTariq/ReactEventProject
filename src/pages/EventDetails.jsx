import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventById } from '../api/ticketmaster';
import {
    setLoading,
    setError,
    setCurrent,
    getCurrent,
    getLoading,
    getError,
} from '../features/events/eventsSlice';
import { selectUser } from '../features/auth/authSlice';
import {
    registerEvent,
    cancelEvent,
    getRegistrations,
} from '../features/registerations/registerationsSlice';
import './EventDetails.css';

function EventDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const event = useSelector(getCurrent);
    const loading = useSelector(getLoading);
    const error = useSelector(getError);
    const user = useSelector(selectUser);
    const registrations = useSelector(getRegistrations);

    const [message, setMessage] = useState('');

    useEffect(() => {
        async function loadEvent() {
        dispatch(setLoading());

        try {
            const data = await fetchEventById(id);
            dispatch(setCurrent(data));
        } catch (err) {
            dispatch(setError(err.message));
        }
        }

        loadEvent();
    }, [id, dispatch]);

    function isRegistered(eventId) {
        if (!user) {
            return false;
        }

        const myEvents = registrations[user.id] || [];
        return myEvents.some((e) => e.id === eventId);
    }

    if (loading) {
        return <p className="details-message">Loading event...</p>;
    }

    if (error) {
        return <p className="details-error">{error}</p>;
    }

    if (!event) {
        return null;
    }

    const image = event.images?.[0]?.url;
    const status = event.dates?.status?.code || 'N/A';
    const date = event.dates?.start?.localDate || 'N/A';
    const time = event.dates?.start?.localTime || 'N/A';
    const category = event.classifications?.[0]?.segment?.name || 'N/A';
    const genre = event.classifications?.[0]?.genre?.name || 'N/A';

    const venue = event._embedded?.venues?.[0];
    const venueName = venue?.name || 'N/A';
    const city = venue?.city?.name || 'N/A';
    const country = venue?.country?.name || 'N/A';
    const address = venue?.address?.line1 || 'N/A';

    const registered = isRegistered(event.id);

    function handleRegister() {
        if (!user) {
            navigate('/login');
            return;
        }

        const eventInfo = {
            id: event.id,
            name: event.name,
            image: image,
            date: date,
            time: time,
            venue: venueName,
            city: city,
            category: category,
        };

        dispatch(registerEvent({ userId: user.id, event: eventInfo }));
        setMessage('You are registered for this event!');
    }

    function handleCancel() {
        dispatch(cancelEvent({ userId: user.id, eventId: event.id }));
        setMessage('Your registration has been cancelled.');
    }

    return (
        <div>
        <Link to="/events" className="details-back">
            ← Back to events
        </Link>

        <img className="details-image" src={image} alt={event.name} />

        <div>
            <div className="details-top">
                <div className="details-badges">
                    <span className="details-badge details-badge-green">{status}</span>
                    <span className="details-badge">{category}</span>
                </div>
                <div className="details-buttons">
                {registered ? (
                    <button className="btn btn--outline" onClick={handleCancel}>
                    Cancel Registration
                    </button>
                ) : (
                    <button className="btn btn--primary" onClick={handleRegister}>
                    {user ? 'Register' : 'Login to Register'}
                    </button>
                )}
                </div>
            </div>
            {message && <p className="details-success">{message}</p>}
        </div>

        <h1 className="details-title">{event.name}</h1>
        <p className="details-subtitle">{genre}</p>

        <hr className="details-line" />

        <div className="details-grid">
            <div>
            <p className="details-label">DATE</p>
            <p className="details-value">{date}</p>
            </div>

            <div>
            <p className="details-label">TIME</p>
            <p className="details-value">{time}</p>
            </div>

            <div>
            <p className="details-label">LOCATION</p>
            <p className="details-value">{city}, {country}</p>
            </div>

            <div>
            <p className="details-label">VENUE</p>
            <p className="details-value">{venueName}</p>
            </div>

            <div>
            <p className="details-label">ADDRESS</p>
            <p className="details-value">{address}</p>
            </div>

            <div>
            <p className="details-label">CATEGORY</p>
            <p className="details-value">{category}</p>
            </div>

            <div>
            <p className="details-label">GENRE</p>
            <p className="details-value">{genre}</p>
            </div>
        </div>

        {event.info && (
            <div className="details-section">
            <h2>About this event</h2>
            <p>{event.info}</p>
            </div>
        )}

        {event.pleaseNote && (
            <div className="details-section">
            <h2>Please note</h2>
            <p>{event.pleaseNote}</p>
            </div>
        )}
        </div>
    );
}

export default EventDetails;