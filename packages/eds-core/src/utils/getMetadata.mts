/**
 * Retrieves the content of metadata tags.
 * @param {string} name The metadata name (or property)
 * @param {Document} doc Document object to query for metadata. Defaults to the window's document
 * @returns {string} The metadata value(s)
 */
export function getMetadata(name: string, doc: Document = document): string {
	const attr = name && name.includes(':') ? 'property' : 'name';
	const meta = Array.from(
		doc.head.querySelectorAll<HTMLMetaElement>(`meta[${attr}="${name}"]`),
	)
		.map((m) => m.content)
		.join(', ');
	return meta || '';
}
