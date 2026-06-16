"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/lib/icons";
import {
  BARBERS,
  DAY_START,
  DAY_END,
  SLOT_MIN,
  TODAY_BOOKINGS,
  formatTime,
  serviceById,
} from "@/lib/data";
import type { Booking } from "@/lib/data";
import { AddBookingModal, type DraftSlot } from "./AddBookingModal";
import { WaitlistDrawer } from "./WaitlistDrawer";

const BASE_SLOT_H = 48; // px per 30-min slot at 100%
const ANCHOR = new Date(2026, 5, 2); // Tue 2 June 2026

export function CalendarView() {
  const [bookings, setBookings] = useState<Booking[]>(TODAY_BOOKINGS);
  const [zoom, setZoom] = useState(100);
  const [dayOffset, setDayOffset] = useState(0);
  const [activeBarbers, setActiveBarbers] = useState<string[]>(BARBERS.map((b) => b.id));
  const [draft, setDraft] = useState<DraftSlot>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [teamMenu, setTeamMenu] = useState(false);

  const date = useMemo(() => {
    const d = new Date(ANCHOR);
    d.setDate(d.getDate() + dayOffset);
    return d;
  }, [dayOffset]);

  const slotH = (BASE_SLOT_H * zoom) / 100;
  const slots = useMemo(() => {
    const out: number[] = [];
    for (let t = DAY_START; t < DAY_END; t += SLOT_MIN) out.push(t);
    return out;
  }, []);

  const shownBarbers = BARBERS.filter((b) => activeBarbers.includes(b.id));
  const bookedToday = bookings.length;
  const totalSlots = slots.length * shownBarbers.length;
  const occupancy = totalSlots ? Math.round((bookings.length / totalSlots) * 100) : 0;

  const longDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const shortDate = date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  function openDraft(barberId: string, start: number) {
    setDraft({ barberId, start });
    setModalOpen(true);
  }

  function createBooking(b: Omit<Booking, "id">) {
    setBookings((prev) => [...prev, { ...b, id: `b${Date.now()}` }]);
  }

  function toggleBarber(id: string) {
    setActiveBarbers((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="px-6 py-5">
      {/* Header */}
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Empire Barbershop</div>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display-title text-4xl text-ink">Calendar</h1>
          <p className="mt-1 text-sm text-muted">
            {longDate} · {shownBarbers.length} of {BARBERS.length} barbers shown
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-ghost relative" onClick={() => setWaitlistOpen(true)}>
            <Icon.List className="h-4 w-4" /> Waitlist
            <span className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold text-white" style={{ background: "var(--primary)" }}>
              3
            </span>
          </button>

          <div className="flex items-center rounded-xl border border-border bg-surface">
            <button className="grid h-9 w-9 place-items-center text-muted hover:text-ink" onClick={() => setZoom((z) => Math.max(60, z - 20))} aria-label="Zoom out">
              <Icon.Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center text-xs font-semibold text-ink">{zoom}%</span>
            <button className="grid h-9 w-9 place-items-center text-muted hover:text-ink" onClick={() => setZoom((z) => Math.min(160, z + 20))} aria-label="Zoom in">
              <Icon.Plus className="h-4 w-4" />
            </button>
          </div>

          <button className="btn-primary" onClick={() => openDraft(shownBarbers[0]?.id ?? BARBERS[0].id, DAY_START + 5 * 60)}>
            <Icon.Plus className="h-4 w-4" /> Add
            <Icon.ChevronDown className="h-3.5 w-3.5 opacity-80" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-3 py-2.5 shadow-card">
        <div className="flex items-center gap-1.5">
          <button className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink" onClick={() => setDayOffset((d) => d - 1)} aria-label="Previous day">
            <Icon.ChevronLeft className="h-5 w-5" />
          </button>
          <button className={`chip px-3 py-1.5 ${dayOffset === 0 ? "text-white" : "text-ink"}`} style={dayOffset === 0 ? { background: "var(--primary)" } : { background: "var(--surface-2)" }} onClick={() => setDayOffset(0)}>
            Today
          </button>
          <button className="chip px-3 py-1.5 text-ink" style={{ background: "var(--surface-2)" }}>
            <Icon.Clock className="h-3.5 w-3.5" /> Now
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink" onClick={() => setDayOffset((d) => d + 1)} aria-label="Next day">
            <Icon.ChevronRight className="h-5 w-5" />
          </button>
          <span className="ml-2 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-semibold text-ink">
            <Icon.Calendar className="h-4 w-4 text-muted" /> {shortDate}
          </span>
        </div>

        <div className="relative flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Showing</span>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-semibold text-ink hover:bg-surface-2" onClick={() => setTeamMenu((v) => !v)}>
            <Icon.Users className="h-4 w-4 text-muted" />
            {activeBarbers.length === BARBERS.length ? "Whole team" : `${activeBarbers.length} selected`}
            <span className="text-muted">({activeBarbers.length})</span>
            <Icon.ChevronDown className="h-3.5 w-3.5 text-muted" />
          </button>
          {teamMenu && (
            <div className="absolute right-0 top-11 z-20 w-56 animate-fade-in rounded-xl border border-border bg-surface p-2 shadow-pop">
              {BARBERS.map((b) => (
                <label key={b.id} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-surface-2">
                  <input type="checkbox" checked={activeBarbers.includes(b.id)} onChange={() => toggleBarber(b.id)} className="accent-coral" />
                  <span className="grid h-6 w-6 place-items-center rounded-md text-[10px] font-bold text-white" style={{ background: b.color }}>
                    {b.initials}
                  </span>
                  <span className="text-sm text-ink">{b.name}</span>
                  {!b.working && <span className="ml-auto text-[10px] font-bold uppercase text-muted">Off</span>}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-3 flex flex-wrap items-center gap-2.5 rounded-2xl border border-border bg-surface px-4 py-3 shadow-card">
        <Stat icon={<Icon.Calendar className="h-4 w-4" />} label="Booked" value={String(bookedToday)} tone="#FF6B5B" />
        <span className="h-5 w-px bg-border" />
        <Stat icon={<Icon.Activity className="h-4 w-4" />} label="Occupancy" value={`${occupancy}%`} tone="#4A9FBF" />
        <span className="h-5 w-px bg-border" />
        <Stat icon={<Icon.Heart className="h-4 w-4" />} label="Retention" value="78%" tone="#6CC289" />
      </div>

      {/* Grid */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
        {/* Barber header row */}
        <div className="flex border-b border-border bg-surface-2">
          <div className="w-16 shrink-0 border-r border-border" />
          {shownBarbers.map((b) => (
            <div key={b.id} className="flex flex-1 items-center gap-2.5 border-r border-border px-3 py-2.5 last:border-r-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold text-white" style={{ background: b.color }}>
                {b.initials}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-bold text-ink">{b.name}</span>
                  {!b.working && <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase text-gold" style={{ background: "rgba(232,184,106,.15)" }}>Off</span>}
                </div>
                <div className="text-xs text-muted">{bookings.filter((x) => x.barberId === b.id).length} booked</div>
              </div>
            </div>
          ))}
        </div>

        {/* Scrollable time grid */}
        <div className="flex max-h-[calc(100vh-380px)] overflow-y-auto">
          {/* Time labels */}
          <div className="w-16 shrink-0 border-r border-border">
            {slots.map((t) => (
              <div key={t} style={{ height: slotH }} className="relative border-b border-border/60">
                <span className="absolute -top-2 right-2 text-[10px] font-medium text-muted">{formatTime(t)}</span>
              </div>
            ))}
          </div>

          {/* Barber columns */}
          {shownBarbers.map((b) => (
            <div key={b.id} className="relative flex-1 border-r border-border last:border-r-0">
              {slots.map((t) => (
                <button
                  key={t}
                  onClick={() => openDraft(b.id, t)}
                  style={{ height: slotH }}
                  className={`block w-full border-b border-border/60 transition-colors hover:bg-coral/[0.06] ${b.working ? "" : "bg-surface-2/40"}`}
                  aria-label={`Add booking for ${b.name} at ${formatTime(t)}`}
                />
              ))}

              {/* Bookings overlay */}
              {bookings
                .filter((bk) => bk.barberId === b.id)
                .map((bk) => {
                  const svc = serviceById(bk.serviceId);
                  const top = ((bk.start - DAY_START) / SLOT_MIN) * slotH;
                  const height = ((svc?.durationMin ?? 30) / SLOT_MIN) * slotH;
                  return (
                    <div
                      key={bk.id}
                      style={{ top: top + 2, height: height - 4, borderLeftColor: b.color }}
                      className="absolute inset-x-1.5 overflow-hidden rounded-lg border border-border border-l-[3px] bg-surface px-2.5 py-1.5 shadow-card"
                    >
                      <div className="truncate text-xs font-bold text-ink">{bk.clientName}</div>
                      <div className="truncate text-[11px] text-muted">
                        {svc?.name} · {formatTime(bk.start)}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      <AddBookingModal open={modalOpen} onClose={() => setModalOpen(false)} draft={draft} onCreate={createBooking} />
      <WaitlistDrawer open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}

function Stat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: `${tone}1f`, color: tone }}>
        {icon}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</span>
      <span className="text-sm font-extrabold text-ink">{value}</span>
    </div>
  );
}
