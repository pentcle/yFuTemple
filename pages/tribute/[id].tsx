import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import DraggableInfo from '../../components/DraggableInfo';
import TributeSlider from '../../components/TributeSlider';
import YFU_DATA from '../../utils/data';

import type {ReactElement} from 'react';

export default function Index(): ReactElement {
	const	router = useRouter();
	const	[hasInfo, set_hasInfo] = useState(false);
	const	[currentTemple, set_currentTemple] = useState(YFU_DATA.find((e): boolean => e.id === router?.query?.id));

	useEffect((): void => {
		console.log('murder');
	}, []);

	useEffect((): void => {
		if(router?.query?.id) {
			const	_currentTemple = YFU_DATA.find((e): boolean => e.id === router?.query?.id);
			set_currentTemple(_currentTemple);
		}
	}, [router.query]);

	return (
		<div className={'relative -mt-1 flex w-screen flex-col overflow-hidden p-0 md:p-6'}>
			<div className={'flex h-12 flex-row items-center justify-between border-b-2 border-b-white px-2 md:hidden'}>
				<Link href={'/'}>
					<div className={'flex cursor-pointer flex-row items-center'}>
						<p className={'mr-1 font-scope text-xl text-white'}>{'<'}</p>
						<p className={'mt-1 font-scope text-xl text-white'}>{'BACK'}</p>
					</div>
				</Link>
				<div className={'flex cursor-pointer flex-row items-center'}>
					<a
						href={'https://discord.com/invite/yearn'}
						target={'_blank'}
						rel={'noreferrer'}
						className={'font-scope text-xl text-white'}>
						{'SUBMIT'}
					</a>
				</div>
			</div>

			<div className={'absolute inset-x-4 top-4 hidden flex-row items-center justify-between md:flex'}>
				<Link href={'/'}>
					<div className={'cursor-pointer flex-row items-center md:flex'}>
						<p className={'mr-1 font-scope text-5xl text-white'}>{'<'}</p>
						<p className={'mt-3 font-scope text-2xl text-white'}>{'BACK'}</p>
					</div>
				</Link>
				<button
					onClick={(): void => {
						if (window) {
							window.open('https://discord.com/invite/yearn', '_blank');
						}
					}}
					className={'button-glowing-small bg-white font-scope text-black'}>
					{'SUBMIT'}
					<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
					<div className={'glow absolute -inset-0 rotate-180 rounded-full'} />
				</button>
			</div>
			<h3 className={'mx-auto mt-4 w-fit max-w-xl whitespace-pre-wrap break-words border-b-2 border-b-white px-3 pb-3 font-peste text-2xl font-medium uppercase text-white md:mt-0 md:px-0 md:text-5xl'}>
				{currentTemple?.tributeTitle}
			</h3>
			<div className={'mx-auto mt-2 h-full w-full md:mt-10'}>
				<TributeSlider
					medias={currentTemple?.medias || []}
					hasInfo={hasInfo}
					set_hasInfo={set_hasInfo as any} />
			</div>
			<DraggableInfo
				hasInfo={hasInfo}
				set_hasInfo={set_hasInfo} />
		</div>
	);
}
