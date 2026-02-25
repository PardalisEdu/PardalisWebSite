import type { DecodedToken } from '$lib/types/types';

/**
 * Decode a JWT token payload without verifying the signature.
 * Works in both server and client environments.
 */
export function decodeToken(token: string): DecodedToken | null {
	try {
		const base64Payload = token.split('.')[1];
		if (!base64Payload) return null;

		const payload = JSON.parse(atob(base64Payload));
		return payload as DecodedToken;
	} catch {
		return null;
	}
}

/**
 * Check whether a decoded JWT token has expired.
 */
export function isTokenExpired(decoded: DecodedToken): boolean {
	return decoded.exp * 1000 < Date.now();
}
