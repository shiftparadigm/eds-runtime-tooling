/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */

import { decorateMain } from '../../utils/decorateMain.mjs';
import { loadBlocks } from '../../utils/loadBlocks.mjs';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {Promise<HTMLElement | null>} The root element of the fragment
 */
export async function loadFragment(path: string): Promise<HTMLElement | null> {
	if (path && path.startsWith('/')) {
		const resp = await fetch(`${path}.plain.html`);
		if (resp.ok) {
			const main = document.createElement('main');
			main.innerHTML = await resp.text();

			// reset base path for media to fragment base
			const resetAttributeBase = (tag: string, attr: string) => {
				main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
					elem.setAttribute(
						attr,
						new URL(
							elem.getAttribute(attr)
								? (elem.getAttribute(attr), new URL(path, window.location.href))
								: new URL(path, window.location.href),
						).href,
					);
				});
			};
			resetAttributeBase('img', 'src');
			resetAttributeBase('source', 'srcset');

			decorateMain(main);
			await loadBlocks(main);
			return main;
		}
	}
	return null;
}

export default async function decorate(block: Element) {
	const link = block.querySelector('a');
	const path = link ? link.getAttribute('href') : block.textContent?.trim();
	if (path) {
		const fragment = await loadFragment(path);
		if (fragment) {
			const fragmentSection = fragment.querySelector(':scope .section');
			if (fragmentSection) {
				(block.closest('.section') ?? block).classList.add(
					...[String(fragmentSection.classList)],
				);
				(block.closest('.fragment') ?? block).replaceWith(
					...[String(fragment.childNodes)],
				);
			}
		}
	}
}
