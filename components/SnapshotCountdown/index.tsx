import Countdown from './Countdown';

export default function SnapshotCountdown({className}: {className?: string}): React.ReactElement {
	const deadline = new Date(process.env.SNAPSHOT ?? Date.now());
	return (
		<div className={`flex w-full items-center justify-between ${className}`}>
			<div>
				<h1 className={'text-2xl font-bold'}>{'Snapshot Countdown'}</h1>
				<p className={'text-sm'} suppressHydrationWarning>{`The snapshot for physical comics takes place on ${deadline.toDateString()}.`}</p>
			</div>
			<Countdown deadline={deadline} className={'mx-6'} />
		</div>
	);
}
