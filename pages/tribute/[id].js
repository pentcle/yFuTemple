import	React, {Fragment}			from	'react';
import	{useRouter}					from	'next/router';
import	{Transition}				from	'@headlessui/react';
import	TributeSlider				from	'components/TributeSlider';
import	DraggableInfo				from	'components/DraggableInfo';
import	YFU_DATA					from	'utils/data';

export default function Index() {
	const	router = useRouter();
	const	[shouldShow, set_shouldShow] = React.useState(true);
	const	[hasInfo, set_hasInfo] = React.useState(false);
	const	[currentTemple, set_currentTemple] = React.useState(YFU_DATA.find(e => e.id === router?.query?.id));

	React.useEffect(() => {
		const	_currentTemple = YFU_DATA.find(e => e.id === router?.query?.id);
		set_currentTemple(_currentTemple);
	}, [router.query]);

	return (
		<Transition appear show={shouldShow} as={Fragment}>
			<div className={'text-center'}>
				<Transition.Child
					as={Fragment}
					enter={'ease-out duration-300'}
					enterFrom={'opacity-0 scale-95'}
					enterTo={'opacity-100 scale-100'}
					leave={'ease-in duration-200'}
					leaveFrom={'opacity-100 scale-100'}
					leaveTo={'opacity-0 scale-95'}>
					<div
						className={'flex overflow-hidden relative flex-col p-0 -mt-1 w-screen border-t-0 border-t-white transition-all md:p-6 md:border-t-2'}>
						<div className={'flex flex-row justify-between items-center px-2 h-12 border-b-2 border-b-white md:hidden'}>
							<div
								onClick={() => {
									set_shouldShow(false);
									setTimeout(() => router.back(), 150);
								}}
								className={'flex flex-row items-center cursor-pointer'}>
								<p className={'mr-1 font-scope text-xl text-white'}>{'<'}</p>
								<p className={'mt-1 font-scope text-xl text-white'}>{'BACK'}</p>
							</div>
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
							<div
								onClick={() => {
									set_shouldShow(false);
									setTimeout(() => router.back(), 150);
								}}
								className={'flex-row items-center cursor-pointer md:flex'}>
								<p className={'mr-1 font-scope text-5xl text-white'}>{'<'}</p>
								<p className={'mt-3 font-scope text-2xl text-white'}>{'BACK'}</p>
							</div>
							<button
								onClick={() => console.log('nop')}
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
					</div>
				</Transition.Child>
			</div>
		</Transition>
	);
}
