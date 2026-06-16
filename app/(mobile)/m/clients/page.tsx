"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/lib/icons";
import { CLIENTS } from "@/lib/data";
import type { Client } from "@/lib/data";
import { AppBar } from "@/components/mobile/AppBar";

const TAGS: Array<Client["tag"] | "All"> = ["All", "VIP", "Regular", "New", "Lapsed"];

const TAG_TONE: Record<Client["tag"], string> = {
  VIP: "#E8B86A",
  Regular: "#4A9FBF",
  New: "#6CC289",
  Lapsed: "#B98AC9",
};

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

export default function ClientsPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CLIENTS.filter((c) => {
      if (tag !== "All" && c.tag !== tag) return false;
      if (!q) return true;
      return c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q);
    });
  }, [query, tag]);

  return (
    <>
      <AppBar title="Clients" subtitle={`${CLIENTS.length} total`} />

      <div className="sticky top-[60px] z-20 border-b border-border bg-bg px-4 pb-2.5 pt-3">
        <div className="relative">
          <Icon.Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            className="input pl-11"
            placeholder="Search name, phone, email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="no-scrollbar mt-2.5 flex gap-2 overflow-x-auto">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`chip shrink-0 border px-3 py-1.5 ${
                tag === t ? "border-transparent text-white" : "border-border bg-surface text-ink"
              }`}
              style={tag === t ? { background: "var(--primary)" } : undefined}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-6 pt-3">
        <div className="card divide-y divide-border overflow-hidden">
          {filtered.map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-4 py-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-2 text-sm font-bold text-ink">
                {initials(c.name)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-bold text-ink">{c.name}</span>
                  <span className="chip px-2 py-0.5 text-[10px]" style={{ background: `${TAG_TONE[c.tag]}20`, color: TAG_TONE[c.tag] }}>
                    {c.tag}
                  </span>
                </div>
                <div className="truncate text-xs text-muted">
                  {c.visits} visits · £{c.spend} · last {c.lastVisit}
                </div>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} aria-label={`Call ${c.name}`} className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink active:bg-surface-2">
                  <Icon.Phone className="h-[18px] w-[18px]" />
                </a>
                <a href={`mailto:${c.email}`} aria-label={`Email ${c.name}`} className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink active:bg-surface-2">
                  <Icon.Mail className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-muted">No clients match “{query}”.</div>
          )}
        </div>
      </div>
    </>
  );
}
