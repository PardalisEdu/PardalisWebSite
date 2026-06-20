import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

export async function handle({ event, resolve }) {
    const sesion = await auth.api.getSession({
        headers: event.request.headers
    });
    
    if (sesion) {
		event.locals.session = sesion.session;
		event.locals.user = sesion.user;
	} else {
		event.locals.session = null;
		event.locals.user = null;
	}

    return svelteKitHandler({ event, resolve, auth, building });
}