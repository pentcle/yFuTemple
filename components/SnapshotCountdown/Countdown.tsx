'use client';

import {useEffect, useMemo, useState} from 'react';
import {motion} from 'framer-motion';

function Panel({label, display, className}: {label: string, display: string, className?: string}): React.ReactElement {
	return (
		<div className={'flex flex-col items-center justify-center'}>
			<motion.div 
				suppressHydrationWarning={true} 
				key={`${label}-${display}`}
				className={`font-mono text-4xl ${className}`}
				transition={{type: 'spring', stiffness: 2200, damping: 32}}
				initial={{y: 4, opacity: 0}}
				animate={{y: 0, opacity: 1}}
				exit={{y: -4, opacity: 0}}>
				{display}
			</motion.div>
			<div className={'text-xs font-bold opacity-40'}>{label}</div>
		</div>
	);
}

export default function Countdown({deadline, className}: {deadline: Date, className?: string}): React.ReactElement {
	const [now, set_now] = useState(new Date());
	const days = useMemo((): string => Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'), [deadline, now]);
	const hours = useMemo((): string => Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60) % 24).toString().padStart(2, '0'), [deadline, now]);
	const minutes = useMemo((): string => Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60) % 60).toString().padStart(2, '0'), [deadline, now]);
	const seconds = useMemo((): string => Math.floor((deadline.getTime() - now.getTime()) / 1000 % 60).toString().padStart(2, '0'), [deadline, now]);

	useEffect((): () => void => {
		const handle = setInterval((): void => {
			set_now(new Date());
		}, 1000);
		return (): void => clearInterval(handle);
	}, [set_now]);

	return (
		<div className={`flex items-end justify-center gap-4 ${className}`}>
			<Panel label={'d'} display={days} />
			<Panel label={'h'} display={hours} />
			<Panel label={'m'} display={minutes} />
			<Panel 
				label={'s'} 
				display={seconds} 
				className={'text-base'} />
		</div>
	);
}
