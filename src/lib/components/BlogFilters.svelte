<!-- src/lib/components/BlogFilters.svelte -->
<script>
    import { Search } from 'lucide-svelte';

    let {searchTerm, selectedCategory} = $props();

    const categories = [
        "Todos", "Anuncios", "Consejos", "Educación", "Actualizaciones"
    ];
</script>

<div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
    <div class="relative w-full md:w-96">
        <input
                type="text"
                placeholder="Buscar artículos..."
                class="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-yellow-400"
                bind:value={searchTerm}
        />
        <Search class="absolute left-4 top-2.5 text-gray-400" size={20}/>
    </div>
    <div class="flex gap-2 overflow-x-auto w-full md:w-auto">
        {#each categories as category}
            <button
                    class="px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                    {selectedCategory === category ? 'bg-yellow-400 text-white' : 'bg-white text-gray-700'}
                    hover:bg-yellow-400 hover:text-white
                    focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onclick={() => selectedCategory = category}
            >
                {category}
            </button>
        {/each}
    </div>
</div>