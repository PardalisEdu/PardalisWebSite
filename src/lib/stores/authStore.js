// @ts-check
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/** @type {import('$lib/types/types.js').AuthState} */
const initialState = {
	user: null,
	isAuthenticated: false,
	token: null
};

function createAuthStore() {
	const { subscribe, set } = writable(initialState);

	return {
		subscribe,
		/**
		 * @param {string} token
		 * @param {import('$lib/types/types.js').User} user
		 */
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
			set(initialState);
		},
		initialize: () => {
			if (browser) {
				const token = localStorage.getItem('token');
				if (token) {
					// Decodificar el token (está en base64)
					const payload = JSON.parse(atob(token.split('.')[1]));
					/** @type {import('$lib/types/types.js').User} */
					const user = { apodo: payload.userApodo };
					set({ user, token, isAuthenticated: true });
				}
			}
		}
	};
}

export const authStore = createAuthStore();