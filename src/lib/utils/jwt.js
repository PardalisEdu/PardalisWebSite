import jwt from 'jsonwebtoken';

/**
 * Decodifica un token JWT sin verificar la firma
 * @param {string} token - El token JWT a decodificar
 * @returns {Object|null} El token decodificado o null si hay error
 */
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