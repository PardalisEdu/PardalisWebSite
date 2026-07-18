<script lang="ts">
    import FileText from 'lucide-svelte/icons/file-text';
    import Download from 'lucide-svelte/icons/download';
    import Pencil from 'lucide-svelte/icons/pencil';
    import Trash2 from 'lucide-svelte/icons/trash-2';
    import Check from 'lucide-svelte/icons/check';
    import X from 'lucide-svelte/icons/x';
    import { enhance } from '$app/forms';

    interface ClassFile {
        id?: string | number;
        name: string;
        size?: string;
        date: string | null;
        url: string | null;
    }

    let { files = [] as ClassFile[], isTeacher = false } = $props();

    let editingId = $state<string | number | null>(null);
    let editName = $state('');

    function startEdit(file: ClassFile) {
        if (file.id) {
            editingId = file.id;
            editName = file.name;
        }
    }

    async function getUrl(key: string) {
        const res = await fetch(`/api/download?key=${key}`);
        const { url } = await res.json();
        window.open(url, '_blank');
    }
</script>

<div class="bg-white rounded-[2rem] border-2 border-gray-100 p-6 sticky top-28">
    <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 bg-blue-50 rounded-xl border-2 border-blue-200 flex items-center justify-center text-lg">
            📁
        </div>
        <h2 class="text-lg font-black text-gray-900">Archivos</h2>
    </div>

    <div class="space-y-2">
        {#each files as file}
            <div class="group flex items-start gap-3 p-3 rounded-2xl hover:bg-yellow-50/60 transition-all duration-200">
                <div class="w-10 h-10 bg-gray-50 rounded-xl border-2 border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-yellow-200 transition-all">
                    <FileText size={18} class="text-gray-400 group-hover:text-yellow-600 transition-colors" />
                </div>
                {#if editingId === file.id}
                    <form
                        method="POST"
                        action="?/editarArchivo"
                        use:enhance={() => {
                            return async ({ update }) => {
                                await update();
                                editingId = null;
                            };
                        }}
                        class="flex-1 flex gap-2 items-center min-w-0"
                    >
                        <input type="hidden" name="id" value={file.id} />
                        <input
                            name="nombre"
                            type="text"
                            bind:value={editName}
                            class="flex-1 min-w-0 px-3 py-1.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-hidden focus:border-brand text-xs font-bold text-gray-800"
                            required
                        />
                        <button
                            type="submit"
                            class="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors shrink-0"
                            title="Guardar"
                        >
                            <Check size={14} />
                        </button>
                        <button
                            type="button"
                            onclick={() => editingId = null}
                            class="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                            title="Cancelar"
                        >
                            <X size={14} />
                        </button>
                    </form>
                {:else}
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-gray-800 truncate">{file.name}</p>
                        <p class="text-xs text-gray-400">
                            {file.size || 'Archivo'} · {file.date ? new Date(file.date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }) : ''}
                        </p>
                    </div>
                    <!-- Visibles siempre en touch; en escritorio aparecen al pasar el mouse -->
                    <div class="flex items-center gap-1 shrink-0 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                        <button
                            type="button"
                            onclick={() => getUrl(file.url || '')}
                            class="p-1.5 text-gray-400 hover:text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
                            title="Descargar archivo"
                        >
                            <Download size={16} />
                        </button>
                        {#if isTeacher}
                            <button
                                type="button"
                                onclick={() => startEdit(file)}
                                class="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                title="Editar nombre"
                            >
                                <Pencil size={16} />
                            </button>
                            <form
                                method="POST"
                                action="?/eliminarContenido"
                                use:enhance={({ cancel }) => {
                                    if (!confirm("¿Estás seguro de que quieres eliminar este archivo?")) {
                                        cancel();
                                    }
                                    return async ({ update }) => {
                                        await update();
                                    };
                                }}
                                class="inline"
                            >
                                <input type="hidden" name="id" value={file.id} />
                                <button type="submit" class="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Eliminar archivo">
                                    <Trash2 size={16} />
                                </button>
                            </form>
                        {/if}
                    </div>
                {/if}
            </div>
        {:else}
            <div class="text-center py-8 border-2 border-dashed border-gray-200 rounded-2xl">
                <span class="text-3xl block mb-2">📂</span>
                <p class="text-sm font-bold text-gray-700 mb-0.5">Sin archivos aún</p>
                <p class="text-xs text-gray-400 px-4">
                    {isTeacher ? 'Sube material para tu clase.' : 'Aquí verás el material de la clase.'}
                </p>
            </div>
        {/each}
    </div>
</div>
