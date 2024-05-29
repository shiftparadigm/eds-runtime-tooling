/** @type {import('eslint').Linter.Config} */
module.exports = {
	overrides: [
		{
			files: ['./*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}'],
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.node.json',
				tsconfigRootDir: __dirname,
			},
		},
		{
			files: ['./src/**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}'],
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
			},
		},
	],
};
