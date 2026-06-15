<script lang="ts">
    import { goto } from "$app/navigation";

    let formData = $state({
        apodo: '',
        nombre: '',
        correo: '',
        contrasenna: '',
        confirmarContrasenna: ''
    });

    let loading = $state(false);
    let errorMessage = $state('');
    let showPassword = $state(false);
    let showConfirmPassword = $state(false);
    let passwordError = $state(false);

    $effect(() => {
        if (formData.confirmarContrasenna) {
            passwordError = formData.contrasenna !== formData.confirmarContrasenna;
        }
    });

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        loading = true;
        errorMessage = '';

        if (formData.contrasenna !== formData.confirmarContrasenna) {
            errorMessage = 'Las contraseñas no coinciden';
            loading = false;
            return;
        }

        try {
            const { confirmarContrasenna, ...registerData } = formData;
            await goto('/login');
        } catch (error: unknown) {
            errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error desconocido';
        } finally {
            loading = false;
        }
    }

    function togglePassword(field: string) {
        if (field === 'password') {
            showPassword = !showPassword;
        } else {
            showConfirmPassword = !showConfirmPassword;
        }
    }

    const adjetivos = ['Valiente', 'Astuto', 'Alegre', 'Veloz', 'Super', 'Mega'];
    const animales = ['Ocelote', 'Jaguar', 'Quetzal', 'Ajolote', 'Águila', 'Lobo'];

    function generarApodoAleatorio() {
        const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
        const animal = animales[Math.floor(Math.random() * animales.length)];
        const numero = Math.floor(Math.random() * 100);
        formData.apodo = `${adjetivo}${animal}${numero}`;
    }
</script>

<svelte:head>
    <title>Registro | Únete a Pardalis y Aprende Inglés</title>
    <meta name="description" content="Crea tu cuenta gratuita en Pardalis y comienza a aprender inglés con mini-juegos divertidos y contexto mexicano." />
</svelte:head>

<div class="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-4">
    <div class="mt-20 max-w-md w-full bg-white rounded-[3rem] border-4 border-yellow-100 shadow-[0_16px_0_0_#fef08a] p-10 md:p-12 relative overflow-hidden my-8">


        <div class="relative">
            <div class="text-center mb-8">
                <div class="w-20 h-20 mx-auto mb-4 bg-yellow-50 rounded-full border-2 border-yellow-200 flex items-center justify-center">
                    <img src="img/profiles/ajolote.svg" alt="Ajolote" class="w-14 h-14" />
                </div>
                <h2 class="text-4xl font-black text-gray-900 mb-2">¡Únete a la aventura!</h2>
                <p class="text-gray-500 font-medium">Crea tu cuenta y comienza a aprender</p>
            </div>

            {#if errorMessage}
                <div class="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-5 py-3 rounded-xl font-medium" role="alert">
                    {errorMessage}
                </div>
            {/if}

            <form onsubmit={handleSubmit} class="space-y-5">
                <!-- Nickname -->
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1.5" for="apodo">
                        Apodo
                    </label>
                    <div class="flex gap-2">
                        <input
                            type="text"
                            id="apodo"
                            name="apodo"
                            required
                            bind:value={formData.apodo}
                            class="block w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all"
                            placeholder="TuApodoGenial123"
                        />
                        <button
                            type="button"
                            onclick={generarApodoAleatorio}
                            class="shrink-0 px-4 py-3 bg-[#f9c710] text-black rounded-xl font-bold hover:bg-yellow-500 transition-colors shadow-[0_3px_0_0_#d4a007] hover:shadow-none hover:translate-y-0.5 active:scale-95"
                            title="Generar apodo aleatorio"
                        >
                            🎲
                        </button>
                    </div>
                </div>

                <!-- Name -->
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1.5" for="nombre">
                        Nombre completo
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        bind:value={formData.nombre}
                        class="block w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all"
                        placeholder="Tu nombre completo"
                    />
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1.5" for="correo">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        required
                        bind:value={formData.correo}
                        class="block w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all"
                        placeholder="nombre@ejemplo.com"
                        autocomplete="email"
                    />
                </div>

                <!-- Password -->
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
                            bind:value={formData.contrasenna}
                            class="block w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all pr-12"
                            placeholder="********"
                            autocomplete="new-password"
                        />
                        <button
                            type="button"
                            onclick={() => togglePassword('password')}
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-xl"
                        >
                            {showPassword ? "🙈" : "👀"}
                        </button>
                    </div>
                </div>

                <!-- Confirm password -->
                <div class="relative">
                    <label class="block text-sm font-bold text-gray-700 mb-1.5" for="confirmarContrasenna">
                        Confirmar contraseña
                    </label>
                    <div class="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmarContrasenna"
                            name="confirmarContrasenna"
                            required
                            bind:value={formData.confirmarContrasenna}
                            class="block w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all pr-12"
                            placeholder="********"
                            autocomplete="new-password"
                        />
                        <button
                            type="button"
                            onclick={() => togglePassword('confirm')}
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-xl"
                        >
                            {showConfirmPassword ? "🙈" : "👀"}
                        </button>
                    </div>
                </div>

                {#if passwordError}
                    <div class="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-3 rounded-xl font-medium">
                        Las contraseñas no coinciden
                    </div>
                {/if}

                <button
                    type="submit"
                    disabled={loading || passwordError}
                    class="w-full py-4 font-black text-lg text-white bg-[#f9c710] rounded-2xl shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {#if loading}
                        <span class="flex items-center justify-center gap-2">
                            Registrando...
                            <span class="animate-spin">🌟</span>
                        </span>
                    {:else}
                        ¡Crear cuenta!
                    {/if}
                </button>
            </form>

            <div class="my-8 flex items-center gap-4">
                <div class="h-px flex-1 bg-gray-100"></div>
                <span class="text-xs font-black text-gray-400 uppercase tracking-widest">o únete con</span>
                <div class="h-px flex-1 bg-gray-100"></div>
            </div>

            <button
                type="button"
                onclick={async () => {
                    const { authClient } = await import('$lib/client/auth-client');
                    await authClient.signIn.social({ provider: 'google' });
                }}
                class="w-full py-4 px-6 bg-white border-4 border-gray-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-gray-600 shadow-[0_6px_0_0_#f3f4f6] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150"
            >
                <svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                </svg>
                Google
            </button>

            <p class="mt-8 text-center text-gray-500 font-medium">
                ¿Ya tienes una cuenta?{' '}
                <a href="/login" class="text-[#f9c710] hover:text-yellow-500 transition-colors font-black">
                    ¡Inicia sesión aquí!
                </a>
            </p>
        </div>
    </div>
</div>