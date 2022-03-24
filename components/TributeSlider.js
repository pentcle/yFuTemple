/* eslint-disable tailwindcss/no-custom-classname */
import	React					from	'react';
import	Image					from	'next/image';
import	TRIBUTES				from	'utils/tributes.json';

function	TributeElement({tribute, className, hasInfo, set_hasInfo, onClick, onImageClick}) {
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
						<h2 className={'select-text'}>{tribute.title}</h2>
						<p
							onClick={() => set_hasInfo(i => i?.id === tribute.id ? false : tribute)}
							className={'font-scope cursor-pointer'}>
							{hasInfo?.id === tribute.id ? 'CLOSE' : 'INFO +'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function TributeSlider({id, hasInfo, set_hasInfo}) {
	const	[currentSlide, set_currentSlide] = React.useState(0);


	function	handleScroll(e) {
		const	viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		const	vw = viewport / 100;
		if (viewport > 768) {
			const slide = Math.floor((e.target.scrollLeft) / (20 * vw));
			if (slide !== currentSlide)
				set_currentSlide(slide);
		} else {
			const slide = Math.floor((e.target.scrollLeft + 80) / (50 * vw));
			if (slide !== currentSlide)
				set_currentSlide(slide);
		}
	}

	const	tributeList = TRIBUTES.filter(t => t.category === id);
	return (
		<div
			id={'tribute-slider'}
			className={'gap-0 px-20 w-screen scroll-smooth md:px-[40vw] horizontal-snap scrollbar-none'}
			onScroll={handleScroll}>
			{
				tributeList.map((tribute, index) => (
					<TributeElement
						key={index}
						className={currentSlide > index ? 'horizontal-snap-on-left' : currentSlide < index ? 'horizontal-snap-on-right' : 'horizontal-snap-center'}
						onImageClick={() => {
							if (currentSlide === index) {
								window.open(tribute.src, '_blank');
							} else {
								set_currentSlide(index);
								const	viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
								const	vw = viewport / 100;
								if (viewport > 768) {
									document.getElementById('tribute-slider').scrollLeft = index * 20 * vw;
								}
								else {
									document.getElementById('tribute-slider').scrollLeft = index * 50 * vw - 80;
								}
							}

						}}
						onClick={() => {
							if (currentSlide !== index) {
								set_currentSlide(index);
								const	viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
								const	vw = viewport / 100;
								if (viewport > 768) {
									document.getElementById('tribute-slider').scrollLeft = index * 20 * vw;
								}
								else {
									document.getElementById('tribute-slider').scrollLeft = index * 50 * vw - 80;
								}
							}
						}}
						data-action={tribute.src}
						hasInfo={hasInfo}
						set_hasInfo={set_hasInfo}
						tribute={tribute}
						isMobile />
				))
			}
			{tributeList.length < 1 ? <div className={'w-[50vw] md:w-[20vw]'} /> : null}
			{tributeList.length < 2 ? <div className={'w-[50vw] md:w-[20vw]'} /> : null}
			{tributeList.length < 3 ? <div className={'w-[50vw] md:w-[20vw]'} /> : null}
			{tributeList.length < 4 ? <div className={'w-[50vw] md:w-[20vw]'} /> : null}
			{tributeList.length < 5 ? <div className={'hidden w-[50vw] md:block md:w-[20vw]'} /> : null}
		</div>
	);
}
