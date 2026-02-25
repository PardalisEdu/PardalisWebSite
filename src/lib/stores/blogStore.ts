import { writable } from 'svelte/store';
import type { BlogStoreState } from '$lib/types/types';

const initialState: BlogStoreState = {
	blogs: [],
	currentPage: 1,
	loading: false,
	error: null,
	selectedCategory: 'Todos'
};

function createBlogStore() {
	const { subscribe, set, update } = writable<BlogStoreState>(initialState);

	return {
		subscribe,
		update,
		setBlogs(blogs: BlogStoreState['blogs'], page: number, categoria: string) {
			update((s) => ({
				...s,
				blogs,
				currentPage: page,
				selectedCategory: categoria,
				loading: false,
				error: null
			}));
		},
		setLoading(loading: boolean) {
			update((s) => ({ ...s, loading }));
		},
		setError(error: string) {
			update((s) => ({ ...s, error, loading: false }));
		},
		setCategory(categoria: string) {
			update((s) => ({ ...s, selectedCategory: categoria }));
		},
		reset() {
			set(initialState);
		}
	};
}

export const blogStore = createBlogStore();
