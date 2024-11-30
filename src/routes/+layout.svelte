<script>
  import "../app.css";
  import {Footer, NavBar} from "$components";
  /** @type {{children?: import('svelte').Snippet}} */
  let { children } = $props();
</script>

<NavBar />

{@render children?.()}

<Footer />