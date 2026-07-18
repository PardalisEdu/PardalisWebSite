<script lang="ts">
    import { fade } from 'svelte/transition';
    import { enhance } from '$app/forms';
    import Copy from 'lucide-svelte/icons/copy';
    import Check from 'lucide-svelte/icons/check';
    import type { PageProps } from './$types'

    import { authClient } from "$lib/client/auth-client";

    let { data }: PageProps = $props();

    const session = authClient.useSession();

    let activeTab = $state<'join' | 'create'>('join');

    let joinCode = $state('');
    let joinError = $state('');
    let pendingDeleteId = $state<string | null>(null);

    let className = $state('');
    let classLevel = $state('1°');
    let classDesc = $state('');
    let createdCode = $state<string | null>(null);
    let copied = $state(false);

    function resetCreate() {
        createdCode = null;
        className = '';
        classDesc = '';
        classLevel = '1°';
    }

    async function copyCode() {
        if (!createdCode) return;
        try {
            await navigator.clipboard.writeText(createdCode);
            copied = true;
            setTimeout(() => copied = false, 2000);
        } catch {
            // El navegador puede bloquear el portapapeles fuera de HTTPS
        }
    }

    const levels = ['1°', '2°', '3°', '4°', '5°', '6°'];

    const classFeatures = [
        { icon: '🗺️', title: 'Misiones por locación', desc: 'Cada clase tiene un mapa de vecindario con misiones asignadas por el profesor.' },
        { icon: '🏆', title: 'Progreso visible', desc: 'El profesor puede ver quién completó qué y los alumnos ven sus logros.' },
        { icon: '🔒', title: 'Código único', desc: 'Solo los alumnos con el código de la clase pueden unirse. Seguro y controlado.' },
    ];
</script>

