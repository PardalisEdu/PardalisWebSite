import { PUBLIC_API_URL } from '$env/static/public';

export const API_URL = PUBLIC_API_URL;

/**
 * Centralized fetch wrapper for all API calls.
 * Prefixes the path with API_URL, sets default headers, and handles common errors.
 */
export async function apiFetch<T = unknown>(
	path: string,
	options: RequestInit & { token?: string } = {}
): Promise<T> {
	const { token, headers: customHeaders, ...rest } = options;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(customHeaders as Record<string, string>)
	};

	if (token) {
		headers['Authorization'] = token;
	}

	const url = path.startsWith('http') ? path : `${API_URL}${path}`;

	const response = await fetch(url, {
		credentials: 'include',
		mode: 'cors',
		headers,
		...rest
	});

	if (!response.ok) {
		const errorBody = await response.json().catch(() => ({}));
		const message = (errorBody as Record<string, string>).error ?? `Error ${response.status}`;
		throw new Error(message);
	}

	return response.json() as Promise<T>;
}
