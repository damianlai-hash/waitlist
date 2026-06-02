export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 px-6 pb-2 pt-5">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Empire Barbershop</div>
        <h1 className="display-title mt-1 text-4xl text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
