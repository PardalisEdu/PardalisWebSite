import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		// Pre-empaquetar deps que Vite descubre tarde evita recargas a media sesión
		include: ['better-auth/svelte']
	},
	server: {
		watch: {
			// El export del juego (68MB) no necesita vigilancia del watcher
			ignored: ['**/static/game/**']
		},
		// Pre-transforma los módulos de entrada al arrancar para acelerar la primera carga
		warmup: {
			clientFiles: ['./src/routes/+layout.svelte', './src/routes/+page.svelte']
		}
	}
});
