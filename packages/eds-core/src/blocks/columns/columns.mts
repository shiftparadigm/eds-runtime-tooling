export default function decorate(block: Element) {
  const cols: HTMLCollection = block.firstElementChild!.children;
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  const blockChildren: Array<Element> = Array.from(block.children)
  blockChildren.forEach((row) => {
    const rowChildren: Array<Element> = Array.from(row.children)
    rowChildren.forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
