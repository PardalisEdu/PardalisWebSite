<script lang="ts">
    import Boton from "$components/Boton.svelte";
    import {onMount} from 'svelte';
    import { spring } from 'svelte/motion';
	import { fly, fade } from 'svelte/transition';

	let clickCount = $state(0);
	let isHovered = $state(false);

	const logoScale = spring(1, {
		stiffness: 0.25,
		damping: 0.3
	});

	const logoRotate = spring(0, {
		stiffness: 0.25,
		damping: 0.3
	});

	function handleLogoInteraction() {
		clickCount++;
		const newScale = 1.4 + (clickCount * 0.04 % 0.2); 
		const randomRotate = Math.random() * 40 - 20;

		logoScale.set(newScale);
		logoRotate.set(randomRotate);

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
	
	<!-- Background layer -->
	<div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
		<svg width="100%" height="100%" class="opacity-20">
			<pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
				<circle cx="2" cy="2" r="2" fill="#f9c710" />
			</pattern>
			<rect width="100%" height="100%" fill="url(#dots)" />
		</svg>

		<div class="absolute -top-20 -left-20 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl animate-pulse-slow"></div>
		<div class="absolute top-1/3 -right-20 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl animate-float"></div>
		<div class="absolute -bottom-10 left-1/3 w-64 h-64 bg-blue-100/30 rounded-full blur-2xl"></div>
	</div>

	<!-- Hero -->
	<main class="relative z-10 grid grid-cols-1 md:grid-cols-2 flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 items-center">
		
		<!-- Left side -->
		<div 
			in:fly={{ x: -50, duration: 800, delay: 200 }}
			class="flex flex-col space-y-8 text-center md:text-left"
		>
			<header>
				<div class="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-200 text-yellow-800 px-4 py-1.5 rounded-full font-bold text-sm mb-6 shadow-[0_2px_0_0_#fde047]">
					<span>🇲🇽</span>
					Inglés muy a la mexicana
				</div>
				<h1 class="text-6xl md:text-8xl font-black text-gray-900 leading-none">
					¡Hola <span class="text-[#f9c710] inline-block hover:rotate-3 transition-transform cursor-default">Amigo</span>!
				</h1>
				<p class="mt-6 text-xl md:text-2xl text-gray-600 font-medium max-w-md mx-auto md:mx-0">
					Aprende inglés de forma <span class="text-blue-500 font-bold">divertida</span> con Pardalis.
				</p>
			</header>

			<div class="flex flex-col items-center md:items-start gap-8">
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
                        underline decoration-10 decoration-yellow-200 underline-offset-8 hover:decoration-yellow-400"
					>
						¡Regístrate!
					</a>
				</div>
			</div>
		</div>

		<!-- Right side - logo -->
		<div class="relative flex justify-center items-center mt-12 md:mt-0">
			<div class="absolute w-64 h-64 md:w-125 md:h-125 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-slow"></div>

			<button
				onclick={handleLogoInteraction}
				onkeydown={handleKeyDown}
				onmouseenter={() => (isHovered = true)}
				onmouseleave={() => (isHovered = false)}
				class="relative z-20 cursor-pointer focus:outline-hidden transition-filter duration-300"
				style="transform: scale({$logoScale}) rotate({$logoRotate}deg); filter: drop-shadow(0 20px 30px rgba(249, 199, 16, 0.2));"
				aria-label="Interactuar con Pardalis"
			>
				<img
					src="favicon.svg"
					alt="Logo Pardalis"
					class="w-64 h-64 md:w-120 md:h-120 object-contain"
				/>

				{#if isHovered}
					<div 
						transition:fade={{ duration: 200 }}
						class="absolute -top-10 -right-4 bg-white px-4 py-2 rounded-2xl shadow-xl border-2 border-yellow-100 font-bold text-gray-700 whitespace-nowrap"
					>
						¡Hazme click! ✨
					</div>
				{/if}
			</button>

			<div class="absolute bottom-0 w-48 h-6 bg-gray-900/5 blur-xl rounded-[100%]"></div>
		</div>
	</main>
</div>

<!-- Why Pardalis section -->
<div class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FFFDF5] font-sans py-20">
	<div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
		<svg width="100%" height="100%" class="opacity-20">
			<pattern id="dots-why" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
				<circle cx="2" cy="2" r="2" fill="#f9c710" />
			</pattern>
			<rect width="100%" height="100%" fill="url(#dots-why)" />
		</svg>

		<div class="absolute top-10 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow"></div>
		<div class="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"></div>
		<div class="absolute top-1/2 left-1/3 w-72 h-72 bg-green-100/30 rounded-full blur-2xl animate-pulse-slow"></div>
	</div>

	<section class="relative z-10 w-full max-w-7xl mx-auto px-6">
		
		<!-- Section header -->
		<div class="text-center max-w-3xl mx-auto mb-16 md:mb-24">
			<div class="inline-block mb-4 px-6 py-2 bg-yellow-100 border-2 border-yellow-300 rounded-full shadow-[0_4px_0_0_#fde047] transform -rotate-2">
				<span class="text-yellow-800 font-bold uppercase tracking-widest text-sm">Conoce el proyecto</span>
			</div>
			<h2 class="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
				¿Por qué elegir <span class="text-[#f9c710] relative inline-block">
					Pardalis?
					<svg class="absolute -bottom-2 left-0 w-full h-4 text-yellow-300 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
						<path d="M0 15 Q 50 0 100 15 L 100 20 L 0 20 Z" fill="currentColor"></path>
					</svg>
				</span>
			</h2>
			<p class="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
				Sabemos que aprender un nuevo idioma en México puede ser un gran reto. Por eso, nuestro equipo ideó una forma diferente y natural para que los niños dominen el inglés sin aburrirse.
			</p>
		</div>

		<!-- Cards grid -->
		<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
			
			<!-- Card 1: Tool -->
			<div
                in:fade={{ duration: 500, delay: 100 }}
                class="md:col-span-7 group bg-white p-8 md:p-12 rounded-[2.5rem] border-4 border-blue-200 shadow-[0_12px_0_0_#bfdbfe] hover:-translate-y-2 hover:shadow-[0_16px_0_0_#bfdbfe] transition-all duration-300 flex flex-col md:flex-row gap-8 items-center"
            >
				<div class="shrink-0 w-32 h-32 bg-blue-100 rounded-4xl border-4 border-blue-300 shadow-[0_6px_0_0_#93c5fd] flex items-center justify-center text-6xl group-hover:rotate-6 group-hover:scale-110 transition-transform">
					🎒
				</div>
				<div>
					<div class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
						<span>💡</span> ¿Sabías que...?
					</div>
					<h3 class="text-3xl font-black text-gray-900 mb-4">Tu Mejor Aliado</h3>
					<p class="text-lg text-gray-600 font-medium leading-relaxed">
						No venimos a reemplazar las clases de la escuela, ¡sino a darles un súper poder! Somos la herramienta perfecta para que los niños practiquen, refuercen y se acerquen al inglés fuera del aula con mucha seguridad.
					</p>
				</div>
			</div>

			<!-- Card 2: Mexican situations -->
			<div
                in:fade={{ duration: 500, delay: 200 }}
                class="md:col-span-5 group bg-white p-8 md:p-10 rounded-[2.5rem] border-4 border-green-200 shadow-[0_12px_0_0_#bbf7d0] hover:-translate-y-2 hover:shadow-[0_16px_0_0_#bbf7d0] transition-all duration-300 flex flex-col justify-center relative overflow-hidden"
            >
				<div class="absolute -right-10 -top-10 text-9xl opacity-10 rotate-12 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-700">🌵</div>
				
				<div class="w-24 h-24 mb-6 bg-green-100 rounded-full border-4 border-green-300 shadow-[0_6px_0_0_#86efac] flex items-center justify-center text-5xl group-hover:-translate-y-2 transition-transform">
					🌮
				</div>
				<h3 class="text-3xl font-black text-gray-900 mb-4 z-10">Inglés muy a la Mexicana</h3>
				<p class="text-lg text-gray-600 font-medium leading-relaxed z-10">
					¿Cafe o té? ¡Mejor vamos por las tortillas o al tianguis! Enseñamos con situaciones típicas de un niño mexicano para que conecten de inmediato.
				</p>
			</div>

			<!-- Card 3: Fun banner -->
			<div
                in:fade={{ duration: 500, delay: 300 }}
                class="md:col-span-12 group bg-[#f9c710] p-8 md:p-14 rounded-[3rem] border-4 border-yellow-500 shadow-[0_16px_0_0_#d4a007] hover:-translate-y-2 hover:shadow-[0_20px_0_0_#d4a007] transition-all duration-300 mt-4 md:mt-8"
            >
				<div class="flex flex-col md:flex-row items-center justify-between gap-10">
					<div class="flex-1 text-center md:text-left">
						<h3 class="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-sm">
							100% Diversión (y Aprendizaje)
						</h3>
						<p class="text-xl text-yellow-900 font-bold leading-relaxed max-w-3xl">
							Cero aburrimiento. No somos la típica plataforma seria; aquí los niños sienten que están en un videojuego interactivo. Queremos que olviden que están aprendiendo inglés de forma "tradicional" y simplemente ¡vengan a jugar!
						</p>
					</div>
					<div class="shrink-0 relative">
						<div class="w-40 h-40 bg-white rounded-[2.5rem] border-4 border-yellow-200 shadow-[0_8px_0_0_#fde047] flex items-center justify-center text-7xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 z-10 relative">
							🎮
						</div>
						<div class="absolute -top-6 -right-6 text-4xl animate-bounce">✨</div>
						<div class="absolute -bottom-4 -left-8 text-3xl animate-pulse-slow">⭐</div>
					</div>
				</div>
			</div>

		</div>
	</section>

	<!-- Final CTA -->
	<div class="py-16 px-4 text-center">
		<h2 class="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
				¿Listo para
				<span class="text-[#f9c710] relative inline-block">
					Unirte?
				</span>
			</h2>
		<div class="flex justify-center">
			<a
					href="/login"
					class="group relative inline-flex items-center justify-center gap-3 px-12 py-5 font-black text-2xl text-white bg-[#f9c710] rounded-3xl 
                    shadow-[0_10px_0_0_#d4a007] hover:shadow-[0_4px_0_0_#d4a007] hover:translate-y-1.5 transition-all duration-150 active:scale-95"
				>
					<span>🚀</span>
					Unirme
				</a>
		</div>
	</div>
	
</div>