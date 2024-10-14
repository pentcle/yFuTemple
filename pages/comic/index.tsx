'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Carousel.module.css';

// Define a custom type for our CSS variables with the correct prefix
type TCustomCSSProperties = React.CSSProperties & {
	'--glow-color': string;
	'--glow-fade-color': string;
};

// Explicitly declare functions outside the component
function handleScroll(e: React.UIEvent<HTMLElement>, currentSlide: number, set_currentSlide: React.Dispatch<React.SetStateAction<number>>): void {
	const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	const vw = viewport / 100;
	const target = e.target as HTMLElement;

	if (viewport > 768) {
		const slide = Math.floor(target.scrollLeft / (20 * vw));
		if (slide !== currentSlide) {
			set_currentSlide(slide);
		}
	} else {
		const slide = Math.floor((target.scrollLeft + 80) / (50 * vw));
		if (slide !== currentSlide) {
			set_currentSlide(slide);
		}
	}
}

function handleImageClick(imagePath: string, set_modalImage: React.Dispatch<React.SetStateAction<string | null>>, set_isModalOpen: React.Dispatch<React.SetStateAction<boolean>>): void {
	set_modalImage(imagePath);
	set_isModalOpen(true);
}

function handleModalClose(set_isModalOpen: React.Dispatch<React.SetStateAction<boolean>>, set_modalImage: React.Dispatch<React.SetStateAction<string | null>>): void {
	set_isModalOpen(false);
	set_modalImage(null);
}

