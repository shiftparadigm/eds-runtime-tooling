import { toClassName } from './toClassName.mjs';

/**
 * Extracts the config from a block.
 * @param {Element} block The block element
 * @returns {Map<string, string>} The block config
 */

export function readBlockConfig(block: Element): Map<string, string> {
	const config: Map<string, string> = new Map();
	block.querySelectorAll(':scope > div').forEach((row) => {
		if (row.children) {
			const cols = Array.from(row.children);
			if (cols[1]) {
				const col = cols[1];
				const colsTextContent = cols[0].textContent;
				let value: string | string[] = '';
				if (colsTextContent) {
					const name = toClassName(colsTextContent);
					if (col.querySelector('a')) {
						const as = Array.from(col.querySelectorAll('a'));
						if (as.length === 1) {
							value = as[0].href;
						} else {
							value = as.map((a) => a.href);
							value = value.join(',');
						}
					} else if (col.querySelector('img')) {
						const imgs = Array.from(col.querySelectorAll('img'));
						if (imgs.length === 1) {
							value = imgs[0].src;
						} else {
							value = imgs.map((img) => img.src);
							value = value.join(',');
						}
					} else if (col.querySelector('p')) {
						const ps = Array.from(col.querySelectorAll('p'));
						if (ps.length === 1) {
							value = ps[0].textContent ?? '';
						} else {
							value = ps.map((p) => p.textContent ?? '');
							value = value.join(',');
						}
					} else value = row.children[1].textContent ?? '';
					config.set(name, value);
				}
			}
		}
	});
	return config;
}
