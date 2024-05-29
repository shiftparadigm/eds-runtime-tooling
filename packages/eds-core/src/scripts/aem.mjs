/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { sampleRUM } from '../utils/sampleRUM.mjs';
import { setup } from '../utils/setup.mjs';

export { sampleRUM, setup };
export { buildBlock } from '../utils/buildBlock.mjs';
export { createOptimizedPicture } from '../utils/createOptimizedPicture';
export { decorateBlock } from '../utils/decorateBlock';
export { decorateBlocks } from '../utils/decorateBlocks';
export { decorateButtons } from '../utils/decorateButtons';
export { decorateIcon } from '../utils/decorateIcon';
export { decorateIcons } from '../utils/decorateIcons';
export { decorateSections } from '../utils/decorateSections';
export { decorateTemplateAndTheme } from '../utils/decorateTemplateAndTheme';
export { fetchPlaceholders } from '../utils/fetchPlaceholders';
export { getMetadata } from '../utils/getMetadata';
export { loadBlock } from '../utils/loadBlock';
export { loadBlocks } from '../utils/loadBlocks';
export { loadCSS } from '../utils/loadCSS';
export { loadFooter } from '../utils/loadFooter';
export { loadHeader } from '../utils/loadHeader';
export { loadScript } from '../utils/loadScript';
export { readBlockConfig } from '../utils/readBlockConfig';
export { toCamelCase } from '../utils/toCamelCase';
export { toClassName } from '../utils/toClassName';
export { updateSectionsStatus } from '../utils/updateSectionsStatus';
export { waitForLCP } from '../utils/waitForLCP';
export { wrapTextNodes } from '../utils/wrapTextNodes';

/**
 * Auto initializiation.
 */

function init() {
	setup();
	sampleRUM('top');

	window.addEventListener('load', () => sampleRUM('load'));

	window.addEventListener('unhandledrejection', (event) => {
		sampleRUM('error', {
			source: event.reason.sourceURL,
			target: event.reason.line,
		});
	});

	window.addEventListener('error', (event) => {
		sampleRUM('error', { source: event.filename, target: event.lineno });
	});
}

init();
