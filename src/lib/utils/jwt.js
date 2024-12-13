import jwt from 'jsonwebtoken';

export function decodeToken(token) {
	try {
		// Decodificar sin verificar la firma
		const decoded = jwt.decode(token);
		if (!decoded) {
			throw new Error('Token inválido');
		}
		return decoded;
	} catch (error) {
		console.error('Error decodificando token:', error);
		return null;
	}
}