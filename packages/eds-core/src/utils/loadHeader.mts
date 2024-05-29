import { buildBlock } from './buildBlock.mjs';
import { decorateBlock } from './decorateBlock.mjs';
import { loadBlock } from './loadBlock.mjs';

/**
 * Loads a block named 'header' into header
 * @param {Element} header header element
 * @returns {Promise}
 */
export async function loadHeader(header: Element) {
	const headerBlock = buildBlock('header', '');
	header.append(headerBlock);
	decorateBlock(headerBlock);
	return loadBlock(headerBlock);
}
