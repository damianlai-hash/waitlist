"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { formatTime, serviceById } from "@/lib/data";
import type { Booking } from "@/lib/data";
import { useBiz } from "@/components/business/BizProvider";
import { BizBar } from "@/components/business/BizBar";
import { Avatar, BookingRow } from "@/components/mobile/ui";

const UPCOMING: { day: string; items: Booking[] }[] = [
  {
    day: "Tomorrow · Wed 17 Jun",
    items: [
      { id: "u1", barberId: "damian", clientName: "Priya Nair", serviceId: "s2", start: 10 * 60, status: "confirmed" },
      { id: "u2", barberId: "jay", clientName: "Jess Lin", serviceId: "s1", start: 12 * 60 + 30, status: "confirmed" },
      { id: "u3", barberId: "marcus", clientName: "Hassan Ali", serviceId: "s3", start: 15 * 60, status: "confirmed" },
    ],
  },
  {
    day: "Thu 18 Jun",
    items: [
      { id: "u4", barberId: "tom", clientName: "Sophie Adams", serviceId: "s4", start: 11 * 60, status: "confirmed" },
      { id: "u5", barberId: "damian", clientName: "Leon Carter", serviceId: "s1", start: 16 * 60 + 30, status: "confirmed" },
    ],
  },
];

const TABS = ["Today", "Upcoming", "Requests"] as const;

export default function BizBookings() {
  const { bookings, requests, accept, decline } = useBiz();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Today");
  const today = [...bookings].sort((a, b) => a.start - b.start);

  return (
    <>
      <BizBar title="Bookings" subtitle="Empire Barbershop" />

      {/* Tabs */}
      <div className="sticky top-[60px] z-20 flex gap-1 border-b border-border bg-surface px-3 py-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative flex-1 rounded-lg py-2 text-sm font-bold ${tab === t ? "text-white" : "text-muted"}`}
            style={tab === t ? { background: "var(--primary)" } : undefined}
          >
            {t}
            {t === "Requests" && requests.length > 0 && (
              <span className={`ml-1 rounded-full px-1.5 text-[10px] ${tab === t ? "bg-white/25" : "bg-coral/15 text-coral"}`}>{requests.length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="px-4 pb-6 pt-3">
        {tab === "Today" && (
          <div className="card divide-y divide-border overflow-hidden">
            {today.map((b) => (
              <BookingRow key={b.id} booking={b} />
            ))}
          </div>
        )}

        {tab === "Upcoming" &&
          UPCOMING.map((g) => (
            <div key={g.day} className="mb-4">
              <h2 className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{g.day}</h2>
              <div className="card divide-y divide-border overflow-hidden">
                {g.items.map((b) => (
                  <BookingRow key={b.id} booking={b} />
                ))}
              </div>
            </div>
          ))}

        {tab === "Requests" && (
          <div className="space-y-3">
            {requests.map((r) => {
              const svc = serviceById(r.serviceId);
              return (
                <div key={r.id} className="card p-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar id={r.barberId} size={40} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-ink">{r.clientName}</div>
                      <div className="truncate text-xs text-muted">{svc?.name} · {formatTime(r.start)} · £{svc?.price}</div>
                    </div>
                    <span className="chip bg-gold/15 px-2 py-0.5 text-[10px] text-gold">via Bookzyr</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button onClick={() => decline(r.id)} className="btn-ghost py-2 text-sm">Decline</button>
                    <button onClick={() => accept(r.id)} className="btn-primary py-2 text-sm">Accept</button>
                  </div>
                </div>
              );
            })}
            {requests.length === 0 && (
              <div className="card flex flex-col items-center gap-2 p-10 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf/15 text-leaf">
                  <Icon.Check className="h-6 w-6" />
                </span>
                <p className="text-sm text-muted">All caught up — no pending requests.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
