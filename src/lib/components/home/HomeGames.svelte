<script lang="ts">
	import { fade } from 'svelte/transition';

	const games = [
		{ emoji: "🃏", name: "Flashcards", color: "from-blue-400 to-blue-600" },
		{ emoji: "🧠", name: "Memory Match", color: "from-pink-400 to-pink-600" },
		{ emoji: "🔤", name: "Word Scramble", color: "from-purple-400 to-purple-600" },
		{ emoji: "🌮", name: "El Güero Tacos", color: "from-orange-400 to-orange-600" },
		{ emoji: "🔄", name: "Tortilla Quest", color: "from-yellow-400 to-yellow-600" },
		{ emoji: "🏓", name: "Pardalis Pong", color: "from-red-400 to-red-600" },
	];
</script>

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
