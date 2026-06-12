<script lang="ts">
	import { fade } from 'svelte/transition';

	const steps = [
		{ num: "1", icon: "🎮", title: "Juega", desc: "Tu hijo explorará un vecindario mexicano lleno de mini-juegos — la tortillería, el mercado, el tianguis." },
		{ num: "2", icon: "🗣️", title: "Aprende", desc: "Cada misión le enseña vocabulario y frases en contexto. Sin memorizar listas, solo jugando." },
		{ num: "3", icon: "🏆", title: "Avanza", desc: "Gana recompensas, desbloquea nuevas locaciones y construye confianza con el idioma." },
	];
</script>

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
