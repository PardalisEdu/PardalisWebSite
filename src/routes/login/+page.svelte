<script lang="ts">
    import { enhance } from '$app/forms';

    let loading = $state(false);
    let errorMessage = $state('');
    let showPassword = $state(false);

    function togglePassword() {
        showPassword = !showPassword;
    }
</script>

<div class="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full space-y-8 bg-white rounded-3xl shadow-xl p-10 relative overflow-hidden">
        <!-- Elementos decorativos -->
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-50"></div>
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full opacity-50"></div>

        <div class="relative">
            <!-- Encabezado -->
            <div class="text-center">
                <h2 class="text-4xl font-bold text-gray-900 mb-2">¡Bienvenido!</h2>
                <img src="img/profiles/ocelote.svg" alt="Logo Pardalis" class="w-24 h-24 mx-auto"/>
                <p class="mt-2 text-gray-600">Inicia sesión para continuar tu aventura</p>
            </div>

            {#if errorMessage}
                <div class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-sm relative" role="alert">
                    <span class="block sm:inline">{errorMessage}</span>
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
                class="mt-8 space-y-6"
            >
                <div class="space-y-4">
                    <!-- Campo de correo -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="correo">
                            Correo electrónico
                        </label>
                        <input
                                type="email"
                                id="correo"
                                name="correo"
                                required
                                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                placeholder="nombre@ejemplo.com"
                                autocomplete="email"
                        />
                    </div>

                    <!-- Campo de contraseña -->
                    <div class="relative">
                        <label class="block text-sm font-medium text-gray-700" for="contrasenna">
                            Contraseña
                        </label>
                        <input
                                type={showPassword ? "text" : "password"}
                                id="contrasenna"
                                name="contrasenna"
                                required
                                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                placeholder="********"
                                autocomplete="current-password"
                        />
                        <button
                                type="button"
                                onclick={togglePassword}
                                class="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? "🙈" : "👀"}
                        </button>
                    </div>
                </div>

                <button
                        type="submit"
                        disabled={loading}
                        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-xs text-sm font-medium text-black bg-[#f9c710] hover:bg-yellow-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                >
                    {#if loading}
                        <span class="flex items-center">
                            Cargando...
                            <span class="ml-2 animate-spin">🌟</span>
                        </span>
                    {:else}
                        Iniciar Sesión
                    {/if}
                </button>
            </form>

            <p class="mt-6 text-center text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <a href="/register" class="font-medium text-[#f9c710] hover:text-yellow-500">
                    ¡Regístrate aquí!
                </a>
            </p>
        </div>
    </div>
</div>