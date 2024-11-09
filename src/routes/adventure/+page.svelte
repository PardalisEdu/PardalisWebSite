<!-- MetroGameFrame.svelte -->
<script>
    let gameUrl = null;
    let estacion = "CHABACANO";
</script>

<div class="w-full min-h-screen bg-zinc-800 flex items-center justify-center p-4 mt-16">
    <div class="w-full max-w-6xl relative">
        <div class="relative bg-orange-600 rounded-lg p-4">
            <div class="bg-zinc-800 p-2 rounded-t-lg flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="text-white font-bold">
                        323
                    </div>
                </div>
                <div class="bg-black text-green-500 px-4 py-1 rounded font-mono text-sm font-bold tracking-wider">
                    {estacion}
                </div>
                <div class="text-white font-bold text-lg">
                    CDMX
                </div>
            </div>

            <div class="bg-black p-2">
                <div class="relative w-full" style="padding-top: 56.25%;">
                    <iframe
                            src={gameUrl}
                            title="Metro Game"
                            class="absolute top-0 left-0 w-full h-full border-2 border-zinc-700"
                            allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div class="bg-zinc-800 p-3 rounded-b-lg flex justify-between items-center">
                <!-- Controles que alguna dia funcionaran -->
                <div class="flex gap-4">
                    <div class="w-4 h-4 rounded-full bg-red-500 glow-color"></div>
                    <div class="w-4 h-4 rounded-full bg-yellow-500 glow-color"></div>
                    <div class="w-4 h-4 rounded-full bg-green-500 glow-color"></div>
                </div>
                <div class="bg-black px-4 py-1 rounded">
                    <div class="text-green-500 font-mono text-sm">
                        EN SERVICIO
                    </div>
                </div>
                <div class="flex gap-2">
                    <div class="w-6 h-3 bg-zinc-600 rounded"></div>
                    <div class="w-6 h-3 bg-zinc-600 rounded"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .bg-orange-600 {
        background-color: #FF4400;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .glow {
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
    }

    .glow-color {
        box-shadow: 0 0 8px currentColor;
    }

    .bg-zinc-800 {
        background: linear-gradient(45deg, #27272a 0%, #3f3f46 100%);
    }
</style>