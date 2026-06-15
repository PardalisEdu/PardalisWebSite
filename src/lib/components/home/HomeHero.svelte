<script lang="ts">
	import { spring } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';

	let clickCount = $state(0);
	let isHovered = $state(false);

	const logoScale = spring(1, { stiffness: 0.25, damping: 0.3 });
	const logoRotate = spring(0, { stiffness: 0.25, damping: 0.3 });

	function handleLogoInteraction() {
		clickCount++;
		const newScale = 1.4 + (clickCount * 0.04 % 0.2);
		logoScale.set(newScale);
		logoRotate.set(Math.random() * 40 - 20);
		setTimeout(() => { logoScale.set(1); logoRotate.set(0); }, 180);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') handleLogoInteraction();
	}
</script>

<div class="relative min-h-screen flex flex-col overflow-hidden bg-cream pt-28">


	<main class="relative z-10 grid grid-cols-1 md:grid-cols-2 flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 items-center gap-8">
		<div in:fly={{ x: -50, duration: 800, delay: 200 }} class="flex flex-col space-y-8 text-center md:text-left">
			<header>
				<div class="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-200 text-yellow-800 px-4 py-1.5 rounded-full font-bold text-sm mb-6 shadow-[0_2px_0_0_#fde047]">
					<span>🇲🇽</span>
					Inglés muy a la mexicana — 100% gratuito
				</div>
				<h1 class="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight">
					La forma más <span class="text-[#f9c710]">divertida</span> de aprender inglés para niños mexicanos
				</h1>
				<p class="mt-6 text-lg md:text-xl text-gray-500 font-medium max-w-xl leading-relaxed">
					Pardalis es una plataforma educativa interactiva que usa situaciones cotidianas de México — ir por las tortillas, el mercado, el tianguis — para que los niños aprendan inglés jugando.
				</p>
			</header>

			<div class="flex flex-col sm:flex-row items-center md:items-start gap-4">
				<a href="/register"
					class="inline-flex items-center justify-center px-10 py-4 font-black text-lg text-white bg-[#f9c710] rounded-2xl shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150">
					Comenzar ahora
				</a>
				<a href="/como-funciona"
					class="inline-flex items-center justify-center px-10 py-4 font-bold text-lg text-gray-600 rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:text-gray-900 transition-all duration-150 active:scale-95">
					Conoce más
				</a>
			</div>

			<div class="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm font-medium text-gray-400 pt-2">
				<span>✅ Gratuito</span>
				<span>🔓 Open Source</span>
				<span>🇲🇽 Hecho en México</span>
				<span>👶 Para niños de 6-10 años</span>
			</div>
		</div>

		<!-- Logo interactivo -->
		<div class="relative flex justify-center items-center mt-12 md:mt-0">

			<button
				onclick={handleLogoInteraction}
				onkeydown={handleKeyDown}
				onmouseenter={() => (isHovered = true)}
				onmouseleave={() => (isHovered = false)}
				class="relative z-20 cursor-pointer focus:outline-hidden"
				style="transform: scale({$logoScale}) rotate({$logoRotate}deg); filter: drop-shadow(0 20px 30px rgba(249, 199, 16, 0.2));"
				aria-label="Interactuar con Pardalis"
			>
				<img src="favicon.svg" alt="Logo Pardalis" class="w-64 h-64 md:w-120 md:h-120 object-contain" />
				{#if isHovered}
					<div transition:fade={{ duration: 200 }}
						class="absolute -top-10 -right-4 bg-white px-4 py-2 rounded-2xl shadow-xl border-2 border-yellow-100 font-bold text-gray-700 whitespace-nowrap">
						¡Hazme click! ✨
					</div>
				{/if}
			</button>
			<div class="absolute bottom-0 w-48 h-6 bg-gray-900/5 blur-xl rounded-[100%]"></div>
		</div>
	</main>
</div>
