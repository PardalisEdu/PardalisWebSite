<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import Boton from "$lib/components/Boton.svelte";
  import { Camera, LogOut, Settings, ShieldCheck, User } from "lucide-svelte";
  import { fade, fly } from "svelte/transition";

  const session = authClient.useSession();

  let editing = $state(false);
  let showAlert = $state(false);
</script>

{#if $session.data}
  <main
    class="min-h-screen bg-[#FFFDF5] pt-32 pb-16 px-4 overflow-hidden relative"
  >
    <!-- Decorative background elements -->
    <div
      class="absolute top-40 -left-10 w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-60"
    ></div>
    <div
      class="absolute bottom-20 -right-10 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-60"
    ></div>

    <div
      class="hidden lg:block absolute top-60 left-20 animate-float opacity-20 pointer-events-none"
    >
      <img src="/img/profiles/ajolote.svg" alt="" class="w-32 h-32" />
    </div>
    <div
      class="hidden lg:block absolute bottom-40 right-20 animate-float-delayed opacity-20 pointer-events-none"
    >
      <img src="/img/profiles/ocelote.svg" alt="" class="w-32 h-32" />
    </div>

    <div class="max-w-4xl mx-auto relative z-10">
      {#if showAlert}
        <div
          transition:fly={{ y: -20, duration: 300 }}
          class="mb-8 bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg"
          role="alert"
        >
          <span class="text-2xl">🌵</span>
          <p>
            ¡Híjole! Hubo un error al conectar con el servidor. Intenta de
            nuevo.
          </p>
        </div>
      {/if}

      <div class="flex flex-col md:flex-row gap-8 items-start">
        <!-- Sidebar: Avatar and Status -->
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
                  src={$session.data?.user.image || "/img/profiles/ocelote.svg"}
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
              {$session.data?.user.name || "Explorador"}
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
                type="submit"
                class="w-full flex items-center justify-center gap-2 py-3 px-6 font-bold text-red-500 bg-red-50 rounded-2xl hover:bg-red-100 transition-all active:scale-95"
              >
                <LogOut class="w-5 h-5" />
                Cerrar Sesión
              </button>
          </div>
        </div>

        <!-- Main Content: Bio and Edit Form -->
        <div class="w-full md:w-2/3 flex flex-col gap-8">
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

          <!-- Extra fun section -->
          <div
            class="bg-linear-to-r from-yellow-400 to-yellow-300 rounded-[2rem] p-8 shadow-[0_8px_0_0_#d4a007] flex items-center justify-between text-white overflow-hidden relative"
          >
            <div class="relative z-10">
              <h2 class="text-2xl font-black mb-2">¡Sigue explorando!</h2>
              <p class="font-bold opacity-90 max-w-[200px]">
                Juega y aprende para ganar medallas.
              </p>
              <a
                href="/mini-games"
                class="mt-4 inline-block bg-white text-yellow-500 px-6 py-2 rounded-xl font-black text-sm shadow-md hover:scale-105 transition-transform"
                >IR A JUEGOS</a
              >
            </div>
            <div class="relative z-0">
              <img
                src="/img/profiles/xinxin.svg"
                alt=""
                class="w-32 h-32 -rotate-12 translate-x-4 translate-y-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
{/if}

<style>
  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: float 8s ease-in-out infinite reverse;
    animation-delay: 1s;
  }

  .passport-border {
    border: 4px solid #f9c710;
    box-shadow: 0 10px 0 0 #d4a007;
  }
</style>
