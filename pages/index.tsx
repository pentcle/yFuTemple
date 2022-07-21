import	React, {ReactElement}					from	'react';
import	Image					from	'next/image';
import	{useRouter}				from	'next/router';
import	axios					from	'axios';
import	Redis					from	'ioredis';
import	Title					from	'../components/Title';
import	Footer					from	'../components/Footer';
import	{motion}				from	'framer-motion';
import	YFU_DATA, {TYFUData}	from	'../utils/data';

const variants = {
	initial: {y: 0, opacity: 1},
	enter: {y: 0, opacity: 1, transition: {duration: 0.2, ease: 'easeIn'}},
	exit: {y: 20, opacity: 0, transition: {duration: 0.2, ease: 'easeIn'}}
};

const	redis = new Redis(process.env.REDIS_URL as string);

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
						className={'button-glowing bg-beige font-peste'}>
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

function	Index({visitors=[]}): ReactElement {
	const	[visitorsUpdated, set_visitorsUpdated] = React.useState(visitors);
	const	allData = YFU_DATA;

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

export async function getStaticProps(): Promise<unknown> {
	const visitors = await redis.incr('counter');
	return {props: {visitors}};
}