<script>
  import { BookOpen } from "lucide-svelte";

  let { post } = $props();
</script>

<article
  class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
>
  {#if post.imagen_portada}
    <img
      src={post.imagen_portada}
      alt={post.titulo}
      class="w-full h-48 object-cover"
    />
  {/if}
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <span class="text-sm font-medium text-yellow-600">
        {post.categoria}
      </span>
      <div class="flex items-center text-gray-500 text-sm">
        <BookOpen size={16} class="mr-1" />
        {post.tiempo_lectura} min
      </div>
    </div>
    <h2 class="text-xl font-bold mb-2 text-gray-800">
      <a
        href={`/blog/${post.slug}`}
        class="hover:text-yellow-600 transition-colors"
        data-sveltekit-prefetch
      >
        {post.titulo}
      </a>
    </h2>
    <p class="text-gray-600 mb-4">
      {post.extracto}
    </p>
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-500">
        Por {post.autor_apodo}
      </span>
      <span class="text-sm text-gray-500">
        {new Date(post.fecha_publicacion).toLocaleDateString()}
      </span>
    </div>
  </div>
</article>
