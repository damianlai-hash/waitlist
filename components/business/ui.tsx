/* Presentational building blocks for the business app (no hooks). */

export function KpiTile({ tone, icon, label, value, delta }: { tone: string; icon: React.ReactNode; label: string; value: string; delta?: string }) {
  return (
    <div className="card p-3.5">
      <div className="flex items-center justify-between">
        <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `${tone}20`, color: tone }}>
          {icon}
        </span>
        {delta && <span className="text-[11px] font-bold text-leaf">↑ {delta}</span>}
      </div>
      <div className="mt-2 text-2xl font-extrabold leading-none text-ink">{value}</div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}

export function BizBars({ data, height = 120 }: { data: { day: string; value: number }[]; height?: number }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-stretch gap-2" style={{ height }}>
      {data.map((d) => (
        <div key={d.day} className="flex h-full flex-1 flex-col items-center gap-1.5">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md transition-all"
              style={{ height: `${Math.max(6, (d.value / max) * 100)}%`, background: "var(--primary)" }}
              title={`${d.day}: £${d.value}`}
            />
          </div>
          <span className="text-[10px] font-semibold text-muted">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

export function BarList({ items, format }: { items: { label: string; value: number; sub?: string }[]; format?: (v: number) => string }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div key={it.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-semibold text-ink">{it.label}</span>
            <span className="font-bold text-ink">{format ? format(it.value) : it.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full" style={{ width: `${(it.value / max) * 100}%`, background: "var(--primary)" }} />
          </div>
          {it.sub && <div className="mt-0.5 text-[11px] text-muted">{it.sub}</div>}
        </div>
      ))}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-2 mt-5 flex items-center justify-between px-4">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{children}</h2>
      {action}
    </div>
  );
}
