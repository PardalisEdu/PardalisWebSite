<script>
    import { goto } from "$app/navigation";
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { getUserProfile } from "$lib/api/user";
    import Boton from "$lib/components/Boton.svelte";
    import { authStore } from "$lib/stores/authStore";
    import { personalizationStore } from "$lib/stores/personalizationStore";

    /** @type {{ apodo: string } | null} */
    let user = $authStore.user;
    let editing = $state(false);
    let showAlert = $state(false);
    /** @type {{ descripcion: string, foto: string } | null} */
    let personalization = $state(null);
    /** @type {{ descripcion: string, foto: string }} */
    let editForm = $state({
        descripcion: '',
        foto: 'img/profiles/ocelote.svg'
    });

    async function fetchData() {
        if (!user?.apodo) return;

        try {
            const [userInfo, personalizationInfo] = await Promise.all([
                getUserProfile(user.apodo),
                personalizationStore.loadPersonalization(user.apodo)
            ]);
            personalization = personalizationInfo;
            editForm.descripcion = personalizationInfo.descripcion;
            editForm.foto = personalizationInfo.foto;
        } catch (error) {
            console.error('Error loading profile data:', error);
            showAlert = true;
            setTimeout(() => {
                showAlert = false;
            }, 3000);
        }
    }

    onMount(() => {
        if (browser) {
            const token = localStorage.getItem('token');
            if (!token || !user) {
                goto('/login');
                return;
            }
            fetchData();
        }
    });

    function handleLogout() {
        localStorage.removeItem("token");
        authStore.logout();
        goto("/");
    }

    async function handleSaveProfile() {
        if (!user?.apodo) return;

        try {
            await personalizationStore.updatePersonalization(user.apodo, editForm);
            editing = false;
            personalization = {...editForm};
        } catch (error) {
            console.error('Error updating profile:', error);
            showAlert = true;
            setTimeout(() => {
                showAlert = false;
            }, 3000);
        }
    }

    const avatarOptions = [
        {value: 'img/profiles/ajolote.svg', label: 'Ajolote'},
        {value: 'img/profiles/ocelote.svg', label: 'Ocelote'},
        {value: 'img/profiles/xinxin.svg', label: 'Xinxin'},
    ];
</script>

<main class="min-h-screen bg-gray-100 py-6 md:py-12 px-4 grid place-content-center">
    <div class="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden p-4 md:p-6">
        {#if showAlert}
            <div
                class="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 md:px-4 md:py-3 rounded relative text-sm md:text-base"
                role="alert"
            >
                <span class="block sm:inline">
                    🐄 Oh, parece que hubo un error. Por favor, intenta de nuevo más tarde.
                </span>
            </div>
        {/if}

        <div>
            <div class="flex flex-col items-center mb-4 md:mb-6">
                {#if editing}
                    <div class="w-full max-w-sm mb-4">
                        <span class="block text-gray-700 text-sm font-bold mb-2">
                            Avatar
                        </span>
                        <select
                            bind:value={editForm.foto}
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm md:text-base"
                        >
                            {#each avatarOptions as option}
                                <option value={option.value}>{option.label}</option>
                            {/each}
                        </select>
                    </div>
                {/if}

                <img
                    class="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4"
                    src={editing ? editForm.foto : personalization?.foto || 'img/profiles/ocelote.svg'}
                    alt="Avatar"
                />

                {#if editing}
                    <div class="w-full max-w-sm mb-4">
                        <span class="block text-gray-700 text-sm font-bold mb-2">
                            Descripción
                        </span>
                        <textarea
                            bind:value={editForm.descripcion}
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm md:text-base"
                            rows="4"
                        ></textarea>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full max-w-sm">
                        <button
                            onclick={handleSaveProfile}
                            class="w-full sm:w-auto bg-[#f9c710] text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm md:text-base"
                        >
                            Guardar
                        </button>
                        <button
                            onclick={() => editing = false}
                            class="w-full sm:w-auto bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors text-sm md:text-base"
                        >
                            Cancelar
                        </button>
                    </div>
                {:else}
                    <h2 class="text-xl md:text-2xl font-bold mb-2 text-center">{user?.apodo || ''}</h2>
                    <p class="text-gray-600 mb-4 text-sm md:text-base text-center px-4">{personalization?.descripcion || 'Sin descripción'}</p>
                    <button
                        onclick={() => editing = true}
                        class="w-full sm:w-auto bg-[#f9c710] text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors mb-4 text-sm md:text-base"
                    >
                        Editar Perfil
                    </button>
                {/if}
            </div>

            <div class="flex justify-center">
                <Boton title="Cerrar Sesión" color="warn" onClick={handleLogout}/>
            </div>
        </div>
    </div>
</main>