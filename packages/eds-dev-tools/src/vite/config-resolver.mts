import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultConfigFiles = [
	'vite.config.js',
	'vite.config.mjs',
	'vite.config.ts',
	'vite.config.cjs',
	'vite.config.mts',
	'vite.config.cts',
];

export function hasManualViteConfig() {
	const configRoot = process.cwd();
	for (const filename of defaultConfigFiles) {
		const filePath = resolve(configRoot, filename);
		if (existsSync(filePath)) return true;
	}
	return false;
}

export function defaultViteConfigPathIfMissing() {
	return hasManualViteConfig()
		? undefined
		: fileURLToPath(import.meta.resolve('../vite.config.mjs'));
}
