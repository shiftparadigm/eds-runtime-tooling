/**
 * Setup block utils.
 */
export function setup() {
	window.hlx = window.hlx || {};
	window.hlx.RUM_MASK_URL = 'full';
	window.hlx.codeBasePath = '';
	window.hlx.lighthouse =
		new URLSearchParams(window.location.search).get('lighthouse') === 'on';

	const scriptEl = document.querySelector('script[src$="/scripts/scripts.js"]');
	if (scriptEl) {
		try {
			[window.hlx.codeBasePath] = new URL(scriptEl.src).pathname.split(
				'/scripts/scripts.js',
			);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
	}
}
