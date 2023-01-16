import {ethers} from 'ethers';
import FormData from 'form-data';
import Redis from 'ioredis';
import YFU_ABI from 'utils/yfu.abi';
import {providers} from '@yearn-finance/web-lib/utils';

import type {NextApiRequest, NextApiResponse} from 'next';

const	redisAddressPerToken = new Redis(process.env.REDIS_URL_ADDRESS_PER_TOKEN as string);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function jsonToFormData(data: any): any {
	const formData = new FormData();
	for (const key in data ) {
		formData.append(key, data[key]);
	}
	return formData;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const {tokenID, walletAddress, signature} = JSON.parse(req.body.body);
	if (!tokenID || !walletAddress || !signature) {
		res.status(200).json('error: missing token, address or signature');
		return;
	}
	const signer = ethers.utils.verifyMessage('I own the edition #' + tokenID, signature || '');
	if (signer !== walletAddress) {
		res.status(200).json('error: invalid signature');
		return;
	}

	const	yfuContract = new ethers.Contract(
		process.env.MINT_CONTRACT_ADDRESS as string,
		YFU_ABI,
		providers.getProvider(1337) as ethers.providers.JsonRpcProvider
	);
	const	ownerOfTokenID = await yfuContract.ownerOf(tokenID);

	if (ownerOfTokenID !== walletAddress) {
		res.status(200).json('error: you are not the owner of this token');
		return;
	}

	if (await redisAddressPerToken.get(tokenID)) {
		res.status(200).json('error: token already claimed');
		return;
	}

	fetch(process.env.SCRIPT_SHIPPING_URL as string, {
		method: 'POST',
		body: jsonToFormData(JSON.parse(req.body.body))
	}).then(async (): Promise<void> => {
		await redisAddressPerToken.set(tokenID, walletAddress);
		res.status(200).json('success');
	}).catch((): void => {
		res.status(200).json('error: impossible to save info');
		return;
	});
}
