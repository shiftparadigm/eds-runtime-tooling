import { decorateBlock } from './decorateBlock.mjs';

/**
 * Decorates all blocks in a container element.
 * @param {Element} main The container element
 */
export function decorateBlocks(main: Element) {
	main
		.querySelectorAll<HTMLDivElement>('div.section > div > div')
		.forEach(decorateBlock);
}
