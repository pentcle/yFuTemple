import React from 'react';
import Link from 'next/link';
import Footer from 'components/Footer';
import {motion} from 'framer-motion';

import type {ReactElement} from 'react';

const variants = {
	initial: {y: 0, opacity: 1},
	enter: {y: 0, opacity: 1, transition: {duration: 0.2, ease: 'easeIn'}},
	exit: {y: 20, opacity: 0, transition: {duration: 0.2, ease: 'easeIn'}}
};

function FAQ(): ReactElement {
	return (
		<div className={'relative mb-10 flex flex-col border-2 border-white text-white'}>
			<div className={'border-b-2 border-white p-8'}>
				<h1 className={'whitespace-pre-wrap text-4xl font-bold text-white'}>
					{'Campaign Timeline'}
				</h1>
				<div className={'mt-10'}>
					<ul className={'list-inside list-disc space-y-2'}>
						<li className={'text-base text-white'}>
							{'NFT Minting Begins!'}
						</li>
						<li className={'text-base text-white'}>
							{'NFT Reveal'}
						</li>
						<li className={'text-base text-white'}>
							{'Snapshot of NFT holders is taken on November 11th 2024'}
						</li>
						<li className={'text-base text-white'}>
							{'Airdrop of shipping coupons within a day or two.'}
						</li>
						<li className={'text-base text-white'}>
							{'Shipping information entry period: open until December 11th.'}
						</li>
						<li className={'text-base text-white'}>
							{'Comics will ship! (expect 6-8 weeks for delivery)'}
						</li>
					</ul>
				</div>
				<h1 className={'mt-20 whitespace-pre-wrap text-4xl font-bold text-white'}>
					{'F.A.Q.'}
				</h1>
				<div className={'mt-10'}>
					<h2 className={'text-2xl font-bold text-white'}>
						{'What is yFu the comic?'}
					</h2>
					<ul className={'mt-4 max-w-2xl list-outside list-disc space-y-2 pl-4'}>
						<li className={'text-base text-white'}>
							{'yFu is a comic series in four books, each 24 pages, which tells the story of Yearn Finance\'s origination, DAO and philosophy, with an epic narrative set within the Pills universe.'}
						</li>
						<li className={'text-base text-white'}>
							{'The project and lore was conceived by the YFI Story team at Yearn (Zemm, Pillhead, BigBadaboom, Pentacle and Banteg).'}
						</li>
						<li className={'text-base text-white'}>
							{'yFu was written and produced by Devil\'s Due Studios: Story by Josh Blaylock, Art by Travis Hymel, Colors by Greg & Fake, Letters by Shawn DePasquale.'}
						</li>
						<li className={'text-base text-white'}>
							{'Additional development, design and technical support was provided by Major, Worms, Murderteeth, Pacific Design and yAcademy.'}
						</li>
					</ul>
				</div>

				<div className={'mt-10'}>
					<h2 className={'text-2xl font-bold text-white'}>
						{'What is this NFT all about?'}
					</h2>
					<ul className={'mt-4 max-w-2xl list-outside list-disc space-y-2 pl-4'}>
						<li className={'text-base text-white'}>
							{'yFu Comic NFTs are your ticket to receive physical copies of all four comics.'}
						</li>
						<li className={'text-base text-white'}>
							{'They are also commemorative and collectible digital artwork on the Ethereum blockchain.'}
						</li>
						<li className={'text-base text-white'}>
							{'There is a fixed supply of 888 NFTs, and each will be associated with a frame from the comics after reveal.'}
						</li>
						<li className={'text-base text-white'}>
							{'Artwork and metadata is stored on IPFS.'}
						</li>
					</ul>
				</div>

				<div className={'mt-10'}>
					<h2 className={'text-2xl font-bold text-white'}>
						{'How will this work, exactly?'}
					</h2>
					<ul className={'mt-4 max-w-2xl list-outside list-disc space-y-2 pl-4'}>
						<li className={'text-base text-white'}>
							{'Anyone can mint one or more yFu Comic NFTs.'}
						</li>
						<li className={'text-base text-white'}>
							{'At the snapshot date, all holders of yFu Comic NFTs will be airdropped a Shipping Coupon NFT, one for each NFT held.'}
						</li>
						<li className={'text-base text-white'}>
							{'For one month, these coupons will allow you to use the yFu Temple website to enter your address'}
						</li>
						<li className={'text-base text-white'}>
							{'Devil\'s Due Comics will use the address entered to send you a set of all four comics, for each coupon you use.'}
						</li>
					</ul>
				</div>

				<div className={'mt-10'}>
					<h2 className={'text-2xl font-bold text-white'}>
						{'Physical comics? Tell me more...'}
					</h2>
					<ul className={'mt-4 max-w-2xl list-outside list-disc space-y-2 pl-4'}>
						<li className={'text-base text-white'}>
							{'Comics are produced and shipped by the good people at Devil\'s Due Comics.  They will be sent from the U.S.A.'}
						</li>
						<li className={'text-base text-white'}>
							{'Domestic shipping in the U.S.A. will be via USPS.'}
						</li>
						<li className={'text-base text-white'}>
							{'International shipping will be via FedEx.'}
						</li>
						<li className={'text-base text-white'}>
							{'There is no additional charge for shipping, this has been covered in the mint cost.'}
						</li>
						<li className={'text-base text-white'}>
							{'Customs charges may be applied in some locations, and will be the responsibility of the recipient.'}
						</li>
						<li className={'text-base text-white'}>
							{'If you have any issues with shipping, please post in our '}
							<a
								href={'https://discord.com/invite/yearnfi'}
								target={'_blank'} 
								rel={'noreferrer'}>
								<span className={'underline hover:text-yearn-blue'}> {'Discord channel'}</span>
							</a>{', and we can support your questions.'}
						</li>
					</ul>
				</div>

				<div className={'mt-10'}>
					<h2 className={'text-2xl font-bold text-white'}>
						{'But I\'m anon. How am I going to get the comics?'}
					</h2>
					<ul className={'mt-4 max-w-2xl list-outside list-disc space-y-2 pl-4'}>
						<li className={'text-base text-white'}>
							{'Feel free to mint from a non-public wallet and / or use a P.O. box, a third party recipient, etc.'}
						</li>
						<li className={'text-base text-white'}>
							{'We will not retain shipping information, Yearn doesn\'t care where you live, but please use any op-sec you think is needed.'}
						</li>
					</ul>
				</div>

				<div className={'mt-10'}>
					<h2 className={'text-2xl font-bold text-white'}>
						{'How is the yFu Temple affiliated with Yearn?'}
					</h2>
					<ul className={'mt-4 max-w-2xl list-outside list-disc space-y-2 pl-4'}>
						<li className={'text-base text-white'}>
							{'The yFu Temple was created in the process of developing the lore and characters in the yFu comic.'}
						</li>
						<li className={'text-base text-white'}>
							{'It is managed by Yearn contributors currently. You can get involved by finding us in the'}
							<a
								href={'https://discord.com/invite/yearnfi'}
								target={'_blank'}
								rel={'noreferrer'}>
								<span className={'underline hover:text-yearn-blue'}> {'Yearn Discord'}</span>
							</a>
						</li>
					</ul>
				</div>
			</div>

		</div>
	);
}


function Wrapper(): ReactElement {
	return (
		<motion.div
			key={'faq'}
			initial={'initial'}
			animate={'enter'}
			exit={'exit'}
			className={'relative -mt-1 flex w-screen flex-col overflow-hidden p-0 md:p-6'}
			variants={variants}>
			<div className={'relative mx-auto w-full max-w-screen-xl'} style={{minHeight: '100vh'}}>
				<div>
					<Link href={'/'}>
						<p className={'cursor-pointer text-sm opacity-60 transition-opacity hover:opacity-100'}>
							{'Back to home'}
						</p>
					</Link>
					<section className={'mt-2 w-full px-4 md:px-0'}>
						<FAQ/>
					</section>
				</div>
			</div>
			<Footer/>
		</motion.div>
	);
}

export default Wrapper;
