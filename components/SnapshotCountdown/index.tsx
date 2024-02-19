import Countdown from './Countdown'

export default function SnapshotCountdown({ className }: { className?: string }) {
  const deadline = new Date('2024-04-01T00:00:00')
  return <div className={`w-full flex items-center justify-between ${className}`}>
    <div>
      <h1 className="text-2xl font-bold">Snapshot Countdown</h1>
      <p className="text-sm">The snapshot for physical comics takes place on {deadline.toDateString()}.</p>
    </div>
    <Countdown deadline={deadline} className="mx-6" />
  </div>
}
