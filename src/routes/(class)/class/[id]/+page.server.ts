import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { clases, codigosClase, contenidoClase, user, usuarioClases } from "$lib/server/db/schemas";
import { fail, redirect } from "@sveltejs/kit";
import { and, count, desc, eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request, params }) => {

    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session) {
        throw redirect(302, '/login');
    }

    const clase = await db.select().from(clases).where(eq(clases.id, params.id)).limit(1);
    const contenidoTexto = await db.select({
        id: contenidoClase.id,
        title: contenidoClase.titulo,
        date: contenidoClase.createdAt,
        body: contenidoClase.contenido
    }).from(contenidoClase).where(and(eq(contenidoClase.idClase, params.id), eq(contenidoClase.typo, "texto"))).orderBy(desc(contenidoClase.updatedAt));
    
    const contenidoArchivos = await db.select({
        id: contenidoClase.id,
        name: contenidoClase.titulo,
        date: contenidoClase.createdAt,
        url: contenidoClase.contenido
    }).from(contenidoClase).where(and(eq(contenidoClase.idClase, params.id), eq(contenidoClase.typo, "archivo")));

    const codigo = await db.select().from(codigosClase)
        .where(
            and(
                eq(codigosClase.idClase, params.id),
                eq(codigosClase.estado, "activo")
            )
        )
        .orderBy(desc(codigosClase.createdAt))
        .limit(1);

    const profesor = await db.select().from(usuarioClases).where(eq(usuarioClases.rol, "profesor")).leftJoin(user, eq(usuarioClases.idUser, user.id)).limit(1)

    const userInClass = await db.select().from(usuarioClases).where(
        and(
            eq(usuarioClases.idClase, params.id),
            eq(usuarioClases.idUser, session.user.id)
        )
    ).limit(1);

    const alumnos = await db.select({ numero_alumnos: count() }).from(usuarioClases).where(eq(usuarioClases.rol, "alumno"))

    const userRole = userInClass[0]?.rol || null;

    return {
        clase: clase[0] ?? null, 
        contenido: {
            anuncios: contenidoTexto,
            archivos: contenidoArchivos
        },
        numero_alumnos: alumnos[0] ?? null,
        profesor: profesor[0] ?? null,
        codigo: codigo[0] ?? null,
        userRole
    };
};

const checkTeacher = async (userId: string, classId: string) => {
    const userInClass = await db.select().from(usuarioClases).where(
        and(
            eq(usuarioClases.idClase, classId),
            eq(usuarioClases.idUser, userId),
            eq(usuarioClases.rol, "profesor")
        )
    ).limit(1);
    return userInClass.length > 0;
};

const mysqlNow = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

