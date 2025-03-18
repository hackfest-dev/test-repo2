import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';

function t3Env(path?:string): Plugin {
	return {
		name: 'vite-t3-env',
		config() {
			import(path ? path : "./src/env")
		},
	};
}

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), t3Env()]
});
