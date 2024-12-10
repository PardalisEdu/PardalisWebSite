import { redirect } from '@sveltejs/kit';
import { authStore } from '$lib/stores/authStore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const token = cookies.get('token');
	if (token) {
		const decoded = decodeToken(token);
		if (decoded && decoded.userApodo) {
			throw redirect(307, '/profile');
		}
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		try {
			const response = await fetch('http://localhost:8080/api/v1/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					correo: email,
					contrasenna: password
				})
			});

			if (!response.ok) {
				return {
					success: false,
					message: 'Credenciales inválidas'
				};
			}

			const { token } = await response.json();

			// Guardar token en cookie
			cookies.set('token', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 // 7 días
			});

			const decoded = decodeToken(token);
			if (decoded && decoded.userApodo) {
				authStore.setUser({
					apodo: decoded.userApodo
				});
			}

			throw redirect(307, '/profile');
		} catch (error) {
			console.error('Error en login:', error);
			return {
				success: false,
				message: 'Error en el servidor'
			};
		}
	}
};