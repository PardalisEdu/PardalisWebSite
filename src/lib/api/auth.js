const API_URL = 'http://localhost:8080/api/v1';

export async function login(credentials) {
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
			body: JSON.stringify(credentials)
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || 'Error en el inicio de sesión');
		}

		return await response.json();
	} catch (error) {
		console.error('Error en login:', error);
		throw error;
	}
}


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