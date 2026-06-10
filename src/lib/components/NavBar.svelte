<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const session = authClient.useSession();

	let showBanner = $state(true);
	let isMenuOpen = $state(false);
	let currentPath = $state('');

	$effect(() => {
		currentPath = $page.url.pathname;
	});

	onMount(() => {
		const bannerClosed = localStorage.getItem('bannerClosed');
		if (bannerClosed === 'true') {
			showBanner = false;
		}
	});

	function closeBanner() {
		showBanner = false;
		localStorage.setItem('bannerClosed', 'true');
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function isActive(path: string) {
		return currentPath === path || currentPath.startsWith(path + '/');
	}
</script>

{#if showBanner}
	<div
		transition:fly={{ y: -50, duration: 500 }}
		class="fixed top-2 left-2 right-2 md:left-10 md:right-10 z-50"
	>
		<div
			class="bg-linear-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-200 shadow-lg shadow-yellow-200/40 rounded-2xl py-2 px-4 flex items-center justify-between"
		>
			<div class="flex items-center gap-3">
				<span class="animate-bounce text-2xl">🐄</span>
				<p class="font-bold text-yellow-900 text-sm md:text-base">
					<span class="md:hidden">¡Vaca Presidente 2024!</span>
					<span class="hidden md:inline">
						¡Apoya a la Vaca para Presidente! 🥛 <span class="font-normal opacity-80"
							>Más leche, menos promesas.</span
						>
					</span>
				</p>
			</div>
			<button
				onclick={closeBanner}
				class="p-1 hover:bg-yellow-200 rounded-full transition-colors text-yellow-900"
				aria-label="Close banner"
			>
				<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					/>
				</svg>
			</button>
		</div>
	</div>
{/if}

<nav
	class="fixed left-0 right-0 p-4 z-40 transition-all duration-300"
	style="top: {showBanner ? '65px' : '0px'}"
>
	<div
		class="max-w-7xl mx-auto bg-white/90 backdrop-blur-md border-b-4 border-yellow-400/20 shadow-xl rounded-3xl px-6 py-3 flex flex-wrap items-center justify-between"
	>
		<a
			href="/"
			class="text-3xl font-black tracking-tighter text-[#f9c710] hover:scale-105 transition-transform active:rotate-2"
		>
			PARDALIS<span class="text-blue-400">.</span>
		</a>

		<button
			class="md:hidden p-2 text-yellow-500 hover:bg-yellow-50 rounded-xl transition-colors"
			onclick={toggleMenu}
			aria-label="Toggle navigation menu"
		>
			<div class="space-y-1.5">
				<span
					class="block w-6 h-1 bg-current rounded-full transition-all duration-300 {isMenuOpen
						? 'rotate-45 translate-y-2'
						: ''}"
				></span>
				<span
					class="block w-6 h-1 bg-current rounded-full transition-all duration-300 {isMenuOpen ? 'opacity-0 scale-0' : ''}"
				></span>
				<span
					class="block w-6 h-1 bg-current rounded-full transition-all duration-300 {isMenuOpen
						? '-rotate-45 -translate-y-2'
						: ''}"
				></span>
			</div>
		</button>

		<div
			class="{isMenuOpen
				? 'flex'
				: 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto items-center mt-4 md:mt-0 gap-2 md:gap-6"
		>
			{#each [{ h: '/adventure', t: 'AVENTURA' }, { h: '/blog', t: 'BLOG' }, { h: '/mini-games', t: 'JUEGOS' }, { h: '/class', t: 'CLASES' }, { h: '/como-funciona', t: '¿CÓMO FUNCIONA?' }, { h: '/faq', t: 'FAQ' }] as link}
				<a
					href={link.h}
					class="relative w-full md:w-auto text-center px-4 py-2 rounded-xl font-bold transition-all duration-200 active:scale-90 {isActive(link.h) ? 'text-yellow-600 bg-yellow-50' : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'}"
				>
					{link.t}
					{#if isActive(link.h)}
						<span class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#f9c710] rounded-full"></span>
					{/if}
				</a>
			{/each}

			<div class="w-full h-px md:hidden bg-gray-200 my-2"></div>

			{#if $session.data}
				<a
					href="/profile"
					class="relative w-full md:w-auto flex items-center justify-center gap-3 px-4 py-2 rounded-xl font-bold transition-all duration-200 active:scale-90 {isActive('/profile') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-500 hover:bg-blue-50'}"
				>
					<div
						class="w-8 h-8 rounded-full border-2 border-yellow-400 overflow-hidden bg-white shadow-sm"
					>
						<img
							src={$session.data.user.image || '/img/profiles/ocelote.svg'}
							alt="Perfil"
							class="w-full h-full object-cover"
						/>
					</div>
					<span class="md:hidden lg:inline">PERFIL</span>
				</a>
					<button
						onclick={() => authClient.signOut()}
						type="submit"
						class="w-full bg-gray-100 text-gray-500 px-6 py-2 rounded-2xl font-bold hover:bg-red-50 hover:text-red-500 transition-all active:scale-95"
					>
						Salir
					</button>
			{:else}
				<a
					href="/login"
					class="w-full md:w-auto text-center bg-[#f9c710] text-white px-8 py-3 rounded-2xl font-black shadow-[0_4px_0_0_#d4a007] hover:shadow-none hover:translate-y-1 transition-all active:scale-95"
				>
					¡ENTRAR!
				</a>
			{/if}
		</div>
	</div>
</nav>

<!-- Mobile backdrop -->
<button
	class="fixed inset-0 z-30 bg-black/20 md:hidden {isMenuOpen ? 'block' : 'hidden'}"
	onclick={() => (isMenuOpen = false)}
	aria-label="Close menu"
></button>

