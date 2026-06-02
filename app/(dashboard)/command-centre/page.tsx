import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Icon } from "@/lib/icons";
import { BARBERS, TODAY_BOOKINGS, serviceById, formatTime } from "@/lib/data";

const weekRevenue = [62, 48, 71, 90, 84, 120, 96];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CommandCentrePage() {
  const max = Math.max(...weekRevenue);
  return (
    <>
      <PageHeader
        title="Command Centre"
        subtitle="Tuesday 2 June 2026 · here's how the shop is doing today"
        actions={
          <>
            <button className="btn-ghost"><Icon.Doc className="h-4 w-4" /> Export</button>
            <button className="btn-primary"><Icon.Plus className="h-4 w-4" /> New booking</button>
          </>
        }
      />

      <div className="space-y-5 px-6 pb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon="Dollar" label="Revenue today" value="£612" delta="+12%" tone="#6CC289" />
          <StatCard icon="Calendar" label="Bookings today" value="18" delta="+4" tone="#FF6B5B" />
          <StatCard icon="Users" label="New clients" value="3" delta="+1" tone="#4A9FBF" />
          <StatCard icon="Heart" label="Retention" value="78%" delta="-2%" tone="#E8B86A" />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Revenue chart */}
          <div className="card p-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-ink">Revenue this week</h2>
              <span className="text-sm font-semibold text-leaf">£571 total</span>
            </div>
            <div className="mt-6 flex h-48 items-end gap-3">
              {weekRevenue.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full items-end justify-center" style={{ height: "100%" }}>
                    <div
                      className="w-full rounded-t-lg transition-all"
                      style={{ height: `${(v / max) * 100}%`, background: i === 5 ? "var(--primary)" : "rgba(255,107,91,.3)" }}
                      title={`£${v}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team today */}
          <div className="card p-5">
            <h2 className="text-lg font-extrabold text-ink">Team today</h2>
            <div className="mt-4 space-y-3">
              {BARBERS.map((b) => (
                <div key={b.id} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg text-xs font-bold text-white" style={{ background: b.color }}>
                    {b.initials}
                  </span>
                  <span className="font-semibold text-ink">{b.name}</span>
                  <span className="ml-auto text-sm text-muted">
                    {b.working ? `${TODAY_BOOKINGS.filter((x) => x.barberId === b.id).length} booked` : "Off"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming */}
        <div className="card p-5">
          <h2 className="text-lg font-extrabold text-ink">Next appointments</h2>
          <div className="mt-4 divide-y divide-border">
            {TODAY_BOOKINGS.map((bk) => {
              const svc = serviceById(bk.serviceId);
              const barber = BARBERS.find((b) => b.id === bk.barberId);
              return (
                <div key={bk.id} className="flex items-center gap-4 py-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-xs font-bold text-ink">
                    {formatTime(bk.start)}
                  </span>
                  <div>
                    <div className="font-semibold text-ink">{bk.clientName}</div>
                    <div className="text-sm text-muted">{svc?.name} · {svc?.durationMin}m with {barber?.name}</div>
                  </div>
                  <span className="ml-auto chip text-leaf" style={{ background: "rgba(108,194,137,.15)" }}>
                    {bk.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
