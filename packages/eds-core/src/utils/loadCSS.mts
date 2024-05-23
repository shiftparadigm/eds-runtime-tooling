/**
 * Loads a CSS file.
 * @param {string} href URL to the CSS file
 */
export async function loadCSS(href: string) {
  return new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`head > link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      link.onerror = reject;
      document.head.append(link);
    } else {
      resolve();
    }
  });
}
