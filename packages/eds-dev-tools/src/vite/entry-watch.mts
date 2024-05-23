import colors from 'picocolors';
import { type ResolvedConfig, type PluginOption, normalizePath } from 'vite';
import chokidar from 'chokidar';
import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';

export const entryGlobs = [
    'src/scripts/*',
    'src/blocks/*/*'
];

function buildEntry() {
        
    const scripts = globSync('src/scripts/*').map(normalizePath);
    const blocks = globSync('src/blocks/*/*').map(normalizePath);

    function isValidBlockFile(path: string) {
        const match = /^src\/blocks\/(?<folder>.*)\/(?<file>.*)\.m?(t|j)s/g.exec(path);
        if (!match || !match.groups) return false;
        return match.groups.folder === match.groups.file;
    }

    const entry = Object.fromEntries(
        [...scripts, ...blocks.filter(isValidBlockFile)].flatMap((path) => {
            const regexResult = /^src\/(.*)\.m?(j|t)s$/g.exec(path);
            if (!regexResult) return [];
            return [[regexResult![1], path]];
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

    return entry;
}

const EntryWatcher = (): PluginOption => {
    let viteConfig: ResolvedConfig;
    let initialEntry: {
        [entryAlias: string]: string;
    } | undefined = undefined;;

    function writeLog(message: string) {
        viteConfig.logger.info(
            colors.green('[Edge-Delivery-Tools] ') + message
        );
    }

    return {
        name: 'Edge-Delivery-Tools',
        config(config) {
            const lib = config.build?.lib;
            if (!lib) throw new Error('Must be used with lib mode');
            if (initialEntry === undefined) {
                if (typeof lib.entry !== 'object' || Array.isArray(lib.entry)) throw new Error('build.lib.entry must be an object');
                initialEntry = lib.entry;
            }

            lib.entry = { ...buildEntry(), ...initialEntry };
        },
        configResolved(config) {
            viteConfig = config;
            const keys = Object.keys(initialEntry ?? {});
            if (keys.length)
                writeLog(colors.dim('Using overridden entrypoints: ') + colors.green(keys.join(', ')));
        },
    };
};

export default EntryWatcher;