<script lang="ts">
  import { spring } from "svelte/motion";

  // Define interface for card structure
  interface FlashCard {
    english: string;
    spanish: string;
    context: string;
    category: string;
  }

  // Define cards with proper typing
  const cards: FlashCard[] = [
    {
      english: "ticket",
      spanish: "boleto",
      context: "I need to buy a ticket for the metro.",
      category: "metro",
    },
    {
      english: "platform",
      spanish: "andén",
      context: "The train arrives at platform 3.",
      category: "metro",
    },
    {
      english: "fruit",
      spanish: "fruta",
      context: "I buy fresh fruit at the market.",
      category: "tianguis",
    }
  ];

  // Use Svelte 5 state with explicit typing
  let currentIndex = $state<number>(0);
  let isFlipped = $state<boolean>(false);
  let score = $state<number>(0);
  let deck = $state<FlashCard[]>([]);
  let showAnswer = $state<boolean>(false);
  let cardRotation = spring<number>(0);
  let message = $state<string>("");

  $effect(() => {
    deck = cards.sort(() => Math.random() - 0.5);
  });

  function flipCard(): void {
    showAnswer = !showAnswer;
    cardRotation.set(showAnswer ? 180 : 0);
  }

  /**
   * Funcion para validar tu respuesta correcta
   * @param correct Indica si la respuesta es correcta
   */
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
        message = `¡Juego terminado! Puntuación: ${score}/${deck.length}`;
      }
    }, 1000);
  }

  function restartGame(): void {
    deck = cards.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    score = 0;
    showAnswer = false;
    cardRotation.set(0);
    message = "";
  }
</script>

<div
  class="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 pt-24 px-4 grid place-content-center"
>
  <div class="max-w-2xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Flash Cards 📚</h1>
      <p class="text-xl text-gray-600">
        ¡Adivina el significado y aprende nuevas palabras!
      </p>
    </div>

    <div class="text-center mb-8">
      <span class="text-2xl font-bold text-yellow-500">
        Puntuación: {score}/{deck.length}
      </span>
    </div>

    {#if deck.length > 0 && currentIndex < deck.length}
      <div class="card-container relative w-full aspect-[3/2] perspective-1000">
        <div
          class="card-content absolute inset-0 transform-style-3d"
          style="transform: rotateY({$cardRotation}deg)"
        >
          <div
            class="card-face front absolute inset-0 bg-white rounded-2xl shadow-2xl p-8 backface-hidden"
            role="button"
            tabindex="0"
            onclick={flipCard}
            onkeydown={(e) => e.key === "Enter" && flipCard()}
          >
            <div class="h-full flex flex-col items-center justify-center">
              <span class="text-6xl mb-6">🤔</span>
              <h2 class="text-4xl font-bold mb-4">
                {deck[currentIndex].english}
              </h2>
              <p class="text-gray-600 italic">"{deck[currentIndex].context}"</p>
            </div>
          </div>

          <div
            class="card-face back absolute inset-0 bg-white rounded-2xl shadow-2xl p-8 backface-hidden rotate-y-180"
            role="button"
            tabindex="0"
            onclick={flipCard}
            onkeydown={(e) => e.key === "Enter" && flipCard()}
          >
            <div class="h-full flex flex-col items-center justify-center">
              <span class="text-6xl mb-6">💡</span>
              <h2 class="text-4xl font-bold mb-4">
                {deck[currentIndex].spanish}
              </h2>

              <div class="flex gap-4 mt-8">
                <button
                  onclick={() => handleAnswer(true)}
                  class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  ¡Lo sabía! ✅
                </button>
                <button
                  onclick={() => handleAnswer(false)}
                  class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Necesito repasar ❌
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}

    {#if message}
      <div
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl text-center z-50"
      >
        <p class="text-2xl font-bold mb-4">{message}</p>
        {#if currentIndex === deck.length}
          <button
            onclick={restartGame}
            class="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-white transition-colors"
          >
            Jugar de nuevo 🔄
          </button>
        {/if}
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
    border-radius: 16px;
  }

  .front {
    background: white;
  }

  .back {
    background: white;
    transform: rotateY(180deg);
  }
</style>
