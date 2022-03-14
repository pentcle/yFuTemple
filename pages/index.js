import	React					from	'react';
import	Image					from	'next/image';
import	Redis					from	'ioredis';
import	Title					from	'components/Title';
import	Footer					from	'components/Footer';
import	TributesWrapper			from	'components/TributesWrapper';

const	redis = new Redis(process.env.REDIS_URL);

function	Goddess({characterSrc, typoSrc, id, children}) {
	const	[openTribute, set_openTribute] = React.useState(false);

	return (
		<div className={'grid grid-cols-1 border-2 border-white divide-y divide-white md:grid-cols-3 md:divide-y-0'}>
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
			<div className={'flex flex-col col-span-1 p-4 pb-8 w-full h-full border-0 border-white md:p-8 md:pb-14 md:border-x-2'}>
				<div className={'space-y-4 font-scope text-base text-white'}>
					{children}
				</div>
				<div className={'mx-auto mt-8 md:mt-auto'}>
					<button
						onClick={() => set_openTribute(true)}
						className={'font-peste bg-white button-glowing'}>
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
			{id === 'Techne' ? (
				<TributesWrapper
					open={openTribute}
					set_open={set_openTribute}
					id={id}
					title={'Welcome to the\nHall of Techne'} />
			): null}
			{id === 'Dominion' ? (
				<TributesWrapper
					open={openTribute}
					set_open={set_openTribute}
					id={id}
					title={'Welcome to the\nHall of Dominion'} />
			): null}
			{id === 'Transmission' ? (
				<TributesWrapper
					open={openTribute}
					set_open={set_openTribute}
					id={id}
					title={'Welcome to the\nHall of Transmission'} />
			): null}
			{id === 'Community' ? (
				<TributesWrapper
					open={openTribute}
					set_open={set_openTribute}
					id={id}
					title={'Welcome to the\nHall of Community'} />
			): null}
		</div>
	);
}

function	Techne() {
	return (
		<Goddess id={'Techne'} characterSrc={'/character-techne.png'} typoSrc={'/typo-techne.png'}>
			<p>{'Techne is known as the shining one. She was born from the Yearning Tree to give us the ever-shifting machine and teach us how to use it, with grace and intuition.  Her essence is as if a map which she fully sees, for it is her power to sense the connections between static things which find their motion together. Machinic poems linger as she passes, each an immutable structure upon which the next can grow.'}</p>
		</Goddess>
	);
}

function	Dominion() {
	return (
		<Goddess id={'Dominion'} characterSrc={'/character-dominion.png'} typoSrc={'/typo-dominion.png'}>
			<p>{'Dominion’s sword wills a decisiveness of feeling toward action. Hers is the song of desire, by which she entrains with the outcomes of the many.  She was born of the Yearning Tree to give self knowledge and trust in the value of one’s voice.  She wears a cloak of smoke below which is a beating heart, which is known to be the essence of our inner constellations overcoming quantified expansion.'}</p>
		</Goddess>
	);
}

function	Transmission() {
	return (
		<Goddess id={'Transmission'} characterSrc={'/character-transmission.png'} typoSrc={'/typo-transmission.png'}>
			<p>{'Transmission heralds the alignment of distant beings though the power of a woven net which catches all thoughts and allows them to be retrieved.  She alone is able to distribute the Yearning tree’s seeds, and she is known as the patron of those who are able to speak far through the ether.  She is bestowed with the translucent wings of the night wind, which carries its voice in her laughter.'}</p>
		</Goddess>
	);
}

function	Community() {
	return (
		<Goddess id={'Community'} characterSrc={'/character-community.png'} typoSrc={'/typo-community.png'}>
			<p>{'Community’s thread binds souls together, below the Yearning tree’s canopy.  She has has command of divine forms which allow the disparate many to work together in harmony. Hers is the empathy of growing things, which arise in ecologies of individuals joined into higher minds.  She is known by the symbol of the circle, which encompasses the boundaries in which her threads can weave.'}</p>
		</Goddess>
	);
}

function	Tree() {
	return (
		<div className={'grid grid-cols-1 border-2 border-white'}>
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