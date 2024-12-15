<script>
    import { spring } from 'svelte/motion';
    import { createEventDispatcher } from 'svelte';

    /**
     * @typedef {'primary'|'warn'} ColorType
     */

    /** @type {{title: string, color?: ColorType, href?: string, onClick?: () => void}} */
    let { title, color = 'primary', href = '', onClick = () => undefined } = $props();

    const dispatch = createEventDispatcher();

    let buttonElement = $state();
    const buttonMotion = spring({ scale: 1, rotate: 0 }, {
        stiffness: 0.1,
        damping: 0.2
    });

    /** @type {Record<ColorType, string>} */
    const colors = {
        primary: '#f9c710',
        warn: '#ff4136'
    };

    let backgroundColor = $derived(colors[color] || colors.primary);

    function handleTap() {
        buttonMotion.set({ scale: 1.1, rotate: 5 });
        setTimeout(() => buttonMotion.set({ scale: 1, rotate: 0 }), 200);

        if (onClick) {
            onClick();
        } else {
            dispatch('click');
        }
    }
</script>

{#if href}
    <a
            {href}
            onclick={handleTap}
            bind:this={buttonElement}
            class="inline-block focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center text-extrabold"
            style="background-color: {backgroundColor}; transform: scale({$buttonMotion.scale}) rotate({$buttonMotion.rotate}deg);"
    >
        {title}
    </a>
{:else}
    <button
            onclick={handleTap}
            bind:this={buttonElement}
            class="focus:outline-none focus:ring-4 rounded-lg text-sm px-5 py-2.5 w-full font-extrabold"
            style="background-color: {backgroundColor}; transform: scale({$buttonMotion.scale}) rotate({$buttonMotion.rotate}deg);"
    >
        {title}
    </button>
{/if}

<style>
    a, button {
        transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
        font-weight: bolder;
        color: #212121;
    }

    a:hover, button:hover {
        filter: brightness(90%);
    }

    :global(.focus\:ring-4:focus) {
        box-shadow: 0 0 0 4px rgba(249, 199, 16, 0.5);
    }
</style>