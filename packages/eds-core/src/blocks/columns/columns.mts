export default function decorate(block: Element) {
	const cols: HTMLCollection | undefined = block.firstElementChild?.children;
	if (!cols) {
		return;
	}
	block.classList.add(`columns-${cols.length}-cols`);

	// setup image columns
	const blockChildren: Element[] = Array.from(block.children);
	blockChildren.forEach((row) => {
		const rowChildren: Element[] = Array.from(row.children);
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
