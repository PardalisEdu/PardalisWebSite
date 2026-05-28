<script lang="ts">
  import { BookOpen } from "lucide-svelte";
  import type { BlogPost } from '$lib/types/types';

  let { post }: { post: BlogPost } = $props();
</script>

<article
  class="group bg-white rounded-[2rem] border-4 border-yellow-100 shadow-[0_10px_0_0_#fef08a] hover:-translate-y-2 hover:shadow-[0_14px_0_0_#fef08a] transition-all duration-300 overflow-hidden"
>
  {#if post.imagen_portada}
    <div class="relative overflow-hidden">
      <img
        src={post.imagen_portada}
        alt={post.titulo}
        class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  {:else}
    <div class="w-full h-48 bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center">
      <span class="text-6xl opacity-30">📝</span>
    </div>
  {/if}
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <span class="text-sm font-bold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
        {post.categoria}
      </span>
      <div class="flex items-center text-gray-500 text-sm">
        <BookOpen size={16} class="mr-1" />
        {post.tiempo_lectura} min
      </div>
    </div>
    <h2 class="text-xl font-black mb-3 text-gray-900">
      <a
        href={`/blog/${post.slug}`}
        class="hover:text-[#f9c710] transition-colors"
        data-sveltekit-preload-data
      >
        {post.titulo}
      </a>
    </h2>
    <p class="text-gray-600 font-medium mb-4 leading-relaxed">
      {post.extracto}
    </p>
    <div class="flex justify-between items-center pt-4 border-t-2 border-gray-100">
      <span class="text-sm font-bold text-gray-500">
        Por <span class="text-gray-800">{post.autor_apodo}</span>
      </span>
      <span class="text-sm text-gray-400">
        {new Date(post.fecha_publicacion).toLocaleDateString()}
      </span>
    </div>
  </div>
</article>