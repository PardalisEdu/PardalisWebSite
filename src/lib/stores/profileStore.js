// @ts-check
import { writable } from 'svelte/store';

const API_URL = 'http://localhost:8080/api/v1';

/**
 * @typedef {Object} Profile
 * @property {string} apodo
 * @property {string} [nombre]
 * @property {string} [correo]
 */

/**
 * @typedef {Object} ProfileData
 * @property {string} [nombre]
 * @property {string} [correo]
 */

function createProfileStore() {
	/** @type {import('svelte/store').Writable<Profile|null>} */
	const { subscribe, set } = writable(null);

	return {
		subscribe,
		/**
		 * Carga el perfil de un usuario
		 * @param {string} userApodo
		 * @returns {Promise<Profile>}
		 */
		loadProfile: async (userApodo) => {
			console.log('Loading profile for:', userApodo);
			try {
				const token = localStorage.getItem('token');
				console.log('Token found:', !!token);

				if (!token) {
					throw new Error('No token found');
				}

				console.log('Fetching from:', `${API_URL}/users/${userApodo}`);
				const response = await fetch(`${API_URL}/users/${userApodo}`, {
					headers: {
						'Authorization': token
					}
				});

				console.log('Response status:', response.status);
				if (!response.ok) {
					throw new Error(`Failed to fetch profile: ${response.status}`);
				}

				const data = await response.json();
				console.log('Profile data received:', data);

				set(data);
				return data;
			} catch (error) {
				console.error('Error in loadProfile:', error);
				throw error;
			}
		},

		/**
		 * Actualiza el perfil de un usuario
		 * @param {string} userApodo
		 * @param {ProfileData} profileData
		 * @returns {Promise<Profile>}
		 */
		updateProfile: async (userApodo, profileData) => {
			console.log('Updating profile for:', userApodo);
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('No token found');
				}

				const response = await fetch(`${API_URL}/users/${userApodo}`, {
					method: 'PUT',
					headers: {
						'Authorization': token,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(profileData)
				});

				if (!response.ok) {
					throw new Error('Failed to update profile');
				}

				const data = await response.json();
				set(data);

				return data;
			} catch (error) {
				console.error('Error in updateProfile:', error);
				throw error;
			}
		},

		clearProfile: () => {
			console.log('Clearing profile data');
			set(null);
		}
	};
}

export const profileStore = createProfileStore();