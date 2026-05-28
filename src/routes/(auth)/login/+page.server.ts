import { redirect, fail } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { apiFetch } from '$lib/api/config';
import { decodeToken } from '$lib/utils/jwt';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Already logged in — redirect to profile
	if (locals.user) {
		throw redirect(303, '/profile');
	}
	return {};
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const correo = formData.get('correo') as string;
		const contrasenna = formData.get('contrasenna') as string;

		if (!correo || !contrasenna) {
			return fail(400, { message: 'Correo y contraseña son requeridos' });
		}

		try {
			const data = await apiFetch<{ token: string }>('/login', {
				method: 'POST',
				body: JSON.stringify({ correo, contrasenna })
			});

			const decoded = decodeToken(data.token);
			if (!decoded) {
				return fail(500, { message: 'Token inválido recibido del servidor' });
			}

			cookies.set('token', data.token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: !dev,
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Error en el servidor';
			return fail(401, { message });
		}

		throw redirect(303, '/profile');
	}
};
