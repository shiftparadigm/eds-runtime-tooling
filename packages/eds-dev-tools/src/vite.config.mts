import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';

function normalizeWindowsPath(path: string) {
	return path.replace(/\\/g, '/');
}

const scripts = globSync('src/scripts/*').map(normalizeWindowsPath);
const blocks = globSync('src/blocks/*/*.ts').map(normalizeWindowsPath);

function isValidBlockFile(path: string) {
	const match = /^src\/blocks\/(?<folder>.*)\/(?<file>.*)\.(t|j)s/g.exec(path);
	if (!match || !match.groups) return false;
	return match.groups.folder === match.groups.file;
}

const entry = Object.fromEntries(
	[...scripts, ...blocks.filter(isValidBlockFile)].map((path) => {
		const regexResult = /^src\/(.*)\.ts$/g.exec(path);
		return [regexResult![1], path];
	}),
);

const scriptsBoilerplate = [
	'scripts/aem',
	'scripts/scripts',
	'scripts/delayed',
];
for (const boilerplate of scriptsBoilerplate) {
	if (entry[boilerplate]) continue;
	entry[boilerplate] = fileURLToPath(
		import.meta.resolve(`@shiftparadigm/eds-core/${boilerplate}`),
	);
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		viteTsconfigPaths(),
		cssInjectedByJsPlugin({
			relativeCSSInjection: true,
			suppressUnusedCssWarning: true,
		}),
	],
	build: {
		cssCodeSplit: true,
		lib: {
			entry,
			formats: ['es'],
			fileName(format, entryName) {
				return entryName + '.js';
			},
		},
		outDir: 'dist',
	},
});
