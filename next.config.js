const Dotenv = require('dotenv-webpack');

module.exports = {
	plugins: [new Dotenv()],
	images: {
		formats: ['image/avif', 'image/webp'],
		domains: ['rawcdn.githack.com', 'images.ctfassets.net']
	},
	env: {
		REDIS_URL: process.env.REDIS_URL,
		LIVEBLOCKS_SECRET_KEY: process.env.LIVEBLOCKS_SECRET_KEY,
		WEBSITE_URI: 'https://yfu.major.tax/'
	}
};
