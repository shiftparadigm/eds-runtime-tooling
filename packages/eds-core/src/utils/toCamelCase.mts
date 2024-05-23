import { toClassName } from "./toClassName.mjs";

/**
 * Sanitizes a string for use as a js property name.
 * @param {string} name The unsanitized string
 * @returns {string} The camelCased name
 */
export function toCamelCase(name: string): string {
  return toClassName(name).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
