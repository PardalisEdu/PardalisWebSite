export async function getUserProfile(apodo) {
	try {
		const token = localStorage.getItem('auth_token');
		if (!token) {
			throw new Error('No hay token de autenticación');
		}

		const response = await fetch(`http://localhost:8080/api/v1/users/${apodo}`, {
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
		throw new Error(error.message || 'Error al conectar con el servidor');
	}
}