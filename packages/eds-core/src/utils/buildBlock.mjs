/**
 * Builds a block DOM Element from a two dimensional array, string, or object
 * @param {string} blockName name of the block
 * @param {*} content two dimensional array or string or object of content
 */
export function buildBlock(blockName, content) {
	const table = Array.isArray(content) ? content : [[content]];
	const blockEl = document.createElement('div');
	// build image block nested div structure
	blockEl.classList.add(blockName);
	table.forEach((row) => {
		const rowEl = document.createElement('div');
		row.forEach((col) => {
			const colEl = document.createElement('div');
			const vals = col.elems ? col.elems : [col];
			vals.forEach((val) => {
				if (val) {
					if (typeof val === 'string') {
						colEl.innerHTML += val;
					} else {
						colEl.appendChild(val);
					}
				}
			});
			rowEl.appendChild(colEl);
		});
		blockEl.appendChild(rowEl);
	});
	return blockEl;
}
