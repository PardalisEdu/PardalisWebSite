<script lang="ts">
    import { page } from '$app/stores';
    import { authStore } from '$lib/stores/authStore';
    import "../app.css";
    import NavBar from "$components/NavBar.svelte";
    import Footer from "$components/Footer.svelte";

    let { data, children } = $props();

    // Sync auth store from server-provided data on every navigation
    $effect(() => {
        authStore.sync(data.user ?? null);
    });

    const canonicalUrl = `https://pardalis.mx${$page.url.pathname}`;
</script>

<svelte:head>
    <link rel="canonical" href={canonicalUrl} />
</svelte:head>

<NavBar />

{@render children?.()}

<Footer />