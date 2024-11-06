<script>
	let login = false; 
</script>

<nav class="flex justify-between w-screen p-7 font-bold text-[#f9c710] fixed bg-white ">
	<div>
		<a href="/" class="text-3xl">PARDALIS</a>
	</div>
	<div class="text-xl">
		<a href="/">INICIO</a>
		<a href="/" class="ml-7">AVENTURA</a>
		<a href="/profile" class="ml-7">PERFIL</a>

		{#if !login}
			<a href="/login" class="ml-7 p-3 bg-[#f9c710] text-white rounded-lg">Inicia Sesión</a>
		{:else}
			<a href="/logout" class="ml-7 p-3 bg-[#f9c710] text-white rounded-lg">Cierra Sesión</a>
		{/if}
		
	</div>
</nav>