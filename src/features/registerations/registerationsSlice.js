import { createSlice } from '@reduxjs/toolkit';

function loadRegistrations() {
    try {
        return JSON.parse(localStorage.getItem('registrations')) || {};
    } catch {
        return {};
    }
}

const slice = createSlice({
    name: 'registrations',
    initialState: loadRegistrations(),
    reducers: {
        registerEvent: (state, action) => {
        const userId = action.payload.userId;
        const event = action.payload.event;

        if (!state[userId]) {
            state[userId] = [];
        }

        const already = state[userId].some((e) => e.id === event.id);
        if (already) {
            return;
        }

        state[userId].push(event);
        localStorage.setItem('registrations', JSON.stringify(state));
        },

        cancelEvent: (state, action) => {
        const userId = action.payload.userId;
        const eventId = action.payload.eventId;

        if (!state[userId]) {
            return;
        }

        state[userId] = state[userId].filter((e) => e.id !== eventId);
        localStorage.setItem('registrations', JSON.stringify(state));
        },
    },
});

export const { registerEvent, cancelEvent } = slice.actions;

export const getRegistrations = (state) => state.registrations;

export default slice.reducer;