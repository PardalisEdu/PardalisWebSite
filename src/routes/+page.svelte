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

    const features = [
        {
            title: "Personajes divertidos",
            description: "Diseña nuestros entrañables personajes en su viaje de aprendizaje del inglés.",
            image: "/path/to/personajes-divertidos.png"
        },
        {
            title: "Juegos interactivos",
            description: "Aprende es divertido con nuestros juegos interactivos y atractivos.",
            image: "/path/to/juegos-interactivos.png"
        },
        {
            title: "Audios Simples",
            description: "Escucha audios con fonética simple para que sea fácil para todos entenderlos y replicarlos.",
            image: "/path/to/audios-simples.png"
        },
        {
            title: "Explora historias interesantes",
            description: "Explora nuestras emocionantes historias interactivas y aprende inglés sobre la marcha.",
            image: "/path/to/historias-interesantes.png"
        }
    ];
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

<section class="py-12 px-4 bg-white">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-4">¿Por qué a los niños les encanta Pardalis?</h2>
        <p class="text-center text-gray-600 mb-8">Damos vida al inglés con contenidos divertidos y atractivos adaptados a los intereses de los niños.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {#each features as feature}
                <div class="flex flex-col items-center">
                    <img src={feature.image} alt={feature.title} class="w-full h-40 object-cover rounded-lg mb-4"/>
                    <h3 class="text-lg font-semibold text-center mb-2">{feature.title}</h3>
                    <p class="text-sm text-gray-600 text-center">{feature.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>