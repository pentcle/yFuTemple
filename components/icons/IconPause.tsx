import	React							from	'react';

function	Icon({width = '16', height = '16', ...props}): React.ReactElement {
	return (
		<svg
			xmlns={'http://www.w3.org/2000/svg'}
			{...props}
			width={width}
			height={height}
			viewBox={'0 0 320 512'}>
			<path d={'M272 63.1c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48s48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM48 63.1c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448S96 426.5 96 400v-288C96 85.49 74.51 63.1 48 63.1z'} fill={'currentcolor'}/>
		</svg>
	);
}

export default Icon;
