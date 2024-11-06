import { writable } from 'svelte/store';

function createAuthStore() {
    const { subscribe, set, update } = writable({
        token: null,
        user: null,
        isAuthenticated: false
    });

    return {
        subscribe,
        login: (token, user) => {
            // Guardar en localStorage para persistencia
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user', JSON.stringify(user));

            set({
                token,
                user,
                isAuthenticated: true
            });
        },
        logout: () => {
            // Limpiar localStorage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');

            set({
                token: null,
                user: null,
                isAuthenticated: false
            });
        },
        // Inicializar store con datos del localStorage si existen
        initialize: () => {
            const token = localStorage.getItem('auth_token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (token && user) {
                set({
                    token,
                    user,
                    isAuthenticated: true
                });
            }
        }
    };
}

export const authStore = createAuthStore();