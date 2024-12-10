import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createAuthStore() {
	const { subscribe, set, update } = writable({
		user: null,
		isAuthenticated: false,
		token: null
	});

	return {
		subscribe,
		login: (token, user) => {
			if (browser) {
				localStorage.setItem('token', token);
			}
			set({ user, token, isAuthenticated: true });
		},
		logout: () => {
			if (browser) {
				localStorage.removeItem('token');
			}
			set({ user: null, token: null, isAuthenticated: false });
		},
		initialize: () => {
			if (browser) {
				const token = localStorage.getItem('token');
				if (token) {
					// Decodificar el token (está en base64)
					const payload = JSON.parse(atob(token.split('.')[1]));
					const user = { apodo: payload.userApodo };
					set({ user, token, isAuthenticated: true });
				}
			}
		}
	};
}

export const authStore = createAuthStore();