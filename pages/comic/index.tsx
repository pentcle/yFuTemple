'use client';
import React, {useEffect, useState} from 'react';

// import {CarouselComponent} from './CarouselComponent';
import styles from './Carousel.module.css';

export default function CarouselPage(): React.ReactElement {
	const [activeTab, set_activeTab] = useState<string>('techne');
	const [imagePaths, set_imagePaths] = useState<string[]>([]); // Ensure it's initialized as an empty array
	const [isLoading, set_isLoading] = useState<boolean>(true);
	const [isShowGlow, set_isShowGlow] = useState<boolean>(false);

	const tabColors: { [key: string]: string } = {
		techne: 'rgba(219, 241, 247, 0.8)',
		transmission: 'rgba(230, 236, 117, 0.8)',
		community: 'rgba(238, 166, 208, 0.8)',
		dominion: 'rgba(227, 111, 76, 0.8)'
	};

	// Fetch image paths when the component mounts or when the active tab changes
	useEffect((): void => {
		const fetchImagePaths = async (folder: string): Promise<void> => {
			try {
				const response = await fetch(`/api/imagePaths?folder=${encodeURIComponent(folder)}`);
				const data = await response.json();
				set_imagePaths(data.imagePaths || []); // Ensure that we set an empty array if no data is returned
				set_isLoading(false); // Mark as loaded
			} catch (error) {
				console.error('Error fetching image paths:', error);
				set_imagePaths([]); // Fallback to an empty array in case of error
			}
		};

		const folder = `assets/comics/img/${activeTab}`; // Construct the folder path based on the active tab
		fetchImagePaths(folder);
	}, [activeTab]);


	// Show glow effect when the active tab changes
	useEffect((): () => void => {
		set_isShowGlow(true);
		const timeout = setTimeout(() => set_isShowGlow(false), 1000);

		return (): void => clearTimeout(timeout); // Cleanup the timeout
	}, [activeTab]);

	if (isLoading) {
		return <div>{'Loading...'}</div>;
	}

	const tabs: string[] = ['techne', 'transmission', 'community', 'dominion'];

	// Extending React.CSSProperties to include custom properties
	const glowStyles: React.CSSProperties & { '--glow-color': string; '--glow-fade-color': string } = {
		'--glow-color': tabColors[activeTab],
		'--glow-fade-color': tabColors[activeTab].replace('0.8', '0.2')
	};

	return (
		<article className={'relative flex h-screen flex-col overflow-hidden bg-[#222A30]'}>
			{/* Glow Effect */}
			<div
				className={`${styles.backgroundGlow} ${isShowGlow ? styles.glowFadeIn : styles.glowFadeOut}`}
				style={glowStyles} // Apply the type-annotated style variable
			>
			</div>

			{/* Tab Navigation */}
			<div className={'relative z-10 flex grow flex-col overflow-hidden p-4 py-8'}>
				<div className={'mb-4 flex w-full justify-center'}>
					{tabs.map((tab): React.ReactElement => (
						<button
							key={tab}
							onClick={(): void => set_activeTab(tab)}
							className={`px-4 py-2 capitalize ${activeTab === tab ? 'bg-white text-black' : 'text-white'}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Image Dump */}
				<div className={'relative grow overflow-scroll'}>
					{imagePaths.length > 0 ? (
						imagePaths.map((imagePath, index) => (
							<img
								key={index}
								src={`/${imagePath}`}
								alt={`Image ${index + 1}`}
								className={'mb-4 h-auto max-w-full'}
							/>
						))
					) : (
						<p className={'text-white'}>{'No images found for this tab.'}</p>
					)}
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
