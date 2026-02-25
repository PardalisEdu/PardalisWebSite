import { apiFetch } from './config';
import { decodeToken } from '$lib/utils/jwt';
import type { Credentials, RegisterParams, LoginResponse, User } from '$lib/types/types';

/**
 * Authenticate a user and return token + decoded user info.
 */
export async function login(credentials: Credentials): Promise<LoginResponse> {
	const data = await apiFetch<{ token: string }>('/login', {
		method: 'POST',
		body: JSON.stringify({
			correo: credentials.correo,
			contrasenna: credentials.contrasenna
		})
	});

	const decoded = decodeToken(data.token);
	if (!decoded) throw new Error('Token inválido recibido del servidor');

	const user: User = { apodo: decoded.userApodo };
	return { token: data.token, user };
}

/**
 * Register a new user account.
 */
export async function register(params: RegisterParams): Promise<unknown> {
	return apiFetch('/register', {
		method: 'POST',
		body: JSON.stringify(params)
	});
}
