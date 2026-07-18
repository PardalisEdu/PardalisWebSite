<script lang="ts">
    import Calendar from 'lucide-svelte/icons/calendar';
    import Pencil from 'lucide-svelte/icons/pencil';
    import Trash2 from 'lucide-svelte/icons/trash-2';
    import { enhance } from '$app/forms';

    interface Announcement {
        id: number | string;
        title: string;
        date: string | null;
        body: string;
    }

    let { announcements = [] as Announcement[], isTeacher = false } = $props();

    let editingId = $state<string | number | null>(null);
    let editTitle = $state('');
    let editBody = $state('');

    function startEdit(ann: Announcement) {
        editingId = ann.id;
        editTitle = ann.title;
        editBody = ann.body;
    }
</script>

<div class="space-y-6">
    <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-yellow-50 rounded-xl border-2 border-yellow-200 flex items-center justify-center text-lg">
            📢
        </div>
        <h2 class="text-xl font-black text-gray-900">Anuncios</h2>
    </div>

    <div class="space-y-4">
        {#each announcements as ann}
            <div class="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-brand-light hover:shadow-[0_6px_0_0_var(--color-brand-light)] hover:-translate-y-0.5 transition-all duration-200">
                {#if editingId === ann.id}
                    <form
                        method="POST"
                        action="?/editarAnuncio"
                        use:enhance={() => {
                            return async ({ update }) => {
                                await update();
                                editingId = null;
                            };
                        }}
                        class="space-y-4"
                    >
                        <input type="hidden" name="id" value={ann.id} />
                        <div>
                            <label for={`edit-title-${ann.id}`} class="block text-sm font-bold text-gray-700 mb-2">Título</label>
                            <input
                                id={`edit-title-${ann.id}`}
                                name="titulo"
                                type="text"
                                bind:value={editTitle}
                                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-hidden focus:border-brand focus:bg-white transition-all text-sm font-semibold text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label for={`edit-body-${ann.id}`} class="block text-sm font-bold text-gray-700 mb-2">Contenido</label>
                            <textarea
                                id={`edit-body-${ann.id}`}
                                name="contenido"
                                rows="3"
                                bind:value={editBody}
                                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-hidden focus:border-brand focus:bg-white transition-all text-sm text-gray-700 resize-none"
                                required
                            ></textarea>
                        </div>
                        <div class="flex justify-end gap-2">
                            <button
                                type="button"
                                onclick={() => editingId = null}
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
                    <div class="flex items-start justify-between gap-3 mb-3">
                        <h3 class="font-bold text-gray-900">{ann.title}</h3>
                        <div class="flex items-center gap-3 shrink-0">
                            <span class="flex items-center gap-1 text-xs font-medium text-gray-400">
                                <Calendar size={12} />
                                {ann.date ? new Date(ann.date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }) : 'Sin fecha'}
                            </span>
                            {#if isTeacher}
                                <div class="flex items-center gap-1">
                                    <button
                                        onclick={() => startEdit(ann)}
                                        class="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-yellow-50 transition-colors"
                                        title="Editar anuncio"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                    <form
                                        method="POST"
                                        action="?/eliminarContenido"
                                        use:enhance={({ cancel }) => {
                                            if (!confirm("¿Estás seguro de que quieres eliminar este anuncio?")) {
                                                cancel();
                                            }
                                            return async ({ update }) => {
                                                await update();
                                            };
                                        }}
                                        class="inline"
                                    >
                                        <input type="hidden" name="id" value={ann.id} />
                                        <button type="submit" class="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Eliminar anuncio">
                                            <Trash2 size={14} />
                                        </button>
                                    </form>
                                </div>
                            {/if}
                        </div>
                    </div>
                    <p class="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">{ann.body}</p>
                {/if}
            </div>
        {:else}
            <div class="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">
                <span class="text-4xl block mb-3">📭</span>
                <p class="text-gray-700 font-bold mb-1">Aún no hay anuncios</p>
                <p class="text-sm text-gray-400">
                    {isTeacher ? 'Publica el primero para tus alumnos.' : 'Cuando tu profesor publique algo, aparecerá aquí.'}
                </p>
            </div>
        {/each}
    </div>
</div>
