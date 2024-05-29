import { buildAutoBlocks } from './buildAutoBlocks.mjs';
import { decorateBlocks } from './decorateBlocks.mjs';
import { decorateButtons } from './decorateButtons.mjs';
import { decorateIcons } from './decorateIcons.mjs';
import { decorateSections } from './decorateSections.mjs';

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
export function decorateMain(main: Element) {
	// hopefully forward compatible button decoration
	decorateButtons(main);
	decorateIcons(main);
	buildAutoBlocks(main);
	decorateSections(main);
	decorateBlocks(main);
}
