import	React			from	'react';
import	Image			from	'next/image';
import	Draggable		from	'react-draggable';
import	useAudio		from	'contexts/useAudio';
import	AudioPlayer		from	'components/AudioPlayerSimple';

function	DraggablePlayer({
	hasMediaPlayer, set_hasMediaPlayer,
	selected, set_selected,
}) {
	const	{AUDIO_LIST, set_audio} = useAudio();

	return (
		<div className={`fixed z-50 ${hasMediaPlayer ? '' : 'hidden'}`}>
			<Draggable
				handle={'.cursor-grab'}
				defaultPosition={{x: 200, y: 200}}>
				<div className={'flex relative z-50 flex-col w-96 bg-black border-2 border-b-0 border-white'}>
					<div className={'flex flex-row justify-between px-2 w-full h-7 font-scope text-lg text-white border-b-2 border-white cursor-grab'}>
						<div className={'w-full'}>{'YFU MEDIA PLAYER'}</div>
						<div
							className={'p-1 -m-1 cursor-pointer select-none'}
							onClick={() => set_hasMediaPlayer(false)}>
							{'X'}
						</div>
					</div>
					<div className={'flex px-2 w-full h-80 font-scope text-lg text-white border-b-2 border-white'}>
						<Image src={AUDIO_LIST[selected][2]} width={380} height={320} objectFit={'cover'} />
					</div>
					<AudioPlayer
						isSelected={selected === 0}
						setIsSelected={(ref) => {
							set_audio(ref);
							set_selected(0);
						}}
						onSelectNext={() => set_selected(1)}
						name={AUDIO_LIST[0][0]} src={AUDIO_LIST[0][1]} />
					<AudioPlayer
						isSelected={selected === 1}
						setIsSelected={(ref) => {
							set_audio(ref);
							set_selected(1);
						}}
						onSelectNext={() => set_selected(2)}
						name={AUDIO_LIST[1][0]} src={AUDIO_LIST[1][1]} />
					<AudioPlayer
						isSelected={selected === 2}
						setIsSelected={(ref) => {
							set_audio(ref);
							set_selected(2);
						}}
						onSelectNext={() => set_selected(3)}
						name={AUDIO_LIST[2][0]} src={AUDIO_LIST[2][1]} />
					<AudioPlayer
						isSelected={selected === 3}
						setIsSelected={(ref) => {
							set_audio(ref);
							set_selected(3);
						}}
						onSelectNext={() => set_selected(4)}
						name={AUDIO_LIST[3][0]} src={AUDIO_LIST[3][1]} />
					<AudioPlayer
						isSelected={selected === 4}
						setIsSelected={(ref) => {
							set_audio(ref);
							set_selected(4);
						}}
						onSelectNext={() => set_selected(0)}
						name={AUDIO_LIST[4][0]} src={AUDIO_LIST[4][1]} />
				</div>
			</Draggable>
		</div>
	);
}

export default DraggablePlayer;
