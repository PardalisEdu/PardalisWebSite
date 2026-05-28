<script lang="ts">
    import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-svelte';

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
            } catch {
                // user cancelled — silent
            }
        }
    }
</script>

<div class="min-h-screen bg-[#FFFDF5]">
    <!-- Hero -->
    <div class="border-b border-gray-100 bg-white">
        <div class="max-w-4xl mx-auto px-4 pt-28 pb-12 md:pt-36 md:pb-16">
            <!-- Back link -->
            <a
                href="/blog"
                class="inline-flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors mb-8 group"
            >
                <ArrowLeft size={16} class="group-hover:-translate-x-0.5 transition-transform" />
                Volver al blog
            </a>

            <!-- Category + reading time -->
            <div class="flex flex-wrap items-center gap-3 mb-5">
                <span class="text-xs font-black text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 uppercase tracking-wider">
                    {blog.categoria}
                </span>
                <span class="flex items-center gap-1.5 text-sm text-gray-400 font-medium">
                    <Clock size={14} />
                    {blog.tiempo_lectura} min de lectura
                </span>
            </div>

            <!-- Title -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-6">
                {blog.titulo}
            </h1>

            <!-- Author + date -->
            <div class="flex items-center gap-4 text-sm text-gray-500">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-yellow-100 border-2 border-yellow-200 flex items-center justify-center text-sm font-black text-yellow-700">
                        {blog.autor_apodo.charAt(0)}
                    </div>
                    <span class="font-bold text-gray-700">{blog.autor_apodo}</span>
                </div>
                <span class="text-gray-300">·</span>
                <div class="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(blog.fecha_publicacion).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>
            </div>
        </div>
    </div>

    <!-- Cover image -->
    {#if blog.imagen_portada}
        <div class="max-w-5xl mx-auto px-4 -mt-6">
            <img
                src={blog.imagen_portada}
                alt={blog.titulo}
                class="w-full rounded-2xl shadow-xl border border-gray-100"
            />
        </div>
    {/if}

    <!-- Content -->
    <div class="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <article class="prose-blog">
            {@html blog.contenido}
        </article>

        <!-- Divider -->
        <hr class="my-12 border-gray-100" />

        <!-- Tags + Share -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div class="flex flex-wrap gap-2">
                {#each blog.tags as tag}
                    <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                        <Tag size={12} />
                        {tag}
                    </span>
                {/each}
            </div>
            <button
                onclick={handleShare}
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-gray-600 bg-gray-100 hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-200 border-2 border-transparent transition-all duration-200 active:scale-95"
            >
                <Share2 size={16} />
                Compartir
            </button>
        </div>

        <!-- Back to blog -->
        <div class="mt-16 text-center">
            <a
                href="/blog"
                class="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#f9c710] transition-colors"
            >
                <ArrowLeft size={16} />
                Ver más artículos
            </a>
        </div>
    </div>
</div>