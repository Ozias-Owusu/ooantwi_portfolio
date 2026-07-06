import { cn } from '@/lib/utils'

type MockupVariant =
  | 'frankates-marketplace'
  | 'timetrakker-logistics'
  | 'crm-consumer'
  | 'churchos'
  | string

interface DeviceMockupProps {
  variant: MockupVariant
  className?: string
  type?: 'phone' | 'browser'
}

function FrankatesUI() {
  return (
    <div className="flex h-full flex-col bg-emerald-950/40 p-3">
      <div className="mb-2 flex items-center justify-between rounded-lg bg-emerald-800/50 px-2 py-1">
        <span className="text-[10px] font-semibold text-emerald-200">Frankates</span>
        <span className="rounded bg-emerald-500/30 px-1 text-[8px] text-emerald-100">Live</span>
      </div>
      <div className="mb-2 grid grid-cols-2 gap-1">
        {['Tomatoes', 'Plantain', 'Rice', 'Oil'].map((item) => (
          <div key={item} className="rounded-md bg-emerald-900/60 p-1.5">
            <div className="mb-1 h-6 rounded bg-emerald-700/50" />
            <p className="text-[7px] text-emerald-100">{item}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto h-12 rounded-lg bg-emerald-800/30 p-1">
        <div className="h-full rounded bg-emerald-600/20" />
        <p className="mt-0.5 text-center text-[6px] text-emerald-300">Delivery map</p>
      </div>
    </div>
  )
}

function TimeTrakkerUI() {
  return (
    <div className="flex h-full flex-col bg-blue-950/40 p-3">
      <div className="mb-2 text-[10px] font-semibold text-blue-200">Shift Active</div>
      <div className="mb-2 rounded-lg bg-blue-900/50 p-2">
        <div className="mb-1 h-8 w-8 rounded-full bg-blue-600/40 mx-auto" />
        <p className="text-center text-[7px] text-blue-200">Face verified</p>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between rounded bg-blue-900/40 px-2 py-1 text-[7px] text-blue-100">
          <span>Trip #2847</span>
          <span className="text-blue-300">En route</span>
        </div>
        <div className="h-10 rounded bg-blue-800/30" />
      </div>
    </div>
  )
}

function CrmUI() {
  return (
    <div className="flex h-full flex-col bg-violet-950/40 p-3">
      <div className="mb-2 text-[10px] font-semibold text-violet-200">Virtual Card</div>
      <div className="mb-2 rounded-xl bg-gradient-to-br from-violet-600/60 to-purple-800/60 p-2">
        <p className="text-[8px] text-violet-100">TAXPAYER ID</p>
        <p className="font-mono text-[10px] text-white">GHA-****-4821</p>
      </div>
      <div className="mx-auto h-14 w-14 rounded-lg bg-white/90 p-1">
        <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-px bg-violet-900">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={i % 2 === 0 ? 'bg-violet-900' : 'bg-white'} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ChurchOSUI() {
  return (
    <div className="flex h-full flex-col bg-amber-950/30 p-3">
      <div className="mb-2 text-[10px] font-semibold text-amber-200">Sunday Service</div>
      <div className="mb-2 rounded-lg bg-amber-900/40 p-2">
        <p className="text-[8px] text-amber-100">Attendance</p>
        <p className="text-lg font-bold text-amber-300">247</p>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="rounded bg-amber-900/30 p-1.5 text-center">
          <p className="text-[7px] text-amber-200">Giving</p>
          <p className="text-[9px] font-semibold text-amber-100">₵1,240</p>
        </div>
        <div className="rounded bg-amber-900/30 p-1.5 text-center">
          <p className="text-[7px] text-amber-200">Events</p>
          <p className="text-[9px] font-semibold text-amber-100">3</p>
        </div>
      </div>
    </div>
  )
}

function GenericUI({ color }: { color: string }) {
  return (
    <div className="flex h-full flex-col p-3" style={{ background: `${color}15` }}>
      <div className="mb-2 h-3 w-16 rounded" style={{ background: `${color}40` }} />
      <div className="mb-2 grid grid-cols-2 gap-1">
        <div className="h-8 rounded" style={{ background: `${color}25` }} />
        <div className="h-8 rounded" style={{ background: `${color}25` }} />
      </div>
      <div className="mt-auto h-10 rounded" style={{ background: `${color}20` }} />
    </div>
  )
}

function getUI(variant: string) {
  switch (variant) {
    case 'frankates-marketplace':
      return <FrankatesUI />
    case 'timetrakker-logistics':
      return <TimeTrakkerUI />
    case 'crm-consumer':
      return <CrmUI />
    case 'churchos':
      return <ChurchOSUI />
    default:
      return <GenericUI color="#14b8a6" />
  }
}

export default function DeviceMockup({
  variant,
  className,
  type = 'browser',
}: DeviceMockupProps) {
  if (type === 'phone') {
    return (
      <div className={cn('flex items-center justify-center p-4', className)}>
        <div className="w-[140px] overflow-hidden rounded-[1.5rem] border-4 border-[var(--border)] bg-[var(--bg-elevated)] shadow-xl">
          <div className="h-4 bg-[var(--bg-card)]" />
          <div className="aspect-[9/16] overflow-hidden">{getUI(variant)}</div>
          <div className="h-3 bg-[var(--bg-card)]" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('overflow-hidden', className)}>
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-400/70" />
        <div className="h-2 w-2 rounded-full bg-amber-400/70" />
        <div className="h-2 w-2 rounded-full bg-emerald-400/70" />
      </div>
      <div className="aspect-[16/10] overflow-hidden">{getUI(variant)}</div>
    </div>
  )
}
