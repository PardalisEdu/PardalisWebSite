<script lang="ts">
  import Calendar from "lucide-svelte/icons/calendar";
  import Clock from "lucide-svelte/icons/clock";
  import type { BlogPost } from '$lib/types/types';

  let { post }: { post: BlogPost } = $props();
</script>

<article
  class="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
>
  {#if post.imagen_portada}
    <div class="relative overflow-hidden aspect-[16/9]">
      <img
        src={post.imagen_portada}
        alt={post.titulo}
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  {:else}
    <div class="aspect-[16/9] bg-gradient-to-br from-yellow-50 to-gray-50 flex items-center justify-center">
      <span class="text-4xl text-gray-300">📝</span>
    </div>
  {/if}
  <div class="p-6">
    <div class="flex items-center gap-3 mb-3">
      <span class="text-xs font-bold text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-md border border-yellow-100/50 uppercase tracking-wider">
        {post.categoria}
      </span>
      <span class="flex items-center gap-1 text-xs text-gray-400">
        <Clock size={12} />
        {post.tiempo_lectura} min
      </span>
    </div>
    <h2 class="text-lg font-bold text-gray-900 mb-2 leading-snug">
      <a
        href={`/blog/${post.slug}`}
        class="hover:text-yellow-700 transition-colors"
        data-sveltekit-preload-data
      >
        {post.titulo}
      </a>
    </h2>
    <p class="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
      {post.extracto}
    </p>
    <div class="flex items-center justify-between pt-4 border-t border-gray-50">
      <span class="text-xs font-medium text-gray-400">
        {post.autor_apodo}
      </span>
      <span class="flex items-center gap-1 text-xs text-gray-400">
        <Calendar size={12} />
        {new Date(post.fecha_publicacion).toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </span>
    </div>
  </div>
</article>