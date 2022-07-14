import	React							from	'react';

function	Icon({width = '12.387', height = '14.573', ...props}) {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} {...props} width={width} height={height} viewBox={'0 0 12.387 14.573'}>
			<path
				d={'M7.287,0l7.287,12.387H0Z'}
				transform={'translate(12.387) rotate(90)'}
				fill={'currentcolor'}/>
		</svg>
	);
}

export default Icon;
