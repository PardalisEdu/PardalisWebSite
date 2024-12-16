<script>
    import { Calendar, Clock, Tag, Share2 } from 'lucide-svelte';

    // Esto vendría de +page.server.js
    const blogPost = {
        titulo: "Título del Blog",
        autor: {
            apodo: "Autor",
            imagen: "/img/profile/ajolote.svg"
        },
        fecha_publicacion: new Date(),
        tiempo_lectura: 5,
        categoria: "Categoría",
        tags: ["Tag1", "Tag2", "Tag3"],
        imagen_portada: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2MzTSLBm9805rA-3x0F0lLRnJ8GwYCXzz-g&s",
        contenido: "<h1>Contenido del blog...</h1>",
        meta_descripcion: "Descripción meta del blog"
    };

    function compartir() {
        if (navigator.share) {
            navigator.share({
                title: blogPost.titulo,
                text: blogPost.meta_descripcion,
                url: window.location.href
            });
        }
    }
</script>

<div class="min-h-screen bg-gray-50 pt-20">
    <!-- Hero Section -->
    <div class="bg-yellow-400 py-12">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="flex items-center gap-4 text-white mb-4">
                    <span class="bg-yellow-500 px-3 py-1 rounded-full text-sm font-medium">
                        {blogPost.categoria}
                    </span>
                    <div class="flex items-center">
                        <Clock size={16} class="mr-1" />
                        <span class="text-sm">{blogPost.tiempo_lectura} min lectura</span>
                    </div>
                </div>

                <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                    {blogPost.titulo}
                </h1>

                <div class="flex items-center gap-4">
                    <img
                            src={blogPost.autor.imagen}
                            alt={blogPost.autor.apodo}
                            class="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div class="text-white">
                        <p class="font-medium">{blogPost.autor.apodo}</p>
                        <div class="flex items-center text-sm">
                            <Calendar size={14} class="mr-1" />
                            {blogPost.fecha_publicacion.toLocaleDateString()}
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
            <img
                    src={blogPost.imagen_portada}
                    alt={blogPost.titulo}
                    class="w-full rounded-lg shadow-lg mb-12"
            />

            <!-- Contenido del artículo -->
            <article class="prose prose-lg max-w-none">
                <div class="bg-white rounded-lg shadow-lg p-8">
                    <!-- Aquí iría el contenido renderizado del blog -->
                    {@html blogPost.contenido}
                </div>
            </article>

            <!-- Tags y compartir -->
            <div class="mt-12 flex flex-wrap justify-between items-center gap-4">
                <div class="flex flex-wrap gap-2">
                    {#each blogPost.tags as tag}
                        <span
                                class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
                        >
                            <Tag size={14} class="mr-1"/>
                            {tag}
                        </span>
                    {/each}
                </div>
                <button
                        on:click={compartir}
                        class="inline-flex items-center px-4 py-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
                >
                    <Share2 size={16} class="mr-2"/>
                    Compartir
                </button>
            </div>
        </div>
    </div>
</div>