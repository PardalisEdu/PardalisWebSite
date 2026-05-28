import { fetchBlogBySlug } from '$lib/content/blog';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const blog = fetchBlogBySlug(params.slug);

	if (!blog) {
		throw error(404, 'Blog no encontrado');
	}

	return { blog };
};
