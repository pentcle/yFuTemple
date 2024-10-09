import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useMint} from 'contexts/useMint';
import {formatEther} from 'ethers/lib/utils';
import Redis from 'ioredis';
import axios from 'axios';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';

import Footer from '../components/Footer';
import SnapshotCountdown from '../components/SnapshotCountdown';
import Title from '../components/Title';
import YFU_DATA from '../utils/data';

import type {ReactElement} from 'react';
import type {TYFUData} from '../utils/data';

const	redis = new Redis(process.env.REDIS_URL as string);

function	Goddess({characterSrc='', typoSrc='', id='', title='', children=<div />}): ReactElement {
	const	router = useRouter();

	return (
		<div className={'grid grid-cols-1 divide-y divide-white border-2 border-white md:grid-cols-3 md:divide-y-0'}>
			<div className={'relative col-span-1 flex flex-col items-center justify-center divide-y divide-white p-0 md:divide-y-0 md:p-8'}>
				<div className={'image-wrapper-full-height h-32 md:h-auto'}>
					<Image
						alt={''}
						src={typoSrc}
						loading={'eager'}
						quality={90}
						className={'aspect-square w-32 object-contain p-2 md:w-full'}
						width={497}
						height={497} />
				</div>
			</div>
			<div className={'image-wrapper col-span-1 block md:hidden'}>
				<Image
					alt={''}
					src={characterSrc}
					className={'w-full object-cover'}
					loading={'eager'}
					width={600}
					height={895} />
			</div>
			<div className={'col-span-1 flex h-full w-full flex-col border-0 border-white p-4 pb-8 md:border-x-2 md:p-8 md:pb-14'}>
				<div className={'space-y-4 font-scope text-base text-white md:text-lg'} style={{whiteSpace: 'break-spaces'}}>
					<h4 className={'mb-6 text-2xl font-bold md:text-4xl'}>{title}</h4>
					{children}
				</div>
				<div className={'mx-auto mt-8 pt-8 md:mt-auto'}>
					<button
						onClick={(): void => {
							router.push(`/tribute/${id}`);
						}}
						className={'button-glowing bg-white font-peste text-black'}>
						{'SEE TRIBUTES'}
						<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
						<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
					</button>
				</div>
			</div>
			<div className={'image-wrapper col-span-1 hidden md:flex'}>
				<Image
					alt={''}
					src={characterSrc}
					className={'w-full object-cover'}
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
					alt={''}
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

function	MintView(): ReactElement {
	const {isActive, address, openLoginModal, onDesactivate, onSwitchChain} = useWeb3();
	const {price, balanceOf, totalSupply, maxSupply, shippingDone} = useMint();

	function connectWallet(): void {
		if (isActive) {
			onDesactivate();
		} else if (!isActive && address) {
			onSwitchChain(1, true);
		} else {
			openLoginModal();
		}
	}

	return (
		<div className={'mb-48 flex flex-col items-center border-2 border-white p-4 text-white md:p-8'}>
			<h4 className={'mx-auto mb-0 hidden w-3/4 text-center text-2xl font-bold md:mb-6 md:flex md:w-full md:text-left md:text-4xl'}>
				{'yFu - The Comic, Episodes 1 to 4'}
			</h4>
			<div className={'mb-4 grid w-full grid-cols-12 gap-2 md:my-10 md:gap-10'}>
				<div className={'col-span-12 mb-4 flex flex-col px-0 md:col-span-4 md:mb-0'}>
					<video
						playsInline
						autoPlay
						muted
						loop
						poster={'/artwork.png'}
						className={'hfull wfull objectcover md:aspectauto md:objectcontain'}>
						<source src={'/artwork.mp4'} type={'video/mp4'} />
					</video>
				</div>
				<div className={'col-span-12 flex w-full flex-col md:col-span-8'}>
					<h4 className={'text-2xl font-bold'}>
						{'Mint the NFT'}
					</h4>
					<button
						onClick={(): void => {
							window.open(process.env.MINT_URL ?? '/', '_blank', 'noopener,noreferrer');
						}}
						className={'button-glowing my-4 bg-white text-black'}>
						{'Mint on Zora'}
						<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
						<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
					</button>
					<br />

					<h4 className={'text-2xl font-bold'}>
						{'Get the physical comics'}
					</h4>
					{isActive ? <div /> : (
						<button
							disabled={true}
							onClick={connectWallet}
							className={'button-glowing my-4 bg-white text-black'}>
							{'Connect your wallet'}
							<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
							<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
						</button>
					)}

					<div className={'flex flex-col'}>
						<div className={`mb-8 flex flex-col items-center space-x-0 md:flex-row md:space-x-6 ${!isActive ? 'pointer-events-none' : ''}`}>
							<Link href={balanceOf < 1 ? '' : '/shipping'} className={`w-full ${balanceOf < 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
								<button
									disabled={balanceOf < 1}
									className={'w-full button-glowing bg-white font-peste text-black md:my-4'}>
									<p>{'Fill Shipping Information'}</p>
									<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
									<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
								</button>
							</Link>
						</div>
						<div>
							<h4 className={'mb-6 flex text-2xl font-bold md:hidden md:text-4xl'}>
								{'yFu - The Comic, Episodes 1 to 4'}
							</h4>
							<p className={'hidden mb-4 font-scope text-base text-white md:text-lg'}>
								{`${formatEther(price)} ETH - ${totalSupply} of ${maxSupply} NFTs Minted So Far`}
							</p>
							<p className={'mb-4 font-scope text-base text-white md:text-lg'}>
								{'Each NFT holder is eligible to receive a physical set of all four limited first edition comics, at no additional cost. Mint, hodl to the snapshot, and receive a redeemable coupon to enter shipping information. Then, prepare to own your piece of Yearn & DeFi history.'}
							</p>
							<p className={'mb-4 font-scope text-base text-white md:text-lg'}>
								{'As a bonus, upon revealing your NFT you will have a collectible, generative digital artwork, based on unique frames from the comics.'}
							</p>
							<Link href={'/faq'}>
								<p className={'mb-4 font-scope text-base text-white underline md:text-xl'}>
									{'See FAQ for all the details.'}
								</p>
							</Link>
						</div>
						<SnapshotCountdown className={'mb-8'} />
						<div className={'mt-auto flex flex-row space-x-4 border-2 border-white p-6'}>
							<div className={'pt-1'}>
								<div className={'h-4 w-4 animate-pulse rounded-full bg-green-500'} />
							</div>
							<div>
								<p>{`You have minted ${balanceOf} yFu Comic NFT${balanceOf > 1 ? 's' : ''}`}</p>
								<p>{`You entered shipping for ${shippingDone.length} yFu Comic NFT${balanceOf > 1 ? 's' : ''}`}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function	Index({visitors=[]}): ReactElement {
	const [visitorsUpdated, set_visitorsUpdated] = useState(visitors);
	const allData = YFU_DATA;

	useEffect((): void => {
		axios.get('/api/visitors').then((v): void => set_visitorsUpdated(v.data));
	}, []);

	return (
		<div className={'relative -mt-1 flex w-screen flex-col overflow-hidden p-0 md:p-6'}>
			<main
				id={'app'}
				className={'relative mx-auto w-full max-w-screen-xl'}
				style={{minHeight: '100vh'}}>
				<div>
					<div className={'flex items-center justify-center py-8'}>
						<Title />
					</div>
					<section className={'w-full px-4 md:px-0'}>
						<MintView />
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
										<Image
											alt={''}
											src={`/divider-${index + 1}.gif`}
											width={200}
											height={200} />
									</div>
								</div>
							))}
						<div className={'my-9 flex items-center justify-center'}>
							<Image
								alt={''}
								src={'/yfiTree2.png'}
								width={112}
								height={112} />
						</div>
						<Tree />
					</section>
				</div>
			</main>
			<Footer visitors={visitorsUpdated} />
		</div>
	);
}

export default Index;

export async function getStaticProps(): Promise<unknown> {
	const visitors = await redis.incr('counter');
	return {props: {visitors}};
}
