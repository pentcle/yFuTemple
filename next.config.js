const Dotenv = require('dotenv-webpack');

module.exports = ({
	plugins: [new Dotenv()],
	images: {
		domains: [
			'rawcdn.githack.com'
		],
	},
	env: {
		REDIS_URL: process.env.REDIS_URL,
		LIVEBLOCKS_SECRET_KEY: process.env.LIVEBLOCKS_SECRET_KEY,
		WEBSITE_URI: 'https://yfu.major.tax/',
	}
});
