'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';

import styles from './Carousel.module.css';

export default function CarouselPage(): React.ReactElement {
	const [activeTab, set_activeTab] = useState<string>('techne');
	const [imagePaths, set_imagePaths] = useState<string[]>([]);
	const [isLoading, set_isLoading] = useState<boolean>(true);
	const [currentSlide, set_currentSlide] = useState<number>(0); // Handle current slide state
	const [isShowGlow, set_isShowGlow] = useState<boolean>(false);

	const tabColors: { [key: string]: string } = {
		techne: 'rgba(219, 241, 247, 0.8)',
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
				set_isLoading(false);
			} catch (error) {
				console.error('Error fetching image paths:', error);
				set_imagePaths([]);
				set_isLoading(false);
			}
		};

		const folder = `assets/comics/img/${activeTab}`;
		fetchImagePaths(folder);
	}, [activeTab]);

	// Handle scroll and slide transition
	function handleScroll(e: React.UIEvent): void {
		const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		const vw = viewport / 100;
		if (viewport > 768) {
			const slide = Math.floor(((e.target as any).scrollLeft) / (20 * vw));
			if (slide !== currentSlide) {
				set_currentSlide(slide);
			}
		} else {
			const slide = Math.floor(((e.target as any).scrollLeft + 80) / (50 * vw));
			if (slide !== currentSlide) {
				set_currentSlide(slide);
			}
		}
	}

	// Handle glow effect
	useEffect((): () => void => {
		set_isShowGlow(true);
		const timeout = setTimeout(() => set_isShowGlow(false), 1000);

		return (): void => clearTimeout(timeout);
	}, [activeTab]);

	if (isLoading) {
		return <div>{'Loading...'}</div>;
	}

	const tabs = ['techne', 'transmission', 'community', 'dominion'];

	return (
		<article className={'relative flex h-screen flex-col overflow-hidden bg-[#222A30]'}>
			{/* Glow Effect */}
			<div
				className={`${styles.backgroundGlow} ${isShowGlow ? styles.glowFadeIn : styles.glowFadeOut}`}
				style={{
					'--glow-color': tabColors[activeTab],
					'--glow-fade-color': tabColors[activeTab].replace('0.8', '0.2')
				} as React.CSSProperties}
			>
			</div>

			{/* Tab Navigation */}
			<div className={'relative z-10 flex grow flex-col overflow-hidden p-4 py-8'}>
				<div className={'mb-4 flex w-full justify-center'}>
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => set_activeTab(tab)}
							className={`px-4 py-2 capitalize ${activeTab === tab ? 'bg-white text-black' : 'text-white'}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Horizontal Image Carousel */}
				<div
					id={'image-carousel'}
					className={'horizontal-snap w-screen gap-0 scroll-smooth px-20 scrollbar-none md:px-[40vw]'}
					onScroll={handleScroll}
				>
					{imagePaths.map((imagePath, index) => (
						<div
							key={index}
							className={`w-[50vw] md:w-[20vw] ${
								currentSlide > index ? 'horizontal-snap-on-left' : currentSlide < index ? 'horizontal-snap-on-right' : 'horizontal-snap-center'
							}`}
						>
							<div className={'figure select-none'}>
								<div className={'carousel-slider-animate-opacity'}>
									<Image
										alt={`Image ${index + 1}`}
										src={`/${imagePath}`}
										width={500}
										height={761}
										objectFit={'contain'}
										loading={'lazy'}
										className={'cursor-pointer'}
										onClick={() => window.open(imagePath, '_blank')}
									/>
								</div>
							</div>
						</div>
					))}

					{/* Add empty divs for proper spacing */}
					{imagePaths.length < 5
						? Array(5 - imagePaths.length).fill(<div className={'w-[50vw] md:w-[20vw]'} />)
						: null}
				</div>
			</div>

			{/* Footer */}
			<p className={'absolute bottom-4 right-4 z-30'}>
				<a
					href={'https://github.com/pentcle/playground/tree/main/src/app/carousel'}
					target={'_blank'}
					rel={'noopener noreferrer'}
					className={'text-white underline'}
				>
					{'GitHub'}
				</a>
			</p>
		</article>
	);
}
