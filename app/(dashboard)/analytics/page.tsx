import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { SERVICES } from "@/lib/data";

const popularity = [
  { id: "s1", pct: 92 },
  { id: "s3", pct: 74 },
  { id: "s2", pct: 61 },
  { id: "s4", pct: 48 },
  { id: "s5", pct: 35 },
];

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" subtitle="Performance across the last 30 days" />

      <div className="space-y-5 px-6 pb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon="Dollar" label="Revenue (30d)" value="£14,280" delta="+18%" tone="#6CC289" />
          <StatCard icon="Calendar" label="Appointments" value="486" delta="+9%" tone="#FF6B5B" />
          <StatCard icon="Activity" label="Avg occupancy" value="73%" delta="+5%" tone="#4A9FBF" />
          <StatCard icon="Heart" label="Rebook rate" value="68%" delta="+3%" tone="#E8B86A" />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="card p-5">
            <h2 className="text-lg font-extrabold text-ink">Most booked services</h2>
            <div className="mt-4 space-y-3">
              {popularity.map((p) => {
                const svc = SERVICES.find((s) => s.id === p.id)!;
                return (
                  <div key={p.id}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-semibold text-ink">{svc.name}</span>
                      <span className="text-muted">{p.pct}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: "var(--primary)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-lg font-extrabold text-ink">Bookings by channel</h2>
            <div className="mt-6 flex items-center justify-center gap-8">
              <Donut />
              <ul className="space-y-2 text-sm">
                <Legend color="#FF6B5B" label="Online" value="54%" />
                <Legend color="#4A9FBF" label="Walk-in" value="28%" />
                <Legend color="#6CC289" label="Phone" value="12%" />
                <Legend color="#E8B86A" label="Other" value="6%" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full" style={{ background: color }} />
      <span className="font-semibold text-ink">{label}</span>
      <span className="text-muted">{value}</span>
    </li>
  );
}

function Donut() {
  // simple conic-gradient donut
  const bg = "conic-gradient(#FF6B5B 0 54%, #4A9FBF 54% 82%, #6CC289 82% 94%, #E8B86A 94% 100%)";
  return (
    <div className="relative h-36 w-36 rounded-full" style={{ background: bg }}>
      <div className="absolute inset-[22%] grid place-items-center rounded-full bg-surface">
        <span className="text-2xl font-extrabold text-ink">486</span>
      </div>
    </div>
  );
}
