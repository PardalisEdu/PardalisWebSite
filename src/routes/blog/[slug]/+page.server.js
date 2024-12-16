// src/routes/blog/+page.server.js
import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ url }) {
	const page = url.searchParams.get('page') || 1;
	const categoria = url.searchParams.get('categoria') || '';

	try {
		const response = await fetch(
			`${PUBLIC_API_URL}/blogs?page=${page}&limit=10&categoria=${categoria}`
		);

		if (!response.ok) {
			return {
				posts: [],
				page: 1,
				categoria: '',
				error: 'Error al cargar los blogs'
			};
		}

		const posts = await response.json();

		return {
			posts,
			page,
			categoria,
			error: null
		};
	} catch (error) {
		console.error('Error:', error);
		return {
			posts: [],
			page: 1,
			categoria: '',
			error: 'Error al cargar los blogs'
		};
	}
}