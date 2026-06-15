<script lang="ts">
  import { spring } from "svelte/motion";
  import { flashcardDeck } from '$lib/client/data/games/flashcards';
  import type { FlashCard } from '$lib/types/types';
  import { ArrowLeft, HelpCircle, BookOpen, RotateCcw } from 'lucide-svelte';

  // Use Svelte 5 state with explicit typing
  let currentIndex = $state<number>(0);
  let score = $state<number>(0);
  let deck = $state<FlashCard[]>([]);
  let showAnswer = $state<boolean>(false);
  let cardRotation = spring<number>(0, {
    stiffness: 0.1,
    damping: 0.2
  });
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

<div class="min-h-screen bg-cream pt-28 pb-16 px-4 flex flex-col items-center justify-center font-custom relative overflow-hidden">


  <div class="w-full max-w-xl mx-auto relative z-10 flex flex-col">
    <!-- Back Button -->
    <a
      href="/mini-games"
      class="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 font-extrabold rounded-2xl border-2 border-gray-200 shadow-[0_4px_0_0_#e5e7eb] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#e5e7eb] active:translate-y-[4px] active:shadow-none transition-all mb-8 group self-start"
    >
      <ArrowLeft size={18} class="group-hover:-translate-x-0.5 transition-transform" />
      <span>Volver a Mini-Juegos</span>
    </a>

    <!-- Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 text-xs font-black text-brand-dark bg-brand-light px-4 py-1.5 rounded-full border-2 border-brand/30 uppercase tracking-wider mb-3">
        <span>⭐ Mini-Juego ⭐</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2 font-custom">
        Flashcards<span class="text-blue-400">.</span> 📚
      </h1>
      <p class="text-gray-500 font-bold text-sm md:text-base">
        ¡Adivina el significado y aprende nuevas palabras en inglés!
      </p>
    </div>

    {#if deck.length > 0}
      <!-- Progress Bar & Score -->
      <div class="bg-white border-4 border-yellow-100 rounded-3xl p-5 mb-8 shadow-[0_6px_0_0_#fef08a] flex flex-col gap-3">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-black text-gray-400 uppercase tracking-wider">
            Progreso: {Math.min(currentIndex, deck.length)} / {deck.length} tarjetas
          </span>
          <span class="text-xs font-black text-brand-dark bg-brand-light px-3 py-1 rounded-xl border-2 border-brand/20 uppercase tracking-wider">
            Puntos: {score}
          </span>
        </div>
        <div class="w-full bg-gray-100 h-5 rounded-full p-1 border-2 border-gray-200 shadow-inner">
          <div 
            class="bg-emerald-500 h-full rounded-full transition-all duration-500 relative" 
            style="width: {progress}%"
          >
            {#if progress > 5}
              <div class="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            {/if}
          </div>
        </div>
      </div>

      {#if currentIndex < deck.length}
        <!-- Flashcard Play View -->
        {#key currentIndex}
          <div class="card-container relative w-full h-[430px] sm:h-[400px] md:h-[430px] perspective-1000 animate-pop-in">
            <div
              class="card-content absolute inset-0 transform-style-3d cursor-pointer"
              style="transform: rotateY({$cardRotation}deg)"
            >
              <!-- FRONT FACE (English) -->
              <div
                class="card-face front absolute inset-0 bg-white rounded-[2.5rem] border-4 border-brand shadow-[0_12px_0_0_var(--color-brand-dark)] p-8 backface-hidden flex flex-col items-center justify-between transition-all duration-300 hover:translate-y-[3px] hover:shadow-[0_9px_0_0_var(--color-brand-dark)] active:translate-y-[8px] active:shadow-[0_4px_0_0_var(--color-brand-dark)]"
                role="button"
                tabindex="0"
                onclick={flipCard}
                onkeydown={(e) => e.key === "Enter" && flipCard()}
              >
                <div class="flex items-center justify-between w-full border-b border-gray-100 pb-3">
                  <span class="text-xs font-black text-brand-dark bg-brand-light px-3 py-1 rounded-xl border-2 border-brand/20 uppercase tracking-wider">
                    Inglés 🇺🇸
                  </span>
                  <span class="text-xs text-gray-500 font-extrabold bg-gray-100 px-3 py-1 rounded-xl border border-gray-200/50 uppercase tracking-wider">
                    {deck[currentIndex].category}
                  </span>
                </div>

                <div class="flex-1 flex flex-col items-center justify-center py-4 text-center w-full">
                  <!-- Floating Icon Container -->
                  <div class="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center border-2 border-brand/30 text-brand-dark mb-4 animate-float shadow-[0_4px_0_0_var(--color-brand-dark)]">
                    <HelpCircle size={32} />
                  </div>
                  <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 font-custom">
                    {deck[currentIndex].english}
                  </h2>
                  <!-- Context Sentence Card (Section 5: ESTILOS.md Blockquote style) -->
                  <div class="bg-brand-light/30 border-l-4 border-brand px-5 py-3 rounded-r-2xl max-w-sm mx-auto text-left">
                    <p class="text-gray-600 italic text-sm md:text-base font-medium">
                      "{deck[currentIndex].context}"
                    </p>
                  </div>
                </div>

                <div class="text-xs font-black text-gray-400 uppercase tracking-wider mt-auto flex items-center gap-1.5 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                  <span>🔄 Toca para ver respuesta</span>
                </div>
              </div>

              <!-- BACK FACE (Spanish / Answer) -->
              <div
                class="card-face back absolute inset-0 bg-white rounded-[2.5rem] border-4 border-blue-400 shadow-[0_12px_0_0_#2563eb] p-8 backface-hidden flex flex-col items-center justify-between transition-all duration-300 hover:shadow-[0_9px_0_0_#2563eb] active:shadow-[0_4px_0_0_#2563eb]"
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
                  <span class="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border-2 border-blue-200 uppercase tracking-wider">
                    Español 🇲🇽
                  </span>
                  <span class="text-xs text-gray-500 font-extrabold bg-gray-100 px-3 py-1 rounded-xl border border-gray-200/50 uppercase tracking-wider">
                    ¿Cómo te fue?
                  </span>
                </div>

                <div class="flex-1 w-full flex flex-col items-center justify-center py-4 text-center">
                  <!-- Book Icon Container -->
                  <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-blue-200 text-blue-500 mb-4 shadow-[0_4px_0_0_#3b82f6] {showAnswer ? 'animate-bounce-in' : ''}">
                    <BookOpen size={32} />
                  </div>
                  <h2 class="text-4xl md:text-5xl font-extrabold text-blue-600 tracking-tight mb-6 font-custom {showAnswer ? 'animate-pop-in' : ''}">
                    {deck[currentIndex].spanish}
                  </h2>

                  <div class="flex gap-4 w-full px-4 justify-center relative z-20">
                    <button
                      onclick={() => handleAnswer(true)}
                      class="flex-1 py-3.5 bg-[#10b981] border-2 border-[#047857] text-white font-black uppercase rounded-2xl shadow-[0_4px_0_0_#047857] hover:translate-y-[4px] hover:shadow-none active:scale-95 transition-all text-xs md:text-sm flex items-center justify-center gap-1.5 cursor-pointer {showAnswer ? 'animate-pop-in' : ''}"
                    >
                      <span>Lo sabía ✅</span>
                    </button>
                    <button
                      onclick={() => handleAnswer(false)}
                      class="flex-1 py-3.5 bg-[#ff4136] border-2 border-[#cc3333] text-white font-black uppercase rounded-2xl shadow-[0_4px_0_0_#cc3333] hover:translate-y-[4px] hover:shadow-none active:scale-95 transition-all text-xs md:text-sm flex items-center justify-center gap-1.5 cursor-pointer {showAnswer ? 'animate-pop-in' : ''}"
                    >
                      <span>Repasar ❌</span>
                    </button>
                  </div>
                </div>

                <div class="text-xs font-black text-gray-400 uppercase tracking-wider mt-auto flex items-center gap-1.5 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                  <span>🔄 Toca el fondo para regresar</span>
                </div>
              </div>
            </div>
          </div>
        {/key}
      {:else}
        <!-- RESULTS VIEW -->
        <div class="bg-white rounded-[2.5rem] border-4 border-brand shadow-[0_12px_0_0_var(--color-brand-dark)] p-10 text-center max-w-md mx-auto space-y-6 animate-bounce-in">
          <div class="w-24 h-24 bg-brand-light rounded-full border-4 border-brand flex items-center justify-center text-5xl mx-auto animate-bounce shadow-[0_6px_0_0_var(--color-brand-dark)]">
            🏆
          </div>
          <div>
            <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight mb-2 font-custom">
              ¡Juego Terminado!
            </h2>
            <p class="text-gray-500 font-bold text-sm">
              ¡Excelente esfuerzo practicando tu vocabulario!
            </p>
          </div>
          
          <div class="bg-brand-light/35 border-4 border-brand-light rounded-[2rem] p-6 shadow-inner">
            <p class="text-xs text-brand-dark font-black uppercase tracking-wider mb-1">Puntuación Final</p>
            <p class="text-5xl font-black text-gray-900">
              {score} <span class="text-xl text-gray-400 font-bold">/ {deck.length}</span>
            </p>
          </div>

          <button
            onclick={restartGame}
            class="w-full py-4 bg-[#f9c710] border-2 border-[#d4a007] text-gray-900 font-black rounded-2xl shadow-[0_4px_0_0_#d4a007] hover:translate-y-[4px] hover:shadow-none active:scale-95 transition-all text-lg flex items-center justify-center gap-2 cursor-pointer uppercase font-custom"
          >
            <RotateCcw size={20} />
            <span>Jugar de nuevo</span>
          </button>
        </div>
      {/if}
    {/if}

    <!-- FEEDBACK MESSAGE TOAST -->
    {#if message && currentIndex < deck.length}
      <div 
        class="mt-6 p-4 text-center font-black text-base md:text-lg border-2 rounded-2xl transition-all duration-300
        {message.includes('Correcto') 
          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-[0_4px_0_0_#047857] animate-bounce-in' 
          : 'bg-red-50 border-red-500 text-red-700 shadow-[0_4px_0_0_#b91c1c] animate-wiggle'}"
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
  }

  .backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .card-face {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .back {
    transform: rotateY(180deg);
  }

  .back:hover {
    transform: rotateY(180deg) translateY(3px);
  }

  .back:active {
    transform: rotateY(180deg) translateY(8px);
  }
</style>
