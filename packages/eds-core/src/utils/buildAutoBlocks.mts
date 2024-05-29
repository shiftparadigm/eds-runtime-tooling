import { buildHeroBlock } from './buildHeroBlock.mjs';

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
export function buildAutoBlocks(main: Element) {
	try {
		buildHeroBlock(main);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Auto Blocking failed', error);
	}
}
