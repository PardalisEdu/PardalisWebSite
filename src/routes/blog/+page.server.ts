import { fetchBlogs } from '$lib/api/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') ?? '1');
	const categoria = url.searchParams.get('categoria') ?? 'Todos';

	try {
		const blogs = await fetchBlogs(page, categoria);
		return { blogs, page, categoria };
	} catch {
		return {
			blogs: [],
			page: 1,
			categoria: 'Todos'
		};
	}
};
