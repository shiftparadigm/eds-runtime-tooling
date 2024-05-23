import { buildBlock } from "./buildBlock.mjs";
import { decorateBlock } from "./decorateBlock.mjs";
import { loadBlock } from "./loadBlock.mjs";

/**
 * Loads a block named 'footer' into footer
 * @param footer footer element
 * @returns {Promise}
 */
export async function loadFooter(footer) {
  const footerBlock = buildBlock('footer', '');
  footer.append(footerBlock);
  decorateBlock(footerBlock);
  return loadBlock(footerBlock);
}
