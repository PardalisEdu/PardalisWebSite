<script>
    import { onMount } from 'svelte';
    import { Search } from 'lucide-svelte';
    import { blogStore } from '$lib/stores/blogStore';
    import BlogCard from '$lib/components/BlogCard.svelte';

    /** @type {import('./$types').PageData} */
    let { data } = $props();

    let searchTerm = $state('');
    let currentCategory = $state(data.categoria);
    let currentPage = $state(data.page);

    const categories = [
        "Todos", "Anuncios", "Consejos", "Educación", "Actualizaciones"
    ];

    // Inicializar el store con los datos del servidor
    onMount(() => {
        if (data.initialBlogs && data.initialBlogs.length > 0) {
            blogStore.update(state => ({
                ...state,
                blogs: data.initialBlogs,
                currentPage: data.page,
                selectedCategory: data.categoria
            }));
        }
    });

    // Obtener los blogs del store
    const store = $derived($blogStore);

    // Filtrar los blogs
    let filteredBlogs = $derived(
        store.blogs.filter(blog =>
            !searchTerm ||
            blog.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.extracto.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    $effect(() => {
        blogStore.loadBlogs(currentPage, currentCategory);
    });

    function handleCategoryChange(categoria) {
        currentCategory = categoria;
        currentPage = 1;
    }

    function handleSearch(e) {
        if (e.key === 'Enter') {
            console.log('Buscando:', searchTerm);
        }
    }

    // Para debugging
    $effect(() => {
        console.log('Estado actual del store:', store);
        console.log('Blogs filtrados:', filteredBlogs);
    });
</script>

<div class="min-h-screen bg-gray-50 pt-20">
    <!-- Hero Section -->
    <div class="bg-yellow-400 py-12">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl md:text-6xl font-bold text-center text-white mb-6">
                Blog de Pardalis
            </h1>
            <p class="text-xl text-center text-white max-w-2xl mx-auto">
                Descubre novedades, consejos y recursos para hacer del aprendizaje
                del inglés una aventura increíble
            </p>
        </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="relative w-full md:w-96">
                <input
                        type="text"
                        placeholder="Buscar artículos..."
                        class="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-yellow-400"
                        bind:value={searchTerm}
                        onkeydown={handleSearch}
                />
                <Search class="absolute left-4 top-2.5 text-gray-400" size={20} />
            </div>
            <div class="flex gap-2 overflow-x-auto w-full md:w-auto">
                {#each categories as category}
                    <button
                            class="px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                            {currentCategory === category 
                                ? 'bg-yellow-400 text-white' 
                                : 'bg-white text-gray-700 hover:bg-yellow-400 hover:text-white'}
                            focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            onclick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </button>
                {/each}
            </div>
        </div>
    </div>

    <!-- Blog Posts Grid -->
    <div class="container mx-auto px-4 py-8">
        {#if $blogStore.loading}
            <div class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-yellow-400 border-t-transparent"></div>
            </div>
        {:else if $blogStore.error}
            <div class="text-center py-12 text-red-600">
                {$blogStore.error}
            </div>
        {:else if filteredBlogs.length === 0}
            <div class="text-center py-12 text-gray-600">
                No se encontraron blogs para mostrar
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each filteredBlogs as post (post.id)}
                    <BlogCard {post} />
                {/each}
            </div>

            <!-- Paginación -->
            <div class="mt-8 flex justify-center gap-2">
                <button
                        class="px-4 py-2 rounded-lg bg-yellow-400 text-white disabled:opacity-50"
                        disabled={currentPage === 1}
                        onclick={() => currentPage--}
                >
                    Anterior
                </button>
                <button
                        class="px-4 py-2 rounded-lg bg-yellow-400 text-white disabled:opacity-50"
                        disabled={filteredBlogs.length < 10}
                        onclick={() => currentPage++}
                >
                    Siguiente
                </button>
            </div>
        {/if}
    </div>
</div>