<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { getUserProfile } from "$lib/api/user";
  import Boton from "$lib/components/Boton.svelte";
  import { authStore } from "$lib/stores/authStore";

  let isAuthenticated = true;
  let user = $authStore.user;
  let showAlert = false;

  function handleLogout() {
    localStorage.removeItem("token");
    goto("/");
  }

  if (isAuthenticated != true) {
    goto("/");
  }

  function handleEditProfile() {
    showAlert = true;
    setTimeout(() => {
      showAlert = false;
    }, 3000);
  }
</script>

{#if isAuthenticated}
  {#await getUserProfile(user.apodo)}
    <p>Cargando...</p>
  {:then userInfo}
    <main class="min-h-screen bg-gray-100 py-12 px-4 grid place-content-center">
      <div
        class="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden min-w-[500px] p-6"
      >
        {#if showAlert}
          <div
            class="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative"
            role="alert"
          >
            <span class="block sm:inline">
              🐄 Oh, parece que esto todavía no está implementado, deja que las
              vacas se encarguen de este trabajo
            </span>
          </div>
        {/if}

        <div>
          <div class="flex flex-col items-center mb-6">
            <img
              class="w-32 h-32 rounded-full mb-4"
              src="img/profiles/ajolote.svg"
              alt={"Perfil de " + userInfo.apodo}
            />
            <h2 class="text-2xl font-bold mb-2">{userInfo.apodo}</h2>
            <p>Aquí deberia ir una descripción toda bonita tuya...</p>

            <p class="text-xl font-semibold my-4 text-center">
              ¿Que tal tu día {userInfo.nombre}?
            </p>
            <p>¿Sabias que las vacas tienen mejores amigas?</p>
          </div>
        </div>

        <Boton
          title="Editar perfil"
          color="primary"
          onClick={handleEditProfile}
        />
        <div class="py-3">
          <Boton title="Cerrar Sesión" color="warn" onClick={handleLogout} />
        </div>
      </div>
    </main>
  {:catch error}
    <p>Error {error}</p>
  {/await}
{/if}
