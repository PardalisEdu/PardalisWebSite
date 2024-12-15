// @ts-check
import { PUBLIC_API_URL } from "$env/static/public";

const API_URL = PUBLIC_API_URL;

/**
 * Función para iniciar sesión
 * @param {{ correo: string, contrasenna: string }} credentials - Credenciales del usuario
 * @returns {Promise<{ token: string, user: { apodo: string } }>}
 */
export async function login(credentials) {
	try {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			mode: 'cors',
			body: JSON.stringify({
				correo: credentials.correo,
				contrasenna: credentials.contrasenna
			})
		});

		if (!response.ok) {
			throw new Error('Credenciales inválidas');
		}

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
 * @typedef {Object} RegisterParams
 * @property {string} apodo - Apodo del usuario
 * @property {string} nombre - Nombre completo
 * @property {string} correo - Correo electrónico
 * @property {string} contrasenna - Contraseña
 */

/**
 * Registra un nuevo usuario
 * @param {RegisterParams} params - Parámetros de registro
 * @returns {Promise<any>} Estado del registro
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