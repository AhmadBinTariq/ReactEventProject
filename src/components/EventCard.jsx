import { Link } from 'react-router-dom';
import './EventCard.css';

function EventCard({ event }) {
  const image = event.images?.[0]?.url;
  const date = event.dates?.start?.localDate || 'N/A';
  const time = event.dates?.start?.localTime || 'N/A';
  const venue = event._embedded?.venues?.[0]?.name || 'N/A';
  const city = event._embedded?.venues?.[0]?.city?.name || 'N/A';
  const category = event.classifications?.[0]?.segment?.name || 'N/A';

  return (
    <Link to={`/events/${event.id}`} className="event-card">
      <img className="event-card-image" src={image} alt={event.name} />

      <div className="event-card-body">
        <p className="event-card-category">{category}</p>
        <h3 className="event-card-title">{event.name}</h3>
        <p className="event-card-info">Date: {date}</p>
        <p className="event-card-info">Time: {time}</p>
        <p className="event-card-info">Venue: {venue}</p>
        <p className="event-card-info">City: {city}</p>
      </div>
    </Link>
  );
}

export default EventCard;