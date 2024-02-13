/* eslint-disable @typescript-eslint/explicit-function-return-type */
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV !== 'production'
});
const {PHASE_EXPORT} = require('next/constants');


module.exports = (phase) => withPWA({
	assetPrefix: process.env.IPFS_BUILD === 'true' || phase === PHASE_EXPORT ? './' : '/',
	images: {
		formats: ['image/avif', 'image/webp'],
		unoptimized: process.env.IPFS_BUILD === 'true' || phase === PHASE_EXPORT, //Exporting image does not support optimization
		domains: [
			'rawcdn.githack.com',
			'raw.githubusercontent.com',
			'images.ctfassets.net'
		]
	},
	env: {
		/* 🔵 - Yearn Finance **************************************************
		** Config over the RPC
		**********************************************************************/
		WEB_SOCKET_URL: {
			1: process.env.WS_URL_MAINNET
		},
		JSON_RPC_URL: {
			1: process.env.RPC_URL_MAINNET
		},
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		INFURA_KEY: process.env.INFURA_KEY,
		REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
		WEBSITE_URI: 'https://yfu.yearn.farm/',
		MINT_CONTRACT_ADDRESS: '0x0D4b8B5005611d48bc63ac5e90Bbd3b983177DdE#code'
	}
});

