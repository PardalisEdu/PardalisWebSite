import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { clases, codigosClase, contenidoClase, usuarioClases } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

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

        // Buscar el código activo
        const codigoRecord = await db.select()
            .from(codigosClase)
            .where(
                and(
                    eq(codigosClase.codigo, codigoInput),
                    eq(codigosClase.estado, 'activo')
                )
            )
            .limit(1);

        if (codigoRecord.length === 0) {
            return fail(400, { message: "Código inválido o inactivo" });
        }

        const idClase = codigoRecord[0].idClase;
        if (!idClase) {
            return fail(400, { message: "Clase no encontrada para este código" });
        }

        // Verificar si ya es miembro de la clase
        const existing = await db.select()
            .from(usuarioClases)
            .where(
                and(
                    eq(usuarioClases.idClase, idClase),
                    eq(usuarioClases.idUser, session.user.id)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            // Ya es miembro, redirigir
            throw redirect(303, `/class/${idClase}`);
        }

        // Unirse como alumno
        await db.insert(usuarioClases).values({
            id: crypto.randomUUID(),
            idUser: session.user.id,
            idClase: idClase,
            rol: 'alumno'
        });

        throw redirect(303, `/class/${idClase}`);
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

        const gradeMap: Record<string, '1ro' | '2do' | '3ro' | '4to' | '5to' | '6to'> = {
            '1°': '1ro',
            '2°': '2do',
            '3°': '3ro',
            '4°': '4to',
            '5°': '5to',
            '6°': '6to',
            '1ro': '1ro',
            '2do': '2do',
            '3ro': '3ro',
            '4to': '4to',
            '5to': '5to',
            '6to': '6to'
        };
        const grado = gradeMap[gradoInput] || '1ro';

        const idClase = crypto.randomUUID();

        // 1. Crear la clase
        await db.insert(clases).values({
            id: idClase,
            nombre,
            descripcion: descripcion || null,
            grado
        });

        // 2. Registrar al profesor
        await db.insert(usuarioClases).values({
            id: crypto.randomUUID(),
            idUser: session.user.id,
            idClase,
            rol: 'profesor'
        });

        // 3. Generar código
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let codigo = "";
        for (let i = 0; i < 6; i++) {
            codigo += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        await db.insert(codigosClase).values({
            id: crypto.randomUUID(),
            codigo,
            estado: 'activo',
            idClase
        });

        return { success: true, codigo };
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

        // Verificar que el usuario sea profesor de esta clase
        const isTeacher = await db.select().from(usuarioClases).where(
            and(
                eq(usuarioClases.idClase, idClase),
                eq(usuarioClases.idUser, session.user.id),
                eq(usuarioClases.rol, 'profesor')
            )
        ).limit(1);

        if (isTeacher.length === 0) {
            return fail(403, { message: "No tienes permisos" });
        }

        // Eliminar todo el contenido relacionado secuencialmente
        await db.delete(contenidoClase).where(eq(contenidoClase.idClase, idClase));
        await db.delete(codigosClase).where(eq(codigosClase.idClase, idClase));
        await db.delete(usuarioClases).where(eq(usuarioClases.idClase, idClase));
        await db.delete(clases).where(eq(clases.id, idClase));

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