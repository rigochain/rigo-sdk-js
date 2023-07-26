module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2016,
		project: './tsconfig.base.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	extends: [''],
	settings: {
		'import/resolver': {
			typescript: {}, // this loads tsconfig.json to eslint
		},
	},
};
