import { apiFetch } from './config';
import type { ProfileData } from '$lib/types/types';

/**
 * Fetch the profile of a given user.
 */
export async function getUserProfile(apodo: string, token: string): Promise<ProfileData> {
	return apiFetch<ProfileData>(`/users/${apodo}`, { token });
}

/**
 * Update the profile of a given user.
 */
export async function updateUserProfile(
	apodo: string,
	data: Partial<ProfileData>,
	token: string
): Promise<ProfileData> {
	return apiFetch<ProfileData>(`/users/${apodo}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		token
	});
}
