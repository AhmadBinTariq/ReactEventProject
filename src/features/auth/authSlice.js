import { createSlice } from '@reduxjs/toolkit';

const getStoredUsers = () => {
    try {
        return JSON.parse(localStorage.getItem('users')) || [];
    } catch {
        return [];
    }
};

const getStoredCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch {
        return null;
    }
};

// ----------------------------------------------------------

const initialState = {
    user: getStoredCurrentUser(),
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    register: (state, action) => {
        const { name, email, password } = action.payload;
        const users = getStoredUsers();

        const taken = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (taken) {
        state.error = 'An account with this email already exists.';
        return;
        }

        const newUser = { id: crypto.randomUUID(), name, email, password };
        localStorage.setItem('users', JSON.stringify([...users, newUser]));

        const session = { id: newUser.id, name, email };
        localStorage.setItem('currentUser', JSON.stringify(session));

        state.user = session;
        state.error = null;
    },

    login: (state, action) => {
        const { email, password } = action.payload;
        const users = getStoredUsers();

        const found = users.find(
        (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (!found) {
        state.user = null;
        state.error = 'Invalid email or password.';
        return;
        }

        const session = { id: found.id, name: found.name, email: found.email };
        localStorage.setItem('currentUser', JSON.stringify(session));

        state.user = session;
        state.error = null;
    },

    logout: (state) => {
        localStorage.removeItem('currentUser');
        state.user = null;
        state.error = null;
    },

    clearError: (state) => {
        state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectIsLoggedIn = (state) => Boolean(state.auth.user);

export default authSlice.reducer;