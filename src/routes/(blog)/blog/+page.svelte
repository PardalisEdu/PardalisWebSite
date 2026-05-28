<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { Search } from 'lucide-svelte';
    import BlogCard from '$lib/components/BlogCard.svelte';
    import type { BlogPost } from '$lib/types/types';

    let { data } = $props();

    let searchTerm = $state('');
    let currentPage = $state(data.page);
    let currentCategory = $state(data.categoria);
    let blogs = $state<BlogPost[]>(data.blogs);

    const categories = [
        "Todos", "Anuncios", "Consejos", "Educación", "Actualizaciones"
    ];

    let filteredBlogs = $derived(
        blogs.filter((blog: BlogPost) =>
            !searchTerm ||
            blog.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.extracto.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    function navigate(categoria: string, pageNum: number) {
        const params = new URLSearchParams();
        if (categoria !== 'Todos') params.set('categoria', categoria);
        if (pageNum > 1) params.set('page', pageNum.toString());
        const qs = params.toString();
        goto(qs ? `?${qs}` : '');
    }

    function handleCategoryChange(categoria: string) {
        currentCategory = categoria;
        currentPage = 1;
        navigate(categoria, 1);
    }

    function handlePageChange(delta: number) {
        const newPage = currentPage + delta;
        currentPage = newPage;
        navigate(currentCategory, newPage);
    }
</script>

<div class="min-h-screen bg-[#FFFDF5]">
    <div class="relative overflow-hidden bg-linear-to-br from-[#f9c710] via-[#f9c710] to-yellow-300 pt-28 pb-20 md:pt-36 md:pb-28">
        <div class="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" class="opacity-10">
                <pattern id="dots-blog" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="2" fill="white" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots-blog)" />
            </svg>
            <div class="absolute -top-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div class="absolute bottom-10 left-10 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div class="relative container mx-auto px-4 text-center">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
                <span>📖</span>
                Novedades y recursos
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-sm">
                Blog de Pardalis
            </h1>
            <p class="text-xl md:text-2xl text-yellow-900 font-medium max-w-2xl mx-auto leading-relaxed">
                Descubre novedades, consejos y recursos para hacer del aprendizaje
                del inglés una aventura increíble
            </p>
        </div>
    </div>

    <div class="container mx-auto px-4 -mt-8 relative z-10">
        <div class="bg-white rounded-[2rem] border-4 border-yellow-100 shadow-[0_10px_0_0_#fef08a] p-6 md:p-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Buscar artículos..."
                        class="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:outline-hidden focus:border-[#f9c710] focus:bg-white transition-all text-sm font-medium text-gray-700 placeholder:text-gray-400"
                        bind:value={searchTerm}
                    />
                    <Search class="absolute left-4 top-3.5 text-gray-400" size={20} />
                </div>
                <div class="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {#each categories as category}
                        <button
                            class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap
                            {currentCategory === category 
                                ? 'bg-[#f9c710] text-white shadow-[0_3px_0_0_#d4a007]' 
                                : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-700'}"
                            onclick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <div class="container mx-auto px-4 py-12">
        {#if filteredBlogs.length === 0}
            <div class="text-center py-16">
                <span class="text-5xl mb-4 block">🔍</span>
                <p class="text-gray-500 font-bold text-xl">No se encontraron artículos</p>
                <p class="text-gray-400 mt-2">Intenta con otra búsqueda o categoría</p>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each filteredBlogs as post (post.id)}
                    <BlogCard {post} />
                {/each}
            </div>

            <div class="mt-12 flex justify-center items-center gap-4">
                <button
                    class="px-6 py-3 rounded-xl font-bold transition-all duration-200
                    {currentPage === 1
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-[#f9c710] text-white shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 active:scale-95'}"
                    disabled={currentPage === 1}
                    onclick={() => handlePageChange(-1)}
                >
                    ← Anterior
                </button>
                <span class="text-gray-500 font-bold text-sm">Página {currentPage}</span>
                <button
                    class="px-6 py-3 rounded-xl font-bold transition-all duration-200
                    {filteredBlogs.length < 10
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-[#f9c710] text-white shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 active:scale-95'}"
                    disabled={filteredBlogs.length < 10}
                    onclick={() => handlePageChange(1)}
                >
                    Siguiente →
                </button>
            </div>
        {/if}
    </div>
</div>