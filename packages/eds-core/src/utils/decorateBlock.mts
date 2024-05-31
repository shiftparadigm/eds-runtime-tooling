import { wrapTextNodes } from './wrapTextNodes.mjs';

/**
 * Decorates a block.
 * @param {HTMLElement} block The block element
 */
export function decorateBlock(block: HTMLElement) {
	const shortBlockName = block.classList[0];
	if (shortBlockName) {
		block.classList.add('block');
		block.dataset.blockName = shortBlockName;
		block.dataset.blockStatus = 'initialized';
		wrapTextNodes(block);
		const blockWrapper = block.parentElement;
		if (blockWrapper) blockWrapper.classList.add(`${shortBlockName}-wrapper`);
		const section = block.closest('.section');
		if (section) section.classList.add(`${shortBlockName}-container`);
	}
}
