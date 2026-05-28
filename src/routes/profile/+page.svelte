<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchPersonalization, updatePersonalization } from '$lib/api/personalization';
    import Boton from "$lib/components/Boton.svelte";
    import type { PersonalizationData } from '$lib/types/types';

    let { data } = $props();

    let user = $derived(data.user);
    let token = $derived(data.token ?? '');

    let editing = $state(false);
    let showAlert = $state(false);
    let personalization = $state<PersonalizationData | null>(null);
    let editForm = $state<PersonalizationData>({
        descripcion: '',
        foto: 'img/profiles/ocelote.svg'
    });

    async function fetchData() {
        if (!user?.apodo || !token) return;

        try {
            const personalizationInfo = await fetchPersonalization(user.apodo, token);
            personalization = personalizationInfo;
            editForm.descripcion = personalizationInfo.descripcion;
            editForm.foto = personalizationInfo.foto;
        } catch {
            showAlert = true;
            setTimeout(() => { showAlert = false; }, 3000);
        }
    }

    onMount(() => {
        fetchData();
    });

    async function handleSaveProfile() {
        if (!user?.apodo || !token) return;

        try {
            const updated = await updatePersonalization(user.apodo, editForm, token);
            editing = false;
            personalization = updated;
        } catch {
            showAlert = true;
            setTimeout(() => { showAlert = false; }, 3000);
        }
    }

    const avatarOptions = [
        {value: 'img/profiles/ajolote.svg', label: 'Ajolote'},
        {value: 'img/profiles/ocelote.svg', label: 'Ocelote'},
        {value: 'img/profiles/xinxin.svg', label: 'Xinxin'},
    ];
</script>

<main class="min-h-screen bg-[#FFFDF5] py-6 md:py-16 px-4 grid place-content-center">
    <div class="w-full max-w-lg mx-auto bg-white rounded-[3rem] border-4 border-yellow-100 shadow-[0_16px_0_0_#fef08a] p-8 md:p-12 relative overflow-hidden">
        <div class="absolute -top-16 -left-16 w-48 h-48 bg-yellow-100 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-100 rounded-full blur-3xl"></div>

        {#if showAlert}
            <div class="mb-6 bg-yellow-50 border-2 border-yellow-200 text-yellow-800 px-5 py-3 rounded-xl font-medium relative" role="alert">
                🐄 Oh, parece que hubo un error. Por favor, intenta de nuevo más tarde.
            </div>
        {/if}

        <div class="relative">
            <div class="flex flex-col items-center mb-8">
                {#if editing}
                    <div class="w-full mb-6">
                        <label for="avatar-select" class="block text-sm font-bold text-gray-700 mb-2">
                            Avatar
                        </label>
                        <select
                            id="avatar-select"
                            bind:value={editForm.foto}
                            class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl font-medium text-gray-700 focus:outline-hidden focus:border-[#f9c710] transition-all"
                        >
                            {#each avatarOptions as option}
                                <option value={option.value}>{option.label}</option>
                            {/each}
                        </select>
                    </div>
                {/if}

                <!-- Avatar with ring -->
                <div class="relative mb-5">
                    <div class="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-yellow-200 shadow-[0_6px_0_0_#fef08a] overflow-hidden">
                        <img
                            class="w-full h-full object-cover"
                            src={editing ? editForm.foto : personalization?.foto || 'img/profiles/ocelote.svg'}
                            alt="Avatar"
                        />
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-[#f9c710] rounded-full border-2 border-white flex items-center justify-center text-sm shadow-lg">
                        🐾
                    </div>
                </div>

                {#if editing}
                    <div class="w-full mb-5">
                        <label for="descripcion-textarea" class="block text-sm font-bold text-gray-700 mb-2">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion-textarea"
                            bind:value={editForm.descripcion}
                            class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl font-medium text-gray-700 focus:outline-hidden focus:border-[#f9c710] transition-all resize-none"
                            rows="4"
                            placeholder="Cuéntanos sobre ti..."
                        ></textarea>
                    </div>
                    <div class="flex gap-3 w-full">
                        <button
                            onclick={handleSaveProfile}
                            class="flex-1 py-3 font-black text-sm text-white bg-[#f9c710] rounded-2xl shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all duration-150"
                        >
                            Guardar
                        </button>
                        <button
                            onclick={() => editing = false}
                            class="flex-1 py-3 font-bold text-sm text-gray-600 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                        >
                            Cancelar
                        </button>
                    </div>
                {:else}
                    <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-1">{user?.apodo || ''}</h2>
                    <p class="text-gray-500 font-medium text-center max-w-sm">{personalization?.descripcion || 'Sin descripción'}</p>
                    <button
                        onclick={() => editing = true}
                        class="mt-6 py-3 px-8 font-black text-sm text-white bg-[#f9c710] rounded-2xl shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all duration-150"
                    >
                        Editar Perfil
                    </button>
                {/if}
            </div>

            <div class="flex justify-center pt-4 border-t-2 border-gray-100">
                <form method="POST" action="/logout">
                    <Boton title="Cerrar Sesión" color="warn" />
                </form>
            </div>
        </div>
    </div>
</main>