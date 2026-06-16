"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/lib/icons";
import { CLIENTS } from "@/lib/data";

const tagTone: Record<string, { bg: string; fg: string }> = {
  VIP: { bg: "rgba(232,184,106,.18)", fg: "#B8860B" },
  Regular: { bg: "rgba(74,159,191,.15)", fg: "#2C7A9E" },
  New: { bg: "rgba(108,194,137,.18)", fg: "#2F8F4F" },
  Lapsed: { bg: "rgba(255,107,91,.12)", fg: "#E8584A" },
};

export default function ClientsPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const tags = ["All", "VIP", "Regular", "New", "Lapsed"];

  const rows = CLIENTS.filter(
    (c) =>
      (filter === "All" || c.tag === filter) &&
      (c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q) || c.email.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle={`${CLIENTS.length} clients · ${CLIENTS.filter((c) => c.tag === "VIP").length} VIP`}
        actions={<button className="btn-primary"><Icon.Plus className="h-4 w-4" /> Add client</button>}
      />

      <div className="space-y-4 px-6 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Icon.Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input className="input pl-10" placeholder="Search clients…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="flex items-center gap-1.5">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`chip px-3 py-1.5 ${filter === t ? "text-white" : "text-ink"}`}
                style={filter === t ? { background: "var(--primary)" } : { background: "var(--surface-2)" }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Visits</th>
                <th className="px-5 py-3">Last visit</th>
                <th className="px-5 py-3">Spend</th>
                <th className="px-5 py-3">Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((c) => (
                <tr key={c.id} className="hover:bg-surface-2/50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <span className="font-semibold text-ink">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted">
                    <div>{c.phone}</div>
                    <div className="text-xs">{c.email}</div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-ink">{c.visits}</td>
                  <td className="px-5 py-3.5 text-muted">{c.lastVisit}</td>
                  <td className="px-5 py-3.5 font-semibold text-ink">£{c.spend}</td>
                  <td className="px-5 py-3.5">
                    <span className="chip" style={{ background: tagTone[c.tag].bg, color: tagTone[c.tag].fg }}>
                      {c.tag}
                    </span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted">No clients match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
