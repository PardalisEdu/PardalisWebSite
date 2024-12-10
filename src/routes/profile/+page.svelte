<script>
    import { authStore } from '$lib/stores/authStore';

    $: user = $authStore.user;
    $: isAuthenticated = $authStore.isAuthenticated;
</script>

{#if isAuthenticated}
    <p>Bienvenido, {user.apodo}!</p>
{/if}