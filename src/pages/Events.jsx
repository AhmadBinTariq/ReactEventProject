import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../api/ticketmaster';
import {
    setLoading,
    setEvents,
    setError,
    getEvents,
    getLoading,
    getError,
    getSearch,
    getPage,
} from '../features/events/eventsSlice';
import EventCard from '../components/EventCard';
import './Events.css';

function Events() {
    const dispatch = useDispatch();

    const events = useSelector(getEvents);
    const loading = useSelector(getLoading);
    const error = useSelector(getError);
    const search = useSelector(getSearch);
    const page = useSelector(getPage);

    useEffect(() => {
        async function loadEvents() {
        dispatch(setLoading());

        try {
            const data = await fetchEvents(search, page);
            dispatch(setEvents(data));
        } catch (err) {
            dispatch(setError(err.message));
        }
        }

        loadEvents();
    }, [search, page, dispatch]);

    return (
        <div>
        <h1 className="events-heading">Explore Events</h1>

        {loading && <p className="events-message">Loading events...</p>}

        {error && <p className="events-error">{error}</p>}

        {!loading && !error && events.length === 0 && (
            <p className="events-message">No events found.</p>
        )}

        {!loading && !error && (
            <div className="events-grid">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
            </div>
        )}
        </div>
    );
}

export default Events;