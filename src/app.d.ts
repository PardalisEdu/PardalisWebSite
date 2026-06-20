import type { User } from '$lib/types/types';
type Session = typeof import('$lib/auth').auth.$Infer.Session;

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Session['user'] | null;
            session: Session['session'] | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
