import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		// Pre-empaquetar deps que Vite descubre tarde evita recargas a media sesión
		include: ['better-auth/svelte', 'lucide-svelte/icons/*'],
		// Arrancar el servidor sin esperar a que termine el crawl de dependencias
		holdUntilCrawlEnd: false
	},
	server: {
		// Pre-transforma los módulos de entrada al arrancar para acelerar la primera carga
		warmup: {
			clientFiles: ['./src/routes/+layout.svelte', './src/routes/(app)/+page.svelte']
		}
	}
});
