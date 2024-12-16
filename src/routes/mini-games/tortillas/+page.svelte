<script>
    const TORTILLA_PRICE = 22;

    const missions = [
        { 
            amount: 1000, 
            english: "one kilogram of tortillas",
            spanish: "un kilo de tortillas",
            shortEnglish: "1 kg"
        },
        { 
            amount: 500, 
            english: "half a kilogram of tortillas",
            spanish: "medio kilo de tortillas",
            shortEnglish: "0.5 kg"
        },
        { 
            amount: 250, 
            english: "quarter kilogram of tortillas",
            spanish: "un cuarto de tortillas",
            shortEnglish: "0.25 kg"
        },
        { 
            amount: 300, 
            english: "three hundred grams of tortillas",
            spanish: "trescientos gramos de tortillas",
            shortEnglish: "300 g"
        },
        { 
            amount: 750, 
            english: "three quarters of a kilogram of tortillas",
            spanish: "tres cuartos de tortillas",
            shortEnglish: "0.75 kg"
        }
    ];

    const availableMoney = [
        { value: 100, type: "bill", emoji: "💵", english: "one hundred pesos" },
        { value: 50, type: "bill", emoji: "💵", english: "fifty pesos" },
        { value: 20, type: "coin", emoji: "🪙", english: "twenty pesos" },
        { value: 10, type: "coin", emoji: "🪙", english: "ten pesos" },
        { value: 5, type: "coin", emoji: "🪙", english: "five pesos" },
        { value: 2, type: "coin", emoji: "🪙", english: "two pesos" },
        { value: 1, type: "coin", emoji: "🪙", english: "one peso" }
    ];

    let currentMission = null;
    let playerMoney = [];
    let selectedAmount = "";
    let gameState = "selecting_money";
    let givenChange = 0;
    let correctChange = 0;
    let isChangeCorrect = true;
    let score = 0;
    let message = "";
    let showSpanish = false;

    function startNewGame() {
        currentMission = missions[Math.floor(Math.random() * missions.length)];
        const missionCost = (currentMission.amount / 1000) * TORTILLA_PRICE;
        let totalMoney = missionCost + Math.floor(Math.random() * 50) + 20;
        
        playerMoney = [];
        let remaining = totalMoney;
        
        availableMoney.forEach(money => {
            while (remaining >= money.value) {
                playerMoney.push({...money});
                remaining -= money.value;
            }
        });
        
        gameState = "selecting_money";
        selectedAmount = "";
        message = "";
    }

    function selectAmount(amount) {
        selectedAmount = amount;
        const cost = (amount.amount / 1000) * TORTILLA_PRICE;
        correctChange = calculateTotalMoney() - cost;
        
        isChangeCorrect = Math.random() > 0.5;
        if (!isChangeCorrect) {
            givenChange = correctChange + (Math.random() > 0.5 ? 5 : -5);
        } else {
            givenChange = correctChange;
        }
        
        gameState = "checking_change";
    }

    function calculateTotalMoney() {
        return playerMoney.reduce((sum, money) => sum + money.value, 0);
    }

    function checkChange(playerAnswer) {
        if (playerAnswer === isChangeCorrect) {
            score += 10;
            message = "Correct! +10 points";
        } else {
            message = "Wrong! The change was " + (isChangeCorrect ? "correct" : "incorrect");
        }
        
        setTimeout(() => {
            startNewGame();
        }, 2000);
    }

    startNewGame();
</script>

<div class="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 pt-24 px-2 grid place-content-center py-10">
    <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
            <h1 class="text-4xl md:text-6xl font-bold text-orange-800 mb-4">
                Tortilla Quest! 🫓
            </h1>
            <p class="text-xl text-orange-700 mb-4">
                Score: {score}
            </p>
            <div class="bg-white rounded-xl p-4 shadow-lg">
                <p class="text-lg mb-2">
                    Mom says: "Go get {currentMission.english}"
                </p>
                {#if showSpanish}
                    <p class="text-sm text-gray-600">
                        Mamá dice: "Ve por {currentMission.spanish}"
                    </p>
                {/if}
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {#if gameState === "selecting_money"}
                <h2 class="text-2xl font-bold mb-4">Your available money:</h2>
                <div class="flex flex-wrap gap-4 mb-6">
                    {#each playerMoney as money, i}
                        <div class="text-3xl group relative">
                            {money.emoji}
                            <span class="text-sm">
                                ${money.value}
                            </span>
                            <span class="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {money.english}
                            </span>
                        </div>
                    {/each}
                </div>
                <p class="mb-4">How many tortillas would you like to order?</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each missions as mission}
                        <button
                            class="p-4 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors text-left"
                            onclick={() => selectAmount(mission)}
                        >
                            {mission.shortEnglish}
                            <span class="block text-sm text-gray-600">
                                (${(mission.amount / 1000 * TORTILLA_PRICE).toFixed(2)})
                            </span>
                        </button>
                    {/each}
                </div>

            {:else if gameState === "checking_change"}
                <div class="text-center">
                    <h2 class="text-2xl font-bold mb-4">They give you ${givenChange} as change!</h2>
                    <p class="mb-6">Is the change correct?</p>
                    <div class="flex justify-center gap-4">
                        <button
                            class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            onclick={() => checkChange(true)}
                        >
                            Yes ✅
                        </button>
                        <button
                            class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            onclick={() => checkChange(false)}
                        >
                            No ❌
                        </button>
                    </div>
                </div>
            {/if}
        </div>

        <div class="text-center">
            <button
                class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                onclick={() => showSpanish = !showSpanish}
            >
                {showSpanish ? 'Hide Spanish 🙈' : 'Show Spanish 🇲🇽'}
            </button>
        </div>

        {#if message}
            <div class="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                <p class="font-bold">{message}</p>
            </div>
        {/if}
    </div>
</div>
