# WordScramble.svelte
<script>
    const words = [
        { 
            word: "TICKET", 
            hint: "Necesitas esto para viajar en el metro 🎫",
            spanish: "boleto",
            category: "metro"
        },
        { 
            word: "STATION", 
            hint: "Lugar donde esperas el metro 🚉",
            spanish: "estación",
            category: "metro"
        },
        { 
            word: "APPLE", 
            hint: "Una fruta roja 🍎",
            spanish: "manzana",
            category: "tianguis"
        },
        { 
            word: "STREET", 
            hint: "Caminas por aquí 🛣️",
            spanish: "calle",
            category: "calle"
        },
        { 
            word: "MARKET", 
            hint: "Lugar donde compras comida 🏪",
            spanish: "mercado",
            category: "tianguis"
        }
    ];

    let currentWordData = words[Math.floor(Math.random() * words.length)];
    let scrambledWord = scrambleString(currentWordData.word);
    let userGuess = '';
    let score = 0;
    let showHint = false;
    let remainingSkips = 3;
    let message = '';

    function scrambleString(str) {
        return str.split('')
                 .map(char => ({ char, sort: Math.random() }))
                 .sort((a, b) => a.sort - b.sort)
                 .map(({ char }) => char)
                 .join('');
    }

    function getNewWord() {
        currentWordData = words[Math.floor(Math.random() * words.length)];
        scrambledWord = scrambleString(currentWordData.word);
        userGuess = '';
        showHint = false;
        message = '';
    }

    function handleInput() {
        if (userGuess.toUpperCase() === currentWordData.word) {
            score += 10;
            message = '¡Correcto! 🎉';
            setTimeout(() => {
                message = '';
                getNewWord();
            }, 1500);
        }
    }

    function skipWord() {
        if (remainingSkips > 0) {
            remainingSkips--;
            getNewWord();
        }
    }

    function toggleHint() {
        showHint = !showHint;
    }
</script>

<div class="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 pt-24 px-4 grid place-content-center">
    <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                Word Scramble 🔤
            </h1>
            <p class="text-xl text-gray-600 mb-8">
                ¡Descubre la palabra en inglés!
            </p>
            
            <div class="flex justify-center gap-8 text-lg font-bold mb-8">
                <div class="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-yellow-200">
                    Puntuación: {score}
                </div>
                <div class="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-yellow-200">
                    Saltos: {remainingSkips}
                </div>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div class="text-center mb-8">
                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Categoría: {currentWordData.category}
                </span>
                
                {#if showHint}
                    <div class="mt-2 text-lg text-gray-700">
                        {currentWordData.hint}
                    </div>
                    <div class="mt-1 text-sm text-gray-500">
                        En español: {currentWordData.spanish}
                    </div>
                {/if}
            </div>

            <div class="text-center mb-8">
                <p class="text-4xl font-bold text-yellow-500 tracking-wider">
                    {scrambledWord}
                </p>
            </div>

            <div class="mb-8">
                <input
                    type="text"
                    bind:value={userGuess}
                    oninput={handleInput}
                    placeholder="Escribe tu respuesta aquí..."
                    class="w-full px-4 py-3 text-lg text-center border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-yellow-400 transition-colors"
                    maxlength={currentWordData.word.length}
                />
            </div>

            <div class="flex justify-center gap-4">
                <button
                    class="px-6 py-2 bg-yellow-400 text-white rounded-lg font-bold hover:bg-yellow-500 transition-colors"
                    onclick={toggleHint}
                >
                    {showHint ? 'Ocultar Pista 🙈' : 'Mostrar Pista 💡'}
                </button>
                
                <button
                    class="px-6 py-2 bg-gray-400 text-white rounded-lg font-bold hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onclick={skipWord}
                    disabled={remainingSkips === 0}
                >
                    Saltar Palabra ⏭️ ({remainingSkips})
                </button>
            </div>
        </div>

        {#if message}
            <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="text-3xl font-bold text-yellow-500 bg-white px-8 py-4 rounded-xl shadow-lg animate-bounce">
                    {message}
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    @keyframes bounce {
        0%, 100% { transform: translateY(-50%) scale(1); }
        50% { transform: translateY(-50%) scale(1.1); }
    }

    .animate-bounce {
        animation: bounce 0.5s ease-in-out infinite;
    }
</style>
