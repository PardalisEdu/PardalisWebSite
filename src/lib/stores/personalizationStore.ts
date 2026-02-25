import { writable } from 'svelte/store';
import type { PersonalizationData } from '$lib/types/types';

function createPersonalizationStore() {
	const { subscribe, set } = writable<PersonalizationData | null>(null);

	return {
		subscribe,
		setData(data: PersonalizationData) {
			set(data);
		},
		clear() {
			set(null);
		}
	};
}

export const personalizationStore = createPersonalizationStore();
