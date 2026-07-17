<script lang="ts">
    import { page } from '$app/state';
    import "../app.css";
    import NavBar from "$components/NavBar.svelte";
    import Footer from "$components/Footer.svelte";

    let { children } = $props();

    let canonicalUrl = $derived(`https://pardalis.mx${page.url.pathname}`);
</script>

<svelte:head>
    <link rel="canonical" href={canonicalUrl} />
</svelte:head>

<NavBar />

{@render children?.()}

<Footer />