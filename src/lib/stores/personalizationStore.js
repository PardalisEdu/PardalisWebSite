import { writable } from 'svelte/store';
import {PUBLIC_API_URL} from "$env/static/public";

// Define la URL base de la API
const API_URL = PUBLIC_API_URL;

function createPersonalizationStore() {
	const { subscribe, set, update } = writable(null);

	return {
		subscribe,
		loadPersonalization: async (userApodo) => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('No token found');
				}

				const response = await fetch(`${API_URL}/users/${userApodo}/personalization`, {
					method: 'GET',
					headers: {
						'Authorization': token,
						'Content-Type': 'application/json'
					},
					credentials: 'include',
					mode: 'cors'
				});

				if (!response.ok) {
					if (response.status === 404) {
						const defaultPersonalization = {
							descripcion: 'Hola, soy nuevo en Pardalis',
							foto: 'img/profiles/ocelote.svg'
						};
						set(defaultPersonalization);
						return defaultPersonalization;
					}
					throw new Error(`Failed to fetch personalization: ${response.status}`);
				}

				const data = await response.json();
				set(data);
				return data;
			} catch (error) {
				console.error('Error in loadPersonalization:', error);
				throw error;
			}
		},
		updatePersonalization: async (userApodo, personalizationData) => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('No token found');
				}

				const response = await fetch(`${API_URL}/users/${userApodo}/personalization`, {
					method: 'POST',
					headers: {
						'Authorization': token,
						'Content-Type': 'application/json'
					},
					credentials: 'include',
					mode: 'cors',
					body: JSON.stringify(personalizationData)
				});

				if (!response.ok) {
					throw new Error('Failed to update personalization');
				}

				const data = await response.json();
				set(data);
				return data;
			} catch (error) {
				console.error('Error in updatePersonalization:', error);
				throw error;
			}
		},
		clearPersonalization: () => {
			set(null);
		}
	};
}

export const personalizationStore = createPersonalizationStore();