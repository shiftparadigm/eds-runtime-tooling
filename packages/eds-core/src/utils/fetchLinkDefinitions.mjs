import { toCamelCase } from './toCamelCase.mjs';

/**
 * Gets link definitions object.
 * @param {string} [prefix] Location of link definitions
 * @returns {LinkDefinitions} Window link definitions object
 */
export async function fetchLinkDefinitions(prefix = 'default') {
	window.linkDefinitions = window.linkDefinitions || {};
	if (!window.linkDefinitions[prefix]) {
		window.linkDefinitions[prefix] = new Promise((resolve) => {
			fetch(`${prefix === 'default' ? '' : prefix}/link-definitions.json`)
				.then((resp) => {
					if (resp.ok) {
						return resp.json();
					}
					return {};
				})
				.then((json) => {
					const linkDefinitions = {};
					json.data
						.filter((definition) => definition.Key)
						.forEach((definition) => {
							linkDefinitions[toCamelCase(definition.Key)] = definition;
						});
					window.linkDefinitions[prefix] = linkDefinitions;
					resolve(window.linkDefinitions[prefix]);
				})
				.catch(() => {
					// error loading linkDefinitions
					window.linkDefinitions[prefix] = {};
					resolve(window.linkDefinitions[prefix]);
				});
		});
	}
	return window.linkDefinitions[`${prefix}`];
}
