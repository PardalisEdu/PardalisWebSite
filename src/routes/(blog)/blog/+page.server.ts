import { fetchBlogs } from '$lib/content/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') ?? '1');
	const categoria = url.searchParams.get('categoria') ?? 'Todos';

	const blogs = fetchBlogs(page, categoria);
	return { blogs, page, categoria };
};
