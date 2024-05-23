import { buildBlock } from "./buildBlock.mjs";
import { decorateBlock } from "./decorateBlock.mjs";
import { loadBlock } from "./loadBlock.mjs";

/**
 * Loads a block named 'footer' into footer
 * @param {Element} footer footer element
 * @returns {Promise<Element>}
 */
export async function loadFooter(footer: Element) {
  const footerBlock = buildBlock('footer', '');
  footer.append(footerBlock);
  decorateBlock(footerBlock);
  return loadBlock(footerBlock);
}
