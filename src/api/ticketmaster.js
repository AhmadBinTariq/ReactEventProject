const API_KEY = import.meta.env.VITE_TM_API_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export async function fetchEvents(keyword, page, category, upcoming) {
    let url = `${BASE_URL}/events.json?apikey=${API_KEY}&size=20`;

    if (keyword) {
        url = url + `&keyword=${keyword}`;
    }

    if (page) {
        url = url + `&page=${page}`;
    }

    if (category) {
        url = url + `&classificationName=${category}`;
    }

    if (upcoming) {
        url = url + `&sort=date,asc`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to load events');
    }

    const data = await response.json();

    if (!data._embedded) {
        return { events: [], totalPages: 0 };
    }

    return {
        events: data._embedded.events,
        totalPages: data.page.totalPages,
    };
}

export async function fetchEventById(id) {
    const url = `${BASE_URL}/events/${id}.json?apikey=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
    throw new Error('Failed to load event');
    }

    return await response.json();
}