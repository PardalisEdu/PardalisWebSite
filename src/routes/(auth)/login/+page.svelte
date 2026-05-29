<script lang="ts">
    import { enhance } from '$app/forms';

    let loading = $state(false);
    let errorMessage = $state('');
    let showPassword = $state(false);

    function togglePassword() {
        showPassword = !showPassword;
    }
</script>

<svelte:head>
    <title>Iniciar Sesión | Pardalis - Aprende Inglés Jugando</title>
    <meta name="description" content="Inicia sesión en Pardalis para continuar tu aventura aprendiendo inglés con situaciones reales de México." />
</svelte:head>

<div class="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-[3rem] border-4 border-yellow-100 shadow-[0_16px_0_0_#fef08a] p-10 md:p-12 relative overflow-hidden">
        <!-- Decorations -->
        <div class="absolute -top-16 -left-16 w-48 h-48 bg-yellow-100 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-100 rounded-full blur-3xl"></div>

        <div class="relative">
            <!-- Header -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 mx-auto mb-4 bg-yellow-50 rounded-full border-2 border-yellow-200 flex items-center justify-center">
                    <img src="img/profiles/ocelote.svg" alt="Ocelote" class="w-14 h-14" />
                </div>
                <h2 class="text-4xl font-black text-gray-900 mb-2">¡Bienvenido!</h2>
                <p class="text-gray-500 font-medium">Inicia sesión para continuar tu aventura</p>
            </div>

            {#if errorMessage}
                <div class="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-5 py-3 rounded-xl font-medium" role="alert">
                    {errorMessage}
                </div>
            {/if}

            <form
                method="POST"
                action="?/login"
                use:enhance={() => {
                    loading = true;
                    errorMessage = '';
                    return async ({ result, update }) => {
                        loading = false;
                        if (result.type === 'failure') {
                            errorMessage = (result.data as { message?: string })?.message ?? 'Error desconocido';
                        } else {
                            await update();
                        }
                    };
                }}
                class="space-y-6"
            >
                <div class="space-y-5">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1.5" for="correo">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            required
                            class="block w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-hidden focus:border-[#f9c710] focus:bg-white focus:ring-0 transition-all"
                            placeholder="nombre@ejemplo.com"
                            autocomplete="email"
                        />
                    </div>

                    <div class="relative">
                        <label class="block text-sm font-bold text-gray-700 mb-1.5" for="contrasenna">
                            Contraseña
                        </label>
                        <div class="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="contrasenna"
                                name="contrasenna"
                                required
                                class="block w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-hidden focus:border-[#f9c710] focus:bg-white focus:ring-0 transition-all pr-12"
                                placeholder="********"
                                autocomplete="current-password"
                            />
                            <button
                                type="button"
                                onclick={togglePassword}
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-xl"
                            >
                                {showPassword ? "🙈" : "👀"}
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    class="w-full py-4 font-black text-lg text-white bg-[#f9c710] rounded-2xl shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {#if loading}
                        <span class="flex items-center justify-center gap-2">
                            Entrando...
                            <span class="animate-spin">🌟</span>
                        </span>
                    {:else}
                        Iniciar Sesión
                    {/if}
                </button>
            </form>

            <p class="mt-8 text-center text-gray-500 font-medium">
                ¿No tienes una cuenta?{' '}
                <a href="/register" class="text-[#f9c710] hover:text-yellow-500 transition-colors font-black">
                    ¡Regístrate aquí!
                </a>
            </p>
        </div>
    </div>
</div>