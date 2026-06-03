"use client";

import { Icon } from "@/lib/icons";
import { SERVICES } from "@/lib/data";
import { AppBar } from "@/components/mobile/AppBar";

const CATEGORY_TONE: Record<string, string> = {
  Cuts: "#FF6B5B",
  Beard: "#4A9FBF",
  Styling: "#B98AC9",
};

export default function ServicesPage() {
  const categories = Array.from(new Set(SERVICES.map((s) => s.category)));

  return (
    <>
      <AppBar title="Services" subtitle={`${SERVICES.length} on the menu`} back />

      <div className="px-4 pb-6 pt-4">
        {categories.map((cat) => (
          <div key={cat} className="mt-4 first:mt-0">
            <h2 className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{cat}</h2>
            <div className="card divide-y divide-border overflow-hidden">
              {SERVICES.filter((s) => s.category === cat).map((s) => (
                <div key={s.id} className="flex items-center gap-3 px-4 py-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                    style={{ background: `${CATEGORY_TONE[cat] ?? "#999"}20`, color: CATEGORY_TONE[cat] ?? "#999" }}
                  >
                    <Icon.Tag className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-ink">{s.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Icon.Clock className="h-3.5 w-3.5" /> {s.durationMin} min
                    </div>
                  </div>
                  <span className="text-base font-extrabold text-ink">£{s.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
