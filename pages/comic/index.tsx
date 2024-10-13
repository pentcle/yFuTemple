'use client';
import React, {useEffect, useState} from 'react';

import {CarouselComponent} from './CarouselComponent';
import {loadAllImagePaths} from './utils/loadImages';

import styles from './Carousel.module.css';

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

export default function CarouselPage(): React.ReactElement {
	const [activeTab, set_activeTab] = useState<string>('techne'); // Typed activeTab as string
	const [imagePaths, set_imagePaths] = useState<{ [key: string]: string[] }>({}); // Typed imagePaths as an object with string arrays
	const [isLoading, set_isLoading] = useState<boolean>(true); // Typed isLoading as boolean
	const [isShowGlow, set_isShowGlow] = useState<boolean>(false); // Typed isShowGlow as boolean

	const tabColors: { [key: string]: string } = {
		techne: 'rgba(219, 241, 247, 0.8)',
		transmission: 'rgba(230, 236, 117, 0.8)',
		community: 'rgba(238, 166, 208, 0.8)',
		dominion: 'rgba(227, 111, 76, 0.8)'
	};

	useEffect(() => {
		const fetchImagePaths = async (): Promise<void> => {
			set_isLoading(true);
			const paths = await loadAllImagePaths();
			set_imagePaths(paths);
			set_isLoading(false);
		};
		fetchImagePaths();
	}, []);

	useEffect(() => {
		set_isShowGlow(true);
		const timeout = setTimeout(() => set_isShowGlow(false), 1000);

		return () => clearTimeout(timeout);
	}, [activeTab]);

	if (isLoading) {
		return <div>{'Loading...'}</div>;
	}

	const tabs = ['techne', 'transmission', 'community', 'dominion'];

	return (
		<article className={'relative flex h-screen flex-col overflow-hidden bg-[#222A30]'}>
			<div
				className={`${styles.backgroundGlow} ${isShowGlow ? styles.glowFadeIn : styles.glowFadeOut}`}
				style={{
					'--glow-color': tabColors[activeTab],
					'--glow-fade-color': tabColors[activeTab].replace('0.8', '0.2')
				} as React.CSSProperties}
			>
			</div>
			<div className={'relative z-10 flex grow flex-col overflow-hidden p-4 py-8'}>
				<Tabs
					value={activeTab}
					onValueChange={set_activeTab}
					className={'flex h-full w-full flex-col'}
				>
					<TabsList className={'mb-4 flex w-full shrink-0 justify-center'}>
						{tabs.map((tab) => (
							<TabsTrigger
								key={tab}
								value={tab}
								className={'capitalize'}>
								{tab}
							</TabsTrigger>
						))}
					</TabsList>
					<div className={'relative grow overflow-hidden'}>
						{tabs.map((tab) => (
							<TabsContent
								key={tab}
								value={tab}
								className={`absolute left-0 top-0 h-full w-full ${
									activeTab === tab ? styles.fadeIn : 'pointer-events-none opacity-0'
								}`}
							>
								<CarouselComponent imagePaths={imagePaths[`carousel/img/${tab}`] || []} />
							</TabsContent>
						))}
					</div>
				</Tabs>
			</div>
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
