import	React			from	'react';
import	Image			from	'next/image';

function	Header() {
	const	[hasSound, set_hasSound] = React.useState(false);
	const	[hasModal, set_hasModal] = React.useState(false);
	return (
		<header className={'flex z-20 flex-col items-center h-32 md:flex-row md:h-16'}>
			<div className={'flex relative items-center w-full h-16 bg-white border-b border-white md:w-96 md:h-full'}>
				<div
					className={'flex justify-between items-center px-4 w-full cursor-pointer'}
					onClick={() => set_hasModal(!hasModal)}>
					<p className={'font-scope text-2xl text-black select-none'}>{'INFO'}</p>
					<div
						className={'p-2 -m-2 cursor-pointer'}
						onClick={(e) => {
							e.stopPropagation();
							set_hasSound(!hasSound);
						}}>
						{hasSound ? 
							<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fal'} data-icon={'volume'} className={'w-8 h-8 text-black'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 640 512'} style={{paddingLeft: 2}}>
								<path fill={'currentColor'} d={'M333.2 34.84c-4.201-1.895-8.727-2.841-13.16-2.841c-7.697 0-15.29 2.784-21.27 8.1L163.8 160H80c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9C304.7 477.2 312.3 480 320 480c4.438 0 8.959-.9312 13.16-2.837C344.7 472 352 460.6 352 448V64C352 51.41 344.7 39.1 333.2 34.84zM319.1 447.1L175.1 319.1H80c-8.822 0-16-7.16-16-15.96v-96c0-8.801 7.178-15.96 16-15.96h95.1l143.1-127.1c.0078-.0078-.0039 .0039 0 0L319.1 447.1zM491.4 98.7c-7.344-4.922-17.28-2.953-22.2 4.391s-2.953 17.28 4.391 22.2C517.7 154.8 544 203.7 544 256s-26.33 101.2-70.44 130.7c-7.344 4.922-9.312 14.86-4.391 22.2C472.3 413.5 477.3 416 482.5 416c3.062 0 6.156-.875 8.891-2.703C544.4 377.8 576 319 576 256S544.4 134.2 491.4 98.7zM438.4 178.7c-7.328-4.922-17.28-2.953-22.2 4.391s-2.953 17.28 4.391 22.2C437.8 216.8 448 235.7 448 256s-10.23 39.23-27.38 50.7c-7.344 4.922-9.312 14.86-4.391 22.2C419.3 333.5 424.4 336 429.5 336c3.062 0 6.156-.875 8.891-2.703C464.5 315.9 480 286.1 480 256S464.5 196.1 438.4 178.7z'}></path>
							</svg>
							:
							<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fal'} data-icon={'volume-slash'} className={'w-8 h-8 text-black'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 640 512'} style={{paddingRight: 1}}>
								<path fill={'currentColor'} d={'M351.1 64.05C351.1 64.04 351.1 64.05 351.1 64.05l.002 135.6L384 224.1V64c0-12.6-7.337-24.01-18.84-29.16c-4.201-1.895-8.727-2.841-13.16-2.841c-7.697 0-15.29 2.784-21.27 8.1L245.6 115.7L271.2 135.9L351.1 64.05zM480 256c0 12.91-4.529 25.05-11.97 35.3L493 311C504.8 295.2 512 276.2 512 256c0-30.97-15.53-59.86-41.56-77.3c-7.328-4.922-17.28-2.953-22.2 4.391s-2.953 17.28 4.391 22.2C469.8 216.8 480 235.7 480 256zM576 256c0 34.73-11.82 67.81-32.54 94.86l25.07 19.79C593.7 338 608 298 608 256c0-63-31.64-121.8-84.63-157.3c-7.344-4.922-17.28-2.953-22.2 4.391s-2.953 17.28 4.391 22.2C549.7 154.8 576 203.7 576 256zM351.1 447.1L207.1 319.1H112c-8.822 0-16-7.16-16-15.96v-96c0-8.801 7.178-15.96 16-15.96h23.71L98.04 162.3C78.39 168.3 64 186.4 64 208V304c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9C336.7 477.2 344.3 480 352 480c4.438 0 8.959-.9312 13.16-2.837C376.7 472 384 460.6 384 448v-59.93l-32.02-25.28L351.1 447.1zM633.9 483.4L25.92 3.42c-6.938-5.453-17-4.25-22.48 2.641c-5.469 6.938-4.281 17 2.641 22.48l608 480C617 510.9 620.5 512 623.1 512c4.734 0 9.422-2.094 12.58-6.078C642 498.1 640.8 488.9 633.9 483.4z'}></path>
							</svg>
						}
					</div>
				</div>
				<div className={`absolute top-full w-full bg-black border-white border-0 border-b md:border left-0 z-50 p-4 px-8 md:px-4 ${hasModal ? '' : 'opacity-0 pointer-events-none'}`}>
					<div
						className={'flex justify-end p-1 -m-1 w-full font-scope text-lg text-white cursor-pointer select-none'}
						onClick={() => set_hasModal(!hasModal)}>
						{'X'}
					</div>
					<div className={'flex justify-center w-full select-none'}>
						<Image src={'/divider-4.png'} width={183} height={227} />
					</div>
					<div className={'pr-4 mt-4 font-scope tracking-widest text-white'}>
						<span className={'flex flex-row justify-between mb-1 w-full'}>
							<p>{'Find us:'}</p>
							<a href={'https://yearn.finance'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>{'YEARN'}</a>
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
			<marquee className={'flex overflow-x-hidden relative items-center h-16 font-scope text-white border-b border-white md:h-full'}>
				<div className={'whitespace-nowrap animate-marquee'}>
					<span className={'mx-4 text-3xl'}>{'THE TEMPLE IS A SACRED PLACE, DESIGNED SO THE ACOLYTES THAT REPRESENT YFI MAY COMMUNE AND WORSHIP'}</span>
				</div>
				<div className={'absolute top-0 whitespace-nowrap animate-marquee2'}>
					<span className={'mx-4 text-3xl'}>{'THE TEMPLE IS A SACRED PLACE, DESIGNED SO THE ACOLYTES THAT REPRESENT YFI MAY COMMUNE AND WORSHIP'}</span>
				</div>
			</marquee>
		</header>
	);
}

export default Header;
