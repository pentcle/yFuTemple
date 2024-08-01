import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {Contract} from 'ethcall';
import {ethers} from 'ethers';
import YFU_ABI from 'utils/yfu.abi';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {useLocalStorage} from '@yearn-finance/web-lib/hooks/useLocalStorage';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
import {getProvider, newEthCallProvider} from '@yearn-finance/web-lib/utils/web3/providers';

import type {BigNumber} from 'ethers';
import type {Dispatch, ReactElement} from 'react';

export type	TMintContext = {
	balanceOf: number,
	totalSupply: number,
	maxSupply: number,
	price: bigint,
	ownedByUser: number[],
	shippingDone: number[],
	set_shippingDone: Dispatch<React.SetStateAction<number[]>>,
	refresh: () => Promise<void>,
}

const MintContext = createContext<TMintContext>({
	balanceOf: 0,
	totalSupply: 0,
	maxSupply: 0,
	price: 0n,
	ownedByUser: [],
	shippingDone: [],
	set_shippingDone: (): void => undefined,
	refresh: async (): Promise<void> => undefined
});
export const MintContextApp = ({children}: {children: ReactElement}): ReactElement => {
	const {provider, address, isActive} = useWeb3();
	const [balanceOf, set_balanceOf] = useState<number>(0);
	const [totalSupply, set_totalSupply] = useState<number>(0);
	const [ownedByUser, set_ownedByUser] = useState<number[]>([]);
	const [shippingDone, set_shippingDone] = useLocalStorage('shipping', []);

	const getBalanceOf = useCallback(async (): Promise<void> => {
		if (!isActive || !provider) {
			return;
		}

		const currentProvider = provider || getProvider(parseInt(process.env.CHAIN_ID ?? '0'));
		const ethcallProvider = await newEthCallProvider(currentProvider);
		ethcallProvider.multicall2 = {address: process.env.MULTICALL_ADDRESS ?? '0x0', block: 0};

		const userAddress = address;
		const yfuMintContract = new Contract(process.env.MINT_CONTRACT_ADDRESS as string, YFU_ABI);
		const [_balanceOf, _totalSupply] = await ethcallProvider.tryAll([
			yfuMintContract.balanceOf(userAddress),
			yfuMintContract.tokenCount()
		]) as [BigNumber, BigNumber];

		const ownerOfCalls = [];
		const balanceAsNumber = (_balanceOf || ethers.constants.Zero).toNumber();
		for (let index = 0; index < balanceAsNumber; index++) {
			ownerOfCalls.push(yfuMintContract.tokenOfOwnerByIndex(userAddress, index));
		}
		const _ownedByUser = await ethcallProvider.tryAll(ownerOfCalls) as BigNumber[];

		performBatchedUpdates((): void => {
			set_balanceOf((_balanceOf || ethers.constants.Zero).toNumber());
			set_totalSupply((_totalSupply || ethers.constants.Zero).toNumber());
			set_ownedByUser(_ownedByUser.map((tokenIDBig): number => Number(tokenIDBig)));
		});
	}, [provider, address, isActive]);

	useEffect((): void => {
		getBalanceOf();
	}, [getBalanceOf]);

	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<MintContext.Provider
			value={{
				balanceOf,
				totalSupply,
				ownedByUser,
				shippingDone: shippingDone as number[],
				set_shippingDone: set_shippingDone as Dispatch<React.SetStateAction<number[]>>,
				maxSupply: 3000,
				price: BigInt(process.env.MINT_PRICE_WEI ?? '0'),
				refresh: async (): Promise<void> => await getBalanceOf()
			}}>
			{children}
		</MintContext.Provider>
	);
};


export const useMint = (): TMintContext => useContext(MintContext);
export default useMint;
