<script lang="ts">
    import { authStore } from '$lib/stores/authStore';
    import "../app.css";
    import NavBar from "$components/NavBar.svelte";
    import Footer from "$components/Footer.svelte";

    let { data, children } = $props();

    // Sync auth store from server-provided data on every navigation
    $effect(() => {
        authStore.sync(data.user ?? null);
    });
</script>

<NavBar />

{@render children?.()}

<Footer />