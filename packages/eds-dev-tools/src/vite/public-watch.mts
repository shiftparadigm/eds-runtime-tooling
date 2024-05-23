import { copy, remove } from 'fs-extra';
import colors from 'picocolors';
import { resolve, relative } from 'path';
import type { ResolvedConfig, PluginOption } from 'vite';
import chokidar from 'chokidar';

const EdgeDeliveryTools = (): PluginOption => {
    let viteConfig: ResolvedConfig;
    const paths: string[] = [];
    const currentDir = resolve();

    
    function writeLog(message: string) {
        viteConfig.logger.info(
            colors.green('[Edge-Delivery-Tools] ') + message
        );
    }

    const copyMatchedFiles = (files: string[]) => {
        if (files.length > 0) {
            for (let i = 0, il = files.length; i < il; ++i) {
                const outDestination = getDestPathForSource(files[i]);
                writeLog(
                    colors.dim('copying ') +
                    colors.blue(relative(currentDir, files[i])) +
                    colors.dim(' to ') +
                    colors.blue(relative(currentDir, outDestination))
                );
                copy(files[i], outDestination).catch((err) => {
                    viteConfig.logger.error(colors.red(`The file "${files[i]}" could not be copied`));
                    viteConfig.logger.error(err);
                });
            }
        }
    };

    function getDestPathForSource(file: string) {
        // Be careful, publicDir seems to be resolved automatically but not build.outDir
        return file.replace(/\\/g, '/').replace(viteConfig.publicDir, resolve(currentDir, viteConfig.build.outDir).replace(/\\/g, '/'));
    }

    return {
        name: 'Edge-Delivery-Tools',
        configResolved(resolvedConfig) {
            viteConfig = resolvedConfig;

            const publicGlob = `${viteConfig.publicDir}/**/*`;
            const watcher = chokidar.watch(publicGlob);

            watcher.on('all', (event, path) => {
                switch (event) {
                    case 'add':
                    case 'change':
                        copyMatchedFiles([path]);
                        break;
                    case 'unlink':
                    case 'unlinkDir':
                        const outDestination = getDestPathForSource(path);
                        writeLog(
                            colors.dim('removing ') +
                            colors.red(relative(currentDir, outDestination))
                        );
                        remove(outDestination);
                        break;
                }
            });
        },
    };
};

export default EdgeDeliveryTools;