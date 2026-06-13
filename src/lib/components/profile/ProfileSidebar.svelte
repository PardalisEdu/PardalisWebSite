<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { Camera, LogOut, Settings, User } from "lucide-svelte";

  interface Props {
    user: {
      name?: string | null;
      image?: string | null;
    } | undefined;
    editing: boolean;
  }

  let { user, editing = $bindable(false) }: Props = $props();
</script>

<div class="w-full md:w-1/3 flex flex-col gap-6">
  <div
    class="bg-white rounded-[2.5rem] p-8 passport-border flex flex-col items-center"
  >
    <div class="relative group">
      <div
        class="w-40 h-40 rounded-full border-4 border-yellow-200 shadow-[0_6px_0_0_#fef08a] overflow-hidden bg-gray-50 mb-6"
      >
        <img
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={user?.image || "/img/profiles/ocelote.svg"}
          alt="Avatar del usuario"
        />
      </div>
      {#if editing}
        <div
          class="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        >
          <Camera class="text-white w-8 h-8" />
        </div>
      {/if}
      <div
        class="absolute -bottom-2 -right-2 w-10 h-10 bg-[#f9c710] rounded-full border-4 border-white flex items-center justify-center shadow-lg animate-bounce"
      >
        <User class="text-white w-5 h-5" />
      </div>
    </div>

    <h1 class="text-3xl font-black text-gray-900 tracking-tight mb-2">
      {user?.name || "Explorador"}
    </h1>
    <div
      class="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-black uppercase tracking-wider mb-6"
    >
      Pardalis Junior
    </div>

    <div
      class="w-full pt-4 border-t-2 border-dashed border-gray-100 flex flex-col items-center gap-2"
    >
      <p
        class="text-xs font-black text-gray-400 uppercase tracking-widest"
      >
        Estado
      </p>
      <div class="flex items-center gap-2 text-green-500 font-bold">
        <div
          class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
        ></div>
        ¡Listo para explorar!
      </div>
    </div>
  </div>

  <div
    class="bg-white rounded-[2rem] p-6 passport-border flex flex-col gap-3"
  >
    <h3 class="font-black text-gray-800 flex items-center gap-2">
      <Settings class="w-5 h-5 text-gray-400" />
      Cuenta
    </h3>
    <button
      onclick={() => authClient.signOut()}
      type="button"
      class="w-full flex items-center justify-center gap-2 py-3 px-6 font-bold text-red-500 bg-red-50 rounded-2xl hover:bg-red-100 transition-all active:scale-95 cursor-pointer"
    >
      <LogOut class="w-5 h-5" />
      Cerrar Sesión
    </button>
  </div>
</div>

<style>
  .passport-border {
    border: 4px solid #f9c710;
    box-shadow: 0 10px 0 0 #d4a007;
  }
</style>
