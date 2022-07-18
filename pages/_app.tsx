import React, {ReactElement, ReactNode} 						from 	'react';		
import	Head						from	'next/head';
import	Image						from	'next/image';
import	{DefaultSeo}				from	'next-seo';
import	{AnimateSharedLayout, AnimatePresence}	from	'framer-motion';
import	{Dialog, Transition}		from	'@headlessui/react';
import	{AudioContextApp}			from	'../contexts/useAudio';
import	Header						from	'../components/Header';

import	'style/Default.scss';
import {AppProps} from 'next/app';

const WithSplash = React.memo(function WithSplash({children}: {children: ReactNode}): ReactElement {
	const	[hasOpacity, set_hasOpacity] = React.useState(true);
	const	[shouldDisplay, set_shouldDisplay] = React.useState(true);
	const	[shouldDisplayVideo] = React.useState(true);

	return (
		<>
			<Transition appear show={shouldDisplay} as={React.Fragment}>
				<Dialog
					as={'div'}
					className={'fixed inset-0 z-20'}
					onClose={(): void => set_shouldDisplay(false)}>
					<div className={`absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${hasOpacity ? 'opacity-100' : 'opacity-0'} ${!shouldDisplay ? 'hidden' : ''}`}>
						<div className={'flex relative justify-center items-center mx-auto w-full h-full'}>
							<div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${shouldDisplayVideo ? 'opacity-100' : 'opacity-0'}`}>
								<Image
									src={'/splash.gif'}
									loading={'eager'}
									width={640}
									height={360} />
							</div>
							<div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${!shouldDisplayVideo ? 'opacity-100' : 'opacity-100'}`}>
								<div className={'mt-[360px]'}>
									<button
										onClick={(): void => {
											set_hasOpacity(false);
											setTimeout((): void => set_shouldDisplay(false), 1000);
										}}
										className={'font-scope bg-beige button-glowing'}>
										{'ENTER'}
										<div className={'absolute -inset-0 rounded-full rotate-180 glow'} />
										<div className={'absolute -inset-0 rounded-full rotate-180 glow'} />
									</button>
								</div>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition>
			<div
				className={`transition-opacity duration-1000 ${hasOpacity ? 'pointer-events-none h-screen overflow-hidden' : ''}`}
				style={{opacity: hasOpacity ? 0 : 1}}>
				{children}
			</div>
		</>
	);
});

function	AppMeta(): ReactElement {
	return (
		<>
			<Head>
				<title>{'YFU Temple'}</title>
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={'YFU Temple'} />
				<meta charSet={'utf-8'} />

				{/* FAVICONS */}
				<link rel={'apple-touch-icon'} sizes={'180x180'} href={'/favicons/apple-touch-icon.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'192x192'}  href={'/favicons/android-chrome-192x192.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'512x512'}  href={'/favicons/android-chrome-512x512.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/favicons/favicon-32x32.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/favicons/favicon-16x16.png'} />
				<link rel={'manifest'} href={'/favicons/site.webmanifest'} />
				<meta name={'msapplication-TileColor'} content={'#ffffff'} />
				<meta name={'theme-color'} content={'#ffffff'} />

				{/* ROBOTS */}
				<meta name={'robots'} content={'index,nofollow'} />
				<meta name={'googlebot'} content={'index,nofollow'} />
			</Head>
			<DefaultSeo
				title={'YFU Temple'}
				defaultTitle={'YFU Temple'}
				description={'YFU Temple'}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: process.env.WEBSITE_URI,
					site_name: 'YFU Temple',
					title: 'YFU Temple',
					description: 'YFU Temple',
					images: [
						{
							url: `${process.env.WEBSITE_URI}og.jpg`,
							width: 1200,
							height: 675,
							alt: 'Yearn'
						}
					]
				}}
				twitter={{
					handle: '@iearnfinance',
					site: '@iearnfinance',
					cardType: 'summary_large_image'
				}} />
		</>
	);
}

function	AppWrapper(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	function handleExitComplete(): void {
		if (typeof window !== 'undefined') {
			window.scrollTo({top: 0});
		}
	}

	return (
		<>
			<AppMeta />
			<WithSplash>
				<Header />
				<div className={'overflow-x-hidden z-10 pt-24 md:pt-16'}>
					<AnimateSharedLayout>
						<AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
							<Component
								key={router.route}
								router={props.router}
								{...pageProps} />
						</AnimatePresence>
					</AnimateSharedLayout>
				</div>
			</WithSplash>
			<div className={'fixed inset-0 -z-10'}>
				<video playsInline autoPlay muted loop poster={'/bg.jpg'} className={'object-cover w-full h-full'}>
					<source src={'/bglow.webm'} type={'video/webm'} />
				</video>
			</div>
		</>
	);
}

function	MyApp(props: AppProps): ReactElement {
	const	{Component, pageProps} = props;
	
	return (
		<AudioContextApp>
			<AppWrapper
				Component={Component}
				pageProps={pageProps}
				router={props.router} />
		</AudioContextApp>
	);
}

export default MyApp;
