import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import EntryWatcher from './vite/entry-watch.mjs';
import PublicFolderWatcher from './vite/public-watch.mjs';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		viteTsconfigPaths(),
		cssInjectedByJsPlugin({
			relativeCSSInjection: true,
			suppressUnusedCssWarning: true,
		}),
		PublicFolderWatcher(),
		EntryWatcher(),
	],
	build: {
		cssCodeSplit: true,
		lib: {
			entry: {},
			formats: ['es'],
			fileName(format, entryName) {
				return entryName + '.js';
			},
		},
		outDir: 'dist',
	},
	esbuild: {
		supported: {
			// Adobe's boilerplate makes some pretty advanced assumptions about
			'top-level-await': true, //browsers can handle top-level-await features
		},
	},
});
