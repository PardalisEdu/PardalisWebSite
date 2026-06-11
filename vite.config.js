import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
	plugins: [
		sveltekit(),
		compression({
			algorithm: 'brotliCompress',
			ext: '.br',
			threshold: 1024
		}),
		compression({
			algorithm: 'gzip',
			ext: '.gz',
			threshold: 1024
		})
	]
});
