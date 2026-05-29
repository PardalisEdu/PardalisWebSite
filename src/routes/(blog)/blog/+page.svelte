<script lang="ts">
    import { goto } from '$app/navigation';
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

<svelte:head>
    <title>Blog | Pardalis - Novedades y Consejos de Inglés</title>
    <meta name="description" content="Lee las últimas noticias, consejos educativos y actualizaciones de Pardalis. Recursos para que los niños aprendan inglés con contexto mexicano." />
    <meta name="keywords" content="blog educativo, aprender inglés niños, recursos maestros inglés México" />
</svelte:head>

<div class="min-h-screen bg-[#FFFDF5]">
    <!-- Header -->
    <div class="border-b border-gray-100 bg-white">
        <div class="max-w-6xl mx-auto px-4 pt-28 pb-12 md:pt-36 md:pb-16">
            <div class="max-w-3xl">
                <div class="inline-flex items-center gap-2 text-xs font-bold text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200 uppercase tracking-wider mb-5">
                    <span>Blog</span>
                </div>
                <h1 class="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                    Blog de Pardalis
                </h1>
                <p class="text-lg text-gray-500 max-w-2xl leading-relaxed">
                    Novedades, consejos y recursos sobre el aprendizaje del inglés para niños en México.
                </p>
            </div>
        </div>
    </div>

    <!-- Search + Filters -->
    <div class="border-b border-gray-100 bg-white">
        <div class="max-w-6xl mx-auto px-4 py-6">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div class="relative w-full md:w-80">
                    <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar artículos..."
                        class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-hidden focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-400/20 transition-all"
                        bind:value={searchTerm}
                    />
                </div>
                <div class="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                    {#each categories as category}
                        <button
                            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                            {currentCategory === category 
                                ? 'bg-gray-900 text-white' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}"
                            onclick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <!-- Posts -->
    <div class="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {#if filteredBlogs.length === 0}
            <div class="text-center py-20">
                <span class="text-4xl mb-4 block text-gray-300">📄</span>
                <p class="text-gray-500 font-bold text-lg">No se encontraron artículos</p>
                <p class="text-gray-400 text-sm mt-1">Intenta con otra búsqueda o categoría</p>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {#each filteredBlogs as post (post.id)}
                    <BlogCard {post} />
                {/each}
            </div>

            <!-- Pagination -->
            <div class="mt-16 flex justify-center items-center gap-3">
                <button
                    class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                    {currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}"
                    disabled={currentPage === 1}
                    onclick={() => handlePageChange(-1)}
                >
                    ← Anterior
                </button>
                <span class="text-sm font-bold text-gray-300 px-2">{currentPage}</span>
                <button
                    class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                    {filteredBlogs.length < 10
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}"
                    disabled={filteredBlogs.length < 10}
                    onclick={() => handlePageChange(1)}
                >
                    Siguiente →
                </button>
            </div>
        {/if}
    </div>
</div>