import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { usuarioClases } from "$lib/server/db/schema";
import { ClassNotFound, CodeInvalid, UserAlreadyMember, UserUnauthorized } from "$lib/server/errores";
import { crearClase, eliminarClase, optenerClases, unirseAClase } from "$lib/server/service/clases";
import { fail, redirect } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {

    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session) {
        throw redirect(302, '/login');
    }
    
    return {
        clases: await optenerClases(session.user.id)
    };
};

export const actions: Actions = {
    unirseClase: async ({ request }) => {
        const session = await auth.api.getSession({
            headers: request.headers
        });

        if (!session) {
            return fail(401, { message: "No autorizado" });
        }

        const formData = await request.formData();
        const codigoInput = (formData.get('codigo') as string || '').trim().toUpperCase();

        if (!codigoInput || codigoInput.length !== 6) {
            return fail(400, { message: "El código debe tener 6 caracteres" });
        }

        try {
            const idClase = await unirseAClase(codigoInput, session.user.id);

            return redirect(303, `/class/${idClase}`);
        } catch(e: unknown) {
            if(e instanceof CodeInvalid) {
                return fail(400, { message: "Código inválido o inactivo" });
            }else if(e instanceof ClassNotFound) {
                return fail(400, { message: "Clase no encontrada para este código" });
            }else if(e instanceof UserAlreadyMember) {
                throw redirect(303, `/class/${e.idClase}`);
            } else {
                return fail(500, { message: "Error desconocido"})
            }
        }
    },

    crearClase: async ({ request }) => {
        const session = await auth.api.getSession({
            headers: request.headers
        });

        if (!session) {
            return fail(401, { message: "No autorizado" });
        }

        const formData = await request.formData();
        const nombre = formData.get('nombre') as string;
        const gradoInput = formData.get('grado') as string;
        const descripcion = formData.get('descripcion') as string;

        if (!nombre) {
            return fail(400, { message: "El nombre es requerido" });
        }

        try {
            const codigo = await crearClase(session.user.id, gradoInput, nombre, descripcion)
            return { success: true, codigo };
        } catch(e: unknown) {
            if (e instanceof Error) {
                return fail(500, { message: "Error"});
            }
        }
    },

    eliminarClase: async ({ request }) => {
        const session = await auth.api.getSession({
            headers: request.headers
        });

        if (!session) {
            return fail(401, { message: "No autorizado" });
        }

        const formData = await request.formData();
        const idClase = formData.get('idClase') as string;

        if (!idClase) {
            return fail(400, { message: "La clase es requerida" });
        }

        try {
            await eliminarClase(idClase, session.user.id)
        } catch(e: unknown) {
            if(e instanceof UserUnauthorized) {
                return fail(403, { message: "No esta autizado el usuario" })
            }
        }

        return { success: true };
    },

    salirseClase: async ({ request }) => {
        const session = await auth.api.getSession({
            headers: request.headers
        });

        if (!session) {
            return fail(401, { message: "No autorizado" });
        }

        const formData = await request.formData();
        const idClase = formData.get('idClase') as string;

        if (!idClase) {
            return fail(400, { message: "La clase es requerida" });
        }

        // Eliminar la asociación de usuarioClases para el alumno
        await db.delete(usuarioClases).where(
            and(
                eq(usuarioClases.idClase, idClase),
                eq(usuarioClases.idUser, session.user.id),
                eq(usuarioClases.rol, 'alumno')
            )
        );

        return { success: true };
    }
};