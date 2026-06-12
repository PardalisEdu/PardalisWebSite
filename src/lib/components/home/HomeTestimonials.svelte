<script lang="ts">
	import { fade } from 'svelte/transition';

	const testimonials = [
		{ avatar: "img/profiles/ocelote.svg", name: "Poncho", role: "Arquitecto", comment: "Me sobreexplotaron laboralmente, pero aprendí inglés" },
		{ avatar: "img/profiles/ajolote.svg", name: "Isaac", role: "Manager", comment: "Yo no hice nada. 10/10" },
		{ avatar: "img/profiles/xinxin.svg", name: "Oscar", role: "Dev", comment: "Poncho entregó un mes tarde, pero aprendí inglés 👍" },
	];
</script>

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
