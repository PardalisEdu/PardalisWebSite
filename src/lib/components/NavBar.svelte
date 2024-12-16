<script>
    import { onMount } from 'svelte';
    import { authStore } from '$lib/stores/authStore';

    let isLoggedIn = $state(false);
    let showBanner = $state(true);
    let isMenuOpen = $state(false);

    $effect(() => {
        isLoggedIn = $authStore.isAuthenticated;
    });

    onMount(() => {
        const bannerClosed = localStorage.getItem('bannerClosed');
        if (bannerClosed === 'true') {
            showBanner = false;
        }

        checkAuthStatus();
    });

    function checkAuthStatus() {
        const token = localStorage.getItem('token');
        isLoggedIn = !!token;
    }

    function handleLogout() {
        localStorage.removeItem('token');
        isLoggedIn = false;
        window.location.href = '/';
    }

    function closeBanner() {
        showBanner = false;
        localStorage.setItem('bannerClosed', 'true')
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
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
                        <span class="md:hidden">¡Vaca Presidente 2024!</span>
                        <span class="hidden md:inline">¡Apoya a la Vaca para Presidente 2024! Porque necesitamos más leche y menos promesas en el gobierno</span>
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

<nav class="fixed top-0 left-0 right-0 flex flex-col md:flex-row justify-between w-full p-4 md:p-7 font-bold text-[#f9c710] bg-white shadow-sm z-30"
     style="top: {showBanner ? '48px' : '0'}">
    <div class="grid place-content-center">
        <a href="/" class="text-3xl">PARDALIS</a>
        <button
                class="md:hidden p-2 text-[#f9c710] hover:bg-yellow-50 rounded m-auto block"
                onclick={toggleMenu}
                aria-label="Toggle menu"
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {#if isMenuOpen}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                {:else}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-16 6h16"/>
                {/if}
            </svg>
        </button>
    </div>

    <div class="{isMenuOpen ? 'flex' : 'hidden'} items-center md:flex flex-col md:flex-row mt-4 md:mt-0 space-y-4 md:space-y-0 text-xl">
        <a href="/adventure" class="md:ml-7 hover:text-yellow-600 transition-colors">AVENTURA</a>
        <a href="/blog" class="md:ml-7 hover:text-yellow-600 transition-colors">BLOG</a>
        <a href="/mini-games" class="md:ml-7 hover:text-yellow-600 transition-colors">MINI-JUEGOS</a>
        {#if isLoggedIn}
            <a href="/profile" class="md:ml-7 hover:text-yellow-600 transition-colors">PERFIL</a>
        {/if}

        {#if !isLoggedIn}
            <a href="/login" class="md:ml-7 p-3 bg-[#f9c710] text-white rounded-lg hover:bg-yellow-500 transition-colors">
                Inicia Sesión
            </a>
        {:else}
            <button
                    onclick={handleLogout}
                    class="md:ml-7 p-3 bg-[#f9c710] text-white rounded-lg hover:bg-yellow-500 transition-colors"
            >
                Cerrar Sesión
            </button>
        {/if}
    </div>
</nav>

<style>
    nav {
        transition: top 0.3s ease-in-out;
    }

    a:hover, button:hover {
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .flex-col > * {
            animation: slideIn 0.3s ease-out;
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
