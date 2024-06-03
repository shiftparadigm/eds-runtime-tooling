import { readBlockConfig } from './readBlockConfig.mjs';
import { toCamelCase } from './toCamelCase.mjs';
import { toClassName } from './toClassName.mjs';

/**
 * Decorates all sections in a container element.
 * @param {Element} main The container element
 */
export function decorateSections(main: Element) {
	main.querySelectorAll<HTMLElement>(':scope > div').forEach((section) => {
		const wrappers: Element[] = [];
		let defaultContent = false;
		Array.from(section.children).forEach((e) => {
			if (e.tagName === 'DIV' || !defaultContent) {
				const wrapper = document.createElement('div');
				wrappers.push(wrapper);
				defaultContent = e.tagName !== 'DIV';
				if (defaultContent) wrapper.classList.add('default-content-wrapper');
			}
			wrappers[wrappers.length - 1].append(e);
		});
		wrappers.forEach((wrapper) => section.append(wrapper));
		section.classList.add('section');
		section.dataset.sectionStatus = 'initialized';
		section.style.display = 'none';

		// Process section metadata
		const sectionMeta = section.querySelector('div.section-metadata');
		if (sectionMeta) {
			const meta = readBlockConfig(sectionMeta);
			Object.keys(meta).forEach((key) => {
				if (key === 'style') {
					const styles: string[] = (
						typeof meta.style === 'string' ? meta.style.split(',') : meta.style
					)
						.filter((style) => style)
						.map((style) => toClassName(style.trim()));
					styles.forEach((style) => section.classList.add(style));
				} else {
					const value = meta[key];
					section.dataset[toCamelCase(key)] =
						typeof value === 'string' ? value : value.join(',');
				}
			});
			(sectionMeta.parentNode as Element).remove();
		}
	});
}
