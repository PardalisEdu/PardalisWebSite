<script lang="ts">
    import HomeHero from '$lib/components/home/HomeHero.svelte';
    import HomeSteps from '$lib/components/home/HomeSteps.svelte';
    import HomeFeatures from '$lib/components/home/HomeFeatures.svelte';
    import HomeGames from '$lib/components/home/HomeGames.svelte';
    import HomeTestimonials from '$lib/components/home/HomeTestimonials.svelte';
</script>

<svelte:head>
    <title>Pardalis - Inglés para niños muy a la mexicana</title>
    <meta name="description" content="Pardalis es la plataforma educativa gratuita diseñada para niños de primaria en México. Aprende inglés jugando con situaciones reales de nuestra cultura." />
    <meta property="og:title" content="Pardalis - Inglés para niños muy a la mexicana" />
    <meta property="og:description" content="La forma más divertida de aprender inglés para niños mexicanos. ¡Gratis, interactivo y contextualizado!" />
    <meta name="keywords" content="inglés para niños, aprender inglés primaria, educación México, juegos inglés, Pardalis, inglés divertido" />
</svelte:head>

<HomeHero />

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

<HomeSteps />
<HomeFeatures />
<HomeGames />
<HomeTestimonials />

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
