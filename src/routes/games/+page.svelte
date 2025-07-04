<script lang="ts">
  interface Game {
    id: string;
    title: string;
    description: string;
    spanishTitle: string;
    emoji?: string;
    icon?: string;
    color: string;
    level: string;
  }

  const games: Game[] = [
    {
      id: "pong",
      title: "Ping Pong",
      description: "Play and win with the metro",
      spanishTitle: "Ping Pong",
      emoji: "🚇",
      color: "from-red-400 to-red-600",
      level: "Beginner",
    },
    {
      id: "memory",
      title: "Memory Match",
      description: "Match English and Spanish words with cute emojis!",
      spanishTitle: "Memorama",
      emoji: "🎴",
      color: "from-pink-400 to-pink-600",
      level: "Beginner",
    },
    {
      id: "scramble",
      title: "Word Scramble",
      description: "Unscramble the letters to discover English words!",
      spanishTitle: "Revoltijo de Palabras",
      emoji: "🔤",
      color: "from-purple-400 to-purple-600",
      level: "Intermediate",
    },
    {
      id: "flashcards",
      title: "Flash Cards",
      description: "Practice your vocabulary with flashcards!",
      spanishTitle: "Baraja de cartas",
      icon: "📚",
      color: "from-blue-400 to-blue-600",
      level: "Advanced",
    },
    {
      id: "oracle-cards",
      title: "The Oracle",
      description: "Learn your future while learning English!",
      spanishTitle: "El Oráculo",
      emoji: "🔮",
      color: "from-indigo-400 to-indigo-600",
      level: "Beginner",
    },
    {
      id: "taco",
      title: "El Güero Tacos",
      description: "Take orders and make delicious tacos in English!",
      spanishTitle: "Tacos el Güero",
      emoji: "🌮",
      color: "from-orange-400 to-orange-600",
      level: "Advanced",
    },
    {
      id: "tortillas",
      title: "Tortilla Quest",
      description: "Practice numbers and money in English!",
      spanishTitle: "Misión Tortillas",
      emoji: "🫓",
      color: "from-yellow-400 to-yellow-600",
      level: "Intermediate",
    },
  ];

  let showSpanish = $state(false);
  let hoveredGame: Game | null = $state(null);
  
</script>

<div
  class="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 pt-24 px-4 py-10 mt-10"
>
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        Games 🎮
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Learn English with fun Mexican-themed games!
      </p>

      <button
        class="mb-8 px-6 py-2 bg-yellow-400 text-white rounded-lg font-bold hover:bg-yellow-500 transition-colors"
        onclick={() => (showSpanish = !showSpanish)}
      >
        {showSpanish ? "Hide Spanish 🙈" : "Show Spanish 🇲🇽"}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each games as game}
        <a
          class="group relative transform transition-all duration-300 hover:scale-105"
          href={'games/' + game.id}
        >
          <div
            class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br {game.color} opacity-90"
            ></div>

            <div
              class="relative h-full flex flex-col items-center justify-center p-6 text-white"
            >
              <span
                class="text-6xl mb-4 transform group-hover:scale-110 transition-transform"
              >
                {game.emoji ?? game.icon}
              </span>
              <h3 class="text-2xl font-bold mb-2">
                {showSpanish ? game.spanishTitle : game.title}
              </h3>
              <p class="text-center text-sm opacity-90">{game.description}</p>

              <div
                class="absolute top-4 right-4 px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium"
              >
                {game.level}
              </div>

              <div
                class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"
              ></div>
            </div>
          </div>

          <div
            class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full transform rotate-12"
          ></div>
          <div
            class="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-300 rounded-full"
          ></div>
        </a>
      {/each}
    </div>

    <div class="mt-12 text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">How to Play</h2>
      <div class="bg-white rounded-xl p-6 shadow-lg">
        <p class="text-gray-600 mb-4">
          Each game is designed to help you learn English while having fun with
          Mexican themes!
        </p>
        <ul class="text-left max-w-lg mx-auto space-y-2">
          <li class="flex items-center gap-2">
            <span class="text-green-500">✓</span>
            Start with Beginner level games
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-500">✓</span>
            Use the Spanish toggle when needed
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-500">✓</span>
            Practice regularly to improve
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-500">✓</span>
            Track your scores and try to beat them
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
