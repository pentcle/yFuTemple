import	React					from	'react';
import	Image					from	'next/image';
import	Redis					from	'ioredis';
import	Title					from	'components/Title';
import	Footer					from	'components/Footer';

const	redis = new Redis(process.env.REDIS_URL);

function	Goddess({characterSrc, typoSrc, children}) {
	return (
		<div className={'grid grid-cols-1 border border-white divide-y divide-white md:grid-cols-3 md:divide-y-0'}>
			<div className={'flex relative flex-col col-span-1 justify-center items-center p-0 divide-y divide-white md:p-8 md:divide-y-0'}>
				<div className={'px-8 h-48 md:px-0 md:h-auto image-wrapper-full-height'}>
					<Image
						src={typoSrc}
						loading={'eager'}
						objectFit={'contain'}
						quality={90}
						width={497}
						height={497} />
				</div>
			</div>
			<div className={'block col-span-1 md:hidden image-wrapper'}>
				<Image
					src={characterSrc}
					objectFit={'cover'}
					loading={'eager'}
					width={600}
					height={895} />
			</div>
			<div className={'flex flex-col col-span-1 p-4 pb-8 w-full h-full border-0 border-white md:p-8 md:pb-14 md:border-x'}>
				<div className={'space-y-4 font-scope text-base text-white'}>
					{children}
				</div>
				<div className={'mx-auto mt-8 md:mt-auto'}>
					<button className={'font-peste bg-white button-glowing'}>
						{'SEE TRIBUTES'}
						<div className={'absolute -inset-0 rounded-full rotate-180 glow'} />
						<div className={'absolute -inset-0 rounded-full rotate-180 glow'} />
					</button>
				</div>
			</div>
			<div className={'hidden col-span-1 md:block image-wrapper'}>
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

function	Techne() {
	return (
		<Goddess characterSrc={'/character-techne.png'} typoSrc={'/typo-techne.png'}>
			<p>{'Techne is known as the shining one, her dress is a pure gradient of yellow and pink, as perfect as any fabric can contain.'}</p>

			<p>{'Below this dress, it is said, is another garment which is made to show the entire cosmos in fine detail, the celestial balance and complexity, of the patterned substances of the earth, all depicted in a subtle map that reveals its machinic nature in great fidelity.'}</p>

			<p>{'Few have been known to see this map, and to see it is to be in a close position to the goddess.'}</p>

			<p>{'Upon her head is a serpent coiled, and in her hand is something always new, for she does not bear symbols as much as the understanding of their ephemeral nature, experiencing extropy and entropy under the grace of her hands.'}</p>
		</Goddess>
	);
}

function	Dominion() {
	return (
		<Goddess characterSrc={'/character-dominion.png'} typoSrc={'/typo-dominion.png'}>
			<p>{'She holds a dark sword with green jewels in its hilt, which is known to be the essence of desire overcoming expansion.'}</p>

			<p>{'Her dress is of smoke and hidden fire, rendered as darkness instead of light. Her companion is the voidfish, which elaborates as a point along two axis, for her bi-linear symbol is the “ex.”'}</p>

			<p>{'She is able to assert that point into the labyrinth, which, it is said, she elaborates as the locus of observation.'}</p>

			<p>{'Below her cloak it is said is a strange dark armor, its true nature unknown, and visible only as it climbs her neck, bearing the symbol of the diamond: the sublime’s internal and futurist repose.'}</p>
		</Goddess>
	);
}

function	Transmission() {
	return (
		<Goddess characterSrc={'/character-transmission.png'} typoSrc={'/typo-transmission.png'}>
			<p>{'Transmission is known as the tawny one, and she wears a dress of earthen colors, streaked randomly in many directions resembling the dance of falling rain becoming droplets on stones.'}</p>
			<p>{'Hers is the symbol of the net, which is often depicted as energetic meshes and grids, and it is known that she catches all thoughts there and allows them to be retrieved.'}</p>
			<p>{'Her hands are known to be large and strong, and she is bestowed with the beautiful, translucent wings of the night wind, which carries its voice in her laughter.'}</p>
			<p>{'Hers is the ascending triangle pointing straight above, toward the apex stars, and uniting us to a mysterium of meaning.'}</p>
		</Goddess>
	);
}

function	Community() {
	return (
		<Goddess characterSrc={'/character-community.png'} typoSrc={'/typo-community.png'}>
			<p>{'Community is known as the tawny one, and she wears a dress of earthen colors, streaked randomly in many directions resembling the dance of falling rain becoming droplets on stones.'}</p>
			<p>{'Hers is the symbol of the net, which is often depicted as energetic meshes and grids, and it is known that she catches all thoughts there and allows them to be retrieved.'}</p>
			<p>{'Her hands are known to be large and strong, and she is bestowed with the beautiful, translucent wings of the night wind, which carries its voice in her laughter.'}</p>
			<p>{'Hers is the ascending triangle pointing straight above, toward the apex stars, and uniting us to a mysterium of meaning.'}</p>
		</Goddess>
	);
}

function	Tree() {
	return (
		<div className={'grid grid-cols-1 border border-white'}>
			<div className={'col-span-1 image-wrapper'}>
				<Image
					src={'/yearningTree.jpg'}
					loading={'eager'}
					width={2000}
					height={1000} />
			</div>
			<div className={'col-span-1 p-4 font-scope text-base text-left text-white md:p-6 md:text-center'}>
				<p>{'The YFI faction is guided by the four yFu, who interpret the knowledge of the Yearning Tree - an ancient being who hears the desires of creatures across the universe - and responds by growing yield-bearing seeds containing the answers to their wishes'}</p>
			</div>
		</div>
	);
}

function	Index({visitors}) {
	return (
		<>
			<main id={'app'} className={'relative mx-auto max-w-screen-xl'} style={{minHeight: '100vh'}}>
				<div>
					<div className={'flex justify-center items-center py-8'}>
						<Title />
					</div>
					<section className={'px-4 w-full md:px-0'}>
						<Techne />
						<div className={'flex justify-center items-center my-0'}>
							<Image src={'/divider-1.gif'} width={200} height={200} />
						</div>
						<Dominion />
						<div className={'flex justify-center items-center my-0'}>
							<Image src={'/divider-2.gif'} width={200} height={200} />
						</div>
						<Transmission />
						<div className={'flex justify-center items-center my-0'}>
							<Image src={'/divider-3.gif'} width={200} height={200} />
						</div>
						<Community />
						<div className={'flex justify-center items-center my-9'}>
							<Image src={'/divider-4.png'} width={112} height={112} />
						</div>
						<Tree />
					</section>
				</div>
			</main>
			<Footer visitors={visitors} />
		</>
	);
}

export default Index;

export async function getServerSideProps() {
	// const visitors = await redis.set('counter', 1435600);
	const visitors = await redis.incr('counter');
	return {props: {visitors}};
}