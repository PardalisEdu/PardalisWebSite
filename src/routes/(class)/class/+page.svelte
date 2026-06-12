<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import type { PageProps } from './$types'

    import { authClient } from "$lib/auth-client";

    let { data }: PageProps = $props();

    const session = authClient.useSession();

    let activeTab = $state<'join' | 'create'>('join');

    let joinCode = $state('');
    let joinError = $state('');

    let className = $state('');
    let classLevel = $state('1°');
    let classDesc = $state('');
    let createdCode = $state<string | null>(null);

    function handleJoin() {
        if (!joinCode.trim()) {
            joinError = 'Ingresa un código de clase válido';
            return;
        }
        joinError = '';
        goto('/class/demo');
    }

    function handleCreate() {
        if (!className.trim()) return;
        const randomCode = Array.from({ length: 6 }, () =>
            String.fromCharCode(65 + Math.floor(Math.random() * 26))
        ).join('');
        createdCode = randomCode;
    }

    function resetCreate() {
        createdCode = null;
        className = '';
        classDesc = '';
        classLevel = '1°';
    }

    const levels = ['1°', '2°', '3°', '4°', '5°', '6°'];

    const classFeatures = [
        { icon: '🗺️', title: 'Misiones por locación', desc: 'Cada clase tiene un mapa de vecindario con misiones asignadas por el profesor.' },
        { icon: '🏆', title: 'Progreso visible', desc: 'El profesor puede ver quién completó qué y los alumnos ven sus logros.' },
        { icon: '🔒', title: 'Código único', desc: 'Solo los alumnos con el código de la clase pueden unirse. Seguro y controlado.' },
    ];
</script>

