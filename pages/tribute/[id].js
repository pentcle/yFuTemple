import	React, {Fragment}		from	'react';
import	{useRouter}				from	'next/router';
import	{Dialog, Transition}	from	'@headlessui/react';
import	{getPostsByID}			from	'lib/api';
import	TributeSlider			from	'components/TributeSlider';
import	DraggableInfo			from	'components/DraggableInfo';

export default function Index({medias}) {
	const [hasInfo, set_hasInfo] = React.useState(false);
	const router = useRouter();

	return (
		<Transition appear show={true} as={Fragment}>
			<Dialog
				as={'div'}
				className={'fixed inset-0 z-10'}
				onClose={() => router.back()}>
				<div className={' text-center'}>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 scale-30'}
						enterTo={'opacity-100 scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 scale-100'}
						leaveTo={'opacity-0 scale-30'}>
						<Dialog.Overlay className={'fixed inset-0 top-16'}>
							<video playsInline autoPlay muted loop poster={'/bg.jpg'} className={'object-cover w-full h-full'}>
								<source src={'/bglow.webm'} type={'video/webm'} />
							</video>
						</Dialog.Overlay>
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 scale-95'}
						enterTo={'opacity-100 scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 scale-100'}
						leaveTo={'opacity-0 scale-95'}>
						<div
							className={'flex overflow-hidden relative flex-col p-0 mt-24 w-screen border-t-0 border-t-white transition-all md:p-6 md:mt-[62px] md:border-t-2'}>
							<div className={'flex flex-row justify-between items-center px-2 h-12 border-b-2 border-b-white md:hidden'}>
								<div
									onClick={() => router.back()}
									className={'flex flex-row items-center cursor-pointer'}>
									<p className={'mr-1 font-scope text-xl text-white'}>{'<'}</p>
									<p className={'mt-1 font-scope text-xl text-white'}>{'BACK'}</p>
								</div>
								<div
									onClick={() => router.back()}
									className={'flex flex-row items-center cursor-pointer'}>
									<p className={'font-scope text-xl text-white'}>{'SUBMIT'}</p>
								</div>
							</div>

							<div className={'hidden absolute inset-x-4 top-4 flex-row justify-between items-center md:flex'}>
								<div
									onClick={() => router.back()}
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
							<Dialog.Title as={'h3'} className={'px-3 pb-3 mx-auto mt-4 w-fit max-w-xl font-peste text-2xl font-medium text-white uppercase whitespace-pre-wrap break-words border-b-2 border-b-white md:px-0 md:mt-0 md:text-5xl'}>
								{medias.tributeTitle}
							</Dialog.Title>
							<div className={'mx-auto mt-2 w-full h-full md:mt-10'}>
								<TributeSlider
									medias={medias.mediasCollection.items}
									hasInfo={hasInfo}
									set_hasInfo={set_hasInfo} />
							</div>
							<DraggableInfo
								hasInfo={hasInfo}
								set_hasInfo={set_hasInfo} />
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}


export async function getServerSideProps(req) {
	const medias = (await getPostsByID(req.query.id)) ?? [];
	return {props: {medias: medias[0]}};
}
