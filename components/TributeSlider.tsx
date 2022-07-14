/* eslint-disable tailwindcss/no-custom-classname */
import	React					from	'react';
import	Image					from	'next/image';
import	{parseMarkdown}			from	'../utils/parseMarkdown';
import { yfuDataMedia } from '../utils/data';

type TributeElement = {
	tribute: yfuDataMedia,
	className: string,
	hasInfo: yfuDataMedia|boolean,
	onClick: () => void,
	onImageClick: () => void,
	// @ts-ignore
	set_hasInfo,
}

function	TributeElement({tribute, className, hasInfo, set_hasInfo, onClick, onImageClick}:TributeElement) {
	return (
		<div
			onClick={onClick}
			className={`w-[50vw] md:w-[20vw] ${className}`}>
			<div className={'select-none figure'}>
				<div className={'carousel-slider-animate-opacity'}>
					<Image
						onClick={onImageClick}
						className={'cursor-pointer'}
						objectFit={'contain'}
						src={tribute.src}
						loading={'eager'}
						width={500}
						height={761} />
					<div className={'mx-auto text-left text-white slide-content'}>
						<h2
							className={'select-text'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(tribute?.title || '')}} />
						<p
							onClick={() => set_hasInfo((i:yfuDataMedia) => i?.title === tribute.title ? false : tribute)}
							className={'font-scope cursor-pointer'}>
							{/*@ts-ignore*/}
							{hasInfo?.title === tribute.title ? 'CLOSE' : 'INFO +'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
type TributeSlider = {
	medias: yfuDataMedia[],
	hasInfo: yfuDataMedia|boolean,
	// @ts-ignore
	set_hasInfo,
}
export default function TributeSlider({medias, hasInfo, set_hasInfo}:TributeSlider) {
	const	[currentSlide, set_currentSlide] = React.useState(0);

	function	handleScroll(e:React.UIEvent) {
		const	viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		const	vw = viewport / 100;
		if (viewport > 768) {
			// @ts-ignore
			const slide = Math.floor((e.target.scrollLeft) / (20 * vw));
			if (slide !== currentSlide)
				set_currentSlide(slide);
		} else {
			// @ts-ignore
			const slide = Math.floor((e.target.scrollLeft + 80) / (50 * vw));
			if (slide !== currentSlide)
				set_currentSlide(slide);
		}
	}

	return (
		<div
			id={'tribute-slider'}
			className={'gap-0 px-20 w-screen scroll-smooth md:px-[40vw] horizontal-snap scrollbar-none'}
			onScroll={handleScroll}>
			{
				medias.map((tribute:yfuDataMedia, index:number) => (
					<TributeElement
						key={index}
						className={currentSlide > index ? 'horizontal-snap-on-left' : currentSlide < index ? 'horizontal-snap-on-right' : 'horizontal-snap-center'}
						onImageClick={() => {
							if (currentSlide === index) {
								window.open(tribute.src.replace('assetsThumbnail', 'assets'), '_blank');
							} else {
								set_currentSlide(index);
								const	viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
								const	vw = viewport / 100;
								if (viewport > 768 && document.getElementById('tribute-slider')?.scrollLeft) {
									// @ts-ignore
									document.getElementById('tribute-slider').scrollLeft = index * 20 * vw;
								}
								else {
									// @ts-ignore
									document.getElementById('tribute-slider').scrollLeft = index * 50 * vw - 80;
								}
							}

						}}
						onClick={() => {
							if (currentSlide !== index) {
								set_currentSlide(index);
								const	viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
								const	vw = viewport / 100;
								if (viewport > 768 && document.getElementById('tribute-slider')?.scrollLeft) {
									// @ts-ignore
									document.getElementById('tribute-slider').scrollLeft = index * 20 * vw;
								}
								else {
									// @ts-ignore
									document.getElementById('tribute-slider').scrollLeft = index * 50 * vw - 80;
								}
							}
						}}
						data-action={tribute.src}
						hasInfo={hasInfo}
						set_hasInfo={set_hasInfo}
						tribute={tribute}
					 />
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
