import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/lib/icons";
import { BARBERS } from "@/lib/data";

const ROLES: Record<string, string> = {
  damian: "Owner · Master Barber",
  jay: "Senior Barber",
  marcus: "Barber",
  tom: "Barber · Apprentice",
};

const RATINGS: Record<string, number> = { damian: 4.9, jay: 4.8, marcus: 4.7, tom: 4.6 };

export default function StaffPage() {
  return (
    <>
      <PageHeader
        title="Staff"
        subtitle={`${BARBERS.length} team members · ${BARBERS.filter((b) => b.working).length} working today`}
        actions={<button className="btn-primary"><Icon.Plus className="h-4 w-4" /> Add staff</button>}
      />

      <div className="grid grid-cols-1 gap-4 px-6 pb-8 sm:grid-cols-2 xl:grid-cols-3">
        {BARBERS.map((b) => (
          <div key={b.id} className="card p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl text-base font-bold text-white" style={{ background: b.color }}>
                {b.initials}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-ink">{b.name}</span>
                  <span className="chip" style={{ background: b.working ? "rgba(108,194,137,.18)" : "rgba(232,184,106,.15)", color: b.working ? "#2F8F4F" : "#B8860B" }}>
                    {b.working ? "Working" : "Off today"}
                  </span>
                </div>
                <div className="text-sm text-muted">{ROLES[b.id]}</div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <Metric label="Rating" value={`${RATINGS[b.id]}★`} />
              <Metric label="This week" value="32" />
              <Metric label="Rebook" value="71%" />
            </div>

            <div className="mt-4 flex gap-2">
              <button className="btn-soft flex-1"><Icon.Calendar className="h-4 w-4" /> Schedule</button>
              <button className="btn-ghost flex-1"><Icon.Settings className="h-4 w-4" /> Edit</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-2 px-2 py-3">
      <div className="text-lg font-extrabold text-ink">{value}</div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}
