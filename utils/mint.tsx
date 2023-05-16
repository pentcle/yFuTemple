import {ethers} from 'ethers';
import {handleTx} from '@yearn-finance/web-lib/utils/web3/transaction';

import type {TTxResponse} from '@yearn-finance/web-lib/utils/web3/transaction';

export async function	mint(
	provider: ethers.providers.Web3Provider
): Promise<TTxResponse> {
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();
	const	contract = new ethers.Contract(
		process.env.MINT_CONTRACT_ADDRESS as string,
		['function safeMint(address _input) external payable'],
		signer
	);
	return await handleTx(contract.safeMint(address, {value: '10000000000000'}));
}
