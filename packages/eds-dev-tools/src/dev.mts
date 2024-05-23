import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SpawnOptionsWithoutStdio, exec, spawn, type ExecOptions } from 'node:child_process';
import { build } from 'vite';
import type { RollupWatcher, RollupWatcherEvent } from 'rollup';
import chokidar from 'chokidar';
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

await spawnNodeAsync('@adobe/aem-cli', ['up'], {
	cwd: join(process.cwd(), 'dist'),
});

function setupBuildServer() {
	return build({
		mode: 'development',
		build: {
			watch: {},
			sourcemap: true,
		}
	}) as Promise<RollupWatcher>;
}

async function restartBuildServer() {
	if (restarting) return;
	restarting = true;
	const oldWatcher = watcher;
	watcher = new Promise<RollupWatcher>((resolve, reject) => {
		oldWatcher
			.then(ow => ow.close())
			// .then(() => new Promise((resolve) => setTimeout(resolve, 50)))
			.then(() => setupBuildServer())
			.then(newWatcher => {
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
		await execAsync(`git clone --bare ${gitRemote} "${target}"`);
	} catch (ex) {}
}

function execAsync(command: string, options?: ExecOptions): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		exec(command, options, (error, stdout, stderr) => {
			if (error) reject(error);
			else resolve(stdout.toString());
		});
	});
}

function spawnNodeAsync(packageName: string, args: string[] = [], options?: SpawnOptionsWithoutStdio) {
	const jsPath = fileURLToPath(import.meta.resolve(packageName));
	const handle = spawn('node', [jsPath, ...args], options);

	handle.stdout.on('data', function (data) {
		process.stdout.write(data);
	});

	handle.stderr.on('data', function (data) {
		process.stderr.write(data);
	});

	return new Promise<void>((resolve, reject) => {
		handle.on('exit', function (code) {
			if (code === 0) resolve();
			else reject(`Process '{command}' exited with code ${code}`);
		});
	});
}
