<script>
    import { onMount } from 'svelte';
    let isLoggedIn = $state(false);
    let showBanner = $state(true);

    onMount(() => {
        const bannerClosed = localStorage.getItem('bannerClosed');
        if (bannerClosed === 'true') {
            showBanner = false;    
        }

        checkAuthStatus();
    });

    function checkAuthStatus() {
        const token = localStorage.getItem('auth_token');
        isLoggedIn = !!token;
    }

    function handleLogout() {
        // Eliminar el token
        localStorage.removeItem('auth_token');
        // Actualizar el estado
        isLoggedIn = false;
        // Redirigir al inicio
        window.location.href = '/';
    }

    function closeBanner() {
        showBanner = false;
        localStorage.setItem('bannerClosed', 'true')
    }
</script>

{#if showBanner}
    <div class="fixed top-0 left-0 right-0 bg-yellow-100 border-b border-yellow-200 z-40">
        <div class="max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between flex-wrap">
                <div class="w-0 flex-1 flex items-center min-w-0">
					<span class="flex p-2">
						<span role="img" aria-label="cow" class="text-xl">
							🐄
						</span>
					</span>
                    <p class="ml-3 font-medium text-yellow-900 truncate">
                        <span>¡Apoya a la Vaca para Presidente 2024! Porque necesitamos más leche y menos promesas en el gobierno</span>
                        <a href="#cow" class="ml-2 text-yellow-800 font-bold underline">
                            #VacaPresidente2024
                        </a>
                    </p>
                </div>
                <div class="flex-shrink-0 sm:ml-3">
                    <button
                            onclick={closeBanner}
                            type="button"
                            class="flex p-2 rounded-md hover:bg-yellow-200 transition-colors duration-200 focus:outline-none"
                    >
                        <span class="sr-only">Descartar</span>
                        <svg class="h-5 w-5 text-yellow-900" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<nav class="fixed top-0 left-0 right-0 flex justify-between w-full p-7 font-bold text-[#f9c710] bg-white shadow-sm z-30"
     style="top: {showBanner ? '48px' : '0'}">
    <div class="grid place-content-center">
        <a href="/" class="text-3xl">PARDALIS</a>
    </div>
    <div class="text-xl">
        <a href="/adventure" class="ml-7">AVENTURA</a>
        <a href="/profile" class="ml-7">PERFIL</a>

        {#if !isLoggedIn}
            <a href="/login" class="ml-7 p-3 bg-[#f9c710] text-white rounded-lg">Inicia Sesión</a>
        {:else}
            <button
                    onclick={handleLogout}
                    class="ml-7 p-3 bg-[#f9c710] text-white rounded-lg hover:bg-yellow-500 transition-colors"
            >
                Cerrar Sesión
            </button>
        {/if}
    </div>
</nav>

<style>
    /* Asegurar que los enlaces y botones tengan la misma apariencia en hover */
    a:hover, button:hover {
        cursor: pointer;
    }
</style>