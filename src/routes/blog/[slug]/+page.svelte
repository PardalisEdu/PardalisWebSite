<script>
    import { Calendar, Clock, Tag, Share2 } from 'lucide-svelte';

    /** @type {import('./$types').PageData} */
    let { data } = $props();

    let blog = $derived(data.blog);

    async function handleShare() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.titulo,
                    text: blog.extracto,
                    url: window.location.href
                });
            } catch (error) {
                console.error('Error compartiendo:', error);
            }
        }
    }
</script>

<div class="min-h-screen bg-gray-50 pt-20">
    <!-- Hero Section -->
    <div class="bg-yellow-400 py-12">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <!-- Metadata del post -->
                <div class="flex items-center gap-4 text-white mb-4">
                    <span class="bg-yellow-500 px-3 py-1 rounded-full text-sm font-medium">
                        {blog.categoria}
                    </span>
                    <div class="flex items-center">
                        <Clock size={16} class="mr-1" />
                        <span class="text-sm">{blog.tiempo_lectura} min lectura</span>
                    </div>
                </div>
                
                <!-- Título -->
                <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                    {blog.titulo}
                </h1>

                <!-- Autor y fecha -->
                <div class="flex items-center gap-4">
                    <div class="text-white">
                        <p class="font-medium">Por {blog.autor_apodo}</p>
                        <div class="flex items-center text-sm">
                            <Calendar size={14} class="mr-1" />
                            {new Date(blog.fecha_publicacion).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Contenido Principal -->
    <div class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto">
            <!-- Imagen de portada -->
            {#if blog.imagen_portada}
                <img
                    src={blog.imagen_portada}
                    alt={blog.titulo}
                    class="w-full rounded-lg shadow-lg mb-12"
                />
            {/if}

            <!-- Contenido del artículo -->
            <article class="prose prose-lg max-w-none">
                <div class="bg-white rounded-lg shadow-lg p-8">
                    {@html blog.contenido}
                </div>
            </article>

            <!-- Tags y compartir -->
            <div class="mt-12 flex flex-wrap justify-between items-center gap-4">
                <div class="flex flex-wrap gap-2">
                    {#each blog.tags as tag}
                        <span
                            class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
                        >
                            <Tag size={14} class="mr-1" />
                            {tag}
                        </span>
                    {/each}
                </div>
                <button 
                    on:click={handleShare}
                    class="inline-flex items-center px-4 py-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
                >
                    <Share2 size={16} class="mr-2" />
                    Compartir
                </button>
            </div>
        </div>
    </div>
</div>
