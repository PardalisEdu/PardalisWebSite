<script lang="ts">
  import { spring } from "svelte/motion";
  import { flashcardDeck } from '$lib/client/data/games/flashcards';
  import type { FlashCard } from '$lib/types/types';
  import { ArrowLeft, Award, Check, X, HelpCircle, BookOpen } from 'lucide-svelte';

  // Use Svelte 5 state with explicit typing
  let currentIndex = $state<number>(0);
  let score = $state<number>(0);
  let deck = $state<FlashCard[]>([]);
  let showAnswer = $state<boolean>(false);
  let cardRotation = spring<number>(0);
  let message = $state<string>("");

  let progress = $derived(deck.length > 0 ? (Math.min(currentIndex, deck.length) / deck.length) * 100 : 0);

  $effect(() => {
    deck = [...flashcardDeck].sort(() => Math.random() - 0.5);
  });

  function flipCard(): void {
    showAnswer = !showAnswer;
    cardRotation.set(showAnswer ? 180 : 0);
  }

  function handleAnswer(correct: boolean): void {
    score += correct ? 1 : 0;
    message = correct ? "¡Correcto! 🎉" : "Casi... ¡Sigue intentando! 💪";

    setTimeout(() => {
      message = "";
      showAnswer = false;
      cardRotation.set(0);

      if (currentIndex < deck.length - 1) {
        currentIndex++;
      } else {
        // Advance to show game finished screen
        currentIndex++;
      }
    }, 1200);
  }

  function restartGame(): void {
    deck = [...flashcardDeck].sort(() => Math.random() - 0.5);
    currentIndex = 0;
    score = 0;
    showAnswer = false;
    cardRotation.set(0);
    message = "";
  }
</script>

