<script>
	let login = false; 
</script>

<nav class="flex justify-between w-screen p-7 font-bold text-[#f9c710]">
	<div>
		<a href="/" class="text-3xl">PARDALIS</a>
	</div>
	<div class="text-xl">
		<a href="/">INICIO</a>
		<a href="/" class="ml-7">AVENTURA</a>
		<a href="/" class="ml-7">PRACTICA</a>

		{#if !login}
			<a href="/" class="ml-7 p-3 bg-[#f9c710] text-white rounded-lg">Inicia Sesión</a>	
		{:else}
			<a href="/" class="ml-7 p-3 bg-[#f9c710] text-white rounded-lg">Cierra Sesión</a>	
		{/if}
		
	</div>
</nav>