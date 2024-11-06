import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createAuthStore() {
    // Estado inicial básico
    const initialState = {
        token: null,
        user: null,
        isAuthenticated: false
    };

    // Si estamos en el navegador, intentar recuperar el estado de localStorage
    if (browser) {
        const token = localStorage.getItem('auth_token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (token && user) {
            initialState.token = token;
            initialState.user = user;
            initialState.isAuthenticated = true;
        }
    }

    const { subscribe, set, update } = writable(initialState);

    return {
        subscribe,
        login: (token, user) => {
            if (browser) {
                localStorage.setItem('auth_token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }

            set({
                token,
                user,
                isAuthenticated: true
            });
        },
        logout: () => {
            if (browser) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
            }

            set({
                token: null,
                user: null,
                isAuthenticated: false
            });
        },
        checkAuth: () => {
            if (!browser) return false;

            const token = localStorage.getItem('auth_token');
            const user = JSON.parse(localStorage.getItem('user') || 'null');

            if (token && user) {
                set({
                    token,
                    user,
                    isAuthenticated: true
                });
                return true;
            }
            return false;
        }
    };
}

export const authStore = createAuthStore();