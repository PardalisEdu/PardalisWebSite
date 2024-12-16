<script>
    const cards = [
        {
            emoji: "⭐",
            english: "STAR",
            spanish: "estrella",
            meaning: "¡Brillarás con luz propia! Grandes logros te esperan.",
            meaningEnglish: "You will shine bright! Great achievements await."
        },
        {
            emoji: "🌙",
            english: "MOON",
            spanish: "luna",
            meaning: "Tu intuición te guiará por el camino correcto.",
            meaningEnglish: "Your intuition will guide you on the right path."
        },
        {
            emoji: "☀️",
            english: "SUN",
            spanish: "sol",
            meaning: "La felicidad y el éxito iluminarán tu camino.",
            meaningEnglish: "Happiness and success will light your way."
        },
        {
            emoji: "🌈",
            english: "RAINBOW",
            spanish: "arcoiris",
            meaning: "Después de la tormenta, vendrán momentos de alegría.",
            meaningEnglish: "After the storm, joyful moments will come."
        },
        {
            emoji: "🌺",
            english: "FLOWER",
            spanish: "flor",
            meaning: "Es tiempo de crecer y florecer en nuevas direcciones.",
            meaningEnglish: "It's time to grow and bloom in new directions."
        },
        {
            emoji: "🦋",
            english: "BUTTERFLY",
            spanish: "mariposa",
            meaning: "Una transformación positiva está por llegar.",
            meaningEnglish: "A positive transformation is coming."
        }
    ];

    let selectedCard = null;
    let showMeaning = false;
    let isSelecting = false;
    let showTranslation = false;
    let shuffledCards = [];

    function shuffleCards() {
        shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    }

    function selectCard(card) {
        if (!isSelecting) {
            isSelecting = true;
            selectedCard = card;
            showMeaning = true;
        }
    }

    function resetGame() {
        selectedCard = null;
        showMeaning = false;
        isSelecting = false;
        showTranslation = false;
        shuffleCards();
    }

    function toggleTranslation() {
        showTranslation = !showTranslation;
    }

    shuffleCards();
</script>

<div class="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 pt-24 px-4 place-content-center py-20">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
            <h1 class="text-5xl md:text-6xl font-bold text-purple-200 mb-4">
                The Oracle 🔮
            </h1>
            <p class="text-xl text-purple-300 mb-8">
                {#if !selectedCard}
                    Choose a card to reveal your future... and learn English!
                {:else}
                    Your destiny has been revealed...
                {/if}
            </p>
        </div>

        {#if !selectedCard}
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                {#each shuffledCards as card}
                    <button
                        class="aspect-[2/3] bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-1 transform transition-all duration-300 hover:scale-105 hover:rotate-2"
                        on:click={() => selectCard(card)}
                    >
                        <div class="h-full w-full border-2 border-purple-400 rounded-xl flex items-center justify-center">
                            <div class="text-4xl">✨</div>
                        </div>
                    </button>
                {/each}
            </div>
        {:else}
            <div class="max-w-2xl mx-auto">
                <div class="bg-gradient-to-br from-purple-700 to-purple-900 rounded-3xl p-8 shadow-2xl border-2 border-purple-500">
                    <div class="text-center">
                        <div class="text-8xl mb-6">{selectedCard.emoji}</div>
                        <h2 class="text-4xl font-bold text-purple-200 mb-2">
                            {selectedCard.english}
                        </h2>
                        {#if showTranslation}
                            <p class="text-xl text-purple-400 mb-6">
                                ({selectedCard.spanish})
                            </p>
                        {/if}
                        <p class="text-xl text-purple-200 mb-6">
                            {showTranslation ? selectedCard.meaningEnglish : selectedCard.meaning}
                        </p>

                        <div class="flex justify-center gap-4">
                            <button
                                class="px-6 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors"
                                on:click={toggleTranslation}
                            >
                                {showTranslation ? 'Ver en Español 🇪🇸' : 'See in English 🇬🇧'}
                            </button>
                            
                            <button
                                class="px-6 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
                                on:click={resetGame}
                            >
                                Consultar de nuevo 🔮
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
