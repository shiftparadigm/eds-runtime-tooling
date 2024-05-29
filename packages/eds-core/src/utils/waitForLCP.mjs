import { loadBlock } from './loadBlock.mjs';

/**
 * Load LCP block and/or wait for LCP in default content.
 * @param {Array} lcpBlocks Array of blocks
 */
export async function waitForLCP(lcpBlocks) {
	const block = document.querySelector('.block');
	const hasLCPBlock = block && lcpBlocks.includes(block.dataset.blockName);
	if (hasLCPBlock) await loadBlock(block);

	document.body.style.display = null;
	const lcpCandidate = document.querySelector('main img');

	await new Promise((resolve) => {
		if (lcpCandidate && !lcpCandidate.complete) {
			lcpCandidate.setAttribute('loading', 'eager');
			lcpCandidate.addEventListener('load', resolve);
			lcpCandidate.addEventListener('error', resolve);
		} else {
			resolve();
		}
	});
}
