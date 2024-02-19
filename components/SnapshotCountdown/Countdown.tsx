'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

function Panel({ label, display, className }: { label: string, display: string, className?: string }) {
  return <div className="flex flex-col items-center justify-center">
    <motion.div suppressHydrationWarning={true} key={`${label}-${display}`}
      className={`font-mono text-4xl ${className}`}
      transition={{ type: 'spring', stiffness: 2200, damping: 32 }}
      initial={{ y: 4, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -4, opacity: 0 }}>
      {display}
    </motion.div>
    <div className="text-xs font-bold opacity-40">{label}</div>
  </div>
}

export default function Countdown({ deadline, className }: { deadline: Date, className?: string }) {
  const [now, setNow] = useState(new Date())
  const days = useMemo(() => Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'), [now])
  const hours = useMemo(() => Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60) % 24).toString().padStart(2, '0'), [now])
  const minutes = useMemo(() => Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60) % 60).toString().padStart(2, '0'), [now])
  const seconds = useMemo(() => Math.floor((deadline.getTime() - now.getTime()) / 1000 % 60).toString().padStart(2, '0'), [now])

  useEffect(() => {
    const handle = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(handle)
  }, [setNow])

  return <div className={`flex items-end justify-center gap-4 ${className}`}>
    <Panel label="d" display={days}></Panel>
    <Panel label="h" display={hours}></Panel>
    <Panel label="m" display={minutes}></Panel>
    <Panel label="s" display={seconds} className="text-base"></Panel>
  </div>
}
