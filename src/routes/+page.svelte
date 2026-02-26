<script lang="ts">
    import Boton from "$components/Boton.svelte";
    import {onMount} from 'svelte';
    import { spring } from 'svelte/motion';
	import { fly, fade } from 'svelte/transition';

	// Estado para el "secreto" del logo
	let clickCount = $state(0);
	let isHovered = $state(false);

	// Configuración de movimiento físico (Spring) más veloz y elástico
	const logoScale = spring(1, {
		stiffness: 0.25, // Más rígido para velocidad
		damping: 0.3    // Menos amortiguación para más "boing"
	});

	const logoRotate = spring(0, {
		stiffness: 0.25,
		damping: 0.3
	});

	function handleLogoInteraction() {
		clickCount++;
		// Efecto de crecimiento más explosivo
		const newScale = 1.4 + (clickCount * 0.04 % 0.2); 
		// Rotación más amplia para dinamismo
		const randomRotate = Math.random() * 40 - 20;

		logoScale.set(newScale);
		logoRotate.set(randomRotate);

		// Regresa a la normalidad velozmente para permitir spam de clicks
		setTimeout(() => {
			logoScale.set(1);
			logoRotate.set(0);
		}, 180); 
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			handleLogoInteraction();
		}
	}

    const logoMotion = spring({scale: 0, rotate: 0}, {
        stiffness: 0.1,
        damping: 0.2
    });

    onMount(() => {
        logoMotion.set({scale: 1, rotate: 360});
    });

    const features = [
        {
            title: "Personajes divertidos",
            description: "Diseña nuestros entrañables personajes en su viaje de aprendizaje del inglés.",
            image: "img/12.png"
        },
        {
            title: "Juegos interactivos",
            description: "Aprende es divertido con nuestros juegos interactivos y atractivos.",
            image: "img/11.png"
        },
        {
            title: "Audios Simples",
            description: "Escucha audios con fonética simple para que sea fácil para todos entenderlos y replicarlos.",
            image: "img/10.png"
        },
        {
            title: "Explora historias interesantes",
            description: "Explora nuestras emocionantes historias interactivas y aprende inglés sobre la marcha.",
            image: "img/12.png"
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

<div class="relative min-h-screen flex flex-col overflow-hidden bg-[#FFFDF5] font-sans">
	
	<!-- --- CAPA DE FONDO DINÁMICA --- -->
	<div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
		<!-- Patrón de puntos sutil -->
		<svg width="100%" height="100%" class="opacity-20">
			<pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
				<circle cx="2" cy="2" r="2" fill="#f9c710" />
			</pattern>
			<rect width="100%" height="100%" fill="url(#dots)" />
		</svg>

		<!-- Blobs decorativos (Animados con CSS) -->
		<div class="absolute -top-20 -left-20 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute top-1/2 -right-20 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl"></div>
		<div class="absolute -bottom-10 left-1/4 w-64 h-64 bg-blue-100/30 rounded-full blur-2xl"></div>
	</div>

	<!-- --- CONTENIDO PRINCIPAL --- -->
	<main class="relative z-10 grid grid-cols-1 md:grid-cols-2 flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 items-center">
		
		<!-- Lado Izquierdo: Textos y CTAs -->
		<div 
			in:fly={{ x: -50, duration: 800, delay: 200 }}
			class="flex flex-col space-y-8 text-center md:text-left"
		>
			<header>
				<h1 class="text-6xl md:text-8xl font-black text-gray-900 leading-none">
					¡Hola <span class="text-[#f9c710] inline-block hover:rotate-3 transition-transform cursor-default">Amigo!</span>
				</h1>
				<p class="mt-6 text-xl md:text-2xl text-gray-600 font-medium max-w-md mx-auto md:mx-0">
					Aprende inglés de forma <span class="text-blue-500 font-bold">divertida</span> con Pardalis.
				</p>
			</header>

			<div class="flex flex-col items-center md:items-start gap-8">
				<!-- Botón Principal Flat 2.0 -->
				<a
					href="/login"
					class="group relative inline-flex items-center justify-center px-12 py-5 font-black text-2xl text-white bg-[#f9c710] rounded-3xl 
                    shadow-[0_10px_0_0_#d4a007] hover:shadow-[0_4px_0_0_#d4a007] hover:translate-y-1.5 transition-all duration-150 active:scale-95"
				>
					Inicia Sesión
				</a>

				<div class="space-y-2">
					<p class="text-gray-400 font-bold uppercase tracking-wider text-sm">¿Eres nuevo aquí?</p>
					<a
						href="/register"
						class="text-4xl md:text-5xl font-black text-[#f9c710] hover:text-yellow-500 transition-colors 
                        underline decoration-[10px] decoration-yellow-200 underline-offset-8 hover:decoration-yellow-400"
					>
						¡Regístrate!
					</a>
				</div>
			</div>
		</div>

		<div class="relative flex justify-center items-center mt-12 md:mt-0">
			<!-- Resplandor detrás del logo -->
			<div class="absolute w-64 h-64 md:w-[500px] md:h-[500px] bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>

			<button
				onclick={handleLogoInteraction}
				onkeydown={handleKeyDown}
				onmouseenter={() => (isHovered = true)}
				onmouseleave={() => (isHovered = false)}
				class="relative z-20 cursor-pointer focus:outline-none transition-filter duration-300"
				style="transform: scale({$logoScale}) rotate({$logoRotate}deg); filter: drop-shadow(0 20px 30px rgba(249, 199, 16, 0.2));"
				aria-label="Interactuar con Pardalis"
			>
				<img
					src="favicon.svg"
					alt="Logo Pardalis"
					class="w-64 h-64 md:w-120 md:h-120 object-contain"
				/>

				<!-- Tooltip sorpresa para niños -->
				{#if isHovered}
					<div 
						transition:fade={{ duration: 200 }}
						class="absolute -top-10 -right-4 bg-white px-4 py-2 rounded-2xl shadow-xl border-2 border-yellow-100 font-bold text-gray-700 whitespace-nowrap"
					>
						¡Hazme click! ✨
					</div>
				{/if}
			</button>

			<!-- Sombra en el suelo para dar profundidad -->
			<div class="absolute bottom-0 w-48 h-6 bg-gray-900/5 blur-xl rounded-[100%]"></div>
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
                <div class="flex flex-col items-center p-6 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-200">
                    <img
                            src={feature.image}
                            alt={feature.title}
                            class="rounded-md"
                    />
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
            <div class="flex flex-col items-center p-6 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-200">
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

<style>
	@keyframes pulse-slow {
		0%, 100% { transform: scale(1); opacity: 0.4; }
		50% { transform: scale(1.1); opacity: 0.6; }
	}
	.animate-pulse {
		animation: pulse-slow 8s infinite ease-in-out;
	}
</style>