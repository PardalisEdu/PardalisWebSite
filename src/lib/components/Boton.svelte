<script lang="ts">
    import { spring } from 'svelte/motion';

    type ColorType = 'primary' | 'warn';

    let { title, color = 'primary', href = '', onClick }: {
        title: string;
        color?: ColorType;
        href?: string;
        onClick?: () => void;
    } = $props();

    const buttonMotion = spring({ scale: 1, rotate: 0 }, {
        stiffness: 0.1,
        damping: 0.2
    });

    const colors: Record<ColorType, string> = {
        primary: '#f9c710',
        warn: '#ff4136'
    };

    let backgroundColor = $derived(colors[color] || colors.primary);

    let buttonElement: HTMLElement = $state(null!);

    function handleTap() {
        buttonMotion.set({ scale: 1.1, rotate: 5 });
        setTimeout(() => buttonMotion.set({ scale: 1, rotate: 0 }), 200);
        onClick?.();
    }
</script>

{#if href}
    <a
            {href}
            onclick={handleTap}
            bind:this={buttonElement}
            class="w-full md:w-auto text-center bg-[#f9c710] text-white px-8 py-3 rounded-2xl font-black shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 transition-all active:scale-95"
            style="background-color: {backgroundColor}; transform: scale({$buttonMotion.scale}) rotate({$buttonMotion.rotate}deg);"
    >
        {title}
    </a>
{:else}
    <button
            onclick={handleTap}
            bind:this={buttonElement}
            class="w-full md:w-auto text-center bg-[#f9c710] text-white px-8 py-3 rounded-2xl font-black shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 transition-all active:scale-95"
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