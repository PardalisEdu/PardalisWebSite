<script lang="ts">
    import { page } from '$app/stores';
    import "../app.css";
    import NavBar from "$components/NavBar.svelte";
    import Footer from "$components/Footer.svelte";
    import { setContext } from 'svelte';

    let { data, children } = $props();

    let userState = $derived(data.user);

    setContext('user', {
        get user() { return userState; },
        set user(value) { userState = value; }
    });

    $effect(() => {
		userState = data.user;
	});

    const canonicalUrl = `https://pardalis.mx${$page.url.pathname}`;
</script>

<svelte:head>
    <link rel="canonical" href={canonicalUrl} />
</svelte:head>

<NavBar />

{@render children?.()}

<Footer />