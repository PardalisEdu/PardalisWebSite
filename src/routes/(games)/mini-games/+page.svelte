<script lang="ts">
  import { gamesList } from '$lib/data/games/games-list';
  import type { Game } from '$lib/types/types';
  import { fade } from 'svelte/transition';

  let showSpanish = $state(false);
  let hoveredGame: Game | null = $state(null);
</script>

<svelte:head>
    <title>Juegos para Aprender Inglés | Pardalis</title>
    <meta name="description" content="Explora nuestra colección de mini-juegos educativos con temática mexicana. Aprende vocabulario y frases en inglés divirtiéndote." />
    <meta name="keywords" content="juegos inglés niños, mini juegos educativos, aprender inglés jugando México" />
</svelte:head>

<div class="min-h-screen bg-[#FFFDF5]">
  <!-- Hero -->
  <div class="relative overflow-hidden bg-linear-to-br from-[#f9c710] via-[#f9c710] to-yellow-300 pt-28 pb-20 md:pt-36 md:pb-28">
    <div class="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" class="opacity-10">
        <pattern id="dots-games" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots-games)" />
      </svg>
      <div class="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute -bottom-10 left-1/4 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
    <div class="relative container mx-auto px-4 text-center">
      <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
        <span>🎮</span>
        Aprende jugando
      </div>
      <h1 class="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-sm">
        Mini Games
      </h1>
      <p class="text-xl md:text-2xl text-yellow-900 font-medium max-w-2xl mx-auto">
        Learn English with fun Mexican-themed games!
      </p>
    </div>
  </div>

  <div class="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
    <!-- Language toggle -->
    <div class="flex justify-center mb-12">
      <button
        class="inline-flex items-center gap-3 px-8 py-3.5 bg-white rounded-2xl border-4 border-yellow-100 shadow-[0_6px_0_0_#fef08a] hover:-translate-y-1 transition-all duration-200 font-bold text-sm active:scale-95"
        onclick={() => (showSpanish = !showSpanish)}
      >
        <span class="text-lg">{showSpanish ? "🙈" : "🇲🇽"}</span>
        {showSpanish ? "Hide Spanish" : "Show Spanish"}
      </button>
    </div>

    <!-- Games grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each gamesList as game, i}
        <a
          in:fade={{ duration: 400, delay: i * 80 }}
          class="group block"
          href={'/mini-games/' + game.id}
          onmouseenter={() => hoveredGame = game}
          onmouseleave={() => hoveredGame = null}
        >
          <div class="relative rounded-[2rem] overflow-hidden shadow-[0_12px_0_0_#00000020] hover:-translate-y-2 hover:shadow-[0_16px_0_0_#00000025] transition-all duration-300">
            <div class="relative aspect-4/3 bg-linear-to-br {game.color} p-6 flex flex-col items-center justify-center text-white">
              <span class="text-7xl mb-4 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                {game.emoji ?? game.icon}
              </span>
              <h3 class="text-2xl font-black mb-2 text-center drop-shadow-sm">
                {showSpanish ? game.spanishTitle : game.title}
              </h3>
              <p class="text-center text-sm opacity-90 font-medium">{game.description}</p>

              <!-- Level badge -->
              <div class="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                {game.level}
              </div>
            </div>
          </div>

          <!-- Floating decorations -->
          <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full transform rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45"></div>
          <div class="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></div>
        </a>
      {/each}
    </div>

    <!-- How to Play -->
    <div class="mt-16 mb-16">
      <div class="bg-white rounded-[3rem] border-4 border-blue-100 shadow-[0_12px_0_0_#bfdbfe] p-10 md:p-14">
        <div class="text-center mb-10">
          <span class="text-5xl mb-4 block">🎯</span>
          <h2 class="text-3xl md:text-4xl font-black text-gray-900">How to Play</h2>
          <p class="text-gray-500 font-medium mt-2">Each game helps you learn English with Mexican themes!</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {#each [
            { icon: "🌮", text: "Start with Beginner level games", color: "green" },
            { icon: "🇲🇽", text: "Use the Spanish toggle when needed", color: "yellow" },
            { icon: "📅", text: "Practice regularly to improve", color: "blue" },
            { icon: "🏆", text: "Track your scores and beat them", color: "purple" },
          ] as tip}
            <div class="flex items-center gap-4 bg-gray-50 rounded-2xl p-5 border-2 border-gray-100 hover:border-{tip.color}-200 transition-colors">
              <span class="text-3xl shrink-0">{tip.icon}</span>
              <span class="font-bold text-gray-700">{tip.text}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>