export default function CarouselPage(): React.ReactElement {
	const [activeTab, set_activeTab] = useState<string>('techne');
	const [imagePaths, set_imagePaths] = useState<string[]>([]);
	const [isLoading, set_isLoading] = useState<boolean>(true);
	const [currentSlide, set_currentSlide] = useState<number>(0);
	const [isShowGlow, set_isShowGlow] = useState<boolean>(false);
	const [isModalOpen, set_isModalOpen] = useState<boolean>(false);
	const [modalImage, set_modalImage] = useState<string | null>(null);

	const tabColors: { [key: string]: string } = {
		techne: 'rgba(18, 201, 205, 0.8)',
		transmission: 'rgba(230, 236, 117, 0.8)',
		community: 'rgba(238, 166, 208, 0.8)',
		dominion: 'rgba(227, 111, 76, 0.8)'
	};

	// Fetch image paths dynamically when the active tab changes
	useEffect((): void => {
		const fetchImagePaths = async (folder: string): Promise<void> => {
			try {
				set_isLoading(true);
				const response = await fetch(`/api/imagePaths?folder=${encodeURIComponent(folder)}`);
				const data = await response.json();
				set_imagePaths(data.imagePaths || []);
				set_currentSlide(0); // Reset the carousel to the first slide
				set_isLoading(false);
			} catch (error) {
				console.error('Error fetching image paths:', error);
				set_imagePaths([]);
				set_isLoading(false);
			}
		};

		const folder = `assets/comics/img/${activeTab}`;
		void fetchImagePaths(folder);
	}, [activeTab]);

	useEffect((): (() => void) => {
		const showGlowEffect = (): () => void => {
			set_isShowGlow(true);
			const timeout = setTimeout((): void => {
				set_isShowGlow(false);
			}, 1000);
			return (): void => {
				clearTimeout(timeout);
			};
		};

		return showGlowEffect();
	}, [activeTab]);

	if (isLoading) {
		return (
			<div className={'fixed inset-0 z-50 flex items-center justify-center bg-black/50'}>
				<h1>{'Loading...'}</h1>
			</div>
		);
	}

	const tabs = [
		'techne',
		'transmission',
		'community',
		'dominion'
	];

	const styleProps: TCustomCSSProperties = {
		'--glow-color': tabColors[activeTab],
		'--glow-fade-color': tabColors[activeTab].replace('0.8', '0.2')
	};

	return (
		<article className={'relative flex h-screen flex-col overflow-hidden p-0 md:p-6'}>
			<div className={'flex h-12 flex-row items-center justify-between border-b-2 border-b-white px-4 md:hidden'}>
				<Link href={'/'}>
					<div className={'flex cursor-pointer flex-row items-center'}>
						<p className={'mr-1 font-scope text-xl text-white'}>{'<'}</p>
						<p className={'mt-1 font-scope text-xl text-white'}>{'BACK'}</p>
					</div>
				</Link>
				<div className={'flex cursor-pointer flex-row items-center justify-between'}>
					<a
						href={'https://zora.co/collect/base:0x39adafad9fde221725b975b4adae8b8f2dfa6d4b/1'}
						target={'_blank'}
						rel={'noreferrer'}
						className={'flex items-center font-scope text-xl uppercase text-white md:mr-4'}
					>
						<span>{'mint on zora'}</span>
						<Image
							src={'/assets/Base_Symbol_White.svg'}
							alt={'Base logo'}
							width={20}
							height={20}
							className={'ml-4 inline-block'}
						/>
					</a>
				</div>
			</div>

			<div className={'absolute inset-x-6 top-4 hidden flex-row items-center justify-between md:flex lg:mr-4'}>
				<Link href={'/'}>
					<div className={'cursor-pointer flex-row items-center md:flex'}>
						<p className={'mr-1 font-scope text-5xl text-white'}>{'<'}</p>
						<p className={'mt-3 font-scope text-2xl text-white'}>{'BACK'}</p>
					</div>
				</Link>
				<button
					onClick={(): void => {
						if (window) {
							window.open('https://zora.co/collect/base:0x39adafad9fde221725b975b4adae8b8f2dfa6d4b/1', '_blank');
						}
					}}
					className={'button-glowing-small flex items-center justify-items-center bg-white font-scope text-black'}>
					<span>{'MINT ON ZORA'}</span>
					<Image
						src={'/assets/Base_Symbol_Blue.svg'}
						alt={'Base logo'}
						width={16}
						height={16}
						className={'ml-2 inline-block'}
					/>
					<div className={'glow absolute -inset-0 rotate-180 rounded-full'}/>
					<div className={'glow absolute -inset-0 rotate-180 rounded-full'}/>
				</button>
			</div>
			<h3 className={'mx-auto mt-4 w-fit max-w-xl whitespace-pre-wrap break-words border-b-2 border-b-white px-3 pb-3 font-peste text-2xl font-medium uppercase text-white md:mt-0 md:px-0 md:text-5xl'}>
				{'yFu comics'}
			</h3>

			<article
				className={`${styles.backgroundGlow} ${isShowGlow ? styles.glowFadeIn : styles.glowFadeOut}`}
				style={styleProps}
			/>

			<article className={'z-10 flex flex-col items-stretch justify-between space-y-4 overflow-hidden p-4 py-8 sm:space-y-16'}>

				<section className={'mb-4 flex w-full justify-center gap-x-2'}>
					{/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={(): void | null => (tab === 'techne' ? set_activeTab(tab) : null)}
							disabled={tab !== 'techne'}
							className={`rounded-md px-2 py-1 text-sm capitalize ${
								activeTab === tab ? 'bg-white/30' : 'text-white'
							} ${tab !== 'techne' ? 'cursor-not-allowed opacity-30' : ''}`}
						>
							{tab}
						</button>
					))}
				</section>


				<section
					id={'image-carousel'}
					className={'horizontal-snap w-screen gap-0 scroll-smooth px-20 scrollbar-none md:px-[40vw]'}
					onScroll={(e): void => handleScroll(e, currentSlide, set_currentSlide)}
				>
					{/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
					{imagePaths.map((imagePath, index) => (
						<div
							key={index}
							className={`w-[50vw] md:w-[20vw] ${
								currentSlide === index ? 'horizontal-snap-center' : currentSlide > index ? 'horizontal-snap-on-left' : 'horizontal-snap-on-right'
							}`}
						>
							<div className={'figure select-none'}>
								<div className={'carousel-slider-animate-opacity'}>
									<Image
										alt={`Image ${index + 1}`}
										src={`/${imagePath}`}
										width={1200}
										height={1846}
										style={{objectFit: 'contain'}}
										loading={'lazy'}
										className={'cursor-pointer'}
										onClick={(): void => handleImageClick(imagePath, set_modalImage, set_isModalOpen)}
									/>
								</div>
							</div>
						</div>
					))}

					{imagePaths.length < 5
						? Array(5 - imagePaths.length).fill(<div className={'w-[50vw] md:w-[20vw]'}/>)
						: null}
				</section>
			</article>

			{isModalOpen && modalImage && (
				<div
					className={'fixed inset-0 z-50 flex items-center justify-center bg-black/80'}
					onClick={(): void => handleModalClose(set_isModalOpen, set_modalImage)}
				>
					<div className={'relative p-4'}>
						<Image
							src={`/${modalImage}`}
							alt={'Full screen image'}
							width={1200}
							height={1846}
							loading={'eager'}
							style={{
								objectFit: 'contain',
								maxHeight: 'calc(100vh - 80px)',
								maxWidth: '100%'
							}}
						/>
					</div>
				</div>
			)}
		</article>
	);
}
