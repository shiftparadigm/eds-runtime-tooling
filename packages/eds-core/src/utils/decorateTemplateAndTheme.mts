import { getMetadata } from './getMetadata.mjs';
import { toClassName } from './toClassName.mjs';

/**
 * Set template (page structure) and theme (page styles).
 */
export function decorateTemplateAndTheme() {
	const addClasses = (element: Element, classes: string) => {
		classes.split(',').forEach((c) => {
			element.classList.add(toClassName(c.trim()));
		});
	};
	const template = getMetadata('template');
	if (template) addClasses(document.body, template);
	const theme = getMetadata('theme');
	if (theme) addClasses(document.body, theme);
}
