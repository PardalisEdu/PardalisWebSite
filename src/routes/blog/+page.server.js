// src/routes/blog/+page.server.js
import {PUBLIC_API_URL} from "$env/static/public";

export async function load({ fetch, url }) {
	try {
		const page = url.searchParams.get('page') || '1';
		const categoria = url.searchParams.get('categoria') || 'Todos';

		const response = await fetch(`${PUBLIC_API_URL}/blogs`);

		if (!response.ok) {
			throw new Error('Error cargando blogs');
		}

		const blogs = await response.json();

		return {
			initialBlogs: blogs,
			page: parseInt(page),
			categoria
		};
	} catch (error) {
		console.error('Error en load:', error);
		return {
			initialBlogs: [],
			page: 1,
			categoria: 'Todos',
			error: error.message
		};
	}
}