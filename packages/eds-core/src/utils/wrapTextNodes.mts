/**
 * Wrap inline text content of block cells within a <p> tag.
 * @param {Element} block the block element
 */
export function wrapTextNodes(block: Element) {
	const validWrappers = [
		'P',
		'PRE',
		'UL',
		'OL',
		'PICTURE',
		'TABLE',
		'H1',
		'H2',
		'H3',
		'H4',
		'H5',
		'H6',
	];

	const wrap = (el: Element) => {
		const wrapper = document.createElement('p');
		wrapper.append(...Array.from(el.childNodes));
		el.append(wrapper);
	};

	block
		.querySelectorAll<HTMLDivElement>(':scope > div > div')
		.forEach((blockColumn) => {
			if (blockColumn.hasChildNodes()) {
				const hasWrapper =
					!!blockColumn.firstElementChild &&
					validWrappers.some(
						(tagName) => blockColumn.firstElementChild?.tagName === tagName,
					);
				if (!hasWrapper) {
					wrap(blockColumn);
				} else if (
					blockColumn.firstElementChild.tagName === 'PICTURE' &&
					(blockColumn.children.length > 1 || !!blockColumn.textContent?.trim())
				) {
					wrap(blockColumn);
				}
			}
		});
}
