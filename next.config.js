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
		WEBSITE_URI: 'https://yfu.major.tax/',
		WEB_SOCKET_URL: {
			1: process.env.WS_URL_MAINNET,
			250: process.env.WS_URL_FANTOM,
			42161: process.env.WS_URL_ARBITRUM
		},
		JSON_RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			250: process.env.RPC_URL_FANTOM,
			42161: process.env.RPC_URL_ARBITRUM
		},
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		INFURA_KEY: process.env.INFURA_KEY
	}
};
