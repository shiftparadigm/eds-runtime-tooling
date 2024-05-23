import { buildBlock } from "./buildBlock.mjs";

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
export function buildHeroBlock(main: Element) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}
