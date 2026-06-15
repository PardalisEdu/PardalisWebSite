<script lang="ts">
  import { authClient } from "$lib/client/auth-client";
  import ProfileSidebar from "$lib/components/profile/ProfileSidebar.svelte";
  import ProfileBioCard from "$lib/components/profile/ProfileBioCard.svelte";
  import ProfileFunCard from "$lib/components/profile/ProfileFunCard.svelte";
  import { fly } from "svelte/transition";

  const session = authClient.useSession();

  let editing = $state(false);
  let showAlert = $state(false);
</script>

{#if $session.data}
  <main
    class="min-h-screen bg-[#FFFDF5] pt-32 pb-16 px-4 overflow-hidden relative"
  >


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
        <ProfileSidebar user={$session.data.user} bind:editing />

        <!-- Main Content: Bio and Edit Form -->
        <div class="w-full md:w-2/3 flex flex-col gap-8">
          <ProfileBioCard bind:editing />
          <ProfileFunCard />
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
</style>

