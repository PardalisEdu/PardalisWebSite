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

    const colors: Record<ColorType, { bg: string; shadow: string }> = {
        primary: { bg: '#f9c710', shadow: '#d4a007' },
        warn: { bg: '#ff4136', shadow: '#cc3333' }
    };

    let config = $derived(colors[color] || colors.primary);

    let buttonElement: HTMLElement = $state(null!);

    function handleTap() {
        buttonMotion.set({ scale: 1.1, rotate: 5 });
        setTimeout(() => buttonMotion.set({ scale: 1, rotate: 0 }), 200);
        onClick?.();
    }

    const baseClasses = 'w-full md:w-auto text-center text-white px-8 py-3 rounded-2xl font-black shadow-[0_4px_0_0_var(--shadow-color)] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all duration-150';
</script>

{#if href}
    <a
        {href}
        onclick={handleTap}
        bind:this={buttonElement}
        class={baseClasses}
        style="background-color: {config.bg}; --shadow-color: {config.shadow}; transform: scale({$buttonMotion.scale}) rotate({$buttonMotion.rotate}deg);"
    >
        {title}
    </a>
{:else}
    <button
        onclick={handleTap}
        bind:this={buttonElement}
        class={baseClasses}
        style="background-color: {config.bg}; --shadow-color: {config.shadow}; transform: scale({$buttonMotion.scale}) rotate({$buttonMotion.rotate}deg);"
    >
        {title}
    </button>
{/if}