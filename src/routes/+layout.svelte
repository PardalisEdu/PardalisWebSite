<script>
    import {authStore} from '$lib/stores/authStore';
    import {onMount} from 'svelte';
    import "../app.css";
    import NavBar from "$components/NavBar.svelte";
    import Footer from "$components/Footer.svelte";

    onMount(() => {
        authStore.initialize();
    });

    /** @type {{children?: import('svelte').Snippet}} */
    let {children} = $props();
</script>

<NavBar/>

{@render children?.()}

<Footer/>