export const actions = {
    crearAnuncio: async ({ request, params }) => {
        // 1. Verificamos la sesión igual que en el load
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401, { message: "No autorizado" });

        // Verificar rol de profesor
        const isTeacher = await checkTeacher(session.user.id, params.id);
        if (!isTeacher) return fail(403, { message: "No autorizado" });

        // 2. Extraemos los datos del formulario
        const formData = await request.formData();
        const titulo = formData.get('titulo') as string;
        const contenido = formData.get('contenido') as string;

        if (!titulo || !contenido) return fail(400, { message: "Faltan campos" });

        // 3. Insertamos en la base de datos usando Drizzle
        await db.insert(contenidoClase).values({
            id: crypto.randomUUID(), // Generamos un ID único
            idClase: params.id,
            typo: 'texto',
            titulo: titulo,
            contenido: contenido,
            idUser: session.user.id
        });

        return { success: true };
    },

    subirArchivo: async ({ request, params }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401, { message: "No autorizado" });

        // Verificar rol de profesor
        const isTeacher = await checkTeacher(session.user.id, params.id);
        if (!isTeacher) return fail(403, { message: "No autorizado" });

        const formData = await request.formData();
        const nombre = formData.get('nombre') as string;
        const archivo = formData.get('archivo') as File;

        if (!nombre || !archivo || archivo.size === 0) {
            return fail(400, { message: "Archivo inválido" });
        }

        // ⚠️ ATENCIÓN AQUÍ: La base de datos guarda un texto (URL), no el archivo físico.
        // Aquí deberías subir 'archivo' a un servicio como AWS S3, Uploadthing, Cloudinary, etc.
        // Simularemos que ya lo subiste y obtuviste una URL:
        const fileUrl = "https://tu-servicio-de-storage.com/" + archivo.name; 

        await db.insert(contenidoClase).values({
            id: crypto.randomUUID(),
            idClase: params.id,
            typo: 'archivo',
            titulo: nombre,
            contenido: fileUrl, // Guardamos la URL en el campo contenido
            idUser: session.user.id
        });

        return { success: true };
    },

    editarAnuncio: async ({ request, params }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401, { message: "No autorizado" });

        const isTeacher = await checkTeacher(session.user.id, params.id);
        if (!isTeacher) return fail(403, { message: "No autorizado" });

        const formData = await request.formData();
        const id = formData.get('id') as string;
        const titulo = formData.get('titulo') as string;
        const contenido = formData.get('contenido') as string;

        if (!id || !titulo || !contenido) return fail(400, { message: "Faltan campos" });

        await db.update(contenidoClase)
            .set({ 
                titulo, 
                contenido, 
                updatedAt: mysqlNow() 
            })
            .where(and(eq(contenidoClase.id, id), eq(contenidoClase.idClase, params.id)));

        return { success: true };
    },

    editarArchivo: async ({ request, params }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401, { message: "No autorizado" });

        const isTeacher = await checkTeacher(session.user.id, params.id);
        if (!isTeacher) return fail(403, { message: "No autorizado" });

        const formData = await request.formData();
        const id = formData.get('id') as string;
        const nombre = formData.get('nombre') as string;

        if (!id || !nombre) return fail(400, { message: "Faltan campos" });

        await db.update(contenidoClase)
            .set({ 
                titulo: nombre, 
                updatedAt: mysqlNow() 
            })
            .where(and(eq(contenidoClase.id, id), eq(contenidoClase.idClase, params.id)));

        return { success: true };
    },

    eliminarContenido: async ({ request, params }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401, { message: "No autorizado" });

        const isTeacher = await checkTeacher(session.user.id, params.id);
        if (!isTeacher) return fail(403, { message: "No autorizado" });

        const formData = await request.formData();
        const id = formData.get('id') as string;

        if (!id) return fail(400, { message: "Faltan campos" });

        await db.delete(contenidoClase)
            .where(and(eq(contenidoClase.id, id), eq(contenidoClase.idClase, params.id)));

        return { success: true };
    },

    editarClase: async ({ request, params }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401, { message: "No autorizado" });

        const isTeacher = await checkTeacher(session.user.id, params.id);
        if (!isTeacher) return fail(403, { message: "No autorizado" });

        const formData = await request.formData();
        const nombre = formData.get('nombre') as string;
        const descripcion = formData.get('descripcion') as string;

        if (!nombre) return fail(400, { message: "El nombre es requerido" });

        await db.update(clases)
            .set({ 
                nombre, 
                descripcion: descripcion || null
            })
            .where(eq(clases.id, params.id));

        return { success: true };
    },

    generarCodigo: async ({ request, params }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401, { message: "No autorizado" });

        const isTeacher = await checkTeacher(session.user.id, params.id);
        if (!isTeacher) return fail(403, { message: "No autorizado" });

        // Deactivar códigos anteriores
        await db.update(codigosClase)
            .set({ estado: 'inactivo' })
            .where(eq(codigosClase.idClase, params.id));

        // Generar nuevo código de 6 caracteres
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let nuevoCodigo = "";
        for (let i = 0; i < 6; i++) {
            nuevoCodigo += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Insertar nuevo código activo
        await db.insert(codigosClase).values({
            id: crypto.randomUUID(),
            codigo: nuevoCodigo,
            estado: 'activo',
            idClase: params.id
        });

        return { success: true };
    }
};