<div class="min-h-screen bg-cream">
    <!-- Header -->
    <div class="max-w-5xl mx-auto px-4 pt-28 pb-10 md:pt-36 md:pb-12">
        <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 text-xs font-bold text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200 uppercase tracking-wider mb-5">
                <span>🐆 Clases</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                Aprender juntos
            </h1>
            <p class="text-lg text-gray-500 max-w-xl leading-relaxed">
                Únete a una clase con el código de tu profesor o crea una para tus alumnos.
            </p>
        </div>
    </div>

    <!-- Main content -->
    <div class="max-w-5xl mx-auto px-4 pb-10 md:pb-16">
        {#if $session.data}
        <div class="mb-14">
            <div class="flex items-center gap-3 mb-6">
                <h2 class="text-xl font-black text-gray-900 flex items-center gap-2">
                    <span class="w-2 h-2 bg-brand rounded-full"></span>
                    Tus clases
                </h2>
                {#if data.clases.length > 0}
                    <span class="text-xs font-bold text-gray-500 bg-white border-2 border-gray-100 px-2.5 py-0.5 rounded-full">
                        {data.clases.length}
                    </span>
                {/if}
            </div>

            {#if data.clases.length === 0}
                <div class="bg-white/70 rounded-[2rem] border-2 border-dashed border-yellow-200 p-10 text-center">
                    <span class="text-5xl block mb-4 animate-float">🎒</span>
                    <p class="font-black text-gray-900 text-lg mb-1">Todavía no tienes clases</p>
                    <p class="text-sm text-gray-500">
                        Únete con el código de tu profesor o crea una clase aquí abajo. 👇
                    </p>
                </div>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each data.clases as clase}
                        {@const esProfesor = clase.rol === 'profesor'}
                        <div class="group relative bg-white rounded-[2rem] border-2 transition-all duration-200 flex flex-col overflow-hidden
                            {esProfesor
                                ? 'border-yellow-100 shadow-[0_8px_0_0_#fef9c3] hover:shadow-[0_12px_0_0_#fef9c3]'
                                : 'border-blue-100 shadow-[0_8px_0_0_#dbeafe] hover:shadow-[0_12px_0_0_#dbeafe]'} hover:-translate-y-1">
                            <div class="p-7 flex flex-col flex-1">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-6 transition-transform
                                        {esProfesor ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'}">
                                        {esProfesor ? '🍎' : '🐆'}
                                    </div>
                                    <div class="flex flex-col items-end gap-1.5">
                                        <span class="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border
                                            {esProfesor
                                                ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
                                                : 'text-blue-700 bg-blue-50 border-blue-200'}">
                                            {esProfesor ? 'Profesor' : 'Alumno'}
                                        </span>
                                        {#if clase.grado}
                                            <span class="text-[10px] font-bold text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                                                {clase.grado} de primaria
                                            </span>
                                        {/if}
                                    </div>
                                </div>

                                <h3 class="text-xl font-black text-gray-900 mb-1 line-clamp-1">{clase.nombre}</h3>
                                <p class="text-sm text-gray-500 font-medium mb-6 line-clamp-2 min-h-10">
                                    {clase.descripcion || 'Sin descripción'}
                                </p>

                                <a
                                    href="/class/{clase.id}"
                                    class="mt-auto block w-full text-center py-3 bg-brand text-gray-900 font-black rounded-xl shadow-3d-sm hover:shadow-none hover:translate-y-1 transition-all active:scale-95"
                                >
                                    Entrar al aula
                                </a>

                                <div class="mt-4 flex items-center justify-end border-t border-gray-100 pt-4 min-h-11">
                                    {#if pendingDeleteId === clase.id}
                                        <div class="flex items-center gap-2 w-full" in:fade={{ duration: 150 }}>
                                            <p class="text-xs font-bold text-red-600 flex-1">
                                                {esProfesor ? '¿Eliminar la clase para todos?' : '¿Salir de esta clase?'}
                                            </p>
                                            <button
                                                type="button"
                                                onclick={() => pendingDeleteId = null}
                                                class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-bold transition-colors"
                                            >
                                                No
                                            </button>
                                            <form
                                                method="POST"
                                                action={esProfesor ? '?/eliminarClase' : '?/salirseClase'}
                                                use:enhance={() => {
                                                    return async ({ update }) => {
                                                        await update();
                                                        pendingDeleteId = null;
                                                    };
                                                }}
                                                class="inline"
                                            >
                                                <input type="hidden" name="idClase" value={clase.id} />
                                                <button
                                                    type="submit"
                                                    class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-colors"
                                                >
                                                    {esProfesor ? 'Sí, eliminar' : 'Sí, salir'}
                                                </button>
                                            </form>
                                        </div>
                                    {:else}
                                        <button
                                            type="button"
                                            onclick={() => pendingDeleteId = clase.id}
                                            class="text-xs text-gray-400 hover:text-red-500 font-bold transition-colors"
                                            title={esProfesor ? 'Eliminar clase' : 'Salirse de la clase'}
                                        >
                                            {esProfesor ? 'Eliminar clase' : 'Salirse de la clase'}
                                        </button>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
        {/if}

        <!-- Tab toggle (mobile) -->
        <div class="flex md:hidden bg-gray-100 rounded-2xl p-1 mb-8">
            <button
                class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all {activeTab === 'join' ? 'bg-white text-gray-900 shadow-[0_2px_0_0_#e5e7eb]' : 'text-gray-500'}"
                onclick={() => activeTab = 'join'}
            >
                🔑 Unirme
            </button>
            <button
                class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all {activeTab === 'create' ? 'bg-white text-gray-900 shadow-[0_2px_0_0_#e5e7eb]' : 'text-gray-500'}"
                onclick={() => activeTab = 'create'}
            >
                🍎 Crear clase
            </button>
        </div>

        <!-- Two cards layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <!-- Card: Join class -->
            <div
                class="md:block {activeTab === 'join' ? 'block' : 'hidden'}"
                in:fade={{ duration: 300 }}
            >
                <div class="bg-white rounded-[2rem] border-2 border-blue-100 shadow-[0_8px_0_0_#dbeafe] p-8 md:p-10 h-full">
                    <div class="w-14 h-14 bg-blue-50 rounded-2xl border-2 border-blue-200 flex items-center justify-center text-2xl mb-6">
                        🔑
                    </div>
                    <h2 class="text-2xl font-black text-gray-900 mb-2">¿Tienes un código?</h2>
                    <p class="text-gray-500 leading-relaxed mb-8">
                        Tu profesor te habrá dado un código de 6 letras. Ingresalo aquí para unirte a tu clase.
                    </p>

                    <form
                        method="POST"
                        action="?/unirseClase"
                        use:enhance={() => {
                            return async ({ result, update }) => {
                                if (result.type === 'failure') {
                                    joinError = result.data?.message as string || 'Error al unirse';
                                } else {
                                    await update();
                                }
                            };
                        }}
                        class="space-y-4"
                    >
                        <div>
                            <label for="class-code" class="block text-sm font-bold text-gray-700 mb-2">
                                Código de clase
                            </label>
                            <input
                                id="class-code"
                                name="codigo"
                                type="text"
                                maxlength="6"
                                placeholder="Ej: AB12CD"
                                bind:value={joinCode}
                                oninput={() => joinError = ''}
                                autocomplete="off"
                                class="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl text-lg font-bold tracking-[0.3em] text-center placeholder:tracking-normal placeholder:text-gray-300 placeholder:font-medium focus:outline-hidden focus:bg-white transition-all uppercase
                                    {joinError ? 'border-red-300 focus:border-red-400' : 'border-gray-100 focus:border-brand'}"
                                required
                            />
                            {#if joinError}
                                <p class="text-red-500 text-sm font-medium mt-2" in:fade={{ duration: 150 }}>
                                    {joinError} — ¡revisa el código e inténtalo de nuevo! 💪
                                </p>
                            {/if}
                        </div>

                        <button
                            type="submit"
                            class="w-full py-4 font-black text-lg text-gray-900 bg-brand rounded-2xl shadow-3d-sm hover:shadow-none hover:translate-y-1 active:scale-95 transition-all duration-150"
                        >
                            Unirme a la clase
                        </button>
                    </form>

                    <p class="text-xs text-gray-400 text-center mt-4">
                        El código lo comparte tu profesor. Si no lo tienes, pregúntale. ✨
                    </p>
                </div>
            </div>

            <!-- Card: Create class (teachers) -->
            <div
                class="md:block {activeTab === 'create' ? 'block' : 'hidden'}"
                in:fade={{ duration: 300 }}
            >
                <div class="bg-white rounded-[2rem] border-2 border-brand-light shadow-[0_8px_0_0_var(--color-brand-light)] p-8 md:p-10 h-full">
                    <div class="w-14 h-14 bg-yellow-50 rounded-2xl border-2 border-yellow-200 flex items-center justify-center text-2xl mb-6">
                        🍎
                    </div>
                    <h2 class="text-2xl font-black text-gray-900 mb-2">¿Eres profesor?</h2>
                    <p class="text-gray-500 leading-relaxed mb-8">
                        Crea una clase para tus alumnos. Recibirás un código único que ellos usarán para unirse.
                    </p>

                    {#if createdCode}
                        <!-- Success view -->
                        <div class="text-center space-y-5" in:fade={{ duration: 200 }}>
                            <div class="w-20 h-20 mx-auto bg-green-50 rounded-full border-2 border-green-200 flex items-center justify-center text-4xl animate-bounce-in">
                                🎉
                            </div>
                            <div>
                                <p class="font-black text-gray-900 text-lg mb-1">¡Clase creada!</p>
                                <p class="text-gray-500 text-sm">Comparte este código con tus alumnos</p>
                            </div>
                            <div class="bg-brand-light rounded-2xl border-2 border-brand border-dashed p-6">
                                <p class="text-4xl font-black text-gray-900 tracking-[0.3em]">{createdCode}</p>
                            </div>
                            <div class="flex gap-3">
                                <button
                                    type="button"
                                    onclick={copyCode}
                                    class="flex-1 inline-flex items-center justify-center gap-2 py-3 font-black text-sm text-gray-900 bg-brand rounded-xl shadow-3d-sm hover:shadow-none hover:translate-y-1 transition-all active:scale-95"
                                >
                                    {#if copied}
                                        <Check size={16} />
                                        ¡Copiado!
                                    {:else}
                                        <Copy size={16} />
                                        Copiar código
                                    {/if}
                                </button>
                                <button
                                    type="button"
                                    onclick={resetCreate}
                                    class="flex-1 py-3 font-bold text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                                >
                                    Crear otra
                                </button>
                            </div>
                        </div>
                    {:else}
                        <!-- Create form -->
                        <form
                            method="POST"
                            action="?/crearClase"
                            use:enhance={() => {
                                return async ({ result, update }) => {
                                    if (result.type === 'success') {
                                        createdCode = result.data?.codigo as string || '';
                                    }
                                    await update();
                                };
                            }}
                            class="space-y-4"
                        >
                            <div>
                                <label for="class-name" class="block text-sm font-bold text-gray-700 mb-2">
                                    Nombre de la clase
                                </label>
                                <input
                                    id="class-name"
                                    name="nombre"
                                    type="text"
                                    placeholder="Ej: Inglés 1°A — Vespertino"
                                    bind:value={className}
                                    autocomplete="off"
                                    required
                                    class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-hidden focus:border-brand focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label for="class-level" class="block text-sm font-bold text-gray-700 mb-2">
                                    Grado escolar
                                </label>
                                <select
                                    id="class-level"
                                    name="grado"
                                    bind:value={classLevel}
                                    class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium text-gray-700 focus:outline-hidden focus:border-brand transition-all"
                                >
                                    {#each levels as level}
                                        <option value={level}>{level} de primaria</option>
                                    {/each}
                                </select>
                            </div>

                            <div>
                                <label for="class-desc" class="block text-sm font-bold text-gray-700 mb-2">
                                    Descripción <span class="text-gray-400 font-normal">(opcional)</span>
                                </label>
                                <textarea
                                    id="class-desc"
                                    name="descripcion"
                                    rows="3"
                                    placeholder="Ej: Grupo de inglés básico. Nos vemos martes y jueves."
                                    bind:value={classDesc}
                                    class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-hidden focus:border-brand focus:bg-white transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={!className.trim()}
                                class="w-full py-4 font-black text-lg text-gray-900 bg-brand rounded-2xl shadow-3d-sm hover:shadow-none hover:translate-y-1 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-3d-sm"
                            >
                                Crear clase
                            </button>
                        </form>
                    {/if}
                </div>
            </div>
        </div>

        <!-- What's inside a class -->
        <div class="mt-16 md:mt-20">
            <div class="text-center mb-12">
                <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-3">Dentro de una clase</h2>
                <p class="text-gray-500">Esto es lo que encontrarás al unirte</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {#each classFeatures as feat, i}
                    <div
                        in:fade={{ duration: 400, delay: i * 100 }}
                        class="bg-white rounded-2xl border-2 border-gray-100 p-6 text-center hover:border-brand-light hover:shadow-[0_6px_0_0_var(--color-brand-light)] hover:-translate-y-1 transition-all duration-200"
                    >
                        <div class="w-12 h-12 mx-auto mb-4 bg-yellow-50 rounded-xl border-2 border-yellow-200 flex items-center justify-center text-2xl">
                            {feat.icon}
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2">{feat.title}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
