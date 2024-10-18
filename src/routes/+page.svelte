<script>
    import NavBar from "$lib/components/NavBar.svelte";
    import {onMount} from 'svelte';
    import {spring} from "svelte/motion";
    import Boton from "$lib/components/Boton.svelte";

    const logoMotion = spring({scale: 0, rotate: 0}, {
        stiffness: 0.1,
        damping: 0.2
    });

    onMount(() => {
        logoMotion.set({scale: 1, rotate: 360});
    });

    function handleLogoInteraction() {
        logoMotion.update(($motion) => ({
            scale: 2.5,
            rotate: $motion.rotate + 360
        }));
    }

    /**
     *
     * @param {any} event
     */
    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            handleLogoInteraction();
        }
    }
</script>

<NavBar/>

<div class="min-h-screen flex flex-col bg-[url(img/fondo-inicio.svg)] bg-cover bg-center bg-no-repeat">

    <main class="grid grid-cols-2 flex-1 p-4">
        <div class="m-10 text-center grid place-content-center">
            <div>
                <h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                    ¡Bienvenido!
                </h1>


                <br/>
                <a href="/login" class="mb-10">
                    <Boton title="Inicia Sesión" href="/login"/>
                </a>

                <br/>
                <p class="mb-5 mt-10">
                    ¿Todavía no tienes una cuenta?
                </p>

                <div class="rounded-xl w-9/12 p-4 m-auto">
                    <a
                            href="/register"
                            class="text-4xl font-black hover:underline"
                            style="color: #f9c710;"
                    >
                        Regístrate
                    </a>
                </div>
            </div>
        </div>
        <div class="grid place-content-center">
            <button
                    on:click={handleLogoInteraction}
                    on:keydown={handleKeyDown}
                    style="transform: scale({$logoMotion.scale}) rotate({$logoMotion.rotate}deg);"
                    aria-label="Animar logo"
            >
                <img
                        src="favicon.png"
                        alt="Logo Pardalis"
                        width={300}
                        height={300}
                />
            </button>
        </div>

    </main>

</div>