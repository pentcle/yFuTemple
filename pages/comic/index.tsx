'use client';
import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useDebounce} from 'use-debounce';

import styles from './Carousel.module.css';

export default function CarouselPage(): React.ReactElement {
	const [activeTab, set_activeTab] = useState<string>('techne');
	const [imagePaths, set_imagePaths] = useState<string[]>([]); // Correct function name
	const [isLoading, set_isLoading] = useState<boolean>(true);
	const [isShowGlow, set_isShowGlow] = useState<boolean>(false);

	// Debounce activeTab to prevent excessive API calls
	const [debouncedTab] = useDebounce(activeTab, 300);

	const tabColors: { [key: string]: string } = {
		techne: 'rgba(219, 241, 247, 0.8)',
		transmission: 'rgba(230, 236, 117, 0.8)',
		community: 'rgba(238, 166, 208, 0.8)',
		dominion: 'rgba(227, 111, 76, 0.8)'
	};

	// Fetch image paths based on the debouncedTab
	useEffect((): void => {
		const fetchImagePaths = async (folder: string): Promise<void> => {
			try {
				set_isLoading(true);
				const response = await fetch(`/api/imagePaths?folder=${encodeURIComponent(folder)}`);
				const data = await response.json();
				set_imagePaths(data.imagePaths || []); // Correct function name
				set_isLoading(false);
			} catch (error) {
				console.error('Error fetching image paths:', error);
				set_imagePaths([]); // Fallback to an empty array in case of error
				set_isLoading(false);
			}
		};

		const folder = `assets/comics/img/${debouncedTab}`;
		fetchImagePaths(folder);
	}, [debouncedTab]);

	// Show glow effect when the active tab changes
	useEffect(() => {
		set_isShowGlow(true);
		const timeout = setTimeout(() => set_isShowGlow(false), 1000);
		return () => clearTimeout(timeout);
	}, [activeTab]);

	// Refs to manage visibility
	const refList = useRef<(HTMLElement | null)[]>([]);

	// Manage visibility for images
	const [visibleImages, setVisibleImages] = useState<boolean[]>([]);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const index = Number(entry.target.getAttribute('data-index'));
				setVisibleImages((prev) => {
					const updated = [...prev];
					updated[index] = entry.isIntersecting;
					return updated;
				});
			});
		});

		refList.current.forEach((el) => {
			if (el) {
				observer.observe(el);
			}
		});

		return () => {
			refList.current.forEach((el) => {
				if (el) {
					observer.unobserve(el);
				}
			});
		};
	}, [imagePaths]);

	if (isLoading) {
		return <div>{'Loading...'}</div>;
	}

	const tabs: string[] = ['techne', 'transmission', 'community', 'dominion'];

	// Extend React.CSSProperties to include custom properties for the glow effect
	const glowStyles: React.CSSProperties & { '--glow-color': string; '--glow-fade-color': string } = {
		'--glow-color': tabColors[activeTab],
		'--glow-fade-color': tabColors[activeTab].replace('0.8', '0.2')
	};

	return (
		<article className={'relative flex h-screen flex-col overflow-hidden bg-[#222A30]'}>
			{/* Glow Effect */}
			<div
				className={`${styles.backgroundGlow} ${isShowGlow ? styles.glowFadeIn : styles.glowFadeOut}`}
				style={glowStyles}
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
				>
					{imagePaths.length > 0 ? (
						imagePaths.map((imagePath, index) => (
							<div
								key={index}
								ref={(el) => (refList.current[index] = el)}
								data-index={index}
								className={`horizontal-snap-slide w-[50vw] md:w-[20vw] ${
									visibleImages[index] ? '' : 'opacity-0'
								}`}
							>
								{visibleImages[index] && (
									<div className={'figure select-none'}>
										<div className={'carousel-slider-animate-opacity'}>
											<Image
												alt={`Image ${index + 1}`}
												className={'cursor-pointer'}
												src={`/${imagePath}`}
												width={500}
												height={761}
												objectFit={'contain'}
												loading={'lazy'}
												placeholder={'blur'}
												blurDataURL={'/path-to-small-blur-image'}
											/>
										</div>
									</div>
								)}
							</div>
						))
					) : (
						<p className={'text-white'}>{'No images found for this tab.'}</p>
					)}

					{/* Empty divs for spacing */}
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
