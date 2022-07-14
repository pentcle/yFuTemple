import	React							from	'react';

function	Footer({visitors=[<div />]}) {
	const	visitorsAsArr = visitors.toString().split('');
	return (
		<footer className={'flex z-20 flex-col items-center pb-5 mt-12 border-t-2 border-white md:pb-12 md:mt-20'}>
			<div className={'my-8 md:my-12'}>
				<div className={'flex flex-row justify-center items-center space-x-1'}>
					{visitorsAsArr.map((e, index) => (
						<div key={index} className={'flex justify-center items-center w-9 h-12 font-chicago tabular-nums text-white bg-black border-2 border-white'}>
							{e}
						</div>
					))}
				</div>
			</div>
			<nav className={'flex flex-col justify-center items-center space-y-5 space-x-0 w-full font-monument text-lg text-yblue md:flex-row md:space-y-0 md:space-x-8 md:text-xl'}>
				<p className={'transition-all duration-150 text-shadow'}>{'TWITTER'}</p>
				<p className={'transition-all duration-150 text-shadow'}>{'DISCORD'}</p>
				<p className={'transition-all duration-150 text-shadow'}>{'MEDIUM'}</p>
				<p className={'transition-all duration-150 text-shadow'}>{'TELEGRAM'}</p>
				<p className={'transition-all duration-150 text-shadow'}>{'THE BLUE PILL'}</p>
			</nav>
		</footer>
	);
}

export default Footer;
