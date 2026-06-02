"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/lib/icons";

const SECTIONS = ["Business", "Booking rules", "Notifications", "Payments", "Team", "Integrations"];

export default function SettingsPage() {
  const [active, setActive] = useState("Business");
  const [toggles, setToggles] = useState({ online: true, reminders: true, deposits: false, reviews: true });

  return (
    <>
      <PageHeader title="Settings" subtitle="Configure how Empire Barbershop runs on Bookzyr" />

      <div className="grid grid-cols-1 gap-5 px-6 pb-8 lg:grid-cols-[220px_1fr]">
        <nav className="card h-fit p-2">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              data-active={active === s}
              className="nav-link w-full"
            >
              {s}
            </button>
          ))}
        </nav>

        <div className="space-y-5">
          <div className="card p-5">
            <h2 className="text-lg font-extrabold text-ink">Business details</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Shop name" value="Empire Barbershop" />
              <Field label="Phone" value="+44 20 7946 0000" />
              <Field label="Email" value="hello@empirebarbers.co.uk" />
              <Field label="Address" value="14 Old Street, London" />
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-lg font-extrabold text-ink">Booking preferences</h2>
            <div className="mt-2 divide-y divide-border">
              <Toggle label="Accept online bookings" desc="Let clients book 24/7 from your Bookzyr page" on={toggles.online} onChange={() => setToggles((t) => ({ ...t, online: !t.online }))} />
              <Toggle label="Send appointment reminders" desc="Automatic SMS 24h before each visit" on={toggles.reminders} onChange={() => setToggles((t) => ({ ...t, reminders: !t.reminders }))} />
              <Toggle label="Require deposits" desc="Take a deposit to reduce no-shows" on={toggles.deposits} onChange={() => setToggles((t) => ({ ...t, deposits: !t.deposits }))} />
              <Toggle label="Request reviews" desc="Ask happy clients for a review after their visit" on={toggles.reviews} onChange={() => setToggles((t) => ({ ...t, reviews: !t.reviews }))} />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="btn-ghost">Cancel</button>
              <button className="btn-primary"><Icon.Plus className="h-4 w-4" /> Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
      <input className="input" defaultValue={value} />
    </label>
  );
}

function Toggle({ label, desc, on, onChange }: { label: string; desc: string; on: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <div className="font-semibold text-ink">{label}</div>
        <div className="text-sm text-muted">{desc}</div>
      </div>
      <button
        onClick={onChange}
        className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
        style={{ background: on ? "var(--primary)" : "var(--surface-3)" }}
        aria-pressed={on}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
