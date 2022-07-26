import	React, {ReactElement}	from	'react';
import	Image					from	'next/image';
import	{useRouter}				from	'next/router';
import	axios					from	'axios';
// import	Redis					from	'ioredis';
import	Title					from	'../components/Title';
import	Footer					from	'../components/Footer';
import	{motion}				from	'framer-motion';
import	YFU_DATA, {TYFUData}	from	'../utils/data';
import {useWeb3} 				from 	'@yearn-finance/web-lib/contexts';
import useSwr	 				from 	'swr';
import {useAccount} 			from 	'@yearn-finance/web-lib/hooks';
// import {truncateHex} 			from 	'@yearn-finance/web-lib/utils';

const variants = {
	initial: {y: 0, opacity: 1},
	enter: {y: 0, opacity: 1, transition: {duration: 0.2, ease: 'easeIn'}},
	exit: {y: 20, opacity: 0, transition: {duration: 0.2, ease: 'easeIn'}}
};

// const	redis = new Redis(process.env.REDIS_URL as string);

function	Goddess({characterSrc='', typoSrc='', id='', title='', children=<div />}): ReactElement {
	const	router = useRouter();

	return (
		<div className={'grid grid-cols-1 divide-y divide-white border-2 border-white md:grid-cols-3 md:divide-y-0'}>
			<div className={'relative col-span-1 flex flex-col items-center justify-center divide-y divide-white p-0 md:divide-y-0 md:p-8'}>
				<div className={'image-wrapper-full-height h-48 px-8 md:h-auto md:px-0'}>
					<Image
						src={typoSrc}
						loading={'eager'}
						objectFit={'contain'}
						quality={90}
						width={497}
						height={497} />
				</div>
			</div>
			<div className={'image-wrapper col-span-1 block md:hidden'}>
				<Image
					src={characterSrc}
					objectFit={'cover'}
					loading={'eager'}
					width={600}
					height={895} />
			</div>
			<div className={'col-span-1 flex h-full w-full flex-col border-0 border-white p-4 pb-8 md:border-x-2 md:p-8 md:pb-14'}>
				<div className={'space-y-4 font-scope text-base text-white md:text-lg'}>
					<h4 className={'mb-6 text-2xl font-bold md:text-4xl'}>{title}</h4>
					{children}
				</div>
				<div className={'mx-auto mt-8 md:mt-auto'}>
					<button
						onClick={(): void => {
							router.push(`/tribute/${id}`);
						}}
						className={'button-glowing bg-white font-peste'}>
						{'SEE TRIBUTES'}
						<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
						<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
					</button>
				</div>
			</div>
			<div className={'image-wrapper col-span-1 hidden md:flex'}>
				<Image
					src={characterSrc}
					objectFit={'cover'}
					loading={'eager'}
					width={600}
					height={895} />
			</div>
		</div>
	);
}

function	Tree(): ReactElement {
	return (
		<div className={'grid grid-cols-1 border-2 border-white'}>
			<div className={'image-wrapper col-span-1'}>
				<Image
					src={'/yearningTree.jpg'}
					loading={'eager'}
					width={2000}
					height={1000} />
			</div>
			<div className={'col-span-1 p-4 text-left font-scope text-base text-white md:p-6 md:text-center'}>
				<p>{'The YFI faction is guided by the four yFu, who interpret the knowledge of the Yearning Tree - an ancient being who hears the desires of creatures across the universe - and responds by growing yield-bearing seeds containing the answers to their wishes'}</p>
			</div>
		</div>
	);
}

const buildRequest = (address: string): string => `query {
	campaign(id: "GCxHoUUft6") {
		numberID # campaign number ID
		name # campaign name
		description # campaign description
		thumbnail # campaign cover image
		numNFTMinted # how many NFTs have been minted for this campaign
		startTime # campaign start time in unix time
		endTime # campaign end time in unix time, if null means no end time
		gasType # campaign in gas or gasless mode, please refer to api item 2 for explanation

		# Credential object is to determine whether an address is eligible to claim the NFT,
		# it will be created by BD team along with campaign setup.
		# in most case, a campaign only has one credential object enabled, 
		# so if user is eligible for that credential, 
		# he/she will be eligible to claim campaign's NFT.
		creds {
		# credential id
		id
		# credential name
		name 
		# input is user's address, and output shows whether the address is eligible for this credential
		# you can use this to check if user can claim or not in first place
		eligible(address: "${address}") 
		}

		# formula is a combination of credential and entry, the output of formual decide how many NFTs a user can claim
		formula

		gamification {
		# the object that stores NFT metadata
		nfts {
			probability # probability numerator of getting this NFT
			nft {
			name # NFT name
			image # NFT image URL
			ipfsImage # NFT image IPFS URL
			nftCore{
				contractAddress # NFT contract(NFT core) address
				spaceStationAddress # Mint NFT(space station) contract address
			}
			}
		}
		}
	}
}`;

