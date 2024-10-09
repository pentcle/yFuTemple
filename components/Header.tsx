import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';

import {useAudio} from '../contexts/useAudio';
import DraggablePlayer from './DraggablePlayer';
import IconExpand from './icons/IconExpand';
import IconPause from './icons/IconPause';
import IconPlay from './icons/IconPlay';
import IconPrev from './icons/IconPrev';

import type {ReactElement} from 'react';

function	Header(): ReactElement {
	const	readInterval = useRef<NodeJS.Timer>();
	const	{AUDIO_LIST, audio, isPlaying, set_isPlaying} = useAudio();
	const	[hasModal, set_hasModal] = useState(false);
	const	[hasMediaPlayer, set_hasMediaPlayer] = useState(false);
	const	[selected, set_selected] = useState(0);
	const	[, set_nonce] = useState(0);

	useEffect((): () => void => {
		readInterval.current = setInterval((): void => {
			set_nonce((n: number): number => n + 1);
		}, 300);
		return (): void => clearInterval(readInterval.current);
	}, []);

	function renderTimer(): string {
		const	remaining = (audio?.duration || 0) - (audio?.currentTime || 0);
		const	minutes = Math.floor(remaining / 60);
		let		seconds = String(Math.floor(remaining % 60));
		if (Number(seconds) < 10) {
			seconds = `0${seconds}`;
		}
		return (`${minutes}:${seconds}`);
	}

	return (
		<>
			<header className={'fixed top-0 z-20 grid h-24 w-full grid-cols-2 flex-col items-center md:flex md:h-16 md:flex-row'}>
				<div className={'relative col-span-1 flex h-12 w-full items-center border-b-2 border-white bg-black md:h-full md:w-68 md:min-w-68'}>
					<div
						className={'flex w-full cursor-pointer items-center justify-between px-4'}
						onClick={(): void => set_hasModal(!hasModal)}>
						<p className={'select-none font-scope text-xl text-white md:text-2xl'}>{'INFO'}</p>
					</div>
					<div className={`absolute top-full left-0 z-50 w-250% border-0 border-b-2 border-white bg-black p-4 md:w-full md:border-2 ${hasModal ? '' : 'pointer-events-none opacity-0'}`}>
						<div
							className={'-m-1 flex w-full cursor-pointer select-none justify-end p-1 font-scope text-lg text-white'}
							onClick={(): void => set_hasModal(!hasModal)}>
							{'X'}
						</div>
						<div className={'flex w-full select-none justify-center'}>
							<Image
								alt={''}
								src={'/yfiTree.png'}
								width={150}
								height={186} />
						</div>
						<div className={'mt-4 font-scope tracking-widest text-yblue'}>
							<span className={'mb-1 flex w-full flex-row'}>
								<p>{'Find us:'}</p>
								<a
									href={'https://yearn.finance'}
									target={'_blank'}
									rel={'noreferrer'}
									className={'ml-1 pl-28 hover:underline'}>{'YEARN'}
								</a>
							</span>
							<span className={'mb-1'}>
								<a
									href={'https://twitter.com/yearnfi'}
									target={'_blank'}
									rel={'noreferrer'}
									className={'hover:underline'}>{'Twitter'}
								</a>
								{' / '}
								<a
									href={'http://blog.yearn.finance/'}
									target={'_blank'}
									rel={'noreferrer'}
									className={'hover:underline'}>{'Medium'}
								</a>
								{' / '}
								<a
									href={'https://discord.com/invite/yearn'}
									target={'_blank'}
									rel={'noreferrer'}
									className={'hover:underline'}>{'Discord'}
								</a>
							</span>
							<span className={'mt-1 flex w-full flex-row justify-between font-bluepill'}>
								<a
									href={'https://yfistory.org/'}
									target={'_blank'}
									rel={'noreferrer'}
									className={'text-xl tracking-normal hover:underline'}>{'The Blue Pill'}
								</a>
							</span>
						</div>

					</div>
				</div>
				<div className={'relative col-span-1 flex h-12 min-w-0 border-b-2 border-l-2 border-white bg-black md:h-16 md:w-[300px] md:min-w-[300px]'}>
					<div className={'flex w-max cursor-pointer items-center justify-between px-2 md:px-4'}>
						<div className={'flex flex-row items-center justify-center font-scope'}>
							<IconPrev
								onClick={(): void => {
									audio.currentTime = 0;
								}}
								className={'h-3 w-3 cursor-pointer text-white md:h-4 md:w-4'} />
							{isPlaying ? (
								<IconPause
									onClick={(): void => {
										set_isPlaying(false);
										audio.pause();
									}}
									className={'mx-0.5 h-3 w-3 cursor-pointer text-white md:mx-1 md:h-4 md:w-4'}/>
							) : (
								<IconPlay
									onClick={(): void => {
										set_isPlaying(true);
										audio.play();
									}}
									className={'mx-0.5 h-3 w-3 cursor-pointer text-white md:mx-1 md:h-4 md:w-4'}/>
							)}
							<IconPrev
								onClick={(): void => set_selected(selected === 4 ? 0 : selected + 1)}
								className={'h-3 w-3 rotate-180 cursor-pointer text-white md:h-4 md:w-4'}/>
						</div>
						<div className={'mx-2 mb-0.5 flex font-scope text-xs text-white md:mx-3 md:text-base'}>{AUDIO_LIST[selected][0]}</div>
						<div className={'mr-0 mb-0.5 font-scope text-xs tabular-nums text-white md:mr-3 md:text-base'}>
							{renderTimer()}
						</div>
						<IconExpand
							className={'text-white'}
							onClick={(): void => set_hasMediaPlayer(!hasMediaPlayer)} />
					</div>
				</div>
				<div className={'relative col-span-2 flex h-12 w-250% select-none items-center overflow-x-hidden border-b-2 border-white bg-[#181D20] font-scope text-white md:h-16 md:w-full'}>
					<div className={'animate-marquee whitespace-nowrap'}>
						<span className={'mx-4 text-xl md:text-2xl'}>{'THE TEMPLE IS A SACRED PLACE, DESIGNED SO THE ACOLYTES THAT REPRESENT YFI MAY COMMUNE AND WORSHIP'}</span>
					</div>
					<div className={'absolute top-0 flex h-full animate-marquee2 items-center whitespace-nowrap'}>
						<span className={'mx-4 text-xl md:text-2xl'}>{'THE TEMPLE IS A SACRED PLACE, DESIGNED SO THE ACOLYTES THAT REPRESENT YFI MAY COMMUNE AND WORSHIP'}</span>
					</div>
				</div>
			</header>
			<DraggablePlayer
				selected={selected}
				set_selected={set_selected}
				hasMediaPlayer={hasMediaPlayer}
				set_hasMediaPlayer={set_hasMediaPlayer}
			/>
		</>

	);
}

export default Header;
