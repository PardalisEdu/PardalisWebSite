<script lang="ts">
  import { enhance } from "$app/forms";
  import { authClient } from "$lib/client/auth-client";
  import { ShieldCheck, User, Sparkles, AlertTriangle } from "lucide-svelte";
  import { fade, slide } from "svelte/transition";

  interface Props {
    editing: boolean;
    name: string;
    bio: string;
  }

  let { 
    editing = $bindable(false), 
    name = $bindable(""), 
    bio = $bindable("") 
  }: Props = $props();

  let localName = $state(name);
  let localBio = $state(bio);
  let loading = $state(false);
  let errorMessage = $state("");

  // Sync state when entering edit mode or props change
  $effect(() => {
    if (editing) {
      localName = name;
      localBio = bio;
      errorMessage = "";
    }
  });
</script>

<div
  class="bg-white rounded-[2.5rem] p-8 md:p-10 passport-border relative overflow-hidden min-h-[400px]"
>
  {#if editing}
    <div in:fade={{ duration: 200 }}>
      <div class="mb-6">
        <div
          class="inline-block px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-black uppercase tracking-widest mb-4"
        >
          Editar Perfil
        </div>
        <h2 class="text-2xl font-black text-gray-900 mb-2">Mi información de explorador</h2>
        <p class="text-sm text-gray-500 font-bold">
          Configura tus datos para que tus profesores y compañeros de clase te conozcan.
        </p>
      </div>

      {#if errorMessage}
        <div
          transition:slide={{ duration: 200 }}
          class="mb-6 bg-red-50 border-2 border-red-200 text-red-800 px-5 py-3 rounded-2xl font-bold flex items-center gap-3 animate-wiggle"
          role="alert"
        >
          <AlertTriangle class="w-5 h-5 text-red-600 shrink-0" />
          <p class="text-sm">{errorMessage}</p>
        </div>
      {/if}

      <form
        method="POST"
        action="?/editarPerfil"
        use:enhance={() => {
          loading = true;
          errorMessage = "";
          return async ({ result, update }) => {
            loading = false;
            if (result.type === "success") {
              name = localName;
              bio = localBio;
              editing = false;
              // Refresh better-auth session client-side
              await authClient.getSession();
            } else if (result.type === "failure") {
              errorMessage = (result.data as any)?.message || "Ocurrió un error al guardar los cambios.";
            } else {
              errorMessage = "Error al conectar con el servidor.";
            }
            await update({ reset: false });
          };
        }}
        class="flex flex-col gap-6"
      >
        <!-- Campo Nombre -->
        <div class="flex flex-col">
          <label
            for="name-input"
            class="text-sm font-black text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2 select-none"
          >
            <User class="w-4 h-4 text-[#d4a007]" />
            Nombre o Apodo
          </label>
          <input
            id="name-input"
            type="text"
            name="name"
            bind:value={localName}
            required
            maxlength="50"
            placeholder="¿Cómo te llamas en la selva?"
            class="w-full px-5 py-4 border-4 border-yellow-100 focus:border-[#f9c710] rounded-2xl font-bold text-gray-700 bg-gray-50 focus:bg-white outline-none transition-all placeholder:text-gray-300"
          />
        </div>

        <!-- Campo Biografía -->
        <div class="flex flex-col">
          <label
            for="bio-input"
            class="text-sm font-black text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2 select-none"
          >
            <Sparkles class="w-4 h-4 text-[#d4a007]" />
            Mi Biografía / Sobre mí
          </label>
          <textarea
            id="bio-input"
            name="bio"
            bind:value={localBio}
            maxlength="500"
            placeholder="Escribe algo sobre ti, como tu comida favorita, lo que te gusta jugar o por qué quieres aprender inglés..."
            rows="4"
            class="w-full px-5 py-4 border-4 border-yellow-100 focus:border-[#f9c710] rounded-2xl font-bold text-gray-700 bg-gray-50 focus:bg-white outline-none transition-all placeholder:text-gray-300 resize-none leading-relaxed"
          ></textarea>
          <div class="text-right text-xs font-bold text-gray-400 mt-1.5 select-none">
            {localBio ? localBio.length : 0}/500 caracteres
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="flex flex-col sm:flex-row gap-4 mt-4 pt-6 border-t-2 border-dashed border-gray-100">
          <button
            type="submit"
            disabled={loading}
            class="w-full sm:w-auto px-8 py-3 bg-[#f9c710] text-white font-black rounded-2xl shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-center select-none"
          >
            {loading ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
          </button>
          
          <button
            type="button"
            onclick={() => (editing = false)}
            disabled={loading}
            class="w-full sm:w-auto px-8 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl shadow-[0_4px_0_0_#d1d5db] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-center select-none"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  {:else}
    <div in:fade={{ duration: 200 }} class="flex flex-col justify-between h-full min-h-[340px]">
      <div class="mb-10">
        <div
          class="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6 select-none"
        >
          Mi biografía
        </div>
        <div class="relative min-h-[120px] flex items-center">
          <span
            class="absolute -top-4 -left-2 text-7xl text-yellow-200 font-serif opacity-40 select-none"
            >“</span
          >
          <p
            class="text-xl md:text-2xl font-bold text-gray-700 leading-relaxed pl-6 pr-6 relative z-10"
          >
            {bio || "¡Aún no has escrito nada sobre ti! Haz clic en editar para contarnos tus aventuras."}
          </p>
          <span
            class="absolute -bottom-8 right-0 text-7xl text-yellow-200 font-serif opacity-40 select-none"
            >”</span
          >
        </div>
      </div>

      <div
        class="mt-auto pt-10 border-t-4 border-dashed border-gray-100 flex flex-col items-center sm:items-start gap-6"
      >
        <button
          onclick={() => (editing = true)}
          class="w-full sm:w-auto px-8 py-3 bg-[#f9c710] text-white font-black rounded-2xl shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all duration-150 cursor-pointer text-center select-none"
        >
          EDITAR MI PERFIL
        </button>

        <div class="flex items-center gap-4 text-gray-400 select-none">
          <ShieldCheck class="w-5 h-5 text-green-500 shrink-0" />
          <p class="text-sm font-bold text-gray-500">
            Tus datos están seguros en la selva de Pardalis.
          </p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Background pattern -->
  <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
    <img src="/favicon.svg" alt="" class="w-40 h-40 rotate-12" />
  </div>
</div>

<style>
  .passport-border {
    border: 4px solid #f9c710;
    box-shadow: 0 10px 0 0 #d4a007;
  }
</style>
