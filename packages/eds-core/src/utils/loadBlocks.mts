import { loadBlock } from './loadBlock.mjs';
import { updateSectionsStatus } from './updateSectionsStatus.mjs';

/**
 * Loads JS and CSS for all blocks in a container element.
 * @param {Element} main The container element
 */
export async function loadBlocks(main: Element) {
	updateSectionsStatus(main);
	const blocks = Array.from(main.querySelectorAll<HTMLDivElement>('div.block'));
	for (let i = 0; i < blocks.length; i += 1) {
		// eslint-disable-next-line no-await-in-loop
		await loadBlock(blocks[i]);
		updateSectionsStatus(main);
	}
}
