import { PUBLIC_API_URL } from "$env/static/public";

export const API_URL = PUBLIC_API_URL;

export const fetchConfig = {
	credentials: 'include', // Importante para cookies/auth
	headers: {
		'Content-Type': 'application/json'
	}
};