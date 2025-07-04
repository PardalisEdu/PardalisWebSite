<script lang="ts">
    // Define interfaces for type safety
    interface WordPair {
        emoji: string;
        english: string;
        spanish: string;
    }

    interface MemoryCard {
        id: number;
        emoji: string;
        text: string;
        type: 'english' | 'spanish';
        pairId: number;
    }
    
    const wordPairs: WordPair[] = [
        { emoji: "🚇", english: "subway", spanish: "metro" },
        { emoji: "🚌", english: "bus", spanish: "autobús" },
        { emoji: "🍎", english: "apple", spanish: "manzana" },
        { emoji: "🥑", english: "avocado", spanish: "aguacate" },
        { emoji: "🌮", english: "taco", spanish: "taco" },
        { emoji: "🥕", english: "carrot", spanish: "zanahoria" },
        { emoji: "🚦", english: "traffic light", spanish: "semáforo" },
        { emoji: "🏪", english: "store", spanish: "tienda" }
    ];

    // Use Svelte 5 state with explicit typing
    let cards = $state<MemoryCard[]>([]);
    let flippedCards = $state<number[]>([]);
    let matchedPairs = $state<number[]>([]);
    let isLocked = $state<boolean>(false);
    let moves = $state<number>(0);
    let gameComplete = $state<boolean>(false);

    function initGame(): void {
        const gameDeck: MemoryCard[] = wordPairs.flatMap((pair, index) => [
            {
                id: index * 2,
                emoji: pair.emoji,
                text: pair.english,
                type: 'english',
                pairId: index
            },
            {
                id: index * 2 + 1,
                emoji: pair.emoji,
                text: pair.spanish,
                type: 'spanish',
                pairId: index
            }
        ]);
        
        cards = gameDeck.sort(() => Math.random() - 0.5);
        flippedCards = [];
        matchedPairs = [];
        moves = 0;
        gameComplete = false;
    }

    function handleCardClick(index: number): void {
        if (
            isLocked || 
            flippedCards.includes(index) || 
            matchedPairs.includes(cards[index].pairId)
        ) {
            return;
        }

        flippedCards = [...flippedCards, index];

        if (flippedCards.length === 2) {
            moves++;
            isLocked = true;

            const [firstIndex, secondIndex] = flippedCards;
            const firstCard = cards[firstIndex];
            const secondCard = cards[secondIndex];

            if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
                matchedPairs = [...matchedPairs, firstCard.pairId];
                flippedCards = [];
                isLocked = false;

                if (matchedPairs.length === wordPairs.length) {
                    gameComplete = true;
                }
            } else {
                setTimeout(() => {
                    flippedCards = [];
                    isLocked = false;
                }, 1000);
            }
        }
    }

    function restartGame(): void {
        initGame();
    }

    $effect(() => {
        initGame();
    });
</script>

<div class="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 pt-24 px-4 mb-20 mt-10">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                Emoji Memory 🎴
            </h1>
            <p class="text-xl text-gray-600 mb-8">
                ¡Encuentra las parejas de palabras en inglés y español!
            </p>
            
            <div class="flex justify-center gap-8 text-lg font-bold mb-8">
                <div class="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-yellow-200">
                    Movimientos: {moves}
                </div>
                <div class="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-yellow-200">
                    Pares: {matchedPairs.length}/{wordPairs.length}
                </div>
            </div>

            <button
                type="button"
                class="bg-yellow-400 text-white px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors mb-8"
                onclick={restartGame}
            >
                Reiniciar Juego 🔄
            </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {#each cards as card, index}
                <button 
                    type="button"
                    class="aspect-square cursor-pointer"
                    onclick={() => handleCardClick(index)}
                    onkeydown={(e) => e.key === 'Enter' && handleCardClick(index)}
                    aria-label={`Tarjeta con emoji ${card.emoji}`}
                >
                    <div
                        class="w-full h-full relative transform-gpu transition-all duration-500"
                        class:rotate-y-180={flippedCards.includes(index) || matchedPairs.includes(card.pairId)}
                    >
                        <div class="absolute w-full h-full backface">
                            <div class="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-xl flex items-center justify-center text-4xl p-4">
                                ❓
                            </div>
                        </div>

                        <div class="absolute w-full h-full backface rotate-y-180">
                            <div class="w-full h-full bg-white rounded-xl shadow-xl flex flex-col items-center justify-center p-4 border-2 border-yellow-200">
                                <span class="text-4xl mb-2">{card.emoji}</span>
                                <span class="text-sm font-bold text-gray-700">{card.text}</span>
                                <span class="text-xs text-gray-500 mt-1">
                                    {card.type === 'english' ? 'English' : 'Español'}
                                </span>
                            </div>
                        </div>
                    </div>
                </button>
            {/each}
        </div>

        {#if gameComplete}
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-2xl p-8 text-center max-w-md mx-4 transform animate-bounce-in">
                    <h2 class="text-3xl font-bold mb-4">¡Felicitaciones! 🎉</h2>
                    <p class="text-xl mb-6">
                        ¡Completaste el juego en {moves} movimientos!
                    </p>
                    <button
                        type="button"
                        class="bg-yellow-400 text-white px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors"
                        onclick={restartGame}
                    >
                        ¡Jugar otra vez! 🔄
                    </button>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    :global(body) {
      background-image: linear-gradient(to bottom, #fefce8, #fef9c3);
    }

    .backface {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

    .rotate-y-180 {
        transform: rotateY(180deg);
    }

    .transform-gpu {
        transform-style: preserve-3d;
    }

    @keyframes bounce-in {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); opacity: 0.8; }
        70% { transform: scale(0.9); opacity: 0.9; }
        100% { transform: scale(1); opacity: 1; }
    }

    .animate-bounce-in {
        animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
</style>
