import { apiFetch } from './config';
import type { PersonalizationData } from '$lib/types/types';

const DEFAULT_PERSONALIZATION: PersonalizationData = {
	descripcion: 'Hola, soy nuevo en Pardalis',
	foto: 'img/profiles/ocelote.svg'
};

/**
 * Fetch the personalization data for a user.
 * Returns defaults on 404.
 */
export async function fetchPersonalization(
	apodo: string,
	token: string
): Promise<PersonalizationData> {
	try {
		return await apiFetch<PersonalizationData>(
			`/users/${apodo}/personalization`,
			{ token }
		);
	} catch (error) {
		// If not found, return defaults instead of throwing
		if (error instanceof Error && error.message.includes('404')) {
			return { ...DEFAULT_PERSONALIZATION };
		}
		throw error;
	}
}

/**
 * Create or update personalization data for a user.
 */
export async function updatePersonalization(
	apodo: string,
	data: PersonalizationData,
	token: string
): Promise<PersonalizationData> {
	return apiFetch<PersonalizationData>(
		`/users/${apodo}/personalization`,
		{
			method: 'POST',
			body: JSON.stringify(data),
			token
		}
	);
}
