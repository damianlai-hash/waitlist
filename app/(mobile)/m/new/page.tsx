"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/lib/icons";
import { BARBERS, SERVICES, DAY_START, DAY_END, SLOT_MIN, formatTime, serviceById } from "@/lib/data";
import { useMobile } from "@/components/mobile/MobileProvider";
import { AppBar } from "@/components/mobile/AppBar";
import { Avatar } from "@/components/mobile/ui";

const SLOTS: number[] = [];
for (let t = DAY_START; t < DAY_END; t += SLOT_MIN) SLOTS.push(t);

export default function NewBookingPage() {
  const { addBooking } = useMobile();
  const router = useRouter();

  const [clientName, setClientName] = useState("");
  const [barberId, setBarberId] = useState(BARBERS[0].id);
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [start, setStart] = useState(14 * 60);

  const svc = serviceById(serviceId);
  const valid = clientName.trim().length > 0;

  function submit() {
    if (!valid) return;
    addBooking({ clientName: clientName.trim(), barberId, serviceId, start, status: "confirmed" });
    router.push("/m/agenda");
  }

  return (
    <>
      <AppBar title="New booking" subtitle="Add to today's chair" back />

      <div className="px-4 pb-28 pt-4">
        {/* Client */}
        <Label>Client</Label>
        <div className="relative">
          <Icon.Users className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            autoFocus
            className="input pl-11"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Client name"
          />
        </div>

        {/* Service */}
        <Label>Service</Label>
        <div className="grid grid-cols-2 gap-2.5">
          {SERVICES.map((s) => {
            const active = s.id === serviceId;
            return (
              <button
                key={s.id}
                onClick={() => setServiceId(s.id)}
                className={`rounded-xl border p-3 text-left transition ${
                  active ? "border-transparent text-white" : "border-border bg-surface text-ink"
                }`}
                style={active ? { background: "var(--primary)" } : undefined}
              >
                <div className="text-sm font-bold">{s.name}</div>
                <div className={`mt-0.5 text-xs ${active ? "text-white/80" : "text-muted"}`}>
                  {s.durationMin}m · £{s.price}
                </div>
              </button>
            );
          })}
        </div>

        {/* Barber */}
        <Label>Barber</Label>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          {BARBERS.map((b) => {
            const active = b.id === barberId;
            return (
              <button
                key={b.id}
                onClick={() => setBarberId(b.id)}
                className={`flex w-16 shrink-0 flex-col items-center gap-1.5 rounded-xl border p-2 ${
                  active ? "border-coral bg-coral/10" : "border-border bg-surface"
                }`}
              >
                <Avatar id={b.id} size={40} />
                <span className="truncate text-[11px] font-semibold text-ink">{b.name}</span>
              </button>
            );
          })}
        </div>

        {/* Time */}
        <Label>Time</Label>
        <div className="grid grid-cols-4 gap-2">
          {SLOTS.map((t) => {
            const active = t === start;
            return (
              <button
                key={t}
                onClick={() => setStart(t)}
                className={`rounded-lg border py-2 text-sm font-semibold transition ${
                  active ? "border-transparent text-white" : "border-border bg-surface text-ink"
                }`}
                style={active ? { background: "var(--primary)" } : undefined}
              >
                {formatTime(t)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky submit bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[460px] border-t border-border bg-surface/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted">
            {svc?.name} · {formatTime(start)}
          </span>
          <span className="font-extrabold text-ink">£{svc?.price}</span>
        </div>
        <button className="btn-primary w-full py-3 text-base disabled:opacity-50" onClick={submit} disabled={!valid}>
          <Icon.Plus className="h-5 w-5" /> Create booking
        </button>
      </div>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{children}</div>;
}
