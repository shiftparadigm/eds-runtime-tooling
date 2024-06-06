#!/usr/bin/env node

import { build } from 'vite';

await build({ build: { watch: null } });
