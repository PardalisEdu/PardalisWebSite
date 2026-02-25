import { fetchBlogBySlug } from '$lib/api/blog';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const blog = await fetchBlogBySlug(params.slug);
		return { blog };
	} catch (err) {
		const status = err instanceof Error && err.message.includes('404') ? 404 : 500;
		throw error(status, 'Blog no encontrado');
	}
};
