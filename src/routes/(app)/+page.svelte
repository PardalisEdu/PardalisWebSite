<script lang="ts">
    import { onMount } from 'svelte';
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

	const logoMotion = spring({ scale: 0, rotate: 0 }, { stiffness: 0.1, damping: 0.2 });

	onMount(() => { logoMotion.set({ scale: 1, rotate: 360 }); });

	const steps = [
		{ num: "1", icon: "🎮", title: "Juega", desc: "Tu hijo explorará un vecindario mexicano lleno de mini-juegos — la tortillería, el mercado, el tianguis." },
		{ num: "2", icon: "🗣️", title: "Aprende", desc: "Cada misión le enseña vocabulario y frases en contexto. Sin memorizar listas, solo jugando." },
		{ num: "3", icon: "🏆", title: "Avanza", desc: "Gana recompensas, desbloquea nuevas locaciones y construye confianza con el idioma." },
	];

	const features = [
		{ icon: "🇲🇽", title: "Hiper-mexicano", desc: "Usamos situaciones reales de un niño mexicano. Nada de contextos extraños." },
		{ icon: "🔓", title: "100% gratis y open source", desc: "Sin anuncios, sin suscripciones. Código abierto (GPL v3). Siempre." },
		{ icon: "👨‍🏫", title: "Aliado del maestro", desc: "Diseñada para complementar la clase, no para reemplazarla." },
		{ icon: "🛡️", title: "Seguro para niños", desc: "Sin datos personales sensibles. Sin redes sociales. Sin riesgos." },
	];

	const testimonials = [
		{ avatar: "img/profiles/ocelote.svg", name: "Poncho", role: "Arquitecto", comment: "Me sobreexplotaron laboralmente, pero aprendí inglés" },
		{ avatar: "img/profiles/ajolote.svg", name: "Isaac", role: "Manager", comment: "Yo no hice nada. 10/10" },
		{ avatar: "img/profiles/xinxin.svg", name: "Oscar", role: "Dev", comment: "Poncho entregó un mes tarde, pero aprendí inglés 👍" },
	];

	const games = [
		{ emoji: "🃏", name: "Flashcards", color: "from-blue-400 to-blue-600" },
		{ emoji: "🧠", name: "Memory Match", color: "from-pink-400 to-pink-600" },
		{ emoji: "🔤", name: "Word Scramble", color: "from-purple-400 to-purple-600" },
		{ emoji: "🌮", name: "El Güero Tacos", color: "from-orange-400 to-orange-600" },
		{ emoji: "🔄", name: "Tortilla Quest", color: "from-yellow-400 to-yellow-600" },
		{ emoji: "🏓", name: "Pardalis Pong", color: "from-red-400 to-red-600" },
	];
</script>

<!-- ────────────── HERO ────────────── -->
<div class="relative min-h-screen flex flex-col overflow-hidden bg-[#FFFDF5]">
	<div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
		<svg width="100%" height="100%" class="opacity-15">
			<pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
				<circle cx="2" cy="2" r="2" fill="#f9c710" />
			</pattern>
			<rect width="100%" height="100%" fill="url(#dots)" />
		</svg>
		<div class="absolute -top-20 -left-20 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl animate-pulse-slow"></div>
		<div class="absolute top-1/3 -right-20 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl animate-float"></div>
		<div class="absolute -bottom-10 left-1/3 w-64 h-64 bg-blue-100/30 rounded-full blur-2xl"></div>
	</div>

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
			<div class="absolute w-64 h-64 md:w-125 md:h-125 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
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

<!-- ────────────── TRUST BAR ────────────── -->
<div class="bg-white border-y border-gray-100 py-6">
	<div class="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-gray-400 font-medium">
		<span class="text-gray-800 font-black text-xs uppercase tracking-widest">Trusted by</span>
		<span>🏫 Estudiantes</span>
		<span>👨‍🏫 Maestros</span>
		<span>👨‍👩‍👧‍👦 Padres de familia</span>
		<span>🌎 Open Source Community</span>
	</div>
</div>

<!-- ────────────── HOW IT WORKS ────────────── -->
<div class="bg-[#FFFDF5] py-20 md:py-28">
	<div class="max-w-6xl mx-auto px-6">
		<div class="text-center max-w-2xl mx-auto mb-16">
			<div class="inline-flex items-center gap-2 text-xs font-bold text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200 uppercase tracking-wider mb-5">
				<span>Cómo funciona</span>
			</div>
			<h2 class="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
				Tres pasos para comenzar
			</h2>
			<p class="text-lg text-gray-500 leading-relaxed">
				Sin instalaciones, sin configuraciones complicadas. Solo un navegador y las ganas de jugar.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each steps as step, i}
				<div in:fade={{ duration: 500, delay: i * 150 }}
					class="relative bg-white rounded-2xl border border-gray-100 p-8 text-center hover:border-gray-200 hover:shadow-lg transition-all duration-300">
					<div class="absolute -top-4 -right-4 w-10 h-10 bg-[#f9c710] text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg">
						{step.num}
					</div>
					<div class="w-16 h-16 mx-auto mb-5 bg-yellow-50 rounded-2xl border border-yellow-200 flex items-center justify-center text-3xl">
						{step.icon}
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
					<p class="text-gray-500 leading-relaxed">{step.desc}</p>
				</div>
			{/each}
		</div>

		<div class="text-center mt-12">
			<a href="/register"
				class="inline-flex items-center gap-2 font-bold text-[#f9c710] hover:text-yellow-600 transition-colors">
				Crear cuenta gratuita
				<span>→</span>
			</a>
		</div>
	</div>
