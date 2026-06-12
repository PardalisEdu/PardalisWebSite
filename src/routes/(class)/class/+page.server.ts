import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { clases, usuarioClases } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ request }) => {

    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session) {
        throw redirect(302, '/login');
    }

    const dataDB = await db
            .select({
                id: clases.id,
                nombre: clases.nombre,
                descripcion: clases.descripcion,
                rol: usuarioClases.rol
            })
            .from(usuarioClases)
            .where(eq(usuarioClases.idUser, session.user.id)) 
            .leftJoin(clases, eq(usuarioClases.idClase, clases.id));
    
    return {
        clases: dataDB
    };
};