<div class="min-h-screen bg-[#FFFDF5] pt-28 pb-16 px-4 flex flex-col items-center justify-center font-sans">
  <div class="w-full max-w-xl mx-auto">
    <!-- Back Button -->
    <a
      href="/"
      class="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors mb-8 group self-start"
    >
      <ArrowLeft size={16} class="group-hover:-translate-x-0.5 transition-transform" />
      Volver al inicio
    </a>

    <!-- Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 text-xs font-black text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 uppercase tracking-wider mb-3">
        <span>Mini-Juego</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-2">
        Flashcards 📚
      </h1>
      <p class="text-gray-500 font-medium text-sm md:text-base">
        ¡Adivina el significado y aprende nuevas palabras en inglés!
      </p>
    </div>

    {#if deck.length > 0}
      <!-- Progress Bar & Score -->
      <div class="bg-white border-2 border-gray-100 rounded-3xl p-5 mb-8 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-black text-gray-400 uppercase tracking-wider">
            Progreso: {Math.min(currentIndex, deck.length)} / {deck.length} tarjetas
          </span>
          <span class="text-xs font-black text-yellow-700 bg-yellow-50 px-2.5 py-0.5 rounded-md border border-yellow-100 uppercase tracking-wider">
            Puntos: {score}
          </span>
        </div>
        <div class="w-full bg-gray-100 h-4 rounded-full overflow-hidden border border-gray-200">
          <div 
            class="bg-[#10b981] h-full transition-all duration-500" 
            style="width: {progress}%"
          ></div>
        </div>
      </div>

      {#if currentIndex < deck.length}
        <!-- Flashcard Play View -->
        <div class="card-container relative w-full aspect-3/2 perspective-1000">
          <div
            class="card-content absolute inset-0 transform-style-3d"
            style="transform: rotateY({$cardRotation}deg)"
          >
            <!-- FRONT FACE (English) -->
            <div
              class="card-face front absolute inset-0 bg-white rounded-[2.5rem] border-4 border-yellow-200 shadow-[0_10px_0_0_#fef08a] p-8 backface-hidden cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between"
              role="button"
              tabindex="0"
              onclick={flipCard}
              onkeydown={(e) => e.key === "Enter" && flipCard()}
            >
              <div class="flex items-center justify-between w-full border-b border-gray-100 pb-3">
                <span class="text-[10px] font-black text-yellow-700 bg-yellow-50 px-2.5 py-0.5 rounded-md border border-yellow-200 uppercase tracking-wider">
                  Inglés
                </span>
                <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Categoría: {deck[currentIndex].category}
                </span>
              </div>

              <div class="h-full flex flex-col items-center justify-center py-4 text-center">
                <div class="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center border border-yellow-200 text-yellow-600 mb-4 animate-float">
                  <HelpCircle size={28} />
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-2">
                  {deck[currentIndex].english}
                </h2>
                <p class="text-gray-500 italic text-sm md:text-base px-6">
                  "{deck[currentIndex].context}"
                </p>
              </div>

              <div class="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-auto flex items-center gap-1.5">
                <span>🔄 Toca la tarjeta para ver respuesta</span>
              </div>
            </div>

            <!-- BACK FACE (Spanish / Answer) -->
            <div
              class="card-face back absolute inset-0 bg-white rounded-[2.5rem] border-4 border-blue-200 shadow-[0_10px_0_0_#dbeafe] p-8 backface-hidden rotate-y-180 flex flex-col items-center justify-between"
              role="button"
              tabindex="0"
              onclick={(e) => {
                if ((e.target as HTMLElement).tagName !== 'BUTTON' && !(e.target as HTMLElement).closest('button')) {
                  flipCard();
                }
              }}
              onkeydown={(e) => e.key === "Enter" && flipCard()}
            >
              <div class="flex items-center justify-between w-full border-b border-gray-100 pb-3">
                <span class="text-[10px] font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 uppercase tracking-wider">
                  Español
                </span>
                <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  ¿Cómo te fue?
                </span>
              </div>

              <div class="h-full w-full flex flex-col items-center justify-center py-4 text-center">
                <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-200 text-blue-600 mb-4">
                  <BookOpen size={28} />
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-[#f9c710] tracking-tight mb-6">
                  {deck[currentIndex].spanish}
                </h2>

                <div class="flex gap-4 w-full px-4 justify-center">
                  <button
                    onclick={() => handleAnswer(true)}
                    class="flex-1 py-3 bg-[#10b981] border-2 border-[#0c8f63] text-white font-black rounded-2xl shadow-[0_4px_0_0_#0c8f63] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all text-xs md:text-sm flex items-center justify-center gap-1.5"
                  >
                    Lo sabía ✅
                  </button>
                  <button
                    onclick={() => handleAnswer(false)}
                    class="flex-1 py-3 bg-[#ff4136] border-2 border-[#cc3333] text-white font-black rounded-2xl shadow-[0_4px_0_0_#cc3333] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all text-xs md:text-sm flex items-center justify-center gap-1.5"
                  >
                    Repasar ❌
                  </button>
                </div>
              </div>

              <div class="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-auto">
                <span>🔄 Toca el fondo para regresar</span>
              </div>
            </div>
          </div>
        </div>
      {:else}
        <!-- RESULTS VIEW -->
        <div class="bg-white rounded-[2.5rem] border-4 border-yellow-200 shadow-[0_10px_0_0_#fef08a] p-10 text-center max-w-md mx-auto space-y-6">
          <div class="w-20 h-20 bg-yellow-50 rounded-full border-2 border-yellow-200 flex items-center justify-center text-4xl mx-auto animate-bounce">
            🏆
          </div>
          <div>
            <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-2">
              ¡Juego Terminado!
            </h2>
            <p class="text-gray-500 font-bold text-sm">
              ¡Buen trabajo practicando vocabulario!
            </p>
          </div>
          
          <div class="bg-yellow-50 border-2 border-yellow-100 rounded-2xl p-6">
            <p class="text-xs text-yellow-700 font-bold uppercase tracking-wider mb-1">Puntuación Final</p>
            <p class="text-5xl font-black text-gray-900">
              {score} <span class="text-xl text-gray-400 font-bold">/ {deck.length}</span>
            </p>
          </div>

          <button
            onclick={restartGame}
            class="w-full py-4 bg-[#f9c710] border-2 border-[#d4a007] text-gray-900 font-black rounded-2xl shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all text-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            Jugar de nuevo 🔄
          </button>
        </div>
      {/if}
    {/if}

    <!-- FEEDBACK MESSAGE TOAST -->
    {#if message && currentIndex < deck.length}
      <div 
        class="mt-6 p-4 rounded-2xl text-center font-black text-base md:text-lg border-2 shadow-sm animate-pulse {message.includes('Correcto') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}"
      >
        {message}
      </div>
    {/if}
  </div>
</div>

<style>
  .perspective-1000 {
    perspective: 1000px;
  }

  .transform-style-3d {
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }

  .backface-hidden {
    backface-visibility: hidden;
  }

  .card-container {
    position: relative;
  }

  .card-content {
    transform-origin: center;
    width: 100%;
    height: 100%;
  }

  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
  }

  .front {
    background: white;
  }

  .back {
    background: white;
    transform: rotateY(180deg);
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
</style>
