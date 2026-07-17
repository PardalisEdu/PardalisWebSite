import { fetchBlogBySlug, getAllSlugs } from '$lib/content/blog';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

// Los posts son estáticos: se generan como HTML en el build
export const prerender = true;

export const entries: EntryGenerator = () => getAllSlugs().map((slug) => ({ slug }));

export const load: PageServerLoad = async ({ params }) => {
	const blog = fetchBlogBySlug(params.slug);

	if (!blog) {
		throw error(404, 'Blog no encontrado');
	}

	return { blog };
};
