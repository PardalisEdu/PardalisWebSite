<script>
    import {onMount} from 'svelte';
    import {spring} from "svelte/motion";
    import Boton from "$components/Boton.svelte";
    import NavBar from "$components/NavBar.svelte";

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

    const opinions = [
        {
            avatar: "img/profiles/ocelote.svg",
            name: "Poncho",
            comment: "Me sobreexplotaron laboralmente, pero aprendí inglés"
        },
        {
            avatar: "img/profiles/ajolote.svg",
            name: "Isaac",
            comment: "Yo no hice nada. 10/10"
        },
        {
            avatar: "img/profiles/xinxin.svg",
            name: "Oscar",
            comment: "Poncho entregaste un mes tarde, pero aprendí inglés 👍"
        }
    ];

</script>

<div class="min-h-screen flex flex-col bg-[url(img/fondo-inicio.svg)] bg-cover bg-center bg-no-repeat">

    <main class="grid grid-cols-2 flex-1 p-4">
        <div class="m-10 text-center grid place-content-center">
            <div>
                <h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                    ¡Bienvenido!
                </h1>


                <br/>

                <Boton title="Inicia Sesión" href="/login"/>

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
                        ¡Regístrate!
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

<section class="py-12 px-4 bg-white text-gray-900">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl text-center mb-4 font-extrabold">¿Por qué a los niños les encanta Pardalis?</h2>
        <p class="text-center text-gray-600 mb-8">Damos vida al inglés con contenidos divertidos y atractivos adaptados
            a los intereses de los niños.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {#each features as feature}
                <div class="flex flex-col items-center p-6 rounded-lg shadow transform hover:scale-105 transition-transform duration-200">
                    <img src={feature.image} alt={feature.title} class="w-full h-40 object-cover rounded-lg mb-4"/>
                    <h3 class="text-lg font-semibold text-center mb-2">{feature.title}</h3>
                    <p class="text-sm text-gray-600 text-center">{feature.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<section class="max-w-6xl mx-auto px-4 py-12 text-gray-900">
    <h2 class="text-3xl mb-12 text-center font-extrabold">
        Opiniones sobre pardalis
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {#each opinions as opinion}
            <div class="flex flex-col items-center p-6 rounded-lg shadow transform hover:scale-105 transition-transform duration-200">
                <img
                        src={opinion.avatar}
                        alt={opinion.name}
                        class="w-16 h-16 rounded-full mb-2"
                />
                <h3 class="font-bold text-lg mb-1">{opinion.name}</h3>
                <div class="flex mb-2">
                    {#each Array(5) as _, i}
                        <span class="text-yellow-400 text-xl">★</span>
                    {/each}
                </div>
                <p class="text-center text-gray-600">{opinion.comment}</p>
            </div>
        {/each}
    </div>

    <div class="py-16 px-4">
        <h2 class="text-4xl text-center mb-8 font-extrabold">Únete a la diversión</h2>
        <div class="flex justify-center">
            <Boton title="Unirse" href="/login"/>
        </div>
    </div>
</section>