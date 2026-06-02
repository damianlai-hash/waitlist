import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/lib/icons";

const REPORTS = [
  { name: "Daily takings", desc: "Cash, card and tips by day", updated: "Today, 18:02" },
  { name: "Staff commission", desc: "Earnings and commission per barber", updated: "Yesterday" },
  { name: "Client retention", desc: "Rebook and churn cohorts", updated: "1 Jun 2026" },
  { name: "Service mix", desc: "Revenue split by service category", updated: "31 May 2026" },
  { name: "No-shows & cancellations", desc: "Lost slots and recovery rate", updated: "30 May 2026" },
  { name: "VAT summary", desc: "Tax breakdown for the period", updated: "1 Jun 2026" },
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Download and schedule business reports"
        actions={<button className="btn-primary"><Icon.Plus className="h-4 w-4" /> New report</button>}
      />

      <div className="grid grid-cols-1 gap-3 px-6 pb-8 sm:grid-cols-2 xl:grid-cols-3">
        {REPORTS.map((r) => (
          <div key={r.name} className="card flex flex-col p-5">
            <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: "rgba(74,159,191,.14)", color: "#2C7A9E" }}>
              <Icon.Doc className="h-5 w-5" />
            </span>
            <div className="mt-3 font-bold text-ink">{r.name}</div>
            <p className="mt-1 flex-1 text-sm text-muted">{r.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted">Updated {r.updated}</span>
              <button className="btn-soft px-3 py-1.5 text-xs"><Icon.Doc className="h-3.5 w-3.5" /> Export</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
