import { writable } from 'svelte/store';
import type { ProfileData } from '$lib/types/types';

function createProfileStore() {
	const { subscribe, set } = writable<ProfileData | null>(null);

	return {
		subscribe,
		setData(data: ProfileData) {
			set(data);
		},
		clear() {
			set(null);
		}
	};
}

export const profileStore = createProfileStore();
