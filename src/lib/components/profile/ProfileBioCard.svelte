<script lang="ts">
  import Boton from "$lib/components/Boton.svelte";
  import { ShieldCheck } from "lucide-svelte";
  import { fade } from "svelte/transition";

  interface Props {
    editing: boolean;
  }

  let { editing = $bindable(false) }: Props = $props();
</script>

<div
  class="bg-white rounded-[2.5rem] p-8 md:p-10 passport-border relative overflow-hidden min-h-[400px]"
>
  <div in:fade={{ duration: 200 }}>
    <div class="mb-10">
      <div
        class="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-4"
      >
        Mi biografía
      </div>
      <div class="relative">
        <span
          class="absolute -top-4 -left-2 text-6xl text-yellow-200 font-serif opacity-50"
          >“</span
        >
        <p
          class="text-xl md:text-2xl font-bold text-gray-700 leading-relaxed pl-4"
        >
          {"¡Aún no has escrito nada sobre ti! Haz clic en editar para contarnos tus aventuras."}
        </p>
        <span
          class="absolute -bottom-8 -right-2 text-6xl text-yellow-200 font-serif opacity-50"
          >”</span
        >
      </div>
    </div>

    <div
      class="mt-16 pt-10 border-t-4 border-dashed border-gray-100 flex flex-col items-center sm:items-start gap-6"
    >
      <Boton
        title="EDITAR MI PERFIL"
        onClick={() => (editing = true)}
      />

      <div class="flex items-center gap-4 text-gray-400">
        <ShieldCheck class="w-5 h-5" />
        <p class="text-sm font-bold">
          Tus datos están seguros en la selva de Pardalis.
        </p>
      </div>
    </div>
  </div>
  <!-- Background pattern -->
  <div class="absolute top-0 right-0 p-4 opacity-5">
    <img src="/favicon.svg" alt="" class="w-40 h-40 rotate-12" />
  </div>
</div>

<style>
  .passport-border {
    border: 4px solid #f9c710;
    box-shadow: 0 10px 0 0 #d4a007;
  }
</style>
