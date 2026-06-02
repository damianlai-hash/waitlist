import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/lib/icons";
import { SERVICES } from "@/lib/data";

export default function ServicesPage() {
  const categories = Array.from(new Set(SERVICES.map((s) => s.category)));

  return (
    <>
      <PageHeader
        title="Services"
        subtitle={`${SERVICES.length} services across ${categories.length} categories`}
        actions={<button className="btn-primary"><Icon.Plus className="h-4 w-4" /> Add service</button>}
      />

      <div className="space-y-6 px-6 pb-8">
        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">{cat}</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {SERVICES.filter((s) => s.category === cat).map((s) => (
                <div key={s.id} className="card flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: "rgba(255,107,91,.12)", color: "var(--primary)" }}>
                      <Icon.Scissors className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-bold text-ink">{s.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted">
                        <Icon.Clock className="h-3.5 w-3.5" /> {s.durationMin} min
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-ink">£{s.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
