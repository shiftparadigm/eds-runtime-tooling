/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	plugins: ['@typescript-eslint', 'import'],
	extends: [
		// The order of these matter:
		// eslint baseline
		'eslint:recommended',
		// disables eslint rules in favor of using prettier separately
		'prettier',
	],
	rules: {
		// https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
		'no-undef': 'off',
	},
	ignorePatterns: [
		'**/generated/**/*',
		'packages/*/dist/**/*',
		'packages/*/dev-dist/**/*',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	overrides: [
		{
			files: ['**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}'],
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.node.json',
				tsconfigRootDir: __dirname,
			},
			extends: [
				// Recommended typescript changes, which removes some "no-undef" checks that TS handles
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:@typescript-eslint/recommended-type-checked',
				'plugin:@typescript-eslint/recommended',
			],
			rules: {
				'@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						disallowTypeAnnotations: false,
					},
				],
				// no-unsafe-assignment complains when passing components as variables
				'@typescript-eslint/no-unsafe-assignment': [0],
				// Adds naming conventions
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: 'default',
						format: ['camelCase', 'PascalCase'],
						leadingUnderscore: 'forbid',
					},
					{
						selector: 'class',
						format: ['PascalCase'],
					},
					{
						selector: 'classProperty',
						modifiers: ['private'],
						format: ['camelCase'],
						leadingUnderscore: 'require',
					},
					{
						selector: 'typeParameter',
						format: ['PascalCase'],
						prefix: ['T'],
					},
					{
						selector: 'typeAlias',
						format: ['PascalCase'],
					},
					{
						selector: 'interface',
						format: ['PascalCase'],
					},
					{
						selector: ['objectLiteralProperty', 'import'], // This effectively disables the rule for object literal properties and imports, which we do not always control
						format: null,
					},
				],
				'import/order': [
					'error',
					{
						'newlines-between': 'never',
						alphabetize: {
							order: 'asc',
							caseInsensitive: true,
						},
						groups: [
							'external',
							'builtin',
							'internal',
							'parent',
							'sibling',
							'index',
							'object',
							'unknown',
						],
						pathGroups: [
							{
								pattern: '@!(/)*/**',
								group: 'external',
								position: 'before',
							},
							{
								pattern: '@/**',
								group: 'internal',
								position: 'before',
							},
						],
					},
				],
			},
		},
		{
			files: ['**/*.{js,jsx,mjs,cjs}'],
			rules: {
				// Disabling TS rules for JS files because, while they should follow the rules, do not need to all be adjusted right now
				'@typescript-eslint/await-thenable': 'off',
				'@typescript-eslint/naming-convention': 'off',
				'@typescript-eslint/no-floating-promises': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/require-await': 'off',
			},
		},
	],
};
