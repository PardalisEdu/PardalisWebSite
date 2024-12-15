// @ts-check
import { authStore } from '$lib/stores/authStore.js';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const token = event.cookies.get('token') || event.request.headers.get('Authorization')?.split('Bearer ')[1];

	if (token) {
		/** @type {import('$lib/types/types.js').DecodedToken|null} */
		const decoded = JSON.parse(atob(token.split('.')[1]));
		if (decoded && decoded.userApodo) {
			authStore.login(token, { apodo: decoded.userApodo });
		}
	}

	const response = await resolve(event);
	return response;
}