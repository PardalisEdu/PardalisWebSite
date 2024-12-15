<script>
    import { onMount } from 'svelte';

    let bounce = $state(false);
    let cowPosition = $state(0);
    let intervals = [];

    /**
     * @param {number} pos
     * @returns {string}
     */
    function getCowPosition(pos) {
        switch(pos) {
            case 0:
                return '🐄';
            case 1:
                return '🐮';
            case 2:
                return '🐄';
            default:
                return '🐄';
        }
    }

    onMount(() => {
        intervals.push(setInterval(() => {
            bounce = !bounce;
        }, 500));

        intervals.push(setInterval(() => {
            cowPosition = (cowPosition + 1) % 3;
        }, 800));

        return () => {
            intervals.forEach(interval => clearInterval(interval));
        };
    });

    const funFacts = [
        "Las vacas tienen mejores amigas y se estresan cuando están separadas",
        "Las vacas pueden dormir de pie, pero necesitan acostarse para el sueño REM",
        "¡Las vacas pueden subir escaleras, pero no pueden bajarlas!",
        "Una vaca puede producir más de 200,000 vasos de leche en su vida"
    ];

    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    let cow = $derived(getCowPosition(cowPosition));
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-4">
    <div class="max-w-2xl w-full text-center">
        <h1
                class="text-9xl font-bold text-[#f9c710] mb-8 transition-transform duration-300"
                class:transform={bounce}
                class:-translate-y-2={bounce}
        >
            4{cow}4
        </h1>

        <div class="space-y-6">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">
                ¡Muuuuuy perdido! 🌾
            </h2>

            <p class="text-xl text-gray-600 mb-8">
                Parece que esta página se fue a pastar a otro lado...
            </p>

            <div class="flex flex-col items-center space-y-4">
                <p class="text-lg text-gray-700">
                    ¿Qué dice la vaca? {bounce ? "¡Muuuuuuu!" : "..."}
                </p>

                <div class="text-2xl">
                    {#each Array(3) as _, i}
                        <span class="mx-1">🌿</span>
                    {/each}
                </div>
            </div>

            <div class="mt-12">
                <a
                        href="/"
                        class="inline-flex items-center px-8 py-3 bg-[#f9c710] text-white rounded-lg font-bold hover:bg-yellow-600 transition-colors text-lg"
                >
                    Volver al establo 🏠
                </a>
            </div>

            <div class="mt-8 text-gray-500">
                <p>¿Sabías que...? {randomFact} 🐮</p>
            </div>
        </div>
    </div>
</div>

<style>
    .transform {
        transform: translateY(-0.5rem);
    }
</style>