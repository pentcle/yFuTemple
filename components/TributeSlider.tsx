import React, {useState} from 'react';
import Image from 'next/image';

import {parseMarkdown} from '../utils/parseMarkdown';

import type {ReactElement} from 'react';
import type {TYFUDataMedia} from '../utils/data';

type TTributeElement = {
	tribute: TYFUDataMedia,
	className: string,
	hasInfo: TYFUDataMedia|boolean,
	onClick: () => void,
	onImageClick: () => void,
	set_hasInfo: React.Dispatch<React.SetStateAction<TYFUDataMedia|boolean>>
}

function	TributeElement({
	tribute, className, hasInfo, set_hasInfo, onClick, onImageClick
}: TTributeElement): ReactElement {
	return (
		<div
			onClick={onClick}
			className={`w-[50vw] md:w-[20vw] ${className}`}>
			<div className={'figure select-none'}>
				<div className={'carousel-slider-animate-opacity'}>
					<Image
						alt={''}
						onClick={onImageClick}
						className={'cursor-pointer'}
						objectFit={'contain'}
						src={tribute.src}
						loading={'eager'}
						width={500}
						height={761} />
					<div className={'slide-content mx-auto text-left text-white'}>
						<h2
							className={'select-text'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(tribute?.title || '')}} />
						<p
							onClick={(): void => {
								set_hasInfo((i: any): (TYFUDataMedia | boolean) => i?.title === tribute.title ? false : tribute);
							}}
							className={'font-scope cursor-pointer'}>
							{(hasInfo as TYFUDataMedia)?.title === tribute.title ? 'CLOSE' : 'INFO +'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
type TTributeSlider = {
	medias: TYFUDataMedia[],
	hasInfo: TYFUDataMedia|boolean,
	set_hasInfo: React.Dispatch<React.SetStateAction<TYFUDataMedia|boolean>>
}
export default function TributeSlider({medias, hasInfo, set_hasInfo}: TTributeSlider): ReactElement {
	const	[currentSlide, set_currentSlide] = useState(0);

	function	handleScroll(e: React.UIEvent): void {
		const	viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		const	vw = viewport / 100;
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

	return (
		<div
			id={'tribute-slider'}
			className={'horizontal-snap scrollbar-none w-screen gap-0 scroll-smooth px-20 md:px-[40vw]'}
			onScroll={handleScroll}>
			{
				medias.map((tribute: TYFUDataMedia, index: number): ReactElement => (
					<TributeElement
						key={index}
						className={currentSlide > index ? 'horizontal-snap-on-left' : currentSlide < index ? 'horizontal-snap-on-right' : 'horizontal-snap-center'}
						onImageClick={(): void => {
							if (currentSlide === index) {
								window.open(tribute.src.replace('assetsThumbnail', 'assets'), '_blank');
							} else {
								set_currentSlide(index);
								const	viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
								const	vw = viewport / 100;
								if (viewport > 768 && document.getElementById('tribute-slider')?.scrollLeft) {
									(document.getElementById('tribute-slider') as any).scrollLeft = index * 20 * vw;
								} else {
									(document.getElementById('tribute-slider') as any).scrollLeft = index * 50 * vw - 80;
								}
							}

						}}
						onClick={(): void => {
							if (currentSlide !== index) {
								set_currentSlide(index);
								const	viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
								const	vw = viewport / 100;
								if (viewport > 768 && document.getElementById('tribute-slider')?.scrollLeft) {
									(document.getElementById('tribute-slider') as any).scrollLeft = index * 20 * vw;
								} else {
									(document.getElementById('tribute-slider') as any).scrollLeft = index * 50 * vw - 80;
								}
							}
						}}
						data-action={tribute.src}
						hasInfo={hasInfo}
						set_hasInfo={set_hasInfo}
						tribute={tribute} />
				))
			}
			{medias.length < 1 ? <div className={'w-[50vw] md:w-[20vw]'} /> : null}
			{medias.length < 2 ? <div className={'w-[50vw] md:w-[20vw]'} /> : null}
			{medias.length < 3 ? <div className={'w-[50vw] md:w-[20vw]'} /> : null}
			{medias.length < 4 ? <div className={'w-[50vw] md:w-[20vw]'} /> : null}
			{medias.length < 5 ? <div className={'hidden w-[50vw] md:block md:w-[20vw]'} /> : null}
		</div>
	);
}
