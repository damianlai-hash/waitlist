"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/lib/icons";
import { CATEGORIES, CITIES, WHEN_OPTIONS } from "@/lib/marketplace";

export function SearchBar({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const router = useRouter();
  const [treatment, setTreatment] = useState("");
  const [city, setCity] = useState("");
  const [when, setWhen] = useState("");

  function submit() {
    const params = new URLSearchParams();
    if (treatment) params.set("cat", treatment);
    if (city) params.set("city", city);
    if (when) params.set("when", when);
    router.push(`/browse${params.toString() ? `?${params}` : ""}`);
  }

  const compact = variant === "compact";

  return (
    <div
      className={`flex w-full flex-col gap-2 ${
        compact ? "" : "rounded-2xl border border-border bg-surface p-2 shadow-pop sm:flex-row sm:items-center sm:rounded-full"
      } ${compact ? "sm:flex-row" : ""}`}
    >
      <Cell icon={<Icon.Search className="h-5 w-5" />} label="Treatment or business" first>
        <select className="market-select" value={treatment} onChange={(e) => setTreatment(e.target.value)} aria-label="Treatment or business">
          <option value="">All treatments, salons, or…</option>
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </Cell>

      <span className="mx-1 hidden h-7 w-px bg-border sm:block" />

      <Cell icon={<Icon.Pin className="h-5 w-5" />} label="Location">
        <select className="market-select" value={city} onChange={(e) => setCity(e.target.value)} aria-label="Location">
          <option value="">Suburb, city or state</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Cell>

      <span className="mx-1 hidden h-7 w-px bg-border sm:block" />

      <Cell icon={<Icon.Calendar className="h-5 w-5" />} label="When">
        <select className="market-select" value={when} onChange={(e) => setWhen(e.target.value)} aria-label="When">
          {WHEN_OPTIONS.map((w) => (
            <option key={w} value={w === "Any time" ? "" : w}>
              {w}
            </option>
          ))}
        </select>
      </Cell>

      <button onClick={submit} className="btn-primary shrink-0 sm:rounded-full sm:px-6 sm:py-3">
        <Icon.Search className="h-4 w-4" /> Search
      </button>
    </div>
  );
}

function Cell({
  icon,
  label,
  children,
  first,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <label className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2 sm:rounded-full ${first ? "" : ""}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-2 text-coral">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-bold uppercase tracking-wide text-muted">{label}</span>
        {children}
      </span>
    </label>
  );
}
