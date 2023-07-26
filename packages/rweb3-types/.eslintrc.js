module.exports = {
	extends: [
		'../../.eslintrc.js',
		'prettier'
	],
	parserOptions: {
		project: './tsconfig.esm.json',
		tsconfigRootDir: __dirname,
	},
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'error'
	},
};
