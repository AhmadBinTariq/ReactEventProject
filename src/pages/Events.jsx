import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../api/ticketmaster';
import {
    setLoading,
    setEvents,
    setError,
    setSearch,
    setPage,
    getEvents,
    getLoading,
    getError,
    getSearch,
    getPage,
    getPages,
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
    const pages = useSelector(getPages);

    // what the user is typing (not searched yet)
    const [text, setText] = useState(search);

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

    function handleSearch(event) {
        event.preventDefault();
        dispatch(setSearch(text));
    }

    function handleClear() {
        setText('');
        dispatch(setSearch(''));
    }

    function handlePrevious() {
        dispatch(setPage(page - 1));
        window.scrollTo(0, 0);
    }

    function handleNext() {
        dispatch(setPage(page + 1));
        window.scrollTo(0, 0);
    }

    // Ticketmaster only allows about 50 pages when size is 20
    let lastPage = pages - 1;
    if (lastPage > 49) {
        lastPage = 49;
    }

    return (
        <div>
        <h1 className="events-heading">Explore Events</h1>

        <form className="events-search" onSubmit={handleSearch}>
            <input
            className="events-search-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search events, artists, teams..."
            />
            <button className="btn btn--primary" type="submit">
            Search
            </button>
            {search && (
            <button className="btn btn--outline" type="button" onClick={handleClear}>
                Clear
            </button>
            )}
        </form>

        {search && (
            <p className="events-result-text">Showing results for "{search}"</p>
        )}

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

        {!loading && !error && events.length > 0 && (
            <div className="events-pagination">
            <button
                className="btn btn--outline"
                onClick={handlePrevious}
                disabled={page === 0}
            >
                Previous
            </button>

            <span className="events-page-text">
                Page {page + 1} of {lastPage + 1}
            </span>

            <button
                className="btn btn--outline"
                onClick={handleNext}
                disabled={page >= lastPage}
            >
                Next
            </button>
            </div>
        )}
        </div>
    );
}

export default Events;