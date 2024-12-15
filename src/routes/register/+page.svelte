<!-- Register.svelte -->
<script>
    import {goto} from "$app/navigation";
    import {register} from '$lib/api/auth';

    // Estados del formulario
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

    // Validación de contraseñas en tiempo real
    $effect(() => {
        if (formData.confirmarContrasenna) {
            passwordError = formData.contrasenna !== formData.confirmarContrasenna;
        }
    });

    /**
     * @param {SubmitEvent} event
     */
    async function handleSubmit(event) {
        event.preventDefault();
        loading = true;
        errorMessage = '';

        // Validar que las contraseñas coincidan
        if (formData.contrasenna !== formData.confirmarContrasenna) {
            errorMessage = 'Las contraseñas no coinciden';
            loading = false;
            return;
        }

        try {
            const {confirmarContrasenna, ...registerData} = formData;
            await register(registerData);
            await goto('/login');
        } catch (/** @type {unknown} */ error) {
            if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = 'Ha ocurrido un error desconocido';
            }
        } finally {
            loading = false;
        }
    }


    /**
     * @param {string} field
     */
    function togglePassword(field) {
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

<div class="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
    <div class="mt-28 max-w-md w-full space-y-8 bg-white rounded-3xl shadow-xl p-10 relative overflow-hidden my-8">
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-50"></div>
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full opacity-50"></div>

        <div class="relative">
            <div class="text-center">
                <h2 class="text-4xl font-bold text-gray-900 mb-2">¡Únete a la aventura!</h2>
                <img src="img/profiles/ajolote.svg" alt="Logo Pardalis" class="w-24 h-24 mx-auto"/>
                <p class="mt-2 text-gray-600">Crea tu cuenta y comienza a aprender</p>
            </div>

            {#if errorMessage}
                <div class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span class="block sm:inline">{errorMessage}</span>
                </div>
            {/if}

            <form onsubmit={handleSubmit} class="mt-8 space-y-6">
                <div class="space-y-4">
                    <!-- Campo de apodo -->
                    <div class="relative">
                        <label class="block text-sm font-medium text-gray-700" for="apodo">
                            Apodo
                        </label>
                        <div class="flex gap-2">
                            <input
                                    type="text"
                                    id="apodo"
                                    name="apodo"
                                    required
                                    bind:value={formData.apodo}
                                    class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="TuApodoGenial123"
                            />
                            <button
                                    type="button"
                                    onclick={generarApodoAleatorio}
                                    class="mt-1 px-3 py-2 bg-[#f9c710] text-black rounded-lg hover:bg-yellow-500 transition-colors"
                                    title="Generar apodo aleatorio"
                            >
                                🎲
                            </button>
                        </div>
                    </div>

                    <!-- Campo de nombre -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700" for="nombre">
                            Nombre completo
                        </label>
                        <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                required
                                bind:value={formData.nombre}
                                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                placeholder="Tu nombre completo"
                        />
                    </div>

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
                                bind:value={formData.correo}
                                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                placeholder="nombre@ejemplo.com"
                                autocomplete="email"
                        />
                    </div>

                    <!-- Campo de contraseña -->
                    <div class="relative">
                        <label class="block text-sm font-medium text-gray-700" for="contrasenna">
                            Contraseña
                        </label>
                        <div class="relative">
                            <input
                                    type={showPassword ? "text" : "password"}
                                    id="contrasenna"
                                    name="contrasenna"
                                    required
                                    bind:value={formData.contrasenna}
                                    class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="********"
                                    autocomplete="new-password"
                            />
                            <button
                                    type="button"
                                    onclick={() => togglePassword('password')}
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? "🙈" : "👀"}
                            </button>
                        </div>
                    </div>

                    <!-- Campo de confirmar contraseña -->
                    <div class="relative">
                        <label class="block text-sm font-medium text-gray-700" for="confirmarContrasenna">
                            Confirmar contraseña
                        </label>
                        <div class="relative">
                            <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmarContrasenna"
                                    name="confirmarContrasenna"
                                    required
                                    bind:value={formData.confirmarContrasenna}
                                    class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="********"
                                    autocomplete="new-password"
                            />
                            <button
                                    type="button"
                                    onclick={() => togglePassword('confirm')}
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? "🙈" : "👀"}
                            </button>
                        </div>
                    </div>

                    {#if passwordError}
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            Las contraseñas no coinciden
                        </div>
                    {/if}
                </div>

                <button
                        type="submit"
                        disabled={loading || passwordError}
                        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-[#f9c710] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200 disabled:opacity-50"
                >
                    {#if loading}
                        <span class="flex items-center">
                            Registrando...
                            <span class="ml-2 animate-spin">🌟</span>
                        </span>
                    {:else}
                        ¡Crear cuenta!
                    {/if}
                </button>
            </form>

            <p class="mt-6 text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <a href="/login" class="font-medium text-[#f9c710] hover:text-yellow-500">
                    ¡Inicia sesión aquí!
                </a>
            </p>
        </div>
    </div>
</div>