/**
 * Add <img> for icon, prefixed with codeBasePath and optional prefix.
 * @param {Element} [span] span element with icon classes
 * @param {string} [prefix] prefix to be added to icon src
 * @param {string} [alt] alt text to be added to icon
 */
export function decorateIcon(span, prefix = '', alt = '') {
	const iconName = Array.from(span.classList)
		.find((c) => c.startsWith('icon-'))
		.substring(5);
	const img = document.createElement('img');
	img.dataset.iconName = iconName;
	img.src = `${window.hlx.codeBasePath}${prefix}/icons/${iconName}.svg`;
	img.alt = alt;
	img.loading = 'lazy';
	span.append(img);
}
