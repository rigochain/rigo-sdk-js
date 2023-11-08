module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2016,
		project: './tsconfig.base.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	extends: ['plugin:@typescript-eslint/recommended'],
	settings: {
		'import/resolver': {
			typescript: {}, // this loads tsconfig.json to eslint
		},
	},
	plugins: ["no-null", "header"],
	rules: {
		'no-null/no-null': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		"header/header": [2, "block", [
			"",
			"    Copyright 2023 All Rigo Chain Developers",
			"",
			"    Licensed under the Apache License, Version 2.0 (the \"License\");",
			"    you may not use this file except in compliance with the License.",
			"    You may obtain a copy of the License at",
			"",
			"        http://www.apache.org/licenses/LICENSE-2.0",
			"",
			"    Unless required by applicable law or agreed to in writing, software",
			"    distributed under the License is distributed on an \"AS IS\" BASIS,",
			"    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.",
			"    See the License for the specific language governing permissions and",
			"    limitations under the License.",
			""
		]]
	}
};
