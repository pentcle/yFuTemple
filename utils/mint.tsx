import {ethers} from 'ethers';

export async function	mint(
	provider: ethers.providers.Web3Provider
): Promise<boolean> {
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();

	try {
		const	contract = new ethers.Contract(
			process.env.MINT_CONTRACT_ADDRESS as string,
			['function safeMint(address _input) external payable'],
			signer
		);
		const	transaction = await contract.safeMint(address, {value: '10000000000000'});
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 0) {
			console.error('Fail to perform transaction');
			return false;
		}

		return true;
	} catch(error) {
		console.error(error);
		return false;
	}
}
