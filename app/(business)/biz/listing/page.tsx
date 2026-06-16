"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/lib/icons";
import { MY_VENUE } from "@/lib/business";
import { CATEGORIES } from "@/lib/marketplace";
import { BizBar } from "@/components/business/BizBar";
import { VenueCover, Stars } from "@/components/market/ui";

export default function BizListing() {
  const v = MY_VENUE;
  const cat = CATEGORIES.find((c) => c.key === v.categoryKey);
  const [acceptingNew, setAcceptingNew] = useState(true);
  const [instant, setInstant] = useState(true);

  return (
    <>
      <BizBar title="Your listing" subtitle="How you appear on Bookzyr" />

      <div className="px-4 pb-6 pt-4">
        {/* Preview */}
        <div className="card overflow-hidden">
          <VenueCover gradient={v.gradient} label={v.name} icon={cat?.icon ?? "Scissors"} className="aspect-[2/1] w-full" rounded="rounded-none" />
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-extrabold text-ink">{v.name}</h2>
                <div className="flex items-center gap-1 text-sm text-muted">
                  <Icon.Pin className="h-4 w-4" /> {v.suburb}, {v.city}
                </div>
              </div>
              <Stars rating={v.rating} className="shrink-0 text-sm" />
            </div>
            <Link href={`/venue/${v.slug}`} className="btn-ghost mt-3 w-full">
              <Icon.Globe className="h-4 w-4" /> View on Bookzyr
            </Link>
          </div>
        </div>

        {/* Completeness */}
        <div className="card mt-4 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-ink">Profile 85% complete</span>
            <span className="text-muted">Add 1 more photo</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full" style={{ width: "85%", background: "var(--primary)" }} />
          </div>
        </div>

        {/* Booking toggles */}
        <div className="card mt-4 divide-y divide-border overflow-hidden">
          <Toggle label="Accepting new clients" desc="Show to first-time customers" on={acceptingNew} onClick={() => setAcceptingNew((v) => !v)} />
          <Toggle label="Instant booking" desc="Auto-confirm without approval" on={instant} onClick={() => setInstant((v) => !v)} />
        </div>

        {/* Photos */}
        <Group title="Photos" action="Edit">
          <div className="flex gap-2 p-3">
            {[0, 1, 2].map((i) => (
              <VenueCover key={i} gradient={i === 0 ? v.gradient : [v.gradient[1], v.gradient[0]]} label={v.name} icon={cat?.icon ?? "Scissors"} className="h-20 w-20" />
            ))}
            <button className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-2 border-dashed border-border text-muted">
              <Icon.Plus className="h-6 w-6" />
            </button>
          </div>
        </Group>

        {/* About */}
        <Group title="About" action="Edit">
          <p className="px-4 py-3 text-sm leading-relaxed text-muted">{v.blurb}</p>
        </Group>

        {/* Services */}
        <Group title="Services" action="Manage">
          <div className="divide-y divide-border">
            {v.services.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-ink">{s.name}</div>
                  <div className="text-xs text-muted">{s.durationMin} min</div>
                </div>
                <span className="font-extrabold text-ink">£{s.price}</span>
              </div>
            ))}
          </div>
        </Group>

        {/* Hours */}
        <Group title="Opening hours" action="Edit">
          <div className="flex items-center gap-2 px-4 py-3 text-sm text-ink">
            <Icon.Clock className="h-4 w-4 text-muted" /> {v.hours}
          </div>
        </Group>

        {/* Team */}
        <Group title="Team" action="Manage">
          <div className="no-scrollbar flex gap-3 overflow-x-auto p-4">
            {v.team.map((m) => (
              <div key={m.name} className="w-16 shrink-0 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full text-sm font-bold text-white" style={{ background: m.color }}>
                  {m.initials}
                </span>
                <div className="mt-1 truncate text-[11px] font-semibold text-ink">{m.name}</div>
              </div>
            ))}
          </div>
        </Group>
      </div>
    </>
  );
}

function Toggle({ label, desc, on, onClick }: { label: string; desc: string; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
      <div className="flex-1">
        <div className="text-sm font-bold text-ink">{label}</div>
        <div className="text-xs text-muted">{desc}</div>
      </div>
      <span className="relative h-6 w-11 shrink-0 rounded-full transition-colors" style={{ background: on ? "var(--primary)" : "var(--surface-3)" }}>
        <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all" style={{ left: on ? "1.375rem" : "0.125rem" }} />
      </span>
    </button>
  );
}

function Group({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{title}</h2>
        {action && <button className="text-xs font-bold text-coral">{action}</button>}
      </div>
      <div className="card overflow-hidden">{children}</div>
    </div>
  );
}
