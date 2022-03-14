/* eslint-disable tailwindcss/no-custom-classname */
import	React					from	'react';
import	dynamic					from	'next/dynamic';
import	Image					from	'next/image';
import	TRIBUTES				from	'utils/tributes.json';

function	TributeElement({tribute, isMobile, hasInfo, set_hasInfo}) {
	return (
		<div className={'select-none'}>
			<div className={'carousel-slider-animate-opacity'}>
				<Image
					className={'cursor-pointer'}
					objectFit={'contain'}
					onClick={(e) => {
						if (e.target.parentElement?.parentElement?.parentElement?.parentElement?.style?.opacity === '1') {
							window.open(tribute.src);
						}
					}}
					src={tribute.src}
					loading={'eager'}
					width={isMobile ? 360 : 500}
					height={isMobile ? 460 : 761} />
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
	);
}

export default function TributeSlider({id, hasInfo, set_hasInfo}) {
	const	[withWindow, set_withWindow] = React.useState(false);
	const	Coverflow = React.useRef(<div />);


	React.useLayoutEffect(() => {
		Coverflow.current = dynamic(() => import('react-coverflow'));
		set_withWindow(true);
	}, []);

	if (!withWindow) {
		return null;
	}

	function	renderDesktop() {
		return (
			<Coverflow.current
				width={'1200'}
				height={'700'}
				displayQuantityOfSide={2}
				enableHeading={false}
				currentFigureScale={1.2}
				otherFigureScale={0.6}
				infiniteScroll={true}>
				{
					TRIBUTES.filter(t => t.category === id).map((tribute, index) => (
						<TributeElement
							key={index}
							hasInfo={hasInfo}
							set_hasInfo={set_hasInfo}
							tribute={tribute} />
					))
				}
			</Coverflow.current>
		);
	}
	function	renderMobile() {
		return (
			<Coverflow.current
				width={'375'}
				height={'388'}
				displayQuantityOfSide={0.5}
				enableHeading={false}
				currentFigureScale={1.2}
				otherFigureScale={0.6}
				infiniteScroll={true}
			>
				{
					TRIBUTES.filter(t => t.category === id).map((tribute, index) => (
						<TributeElement
							key={index}
							hasInfo={hasInfo}
							set_hasInfo={set_hasInfo}
							tribute={tribute}
							isMobile />
					))
				}
			</Coverflow.current>
		);
	}

	return (
		<div className={'w-full h-screen'}>
			<div className={'block w-full h-full md:hidden'}>{renderMobile()}</div>
			<div className={'hidden md:block'}>{renderDesktop()}</div>
		</div>
	);
}
