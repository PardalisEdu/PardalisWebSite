import { PUBLIC_API_URL } from "$env/static/public";

const API_URL = PUBLIC_API_URL;

/**
 * Es algo obvio... Modulo para logearte con el back
 * @param {object} credentials 
 * @returns Retorno el token necesario para el login
 */
export async function login(credentials) {

	console.log(typeof credentials);

	try {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// No incluir 'Authorization' en login
			},
			// Importante: incluir estas opciones
			credentials: 'include',
			mode: 'cors',
			body: JSON.stringify({
				correo: credentials.correo,
				contrasenna: credentials.contrasenna
			})
		});

		const data = await response.json();
		const token = data.token;

		// Decodificar el token para obtener la información del usuario
		const payload = JSON.parse(atob(token.split('.')[1]));
		const user = { apodo: payload.userApodo };

		return { token, user };
	} catch (error) {
		console.error('Error en login:', error);
		throw error;
	}
}

/**
 * Funcion para registrar los usuarios con la API
 * @param {Object} params - Parámetros de registro
 * @param {string} params.apodo - Apodo del usuario
 * @param {string} params.nombre - Nombre completo del usuario
 * @param {string} params.correo - Correo electrónico del usuario
 * @param {string} params.contrasenna - Contraseña del usuario
 * @returns {Promise<Object>} Estado del registro.
 */
export async function register({ apodo, nombre, correo, contrasenna }) {
	try {
		const response = await fetch(`${API_URL}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			mode: 'cors',
			body: JSON.stringify({
				apodo,
				nombre,
				correo,
				contrasenna
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || 'Error en el registro');
		}

		return await response.json();
	} catch (error) {
		console.error('Error en registro:', error);
		throw error;
	}
}