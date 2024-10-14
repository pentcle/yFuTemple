'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';

import styles from './Carousel.module.css';

export default function CarouselPage(): React.ReactElement {
	const [activeTab, set_activeTab] = useState<string>('techne');
	const [imagePaths, set_imagePaths] = useState<string[]>([]);
	const [isLoading, set_isLoading] = useState<boolean>(true);
	const [currentSlide, set_currentSlide] = useState<number>(0);
	const [isShowGlow, set_isShowGlow] = useState<boolean>(false);
	const [isModalOpen, set_isModalOpen] = useState<boolean>(false);
	const [modalImage, set_modalImage] = useState<string | null>(null);

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
				set_currentSlide(0); // Reset the carousel to the first slide
				set_isLoading(false);
			} catch (error) {
				console.error('Error fetching image paths:', error);
				set_imagePaths([]);
				set_isLoading(false);
			}
		};

		const folder = `assets/comics/img/${activeTab}`;
		fetchImagePaths(folder);
	}, [activeTab]); // Trigger effect on activeTab change


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

	// Open modal with clicked image
	function handleImageClick(imagePath: string): void {
		set_modalImage(imagePath);
		set_isModalOpen(true);
	}

	// Close modal on click
	function handleModalClose(): void {
		set_isModalOpen(false);
		set_modalImage(null);
	}

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
					{/* Add an empty div to the left of the first image */}
					{/*<div className={'w-[10vw] md:w-[5vw]'}></div>*/}

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
										onClick={() => handleImageClick(imagePath)} // Open modal on image click
									/>
								</div>
							</div>
						</div>
					))}

					{/* Add empty divs for proper spacing at the end */}
					{imagePaths.length < 5
						? Array(5 - imagePaths.length).fill(<div className={'w-[50vw] md:w-[20vw]'} />)
						: null}
				</div>
			</div>

			{/* Modal for displaying full-screen image */}
			{isModalOpen && modalImage && (
				<div
					className={'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'}
					onClick={handleModalClose} // Close modal on click
				>
					<div className={'relative p-4'}> {/* Added padding for the margin around the image */}
						<Image
							src={`/${modalImage}`}
							alt={'Full screen image'}
							width={1200}
							height={1846}
							loading={'eager'}
							style={{ objectFit: 'contain', maxHeight: 'calc(100vh - 80px)', maxWidth: '100%' }}
						/>
					</div>
				</div>
			)}

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
