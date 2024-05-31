import { decorateMain } from '../utils/decorateMain.mjs';
import { decorateTemplateAndTheme } from '../utils/decorateTemplateAndTheme.mjs';
import { loadBlocks } from '../utils/loadBlocks.mjs';
import { loadCSS } from '../utils/loadCSS.mjs';
import { loadFooter } from '../utils/loadFooter.mjs';
import { loadHeader } from '../utils/loadHeader.mjs';
import { sampleRUM } from '../utils/sampleRUM.mjs';
import { waitForLCP } from '../utils/waitForLCP.mjs';

export { decorateMain } from '../utils/decorateMain.mjs';

const LCP_BLOCKS = []; // add your LCP blocks to the list

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
	await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
	try {
		if (!window.location.hostname.includes('localhost'))
			sessionStorage.setItem('fonts-loaded', 'true');
	} catch (e) {
		// do nothing
	}
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc: Element) {
	document.documentElement.lang = 'en';
	decorateTemplateAndTheme();
	const main = doc.querySelector('main');
	if (main) {
		decorateMain(main);
		document.body.classList.add('appear');
		await waitForLCP(LCP_BLOCKS);
	}

	try {
		/* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
		if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
			await loadFonts();
		}
	} catch (e) {
		// do nothing
	}
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Document} doc The container element
 */
async function loadLazy(doc: Document) {
	const main = doc.querySelector('main');
	await loadBlocks(main as Element);

	const { hash } = window.location;
	const element = hash ? doc.getElementById(hash.substring(1)) : false;
	if (hash && element) element.scrollIntoView();

	void loadHeader(doc.querySelector('header') as Element);
	void loadFooter(doc.querySelector('footer') as Element);

	void loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
	void loadFonts();

	sampleRUM('lazy');
	sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
	sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
	// eslint-disable-next-line import/no-cycle
	window.setTimeout(() => import('./delayed.mjs'), 3000);
	// load anything that can be postponed to the latest here
}

async function loadPage() {
	await loadEager(document);
	await loadLazy(document);
	loadDelayed();
}

loadPage();
