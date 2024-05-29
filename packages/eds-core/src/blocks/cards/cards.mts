import { createOptimizedPicture } from '../../utils/createOptimizedPicture.mjs';

export default function decorate(block: Element) {
	/* change to ul, li */
	const ul = document.createElement('ul');
	const blockChildren: Array<Element> = Array.from(block.children);
	blockChildren.forEach((row) => {
		const li = document.createElement('li');
		while (row.firstElementChild) li.append(row.firstElementChild);
		const liChildren: Array<Element> = Array.from(li.children)
		liChildren.forEach((div) => {
			if (div.children.length === 1 && div.querySelector('picture'))
				div.className = 'cards-card-image';
			else div.className = 'cards-card-body';
		});
		ul.append(li);
	});
	const ulQueryAll: Array<HTMLImageElement> = Array.from(ul.querySelectorAll('img'))
		ulQueryAll.forEach((img) =>
		(img
			.closest('picture') ?? img)
			.replaceWith(
				createOptimizedPicture(
					img.src, 
					img.alt, 
					false, 
					[{ width: '750' }]
				),
			),
);
	block.textContent = '';
	block.append(ul);
}
