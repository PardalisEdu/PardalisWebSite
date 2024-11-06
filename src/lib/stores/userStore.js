import { writable } from 'svelte/store';

function createUserStore() {
	const { subscribe, set, update } = writable({
		userData: null,
		loading: false,
		error: null
	});

	return {
		subscribe,
		setUserData: (data) => {
			set({ userData: data, loading: false, error: null });
		},
		setLoading: (loading) => {
			update(state => ({ ...state, loading }));
		},
		setError: (error) => {
			update(state => ({ ...state, error, loading: false }));
		},
		clearError: () => {
			update(state => ({ ...state, error: null }));
		}
	};
}

export const userStore = createUserStore();