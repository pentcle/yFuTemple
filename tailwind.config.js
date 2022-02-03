const colors = require('tailwindcss/colors');

module.exports = {
	corePlugins: {
		ringColor: false,
	},
	darkMode: 'class',
	purge: {
		content: [
			'./pages/**/*.js',
			'./components/**/*.js'
		],
	},
	theme: {
		colors: {
			red: colors.red,
			white: colors.white,
			beige: '#EAE8E1',
			black: colors.black,
			slate: colors.slate,
			yblue: '#6176b4',
			dark: {
				900: '#0f172a',
				600: '#141e37',
			},
		},
		extend: {
			fontFamily: {
				scope: ['Scope', 'Roboto', 'serif'],
				monument: ['Monument', 'sans-serif'],
				peste: ['Peste', 'sans-serif'],
				chicago: ['Chicago', 'mono'],
				bluepill: ['New Spirit Bold Condensed', 'sans-serif'],
			},
			fontSize: {
				'base': ['16px', '24px'],
			},
			animation: {
				marquee: 'marquee 25s linear infinite',
				marquee2: 'marquee2 25s linear infinite',
			},
			keyframes: {
				marquee: {
					'0%': {transform: 'translateX(0%)'},
					'100%': {transform: 'translateX(-100%)'},
				},
				marquee2: {
					'0%': {transform: 'translateX(100%)'},
					'100%': {transform: 'translateX(0%)'},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms')
	],
};