import { PUBLIC_API_URL } from "$env/static/public";

/**
 * ... Literalmente esta en el nombre...
 * @param {object} apodo
 */
export async function getUserProfile(apodo) {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No hay token de autenticación');
		}

		const response = await fetch(`${PUBLIC_API_URL}/users/${apodo}`, {
			method: 'GET',
			headers: {
				'Authorization': token,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			mode: 'cors',
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || 'Error al obtener datos del usuario');
		}

		return await response.json();
	} catch (error) {
		// @ts-ignore
		throw new Error(error.message || 'Error al conectar con el servidor');
	}
}