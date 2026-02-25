import { apiFetch } from './config';
import type { BlogPost } from '$lib/types/types';

/**
 * Fetch a paginated list of blogs, optionally filtered by category.
 */
export async function fetchBlogs(
	page = 1,
	categoria = 'Todos',
	limit = 10
): Promise<BlogPost[]> {
	const params = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString()
	});

	if (categoria !== 'Todos') {
		params.append('categoria', categoria);
	}

	return apiFetch<BlogPost[]>(`/blogs?${params.toString()}`);
}

/**
 * Fetch a single blog post by its slug.
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost> {
	return apiFetch<BlogPost>(`/blogs/${slug}`);
}
