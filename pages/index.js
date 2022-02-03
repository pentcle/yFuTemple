import	React					from	'react';
import	Image					from	'next/image';
import	Redis					from	'ioredis';
import	Title					from	'components/Title';
import	Footer					from	'components/Footer';

const	redis = new Redis(process.env.REDIS_URL);

function	AudioPlayer({src}) {
	const	ref = React.useRef();
	const	progress = React.useRef();
	const	readInterval = React.useRef();
	const	[duration, set_duration] = React.useState(0);
	const	[currentTime, set_currentTime] = React.useState(0);
	const	[isPlaying, set_isPlaying] = React.useState(false);

	React.useEffect(() => {
		if (ref.current && ref.current.duration) {
			set_duration(ref?.current?.duration || 0);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref.current, ref.current?.duration, typeof(window) !== undefined]);

	React.useEffect(() => {
		if (progress.current) {
			progress.current.onclick = (e) => {
				const progressPercent = e.offsetX / e.target.offsetWidth * 100;
				const newTime = ref.current.duration * progressPercent / 100;
				ref.current.currentTime = newTime;
				set_duration(d => ref?.current?.duration || d);
			};
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress.current, ref.current]);

	React.useEffect(() => {
		readInterval.current = setInterval(() => {
			if (ref.current) {
				set_currentTime(ref.current.currentTime);
			}
		} , 300);
		return () => clearInterval(readInterval.current);
	}, []);

	function renderTimer() {
		const	remaining = duration - currentTime;
		const	minutes = Math.floor(remaining / 60);
		let		seconds = Math.floor(remaining % 60);
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		return (`${minutes}:${seconds}`);
	}

	return (
		<div className={'flex relative bottom-0 flex-row justify-center items-center py-6 px-4 space-x-2 w-full md:absolute md:bottom-14 md:py-0 md:px-8 md:pb-1'}>
			<div
				className={'z-50 p-2 -m-2'}
				onClick={() => {
					if (isPlaying || !ref.current.paused) {
						set_isPlaying(false);
						ref.current.pause();
					} else {
						set_isPlaying(true);
						ref.current.play();
					}
				}}>
				{isPlaying ? (
					<svg xmlns={'http://www.w3.org/2000/svg'} className={'w-6 h-6 text-white cursor-pointer'} viewBox={'0 0 33 35'}>
						<g id={'Group_53'} data-name={'Group 53'} transform={'translate(-95 -4280)'}><g id={'Rectangle_37'} data-name={'Rectangle 37'} transform={'translate(95 4280)'} fill={'none'} stroke={'currentcolor'} strokeWidth={'2'}><rect width={'15'} height={'35'} stroke={'none'}/><rect x={'1'} y={'1'} width={'13'} height={'33'} fill={'none'}/></g><g id={'Rectangle_38'} data-name={'Rectangle 38'} transform={'translate(113 4280)'} fill={'none'} stroke={'currentcolor'} strokeWidth={'2'}><rect width={'15'} height={'35'} stroke={'none'}/><rect x={'1'} y={'1'} width={'13'} height={'33'} fill={'none'}/></g></g>
					</svg>

				) : (
					<svg xmlns={'http://www.w3.org/2000/svg'} className={'w-6 h-6 text-white cursor-pointer'} viewBox={'0 0 26.447 35.263'}>
						<path id={'Tracé_59'} data-name={'Tracé 59'} d={'M47.966,30.721,23.722,14.192A1.1,1.1,0,0,0,22,15.1V48.161a1.1,1.1,0,0,0,1.722.91l24.243-16.53a1.1,1.1,0,0,0,0-1.82ZM24.2,46.075V17.188L45.389,31.632Z'} transform={'translate(-22 -14)'} fill={'currentcolor'}/>
					</svg>
				)}
			</div>
			<div ref={progress} className={'py-2 -my-2 w-full cursor-pointer'}>
				<div className={'relative w-full h-0.5 bg-white'}>
					<div
						className={'absolute -top-2 w-0.5 h-5 bg-white transition-all'}
						style={{left: `${currentTime / duration * 100}%`}} />
				</div>
			</div>
			<div className={'font-scope tabular-nums text-white'}>
				{renderTimer()}
			</div>
			<audio ref={ref} src={src}></audio>
		</div>
	);
}

function	Goddess({characterSrc, typoSrc, soundSrc, children}) {
	return (
		<div className={'grid grid-cols-1 border border-white divide-y divide-white md:grid-cols-3 md:divide-y-0'}>
			<div className={'flex relative flex-col col-span-1 justify-center items-center p-0 divide-y divide-white md:p-8 md:pb-14 md:divide-y-0'}>
				<div className={'px-8 h-48 md:px-0 md:h-auto image-wrapper-full-height'}>
					<Image
						src={typoSrc}
						loading={'eager'}
						objectFit={'contain'}
						quality={90}
						width={497}
						height={497} />
				</div>
				<AudioPlayer src={soundSrc} />
			</div>
			<div className={'block col-span-1 md:hidden image-wrapper'}>
				<Image
					src={characterSrc}
					objectFit={'cover'}
					loading={'eager'}
					width={600}
					height={895} />
			</div>
			<div className={'flex flex-col col-span-1 p-4 pb-8 w-full h-full border-0 border-white md:p-8 md:pb-14 md:border-x'}>
				<div className={'space-y-4 font-scope text-base text-white'}>
					{children}
				</div>
				<div className={'mx-auto mt-8 md:mt-auto'}>
					<button className={'font-peste bg-white button-glowing'}>
						{'SEE TRIBUTES'}
						<div className={'absolute -inset-0 rounded-full rotate-180 glow'} />
						<div className={'absolute -inset-0 rounded-full rotate-180 glow'} />
					</button>
				</div>
			</div>
			<div className={'hidden col-span-1 md:block image-wrapper'}>
				<Image
					src={characterSrc}
					objectFit={'cover'}
					loading={'eager'}
					width={600}
					height={895} />
			</div>
		</div>
	);
}

function	Techne() {
	return (
		<Goddess
			characterSrc={'/character-techne.png'}
			typoSrc={'/typo-techne.png'}
			soundSrc={'/community.wav'}>
			<p>{'Techne is known as the shining one, her dress is a pure gradient of yellow and pink, as perfect as any fabric can contain.'}</p>

			<p>{'Below this dress, it is said, is another garment which is made to show the entire cosmos in fine detail, the celestial balance and complexity, of the patterned substances of the earth, all depicted in a subtle map that reveals its machinic nature in great fidelity.'}</p>

			<p>{'Few have been known to see this map, and to see it is to be in a close position to the goddess.'}</p>

			<p>{'Upon her head is a serpent coiled, and in her hand is something always new, for she does not bear symbols as much as the understanding of their ephemeral nature, experiencing extropy and entropy under the grace of her hands.'}</p>
		</Goddess>
	);
}

function	Dominion() {
	return (
		<Goddess
			characterSrc={'/character-dominion.png'}
			typoSrc={'/typo-dominion.png'}
			soundSrc={'/dominion.wav'}>
			<p>{'She holds a dark sword with green jewels in its hilt, which is known to be the essence of desire overcoming expansion.'}</p>

			<p>{'Her dress is of smoke and hidden fire, rendered as darkness instead of light. Her companion is the voidfish, which elaborates as a point along two axis, for her bi-linear symbol is the “ex.”'}</p>

			<p>{'She is able to assert that point into the labyrinth, which, it is said, she elaborates as the locus of observation.'}</p>

			<p>{'Below her cloak it is said is a strange dark armor, its true nature unknown, and visible only as it climbs her neck, bearing the symbol of the diamond: the sublime’s internal and futurist repose.'}</p>
		</Goddess>
	);
}

function	Transmission() {
	return (
		<Goddess
			characterSrc={'/character-transmission.png'}
			typoSrc={'/typo-transmission.png'}
			soundSrc={'/community.wav'}>
			<p>{'Transmission is known as the tawny one, and she wears a dress of earthen colors, streaked randomly in many directions resembling the dance of falling rain becoming droplets on stones.'}</p>
			<p>{'Hers is the symbol of the net, which is often depicted as energetic meshes and grids, and it is known that she catches all thoughts there and allows them to be retrieved.'}</p>
			<p>{'Her hands are known to be large and strong, and she is bestowed with the beautiful, translucent wings of the night wind, which carries its voice in her laughter.'}</p>
			<p>{'Hers is the ascending triangle pointing straight above, toward the apex stars, and uniting us to a mysterium of meaning.'}</p>
		</Goddess>
	);
}

function	Community() {
	return (
		<Goddess
			characterSrc={'/character-community.png'}
			typoSrc={'/typo-community.png'}
			soundSrc={'/community.wav'}>
			<p>{'Community is known as the tawny one, and she wears a dress of earthen colors, streaked randomly in many directions resembling the dance of falling rain becoming droplets on stones.'}</p>
			<p>{'Hers is the symbol of the net, which is often depicted as energetic meshes and grids, and it is known that she catches all thoughts there and allows them to be retrieved.'}</p>
			<p>{'Her hands are known to be large and strong, and she is bestowed with the beautiful, translucent wings of the night wind, which carries its voice in her laughter.'}</p>
			<p>{'Hers is the ascending triangle pointing straight above, toward the apex stars, and uniting us to a mysterium of meaning.'}</p>
		</Goddess>
	);
}

function	Tree() {
	return (
		<div className={'grid grid-cols-1 border border-white'}>
			<div className={'col-span-1 image-wrapper'}>
				<Image
					src={'/yfiTree.jpg'}
					loading={'eager'}
					width={2000}
					height={1000} />
			</div>
			<div className={'col-span-1 p-4 font-scope text-base text-left text-white md:p-6 md:text-center'}>
				<p>{'The YFI faction is guided by the four yFu, who interpret the knowledge of the Yearning Tree - an ancient being who hears the desires of creatures across the universe - and responds by growing yield-bearing seeds containing the answers to their wishes'}</p>
			</div>
		</div>
	);
}

function	Index({visitors}) {
	return (
		<>
			<main id={'app'} className={'relative mx-auto max-w-screen-xl'} style={{minHeight: '100vh'}}>
				<div>
					<div className={'flex justify-center items-center py-8'}>
						<Title />
					</div>
					<section className={'px-4 w-full md:px-0'}>
						<Techne />
						<div className={'flex justify-center items-center my-0'}>
							<Image src={'/divider-1.gif'} width={200} height={200} />
						</div>
						<Dominion />
						<div className={'flex justify-center items-center my-0'}>
							<Image src={'/divider-2.gif'} width={200} height={200} />
						</div>
						<Transmission />
						<div className={'flex justify-center items-center my-0'}>
							<Image src={'/divider-3.gif'} width={200} height={200} />
						</div>
						<Community />
						<div className={'flex justify-center items-center my-9'}>
							<Image src={'/divider-4.png'} width={112} height={112} />
						</div>
						<Tree />
					</section>
				</div>
			</main>
			<Footer visitors={visitors} />
		</>
	);
}

export default Index;

export async function getServerSideProps() {
	// const visitors = await redis.set('counter', 1435600);
	const visitors = await redis.incr('counter');
	return {props: {visitors}};
}