function	Index({visitors=[]}): ReactElement {
	const	[visitorsUpdated, set_visitorsUpdated] = React.useState(visitors);
	const	allData = YFU_DATA;
	const {openLoginModal, onDesactivate, onSwitchChain} = useWeb3();
	const {isConnected, address, ens} = useAccount();
	const [walletIdentity, set_walletIdentity] = React.useState('Connect Wallet');

	const data = useSwr(address ? [
		'https://graphigo.stg.galaxy.eco',
		buildRequest(address)
	] : null);
	console.log(data);
	
	React.useEffect((): void => {
		if (!isConnected && address) {
			set_walletIdentity('Invalid chain');
		} else if (address) {
			set_walletIdentity('Mint NFT');
		} else {
			set_walletIdentity('Connect Wallet');
		}
	}, [ens, address, isConnected]);

	React.useEffect((): void => {
		axios.get('/api/visitors').then((v): void => set_visitorsUpdated(v.data));
	}, []);

	return (
		<motion.div
			key={'home'}
			initial={'initial'}
			animate={'enter'}
			exit={'exit'}
			className={'relative -mt-1 flex w-screen flex-col overflow-hidden border-t-0 border-t-white p-0 md:border-t-2 md:p-6'}
			variants={variants}>
			<main id={'app'} className={'relative mx-auto max-w-screen-xl'} style={{minHeight: '100vh'}}>
				<div>
					<div className={'flex items-center justify-center py-8'}>
						<Title />
					</div>
					<section className={'w-full px-4 md:px-0'}>
						<div className={'mb-48 flex flex-col items-center border-2 border-white p-8 text-white'}>
							<h4 className={'mb-6 text-2xl font-bold md:text-4xl'}>
								{'YFU - The Comic, episode 1\r'}
							</h4>
							<div className={'grid w-full grid-cols-12 gap-16'}>
								<div className={'col-span-4 flex flex-col px-6'}>
									<Image
										src={'/assetsThumbnail/comic1-main.jpg'}
										objectFit={'contain'}
										loading={'eager'}
										width={595}
										height={842} />
								</div>
								<div className={'col-span-8 flex w-full flex-col justify-center'}>
									<p className={'text-xl'}>
										{'Connect your wallet to mint a YFU Comic NFT\r'}
									</p>
									<div className={'flex flex-row items-center space-x-6 py-8'}>
										<button
											className={'button-glowing my-4 bg-white font-peste text-black'}
											onClick={(): void => {
												if (isConnected) {
													onDesactivate();
												} else if (!isConnected && address) {
													onSwitchChain(1, true);
												} else {
													openLoginModal();
												}
											}}>
											<p>{walletIdentity}</p>
											<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
											<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
										</button>
										<div>
											{isConnected ? (
												<p className={'text-lg'}>
													{'0.1 ETH'}
												</p>
											) : null}
											<p className={'text-lg'}>
												{'999 of 1000 NFTs Minted So Far'}
											</p>
										</div>
									</div>
									<p className={'text-xl'}>
										{'Each NFT holder will be eligible to receive a copy of the limited edition comic\r'}
									</p>
									<p className={'text-xl'}>
										{'By leveling up your NFT, via Yearn product usage, you will be able to claim free 1/1 art NFTs, upgrade special edition comics, etc\r'}
									</p>
								</div>
							</div>
						</div>
						{allData
							.sort((a: TYFUData, b: TYFUData): number => a.order - b.order)
							.map((goddess: TYFUData, index: number): ReactElement => (
								<div key={goddess.id}>
									<Goddess
										id={goddess.id}
										title={goddess.title}
										characterSrc={goddess.mainIllustration}
										typoSrc={goddess.watermark}>
										<p>{goddess.description}</p>
									</Goddess>
									<div className={`my-0 flex items-center justify-center ${index + 1 === allData.length ? 'hidden' : ''}`}>
										<Image src={`/divider-${index + 1}.gif`} width={200} height={200} />
									</div>
								</div>
							))}
						<div className={'my-9 flex items-center justify-center'}>
							<Image src={'/yfiTree2.png'} width={112} height={112} />
						</div>
						<Tree />
					</section>
				</div>
			</main>
			<Footer visitors={visitorsUpdated} />
		</motion.div>
	);
}

export default Index;

// export async function getStaticProps(): Promise<unknown> {
// 	const visitors = await redis.incr('counter');
// 	return {props: {visitors}};
// }