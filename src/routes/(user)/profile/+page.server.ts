import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { profile, user as userTable } from "$lib/server/db/schemas";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session) {
        throw redirect(302, '/login');
    }

    const [userProfile] = await db
        .select()
        .from(profile)
        .where(eq(profile.userId, session.user.id))
        .limit(1);

    return {
        profile: userProfile || null
    };
};

export const actions: Actions = {
    editarPerfil: async ({ request }) => {
        const session = await auth.api.getSession({
            headers: request.headers
        });

        if (!session) {
            return fail(401, { message: "No autorizado" });
        }

        const formData = await request.formData();
        const nameInput = (formData.get('name') as string || '').trim();
        const bioInput = (formData.get('bio') as string || '').trim();

        if (!nameInput) {
            return fail(400, { message: "El nombre es obligatorio" });
        }

        if (nameInput.length > 50) {
            return fail(400, { message: "El nombre no puede tener más de 50 caracteres" });
        }

        if (bioInput.length > 500) {
            return fail(400, { message: "La biografía no puede tener más de 500 caracteres" });
        }

        try {
            // Actualizar nombre de usuario en la tabla user
            await db
                .update(userTable)
                .set({ name: nameInput })
                .where(eq(userTable.id, session.user.id));

            // Verificar si ya existe perfil para este usuario
            const [existingProfile] = await db
                .select()
                .from(profile)
                .where(eq(profile.userId, session.user.id))
                .limit(1);

            if (existingProfile) {
                // Actualizar biografía existente
                await db
                    .update(profile)
                    .set({ bio: bioInput })
                    .where(eq(profile.userId, session.user.id));
            } else {
                // Insertar nueva biografía
                await db.insert(profile).values({
                    id: crypto.randomUUID(),
                    userId: session.user.id,
                    bio: bioInput
                });
            }

            return { success: true };
        } catch (e: unknown) {
            console.error("Error al actualizar perfil:", e);
            return fail(500, { message: "Ocurrió un error al guardar los cambios en el servidor." });
        }
    }
};