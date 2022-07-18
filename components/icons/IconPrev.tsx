import	React							from	'react';

function	Icon({width = '16', height = '16', ...props}): React.ReactElement {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} {...props} width={width} height={height} viewBox={'0 0 512 512'}>
			<path d={'M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z'} fill={'currentcolor'}/>
		</svg>
	);
}

export default Icon;
