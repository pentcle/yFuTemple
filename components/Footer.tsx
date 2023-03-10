import	React							from	'react';

import type {ReactElement} from 'react';

function	Footer({visitors=[]}): ReactElement {
	const	visitorsAsArr = visitors.toString().split('');
	return (
		<footer className={'z-20 mt-12 flex flex-col items-center border-t-2 border-white pb-5 md:mt-20 md:pb-12'}>
			<div className={'my-8 md:my-12'}>
				<div className={'flex flex-row items-center justify-center space-x-1'}>
					{visitorsAsArr.map((e, index): ReactElement => (
						<div key={index} className={'font-chicago flex h-12 w-9 items-center justify-center border-2 border-white bg-black tabular-nums text-white'}>
							{e}
						</div>
					))}
				</div>
			</div>
			<nav className={'font-monument text-yblue flex w-full flex-col items-center justify-center space-y-5 space-x-0 text-lg md:flex-row md:space-y-0 md:space-x-8 md:text-xl'}>
				<p className={'text-shadow transition-all duration-150'}>{'TWITTER'}</p>
				<p className={'text-shadow transition-all duration-150'}>{'DISCORD'}</p>
				<p className={'text-shadow transition-all duration-150'}>{'MEDIUM'}</p>
				<p className={'text-shadow transition-all duration-150'}>{'TELEGRAM'}</p>
				<p className={'text-shadow transition-all duration-150'}>{'THE BLUE PILL'}</p>
			</nav>
		</footer>
	);
}

export default Footer;
