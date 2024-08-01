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
		REDIS_URL: process.env.REDIS_URL,
		SNAPSHOT: process.env.SNAPSHOT,
		WEBSITE_URI: process.env.WEBSITE_URI,
		CHAIN_ID: process.env.CHAIN_ID,
		MULTICALL_ADDRESS: process.env.MULTICALL_ADDRESS,
		MINT_CONTRACT_ADDRESS: process.env.MINT_CONTRACT_ADDRESS,
		MINT_URL: process.env.MINT_URL,
		MINT_PRICE_WEI: process.env.MINT_PRICE_WEI,
	}
});
