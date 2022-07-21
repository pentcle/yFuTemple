const {join} = require('path');

module.exports = {
	presets: [
		require('@yearn-finance/web-lib/config/tailwind.config.cjs')
	],
	content: [
		join(__dirname, 'pages', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'icons', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'logo', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'strategies', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'vaults', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'layouts', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'components', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'contexts', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'icons', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'utils', '**', '*.js')
	],
	theme: {
		extend: {
			colors: {
				beige: '#EAE8E1',
				yblue: '#6176b4'
			},
			width: {
				68: '17rem',
				'250%': '250%'
			},
			minWidth: {
				68: '17rem',
				80: '20rem'
			},
			fontFamily: {
				scope: ['Scope', 'Roboto', 'serif'],
				monument: ['Monument', 'sans-serif'],
				peste: ['Peste', 'sans-serif'],
				chicago: ['Chicago', 'mono'],
				bluepill: ['New Spirit Bold Condensed', 'sans-serif']
			},
			fontSize: {
				'base': ['16px', '24px'],
				'lg': ['1.125rem', '1.75rem'],
				'4xl': ['2.25rem', '2.5rem']

			},
			animation: {
				marquee: 'marquee 25s linear infinite',
				marquee2: 'marquee2 25s linear infinite'
			},
			keyframes: {
				marquee: {
					'0%': {transform: 'translateX(0%)'},
					'100%': {transform: 'translateX(-100%)'}
				},
				marquee2: {
					'0%': {transform: 'translateX(100%)'},
					'100%': {transform: 'translateX(0%)'}
				}
			}
		}
	},
	plugins: []
};