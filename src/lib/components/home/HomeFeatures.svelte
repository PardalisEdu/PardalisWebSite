<script lang="ts">
	import { fade } from 'svelte/transition';

	const features = [
		{ icon: "🇲🇽", title: "Hiper-mexicano", desc: "Usamos situaciones reales de un niño mexicano. Nada de contextos extraños." },
		{ icon: "🔓", title: "100% gratis y open source", desc: "Sin anuncios, sin suscripciones. Código abierto (GPL v3). Siempre." },
		{ icon: "👨‍🏫", title: "Aliado del maestro", desc: "Diseñada para complementar la clase, no para reemplazarla." },
		{ icon: "🛡️", title: "Seguro para niños", desc: "Sin datos personales sensibles. Sin redes sociales. Sin riesgos." },
	];
</script>

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
