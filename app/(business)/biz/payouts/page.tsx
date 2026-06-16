import { Icon } from "@/lib/icons";
import { PAYOUTS } from "@/lib/business";
import { BizBar } from "@/components/business/BizBar";

export default function BizPayouts() {
  return (
    <>
      <BizBar title="Payments & payouts" subtitle="Empire Barbershop" back />

      <div className="px-4 pb-6 pt-4">
        {/* Available balance */}
        <div className="relative overflow-hidden rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #C53A28, #E0492F)" }}>
          <div className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(circle at 85% 15%, #fff, transparent 45%)" }} />
          <div className="relative">
            <div className="text-xs font-semibold uppercase tracking-wide text-white/80">Available balance</div>
            <div className="mt-1 text-4xl font-extrabold">£{PAYOUTS.available.toLocaleString()}</div>
            <div className="mt-1 text-sm text-white/85">Next payout · {PAYOUTS.nextDate}</div>
            <button className="btn mt-4 bg-white px-4 py-2 text-sm font-bold text-coral">Pay out now</button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="card p-4">
            <div className="text-2xl font-extrabold text-ink">£{PAYOUTS.thisMonth.toLocaleString()}</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">Paid this month</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-extrabold text-ink">{PAYOUTS.history.length}</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">Recent payouts</div>
          </div>
        </div>

        <h2 className="mb-2 mt-5 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Payout history</h2>
        <div className="card divide-y divide-border overflow-hidden">
          {PAYOUTS.history.map((p) => (
            <div key={p.id} className="flex items-center gap-3 px-4 py-3.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-leaf/15 text-leaf">
                <Icon.Check className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="text-sm font-bold text-ink">£{p.amount.toLocaleString()}</div>
                <div className="text-xs text-muted">{p.date}</div>
              </div>
              <span className="chip bg-surface-2 px-2 py-0.5 text-[10px] text-muted">{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
