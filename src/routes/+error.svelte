<script lang="ts">
    import { onMount } from 'svelte';

    let bounce = $state(false);
    let cowPosition = $state(0);
    let intervals: ReturnType<typeof setInterval>[] = [];

    function getCowPosition(pos: number) {
        switch(pos) {
            case 0:
                return '🐄';
            case 1:
                return '🐮';
            default:
                return '🐄';
        }
    }

    onMount(() => {
        intervals.push(setInterval(() => {
            bounce = !bounce;
        }, 600));

        intervals.push(setInterval(() => {
            cowPosition = (cowPosition + 1) % 2;
        }, 1000));

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

<div class="min-h-screen flex flex-col items-center justify-center bg-[#FFFDF5] p-4">
    <div class="max-w-lg w-full text-center">
        <!-- 404 with cow -->
        <div class="mb-8">
            <span class="text-8xl md:text-9xl font-black text-[#f9c710] block transition-transform duration-300" class:scale-110={bounce}>
                4{cow}4
            </span>
        </div>

        <!-- Ground shadow -->
        <div class="w-32 h-4 bg-gray-900/5 blur-lg rounded-full mx-auto mb-8 transition-all duration-300" class:scale-75={bounce}></div>

        <div class="space-y-6">
            <div class="inline-flex items-center gap-2 bg-yellow-100 border-2 border-yellow-200 text-yellow-800 px-6 py-2 rounded-full font-bold text-sm">
                <span>🌾</span>
                ¡Muuuuuy perdido!
            </div>

            <h2 class="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                Esta página se fue a pastar a otro lado...
            </h2>

            <p class="text-lg text-gray-500 font-medium">
                {bounce ? "¡Muuuuuuu!" : "¿Qué dice la vaca?"}
            </p>

            <!-- Grass decoration -->
            <div class="text-3xl space-x-2">
                <span class="inline-block animate-wiggle">🌿</span>
                <span class="inline-block">🌾</span>
                <span class="inline-block animate-wiggle" style="animation-delay: 0.3s">🌿</span>
            </div>

            <div class="pt-4">
                <a
                    href="/"
                    class="inline-flex items-center gap-3 px-10 py-4 bg-[#f9c710] text-white rounded-2xl font-black text-lg shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150"
                >
                    <span>🏠</span>
                    Volver al establo
                </a>
            </div>

            <div class="mt-8 bg-white rounded-2xl border-2 border-yellow-100 p-5 shadow-sm">
                <p class="text-gray-500 text-sm font-medium">
                    <span class="text-yellow-600">🐮</span> ¿Sabías que...? {randomFact}
                </p>
            </div>
        </div>
    </div>
</div>