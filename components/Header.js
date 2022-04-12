import	React				from	'react';
import	Image				from	'next/image';
import	useAudio			from	'contexts/useAudio';
import	DraggablePlayer		from	'components/DraggablePlayer';
import	IconPause			from	'components/icons/IconPause';
import	IconPlay			from	'components/icons/IconPlay';
import	IconPrev			from	'components/icons/IconPrev';
import	IconExpand			from	'components/icons/IconExpand';

function	Header() {
	const	readInterval = React.useRef();
	const	{AUDIO_LIST, audio, isPlaying, set_isPlaying} = useAudio();
	const	[hasModal, set_hasModal] = React.useState(false);
	const	[hasMediaPlayer, set_hasMediaPlayer] = React.useState(false);
	const	[selected, set_selected] = React.useState(0);
	const	[, set_nonce] = React.useState(0);
	
	React.useEffect(() => {
		readInterval.current = setInterval(() => {
			set_nonce(n => n + 1);
		} , 300);
		return () => clearInterval(readInterval.current);
	}, []);

	function renderTimer() {
		const	remaining = (audio?.duration || 0) - (audio?.currentTime || 0);
		const	minutes = Math.floor(remaining / 60);
		let		seconds = Math.floor(remaining % 60);
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		return (`${minutes}:${seconds}`);
	}

	return (
		<>
			<header className={'grid fixed top-0 z-20 flex-col grid-cols-2 items-center w-full h-24 md:flex md:flex-row md:h-16'}>
				<div className={'flex relative col-span-1 items-center w-full h-12 bg-black border-b-2 border-white md:w-68 md:min-w-68 md:h-full'}>
					<div
						className={'flex justify-between items-center px-4 w-full cursor-pointer'}
						onClick={() => set_hasModal(!hasModal)}>
						<p className={'font-scope text-xl text-white select-none md:text-2xl'}>{'INFO'}</p>
					</div>
					<div className={`absolute top-full w-250% md:w-full bg-black border-white border-0 border-b-2 md:border-2 left-0 z-50 p-4 px-4 ${hasModal ? '' : 'opacity-0 pointer-events-none'}`}>
						<div
							className={'flex justify-end p-1 -m-1 w-full font-scope text-lg text-white cursor-pointer select-none'}
							onClick={() => set_hasModal(!hasModal)}>
							{'X'}
						</div>
						<div className={'flex justify-center w-full select-none'}>
							<Image src={'/yfiTree.png'} width={150} height={186} />
						</div>
						<div className={'mt-4 font-scope tracking-widest text-yblue'}>
							<span className={'flex flex-row mb-1 w-full'}>
								<p>{'Find us:'}</p>
								<a href={'https://yearn.finance'} target={'_blank'} rel={'noreferrer'} className={'pl-28 ml-1 hover:underline'}>{'YEARN'}</a>
							</span>
							<span className={'mb-1'}>
								<a href={'https://twitter.com/iearnfinance'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>{'Twitter'}</a>
								{' / '}
								<a href={'http://blog.yearn.finance/'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>{'Medium'}</a>
								{' / '}
								<a href={'https://discord.yearn.finance/'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>{'Discord'}</a>
							</span>
							<span className={'flex flex-row justify-between mt-1 w-full font-bluepill'}>
								<a href={'https://thebluepill.eth.link/'} target={'_blank'} rel={'noreferrer'} className={'text-xl tracking-normal hover:underline'}>{'The Blue Pill'}</a>
							</span>
						</div>

					</div>
				</div>
				<div className={'flex relative col-span-1 min-w-0 h-12 bg-black border-b-2 border-l-2 border-white border-l-white md:w-[300px] md:min-w-[300px] md:h-16'}>
					<div className={'flex justify-between items-center px-2 w-max cursor-pointer md:px-4'}>
						<div className={'flex flex-row justify-center items-center font-scope'}>
							<IconPrev
								onClick={() => audio.currentTime = 0}
								className={'w-3 h-3 text-white cursor-pointer md:w-4 md:h-4'} />
							{isPlaying ? (
								<IconPause
									onClick={() => {
										set_isPlaying(false);
										audio.pause();
									}}
									className={'mx-0.5 w-3 h-3 text-white cursor-pointer md:mx-1 md:w-4 md:h-4'}/>
							) : (
								<IconPlay
									onClick={() => {
										set_isPlaying(true);
										audio.play();
									}}
									className={'mx-0.5 w-3 h-3 text-white cursor-pointer md:mx-1 md:w-4 md:h-4'}/>
							)}
							<IconPrev
								onClick={() => set_selected(selected === 4 ? 0 : selected + 1)}
								className={'w-3 h-3 text-white rotate-180 cursor-pointer md:w-4 md:h-4'}/>
						</div>
						<div className={'flex mx-2 mb-0.5 font-scope text-xs text-white md:mx-3 md:text-base'}>{AUDIO_LIST[selected][0]}</div>
						<div className={'mr-0 mb-0.5 font-scope text-xs tabular-nums text-white md:mr-3 md:text-base'}>
							{renderTimer()}
						</div>
						<IconExpand
							className={'hidden md:block'}
							onClick={() => set_hasMediaPlayer(!hasMediaPlayer)} />
					</div>
				</div>
				<div className={'flex overflow-x-hidden relative col-span-2 items-center w-250% h-12 font-scope text-white bg-[#181D20] border-b-2 border-white select-none md:w-full md:h-16'}>
					<div className={'whitespace-nowrap animate-marquee'}>
						<span className={'mx-4 text-xl md:text-2xl'}>{'THE TEMPLE IS A SACRED PLACE, DESIGNED SO THE ACOLYTES THAT REPRESENT YFI MAY COMMUNE AND WORSHIP'}</span>
					</div>
					<div className={'flex absolute top-0 items-center h-full whitespace-nowrap animate-marquee2'}>
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
