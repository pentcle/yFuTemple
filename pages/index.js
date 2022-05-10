import	React					from	'react';
import	Image					from	'next/image';
import	{useRouter}				from	'next/router';
import	axios					from	'axios';
import	Redis					from	'ioredis';
import	Title					from	'components/Title';
import	Footer					from	'components/Footer';
import	{getAllPostsForHome}	from	'lib/api';

const	redis = new Redis(process.env.REDIS_URL);

function	Goddess({characterSrc, typoSrc, id, title, children}) {
	const	router = useRouter();

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
				<div className={'space-y-4 font-scope text-base text-white md:text-lg'}>
					<h4 className={'mb-6 text-2xl font-bold md:text-4xl'}>{title}</h4>
					{children}
				</div>
				<div className={'mx-auto mt-8 md:mt-auto'}>
					<button
						onClick={() => router.push(`/tribute/${id}`)}
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
		</div>
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

function	Index({visitors, allGoddess}) {
	const	[visitorsUpdated, set_visitorsUpdated] = React.useState(visitors);

	React.useEffect(() => {
		axios.get('/api/visitors').then(v => set_visitorsUpdated(v.data));
	}, []);

	return (
		<>
			<main id={'app'} className={'relative mx-auto max-w-screen-xl'} style={{minHeight: '100vh'}}>
				<div>
					<div className={'flex justify-center items-center py-8'}>
						<Title />
					</div>
					<section className={'px-4 w-full md:px-0'}>
						{allGoddess.sort((a, b) => a.order - b.order).map((goddess, index) => (
							<div key={goddess.id}>
								<Goddess
									id={goddess.id}
									title={goddess.title}
									characterSrc={goddess.mainIllustration.url}
									typoSrc={goddess.watermark.url}>
									<p>{goddess.description}</p>
								</Goddess>
								<div className={`flex justify-center items-center my-0 ${index + 1 === allGoddess.length ? 'hidden' : ''}`}>
									<Image src={`/divider-${index + 1}.gif`} width={200} height={200} />
								</div>
							</div>
						))}
						<div className={'flex justify-center items-center my-9'}>
							<Image src={'/yfiTree2.png'} width={112} height={112} />
						</div>
						<Tree />
					</section>
				</div>
			</main>
			<Footer visitors={visitorsUpdated} />
		</>
	);
}

export default Index;

export async function getStaticProps() {
	const visitors = await redis.incr('counter');
	const allGoddess = await getAllPostsForHome();
	return {props: {visitors, allGoddess}};
}