import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { env } from '$env/dynamic/private';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql", // or "mysql", "sqlite"
    }),

    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID as string,
            clientSecret: env.GOOGLE_CLIENT_SECRET as string
        }
    },

    baseURL: {
        allowedHosts: [
            env.BETTER_AUTH_URL,
        ]
    },

    secret: env.BETTER_AUTH_SECRET,

    plugins: [sveltekitCookies(getRequestEvent)]
});