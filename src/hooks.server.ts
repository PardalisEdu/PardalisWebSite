import type { Handle } from '@sveltejs/kit';
import { decodeToken, isTokenExpired } from '$lib/utils/jwt';

export const handle: Handle = async ({ event, resolve }) => {
	const token =
		event.cookies.get('token') ??
		event.request.headers.get('Authorization')?.replace('Bearer ', '') ??
		null;

	if (token) {
		const decoded = decodeToken(token);
		if (decoded && !isTokenExpired(decoded)) {
			event.locals.user = { apodo: decoded.userApodo };
			event.locals.token = token;
		} else {
			// Token expired or invalid — clear cookie
			event.cookies.delete('token', { path: '/' });
			event.locals.user = null;
			event.locals.token = null;
		}
	} else {
		event.locals.user = null;
		event.locals.token = null;
	}

	return resolve(event);
};
