"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { BARBERS, SERVICES, SLOT_MIN, DAY_START, DAY_END, formatTime } from "@/lib/data";
import type { Booking } from "@/lib/data";

export type DraftSlot = { barberId: string; start: number } | null;

export function AddBookingModal({
  open,
  onClose,
  draft,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  draft: DraftSlot;
  onCreate: (b: Omit<Booking, "id">) => void;
}) {
  const [clientName, setClientName] = useState("");
  const [barberId, setBarberId] = useState(BARBERS[0].id);
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [start, setStart] = useState(DAY_START + 5 * 60);

  useEffect(() => {
    if (open && draft) {
      setBarberId(draft.barberId);
      setStart(draft.start);
    }
  }, [open, draft]);

  const slots: number[] = [];
  for (let t = DAY_START; t < DAY_END; t += SLOT_MIN) slots.push(t);

  function submit() {
    if (!clientName.trim()) return;
    onCreate({ clientName: clientName.trim(), barberId, serviceId, start, status: "confirmed" });
    setClientName("");
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New booking"
      subtitle="Add an appointment to the calendar"
      footer={
        <>
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={submit} disabled={!clientName.trim()}>
            Create booking
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Client name">
          <input
            autoFocus
            className="input"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Leon Carter"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Barber">
            <select className="input" value={barberId} onChange={(e) => setBarberId(e.target.value)}>
              {BARBERS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                  {b.working ? "" : " (off)"}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Start time">
            <select className="input" value={start} onChange={(e) => setStart(Number(e.target.value))}>
              {slots.map((t) => (
                <option key={t} value={t}>
                  {formatTime(t)}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Service">
          <select className="input" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.durationMin}m · £{s.price}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}
