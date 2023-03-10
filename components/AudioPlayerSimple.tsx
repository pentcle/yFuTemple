import React, {useEffect, useRef, useState} from 'react';

import {useAudio} from '../contexts/useAudio';
import IconPause from './icons/IconPause';
import IconPlay from './icons/IconPlay';
import IconPrev from './icons/IconPrev';

type TAudioPlayerSimple = {
	name: string,
	src: string,
	isSelected: boolean,
	set_selected: React.Dispatch<React.SetStateAction<any>>,
	onSelectNext: () => void
}

function	AudioPlayerSimple({
	name,
	src,
	isSelected,
	set_selected,
	onSelectNext
}: TAudioPlayerSimple): React.ReactElement {
	const	{set_audio, isPlaying, set_isPlaying} = useAudio();
	const	ref = useRef<HTMLAudioElement>();
	const	progress = useRef<HTMLDivElement>();
	const	[isInitialLoad, set_isInitialLoad] = useState(true);

	useEffect((): void => {
		if (progress.current) {
			progress.current.onclick = (e: any): void => {
				if (ref.current && e?.target?.offsetWidth) {
					const progressPercent = e.offsetX / e.target.offsetWidth * 100;
					const newTime = ref.current.duration * progressPercent / 100;
					ref.current.currentTime = newTime;
				}
			};
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress.current, ref.current]);

	useEffect((): void => {
		if (ref.current && !isSelected) {
			// set_currentTime(0);
			ref.current.currentTime = 0;
			ref.current.pause();
		} else if (ref.current && isSelected) {
			set_selected(ref.current);
			if (!isInitialLoad) {
				ref.current.play();
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSelected, ref.current]);

	useEffect((): void => {
		setTimeout((): void => set_isInitialLoad(false), 100);
	}, [isInitialLoad]);

	function renderTimer(): string {
		const	remaining = (ref?.current?.duration || 2) - (ref?.current?.currentTime || 0);
		const	minutes = Math.floor(remaining / 60);
		let		seconds = String(Math.floor(remaining % 60));
		if (Number(seconds) < 10) {
			seconds = `0${seconds}`;
		}
		return (`${minutes}:${seconds}`);
	}

	function renderLayout(): React.ReactElement {
		if (!isSelected) {
			return (
				<>
					<div className={'flex flex-row items-center justify-center'}>
						<IconPlay
							onClick={(): void => {
								set_selected(ref.current);
								set_isPlaying(true);
								set_audio(ref.current);
								if (ref.current) {
									ref.current.play();
								}
							}}
							className={'cursor-pointer'}/>
					</div>
					<div className={'flex w-full'}>{name}</div>
				</>
			);
		}
		return (
			<>
				<div className={'flex flex-row items-center justify-center'}>
					<IconPrev
						onClick={(): void => {
							if (ref.current) {
								ref.current.currentTime = 0;
							}
						}}
						className={'cursor-pointer'} />
					{isPlaying ? (
						<IconPause
							onClick={(): void => {
								set_isPlaying(false);
								if (ref.current) {
									ref.current.pause();
								}
							}}
							className={'mx-2 cursor-pointer'}/>
					) : (
						<IconPlay
							onClick={(): void => {
								set_isPlaying(true);
								if (ref.current) {
									ref.current.play();
								}
							}}
							className={'mx-2 cursor-pointer'}/>
					)}
					<IconPrev
						onClick={(): void => onSelectNext()}
						className={'-ml-1 rotate-180 cursor-pointer'}/>
				</div>
				<div className={'flex w-full'}>{name}</div>
			</>
		);
	}

	return (
		<div className={'font-scope flex h-8 w-full flex-row items-center space-x-2 border-b-2 border-white px-2 text-base text-white'}>
			{renderLayout()}
			<div className={'relative w-full'} style={!isSelected ? {opacity: 0} : {}}>
				<div className={'relative flex w-full flex-row items-center justify-center space-x-2'}>
					<div ref={progress as never} className={'-my-2 w-full cursor-pointer py-2'}>
						<div className={'relative w-full bg-white'} style={{height: 1}}>
							<div
								className={'absolute h-4 bg-white transition-all'}
								style={{width: 1, top: -8, left: `${(ref?.current?.currentTime || 0) / (ref?.current?.duration || 2) * 100}%`}} />
						</div>
					</div>
					<div className={'font-scope tabular-nums text-white'}>
						{renderTimer()}
					</div>
					<audio ref={ref as never} src={src}></audio>
				</div>
			</div>
		</div>
	);
}

export default AudioPlayerSimple;
