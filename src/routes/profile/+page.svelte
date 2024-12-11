<script>
  // @ts-nocheck

  import { getUserProfile } from "$lib/api/user";
  import { authStore } from "$lib/stores/authStore";
  import { onMount } from "svelte";

  let isAuthenticated = $authStore.isAuthenticated;
  let user = $authStore.user;
</script>

{#if isAuthenticated}
    {#await getUserProfile(user.apodo)}
        <p>Cargando...</p>
    {:then userInfo}
        <p>Bienvenido, {userInfo.apodo}!</p>
        <p>{userInfo.apodo}</p>
    {:catch error}
        <p>Error {error}</p>
    {/await}
{/if}