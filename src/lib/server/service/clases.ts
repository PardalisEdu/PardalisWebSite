import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { clases, codigosClase, contenidoClase, usuarioClases } from "../db/schema";
import { ClassNotFound, CodeInvalid, UserAlreadyMember, UserUnauthorized } from "../errores";

export async function optenerClases(idUsuario: string) {
    return await db
        .select({
            id: clases.id,
            nombre: clases.nombre,
            descripcion: clases.descripcion,
            rol: usuarioClases.rol
        })
        .from(usuarioClases)
        .where(eq(usuarioClases.idUser, idUsuario))
        .leftJoin(clases, eq(usuarioClases.idClase, clases.id));
}

export async function unirseAClase(codigo: string, idUsuario: string): Promise<string> {
    const codigoRecord = await db.select()
        .from(codigosClase)
        .where(
            and(
                eq(codigosClase.codigo, codigo),
                eq(codigosClase.estado, 'activo')
            )
        )
        .limit(1);

    if (codigoRecord.length === 0) {
        throw new CodeInvalid(codigo);
    }

    const idClase = codigoRecord[0].idClase;
    if (!idClase) {
        throw new ClassNotFound();
    }

    const existing = await db.select()
        .from(usuarioClases)
        .where(
            and(
                eq(usuarioClases.idClase, idClase),
                eq(usuarioClases.idUser, idUsuario)
            )
        )
        .limit(1);

    if (existing.length > 0) {
        throw new UserAlreadyMember(codigo);
    }

    await db.insert(usuarioClases).values({
        id: crypto.randomUUID(),
        idUser: idUsuario,
        idClase: idClase,
        rol: 'alumno'
    });

    return idClase;
}

export async function crearClase(idUsuario: string, gradoInput: string, nombre: string, descripcion: string | null): Promise<string> {
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

    await db.insert(clases).values({
        id: idClase,
        nombre,
        descripcion: descripcion || null,
        grado
    });

    await db.insert(usuarioClases).values({
        id: crypto.randomUUID(),
        idUser: idUsuario,
        idClase,
        rol: 'profesor'
    });

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

    return codigo
}

export async function eliminarClase(idClase: string, idUsuario: string) {
    const isTeacher = await db.select().from(usuarioClases).where(
        and(
            eq(usuarioClases.idClase, idClase),
            eq(usuarioClases.idUser, idUsuario),
            eq(usuarioClases.rol, 'profesor')
        )
    ).limit(1);

    if (isTeacher.length === 0) {
        throw new UserUnauthorized();
    }

    await db.delete(contenidoClase).where(eq(contenidoClase.idClase, idClase));
    await db.delete(codigosClase).where(eq(codigosClase.idClase, idClase));
    await db.delete(usuarioClases).where(eq(usuarioClases.idClase, idClase));
    await db.delete(clases).where(eq(clases.id, idClase));
}
