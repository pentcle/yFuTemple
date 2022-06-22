import	React						from	'react';
import	Link						from	'next/link';
import	{useRouter}					from	'next/router';
import	TributeSlider				from	'components/TributeSlider';
import	DraggableInfo				from	'components/DraggableInfo';
import	{motion}					from	'framer-motion';
import	YFU_DATA					from	'utils/data';

const variants = {
	initial: {y: 100, scale: 0.9, opacity: 0},
	enter: {y: 0, scale: 1, opacity: 1, transition: {duration: 0.3, ease: 'easeIn'}},
	exit: {y: 100, scale: 0.9, opacity: 0, transition: {duration: 0.3, ease: 'easeIn'}}
};

export default function Index() {
	const	router = useRouter();
	const	[hasInfo, set_hasInfo] = React.useState(false);
	const	[currentTemple, set_currentTemple] = React.useState(YFU_DATA.find(e => e.id === router?.query?.id));

	React.useEffect(() => {
		if(router?.query?.id) {
			const	_currentTemple = YFU_DATA.find(e => e.id === router?.query?.id);
			set_currentTemple(_currentTemple);
		}
	}, [router.query]);

	return (
		<motion.div
			key={currentTemple?.id || router.asPath}
			initial={'initial'}
			animate={'enter'}
			exit={'exit'}
			className={'flex overflow-hidden relative flex-col p-0 -mt-1 w-screen border-t-0 border-t-white md:p-6 md:border-t-2'}
			variants={variants}>
			<div className={'flex flex-row justify-between items-center px-2 h-12 border-b-2 border-b-white md:hidden'}>
				<Link href={'/'}>
					<div className={'flex flex-row items-center cursor-pointer'}>
						<p className={'mr-1 font-scope text-xl text-white'}>{'<'}</p>
						<p className={'mt-1 font-scope text-xl text-white'}>{'BACK'}</p>
					</div>
				</Link>
				<div className={'flex flex-row items-center cursor-pointer'}>
					<a
						href={'https://discord.gg/UyNbrABFYA'}
						target={'_blank'}
						rel={'noreferrer'}
						className={'font-scope text-xl text-white'}>
						{'SUBMIT'}
					</a>
				</div>
			</div>

			<div className={'hidden absolute inset-x-4 top-4 flex-row justify-between items-center md:flex'}>
				<Link href={'/'}>
					<div className={'flex-row items-center cursor-pointer md:flex'}>
						<p className={'mr-1 font-scope text-5xl text-white'}>{'<'}</p>
						<p className={'mt-3 font-scope text-2xl text-white'}>{'BACK'}</p>
					</div>
				</Link>
				<button
					onClick={() => window.open('https://discord.gg/UyNbrABFYA', '_blank')}
					className={'font-scope bg-white button-glowing-small'}>
					{'SUBMIT'}
					<div className={'absolute -inset-0 rounded-full rotate-180 glow'} />
					<div className={'absolute -inset-0 rounded-full rotate-180 glow'} />
				</button>
			</div>
			<h3 className={'px-3 pb-3 mx-auto mt-4 w-fit max-w-xl font-peste text-2xl font-medium text-white uppercase whitespace-pre-wrap break-words border-b-2 border-b-white md:px-0 md:mt-0 md:text-5xl'}>
				{currentTemple?.tributeTitle}
			</h3>
			<div className={'mx-auto mt-2 w-full h-full md:mt-10'}>
				<TributeSlider
					medias={currentTemple?.medias || []}
					hasInfo={hasInfo}
					set_hasInfo={set_hasInfo} />
			</div>
			<DraggableInfo
				hasInfo={hasInfo}
				set_hasInfo={set_hasInfo} />
		</motion.div>
	);
}
