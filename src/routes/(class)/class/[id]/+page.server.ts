import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { clases, codigosClase, contenidoClase, user, usuarioClases } from "$lib/server/db/schema";
import { fail, redirect } from "@sveltejs/kit";
import { and, desc, eq } from "drizzle-orm";
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

    const codigo = await db.select().from(codigosClase).where(eq(codigosClase.idClase, params.id)).orderBy(desc(codigosClase.createdAt));

    const profesor = await db.select().from(usuarioClases).where(eq(usuarioClases.rol, "profesor")).leftJoin(user, eq(usuarioClases.idUser, user.id)).limit(1)

    const userInClass = await db.select().from(usuarioClases).where(
        and(
            eq(usuarioClases.idClase, params.id),
            eq(usuarioClases.idUser, session.user.id)
        )
    ).limit(1);

    const userRole = userInClass[0]?.rol || null;

    return {
        clase: clase[0] ?? null, 
        contenido: {
            anuncios: contenidoTexto,
            archivos: contenidoArchivos
        },
        profesor: profesor[0] ?? null,
        codigo: codigo[0] ?? null,
        userRole
    };
};

export const actions = {
    crearAnuncio: async ({ request, params }) => {
        // 1. Verificamos la sesión igual que en el load
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401, { message: "No autorizado" });

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
    }
};