#!/usr/bin/env node

import chokidar from 'chokidar';
import type { RollupWatcher, RollupWatcherEvent } from 'rollup';
import { build } from 'vite';
import type { SpawnOptionsWithoutStdio } from 'node:child_process';
import { exec, spawn, type ExecOptions } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { entryGlobs } from './vite/entry-watch.mjs';

let watcher = setupBuildServer();

await firstBuildCompleted(await watcher);
await ensureGitDir('dist');

let restarting = false;
const chokidarWatcher = chokidar.watch(entryGlobs, { ignoreInitial: true });

chokidarWatcher.on('add', (path) => {
	console.log('add ' + path);
	restartBuildServer();
});
chokidarWatcher.on('unlink', (path) => {
	console.log('unlink ' + path);
	restartBuildServer();
});

const adobeCli = spawnNodeAsync('@adobe/aem-cli', ['up'], {
	cwd: join(process.cwd(), 'dist'),
});

await new Promise((resolve) => setTimeout(resolve, 5000));

await adobeCli;

function setupBuildServer() {
	return build({
		mode: 'development',
		build: {
			watch: {},
			sourcemap: true,
		},
	}) as Promise<RollupWatcher>;
}

function restartBuildServer() {
	if (restarting) return;
	restarting = true;
	const oldWatcher = watcher;
	watcher = new Promise<RollupWatcher>((resolve, reject) => {
		oldWatcher
			.then((ow) => ow.close())
			// .then(() => new Promise((resolve) => setTimeout(resolve, 50)))
			.then(() => setupBuildServer())
			.then((newWatcher) => {
				resolve(newWatcher);
				restarting = false;
			}, reject);
	});
}

function firstBuildCompleted(watcher: RollupWatcher) {
	// promise resolves when the build completes
	return new Promise<void>((resolve, reject) => {
		watcher.on('event', onEvent);

		function onEvent(event: RollupWatcherEvent) {
			if (event.code === 'BUNDLE_END') {
				resolve();
			} else if (event.code === 'ERROR') {
				reject(event.error);
			} else {
				return;
			}
			watcher.off('event', onEvent);
		}
	});
}

/**
 * @param {string} path to the destination directory
 * @returns {Promise<void>}
 */
async function ensureGitDir(path: string): Promise<void> {
	const target = join(process.cwd(), path, '.git');
	const gitRemote = (await execAsync(`git config remote.origin.url`)).trim();
	try {
		await execAsync(`git clone --bare "${process.cwd()}" "${target}" -o fake`);
		await execAsync(`git remote add origin ${gitRemote}`, { cwd: target });
	} catch (ex) {
		console.warn('failed to clone git repo for use with AEM CLI');
	}
}

function execAsync(command: string, options?: ExecOptions): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		exec(command, options, (error, stdout) => {
			if (error) reject(error);
			else resolve(stdout.toString());
		});
	});
}

function spawnNodeAsync(
	packageName: string,
	args: string[] = [],
	options?: SpawnOptionsWithoutStdio,
) {
	const jsPath = fileURLToPath(import.meta.resolve(packageName));
	const handle = spawn('node', [jsPath, ...args], options);

	handle.stdout.on('data', function (data: string | Uint8Array) {
		process.stdout.write(data);
	});

	handle.stderr.on('data', function (data: string | Uint8Array) {
		process.stderr.write(data);
	});

	return new Promise<void>((resolve, reject) => {
		handle.on('exit', function (code) {
			if (code === 0) resolve();
			else reject(`Process '{command}' exited with code ${code}`);
		});
	});
}