<div class="min-h-screen bg-[#FFFDF5]">
    <!-- Header -->
    <div class="border-b border-gray-100 bg-white">
        <div class="max-w-5xl mx-auto px-4 pt-28 pb-12 md:pt-36 md:pb-16">
            <div class="max-w-2xl">
                <div class="inline-flex items-center gap-2 text-xs font-bold text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200 uppercase tracking-wider mb-5">
                    <span>Clases</span>
                </div>
                <h1 class="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                    Aprender juntos
                </h1>
                <p class="text-lg text-gray-500 max-w-xl leading-relaxed">
                    Únete a una clase con el código de tu profesor o crea una para tus alumnos.
                </p>
            </div>
        </div>
    </div>

    <!-- Main content -->
    <div class="max-w-5xl mx-auto px-4 py-10 md:py-16">
        {#if $session.data}
        <!-- Mock Joined Class (Example) -->
        <div class="mb-12">
            <h2 class="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <span class="w-2 h-2 bg-[#f9c710] rounded-full"></span>
                Tus clases activas
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Mock Card -->

                {#each data.clases as clase}
                    <div class="group relative bg-white rounded-[2rem] border-4 border-yellow-100 shadow-[0_8px_0_0_#fef08a] hover:-translate-y-1 hover:shadow-[0_12px_0_0_#fef08a] transition-all duration-300 overflow-hidden">
                        <div class="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
                            En curso
                        </div>
                        <div class="p-8">
                            <div class="w-12 h-12 bg-yellow-50 rounded-2xl border-2 border-yellow-200 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                                🐆
                            </div>
                            <h3 class="text-xl font-black text-gray-900 mb-1">{clase.nombre}</h3>
                            <p class="text-sm text-gray-500 font-medium mb-6">{clase.descripcion}</p>

                            <a 
                                href="/class/{clase.id}"
                                class="block w-full text-center py-3 bg-[#f9c710] text-gray-900 font-black rounded-xl shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 transition-all active:scale-95"
                            >
                                Entrar al aula
                            </a>
                        </div>
                    </div>                    
                {/each}
            </div>
        </div>
        {/if}

        <!-- Tab toggle (mobile) -->
        <div class="flex md:hidden bg-gray-100 rounded-2xl p-1 mb-8">
            <button
                class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all {activeTab === 'join' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}"
                onclick={() => activeTab = 'join'}
            >
                Unirme
            </button>
            <button
                class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all {activeTab === 'create' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}"
                onclick={() => activeTab = 'create'}
            >
                Crear clase
            </button>
        </div>

        <!-- Two cards layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <!-- Card: Join class -->
            <div
                class="md:block {activeTab === 'join' ? 'block' : 'hidden'}"
                in:fade={{ duration: 300 }}
            >
                <div class="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 h-full">
                    <div class="w-14 h-14 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-center text-2xl mb-6">
                        🔑
                    </div>
                    <h2 class="text-2xl font-black text-gray-900 mb-2">¿Tienes un código?</h2>
                    <p class="text-gray-500 leading-relaxed mb-8">
                        Tu profesor te habrá dado un código de 6 letras. Ingresalo aquí para unirte a tu clase.
                    </p>

                    <div class="space-y-4">
                        <div>
                            <label for="class-code" class="block text-sm font-bold text-gray-700 mb-2">
                                Código de clase
                            </label>
                            <input
                                id="class-code"
                                type="text"
                                maxlength="6"
                                placeholder="Ej: AB12CD"
                                bind:value={joinCode}
                                class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-lg font-bold tracking-[0.3em] text-center placeholder:tracking-normal placeholder:text-gray-300 placeholder:font-medium focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all uppercase"
                            />
                            {#if joinError}
                                <p class="text-red-500 text-sm font-medium mt-2">{joinError}</p>
                            {/if}
                        </div>

                        <button
                            onclick={handleJoin}
                            class="w-full py-4 font-black text-lg text-white bg-[#f9c710] rounded-2xl shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all duration-150"
                        >
                            Unirme a la clase
                        </button>
                    </div>

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
                <div class="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 h-full">
                    <div class="w-14 h-14 bg-yellow-50 rounded-2xl border border-yellow-200 flex items-center justify-center text-2xl mb-6">
                        🍎
                    </div>
                    <h2 class="text-2xl font-black text-gray-900 mb-2">¿Eres profesor?</h2>
                    <p class="text-gray-500 leading-relaxed mb-8">
                        Crea una clase para tus alumnos. Recibirás un código único que ellos usarán para unirse.
                    </p>

                    {#if createdCode}
                        <!-- Success view -->
                        <div class="text-center space-y-5">
                            <div class="w-20 h-20 mx-auto bg-green-50 rounded-full border-2 border-green-200 flex items-center justify-center text-4xl animate-bounce">
                                ✅
                            </div>
                            <div>
                                <p class="font-black text-gray-900 text-lg mb-1">¡Clase creada!</p>
                                <p class="text-gray-500 text-sm">Comparte este código con tus alumnos</p>
                            </div>
                            <div class="bg-gray-50 rounded-2xl border-2 border-gray-200 border-dashed p-6">
                                <p class="text-4xl font-black text-[#f9c710] tracking-[0.3em]">{createdCode}</p>
                            </div>
                            <div class="flex gap-3">
                                <button
                                    onclick={resetCreate}
                                    class="flex-1 py-3 font-bold text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                                >
                                    Crear otra
                                </button>
                            </div>
                        </div>
                    {:else}
                        <!-- Create form -->
                        <form class="space-y-4" onsubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                            <div>
                                <label for="class-name" class="block text-sm font-bold text-gray-700 mb-2">
                                    Nombre de la clase
                                </label>
                                <input
                                    id="class-name"
                                    type="text"
                                    placeholder="Ej: Inglés 1°A — Vespertino"
                                    bind:value={className}
                                    required
                                    class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label for="class-level" class="block text-sm font-bold text-gray-700 mb-2">
                                    Grado escolar
                                </label>
                                <select
                                    id="class-level"
                                    bind:value={classLevel}
                                    class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium text-gray-700 focus:outline-hidden focus:border-[#f9c710] transition-all"
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
                                    rows="3"
                                    placeholder="Ej: Grupo de inglés básico. Nos vemos martes y jueves."
                                    bind:value={classDesc}
                                    class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={!className.trim()}
                                class="w-full py-4 font-black text-lg text-white bg-[#f9c710] rounded-2xl shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
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
                        class="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:border-yellow-200 hover:shadow-md transition-all duration-300"
                    >
                        <div class="w-12 h-12 mx-auto mb-4 bg-yellow-50 rounded-xl border border-yellow-200 flex items-center justify-center text-2xl">
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