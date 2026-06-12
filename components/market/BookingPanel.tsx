"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/lib/icons";
import type { Venue } from "@/lib/marketplace";
import { Stars } from "./ui";

/** Next 7 days as quick-pick chips. */
function nextDays(n: number) {
  const out: { key: string; dow: string; day: string }[] = [];
  const base = new Date(2026, 5, 12); // Fri 12 Jun 2026 (demo "today")
  for (let i = 0; i < n; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    out.push({
      key: d.toISOString().slice(0, 10),
      dow: i === 0 ? "Today" : d.toLocaleDateString("en-GB", { weekday: "short" }),
      day: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    });
  }
  return out;
}

const TIMES = ["09:30", "10:15", "11:00", "12:30", "14:00", "15:45", "16:30", "17:15"];

export function BookingPanel({ venue }: { venue: Venue }) {
  const router = useRouter();
  const days = nextDays(7);
  const [serviceId, setServiceId] = useState(venue.services[0]?.id ?? "");
  const [day, setDay] = useState(days[0].key);
  const [time, setTime] = useState("");

  const service = venue.services.find((s) => s.id === serviceId);

  function go() {
    const p = new URLSearchParams({ service: serviceId, day, time: time || TIMES[0] });
    router.push(`/book/${venue.slug}?${p}`);
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted">from</div>
        <Stars rating={venue.rating} className="text-sm" />
      </div>
      <div className="text-3xl font-extrabold text-ink">
        £{venue.priceFrom}
        <span className="ml-1 text-sm font-semibold text-muted">/ service</span>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-muted">Service</label>
        <select className="input" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
          {venue.services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} · {s.durationMin}m · £{s.price}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-muted">Date</label>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {days.map((d) => {
            const active = d.key === day;
            return (
              <button
                key={d.key}
                onClick={() => setDay(d.key)}
                className={`flex shrink-0 flex-col items-center rounded-xl border px-3 py-2 ${active ? "border-transparent text-white" : "border-border bg-surface text-ink"}`}
                style={active ? { background: "var(--primary)" } : undefined}
              >
                <span className="text-[11px] font-bold uppercase">{d.dow}</span>
                <span className="text-xs">{d.day}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-muted">Available times</label>
        <div className="grid grid-cols-4 gap-2">
          {TIMES.map((t) => {
            const active = t === time;
            return (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`rounded-lg border py-2 text-sm font-semibold ${active ? "border-transparent text-white" : "border-border bg-surface text-ink hover:border-coral"}`}
                style={active ? { background: "var(--primary)" } : undefined}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <button onClick={go} className="btn-primary mt-5 w-full py-3 text-base">
        Continue {service ? `· £${service.price}` : ""} <Icon.ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-2 text-center text-xs text-muted">Free cancellation up to 24h before</p>
    </div>
  );
}
