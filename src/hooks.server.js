import { authStore } from '$lib/stores/authStore.js';
import { decodeToken } from '$lib/utils/jwt.js';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const token = event.cookies.get('token') || event.request.headers.get('Authorization')?.split('Bearer ')[1];

	if (token) {
		const decoded = decodeToken(token);
		if (decoded && decoded.userApodo) {
			// Actualizar el store con la información del usuario
			authStore.setUser({
				apodo: decoded.userApodo
			});
			authStore.setToken(token);
		}
	}

	const response = await resolve(event);
	return response;
}