<script lang="ts">
    import { enhance } from '$app/forms';
    import Megaphone from 'lucide-svelte/icons/megaphone';
    import FileUp from 'lucide-svelte/icons/file-up';
    import Plus from 'lucide-svelte/icons/plus';
    import X from 'lucide-svelte/icons/x';
    import { fade, slide } from 'svelte/transition';

    let showForm = $state<'announcement' | 'file' | null>(null);
    
    // Announcement form state
    let annTitle = $state('');
    let annBody = $state('');
    
    // File form state
    let fileName = $state('');
    let fileObj = $state<File | null>(null);
</script>

<div class="mb-10">
    {#if !showForm}
        <div class="flex flex-wrap gap-4" in:fade>
            <button 
                onclick={() => showForm = 'announcement'}
                class="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border-2 border-yellow-100 shadow-[0_4px_0_0_#fef08a] hover:shadow-none hover:translate-y-1 transition-all group"
            >
                <div class="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform">
                    <Megaphone size={20} />
                </div>
                <span class="font-black text-gray-800">Nuevo anuncio</span>
            </button>

            <button 
                onclick={() => showForm = 'file'}
                class="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border-2 border-blue-100 shadow-[0_4px_0_0_#dbeafe] hover:shadow-none hover:translate-y-1 transition-all group"
            >
                <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <FileUp size={20} />
                </div>
                <span class="font-black text-gray-800">Subir archivo</span>
            </button>
        </div>
    {:else if showForm === 'announcement'}
        <form
            method="POST" 
            action="?/crearAnuncio" 
            use:enhance={() => {
                return async ({ update }) => {
                    await update();
                    showForm = null;
                    annTitle = '';
                    annBody = '';
                };
            }}
            class="bg-white rounded-[2rem] border-4 border-yellow-100 p-8 shadow-[0_8px_0_0_#fef08a]" in:slide>
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-black text-gray-900 flex items-center gap-2">
                    <Megaphone class="text-[#f9c710]" />
                    Publicar Anuncio
                </h3>
                <button onclick={() => showForm = null} class="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
            </div>

            <div class="space-y-4">
                <div>
                    <label for="ann-title" class="block text-sm font-bold text-gray-700 mb-2">Título</label>
                    <input 
                        id="ann-title"
                        name="titulo"
                        type="text" 
                        bind:value={annTitle}
                        placeholder="Ej: Tarea para el viernes"
                        autocomplete="off"
                        class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all font-medium"
                    />
                </div>
                <div>
                    <label for="ann-body" class="block text-sm font-bold text-gray-700 mb-2">Contenido</label>
                    <textarea 
                        id="ann-body"
                        name="contenido"
                        bind:value={annBody}
                        rows="4"
                        placeholder="Escribe aquí el mensaje para tus alumnos..."
                        class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all font-medium resize-none"
                    ></textarea>
                </div>
                <button 
                    type="submit"
                    disabled={!annTitle || !annBody}
                    class="w-full py-4 bg-[#f9c710] text-gray-900 font-black rounded-xl shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all disabled:opacity-50"
                >
                    Publicar ahora
                </button>
            </div>
        </form>
    {:else if showForm === 'file'}
        <form 
        method="POST" 
            action="?/subirArchivo"
            enctype="multipart/form-data"
            use:enhance={() => {
                return async ({ update }) => {
                    await update();
                    showForm = null;
                    fileName = '';
                    fileObj = null;
                };
            }}
        class="bg-white rounded-[2rem] border-4 border-blue-100 p-8 shadow-[0_8px_0_0_#dbeafe]" in:slide>
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-black text-gray-900 flex items-center gap-2">
                    <FileUp class="text-blue-500" />
                    Subir Material
                </h3>
                <button onclick={() => showForm = null} class="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
            </div>

            <div class="space-y-4">
                <div>
                    <label for="file-name" class="block text-sm font-bold text-gray-700 mb-2">Nombre del archivo</label>
                    <input 
                        id="file-name"
                        name="nombre"
                        type="text"
                        autocomplete="off"
                        bind:value={fileName}
                        placeholder="Ej: Guía de estudio.pdf"
                        class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all font-medium"
                    />
                </div>
                
                <div class="border-2 border-dashed border-blue-100 rounded-2xl p-8 text-center bg-blue-50/30">
                    <input name="archivo" type="file" class="hidden" id="file-upload" onchange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        if (file) {
                            fileObj = file;
                            if (!fileName) fileName = file.name;
                        }
                    }} />
                    <label for="file-upload" class="cursor-pointer">
                        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                            <Plus class="text-blue-500" />
                        </div>
                        <p class="text-sm font-bold text-blue-600">
                            {fileObj ? fileObj.name : 'Haz click para seleccionar un archivo'}
                        </p>
                        <p class="text-xs text-gray-400 mt-1">PDF, Word, Imágenes (Máx. 10MB)</p>
                    </label>
                </div>

                <button 
                    disabled={!fileName}
                    class="w-full py-4 bg-blue-500 text-white font-black rounded-xl shadow-[0_4px_0_0_#2563eb] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all disabled:opacity-50"
                >
                    Subir material
                </button>
            </div>
        </form>
    {/if}
</div>