</div>

<!-- ────────────── FEATURES ────────────── -->
<div class="bg-white py-20 md:py-28">
	<div class="max-w-6xl mx-auto px-6">
		<div class="text-center max-w-2xl mx-auto mb-16">
			<h2 class="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
				¿Por qué <span class="text-[#f9c710]">Pardalis</span>?
			</h2>
			<p class="text-lg text-gray-500 leading-relaxed">
				No somos otra plataforma de inglés. Esto es lo que nos hace diferentes.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each features as feat, i}
				<div in:fade={{ duration: 400, delay: i * 100 }}
					class="bg-[#FFFDF5] rounded-2xl border border-gray-100 p-6 hover:border-yellow-200 hover:shadow-md transition-all duration-300">
					<div class="w-12 h-12 bg-yellow-50 rounded-xl border border-yellow-200 flex items-center justify-center text-2xl mb-4">
						{feat.icon}
					</div>
					<h3 class="font-bold text-gray-900 mb-2">{feat.title}</h3>
					<p class="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- ────────────── MINI-GAMES PREVIEW ────────────── -->
<div class="bg-[#FFFDF5] py-20 md:py-28">
	<div class="max-w-6xl mx-auto px-6">
		<div class="text-center max-w-2xl mx-auto mb-16">
			<div class="inline-flex items-center gap-2 text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200 uppercase tracking-wider mb-5">
				<span>Mini-juegos</span>
			</div>
			<h2 class="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
				Aprender jugando
			</h2>
			<p class="text-lg text-gray-500 leading-relaxed">
				Cada locación del vecindario tiene su propio mini-juego. Así los niños aprenden sin darse cuenta.
			</p>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
			{#each games as game, i}
				<div in:fade={{ duration: 300, delay: i * 80 }}
					class="group bg-white rounded-2xl border border-gray-100 p-5 text-center hover:border-gray-200 hover:shadow-lg transition-all duration-300">
					<div class="w-14 h-14 mx-auto mb-3 bg-linear-to-br {game.color} rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
						{game.emoji}
					</div>
					<p class="text-sm font-bold text-gray-700">{game.name}</p>
				</div>
			{/each}
		</div>

		<div class="text-center mt-12">
			<a href="/mini-games"
				class="inline-flex items-center gap-2 font-bold text-gray-500 hover:text-gray-900 transition-colors">
				Ver todos los juegos
				<span>→</span>
			</a>
		</div>
	</div>
</div>

<!-- ────────────── TESTIMONIALS ────────────── -->
<div class="bg-white py-20 md:py-28">
	<div class="max-w-6xl mx-auto px-6">
		<div class="text-center max-w-2xl mx-auto mb-16">
			<div class="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 uppercase tracking-wider mb-5">
				<span>El equipo dice</span>
			</div>
			<h2 class="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
				Voces de <span class="text-[#f9c710]">Pardalis</span>
			</h2>
			<p class="text-lg text-gray-500 leading-relaxed">
				Los creadores del proyecto también tienen algo que decir.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each testimonials as t, i}
				<div in:fade={{ duration: 400, delay: i * 120 }}
					class="bg-[#FFFDF5] rounded-2xl border border-gray-100 p-6 hover:border-yellow-200 transition-all duration-300">
					<div class="flex items-center gap-4 mb-4">
						<img src={t.avatar} alt={t.name} class="w-12 h-12 rounded-full border-2 border-yellow-200" />
						<div>
							<p class="font-bold text-gray-900 text-sm">{t.name}</p>
							<p class="text-xs text-gray-400">{t.role}</p>
						</div>
					</div>
					<p class="text-gray-600 italic leading-relaxed">"{t.comment}"</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- ────────────── FINAL CTA ────────────── -->
<div class="bg-gray-900 py-20 md:py-28">
	<div class="max-w-3xl mx-auto px-6 text-center">
		<span class="text-6xl mb-6 block">🚀</span>
		<h2 class="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
			¿Listo para que tu hijo <span class="text-[#f9c710]">aprenda inglés</span> jugando?
		</h2>
		<p class="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
			Es gratis, es divertido y está hecho pensando en los niños de México. Crea su cuenta en 30 segundos.
		</p>
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<a href="/register"
				class="inline-flex items-center justify-center px-10 py-4 font-black text-lg text-gray-900 bg-[#f9c710] rounded-2xl shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150">
				Crear cuenta gratis
			</a>
			<a href="/como-funciona"
				class="inline-flex items-center justify-center px-10 py-4 font-bold text-lg text-gray-300 rounded-2xl border-2 border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-150">
				Más información
			</a>
		</div>
	</div>
</div>