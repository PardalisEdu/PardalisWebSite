<script lang="ts">
    import ArrowLeft from 'lucide-svelte/icons/arrow-left';
    import Pencil from 'lucide-svelte/icons/pencil';
    import Users from 'lucide-svelte/icons/users';
    import Copy from 'lucide-svelte/icons/copy';
    import Check from 'lucide-svelte/icons/check';
    import RefreshCw from 'lucide-svelte/icons/refresh-cw';
    import { enhance } from '$app/forms';

    let {
        level = "1° Primaria",
        studentCount = 12,
        className = "Clase de Inglés",
        teacherName = "Profesor",
        classCode = "ABCDEF",
        description = "" as string | null | undefined,
        isTeacher = false
    } = $props();

    let editing = $state(false);
    let editName = $state("");
    let editDesc = $state("");
    let copied = $state(false);

    function startEdit() {
        editName = className;
        editDesc = description || "";
        editing = true;
    }

    async function copyCode() {
        try {
            await navigator.clipboard.writeText(classCode);
            copied = true;
            setTimeout(() => copied = false, 2000);
        } catch {
            // El navegador puede bloquear el portapapeles fuera de HTTPS
        }
    }
</script>

<div class="max-w-5xl mx-auto px-4 pt-28 md:pt-32">
    <!-- Back -->
    <a
        href="/class"
        class="inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors mb-5 group"
    >
        <ArrowLeft size={16} class="group-hover:-translate-x-0.5 transition-transform" />
        Volver a clases
    </a>

    <div class="bg-white rounded-[2.5rem] border-2 border-brand-light shadow-[0_8px_0_0_var(--color-brand-light)] p-6 md:p-10">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div class="w-full min-w-0">
                <div class="flex flex-wrap items-center gap-3 mb-3">
                    <span class="text-xs font-bold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 uppercase tracking-wider">
                        {level}
                    </span>
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                        <Users size={12} />
                        {studentCount} {studentCount === 1 ? 'alumno' : 'alumnos'}
                    </span>
                </div>

                {#if editing}
                    <form
                        method="POST"
                        action="?/editarClase"
                        use:enhance={() => {
                            return async ({ update }) => {
                                await update();
                                editing = false;
                            };
                        }}
                        class="space-y-4 mt-2"
                    >
                        <div>
                            <label for="edit-class-name" class="block text-sm font-bold text-gray-700 mb-2">Nombre de la clase</label>
                            <input
                                id="edit-class-name"
                                name="nombre"
                                type="text"
                                bind:value={editName}
                                class="w-full max-w-xl px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-hidden focus:border-brand focus:bg-white transition-all text-sm font-semibold text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label for="edit-class-desc" class="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
                            <textarea
                                id="edit-class-desc"
                                name="descripcion"
                                rows="3"
                                bind:value={editDesc}
                                class="w-full max-w-xl px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-hidden focus:border-brand focus:bg-white transition-all text-sm text-gray-700 resize-none"
                            ></textarea>
                        </div>
                        <div class="flex gap-2">
                            <button
                                type="button"
                                onclick={() => editing = false}
                                class="px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                class="px-4 py-2 bg-brand text-gray-900 font-black rounded-xl text-sm shadow-[0_3px_0_0_var(--color-brand-dark)] hover:shadow-none hover:translate-y-0.5 transition-all"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                {:else}
                    <div class="flex items-center gap-3">
                        <h1 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                            {className}
                        </h1>
                        {#if isTeacher}
                            <button
                                onclick={startEdit}
                                class="p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-yellow-50 transition-colors mt-1"
                                title="Editar clase"
                            >
                                <Pencil size={18} />
                            </button>
                        {/if}
                    </div>
                    <p class="text-sm font-medium text-gray-500 mt-1">
                        {teacherName}
                    </p>
                    {#if description}
                        <p class="text-sm text-gray-600 mt-3 max-w-2xl leading-relaxed whitespace-pre-wrap">
                            {description}
                        </p>
                    {/if}
                {/if}
            </div>

            <!-- Código de clase -->
            <div class="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                <div class="bg-brand-light rounded-2xl border-2 border-dashed border-brand px-5 py-3">
                    <span class="block text-[10px] font-bold text-yellow-700 uppercase tracking-wider mb-0.5">Código de clase</span>
                    <div class="flex items-center justify-between sm:justify-start gap-3">
                        <span class="text-2xl font-black text-gray-900 tracking-[0.15em]">{classCode}</span>
                        <button
                            type="button"
                            onclick={copyCode}
                            class="p-1.5 rounded-lg text-yellow-700 hover:bg-white/70 transition-colors"
                            title="Copiar código"
                        >
                            {#if copied}
                                <Check size={16} class="text-green-600" />
                            {:else}
                                <Copy size={16} />
                            {/if}
                        </button>
                    </div>
                </div>
                {#if isTeacher}
                    <form
                        method="POST"
                        action="?/generarCodigo"
                        use:enhance
                        class="self-end"
                    >
                        <button
                            type="submit"
                            class="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer group"
                        >
                            <RefreshCw size={12} class="group-hover:rotate-180 transition-transform duration-300" />
                            Generar nuevo código
                        </button>
                    </form>
                {/if}
            </div>
        </div>
    </div>
</div>
