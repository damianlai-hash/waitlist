"use client";

import { Icon } from "@/lib/icons";
import { WAITLIST } from "@/lib/data";

export function WaitlistDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-navy-dark/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-sm animate-slide-in flex-col border-l border-border bg-surface shadow-pop">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-ink">
              <Icon.List className="h-5 w-5" style={{ color: "var(--primary)" }} /> Waitlist
            </h2>
            <p className="mt-0.5 text-sm text-muted">{WAITLIST.length} clients waiting for a slot</p>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink" aria-label="Close">
            <Icon.X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
          {WAITLIST.map((w) => (
            <div key={w.id} className="rounded-xl border border-border bg-surface-2 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">{w.name}</span>
                <span className="chip text-coral" style={{ background: "rgba(255,107,91,.12)" }}>
                  {w.service}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Icon.Scissors className="h-3.5 w-3.5" /> {w.preferredBarber}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon.Clock className="h-3.5 w-3.5" /> {w.window}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-primary flex-1 py-1.5 text-xs">Offer slot</button>
                <button className="btn-ghost px-2.5 py-1.5 text-xs">
                  <Icon.Phone className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
