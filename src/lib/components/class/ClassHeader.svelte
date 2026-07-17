<script lang="ts">
    import ArrowLeft from 'lucide-svelte/icons/arrow-left';
    import Pencil from 'lucide-svelte/icons/pencil';
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

    function startEdit() {
        editName = className;
        editDesc = description || "";
        editing = true;
    }
</script>

<div class="border-b border-gray-100 bg-white">
    <div class="max-w-5xl mx-auto px-4 pt-28 pb-10 md:pt-36 md:pb-12">
        <!-- Back -->
        <a
            href="/class"
            class="inline-flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors mb-6 group"
        >
            <ArrowLeft size={16} class="group-hover:-translate-x-0.5 transition-transform" />
            Volver a clases
        </a>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="w-full">
                <div class="flex items-center gap-3 mb-2">
                    <span class="text-xs font-bold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 uppercase tracking-wider">
                        {level}
                    </span>
                    <span class="text-xs text-gray-400 font-medium">
                        {studentCount} alumnos
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
                            <label for="edit-class-name" class="block text-xs font-bold text-gray-500 mb-1">Nombre de la clase</label>
                            <input 
                                id="edit-class-name"
                                name="nombre"
                                type="text" 
                                bind:value={editName}
                                class="w-full max-w-xl px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#f9c710] focus:bg-white text-sm font-semibold text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label for="edit-class-desc" class="block text-xs font-bold text-gray-500 mb-1">Descripción</label>
                            <textarea 
                                id="edit-class-desc"
                                name="descripcion"
                                rows="3"
                                bind:value={editDesc}
                                class="w-full max-w-xl px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#f9c710] focus:bg-white text-sm text-gray-700 resize-none"
                            ></textarea>
                        </div>
                        <div class="flex gap-2">
                            <button 
                                type="button" 
                                onclick={() => editing = false}
                                class="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                class="px-3 py-1.5 bg-[#f9c710] text-gray-900 font-bold rounded-lg text-xs hover:bg-[#e0b20a] transition-colors"
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
                                class="p-1.5 text-gray-400 hover:text-blue-500 rounded-md hover:bg-blue-50 transition-colors mt-1"
                                title="Editar clase"
                            >
                                <Pencil size={18} />
                            </button>
                        {/if}
                    </div>
                    <p class="text-sm text-gray-400 mt-1">
                        {teacherName}
                    </p>
                    {#if description}
                        <p class="text-sm text-gray-600 mt-3 max-w-2xl leading-relaxed whitespace-pre-wrap">
                            {description}
                        </p>
                    {/if}
                {/if}
            </div>
            <div class="flex flex-col items-end gap-2 shrink-0 self-start sm:self-center">
                <div class="flex items-center gap-2 bg-gray-50 rounded-2xl border border-gray-200 px-5 py-3 w-full justify-between sm:justify-start">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Código</span>
                    <span class="text-xl font-black text-[#f9c710] tracking-[0.15em]">{classCode}</span>
                </div>
                {#if isTeacher}
                    <form 
                        method="POST" 
                        action="?/generarCodigo" 
                        use:enhance
                    >
                        <button 
                            type="submit" 
                            class="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                            🔄 Generar nuevo código
                        </button>
                    </form>
                {/if}
            </div>
        </div>
    </div>
</div>
