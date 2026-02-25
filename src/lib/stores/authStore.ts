import { writable, derived } from 'svelte/store';
import { page } from '$app/stores';
import type { User, AuthState } from '$lib/types/types';

/**
 * Auth store derived from server-provided page data.
 * The source of truth is the server cookie + event.locals.
 * This store provides a reactive client-side view of that state.
 */
function createAuthStore() {
	const { subscribe, set } = writable<AuthState>({
		user: null,
		isAuthenticated: false
	});

	return {
		subscribe,
		/** Sync the store with the user data coming from +layout.server.ts */
		sync(user: User | null) {
			set({
				user,
				isAuthenticated: !!user
			});
		}
	};
}

export const authStore = createAuthStore();
