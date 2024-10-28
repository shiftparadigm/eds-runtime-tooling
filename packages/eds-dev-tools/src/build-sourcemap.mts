#!/usr/bin/env node

import { build } from 'vite';
import { defaultViteConfigPathIfMissing } from './vite/config-resolver.mjs';

await build({
	configFile: defaultViteConfigPathIfMissing(),
	build: {
		watch: null,
		sourcemap: true,
	},
});
