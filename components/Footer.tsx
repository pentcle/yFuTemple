import	React							from	'react';

import type {ReactElement} from 'react';

function	Footer({visitors=[]}): ReactElement {
	const	visitorsAsArr = visitors.toString().split('');
	return (
		<footer className={'z-20 mt-12 flex flex-col items-center border-t-2 border-white pb-5 md:mt-20 md:pb-12'}>
			<div className={'my-8 md:my-12'}>
				<div className={'flex flex-row items-center justify-center space-x-1'}>
					{visitorsAsArr.map((e, index): ReactElement => (
						<div key={index} className={'flex h-12 w-9 items-center justify-center border-2 border-white bg-black font-chicago tabular-nums text-white'}>
							{e}
						</div>
					))}
				</div>
			</div>
			<nav className={'flex w-full flex-col items-center justify-center space-y-5 space-x-0 font-monument text-lg text-yblue md:flex-row md:space-y-0 md:space-x-8 md:text-xl'}>
				<p className={'text-shadow transition-all duration-150'}><a href={'https://twitter.com/yearnfi'} target={'_blank'}>{'TWITTER'}</a></p>
				<p className={'text-shadow transition-all duration-150'}><a href={'https://discord.com/invite/yearn'} target={'_blank'}>{'DISCORD'}</a></p>
				<p className={'text-shadow transition-all duration-150'}><a href={'http://blog.yearn.finance'} target={'_blank'}>{'MEDIUM'}</a></p>
				<p className={'text-shadow transition-all duration-150'}><a href={'https://t.me/yearnfinance'} target={'_blank'}>{'TELEGRAM'}</a></p>
				<p className={'text-shadow transition-all duration-150'}><a href={'https://yfistory.org'} target={'_blank'}>{'THE BLUE PILL'}</a></p>
			</nav>
		</footer>
	);
}

export default Footer;
