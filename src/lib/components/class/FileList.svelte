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
</script>

<div class="bg-white rounded-2xl border border-gray-100 p-6 sticky top-28">
    <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-center text-lg">
            📁
        </div>
        <h2 class="text-lg font-black text-gray-900">Archivos</h2>
    </div>

    <div class="space-y-3">
        {#each files as file}
            <div class="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <div class="w-10 h-10 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-blue-200 transition-all">
                    <FileText size={18} class="text-gray-400 group-hover:text-blue-500 transition-colors" />
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
                            class="flex-1 min-w-0 px-2 py-1 bg-white border border-gray-200 rounded-md focus:outline-hidden focus:border-blue-500 focus:bg-white text-xs font-bold text-gray-800"
                            required
                        />
                        <button 
                            type="submit" 
                            class="p-1 text-green-600 hover:bg-green-50 rounded-md transition-colors shrink-0"
                            title="Guardar"
                        >
                            <Check size={14} />
                        </button>
                        <button 
                            type="button" 
                            onclick={() => editingId = null}
                            class="p-1 text-gray-400 hover:bg-gray-100 rounded-md transition-colors shrink-0"
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
                    <div class="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                        <a class="p-1 text-gray-400 hover:text-[#f9c710] transition-colors" href={file.url || 'No link'} title="Descargar archivo">
                            <Download size={16} />
                        </a>
                        {#if isTeacher}
                            <button 
                                type="button"
                                onclick={() => startEdit(file)} 
                                class="p-1 text-gray-400 hover:text-blue-500 transition-colors"
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
                                <button type="submit" class="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Eliminar archivo">
                                    <Trash2 size={16} />
                                </button>
                            </form>
                        {/if}
                    </div>
                {/if}
            </div>
        {:else}
            <div class="text-center py-8">
                <span class="text-3xl block mb-2 opacity-30">📂</span>
                <p class="text-sm text-gray-400">Sin archivos aún</p>
            </div>
        {/each}
    </div>
</div>
