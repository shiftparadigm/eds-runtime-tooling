import { decorateIcon } from "./decorateIcon.mjs";

/**
 * Add <img> for icons, prefixed with codeBasePath and optional prefix.
 * @param {Element} [element] Element containing icons
 * @param {string} [prefix] prefix to be added to icon the src
 */
export function decorateIcons(element: Element, prefix: string = '') {
  const icons = Array.from(element.querySelectorAll('span.icon'));
  icons.forEach((span) => {
    decorateIcon(span, prefix);
  });
}
