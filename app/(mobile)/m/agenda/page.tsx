"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import { BARBERS } from "@/lib/data";
import type { Booking } from "@/lib/data";
import { useMobile } from "@/components/mobile/MobileProvider";
import { AppBar } from "@/components/mobile/AppBar";
import { BookingRow } from "@/components/mobile/ui";

export default function AgendaPage() {
  const { bookings } = useMobile();
  const [filter, setFilter] = useState<string>("all");

  const shown = bookings
    .filter((b) => filter === "all" || b.barberId === filter)
    .sort((a, b) => a.start - b.start);

  const morning = shown.filter((b) => b.start < 12 * 60);
  const afternoon = shown.filter((b) => b.start >= 12 * 60);

  return (
    <>
      <AppBar title="Agenda" subtitle="Tuesday, 2 June 2026" />

      {/* Date strip */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
        <button className="grid h-8 w-8 place-items-center rounded-lg text-muted active:bg-surface-2" aria-label="Previous day">
          <Icon.ChevronLeft className="h-5 w-5" />
        </button>
        <span className="chip px-3 py-1.5 text-white" style={{ background: "var(--primary)" }}>
          Today · {shown.length} booked
        </span>
        <button className="grid h-8 w-8 place-items-center rounded-lg text-muted active:bg-surface-2" aria-label="Next day">
          <Icon.ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Barber filter chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-border bg-surface px-4 py-2.5">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          Whole team
        </FilterChip>
        {BARBERS.map((b) => (
          <FilterChip key={b.id} active={filter === b.id} onClick={() => setFilter(b.id)} dot={b.color}>
            {b.name}
            {!b.working && " (off)"}
          </FilterChip>
        ))}
      </div>

      <div className="px-4 pb-6 pt-2">
        <Group title="Morning" items={morning} />
        <Group title="Afternoon" items={afternoon} />

        {shown.length === 0 && (
          <div className="card mt-6 flex flex-col items-center gap-3 p-8 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-2 text-muted">
              <Icon.Calendar className="h-6 w-6" />
            </span>
            <p className="text-sm text-muted">No bookings for this view yet.</p>
            <Link href="/m/new" className="btn-primary">
              <Icon.Plus className="h-4 w-4" /> Add booking
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

function Group({ title, items }: { title: string; items: Booking[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-4">
      <h2 className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{title}</h2>
      <div className="card divide-y divide-border overflow-hidden">
        {items.map((b) => (
          <BookingRow key={b.id} booking={b} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  dot,
  children,
}: {
  active: boolean;
  onClick: () => void;
  dot?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`chip shrink-0 whitespace-nowrap border px-3 py-1.5 ${
        active ? "border-transparent text-white" : "border-border bg-surface text-ink"
      }`}
      style={active ? { background: "var(--primary)" } : undefined}
    >
      {dot && <span className="h-2 w-2 rounded-full" style={{ background: active ? "#fff" : dot }} />}
      {children}
    </button>
  );
}
