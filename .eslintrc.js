module.exports = {
	'env': {
		'node': true,
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:tailwindcss/recommended',
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'tailwindcss'
	],
	'settings': {
		'react': {
			'version': 'detect'
		},
	},
	'rules': {
		'indent': [2, 'tab'],
		'no-mixed-spaces-and-tabs': 2,
		'react/prop-types': 0,
		'no-async-promise-executor': 0,
		'import/no-unresolved': 0, //Issue with package exports
		'quotes': [2, 'single', {'avoidEscape': true}],
		'object-curly-spacing': [2, 'never'],
		'array-bracket-spacing': [2, 'never'],
		'react/jsx-curly-brace-presence': ['error', {'props': 'always', 'children': 'always'}],
		'semi': 'error',
		'tailwindcss/no-custom-classname': 0
	}
};
