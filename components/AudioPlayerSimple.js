import	React					from	'react';
import	useAudio				from	'contexts/useAudio';
import	IconPause				from	'components/icons/IconPause';
import	IconPlay				from	'components/icons/IconPlay';
import	IconPrev				from	'components/icons/IconPrev';

function	AudioPlayerSimple({name, src, isSelected, setIsSelected, onSelectNext}) {
	const	{set_audio, isPlaying, set_isPlaying} = useAudio();
	const	ref = React.useRef();
	const	progress = React.useRef();
	const	[isInitialLoad, set_isInitialLoad] = React.useState(true);

	React.useEffect(() => {
		if (progress.current) {
			progress.current.onclick = (e) => {
				const progressPercent = e.offsetX / e.target.offsetWidth * 100;
				const newTime = ref.current.duration * progressPercent / 100;
				ref.current.currentTime = newTime;
			};
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress.current, ref.current]);

	React.useEffect(() => {
		if (ref.current && !isSelected) {
			// set_currentTime(0);
			ref.current.currentTime = 0;
			ref.current.pause();
		} else if (ref.current && isSelected) {
			setIsSelected(ref.current);
			if (!isInitialLoad)
				ref.current.play();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSelected, ref.current]);

	React.useEffect(() => {
		setTimeout(() => set_isInitialLoad(false), 100);
	}, [isInitialLoad]);

	function renderTimer() {
		const	remaining = (ref?.current?.duration || 2) - (ref?.current?.currentTime || 0);
		const	minutes = Math.floor(remaining / 60);
		let		seconds = Math.floor(remaining % 60);
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		return (`${minutes}:${seconds}`);
	}

	function renderLayout() {
		if (!isSelected) {
			return (
				<>
					<div className={'flex flex-row justify-center items-center'}>
						<IconPlay
							onClick={() => {
								setIsSelected(ref.current);
								set_isPlaying(true);
								set_audio(ref.current);
								ref.current.play();
							}}
							className={'cursor-pointer'}/>
					</div>
					<div className={'flex w-full'}>{name}</div>
				</>
			);
		}
		return (
			<>
				<div className={'flex flex-row justify-center items-center'}>
					<IconPrev
						onClick={() => {
							ref.current.currentTime = 0;
						}}
						className={'cursor-pointer'} />
					{isPlaying ? (
						<IconPause
							onClick={() => {
								set_isPlaying(false);
								ref.current.pause();
							}}
							className={'mx-2 cursor-pointer'}/>
					) : (
						<IconPlay
							onClick={() => {
								set_isPlaying(true);
								ref.current.play();
							}}
							className={'mx-2 cursor-pointer'}/>
					)}
					<IconPrev
						onClick={() => onSelectNext()}
						className={'-ml-1 rotate-180 cursor-pointer'}/>
				</div>
				<div className={'flex w-full'}>{name}</div>
			</>
		);
	}

	return (
		<div className={'flex flex-row items-center px-2 space-x-2 w-full h-8 font-scope text-base text-white border-b-2 border-white'}>
			{renderLayout()}
			<div className={'relative w-full'} style={!isSelected ? {opacity: 0} : {}}>
				<div className={'flex relative flex-row justify-center items-center space-x-2 w-full'}>
					<div ref={progress} className={'py-2 -my-2 w-full cursor-pointer'}>
						<div className={'relative w-full bg-white'} style={{height: 1}}>
							<div
								className={'absolute h-4 bg-white transition-all'}
								style={{width: 1, top: -8, left: `${(ref?.current?.currentTime || 0) / (ref?.current?.duration || 2) * 100}%`}} />
						</div>
					</div>
					<div className={'font-scope tabular-nums text-white'}>
						{renderTimer()}
					</div>
					<audio ref={ref} src={src}></audio>
				</div>
			</div>
		</div>
	);
}

export default AudioPlayerSimple;