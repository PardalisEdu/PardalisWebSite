<script>
    import {goto} from "$app/navigation";
    import {getUserProfile} from "$lib/api/user";
    import Boton from "$lib/components/Boton.svelte";
    import {authStore} from "$lib/stores/authStore";
    import {personalizationStore} from "$lib/stores/personalizationStore";

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
        if (!user?.apodo) {
            goto('/login');
            return;
        }

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

    $effect(() => {
        fetchData();
    });

    function handleLogout() {
        localStorage.removeItem("token");
        authStore.logout();
        goto("/");
    }

    // Redirigir si no está autenticado
    if (!user) {
        goto('/login');
    }

    async function handleSaveProfile() {
        if (!user?.apodo) {
            goto('/login');
            return;
        }

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

<main class="min-h-screen bg-gray-100 py-12 px-4 grid place-content-center">
    <div
            class="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden min-w-[500px] p-6"
    >
        {#if showAlert}
            <div
                    class="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative"
                    role="alert"
            >
                <span class="block sm:inline">
                🐄 Oh, parece que hubo un error. Por favor, intenta de nuevo más tarde.
                </span>
            </div>
        {/if}

        <div>
            <div class="flex flex-col items-center mb-6">
                {#if editing}
                    <div class="mb-4">
                        <span class="block text-gray-700 text-sm font-bold mb-2">
                            Avatar
                        </span>
                        <select
                                bind:value={editForm.foto}
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {#each avatarOptions as option}
                                <option value={option.value}>{option.label}</option>
                            {/each}
                        </select>
                    </div>
                {/if}

                <img
                        class="w-32 h-32 rounded-full mb-4"
                        src={editing ? editForm.foto : personalization?.foto || 'img/profiles/ocelote.svg'}
                        alt="Avatar"
                />

                {#if editing}
                    <div class="w-full mb-4">
                        <span class="block text-gray-700 text-sm font-bold mb-2">
                            Descripción
                        </span>
                        <textarea
                                bind:value={editForm.descripcion}
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows="4"
                        ></textarea>
                    </div>
                    <div class="flex gap-4">
                        <button
                                onclick={handleSaveProfile}
                                class="bg-[#f9c710] text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                        >
                            Guardar
                        </button>
                        <button
                                onclick={() => editing = false}
                                class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                {:else}
                    <h2 class="text-2xl font-bold mb-2">{user?.apodo}</h2>
                    <p class="text-gray-600 mb-4">{personalization?.descripcion || 'Sin descripción'}</p>
                    <button
                            onclick={() => editing = true}
                            class="bg-[#f9c710] text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors mb-4"
                    >
                        Editar Perfil
                    </button>
                {/if}
            </div>

            <Boton title="Cerrar Sesión" color="warn" onClick={handleLogout}/>
        </div>
    </div>
</main>
