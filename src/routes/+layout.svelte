<script>
    import {authStore} from '$lib/stores/authStore';
    import {onMount} from 'svelte';
    import "../app.css";
    import {Footer, NavBar} from "$components";

    onMount(() => {
        authStore.initialize();
    });

    /** @type {{children?: import('svelte').Snippet}} */
    let {children} = $props();
</script>

<NavBar/>

{@render children?.()}

<Footer/>