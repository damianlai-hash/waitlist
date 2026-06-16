"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { PROMOTIONS } from "@/lib/business";
import type { Promotion } from "@/lib/business";
import { BizBar } from "@/components/business/BizBar";

export default function BizMarketing() {
  const [promos, setPromos] = useState<Promotion[]>(PROMOTIONS);
  const toggle = (id: string) => setPromos((p) => p.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));

  return (
    <>
      <BizBar title="Marketing" subtitle="Promotions & reach" back />

      <div className="px-4 pb-6 pt-4">
        {/* Reach card */}
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral/12 text-coral">
              <Icon.Megaphone className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold text-ink">Reach more clients</div>
              <div className="text-xs text-muted">Promotions show across Bookzyr search & your profile.</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 divide-x divide-border rounded-xl bg-surface-2">
            <Mini label="Live deals" value={String(promos.filter((p) => p.active).length)} />
            <Mini label="Redeemed" value="148" />
            <Mini label="New clients" value="63" />
          </div>
        </div>

        <h2 className="mb-2 mt-5 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Your promotions</h2>
        <div className="space-y-3">
          {promos.map((p) => (
            <div key={p.id} className="card p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: p.tone }}>
                  <Icon.Tag className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-ink">{p.title}</div>
                  <div className="truncate text-xs text-muted">{p.detail}</div>
                </div>
                <button onClick={() => toggle(p.id)} className="relative h-6 w-11 shrink-0 rounded-full transition-colors" style={{ background: p.active ? "var(--primary)" : "var(--surface-3)" }} aria-label="Toggle promotion">
                  <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all" style={{ left: p.active ? "1.375rem" : "0.125rem" }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary mt-4 w-full py-3 text-base">
          <Icon.Plus className="h-5 w-5" /> New promotion
        </button>
      </div>
    </>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-2 py-3 text-center">
      <div className="text-lg font-extrabold text-ink">{value}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}
