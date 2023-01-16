import React from 'react';
import Draggable from 'react-draggable';
import Image from 'next/image';

import {useAudio} from '../contexts/useAudio';
import AudioPlayerSimple from './AudioPlayerSimple';

import type {ReactElement} from 'react';

type TDraggablePlayer = {
	hasMediaPlayer: boolean;
	set_hasMediaPlayer: React.Dispatch<React.SetStateAction<boolean>>,
	selected: number,
	set_selected: React.Dispatch<React.SetStateAction<number>>
}
function	DraggablePlayer({
	hasMediaPlayer,
	set_hasMediaPlayer,
	selected,
	set_selected
}: TDraggablePlayer): ReactElement {
	const	{AUDIO_LIST, set_audio} = useAudio();

	return (
		<div className={`fixed z-50 ${hasMediaPlayer ? '' : 'hidden'}`}>
			<Draggable
				handle={'.cursor-grab'}
				defaultPosition={{x: 200, y: 200}}>
				<div className={'relative z-50 flex w-96 flex-col border-2 border-b-0 border-white bg-black'}>
					<div className={'flex h-7 w-full cursor-grab flex-row justify-between border-b-2 border-white px-2 font-scope text-lg text-white'}>
						<div className={'w-full'}>{'YFU MEDIA PLAYER'}</div>
						<div
							className={'-m-1 cursor-pointer select-none p-1'}
							onClick={(): void => set_hasMediaPlayer(false)}>
							{'X'}
						</div>
					</div>
					<div className={'flex h-80 w-full border-b-2 border-white px-2 font-scope text-lg text-white'}>
						<Image
							alt={''}
							src={AUDIO_LIST[selected][2]}
							width={380}
							height={320}
							objectFit={'cover'} />
					</div>
					<AudioPlayerSimple
						isSelected={selected === 0}
						set_selected={(ref: any): void => {
							set_audio(ref);
							set_selected(0);
						}}
						onSelectNext={(): void => set_selected(1)}
						name={AUDIO_LIST[0][0]}
						src={AUDIO_LIST[0][1]} />
					<AudioPlayerSimple
						isSelected={selected === 1}
						set_selected={(ref: any): void => {
							set_audio(ref);
							set_selected(1);
						}}
						onSelectNext={(): void => set_selected(2)}
						name={AUDIO_LIST[1][0]}
						src={AUDIO_LIST[1][1]} />
					<AudioPlayerSimple
						isSelected={selected === 2}
						set_selected={(ref: any): void => {
							set_audio(ref);
							set_selected(2);
						}}
						onSelectNext={(): void => set_selected(3)}
						name={AUDIO_LIST[2][0]}
						src={AUDIO_LIST[2][1]} />
					<AudioPlayerSimple
						isSelected={selected === 3}
						set_selected={(ref: any): void => {
							set_audio(ref);
							set_selected(3);
						}}
						onSelectNext={(): void => set_selected(4)}
						name={AUDIO_LIST[3][0]}
						src={AUDIO_LIST[3][1]} />
					<AudioPlayerSimple
						isSelected={selected === 4}
						set_selected={(ref: any): void => {
							set_audio(ref);
							set_selected(4);
						}}
						onSelectNext={(): void => set_selected(0)}
						name={AUDIO_LIST[4][0]}
						src={AUDIO_LIST[4][1]} />
				</div>
			</Draggable>
		</div>
	);
}

export default DraggablePlayer;
